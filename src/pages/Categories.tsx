
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/data/products';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="caserita-container py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Categorías</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
