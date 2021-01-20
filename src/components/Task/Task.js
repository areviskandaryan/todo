import React, {Component} from "react";
import PropTypes from 'prop-types';
import styles from "./Task.module.css";
import {Button, Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'



class Task extends Component {

    selectTasks = () => {
        const {onSelect, task} = this.props;
        onSelect(task._id);

    };

    render() {
        const {task, onDelete, disabled, checked, onEdit} = this.props;

        return (
            <Card className={`${styles.card} ${checked ? styles.selected : ""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={this.selectTasks}
                    />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>Description: {task.description}</Card.Text>
                    <Button
                        variant="warning"
                        className="m-1"
                        onClick={() => onEdit(task)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        className="m-1"
                        onClick={() => onDelete(task._id)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    selectedTasks: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
};


export default Task;