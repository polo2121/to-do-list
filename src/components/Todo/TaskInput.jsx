import React, { useEffect, useRef, useState } from 'react'
import { serverTimestamp } from "firebase/firestore"


const TaskInput = (props) => {

    const { onCreate } = props;
    const [inputError, setInputError] = useState("")
    const [success, setSuccess] = useState(false)

    const taskInputRef = useRef();
    const submitBtnRef = useRef();

    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => {
                setSuccess(false)
                console.log("this run")
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [success])

    class noInputDetect extends Error { };

    const createTaskCompose = (...fns) => x => fns.reduceRight((arg, fn) => fn(arg), x);

    const getTask = (inputRef) => {
        console.log(inputRef.current.value)
        return inputRef.current.value
    }
    const validateInput = (value) => {
        if (value === "") throw new noInputDetect("Please enter something....")
        return value;

    }
    const createTask = (value) => {
        console.log(value)
        let newTask = { task_id: crypto.randomUUID(), task: value, created: serverTimestamp() }
        // onCreate(newTask);
        return "successful"
    }

    const notifySuccess = () => {
        setSuccess(true);
    }

    const clearInput = () => {
        taskInputRef.current.value = "";
        setInputError("");
    }
    // const validateInput = () => {
    //     return !taskInputRef.current.value ? false : true;
    // }

    // const getTaskFromInput = () => {
    //     submitBtnRef.current.setAttribute("disabled", true);
    //     let isValid = validateInput();
    //     if (isValid) {
    //         let taskInput = taskInputRef.current;
    //         let newTask = { task_id: crypto.randomUUID(), task: taskInput.value, created: serverTimestamp() }
    //         onCreate(newTask);
    //         taskInput.value = '';
    //         submitBtnRef.current.removeAttribute("disabled");
    //     }
    //     else {
    //         console.log("write properply")
    //         submitBtnRef.current.removeAttribute("disabled");
    //     }

    // }

    const startProcess = () => {
        try {
            // clearPreviousRemain();
            submitBtnRef.current.setAttribute("disabled", true);
            createTaskCompose(clearInput, notifySuccess, createTask, validateInput, getTask)(taskInputRef)

        } catch (error) {
            (error instanceof noInputDetect) ? setInputError(error.message) : console.log(error.message)
        }
        finally {
            submitBtnRef.current.removeAttribute("disabled");

        }
    }

    return (
        <>
            <input ref={taskInputRef} type="text" placeholder='e.g. read 5 books per day.' />
            <button ref={submitBtnRef} onClick={startProcess}>Add Task</button>
            {
                success ? <div style={{ position: "absolute", color: "green", top: "2vw", right: "10vw" }}>Insertion Success</div> : null
            }
            {inputError && <p>{inputError}</p>}
        </>
    )
}

export default TaskInput