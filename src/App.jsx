import { useState } from 'react'
import './App.css'
import Todo from './components/Todo/Todo'


function App() {
  return (
    <div className="App">
      {console.log(crypto.randomUUID())}
      <Todo />
    </div>
  )
}

export default App
