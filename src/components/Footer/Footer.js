import React from "react";
import styles from "./Footer.module.css";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return (
        <div className={styles.footer}>
                <Button
                    variant="dark"
                    className="m-3"
                    size="lg"
                    href="https://github.com/areviskandaryan"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faGithub}/>
                </Button>
                <Button
                    variant="primary"
                    className="m-3"
                    size="lg"
                    href="https://www.linkedin.com/in/arevik-iskandaryan-b642761a0/"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faLinkedin}/>
                </Button>
        </div>
    )
}