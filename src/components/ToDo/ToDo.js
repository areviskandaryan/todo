import React, {Component} from "react";
import Task from "../Task/Task";
import InputDatas from "../InputDatas/InputDatas";
import {Container, Row, Col, Button} from 'react-bootstrap';
import Confirm from "../Confirm/Confirm";


class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm:false,
    }

    handleAdd = (newTask) => {
        const {tasks} = this.state;

        this.setState({
            tasks: [...tasks, newTask],
            title: "",
            description: "",
        })
    };


    deleteTask = (uid) => {
        const {tasks} = this.state
        const filteredTask = tasks.filter(task => uid !== task._id);
        this.setState({
            tasks: filteredTask,
        })
    };


    handleSelectedTasks = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        }
        this.setState({selectedTasks});
    };


    handleDeleteSelectedTasks = () => {
        const {tasks, selectedTasks} = this.state;
        const removedTasks = tasks.filter(task => {
            return !selectedTasks.has(task._id)
        })
        this.setState({
            tasks: removedTasks,
            selectedTasks: new Set(),
            showConfirm:false,
        })
    };

    toggleConfirm = () =>{
        this.setState({
            showConfirm: !this.state.showConfirm,
        })

    };

    render() {
        const {tasks, selectedTasks, showConfirm} = this.state;
        const taskComponents = tasks.map(task => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        task={task}
                        selectedTasks={selectedTasks}
                        onDelete={this.deleteTask}
                        disabled={!!selectedTasks.size}
                        onSelect={this.handleSelectedTasks}
                         checked = {selectedTasks.has(task._id)}
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
                                disabled={!selectedTasks.size}
                                onClick={this.toggleConfirm}
                            >
                                Remove selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
                { showConfirm &&
                <Confirm
                    onClose = { this.toggleConfirm }
                    count ={ selectedTasks.size }
                    onConfirm={this.handleDeleteSelectedTasks}
                />  }
            </>
        )
    }
}

export default ToDo;