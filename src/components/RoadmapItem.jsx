import styles from '../styles/Home.module.css';

export default function RoadmapItem({ roadmap, roadmapClick }) {
    return (
        <div className={styles.roadmapItem} onClick={roadmapClick}>
            <h3 className={styles.roadmapTitle}>{roadmap.title}</h3>
            <div className={styles.topicInfo}>
                <p className={styles.roadmapDescription}>{roadmap.description}</p>
            </div>
        </div>
    );
}