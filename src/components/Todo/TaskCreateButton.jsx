import React from 'react'

const TaskCreateButton = (props) => {

    const { action: handleCreateTask } = props

    const newTask = {id: '13323', content: "ref.current.value"}

    return (
        <button onClick={handleCreateTask}>Add</button>
    )
}

export default TaskCreateButton