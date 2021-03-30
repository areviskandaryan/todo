import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {isValidEmail} from "../../../helpers/utils";
import {register} from "../../../store/actions";
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import styles from "./Register.module.css";


function Register(props) {
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
        let valid = true;
        let nameError = null;
        if (!values.name.trim()) {
            nameError = "This field can't be empty.";
            valid = false;
        } else if (values.name.trim().length < 3) {
            nameError = "Minimum 3 characters.";
            valid = false;
        }

        let surnameError = null;
        if (!values.surname.trim()) {
            surnameError = "This field can't be empty.";
            valid = false;
        } else if (values.surname.trim().length < 3) {
            surnameError = "Minimum 3 characters.";
            valid = false;
        }

        let emailError = null;
        if (!values.email.trim()) {
            emailError = "This field can't be empty.";
            valid = false;
        } else if (!isValidEmail(values.email)) {
            emailError = "Please enter a valid email.";
            valid = false;
        }


        let passwordError = null;
        if (!values.password.trim()) {
            passwordError = "This field can't be empty.";
            valid = false;
        } else if (values.password.trim().length < 6) {
            passwordError = "The password must be 6 characters or longer.";
            valid = false;
        }


        let confirmPasswordError = null;
        if (!values.confirmPassword.trim()) {
            confirmPasswordError = "This field can't be empty.";
            valid = false;
        } else if (values.confirmPassword !== values.password) {
            confirmPasswordError = "Password are not matching";
            valid = false;
        }

        setErrors({
            ...errors,
            name: nameError,
            surname: surnameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        })

        if (valid) {
            props.register(values);
        }

    };

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={7}>
                    <Form className='mt-2'>
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
                    <Link to="/login"  className={styles.link}>Already registered? Try to login.</Link>
                </Col>
            </Row>
        </Container>

    )
}

const mapDispatchToProps = {
    register,
}
export default connect(null, mapDispatchToProps)(Register);