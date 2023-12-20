import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tables.css';
import Table from './table';
import AddTableForm from './addTableForm';
import SelectTableDelete from './SelectTableDelete';

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

  return (
    <div className="tablesContainer">
      <AddTableForm onAddTable={addTable} />
      <SelectTableDelete
        deleteTable={deleteTable}
        tables={tablesList}
      />
      <div className='tablesListContainer'>
        {tablesList.map((table, index) => (
          <Table key={index} table={table} />
        ))}
      </div>
    </div>
  );
}

export default Tables;
