import React, { useState, useRef } from 'react'

const TaskLists = (props) => {
    const { tasks, actions } = props

    return (
        <>
            {/* <ul style={styles.tasksWrapper}>
                {tasks.map(task => {
                    return (<li>{task.task}</li>)
                })
                }
            </ul> */}
            {tasks.map((task, index) => {
                return (
                    <Task key={index} task={task} actions={actions} />
                )
            })}

        </>

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


function Task({ task, actions }) {
    const [isOpen, setIsOpen] = useState(false)

    // console.log(actions)
    const editInputRef = useRef();

    const styles = {
        default: {
            width: "100%",
            fontWeight: "bold",
            fontSize: "1.1rem",
            border: isOpen ? "1px solid" : "none",
            background: isOpen ? "inherit" : "transparent",
            color: "white",
        },
    }
    const activateEdit = () => {
        console.log("Activated Edit")
        setIsOpen(true);
    }
    const editTask = () => {
        console.log("Editing Task")
        const updatedTask = { ...task, task: editInputRef.current.value }
        actions.update(task.doc_id, updatedTask);
        setIsOpen(false)

    }
    const closeEdit = () => {
        setIsOpen(false)
        editInputRef.current.value = task.task
    }

    let updateTask = isOpen ? editTask : activateEdit;

    return (
        <div>
            <input ref={editInputRef} style={styles.default} type="text" defaultValue={task.task} disabled={!isOpen} />
            <button onClick={updateTask}>{isOpen ? "Edit Now" : "Edit"}</button>
            {isOpen ? <button onClick={closeEdit}>Cancel</button> : ""}
        </div>
    )
}