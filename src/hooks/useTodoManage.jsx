import React, { useReducer, useEffect } from 'react'

import { db } from "../firebase.config"
import { collection, getDocs } from "firebase/firestore"


function todoReducer(tasks, action) {
    switch (action.type) {
        case 'create': {
            console.log(action.newTask)

            return [...tasks, action.newTask]
            // return [...tasks, { id: 12, task: 'this is task 2' }]
        }
        default: throw Error('Unknow Action: ' + action.type)
    }
    // console.log("todo reducer")
}

const useTodoManage = () => {

    const initialValue = [];
    const [tasks, dispatchTodoAction] = useReducer(todoReducer, initialValue)

    function unsubscribe() {
        onSnapshot(
            collection(db, "todos"),
            (snapshot) => {
                snapshot.forEach(shot => {
                    console.log(shot.data())
                })
            },
            (error) => {
                console.log(error)
            });
    }

    async function getTodos() {
        try {

            const todoCollectionRef = collection(db, 'todos')
            const data = await getDocs(todoCollectionRef);
            data.docs.map(doc => {
                initialValue.push({ ...doc.data() })
                console.log(initialValue)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos();
        // return () => unsubscribe();

    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(tasks);

        }, 4000);
        return () => clearTimeout(timer);
    }, []);


    return { tasks }
}

export default useTodoManage



// const [tasks, dispatch] = useReducer(todoReducer, initialValue)
// const taskInputId = useRef();

