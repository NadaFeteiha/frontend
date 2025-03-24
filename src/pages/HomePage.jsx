import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapApi from '../services/RoadmapAPI.js';
import TrendingFields from '../components/TrendingFields.jsx';
import Roadmap from '../components/Roadmap.jsx';

function HomePage() {

    const [roadmaps, setRoadmaps] = useState([]);

    useEffect(() => {
        RoadmapApi.getRoadmaps()
            .then(response => {
                console.log(response);
                setRoadmaps(response);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    const navigate = useNavigate();

    const handleChatButtonClick = () => {
        console.log('Chat button clicked');
        navigate('/chatbot');
    };

    return (
        <main>
            <TrendingFields handleChatButtonClick={handleChatButtonClick} />
            <Roadmap roadmaps={roadmaps} />
        </main>
    );
}

export default HomePage;