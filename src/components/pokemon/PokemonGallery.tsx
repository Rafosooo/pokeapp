import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pokemon } from '@/lib/pokeapi';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PokemonGalleryProps {
  pokemon: Pokemon;
}

type SpriteView = 'front' | 'back';

export function PokemonGallery({ pokemon }: PokemonGalleryProps) {
  const [isShiny, setIsShiny] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);

  const sprites = useMemo(() => {
    const s = pokemon.sprites;
    const showdown = s.other?.showdown;
    
    // Determine sources based on availability
    // Priority: Showdown (GIF) -> Official Artwork (High Res) -> Default (Pixel)
    
    const views: Array<{ url: string; label: string }> = [];

    // Front
    let frontUrl = '';
    if (isShiny) {
      frontUrl = showdown?.front_shiny || s.other?.['official-artwork']?.front_shiny || s.front_shiny || '';
    } else {
      frontUrl = showdown?.front_default || s.other?.['official-artwork']?.front_default || s.front_default || '';
    }
    if (frontUrl) views.push({ url: frontUrl, label: 'Frente' });

    // Back
    let backUrl = '';
    if (isShiny) {
      backUrl = showdown?.back_shiny || s.back_shiny || '';
    } else {
      backUrl = showdown?.back_default || s.back_default || '';
    }
    if (backUrl) views.push({ url: backUrl, label: 'Costas' });

    return views;
  }, [pokemon, isShiny]);

  const currentSprite = sprites[viewIndex % sprites.length];

  const handleNext = () => {
    setViewIndex((prev) => (prev + 1) % sprites.length);
  };

  const handlePrev = () => {
    setViewIndex((prev) => (prev - 1 + sprites.length) % sprites.length);
  };

  if (sprites.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main Image Area */}
      <div className="relative flex items-center justify-center">
        {/* Navigation Arrows */}
        {sprites.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-12 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-45%] hover:shadow-none transition-all hover:bg-gray-100"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div className="relative h-64 w-64 md:h-80 md:w-80">
          <div className="absolute inset-0 rounded-full bg-white/40 blur-3xl" />
          <img
            src={currentSprite.url}
            alt={`${pokemon.name} ${currentSprite.label}`}
            className="relative h-full w-full object-contain drop-shadow-xl animate-in fade-in zoom-in duration-300"
            key={currentSprite.url} // Force re-render on change for animation
          />
        </div>

        {sprites.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-12 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-45%] hover:shadow-none transition-all hover:bg-gray-100"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        {/* View Indicator */}
        <div className="flex gap-2">
          {sprites.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-3 w-3 rounded-full border border-black transition-all",
                idx === viewIndex % sprites.length
                  ? "bg-black"
                  : "bg-transparent"
              )}
            />
          ))}
        </div>
        <p className="text-sm font-black text-gray-500 uppercase tracking-wider">
          {currentSprite.label}
        </p>

        {/* Shiny Toggle */}
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
          <Label htmlFor="shiny-mode" className="text-sm font-bold text-gray-500 cursor-pointer uppercase">
            Normal
          </Label>
          <Switch
            id="shiny-mode"
            checked={isShiny}
            onCheckedChange={setIsShiny}
            className="data-[state=checked]:bg-yellow-400 border-2 border-black"
          />
          <Label 
            htmlFor="shiny-mode" 
            className={cn(
              "flex items-center gap-1 text-sm font-bold cursor-pointer uppercase",
              isShiny ? "text-yellow-600" : "text-gray-500"
            )}
          >
            <Sparkles className="h-3 w-3" />
            Shiny
          </Label>
        </div>
      </div>
    </div>
  );
}
