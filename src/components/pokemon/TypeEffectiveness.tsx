import { useQuery } from '@tanstack/react-query';
import { getType, TypeDetail, TYPE_COLORS } from '@/lib/pokeapi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  ShieldAlert, 
  ShieldCheck, 
  ShieldBan, 
  Swords, 
  TrendingDown, 
  Ban 
} from 'lucide-react';

interface TypeEffectivenessProps {
  types: string[]; // List of type names (e.g. ['fire', 'flying'])
}

// All 18 Pokemon types
const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'
];

export function TypeEffectiveness({ types }: TypeEffectivenessProps) {
  // Fetch details for all types the pokemon has
  const { data: typeDetails, isLoading } = useQuery({
    queryKey: ['types', types],
    queryFn: async () => {
      const details = await Promise.all(
        types.map(t => getType(t))
      );
      return details;
    },
    enabled: types.length > 0,
    staleTime: Infinity,
  });

  if (isLoading || !typeDetails) {
    return <div className="flex justify-center p-4"><LoadingSpinner /></div>;
  }

  // --- CALCULATION LOGIC ---

  // 1. Defensive: "Toma super efetivo" (Weakness) & "Não é afetado" (Immunity)
  const defensiveMultipliers: Record<string, number> = {};
  ALL_TYPES.forEach(t => defensiveMultipliers[t] = 1);

  typeDetails.forEach(detail => {
    const rel = detail.damage_relations;
    rel.double_damage_from.forEach(t => defensiveMultipliers[t.name] *= 2);
    rel.half_damage_from.forEach(t => defensiveMultipliers[t.name] *= 0.5);
    rel.no_damage_from.forEach(t => defensiveMultipliers[t.name] *= 0);
  });

  const weakAgainst = Object.entries(defensiveMultipliers)
    .filter(([_, mult]) => mult >= 2)
    .map(([name]) => name);

  const immuneTo = Object.entries(defensiveMultipliers)
    .filter(([_, mult]) => mult === 0)
    .map(([name]) => name);

  // 2. Offensive: "Forte contra", "Fraco contra", "Não afeta"
  // We combine the offensive capabilities of all types the pokemon has.
  // Example: Fire/Flying. 
  // Strong against: (Fire -> Grass, Ice, Bug, Steel) AND (Flying -> Grass, Fighting, Bug)
  // We use a Set to avoid duplicates.
  
  const strongAgainst = new Set<string>();
  const offensiveWeakAgainst = new Set<string>();
  const noEffectAgainst = new Set<string>();

  typeDetails.forEach(detail => {
    const rel = detail.damage_relations;
    rel.double_damage_to.forEach(t => strongAgainst.add(t.name));
    rel.half_damage_to.forEach(t => offensiveWeakAgainst.add(t.name));
    rel.no_damage_to.forEach(t => noEffectAgainst.add(t.name));
  });

  // If a type is in "strongAgainst", remove it from "offensiveWeakAgainst" 
  // (e.g. if Type A is weak to X but Type B is strong against X? 
  // No, offensive is usually separated by move type. 
  // But the user asks "Qual tipo ELE é forte". 
  // Usually this means "What types does it hit super effectively with STAB?".
  // We will list the unique types it hits super effectively.
  
  // Cleanup: If something is in noEffect, it overrides others (rarely happens across different types, but theoretically possible if we merged logic incorrectly).
  // Actually, since we are listing sets of types covered by *any* of its STABs:
  // - "Forte contra": Any type that takes 2x from at least one of its STABs.
  // - "Fraco contra": Any type that resists *all* of its STABs? Or just listing types that resist at least one?
  // User phrasing "qual tipo ele é fraco" usually means "My attacks are weak against X". 
  // If I'm Fire/Flying:
  // Fire is weak vs Water. Flying is neutral vs Water.
  // So am I "weak" against Water? My Fire moves are. My Flying moves aren't.
  // The most useful interpretation is: "Types that resist my STABs". 
  // I will list simply the types that appear in half_damage_to of ANY of the STAB types.
  // This might be a long list.
  
  const strongAgainstList = Array.from(strongAgainst);
  const offensiveWeakList = Array.from(offensiveWeakAgainst);
  const noEffectList = Array.from(noEffectAgainst);

  // Helper for Type Badge
  const TypePill = ({ type }: { type: string }) => {
    // Translate type names
    const typeTranslations: Record<string, string> = {
      normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico',
      grass: 'Grama', ice: 'Gelo', fighting: 'Lutador', poison: 'Venenoso',
      ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
      rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', steel: 'Aço',
      dark: 'Sombrio', fairy: 'Fada'
    };

    return (
      <Badge 
        variant="outline" 
        className={cn(
          "text-xs px-2 py-0.5 capitalize border-0 text-white",
          // Use specific background color helper or inline style
        )}
        style={{
            backgroundColor: `hsl(var(--${TYPE_COLORS[type] || 'primary'}))`
        }}
      >
        {typeTranslations[type] || type}
      </Badge>
    );
  };

  const Section = ({ title, icon: Icon, types, emptyText }: any) => (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-card border shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="font-semibold text-sm">{title}</span>
      </div>
      {types.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {types.map((t: string) => <TypePill key={t} type={t} />)}
        </div>
      ) : (
        <span className="text-xs text-muted-foreground italic">{emptyText}</span>
      )}
    </div>
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {/* 1. Offensive: Forte Contra */}
      <Section 
        title="Forte contra (Ataque)" 
        icon={Swords} 
        types={strongAgainstList} 
        emptyText="Nenhum" 
      />

      {/* 2. Offensive: Fraco Contra */}
      <Section 
        title="Fraco contra (Ataque)" 
        icon={TrendingDown} 
        types={offensiveWeakList} 
        emptyText="Nenhum" 
      />

       {/* 3. Offensive: Não Afeta */}
       <Section 
        title="Não afeta (Ataque)" 
        icon={Ban} 
        types={noEffectList} 
        emptyText="Nenhum" 
      />

      {/* 4. Defensive: Toma Super Efetivo */}
      <Section 
        title="Toma super efetivo" 
        icon={ShieldAlert} 
        types={weakAgainst} 
        emptyText="Nenhum" 
      />

      {/* 5. Defensive: Não é Afetado */}
      <Section 
        title="Não é afetado por" 
        icon={ShieldBan} 
        types={immuneTo} 
        emptyText="Nenhum" 
      />
    </div>
  );
}
