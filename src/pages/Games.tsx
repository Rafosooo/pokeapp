import { useQuery } from '@tanstack/react-query';
import { Gamepad2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getGenerations, getGeneration, formatPokemonName } from '@/lib/pokeapi';

const GENERATION_INFO: Record<string, { region: string; years: string; games: string[] }> = {
  'generation-i': {
    region: 'Kanto',
    years: '1996-1999',
    games: ['Red', 'Blue', 'Yellow'],
  },
  'generation-ii': {
    region: 'Johto',
    years: '1999-2002',
    games: ['Gold', 'Silver', 'Crystal'],
  },
  'generation-iii': {
    region: 'Hoenn',
    years: '2002-2006',
    games: ['Ruby', 'Sapphire', 'Emerald', 'FireRed', 'LeafGreen'],
  },
  'generation-iv': {
    region: 'Sinnoh',
    years: '2006-2010',
    games: ['Diamond', 'Pearl', 'Platinum', 'HeartGold', 'SoulSilver'],
  },
  'generation-v': {
    region: 'Unova',
    years: '2010-2013',
    games: ['Black', 'White', 'Black 2', 'White 2'],
  },
  'generation-vi': {
    region: 'Kalos',
    years: '2013-2016',
    games: ['X', 'Y', 'Omega Ruby', 'Alpha Sapphire'],
  },
  'generation-vii': {
    region: 'Alola',
    years: '2016-2019',
    games: ['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon', 'Let\'s Go Pikachu', 'Let\'s Go Eevee'],
  },
  'generation-viii': {
    region: 'Galar',
    years: '2019-2022',
    games: ['Sword', 'Shield', 'Brilliant Diamond', 'Shining Pearl', 'Legends: Arceus'],
  },
  'generation-ix': {
    region: 'Paldea',
    years: '2022-presente',
    games: ['Scarlet', 'Violet'],
  },
};

const GENERATION_COLORS = [
  'from-pokemon-fire to-pokemon-fire/70',
  'from-pokemon-water to-pokemon-water/70',
  'from-pokemon-grass to-pokemon-grass/70',
  'from-pokemon-electric to-pokemon-electric/70',
  'from-pokemon-psychic to-pokemon-psychic/70',
  'from-pokemon-ice to-pokemon-ice/70',
  'from-pokemon-dragon to-pokemon-dragon/70',
  'from-pokemon-fairy to-pokemon-fairy/70',
  'from-pokemon-ghost to-pokemon-ghost/70',
];

export default function Games() {
  const { data: generations, isLoading } = useQuery({
    queryKey: ['generations'],
    queryFn: async () => {
      const list = await getGenerations();
      const details = await Promise.all(
        list.results.map(async (gen) => {
          const genData = await getGeneration(gen.name);
          return {
            ...genData,
            info: GENERATION_INFO[gen.name],
          };
        })
      );
      return details.sort((a, b) => a.id - b.id);
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Jogos Pokémon</h1>
          <p className="text-muted-foreground">
            Explore todas as gerações de jogos Pokémon, desde os clássicos até os mais recentes.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {generations?.map((gen, index) => (
              <div
                key={gen.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Header with gradient */}
                <div
                  className={`relative bg-gradient-to-r ${GENERATION_COLORS[index % GENERATION_COLORS.length]} p-6 text-primary-foreground`}
                >
                  <div className="absolute right-4 top-4 opacity-20">
                    <Gamepad2 className="h-20 w-20" />
                  </div>
                  <span className="mb-1 block text-sm font-medium opacity-80">
                    Geração {gen.id}
                  </span>
                  <h2 className="text-2xl font-bold">
                    {gen.info?.region || formatPokemonName(gen.main_region.name)}
                  </h2>
                  {gen.info?.years && (
                    <span className="mt-2 inline-block rounded-full bg-primary-foreground/20 px-3 py-1 text-sm">
                      {gen.info.years}
                    </span>
                  )}
                </div>

                {/* Games list */}
                <div className="p-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Jogos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {gen.info?.games.map((game) => (
                      <span
                        key={game}
                        className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        {game}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">
                      {gen.pokemon_species.length} Pokémon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
