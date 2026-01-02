import { Layout } from '@/components/layout/Layout';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { useFavorites } from '@/hooks/use-favorites';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_#DB2777]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-4 border-black pb-8">
               <div className="flex items-center gap-6">
                 {/* Love Ball Icon */}
                 <div className="relative h-20 w-20 shrink-0 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    {/* Top Pink Half */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-pink-500 border-b-4 border-black"></div>
                    
                    {/* Heart Detail */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/90 z-10">
                        <Heart className="h-6 w-6 fill-white stroke-black stroke-[1.5]" />
                    </div>
                    
                    {/* Center Button */}
                    <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-sm">
                      <div className="h-2 w-2 bg-zinc-400 rounded-full"></div>
                    </div>
                 </div>
                 
                 <div>
                   <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                     Favoritos
                   </h1>
                   <p className="text-lg font-medium text-gray-600">
                     Seus Pokémon favoritos salvos localmente
                   </p>
                 </div>
               </div>
               
               <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-pink-100 border-2 border-black rounded-full font-bold text-pink-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                    {favorites.length} {favorites.length === 1 ? 'Pokémon' : 'Pokémon'}
                  </div>
               </div>
            </div>

            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border-4 border-dashed border-pink-300 bg-pink-50/50 rounded-xl">
                 <div className="relative h-24 w-24 mb-6 opacity-50 grayscale">
                    <div className="absolute inset-0 rounded-full border-4 border-black bg-white overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-pink-400 border-b-4 border-black"></div>
                      <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20"></div>
                    </div>
                 </div>
                <p className="mb-6 text-xl font-bold text-pink-900">
                  Você ainda não tem nenhum Pokémon favorito.
                </p>
                <Link to="/pokedex">
                  <Button className="h-12 px-8 border-2 border-black bg-pink-600 text-white hover:bg-pink-700 shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all font-bold uppercase tracking-wide rounded-lg">
                    Explorar Pokédex
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favorites.map((pokemon) => (
                  <div key={pokemon.id} className="relative group hover:-translate-y-1 transition-transform duration-300">
                    <PokemonCard
                      id={pokemon.id}
                      name={pokemon.name}
                      types={pokemon.types}
                    />
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
