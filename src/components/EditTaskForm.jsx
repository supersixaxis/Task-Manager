import React, { useState } from 'react';
import { editTask } from '../redux/task/TaskSlice';
import { store } from '../redux/store';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EditTaskForm({ initialTitle, taskId, setIsEditing }) {
  const [editedTaskTitle, setEditedTaskTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);
  const [editedSpaceColor, setEditedSpaceColor] = useState('');
  const [open, setOpen] = useState(true); // Ajout de la variable d'état open

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(editTask({ taskId, newTitle: editedTaskTitle, color: editedSpaceColor }));
    setIsEditing(false);
    setPopinVisible(false);
    setOpen(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    setPopinVisible(false);
    setOpen(false); 
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isPopinVisible && (
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editer la tâche
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Changer le titre de la tâche
            </Typography>
            <input
              type="text"
              placeholder="Editer la tâche"
              value={editedTaskTitle}
              onChange={(e) => setEditedTaskTitle(e.target.value)}
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Changer la couleur de la tâche
            </Typography>
            <input
              type="color"
              value={editedSpaceColor}
              onChange={(e) => setEditedSpaceColor(e.target.value)}
            />
            <button type="submit">Enregistrer</button>
          </form>
        </Box>
      )}
    </Modal>
  );
}
