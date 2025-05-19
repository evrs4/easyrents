import Swal from "sweetalert2";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ContactPages = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Sent!",
      text: "Thank you for your feedback!",
    });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white text-center mb-4">
            Get In Touch with Us
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
            Have suggestions, questions, or feedback? We`d love to hear from you! 😊
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Contact Information
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Address:</strong> 918 Yukon Boulevard, Kingston, New York 12401</li>
                <li><strong>Phone:</strong> (+1) 911-458-720</li>
                <li><strong>Email:</strong> cs@buynlarge.co.us</li>
                <li><strong>Operational Hours:</strong> 08:00 - 17:00</li>
              </ul>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Contact Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-40 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPages;
