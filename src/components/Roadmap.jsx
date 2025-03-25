import styles from '../styles/Home.module.css';
import RoadmapItem from './RoadmapItem';

function Roadmap({ roadmaps, allRoadmapClick, roadmapClick }) {

    return (
        <div className={styles.roadmapContainer}>
            <h1>Roadmap</h1>
            <button
                className={styles.chatButton}
                onClick={allRoadmapClick}>
                view all
            </button>

            <div className={styles.roadmapItemsContainer} >
                {
                    roadmaps.map((roadmap) => (
                        <RoadmapItem
                            key={roadmap.id}
                            roadmap={roadmap}
                            roadmapClick={() => roadmapClick(roadmap.id)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Roadmap;