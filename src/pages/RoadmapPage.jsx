import { useParams } from "react-router-dom"
import RoadmapApi from "../services/RoadmapAPI";
import { useEffect } from "react";
import { useState } from "react";

//TODO: check if user alread started this roadmap
//TODO: if yes display the last step completed
//TODO: if no show start now button
//TODO: let user mark step if done or not

//TODO: Need another page for discofer roadmaps and resources

export default function RoadmapPage() {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <>
            <h2>Roadmaps Search</h2>
        </>
    );
};

