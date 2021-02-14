import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./NavMenu.module.css";


export default function NavMenu() {
    return (
        <nav>
            <ul className={styles.linkContainer}>
                <li className={styles.linkItem}>
                    <NavLink
                        exact
                        to="/home"
                        activeClassName={styles.active}
                        className = {styles.link}
                    >
                        Home
                    </NavLink>
                </li>
                <li className={styles.linkItem}>
                    <NavLink
                        exact
                        to="/about"
                        activeClassName={styles.active}
                        className = {styles.link}
                    >
                        About us
                    </NavLink>
                </li>
                <li className={styles.linkItem}>
                    <NavLink
                        exact
                        to="contact"
                        activeClassName={styles.active}
                        className = {styles.link}
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}