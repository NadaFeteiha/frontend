import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapApi from '../services/RoadmapAPI.js';
import TrendingFields from '../components/TrendingFields.jsx';
import Roadmap from '../components/Roadmap.jsx';
import { getQuoteImgs as QuoteImg } from '../services/quotes.js';
import QuoteImage from '../components/ImageQuote.jsx';
import Footer from '../components/Footer.jsx';

function HomePage() {
    const navigate = useNavigate();
    const [roadmaps, setRoadmaps] = useState([]);
    const [trendTopics, setTrendTopics] = useState([]);
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        RoadmapApi.getAllRoadmap()
            .then(response => {
                console.log(response);
                setRoadmaps(response);
            })
            .catch(error => {
                console.log(error);
            });

        //get triend topics 
        RoadmapApi.mostPopularTopics()
            .then(response => {
                console.log("popular topics");
                console.log(response);
                setTrendTopics(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // call the QuoteImg function to get a random quote image
    useEffect(() => {
        QuoteImg().then(response => {
            setImgs(response);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <main>
            <TrendingFields chatBotClick={() => navigate('/chatbot')} trendTopics={trendTopics} />
            <Roadmap
                roadmaps={roadmaps}
                allRoadmapClick={() => navigate('/roadmap')}
                roadmapClick={(roadmapId) => navigate(`/roadmap/${roadmapId}`)}
            />
            <QuoteImage imgs={imgs} />
            <Footer />
        </main>
    );
}

export default HomePage;