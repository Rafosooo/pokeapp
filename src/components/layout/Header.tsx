import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, Heart, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { path: '/', label: 'Início' },
  { path: '/pokedex', label: 'Pokédex' },
  { path: '/favorites', label: 'Favoritos', icon: Heart },
  { path: '/games', label: 'Jogos' },
  { path: '/regions', label: 'Regiões' },
  { path: '/gyms', label: 'Ginásios', icon: Trophy },
  { path: '/install', label: 'Instalar', icon: Download },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src="/pwa-192x192.png" alt="PokéGuide" className="h-10 w-10 rounded-lg" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PokéGuide
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={location.pathname === link.path ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'transition-all duration-200 gap-1.5',
                  location.pathname === link.path && 'shadow-md'
                )}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-card p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant={location.pathname === link.path ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
