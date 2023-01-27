import React from 'react'
import Button from '../Button'

const Todo = () => {
    return (
        <div style={{ display: "flex", backgroundColor: "", padding: "1rem", gap: "10px", width: "", justifyContent: "center" }}>
            <div style={{ width: "", backgroundColor: "", textAlign: "left", textOverflow: "", overflowWrap: "break-word" }}>
                <h3>Read Books</h3>
            </div>
            <div style={{ width: "", textAlign: "left" }}>
                <Button name="Edit" />
                <Button name="Delete" />
            </div>
        </div>
    )
}

export default Todo