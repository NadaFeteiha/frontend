
import axios from 'axios';

const BaseURL = 'http://localhost:4000/api/auth';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.BaseURL = BaseURL;
// add interceptors

axios.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);



//TODO: forgot password, reset password, register

const login = async (email, password) => {
    const response = await axios.post(`${BaseURL}/login`, {
        email: email,
        password: password
    });
    return response.data;
};



const AuthAPI = {
    login,

};

export default AuthAPI;