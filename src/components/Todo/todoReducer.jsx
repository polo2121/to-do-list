export const intialState = {
    loading: true,
    taskLists: [],
    error: false
}

export function todoReducer(tasks, action) {
    console.log(action)
    try {
        switch (action.type) {
            case 'loading_start': {
                return { ...tasks, loading: true, error: false }
            }
            case "loading_success": {
                return { ...tasks, loading: false, error: false }
            }
            case "loading_error": {
                return { ...tasks, loading: false, error: true }
            }
            case "loaded": {
                console.log(action.payload)
                return { ...tasks, loading: false, taskLists: action.payload, error: false }
            }
            case 'create': {
                let newTask = action.payload
                return { ...tasks, loading: false, taskLists: [...tasks.taskLists, newTask], error: false }

            }
            case 'update': {
                console.log("updating")
                const updatedTask = action.payload;
                const todoLists = [...tasks.taskLists];
                const taskIndex = todoLists.findIndex(task => {
                    return task.doc_id === updatedTask.doc_id
                })
                todoLists[taskIndex] = updatedTask
                return { ...tasks, loading: false, taskLists: todoLists, error: false }
            }
            default: throw Error('Unknow Action: ' + action.type)
        }
    } catch (error) {

        return { ...tasks, loading: false, error: true }
    }

    // console.log("todo reducer")
}