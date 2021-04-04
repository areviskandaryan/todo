import {checkLoginStatus} from "../helpers/Auth/checkLoginStatus";

const initialState = {
    tasks: [],
    task: null,
    showNewTask: false,
    showConfirm: false,
    showEdit: false,
    showEditSingleTaskModal: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    isAuthenticated: checkLoginStatus(),
    formSuccess: false,
    user: null
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case  "GETUSERINFO_SUCCESS": {
            return {
                ...state,
                loading: false,
                user: action.user
            };
        }
        case "GET_TASKS": {
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            };
        }
        case "GET_TASK": {
            return {
                ...state,
                task: action.task,
                loading: false
            };
        }
        case "ADD_TASK": {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
                showNewTask: true,
                loading: false,
                successMessage: 'Task created successfully!!!'
            };
        }
        case "PENDING": {
            return {
                ...state,
                showNewTask: false,
                showConfirm: false,
                showEditSingleTaskModal: false,
                showEdit: false,
                loading: true,
                successMessage: null,
                errorMessage: null,
                formSuccess: false
            };
        }

        case "DELETE_TASK": {
            if (action.from === "singleTask") {
                return ({
                    ...state,
                    task: null,
                    loading: false,
                    successMessage: 'Task deleted successfully!!!'
                });
            }
            const filteredTask = state.tasks.filter(task => action.taskId !== task._id);
            return {
                ...state,
                tasks: filteredTask,
                loading: false,
                successMessage: 'Task deleted successfully!!!'
            };
        }

        case  "DELETESELECTED_TASKS": {
            const removeSelectedTasks = state.tasks.filter(task => {
                return !action.selectedTasks.has(task._id);
            });
            return {
                ...state,
                tasks: removeSelectedTasks,
                showConfirm: true,
                loading: false,
                successMessage: 'Tasks deleted successfully!!!'
            };
        }

        case "EDIT_TASK": {
            let successMessage = 'Task edited successfully!!!';
            if (action.status) {
                if (action.status === "active") {
                    successMessage = 'The task is active now!!!';
                } else {
                    successMessage = 'Congrats, you have completed the task!!!';
                }
            }

            if (action.from === "singleTask") {
                return ({
                    ...state,
                    task: action.editedTask,
                    loading: false,
                    showEditSingleTaskModal: true,
                    successMessage: successMessage
                });
            }
            const tasksArr = state.tasks.map((task) => {
                if (task._id !== action.editedTask._id) {
                    return task;
                }
                return action.editedTask;
            });
            return {
                ...state,
                tasks: tasksArr,
                showEdit: true,
                loading: false,
                successMessage: successMessage
            };
        }

        case "SEND_MESSAGE": {
            return {
                ...state,
                loading: false,
                successMessage: 'Your message sent successfully!!!',
                formSuccess: true
            };
        }
        case  "REGISTER_SUCCESS": {
            return {
                ...state,
                loading: false,
                successMessage: 'You have successfully registered!!!'
            };
        }
        case  "LOGIN_SUCCESS": {
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            };
        }

        case  "LOGOUT": {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            };
        }

        case "ERROR": {
            return {
                    ...state,
                    loading: false,
                    errorMessage: action.error
                };
        }

        default:
            return state;
    }

}
