
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselSlides = [
  {
    image: "/lovable-uploads/fa274a4c-5841-4bd8-a2fb-a7a78fd51757.png",
    title: "Frescura y calidad en cada sorbo",
    subtitle: "Descubre nuestros lácteos",
    buttonText: "Ver Lácteos",
    link: "/lacteos"
  },
  {
    image: "/lovable-uploads/9bc18da9-fc77-4151-95f3-5c6cc91de552.png",
    title: "Frescura y calidad a tu mesa",
    subtitle: "Descubre nuestros productos seleccionados",
    buttonText: "Ver Productos",
    link: "/productos"
  },
  {
    image: "/lovable-uploads/0c8b2993-76e4-4447-a301-2f600bbca993.png",
    title: "Tu hogar impecable",
    subtitle: "con nuestros productos de limpieza",
    buttonText: "Ver Limpieza Hogar",
    link: "/limpieza"
  },
  {
    image: "/lovable-uploads/820288a6-247d-45fa-b788-6ac144fd5168.png",
    title: "Refresca tu día",
    subtitle: "con nuestras bebidas favoritas",
    buttonText: "Ver Bebidas",
    link: "/bebidas"
  },
  {
    image: "/lovable-uploads/f6ff1a54-fc80-4886-bf9a-78759d794173.png",
    title: "Carne fresca de mar",
    subtitle: "a tu mesa",
    buttonText: "Ver Carnes Marinas",
    link: "/carnes-marinas"
  },
  {
    image: "/lovable-uploads/c838240c-bdf6-4eaf-ba50-b1ab4ed179af.png",
    title: "Carne fresca de mar",
    subtitle: "Explora nuestros mariscos y pescados seleccionados",
    buttonText: "Ver Carnes Marinas",
    link: "/carnes-marinas"
  },
  {
    image: "/lovable-uploads/0a1e35cf-e886-41be-818f-ee48856425f0.png",
    title: "Nutrición y calidad",
    subtitle: "en cada bocado",
    buttonText: "Ver Carnes",
    link: "/carnes"
  },
  {
    image: "/lovable-uploads/17aad33a-2106-4bb1-adae-30f9306ffb23.png",
    title: "Nutrición y calidad en cada bocado",
    subtitle: "Elige nuestras carnes seleccionadas",
    buttonText: "Ver Carnes y Pollo",
    link: "/carnes-pollo"
  }
];

export const Hero: React.FC = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    // Update current slide indicator
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      clearInterval(intervalId);
      api?.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

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
          {carouselSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-start">
                  <div className="text-left text-white p-8 md:p-12 lg:p-16 max-w-lg">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-white/90">
                      {slide.subtitle}
                    </p>
                    <Button 
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link to={slide.link}>
                        {slide.buttonText}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20 bg-white/80 hover:bg-white" />
        <CarouselNext className="right-4 z-20 bg-white/80 hover:bg-white" />
      </Carousel>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
                ? 'bg-yellow-400 scale-110' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
