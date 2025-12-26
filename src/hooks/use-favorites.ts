import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface FavoritePokemon {
  id: number;
  name: string;
  types: string[];
}

const STORAGE_KEY = 'pokeapp_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse favorites:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon: FavoritePokemon) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === pokemon.id)) return prev;
      toast.success(`${pokemon.name} adicionado aos favoritos!`);
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const pokemon = prev.find((p) => p.id === id);
      if (pokemon) {
        toast.info(`${pokemon.name} removido dos favoritos.`);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((p) => p.id === id);
  };

  const toggleFavorite = (pokemon: FavoritePokemon) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
