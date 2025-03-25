import { useEffect } from "react";

function ProfilePage() {

    useEffect(() => {
        const userId = localStorage.getItem("userID");
        console.log("HEEEEEEEEERRRRREEEEE")
        console.log(userId);

    }, []);

    return (
        <div>
            <h2>Profile Page</h2>
        </div>
    );
};

export default ProfilePage;