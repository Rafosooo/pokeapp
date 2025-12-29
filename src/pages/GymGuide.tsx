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
import { GYM_DATA, GymLeader, PokemonTeamMember } from '@/data/gym-leaders';
import {
  getType,
  getIdFromUrl,
  formatPokemonName,
  getPokemonImageUrl
} from '@/lib/pokeapi';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      // For each pokemon, find what it is weak against
      // A pokemon has 1 or 2 types.
      // We need to check defense relations for those types.
      
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
          scores[attackerType] += multiplier; // Add the multiplier (e.g., +2 or +4)
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

  // Suggest Pokemon for the Best Types (Simple filter from fetched type data)
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
      <div className="container mx-auto p-4 pb-24 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Guia de Ginásios</h1>
        <p className="text-muted-foreground">
          Descubra os melhores times e estratégias para vencer cada líder de ginásio.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedGameId} onValueChange={setSelectedGameId}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione o jogo" />
          </SelectTrigger>
          <SelectContent>
            {GYM_DATA.map(game => (
              <SelectItem key={game.id} value={game.id}>
                <span>{game.game} ({game.region})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedGame?.image && (
          <img 
            src={selectedGame.image} 
            alt={selectedGame.game} 
            className="h-12 w-auto object-contain rounded-md shadow-sm border bg-muted"
          />
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Gym Leaders List */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Líderes de Ginásio</CardTitle>
              <CardDescription>Selecione um líder para ver detalhes</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="flex flex-col">
                  {selectedGame?.leaders.map((leader) => (
                    <button
                      key={leader.id}
                      onClick={() => setSelectedLeaderId(leader.id)}
                      className={`flex items-center gap-4 p-4 text-left transition-colors hover:bg-accent/50 ${
                        selectedLeaderId === leader.id ? 'bg-accent border-l-4 border-primary' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-muted">
                        {leader.acePokemonId ? (
                          <img
                            src={getPokemonImageUrl(leader.acePokemonId)}
                            alt={`${leader.name}'s Ace`}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-secondary">
                            <Trophy className="h-6 w-6 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{leader.name}</span>
                          <TypeBadge type={leader.specialty} size="sm" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {leader.location} • {leader.badge}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details & Strategy */}
        <div className="lg:col-span-8 space-y-6">
          {selectedLeader ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold">{leaderTitle(selectedLeader)}</h2>
                    <Badge variant="outline" className="text-base">{selectedLeader.badge}</Badge>
                  </div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal text-muted-foreground hover:text-primary flex items-center gap-2"
                    onClick={() => setSelectedLocation({ name: selectedLeader.location, region: selectedGame.region })}
                  >
                    <MapPin className="h-4 w-4" />
                    {selectedLeader.location}
                  </Button>
                  <p className="text-lg">{selectedLeader.description}</p>
                </div>

                {/* Map Preview */}
                {locationData?.thumbnail?.source && (
                  <div className="w-full md:w-64 shrink-0">
                    <div 
                      className="overflow-hidden rounded-lg border bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      onClick={() => setSelectedLocation({ name: selectedLeader.location, region: selectedGame.region })}
                    >
                      <img 
                        src={locationData.thumbnail.source} 
                        alt={`Map of ${selectedLeader.location}`}
                        className="w-full h-auto object-cover aspect-video"
                      />
                      <div className="p-2 bg-background/80 text-xs text-center text-muted-foreground backdrop-blur-sm">
                        Clique para ampliar o mapa
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Leader's Team */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Swords className="h-5 w-5 text-red-500" />
                  Time Inimigo & Counters
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {selectedLeader.team.map((pokemon, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Enemy Pokemon Info */}
                        <div className="md:w-1/3 p-4 bg-muted/30 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r gap-3">
                          <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.name}
                            className="w-24 h-24 object-contain"
                          />
                          <div className="text-center">
                            <h4 className="font-bold text-lg">{pokemon.name}</h4>
                            <p className="text-sm text-muted-foreground">Lvl {pokemon.level}</p>
                          </div>
                          <div className="flex gap-1 justify-center">
                            {pokemon.types.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                          </div>
                        </div>

                        {/* Counter Suggestions */}
                        <div className="flex-1 p-4 bg-card">
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="h-4 w-4 text-green-600" />
                            <h5 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Melhores Counters</h5>
                          </div>
                          
                          {pokemon.counters ? (
                            <div className="space-y-3">
                              {pokemon.counters.map((counter) => (
                                <div key={counter.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                                  <Link to={`/pokemon/${counter.id}`} className="shrink-0">
                                    <img 
                                      src={getPokemonImageUrl(counter.id)}
                                      alt={counter.name}
                                      className="w-10 h-10 object-contain"
                                    />
                                  </Link>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <Link to={`/pokemon/${counter.id}`} className="font-medium hover:underline text-sm">
                                        {counter.name}
                                      </Link>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                      {counter.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground italic">
                              Sem sugestões específicas disponíveis.
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Strategy Guide */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <ShieldAlert className="h-5 w-5" />
                    Estratégia Recomendada
                  </CardTitle>
                  <CardDescription>
                    Baseado nas fraquezas do time de {selectedLeader.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingTypes ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <div>
                        <h4 className="font-semibold mb-3">Melhores Tipos para usar:</h4>
                        <div className="flex flex-wrap gap-2">
                          {bestCounters.map(type => (
                            <div key={type} className="flex flex-col items-center gap-1">
                                <TypeBadge type={type} size="md" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator className="bg-primary/10" />

                      {selectedLeader.recommendedTeams ? (
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                            <ThumbsUp className="h-5 w-5 text-green-600" />
                            Time Recomendado
                          </h4>

                          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                            {selectedGame?.starters?.map((starter) => (
                                <button
                                    key={starter.id}
                                    onClick={() => setSelectedStarterId(starter.id)}
                                    className={`
                                        flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 transition-all w-full
                                        ${selectedStarterId === starter.id ? `${starter.color} scale-105 shadow-md` : 'bg-background border-transparent hover:bg-accent'}
                                    `}
                                >
                                    <img 
                                        src={getPokemonImageUrl(starter.id)} 
                                        alt={starter.name}
                                        className="w-8 h-8 sm:w-12 sm:h-12 object-contain mb-1 sm:mb-2"
                                    />
                                    <span className="font-medium text-xs sm:text-sm">{starter.name}</span>
                                </button>
                            ))}
                          </div>

                          {(() => {
                            const activeTeam = selectedLeader.recommendedTeams.find(t => t.starterId === selectedStarterId);
                            
                            if (!activeTeam) return (
                                <p className="text-center text-muted-foreground italic">Selecione um inicial para ver o time recomendado.</p>
                            );

                            // Find current starter color style
                            const currentStarter = selectedGame?.starters?.find(s => s.id === selectedStarterId);
                            const infoBoxStyle = currentStarter 
                                ? currentStarter.color.replace('hover:', '').split(' ').filter(c => !c.startsWith('hover:')).join(' ')
                                : 'bg-blue-50 text-blue-800 border border-blue-200';

                            return (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                    <div className={`p-3 rounded-md mb-4 text-sm ${infoBoxStyle.replace('bg-', 'bg-opacity-20 bg-')}`}>
                                        <p className="font-medium flex items-center gap-2">
                                            <Info className="h-4 w-4" />
                                            Análise do Inicial:
                                        </p>
                                        <p className="mt-1">{activeTeam.description}</p>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-2">
                                        {activeTeam.team.map((rec) => (
                                        <div key={rec.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card/80 hover:bg-accent/20 transition-all hover:shadow-md">
                                            <Link to={`/pokemon/${rec.id}`} className="shrink-0 flex flex-col items-center">
                                            <div className="bg-background rounded-full p-2 border shadow-sm">
                                                <img 
                                                src={getPokemonImageUrl(rec.id)} 
                                                alt={rec.name}
                                                className="w-16 h-16 object-contain"
                                                />
                                            </div>
                                            <Badge variant="outline" className="mt-2 text-[10px] uppercase">Lvl {rec.level}</Badge>
                                            </Link>
                                            
                                            <div className="space-y-2 flex-1 min-w-0">
                                            <div className="flex flex-wrap justify-between items-start gap-2">
                                                <Link to={`/pokemon/${rec.id}`} className="font-bold hover:underline text-lg truncate">{rec.name}</Link>
                                                <div className="flex gap-1 shrink-0">
                                                {rec.types.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <MapPin className="h-3 w-3" />
                                                <span>{rec.location}</span>
                                            </div>

                                            <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-2 italic">
                                                "{rec.notes}"
                                            </p>

                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {rec.keyMoves.map(move => (
                                                <Badge key={move} variant="secondary" className="text-xs">
                                                    {move}
                                                </Badge>
                                                ))}
                                            </div>
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
                          <h4 className="font-semibold mb-3">Sugestões por Tipo:</h4>
                          <div className="grid gap-4 md:grid-cols-2">
                            {suggestedPokemon.map((suggestion) => (
                              <div key={suggestion.type} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">Usuários de</span>
                                  <TypeBadge type={suggestion.type} size="sm" />
                                </div>
                                <div className="flex gap-2">
                                  {suggestion.pokemon.map(p => (
                                    <Link to={`/pokemon/${p.id}`} key={p.id}>
                                      <div className="group relative flex flex-col items-center p-2 rounded-md border bg-background hover:bg-accent transition-colors" title={formatPokemonName(p.name)}>
                                        <img 
                                          src={getPokemonImageUrl(p.id)} 
                                          alt={p.name}
                                          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
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
                      
                      <div className="flex items-start gap-2 p-3 rounded-md bg-yellow-500/10 text-yellow-600 text-sm">
                        <Info className="h-4 w-4 mt-0.5 shrink-0" />
                        <p>
                          Dica: Tente capturar e treinar estes Pokémons antes de desafiar o ginásio. 
                          Certifique-se de que eles tenham golpes do tipo correspondente!
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

            </div>
          ) : (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="rounded-full bg-secondary p-4">
                <Trophy className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Selecione um Líder</h3>
                <p className="text-muted-foreground max-w-sm">
                  Escolha um líder de ginásio na lista ao lado para ver seu time e descobrir as melhores estratégias para vencer.
                </p>
              </div>
            </div>
          )}
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
