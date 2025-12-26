const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string | null;
      };
      showdown: {
        front_default: string | null;
        back_default: string | null;
        front_shiny: string | null;
        back_shiny: string | null;
      } | null;
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
  cries: {
    latest: string;
    legacy: string;
  };
  location_area_encounters: string;
}

export interface LocationAreaEncounter {
  location_area: {
    name: string;
    url: string;
  };
  version_details: Array<{
    max_chance: number;
    encounter_details: Array<{
      min_level: number;
      max_level: number;
      condition_values: Array<{
        name: string;
      }>;
      chance: number;
      method: {
        name: string;
      };
    }>;
    version: {
      name: string;
    };
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

export async function getTypes(): Promise<{ results: Array<{ name: string; url: string }> }> {
  const res = await fetch(`${BASE_URL}/type`);
  return res.json();
}

export async function getType(idOrName: string | number): Promise<{ pokemon: Array<{ pokemon: { name: string; url: string } }> }> {
  const res = await fetch(`${BASE_URL}/type/${idOrName}`);
  return res.json();
}

export const GENERATION_RANGES: Record<number, [number, number]> = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1025]
};

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return res.json();
}

export async function getAllPokemon(): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=10000`);
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

export interface LocationArea {
  id: number;
  name: string;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<{
      version: {
        name: string;
      };
      max_chance: number;
      encounter_details: Array<{
        min_level: number;
        max_level: number;
        condition_values: Array<{
          name: string;
        }>;
        chance: number;
        method: {
          name: string;
        };
      }>;
    }>;
  }>;
}

export async function getLocationArea(idOrName: string | number): Promise<LocationArea> {
  const res = await fetch(`${BASE_URL}/location-area/${idOrName}`);
  return res.json();
}

export async function getPokemonEncounters(id: number): Promise<LocationAreaEncounter[]> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}/encounters`);
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

export const VERSION_TO_REGION: Record<string, string> = {
  'red': 'Kanto', 'blue': 'Kanto', 'yellow': 'Kanto',
  'firered': 'Kanto', 'leafgreen': 'Kanto',
  'lets-go-pikachu': 'Kanto', 'lets-go-eevee': 'Kanto',
  'gold': 'Johto', 'silver': 'Johto', 'crystal': 'Johto',
  'heartgold': 'Johto', 'soulsilver': 'Johto',
  'ruby': 'Hoenn', 'sapphire': 'Hoenn', 'emerald': 'Hoenn',
  'omega-ruby': 'Hoenn', 'alpha-sapphire': 'Hoenn',
  'diamond': 'Sinnoh', 'pearl': 'Sinnoh', 'platinum': 'Sinnoh',
  'brilliant-diamond': 'Sinnoh', 'shining-pearl': 'Sinnoh',
  'legends-arceus': 'Hisui',
  'black': 'Unova', 'white': 'Unova',
  'black-2': 'Unova', 'white-2': 'Unova',
  'x': 'Kalos', 'y': 'Kalos',
  'sun': 'Alola', 'moon': 'Alola',
  'ultra-sun': 'Alola', 'ultra-moon': 'Alola',
  'sword': 'Galar', 'shield': 'Galar',
  'scarlet': 'Paldea', 'violet': 'Paldea',
  'colosseum': 'Orre', 'xd': 'Orre'
};

