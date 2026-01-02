import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, ChevronDown, Map, Swords, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function MiniBall({ type, className }: { type: 'poke' | 'great' | 'ultra' | 'master' | 'dusk' | 'love', className?: string }) {
  const topColors = {
    poke: 'bg-[#DC2626]',
    great: 'bg-blue-600',
    ultra: 'bg-yellow-400',
    master: 'bg-purple-600',
    dusk: 'bg-zinc-800',
    love: 'bg-pink-500'
  };

  const bottomColors = {
    poke: 'bg-white',
    great: 'bg-white',
    ultra: 'bg-white',
    master: 'bg-white',
    dusk: 'bg-green-600',
    love: 'bg-white'
  };

  return (
    <div className={cn("relative shrink-0 rounded-full border border-black overflow-hidden shadow-sm h-4 w-4 group-hover:scale-110 transition-transform duration-300", bottomColors[type], className)}>
      <div className={cn("absolute top-0 left-0 right-0 h-[55%] border-b border-black", topColors[type])} />
      <div className="absolute top-1/2 left-1/2 w-[35%] h-[35%] bg-white border border-black rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isCompact = isScrolled || isHovered;

  return (
    <header 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out border-b",
        isCompact
          ? "bg-white/90 backdrop-blur-md shadow-md border-zinc-200/50 h-16" 
          : "bg-transparent border-transparent h-24"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6 lg:px-8 transition-all duration-500">
        <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
          <img 
            src="/pwa-512x512.png" 
            alt="Keponom" 
            className={cn(
              "rounded-xl shadow-md border-2 border-white ring-2 ring-black/5 transition-all duration-500",
              isCompact ? "h-10 w-10" : "h-12 w-12"
            )} 
          />
          <span className="bg-gradient-to-br from-zinc-900 to-zinc-600 bg-clip-text text-transparent font-black text-2xl tracking-tight hidden sm:inline-block">
            Keponom
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {/* Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="lg" 
                className="gap-2 font-bold text-base hover:bg-zinc-100/80 hover:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900 rounded-full px-6 transition-all hover:scale-105 active:scale-95 duration-300"
              >
                <Swords className="h-5 w-5 text-zinc-700 group-hover:text-zinc-900 transition-colors" />
                Ferramentas
                <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-hover:text-zinc-900" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="center" 
              className="w-64 p-2 rounded-2xl border-2 border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/95 backdrop-blur-xl animate-in zoom-in-95 fade-in-0 slide-in-from-top-2 duration-300"
            >
              <div className="px-2 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Utilitários
              </div>
              <Link to="/pokedex">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                    <MiniBall type="poke" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Pokédex</span>
                    <span className="text-xs text-zinc-400 font-normal">Buscar Pokémon</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link to="/team-builder">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <MiniBall type="poke" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Montador de Equipe</span>
                    <span className="text-xs text-zinc-400 font-normal">Crie seu time ideal</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link to="/saved-teams">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                    <MiniBall type="great" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Meus Times</span>
                    <span className="text-xs text-zinc-400 font-normal">Gerenciar equipes</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link to="/gyms">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                    <MiniBall type="ultra" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Ginásios</span>
                    <span className="text-xs text-zinc-400 font-normal">Líderes e Insígnias</span>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* World Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="lg" 
                className="gap-2 font-bold text-base hover:bg-zinc-100/80 hover:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900 rounded-full px-6 transition-all hover:scale-105 active:scale-95 duration-300"
              >
                <Map className="h-5 w-5 text-zinc-700 group-hover:text-zinc-900 transition-colors" />
                Mundo
                <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-hover:text-zinc-900" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="center" 
              className="w-64 p-2 rounded-2xl border-2 border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/95 backdrop-blur-xl animate-in zoom-in-95 fade-in-0 slide-in-from-top-2 duration-300"
            >
              <div className="px-2 py-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Explorar
              </div>
              <Link to="/games">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <MiniBall type="master" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Jogos</span>
                    <span className="text-xs text-zinc-400 font-normal">Versões e Gerações</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link to="/regions">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-zinc-200 transition-colors">
                    <MiniBall type="dusk" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Regiões</span>
                    <span className="text-xs text-zinc-400 font-normal">Mapas e Locais</span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link to="/favorites">
                <DropdownMenuItem className="gap-3 cursor-pointer p-3 rounded-xl focus:bg-zinc-50 focus:text-zinc-900 font-medium text-zinc-600 group transition-colors">
                  <div className="p-2 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors">
                    <MiniBall type="love" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Favoritos</span>
                    <span className="text-xs text-zinc-400 font-normal">Seus Pokémon</span>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/install">
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 rounded-full border-2 border-zinc-200 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300 font-bold hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg"
            >
              <Download className="h-4 w-4" />
              Instalar App
            </Button>
          </Link>
        </div>

        {/* Mobile Menu - Sheet */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-zinc-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-zinc-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-2 border-zinc-100 p-0 overflow-y-auto">
            <SheetHeader className="p-6 border-b border-zinc-100 bg-zinc-50/50 text-left">
              <SheetTitle className="flex items-center gap-3 text-xl font-black">
                <img src="/pwa-512x512.png" alt="Keponom" className="h-8 w-8 rounded-lg shadow-sm" />
                Menu
              </SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col py-4">
              <div className="px-6 py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Ferramentas
              </div>
              <Link to="/pokedex" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-red-50 rounded-xl text-red-600">
                    <MiniBall type="poke" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Pokédex</span>
                </div>
              </Link>
              <Link to="/team-builder" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <MiniBall type="poke" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Montador de Equipe</span>
                </div>
              </Link>
              <Link to="/saved-teams" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-green-50 rounded-xl text-green-600">
                    <MiniBall type="great" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Meus Times</span>
                </div>
              </Link>
              <Link to="/gyms" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-yellow-50 rounded-xl text-yellow-600">
                    <MiniBall type="ultra" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Ginásios</span>
                </div>
              </Link>

              <div className="my-2 border-t border-zinc-100" />

              <div className="px-6 py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Mundo Pokémon
              </div>
              <Link to="/games" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                    <MiniBall type="master" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Jogos</span>
                </div>
              </Link>
              <Link to="/regions" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-zinc-100 rounded-xl text-zinc-600">
                    <MiniBall type="dusk" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Regiões</span>
                </div>
              </Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 transition-colors active:bg-zinc-100">
                  <div className="p-2 bg-pink-50 rounded-xl text-pink-600">
                    <MiniBall type="love" className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-zinc-700">Favoritos</span>
                </div>
              </Link>

              <div className="my-2 border-t border-zinc-100" />

              <div className="px-6 py-4">
                <Link to="/install" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-xl h-12 border-2 border-zinc-200 font-bold hover:bg-zinc-900 hover:text-white transition-all">
                    <Download className="h-5 w-5" />
                    Instalar Aplicativo
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
