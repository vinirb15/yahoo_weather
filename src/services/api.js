import axios from 'axios';

const bing = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR',
})

export default bing;