import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../utils/SupaClient";
import { Link } from "react-router-dom";

const BestSelling = () => {
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase
        .from("tablecar")
        .select("*")
        .eq("premium", true)
        .order("created_at", { ascending: false });

      if (!error && data) setCars(data);
    }
    fetchCars();
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + cars.length) % cars.length
    );
  };

  if (!cars.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );

    const processFeatures = (featuresString) => {
    if (!featuresString) return [];
    return featuresString
      .split(/[,-]/)
      .map(feature => feature.trim())
      .filter(feature => feature.length > 0);
  };
  

  return (
    <div className="bg-gray-100 py-16 px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl gap-4 flex flex-col md:flex-row items-center">
  {/* Left arrow */}
  <button
    onClick={() => paginate(-1)}
    className="hidden md:flex shrink-0 p-2 rounded-full bg-white/90 backdrop-blur shadow-md hover:bg-gray-100 transition-colors"
    aria-label="Previous car"
  >
    <ChevronLeft className="w-6 h-6 text-gray-800" />
  </button>

  {/* Carousel */}
  <div className="relative w-full h-auto md:h-[380px]">
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={currentIndex}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 h-full">
          {/* Image */}
          <div className="w-full md:w-2/3 h-64 md:h-auto relative">
            <img
              src={cars[currentIndex].image}
              alt={cars[currentIndex].model}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 w-full md:w-2/3 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                Premium Choice!
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 text-sm">
                {cars[currentIndex].brand.toUpperCase()}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              {cars[currentIndex].model}
            </h3>

            <div className="space-y-2">
              <p className="font-medium text-gray-700">Key Features:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                {processFeatures(cars[currentIndex].features).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-medium">{cars[currentIndex].capacity}</p>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden md:block" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-bold text-cyan-500">
                  {cars[currentIndex].price}
                </p>
              </div>
            </div>

            <Link
              to={`/car/${cars[currentIndex].id}`}
              className="block w-full mt-4 px-5 py-3 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500 text-center"
            >
              Rent Now
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

  </div>

  {/* Right arrow */}
  <button
    onClick={() => paginate(1)}
    className="hidden md:flex p-2 rounded-full bg-white/90 backdrop-blur shadow hover:bg-gray-100"
  >
    <ChevronRight className="w-6 h-6 text-gray-800" />
  </button>
</div>

    </div>
  );
};

export default BestSelling;


