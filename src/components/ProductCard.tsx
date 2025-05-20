
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card block overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-gray-100 group-hover:opacity-90 transition-opacity">
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
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-baseline justify-between">
          <p className="text-caserita-blue font-bold">
            S/ {product.price.toFixed(2)}
          </p>
          <Button 
            size="sm" 
            variant="ghost" 
            className="opacity-0 group-hover:opacity-100 transition-opacity" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
