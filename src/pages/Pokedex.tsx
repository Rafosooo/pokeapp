import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { SearchInput } from '@/components/ui/search-input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { getAllPokemon, getPokemon, getIdFromUrl, getTypes, getType, GENERATION_RANGES } from '@/lib/pokeapi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PokemonFilters } from '@/components/pokemon/PokemonFilters';

const ITEMS_PER_PAGE = 20;

export default function Pokedex() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGen, setSelectedGen] = useState<string | null>(null);
  const [page, setPage] = useState(0);

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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Pokédex</h1>
          <p className="text-muted-foreground">
            Explore todos os Pokémon conhecidos. Clique em um para ver mais detalhes.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nome ou número..."
            className="max-w-md"
          />
          
          <PokemonFilters
            selectedType={selectedType}
            onSelectType={setSelectedType}
            selectedGen={selectedGen}
            onSelectGen={setSelectedGen}
            availableTypes={typesData?.results.map(t => t.name) || []}
          />

          <p className="text-sm text-muted-foreground">
            Encontrados {filteredList.length} resultados
          </p>
        </div>

        {/* Pokemon Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {pokemonDetails && pokemonDetails.length > 0 ? (
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {pokemonDetails.map((pokemon) => (
                  <PokemonCard
                    key={pokemon!.id}
                    id={pokemon!.id}
                    name={pokemon!.name}
                    types={pokemon!.types}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum Pokémon encontrado.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Página {page + 1} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
