import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapApi from '../services/RoadmapAPI.js';
import TrendingFields from '../components/TrendingFields.jsx';
import Roadmap from '../components/Roadmap.jsx';

function HomePage() {
    const navigate = useNavigate();
    const [roadmaps, setRoadmaps] = useState([]);

    useEffect(() => {
        RoadmapApi.getAllRoadmap()
            .then(response => {
                console.log(response);
                setRoadmaps(response);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <main>
            <TrendingFields chatBotClick={() => navigate('/chatbot')} />
            <Roadmap
                roadmaps={roadmaps}
                allRoadmapClick={() => navigate('/roadmap')}
                roadmapClick={(roadmapId) => navigate(`/roadmap/${roadmapId}`)}
            />
        </main>
    );
}

export default HomePage;