import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapApi from '../services/RoadmapAPI.js';
import TrendingFields from '../components/TrendingFields.jsx';

function HomePage() {

    useEffect(() => {
        RoadmapApi.getRoadmaps()
            .then(response => {
                console.log(response);
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
        </main>
    );
}

export default HomePage;