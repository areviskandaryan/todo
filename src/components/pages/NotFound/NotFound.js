import React from "react";
import {Link} from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.textNotFound}>
                Sorry, we can't find that page. It might be an old link or maybe it moved.
            </div>
            <p className={styles.textToLinks} >
                Try to find it via <Link to="/home" className={styles.link}>Home</Link>, <Link to="/contact" className={styles.link}>Contact</Link> or <Link to="/about" className={styles.link}>About us</Link>.
            </p>
        </div>
    )
}