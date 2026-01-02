import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Gamepad2, MapPin, Sparkles, ChevronRight, Trophy, CircleDot, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getPokemonList, getPokemon, getIdFromUrl } from '@/lib/pokeapi';

const features = [
  {
    icon: BookOpen,
    title: 'Pokédex Completa',
    description: 'Explore todos os Pokémon com estatísticas detalhadas, evoluções e habilidades.',
    link: '/pokedex',
    color: 'bg-white text-red-600',
    hover: 'group-hover:bg-red-50',
  },
  {
    icon: Swords,
    title: 'Montador de Times',
    description: 'Crie e analise sua equipe Pokémon ideal, verificando fraquezas e vantagens.',
    link: '/team-builder',
    color: 'bg-white text-red-600',
    hover: 'group-hover:bg-red-50',
  },
  {
    icon: Gamepad2,
    title: 'Jogos Pokémon',
    description: 'Descubra todos os jogos da franquia, de Red/Blue até os mais recentes.',
    link: '/games',
    color: 'bg-white text-red-600',
    hover: 'group-hover:bg-red-50',
  },
  {
    icon: MapPin,
    title: 'Regiões & Locais',
    description: 'Explore as regiões do mundo Pokémon e descubra onde encontrar cada criatura.',
    link: '/regions',
    color: 'bg-white text-red-600',
    hover: 'group-hover:bg-red-50',
  },
  {
    icon: Trophy,
    title: 'Guia de Ginásios',
    description: 'Estratégias completas para vencer todos os líderes de ginásio e a Elite dos 4.',
    link: '/gyms',
    color: 'bg-white text-red-600',
    hover: 'group-hover:bg-red-50',
  },
];

export default function Index() {
  const { data: pokemonList, isLoading } = useQuery({
    queryKey: ['featuredPokemon'],
    queryFn: async () => {
      const list = await getPokemonList(6, 0);
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
      return pokemonDetails;
    },
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-red-600 text-white py-24 lg:py-32 border-b-[16px] border-black">
        {/* Pokeball Background Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
           {/* Half Circles simulating Pokeball */}
           <div className="relative w-[120vh] h-[120vh] rounded-full border-[100px] border-black/20 flex items-center justify-center">
              <div className="w-[110%] h-24 bg-red-600 absolute rotate-45"></div>
              <div className="w-full h-24 bg-red-600 absolute -rotate-45"></div>
           </div>
        </div>
        
        {/* Giant Pokeball Overlay - Right Side */}
        <div className="absolute -right-20 -bottom-40 w-96 h-96 opacity-20 pointer-events-none animate-pulse-slow hidden md:block">
           <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
              <circle cx="50" cy="50" r="45" />
              <path d="M 5 50 L 95 50 M 50 50 L 50 50" stroke="black" strokeWidth="4" />
              <circle cx="50" cy="50" r="15" fill="black" />
              <circle cx="50" cy="50" r="10" fill="white" />
           </svg>
        </div>

        <div className="container relative mx-auto px-4 text-center z-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/30 px-6 py-2 text-sm font-bold text-white backdrop-blur-sm border-2 border-white/20 shadow-lg">
            <CircleDot className="h-4 w-4 animate-spin-slow" />
            SEU GUIA COMPLETO DO MUNDO POKÉMON
          </div>

          <h1 className="mb-8 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-8xl drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]">
            BEM-VINDO AO{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-white">KEPONOM</span>
              <span className="absolute bottom-3 left-0 w-full h-6 bg-black/20 -rotate-2 -z-0 rounded-full blur-sm"></span>
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl text-white font-bold drop-shadow-md">
            Descubra, aprenda e domine o universo Pokémon. Explore a Pokédex, conheça os jogos, 
            viaje pelas regiões e monte seu time dos sonhos.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link to="/pokedex">
              <Button size="lg" className="gap-3 h-16 px-10 text-xl bg-white text-black font-black uppercase tracking-wide hover:bg-gray-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-full">
                <CircleDot className="h-6 w-6 text-red-600" />
                Explorar Pokédex
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <span className="text-red-600 font-black tracking-widest text-sm uppercase mb-3 block">FUNCIONALIDADES</span>
             <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
              Tudo para sua Jornada
            </h2>
            <div className="flex justify-center mt-6 gap-2">
                <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-black"></div>
                <div className="w-4 h-4 rounded-full bg-black border-2 border-black"></div>
                <div className="w-4 h-4 rounded-full bg-white border-2 border-black"></div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link}>
                <div className="group h-full relative overflow-hidden rounded-3xl border-4 border-black bg-white p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:-translate-y-2">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <feature.icon className="h-32 w-32 text-black -mr-10 -mt-10 rotate-12" />
                  </div>
                  
                  <div
                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-black text-black uppercase tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pokémon Section */}
      <section className="py-24 bg-red-600 border-y-[12px] border-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-4 relative">
          <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="text-white">
              <span className="font-black tracking-widest text-sm uppercase mb-2 block opacity-80">SELEÇÃO ESPECIAL</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight drop-shadow-md">
                Pokémon em Destaque
              </h2>
            </div>
            <Link to="/pokedex">
              <Button className="gap-2 h-12 px-6 text-lg bg-white text-black font-black uppercase tracking-wide border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all rounded-full hover:bg-gray-100">
                Ver Pokédex
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" variant="white" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
              {pokemonList?.map((pokemon) => (
                <div key={pokemon.id}>
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
      </section>

      {/* CTA Section Removed */}
    </Layout>
  );
}
