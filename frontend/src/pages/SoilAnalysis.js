import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analyzeSoilData } from '../services/api';

const SoilAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await analyzeSoilData(id);
        setAnalysis(response.data.analysis);
        setRecommendations(response.data.recommendations);
      } catch (err) {
        setError('Failed to fetch soil analysis. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading analysis...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Soil Analysis Results</h1>
      {analysis && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Soil Characteristics</h2>
          <ul className="space-y-2">
            <li><strong>pH Level:</strong> {analysis.pHLevel}</li>
            <li><strong>Nitrogen Level:</strong> {analysis.nitrogenLevel}</li>
            <li><strong>Phosphorus Level:</strong> {analysis.phosphorusLevel}</li>
            <li><strong>Potassium Level:</strong> {analysis.potassiumLevel}</li>
            <li><strong>Organic Matter Content:</strong> {analysis.organicMatterContent}</li>
            <li><strong>Soil Texture:</strong> {analysis.soilTexture}</li>
          </ul>
        </div>
      )}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Fertilizer Recommendations</h2>
        <p className="whitespace-pre-line">{recommendations}</p>
      </div>
    </div>
  );
};

export default SoilAnalysis;