
const RoadmapBaseURL = 'http://localhost:4000/api/';

const getAllRoadmap = async () => {
    const response = await fetch(`${RoadmapBaseURL}roadmap`);
    if (!response.ok) {
        throw new Error('Failed to get roadmaps');
    }

    const result = await response.json();
    return result.data;
};


const getRoadmap = async (roadmapId) => {
    const response = await fetch(`${RoadmapBaseURL}roadmap/${roadmapId}`);
    if (!response.ok) {
        throw new Error('Failed to get roadmap');
    }

    const result = await response.json();
    return result.data;
};

const RoadmapApi = {
    getAllRoadmap,
    getRoadmap
};

export default RoadmapApi;