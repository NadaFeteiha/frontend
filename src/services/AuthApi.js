import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

//TODO: forgot password, reset password

const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', {
        email: email, password: password
    });

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }

    console.log(response.data);
    return response.data;
};

const register = async (userName, Name, email, password) => {
    const response = await axios.post('/api/auth/register',
        { email: email, userName: userName, name: Name, password: password });

    if (response.data.status == false) {
        console.log(response.data);
        throw new Error(response.message);
    }

    console.log(response.data);
    return response.data;
}

const AuthAPI = {
    login,
    register
};

export default AuthAPI;