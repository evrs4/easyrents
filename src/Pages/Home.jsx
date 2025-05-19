
import Carousel from "../Components/HeroSection";
import FeaturedCars from "../Components/FeaturedCars";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import LogoAnimation from "../Components/LogoAnimation";
import  BestSelling  from "../Components/BestSelling";

const Home = () => {
  
  const brandName = "EasyRent";
  
  return (
    <div>
      <Header brandName={brandName}/>
      <Carousel brandName={brandName}/>
      <LogoAnimation />
      <FeaturedCars />
      <BestSelling />
      <Footer brandName={brandName}/>
    </div>
  );
};

export default Home;