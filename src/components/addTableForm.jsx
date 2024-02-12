import React, { useState } from 'react';
import { store } from '../redux/store';
import { addTable } from '../redux/table/TableSlice';
import { showMessage } from '../utils/MessageUtils.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from './styleModal';
import { v4 as uuidv4 } from 'uuid';

const AddTableForm = ({ spaceId }) => {
  const [isPopinVisible, setPopinVisible] = useState(false);
  const [newTableTitle, setNewTableTitle] = useState('');
  const [editedSpaceColor, setEditedSpaceColor] = useState('');
  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTableTitle.trim() === '') {
      showMessage('Veuillez remplir le nom de votre tableau !', 'error');
      return;
    }
   
    const newTable = {
      id: uuidv4(),
      title: newTableTitle,
      spaceId: parseInt(spaceId),
      color: editedSpaceColor,
    };
    store.dispatch(addTable(newTable)); 
    setNewTableTitle('');
    setEditedSpaceColor('');
    setPopinVisible(false);
    showMessage('Tableau ajouté avec succès !', 'success');
  };

  const handleClose = () => {
    setPopinVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Ajouter un tableau</button>
      <Modal
        open={isPopinVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleFormSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Nouveau tableau
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Titre du tableau :
            </Typography>
            <input
              type="text"
              value={newTableTitle}
              onChange={(e) => setNewTableTitle(e.target.value)}
            />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Couleur du tableau :
            </Typography>
            <input
              type="color"
              value={editedSpaceColor}
              onChange={(e) => setEditedSpaceColor(e.target.value)}
            />
            <button type="submit">Ajouter</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTableForm;

