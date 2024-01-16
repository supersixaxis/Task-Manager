import React, { useState } from 'react';
import { editTableTitle } from '../redux/table/TableSlice';
import { store } from '../redux/Store';
import { showMessage } from '../utils/MessageUtils'

export default function EditTaskForm({  initialTitle, tableId, setIsEditingTitle }) {
  const [editedTabTitle, setEditedTabTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(editTableTitle({ id : tableId, newTitle: editedTabTitle  }));
    showMessage('Tableau modifié avec succès !', 'success');
    setIsEditingTitle(false)
    setPopinVisible(false);
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