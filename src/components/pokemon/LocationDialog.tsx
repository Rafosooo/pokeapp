import { useState, useEffect, useMemo } from 'react';
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
import { useBulbapedia } from '@/hooks/useBulbapedia';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  region?: string;
}

// Helper function moved to useBulbapedia hook

export function LocationDialog({ isOpen, onClose, locationName, region }: LocationDialogProps) {
  const [imageError, setImageError] = useState(false);
  const [alternateMaps, setAlternateMaps] = useState<string[]>([]);
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState<string>("all");

  const formattedName = formatLocationName(locationName);
  const pageTitle = getBulbapediaPageTitle(locationName, region);
  const bulbapediaUrl = getBulbapediaUrl(locationName, region);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setImageError(false);
      setAlternateMaps([]);
      setCurrentMapIndex(0);
      setSelectedVersion("all");
    }
  }, [isOpen]);

  // Query para dados do Bulbapedia
  const { data, isLoading: loading, isError: error } = useBulbapedia(locationName, region);

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

  const filteredEncounters = useMemo(() => {
    if (!encounters) return {};
    if (selectedVersion === "all") return encounters;
    
    return Object.entries(encounters)
      .filter(([version]) => version === selectedVersion)
      .reduce((acc, [version, data]) => ({ ...acc, [version]: data }), {});
  }, [encounters, selectedVersion]);

  const availableVersions = useMemo(() => {
    if (!encounters) return [];
    
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

    return Object.keys(encounters).sort((a, b) => {
        const idxA = versionsOrder.indexOf(a);
        const idxB = versionsOrder.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });
  }, [encounters]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col border-4 border-black shadow-[12px_12px_0px_0px_#15803d] bg-white p-0 rounded-3xl overflow-hidden gap-0">
        <DialogHeader className="px-6 py-6 border-b-[6px] border-black bg-zinc-800 text-white shrink-0 relative overflow-hidden">
          {/* Orange Ring (Dusk Ball Characteristic) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[16px] border-orange-500 opacity-20 z-0"></div>

          <div className="relative z-10 flex flex-col items-start">
            <DialogTitle className="text-3xl font-black uppercase flex flex-wrap items-center gap-3 text-left drop-shadow-md">
              <span className="break-words">{formattedName}</span>
              {region && <span className="text-sm font-black text-zinc-900 whitespace-nowrap bg-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">Region: {region}</span>}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-green-50 custom-scrollbar">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-0 bg-transparent gap-4 mb-6">
              <TabsTrigger 
                value="info" 
                className="py-3 rounded-xl border-4 border-black bg-white data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#000] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] text-black font-black uppercase transition-all hover:-translate-y-1 text-xs sm:text-base"
              >
                Informações
              </TabsTrigger>
              <TabsTrigger 
                value="encounters" 
                className="py-3 rounded-xl border-4 border-black bg-white data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#000] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] text-black font-black uppercase transition-all hover:-translate-y-1 text-xs sm:text-base whitespace-normal h-full leading-tight px-1"
              >
                Pokémon Disponíveis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-0">
                {loading ? (
                    <div className="flex justify-center py-12">
                    <Loader2 className="h-10 w-10 animate-spin text-green-600" />
                    </div>
                ) : error ? (
                    <div className="text-center py-8 bg-white rounded-xl border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <p className="text-gray-500 font-bold mb-4">Não foi possível carregar os detalhes desta localização.</p>
                    <Button asChild variant="outline" className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase hover:translate-y-1 hover:shadow-none transition-all rounded-xl h-12">
                        <a href={bulbapediaUrl} target="_blank" rel="noopener noreferrer">
                        Ver no Bulbapedia <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                    </div>
                ) : data ? (
                    <div className="space-y-6">
                    {displayImage && !imageError && (
                        <div className="rounded-xl overflow-hidden border-4 border-black bg-white flex justify-center p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
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
                        <div className="rounded-xl overflow-hidden border-4 border-black bg-gray-100 flex flex-col justify-center items-center p-8 text-gray-400 shadow-inner">
                            <ExternalLink className="h-12 w-12 mb-2 opacity-50" />
                            <p className="font-bold uppercase">Imagem indisponível</p>
                        </div>
                    )}
                    
                    {data.translatedExtract ? (
                        <div className="bg-white border-4 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_#15803d]">
                        {data.translatedExtract.split('\n').map((paragraph, i) => (
                            paragraph.trim() && <p key={i} className="mb-2 text-black font-medium leading-relaxed">{paragraph}</p>
                        ))}
                        <p className="text-xs text-green-700 mt-4 italic font-bold border-t-2 border-green-100 pt-2">
                            * Traduzido automaticamente. <a href={bulbapediaUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-900">Ver original em Inglês</a>.
                        </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic font-bold text-center">Sem descrição disponível.</p>
                    )}

                    <div className="pt-4 flex justify-end">
                        <Button asChild className="bg-green-600 text-white hover:bg-green-700 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all rounded-xl h-12 px-6">
                        <a href={bulbapediaUrl} target="_blank" rel="noopener noreferrer">
                            Ver artigo completo <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                        </Button>
                    </div>
                    </div>
                ) : null}
            </TabsContent>

            <TabsContent value="encounters" className="mt-0">
                {loadingEncounters ? (
                     <div className="flex justify-center py-12">
                        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
                     </div>
                ) : hasEncounters ? (
                    <div className="space-y-6">
                        {/* Game Filter */}
                        <div className="w-full">
                          <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                            <SelectTrigger className="w-full h-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold transition-all bg-white rounded-xl">
                              <SelectValue placeholder="Filtrar por Jogo" />
                            </SelectTrigger>
                            <SelectContent className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl max-h-[300px]">
                              <SelectItem value="all" className="font-bold cursor-pointer">Todos os Jogos</SelectItem>
                              {availableVersions.map((version) => (
                                <SelectItem key={version} value={version} className="capitalize font-medium cursor-pointer">
                                  {formatPokemonName(version)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {Object.entries(filteredEncounters)
                            .sort(([verA], [verB]) => {
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
                            <div key={version} className="rounded-xl border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="mb-4 text-lg font-black capitalize flex items-center gap-2">
                                    <Badge variant="outline" className="capitalize border-4 border-black bg-yellow-400 text-black px-4 py-1 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black">{formatPokemonName(version)}</Badge>
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
                                                className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border-2 border-transparent hover:border-black hover:bg-green-50 hover:shadow-[4px_4px_0px_0px_#f97316] transition-all group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ExternalLink className="h-4 w-4 text-orange-500" />
                                                </div>
                                                <img 
                                                    src={spriteUrl} 
                                                    alt={p.pokemon.name} 
                                                    className="h-14 w-14 object-contain bg-white rounded-full border-2 border-black/10 group-hover:border-black transition-colors z-10" 
                                                    loading="lazy"
                                                />
                                                <div className="flex flex-col flex-1 min-w-0 z-10">
                                                    <span className="font-black text-sm capitalize truncate text-black group-hover:text-green-900 transition-colors">{formatPokemonName(p.pokemon.name)}</span>
                                                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500 font-bold mt-1">
                                                        <span className="text-green-600 bg-green-50 px-1.5 rounded border border-green-200">{p.details.max_chance}%</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span>{levelText}</span>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="truncate max-w-[80px]" title={method}>{method}</span>
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
                    <div className="text-center py-12 text-gray-400 border-4 border-dashed border-gray-300 rounded-xl bg-gray-50">
                        <MapPin className="mx-auto h-12 w-12 opacity-30 mb-4" />
                        <p className="font-bold text-lg">Nenhum Pokémon encontrado</p>
                        <p className="text-sm opacity-70">Não há dados de encontros nesta localização na PokeAPI.</p>
                    </div>
                )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
