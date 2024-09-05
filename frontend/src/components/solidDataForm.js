import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSoilData } from '../services/api';

const SoilDataForm = () => {
  const [formData, setFormData] = useState({
    pH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    texture: '',
    location: { coordinates: ['', ''] }
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'latitude' || name === 'longitude') {
      setFormData(prevState => ({
        ...prevState,
        location: {
          ...prevState.location,
          coordinates: name === 'latitude' 
            ? [value, prevState.location.coordinates[1]]
            : [prevState.location.coordinates[0], value]
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitSoilData(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while submitting soil data');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Submit Soil Data</h2>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pH" className="block mb-1">pH Level</label>
          <input
            type="number"
            id="pH"
            name="pH"
            value={formData.pH}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            step="0.1"
            min="0"
            max="14"
          />
        </div>
        <div>
          <label htmlFor="nitrogen" className="block mb-1">Nitrogen (mg/kg)</label>
          <input
            type="number"
            id="nitrogen"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="phosphorus" className="block mb-1">Phosphorus (mg/kg)</label>
          <input
            type="number"
            id="phosphorus"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="potassium" className="block mb-1">Potassium (mg/kg)</label>
          <input
            type="number"
            id="potassium"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="organicMatter" className="block mb-1">Organic Matter (%)</label>
          <input
            type="number"
            id="organicMatter"
            name="organicMatter"
            value={formData.organicMatter}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            step="0.1"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label htmlFor="texture" className="block mb-1">Soil Texture</label>
          <select
            id="texture"
            name="texture"
            value={formData.texture}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select texture</option>
            <option value="sandy">Sandy</option>
            <option value="loamy">Loamy</option>
            <option value="clay">Clay</option>
            <option value="silt">Silt</option>
          </select>
        </div>
        <div>
          <label htmlFor="latitude" className="block mb-1">Latitude</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.location.coordinates[0]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            step="any"
            min="-90"
            max="90"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block mb-1">Longitude</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.location.coordinates[1]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            step="any"
            min="-180"
            max="180"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit Soil Data
        </button>
      </form>
    </div>
  );
};

export default SoilDataForm;