import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getSoilData } from '../services/api';

const Dashboard = () => {
  const [soilData, setSoilData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        localStorage.setItem('email',"vaibhavrank@gmail.com")
        const response = await getSoilData();
        setSoilData(response.data);
      } catch (error) {
        console.error('Error fetching soil data:', error);
      }
    };

    fetchSoilData();
  }, []);

    if (!user) {
      return <div>Loading...</div>;  // Or redirect, or show a fallback
    }
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Soil Data</h2>
          {soilData.length > 0 ? (
            <ul className="space-y-2">
              {soilData.map((data) => (
                <li key={data._id} className="border-b pb-2">
                  <p>pH: {data.pH}</p>
                  <p>Nitrogen: {data.nitrogen}</p>
                  <p>Phosphorus: {data.phosphorus}</p>
                  <Link to={`/analyze/${data._id}`} className="text-indigo-600 hover:text-indigo-800">
                    Analyze
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No soil data available. Add some data to get started!</p>
          )}
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <Link
              to="/soil-data"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Soil Data
            </Link>
            <Link
              to="/profile"
              className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;