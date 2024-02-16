import React, { useState } from 'react';
import { editTask } from '../redux/task/TaskSlice';
import { store } from '../redux/store';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from './styleModal';
import { updateTaskAPI } from '../api/TaskApi.js'
export default function EditTaskForm({ initialTitle, taskId, setIsEditing, tableId }) {
  const [editedTaskTitle, setEditedTaskTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);
  const [editedSpaceColor, setEditedSpaceColor] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    updateTaskAPI(taskId, editedTaskTitle, tableId, editedSpaceColor)
    store.dispatch(editTask({ taskId, newTitle: editedTaskTitle, color: editedSpaceColor }));
    setIsEditing(false);
    setPopinVisible(false);
  };

  const handleClose = () => {
    setPopinVisible(false);
  };

  return (
    <Modal
      open={isPopinVisible}
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
