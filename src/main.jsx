import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import {BrowserRouter} from 'react-router-dom'
import { store } from './redux/Store.js'
import { Provider } from 'react-redux'

const request = indexedDB.open('task-managerDB', 2)

request.onupgradeneeded = function(event) {

  let db = event.target.result
  let spaceStore = db.createObjectStore('space', {keyPath: "id"})
  let tableStore = db.createObjectStore('table', {keyPath: "id"})
  let taskStore = db.createObjectStore('task', {keyPath: "id"})



  if(localStorage.getItem('spaces') !== null && localStorage.getItem('spaces') !== ''){
    let spaces = []
    spaces = JSON.parse(localStorage.getItem('spaces'))

    for(let space of spaces){
      spaceStore.put({
        id: space.id,
        title: space.title,
        color: space.color
      })
    }    
  }



  if(localStorage.getItem('tables') !== null && localStorage.getItem('tables') !== ''){
    let tables = []

    tables = JSON.parse(localStorage.getItem('tables'))

    for(let table of tables){
      tableStore.put({
        id: table.id,
        title: table.title,
        order: table.color,
        spaceId: table.spaceId
      })
    }    
  }




  if(localStorage.getItem('tasks') !== null && localStorage.getItem('tasks') !== ''){
    let tasks = []
    tasks = JSON.parse(localStorage.getItem('tasks'))

    for(let task of tasks){
      taskStore.put({
        id: task.id,
        content: task.content,
        idTable: task.idTable
      })
    }    
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
