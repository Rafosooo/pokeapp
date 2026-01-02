import { useQuery } from '@tanstack/react-query';
import { getType, TypeDetail, TYPE_COLORS } from '@/lib/pokeapi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import { 
  Shield,
  Swords,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Skull,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TypeBadge } from '@/components/pokemon/TypeBadge';

interface TypeEffectivenessProps {
  types: string[];
}

const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
  'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'
];

function TypeCell({ type, multiplier }: { type: string; multiplier: number }) {
  let bgColor = 'bg-muted';
  let textColor = 'text-muted-foreground';
  let label = `${multiplier}x`;
  
  if (multiplier > 1) {
    bgColor = 'bg-red-500/10 border-red-500/50';
    textColor = 'text-red-600 dark:text-red-400';
  } else if (multiplier < 1 && multiplier > 0) {
    bgColor = 'bg-green-500/10 border-green-500/50';
    textColor = 'text-green-600 dark:text-green-400';
  } else if (multiplier === 0) {
    bgColor = 'bg-gray-500/10 border-gray-500/50';
    textColor = 'text-gray-500';
    label = '0x';
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-2 rounded-lg border transition-all hover:scale-105",
      bgColor
    )}>
      <span 
        className="text-xs font-bold uppercase mb-1 px-2 py-0.5 rounded text-white w-full text-center truncate"
        style={{ backgroundColor: `hsl(var(--${TYPE_COLORS[type] || 'primary'}))` }}
      >
        {type}
      </span>
      <span className={cn("text-lg font-bold", textColor)}>
        {label}
      </span>
    </div>
  );
}

