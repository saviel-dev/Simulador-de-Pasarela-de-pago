
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-caserita-blue-light/10 to-caserita-yellow/20 py-16">
          <div className="caserita-container">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Sobre Caserita</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Tu tienda online de confianza para todos tus productos favoritos.
            </p>
          </div>
        </div>
        
        <div className="caserita-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
                Caserita nació con el objetivo de crear una experiencia de compra online sencilla y confiable para todos los peruanos. Nuestra misión es conectar a los clientes con los mejores productos del mercado a precios justos y con un servicio excepcional.
              </p>
              <p className="text-gray-600 mb-4">
                Desde nuestros inicios, nos hemos comprometido con la calidad, la transparencia y la satisfacción del cliente. Trabajamos directamente con proveedores y fabricantes para garantizar que cada producto cumpla con nuestros estándares.
              </p>
              <p className="text-gray-600">
                Con el tiempo, hemos crecido hasta convertirnos en una de las tiendas online más confiables del país, siempre manteniendo nuestros valores fundamentales y el espíritu de servicio que nos caracteriza.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1974"
                alt="Equipo de Caserita"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-caserita-blue/10 rounded-lg -z-10"></div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">¿Por qué elegirnos?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-caserita-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-caserita-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Calidad Garantizada</h3>
                <p className="text-gray-600">
                  Todos nuestros productos pasan por un riguroso control de calidad antes de llegar a tus manos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-caserita-yellow/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-caserita-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Envío Rápido</h3>
                <p className="text-gray-600">
                  Entregamos tus compras en tiempo récord para que puedas disfrutar de ellas lo antes posible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-caserita-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-caserita-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3">Atención al Cliente</h3>
                <p className="text-gray-600">
                  Nuestro equipo está siempre disponible para ayudarte con cualquier duda o problema que puedas tener.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
