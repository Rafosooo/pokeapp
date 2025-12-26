import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GENERATION_RANGES } from "@/lib/pokeapi";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface PokemonFiltersProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  selectedGen: string | null;
  onSelectGen: (gen: string | null) => void;
  availableTypes: string[];
}

export function PokemonFilters({
  selectedType,
  onSelectType,
  selectedGen,
  onSelectGen,
  availableTypes
}: PokemonFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <Select value={selectedType || "all"} onValueChange={(v) => onSelectType(v === "all" ? null : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Tipos</SelectItem>
          {availableTypes.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedGen || "all"} onValueChange={(v) => onSelectGen(v === "all" ? null : v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Geração" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as Gerações</SelectItem>
          {Object.keys(GENERATION_RANGES).map((gen) => (
            <SelectItem key={gen} value={gen}>
              Geração {gen}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(selectedType || selectedGen) && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            onSelectType(null);
            onSelectGen(null);
          }}
          className="h-10 px-3"
        >
          Limpar Filtros
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
