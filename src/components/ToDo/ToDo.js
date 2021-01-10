import React, {Component} from "react";
import {v4 as uuidv4} from 'uuid';
import styles from "./ToDo.module.css";
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

console.log(Card)
export default class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: [],
        todo: {
            id: uuidv4(),
            title: "",
            description: "",
            status: "active",
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
        if (todo.title.trim()) {
            this.setState({
                tasks: [...tasks, todo],
                todo: {
                    id: uuidv4(),
                    title: "",
                    description: "",
                    status: "active",
                }
            })
        }
    }
    handleDelete = (uid) => {
        const {tasks} = this.state
        const filteredTask = tasks.filter(task => uid !== task.id);
        this.setState({
            tasks: filteredTask,
        })
    }

    handleSelected = (task) => {
        const {tasks, selectedTasks} = this.state;
        const newSelected =
            !selectedTasks.find(item => item.id === task.id) ?
                [...selectedTasks, task] : selectedTasks.filter(item => item.id !== task.id);
        this.setState({selectedTasks: newSelected});

    }
    handleDeleteSelected = () => {
        const {tasks, selectedTasks} = this.state;
        const removedTasks = tasks.filter(task => {
            return !(selectedTasks.find(item => item.id === task.id))
        })
        this.setState({
            tasks: removedTasks,
            selectedTasks: [],
        })
    }

    render() {
        const {title, description} = this.state.todo;
        const {tasks, selectedTasks} = this.state;
        const col = tasks.map(task => {
            return (
                <Col key={task.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card className={styles.card}>
                        <input type="checkbox" value={selectedTasks.find(item => item.id === task.id)}
                               onChange={() => this.handleSelected(task)}/>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>Description: {task.description}</Card.Text>
                            <Card.Text>Status: {task.status}</Card.Text>
                            <Button variant="danger" onClick={() => this.handleDelete(task.id)}>Delete</Button>
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