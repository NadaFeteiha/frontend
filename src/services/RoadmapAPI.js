
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

const RoadmapApi = {
    getAllRoadmap,
    getRoadmap,
    mostPopularTopics
};

export default RoadmapApi;