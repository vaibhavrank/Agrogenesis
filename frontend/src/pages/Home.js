import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to SoilAnalyzer</h1>
      <p className="text-xl mb-6">
        Get personalized fertilizer recommendations based on your soil analysis.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Login
        </Link>
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;