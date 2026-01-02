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
        <SelectTrigger className="w-[180px] h-12 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold transition-all">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <SelectItem value="all" className="font-bold">Todos os Tipos</SelectItem>
          {availableTypes.map((type) => (
            <SelectItem key={type} value={type} className="capitalize font-medium">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedGen || "all"} onValueChange={(v) => onSelectGen(v === "all" ? null : v)}>
        <SelectTrigger className="w-[180px] h-12 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold transition-all">
          <SelectValue placeholder="Geração" />
        </SelectTrigger>
        <SelectContent className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <SelectItem value="all" className="font-bold">Todas as Gerações</SelectItem>
          {Object.keys(GENERATION_RANGES).map((gen) => (
            <SelectItem key={gen} value={gen} className="font-medium">
              Geração {gen}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(selectedType || selectedGen) && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            onSelectType(null);
            onSelectGen(null);
          }}
          className="h-12 px-4 border-2 border-black hover:bg-red-100 hover:text-red-600 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Limpar Filtros
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
