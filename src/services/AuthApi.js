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
};

const myProfile = async (userId) => {
    const response = await axios.get(`/api/user/profile/${userId}`);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    return response.data;
};

const deleteAccount = async (userId) => {
    const response = await axios.delete(`/api/user/${userId}`);
    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    return response.data;
}

const updateProfile = async (userId, updatedUser) => {
    console.log(`Updating user profile for user: ${userId}`);
    console.log(updatedUser);
    const response = await axios.patch(`/api/user/profile/${userId}`,
        {
            name: updatedUser.name,
            profilePicture: updatedUser.profilePicture
        }
    );

    console.log(response.data);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    return response.data;
}

const AuthAPI = {
    login,
    register,
    myProfile,
    deleteAccount,
    updateProfile
};

export default AuthAPI;