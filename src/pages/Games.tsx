import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Gamepad2, MapPin, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  getVersionGroups, 
  getVersionGroup, 
  getPokedex, 
  formatPokemonName, 
  getIdFromUrl,
  VersionGroup 
} from '@/lib/pokeapi';

// Mapeamento de cores por geração para os cards
const GENERATION_COLORS: Record<string, string> = {
  'generation-i': 'from-pokemon-fire to-pokemon-fire/70',
  'generation-ii': 'from-pokemon-water to-pokemon-water/70',
  'generation-iii': 'from-pokemon-grass to-pokemon-grass/70',
  'generation-iv': 'from-pokemon-electric to-pokemon-electric/70',
  'generation-v': 'from-pokemon-psychic to-pokemon-psychic/70',
  'generation-vi': 'from-pokemon-ice to-pokemon-ice/70',
  'generation-vii': 'from-pokemon-fairy to-pokemon-fairy/70',
  'generation-viii': 'from-pokemon-ghost to-pokemon-ghost/70',
  'generation-ix': 'from-pokemon-dragon to-pokemon-dragon/70',
};

const formatGameName = (name: string) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');
};

interface GameDetailsProps {
  game: VersionGroup;
  isOpen: boolean;
  onClose: () => void;
}

function GameDetails({ game, isOpen, onClose }: GameDetailsProps) {
  const [activeTab, setActiveTab] = useState('pokemon');
  const [searchTerm, setSearchTerm] = useState('');

  // Busca o Pokédex principal (geralmente o primeiro ou o que tem nome da região)
  const pokedexUrl = game.pokedexes[0]?.url;
  const pokedexId = pokedexUrl ? getIdFromUrl(pokedexUrl) : null;

  const { data: pokedex, isLoading: loadingPokedex } = useQuery({
    queryKey: ['pokedex', pokedexId],
    queryFn: async () => {
      if (!pokedexId) return null;
      return getPokedex(pokedexId);
    },
    enabled: !!pokedexId && isOpen && activeTab === 'pokemon',
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const filteredPokemon = pokedex?.pokemon_entries.filter(entry => 
    entry.pokemon_species.name.includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            {formatGameName(game.name)}
          </DialogTitle>
          <p className="text-sm text-muted-foreground capitalize">
            {formatPokemonName(game.generation.name)}
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-6 py-2 border-b bg-muted/30">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                <TabsTrigger value="pokemon">Pokémon Disponíveis</TabsTrigger>
                <TabsTrigger value="regions">Regiões</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="regions" className="flex-1 overflow-y-auto p-6 m-0">
              <div className="grid gap-4 sm:grid-cols-2">
                {game.regions.map(region => (
                  <div 
                    key={region.name}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{formatPokemonName(region.name)}</h3>
                      <p className="text-sm text-muted-foreground">Região Principal</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pokemon" className="flex-1 overflow-y-auto p-6 m-0">
              <div className="mb-4 sticky top-0 bg-background/95 backdrop-blur z-10 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar Pokémon..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {loadingPokedex ? (
                <div className="flex justify-center py-10">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredPokemon?.map((entry) => {
                    const id = getIdFromUrl(entry.pokemon_species.url);
                    return (
                      <Link 
                        key={entry.entry_number}
                        to={`/pokemon/${id}`}
                        className="flex flex-col items-center p-3 rounded-lg border bg-card hover:shadow-md transition-all group"
                      >
                        <span className="text-xs text-muted-foreground self-start">#{id}</span>
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                          alt={entry.pokemon_species.name}
                          className="w-24 h-24 object-contain group-hover:scale-110 transition-transform"
                          loading="lazy"
                        />
                        <span className="text-sm font-medium capitalize text-center mt-2 group-hover:text-primary transition-colors">
                          {entry.pokemon_species.name}
                        </span>
                      </Link>
                    );
                  })}
                  {!loadingPokedex && (!filteredPokemon || filteredPokemon.length === 0) && (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                      Nenhum Pokémon encontrado.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<VersionGroup | null>(null);

  const { data: games, isLoading } = useQuery({
    queryKey: ['version-groups'],
    queryFn: async () => {
      const list = await getVersionGroups();
      // Fetch details for all groups to get generation and regions info
      const details = await Promise.all(
        list.results.map(g => getVersionGroup(g.name))
      );
      // Sort by ID (usually chronological)
      return details.sort((a, b) => a.id - b.id);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Jogos Pokémon</h1>
          <p className="text-muted-foreground">
            Explore todos os jogos da franquia, suas regiões e Pokédex.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {games?.map((game) => {
              const genColor = GENERATION_COLORS[game.generation.name] || 'from-gray-500 to-gray-600';
              
              return (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-left w-full"
                >
                  <div className={`relative h-32 bg-gradient-to-br ${genColor} p-6 text-white`}>
                    <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Gamepad2 className="h-20 w-20" />
                    </div>
                    <span className="mb-1 block text-sm font-medium opacity-90 capitalize">
                      {formatPokemonName(game.generation.name)}
                    </span>
                    <h2 className="text-2xl font-bold leading-tight">
                      {formatGameName(game.name)}
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">
                        {game.regions.map(r => formatPokemonName(r.name)).join(', ') || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        Ver detalhes
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {game.pokedexes.length > 0 ? 'Pokédex Disponível' : 'Sem Pokédex'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {selectedGame && (
          <GameDetails 
            game={selectedGame} 
            isOpen={!!selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </div>
    </Layout>
  );
}
