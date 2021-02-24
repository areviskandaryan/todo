import React, {Component} from "react";
import Task from "../Task/Task";
import {Container, Row, Col, Button} from 'react-bootstrap';
import Confirm from "../Confirm/Confirm";
import NewTask from "../NewTask/NewTask";
import EditTaskModal from "../EditTaskModal";
import styles from "./ToDo.module.css";
import {connect} from "react-redux";
import {getTasks, deleteSelectedTasks} from "../../store/actions";


class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTasks: new Set(),
            editedTask: {},
            showConfirm: false,
            showEdit: false
        };
    }


    componentDidMount() {
        this.props.getTasks();

    }


    componentDidUpdate(prevProps, prevState) {

        if (prevProps.showNewTask !== this.props.showNewTask) {
            this.setState({
                showNewTask: false
            });
            return;
        }

        if (prevProps.showConfirm !== this.props.showConfirm) {
            this.setState({
                showConfirm: false, selectedTasks: new Set()
            })
            return;
        }

        if (prevProps.showEdit !== this.props.showEdit) {
            this.setState({
                showEdit: false, editedTask: {},
            })
            return;
        }

    }


    handleEdit = (editedTask) => {
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
        const {selectedTasks} = this.state;
        this.props.deleteSelectedTasks(selectedTasks)

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
        const {tasks} = this.props;
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


    render() {
        const {selectedTasks, showConfirm, showNewTask, showEdit, editedTask} = this.state;
        const {tasks} = this.props;
        const taskComponents = tasks.map(task => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        task={task}
                        selectedTasks={selectedTasks}
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
                <h1 className={styles.title}>ToDo List</h1>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Button
                                variant="primary"
                                onClick={this.toggleShowConfirmTask}
                                className={styles.button}

                            >
                                Add New task
                            </Button>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Button
                                variant="warning"
                                onClick={this.selectConfirm}
                                className={styles.button}
                            >
                                Select All
                            </Button>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Button
                                variant="warning"
                                onClick={this.deselectTasks}
                                disabled={!selectedTasks.size}
                                className={styles.button}
                            >
                                Deselect All
                            </Button>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Button
                                variant="danger"
                                disabled={!selectedTasks.size}
                                onClick={this.toggleConfirm}
                                className={styles.button}
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
                        disabled={!!selectedTasks.size}

                    />
                }
                {
                    showEdit &&
                    <EditTaskModal
                        editedTask={editedTask}
                        onClose={this.toggleShowEditTask}
                    />
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        showNewTask: state.showNewTask,
        showConfirm: state.showConfirm,
        showEdit: state.showEdit,

    };
};


const mapDispatchToProps = {
    getTasks: getTasks,
    deleteSelectedTasks:deleteSelectedTasks,
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

