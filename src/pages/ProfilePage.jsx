import { useEffect, useState } from "react";
import AuthAPI from "../services/AuthApi";
import styles from "../styles/Profile.module.css";

function ProfilePage() {

    const [user, setUser] = useState(null);
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
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userID");
        window.location.href = "/auth";
    }

    const handleDeleteAccount = () => {
        localStorage.removeItem("userID");
        AuthAPI.deleteAccount(user.id);
        window.location.href = "/auth";
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>User not found.</p>;

    return (
        <div className={styles.profileContainer}>
            <h2 >Profile Page</h2>
            <div className={styles.profileSection}>
                <img className={styles.profilePicture}
                    src={user.profilePicture || "https://via.placeholder.com/100"}
                    alt={user.name}
                />
                <div className={styles.profileDetails}>
                    <p className={styles.profileInfo}><strong>Name:</strong> {user.name}</p>
                    <p className={styles.profileInfo}><strong>Username:</strong> {user.userName}</p>
                    <p className={styles.profileInfo}><strong>Email:</strong> {user.email}</p>
                    <p className={styles.profileInfo}><strong>Role:</strong> {user.role}</p>
                </div>
            </div>
            {/* Display Progress */}
            {user.progress.length > 0 && (
                <div className={styles.progressSection}>
                    <h3 className={styles.progressTitle}>Progress</h3>
                    {user.progress.map((p) => (
                        <div key={p._id} className={styles.progressCard}>
                            <p><strong>Roadmap:</strong> {p.roadmap.title}</p>
                            <p><strong>Current Step:</strong> {p.currentStep}</p>
                            <p><strong>Started At:</strong> {new Date(p.startedAt).toLocaleDateString()}</p>
                            <p><strong>Last Active:</strong> {new Date(p.lastActive).toLocaleDateString()}</p>
                            <p><strong>Completed Steps:</strong> {p.completedSteps.length}</p>
                            <p><strong>Completed Topics:</strong> {p.completedTopics.length}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.logoutSection}>
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                <button className={styles.deleteButton} onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </div>
    );
};

export default ProfilePage;