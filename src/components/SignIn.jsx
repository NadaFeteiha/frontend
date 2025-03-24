import React from 'react';
import styles from "../styles/Auth.module.css";

const SignIn = () => {
    return (
        <div className={styles.signContainer}>
            <h1>Welcome back!</h1>

            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>E-mail</label>
                    <input type="text" placeholder="Type your e-mail" />
                </div>

                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input type="password" placeholder="Type your password" />
                    <a href="/forgot-password" className={styles.forgotPassword}>
                        Forgot Password?
                    </a>
                </div>

                <button type="submit" className={styles.signInButton}>Sign In</button>
            </form>


            <p className={styles.signUpText}>
                Don’t have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default SignIn;