import React, {Component} from "react";
import {connect} from "react-redux";
import EditTaskModal from "../../EditTaskModal/EditTaskModal";
import {getTask, deleteTask, editTask} from "../../../store/actions";
import {formatDate} from "../../../helpers/utils";
import styles from "./SingleTask.module.css";
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faRedo, faTrash} from "@fortawesome/free-solid-svg-icons";


class SingleTask extends Component {

    state = {
        showEditSingleTaskModal: false,
    };

    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.showEditSingleTaskModal && !prevProps.showEditSingleTaskModal) {
            this.setState({
                showEditSingleTaskModal: false,
            });
        }
    }

    handleDeleteTask = () => {
        const {deleteTask, task} = this.props;
        deleteTask(task._id, "singleTask");
    };


    toggleShowEditTask = () => {
        const {showEditSingleTaskModal} = this.state;
        this.setState({
            showEditSingleTaskModal: !showEditSingleTaskModal
        });
    };

    render() {
        const {showEditSingleTaskModal} = this.state;
        const {task, editTask} = this.props;
        return (
            <div className="mt-5">
                <Container>
                    <Row>
                        <Col xs={12}>
                            {
                                (task === null) ?
                                    (
                                        <p className={styles.text}>Task data not exists!</p>
                                    ) :
                                    (<Card className="text-center">
                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <Card.Text>Description: {task.description}</Card.Text>
                                            <Card.Text>Status: {task.status}</Card.Text>
                                            <Card.Text>Created at: {formatDate(task.created_at)}</Card.Text>
                                            <Card.Text>Copleted at: {formatDate(task.date)}</Card.Text>
                                            {task.status === "active" ?
                                                <Button
                                                    variant="success"
                                                    className="m-1"
                                                    onClick={() => {
                                                        editTask({status: "done", _id: task._id}, "singleTask")
                                                    }
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faCheck}/>
                                                </Button> :
                                                <Button
                                                    variant="secondary"
                                                    className="m-1"
                                                    onClick={() => {
                                                        editTask({status: "active", _id: task._id}, "singleTask")
                                                    }
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faRedo}/>
                                                </Button>
                                            }
                                            <Button
                                                variant="warning"
                                                className="m-1"
                                                onClick={this.toggleShowEditTask}
                                            >
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="m-1"
                                                onClick={this.handleDeleteTask}
                                            >
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </Card.Body>
                                    </Card>)
                            }
                        </Col>
                    </Row>
                </Container>
                {
                    showEditSingleTaskModal &&
                    <EditTaskModal
                        editedTask={task}
                        onClose={this.toggleShowEditTask}
                        from="singleTask"
                    />
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    getTask,
    deleteTask,
    editTask
};

const mapStateToProps = (state) => {
    return {
        task: state.task,
        showEditSingleTaskModal: state.showEditSingleTaskModal
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);