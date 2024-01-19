import React, { useState } from 'react';
import { deleteTable } from '../redux/table/TableSlice';
import { showMessage } from '../utils/MessageUtils.js';
import { store } from '../redux/Store';
const SelectTableDelete = ({ tables }) => {
  const [idTableSelected, setIdTableSelected] = useState(0);
  const [isPopinVisible, setPopinVisible] = useState(false);

  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };

  const handleDeleteTable = () => {
    if (idTableSelected.toString() === '0') {
      showMessage('Veuillez sélectionner un tableau à supprimer', 'error');
      return;
    }
    store.dispatch(deleteTable(idTableSelected));
    showMessage('Tableau supprimé !', 'success');
    setIdTableSelected(0);
    setPopinVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Supprimer un tableau</button>
      {isPopinVisible && (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Supprimer un tableau</label>
          <select value={idTableSelected} onChange={(e) => setIdTableSelected(e.target.value)}>
            <option value={0}>---</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.title}
              </option>
            ))}
          </select>
          <button onClick={handleDeleteTable}>Delete</button>
        </form>
      )}
    </div>
  );
};

export default SelectTableDelete;
