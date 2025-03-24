import AuthAPI from "../services/AuthApi";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styles from "../styles/Auth.module.css";
import { useState } from "react";

//TODO: Check if user is logged in or not by token
//TODO: If user is logged in, redirect to Profile Page
//Todo: implement login , forgot password, reset password, register
//TODO: change focus when clicked on signup in  signin component and vice versa

function AuthPage() {

    const [focusOn, setFocusOn] = useState("");

    return (
        <div className={styles.authContainer}>
            <SignIn focusOn={focusOn} setFocusOn={setFocusOn} />
            <div className={styles.dividerContainer}>
                <div className={styles.divider}></div>
            </div>
            <SignUp focusOn={focusOn} setFocusOn={setFocusOn} />
        </div>
    );
};


export default AuthPage;