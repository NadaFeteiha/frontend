import styles from "../styles/RoadmapDetailsPage.module.css";


export default function Steps({ steps }) {

    return (
        <div className={styles.mainStepContainer}>
            <div className={styles.stepsContainer}>
                <h2 className={styles.stepsTitle}>Steps</h2>
                <ol className={styles.stepsList}>
                    {steps.map(step => (
                        <li key={step.id} className={styles.stepItem}>
                            <div className={styles.stepHeader}>
                                <span className={styles.stepNumber}>Step {step.order}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                            </div>
                            <div className={styles.topicInfo}>
                                <span className={styles.topicLabel}>Topic:</span>
                                <span className={styles.topicTitle}>{step.topic.title}</span>
                                <p className={styles.topicDescription}>{step.topic.description}</p>
                                <span className={styles.topicType}>{step.topic.type}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
};

