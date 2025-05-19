import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/useAuth';
import toast from 'react-hot-toast';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  const menu = [
    { path: "/", name: "Home" },
    { path: "/fleet", name: "Fleet" },
    { path: "/contact", name: "Contact" },
    { path: "/about", name: "About Us" }
  ];

  useEffect(() => {
  const updateUser = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  };
  
  updateUser();
  
  window.addEventListener("userChange", updateUser);
  
  
  return () => {
    window.removeEventListener("userChange", updateUser);
  };
}, [location]);

 const handleSignOut = async () => {
  try {
    localStorage.removeItem("currentUser");
    await logout?.();
    setCurrentUser(null);
    
    window.dispatchEvent(new Event("userChange"));
    
    toast.success('Successfully logged out!');
  } catch (error) {
    toast.error(error.message || 'An error occurred');
  }
};

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark'); 
  };

  return (
    <header className={`bg-gray-800 text-white fixed top-0 left-0 right-0 z-50`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <Link to="/">
            <h1 className="text-2xl font-bold text-red-500">EasyRent</h1> 
          </Link>
        </div>
        <nav className="flex-1 px-20">
          <ul className="flex justify-center text-center space-x-8">
            {menu.map((value, index) => {
              const isActive = location.pathname === value.path;
              return (
                <li key={index}>
                  <Link 
                    to={value.path} 
                    className={`${isActive ? "text-red-400" : "text-gray-200"} ${isDarkMode ? 'text-white' : ''}`}
                  >
                    {value.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
                <div className="flex items-center space-x-4">
          <button className="p-2" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
          </button>

          {currentUser ? (
            <>
              <span className="font-semibold text-red-300">
                Hello! {currentUser.fullName || currentUser.full_name || currentUser.email}
              </span>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;