import React, { useState } from 'react';
import { deleteTable } from '../redux/table/TableSlice';
import { showMessage } from '../utils/MessageUtils.js';
import { store } from '../redux/store.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from './styleModal';
import { deleteTablesAPI } from '../api/TableApi.js'
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
    deleteTablesAPI(idTableSelected)
    store.dispatch(deleteTable(idTableSelected));
    const existingTables = JSON.parse(localStorage.getItem('tables')) || [];
    const updatedTables = existingTables.filter(table => table.id !== idTableSelected);
    localStorage.setItem('tables', JSON.stringify(updatedTables));
    showMessage('Tableau supprimé !', 'success');
    setIdTableSelected(0);
    setPopinVisible(false);
  };
  const handleClose = () => {
    setPopinVisible(false);
  };
  return (
    <div>
      <button onClick={handleButtonClick}>Supprimer un tableau</button>
      <Modal open={isPopinVisible} onClose={handleClose}>
        <div>
      {isPopinVisible && (
        <Box sx={style}>
        <form onSubmit={(e) => e.preventDefault()}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Supprimer un tableau
          </Typography>
    
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
        </Box>
      )}
      </div>
      </Modal>
    </div>
  );
};

export default SelectTableDelete;
