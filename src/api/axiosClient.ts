import axios from 'axios';
import Cookies from 'universal-cookie';
import {useNavigate} from "react-router-dom";

const cookies = new Cookies();

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});
axiosClient.interceptors.request.use(
    (config) => {
        const token = cookies.get('token');
        if (token) {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
    }
);
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            cookies.remove('token');
            window.location.href = '/login';
        }
        console.log('error');
        console.log(error.response.data);
        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error);
    }
);

//user-token
export default axiosClient;
