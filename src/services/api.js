import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = process.env.REACT_APP_WEATHER_API_URL;

export const getWeather = async (city) => {
  if (!city || city.trim() === '') {
    throw new Error('City name is required');
  }

  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}&q=${city.trim()}&aqi=yes`);
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to fetch weather data';
    return { success: false, error: errorMessage };
  }
};