
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory, categories } from '@/data/products';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const products = getProductsByCategory(id || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
            <Link to="/categories" className="text-caserita-blue hover:underline">
              Volver a categorías
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative h-64 bg-gray-100">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="caserita-container">
              <Link to="/categories" className="flex items-center text-white mb-2 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Volver a categorías
              </Link>
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
            </div>
          </div>
        </div>
        
        <div className="caserita-container py-12">
          {/* Filters Row */}
          <div className="flex justify-end mb-8">
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Destacados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio: Bajo a alto</SelectItem>
                  <SelectItem value="price-high">Precio: Alto a bajo</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No hay productos en esta categoría</h2>
              <p className="text-gray-500">Intenta con otra categoría o vuelve más tarde.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
