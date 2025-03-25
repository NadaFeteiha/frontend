import { useParams } from "react-router-dom"
import RoadmapApi from "../services/RoadmapAPI";
import { useEffect } from "react";
import { useState } from "react";

function RoadmapPage() {
    const params = useParams();
    const roadmapId = params.roadmapId;
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        RoadmapApi.getRoadmap(roadmapId)
            .then(response => {
                console.log(response);
                setRoadmap(response);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
            }).then(() => {
                setLoading(false);
            });
    }, [roadmapId]);


    return (
        <div>
            <h1>Roadmap ${roadmapId}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {roadmap && (
                <div>
                    <h2>{roadmap.title}</h2>
                    <p>{roadmap.description}</p>
                    <p>{roadmap.status}</p>
                </div>
            )}

        </div>
    );
};

export default RoadmapPage;