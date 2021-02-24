import React,{useEffect} from "react";
import { Spinner as BSpinner } from 'react-bootstrap';
import styles from "./Spinner.css.module.css";


export default function Spinner(props){
    return (
        <div className={styles.container}>
            <BSpinner
                className={styles.spinner}
                animation="border"
                role="status"
                size="lg"
            >
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div>

    )


}