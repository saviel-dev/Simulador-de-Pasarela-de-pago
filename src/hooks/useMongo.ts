
import { useState, useEffect } from 'react';
import { mongoService } from '../services/mongo/MongoService';
import { ProductDocument, OrderDocument, UserDocument } from '../services/mongo/types';

// Hook para usar productos de MongoDB
export const useMongoProducts = (categoryId?: string) => {
  const [products, setProducts] = useState<ProductDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let result: ProductDocument[];
        
        if (categoryId) {
          result = await mongoService.products.findByCategory(categoryId);
        } else {
          result = await mongoService.products.findAll();
        }
        
        setProducts(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching products'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, isLoading, error };
};

// Hook para usar un producto específico
export const useMongoProduct = (productId?: string) => {
  const [product, setProduct] = useState<ProductDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const result = await mongoService.products.findById(productId);
        setProduct(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching product'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
};

// Hook para usar órdenes
export const useMongoOrders = (userId?: string) => {
  const [orders, setOrders] = useState<OrderDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        let result: OrderDocument[];
        
        if (userId) {
          result = await mongoService.orders.findByUserId(userId);
        } else {
          result = await mongoService.orders.findAll();
        }
        
        setOrders(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching orders'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, isLoading, error };
};

// Hook para crear una orden
export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async (orderData: Partial<OrderDocument>): Promise<OrderDocument | null> => {
    try {
      setIsLoading(true);
      const order = await mongoService.orders.insertOne(orderData);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error creating order'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, error };
};
