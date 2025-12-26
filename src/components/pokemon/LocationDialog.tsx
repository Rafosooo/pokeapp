import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Loader2, MapPin } from 'lucide-react';
import { 
  getBulbapediaPageTitle, 
  getBulbapediaUrl, 
  formatLocationName, 
  getLocation, 
  getLocationArea, 
  formatPokemonName,
  getIdFromUrl
} from '@/lib/pokeapi';
import { translateText } from '@/lib/translate';

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  region?: string;
}

interface BulbapediaData {
  title: string;
  extract: string;
  translatedExtract?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
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

export function LocationDialog({ isOpen, onClose, locationName, region }: LocationDialogProps) {
  const [imageError, setImageError] = useState(false);
  const [alternateMaps, setAlternateMaps] = useState<string[]>([]);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const formattedName = formatLocationName(locationName);
  const pageTitle = getBulbapediaPageTitle(locationName, region);
  const bulbapediaUrl = getBulbapediaUrl(locationName, region);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setImageError(false);
      setAlternateMaps([]);
      setCurrentMapIndex(0);
    }
  }, [isOpen]);

  // Query para dados do Bulbapedia
  const { data, isLoading: loading, isError: error } = useQuery({
    queryKey: ['bulbapedia', pageTitle],
    queryFn: async () => {
      if (!pageTitle) return null;

      // Busca informações básicas
      const infoPromise = fetchWithSmartFallback(
        `https://bulbapedia.bulbagarden.net/w/api.php?action=query&titles=${pageTitle}&prop=pageimages|extracts&exintro&explaintext&format=json&pithumbsize=600&redirects=1&origin=*`
      );

      // Busca imagens (otimizado para pedir menos dados inicialmente se possível, mas mantendo gimlimit alto para achar o mapa)
      const imagesPromise = fetchWithSmartFallback(
        `https://bulbapedia.bulbagarden.net/w/api.php?action=query&generator=images&titles=${pageTitle}&gimlimit=500&prop=imageinfo&iiprop=url&format=json&redirects=1&origin=*`
      );

      const [infoData, imagesData] = await Promise.all([infoPromise, imagesPromise]);

      const infoPages = infoData.query?.pages;
      if (!infoPages) throw new Error('No pages found');

      const pageId = Object.keys(infoPages)[0];
      if (pageId === '-1') throw new Error('Page not found');

      const page = infoPages[pageId];

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

      // Tradução
      let translatedText = '';
      if (page.extract) {
        const paragraphs = page.extract.split('\n').filter((p: string) => p.trim().length > 0);
        const textToTranslate = paragraphs.slice(0, 3).join('\n\n');
        translatedText = await translateText(textToTranslate);
      }

      return {
        title: page.title,
        extract: page.extract,
        translatedExtract: translatedText,
        thumbnail: mapUrl ? { source: mapUrl, width: 600, height: 400 } : page.thumbnail,
        alternateMaps: validMaps // Passamos isso para o componente usar se precisar
      };
    },
    enabled: isOpen && !!pageTitle,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours cache
  });

  // Atualiza alternateMaps quando data muda
  useEffect(() => {
    if (data?.alternateMaps) {
      setAlternateMaps(data.alternateMaps);
    }
  }, [data]);

  // Query para Encounters
  const { data: encounters, isLoading: loadingEncounters } = useQuery({
    queryKey: ['encounters', locationName],
    queryFn: async () => {
        // Tenta buscar como Localização
        let areas = [];
        try {
            const location = await getLocation(locationName);
            const areaPromises = location.areas.map(area => getLocationArea(area.name));
            areas = await Promise.all(areaPromises);
        } catch (e) {
            // Fallback: Tenta buscar como área única
            try {
                const area = await getLocationArea(locationName);
                areas = [area];
            } catch (e2) {
                return {};
            }
        }
        
        const groupedByVersion: Record<string, any[]> = {};
        
        areas.forEach(area => {
            area.pokemon_encounters.forEach(pe => {
                pe.version_details.forEach(vd => {
                    const version = vd.version.name;
                    if (!groupedByVersion[version]) {
                        groupedByVersion[version] = [];
                    }
                    const existing = groupedByVersion[version].find(p => p.pokemon.name === pe.pokemon.name);
                    
                    if (!existing) {
                        groupedByVersion[version].push({
                            pokemon: pe.pokemon,
                            details: vd,
                            areaName: area.name
                        });
                    }
                });
            });
        });
        
        return groupedByVersion;
    },
    enabled: isOpen && !!locationName,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const handleImageError = () => {
    const nextIndex = currentMapIndex + 1;
    if (nextIndex < alternateMaps.length) {
      setCurrentMapIndex(nextIndex);
      // Forçamos uma atualização "visual" do thumbnail usando o estado local data
      // Nota: Com React Query, idealmente não mutamos o data diretamente, mas para troca rápida de imagem local:
      // A renderização usa data.thumbnail.source.
      // Precisamos de um estado local para controlar a imagem exibida se ela diferir do data.
    } else {
      setImageError(true);
    }
  };

  // Determine image source
  const displayImage = alternateMaps.length > 0 ? alternateMaps[currentMapIndex] : data?.thumbnail?.source;

  const hasEncounters = encounters && Object.keys(encounters).length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {formattedName}
            {region && <span className="text-sm font-normal text-muted-foreground">({region})</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="encounters">Pokémon Disponíveis</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Não foi possível carregar os detalhes desta localização.</p>
                    <Button asChild variant="outline">
                        <a href={bulbapediaUrl} target="_blank" rel="noopener noreferrer">
                        Ver no Bulbapedia <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    </div>
                ) : data ? (
                    <div className="space-y-6">
                    {displayImage && !imageError && (
                        <div className="rounded-lg overflow-hidden border border-border bg-muted/50 flex justify-center p-4">
                        <img 
                            src={displayImage} 
                            alt={`Mapa de ${formattedName}`}
                            className="max-h-[400px] w-auto object-contain"
                            onError={handleImageError}
                            referrerPolicy="no-referrer"
                        />
                        </div>
                    )}

                    {imageError && (
                        <div className="rounded-lg overflow-hidden border border-border bg-muted/50 flex flex-col justify-center items-center p-8 text-muted-foreground">
                            <ExternalLink className="h-12 w-12 mb-2 opacity-50" />
                            <p>Imagem indisponível</p>
                        </div>
                    )}
                    
                    {data.translatedExtract ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                        {data.translatedExtract.split('\n').map((paragraph, i) => (
                            paragraph.trim() && <p key={i} className="mb-2 text-foreground/90 leading-relaxed">{paragraph}</p>
                        ))}
                        <p className="text-xs text-muted-foreground mt-4 italic">
                            * Traduzido automaticamente. <a href={bulbapediaUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Ver original em Inglês</a>.
                        </p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground italic">Sem descrição disponível.</p>
                    )}

                    <div className="pt-4 border-t border-border flex justify-end">
                        <Button asChild variant="ghost" size="sm">
                        <a href={bulbapediaUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            Ver artigo completo no Bulbapedia <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                        </Button>
                    </div>
                    </div>
                ) : null}
            </TabsContent>

            <TabsContent value="encounters" className="mt-4">
                {loadingEncounters ? (
                     <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                     </div>
                ) : hasEncounters ? (
                    <div className="space-y-6">
                        {Object.entries(encounters!)
                            .sort(([verA], [verB]) => {
                                // Ordem manual simples de gerações/versões se necessário, ou alfabética
                                // Como as chaves são nomes de versões (ex: "red", "blue"), difícil ordenar cronologicamente só pelo nome sem um mapa.
                                // Vamos tentar usar uma lista de prioridade básica.
                                const versionsOrder = [
                                    'red', 'blue', 'yellow', 
                                    'gold', 'silver', 'crystal',
                                    'ruby', 'sapphire', 'emerald', 'firered', 'leafgreen',
                                    'diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver',
                                    'black', 'white', 'black-2', 'white-2',
                                    'x', 'y', 'omega-ruby', 'alpha-sapphire',
                                    'sun', 'moon', 'ultra-sun', 'ultra-moon',
                                    'sword', 'shield', 'brilliant-diamond', 'shining-pearl', 'legends-arceus',
                                    'scarlet', 'violet'
                                ];
                                const idxA = versionsOrder.indexOf(verA);
                                const idxB = versionsOrder.indexOf(verB);
                                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                                if (idxA !== -1) return -1;
                                if (idxB !== -1) return 1;
                                return verA.localeCompare(verB);
                            })
                            .map(([version, pokemons]) => (
                            <div key={version} className="rounded-lg border border-border bg-card p-4">
                                <h3 className="mb-3 text-lg font-bold capitalize text-primary flex items-center gap-2">
                                    <Badge variant="outline" className="capitalize">{formatPokemonName(version)}</Badge>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {pokemons.map((p, idx) => {
                                        const pokemonId = getIdFromUrl(p.pokemon.url);
                                        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                                        const details = p.details.encounter_details?.[0];
                                        const method = details?.method?.name ? formatPokemonName(details.method.name) : 'Unknown';
                                        const minLevel = details?.min_level;
                                        const maxLevel = details?.max_level;
                                        const levelText = minLevel === maxLevel ? `Lvl ${minLevel}` : `Lvl ${minLevel}-${maxLevel}`;

                                        return (
                                            <Link 
                                                key={`${version}-${p.pokemon.name}-${idx}`} 
                                                to={`/pokemon/${pokemonId}`}
                                                className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md hover:bg-secondary transition-colors group"
                                            >
                                                <img 
                                                    src={spriteUrl} 
                                                    alt={p.pokemon.name} 
                                                    className="h-12 w-12 object-contain bg-background rounded-full border border-border group-hover:border-primary transition-colors" 
                                                    loading="lazy"
                                                />
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="font-bold text-sm capitalize truncate group-hover:text-primary transition-colors">{formatPokemonName(p.pokemon.name)}</span>
                                                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                                                        <span className="font-semibold text-primary">{p.details.max_chance}%</span>
                                                        <span>•</span>
                                                        <span>{levelText}</span>
                                                        <span>•</span>
                                                        <span className="truncate" title={method}>{method}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <MapPin className="mx-auto h-12 w-12 opacity-20 mb-4" />
                        <p>Nenhum Pokémon encontrado nesta localização (via PokeAPI).</p>
                    </div>
                )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
