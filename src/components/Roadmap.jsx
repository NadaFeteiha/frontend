import styles from '../styles/Home.module.css';
import RoadmapItem from './RoadmapItem';

function Roadmap({ roadmaps, allRoadmapClick, roadmapClick }) {
    return (
        <div className={styles.mainContainer}>

            <div className={styles.header}>
                <h2 className={styles.stepsTitle}>Roadmaps</h2>
            </div>

            <div className={styles.roadmapListContainer}>
                {roadmaps.map((roadmap) => (
                    <RoadmapItem
                        key={roadmap.id}
                        roadmap={roadmap}
                        roadmapClick={() => roadmapClick(roadmap.id)}
                    />
                ))}
                <MoreRoadmapItem roadmapClick={allRoadmapClick} />
            </div>

        </div>
    );
}

function MoreRoadmapItem({ roadmapClick }) {
    return (
        <div className={styles.moreRoadmap} onClick={roadmapClick}>
            <h3 className={styles.more}>more</h3>
        </div>
    );
}

export default Roadmap;