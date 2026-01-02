import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Trash2, Play, Calendar, Trophy, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Pokemon } from '@/lib/pokeapi';
import { formatPokemonName } from '@/lib/pokeapi';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { GYM_DATA } from '@/data/gym-leaders';

interface SavedTeam {
  id: string;
  name: string;
  team: { id: string; pokemon: Pokemon | null }[];
  gameId: string;
  leaderId: string;
  createdAt: number;
}

export default function SavedTeams() {
  const navigate = useNavigate();
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);

  useEffect(() => {
    const loaded = localStorage.getItem('saved-teams');
    if (loaded) {
      try {
        setSavedTeams(JSON.parse(loaded));
      } catch (e) {
        console.error("Failed to parse saved teams", e);
      }
    }
  }, []);

  const handleDeleteTeam = (id: string) => {
    const newTeams = savedTeams.filter(t => t.id !== id);
    setSavedTeams(newTeams);
    localStorage.setItem('saved-teams', JSON.stringify(newTeams));
    toast.success('Time removido com sucesso!');
  };

  const handleLoadTeam = (savedTeam: SavedTeam) => {
    // Save to current active team slots
    localStorage.setItem('pokemon-team', JSON.stringify(savedTeam.team));
    
    // Save scenario state (we need to update TeamBuilder to read these)
    localStorage.setItem('team-builder-scenario', JSON.stringify({
      gameId: savedTeam.gameId,
      leaderId: savedTeam.leaderId
    }));

    toast.success('Time carregado! Redirecionando...');
    navigate('/team-builder');
  };

  const getGameName = (id: string) => {
    if (id === 'general') return 'Análise Geral';
    return GYM_DATA.find(g => g.id === id)?.game || 'Jogo Desconhecido';
  };

  const getLeaderName = (gameId: string, leaderId: string) => {
    if (leaderId === 'none') return 'Nenhum Oponente';
    const game = GYM_DATA.find(g => g.id === gameId);
    return game?.leaders.find(l => l.id === leaderId)?.name || 'Líder Desconhecido';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_#2563EB]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-4 border-black pb-8">
               <div className="flex items-center gap-6">
                 {/* Great Ball Icon */}
                 <div className="relative h-20 w-20 shrink-0 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    {/* Top Blue Half */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-blue-600 border-b-4 border-black"></div>
                    {/* Red Accents (Great Ball stripes) */}
                    <div className="absolute top-2 left-1 h-5 w-8 bg-red-500 rounded-full rotate-45 border border-black z-10 opacity-90"></div>
                    <div className="absolute top-2 right-1 h-5 w-8 bg-red-500 rounded-full -rotate-45 border border-black z-10 opacity-90"></div>
                    
                    {/* Center Button */}
                    <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-sm">
                      <div className="h-2 w-2 bg-zinc-400 rounded-full"></div>
                    </div>
                 </div>
                 
                 <div>
                   <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                     Meus Times
                   </h1>
                   <p className="text-lg font-medium text-gray-600">
                     Gerencie suas equipes salvas e cenários de batalha
                   </p>
                 </div>
               </div>

              <Button 
                onClick={() => navigate('/team-builder')}
                className="h-14 px-8 text-lg font-black border-4 border-black bg-[#2563EB] text-white hover:bg-[#1d4ed8] hover:text-white shadow-[6px_6px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all rounded-xl"
              >
                Criar Novo Time
              </Button>
            </div>

            {savedTeams.length === 0 ? (
              <div className="text-center py-20 bg-zinc-50 rounded-[2rem] border-4 border-dashed border-zinc-300">
                <div className="relative h-24 w-24 mx-auto mb-6 opacity-30 grayscale">
                   <div className="absolute inset-0 rounded-full border-4 border-black bg-white overflow-hidden">
                     <div className="absolute top-0 left-0 right-0 h-1/2 bg-blue-600 border-b-4 border-black"></div>
                     <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
                   </div>
                </div>
                <h3 className="text-2xl font-black uppercase text-zinc-400 mb-2">Nenhum time salvo</h3>
                <p className="text-zinc-500 font-bold mb-8 text-lg">
                  Vá para o Montador de Equipe para criar e salvar seus times.
                </p>
                <Button 
                  onClick={() => navigate('/team-builder')}
                  className="h-12 px-6 font-bold border-2 border-black bg-blue-600 text-white hover:bg-blue-700 shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all rounded-lg"
                >
                  Ir para o Montador
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {savedTeams.sort((a, b) => b.createdAt - a.createdAt).map((team) => (
                  <div key={team.id} className="bg-white rounded-[1.5rem] border-4 border-black shadow-[8px_8px_0px_0px_#2563EB] p-6 hover:-translate-y-1 transition-transform relative overflow-hidden group">
                    {/* Background Decor */}
                    <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <div className="relative h-64 w-64">
                           <div className="absolute inset-0 rounded-full border-8 border-black bg-white overflow-hidden">
                             <div className="absolute top-0 left-0 right-0 h-1/2 bg-blue-600 border-b-8 border-black"></div>
                             <div className="absolute top-4 left-2 h-8 w-12 bg-red-500 rounded-full rotate-45 border-2 border-black"></div>
                             <div className="absolute top-4 right-2 h-8 w-12 bg-red-500 rounded-full -rotate-45 border-2 border-black"></div>
                             <div className="absolute top-1/2 left-1/2 h-16 w-16 bg-white border-8 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
                           </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 justify-between relative z-10">
                      
                      {/* Team Info */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                          <h3 className="text-3xl font-black uppercase tracking-tight text-black">{team.name}</h3>
                          <span className="text-xs font-bold bg-zinc-100 border-2 border-black text-zinc-700 px-3 py-1 rounded-full flex items-center gap-1 w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                            <Calendar className="h-3 w-3" />
                            {new Date(team.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm font-bold text-zinc-600 mb-6">
                          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                            <Trophy className="h-4 w-4 text-yellow-600 fill-yellow-600 stroke-black stroke-2" />
                            {getGameName(team.gameId)}
                          </div>
                          {team.leaderId !== 'none' && (
                            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                              <MapPin className="h-4 w-4 text-red-600 fill-red-600 stroke-black stroke-1" />
                              Vs. {getLeaderName(team.gameId, team.leaderId)}
                            </div>
                          )}
                        </div>

                        {/* Pokemon Sprites */}
                        <div className="flex flex-wrap gap-3">
                          {team.team.map((slot) => (
                            slot.pokemon ? (
                              <div key={slot.id} className="relative group/pokemon">
                                <div className="w-16 h-16 bg-white rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-center p-1 hover:scale-105 transition-transform" title={formatPokemonName(slot.pokemon.name)}>
                                  <img 
                                    src={slot.pokemon.sprites.front_default || ''} 
                                    alt={slot.pokemon.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="absolute -bottom-2 -right-2 flex gap-0.5">
                                    {slot.pokemon.types.map(t => (
                                        <TypeBadge key={t.type.name} type={t.type.name} size="sm" showLabel={false} className="w-5 h-5 p-0 border-2 border-black shadow-sm" />
                                    ))}
                                </div>
                              </div>
                            ) : (
                              <div key={slot.id} className="w-16 h-16 bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-blue-200" />
                              </div>
                            )
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-3 justify-center border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-zinc-300 pt-6 lg:pt-0 lg:pl-6 mt-4 lg:mt-0">
                        <Button 
                          onClick={() => handleLoadTeam(team)} 
                          className="h-12 gap-2 w-full lg:w-32 border-2 border-black bg-blue-600 text-white hover:bg-blue-700 hover:text-white shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all font-bold text-base"
                        >
                          <Play className="h-4 w-4 fill-white" />
                          Carregar
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleDeleteTeam(team.id)} 
                          className="h-12 gap-2 w-full lg:w-32 border-2 border-black bg-red-500 text-white hover:bg-red-600 hover:text-white shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all font-bold text-base"
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
