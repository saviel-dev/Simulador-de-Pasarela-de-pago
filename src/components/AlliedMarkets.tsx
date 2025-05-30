
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
    name: 'Mercado Productores Santa Anita',
    description: 'El principal mercado mayorista de Lima, ofreciendo la mejor calidad en productos frescos',
    image: '/images/mercadoProductores.png'
  },
  {
    id: '2',
    name: 'Mercado Mayorista de Frutas & Lima - Perú',
    description: 'Centro especializado en la distribución de frutas frescas para todo Lima',
    image: '/images/mercadoMayorista.png'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {markets.map((market, index) => (
            <Card 
              key={market.id} 
              className="overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={market.image}
                  alt={market.name}
                  className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-2xl text-gray-800 mb-3 group-hover:text-caserita-blue transition-colors duration-300">
                  {market.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {market.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
