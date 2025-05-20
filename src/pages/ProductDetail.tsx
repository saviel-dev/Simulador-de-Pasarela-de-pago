
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
    
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
            <Link to="/products" className="text-caserita-blue hover:underline">
              Volver a productos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="caserita-container py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="text-2xl font-bold text-caserita-blue mb-4">
                S/ {product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-700 mb-8">{product.description}</p>
              
              <div className="mb-6">
                <p className="font-medium mb-2">Disponibilidad:</p>
                {product.stock > 10 ? (
                  <span className="text-green-600">En stock</span>
                ) : product.stock > 0 ? (
                  <span className="text-caserita-yellow">Pocas unidades disponibles ({product.stock})</span>
                ) : (
                  <span className="text-red-600">Agotado</span>
                )}
              </div>
              
              {product.stock > 0 && (
                <>
                  <div className="flex items-center mb-6">
                    <span className="mr-4 font-medium">Cantidad:</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-4 font-medium">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Añadir al carrito
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos similares</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
