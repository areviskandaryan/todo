import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import styles from "./ToDo.module.css";
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap';


export default class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: [],
        title: "",
        description: "",

    }
    handleCange = ({target: {value, name}}) => {

        this.setState({
            [name]: value,
        })
    }

    handleAdd = () => {
        const {tasks, title, description} = this.state;
        if (title.trim()) {
            const newTask = {
                _id: uuidv4(),
                title,
                description,
            }
            this.setState({
                tasks: [...tasks, newTask],
                title: "",
                description: "",

            })
        }
    }
    handleDelete = (uid) => {
        const {tasks} = this.state
        const filteredTask = tasks.filter(task => uid !== task._id);
        this.setState({
            tasks: filteredTask,
        })
    }

    handleSelected = (task) => {
        const {selectedTasks} = this.state;
        const newSelected =
            !selectedTasks.find(item => item._id === task._id) ?
                [...selectedTasks, task] : selectedTasks.filter(item => item._id !== task._id);
        this.setState({selectedTasks: newSelected});

    }
    handleDeleteSelected = () => {
        const {tasks, selectedTasks} = this.state;
        const removedTasks = tasks.filter(task => {
            return !(selectedTasks.find(item => item._id === task._id))
        })
        this.setState({
            tasks: removedTasks,
            selectedTasks: [],
        })
    }


    render() {
        const {tasks, title, description,selectedTasks} = this.state;
        const col = tasks.map(task => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card className={styles.card}>
                        <input type="checkbox" value={selectedTasks.find(item => item._id === task._id)}
                               onChange={() => this.handleSelected(task)}/>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>Description: {task.description}</Card.Text>
                            <Button variant="danger" onClick={() => this.handleDelete(task._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        })
        return (
            <>
                <h2>Add new task</h2>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Title"
                                    name="title"
                                    value={title}
                                    onChange={this.handleCange}
                                />
                                <FormControl
                                    placeholder="Description"
                                    name="description"
                                    value={description}
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
                    <Row className="justify-content-center">
                        <Col xs={8} sm={4}>
                            <Button
                                variant="danger"
                                onClick={this.handleDeleteSelected}
                                className={styles.button}
                            >
                                Remove selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}