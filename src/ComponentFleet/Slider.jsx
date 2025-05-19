import satu from "../../src/assets/carfleet.png";
import dua from "../../src/assets/carfleetjuga.png";
import tiga from "../../src/assets/carfleet3.png"
import { useState } from "react";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      img: satu,
      title: "✨ Discover Your Perfect Ride with 30+ Cars to Choose From ✨",
      description:
        "Looking for the ideal car for your next journey? Our rental service offers a wide range of over 30 vehicles, from sleek sedans to spacious SUVs and magnificent rides. Whether you're planning a business trip or a weekend getaway!",
    },
    {
      img: dua,
      title: "⚡Experience the Future of Driving with Our Electric Vehicles! ⚡",
      description:
        "Say goodbye to gas stations and hello to innovation! Explore our cutting-edge fleet of electric cars and redefine your driving experience with modern comfort, efficiency, and sustainability.",
    },
    {
      img: tiga,
      title: "👍Hassle-Free Process and Instant Bookings👍",
      description:
      "EasyRent provides the ease of our Rental cars, just book and we will deliver you the car. No hassle, no worry, no stress. We will take care of everything for you. Book now and get the car you want.",
    },
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div id="default-carousel" className="relative w-full h-full mt-16 ">
      <div className="relative h-[40rem] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.img} alt="Car Fleet" className="size-[600px] ml-[55rem] object-cover" />
            <div className="absolute top-[35%] left-[3rem] w-1/2 ml-7 text-black p-5 bg-white bg-opacity-70 rounded-lg">
              <h1 className="text-3xl mb-5 font-[500]">{slide.title}</h1>
              <p className="break-normal w-[80%]">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </span>
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Slider;
