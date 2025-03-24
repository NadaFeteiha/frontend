import React from 'react';
import styles from "../styles/Auth.module.css";

const SignUp = () => {
    return (
        <div className={styles.signContainer}>
            <h1>Create your account</h1>

            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Full name</label>
                    <input type="text" placeholder="Enter your name" />
                </div>

                <div className={styles.inputGroup}>
                    <label>E-mail or phone number</label>
                    <input type="text" placeholder="Type your e-mail" />
                </div>

                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input type="password" placeholder="Type your password" />
                </div>

                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input type="password" placeholder="Type your password" />
                </div>

                <button type="submit" className={styles.signInButton}>Sign Up</button>
            </form>

            <p className={styles.signUpText}>
                Already have an account? <a href="/signin">Sign In</a>
            </p>
        </div>
    );
};

export default SignUp;