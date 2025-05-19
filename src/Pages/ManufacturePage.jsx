import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../utils/SupaClient';

export default function ManufacturePage() {
  const { brandName } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    async function fetchBrandCars() {
      try {
        setLoading(true);
        
        const { data, error: carsError } = await supabase
          .from('tablecar')
          .select('*')
          .eq('brand', brandName)
          .order('year', { ascending: false });

        if (carsError) throw carsError;
        setCars(data || []);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (brandName) {
      fetchBrandCars();
    }
  }, [brandName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E1B956]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Brand Header Section */}
      <div className="w-full h-[300px] flex flex-col items-center justify-center space-y-4"
      style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) ', backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">{brandName}</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discover our collection of {brandName} vehicles, featuring the latest models
            and innovative automotive technology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={car.image || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {car.model} ({car.year})
                </h3>
                <p className="text-gray-600 mb-4">{car.price}</p>
                <Link to={`/car/${car.id}`} className="w-full bg-[#E1B956] text-white py-2 px-4 rounded hover:bg-[#d1a846] transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {cars.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-600">
              No cars available for {brandName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}