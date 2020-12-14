import axios from 'axios';

const config = axios.create({
    baseURL: 'https://www.testapptgst.tk',
    withCredentials: true,
    timeout: 8000
})

export default config;