
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const getAllRoadmap = async () => {
    const response = await axios.get(`/api/roadmap`);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    return response.data.data;
};


const getRoadmap = async (roadmapId) => {
    const response = await axios.get(`/api/roadmap/${roadmapId}`);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }

    return response.data.data;
};


const mostPopularTopics = async () => {
    const response = await axios.get(`/api/topic/popular`);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    return response.data.data;
}

const setRoadmapToUser = async (roadmapId, userId) => {
    const response = await axios.post(`/api/user/${userId}/roadmap/${roadmapId}`);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    console.log("set roadmap to user");
    console.log(response);
    return response.data.data;
}

const isUserInRoadmap = async (roadmapId, userId) => {
    const response = await axios.get(`/api/user/${userId}/roadmap/${roadmapId}`);

    if (response.data.status === false) {
        console.log(response.data);
        throw new Error(response.data.message);
    }
    return response.data.data.inRoadmap;
}

const RoadmapApi = {
    getAllRoadmap,
    getRoadmap,
    mostPopularTopics,
    setRoadmapToUser,
    isUserInRoadmap
};

export default RoadmapApi;