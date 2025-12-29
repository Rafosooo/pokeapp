import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Gamepad2, MapPin, Sparkles, ChevronRight, Trophy } from 'lucide-react';
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
    color: 'bg-pokemon-fire',
  },
  {
    icon: Gamepad2,
    title: 'Jogos Pokémon',
    description: 'Descubra todos os jogos da franquia, de Red/Blue até os mais recentes.',
    link: '/games',
    color: 'bg-pokemon-water',
  },
  {
    icon: MapPin,
    title: 'Regiões & Locais',
    description: 'Explore as regiões do mundo Pokémon e descubra onde encontrar cada criatura.',
    link: '/regions',
    color: 'bg-pokemon-grass',
  },
  {
    icon: Trophy,
    title: 'Guia de Ginásios',
    description: 'Estratégias completas para vencer todos os líderes de ginásio e a Elite dos 4.',
    link: '/gyms',
    color: 'bg-yellow-500',
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
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
          <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Seu guia completo do mundo Pokémon
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Bem-vindo ao{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              PokéGuide
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Descubra, aprenda e domine o universo Pokémon. Explore a Pokédex, conheça os jogos, 
            viaje pelas regiões e monte seu time dos sonhos.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/pokedex">
              <Button size="lg" className="gap-2 shadow-lg">
                <BookOpen className="h-5 w-5" />
                Explorar Pokédex
              </Button>
            </Link>
            <Link to="/games">
              <Button size="lg" variant="outline" className="gap-2">
                <Gamepad2 className="h-5 w-5" />
                Ver Jogos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            O que você vai encontrar
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} text-primary-foreground shadow-md`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pokémon Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Pokémon em Destaque</h2>
            <Link to="/pokedex">
              <Button variant="ghost" className="gap-1">
                Ver todos
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {pokemonList?.map((pokemon) => (
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
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-center text-primary-foreground md:p-12">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Pronto para sua jornada?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg opacity-90">
                Comece explorando a Pokédex e descubra as características únicas de cada Pokémon!
              </p>
              <Link to="/pokedex">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
