import axios from 'axios';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQ0MjMyNzY3ZWNlMWVlOWQ3ZTNkOSIsInVzZXJuYW1lIjoidXNlciIsImVtYWlsIjoiYUBhYS5jb20iLCJpYXQiOjE1ODAwMzAyMDF9.v6EJlsc3Mr1D5jfEulJyBqcl4WSZgmWnj7QUVnuWvYk';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error.response);
});

api.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers.authorization = 'Bearer '+localStorage.getItem('token');
    }
    return config;
});

export default api;