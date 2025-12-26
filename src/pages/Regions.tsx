import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { getRegions, getRegion, formatPokemonName } from '@/lib/pokeapi';
import { LocationDialog } from '@/components/pokemon/LocationDialog';

const REGION_COLORS = [
  'from-pokemon-fire to-pokemon-fighting',
  'from-pokemon-water to-pokemon-ice',
  'from-pokemon-grass to-pokemon-bug',
  'from-pokemon-electric to-pokemon-ground',
  'from-pokemon-psychic to-pokemon-ghost',
  'from-pokemon-dragon to-pokemon-flying',
  'from-pokemon-fairy to-pokemon-psychic',
  'from-pokemon-dark to-pokemon-steel',
  'from-pokemon-poison to-pokemon-dragon',
];

export default function Regions() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{name: string, region: string} | null>(null);

  const { data: regions, isLoading } = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const list = await getRegions();
      const details = await Promise.all(
        list.results.map((region) => getRegion(region.name))
      );
      return details.sort((a, b) => a.id - b.id);
    },
  });

  const selectedRegionData = regions?.find((r) => r.name === selectedRegion);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Regiões</h1>
          <p className="text-muted-foreground">
            Explore as diferentes regiões do mundo Pokémon e descubra seus locais.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Regions List */}
            <div className="lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {regions?.map((region, index) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.name)}
                    className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      selectedRegion === region.name ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${REGION_COLORS[index % REGION_COLORS.length]} opacity-10 transition-opacity group-hover:opacity-20`}
                    />

                    <div className="relative">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>

                      <h2 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {formatPokemonName(region.name)}
                      </h2>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {region.locations.length} locais
                        </span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Region Details */}
            <div className="lg:col-span-1">
              {selectedRegionData ? (
                <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">
                      {formatPokemonName(selectedRegionData.name)}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedRegion(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Locais ({selectedRegionData.locations.length})
                  </h3>

                  <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-2">
                      {selectedRegionData.locations.map((location) => (
                        <button
                          key={location.name}
                          onClick={() => setSelectedLocation({ name: location.name, region: selectedRegionData.name })}
                          className="w-full text-left rounded-lg bg-muted px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {formatPokemonName(location.name)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sticky top-24 rounded-2xl border border-dashed border-border bg-muted/50 p-8 text-center">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Selecione uma região para ver seus locais
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <LocationDialog
            isOpen={!!selectedLocation}
            onClose={() => setSelectedLocation(null)}
            locationName={selectedLocation?.name || ''}
            region={selectedLocation?.region}
        />
      </div>
    </Layout>
  );
}
