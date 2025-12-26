import { Layout } from '@/components/layout/Layout';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { useFavorites } from '@/hooks/use-favorites';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Favoritos</h1>
          <p className="text-muted-foreground">
            Seus Pokémon favoritos salvos localmente.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              Você ainda não tem nenhum Pokémon favorito.
            </p>
            <Link to="/pokedex">
              <Button>Explorar Pokédex</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {favorites.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
