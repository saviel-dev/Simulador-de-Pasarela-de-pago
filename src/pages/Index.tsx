
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ImageCarousel } from '@/components/ImageCarousel';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { AlliedMarkets } from '@/components/AlliedMarkets';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Image Carousel Section */}
        <section className="py-16 bg-white">
          <div className="caserita-container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Productos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Descubre la variedad y calidad de productos que tenemos para ti
              </p>
            </div>
            <ImageCarousel />
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16">
          <div className="caserita-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Categorías</h2>
              <Link to="/categories">
                <Button variant="ghost" className="text-caserita-blue">
                  Ver todas
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="caserita-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Productos Destacados</h2>
              <Link to="/products">
                <Button variant="ghost" className="text-caserita-blue">
                  Ver todos
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Allied Markets Section */}
        <AlliedMarkets />
        
        {/* Promotion Banner */}
        <section className="py-16">
          <div className="caserita-container">
            <div className="bg-gradient-to-r from-caserita-blue to-caserita-blue-light rounded-xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Aprovecha nuestras ofertas especiales
                  </h2>
                  <p className="text-white/80 text-lg mb-6">
                    Hasta 30% de descuento en productos seleccionados. ¡Por tiempo limitado!
                  </p>
                  <Button className="btn-secondary" asChild>
                    <Link to="/products">
                      Ver ofertas
                    </Link>
                  </Button>
                </div>
                <div className="flex-1 md:h-72">
                  <img 
                    src="https://images.unsplash.com/photo-1612103198005-b238154f4590?q=80&w=2069" 
                    alt="Promoción especial" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
