import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPokemonName } from '@/lib/pokeapi';
import { MapPin } from 'lucide-react';

interface RegionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  region: {
    name: string;
    locations: { name: string; url: string }[];
  } | null;
  onLocationSelect: (locationName: string) => void;
}

export function RegionDialog({ isOpen, onClose, region, onLocationSelect }: RegionDialogProps) {
  if (!region) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 gap-0 border-4 border-black shadow-[12px_12px_0px_0px_#15803d] bg-white overflow-hidden rounded-3xl">
        <DialogHeader className="px-6 py-6 border-b-[6px] border-black bg-zinc-800 text-white shrink-0 relative overflow-hidden">
          {/* Orange Ring (Dusk Ball Characteristic) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[16px] border-orange-500 opacity-20 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-start">
            <DialogTitle className="text-3xl font-black uppercase flex items-center gap-3 drop-shadow-md">
              <MapPin className="h-8 w-8 text-orange-500" />
              {formatPokemonName(region.name)}
            </DialogTitle>
            <p className="text-zinc-400 font-bold mt-1 text-sm uppercase tracking-wider">
              {region.locations.length} Locais Disponíveis
            </p>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-green-50 custom-scrollbar">
          <div className="grid gap-3">
            {region.locations.map((location) => (
              <button
                key={location.name}
                onClick={() => onLocationSelect(location.name)}
                className="w-full text-left rounded-xl border-4 border-black bg-white px-6 py-4 text-sm font-black uppercase text-gray-700 hover:bg-green-700 hover:text-white hover:shadow-[6px_6px_0px_0px_#f97316] hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group flex items-center justify-between"
              >
                <span>{formatPokemonName(location.name)}</span>
                <MapPin className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
