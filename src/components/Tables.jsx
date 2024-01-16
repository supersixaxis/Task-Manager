import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import {produce} from 'immer'
import { useSelector } from 'react-redux';
import { showMessage } from '../utils/MessageUtils';
function Tables() {
  const tablesList = useSelector((state) => state.table.tablesList);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'titre de ma tache',
      tableId: tablesList[0].id,
    },
    {
      id: '2',
      title: 'titre de ma tache 2',
      tableId: tablesList[1].id,
    },
  ]);


  const addTaskTable = (tableId, taskContent) => {
    if (taskContent == '') {
      showMessage('Veuillez remplir le nom de votre tâche !', 'error');
      return;
    }
    let nt = produce(tasks, function (tasksDraft) {
      let newTask = {
        id: uuidv4(),
        title: taskContent,
        tableId: tableId,
      };
      tasksDraft.push(newTask);
    });
    setTasks(nt);
    showMessage('Tâche ajoutée avec succès !', 'success');
  };

const deleteTask = (taskId) => {
  setTasks(
    produce((draft) => {
      return draft.filter((task) => task.id !== taskId);
    })
  );
  showMessage('Tâche supprimée avec succès !', 'success');
};
  const handleTaskDrop = (droppedTask, newTableId) => {
    const updatedTask = { ...droppedTask, tableId: newTableId };
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };
  const editTask = (taskId, newTitle) => {
    setTasks(
      produce((draft) => {
        const taskIndex = draft.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          draft[taskIndex].title = newTitle;
        }
      })
    );
    showMessage('Tâche modifiée avec succès !', 'success');
  };

  return (
    <div className="tablesContainer">
      <AddTableForm />
      <SelectTableDelete  tables={tablesList} />
    
      <div className="tablesListContainer">
      {tablesList.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((table, index) => (
       <Table
       key={index}
       table={table}
       tasks={tasks}
       deleteTask={deleteTask}
       onTaskDrop={handleTaskDrop}
       onDragStart={(e, task) => {
         e.dataTransfer.setData('taskId', task.id);   
       }}
       editTask={editTask}
       addTaskTable={(tableId, newTask) => addTaskTable(tableId, newTask)}
      
          />
        ))}
      </div>
    </div>
  );
}

export default Tables;
