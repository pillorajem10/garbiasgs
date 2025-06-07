// react router 
import { Link } from "react-router-dom";

// css
import styles from "./index.module.css"; // Assuming you have a CSS module for styling

const DefaultPage = () => {
    return (
        <div className={styles.defaultPage}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.description}>Sorry, the page you are looking for does not exist or has been moved.</p>
            <Link to="/" className={styles.homeLink}>← Go back to Home</Link>
        </div>
    );
};

export default DefaultPage;
