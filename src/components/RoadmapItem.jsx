import styles from '../styles/Home.module.css';

function RoadmapItem({ title, description, status, roadmapClick }) {

    return (
        <div className={styles.roadmapItemContainer}>
            <h3>{title}</h3>
            <p> {description}</p>
            <p>Status: {status}</p>
            <button
                className={styles.chatButton}
                onClick={roadmapClick}
            >
                View
            </button>
        </div>
    );
}

export default RoadmapItem;