import React, { useState } from 'react';



const SelectTableDelete = ({ tables, deleteTable }) => {
  const [idTableSelected, setIdTableSelected] = useState(0)
  const [isPopinVisible, setPopinVisible] = useState(false);
  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };
  return (
      <div>
          <button onClick={handleButtonClick}>Supprimer un tableau</button>
          {isPopinVisible && (
          <form onSubmit={(e) => {
            e.preventDefault()
            if(idTableSelected.toString() === '0') {
              alert('Veuiller sélectionner un tableau à supprimer')
            }
            deleteTable(idTableSelected)
            setIdTableSelected('0')
            setPopinVisible(false);
          }}>
            <label>Supprimer un tableau</label>
          <select  value={idTableSelected} onChange={(e) => setIdTableSelected(e.target.value)}>
          <option value={0}>---</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.title}
              </option>
            ))}
          </select>
          <button onSubmit={deleteTable}>Delete</button>
        </form>
          )}
      </div>
    
      
  );
};

export default SelectTableDelete;