import React, {Component} from "react";
import styles from "./Task.module.css";
import {Button, Card} from "react-bootstrap";
import PropTypes from 'prop-types';

class Task extends Component {

    selectTasks = () => {
        const {onSelect, task} = this.props;
        onSelect(task._id);

    }

    render() {
        const {task, onDelete, disabled, checked} = this.props;

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
                        variant="danger"
                        onClick={() => onDelete(task._id)}
                        disabled={disabled}
                    >
                        Delete
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