// Tables.jsx
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import FormAddTask from './FormAddTask';

function Tables() {
  const [tablesList, setTablesList] = useState([
    {
      id: '1',
      title: 'Projet ressource',
    },
    {
      id: '2',
      title: 'Sujet de la prochaine réunion',
    },
    {
      id: '3',
      title: 'A faire',
    },
    {
      id: '4',
      title: 'En cours',
    },
  ]);

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

  useEffect(() => {
    // ...
  }, []);

  const addTable = (newTableTitle) => {
    const newTable = {
      id: uuidv4(),
      title: newTableTitle,
    };
    setTablesList((prevTablesList) => [...prevTablesList, newTable]);
  };

  const deleteTable = (id) => {
    const newTable = tablesList.filter(
      (table) => table.id.toString() !== id.toString()
    );
    setTablesList(newTable);
  };

  const addTaskTable = (tableId, newTask) => {
    const newTaskObject = {
      id: uuidv4(),
      title: newTask,
      tableId: tableId,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleTaskDrop = (droppedTask, newTableId) => {
    // Mise à jour du tableauId de la tâche déposée
    const updatedTask = { ...droppedTask, tableId: newTableId };

    // Mise à jour de la liste des tâches
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    // Mise à jour de l'état avec la nouvelle liste de tâches
    setTasks(updatedTasks);
  };

  return (
    <div className="tablesContainer">
      <FormAddTask
        tasks={tasks}
        tables={tablesList}
        addTaskTable={addTaskTable}
      />
      <AddTableForm onAddTable={addTable} />
      <SelectTableDelete deleteTable={deleteTable} tables={tablesList} />
      <div className="tablesListContainer">
        {tablesList.map((table, index) => (
          <Table
            key={index}
            table={table}
            tasks={tasks}
            deleteTask={deleteTask}
            onTaskDrop={handleTaskDrop}
            onDragStart={(e, task) => {
              e.dataTransfer.setData('taskId', task.id);
            }}
  
          />
        ))}
      </div>
    </div>
  );
}

export default Tables;
