import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../services/auth';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <header className="bg-green-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SoilAnalyzer</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-green-200">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/profile" className="hover:text-green-200">Profile</Link></li>
              <li><Link to="/submit-soil-data" className="hover:text-green-200">Submit Soil Data</Link></li>
              <li><button onClick={handleLogout} className="hover:text-green-200">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-green-200">Login</Link></li>
              <li><Link to="/register" className="hover:text-green-200">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;