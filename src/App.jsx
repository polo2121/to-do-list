import { useState } from 'react'
import './App.css'

import { TodoLists, TodoInsert } from './components/todo-list'




function App() {
  return (
    <div className="App">
      <TodoInsert />
      <TodoLists />
    </div>
  )
}

export default App
