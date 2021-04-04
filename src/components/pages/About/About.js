import React from "react";
import styles from "./About.module.css";

export default function About() {
    return (
        <>
            <h2 className={styles.title}>Information about the opportunities of the website</h2>
            <ol className={styles.infoText}>
                <li>Register</li>
                <li>Log in</li>
                <li>Send message</li>
                <li>
                    Pass home page and add tasks mentioning the title, description and deadlines,
                    edit and delete the following task, change status if it has been done from active to done,
                    select tasks and remove them wholly.
                    On the top there is a button for searching tasks, in advance,
                    choosing some filters, sort's different categories or typing name/description.
                </li>
                <li>
                    Pass single task page, edit, delete and change it's status from a single task page.
                </li>
                <li>
                    Log out
                </li>
                <li>
                    And finally there are linkedin and github contacts of author in the footer of website.
                </li>
            </ol>
        </>
    )
}