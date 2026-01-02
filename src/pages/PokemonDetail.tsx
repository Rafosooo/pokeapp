import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, Ruler, Scale, Heart, Volume2, MapPin } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { StatBar } from '@/components/pokemon/StatBar';
import { PokemonGallery } from '@/components/pokemon/PokemonGallery';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { TypeEffectiveness } from '@/components/pokemon/TypeEffectiveness';
import { LocationDialog } from '@/components/pokemon/LocationDialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/use-favorites';
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
  getPokemonEncounters,
  getIdFromUrl,
  formatPokemonName,
  TYPE_COLORS,
  formatLocationName,
  formatEvolutionDetails,
} from '@/lib/pokeapi';
import { translateText } from '@/lib/translate';
import { cn } from '@/lib/utils';

export default function PokemonDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [translatedDescription, setTranslatedDescription] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id!),
    enabled: !!id,
  });

  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => getPokemonSpecies(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (species) {
      const entry = species.flavor_text_entries.find((entry) => entry.language.name === 'en');
      if (entry) {
        const cleanText = entry.flavor_text.replace(/\f/g, ' ');
        translateText(cleanText).then(setTranslatedDescription);
      }
    }
  }, [species]);

  const { data: encounters } = useQuery({
    queryKey: ['pokemonEncounters', id],
    queryFn: () => getPokemonEncounters(Number(id!)),
    enabled: !!id,
  });

  const { data: evolutionChain } = useQuery({
    queryKey: ['evolutionChain', species?.evolution_chain.url],
    queryFn: () => {
      const chainId = getIdFromUrl(species!.evolution_chain.url);
      return getEvolutionChain(chainId);
    },
    enabled: !!species?.evolution_chain.url,
  });

  useEffect(() => {
    // Only play sound if user has interacted with the page or if explicitly requested
    // This effect handles the automatic playback when data loads, which might be blocked by browsers
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.1;
      // We catch the error to prevent the console spam, as autoplay policy is expected behavior
      audio.play().catch(() => {
        // Silently fail for autoplay restrictions - user can click the button manually
      });
    }
  }, [pokemon?.cries?.latest]);

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center bg-red-600">
          <LoadingSpinner size="lg" variant="white" />
        </div>
      </Layout>
    );
  }

  if (!pokemon) {
    return (
      <Layout>
        <div className="min-h-screen bg-red-600 py-8 px-4 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-2xl font-black uppercase mb-4">Pokémon não encontrado</h1>
            <Link to="/pokedex">
              <Button className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">Voltar à Pokédex</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  
  const genus = species?.genera.find(
    (g) => g.language.name === 'en'
  )?.genus;

  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((t) => t.type.name),
    });
  };

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.1;
      audio.play().catch((e) => console.error('Error playing sound:', e));
    }
  };

  // Get evolution chain as flat array with details
  const getEvolutions = (node: typeof evolutionChain.chain): Array<{ name: string; id: number; details: string | null }> => {
    const evolutions: Array<{ name: string; id: number; details: string | null }> = [];
    
    const traverse = (n: typeof node, details: string | null) => {
      evolutions.push({
        name: n.species.name,
        id: getIdFromUrl(n.species.url),
        details: details
      });
      n.evolves_to.forEach(child => {
          const detailText = child.evolution_details.length > 0 
            ? formatEvolutionDetails(child.evolution_details[0]) 
            : null;
          traverse(child, detailText);
      });
    };
    
    traverse(node, null);
    return evolutions;
  };

  const evolutions = evolutionChain ? getEvolutions(evolutionChain.chain) : [];

  const handleLocationClick = (locationName: string) => {
    setSelectedLocation(locationName);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-red-600 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
           
           {/* Top Navigation Bar */}
           <div className="sticky top-0 z-50 bg-red-600 py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 flex items-center justify-between mb-8 border-b-4 border-red-800/20">
              <Button 
                variant="secondary" 
                onClick={() => navigate(-1)}
                className="bg-white text-black border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Voltar
              </Button>
              
              <div className="flex gap-4">
                {pokemon.cries?.latest && (
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                    onClick={playCry}
                    title="Ouvir som"
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                )}
                <Button
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all",
                    isFav ? "bg-red-100" : "bg-white"
                  )}
                  onClick={handleFavoriteClick}
                  title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart className={cn("h-6 w-6 transition-colors", isFav ? "fill-red-600 text-red-600" : "text-black")} />
                </Button>
              </div>
           </div>

           {/* Main Pokedex Card */}
           <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
             
             {/* Header Section */}
             <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                
                {/* Left: Image Container (The "Screen") */}
                <div className="w-full md:w-1/2">
                   <div className="bg-gray-100 rounded-2xl border-4 border-black p-6 relative shadow-inner">
                      {/* Decorative Screws */}
                      <div className="absolute top-3 left-3 h-3 w-3 rounded-full border-2 border-gray-400 bg-gray-200" />
                      <div className="absolute top-3 right-3 h-3 w-3 rounded-full border-2 border-gray-400 bg-gray-200" />
                      <div className="absolute bottom-3 left-3 h-3 w-3 rounded-full border-2 border-gray-400 bg-gray-200" />
                      <div className="absolute bottom-3 right-3 h-3 w-3 rounded-full border-2 border-gray-400 bg-gray-200" />
                      
                      <div className="mb-4">
                         <PokemonGallery pokemon={pokemon} />
                      </div>
                   </div>
                   
                   {/* Types under image */}
                   <div className="flex justify-center gap-3 mt-6">
                      {pokemon.types.map((t) => (
                        <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
                      ))}
                   </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 pt-4">
                   <div className="flex items-baseline gap-4 mb-2">
                      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
                        {formatPokemonName(pokemon.name)}
                      </h1>
                      <span className="text-2xl font-black text-gray-400">
                        #{pokemon.id.toString().padStart(3, '0')}
                      </span>
                   </div>
                   
                   {genus && (
                     <p className="text-xl font-bold text-gray-500 mb-6">{genus}</p>
                   )}
                   
                   <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-8">
                     <p className="text-lg font-medium text-blue-900 leading-relaxed italic">
                       "{translatedDescription || 'Carregando descrição...'}"
                     </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gray-50 rounded-xl border-2 border-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                          <Ruler className="h-5 w-5" />
                          <span className="font-bold text-sm uppercase">Altura</span>
                        </div>
                        <span className="text-2xl font-black">{(pokemon.height / 10).toFixed(1)} m</span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl border-2 border-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                          <Scale className="h-5 w-5" />
                          <span className="font-bold text-sm uppercase">Peso</span>
                        </div>
                        <span className="text-2xl font-black">{(pokemon.weight / 10).toFixed(1)} kg</span>
                      </div>
                   </div>

                   {/* Abilities */}
                   <div>
                      <h3 className="font-black uppercase text-lg mb-3">Habilidades</h3>
                      <div className="flex flex-wrap gap-2">
                        {pokemon.abilities.map((a) => (
                          <span
                            key={a.ability.name}
                            className={cn(
                              "px-4 py-2 rounded-lg font-bold border-2 border-black text-sm",
                              a.is_hidden 
                                ? "bg-gray-100 text-gray-500 border-dashed" 
                                : "bg-yellow-300 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            )}
                          >
                            {formatPokemonName(a.ability.name)}
                            {a.is_hidden && ' (Oculta)'}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Stats & Details Grid */}
             <div className="grid gap-8 lg:grid-cols-2">
                
                {/* Stats */}
                <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                  <h2 className="mb-6 text-2xl font-black uppercase flex items-center gap-2">
                    <span className="w-4 h-8 bg-red-500 rounded-sm border-2 border-black inline-block"></span>
                    Estatísticas Base
                  </h2>
                  <div className="space-y-4">
                    {pokemon.stats.map((s) => (
                      <StatBar
                        key={s.stat.name}
                        name={s.stat.name}
                        value={s.base_stat}
                        max={255}
                      />
                    ))}
                  </div>
                </div>

                {/* Type Effectiveness */}
                <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                  <h2 className="mb-6 text-2xl font-black uppercase flex items-center gap-2">
                    <span className="w-4 h-8 bg-blue-500 rounded-sm border-2 border-black inline-block"></span>
                    Fraquezas & Resistências
                  </h2>
                  <TypeEffectiveness types={pokemon.types.map(t => t.type.name)} />
                </div>
             </div>

             {/* Evolution Chain */}
             {evolutions.length > 0 && (
               <div className="mt-8 rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                 <h2 className="mb-6 text-2xl font-black uppercase flex items-center gap-2">
                   <span className="w-4 h-8 bg-yellow-400 rounded-sm border-2 border-black inline-block"></span>
                   Evoluções
                 </h2>
                 
                 <div className="flex flex-col md:flex-row items-center justify-center gap-4 overflow-x-auto pb-4">
                   {evolutions.map((evo, index) => (
                     <div key={evo.id} className="flex flex-col md:flex-row items-center gap-4 shrink-0">
                       {index > 0 && (
                         <div className="flex flex-col items-center gap-2 mx-2">
                           <ArrowRight className="h-8 w-8 text-black hidden md:block" />
                           <ArrowDown className="h-8 w-8 text-black md:hidden" />
                           {evo.details && (
                             <span className="text-[10px] font-black uppercase bg-gray-100 px-2 py-1 rounded border border-black max-w-[100px] text-center">
                               {evo.details}
                             </span>
                           )}
                         </div>
                       )}
                       <div className="w-40 sm:w-48 transition-transform hover:scale-105 duration-300">
                         <PokemonCard id={evo.id} name={evo.name} />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}

             {/* Locations */}
             <div className="mt-8 rounded-2xl border-4 border-black bg-gray-50 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-8 w-8 text-red-600" />
                  <h2 className="text-2xl font-black uppercase">Onde Encontrar</h2>
                </div>
                
                {encounters && encounters.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {encounters.slice(0, 9).map((encounter: any, index: number) => (
                      <button 
                        key={index} 
                        onClick={() => handleLocationClick(encounter.location_area.name)}
                        className="bg-white p-4 rounded-xl border-2 border-black shadow-sm flex items-center gap-3 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-left"
                      >
                         <div className="h-2 w-2 rounded-full bg-red-500 shrink-0"></div>
                         <span className="font-bold text-sm">{formatLocationName(encounter.location_area.name)}</span>
                      </button>
                    ))}
                    {encounters.length > 9 && (
                      <div className="bg-white p-4 rounded-xl border-2 border-black border-dashed flex items-center justify-center text-gray-500 font-bold">
                        + {encounters.length - 9} locais
                      </div>
                    )}
                  </div>
                ) : (
                   <p className="text-gray-500 italic font-medium">Localização desconhecida ou indisponível nos jogos principais.</p>
                )}
             </div>

             <LocationDialog 
               isOpen={!!selectedLocation} 
               onClose={() => setSelectedLocation(null)} 
               locationName={selectedLocation || ''} 
             />

          </div>
        </div>
      </div>
    </Layout>
  );
}