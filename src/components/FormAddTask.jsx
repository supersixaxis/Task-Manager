import { useState } from 'react';
import { store } from '../redux/store';
import { addTask } from '../redux/task/TaskSlice';
import { showMessage } from '../utils/MessageUtils.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from './styleModal';
import { addTaskAPI } from '../api/TaskApi.js'
export default function FormAddTask({ tableId }) {
  const [newTableTask, setNewTableTask] = useState('');
  const [isPopinVisible, setPopinVisible] = useState(false);
  const [editedSpaceColor, setEditedSpaceColor] = useState('');
  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTableTask.trim() === '') {
      showMessage('Veuillez remplir le nom de votre tâche !', 'error');
      return;
    }
    addTaskAPI(newTableTask, tableId, editedSpaceColor)
    store.dispatch(addTask({ tableId, taskContent: newTableTask, color : editedSpaceColor  }));
    showMessage('Tâche ajoutée avec succès !', 'success');
    setNewTableTask('');
    setPopinVisible(false);
  };
  const handleClose = () => {
    setPopinVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Ajouter une tâche</button>
      <Modal open={isPopinVisible} onClose={handleClose}>
  <div>
    {isPopinVisible && (
     <Box sx={style}>
        <form onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
             Ajouter une tâche au tableau
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Titre de la tâche :
            </Typography>
          <input
            type="text"
            value={newTableTask}
            placeholder="Nom de la tâche"
            onChange={(e) => setNewTableTask(e.target.value)}
          />
             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Couleur de la tache :
            </Typography>
            <input
              type="color"
              value={editedSpaceColor}
              onChange={(e) => setEditedSpaceColor(e.target.value)}
            />
          <button type="submit">Ajouter une tâche</button>
        </form>
      </Box>
    )}
  </div>
</Modal>

    </div>
  );
}
