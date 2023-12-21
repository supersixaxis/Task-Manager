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
    const updatedTask = { ...droppedTask, tableId: newTableId };
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };
  const editTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };
  const editTableTitle = (taskId, newTitle) => {
    const updatedTab = tablesList.map((table) =>
      table.id === taskId ? { ...table, title: newTitle } : table
    );
    setTablesList(updatedTab);
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
            editTask={editTask}
            editTableTitle={editTableTitle}
  
          />
        ))}
      </div>
    </div>
  );
}

export default Tables;
