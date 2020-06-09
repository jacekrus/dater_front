import axios from 'axios';

const config = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    timeout: 5000
})
config.interceptors.response.use((response) => {
    if(response.status === 401) {
        console.log('unauthorized from interceptor');
    }
    console.log("Repsonse from interceptor    ");
    return response;
}, (error) => {
    if(error.response.status === 401) {
        console.log('unauthorized from interceptor');
    }
    return Promise.reject(error.message);
})

export default config;