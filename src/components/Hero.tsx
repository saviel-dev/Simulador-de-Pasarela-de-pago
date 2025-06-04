
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
    image: "/lovable-uploads/1208d1a1-5e8a-4315-b214-803ad02ca9c7.png",
    title: "Frescura natural en cada bocado",
    subtitle: "Descubre nuestras verduras seleccionadas, directamente del campo a tu mesa.",
    buttonText: "Ver Verduras",
    link: "/verduras"
  },
  {
    image: "/lovable-uploads/4911a7c3-f815-452d-899e-83ab230452dd.png",
    title: "Vitaminas y sabor en cada mordida",
    subtitle: "Descubre nuestra variedad de frutas frescas y naturales.",
    buttonText: "Ver Frutas",
    link: "/frutas"
  },
  {
    image: "/lovable-uploads/62c26a64-7d64-435c-928d-5229848db14e.png",
    title: "Tu hogar impecable",
    subtitle: "con nuestros productos de limpieza",
    buttonText: "Ver Limpieza Hogar",
    link: "/limpieza"
  },
  {
    image: "/lovable-uploads/c0d44c16-4528-46b7-a5aa-74a809b305e5.png",
    title: "Del mar a tu mesa",
    subtitle: "Frescura y variedad en pescados y mariscos",
    buttonText: "Ver Carnes Marinas",
    link: "/carnes-marinas"
  },
  {
    image: "/lovable-uploads/b9537a2e-8c3d-4886-b95c-4a8d11eb3e69.png",
    title: "Frescura y calidad en cada sorbo",
    subtitle: "Descubre nuestros lácteos seleccionados: leche, yogures y más.",
    buttonText: "Ver Lácteos",
    link: "/lacteos"
  },
  {
    image: "/lovable-uploads/a619c092-b30b-48a5-85f8-c07a104530b1.png",
    title: "Refresca tu día",
    subtitle: "con nuestras bebidas favoritas",
    buttonText: "Ver Bebidas",
    link: "/bebidas"
  },
  {
    image: "/lovable-uploads/d3b4f039-bb53-46a5-896c-9981fd402f25.png",
    title: "Nutrición y calidad en cada bocado",
    subtitle: "Elige nuestras carnes frescas y seleccionadas para tu mesa.",
    buttonText: "Ver Carnes",
    link: "/carnes"
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
                  className="w-full h-full object-cover md:object-cover object-contain"
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
