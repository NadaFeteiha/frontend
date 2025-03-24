import styles from '../styles/Home.module.css';
import RoadmapItem from './RoadmapItem';

function Roadmap({ roadmaps }) {

    return (
        <div className={styles.roadmapContainer}>
            <h1>Roadmap</h1>
            <div className={styles.roadmapItemsContainer}>
                {
                    roadmaps.map((roadmap, index) => (
                        <RoadmapItem
                            key={index}
                            title={roadmap.title}
                            description={roadmap.description}
                            status={roadmap.status}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Roadmap;