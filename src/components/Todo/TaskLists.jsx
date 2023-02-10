import React from 'react'

const TaskLists = (props) => {
    const { tasks } = props
    console.log(tasks)
    return (
        <ul style={styles.tasksWrapper}>
            {tasks.map(task => {
                return (<li>{task.task}</li>)
            })
            }
        </ul>
    )
}

const styles = {
    tasksWrapper: {
        width: '30%',
        backgroundColor: "",
        margin: "auto",
    }
}

export default TaskLists