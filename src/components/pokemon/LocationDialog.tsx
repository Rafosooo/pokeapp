import { useState, useEffect } from 'react';
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

export function LocationDialog({ isOpen, onClose, locationName, region }: LocationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BulbapediaData | null>(null);
  const [error, setError] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [alternateMaps, setAlternateMaps] = useState<string[]>([]);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  // Encounters State
  const [encounters, setEncounters] = useState<Record<string, any[]>>({});
  const [loadingEncounters, setLoadingEncounters] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setImageError(false);
        setAlternateMaps([]);
        setCurrentMapIndex(0);
        setEncounters({});
    }
  }, [isOpen]);

  const formattedName = formatLocationName(locationName);
  const pageTitle = getBulbapediaPageTitle(locationName, region);
  const bulbapediaUrl = getBulbapediaUrl(locationName, region);

  // Fetch Bulbapedia Data
  useEffect(() => {
    if (isOpen && pageTitle) {
      setLoading(true);
      setError(false);
      setData(null);

      const fetchData = async () => {
        try {
          // Busca informações básicas e thumbnail padrão
          const infoPromise = fetch(
            `https://bulbapedia.bulbagarden.net/w/api.php?action=query&titles=${pageTitle}&prop=pageimages|extracts&exintro&explaintext&format=json&pithumbsize=600&redirects=1&origin=*`
          ).then(res => res.json());

          // Busca todas as imagens da página para encontrar o mapa
          const imagesPromise = fetch(
            `https://bulbapedia.bulbagarden.net/w/api.php?action=query&generator=images&titles=${pageTitle}&gimlimit=500&prop=imageinfo&iiprop=url&format=json&redirects=1&origin=*`
          ).then(res => res.json());

          const [infoData, imagesData] = await Promise.all([infoPromise, imagesPromise]);

          const infoPages = infoData.query?.pages;
          if (!infoPages) throw new Error('No pages found');

          const pageId = Object.keys(infoPages)[0];
          if (pageId === '-1') throw new Error('Page not found');

          const page = infoPages[pageId];

          // Lógica para encontrar a imagem do mapa
          let mapUrl = null;
          const imagePages = imagesData.query?.pages;
          
          if (imagePages) {
            const images = Object.values(imagePages) as any[];
            
            // Score function melhorada
            const getScore = (img: any) => {
              // Normaliza o título (remove "File:" e extensão)
              const title = img.title.replace(/^File:/, '').toLowerCase();
              const name = formattedName.toLowerCase();
              const reg = region?.toLowerCase() || '';
              let score = 0;

              // Critério 1: Título termina com " map" (extensão já é tratada implicitamente pois includes pega)
              if (/\smap\.(png|jpg|gif)$/i.test(title)) {
                score += 100;
              }

              // Critério 2: Contém nome e região
              if (title.includes(name) && reg && title.includes(reg)) {
                score += 50;
              } else if (title.includes(name)) {
                score += 20;
              }

              // Critério 3: Contém "map" em qualquer lugar
              if (title.includes('map')) {
                score += 5;
              }

              // Penalidades
              if (title.includes('header')) score -= 20;
              if (title.includes('sprite')) score -= 50;
              if (title.includes('logo')) score -= 50;
              if (title.includes('icon')) score -= 50;

              return score;
            };

            // Filtra imagens que podem ser mapas
            const possibleMaps = images.filter(img => {
                const title = img.title.toLowerCase();
                return title.includes('map') || (title.includes(formattedName.toLowerCase()) && title.includes(region?.toLowerCase() || ''));
            });
            
            // Ordena por score
            possibleMaps.sort((a, b) => getScore(b) - getScore(a));

            if (possibleMaps.length > 0) {
                // Coleta todas as URLs válidas de mapas em ordem de relevância
                const validMaps = possibleMaps
                  .filter(m => getScore(m) > 0 && m.imageinfo?.[0]?.url)
                  .map(m => m.imageinfo[0].url);
                
                if (validMaps.length > 0) {
                    mapUrl = validMaps[0];
                    setAlternateMaps(validMaps);
                }
            }
          }

          // Traduzir o extrato
          let translatedText = '';
          if (page.extract) {
            const paragraphs = page.extract.split('\n').filter((p: string) => p.trim().length > 0);
            const textToTranslate = paragraphs.slice(0, 3).join('\n\n');
            translatedText = await translateText(textToTranslate);
          }

          setData({
            title: page.title,
            extract: page.extract,
            translatedExtract: translatedText,
            thumbnail: mapUrl ? { source: mapUrl, width: 600, height: 400 } : page.thumbnail
          });
        } catch (err) {
          console.error(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen, pageTitle, formattedName, region]);

  // Fetch Encounters Data
  useEffect(() => {
    if (isOpen && locationName) {
      setLoadingEncounters(true);
      const fetchEncounters = async () => {
        try {
           // Tenta buscar como Localização (agrupador de áreas)
           // Se falhar (ex: é uma área específica), tenta buscar como Área diretamente
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
                console.log("Not a valid PokeAPI location or area");
                setEncounters({});
                return;
             }
           }
           
           // Agrupar encontros por versão
           const groupedByVersion: Record<string, any[]> = {};
           
           areas.forEach(area => {
             area.pokemon_encounters.forEach(pe => {
               pe.version_details.forEach(vd => {
                 const version = vd.version.name;
                 if (!groupedByVersion[version]) {
                   groupedByVersion[version] = [];
                 }
                 // Verifica se já existe esse pokemon nessa versão (pode vir de áreas diferentes da mesma location)
                 const existing = groupedByVersion[version].find(p => p.pokemon.name === pe.pokemon.name);
                 
                 if (!existing) {
                    groupedByVersion[version].push({
                        pokemon: pe.pokemon,
                        details: vd,
                        areaName: area.name // Opcional: mostrar em qual parte da rota aparece
                    });
                 }
               });
             });
           });
           
           setEncounters(groupedByVersion);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingEncounters(false);
        }
      };
      fetchEncounters();
    }
  }, [isOpen, locationName]);

  const handleImageError = () => {
    const nextIndex = currentMapIndex + 1;
    if (nextIndex < alternateMaps.length) {
      setCurrentMapIndex(nextIndex);
      // Atualiza o source da imagem dinamicamente
      if (data) {
        setData({
            ...data,
            thumbnail: {
                ...data.thumbnail!,
                source: alternateMaps[nextIndex]
            }
        });
      }
    } else {
      setImageError(true);
    }
  };

  const hasEncounters = Object.keys(encounters).length > 0;

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
                    {data.thumbnail && !imageError && (
                        <div className="rounded-lg overflow-hidden border border-border bg-muted/50 flex justify-center p-4">
                        <img 
                            src={data.thumbnail.source} 
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
                        {Object.entries(encounters).map(([version, pokemons]) => (
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
                                            <div key={`${version}-${p.pokemon.name}-${idx}`} className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md hover:bg-secondary transition-colors">
                                                <img 
                                                    src={spriteUrl} 
                                                    alt={p.pokemon.name} 
                                                    className="h-12 w-12 object-contain bg-background rounded-full border border-border" 
                                                    loading="lazy"
                                                />
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="font-bold text-sm capitalize truncate">{formatPokemonName(p.pokemon.name)}</span>
                                                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                                                        <span className="font-semibold text-primary">{p.details.max_chance}%</span>
                                                        <span>•</span>
                                                        <span>{levelText}</span>
                                                        <span>•</span>
                                                        <span className="truncate" title={method}>{method}</span>
                                                    </div>
                                                </div>
                                            </div>
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
