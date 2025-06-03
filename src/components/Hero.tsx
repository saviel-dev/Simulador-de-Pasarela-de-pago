
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselImages = [
  "/lovable-uploads/e9d5943f-1c99-4eb1-b45a-6e316fbc9c1d.png",
  "/lovable-uploads/16ebbb33-419b-473e-9f7c-613cb71d2174.png",
  "/lovable-uploads/518c782f-e338-4fe4-9c4f-a29d30cd9efc.png",
  "/lovable-uploads/4415c1e7-4149-445d-a88b-c3a58e66587a.png",
  "/lovable-uploads/5ff39afc-3040-4b23-8a32-d3c13dca4057.png"
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
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20" />
        <CarouselNext className="right-4 z-20" />
      </Carousel>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {carouselImages.map((_, index) => (
          <div 
            key={index}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};
