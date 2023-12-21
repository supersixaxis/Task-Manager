import React, { useState } from 'react';

export default function EditTaskForm({  initialTitle, onEditComplete }) {
  const [editedTaskTitle, setEditedTaskTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditComplete(editedTaskTitle);
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