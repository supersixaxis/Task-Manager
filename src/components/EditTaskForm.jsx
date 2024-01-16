import React, { useState } from 'react';
import { editTask } from '../redux/task/TaskSlice';
import { store } from '../redux/Store';
export default function EditTaskForm({  initialTitle, taskId}) {
  const [editedTaskTitle, setEditedTaskTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task ID:', taskId);
    console.log('Edited Task Title:', editedTaskTitle);
    store.dispatch(editTask({ taskId, newTitle: editedTaskTitle  }));
    setPopinVisible(false);
  };


  return (
    <div>
      {isPopinVisible && (
        <form onSubmit={handleSubmit}>
          <label>Editer la tâche</label>
          <input
            type="text"
            placeholder="Editer la tâche"
            value={editedTaskTitle}
            onChange={(e) => setEditedTaskTitle(e.target.value)}
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </div>
  );
}