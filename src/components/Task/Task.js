import React,{ Component } from "react";
import styles from "./Task.module.css";
import {Button, Card} from "react-bootstrap";

class Task extends Component {

    state ={
        selected:false,
    }

    selectTasks=()=>{
        const {onSelect, task }=this.props;
        onSelect(task._id);
        this.setState({
            selected:!this.state.selected,
        })
    }

    render(){
        const {task, selectedTasks,onDelete, disabled }=this.props;
        const {selected} = this.state;
        return (
            <Card className={`${styles.card} ${selected?styles.selected:""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        checked={selectedTasks.has(task._id)}
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

export default Task;