import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../../store/actions"
import {isValidEmail} from "../../../helpers/utils";
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import styles from "./login.module.css";



function Login(props) {
    const [values, setValues] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({email: null, password: null});
    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
    }, []);


    const handleChange = ({target: {value, name}}) => {
        if (!value.trim()) {
            setErrors({...errors, [name]: "This field can't be empty."});
        } else if (name === "password" && value.trim().length <6){
            setErrors(({...errors, [name]: "The password must be 6 characters or longer."}));
        }
        else if (!isValidEmail(value.trim()) && name === "email") {
            setErrors(({...errors, [name]: "Please enter a valid email."}));
        } else {
            setErrors(({...errors, [name]: ""}));
        }

        setValues({...values, [name]: value.trim()});
    };

    const handleSubmit = () => {
        props.login(values);
    };

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={7}>
                    <Form className='mt-2'>
                        <h2 className={styles.title}>Log in</h2>
                        <Form.Group>
                            <Form.Control
                                className={errors.email ? styles.invalid : ''}
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                ref={ref}
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
                        <div className="text-center">
                            <Button
                                variant="secondary"
                                onClick={handleSubmit}
                                disabled={!values.email || errors.email || !values.password || errors.password}
                                className={styles.submitButton}
                            >
                                Log in
                            </Button>
                        </div>

                    </Form>
                    <Link to ="/register" className={styles.link}>Don't have account yet? Register now!</Link>
                </Col>
            </Row>
        </Container>

    )
}

const mapDispatchToProps = {
    login,
}
export default connect(null,mapDispatchToProps)(Login)
