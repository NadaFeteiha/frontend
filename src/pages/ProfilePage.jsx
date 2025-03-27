import { useEffect, useState } from "react";
import AuthAPI from "../services/AuthApi";
import ProfileCard from "../components/ProfileCard";
import EditProfile from "../components/EditProfile";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userID");
        setError(null);

        // if not logged in, redirect to login page
        if (!userId) {
            window.location.href = "/auth";
        }

        // if logged in, get user profile
        setLoading(true);
        AuthAPI.myProfile(userId)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    }

    const updateUserInfo = (updatedUser) => {
        // reset 
        setError(null);
        setLoading(true);

        AuthAPI.updateProfile(user.id, updatedUser)
            .then((res) => {
                // just reset the user  details not roadmaps
                console.log("updated user");
                console.log(res.data);
                const newUser = {
                    ...user,
                    name: res.data.name,
                    email: res.data.email,
                    userName: res.data.userName,
                    role: res.data.role,
                    profilePicture: res.data.profilePicture,
                }

                setUser(newUser);
                setIsEditing(false);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            }).finally(() => {
                setLoading(false);
            });
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>User not found.</p>;

    return (
        !isEditing ?
            <ProfileCard user={user} handleEditProfile={handleEditProfile} />
            :
            <EditProfile user={user} updateUserInfo={updateUserInfo} cancel={() => setIsEditing(false)} />
    );
};

export default ProfilePage;