import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Slider from "../ComponentFleet/Slider";
import BrowseByType from "../ComponentFleet/BrowseByType";
import BrowseByManufacturers from "../ComponentFleet/BrowseByManufacturer";

const Fleet = () => {
    return (
        <div>
            <Header />
            <Slider />
            <BrowseByType/>
            <BrowseByManufacturers/>
            <Footer />
        </div>
    );
};

export default Fleet;