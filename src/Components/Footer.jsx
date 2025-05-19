import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-14">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-700 pb-12">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe our newsletter</h3>
            <p className="text-gray-400">Want to know about our offers first?</p>
          </div>
          <div className="w-full md:w-96">
            <div className="flex">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="flex-1 bg-gray-800 px-4 py-3 rounded-l outline-none"
              />
              <button className="bg-[#E1B956] text-gray-900 px-6 py-3 rounded-r font-semibold hover:bg-[#d1a846] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <Phone className="text-[#E1B956] w-6 h-6" />
            <div>
              <p className="text-sm text-gray-400">Phone Number</p>
              <p>0(550)680-34-12</p>
              <p>8(580)930-342-127</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-[#E1B956] w-6 h-6" />
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p>1394 EasyRent Corp.</p>
              <p>Minnesota, United States</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-[#E1B956] w-6 h-6" />
            <div>
              <p className="text-sm text-gray-400">Email Address</p>
              <p>infoLimoRent@gmail.id</p>
              <p>support@LR.id</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Clock className="text-[#E1B956] w-6 h-6" />
            <div>
              <p className="text-sm text-gray-400">Working Hours</p>
              <p>Mon-Fri : 9 am - 11 pm</p>
              <p>Sat-Su : 11 am - 9 pm</p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          <div>
            <Link to="/" className="text-2xl font-bold text-red-500">EasyRent.</Link>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4">Menu</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#E1B956] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#E1B956] transition-colors">About Us</Link></li>
              <li><Link to="/fleet" className="hover:text-[#E1B956] transition-colors">Our Fleets</Link></li>
              <li><Link to="/contact" className="hover:text-[#E1B956] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/style-guide" className="hover:text-[#E1B956] transition-colors">Style Guide</Link></li>
              <li><Link to="/privacy" className="hover:text-[#E1B956] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/updates" className="hover:text-[#E1B956] transition-colors">Update Log</Link></li>
              <li><Link to="/feedback" className="hover:text-[#E1B956] transition-colors">Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-4">Contact</h5>
            <ul className="space-y-2">
              <li>123 Main Street, City</li>
              <li>contact@easyrent.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p>Copyright © {new Date().getFullYear()} EasyRent. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;