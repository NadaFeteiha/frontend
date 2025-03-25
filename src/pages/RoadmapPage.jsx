import { useParams } from "react-router-dom"
import RoadmapApi from "../services/RoadmapAPI";
import { useEffect } from "react";
import { useState } from "react";

function RoadmapPage() {
    const params = useParams();
    const roadmapId = params.roadmapId;
    const [roadmap, setRoadmap] = useState(null);
    const [steps, setSteps] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        RoadmapApi.getRoadmap(roadmapId)
            .then(data => {
                if (data?.roadmap) {
                    setRoadmap(data.roadmap);
                    setSteps(data.steps || []);
                }
            })
            .catch(error => {
                setError(error);
            }).then(() => {
                setLoading(false);
            });
    }, [roadmapId]);

    //handel status
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!roadmap) return <p>No roadmap found.</p>;


    return (
        <div>
            <h1>{roadmap.title}</h1>
            <p>{roadmap.description}</p>
            <button>
                Start this roadmap
            </button>
            <p><strong>Total Steps:</strong> {roadmap.totalSteps}</p>
            <p><strong>Total Topics:</strong> {roadmap.totalTopics}</p>
            <p><strong>Last Updated:</strong> {new Date(roadmap.lastUpdated).toLocaleDateString()}</p>

            {/* Steps Section */}
            <h2>Steps</h2>
            <ol>
                {steps.map(step => (
                    <li key={step.id}>
                        <strong>Step {step.order}:</strong> {step.title}
                        <br />
                        <em>Topic: {step.topic.title}</em> - {step.topic.description} ({step.topic.type})
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default RoadmapPage;