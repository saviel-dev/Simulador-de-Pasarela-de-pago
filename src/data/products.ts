
import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smart TV 4K 55"',
    price: 2499.99,
    description: 'Smart TV 4K con resolución Ultra HD y sistema operativo inteligente',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070',
    category: 'electronics',
    stock: 10
  },
  {
    id: '2',
    name: 'Laptop Pro 15"',
    price: 4999.99,
    description: 'Laptop profesional con procesador de última generación y 16GB de RAM',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926',
    category: 'electronics',
    stock: 5
  },
  {
    id: '3',
    name: 'Smartphone Ultra',
    price: 3299.99,
    description: 'Smartphone con cámara de 108MP y batería de larga duración',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127',
    category: 'electronics',
    stock: 15
  },
  {
    id: '4',
    name: 'Auriculares Wireless',
    price: 499.99,
    description: 'Auriculares inalámbricos con cancelación de ruido activa',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070',
    category: 'accessories',
    stock: 20
  },
  {
    id: '5',
    name: 'Smartwatch Deportivo',
    price: 899.99,
    description: 'Reloj inteligente con GPS y monitor de frecuencia cardíaca',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072',
    category: 'accessories',
    stock: 8
  },
  {
    id: '6',
    name: 'Consola de Videojuegos',
    price: 1999.99,
    description: 'Consola de última generación con gráficos 4K y 1TB de almacenamiento',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=2060',
    category: 'gaming',
    stock: 3
  },
  {
    id: '7',
    name: 'Cámara Mirrorless',
    price: 3599.99,
    description: 'Cámara mirrorless profesional con sensor full-frame y 4K video',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964',
    category: 'electronics',
    stock: 7
  },
  {
    id: '8',
    name: 'Tablet Pro 12"',
    price: 2799.99,
    description: 'Tablet profesional con pantalla retina y lápiz digital incluido',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1974',
    category: 'electronics',
    stock: 12
  }
];

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electrónicos',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101'
  },
  {
    id: 'accessories',
    name: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1600003263720-95b45a4035d5?q=80&w=1974'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};
