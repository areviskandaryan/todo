import React, {Component} from "react";
import {Button, FormControl, Modal} from "react-bootstrap";
import {v4 as uuidv4} from "uuid"
import PropTypes from 'prop-types';

class ShowNewTask extends Component {

    state = {
        title: "",
        description: "",
    }

    handleChange = ({target: {value, name}}) => {
        this.setState({
            [name]: value,
        })
    };

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.handleSubmitAdd();
        }
    };

    handleSubmitAdd = () => {
        const {onAdd} = this.props;
        const title = this.state.title.trim();
        const description = this.state.description.trim();
        if (title.trim()) {
            const newTask = {
                _id: uuidv4(),
                title,
                description,
            };
            onAdd(newTask);

        }
    };

    render() {
        const { onClose } = this.props;
        const { title, description } = this.state;
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
                        Add New Task
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
                        onClick={this.handleSubmitAdd}
                        variant='success'
                    >
                        Add
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>


        )
    }


}
ShowNewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};
export default ShowNewTask;