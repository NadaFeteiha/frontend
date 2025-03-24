import AuthAPI from "../services/AuthApi";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styles from "../styles/Auth.module.css";

//TODO: Check if user is logged in or not by token
//TODO: If user is logged in, redirect to Profile Page
//Todo: implement login , forgot password, reset password, register

function AuthPage() {



    return (
        <div className={styles.authContainer}>
            <SignIn />
            <div className={styles.divider}></div>
            <SignUp />
        </div>
    );
};


export default AuthPage;