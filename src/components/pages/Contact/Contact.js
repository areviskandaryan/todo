import React, {useState, useEffect} from "react";
import {isValidEmail} from "../../../helpers/utils";
import styles from "./Contact.module.css";
import {connect} from "react-redux";
import {sendMessage} from "../../../store/actions"


function Contact(props) {
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

    useEffect(() => {
        if (props.successMessage){
            setValues({
                name: "",
                email: "",
                message: ""
            })
        }

    }, [props.successMessage])

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
        props.sendMessage(values);
    }


    return (
        <div>
            <div className={styles.wrapper}>
                <h2>Contact us</h2>
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

const mapStateToProps = (state) => {
    return {
        successMessage: state.successMessage
    }
}
const mapDispatchToProps = {
    sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)