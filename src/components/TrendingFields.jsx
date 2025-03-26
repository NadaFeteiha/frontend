import styles from '../styles/Home.module.css';

function TrendingFields({ chatBotClick, trendTopics }) {
    return (
        <div className={styles.container}>
            <p className={styles.subtitle}>The most common study fields or languages for this year...</p>
            <div className={styles.trendTopicContainer}>
                {
                    trendTopics.map(topic => (
                        <TopicItem key={topic.id} topic={topic} />
                    ))
                }
            </div>
            <br />
            <button
                className={styles.chatButton}
                onClick={chatBotClick}
            >
                Chat with AI
            </button>
        </div>
    );
}


function TopicItem({ topic }) {
    return (
        <div className={styles.trendTopic}>
            <h3>{topic.title}</h3>
        </div>
    );
}

export default TrendingFields;


