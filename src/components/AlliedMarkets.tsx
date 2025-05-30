
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
    <section className="py-16 bg-white">
      <div className="caserita-container">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Mercados Aliados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {markets.map(market => (
            <Card key={market.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={market.image}
                  alt={market.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{market.name}</h3>
                <p className="text-gray-600">{market.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
