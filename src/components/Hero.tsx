
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

const heroSlides = [
  {
    id: 1,
    title: "Encuentra todo en un solo lugar",
    highlight: "un solo",
    subtitle: "Todo lo que necesitas para tu hogar, trabajo y entretenimiento con entregas rápidas y precios justos.",
    backgroundImage: "/lovable-uploads/6a39dba5-ba36-4225-a79b-3081d6680b5f.png",
    primaryButton: { text: "Ver productos", link: "/products" },
    secondaryButton: { text: "Ver categorías", link: "/categories" }
  },
  {
    id: 2,
    title: "Frescura y calidad",
    highlight: "a tu mesa",
    subtitle: "Productos seleccionados con la mejor calidad para tu familia. Variedad y frescura garantizada.",
    backgroundImage: "/lovable-uploads/d831d0ea-6bb5-4834-b754-db8fbe9d862a.png",
    primaryButton: { text: "Ver productos", link: "/products" },
    secondaryButton: { text: "Ver ofertas", link: "/products" }
  },
  {
    id: 3,
    title: "Frescura y calidad",
    highlight: "en cada sorbo",
    subtitle: "Descubre nuestros lácteos premium. Calidad y sabor que toda la familia disfruta.",
    backgroundImage: "/lovable-uploads/58a23b49-f35c-495d-b80c-17e5c5a692ab.png",
    primaryButton: { text: "Ver lácteos", link: "/products" },
    secondaryButton: { text: "Ver categorías", link: "/categories" }
  }
];

export const Hero: React.FC = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality for infinite carousel
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-caserita-blue-light/10 to-caserita-yellow/20 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={slide.backgroundImage}
                    alt={`${slide.title} background`}
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 caserita-container flex flex-col md:flex-row items-center min-h-[500px] md:min-h-[600px] py-16 md:py-24">
                  <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                      {slide.title.split(slide.highlight)[0]}
                      <span className="text-caserita-blue">{slide.highlight}</span>
                      {slide.title.split(slide.highlight)[1]}
                    </h1>
                    <p className="text-xl text-gray-700 max-w-xl mb-8">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <Button className="btn-primary text-lg px-8 py-6" asChild>
                        <Link to={slide.primaryButton.link}>
                          {slide.primaryButton.text}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button className="btn-secondary text-lg px-8 py-6" variant="outline" asChild>
                        <Link to={slide.secondaryButton.link}>
                          {slide.secondaryButton.text}
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="relative z-10 animate-fade-in">
                      <img
                        src="/images/image1.jpeg"
                        alt="Productos de Caserita"
                        className="rounded-lg shadow-xl transform rotate-2 max-w-md mx-auto"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-full h-full bg-caserita-yellow/20 rounded-lg -z-10 max-w-md mx-auto"></div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20" />
        <CarouselNext className="right-4 z-20" />
      </Carousel>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <div 
            key={index}
            className="w-3 h-3 rounded-full bg-caserita-blue/30 hover:bg-caserita-blue/50 transition-colors cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};
