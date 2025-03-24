import styles from '../styles/Home.module.css';

function RoadmapItem({ title, description, status }) {
    return (
        <div className={styles.roadmapItemContainer}>
            <h3>{title}</h3>
            <p> {description}</p>
            <p>Status: {status}</p>
        </div>
    );
}

export default RoadmapItem;