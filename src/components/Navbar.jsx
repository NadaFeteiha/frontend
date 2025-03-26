import { Link } from "react-router-dom"
import styles from "../styles/Home.module.css";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    Logo Here
                </li>

                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/roadmap">Roadmap</Link>
                </li>

                <li className={styles.auth}>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
