import React, {Component} from "react";
import Task from "../Task/Task";
import InputDatas from "../InputDatas/InputDatas";
import {v4 as uuidv4} from 'uuid';
import styles from "./ToDo.module.css";
import {Container, Row, Col, Card, FormControl, InputGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';


export default class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
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


    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.handleAdd();
        }
    }


    handleAdd = () => {
        console.log("add");
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

    deleteTask = (uid) => {
        const {tasks} = this.state
        const filteredTask = tasks.filter(task => uid !== task.id);
        this.setState({
            tasks: filteredTask,
        })
    }

    handleSelectedTasks = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        }
        this.setState({selectedTasks});
    }
    handleDeleteSelectedTasks = () => {
        const {tasks, selectedTasks} = this.state;
        const removedTasks = tasks.filter(task => {
            return !selectedTasks.has(task.id)
        })
        this.setState({
            tasks: removedTasks,
            selectedTasks: new Set(),
        })
    }


    render() {
        const {tasks,todo, selectedTasks} = this.state;
        const taskComponents = tasks.map(task => {
            return (
                <Col key={task.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        task={task}
                        selectedTasks={selectedTasks}
                        onDelete={this.deleteTask}
                        disabled={!!selectedTasks.size}
                        onSelect={this.handleSelectedTasks}
                    />
                </Col>
            );
        })
        return (
            <>
                <h2>Add new task</h2>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            < InputDatas
                                todo ={todo}
                                onHandleCange={this.handleCange}
                                onAdd={this.handleAdd}
                                onHandleKeyDown = {this.handleKeyDown}
                                disabled ={!!selectedTasks.size}
                            />
                        </Col>
                    </Row>
                    <Row>{taskComponents}</Row>
                    <Row className="justify-content-center">
                        <Col xs={8} sm={4}>
                            <Button
                                variant="danger"
                                onClick={this.handleDeleteSelectedTasks}
                                className={styles.button}
                                disabled={!selectedTasks.size}
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