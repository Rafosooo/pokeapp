import { useQuery } from '@tanstack/react-query';
import { getBulbapediaPageTitle, formatLocationName } from '@/lib/pokeapi';
import { translateText } from '@/lib/translate';

interface BulbapediaData {
  title: string;
  extract: string;
  translatedExtract?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  alternateMaps?: string[];
  mapUrl?: string;
}

// Função helper para fetch com timeout e fallback
const fetchWithSmartFallback = async (url: string) => {
  // Verificação simples de mobile para evitar tentativa direta que sabemos que falhará
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // No mobile, vamos direto para o proxy para evitar o erro de console e o delay
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    return await res.json();
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout para direct fetch

  try {
    const res = await fetch(url, {
      mode: 'cors',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    // console.warn('Direct fetch failed or timed out, switching to proxy...', err);
    // Usando corsproxy.io que é geralmente mais rápido que allorigins
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    return await res.json();
  }
};

export function useBulbapedia(locationName: string, region?: string) {
  const pageTitle = getBulbapediaPageTitle(locationName, region);
  const formattedName = formatLocationName(locationName);

  return useQuery({
    queryKey: ['bulbapedia', pageTitle],
    queryFn: async () => {
      if (!pageTitle) return null;

      // Busca informações básicas
      const infoPromise = fetchWithSmartFallback(
        `https://bulbapedia.bulbagarden.net/w/api.php?action=query&titles=${pageTitle}&prop=pageimages|extracts&exintro&explaintext&format=json&pithumbsize=600&redirects=1&origin=*`
      );

      // Busca imagens para tentar achar mapas
      const imagesPromise = fetchWithSmartFallback(
        `https://bulbapedia.bulbagarden.net/w/api.php?action=query&generator=images&titles=${pageTitle}&gimlimit=500&prop=imageinfo&iiprop=url&format=json&redirects=1&origin=*`
      );

      const [infoData, imagesData] = await Promise.all([infoPromise, imagesPromise]);

      const infoPages = infoData.query?.pages;
      if (!infoPages) throw new Error('No pages found');

      const pageId = Object.keys(infoPages)[0];
      if (pageId === '-1') throw new Error('Page not found');

      const pageData = infoPages[pageId];

      // Processamento do Mapa
      let mapUrl = null;
      let validMaps: string[] = [];
      const imagePages = imagesData.query?.pages;
      
      if (imagePages) {
        const images = Object.values(imagePages) as any[];
        
        const getScore = (img: any) => {
          const title = img.title.replace(/^File:/, '').toLowerCase();
          const name = formattedName.toLowerCase();
          const reg = region?.toLowerCase() || '';
          let score = 0;

          if (/\smap\.(png|jpg|gif)$/i.test(title)) score += 100;
          if (title.includes(name) && reg && title.includes(reg)) score += 50;
          else if (title.includes(name)) score += 20;
          if (title.includes('map')) score += 5;

          if (title.includes('header')) score -= 20;
          if (title.includes('sprite')) score -= 50;
          if (title.includes('logo')) score -= 50;
          if (title.includes('icon')) score -= 50;

          return score;
        };

        const possibleMaps = images.filter(img => {
            const title = img.title.toLowerCase();
            return title.includes('map') || (title.includes(formattedName.toLowerCase()) && title.includes(region?.toLowerCase() || ''));
        });
        
        possibleMaps.sort((a, b) => getScore(b) - getScore(a));

        if (possibleMaps.length > 0) {
            validMaps = possibleMaps
              .filter(m => getScore(m) > 0 && m.imageinfo?.[0]?.url)
              .map(m => m.imageinfo[0].url);
            
            if (validMaps.length > 0) {
                mapUrl = validMaps[0];
            }
        }
      }
      
      let translatedExtract = pageData.extract;
      try {
        // Traduz apenas os 3 primeiros parágrafos para não estourar limites
        if (pageData.extract) {
            const paragraphs = pageData.extract.split('\n').filter((p: string) => p.trim().length > 0);
            const textToTranslate = paragraphs.slice(0, 3).join('\n\n');
            translatedExtract = await translateText(textToTranslate);
        }
      } catch (e) {
        console.warn('Failed to translate:', e);
      }

      return {
        title: pageData.title,
        extract: pageData.extract,
        translatedExtract,
        thumbnail: mapUrl ? { source: mapUrl, width: 600, height: 400 } : pageData.thumbnail,
        alternateMaps: validMaps,
        mapUrl: mapUrl || pageData.thumbnail?.source
      } as BulbapediaData;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!pageTitle
  });
}
