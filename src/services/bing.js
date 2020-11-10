import axios from 'axios';

const bing = axios.create({
    baseURL: 'http://localhost:8000/image',
})

export default bing;