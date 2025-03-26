import { useParams } from "react-router-dom"
import RoadmapApi from "../services/RoadmapAPI";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/RoadmapDetailsPage.module.css";
import Steps from "../components/Steps";

//TODO: check if user alread started this roadmap
//TODO: if yes display the last step completed
//TODO: if no show start now button
//TODO: let user mark step if done or not

export default function RoadmapDetailsPage() {
    const params = useParams();
    const roadmapId = params.roadmapId;
    const [roadmap, setRoadmap] = useState(null);
    const [steps, setSteps] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inThisAlready, setInThisAlready] = useState(false);

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

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("user"));
        setIsLoggedIn(userId ? true : false);


    }, []);

    const handleStart = () => {
        if (!isLoggedIn) {
            window.location.href = "/auth";
        }

        // TODO: if already in show prgress


        // TODO: call api to start this roadmap


    };

    //handel status
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!roadmap) return <p>No roadmap found.</p>;

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div>
                    <h2>{roadmap.title}</h2>
                    <p >{roadmap.description}</p>
                </div>
                <button onClick={handleStart}>Start this roadmap</button>
            </div>

            <div className={styles.roadmapInfo}>
                <p><strong>Total Steps:</strong> {roadmap.totalSteps}</p>
                <p><strong>Total Topics:</strong> {roadmap.totalTopics}</p>
                <p><strong>Last Updated:</strong> {new Date(roadmap.lastUpdated).toLocaleDateString()}</p>
            </div>

            <Steps steps={steps} />
        </div>
    );
};