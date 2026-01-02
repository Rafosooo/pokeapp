import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Trophy, 
  MapPin, 
  Swords, 
  ShieldAlert, 
  ChevronRight,
  Info,
  Target,
  ThumbsUp
} from 'lucide-react';
import { GYM_DATA, GymLeader } from '@/data/gym-leaders';
import {
  getType,
  getIdFromUrl,
  formatPokemonName,
  getPokemonImageUrl
} from '@/lib/pokeapi';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LocationDialog } from '@/components/pokemon/LocationDialog';
import { useBulbapedia } from '@/hooks/useBulbapedia';
import { cn } from '@/lib/utils';

export default function GymGuide() {
  const [selectedGameId, setSelectedGameId] = useState<string>(GYM_DATA[0].id);
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{name: string, region: string} | null>(null);
  const [selectedStarterId, setSelectedStarterId] = useState<number>(1); // Default to Bulbasaur

  const selectedGame = GYM_DATA.find(g => g.id === selectedGameId) || GYM_DATA[0];
  const selectedLeader = selectedLeaderId 
    ? selectedGame?.leaders.find(l => l.id === selectedLeaderId) 
    : null;

  // Fetch location data for the map
  const { data: locationData } = useBulbapedia(
    selectedLeader?.location || '', 
    selectedGame?.region
  );

  // Reset starter when game changes
  useEffect(() => {
    if (selectedGame?.starters?.length > 0) {
      setSelectedStarterId(selectedGame.starters[0].id);
    }
  }, [selectedGameId, selectedGame]);

  // Fetch type data for calculation
  const { data: typeData, isLoading: isLoadingTypes } = useQuery({
    queryKey: ['all-types-data'],
    queryFn: async () => {
      // Fetch common offensive types to calculate effectiveness
      const types = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
        'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'
      ];
      const results = await Promise.all(types.map(t => getType(t)));
      return results;
    },
    staleTime: Infinity
  });

  // Calculate Best Counters
  const bestCounters = useMemo(() => {
    if (!selectedLeader || !typeData) return [];

    const scores: Record<string, number> = {};
    const typeDetailsMap = new Map(typeData.map(t => [t.name, t]));

    // Initialize scores
    typeData.forEach(t => scores[t.name] = 0);

    // Iterate through leader's team
    selectedLeader.team.forEach(pokemon => {
      const defensiveMultipliers: Record<string, number> = {};
      typeData.forEach(t => defensiveMultipliers[t.name] = 1);

      pokemon.types.forEach(pType => {
        const typeInfo = typeDetailsMap.get(pType);
        if (typeInfo) {
          typeInfo.damage_relations.double_damage_from.forEach(t => {
            if (defensiveMultipliers[t.name]) defensiveMultipliers[t.name] *= 2;
          });
          typeInfo.damage_relations.half_damage_from.forEach(t => {
             if (defensiveMultipliers[t.name]) defensiveMultipliers[t.name] *= 0.5;
          });
          typeInfo.damage_relations.no_damage_from.forEach(t => {
             if (defensiveMultipliers[t.name]) defensiveMultipliers[t.name] *= 0;
          });
        }
      });

      // Add score based on multiplier
      Object.entries(defensiveMultipliers).forEach(([attackerType, multiplier]) => {
        if (multiplier > 1) {
          scores[attackerType] += multiplier;
        }
      });
    });

    // Sort by score
    return Object.entries(scores)
      .filter(([_, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5) // Top 5 types
      .map(([type]) => type);

  }, [selectedLeader, typeData]);

  // Suggest Pokemon for the Best Types
  const suggestedPokemon = useMemo(() => {
    if (!bestCounters.length || !typeData) return [];
    
    const suggestions: { type: string, pokemon: { name: string, id: number }[] }[] = [];

    bestCounters.forEach(type => {
      const typeInfo = typeData.find(t => t.name === type);
      if (typeInfo) {
        // Filter Pokemon based on selected region
        const maxId = selectedGame?.region === 'Johto' ? 251 : 151;
        
        const kantoPokemon = typeInfo.pokemon
          .map(p => ({ name: p.pokemon.name, id: getIdFromUrl(p.pokemon.url) }))
          .filter(p => p.id <= maxId && p.id > 0) // Filter by generation
          .sort(() => Math.random() - 0.5) // Shuffle
          .slice(0, 3); // Take 3
        
        if (kantoPokemon.length > 0) {
          suggestions.push({ type, pokemon: kantoPokemon });
        }
      }
    });

    return suggestions;
  }, [bestCounters, typeData]);


  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
            {/* Main Content Card (White Bottom) */}
            <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_#FACC15]">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b-4 border-black pb-8">
                   {/* Ultra Ball Icon */}
                   <div className="relative h-20 w-20 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                      {/* Top Black Half */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-zinc-900 border-b-4 border-black"></div>
                      {/* Yellow accents on top */}
                      <div className="absolute top-1 left-1 right-1 h-8 border-t-4 border-yellow-400 rounded-t-full opacity-80"></div>
                      
                      {/* Button */}
                      <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-sm">
                        <div className="h-2 w-2 bg-zinc-400 rounded-full"></div>
                      </div>
                   </div>
                   
                   <div className="flex-1">
                     <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                       Ginásios
                     </h1>
                     <p className="text-lg font-medium text-gray-600">
                       Descubra os melhores times e estratégias para vencer cada líder.
                     </p>
                   </div>
                </div>

                {/* Game Selector */}
                <div className="flex items-center gap-4 mb-8">
                    <Select value={selectedGameId} onValueChange={setSelectedGameId}>
                      <SelectTrigger className="w-[280px] h-12 border-2 border-black shadow-[4px_4px_0px_0px_#FACC15] text-lg font-bold bg-white text-black focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Selecione o jogo" />
                      </SelectTrigger>
                      <SelectContent className="border-2 border-black bg-white">
                        {GYM_DATA.map(game => (
                          <SelectItem key={game.id} value={game.id} className="font-medium cursor-pointer focus:bg-yellow-100 focus:text-black">
                            <span>{game.game} ({game.region})</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedGame?.image && (
                      <img 
                        src={selectedGame.image} 
                        alt={selectedGame.game} 
                        className="h-12 w-auto object-contain rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] border-2 border-black bg-white p-1"
                      />
                    )}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Gym Leaders List */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_#FACC15] bg-white">
                            <div className="mb-4 pb-2 border-b-2 border-black/10">
                                <h3 className="text-xl font-black uppercase flex items-center gap-2 text-black">
                                    <Trophy className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    Líderes
                                </h3>
                                <p className="text-sm text-gray-500">Selecione para ver detalhes</p>
                            </div>
                            
                            <ScrollArea className="h-[600px] pr-4">
                                <div className="flex flex-col gap-3">
                                {selectedGame?.leaders.map((leader) => (
                                    <button
                                    key={leader.id}
                                    onClick={() => setSelectedLeaderId(leader.id)}
                                    className={cn(
                                        "flex items-center gap-4 p-3 text-left transition-all rounded-lg border-2 relative overflow-hidden group",
                                        selectedLeaderId === leader.id 
                                            ? "bg-yellow-400 text-black border-black shadow-[4px_4px_0px_0px_#000000]" 
                                            : "bg-white text-gray-600 border-gray-200 hover:text-black hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
                                    )}
                                    >
                                    <div className={cn(
                                        "relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 bg-white",
                                        selectedLeaderId === leader.id ? "border-black" : "border-gray-200 group-hover:border-black"
                                    )}>
                                        {leader.acePokemonId ? (
                                        <img
                                            src={getPokemonImageUrl(leader.acePokemonId)}
                                            alt={`${leader.name}'s Ace`}
                                            className="h-full w-full object-contain p-1"
                                        />
                                        ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <Trophy className="h-6 w-6 opacity-50" />
                                        </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1 z-10">
                                        <div className="flex items-center justify-between">
                                        <span className="font-bold uppercase tracking-tight">{leader.name}</span>
                                        <TypeBadge type={leader.specialty} size="sm" />
                                        </div>
                                        <p className={cn(
                                            "text-xs line-clamp-1 font-medium",
                                            selectedLeaderId === leader.id ? "text-black/70" : "text-gray-500 group-hover:text-gray-600"
                                        )}>
                                        {leader.location} • {leader.badge}
                                        </p>
                                    </div>
                                    {selectedLeaderId === leader.id && (
                                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/10"></div>
                                    )}
                                    </button>
                                ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    {/* Right Column: Details & Strategy */}
                    <div className="lg:col-span-8">
                    {selectedLeader ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row gap-6 items-start border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-zinc-50">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-black uppercase italic">{leaderTitle(selectedLeader)}</h2>
                                    <Badge variant="outline" className="text-base border-2 border-black bg-yellow-400 text-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{selectedLeader.badge}</Badge>
                                </div>
                                <Button 
                                    variant="link" 
                                    className="p-0 h-auto font-bold text-gray-600 hover:text-black flex items-center gap-2"
                                    onClick={() => setSelectedLocation({ name: selectedLeader.location, region: selectedGame.region })}
                                >
                                    <MapPin className="h-5 w-5" />
                                    {selectedLeader.location}
                                </Button>
                                <p className="text-lg leading-relaxed text-gray-700 font-medium">{selectedLeader.description}</p>
                            </div>

                            {/* Map Preview */}
                            {locationData?.thumbnail?.source && (
                            <div className="w-full md:w-64 shrink-0">
                                <div 
                                className="overflow-hidden rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-1 hover:shadow-none transition-all"
                                onClick={() => setSelectedLocation({ name: selectedLeader.location, region: selectedGame.region })}
                                >
                                <img 
                                    src={locationData.thumbnail.source} 
                                    alt={`Map of ${selectedLeader.location}`}
                                    className="w-full h-auto object-cover aspect-video bg-white"
                                />
                                <div className="p-2 bg-black text-white text-xs text-center font-bold uppercase tracking-wider">
                                    Ver Mapa
                                </div>
                                </div>
                            </div>
                            )}
                        </div>

                        {/* Leader's Team */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-black uppercase flex items-center gap-2 border-l-4 border-red-500 pl-3">
                                <Swords className="h-6 w-6 text-red-500" />
                                Time Inimigo & Counters
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-6">
                            {selectedLeader.team.map((pokemon, idx) => (
                                <div key={idx} className="overflow-hidden rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white flex flex-col md:flex-row">
                                    {/* Enemy Pokemon Info */}
                                    <div className="md:w-1/3 p-4 bg-zinc-100 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r-2 border-black gap-3 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent opacity-50"></div>
                                        <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                            alt={pokemon.name}
                                            className="w-24 h-24 object-contain z-10 drop-shadow-md"
                                        />
                                        <div className="text-center z-10">
                                            <h4 className="font-black text-xl uppercase tracking-tight">{pokemon.name}</h4>
                                            <Badge variant="secondary" className="mt-1 border border-black/20">Lvl {pokemon.level}</Badge>
                                        </div>
                                        <div className="flex gap-1 justify-center z-10">
                                            {pokemon.types.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                                        </div>
                                    </div>

                                    {/* Counter Suggestions */}
                                    <div className="flex-1 p-4 bg-white">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                                            <Target className="h-4 w-4 text-green-600" />
                                            <h5 className="font-bold text-sm uppercase tracking-wide text-gray-500">Melhores Counters</h5>
                                        </div>
                                        
                                        {pokemon.counters ? (
                                            <div className="grid sm:grid-cols-2 gap-3">
                                            {pokemon.counters.map((counter) => (
                                                <div key={counter.id} className="flex items-start gap-3 p-2 rounded-lg border border-transparent hover:border-black/10 hover:bg-gray-50 transition-colors">
                                                <Link to={`/pokemon/${counter.id}`} className="shrink-0">
                                                    <img 
                                                    src={getPokemonImageUrl(counter.id)}
                                                    alt={counter.name}
                                                    className="w-10 h-10 object-contain"
                                                    />
                                                </Link>
                                                <div className="space-y-1 min-w-0">
                                                    <Link to={`/pokemon/${counter.id}`} className="font-bold text-sm hover:underline block truncate">
                                                        {counter.name}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 leading-tight line-clamp-2">
                                                    {counter.description}
                                                    </p>
                                                </div>
                                                </div>
                                            ))}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400 italic p-2">
                                            Sem sugestões específicas disponíveis.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Strategy Guide */}
                        <div className="border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_#FACC15] bg-zinc-50 text-black relative overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 p-32 bg-yellow-400/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6 border-b border-black/10 pb-4">
                                    <ShieldAlert className="h-6 w-6 text-yellow-600" />
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-black">Estratégia Recomendada</h3>
                                        <p className="text-sm text-gray-600">Baseado nas fraquezas do time de {selectedLeader.name}</p>
                                    </div>
                                </div>
                            
                                <div className="space-y-8">
                                    {isLoadingTypes ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <>
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-600 mb-3">Melhores Tipos:</h4>
                                            <div className="flex flex-wrap gap-3">
                                            {bestCounters.map(type => (
                                                <TypeBadge key={type} type={type} size="md" className="border-2 border-black/10" />
                                            ))}
                                            </div>
                                        </div>

                                        {selectedLeader.recommendedTeams ? (
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-600 mb-4 flex items-center gap-2">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    Time Recomendado (Escolha seu inicial)
                                                </h4>

                                                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                                                    {selectedGame?.starters?.map((starter) => (
                                                        <button
                                                            key={starter.id}
                                                            onClick={() => setSelectedStarterId(starter.id)}
                                                            className={cn(
                                                                "flex flex-col items-center p-3 rounded-xl border-2 transition-all w-full",
                                                                selectedStarterId === starter.id 
                                                                    ? "bg-yellow-50 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-105" 
                                                                    : "bg-white border-black/10 hover:bg-yellow-50/50 text-gray-500"
                                                            )}
                                                        >
                                                            <img 
                                                                src={getPokemonImageUrl(starter.id)} 
                                                                alt={starter.name}
                                                                className="w-10 h-10 object-contain mb-2"
                                                            />
                                                            <span className="font-bold text-xs uppercase">{starter.name}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                {(() => {
                                                    const activeTeam = selectedLeader.recommendedTeams.find(t => t.starterId === selectedStarterId);
                                                    
                                                    if (!activeTeam) return null;

                                                    return (
                                                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                                            <div className="p-4 rounded-lg bg-white border border-black/10 text-sm leading-relaxed text-gray-600">
                                                                <p className="font-bold text-yellow-600 mb-2 flex items-center gap-2">
                                                                    <Info className="h-4 w-4" />
                                                                    Análise:
                                                                </p>
                                                                {activeTeam.description}
                                                            </div>

                                                            <div className="grid gap-4 xl:grid-cols-2">
                                                                {activeTeam.team.map((rec) => (
                                                                <div key={rec.id} className="flex gap-4 p-4 rounded-xl border-2 border-black/10 bg-white hover:bg-yellow-50 transition-all">
                                                                    <Link to={`/pokemon/${rec.id}`} className="shrink-0 flex flex-col items-center">
                                                                        <div className="bg-gray-100 rounded-full p-2 border border-black/5">
                                                                            <img 
                                                                                src={getPokemonImageUrl(rec.id)} 
                                                                                alt={rec.name}
                                                                                className="w-12 h-12 object-contain"
                                                                            />
                                                                        </div>
                                                                        <span className="mt-2 text-[10px] font-bold uppercase bg-black px-2 py-0.5 rounded text-white">Lvl {rec.level}</span>
                                                                    </Link>
                                                                    
                                                                    <div className="space-y-2 flex-1 min-w-0">
                                                                        <div className="flex flex-wrap justify-between items-start gap-2">
                                                                            <Link to={`/pokemon/${rec.id}`} className="font-black text-lg hover:text-yellow-600 transition-colors truncate">{rec.name}</Link>
                                                                            <div className="flex gap-1">
                                                                                {rec.types.map(t => <TypeBadge key={t} type={t} size="sm" className="h-5 text-[10px] px-1.5" />)}
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                            <MapPin className="h-3 w-3" />
                                                                            <span>{rec.location}</span>
                                                                        </div>

                                                                        <p className="text-sm text-gray-600 italic border-l-2 border-yellow-400 pl-2">
                                                                            "{rec.notes}"
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-wider text-gray-600 mb-3">Sugestões:</h4>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    {suggestedPokemon.map((suggestion) => (
                                                    <div key={suggestion.type} className="space-y-2 p-3 rounded-lg bg-white border border-black/10">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-bold text-gray-500 uppercase">Usuários de</span>
                                                            <TypeBadge type={suggestion.type} size="sm" />
                                                        </div>
                                                        <div className="flex gap-2">
                                                        {suggestion.pokemon.map(p => (
                                                            <Link to={`/pokemon/${p.id}`} key={p.id}>
                                                            <div className="group relative flex flex-col items-center p-2 rounded-md bg-gray-50 border border-transparent hover:border-yellow-400 transition-colors" title={formatPokemonName(p.name)}>
                                                                <img 
                                                                src={getPokemonImageUrl(p.id)} 
                                                                alt={p.name}
                                                                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                                                                />
                                                            </div>
                                                            </Link>
                                                        ))}
                                                        </div>
                                                    </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        </div>
                    ) : (
                        <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-6 rounded-[2rem] border-4 border-dashed border-gray-300 p-8 text-center animate-in fade-in zoom-in-95 duration-500">
                            <div className="rounded-full bg-yellow-50 p-8 border-4 border-yellow-200">
                                <Trophy className="h-16 w-16 text-yellow-500" />
                            </div>
                            <div className="space-y-2 max-w-md">
                                <h3 className="text-2xl font-black uppercase text-gray-800">Selecione um Líder</h3>
                                <p className="text-gray-500 font-medium">
                                    Escolha um líder de ginásio na lista ao lado para ver seu time e descobrir as melhores estratégias para vencer.
                                </p>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
      </div>
      <LocationDialog
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        locationName={selectedLocation?.name || ''}
        region={selectedLocation?.region}
      />
    </Layout>
  );
}

function leaderTitle(leader: GymLeader) {
  return `Líder ${leader.name}`;
}