
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex justify-center items-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-500 mb-6">Parece que aún no has agregado productos a tu carrito</p>
            <Button className="btn-primary" asChild>
              <Link to="/products">
                Explorar productos
              </Link>
            </Button>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu Carrito</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <div className="hidden md:grid grid-cols-12 gap-4 border-b pb-4 mb-4">
                  <div className="col-span-6">
                    <span className="font-medium">Producto</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Precio</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Cantidad</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium">Total</span>
                  </div>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="border-b last:border-0 py-4">
                    <div className="md:grid md:grid-cols-12 md:gap-4 flex flex-wrap items-center">
                      {/* Product */}
                      <div className="col-span-6 flex gap-4 items-center mb-4 md:mb-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-caserita-blue">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span className="md:hidden font-medium mr-2">Precio:</span>
                        <span>S/ {item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 text-center flex items-center justify-center my-4 md:my-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Total & Remove */}
                      <div className="col-span-2 text-right flex items-center justify-end">
                        <span className="font-medium">S/ {(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-4"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end mt-6">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                  >
                    Vaciar carrito
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Resumen de la orden</h2>
                
                <div className="space-y-2 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>Gratis</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
                
                <Button className="btn-primary w-full mb-4" asChild>
                  <Link to="/checkout">
                    Proceder al pago
                  </Link>
                </Button>
                
                <Link to="/products" className="text-center block text-caserita-blue hover:underline text-sm">
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
