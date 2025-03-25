import styles from '../styles/Home.module.css';

function RoadmapItem({ roadmap, roadmapClick }) {

    return (
        <div className={styles.roadmapItemContainer}>
            <h3>{roadmap.title}</h3>
            <p>{roadmap.description}</p>
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