export function TypeEffectiveness({ types }: TypeEffectivenessProps) {
  const { data: typeDetails, isLoading } = useQuery({
    queryKey: ['types', types],
    queryFn: async () => {
      return Promise.all(types.map(t => getType(t)));
    },
    enabled: types.length > 0,
    staleTime: Infinity,
  });

  if (isLoading || !typeDetails) {
    return <div className="flex justify-center p-4"><LoadingSpinner /></div>;
  }

  // --- CALCULATION LOGIC ---

  // 1. Defensive Multipliers (Receiving Damage)
  const defensiveMultipliers: Record<string, number> = {};
  ALL_TYPES.forEach(t => defensiveMultipliers[t] = 1);

  typeDetails.forEach(detail => {
    const rel = detail.damage_relations;
    rel.double_damage_from.forEach(t => defensiveMultipliers[t.name] *= 2);
    rel.half_damage_from.forEach(t => defensiveMultipliers[t.name] *= 0.5);
    rel.no_damage_from.forEach(t => defensiveMultipliers[t.name] *= 0);
  });

  // 2. Offensive Multipliers (Dealing Damage)
  // We take the MAX multiplier across all the Pokemon's types
  const offensiveMultipliers: Record<string, number> = {};
  ALL_TYPES.forEach(t => offensiveMultipliers[t] = 0); // Start at 0 implies no coverage if no types

  // Helper to get multiplier of Type A attacking Type B
  // Since we don't have the full 18x18 matrix loaded, we infer from "damage_relations" of the Pokemon's types.
  // "double_damage_to" -> 2x
  // "half_damage_to" -> 0.5x
  // "no_damage_to" -> 0x
  // Default -> 1x
  
  types.forEach((myType, idx) => {
    const detail = typeDetails[idx];
    const rel = detail.damage_relations;
    
    ALL_TYPES.forEach(targetType => {
      let mult = 1;
      if (rel.double_damage_to.some(t => t.name === targetType)) mult = 2;
      else if (rel.half_damage_to.some(t => t.name === targetType)) mult = 0.5;
      else if (rel.no_damage_to.some(t => t.name === targetType)) mult = 0;
      
      // Keep the best multiplier (e.g. if Fire hits Grass for 2x but Flying hits Grass for 2x, it's 2x. 
      // If Fire hits Water for 0.5x but Flying hits Water for 1x, best is 1x)
      if (mult > offensiveMultipliers[targetType]) {
        offensiveMultipliers[targetType] = mult;
      }
      // Edge case: if current max is 0 (uninitialized or immune), and we find something better, update it.
      // But we initialized with 0. 
      // Actually, standard effectiveness is 1. If we haven't checked any type yet, it should be 1?
      // No, let's logic properly:
      // If I have Fire type: Fire vs Water is 0.5.
      // If I add Flying type: Flying vs Water is 1.
      // Max(0.5, 1) = 1.
      // So initialization should probably be 0, and we take max. 
      // BUT if a pokemon has NO types that hit X for >0, is it 0?
      // No, normal effectiveness is 1.
      // So for each of my types, I calculate effectiveness.
      // Then I take the max of those effectivenesses.
    });
  });

  // Re-calculate offensive properly
  ALL_TYPES.forEach(targetType => {
    let maxMult = 0;
    
    types.forEach((_, idx) => {
      const detail = typeDetails[idx];
      const rel = detail.damage_relations;
      let mult = 1;
      
      if (rel.double_damage_to.some(t => t.name === targetType)) mult = 2;
      else if (rel.half_damage_to.some(t => t.name === targetType)) mult = 0.5;
      else if (rel.no_damage_to.some(t => t.name === targetType)) mult = 0;
      
      if (mult > maxMult) maxMult = mult;
    });
    
    offensiveMultipliers[targetType] = maxMult;
  });

  // Group types by effectiveness for Summary
  const weaknesses = ALL_TYPES.filter(t => defensiveMultipliers[t] > 1).sort((a, b) => defensiveMultipliers[b] - defensiveMultipliers[a]);
  const resistances = ALL_TYPES.filter(t => defensiveMultipliers[t] < 1).sort((a, b) => defensiveMultipliers[a] - defensiveMultipliers[b]);
  
  const strengths = ALL_TYPES.filter(t => offensiveMultipliers[t] > 1).sort((a, b) => offensiveMultipliers[b] - offensiveMultipliers[a]);
  const weakAttacks = ALL_TYPES.filter(t => offensiveMultipliers[t] < 1).sort((a, b) => offensiveMultipliers[a] - offensiveMultipliers[b]);


  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Ver Resumo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Resumo de Efetividade
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-8 py-4">
              {/* Defensive Column */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <h3 className="text-xl font-black uppercase flex items-center gap-2 border-b-2 border-black/10 pb-2 mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                    Defesa
                  </h3>
                  
                  {/* Weaknesses */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase mb-3 flex items-center gap-2 text-red-600">
                      <ShieldAlert className="h-4 w-4" />
                      Fraco contra
                    </h4>
                    {weaknesses.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {weaknesses.map(t => (
                          <div key={t} className="flex flex-col items-center bg-white p-2 rounded-lg border border-black/20 shadow-sm">
                            <TypeBadge type={t} size="sm" />
                            <span className="text-xs font-black mt-1 text-red-600">{defensiveMultipliers[t]}x</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-500 italic">Sem fraquezas conhecidas.</p>
                    )}
                  </div>

                  {/* Resistances */}
                  <div>
                    <h4 className="text-sm font-bold uppercase mb-3 flex items-center gap-2 text-green-600">
                      <ShieldCheck className="h-4 w-4" />
                      Resistente a
                    </h4>
                    {resistances.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {resistances.map(t => (
                          <div key={t} className="flex flex-col items-center bg-white p-2 rounded-lg border border-black/20 shadow-sm">
                            <TypeBadge type={t} size="sm" />
                            <span className="text-xs font-black mt-1 text-green-600">{defensiveMultipliers[t]}x</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-500 italic">Sem resistências conhecidas.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Offensive Column */}
              <div className="space-y-6">
                <div className="bg-red-50 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <h3 className="text-xl font-black uppercase flex items-center gap-2 border-b-2 border-black/10 pb-2 mb-4">
                    <Swords className="h-6 w-6 text-red-600" />
                    Ataque
                  </h3>
                  
                  {/* Strengths */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase mb-3 flex items-center gap-2 text-green-600">
                      <Swords className="h-4 w-4" />
                      Forte contra
                    </h4>
                    {strengths.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {strengths.map(t => (
                          <div key={t} className="flex flex-col items-center bg-white p-2 rounded-lg border border-black/20 shadow-sm">
                            <TypeBadge type={t} size="sm" />
                            <span className="text-xs font-black mt-1 text-green-600">{offensiveMultipliers[t]}x</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-500 italic">Sem vantagens ofensivas.</p>
                    )}
                  </div>

                  {/* Weak Attacks */}
                  <div>
                    <h4 className="text-sm font-bold uppercase mb-3 flex items-center gap-2 text-red-600">
                      <Skull className="h-4 w-4" />
                      Pouco efetivo contra
                    </h4>
                    {weakAttacks.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {weakAttacks.map(t => (
                          <div key={t} className="flex flex-col items-center bg-white p-2 rounded-lg border border-black/20 shadow-sm">
                            <TypeBadge type={t} size="sm" />
                            <span className="text-xs font-black mt-1 text-red-600">{offensiveMultipliers[t]}x</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-500 italic">Dano normal em todos os outros tipos.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="defensive" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 h-auto p-1 bg-black rounded-xl border-2 border-black gap-1">
          <TabsTrigger 
            value="defensive" 
            className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white transition-all h-full"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="font-bold uppercase text-xs sm:text-sm">Defesa</span>
            </div>
            <span className="text-[10px] sm:text-xs opacity-80 uppercase hidden sm:inline-block">(Dano Recebido)</span>
          </TabsTrigger>
          <TabsTrigger 
            value="offensive" 
            className="flex flex-col items-center gap-1 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white transition-all h-full"
          >
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4" />
              <span className="font-bold uppercase text-xs sm:text-sm">Ataque</span>
            </div>
            <span className="text-[10px] sm:text-xs opacity-80 uppercase hidden sm:inline-block">(Dano Causado)</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="defensive" className="mt-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {ALL_TYPES.map(type => (
              <TypeCell 
                key={type} 
                type={type} 
                multiplier={defensiveMultipliers[type]} 
              />
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            * Multiplicadores baseados nos tipos do Pokémon. Valores acima de 1x indicam fraqueza.
          </div>
        </TabsContent>

        <TabsContent value="offensive">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {ALL_TYPES.map(type => (
              <TypeCell 
                key={type} 
                type={type} 
                multiplier={offensiveMultipliers[type]} 
              />
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            * Dano potencial usando movimentos do mesmo tipo (STAB). Valores acima de 1x indicam super efetivo.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
