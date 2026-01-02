import { useState, useEffect, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Shield, Sword, AlertTriangle, CheckCircle2, XCircle, Info, Trophy, MapPin, Lightbulb, RefreshCw, ArrowRight, Search, Save } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [selectedGameId, setSelectedGameId] = useState<string>(() => {
    const saved = localStorage.getItem('team-builder-scenario');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.gameId || 'general';
      } catch { return 'general'; }
    }
    return 'general';
  });
  
  const [selectedLeaderId, setSelectedLeaderId] = useState<string>(() => {
    const saved = localStorage.getItem('team-builder-scenario');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.leaderId || 'none';
      } catch { return 'none'; }
    }
    return 'none';
  });

  // Save/Load Logic
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState('');

  // Persist scenario changes
  useEffect(() => {
    localStorage.setItem('team-builder-scenario', JSON.stringify({
      gameId: selectedGameId,
      leaderId: selectedLeaderId
    }));
  }, [selectedGameId, selectedLeaderId]);

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

  const handleSaveTeam = () => {
    if (!teamName.trim()) {
      toast.error('Digite um nome para o time');
      return;
    }

    const newTeam = {
      id: crypto.randomUUID(),
      name: teamName,
      team,
      gameId: selectedGameId,
      leaderId: selectedLeaderId,
      createdAt: Date.now()
    };

    const existingTeams = JSON.parse(localStorage.getItem('saved-teams') || '[]');
    localStorage.setItem('saved-teams', JSON.stringify([...existingTeams, newTeam]));
    
    setIsSaveDialogOpen(false);
    setTeamName('');
    toast.success('Time salvo com sucesso!');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_#DC2626]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-4 border-black pb-8">
               <div className="flex items-center gap-6">
                 {/* Poké Ball Icon - Red (Standard) */}
                 <div className="relative h-20 w-20 shrink-0 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    {/* Top Red Half */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#DC2626] border-b-4 border-black"></div>
                    {/* Center Button */}
                    <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-sm">
                      <div className="h-2 w-2 bg-zinc-400 rounded-full"></div>
                    </div>
                 </div>
                 
                 <div>
                   <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                     Montador de Equipe
                   </h1>
                   <p className="text-lg font-medium text-gray-600">
                     Construa, planeje e analise sua equipe perfeita
                   </p>
                 </div>
               </div>

               <div className="flex flex-wrap gap-4">
                 <Button 
                   variant="outline"
                   onClick={handleClearTeam}
                   className="h-14 px-6 text-lg font-bold border-4 border-black text-red-600 hover:bg-red-50 hover:text-red-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all rounded-xl"
                 >
                   <Trash2 className="mr-2 h-5 w-5" />
                   Limpar
                 </Button>
                 <Button 
                   onClick={() => setIsSaveDialogOpen(true)}
                   className="h-14 px-8 text-lg font-black border-4 border-black bg-[#DC2626] text-white hover:bg-[#b91c1c] hover:text-white shadow-[6px_6px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all rounded-xl"
                 >
                   <Save className="mr-2 h-5 w-5" />
                   Salvar Time
                 </Button>
               </div>
            </div>

            {/* Save Team Dialog */}
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black uppercase tracking-tight">Salvar Time</DialogTitle>
                  <DialogDescription className="font-medium text-zinc-600">
                    Dê um nome para sua equipe para encontrá-la facilmente depois.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="team-name" className="font-bold uppercase tracking-wide">Nome da Equipe</Label>
                    <Input 
                      id="team-name" 
                      value={teamName} 
                      onChange={(e) => setTeamName(e.target.value)} 
                      placeholder="Ex: Time para Elite 4" 
                      className="border-2 border-black h-12 font-medium"
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveTeam()}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)} className="border-2 border-black font-bold">Cancelar</Button>
                  <Button onClick={handleSaveTeam} className="border-2 border-black bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold shadow-[4px_4px_0px_0px_#000]">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {team.map((slot) => (
                <div 
                  key={slot.id}
                  className={cn(
                    "relative min-h-[18rem] rounded-[1.5rem] transition-all duration-300 flex flex-col items-center p-6 group",
                    slot.pokemon 
                      ? "border-4 border-black bg-white shadow-[8px_8px_0px_0px_#DC2626] hover:-translate-y-1 h-auto justify-start" 
                      : "border-4 border-dashed border-zinc-300 bg-zinc-50 hover:bg-red-50 hover:border-red-400 cursor-pointer h-80 justify-center hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]"
                  )}
                  onClick={() => !slot.pokemon && handleAddPokemon(slot.id)}
                >
                  {slot.pokemon ? (
                    <>
                      {/* Card Background Decoration */}
                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-red-50 to-transparent rounded-t-[1.2rem] -z-0 pointer-events-none"></div>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-3 right-3 text-zinc-400 hover:text-red-600 hover:bg-red-100 rounded-full h-10 w-10 border-2 border-transparent hover:border-red-200 transition-all z-20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePokemon(slot.id);
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                      
                      <div className="relative w-40 h-40 mb-4 z-10 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={slot.pokemon.sprites.other['official-artwork'].front_default || slot.pokemon.sprites.front_default} 
                          alt={slot.pokemon.name}
                          className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                        />
                      </div>
                      
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-center z-10 text-zinc-900">
                        {formatPokemonName(slot.pokemon.name)}
                      </h3>
                      
                      <div className="flex gap-2 z-10 mb-6">
                        {slot.pokemon.types.map((t) => (
                          <TypeBadge key={t.type.name} type={t.type.name} className="px-3 py-1 text-sm border-2 border-black shadow-sm" />
                        ))}
                      </div>

                      {/* Suggested Moves */}
                      {slot.suggestedMoves && (
                        <div className="w-full bg-zinc-50 p-4 rounded-xl border-2 border-black/10 z-10">
                          <p className="text-xs text-zinc-500 font-black mb-3 flex items-center gap-2 uppercase tracking-widest">
                            <Sword className="h-3 w-3 text-red-500" />
                            Ataques Recomendados
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {slot.suggestedMoves.map(move => (
                              <div key={move.name} className="bg-white rounded-lg px-3 py-2 border-2 border-zinc-200 text-xs flex items-center justify-between shadow-sm hover:border-red-300 hover:shadow-md transition-all cursor-help" title={move.flavor_text_entries?.find(e => e.language.name === 'en')?.flavor_text}>
                                <span className="truncate max-w-[90px] font-bold capitalize text-zinc-700">{formatPokemonName(move.name)}</span>
                                <TypeBadge type={move.type.name} size="sm" showLabel={false} className="h-5 w-5 p-0 border border-black/20" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-zinc-400 group-hover:text-red-500 transition-colors">
                      <div className="h-20 w-20 rounded-full border-4 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform bg-white">
                        <Plus className="h-10 w-10" />
                      </div>
                      <span className="font-black text-xl uppercase tracking-wide">Adicionar Pokémon</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Scenario Selector */}
            <div className="bg-white rounded-[1.5rem] border-4 border-black p-8 mb-12 shadow-[8px_8px_0px_0px_#FACC15]">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3 text-black">
                <Trophy className="h-8 w-8 text-yellow-500 fill-yellow-500 stroke-black stroke-2" />
                Cenário de Batalha
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="text-sm font-black uppercase tracking-wider mb-3 block text-zinc-500">Jogo / Região</label>
                  <Select value={selectedGameId} onValueChange={(val) => {
                    setSelectedGameId(val);
                    setSelectedLeaderId('none');
                  }}>
                    <SelectTrigger className="border-4 border-black h-14 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-white rounded-xl">
                      <SelectValue placeholder="Selecione o jogo" />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <SelectItem value="general" className="font-bold py-3">Análise Geral (Sem oponente específico)</SelectItem>
                      {GYM_DATA.map(game => (
                        <SelectItem key={game.id} value={game.id} className="font-bold py-3">
                          {game.game} ({game.region})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedGameId !== 'general' && (
                  <div className="flex-1 animate-in fade-in slide-in-from-left-4">
                    <label className="text-sm font-black uppercase tracking-wider mb-3 block text-zinc-500">Oponente (Líder de Ginásio)</label>
                    <Select value={selectedLeaderId} onValueChange={setSelectedLeaderId}>
                      <SelectTrigger className="border-4 border-black h-14 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-white rounded-xl">
                        <SelectValue placeholder="Selecione o líder" />
                      </SelectTrigger>
                      <SelectContent className="border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <SelectItem value="none" className="font-bold py-3">Selecione um oponente...</SelectItem>
                        {selectedGame?.leaders.map(leader => (
                          <SelectItem key={leader.id} value={leader.id} className="font-bold py-3">
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
                <div className="bg-white rounded-[1.5rem] p-8 border-4 border-black shadow-[8px_8px_0px_0px_#2563EB]">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <Shield className="h-8 w-8 text-blue-600 stroke-[2.5]" />
                    Defesa da Equipe
                  </h2>
                  <p className="text-zinc-600 font-medium text-lg leading-relaxed">
                    Adicione Pokémon para ver a análise detalhada de resistências, fraquezas e imunidades do seu time.
                  </p>
                </div>

                <div className="bg-white rounded-[1.5rem] p-8 border-4 border-black shadow-[8px_8px_0px_0px_#DC2626]">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <Sword className="h-8 w-8 text-red-600 stroke-[2.5]" />
                    Cobertura de Ataque
                  </h2>
                  <p className="text-zinc-600 font-medium text-lg leading-relaxed">
                    Descubra quais tipos seu time consegue atingir com super efetividade e identifique lacunas ofensivas.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Pokemon Selector Modal */}
        <Dialog open={isSelectorOpen} onOpenChange={setIsSelectorOpen}>
          <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl p-0 overflow-hidden bg-zinc-50">
            <DialogHeader className="p-6 pb-2 bg-white border-b-4 border-black">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">Escolha um Pokémon</DialogTitle>
            </DialogHeader>
            
            <div className="p-4 bg-white border-b-2 border-zinc-200">
              <div className="relative">
                <Input 
                  placeholder="Buscar Pokémon..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-2 border-black rounded-lg font-medium shadow-sm focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
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
        <div className="bg-white rounded-[1.5rem] border-4 border-black shadow-[12px_12px_0px_0px_#DC2626] overflow-hidden">
          <div className="p-4 md:p-8 border-b-4 border-black bg-red-50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-black bg-white shadow-sm">
                {opponentLeader.acePokemonId ? (
                   <img 
                     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponentLeader.acePokemonId}.png`}
                     alt="Ace"
                     className="h-full w-full object-contain p-1"
                   />
                ) : (
                  <Trophy className="h-10 w-10 m-auto opacity-50" />
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-black mb-2">Vs. {opponentLeader.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-600 font-bold uppercase text-sm bg-white px-3 py-1 rounded-full border-2 border-black inline-flex">
                  <MapPin className="h-4 w-4" />
                  {opponentLeader.location} • <TypeBadge type={opponentLeader.specialty} size="sm" showLabel={true} className="border-none shadow-none p-0" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 grid gap-4">
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
                <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  {/* Enemy */}
                  <div className="flex items-center gap-4 md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-zinc-100 pb-4 md:pb-0 md:pr-4 min-w-0">
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${enemyPokemon.id}.png`}
                      alt={enemyPokemon.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-black text-lg md:text-xl uppercase tracking-tight text-zinc-900 truncate" title={enemyPokemon.name}>{enemyPokemon.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1 md:mt-2">
                        {enemyPokemon.types.map(t => <TypeBadge key={t} type={t} size="sm" className="border border-black shadow-none" />)}
                        </div>
                     </div>
                  </div>

                  {/* Analysis */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-start md:items-center gap-3 mb-3">
                      {isGoodMatchup ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 border-2 border-black flex items-center justify-center shrink-0 mt-1 md:mt-0">
                           <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-yellow-100 border-2 border-black flex items-center justify-center shrink-0 mt-1 md:mt-0">
                           <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        </div>
                      )}
                      <span className="font-bold text-lg text-zinc-900 leading-tight">
                        {isGoodMatchup 
                          ? `Melhor opção: ${formatPokemonName(bestCounter.pokemon.name)}` 
                          : "Veja as dicas de batalha abaixo 👇"}
                      </span>
                    </div>
                    
                    {bestCounter && (
                       <p className="text-sm text-zinc-600 font-medium ml-0 pl-11 md:ml-0 md:pl-11 -mt-1 mb-2">
                         {bestCounter.offenseScore > 1 && "• Causa dano Super Efetivo. "}
                         {bestCounter.defenseScore < 1 && bestCounter.defenseScore > 0 && "• Resiste aos ataques dele. "}
                         {bestCounter.defenseScore === 0 && "• Imune aos ataques dele. "}
                         {bestCounter.defenseScore > 1 && "• Mas cuidado, é fraco contra ele!"}
                       </p>
                    )}

                    {/* Suggested Counters from Data or Type Analysis */}
                    {(!isGoodMatchup || suggestedCounters.length > 0) && (
                     <div className="mt-2 pt-4 border-t-2 border-dashed border-zinc-200 ml-0 md:ml-11">
                       <div className="text-xs font-black flex items-center gap-1 text-zinc-400 mb-3 uppercase tracking-widest">
                         <Lightbulb className="h-3 w-3" />
                         Dicas de Batalha
                       </div>
                       <div className="space-y-3">
                         {suggestedCounters.length > 0 ? (
                             suggestedCounters.map(c => (
                               <div key={c.id} className="text-sm bg-zinc-50 p-3 rounded-lg border-2 border-zinc-200 flex gap-3 items-start group hover:border-blue-300 transition-colors">
                                <ArrowRight className="h-4 w-4 text-blue-500 shrink-0 mt-1" />
                                <div>
                                  <span className="font-bold text-blue-700 block mb-1">{c.name}</span>
                                  <span className="text-zinc-600 font-medium leading-relaxed block">{c.description}</span>
                                </div>
                              </div>
                            ))
                         ) : (
                           <div className="text-sm bg-zinc-50 p-3 rounded-lg border-2 border-zinc-200">
                             <p className="text-zinc-600 font-bold mb-2 uppercase text-xs tracking-wide">Este Pokémon é fraco contra:</p>
                             <div className="flex flex-wrap gap-2">
                               {TYPES.filter(atk => getTypeEffectiveness(atk, enemyTypes) > 1).map(t => (
                                 <TypeBadge key={t} type={t} size="sm" className="border border-black/20" />
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
      <div className="bg-blue-50/50 rounded-[1.5rem] border-4 border-black p-8 shadow-[8px_8px_0px_0px_#2563EB]">
        <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-blue-900 mb-6">
          <Lightbulb className="h-8 w-8 text-yellow-500 fill-yellow-500 stroke-black stroke-2" />
          Como melhorar sua equipe
        </h2>
        
        <div className="space-y-4">
            {/* Success State */}
            {weaknesses.length === 0 && coverageGaps.length === 0 && redundantTypes.length === 0 && (
                <div className="flex items-center gap-4 text-green-900 bg-green-100 p-6 rounded-xl border-4 border-black shadow-sm">
                    <CheckCircle2 className="h-8 w-8 shrink-0 fill-green-500 text-white" />
                    <div>
                        <span className="font-black uppercase text-xl">Equipe Equilibrada!</span>
                        <p className="text-base font-medium opacity-90 mt-1">Sua equipe tem ótima cobertura ofensiva e defensiva. Parabéns!</p>
                    </div>
                </div>
            )}

            {/* Critical Weaknesses */}
            {weaknesses.map(type => {
                const resistants = TYPES.filter(t => getTypeEffectiveness(type, [t]) < 1);
                return (
                    <div key={type} className="flex gap-4 bg-red-100 p-6 rounded-xl border-4 border-black shadow-sm">
                        <AlertTriangle className="h-8 w-8 text-red-600 shrink-0 mt-1 fill-red-200" />
                        <div>
                            <span className="font-black text-red-900 uppercase text-lg">Perigo contra {type}</span>
                            <p className="text-base text-red-800 font-medium mt-2 mb-3">
                                Metade da sua equipe é fraca contra este tipo. Se enfrentar um líder de {type}, você terá problemas.
                            </p>
                            <div className="text-sm font-bold text-red-900 flex flex-wrap items-center gap-2 bg-white/50 p-2 rounded-lg inline-flex">
                                👉 Adicione um Pokémon dos tipos:
                                {resistants.slice(0, 3).map(r => <TypeBadge key={r} type={r} size="sm" />)}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Coverage Gaps */}
            {coverageGaps.length > 0 && coverageGaps.length < 5 && (
                <div className="flex gap-4 bg-orange-100 p-6 rounded-xl border-4 border-black shadow-sm">
                    <Sword className="h-8 w-8 text-orange-600 shrink-0 mt-1 fill-orange-200" />
                    <div>
                        <span className="font-black text-orange-900 uppercase text-lg">Ofensiva Limitada</span>
                        <p className="text-base text-orange-800 font-medium mt-2 mb-3">
                            Você não tem golpes super efetivos contra:
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                             {coverageGaps.map(t => <TypeBadge key={t} type={t} size="sm" className="border border-black/10 shadow-sm" />)}
                        </div>
                        <div className="text-sm font-bold text-orange-900 bg-white/50 p-3 rounded-lg">
                            👉 Tente ensinar golpes desses tipos:
                            <div className="flex flex-wrap gap-2 mt-2">
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
                 <div key={type} className="flex gap-4 bg-blue-100 p-6 rounded-xl border-4 border-black shadow-sm">
                    <RefreshCw className="h-8 w-8 text-blue-600 shrink-0 mt-1" />
                    <div>
                        <span className="font-black text-blue-900 uppercase text-lg">Muitos Pokémon do tipo {type}</span>
                        <p className="text-base text-blue-800 font-medium mt-2">
                            Ter 3 ou mais Pokémon do mesmo tipo aumenta suas fraquezas compartilhadas. Tente variar para ter mais cobertura.
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Defense Section */}
      <div className="bg-white rounded-[1.5rem] border-4 border-black shadow-[8px_8px_0px_0px_#2563EB] overflow-hidden">
        <div className="p-6 border-b-4 border-black bg-blue-50">
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-blue-900">
            <Shield className="h-8 w-8 text-blue-600 fill-blue-200" />
            Defesa da Equipe
            <span className="text-sm font-bold text-blue-700/70 ml-2 normal-case tracking-normal hidden md:inline-block">
              (Quantos Pokémon resistem ou são fracos a cada tipo)
            </span>
          </h2>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-zinc-100 text-zinc-900 border-b-4 border-black">
                    <tr>
                        <th className="p-4 font-black uppercase text-xs tracking-wider">Tipo Atacante</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider text-center text-green-700 bg-green-50">Resiste</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider text-center text-red-700 bg-red-50">Fraco</th>
                        <th className="p-4 font-black uppercase text-xs tracking-wider text-center text-blue-700 bg-blue-50">Imune</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-zinc-100">
                    {defenseAnalysis.map((stat) => (
                        <tr key={stat.type} className="hover:bg-blue-50/50 font-medium transition-colors">
                            <td className="p-3 pl-6 border-r-2 border-zinc-100">
                                <TypeBadge type={stat.type} size="sm" />
                            </td>
                            <td className="p-3 text-center border-r-2 border-zinc-100">
                                {stat.resist > 0 ? (
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 border-black bg-green-100 text-green-900 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                        {stat.resist}
                                    </span>
                                ) : <span className="text-zinc-300 font-bold text-lg">·</span>}
                            </td>
                            <td className="p-3 text-center border-r-2 border-zinc-100">
                                {stat.weak > 0 ? (
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 border-black bg-red-100 text-red-900 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                        {stat.weak}
                                    </span>
                                ) : <span className="text-zinc-300 font-bold text-lg">·</span>}
                            </td>
                            <td className="p-3 text-center">
                                {stat.immune > 0 ? (
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 border-black bg-blue-100 text-blue-900 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                        {stat.immune}
                                    </span>
                                ) : <span className="text-zinc-300 font-bold text-lg">·</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Offense Section */}
      <div className="bg-white rounded-[1.5rem] border-4 border-black shadow-[8px_8px_0px_0px_#DC2626] overflow-hidden">
        <div className="p-6 border-b-4 border-black bg-red-50">
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-red-900">
            <Sword className="h-8 w-8 text-red-600 fill-red-200" />
            Cobertura de Ataque
            <span className="text-sm font-bold text-red-700/70 ml-2 normal-case tracking-normal hidden md:inline-block">
              (Quantos Pokémon têm STAB super efetivo contra...)
            </span>
          </h2>
        </div>
        
        <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {offenseAnalysis.map((stat) => (
                <div key={stat.type} className="flex items-center justify-between p-4 rounded-xl border-4 border-black bg-white hover:bg-red-50 hover:-translate-y-1 transition-all shadow-sm group cursor-default">
                    <TypeBadge type={stat.type} size="sm" className="border-none shadow-none" />
                    <span className={cn(
                        "font-black text-sm h-8 w-8 flex items-center justify-center rounded-lg border-2 border-black transition-all",
                        stat.count > 0 
                            ? "bg-red-100 text-red-900 shadow-[2px_2px_0px_0px_rgba(220,38,38,0.2)] group-hover:shadow-[2px_2px_0px_0px_rgba(220,38,38,0.4)]" 
                            : "bg-zinc-100 text-zinc-300 border-zinc-200"
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
    <div className="grid grid-cols-1 gap-3">
      {displayList.map((p) => {
        const id = p.url.split('/').filter(Boolean).pop();
        return (
          <button
            key={p.name}
            className="flex items-center w-full p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all text-left group"
            onClick={() => onSelect(p.name)}
          >
            <div className="h-12 w-12 mr-4 bg-zinc-50 rounded-lg border-2 border-zinc-200 flex items-center justify-center group-hover:border-red-200 group-hover:bg-red-50 transition-colors">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={p.name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <div className="font-black capitalize text-lg tracking-tight group-hover:text-red-600 transition-colors">{formatPokemonName(p.name)}</div>
              <div className="text-xs font-bold text-zinc-400">#{String(id).padStart(3, '0')}</div>
            </div>
          </button>
        );
      })}
      {filtered.length === 0 && (
        <div className="text-center py-12 px-4 border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50">
          <p className="font-bold text-zinc-500 text-lg">Nenhum Pokémon encontrado</p>
          <p className="text-zinc-400 text-sm">Tente buscar por outro nome</p>
        </div>
      )}
    </div>
  );
}