const LOCATION_NAME_CORRECTIONS: Record<string, string> = {
  'digletts-cave': "Diglett's Cave",
  'mt-moon': 'Mt. Moon',
  'ss-anne': 'S.S. Anne',
  'ss-aqua': 'S.S. Aqua',
  'pokemon-tower': 'Pokémon Tower',
  'pokemon-mansion': 'Pokémon Mansion',
  'rocket-hideout': 'Team Rocket Hideout',
  'victory-road': 'Victory Road',
  'safari-zone': 'Safari Zone',
  'power-plant': 'Power Plant',
  'cerulean-cave': 'Cerulean Cave',
  'unknown-dungeon': 'Cerulean Cave',
  'rock-tunnel': 'Rock Tunnel',
  'seafoam-islands': 'Seafoam Islands',
  'viridian-forest': 'Viridian Forest',
  'mt-silver': 'Mt. Silver',
  'mt-pyre': 'Mt. Pyre',
  'mt-coronet': 'Mt. Coronet',
  'great-marsh': 'Great Marsh',
  'solaceon-ruins': 'Solaceon Ruins',
  'lake-verity': 'Lake Verity',
  'lake-valor': 'Lake Valor',
  'lake-acuity': 'Lake Acuity',
  'distorsion-world': 'Distortion World',
  'dream-yard': 'Dreamyard',
  'pinwheel-forest': 'Pinwheel Forest',
  'desert-resort': 'Desert Resort',
  'relic-castle': 'Relic Castle',
  'cold-storage': 'Cold Storage',
  'chargestone-cave': 'Chargestone Cave',
  'twist-mountain': 'Twist Mountain',
  'dragonspiral-tower': 'Dragonspiral Tower',
  'moor-of-icirrus': 'Moor of Icirrus',
  'challengers-cave': "Challenger's Cave",
  'giant-chasm': 'Giant Chasm',
  'village-bridge': 'Village Bridge',
  'marvelous-bridge': 'Marvelous Bridge',
  'abundant-shrine': 'Abundant Shrine',
  'lostlorn-forest': 'Lostlorn Forest',
  'trial-chamber': 'Trial Chamber',
  'guidance-chamber': 'Guidance Chamber',
  'rumination-field': 'Rumination Field',
  'n-s-castle': "N's Castle",
  'skyarrow-bridge': 'Skyarrow Bridge',
  'driftveil-drawbridge': 'Driftveil Drawbridge',
  'tubeline-bridge': 'Tubeline Bridge',
  'unity-tower': 'Unity Tower',
  'pledge-grove': 'Pledge Grove',
  'floccesy-ranch': 'Floccesy Ranch',
  'virbank-complex': 'Virbank Complex',
  'castelia-sewers': 'Castelia Sewers',
  'reversal-mountain': 'Reversal Mountain',
  'strange-house': 'Strange House',
  'pokemon-world-tournament': 'Pokémon World Tournament',
  'plasma-frigate': 'Plasma Frigate',
  'seaside-cave': 'Seaside Cave',
  'white-treehollow': 'White Treehollow',
  'black-tower': 'Black Tower',
  'cave-of-being': 'Cave of Being',
  'clay-tunnel': 'Clay Tunnel',
  'underground-ruins': 'Underground Ruins',
  'p2-laboratory': 'P2 Laboratory',
  'nature-preserve': 'Nature Preserve',
  'lake-of-rage': 'Lake of Rage',
};

export function formatLocationName(name: string): string {
  // Remover sufixos comuns da API para tentar dar match no dicionário
  let cleanNameBase = name
    .replace(/-area$/, '')
    .replace(/-[1-9]f$/, '')
    .replace(/-b[1-9]f$/, '')
    .replace(/-entrance$/, '')
    .replace(/-exit$/, '')
    .replace(/-exterior$/, '')
    .replace(/-interior$/, '')
    .replace(/-room-?.*$/, '');
    
  if (LOCATION_NAME_CORRECTIONS[cleanNameBase]) {
    return LOCATION_NAME_CORRECTIONS[cleanNameBase];
  }
  
  // Formatação Genérica
  let titleCase = cleanNameBase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return titleCase;
}

export function getBulbapediaPageTitle(locationName: string, region?: string): string {
  const formattedName = formatLocationName(locationName);
  const formattedNameUnderscore = formattedName.replace(/ /g, '_');
  
  // Regras baseadas em Região
  if (region) {
    // Rotas: Route 1 -> Kanto_Route_1
    if (/^Route \d+$/.test(formattedName)) {
      return `${region}_Route_${formattedName.split(' ')[1]}`;
    }
    
    // Victory Road
    if (formattedName === 'Victory Road') {
      return `Victory_Road_(${region})`;
    }
    
    // Safari Zone
    if (formattedName === 'Safari Zone') {
      return `${region}_Safari_Zone`;
    }
  }
  
  return formattedNameUnderscore;
}

export function getBulbapediaUrl(locationName: string, region?: string): string {
  const pageTitle = getBulbapediaPageTitle(locationName, region);
  return `https://bulbapedia.bulbagarden.net/wiki/${pageTitle}`;
}
