import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Search } from 'lucide-react';
import { getPokemonImageUrl, formatPokemonName } from '@/lib/pokeapi';
import { useQuery } from '@tanstack/react-query';

interface TeamPokemon {
  id: string;
  team_id: string;
  pokemon_id: number;
  pokemon_name: string;
  slot: number;
  nickname: string | null;
}

interface TeamBuilderProps {
  teamId: string;
  teamPokemon: TeamPokemon[];
}

export function TeamBuilder({ teamId, teamPokemon }: TeamBuilderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<number>(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: searchResults } = useQuery({
    queryKey: ['pokemon-search', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const data = await response.json();
      const filtered = data.results.filter((p: { name: string }) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 20);
      
      return filtered.map((p: { name: string; url: string }) => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
        return { id, name: p.name };
      });
    },
    enabled: searchQuery.length >= 2,
  });

  const addPokemonMutation = useMutation({
    mutationFn: async ({ pokemonId, pokemonName, slot }: { pokemonId: number; pokemonName: string; slot: number }) => {
      // First, remove any existing pokemon in this slot
      await supabase
        .from('team_pokemon')
        .delete()
        .eq('team_id', teamId)
        .eq('slot', slot);

      const { data, error } = await supabase
        .from('team_pokemon')
        .insert({
          team_id: teamId,
          pokemon_id: pokemonId,
          pokemon_name: pokemonName,
          slot: slot,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-pokemon', teamId] });
      setIsSearchOpen(false);
      setSearchQuery('');
      toast({ title: 'Pokémon adicionado!' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Não foi possível adicionar o Pokémon', variant: 'destructive' });
    },
  });

  const removePokemonMutation = useMutation({
    mutationFn: async (pokemonId: string) => {
      const { error } = await supabase
        .from('team_pokemon')
        .delete()
        .eq('id', pokemonId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-pokemon', teamId] });
      toast({ title: 'Pokémon removido' });
    },
    onError: () => {
      toast({ title: 'Erro', description: 'Não foi possível remover o Pokémon', variant: 'destructive' });
    },
  });

  const handleAddPokemon = (pokemonId: number, pokemonName: string) => {
    addPokemonMutation.mutate({ pokemonId, pokemonName, slot: selectedSlot });
  };

  const openSearchForSlot = (slot: number) => {
    setSelectedSlot(slot);
    setIsSearchOpen(true);
  };

  const slots = [1, 2, 3, 4, 5, 6];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Montar Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {slots.map((slot) => {
            const pokemon = teamPokemon.find(p => p.slot === slot);
            
            return (
              <div
                key={slot}
                className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20 hover:border-pokemon-fire/50 transition-colors"
              >
                {pokemon ? (
                  <div className="text-center p-2 w-full h-full flex flex-col items-center justify-center">
                    <button
                      onClick={() => removePokemonMutation.mutate(pokemon.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-destructive/10 hover:bg-destructive/20 transition-colors"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                    <img
                      src={getPokemonImageUrl(pokemon.pokemon_id)}
                      alt={pokemon.pokemon_name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                    <span className="text-sm font-medium mt-1 truncate w-full">
                      {formatPokemonName(pokemon.pokemon_name)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      #{pokemon.pokemon_id.toString().padStart(3, '0')}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => openSearchForSlot(slot)}
                    className="w-full h-full flex flex-col items-center justify-center text-muted-foreground hover:text-pokemon-fire transition-colors"
                  >
                    <Plus className="h-8 w-8 mb-1" />
                    <span className="text-sm">Slot {slot}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Adicionar Pokémon - Slot {selectedSlot}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar Pokémon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-2 max-h-[400px]">
              {searchResults?.map((pokemon: { id: number; name: string }) => (
                <button
                  key={pokemon.id}
                  onClick={() => handleAddPokemon(pokemon.id, pokemon.name)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <img
                    src={getPokemonImageUrl(pokemon.id)}
                    alt={pokemon.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <div className="font-medium">{formatPokemonName(pokemon.name)}</div>
                    <div className="text-sm text-muted-foreground">
                      #{pokemon.id.toString().padStart(3, '0')}
                    </div>
                  </div>
                </button>
              ))}
              {searchQuery.length >= 2 && searchResults?.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum Pokémon encontrado
                </p>
              )}
              {searchQuery.length < 2 && (
                <p className="text-center text-muted-foreground py-4">
                  Digite pelo menos 2 caracteres para buscar
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
