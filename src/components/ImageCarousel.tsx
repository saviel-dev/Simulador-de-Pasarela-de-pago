
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
