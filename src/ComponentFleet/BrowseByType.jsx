import { FaBus, FaCity, FaTruckPickup, FaTree, FaUsers } from "react-icons/fa";
import { MdElectricCar } from "react-icons/md";
import { Link } from "react-router-dom";

const BrowseByType = () => {
  const types = [
    { label: "MPV", icon: <FaUsers size={32} /> },
    { label: "City Car", icon: <FaCity size={32} /> },
    { label: "Pick-Up", icon: <FaTruckPickup size={32} /> },
    { label: "SUV", icon: <FaTree size={32} /> },
    { label: "Minibus", icon: <FaBus size={32} /> },
    { label: "Electric", icon: <MdElectricCar size={32} />, new: true },
  ];

  return (
    <div className="mt-12">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-center">
        Browse by 
        <span className="text-[#E1B956] ml-2">
          Type 
          <span className="relative inline-block ml-2 cursor-pointer group text-base">
            ℹ️
            {/* Tooltip Text */}
            <span className="absolute left-1/2 transform -translate-x-1/2 -top-20 hidden group-hover:block bg-slate-600 opacity-100 text-white text-xs rounded-lg py-1 px-2 shadow-lg w-max text-left">
              + MPV stands for Multi Purpose Vehicle, suitable for family and daily use. <br />
              + City Car is designed to be compact in city use and minimal in fuel consumption.<br />
              + Pick-up trucks are built to support small-scale logistics or delivery needs.<br />
              + SUV stands for Sport Utility Vehicle that is reliable in all terrains and for expedition purposes.<br />
              + Minibus or People Carrier is the car class with the most passengers.<br />
              + Electric cars are known for their quiet sound, satisfactory acceleration and good mileage.<br />
            </span>
          </span>
        </span>
      </h2>

      {/* Horizontal Scroll Section */}
      <div className="relative mt-6 flex justify-center bg-gray-200 p-6 rounded-lg">
        <div className="flex space-x-4 overflow-x-auto">
          {types.map((type, index) => (
            <Link
              to={`/fleet/${type.label.replace(' ', '-')}`}
              key={index}
              className="flex-shrink-0 bg-white p-4 pt-7 rounded-lg shadow-md text-center w-28 hover:bg-gray-50 transition-colors"
            >
              <div className="text-gray-700 flex justify-center">{type.icon}</div>
              <div className="mt-2 font-semibold text-sm">{type.label}</div>
              {type.new && (
                <span className="text-red-500 font-bold text-xs mt-1">New!</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseByType;