import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tables.css';
import Table from './table';
import AddTableForm from './addTableForm';
import SelectTableDelete from './SelectTableDelete';

function Tables() {
  const [tablesList, setTablesList] = useState([
    {
      id: 1,
      title: 'Projet ressource',
    },
    {
      id: 2,
      title: 'Sujet de la prochaine réunion',
    },
    {
      id: 3,
      title: 'A faire',
    },
    {
      id: 4,
      title: 'En cours',
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedValue) => {
    setSelectedOption(selectedValue);
  };

  const handleDeleteButtonClick = () => {
    if (selectedOption) {
      const updatedTablesList = tablesList.filter((table) => table.id !== selectedOption);
      setTablesList(updatedTablesList);
      setSelectedOption(null);
    }
  };

  const addTable = (newTableTitle) => {
    const newTable = {
      id: uuidv4(),
      title: newTableTitle,
    };
    setTablesList((prevTablesList) => [...prevTablesList, newTable]);
  };

  return (
    <div className="tablesContainer">
      <AddTableForm onAddTable={addTable} />
      <SelectTableDelete
        options={tablesList}
        selectedOption={selectedOption}
        onSelectChange={handleSelectChange}
        onDeleteButtonClick={handleDeleteButtonClick}
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
