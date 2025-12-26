import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ChevronRight, Ruler, Scale } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { StatBar } from '@/components/pokemon/StatBar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
  getIdFromUrl,
  formatPokemonName,
  getPokemonImageUrl,
  TYPE_COLORS,
} from '@/lib/pokeapi';

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id!),
    enabled: !!id,
  });

  const { data: species, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => getPokemonSpecies(id!),
    enabled: !!id,
  });

  const { data: evolutionChain } = useQuery({
    queryKey: ['evolutionChain', species?.evolution_chain.url],
    queryFn: () => {
      const chainId = getIdFromUrl(species!.evolution_chain.url);
      return getEvolutionChain(chainId);
    },
    enabled: !!species?.evolution_chain.url,
  });

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!pokemon) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Pokémon não encontrado</h1>
          <Link to="/pokedex">
            <Button className="mt-4">Voltar à Pokédex</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const description = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ');

  const genus = species?.genera.find(
    (g) => g.language.name === 'en'
  )?.genus;

  // Get evolution chain as flat array
  const getEvolutions = (node: typeof evolutionChain.chain): Array<{ name: string; id: number }> => {
    const evolutions: Array<{ name: string; id: number }> = [];
    
    const traverse = (n: typeof node) => {
      evolutions.push({
        name: n.species.name,
        id: getIdFromUrl(n.species.url),
      });
      n.evolves_to.forEach(traverse);
    };
    
    traverse(node);
    return evolutions;
  };

  const evolutions = evolutionChain ? getEvolutions(evolutionChain.chain) : [];

  return (
    <Layout>
      {/* Header with gradient background */}
      <div
        className="relative overflow-hidden py-8"
        style={{
          background: `linear-gradient(to bottom, hsl(var(--${TYPE_COLORS[primaryType]})) 0%, hsl(var(--background)) 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <Link to="/pokedex">
            <Button variant="ghost" className="mb-4 gap-2 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>

          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
            {/* Pokemon Image */}
            <div className="relative mb-6 md:mb-0">
              <div className="absolute inset-0 rounded-full bg-primary-foreground/20 blur-3xl" />
              <img
                src={getPokemonImageUrl(pokemon.id)}
                alt={pokemon.name}
                className="relative h-64 w-64 object-contain drop-shadow-2xl animate-float md:h-80 md:w-80"
              />
            </div>

            {/* Pokemon Info */}
            <div className="flex-1 text-center md:text-left">
              <span className="mb-2 inline-block font-mono text-lg text-primary-foreground/70">
                #{pokemon.id.toString().padStart(3, '0')}
              </span>
              <h1 className="mb-2 text-4xl font-bold text-primary-foreground md:text-5xl">
                {formatPokemonName(pokemon.name)}
              </h1>
              {genus && (
                <p className="mb-4 text-lg text-primary-foreground/80">{genus}</p>
              )}

              <div className="mb-6 flex justify-center gap-2 md:justify-start">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
                ))}
              </div>

              <div className="flex justify-center gap-6 md:justify-start">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Ruler className="h-5 w-5" />
                  <span>{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Scale className="h-5 w-5" />
                  <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Description & Abilities */}
          <div className="space-y-8">
            {description && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Descrição</h2>
                <p className="text-muted-foreground">{description}</p>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-foreground">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                      a.is_hidden
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {formatPokemonName(a.ability.name)}
                    {a.is_hidden && ' (Oculta)'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">Estatísticas Base</h2>
            <div className="space-y-4">
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-between border-t border-border pt-4">
              <span className="font-semibold text-muted-foreground">Total</span>
              <span className="font-bold text-foreground">
                {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Evolution Chain */}
        {evolutions.length > 1 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">Cadeia de Evolução</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {evolutions.map((evo, index) => (
                <div key={evo.id} className="flex items-center gap-4">
                  <Link to={`/pokemon/${evo.id}`}>
                    <div
                      className={`group flex flex-col items-center rounded-xl p-4 transition-all hover:bg-muted ${
                        evo.id === pokemon.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={getPokemonImageUrl(evo.id)}
                        alt={evo.name}
                        className="h-20 w-20 object-contain transition-transform group-hover:scale-110"
                      />
                      <span className="mt-2 text-sm font-medium text-foreground">
                        {formatPokemonName(evo.name)}
                      </span>
                    </div>
                  </Link>
                  {index < evolutions.length - 1 && (
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
