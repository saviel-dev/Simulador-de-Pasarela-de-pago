
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const orderNumber = `${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="caserita-container py-12">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Gracias por tu compra!</h1>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido recibido y se está procesando
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="font-bold text-xl mb-2">Número de orden: {orderNumber}</h2>
              <p className="text-sm text-gray-500">
                Recibirás un correo electrónico de confirmación con los detalles de tu compra
              </p>
            </div>
            
            <div className="space-y-4">
              <Button className="btn-primary w-full" asChild>
                <Link to="/">
                  Volver a la página principal
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/products">
                  Seguir comprando
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
