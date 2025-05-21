
import { v4 as uuidv4 } from 'uuid';
import { MongoDocument, ProductDocument, OrderDocument, UserDocument } from './types';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';

// Clase base para operaciones CRUD simuladas
class MongoCollection<T extends MongoDocument> {
  protected items: T[] = [];
  
  constructor(initialItems: Partial<T>[] = []) {
    this.items = initialItems.map(item => ({
      ...item,
      _id: item._id || uuidv4(),
      createdAt: item.createdAt || new Date(),
      updatedAt: item.updatedAt || new Date(),
    } as T));
  }

  async findAll(): Promise<T[]> {
    // Simula un retraso de red
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.items];
  }

  async findById(id: string): Promise<T | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const item = this.items.find(item => item._id === id);
    return item ? { ...item } : null;
  }

  async insertOne(data: Partial<T>): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const now = new Date();
    const newItem = {
      ...data,
      _id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    } as T;
    
    this.items.push(newItem);
    return { ...newItem };
  }

  async updateOne(id: string, data: Partial<T>): Promise<T | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const index = this.items.findIndex(item => item._id === id);
    
    if (index === -1) return null;
    
    const updatedItem = {
      ...this.items[index],
      ...data,
      updatedAt: new Date(),
    } as T;
    
    this.items[index] = updatedItem;
    return { ...updatedItem };
  }

  async deleteOne(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item._id !== id);
    return this.items.length !== initialLength;
  }

  async count(): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 30));
    return this.items.length;
  }
}

// Colección de productos
class ProductCollection extends MongoCollection<ProductDocument> {
  constructor() {
    // Convertir los productos iniciales al formato de MongoDB
    const initialProductDocs = initialProducts.map(product => ({
      _id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
    }));
    
    super(initialProductDocs);
  }
  
  // Métodos específicos para productos
  async findByCategory(category: string): Promise<ProductDocument[]> {
    await new Promise(resolve => setTimeout(resolve, 80));
    return this.items.filter(product => product.category === category);
  }
  
  async updateStock(id: string, quantity: number): Promise<ProductDocument | null> {
    const product = await this.findById(id);
    if (!product) return null;
    
    const newStock = Math.max(0, product.stock - quantity);
    return this.updateOne(id, { stock: newStock });
  }

  // Convertir al formato de la aplicación
  toAppProduct(doc: ProductDocument): Product {
    return {
      id: doc._id,
      name: doc.name,
      price: doc.price,
      description: doc.description,
      image: doc.image,
      category: doc.category,
      stock: doc.stock
    };
  }
}

// Colección de órdenes
class OrderCollection extends MongoCollection<OrderDocument> {
  // Métodos específicos para órdenes
  async findByUserId(userId: string): Promise<OrderDocument[]> {
    await new Promise(resolve => setTimeout(resolve, 80));
    return this.items.filter(order => order.userId === userId);
  }
  
  async updateStatus(id: string, status: OrderDocument['status']): Promise<OrderDocument | null> {
    return this.updateOne(id, { status });
  }
}

// Colección de usuarios
class UserCollection extends MongoCollection<UserDocument> {
  // Métodos específicos para usuarios
  async findByEmail(email: string): Promise<UserDocument | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const user = this.items.find(user => user.email === email);
    return user ? { ...user } : null;
  }
  
  async addOrder(userId: string, orderId: string): Promise<UserDocument | null> {
    const user = await this.findById(userId);
    if (!user) return null;
    
    const orders = user.orders || [];
    return this.updateOne(userId, { orders: [...orders, orderId] });
  }
}

// Exportar una instancia singleton de cada colección
export const mongoProducts = new ProductCollection();
export const mongoOrders = new OrderCollection();
export const mongoUsers = new UserCollection();

// Servicio principal que agrupa todas las colecciones
export class MongoService {
  products = mongoProducts;
  orders = mongoOrders;
  users = mongoUsers;
}

export const mongoService = new MongoService();
export default mongoService;
