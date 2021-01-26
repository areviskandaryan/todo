import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Button, FormControl, Modal} from "react-bootstrap";

class EditTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.editedTask.title,
            description: props.editedTask.description,
        }

    };

    handleChange = ({target: {value, name}}) => {
        this.setState({
            [name]: value,
        })
    };

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.handleEditSave();
        }
    };

    handleEditSave = () => {
        const {onReplaseEditTask, editedTask} = this.props;
        const title = this.state.title.trim();
        const description = this.state.description.trim();
        if (title) {
            const newTask = {
                _id:editedTask._id,
                title,
                description,
            };
            onReplaseEditTask(newTask);
        }
    };

    render() {
        const {title, description} = this.state;
        const {onClose} = this.props;
        return (
            <Modal
                show={true}
                onHide={onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        className='mb-2'
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}

                    />
                    <FormControl
                        className='mb-2'
                        placeholder="Description"
                        as="textarea"
                        rows={5}
                        name="description"
                        value={description}
                        onChange={this.handleChange}

                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleEditSave}
                        variant='success'
                    >
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

EditTaskModal.propTypes = {
    editedTask:PropTypes.object.isRequired,
    onClose:PropTypes.func.isRequired,
    onReplaseEditTask:PropTypes.func.isRequired,
}

export default EditTaskModal;