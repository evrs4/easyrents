import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/SupaClient';
import { Calendar, Award, ThumbsUp } from 'lucide-react';


const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) throw new Error('Car ID is required');
        
        const { data, error } = await supabase
          .from('tablecar')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const processFeatures = (featuresString) => {
    if (!featuresString) return [];
    return featuresString
      .split(/[,-]/)
      .map(feature => feature.trim())
      .filter(feature => feature.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Car Details</h2>
          <p className="text-gray-600 mb-4">{error || 'Car not found'}</p>
          <Link to="/" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    const features = processFeatures(car.features);
    
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Speacial Features</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <ThumbsUp className="text-cyan-500 flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Seating Capacity</span>
                    <span className="font-medium">{car.capacity || '5'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Engine</span>
                    <span className="font-medium">{car.engine}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Transmission</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Drivetrain</span>
                    <span className="font-medium">{car.drivetrain}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">All Features</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                    <ThumbsUp className="text-cyan-500 flex-shrink-0" size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to={`/fleet/${car.category?.replace(' ', '-')}`} className="text-cyan-500 hover:text-cyan-600 transition-colors">
            ← Back to {car.category} Cars
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:grid md:grid-cols-2 gap-0">
            <div className="relative">
              <img 
                src={car.image || "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {car.category}
              </div>
            </div>
            
            <div className="p-8">
            {car.premium && (
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-cyan-500" size={24} />
              <span className="text-sm font-medium text-cyan-500">Premium Selection</span>
            </div>
          )}

              
              <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={20} className="text-gray-400" />
                <span className="text-gray-600">{car.year}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-bold text-cyan-600">{car.price}</span>
                
              </div>
              
              <div className="flex gap-4 mb-8">
                <button className="flex-1 bg-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors">
                  Reserve Now
                </button>
                <button className="flex-1 border-2 border-cyan-500 text-cyan-500 py-3 px-6 rounded-lg hover:bg-cyan-50 transition-colors">
                  Schedule Test Drive
                </button>
              </div>
              
              <div className="border-t pt-6">
                <div className="text-sm font-medium text-gray-500 mb-2">Brief Description</div>
                <div className='pr-5'>
                  <div className="text-gray-600">{car.descript}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t">
            <div className="p-4">
              <div className="flex gap-4 border-b">
                <Link
                  className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-cyan-500 border-b-2 border-cyan-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview & Specifications
                </Link>
              </div>
              
              <div className="p-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;