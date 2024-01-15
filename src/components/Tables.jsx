import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tables.css';
import Table from './Table';
import AddTableForm from './AddTableForm';
import SelectTableDelete from './SelectTableDelete';
import Message from './Message';
import {produce} from 'immer'
function Tables() {
  const [tablesList, setTablesList] = useState([
    {
      id: '1',
      title: 'Projet ressource',
      order: 1
    },
    {
      id: '2',
      title: 'Sujet de la prochaine réunion',
      order: 2
    },
    {
      id: '3',
      title: 'A faire',
      order: 3
    },
    {
      id: '4',
      title: 'En cours',
      order: 4
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

  const moveTable = (id_table_drag, order_table_drag, id_table_drop, order_table_drop) => {

    let newTables = [...tablesList]

    for(let table of newTables){

        // Si l'order du tableau de drop est suppérieur à l'order du tableau de drag

        if(Number(order_table_drop > Number(order_table_drag))){
            // le tableau qui a l'id id_table_drag prend le order order_table_drop
            // Les tableaux d'order inférieur à order_table_drop et supérieur à order_table_drag on leur order qui fait -1
            if(table.id.toString() === id_table_drag.toString()){
                table.order = Number(order_table_drop)
            }else if(table.id.toString() === id_table_drop.toString()){
                table.order = table.order - 1
            }else if(Number(table.order) < Number(order_table_drop) && Number(table.order) > Number(order_table_drag)){
                table.order = table.order - 1
            }
            // Si l'order du tableau de drop est inférieur à l'order du tableau de drag          
        }else if(Number(order_table_drop < Number(order_table_drag))){
            // le tableau qui a l'id id_table_drag prend le order order_table_drop
            // Les tableaux d'order suppérieur à order_table_drop et inférieur à order_table_drag on leur order qui fait -1
            if(table.id.toString() === id_table_drag.toString()){
                table.order = Number(order_table_drop)
            }else if(table.id.toString() === id_table_drop.toString()){
                table.order = table.order + 1
            }else if(Number(table.order) > Number(order_table_drop) && Number(table.order) < Number(order_table_drag)){
                table.order = table.order + 1
            }  
        }

    }

    setTablesList(newTables)

}

  const addTable = (newTableTitle) => {
    if (newTableTitle.trim() === '') {
      displayMessage('error', 'Veuillez remplir le titre de la table.');
      return;
    }
    const newTable = {
      id: uuidv4(),
      title: newTableTitle,
      order: tablesList.length + 1
    };
    setTablesList((prevTablesList) => [...prevTablesList, newTable]);
    displayMessage('success', 'Table ajoutée avec succès.');
  };

  const deleteTable = (id) => {
    const newTable = tablesList.filter(
      (table) => table.id.toString() !== id.toString()
    );
    setTablesList(newTable);
    displayMessage('success', 'Table supprimée avec succès.');
  };
  
  const addTaskTable = (tableId, taskContent) => {
    if (taskContent.trim() === '') {
      displayMessage('error', 'Veuillez remplir le titre de la tâche.');
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
    displayMessage('success', 'Tâche ajoutée avec succès.');
  };

const deleteTask = (taskId) => {
  setTasks(
    produce((draft) => {
      return draft.filter((task) => task.id !== taskId);
    })
  );
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
  };

  const editTableTitle = (taskId, newTitle) => {
    const updatedTab = tablesList.map((table) =>
      table.id === taskId ? { ...table, title: newTitle } : table
    );
    setTablesList(updatedTab);
  };

  const [message, setMessage] = useState(null);

  const displayMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => {
      setMessage(null);
    }, 3000); // Supprime le message après 3 secondes
  };

  return (
    <div className="tablesContainer">
      <AddTableForm onAddTable={addTable} />
      <SelectTableDelete deleteTable={deleteTable} tables={tablesList} />
      {message && <Message type={message.type} content={message.content} />}
      <div className="tablesListContainer">
        {tablesList.sort((a, b)=> (a.order > b.order ? 1 : -1)).map((table, index) => (
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
            addTaskTable={(tableId, newTask) => addTaskTable(tableId, newTask)}
            moveTable={moveTable}
          />
          
        ))}
      </div>
    </div>
  );
}

export default Tables;
