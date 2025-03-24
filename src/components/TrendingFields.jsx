import styles from '../styles/Home.module.css';

function TrendingFields() {


    return (
        <div className={styles.container}>
            <p className={styles.subtitle}>the most common fields and languages to learn this year...</p>
            <button className={styles.chatButton}>Chat with AI</button>
            <h2 className={styles.heading}>Trend fields</h2>
            <div className={styles.circlesContainer}>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className={styles.circle}></div>
                ))}
            </div>
        </div>
    );
}


export default TrendingFields;


