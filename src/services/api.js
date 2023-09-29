import axios from 'axios';

const API_KEY = "e1f24420901a4254ac3165613231509";
const API_URL = "https://api.weatherapi.com/v1/current.json";

export const getWeather = async (city, country) => {
    try {
        let response = await axios.get(`${API_URL}?key=${API_KEY}&q=${city}&aqi=yes`);
        return response.data;
    } catch (error) {
        console.log('Error while calling the api ', error.message);
        return error.response;
    }
}
//https://api.weatherapi.com/v1/current.json?key=e1f24420901a4254ac3165613231509&q=rourkela&aqi=yes