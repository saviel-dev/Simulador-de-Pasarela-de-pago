
// Define los tipos para la simulación de MongoDB
export interface MongoDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDocument extends MongoDocument {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  discount?: number; // Porcentaje de descuento (opcional)
  originalPrice?: number; // Precio original antes del descuento (opcional)
  tags?: string[]; // Etiquetas adicionales para el producto
  featured?: boolean; // Si el producto está destacado
}

export interface OrderDocument extends MongoDocument {
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentDetails: {
    method: string;
    cardLast4?: string;
    transactionId?: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface UserDocument extends MongoDocument {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orders?: string[]; // Referencias a IDs de órdenes
}
