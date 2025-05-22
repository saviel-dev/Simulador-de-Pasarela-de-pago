
import { createContext, useContext, useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface NiubizContextType {
  isProcessing: boolean;
  processPayment: (amount: number, paymentInfo: PaymentInfo) => Promise<boolean>;
}

export type PaymentMethod = 'credit_card' | 'plin' | 'yape';

export interface CardInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface MobilePaymentInfo {
  phoneNumber: string;
}

export type PaymentInfo = {
  method: PaymentMethod;
} & (
  { method: 'credit_card'; cardInfo: CardInfo } |
  { method: 'plin' | 'yape'; mobileInfo: MobilePaymentInfo }
);

const NiubizContext = createContext<NiubizContextType | undefined>(undefined);

export const NiubizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // This is a simulated payment processing function
  // In a real implementation, this would integrate with the Niubiz SDK and mobile payment APIs
  const processPayment = async (amount: number, paymentInfo: PaymentInfo): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentInfo.method === 'credit_card') {
        const { cardInfo } = paymentInfo;
        
        // Simple validation (in reality, this would be handled by Niubiz SDK)
        if (cardInfo.cardNumber.length < 16) {
          toast.error('Número de tarjeta inválido');
          return false;
        }
        
        if (cardInfo.cvv.length < 3) {
          toast.error('CVV inválido');
          return false;
        }
        
        // Success
        toast.success('Pago con tarjeta procesado exitosamente');
        return true;
      } 
      else if (paymentInfo.method === 'plin' || paymentInfo.method === 'yape') {
        const { mobileInfo } = paymentInfo;
        
        // Simple validation
        if (mobileInfo.phoneNumber.length !== 9) {
          toast.error('Número de teléfono inválido. Debe tener 9 dígitos');
          return false;
        }

        // Success message specific to the payment method
        if (paymentInfo.method === 'plin') {
          toast.success('Solicitud de pago con Plin enviada a tu celular');
        } else {
          toast.success('Solicitud de pago con Yape enviada a tu celular');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Error al procesar el pago');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <NiubizContext.Provider value={{ isProcessing, processPayment }}>
      {children}
    </NiubizContext.Provider>
  );
};

export const useNiubiz = () => {
  const context = useContext(NiubizContext);
  if (context === undefined) {
    throw new Error('useNiubiz must be used within a NiubizProvider');
  }
  return context;
};
