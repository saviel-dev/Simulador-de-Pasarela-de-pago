
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-caserita-blue-light/10 to-caserita-yellow/20 py-16 md:py-24">
      <div className="caserita-container flex flex-col md:flex-row items-center">
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Encuentra todo en{' '}
            <span className="text-caserita-blue">un solo</span> lugar
          </h1>
          <p className="text-xl text-gray-700 max-w-xl mb-8">
            Todo lo que necesitas para tu hogar, trabajo y entretenimiento con entregas rápidas y precios justos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button className="btn-primary text-lg px-8 py-6" asChild>
              <Link to="/products">
                Ver productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button className="btn-secondary text-lg px-8 py-6" variant="outline" asChild>
              <Link to="/categories">
                Ver categorías
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative z-10 animate-fade-in">
            <img
              src="/images/image1.jpeg"
              alt="Productos de Caserita"
              className="rounded-lg shadow-xl transform rotate-2"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-caserita-yellow/20 rounded-lg -z-10"></div>
        </div>
      </div>
    </div>
  );
};
