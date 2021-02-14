import React, {Component} from "react";
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import {formatDate} from "../../../helpers/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../EditTaskModal";


export default class SingleTask extends Component {

    state = {
        task: null,
        showEditModal:false,
    }

    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        fetch(`http://localhost:3001/task/${taskId}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
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
                this.setState({task: response});
            })
            .catch((error) => console.log(error))

    }
    handleDeleteTask = ()=>{
        const { task } = this.state;
        fetch(`http://localhost:3001/task/${task._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
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

                this.props.history.push('/home')
            })
            .catch((error) => console.log(error))

    }


    handleReplaseEditTask = (editedTask)=>{
        const { showEditModal } = this.state;
        fetch(`http://localhost:3001/task/${editedTask._id}`,
            {
                method: "PUT",
                body:JSON.stringify(editedTask),
                headers: {
                    "Content-type": "application/json"
                },
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
                  task:response,
                  showEditModal:!showEditModal,
              })
            })
            .catch((error) => console.log(error))

    }

    toggleShowEditTask = ()=>{
        const { showEditModal } = this.state;
        this.setState({
            showEditModal:!showEditModal,
        })
    }

    render() {
        const {task, showEditModal} = this.state;
        return (
            <div className="mt-5">
            <Container >
                <Row>
                    <Col xs={12}>
                        {
                            task === null ?
                                (
                                    <div className="spinner-border m-5" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) :
                                (
                                    <Card className="text-center">
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
                                    </Card>
                                )
                        }
                    </Col>
                </Row>
            </Container>

                {
                    showEditModal &&
                    <EditTaskModal
                        editedTask={task}
                        onClose={this.toggleShowEditTask}
                        onReplaseEditTask={this.handleReplaseEditTask}
                    />
                }
            </div>

        )

    }
}