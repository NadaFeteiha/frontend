import styles from '../styles/Home.module.css';

export default function QuoteImage({ imgs }) {

    return (
        <div className={styles.quoteImageContainer}>
            <img src={imgs[0]} alt="quote" />
            <img src={imgs[1]} alt="quote" />
        </div>
    );

};