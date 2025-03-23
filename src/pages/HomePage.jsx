import { useEffect } from 'react';
import RoadmapApi from '../services/RoadmapAPI.js';

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
            <h2>Home Page</h2>
        </main>
    );
}

export default HomePage;