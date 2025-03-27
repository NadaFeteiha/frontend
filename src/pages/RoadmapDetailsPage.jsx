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
    const [inThisAlready, setInThisAlready] = useState(true);
    const [userId, setUserId] = useState(null);

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

        const userId = localStorage.getItem("userID");
        setUserId(userId);
        if (!userId) {
            setInThisAlready(false);
        }

        // show the button if not in this roadmap
        RoadmapApi.isUserInRoadmap(roadmapId, userId).then(data => {
            console.log("=========== is in roadmap ===========");
            console.log(data);
            setInThisAlready(data);
        }).catch(error => {
            console.error(error);
        });
    }, [roadmapId]);

    const handleStart = () => {
        if (!userId) {
            window.location.href = "/auth";
        }

        RoadmapApi.setRoadmapToUser(roadmapId, userId)
            .then(data => {
                if (data?.success) {
                    setInThisAlready(true);
                }
            }).catch(error => {
                console.error(error);
            });
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
                {!inThisAlready && <button onClick={handleStart}>Start this roadmap</button>}
                {/* TODO progress bar for the user show his progress in case he already in the roadmap. */}
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