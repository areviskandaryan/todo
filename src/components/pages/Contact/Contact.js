import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import {sendMessage} from "../../../store/actions"
import {isValidEmail} from "../../../helpers/utils";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import styles from "./Contact.module.css";


function Contact(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    });

    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
        if (props.formSuccess) {
            setValues({
                name: "",
                email: "",
                message: ""
            });
        }

    }, [props.formSuccess]);


    const handleChange = ({target: {value, name}}) => {
        if (!value.trim()) {
            setErrors({...errors, [name]: "This field can't be empty."});
        } else if (value.trim().length < 3 && name === "name") {
            setErrors({...errors, [name]: "Minimum 3 characters."});
        } else if (name === "email" && !isValidEmail(value.trim())) {
            setErrors({...errors, [name]: "Please enter a valid email."});
        } else {
            setErrors({...errors, [name]: ""});
        }

        setValues({...values, [name]: value});

    };


    const handleSubmit = () => {
        props.sendMessage(values);
    };

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={7}>
                    <Form className='mt-2'>
                        <h2 className={styles.title}>Contact us</h2>
                        <Form.Group>
                            <Form.Control
                                className={errors.name ? styles.invalid : ''}
                                placeholder="Enter name"
                                name="name"
                                id="name"
                                type="text"
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
                                className={errors.email ? styles.invalid : ''}
                                placeholder="Enter email"
                                name="email"
                                id="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                className={errors.message ? styles.invalid : ''}
                                placeholder="Enter message"
                                name="message"
                                id="message"
                                type="text"
                                value={values.message}
                                onChange={handleChange}
                                rows={8}
                                cols={20}
                            />
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                variant="secondary"
                                onClick={handleSubmit}
                                disabled={
                                    errors.name || !values.name
                                    || errors.email || !values.email
                                    || errors.message || !values.message}
                                className={styles.submitButton}
                            >
                                Send
                            </Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        formSuccess: state.formSuccess
    };
};

const mapDispatchToProps = {
    sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);