import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tables.css';
import Table from './table';
import AddTableForm from './addTableForm';
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
  useEffect(() => {
    
  }) 
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "titre de ma tache",
      tableId: tablesList[0].id
    },
    {
      id: "2",
      title: "titre de ma tache 2",
      tableId: tablesList[1].id
    }
    
  ])
  const addTable = (newTableTitle) => {
    const newTable = {
      id: uuidv4(),
      title: newTableTitle,
    };
    setTablesList((prevTablesList) => [...prevTablesList, newTable]);
  };
  const deleteTable = (id) => {
    let newtable = [...tablesList].filter((tab) => tab.id.toString() !== id.toString())
    setTablesList(newtable)
  };
  const addTaskTable = (tableId, newTask) => {
    const newTaskObject = {
      id: uuidv4(),
      title: newTask,
      tableId: tableId,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
  };

  return (
    <div className="tablesContainer">
    <FormAddTask 
    tasks={tasks} 
    tables={tablesList} 
    addTaskTable={addTaskTable} />
      <AddTableForm onAddTable={addTable} />
      <SelectTableDelete
        deleteTable={deleteTable}
        tables={tablesList}
      />
      <div className='tablesListContainer'>
        {tablesList.map((table, index) => (
          <Table key={index} table={table} tasks={tasks} />
        ))}
      </div>
    </div>
  );
}

export default Tables;
