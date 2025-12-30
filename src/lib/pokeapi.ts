const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }>;
}

export interface Pokemon {
  id: number;
  name: string;
  moves: Move[];
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

export interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
  };
  item: {
    name: string;
  } | null;
  held_item: {
    name: string;
  } | null;
  known_move: {
    name: string;
  } | null;
  known_move_type: {
    name: string;
  } | null;
  location: {
    name: string;
  } | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  time_of_day: string;
  needs_overworld_rain: boolean;
  relative_physical_stats: number | null;
  turn_upside_down: boolean;
  gender: number | null;
}

export interface EvolutionNode {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[];
}

export function formatEvolutionDetails(details: EvolutionDetail): string {
  const parts = [];

  if (details.min_level) parts.push(`Lvl ${details.min_level}`);
  if (details.min_happiness) parts.push(`Felicidade ${details.min_happiness}`);
  if (details.min_beauty) parts.push(`Beleza ${details.min_beauty}`);
  if (details.min_affection) parts.push(`Afeto ${details.min_affection}`);
  
  if (details.item) parts.push(`Usar ${formatPokemonName(details.item.name)}`);
  if (details.held_item) parts.push(`Segurar ${formatPokemonName(details.held_item.name)}`);
  
  if (details.known_move) parts.push(`Saber ${formatPokemonName(details.known_move.name)}`);
  if (details.known_move_type) parts.push(`Saber golpe tipo ${formatPokemonName(details.known_move_type.name)}`);
  
  if (details.location) parts.push(`Em ${formatLocationName(details.location.name)}`);
  if (details.time_of_day) parts.push(details.time_of_day === 'day' ? 'Dia' : 'Noite');
  
  if (details.trigger.name === 'trade') parts.push('Troca');
  if (details.trigger.name === 'shed') parts.push('Shedinja');
  
  if (details.needs_overworld_rain) parts.push('Chuva');
  if (details.turn_upside_down) parts.push('Virar console');
  
  if (details.gender === 1) parts.push('Fêmea');
  if (details.gender === 2) parts.push('Macho');

  // Fallback se não houver condição específica além do trigger
  if (parts.length === 0 && details.trigger.name !== 'level-up') {
      if (details.trigger.name === 'three-critical-hits') parts.push('3 Críticos num combate');
      else if (details.trigger.name === 'galar-yamask') parts.push('49+ Dano sofrido');
      else if (details.trigger.name === 'take-damage') parts.push('Receber dano');
      else if (details.trigger.name === 'spin') parts.push('Girar');
      else if (details.trigger.name === 'tower-of-darkness') parts.push('Torre das Trevas');
      else if (details.trigger.name === 'tower-of-waters') parts.push('Torre da Água');
      else parts.push(formatPokemonName(details.trigger.name));
  }

  return parts.join(', ');
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

export interface TypeRelations {
  double_damage_from: Array<{ name: string; url: string }>;
  double_damage_to: Array<{ name: string; url: string }>;
  half_damage_from: Array<{ name: string; url: string }>;
  half_damage_to: Array<{ name: string; url: string }>;
  no_damage_from: Array<{ name: string; url: string }>;
  no_damage_to: Array<{ name: string; url: string }>;
}

export interface TypeDetail {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export async function getTypes(): Promise<{ results: Array<{ name: string; url: string }> }> {
  const res = await fetch(`${BASE_URL}/type`);
  return res.json();
}

export async function getType(idOrName: string | number): Promise<TypeDetail> {
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

export interface MoveDetail {
  id: number;
  name: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export async function getMove(idOrName: string | number): Promise<MoveDetail> {
  const res = await fetch(`${BASE_URL}/move/${idOrName}`);
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
  const param = typeof idOrName === 'string' 
    ? idOrName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
    : idOrName;
  const res = await fetch(`${BASE_URL}/location/${param}`);
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
  const param = typeof idOrName === 'string' 
    ? idOrName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
    : idOrName;
  const res = await fetch(`${BASE_URL}/location-area/${param}`);
  return res.json();
}

export async function getPokemonEncounters(id: number): Promise<LocationAreaEncounter[]> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}/encounters`);
  return res.json();
}

export interface VersionGroup {
  id: number;
  name: string;
  generation: {
    name: string;
    url: string;
  };
  regions: Array<{
    name: string;
    url: string;
  }>;
  pokedexes: Array<{
    name: string;
    url: string;
  }>;
}

export interface Pokedex {
  id: number;
  name: string;
  pokemon_entries: Array<{
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }>;
}

export async function getVersionGroups(): Promise<{ results: Array<{ name: string; url: string }> }> {
  const res = await fetch(`${BASE_URL}/version-group?limit=100`);
  return res.json();
}

export async function getVersionGroup(idOrName: string | number): Promise<VersionGroup> {
  const res = await fetch(`${BASE_URL}/version-group/${idOrName}`);
  return res.json();
}

export async function getPokedex(idOrName: string | number): Promise<Pokedex> {
  const res = await fetch(`${BASE_URL}/pokedex/${idOrName}`);
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
