import * as actionTypes from "./actionTypes";
import {request} from "../helpers/request";
import {history} from "../helpers/history"
import {saveToken} from "../helpers/Auth/saveToken";
import {requestWithoutToken} from "../helpers/Auth/requestWithoutToken";
import {getQuery} from "../helpers/utils";

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
    const query = (typeof params === "string") ? params : getQuery(params);

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                if (!tasks) return;
                dispatch({type: actionTypes.GET_TASKS, tasks});

            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};


export function getTask(taskId) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task/${taskId}`,)
            .then((task) => {
                if (!task) return;
                dispatch({type: actionTypes.GET_TASK, task});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};


export function deleteSelectedTasks(selectedTasks) {

    return (dispatch) => {
        const tasks = Array.from(selectedTasks);
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task/`, "PATCH", {tasks})
            .then((taska) => {
                if (!tasks) return;
                dispatch({type: actionTypes.DELETESELECTED_TASKS, selectedTasks});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};


export function deleteTask(taskId, from) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task/${taskId}`, "DELETE")
            .then((task) => {
                if (!task) return;
                dispatch({type: actionTypes.DELETE_TASK, taskId, from});
                if (from === "singleTask") {
                    history.push("/");
                }
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};


export function addTask(newTask) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task`, "POST", newTask)
            .then((task) => {
                if (!task) return;
                dispatch({type: actionTypes.ADD_TASK, newTask: task});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};

export function editTask(data, from) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${data._id}`, "PUT", data)
            .then((editedTask) => {
                if (!editedTask) return;
                dispatch({type: actionTypes.EDIT_TASK, editedTask, from, status: data.status});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};


export function sendMessage(values) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        requestWithoutToken(`${apiHost}/form`, "POST", values)
            .then(() => {
                dispatch({type: actionTypes.SEND_MESSAGE});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};


export function register(data) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        requestWithoutToken(`${apiHost}/user`, "POST", data)
            .then(() => {
                dispatch({type: actionTypes.REGISTER_SUCCESS});
                history.push("/login");
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};

export function login(data) {

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING});
        requestWithoutToken(`${apiHost}/user/sign-in`, "POST", data)
            .then((res) => {
                saveToken(res);
                dispatch({type: actionTypes.LOGIN_SUCCESS});
                history.push("/");
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};

export function getUserInfo() {

    return (dispatch) => {
        request(`${apiHost}/user`, "GET")
            .then((user) => {
                if (!user) return;
                dispatch({type: actionTypes.GETUSERINFO_SUCCESS, user});
            })
            .catch((error) => dispatch({type: actionTypes.ERROR, error: error.message}));
    }
};