import React, {Component} from "react";
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import {formatDate} from "../../../helpers/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../EditTaskModal";
import {getTask, deleteTask} from "../../../store/actions";
import {connect} from "react-redux";


class SingleTask extends Component {

    state = {
        showEditSingleTaskModal: false,
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.showEditSingleTaskModal && !prevProps.showEditSingleTaskModal) {
            this.setState({
                showEditSingleTaskModal: false,
            })
        }

    }

    handleDeleteTask = () => {
        const {deleteTask, task} = this.props;
        deleteTask(task._id, "singleTask");
    }


    toggleShowEditTask = () => {
        const {showEditSingleTaskModal} = this.state;
        this.setState({
            showEditSingleTaskModal: !showEditSingleTaskModal,
        })
    }

    render() {
        const {showEditSingleTaskModal} = this.state;
        const {task} = this.props;
        return (
            <div className="mt-5">
                <Container>
                    <Row>
                        <Col xs={12}>
                            {
                                (task === null) ?
                                    (
                                        <p>Task data not exists!</p>
                                    ) :
                                    (<Card className="text-center">
                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <Card.Text>Description: {task.description}</Card.Text>
                                            <Card.Text> {formatDate(task.date)}</Card.Text>
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

}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        showEditSingleTaskModal: state.showEditSingleTaskModal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);