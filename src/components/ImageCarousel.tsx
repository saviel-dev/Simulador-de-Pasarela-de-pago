
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
    src: "/lovable-uploads/6a39dba5-ba36-4225-a79b-3081d6680b5f.png",
    alt: "Tu hogar impecable con nuestros productos de limpieza"
  },
  {
    src: "/lovable-uploads/d831d0ea-6bb5-4834-b754-db8fbe9d862a.png",
    alt: "Frescura y calidad a tu mesa - productos seleccionados"
  },
  {
    src: "/lovable-uploads/58a23b49-f35c-495d-b80c-17e5c5a692ab.png",
    alt: "Frescura y calidad en cada sorbo - descubre nuestros lácteos"
  }
];

export const ImageCarousel: React.FC = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality for infinite carousel
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative animate-fade-in">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg shadow-xl w-full h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};
