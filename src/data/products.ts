
import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Manzanas Rojas Premium',
    price: 8.50,
    description: 'Manzanas rojas frescas y crujientes, perfectas para toda la familia',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=2064',
    category: 'frutas',
    stock: 50
  },
  {
    id: '2',
    name: 'Leche Entera Gloria 1L',
    price: 4.20,
    description: 'Leche entera fresca y nutritiva, rica en calcio y vitaminas',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974',
    category: 'lacteos',
    stock: 30
  },
  {
    id: '3',
    name: 'Pollo Fresco por Kg',
    price: 12.90,
    description: 'Pollo fresco de granja, tierno y de excelente calidad',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1974',
    category: 'carnes',
    stock: 25
  },
  {
    id: '4',
    name: 'Arroz Extra Superior 5Kg',
    price: 18.50,
    description: 'Arroz de grano largo, ideal para preparaciones familiares',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070',
    category: 'abarrotes',
    stock: 40
  },
  {
    id: '5',
    name: 'Tomates Frescos por Kg',
    price: 6.80,
    description: 'Tomates rojos maduros, perfectos para ensaladas y guisos',
    image: 'https://images.unsplash.com/photo-1546470427-e26264d4e0c2?q=80&w=1974',
    category: 'verduras',
    stock: 35
  },
  {
    id: '6',
    name: 'Queso Fresco 500g',
    price: 15.20,
    description: 'Queso fresco artesanal, suave y cremoso para desayunos',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073',
    category: 'lacteos',
    stock: 20
  },
  {
    id: '7',
    name: 'Plátanos de Seda por Kg',
    price: 3.50,
    description: 'Plátanos dulces y nutritivos, ricos en potasio',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1980',
    category: 'frutas',
    stock: 60
  },
  {
    id: '8',
    name: 'Aceite Vegetal Primor 1L',
    price: 9.90,
    description: 'Aceite vegetal puro, ideal para freír y cocinar',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2126',
    category: 'abarrotes',
    stock: 45
  }
];

export const categories: Category[] = [
  {
    id: 'frutas',
    name: 'Frutas',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070'
  },
  {
    id: 'verduras',
    name: 'Verduras',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084'
  },
  {
    id: 'lacteos',
    name: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2070'
  },
  {
    id: 'carnes',
    name: 'Carnes',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070'
  },
  {
    id: 'abarrotes',
    name: 'Abarrotes',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1974'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};
