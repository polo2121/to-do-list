import React, { useEffect } from 'react'
import { useReducer, useRef, useState } from 'react'
import { db } from "../../firebase.config"
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore"


import { intialState, todoReducer } from "./todoReducer"
import { TaskInput, TaskLists } from "."


const Todo = () => {

    const [{ loading, taskLists, error }, dispatch] = useReducer(todoReducer, intialState)

    useEffect(() => {
        console.log("sss")
        const timer = setTimeout(() => {
            getTodos();
        }, 4000);
        return () => clearTimeout(timer);
        // return () => unsubscribe();

    }, [])

    async function getTodos() {
        try {

            dispatch({ type: "loading_start" })
            const todoCollectionRef = collection(db, 'todos')
            const data = await getDocs(todoCollectionRef);
            let taskLists = []
            data.docs.map(doc => {
                taskLists.push({ ...doc.data(), doc_id: doc.id })
            })
            console.log(taskLists)
            // console.log(loading, error)
            dispatch({ type: "loaded", payload: taskLists })
        } catch (error) {
            dispatch({ type: "loading_error" })
            console.log(error)
        }
    }

    async function createTask(newTask) {
        try {
            const docRef = await addDoc(collection(db, "todos"), newTask);
            dispatch({ type: "create", payload: newTask })

            console.log("Document written with ID: ", docRef);
        } catch (error) {
            dispatch({ type: "loading_error" })
            console.log(error)
        }
    }

    async function updateTask(id, task) {
        try {
            const docRef = doc(db, 'todos', id);
            // Update the timestamp field with the value from the server
            const updateTimestamp = await updateDoc(docRef, task);

        } catch (error) {
            console.log(error);
        }
    }
    if (loading) return <div>loading</div>

    // if (error) {
    //     return <div>Something went wrong</div>
    // }

    return (
        <>
            {console.log(taskLists)}
            <TaskInput onCreate={createTask} />
            <TaskLists key={taskLists.id} tasks={taskLists} />
            {error ? <div>Something wrong. Pls try again.</div> : ""}
        </>
    )
}

export default Todo
