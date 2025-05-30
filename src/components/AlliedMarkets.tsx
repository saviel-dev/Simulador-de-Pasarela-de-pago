
import { Card } from '@/components/ui/card';

interface Market {
  id: string;
  name: string;
  description: string;
  image: string;
}

const markets: Market[] = [
  {
    id: '1',
    name: 'Metro',
    description: 'Calidad garantizada siempre disponible',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=2070'
  },
  {
    id: '2',
    name: 'Wong',
    description: 'Productos frescos de primera',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070'
  },
  {
    id: '3',
    name: 'Plaza Vea',
    description: 'Variedad completa para familias',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=2070'
  }
];

export const AlliedMarkets: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="caserita-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-caserita-blue to-caserita-blue-light bg-clip-text text-transparent mb-4">
            Mercados Aliados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trabajamos con los mejores supermercados para ofrecerte la mayor variedad y calidad
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-caserita-blue to-caserita-blue-light mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <Card 
              key={market.id} 
              className="overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <img
                  src={market.image}
                  alt={market.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-caserita-blue text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Aliado
                  </span>
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-caserita-blue to-caserita-blue-light"></div>
                <h3 className="font-bold text-2xl text-gray-800 mb-3 group-hover:text-caserita-blue transition-colors duration-300">
                  {market.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {market.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Disponible</span>
                  </div>
                  <button className="text-caserita-blue hover:text-caserita-blue-light transition-colors duration-300 font-semibold text-sm">
                    Ver más →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-caserita-blue to-caserita-blue-light text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Ver todos los mercados
          </button>
        </div>
      </div>
    </section>
  );
};
