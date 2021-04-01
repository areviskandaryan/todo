import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {formatDate, textCutter} from "../../helpers/utils";
import {deleteTask,editTask} from "../../store/actions";
import styles from "./Task.module.css";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit, faCheck, faRedo} from '@fortawesome/free-solid-svg-icons'

class Task extends PureComponent {

    selectTasks = () => {
        const {onSelect, task} = this.props;
        onSelect(task._id);
    }

    render() {
        const {task, deleteTask, disabled, checked, onEdit,editTask} = this.props;
        return (
            <Card className={`${styles.card} ${checked?styles.selected:""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={this.selectTasks}
                    />
                    <Link to={`/task/${task._id}`}><Card.Title
                        className={styles.title}>{textCutter(task.title, 15)}</Card.Title></Link>
                    <Card.Text
                        className={styles.description}>Description: {textCutter(task.description, 60)}</Card.Text>
                    <Card.Text>Status: {task.status}</Card.Text>
                    <Card.Text>Created at: {formatDate(task.created_at)}</Card.Text>
                    <Card.Text>Copleted at: {formatDate(task.date)}</Card.Text>
                    <div className={styles.buttonWrupper}>


                    {task.status === "active" ?
                        <Button
                            variant="success"
                            className="m-1"
                            onClick={() => {
                                editTask({status:"done", _id:task._id})
                            }
                            }
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faCheck}/>
                        </Button> :
                        <Button
                            variant="secondary"
                            className="m-1"
                            onClick={() => {
                                editTask({status:"active",_id:task._id})
                            }
                            }
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faRedo}/>
                        </Button>
                    }
                    <Button
                        variant="warning"
                        className="m-1"
                        onClick={() => {
                            onEdit(task)
                        }
                        }
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button
                        variant="danger"
                        className="m-1"
                        onClick={() => deleteTask(task._id)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    selectedTasks: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
};
const mapDispatchToProps = {
    deleteTask: deleteTask,
    editTask:editTask
}

export default connect(null, mapDispatchToProps)(Task);