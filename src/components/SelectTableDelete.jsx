import React, { useState } from 'react';



const SelectTableDelete = ({ tables, deleteTable }) => {
  const [idTableSelected, setIdTableSelected] = useState(0)
  return (
    
      <form onSubmit={(e) => {
        e.preventDefault()
        if(idTableSelected.toString() === '0') {
           alert('Veuiller sélectionner un tableau à supprimer')
        }
        deleteTable(idTableSelected)
        setIdTableSelected('0')
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
    
      
  );
};

export default SelectTableDelete;