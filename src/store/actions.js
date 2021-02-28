import * as actionTypes from "./actionTypes";
import {request} from "../helpers/request";
import {history} from "../helpers/history"


export function getTasks() {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request('http://localhost:3001/task')
            .then((tasks) => {
                dispatch({type: actionTypes.GET_TASKS, tasks});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }
};


export function getTask(taskId) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`http://localhost:3001/task/${taskId}`,)
            .then((task) => {
                dispatch({type: actionTypes.GET_TASK, task});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }
};


export function deleteSelectedTasks(selectedTasks) {
    return (dispatch) => {
        const tasks = Array.from(selectedTasks);
        dispatch({type: actionTypes.PENDING})
        request("http://localhost:3001/task/", "PATCH", {tasks})
            .then(() => {
                dispatch({type: actionTypes.DELETESELECTED_TASKS, selectedTasks});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }
};


export function deleteTask(taskId, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`http://localhost:3001/task/${taskId}`, "DELETE")
            .then(() => {
                dispatch({type: actionTypes.DELETE_TASK, taskId, from});
                if(from === "singleTask"){
                    history.push("/")
                }
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }

};


export function addTask(newTask) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request("http://localhost:3001/task", "POST", newTask)
            .then((task) => {
                dispatch({type: actionTypes.ADD_TASK, newTask: task});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }

};

export function editTask(data, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`http://localhost:3001/task/${data._id}`, "PUT", data)
            .then((editedTask) => {
                dispatch({type: actionTypes.EDIT_TASK, editedTask, from});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }

};


