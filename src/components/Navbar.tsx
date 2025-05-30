
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useState } from 'react';

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 w-full">
      <div className="caserita-container py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-full bg-caserita-blue flex items-center justify-center text-white">
              <span className="font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-caserita-blue tracking-wide">
              Caserita
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-caserita-blue transition-colors">
            Inicio
          </Link>
          <Link to="/products" className="font-medium text-gray-700 hover:text-caserita-blue transition-colors">
            Productos
          </Link>
          <Link to="/categories" className="font-medium text-gray-700 hover:text-caserita-blue transition-colors">
            Categorías
          </Link>
          <Link to="/about" className="font-medium text-gray-700 hover:text-caserita-blue transition-colors">
            Nosotros
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full">
              <div className="flex space-x-2 pt-8">
                <Input placeholder="Buscar productos..." className="flex-1" />
                <Button>Buscar</Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Auth Button - Desktop */}
          <Link to="/auth" className="hidden md:block">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart Button */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-caserita-yellow text-xs text-foreground font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 pt-8">
                <Link 
                  to="/" 
                  className="font-medium text-gray-700 hover:text-caserita-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/products" 
                  className="font-medium text-gray-700 hover:text-caserita-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link 
                  to="/categories" 
                  className="font-medium text-gray-700 hover:text-caserita-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categorías
                </Link>
                <Link 
                  to="/about" 
                  className="font-medium text-gray-700 hover:text-caserita-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link 
                  to="/auth" 
                  className="font-medium text-gray-700 hover:text-caserita-blue transition-colors flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
