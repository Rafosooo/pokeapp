import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ChevronRight, Ruler, Scale, Heart, Volume2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { TypeBadge } from '@/components/pokemon/TypeBadge';
import { StatBar } from '@/components/pokemon/StatBar';
import { PokemonGallery } from '@/components/pokemon/PokemonGallery';
import { LocationDialog } from '@/components/pokemon/LocationDialog';
import { TypeEffectiveness } from '@/components/pokemon/TypeEffectiveness';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/use-favorites';
import {
  getPokemon,
  getPokemonSpecies,
  getEvolutionChain,
  getPokemonEncounters,
  getIdFromUrl,
  formatPokemonName,
  getPokemonImageUrl,
  TYPE_COLORS,
  getBulbapediaUrl,
  VERSION_TO_REGION,
  formatLocationName,
} from '@/lib/pokeapi';
import { translateText } from '@/lib/translate';
import { cn } from '@/lib/utils';
import { MapPin, ExternalLink } from 'lucide-react';

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{name: string, region?: string} | null>(null);
  const [translatedDescription, setTranslatedDescription] = useState<string>('');

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

  useEffect(() => {
    if (species) {
      const entry = species.flavor_text_entries.find((entry) => entry.language.name === 'en');
      if (entry) {
        const cleanText = entry.flavor_text.replace(/\f/g, ' ');
        translateText(cleanText).then(setTranslatedDescription);
      }
    }
  }, [species]);

  const { data: encounters } = useQuery({
    queryKey: ['pokemonEncounters', id],
    queryFn: () => getPokemonEncounters(Number(id!)),
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

  useEffect(() => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.1;
      audio.play().catch((e) => console.error('Error playing sound:', e));
    }
  }, [pokemon?.cries?.latest]);

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
  
  const genus = species?.genera.find(
    (g) => g.language.name === 'en'
  )?.genus;

  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((t) => t.type.name),
    });
  };

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.1;
      audio.play().catch((e) => console.error('Error playing sound:', e));
    }
  };

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
          <div className="flex items-center justify-between mb-4">
            <Link to="/pokedex">
              <Button variant="ghost" className="gap-2 text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            
            <div className="flex gap-2">
              {pokemon.cries?.latest && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={playCry}
                  title="Ouvir som"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={handleFavoriteClick}
                title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart className={cn("h-5 w-5 transition-colors", isFav ? "fill-red-500 text-red-500" : "")} />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
            {/* Pokemon Gallery */}
            <div className="mb-6 md:mb-0">
              <PokemonGallery pokemon={pokemon} />
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
              <p className="max-w-xl text-lg text-primary-foreground/90 md:mx-0 mb-6">
                {translatedDescription || 'Carregando descrição...'}
              </p>

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
            <h2 className="mb-4 text-xl font-bold text-foreground">Estatísticas</h2>
            <div className="space-y-4">
              {pokemon.stats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  name={s.stat.name}
                  value={s.base_stat}
                  max={255}
                  color={TYPE_COLORS[primaryType]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Type Effectiveness */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-xl font-bold text-foreground">Efetividade de Tipos</h2>
          <TypeEffectiveness types={pokemon.types.map(t => t.type.name)} />
        </div>

        {/* Locations */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Localizações</h2>
          </div>
          
          {encounters && encounters.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from(new Set(encounters.map(e => e.location_area.name))).map((areaName) => {
                const encounter = encounters.find(e => e.location_area.name === areaName);
                const version = encounter?.version_details[0]?.version.name;
                const region = version ? VERSION_TO_REGION[version] : undefined;

                return (
                  <button 
                    key={areaName}
                    onClick={() => setSelectedLocation({ name: areaName, region })}
                    className="group flex items-center justify-between rounded-lg bg-secondary/50 p-3 text-sm text-secondary-foreground hover:bg-secondary transition-all hover:scale-105 w-full text-left"
                    title="Ver detalhes da localização"
                  >
                    <span className="truncate mr-2">{formatLocationName(areaName)}</span>
                    <MapPin className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">Localização desconhecida ou não disponível.</p>
          )}
          
          <div className="mt-4 text-xs text-muted-foreground">
            * Mapas visuais não disponíveis na API atual.
          </div>
        </div>

        {/* Evolution Chain */}
        {evolutions.length > 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-bold text-foreground">Evoluções</h2>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {evolutions.map((evo, index) => (
                <div key={evo.id} className="flex items-center gap-4 md:gap-8">
                  <Link to={`/pokemon/${evo.id}`} className="group flex flex-col items-center">
                    <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full bg-secondary p-4 transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={getPokemonImageUrl(evo.id)}
                        alt={evo.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-foreground group-hover:text-primary">
                      {formatPokemonName(evo.name)}
                    </span>
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

      <LocationDialog 
        isOpen={!!selectedLocation} 
        onClose={() => setSelectedLocation(null)} 
        locationName={selectedLocation?.name || ''} 
        region={selectedLocation?.region} 
      />
    </Layout>
  );
}
