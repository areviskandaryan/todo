import React, {useState} from "react";
import {isValidEmail} from "../../../helpers/utils";
import styles from "./Contact.module.css"


export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState({
        errorName: "",
        errorEmail: "",
        errorMessage: ""
    });
    const[response,setResponse] = useState("");

    const handleChangeName = ({target: {value}}) => {
        if (!value.trim()) {
            setError({...error, errorName: "This field can't be empty."})
        } else if (value.trim().length < 5) {
            setError({...error, errorName: "Minimum 5 characters."})
        } else {
            setError({...error, errorName: ""})
        }
        setName(value);
    }


    const handleChangeEmail = ({target: {value}}) => {
        if (!value.trim()) {
            setError({...error, errorEmail: "This field can't be empty."})
        } else if (!isValidEmail(value.trim())) {
            setError({...error, errorEmail: "Please enter a valid email."})
        } else {
            setError({...error, errorEmail: ""})
        }
        setEmail(value);
    }


    const handleChangeMessage = ({target: {value}}) => {
        if (!value.trim()) {
            setError({...error, errorMessage: "This field can't be empty."})
        } else {
            setError({...error, errorMessage: ""})
        }
        setMessage(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            message
        };
        fetch("http://localhost:3001/form",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await (res.json())
                if (res.status >= 400 && res.status <= 599) {
                    if (response.error) {
                        throw response.error
                    } else {
                        throw new Error("Unable to submit your request. Please, try again later")
                    }
                }
                setResponse("YOUR MESSAGE SENT");
            })
            .catch((error) => console.log("err", error))
    }
    return (
        <div>
            <div className={styles.wrapper}>
                <h2>Contact</h2>
                {response?<p className = {styles.response}>{response}</p>:null}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <label>Name</label>
                        <input name="name" type="text" value={name} onChange={handleChangeName}/>
                    </div>
                    {error.errorName ? <p className={styles.error}>{error.errorName}</p> : null}
                    <div className={styles.container}>
                        <label>Email</label>
                        <input name="email" value={email} onChange={handleChangeEmail}/>
                    </div>
                    {error.errorEmail ? <p className={styles.error}>{error.errorEmail}</p> : null}
                    <div className={styles.container}>
                        <label>Message</label>
                        <textarea rows={10} cols={30} value={message} onChange={handleChangeMessage}/>
                    </div>
                    {error.errorMessage ? <p className={styles.error}>{error.errorMessage}</p> : null}

                    <button
                        className={styles.submit}
                        disabled={
                            error.errorName || !name
                            || error.errorEmail || !email
                            || error.errorMessage || !message}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}