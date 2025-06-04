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
    image: "/lovable-uploads/ceca38c1-55e8-47a5-a643-169ae3a2eb93.png",
    title: "Frescura y calidad en cada sorbo",
    subtitle: "Descubre nuestros lácteos",
    buttonText: "Ver Lácteos",
    link: "/lacteos"
  },
  {
    image: "/lovable-uploads/a32a7e0b-8ad1-4a8a-9f11-7511638d691f.png",
    title: "El sabor del hogar en cada bocado",
    subtitle: "Explora nuestra panadería",
    buttonText: "Ver Panadería",
    link: "/panaderia"
  },
  {
    image: "/lovable-uploads/4f68ad14-bb11-402e-883f-5e576cf22474.png",
    title: "Tu hogar impecable",
    subtitle: "con nuestros productos de limpieza",
    buttonText: "Ver Limpieza Hogar",
    link: "/limpieza"
  },
  {
    image: "/lovable-uploads/41ec047c-4731-417d-bd09-800ea6d50a12.png",
    title: "Refresca tu día",
    subtitle: "con nuestras bebidas favoritas",
    buttonText: "Ver Bebidas",
    link: "/bebidas"
  },
  {
    image: "/lovable-uploads/480167ed-f238-4441-be5c-354c2d1f6aeb.png",
    title: "Del mar a tu mesa",
    subtitle: "Frescura y variedad en pescados y mariscos",
    buttonText: "Ver Carnes Marinas",
    link: "/carnes-marinas"
  },
  {
    image: "/lovable-uploads/8ac04ddf-39b6-4755-a11a-d210634abd47.png",
    title: "Calidad y sabor en cada corte",
    subtitle: "Descubre nuestras carnes y pollo",
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
