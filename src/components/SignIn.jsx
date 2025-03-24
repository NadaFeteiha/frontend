import React from 'react';
import styles from "../styles/Auth.module.css";
import { useState } from "react";
import AuthApi from "../services/AuthApi";

const SignIn = ({ focusOn, setFocusOn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");// => RESET ERROR
        setLoading(true);
        try {
            const response = await AuthApi.login(email, password)
            // if success, redirect to home page
            console.log(" heere");
            console.log(response);
            if (response.status == true) {
                window.location.href = "/";
            }
        } catch (error) {
            console.log("Error heere");
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signContainer}>
            <h1>Welcome back!</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Type your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        {
                        ...(focusOn === "signin" && { autoFocus: true })
                        }
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <a href="/forgot-password" className={styles.forgotPassword}>
                        Forgot Password?
                    </a>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.btnContainer}>
                    <button type="submit" className={styles.signInButton} disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </div>
            </form >

            <p className={styles.optionText}>
                Don’t have an account? <a href="" onClick={setFocusOn("signup")}>Sign Up</a>
            </p>
        </div >
    );
};

export default SignIn;