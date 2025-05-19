import { Link } from "react-router-dom";
import getStaticAsset from "../utils/getStaticAsset";

const BrowseByManufacturers = () => {
    const manufacturers = [
        { label: "Toyota", icon: getStaticAsset("toyoicon.png") },
        { label: "Honda", icon: getStaticAsset("honicon.png") },
        { label: "Nissan", icon: getStaticAsset("nissan.png") },
        { label: "Suzuki", icon: getStaticAsset("suzuki.png") },
        { label: "Mazda", icon: getStaticAsset("mazda.png") },
        { label: "Mitsubishi", icon: getStaticAsset("mitsubishi.png") },
        { label: "Isuzu", icon: getStaticAsset("isu.png") },
        { label: "Daihatsu", icon: getStaticAsset("dai.png") },
        { label: "BYD", icon: getStaticAsset("byd.png") },
        { label: "Wuling", icon: getStaticAsset("wuling.png"), customClass: "w-20 h-16" }, // lebih tinggi
        { label: "Kia", icon: getStaticAsset("kia.png"), customClass: "w-20 h-14" }, // dipersempit sedikit
        { label: "Hyundai", icon: getStaticAsset("hyundai.png"), customClass: "w-26 h-16" }
      ];
      return (
        <div className="mt-12 mb-20">
          <h2 className="text-3xl font-bold text-center">
  Browse by 
  <span className="text-[#E1B956] ml-2">
     Manufaturers
  </span>
</h2>
          {/* Manufacturer Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 justify-items-center">
            {manufacturers.map((manufacturer, index) => (
              <Link
                to={`/brand/${manufacturer.label}`}
                key={index}
                className="bg-[#E1B956] p-6 rounded-lg shadow-lg text-center w-40 h-40 flex flex-col items-center justify-center"
              >
                {/* Logo */}
                <img
                src={manufacturer.icon}
                alt={manufacturer.label}
                className={`mb-4 object-contain ${manufacturer.customClass || "w-16 h-16"}`}
              />

                {/* Manufacturer Name */}
                <div className="font-semibold text-white text-lg">
                  {manufacturer.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }

export default BrowseByManufacturers