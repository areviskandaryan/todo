import React, {Component, createRef} from "react";
import styles from "./NewTask.module.css";
import {formatDate} from "../../helpers/utils";
import PropTypes from 'prop-types';
import {Button, FormControl, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux"
import {addTask} from "../../store/actions";


class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            date: new Date(),
        };
        this.ref = createRef();
    }

    componentDidMount() {
        this.ref.current.focus();
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
        const {addTask} = this.props;
        const title = this.state.title.trim();
        const description = this.state.description.trim();
        const {date} = this.state;
        if (title.trim()) {
            const newTask = {
                title,
                description,
                date: formatDate(date.toISOString()),
            };
            addTask(newTask);

        }
    };
    handleChangeDate = (e) => {
        this.setState({
            date: e || new Date(),
        })
    }

    render() {
        const {onClose} = this.props;
        const {title, description} = this.state;
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
                        ref={this.ref}

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
                    <DatePicker
                        minDate={new Date()}
                        selected={this.state.date}
                        onChange={this.handleChangeDate}
                        className={styles.date}

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

NewTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

const mapDispatchToProps ={
    addTask:  addTask,
}




export default connect(null, mapDispatchToProps)(NewTask);