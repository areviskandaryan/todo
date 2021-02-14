import React, {useState} from "react";
import {isValidEmail} from "../../../helpers/utils";
import styles from "./Contact.module.css"


export default function Contact() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setError] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [response, setResponse] = useState("");


    const handleChangeValue = ({target: {value, name}}) => {
        if (!value.trim()) {
            setError({...errors, [name]: "This field can't be empty."})
        } else if (value.trim().length < 5 && name !== "email") {
            setError({...errors, [name]: "Minimum 5 characters."})
        } else {
            setError({...errors, [name]: ""})
        }

        if (name === "email" && value.trim() && !isValidEmail(value.trim())) {
            setError({...errors, [name]: "Please enter a valid email."})
        }

        setValues({...values, [name]: value.trim()});

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/form",
            {
                method: "POST",
                body: JSON.stringify(values),
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

                setValues({
                    name: "",
                    email: "",
                    message: ""
                })
                setResponse("YOUR MESSAGE SENT");
            })
            .catch((error) => console.log("err", error))
    }


    return (
        <div>
            <div className={styles.wrapper}>
                <h2>Contact us</h2>
                {response ? <p className={styles.response}>{response}</p> : null}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            value={values.name}
                            onChange={handleChangeValue}
                            className={errors.name ? styles.invalidField : ""}
                        />
                    </div>
                    {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
                    <div className={styles.container}>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChangeValue}
                            className={errors.email ? styles.invalidField : ""}
                        />
                    </div>
                    {errors.email ? <p className={styles.error}>{errors.email}</p> : null}
                    <div className={styles.container}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            rows={8}
                            cols={20}
                            name="message"
                            id="message"
                            value={values.message}
                            onChange={handleChangeValue}
                            className={errors.message ? styles.invalidField : ""}
                        />
                    </div>
                    {errors.message ? <p className={styles.error}>{errors.message}</p> : null}

                    <button
                        className={styles.submit}
                        disabled={
                            errors.name || !values.name
                            || errors.email || !values.email
                            || errors.message || !values.message}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}