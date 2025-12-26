import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Users } from 'lucide-react';
import { getGenerations, getGeneration } from '@/lib/pokeapi';
import { TeamBuilder } from '@/components/teams/TeamBuilder';

interface PokemonTeam {
  id: string;
  game_id: string;
  game_name: string;
  team_name: string;
  created_at: string;
}

interface TeamPokemon {
  id: string;
  team_id: string;
  pokemon_id: number;
  pokemon_name: string;
  slot: number;
  nickname: string | null;
}

export default function MyTeams() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const { data: games } = useQuery({
    queryKey: ['games-list'],
    queryFn: async () => {
      const genList = await getGenerations();
      const allGames: { id: string; name: string }[] = [];
      
      for (const gen of genList.results) {
        const genData = await getGeneration(gen.name);
        genData.version_groups.forEach(vg => {
          allGames.push({ id: vg.name, name: vg.name.replace(/-/g, ' ').toUpperCase() });
        });
      }
      return allGames;
    },
  });

  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['pokemon-teams', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('pokemon_teams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PokemonTeam[];
    },
    enabled: !!user,
  });

  const { data: teamPokemon } = useQuery({
    queryKey: ['team-pokemon', selectedTeamId],
    queryFn: async () => {
      if (!selectedTeamId) return [];
      const { data, error } = await supabase
        .from('team_pokemon')
        .select('*')
        .eq('team_id', selectedTeamId)
        .order('slot', { ascending: true });
      
      if (error) throw error;
      return data as TeamPokemon[];
    },
    enabled: !!selectedTeamId,
  });

  const createTeamMutation = useMutation({
    mutationFn: async ({ teamName, gameId, gameName }: { teamName: string; gameId: string; gameName: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('pokemon_teams')
        .insert({
          user_id: user.id,
          team_name: teamName,
          game_id: gameId,
          game_name: gameName,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon-teams'] });
      setIsCreateOpen(false);
      setNewTeamName('');
      setSelectedGame('');
      toast({ title: 'Time criado!', description: 'Agora adicione seus Pokémon' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Não foi possível criar o time', variant: 'destructive' });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (teamId: string) => {
      const { error } = await supabase
        .from('pokemon_teams')
        .delete()
        .eq('id', teamId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon-teams'] });
      if (selectedTeamId) setSelectedTeamId(null);
      toast({ title: 'Time deletado' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Não foi possível deletar o time', variant: 'destructive' });
    },
  });

  const handleCreateTeam = () => {
    if (!newTeamName.trim() || !selectedGame) return;
    const game = games?.find(g => g.id === selectedGame);
    createTeamMutation.mutate({
      teamName: newTeamName,
      gameId: selectedGame,
      gameName: game?.name || selectedGame,
    });
  };

  if (authLoading || teamsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-pokemon-fire" />
              Meus Times
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus times Pokémon para cada jogo
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pokemon-fire hover:bg-pokemon-fire/90">
                <Plus className="h-4 w-4 mr-2" />
                Novo Time
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Time</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium">Nome do Time</label>
                  <Input
                    placeholder="Ex: Time Competitivo"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Jogo</label>
                  <Select value={selectedGame} onValueChange={setSelectedGame}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um jogo" />
                    </SelectTrigger>
                    <SelectContent>
                      {games?.map((game) => (
                        <SelectItem key={game.id} value={game.id}>
                          {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreateTeam}
                  disabled={!newTeamName.trim() || !selectedGame || createTeamMutation.isPending}
                  className="w-full bg-pokemon-fire hover:bg-pokemon-fire/90"
                >
                  {createTeamMutation.isPending ? 'Criando...' : 'Criar Time'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {teams?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum time ainda</h3>
              <p className="text-muted-foreground mb-4">
                Crie seu primeiro time Pokémon para começar!
              </p>
              <Button 
                onClick={() => setIsCreateOpen(true)}
                className="bg-pokemon-fire hover:bg-pokemon-fire/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Time
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="font-semibold text-lg">Seus Times</h2>
              {teams?.map((team) => (
                <Card 
                  key={team.id} 
                  className={`cursor-pointer transition-all hover:border-pokemon-fire/50 ${
                    selectedTeamId === team.id ? 'border-pokemon-fire ring-1 ring-pokemon-fire' : ''
                  }`}
                  onClick={() => setSelectedTeamId(team.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{team.team_name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTeamMutation.mutate(team.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <CardDescription>{team.game_name}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedTeamId ? (
                <TeamBuilder 
                  teamId={selectedTeamId} 
                  teamPokemon={teamPokemon || []} 
                />
              ) : (
                <Card className="h-full flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Selecione um time para editar
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
