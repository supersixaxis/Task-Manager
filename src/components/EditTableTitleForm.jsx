import React, { useState } from 'react';
import { showMessage } from '../utils/MessageUtils';
export default function EditTaskForm({  initialTitle, onEditComplete }) {
  const [editedTabTitle, setEditedTabTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditComplete(editedTabTitle);
    setPopinVisible(false);
    showMessage('Tableau modifié avec succès !', 'success');
  };

  return (
    <div>
      {isPopinVisible && (
        <form onSubmit={handleSubmit}>
          <label>Editer le tableau</label>
          <input
            type="text"
            placeholder="Editer la tâche"
            value={editedTabTitle}
            onChange={(e) => setEditedTabTitle(e.target.value)}
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </div>
  );
}