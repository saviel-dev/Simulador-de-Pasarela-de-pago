
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070",
    alt: "Supermercado moderno con productos frescos"
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2069",
    alt: "Variedad de frutas y verduras frescas"
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074",
    alt: "Productos de supermercado de calidad"
  }
];

export const Hero: React.FC = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

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
          <Carousel 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-md mx-auto"
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative z-10 animate-fade-in">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="rounded-lg shadow-xl transform rotate-2 w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-caserita-yellow/20 rounded-lg -z-10"></div>
        </div>
      </div>
    </div>
  );
};
