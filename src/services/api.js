import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = process.env.REACT_APP_WEATHER_API_URL;

const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000;
const MAX_CACHE_SIZE = 20;
let controller = new AbortController();

export const getWeather = async (city) => {
  if (!city || city.trim() === '') {
    throw new Error('City name is required');
  }

  const key = city.trim().toLowerCase();
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { success: true, data: cached.data, fromCache: true };
  }

  controller.abort();
  controller = new AbortController();

  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}&q=${key}&aqi=yes`, {
      signal: controller.signal,
    });

    if (cache.size >= MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, { data: response.data, timestamp: Date.now() });
    return { success: true, data: response.data, fromCache: false };
  } catch (error) {
    if (axios.isCancel(error)) return { success: false, error: null };
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to fetch weather data';
    return { success: false, error: errorMessage };
  }
};
