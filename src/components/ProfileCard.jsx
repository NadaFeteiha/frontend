import styles from "../styles/Profile.module.css";
import AuthAPI from "../services/AuthApi";

export default function ProfileCard({ user, handleEditProfile }) {

    const handleLogout = () => {
        localStorage.removeItem("userID");
        window.location.href = "/auth";
    }

    const handleDeleteAccount = () => {
        localStorage.removeItem("userID");
        AuthAPI.deleteAccount(user.id);
        window.location.href = "/auth";
    }

    const calculateCompletion = (roadmap) => {
        if (roadmap.totalSteps === 0) {
            return 0;
        } else {
            return Math.round((roadmap.completedCount / roadmap.totalSteps) * 100);
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.profileContainer}>
                <h2 className={styles.stepsTitle}>Profile</h2>

                <div className={styles.profileSection}>
                    <div className={styles.avatarContainer}>
                        <img
                            className={styles.profilePicture}
                            src={user.profilePicture || "https://via.placeholder.com/150"}
                            alt={user.name}
                        />
                    </div>
                    <div className={styles.profileDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Name:</span>
                            <span className={styles.detailValue}>{user.name}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Username:</span>
                            <span className={styles.detailValue}>@{user.userName}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Email:</span>
                            <span className={styles.detailValue}>{user.email}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Role:</span>
                            <span className={styles.role}>{user.role}</span>
                        </div>
                    </div>
                </div>

                {user.roadmaps && user.roadmaps.length > 0 && (
                    <div className={styles.progressContainer}>
                        <h2 className={styles.stepsTitle}>My Roadmaps</h2>
                        <ol className={styles.stepsList}>
                            {user.roadmaps.map((roadmap) => (
                                <li key={roadmap.id} className={styles.stepItem}>
                                    <div className={styles.stepHeader}>
                                        <span className={styles.stepNumber}>Roadmap</span>
                                        <h3 className={styles.stepTitle}>{roadmap.title}</h3>
                                    </div>
                                    <div className={styles.topicInfo}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.topicLabel}>Description:</span>
                                            <span className={styles.topicTitle}>{roadmap.description}</span>
                                        </div>
                                        {roadmap.currentStep && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.topicLabel}>Current Step:</span>
                                                <span className={styles.topicTitle}>
                                                    {roadmap.currentStep.order}. {roadmap.currentStep.title}
                                                </span>
                                            </div>
                                        )}
                                        <div className={styles.infoRow}>
                                            <span className={styles.topicLabel}>Progress:</span>
                                            <span className={styles.topicDescription}>
                                                {calculateCompletion(roadmap)}% ({roadmap.completedCount}/{roadmap.totalSteps} steps)
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.topicLabel}>Started:</span>
                                            <span className={styles.topicType}>
                                                {new Date(roadmap.startedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.topicLabel}>Last Active:</span>
                                            <span className={styles.topicType}>
                                                {new Date(roadmap.lastActive).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                <div className={styles.actionButtons}>
                    <button className={styles.editButton} onClick={handleEditProfile}>
                        Edit Profile
                    </button>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                    <button className={styles.deleteButton} onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}