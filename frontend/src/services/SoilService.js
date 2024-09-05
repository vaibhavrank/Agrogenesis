import api from './api';

export const submitSoilData = async (soilData) => {
  const response = await api.post('/soil-data', soilData);
  return response.data;
};

export const getSoilData = async () => {
  const response = await api.get('/soil-data');
  return response.data;
};

export const analyzeSoilData = async (id) => {
  const response = await api.get(`/analyze/${id}`);
  return response.data;
};