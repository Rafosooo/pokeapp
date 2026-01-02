import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { SearchInput } from '@/components/ui/search-input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { getAllPokemon, getPokemon, getIdFromUrl, getTypes, getType, GENERATION_RANGES } from '@/lib/pokeapi';
import { ChevronLeft, ChevronRight, CircleDot } from 'lucide-react';
import { PokemonFilters } from '@/components/pokemon/PokemonFilters';

const ITEMS_PER_PAGE = 20;

export default function Pokedex() {
  // Initialize state from sessionStorage if available
  const [search, setSearch] = useState(() => sessionStorage.getItem('pokedex_search') || '');
  
  const [selectedType, setSelectedType] = useState<string | null>(() => {
    const saved = sessionStorage.getItem('pokedex_type');
    return saved === 'null' ? null : saved;
  });
  
  const [selectedGen, setSelectedGen] = useState<string | null>(() => {
    const saved = sessionStorage.getItem('pokedex_gen');
    return saved === 'null' ? null : saved;
  });
  
  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('pokedex_page');
    return saved ? Number(saved) : 0;
  });

  // Persist state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('pokedex_search', search);
    sessionStorage.setItem('pokedex_type', String(selectedType));
    sessionStorage.setItem('pokedex_gen', String(selectedGen));
    sessionStorage.setItem('pokedex_page', String(page));
  }, [search, selectedType, selectedGen, page]);

  // Ref to track first render
  const isFirstRender = useRef(true);

  // 1. Fetch ALL Pokemon (names & urls) - Cached for a long time
  const { data: allPokemonData, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allPokemon'],
    queryFn: getAllPokemon,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  // 1b. Fetch All Types
  const { data: typesData } = useQuery({
    queryKey: ['types'],
    queryFn: getTypes,
    staleTime: 1000 * 60 * 60 * 24,
  });

  // 1c. Fetch Pokemon by Type (if selected)
  const { data: typePokemonData, isLoading: isLoadingType } = useQuery({
    queryKey: ['typePokemon', selectedType],
    queryFn: () => getType(selectedType!),
    enabled: !!selectedType,
    staleTime: 1000 * 60 * 60,
  });

  // 2. Filter & Paginate (Client-side)
  const filteredList = useMemo(() => {
    let list = [];
    
    // Step 1: Choose source list
    if (selectedType) {
      if (!typePokemonData?.pokemon) return [];
      list = typePokemonData.pokemon.map(p => p.pokemon);
    } else {
      if (!allPokemonData?.results) return [];
      list = allPokemonData.results;
    }

    // Step 2: Filter by Generation
    if (selectedGen) {
      const [min, max] = GENERATION_RANGES[Number(selectedGen)];
      list = list.filter(p => {
        const id = getIdFromUrl(p.url);
        return id >= min && id <= max;
      });
    }
    
    // Step 3: Filter by Search
    if (search) {
      const searchLower = search.toLowerCase();
      list = list.filter((p) => {
        const id = getIdFromUrl(p.url);
        return (
          p.name.toLowerCase().includes(searchLower) ||
          id.toString().includes(searchLower)
        );
      });
    }

    return list;
  }, [allPokemonData, typePokemonData, search, selectedType, selectedGen]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(0);
  }, [search, selectedType, selectedGen]);

  const visibleItems = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredList.slice(start, end);
  }, [filteredList, page]);

  // 3. Fetch Details for Visible Items
  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemonDetails', visibleItems],
    queryFn: async () => {
      if (visibleItems.length === 0) return [];
      
      const details = await Promise.all(
        visibleItems.map(async (item) => {
          const id = getIdFromUrl(item.url);
          try {
            const detail = await getPokemon(id);
            return {
              id,
              name: item.name,
              types: detail.types.map((t) => t.type.name),
            };
          } catch (e) {
            console.error(`Failed to load pokemon ${id}`, e);
            return null;
          }
        })
      );
      return details.filter((d) => d !== null); // Filter out failed requests
    },
    enabled: visibleItems.length > 0,
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new page
  });

  const isLoading = isLoadingAll || (selectedType && isLoadingType) || (isLoadingDetails && !pokemonDetails);

  return (
    <Layout>
      <div className="min-h-screen bg-red-600 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Container "Tela" da Pokédex */}
          <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Header com Luzes */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b-4 border-black pb-8">
               <div className="flex items-start gap-4">
                  {/* Luz Principal Azul */}
                  <div className="relative h-20 w-20 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-3 left-3 h-6 w-6 rounded-full bg-white opacity-40"></div>
                  </div>
                  
                  {/* Luzes Pequenas */}
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-6 rounded-full bg-red-500 border-2 border-black shadow-sm" />
                    <div className="h-6 w-6 rounded-full bg-yellow-400 border-2 border-black shadow-sm" />
                    <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-black shadow-sm" />
                  </div>
               </div>

               <div className="flex-1">
                 <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                   Pokédex
                 </h1>
                 <p className="text-lg font-medium text-gray-600">
                   Explore todos os Pokémon conhecidos. Clique em um card para ver detalhes completos.
                 </p>
               </div>
            </div>

            {/* Filters & Search */}
            <div className="mb-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Buscar por nome ou número..."
                  className="w-full md:max-w-md"
                />
                <div className="bg-black text-white px-4 py-2 rounded-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                   {filteredList.length} Pokémon encontrados
                </div>
              </div>
              
              <PokemonFilters
                selectedType={selectedType}
                onSelectType={setSelectedType}
                selectedGen={selectedGen}
                onSelectGen={setSelectedGen}
                availableTypes={typesData?.results.map(t => t.name) || []}
              />
            </div>

            {/* Pokemon Grid */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                {pokemonDetails && pokemonDetails.length > 0 ? (
                  <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {pokemonDetails.map((pokemon) => (
                      <div key={pokemon!.id} className="h-full">
                        <PokemonCard
                          id={pokemon!.id}
                          name={pokemon!.name}
                          types={pokemon!.types}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center border-4 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <CircleDot className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-xl font-bold text-gray-500">Nenhum Pokémon encontrado.</p>
                    <p className="text-gray-400">Tente ajustar seus filtros de busca.</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-6 pt-4 border-t-4 border-black mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="h-12 w-12 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all bg-white disabled:opacity-50 disabled:shadow-none"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    
                    <span className="text-lg font-black bg-black text-white px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                      {page + 1} / {totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={page >= totalPages - 1}
                      className="h-12 w-12 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all bg-white disabled:opacity-50 disabled:shadow-none"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
