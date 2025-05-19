import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/SupaClient';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const TypePage = () => {
  const { type } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format URL parameter to match database category field
  const formatType = (typeParam) => {
    if (!typeParam) return '';
    return typeParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    const fetchCarsByType = async () => {
      try {
        setLoading(true);
        setError(null);
        const formattedType = formatType(type);
        
        const { data, error } = await supabase
          .from('tablecar')
          .select('*')
          .eq('category', formattedType);

        if (error) throw error;
        setCars(data || []);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCarsByType();
  }, [type]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors">
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{formatType(type)} Choices</h1>
            <Link to="/fleet" className="text-cyan-500 hover:text-cyan-600 transition-colors">
              ← Back to Fleet
            </Link>
          </div>
          
          {cars.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-600 text-xl mb-6">No {formatType(type)} cars available at the moment.</p>
              <Link to="/" className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors">
                Explore Other Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Link 
                  key={car.id}
                  to={`/car/${car.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={car.image || "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-cyan-500 text-white px-3 py-1 text-sm font-semibold">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {car.brand} {car.model} {car.year}
                    </h2>
                    <p className="text-cyan-600 font-bold mb-4">{car.price}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="material-icons mr-1">⚙️</span> 
                        {car.engine}
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons mr-1">🔄</span> 
                        {car.transmission}
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-cyan-400 text-white py-2 rounded hover:bg-cyan-500 transition-colors">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TypePage;