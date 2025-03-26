import styles from "../styles/Profile.module.css";
import { useState } from "react";

export default function EditProfile({ user, updateUserInfo, cancel }) {
    const [name, setName] = useState(user?.name || "");
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = { name, profilePicture };
        updateUserInfo(updatedUser);
    };

    return (
        <div className={styles.editContainer}>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.profileImgSection}>
                    <img
                        src={profilePicture || "https://via.placeholder.com/100"}
                        alt="Profile Preview"
                        className={styles.profilePreview}
                    />
                    <input
                        type="text"
                        placeholder="Enter Image URL"
                        value={profilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={cancel} className={styles.saveButton}>Cancel</button>

                    <button type="submit" className={styles.saveButton}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};