import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Gamepad2, MapPin, Search, X, Filter, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SearchInput } from '@/components/ui/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  getVersionGroups, 
  getVersionGroup, 
  getPokedex, 
  formatPokemonName, 
  getIdFromUrl,
  VersionGroup,
  getTypes,
  getGenerations,
  getType,
  getGeneration,
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
  const [selectedGen, setSelectedGen] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Busca o Pokédex principal (geralmente o primeiro ou o que tem nome da região)
  const pokedexUrl = game.pokedexes[0]?.url;
  const pokedexId = pokedexUrl ? getIdFromUrl(pokedexUrl) : null;
  const gameGenId = getIdFromUrl(game.generation.url);

  const { data: pokedex, isLoading: loadingPokedex } = useQuery({
    queryKey: ['pokedex', pokedexId],
    queryFn: async () => {
      if (!pokedexId) return null;
      return getPokedex(pokedexId);
    },
    enabled: !!pokedexId && isOpen && activeTab === 'pokemon',
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const { data: allTypes } = useQuery({ 
    queryKey: ['types'], 
    queryFn: getTypes,
    staleTime: 1000 * 60 * 60 * 24 
  });

  const { data: allGenerations } = useQuery({ 
    queryKey: ['generations'], 
    queryFn: getGenerations,
    staleTime: 1000 * 60 * 60 * 24 
  });

  const { data: typePokemonNames, isLoading: loadingType } = useQuery({
    queryKey: ['type', selectedType],
    queryFn: async () => {
      if (!selectedType) return null;
      const data = await getType(selectedType);
      return new Set(data.pokemon.map(p => p.pokemon.name));
    },
    enabled: !!selectedType,
    staleTime: 1000 * 60 * 60 * 24
  });

  const { data: genPokemonNames, isLoading: loadingGen } = useQuery({
    queryKey: ['generation', selectedGen],
    queryFn: async () => {
      if (!selectedGen) return null;
      const data = await getGeneration(selectedGen);
      return new Set(data.pokemon_species.map(s => s.name));
    },
    enabled: !!selectedGen,
    staleTime: 1000 * 60 * 60 * 24
  });

  const filteredPokemon = pokedex?.pokemon_entries.filter(entry => {
    const matchesSearch = entry.pokemon_species.name.includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || (typePokemonNames?.has(entry.pokemon_species.name));
    const matchesGen = !selectedGen || (genPokemonNames?.has(entry.pokemon_species.name));
    return matchesSearch && matchesType && matchesGen;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden rounded-3xl">
        {/* Master Ball Top Half Header */}
        <DialogHeader className="px-6 py-6 border-b-[6px] border-black bg-[#652C90] text-white shrink-0 relative overflow-hidden">
          {/* Pink Bumps (Master Ball Characteristic) */}
          <div className="absolute -top-6 left-10 w-24 h-24 bg-[#E94B9B] rounded-full border-4 border-black/20 shadow-inner z-0"></div>
          <div className="absolute -top-6 right-10 w-24 h-24 bg-[#E94B9B] rounded-full border-4 border-black/20 shadow-inner z-0"></div>
          
          {/* Giant M Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-serif font-black text-white/10 pointer-events-none z-0 leading-none select-none">M</div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
             <DialogTitle className="text-4xl font-black uppercase flex items-center gap-3 tracking-tighter drop-shadow-md">
                <Gamepad2 className="h-10 w-10 text-white" />
                {formatGameName(game.name)}
             </DialogTitle>
             <p className="mt-2 text-purple-200 font-bold uppercase tracking-widest text-sm bg-black/20 px-4 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                {formatPokemonName(game.generation.name)}
             </p>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-purple-50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-6 py-3 border-b-4 border-black bg-white flex justify-center">
              <TabsList className="grid w-full grid-cols-2 max-w-[500px] gap-4 bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="pokemon"
                  className="data-[state=active]:bg-[#652C90] data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#000] border-2 border-black bg-white text-black transition-all font-black uppercase py-2 rounded-xl hover:bg-purple-100"
                >
                  Pokémon
                </TabsTrigger>
                <TabsTrigger 
                  value="regions"
                  className="data-[state=active]:bg-[#E94B9B] data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#000] border-2 border-black bg-white text-black transition-all font-black uppercase py-2 rounded-xl hover:bg-pink-100"
                >
                  Regiões
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="regions" className="flex-1 overflow-y-auto p-6 m-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="grid gap-4 sm:grid-cols-2">
                {game.regions.map(region => (
                  <div 
                    key={region.name}
                    className="flex items-center gap-4 p-4 rounded-2xl border-4 border-black bg-white shadow-[6px_6px_0px_0px_#E94B9B] hover:shadow-[8px_8px_0px_0px_#652C90] hover:-translate-y-1 transition-all group"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#652C90] border-4 border-black flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-2xl uppercase text-[#652C90]">{formatPokemonName(region.name)}</h3>
                      <p className="text-sm font-bold text-gray-500">Região Principal</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pokemon" className="flex-1 flex flex-col m-0 p-0 overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="px-4 py-3 bg-purple-50/90 backdrop-blur-sm border-b-4 border-black z-20 shrink-0">
                <div className="relative max-w-xl mx-auto flex items-center gap-3">
                  <div className="relative flex-1">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-[#652C90] border-y-4 border-l-4 border-black rounded-l-xl z-20">
                       <Search className="h-5 w-5 text-white" />
                    </div>
                    <Input 
                      placeholder="Buscar na Pokédex..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-14 h-10 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] focus-visible:ring-0 focus-visible:border-[#E94B9B] font-bold bg-white text-base placeholder:text-gray-400 w-full"
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        size="icon" 
                        className="h-10 w-10 border-4 border-black bg-[#E94B9B] hover:bg-[#d63a8a] text-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                      >
                        <Filter className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-4 border-black rounded-xl font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                      <DropdownMenuItem onClick={() => { setSelectedGen(null); setSelectedType(null); }} className="focus:bg-purple-100 cursor-pointer text-red-500">
                        Limpar Filtros
                      </DropdownMenuItem>
                      
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="focus:bg-purple-100 cursor-pointer">
                          Geração
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="border-4 border-black rounded-xl font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[300px] overflow-y-auto bg-white">
                          {allGenerations?.results
                            .filter(gen => getIdFromUrl(gen.url) <= gameGenId)
                            .map((gen) => (
                            <DropdownMenuItem 
                              key={gen.name} 
                              onClick={() => setSelectedGen(selectedGen === gen.name ? null : gen.name)}
                              className="focus:bg-purple-100 cursor-pointer justify-between"
                            >
                              {formatPokemonName(gen.name)}
                              {selectedGen === gen.name && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="focus:bg-purple-100 cursor-pointer">
                          Tipo
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="border-4 border-black rounded-xl font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[300px] overflow-y-auto bg-white">
                          {allTypes?.results.map((type) => (
                            <DropdownMenuItem 
                              key={type.name} 
                              onClick={() => setSelectedType(selectedType === type.name ? null : type.name)}
                              className="focus:bg-purple-100 cursor-pointer justify-between"
                            >
                              {formatPokemonName(type.name)}
                              {selectedType === type.name && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-6">
                {loadingPokedex || loadingType || loadingGen ? (
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
                          className="flex flex-col items-center p-3 rounded-2xl border-4 border-black bg-white hover:shadow-[6px_6px_0px_0px_#652C90] hover:-translate-y-2 transition-all group relative overflow-hidden"
                        >
                           <div className="absolute top-0 left-0 right-0 h-16 bg-purple-50 rounded-t-xl z-0 group-hover:bg-[#652C90]/10 transition-colors"></div>
                          <span className="text-xs font-black text-[#652C90]/50 self-end z-10 mb-[-10px]">#{id}</span>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                            alt={entry.pokemon_species.name}
                            className="w-28 h-28 object-contain group-hover:scale-110 transition-transform drop-shadow-sm z-10 relative"
                            loading="lazy"
                          />
                          <span className="text-sm font-black capitalize text-center mt-1 text-black group-hover:text-[#E94B9B] transition-colors z-10">
                            {entry.pokemon_species.name}
                          </span>
                        </Link>
                      );
                    })}
                    {!loadingPokedex && (!filteredPokemon || filteredPokemon.length === 0) && (
                      <div className="col-span-full flex flex-col items-center justify-center py-10 text-purple-400 font-bold gap-4">
                         <Gamepad2 className="h-12 w-12 opacity-50" />
                         <p>Nenhum Pokémon encontrado.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<VersionGroup | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenFilter, setSelectedGenFilter] = useState<string>('all');

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

  const filteredGames = useMemo(() => {
    if (!games) return [];
    
    return games.filter(game => {
      const formattedName = formatGameName(game.name).toLowerCase();
      const matchesSearch = formattedName.includes(searchTerm.toLowerCase());
      const matchesGen = selectedGenFilter === 'all' || game.generation.name === selectedGenFilter;
      
      return matchesSearch && matchesGen;
    });
  }, [games, searchTerm, selectedGenFilter]);

  const availableGenerations = useMemo(() => {
    if (!games) return [];
    const gens = new Set(games.map(g => g.generation.name));
    return Array.from(gens);
  }, [games]);

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_#652C90]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b-4 border-black pb-8">
               {/* Master Ball Icon */}
               <div className="relative h-20 w-20 shrink-0 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  {/* Top Purple Half */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-purple-700 border-b-4 border-black"></div>
                  {/* Pink Accents (Master Ball bumps) */}
                  <div className="absolute top-2 left-2 h-5 w-5 bg-pink-500 rounded-full border border-black z-10"></div>
                  <div className="absolute top-2 right-2 h-5 w-5 bg-pink-500 rounded-full border border-black z-10"></div>
                  
                  {/* Center Button */}
                  <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-sm">
                    <div className="h-2 w-2 bg-zinc-400 rounded-full"></div>
                  </div>
                  {/* 'M' Letter */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-black text-white z-10 drop-shadow-sm">M</div>
               </div>
               
               <div className="flex-1">
                 <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                   Jogos Pokémon
                 </h1>
                 <p className="text-lg font-medium text-gray-600">
                   Explore todos os jogos da franquia, suas regiões e Pokédex
                 </p>
               </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                 <SearchInput 
                   value={searchTerm} 
                   onChange={setSearchTerm}
                   placeholder="Buscar jogo..."
                   className="w-full"
                 />
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedGenFilter} onValueChange={setSelectedGenFilter}>
                  <SelectTrigger className="w-full h-12 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold transition-all">
                    <SelectValue placeholder="Geração" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <SelectItem value="all" className="font-bold">Todas as Gerações</SelectItem>
                    {availableGenerations.map((gen) => (
                      <SelectItem key={gen} value={gen} className="font-medium capitalize">
                        {formatPokemonName(gen)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredGames.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                     <Search className="h-16 w-16 opacity-20" />
                     <p className="text-xl font-bold">Nenhum jogo encontrado</p>
                  </div>
                ) : (
                  filteredGames.map((game) => {
                  const genColor = GENERATION_COLORS[game.generation.name] || 'from-gray-500 to-gray-600';
                  
                  return (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="group overflow-hidden rounded-[2rem] border-4 border-black bg-white transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#652C90] hover:-translate-y-2 text-left w-full relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {/* Master Ball Card Header Design */}
                      <div className={`relative h-40 bg-gradient-to-br ${genColor} p-6 text-white border-b-4 border-black overflow-hidden`}>
                        {/* Pink Bumps */}
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#E94B9B] rounded-full border-4 border-black shadow-inner z-10"></div>
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#E94B9B] rounded-full border-4 border-black shadow-inner z-10"></div>
                        
                        {/* Gamepad Icon Faded */}
                        <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-20 group-hover:opacity-40 transition-opacity scale-150 blur-sm">
                          <Gamepad2 className="h-32 w-32" />
                        </div>

                        {/* Master Ball 'M' Watermark */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[8rem] font-black text-white/10 pointer-events-none select-none font-serif leading-none z-0">M</div>
                        
                        <div className="relative z-20 flex flex-col h-full justify-between">
                          <span className="self-start text-xs font-black opacity-90 capitalize tracking-widest border-2 border-white/20 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                            {formatPokemonName(game.generation.name)}
                          </span>
                          <h2 className="text-3xl font-black leading-none uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] mt-auto break-words relative">
                            {formatGameName(game.name)}
                          </h2>
                        </div>
                      </div>

                      <div className="p-6 bg-white relative">
                         {/* Center Button Half */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 bg-white border-4 border-black rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform">
                        <div className="h-4 w-4 rounded-full border-2 border-black bg-white"></div>
                     </div>
                     
                    <div className="flex justify-between items-end mt-2">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Região Principal</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-[#E94B9B]" />
                          <span className="font-black text-xl text-[#652C90] uppercase">
                             {game.regions.map(r => formatPokemonName(r.name)).join(', ') || 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="h-10 w-10 rounded-full bg-[#652C90] flex items-center justify-center text-white border-2 border-black group-hover:bg-[#E94B9B] transition-colors shadow-[2px_2px_0px_0px_#000]">
                         {/* Arrow Right Icon manual implementation or import if needed, assuming ChevronRight wasn't imported yet, I'll use simple svg or just text if needed, but actually I can use a simple arrow */}
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m9 18 6-6-6-6"/></svg>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t-2 border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase">
                          {game.pokedexes.length > 0 ? 'Pokédex Disponível' : 'Sem Pokédex'}
                        </span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
          </div>
        )}
          </div>
        </div>

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
