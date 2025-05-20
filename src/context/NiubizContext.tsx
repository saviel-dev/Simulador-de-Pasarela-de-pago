
import { createContext, useContext, useState } from 'react';
import { toast } from '@/components/ui/sonner';

interface NiubizContextType {
  isProcessing: boolean;
  processPayment: (amount: number, cardInfo: CardInfo) => Promise<boolean>;
}

interface CardInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const NiubizContext = createContext<NiubizContextType | undefined>(undefined);

export const NiubizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // This is a simulated payment processing function
  // In a real implementation, this would integrate with the Niubiz SDK
  const processPayment = async (amount: number, cardInfo: CardInfo): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      toast.success('Pago procesado exitosamente');
      return true;
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
