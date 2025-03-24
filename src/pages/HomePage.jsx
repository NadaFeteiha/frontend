import { useEffect } from 'react';
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


    return (
        <main>
            <TrendingFields />
        </main>
    );
}

export default HomePage;