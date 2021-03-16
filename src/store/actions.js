import * as actionTypes from "./actionTypes";
import {request} from "../helpers/request";
import {history} from "../helpers/history"

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params={}) {
    const query = Object.entries(params).map(([key,value])=>`${key}=${value}`).join("&");
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})

        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({type: actionTypes.GET_TASKS, tasks});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }
};


export function getTask(taskId) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${taskId}`,)
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
        request(`${apiHost}/task/`, "PATCH", {tasks})
            .then(() => {
                dispatch({type: actionTypes.DELETESELECTED_TASKS, selectedTasks});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }
};


export function deleteTask(taskId, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${taskId}`, "DELETE")
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
        request(`${apiHost}/task`, "POST", newTask)
            .then((task) => {
                dispatch({type: actionTypes.ADD_TASK, newTask: task});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }

};

export function editTask(data, from) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${data._id}`, "PUT", data)
            .then((editedTask) => {
                dispatch({type: actionTypes.EDIT_TASK, editedTask, from, status:data.status});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }

};


export function sendMessage(values) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/form`, "POST", values)
            .then(() => {
                dispatch({type: actionTypes.SEND_MESSAGE});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}))
    }

};