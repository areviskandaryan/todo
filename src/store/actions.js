import * as actionTypes from "./actionTypes";
import {request} from "../helpers/request";


export function getTasks() {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request('http://localhost:3001/task')
            .then((tasks) => {
                dispatch({type: actionTypes.GET_TASKS, tasks});
            });
    }
};


export function deleteSelectedTasks(selectedTasks) {
    return (dispatch) => {
        const tasks = Array.from(selectedTasks);
        dispatch({type: actionTypes.PENDING})
        request("http://localhost:3001/task/", "PATCH", {tasks})
            .then(() => {
                dispatch({type: actionTypes.DELETESELECTED_TASKS, selectedTasks});
            });
    }
};


export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`http://localhost:3001/task/${taskId}`, "DELETE")
            .then(() => {
                dispatch({type: actionTypes.DELETE_TASK, taskId});
            })
    }

};


export function addTask(newTask) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request("http://localhost:3001/task", "POST", newTask)
            .then((task) => {
                dispatch({type: actionTypes.ADD_TASK, newTask: task});
            })
    }

};

export function editTask(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`http://localhost:3001/task/${data._id}`, "PUT", data)
            .then((editedTask) => {
                dispatch(   {type:actionTypes.EDIT_TASK,editedTask});
            });
    }

};