import React, { useState } from 'react';
import { editTask } from '../redux/task/TaskSlice';
import { store } from '../redux/Store';
export default function EditTaskForm({  initialTitle, taskId, setIsEditing}) {
  const [editedTaskTitle, setEditedTaskTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(editTask({ taskId, newTitle: editedTaskTitle  }));
    setIsEditing(false)
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