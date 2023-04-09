import axios from "axios";
const request = axios.create({
    baseURL: 'http://localhost:8090',
    timeout: 5000
})
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = token
    }
    return config
}, error => {
    return Promise.reject(error)
})

export default request;