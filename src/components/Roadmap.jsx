import styles from '../styles/Home.module.css';
import RoadmapItem from './RoadmapItem';

function Roadmap({ roadmaps, allRoadmapClick, roadmapClick }) {

    return (
        <div className={styles.roadmapContainer}>
            <h1>Roadmap</h1>
            <button
                className={styles.chatButton}
                onClick={allRoadmapClick}
            />
            <div className={styles.roadmapItemsContainer} >
                {
                    roadmaps.map((roadmap) => (
                        <RoadmapItem
                            key={roadmap.id}
                            title={roadmap.title}
                            description={roadmap.description}
                            status={roadmap.status}
                            roadmapClick={() => roadmapClick(roadmap.id)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Roadmap;