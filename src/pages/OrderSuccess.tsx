
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { OrderDocument } from '@/services/mongo/types';
import mongoService from '@/services/mongo/MongoService';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId as string;
  const [order, setOrder] = useState<OrderDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setIsLoading(false);
        return;
      }

      try {
        const orderData = await mongoService.orders.findById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="caserita-container py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Gracias por tu compra!</h1>
              <p className="text-gray-600">
                Tu pedido ha sido procesado correctamente.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-caserita-blue"></div>
              </div>
            ) : order ? (
              <div>
                <div className="border-t border-b py-4 my-6">
                  <h2 className="font-bold text-lg mb-4 flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Resumen del Pedido
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Número de Pedido:</span>
                      <span className="font-medium">{order._id.substring(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Estado:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {order.status === 'processing' ? 'En proceso' : 'Completado'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold">S/ {order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <h3 className="font-medium mb-2">Datos de Envío</h3>
                  <p className="text-sm text-gray-700">{order.shippingDetails.name}</p>
                  <p className="text-sm text-gray-700">{order.shippingDetails.email}</p>
                  <p className="text-sm text-gray-700">{order.shippingDetails.phone}</p>
                  <p className="text-sm text-gray-700">{order.shippingDetails.address}</p>
                </div>
                
                <div className="py-6 border-b">
                  <h3 className="font-medium mb-2">Método de Pago</h3>
                  <p className="text-sm text-gray-700">
                    Tarjeta de crédito/débito
                    {order.paymentDetails.cardLast4 && ` (termina en ${order.paymentDetails.cardLast4})`}
                  </p>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 mb-6">
                    Te hemos enviado un correo con los detalles de tu compra a {order.shippingDetails.email}
                  </p>
                  
                  <div className="space-y-4">
                    <Button className="btn-primary" asChild>
                      <Link to="/">
                        Volver a la tienda
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">No pudimos encontrar la información de tu pedido.</p>
                <Button className="btn-primary" asChild>
                  <Link to="/">
                    Volver a la tienda
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
