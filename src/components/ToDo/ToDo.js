import React, {Component} from "react";
import Task from "../Task/Task";
import {Container, Row, Col, Button} from 'react-bootstrap';
import Confirm from "../Confirm/Confirm";
import NewTask from "../NewTask/NewTask";
import EditTaskModal from "../EditTaskModal";

class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        editedTask: {},
        showConfirm: false,
        showNewTask: false,
        showEdit: false
    };

    componentDidMount() {
        fetch("http://localhost:3001/task",
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await (res.json())
                if (res.status >= 400 && res.status <= 599) {
                    if (response.error) {
                        throw response.error
                    } else {
                        throw new Error("Something went wrong")
                    }
                }
                this.setState({
                    tasks: response,
                })
            })
            .catch((error) => console.log("err", error))
    }


    handleAdd = (newTask) => {
        const {tasks} = this.state;
        fetch("http://localhost:3001/task",
            {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await (res.json())
                if (res.status >= 400 && res.status <= 599) {
                    if (response.error) {
                        throw response.error
                    } else {
                        throw new Error("Something went wrong")
                    }
                }
                this.setState({
                    tasks: [...tasks, response],
                    showNewTask: false,
                })
            })
            .catch((error) => console.log("err", error))


    };


    deleteTask = (taskId) => {
        const {tasks} = this.state
        fetch(`http://localhost:3001/task/${taskId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await (res.json())
                if (res.status >= 400 && res.status <= 599) {
                    if (response.error) {
                        throw response.error
                    } else {
                        throw new Error("Something went wrong")
                    }
                }

                const filteredTask = tasks.filter(task => taskId !== task._id);
                this.setState({
                    tasks: filteredTask,
                })


            })
            .catch((error) => console.log("err", error))

    };

    handleEdit = (editedTask) =>{
        this.setState({
            editedTask,
            showEdit: true,
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
        fetch("http://localhost:3001/task/",
            {
                method: "PATCH",
                body: JSON.stringify({tasks: Array.from(selectedTasks)}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await (res.json())
                if (res.status >= 400 && res.status <= 599) {
                    if (response.error) {
                        throw response.error
                    } else {
                        throw new Error("Something went wrong")
                    }
                }

                const removedTasks = tasks.filter(task => {
                    return !selectedTasks.has(task._id)
                });
                this.setState({
                    tasks: removedTasks,
                    selectedTasks: new Set(),
                    showConfirm: false,
                })


            })
            .catch((error) => console.log("err", error))


    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
        })

    };

    toggleShowConfirmTask = () => {
        this.setState({
            showNewTask: !this.state.showNewTask,
        })
    };

    toggleShowEditTask = () => {
        this.setState({
            showEdit: !this.state.showEdit,
        })
    };

    selectConfirm = () => {
        const {tasks} = this.state;
        const newSelectedTasks = tasks.map(({_id}) => _id);
        this.setState({
            selectedTasks: new Set(newSelectedTasks)
        })
    };

    deselectTasks = () => {
        this.setState({
            selectedTasks: new Set()
        })
    };

    handleReplaseEditTask = (newTask) => {
        const {tasks} = this.state;

        fetch(`http://localhost:3001/task/${newTask._id}`,
            {
                method: "PUT",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(async (res) => {
                const response = await (res.json())
                if (res.status >= 400 && res.status <= 599) {
                    if (response.error) {
                        throw response.error
                    } else {
                        throw new Error("Something went wrong")
                    }
                }

                const tasksArr = tasks.map((task) => {
                    if (task._id !== newTask._id) {
                        return task;
                    }
                    return newTask
                })
                this.setState({
                    tasks: tasksArr,
                    editedTask: {},
                    showEdit: false,
                })


            })
            .catch((error) => console.log("err", error))
    };

    render() {
        const {tasks, selectedTasks, showConfirm, showNewTask, showEdit, editedTask} = this.state;
        const taskComponents = tasks.map(task => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        task={task}
                        selectedTasks={selectedTasks}
                        onDelete={this.deleteTask}
                        onEdit={this.handleEdit}
                        disabled={!!selectedTasks.size}
                        onSelect={this.handleSelectedTasks}
                        checked={selectedTasks.has(task._id)}
                    />
                </Col>
            )
        })
        return (
            <div>
                <h1>ToDo List</h1>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <Button
                                variant="primary"
                                onClick={this.toggleShowConfirmTask}

                            >
                                Add New task
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="warning"
                                onClick={this.selectConfirm}
                            >
                                Select All
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="warning"
                                onClick={this.deselectTasks}
                                disabled={!selectedTasks.size}
                            >
                                Deselect All
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                disabled={!selectedTasks.size}
                                onClick={this.toggleConfirm}
                            >
                                Remove selected
                            </Button>
                        </Col>
                    </Row>
                    <Row>{taskComponents}</Row>
                </Container>

                {
                    showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        count={selectedTasks.size}
                        onConfirm={this.handleDeleteSelectedTasks}
                    />}

                {
                    showNewTask &&
                    <NewTask
                        onClose={this.toggleShowConfirmTask}
                        onAdd={this.handleAdd}
                        disabled={!!selectedTasks.size}

                    />
                }
                {
                    showEdit &&
                    <EditTaskModal
                        editedTask={editedTask}
                        onClose={this.toggleShowEditTask}
                        onReplaseEditTask={this.handleReplaseEditTask}
                    />
                }
            </div>
        )
    }
}

export default ToDo;