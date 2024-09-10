import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import submitSoilData from '../services/submitsoilData';
import Navbar from './Navbar';
import { CloudCog } from 'lucide-react';

const SoilDataForm = () => {
  const [formData, setFormData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    texture: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await submitSoilData(formData);
      const data = response.json();
      if (!data.ok) {
        alert('Something went wrong');
        setError('Something Went Wrong');
      }

      console.log('Data Saved');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting soil data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-50 flex flex-col justify-center">
      <Navbar />
      <div className="m-auto min-w-[500px] max-w-[500px] p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Submit Soil Data</h2>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pH" className="block mb-1 text-sm font-medium text-gray-700">pH Level</label>
            <input
              type="number"
              id="pH"
              name="pH"
              value={formData.pH}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
              step="0.1"
              min="0"
              max="14"
            />
          </div>
          <div>
            <label htmlFor="nitrogen" className="block mb-1 text-sm font-medium text-gray-700">Nitrogen (mg/kg)</label>
            <input
              type="number"
              id="nitrogen"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="phosphorus" className="block mb-1 text-sm font-medium text-gray-700">Phosphorus (mg/kg)</label>
            <input
              type="number"
              id="phosphorus"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="potassium" className="block mb-1 text-sm font-medium text-gray-700">Potassium (mg/kg)</label>
            <input
              type="number"
              id="potassium"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
              min="0"
            />
          </div>
          <div>
            <label htmlFor="organicMatter" className="block mb-1 text-sm font-medium text-gray-700">Organic Matter (%)</label>
            <input
              type="number"
              id="organicMatter"
              name="organicMatter"
              value={formData.organicMatter}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
              step="0.1"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label htmlFor="texture" className="block mb-1 text-sm font-medium text-gray-700">Soil Texture</label>
            <select
              id="texture"
              name="texture"
              value={formData.texture}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400"
            >
              <option value="">Select texture</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
              <option value="silt">Silt</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            Submit Soil Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default SoilDataForm;
