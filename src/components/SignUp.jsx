import React from 'react';
import { useState } from "react";
import styles from "../styles/Auth.module.css";
import AuthApi from "../services/AuthApi";

//TODO: cheeck if usename is already taken

const SignUp = ({ focusOn, setFocusOn }) => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");// => RESET ERROR
        setLoading(true);

        try {
            const response = await AuthApi.register(userName, name, email, password);
            // if success, redirect to home page
            console.log(response);
            if (response.status == true) {
                window.location.href = "/";
            }
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.signContainer}>
            <h1>Create your account</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Full name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        {...(focusOn === "signup" && { autoFocus: true })}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Type your e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                </div>

                <div className={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Type your password again to confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {password !== confirmPassword && <p className={styles.error}>Passwords do not match</p>}

                <div className={styles.btnContainer}>
                    <button type="submit" className={styles.signInButton} disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </div>
            </form>

            <p className={styles.optionText}>
                Already have an account? <a href="" onClick={() => setFocusOn("signin")}>Sign In</a>
            </p>
        </div>
    );
};

export default SignUp;