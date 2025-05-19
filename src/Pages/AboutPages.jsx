import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AboutPages = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-gray-900 py-16 px-4 mt-16 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Intro Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
              Who Are We?
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              EasyRent is a multi-platform website that provides a Car Rental Service Agency. 
              We are a team of passionate individuals who are dedicated to making your car rental experience hassle-free and enjoyable. 
              We believe that everyone should have access to a reliable and convenient way to rent a car, and we are here to help you find the perfect vehicle for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                Our Vision
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                EasyRent is not an ordinary Rental Agency, We seek through our experience to make the clients were satisfied. 
                We are here to make your car rental experience enjoyable and hassle-free.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We aim to provide a seamless car rental experience with an intuitive
                interface, fast, and reliable service. We welcome you to
                join our community of people who appreciate meaningful simplicity.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Myko Adityo
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Founder</p>
              </div>

              {/* Additional team members can go here */}
              {/* Example:
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-center">
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Jane Doe
                </h3>
                <p className="text-gray-600 dark:text-gray-300">Marketing Lead</p>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPages;
