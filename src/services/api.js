import axios from 'axios';

const api = axios.create({
    baseURL: 'https://weather-ydn-yql.media.yahoo.com/forecastrss',
})

export default api;