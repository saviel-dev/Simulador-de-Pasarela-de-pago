
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const isMobile = useIsMobile();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  // Vista de lista para móviles - estilo Metro.pe
  if (isMobile) {
    return (
      <Card className="mb-4 overflow-hidden border">
        <Link to={`/product/${product.id}`} className="flex w-full">
          <div className="w-1/3 p-3 flex items-center justify-center">
            <AspectRatio ratio={1} className="bg-gray-100 overflow-hidden relative w-full">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Agotado</span>
                </div>
              )}
            </AspectRatio>
          </div>

          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">{product.name}</h3>
              
              <div className="mt-2">
                <p className="text-caserita-blue font-bold text-lg">
                  S/ {product.price.toFixed(2)}
                </p>
                
                {product.stock <= 5 && product.stock > 0 && (
                  <span className="text-xs text-orange-600 font-medium">
                    ¡Pocas unidades!
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-auto pt-2">
              <Button 
                className="w-full bg-caserita-yellow text-gray-800 hover:bg-caserita-yellow-light font-medium"
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                AGREGAR
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  // Vista de grid para escritorio (rediseñada)
  return (
    <Card className="product-card block overflow-hidden group transition-all hover:border-caserita-blue hover:shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-caserita-yellow px-2 py-1 text-xs font-semibold rounded">
              ¡Pocas unidades!
            </span>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Agotado</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-caserita-blue font-bold text-lg">
              S/ {product.price.toFixed(2)}
            </p>
            <Button 
              size="sm" 
              className="bg-caserita-yellow text-gray-800 hover:bg-caserita-yellow-light" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
};
