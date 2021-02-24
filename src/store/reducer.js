const initialState = {
    tasks: [],
    showNewTask: false,
    showConfirm: false,
    showEdit:false,
    loading:false,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "GET_TASKS": {
            return {
                ...state,
                tasks: action.tasks,
                loading: false,
            }
        }
        case "ADD_TASK": {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
                showNewTask: true,
                loading: false,
            }
        }
        case "PENDING": {
            return {
                ...state,
                showNewTask: false,
                showConfirm:false,
                showEdit:false,
                loading: true

            }
        }

        case "DELETE_TASK": {
            const filteredTask = state.tasks.filter(task => action.taskId !== task._id);
            return {
                ...state,
                tasks: filteredTask,
                loading: false,
            }
        }

        case  "DELETESELECTED_TASKS": {

            const removeSelectedTasks = state.tasks.filter(task => {
                return !action.selectedTasks.has(task._id)
            });
            return {
                ...state,
                tasks: removeSelectedTasks,
                showConfirm: true,
                loading: false,
            }
        }


        case "EDIT_TASK": {
            const tasksArr = state.tasks.map((task) => {
                if (task._id !== action.editedTask._id) {
                    return task;
                }
                return action.editedTask;
            })
            return {
                ...state,
                tasks: tasksArr,
                showEdit:true,
                loading: false,
            }
        }

        default:
            return state

    }

}
