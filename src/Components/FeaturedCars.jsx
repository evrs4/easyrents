import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/SupaClient';

const FeaturedCars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('tablecar')
        .select('*')
        .limit(9);

      if (error) throw error;
      setVehicles(data);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = (carId) => {
    navigate(`/car/${carId}`);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-white">Loading vehicles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">Featured Vehicles</h2>
          <p className="text-gray-400">Explore our latest models designed for performance, comfort, and innovation.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="bg-[#E1B956] rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={vehicle.image || 'https://images.pexels.com/photos/3566207/pexels-photo-3566207.jpeg'} 
                  alt={`${vehicle.brand} ${vehicle.model}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 bg-[#273F4F]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-whitetext-sm font-semibold text-[#E1B956]">{vehicle.category}</span>
                  <span className="text-sm text-white">{vehicle.price}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{`${vehicle.brand} ${vehicle.model}`}</h3>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-white">
                    <span className="block">Year: {vehicle.year}</span>
                    <span className="block">Engine: {vehicle.engine}</span>
                  </div>
                  <button 
                    onClick={() => handleExplore(vehicle.id)}
                    className="flex items-center text-[#E1B956] group-hover:text-white transition-colors"
                  >
                    Explore <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;








// import { useEffect, useState } from 'react';
// import { supabase } from '../utils/SupaClient';
// import { Link } from 'react-router-dom';

// const FeaturedCars = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Tambahkan state error
//   const [currentPage, setCurrentPage] = useState(1); // Initial page number
//   const carsPerPage = 8; // Number of cars to display per page

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   const fetchCars = async () => {
//     try {
//       console.log("Fetching cars..."); // Debug point 1

//       const { data, error } = await supabase
//         .from('tablecar')
//         .select("*")
//         .order('id', { ascending: true });

//       console.log("Raw response:", { data, error }); // Debug point 2

//       if (error) {
//         console.error("Supabase error:", error); // Debug point 3
//         setError(error.message);
//         throw error;
//       }

//       if (!data || data.length === 0) {
//         console.log("No data returned from Supabase"); // Debug point 4
//         setError('No cars found in database');
//         return;
//       }

//       console.log("Successfully fetched cars:", data); // Debug point 5
//       setCars(data);
//     } catch (err) {
//       console.error("Catch block error:", err); // Debug point 6
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle pagination
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const getPaginatedCars = () => {
//     const startIndex = (currentPage - 1) * carsPerPage;
//     const endIndex = startIndex + carsPerPage;
//     return cars.slice(startIndex, endIndex);
//   };

//   // Function to generate page numbers
//   const generatePageNumbers = () => {
//     const totalPages = Math.ceil(cars.length / carsPerPage);
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//     return pageNumbers;
//   };

//   // Debugging render
//   console.log("Current state - cars:", cars, "loading:", loading, "error:", error);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 p-4">
//         Error: {error}
//       </div>
//     );
//   }

//   if (!cars || cars.length === 0) {
//     return (
//       <div className="text-center text-gray-600 p-4">
//         No cars available
//       </div>
//     );
//   }

//   const paginatedCars = getPaginatedCars();
//   const pageNumbers = generatePageNumbers();

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl mb-4">Available Cars</h2>
//         <div className="flex justify-center">
//           <div className="w-16 h-1 bg-yellow-400"></div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {paginatedCars.map((car) => (
//           <div key={car.id} className="flex flex-col items-center border p-4 rounded-lg">
//             <div className="relative w-full object-cover h-48 mb-4 transition-transform duration-300 hover:scale-105">
//               <img
//                 src={car.image}
//                 alt={car.model}
//                 className="w-full h-full object-cover shadow-lg rounded-lg"
//               />
//             </div>
//             <h3 className="text-xl mb-2">{car.model || 'Unknown Model'}</h3>
//             <p className="text-gray-500 mb-2">{car.brand || 'Unknown Brand'}</p>
//             <button className='bg-cyan-400 text-white py-2 px-4 rounded hover:scale-90'>
//               <Link  key={car.id} 
//               to={`/car/${car.id}`}>Details</Link></button>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-6">
//         {pageNumbers.map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => handlePageChange(pageNumber)}
//             className={`px-3 py-1 mx-1 rounded-md ${
//               currentPage === pageNumber
//                 ? 'bg-yellow-400 text-white'
//                 : 'bg-gray-200'
//             }`}
//           >
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedCars;