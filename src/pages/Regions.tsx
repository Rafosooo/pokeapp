import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { getRegions, getRegion, formatPokemonName } from '@/lib/pokeapi';
import { LocationDialog } from '@/components/pokemon/LocationDialog';
import { RegionDialog } from '@/components/pokemon/RegionDialog';

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
      <div className="min-h-screen bg-zinc-950 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main Content Card (White Bottom) */}
          <div className="bg-white rounded-[2rem] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_0px_#15803d]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 border-b-4 border-black pb-8">
               {/* Dusk Ball Icon */}
               <div className="relative h-20 w-20 shrink-0 rounded-full border-4 border-black bg-green-600 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  {/* Top Black Half */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-zinc-800 border-b-4 border-black"></div>
                  
                  {/* Orange Ring on Top */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full border-4 border-orange-500 z-10"></div>
                  
                  {/* Center Button */}
                  <div className="absolute top-1/2 left-1/2 h-8 w-8 bg-white border-4 border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-sm">
                    <div className="h-2 w-2 bg-zinc-400 rounded-full"></div>
                  </div>
               </div>
               
               <div className="flex-1">
                 <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black mb-2">
                   Regiões
                 </h1>
                 <p className="text-lg font-medium text-gray-600">
                   Explore as diferentes regiões do mundo Pokémon e descubra seus locais.
                 </p>
               </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regions?.map((region, index) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.name)}
                    className={`group relative overflow-hidden rounded-2xl border-4 border-black bg-white p-6 text-left transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#15803d] hover:-translate-y-1 ${
                      selectedRegion === region.name 
                        ? 'bg-green-50 shadow-[6px_6px_0px_0px_#f97316] translate-x-1' 
                        : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${REGION_COLORS[index % REGION_COLORS.length]} opacity-10 transition-opacity group-hover:opacity-20`}
                    />

                    <div className="relative">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 border-2 border-black text-green-900 group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                        <MapPin className="h-6 w-6" />
                      </div>

                      <h2 className="mb-2 text-xl font-black uppercase text-black group-hover:text-green-900 transition-colors">
                        {formatPokemonName(region.name)}
                      </h2>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700">
                          {region.locations.length} locais
                        </span>
                        <ChevronRight className="h-6 w-6 text-black border-2 border-transparent group-hover:border-black rounded-full transition-all group-hover:bg-white" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <RegionDialog 
            isOpen={!!selectedRegion}
            onClose={() => setSelectedRegion(null)}
            region={selectedRegionData || null}
            onLocationSelect={(locationName) => setSelectedLocation({ name: locationName, region: selectedRegion || '' })}
        />

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
