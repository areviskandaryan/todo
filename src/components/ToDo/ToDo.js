import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import styles from "./ToDo.module.css";
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';


export default class ToDo extends Component {
    state = {
        tasks: [],
        todo: {
            id: uuidv4(),
            title: "",
        }
    }
    handleCange = ({target: {value, name}}) => {
        const {todo} = this.state;
        this.setState({
            todo: {...todo, [name]: value}
        })
    }
    handleAdd = () => {
        const {tasks, todo} = this.state;
        this.setState({
            tasks: [...tasks, todo],
            todo: {
                id: uuidv4(),
                title: "",
            }
        })

    }

    render() {
        const {title} = this.state.todo;
        const {tasks} = this.state;
        const col = tasks.map(task => {
            return (
                <Col key={task.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card className={styles.card}>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            );
        })
        return (
            <>
                <h2>Add new task</h2>
                <Container>
                    <Row className = "justify-content-center">
                        <Col xs = {10}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Input your task"
                                    name="title"
                                    value={title}
                                    onChange={this.handleCange}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.handleAdd}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>{col}</Row>
                </Container>
            </>
        )
    }
}