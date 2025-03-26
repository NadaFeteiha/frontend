import RoadmapApi from "../services/RoadmapAPI";
import { useState } from "react";

//TODO: Need another page for discofer roadmaps and resources

export default function RoadmapPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //handel status
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h2>Roadmaps Search</h2>
        </>
    );
};

