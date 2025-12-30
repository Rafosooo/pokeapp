import { useState, useEffect, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Shield, Sword, AlertTriangle, CheckCircle2, XCircle, Info, Trophy, MapPin, Lightbulb, RefreshCw, ArrowRight, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  getPokemon, 
  formatPokemonName,
  getMove,
  Pokemon,
  MoveDetail
} from '@/lib/pokeapi';
import { TYPES, TYPE_CHART, getTypeEffectiveness, PokemonType } from '@/lib/type-chart';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { GYM_DATA, GymLeader } from '@/data/gym-leaders';

// Interfaces
interface TeamSlot {
  id: string; // Unique ID for the slot
  pokemon: Pokemon | null;
  suggestedMoves?: MoveDetail[];
}

export default function TeamBuilder() {
  const [team, setTeam] = useState<TeamSlot[]>(() => {
    const saved = localStorage.getItem('pokemon-team');
    if (saved) {
      return JSON.parse(saved);
    }
    return Array(6).fill(null).map(() => ({ id: crypto.randomUUID(), pokemon: null }));
  });

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Battle Scenario State
  const [selectedGameId, setSelectedGameId] = useState<string>('general');
  const [selectedLeaderId, setSelectedLeaderId] = useState<string>('none');

  const selectedGame = useMemo(() => 
    selectedGameId === 'general' ? null : GYM_DATA.find(g => g.id === selectedGameId), 
  [selectedGameId]);

  const selectedLeader = useMemo(() => 
    selectedLeaderId === 'none' || !selectedGame 
      ? null 
      : selectedGame.leaders.find(l => l.id === selectedLeaderId),
  [selectedLeaderId, selectedGame]);

  // Save team to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokemon-team', JSON.stringify(team));
  }, [team]);

  const handleAddPokemon = (slotId: string) => {
    setActiveSlotId(slotId);
    setSearchQuery('');
    setIsSelectorOpen(true);
  };

  const handleSelectPokemon = async (pokemonName: string) => {
    try {
      // Fetch full pokemon details
      const data = await getPokemon(pokemonName);
      
      // Calculate best moves (STAB + High Power)
      // Filter for moves that match pokemon types (STAB) and are powerful attacks
      // This is a simplified logic - in a real app we would check learnsets more carefully
      const pokemonTypes = data.types.map(t => t.type.name);
      
      // Get all moves that are attacks (not status) and have power
      // Since we don't have full move details in the pokemon object, we need to fetch them
      // To save requests, we'll pick a few candidates based on known good moves or just pick top level-up moves
      
      // Strategy: Pick 4 moves that provide STAB and Coverage
      // For now, let's just pick 4 random moves from their learnset to simulate "suggestions"
      // In a real implementation we would fetch move details.
      
      // Let's try to find STAB moves from the list
      const potentialMoves = data.moves
        .filter(m => {
           // Basic filter to prioritize level-up moves
           const detail = m.version_group_details[0];
           return detail.move_learn_method.name === 'level-up' && detail.level_learned_at > 0;
        })
        .sort((a, b) => b.version_group_details[0].level_learned_at - a.version_group_details[0].level_learned_at)
        .slice(0, 4); // Take top 4 highest level moves
        
      // Fetch details for these 4 moves
      const movesDetails = await Promise.all(
        potentialMoves.map(m => getMove(m.move.name))
      );
      
      setTeam(prev => prev.map(slot => {
        if (slot.id === activeSlotId) {
          return { ...slot, pokemon: data, suggestedMoves: movesDetails };
        }
        return slot;
      }));
      
      setIsSelectorOpen(false);
      toast.success(`${formatPokemonName(data.name)} adicionado à equipe!`);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao adicionar Pokémon');
    }
  };

  const handleRemovePokemon = (slotId: string) => {
    setTeam(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return { ...slot, pokemon: null };
      }
      return slot;
    }));
  };

  const handleClearTeam = () => {
    if (confirm('Tem certeza que deseja limpar toda a equipe?')) {
      setTeam(Array(6).fill(null).map(() => ({ id: crypto.randomUUID(), pokemon: null })));
      toast.success('Equipe limpa!');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Montador de Equipe
            </h1>
            <p className="text-muted-foreground mt-1">
              Planeje sua equipe perfeita e analise suas fraquezas
            </p>
          </div>
          
          <Button variant="outline" onClick={handleClearTeam} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Limpar Equipe
          </Button>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {team.map((slot) => (
            <div 
              key={slot.id}
              className={cn(
                "relative min-h-[16rem] rounded-xl border-2 transition-all duration-300 flex flex-col items-center p-4",
                slot.pokemon 
                  ? "border-primary/50 bg-card shadow-lg h-auto justify-start" 
                  : "border-dashed border-muted-foreground/30 bg-muted/10 hover:bg-muted/20 hover:border-primary/30 cursor-pointer h-64 justify-center"
              )}
              onClick={() => !slot.pokemon && handleAddPokemon(slot.id)}
            >
              {slot.pokemon ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePokemon(slot.id);
                    }}
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                  
                  <div className="relative w-32 h-32 mb-4">
                    <img 
                      src={slot.pokemon.sprites.other['official-artwork'].front_default || slot.pokemon.sprites.front_default} 
                      alt={slot.pokemon.name}
                      className="w-full h-full object-contain drop-shadow-md animate-in zoom-in duration-300"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold capitalize mb-2">
                    {formatPokemonName(slot.pokemon.name)}
                  </h3>
                  
                  <div className="flex gap-2">
                    {slot.pokemon.types.map((t) => (
                      <TypeBadge key={t.type.name} type={t.type.name} />
                    ))}
                  </div>

                  {/* Suggested Moves */}
                  {slot.suggestedMoves && (
                    <div className="mt-4 w-full bg-muted/30 p-2 rounded-lg border border-dashed">
                      <p className="text-xs text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                        <Sword className="h-3 w-3" />
                        Sugestão de Ataques:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {slot.suggestedMoves.map(move => (
                          <div key={move.name} className="bg-background rounded px-2 py-1 border text-xs flex items-center justify-between" title={move.flavor_text_entries?.find(e => e.language.name === 'en')?.flavor_text}>
                            <span className="truncate max-w-[80px] font-medium capitalize">{formatPokemonName(move.name)}</span>
                            <TypeBadge type={move.type.name} size="sm" showLabel={false} className="h-4 w-4 p-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Plus className="h-12 w-12 opacity-50" />
                  <span className="font-medium">Adicionar Pokémon</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scenario Selector */}
        <div className="bg-card rounded-xl border p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Cenário de Batalha
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Jogo / Região</label>
              <Select value={selectedGameId} onValueChange={(val) => {
                setSelectedGameId(val);
                setSelectedLeaderId('none');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o jogo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Análise Geral (Sem oponente específico)</SelectItem>
                  {GYM_DATA.map(game => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.game} ({game.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedGameId !== 'general' && (
              <div className="flex-1 animate-in fade-in slide-in-from-left-4">
                <label className="text-sm font-medium mb-2 block">Oponente (Líder de Ginásio)</label>
                <Select value={selectedLeaderId} onValueChange={setSelectedLeaderId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o líder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Selecione um oponente...</SelectItem>
                    {selectedGame?.leaders.map(leader => (
                      <SelectItem key={leader.id} value={leader.id}>
                        {leader.name} ({leader.specialty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Section */}
        {team.some(s => s.pokemon) ? (
          <TeamAnalysis 
            team={team} 
            opponentLeader={selectedLeader || undefined} 
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Defesa da Equipe
              </h2>
              <p className="text-muted-foreground text-sm">
                Adicione Pokémon para ver a análise de resistências e fraquezas.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sword className="h-5 w-5 text-red-500" />
                Cobertura de Ataque
              </h2>
              <p className="text-muted-foreground text-sm">
                Adicione Pokémon para ver a cobertura ofensiva dos tipos.
              </p>
            </div>
          </div>
        )}

        {/* Pokemon Selector Modal */}
        <Dialog open={isSelectorOpen} onOpenChange={setIsSelectorOpen}>
          <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Escolha um Pokémon</DialogTitle>
            </DialogHeader>
            
            <div className="relative mb-4">
              <Input 
                placeholder="Buscar Pokémon..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <ScrollArea className="flex-1 pr-4">
               <PokemonListSelector 
                 query={searchQuery} 
                 onSelect={handleSelectPokemon} 
               />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}

function TeamAnalysis({ team, opponentLeader }: { team: TeamSlot[], opponentLeader?: GymLeader }) {
  const activeTeam = team.filter(slot => slot.pokemon !== null).map(slot => slot.pokemon!);

  // If fighting a specific leader
  if (opponentLeader) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-muted/30">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border bg-background">
                {opponentLeader.acePokemonId ? (
                   <img 
                     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponentLeader.acePokemonId}.png`}
                     alt="Ace"
                     className="h-full w-full object-contain p-1"
                   />
                ) : (
                  <Trophy className="h-8 w-8 m-auto opacity-50" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Vs. {opponentLeader.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {opponentLeader.location} • <TypeBadge type={opponentLeader.specialty} size="sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 grid gap-6">
            {opponentLeader.team.map((enemyPokemon, idx) => {
              // Analyze matchups for this enemy pokemon
              const enemyTypes = enemyPokemon.types as PokemonType[];
              const suggestedCounters = enemyPokemon.counters || [];
              
              // Find my best counters
              const myCounters = activeTeam.map(myMon => {
                const myTypes = myMon.types.map(t => t.type.name as PokemonType);
                
                // My Offense: Do I hit them hard?
                const offenseScore = myTypes.reduce((max, type) => {
                  const eff = getTypeEffectiveness(type, enemyTypes);
                  return Math.max(max, eff);
                }, 0);

                // My Defense: Do they hit me hard?
                // Assuming enemy has STAB moves of their types
                const defenseScore = enemyTypes.reduce((max, type) => {
                  const eff = getTypeEffectiveness(type, myTypes);
                  return Math.max(max, eff);
                }, 0);

                let score = 0;
                if (offenseScore > 1) score += 2; // Super effective
                if (offenseScore < 1) score -= 1; // Not very effective
                
                if (defenseScore > 1) score -= 2; // Weak to them
                if (defenseScore < 1) score += 1; // Resist them
                if (defenseScore === 0) score += 3; // Immune to them

                return { pokemon: myMon, score, offenseScore, defenseScore };
              }).sort((a, b) => b.score - a.score);

              const bestCounter = myCounters[0];
              const isGoodMatchup = bestCounter && bestCounter.score > 0;

              return (
                <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-accent/20">
                  {/* Enemy */}
                  <div className="flex items-center gap-4 md:w-1/3">
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${enemyPokemon.id}.png`}
                      alt={enemyPokemon.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{enemyPokemon.name}</h3>
                      <div className="flex gap-1 mt-1">
                        {enemyPokemon.types.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                        </div>
                     </div>
                  </div>

                  {/* Analysis */}
                  <div className="flex-1 flex flex-col justify-center border-l pl-4 md:pl-6 border-dashed border-muted-foreground/30">
                    <div className="flex items-center gap-2 mb-2">
                      {isGoodMatchup ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <span className="font-medium">
                        {isGoodMatchup 
                          ? `Melhor opção: ${formatPokemonName(bestCounter.pokemon.name)}` 
                          : "Veja as dicas de batalha abaixo 👇"}
                      </span>
                    </div>
                    
                    {bestCounter && (
                       <p className="text-sm text-muted-foreground">
                         {bestCounter.offenseScore > 1 && "• Causa dano Super Efetivo. "}
                         {bestCounter.defenseScore < 1 && bestCounter.defenseScore > 0 && "• Resiste aos ataques dele. "}
                         {bestCounter.defenseScore === 0 && "• Imune aos ataques dele. "}
                         {bestCounter.defenseScore > 1 && "• Mas cuidado, é fraco contra ele!"}
                       </p>
                    )}

                    {/* Suggested Counters from Data or Type Analysis */}
                    {(!isGoodMatchup || suggestedCounters.length > 0) && (
                     <div className="mt-3 pt-3 border-t border-dashed">
                       <div className="text-sm font-semibold flex items-center gap-1 text-muted-foreground mb-2">
                         <Lightbulb className="h-3 w-3" />
                         Dicas de Batalha:
                       </div>
                       <div className="space-y-2">
                         {suggestedCounters.length > 0 ? (
                             suggestedCounters.map(c => (
                               <div key={c.id} className="text-sm bg-background/50 p-2 rounded border flex gap-2">
                                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-primary">{c.name}</span>
                                  <span className="text-muted-foreground"> - {c.description}</span>
                                </div>
                              </div>
                            ))
                         ) : (
                           <div className="text-sm bg-background/50 p-2 rounded border">
                             <p className="text-muted-foreground mb-1">Este Pokémon é fraco contra:</p>
                             <div className="flex flex-wrap gap-1">
                               {TYPES.filter(atk => getTypeEffectiveness(atk, enemyTypes) > 1).map(t => (
                                 <TypeBadge key={t} type={t} size="sm" />
                               ))}
                             </div>
                           </div>
                         )}
                       </div>
                    </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // General Analysis (Existing Logic + Recommendations)
  const defenseAnalysis = TYPES.map(attackerType => {
    let weakCount = 0;
    let resistCount = 0;
    let immuneCount = 0;

    activeTeam.forEach(pokemon => {
      const pokemonTypes = pokemon.types.map(t => t.type.name as PokemonType);
      const effectiveness = getTypeEffectiveness(attackerType, pokemonTypes);

      if (effectiveness > 1) weakCount++;
      if (effectiveness < 1 && effectiveness > 0) resistCount++;
      if (effectiveness === 0) immuneCount++;
    });

    return { type: attackerType, weak: weakCount, resist: resistCount, immune: immuneCount };
  });

  const offenseAnalysis = TYPES.map(defenderType => {
    let effectiveHitters = 0;

    activeTeam.forEach(pokemon => {
      const hasSuperEffectiveSTAB = pokemon.types.some(t => {
        const attackType = t.type.name as PokemonType;
        return TYPE_CHART[attackType] && TYPE_CHART[attackType][defenderType] > 1;
      });

      if (hasSuperEffectiveSTAB) effectiveHitters++;
    });

    return { type: defenderType, count: effectiveHitters };
  });

  // Generate Recommendations
  const weaknesses = defenseAnalysis.filter(d => d.weak >= 3).map(d => d.type);
  const coverageGaps = offenseAnalysis.filter(o => o.count === 0).map(o => o.type);
  
  // Find types that are redundant (3 or more of same type)
  const typeCounts = activeTeam.reduce((acc, pokemon) => {
    pokemon.types.forEach(t => {
        acc[t.type.name] = (acc[t.type.name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  const redundantTypes = Object.entries(typeCounts)
    .filter(([_, count]) => count >= 3)
    .map(([type]) => type);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Recommendations Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 p-6 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-300 mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          Como melhorar sua equipe
        </h2>
        
        <div className="space-y-4">
            {/* Success State */}
            {weaknesses.length === 0 && coverageGaps.length === 0 && redundantTypes.length === 0 && (
                <div className="flex items-center gap-3 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                    <div>
                        <span className="font-bold">Equipe Equilibrada!</span>
                        <p className="text-sm opacity-90">Sua equipe tem ótima cobertura ofensiva e defensiva. Parabéns!</p>
                    </div>
                </div>
            )}

            {/* Critical Weaknesses */}
            {weaknesses.map(type => {
                const resistants = TYPES.filter(t => getTypeEffectiveness(type, [t]) < 1);
                return (
                    <div key={type} className="flex gap-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-900/50">
                        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                        <div>
                            <span className="font-bold text-red-800 dark:text-red-300">Perigo contra <span className="uppercase">{type}</span></span>
                            <p className="text-sm text-red-700/80 dark:text-red-400 mt-1 mb-2">
                                Metade da sua equipe é fraca contra este tipo. Se enfrentar um líder de {type}, você terá problemas.
                            </p>
                            <div className="text-sm font-medium text-red-800 dark:text-red-300 flex flex-wrap items-center gap-2">
                                👉 Adicione um Pokémon dos tipos:
                                {resistants.slice(0, 3).map(r => <TypeBadge key={r} type={r} size="sm" />)}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Coverage Gaps */}
            {coverageGaps.length > 0 && coverageGaps.length < 5 && (
                <div className="flex gap-3 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-900/50">
                    <Sword className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
                    <div>
                        <span className="font-bold text-orange-800 dark:text-orange-300">Ofensiva Limitada</span>
                        <p className="text-sm text-orange-700/80 dark:text-orange-400 mt-1 mb-2">
                            Você não tem golpes super efetivos contra:
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                             {coverageGaps.map(t => <TypeBadge key={t} type={t} size="sm" />)}
                        </div>
                        <div className="text-sm font-medium text-orange-800 dark:text-orange-300">
                            👉 Tente ensinar golpes desses tipos:
                            <div className="flex flex-wrap gap-1 mt-1">
                                {coverageGaps.map(gap => {
                                    // Find types that are super effective against the gap
                                    const counters = TYPES.filter(atk => getTypeEffectiveness(atk, [gap]) > 1);
                                    return counters.slice(0, 1).map(c => <TypeBadge key={`${gap}-${c}`} type={c} size="sm" />);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Redundancy */}
            {redundantTypes.map(type => (
                 <div key={type} className="flex gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <RefreshCw className="h-5 w-5 text-blue-500 shrink-0 mt-1" />
                    <div>
                        <span className="font-bold text-blue-800 dark:text-blue-300">Muitos Pokémon do tipo <span className="uppercase">{type}</span></span>
                        <p className="text-sm text-blue-700/80 dark:text-blue-400 mt-1">
                            Ter 3 ou mais Pokémon do mesmo tipo aumenta suas fraquezas compartilhadas. Tente variar para ter mais cobertura.
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Defense Section */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Defesa da Equipe
            <span className="text-xs font-normal text-muted-foreground ml-2">
              (Quantos Pokémon resistem ou são fracos a cada tipo)
            </span>
          </h2>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                        <th className="p-3 font-medium">Tipo Atacante</th>
                        <th className="p-3 font-medium text-center text-green-600">Resiste</th>
                        <th className="p-3 font-medium text-center text-red-600">Fraco</th>
                        <th className="p-3 font-medium text-center text-blue-600">Imune</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {defenseAnalysis.map((stat) => (
                        <tr key={stat.type} className="hover:bg-muted/10">
                            <td className="p-2 pl-4">
                                <TypeBadge type={stat.type} size="sm" />
                            </td>
                            <td className="p-2 text-center font-medium">
                                {stat.resist > 0 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        {stat.resist}
                                    </span>
                                ) : '-'}
                            </td>
                            <td className="p-2 text-center font-medium">
                                {stat.weak > 0 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                        {stat.weak}
                                    </span>
                                ) : '-'}
                            </td>
                            <td className="p-2 text-center font-medium">
                                {stat.immune > 0 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        {stat.immune}
                                    </span>
                                ) : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Offense Section */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/30">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sword className="h-5 w-5 text-red-500" />
            Cobertura de Ataque
            <span className="text-xs font-normal text-muted-foreground ml-2">
              (Quantos Pokémon têm STAB super efetivo contra...)
            </span>
          </h2>
        </div>
        
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {offenseAnalysis.map((stat) => (
                <div key={stat.type} className="flex items-center justify-between p-2 rounded-lg border bg-card hover:bg-muted/20 transition-colors">
                    <TypeBadge type={stat.type} size="sm" />
                    <span className={cn(
                        "font-bold text-sm h-6 w-6 flex items-center justify-center rounded-full",
                        stat.count > 0 
                            ? "bg-primary/10 text-primary" 
                            : "bg-muted text-muted-foreground"
                    )}>
                        {stat.count}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 18 18" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PokemonListSelector({ query, onSelect }: { query: string, onSelect: (name: string) => void }) {
  const { data: allPokemon, isLoading } = useQuery({
    queryKey: ['all-pokemon-list'],
    queryFn: async () => {
      // Fetch a large list to search client-side for better UX in this context
      // Or we could use the search endpoint if we want to be more efficient with data
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      return data.results as { name: string, url: string }[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  const filtered = allPokemon?.filter(p => p.name.includes(query.toLowerCase())) || [];
  const displayList = filtered.slice(0, 50); // Limit rendering

  return (
    <div className="grid grid-cols-1 gap-2">
      {displayList.map((p) => {
        const id = p.url.split('/').filter(Boolean).pop();
        return (
          <Button
            key={p.name}
            variant="ghost"
            className="justify-start h-auto py-3 px-4"
            onClick={() => onSelect(p.name)}
          >
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={p.name}
              className="w-10 h-10 mr-4"
            />
            <div className="text-left">
              <div className="font-bold capitalize">{formatPokemonName(p.name)}</div>
              <div className="text-xs text-muted-foreground">#{id}</div>
            </div>
          </Button>
        );
      })}
      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          Nenhum Pokémon encontrado.
        </div>
      )}
    </div>
  );
}
