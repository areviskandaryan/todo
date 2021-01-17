import React, {Component} from "react";
import Task from "../Task/Task";
import InputDatas from "../InputDatas/InputDatas";
import styles from "./ToDo.module.css";
import {Container, Row, Col, Button} from 'react-bootstrap';


class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
    }

    handleAdd = (newTask) => {
        const {tasks} = this.state;

        this.setState({
            tasks: [...tasks, newTask],
            title: "",
            description: "",
        })
    }


    deleteTask = (uid) => {
        const {tasks} = this.state
        const filteredTask = tasks.filter(task => uid !== task._id);
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
            return !selectedTasks.has(task._id)
        })
        this.setState({
            tasks: removedTasks,
            selectedTasks: new Set(),
        })
    }

    render() {
        const {tasks, selectedTasks} = this.state;
        const taskComponents = tasks.map(task => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        task={task}
                        selectedTasks={selectedTasks}
                        onDelete={this.deleteTask}
                        disabled={!!selectedTasks.size}
                        onSelect={this.handleSelectedTasks}
                    />
                </Col>
            )
        })
        return (
            <>
                <h2>Add new task</h2>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            < InputDatas
                                onAdd={this.handleAdd}
                                disabled={!!selectedTasks.size}
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

export default ToDo;