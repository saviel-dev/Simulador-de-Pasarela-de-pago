
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useNiubiz, PaymentMethod, PaymentInfo } from '@/context/NiubizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { CreditCard, SmartphoneNfc } from 'lucide-react';
import { useCreateOrder } from '@/hooks/useMongo';
import mongoService from '@/services/mongo/MongoService';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { processPayment, isProcessing } = useNiubiz();
  const { createOrder, isLoading: isCreatingOrder } = useCreateOrder();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    mobilePhone: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Por favor completa todos los campos de envío');
      return;
    }
    
    // Validate payment details based on selected payment method
    if (paymentMethod === 'credit_card') {
      if (!formData.cardNumber || !formData.cardholderName || !formData.expiryDate || !formData.cvv) {
        toast.error('Por favor completa todos los campos de la tarjeta');
        return;
      }
    } else if (paymentMethod === 'plin' || paymentMethod === 'yape') {
      if (!formData.mobilePhone || formData.mobilePhone.length !== 9) {
        toast.error('Por favor ingresa un número de celular válido de 9 dígitos');
        return;
      }
    }
    
    try {
      let paymentInfo: PaymentInfo;
      
      // Prepare payment info based on selected method
      if (paymentMethod === 'credit_card') {
        paymentInfo = {
          method: 'credit_card',
          cardInfo: {
            cardNumber: formData.cardNumber,
            cardholderName: formData.cardholderName,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv
          }
        };
      } else {
        paymentInfo = {
          method: paymentMethod,
          mobileInfo: {
            phoneNumber: formData.mobilePhone
          }
        };
      }
      
      // Process payment through selected method
      const paymentSuccess = await processPayment(total, paymentInfo);
      
      if (!paymentSuccess) {
        return;
      }
      
      // Create user if it doesn't exist
      let user = await mongoService.users.findByEmail(formData.email);
      
      if (!user) {
        user = await mongoService.users.insertOne({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        });
      }
      
      // Create order in MongoDB
      const order = await createOrder({
        userId: user._id,
        products: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        shippingDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        paymentDetails: {
          method: paymentMethod,
          ...(paymentMethod === 'credit_card' 
            ? { cardLast4: formData.cardNumber.slice(-4) }
            : { phoneNumber: formData.mobilePhone }),
          transactionId: `tx_${Date.now()}`
        },
        status: 'processing'
      });
      
      if (order) {
        // Update product stock
        for (const item of items) {
          await mongoService.products.updateStock(item.id, item.quantity);
        }
        
        // Link order to user
        if (user) {
          await mongoService.users.addOrder(user._id, order._id);
        }
        
        clearCart();
        navigate('/order-success', { state: { orderId: order._id } });
      } else {
        toast.error('Error al crear la orden');
      }
    } catch (error) {
      toast.error('Ocurrió un error al procesar la orden');
      console.error(error);
    }
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="caserita-container py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar compra</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Información de envío</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Dirección de envío</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Método de pago</h2>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="credit_card" id="payment-credit-card" />
                      <Label htmlFor="payment-credit-card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-caserita-blue" />
                        <span>Tarjeta de crédito o débito</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="yape" id="payment-yape" />
                      <Label htmlFor="payment-yape" className="flex items-center gap-2 cursor-pointer">
                        <img src="https://niubiz.com.pe/wp-content/uploads/2023/04/logo-yape.png" alt="Yape" className="h-6" />
                        <span>Pagar con Yape</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="plin" id="payment-plin" />
                      <Label htmlFor="payment-plin" className="flex items-center gap-2 cursor-pointer">
                        <img src="https://niubiz.com.pe/wp-content/uploads/2023/04/logo-plin.png" alt="Plin" className="h-6" />
                        <span>Pagar con Plin</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {paymentMethod === 'credit_card' ? (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-bold">Pago con tarjeta</h2>
                      <CreditCard className="ml-2 h-5 w-5 text-caserita-blue" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          maxLength={19}
                          required={paymentMethod === 'credit_card'}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="cardholderName">Nombre en la tarjeta</Label>
                        <Input
                          id="cardholderName"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleChange}
                          required={paymentMethod === 'credit_card'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Fecha de expiración</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/AA"
                          maxLength={5}
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required={paymentMethod === 'credit_card'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={handleChange}
                          required={paymentMethod === 'credit_card'}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <h2 className="text-xl font-bold">
                        {paymentMethod === 'yape' ? 'Pago con Yape' : 'Pago con Plin'}
                      </h2>
                      <SmartphoneNfc className="ml-2 h-5 w-5 text-caserita-blue" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobilePhone">Número de celular</Label>
                        <Input
                          id="mobilePhone"
                          name="mobilePhone"
                          placeholder="9XXXXXXXX"
                          type="tel"
                          maxLength={9}
                          value={formData.mobilePhone}
                          onChange={handleChange}
                          required={paymentMethod === 'plin' || paymentMethod === 'yape'}
                        />
                      </div>
                      
                      <div className="flex items-center p-4 bg-gray-50 rounded-md">
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={paymentMethod === 'yape' 
                              ? "https://niubiz.com.pe/wp-content/uploads/2023/04/logo-yape.png"
                              : "https://niubiz.com.pe/wp-content/uploads/2023/04/logo-plin.png"}
                            alt={paymentMethod === 'yape' ? 'Yape' : 'Plin'}
                            className="h-10"
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {paymentMethod === 'yape'
                            ? 'Pagarás con Yape usando el número de celular ingresado. Recibirás una solicitud de pago en tu aplicación Yape.'
                            : 'Pagarás con Plin usando el número de celular ingresado. Recibirás una solicitud de pago en tu aplicación Plin.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-md mb-4">
                    <div className="flex-shrink-0">
                      <img
                        src="https://niubiz.com.pe/wp-content/uploads/2020/10/logo-niubiz.svg"
                        alt="Niubiz"
                        className="h-8"
                      />
                    </div>
                    <p className="ml-4 text-sm text-gray-600">
                      Pago seguro procesado por Niubiz. Tus datos están protegidos con encriptación de nivel bancario.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-primary w-full" 
                    disabled={isProcessing || isCreatingOrder}
                  >
                    {isProcessing || isCreatingOrder ? 'Procesando...' : `Pagar S/ ${total.toFixed(2)}`}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Resumen de la orden</h2>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
