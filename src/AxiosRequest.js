import axios from 'axios';

const config = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    timeout: 6000
})

export default config;