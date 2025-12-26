const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}

export interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolution_details: Array<{
    min_level: number | null;
    trigger: {
      name: string;
    };
    item: {
      name: string;
    } | null;
  }>;
  evolves_to: EvolutionNode[];
}

export interface Game {
  id: number;
  name: string;
  generation: {
    name: string;
    url: string;
  };
}

export interface Generation {
  id: number;
  name: string;
  main_region: {
    name: string;
  };
  pokemon_species: Array<{
    name: string;
    url: string;
  }>;
  version_groups: Array<{
    name: string;
    url: string;
  }>;
}

export interface Region {
  id: number;
  name: string;
  locations: Array<{
    name: string;
    url: string;
  }>;
  main_generation: {
    name: string;
  };
}

export interface Location {
  id: number;
  name: string;
  region: {
    name: string;
  };
  areas: Array<{
    name: string;
    url: string;
  }>;
}

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return res.json();
}

export async function getPokemon(idOrName: string | number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  return res.json();
}

export async function getPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
  return res.json();
}

export async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  const res = await fetch(`${BASE_URL}/evolution-chain/${id}`);
  return res.json();
}

export async function getGenerations(): Promise<{ results: Array<{ name: string; url: string }> }> {
  const res = await fetch(`${BASE_URL}/generation`);
  return res.json();
}

export async function getGeneration(idOrName: string | number): Promise<Generation> {
  const res = await fetch(`${BASE_URL}/generation/${idOrName}`);
  return res.json();
}

export async function getRegions(): Promise<{ results: Array<{ name: string; url: string }> }> {
  const res = await fetch(`${BASE_URL}/region`);
  return res.json();
}

export async function getRegion(idOrName: string | number): Promise<Region> {
  const res = await fetch(`${BASE_URL}/region/${idOrName}`);
  return res.json();
}

export async function getLocation(idOrName: string | number): Promise<Location> {
  const res = await fetch(`${BASE_URL}/location/${idOrName}`);
  return res.json();
}

export async function getVersionGroups(): Promise<{ results: Array<{ name: string; url: string }> }> {
  const res = await fetch(`${BASE_URL}/version-group`);
  return res.json();
}

export function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export const TYPE_COLORS: Record<string, string> = {
  normal: 'pokemon-normal',
  fire: 'pokemon-fire',
  water: 'pokemon-water',
  electric: 'pokemon-electric',
  grass: 'pokemon-grass',
  ice: 'pokemon-ice',
  fighting: 'pokemon-fighting',
  poison: 'pokemon-poison',
  ground: 'pokemon-ground',
  flying: 'pokemon-flying',
  psychic: 'pokemon-psychic',
  bug: 'pokemon-bug',
  rock: 'pokemon-rock',
  ghost: 'pokemon-ghost',
  dragon: 'pokemon-dragon',
  dark: 'pokemon-dark',
  steel: 'pokemon-steel',
  fairy: 'pokemon-fairy',
};
