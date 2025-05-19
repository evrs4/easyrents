import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation";
import satu from "../../src/assets/carfleet.png";
import dua from "../../src/assets/carfleetjuga.png";
import { Link } from "react-router-dom";
export default function Nyoba() {
    return (
        <div>
    <Swiper 
      className="w-full h-auto"
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
    >
      <SwiperSlide>
        <div className="image relative">
            <img src={satu} alt="" className="size-[600px] ml-[55rem]"/>
            <div className="space-y-5 title-content absolute top-[35%] left-[3rem] w-1/2 ml-7">
                <h1 className="text-3xl mb-5 font-[500]">Discover Your Perfect Ride with 25+ Cars to Choose From!</h1>
                <p className="break-normal w-[50%]">Looking for the ideal car for your next journey? Our rental
               service offers a wide range of over 25 vehicles, from sleek sedans
               to spacious SUVs and magnificent rides. Whether you`re planning a
               business trip, having a duty or a weekend getaway!</p>
               <Link to={"/fleet"} className="px-[2rem] p-2 bg-yellow-500 text-white mt-5 rounded-lg">Find a Car</Link>
            </div>
        </div>
      </SwiperSlide>

      <SwiperSlide> <div className="image relative">
            <img src={dua} alt="" className="size-[600px] ml-[55rem]"/>
            <div className="space-y-5 title-content absolute top-[35%] left-[3rem] w-1/2 ml-7">
                <h1 className="text-3xl mb-5 font-[500]">🌟 Experience the Future of Driving with Our Electric Vehicles! 🌟</h1>
                <p className="break-normal w-[50%]">Say goodbye to gas stations and hello to innovation! 
                    Explore our cutting-edge fleet of electric cars and redefine your driving experience with modern comfort, 
                    efficiency, and sustainability.</p>
               <Link to={"/Electric"} className="px-[2rem] p-2 bg-yellow-500 text-white mt-5 rounded-lg">Find a Car</Link>
            </div>
        </div>
        </SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
        </div>
    )
}