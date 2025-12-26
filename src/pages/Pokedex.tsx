import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { SearchInput } from '@/components/ui/search-input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { getPokemonList, getPokemon, getIdFromUrl } from '@/lib/pokeapi';

const ITEMS_PER_PAGE = 20;

export default function Pokedex() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data: pokemonListData, isLoading: isLoadingList } = useQuery({
    queryKey: ['pokemonList', page],
    queryFn: async () => {
      const list = await getPokemonList(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
      const pokemonDetails = await Promise.all(
        list.results.map(async (pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          const details = await getPokemon(id);
          return {
            id,
            name: pokemon.name,
            types: details.types.map((t) => t.type.name),
          };
        })
      );
      return {
        pokemon: pokemonDetails,
        total: list.count,
        hasNext: !!list.next,
        hasPrevious: !!list.previous,
      };
    },
  });

  const filteredPokemon = useMemo(() => {
    if (!pokemonListData?.pokemon) return [];
    if (!search) return pokemonListData.pokemon;
    
    const searchLower = search.toLowerCase();
    return pokemonListData.pokemon.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchLower) ||
        pokemon.id.toString().includes(search)
    );
  }, [pokemonListData?.pokemon, search]);

  const totalPages = pokemonListData ? Math.ceil(pokemonListData.total / ITEMS_PER_PAGE) : 0;

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

        {/* Search */}
        <div className="mb-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nome ou número..."
            className="max-w-md"
          />
        </div>

        {/* Pokemon Grid */}
        {isLoadingList ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                />
              ))}
            </div>

            {/* Pagination */}
            {!search && (
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {page + 1} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!pokemonListData?.hasNext}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
