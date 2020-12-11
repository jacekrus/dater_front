import axios from 'axios';

const config = axios.create({
    baseURL: 'https://dater-back.herokuapp.com',
    withCredentials: true,
    timeout: 8000
})

export default config;