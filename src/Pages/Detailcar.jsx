import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/SupaClient';
import { Calendar, Award, ThumbsUp, X, Plus, Minus } from 'lucide-react';
import Swal from 'sweetalert2';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate(); 


  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState(1);

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

  const handleDurationChange = (delta) => {
    setDuration(prev => Math.max(1, prev + delta));
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

  const parsePrice = (priceString) => {
  if (!priceString) return 0;
  const numeric = priceString.replace(/[^\d]/g, '');
  return parseInt(numeric, 10);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
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
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex-1 bg-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
                >
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Reserve Car</h2>

            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Duration (hours)</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleDurationChange(-1)} className="bg-gray-200 p-2 rounded-full">
                  <Minus size={16} />
                </button>
                <span className="text-xl font-bold">{duration}</span>
                <button onClick={() => handleDurationChange(1)} className="bg-gray-200 p-2 rounded-full">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-gray-600">Price per hour:</span>
              <div className="text-lg font-bold text-cyan-600">{car.price}</div>
            </div>

            <div className="mb-4">
              <span className="text-gray-600">Total Price:</span>
              <div className="text-xl font-bold text-cyan-700">
              {formatCurrency(parsePrice(car.price) * duration)}
            </div>

            </div>

            <button
              onClick={() => {
                Swal.fire({
                  title: 'Reservation Confirmed!',
                  text: 'Your car has been reserved successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#06b6d4', // cyan-500
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate('/');
                  }
                });
              }}
              className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Reserve Now
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
