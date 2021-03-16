import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {isValidEmail} from "../../../helpers/utils"
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import styles from "./Register.module.css";


export default function Register(props) {
    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
    });
    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
    }, []);


    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]: value.trim()});
        setErrors({...errors, [name]: ""});
    };

    const handleSubmit = () => {

        if (!values.name) {
            setErrors((errors) => ({...errors, name: "This field can't be empty."}));
        } else if (values.name.length < 3) {
            setErrors((errors) => ({...errors, name: "Minimum 3 characters."}));
        } else if (values.name.length > 15) {
            setErrors((errors) => ({...errors, name: "Maximum 15 characters."}));
        } else {
            setErrors((errors) => ({...errors, name: ""}));
        }

        if (!values.surname) {
            setErrors((errors) => ({...errors, surname: "This field can't be empty."}));
        } else if (values.surname.length < 3) {
            setErrors((errors) => ({...errors, surname: "Minimum 3 characters."}));
        } else if (values.surname.length > 20) {
            setErrors((errors) => ({...errors, surname: "Maximum 20 characters."}));
        } else {
            setErrors((errors) => ({...errors, surname: ""}));
        }


        if (!values.email) {
            setErrors((errors) => ({...errors, email: "This field can't be empty."}));
        } else if (!isValidEmail(values.email)) {
            setErrors((errors) => ({...errors, email: "Please enter a valid email."}));
        } else {
            setErrors((errors) => ({...errors, email: ""}));
        }

        if (!values.password) {
            setErrors((errors) => ({...errors, password: "This field can't be empty."}));
        } else if (values.password.length < 6) {
            setErrors((errors) => ({...errors, password: "The password must be 6 characters or longer."}));
        } else {
            setErrors((errors) => ({...errors, password: ""}));
        }

        if (!values.confirmPassword) {
            setErrors((errors) => ({...errors, confirmPassword: "This field can't be empty."}));
        } else if (values.confirmPassword !== values.password) {
            setErrors((errors) => ({...errors, confirmPassword: "Password are not matching"}));
        }


    };

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={7}>
                    <Form className='mt-5'>
                        <h2 className={styles.title}>Register</h2>
                        <Form.Group>
                            <Form.Control
                                className={errors.name ? styles.invalid : ''}
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                ref={ref}
                            />
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.surname ? styles.invalid : ''}
                                type="text"
                                placeholder="Enter your surname"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.surname}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.email ? styles.invalid : ''}
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.password ? styles.invalid : ''}
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <Form.Text className="text-danger">
                                {errors.password}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.confirmPassword ? styles.invalid : ''}
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                            />
                            <Form.Text className="text-danger">
                                {errors.confirmPassword}
                            </Form.Text>
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                variant="secondary"
                                onClick={handleSubmit}
                                className={styles.submitButton}
                            >
                                Send
                            </Button>
                        </div>

                    </Form>
                    <Link to = "/login" className={styles.link}>Already registered? Try to login.</Link>
                </Col>
            </Row>
        </Container>

    )
}