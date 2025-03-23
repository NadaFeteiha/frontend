
const RoadmapBaseURL = 'http://localhost:4000/api/';

const getRoadmaps = async () => {
    const response = await fetch(`${RoadmapBaseURL}roadmap`);
    if (!response.ok) {
        throw new Error('Failed to get roadmaps');
    }

    const result = await response.json();
    return result.data;
};

const addRoadmap = async (roadmap) => {
    const response = await fetch(`${RoadmapBaseURL}roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roadmap)
    });
    if (!response.ok) {
        throw new Error('Failed to add roadmap');
    }

    const result = await response.json();
    return result.data;
};

const RoadmapApi = {
    getRoadmaps,
    addRoadmap
};

export default RoadmapApi;