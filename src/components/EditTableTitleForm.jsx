import React, { useState } from 'react';
import { editTableTitle } from '../redux/table/TableSlice';
import { store } from '../redux/Store';
import { showMessage } from '../utils/MessageUtils.js'
import { updateTableAPI } from '../api/TableAPI'
import '../styles/tables.css'
import { useParams } from 'react-router-dom'
export default function EditTableForm({  initialTitle, initialColor, tableId, setIsEditingTitle }) {
  const [editedTabTitle, setEditedTabTitle] = useState(initialTitle);
  const [isPopinVisible, setPopinVisible] = useState(true);
  const [editedSpaceColor, setEditedSpaceColor] = useState(initialColor);
  const { id } = useParams()
  const order = 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTableAPI(tableId,editedTabTitle, id, order, editedSpaceColor)
   
    store.dispatch(
      editTableTitle({ id: tableId, newTitle: editedTabTitle, newColor: editedSpaceColor })
    );
    showMessage('Tableau modifié avec succès !', 'success');
    setIsEditingTitle(false)
    setPopinVisible(false);
  };

  return (
    <div className='editTableContainer'>
      {isPopinVisible && (
        <div className='editTableContent'>
        <form onSubmit={handleSubmit}>
          <label>Editer le tableau</label>
          <input
            type="text"
            placeholder="Editer la tâche"
            value={editedTabTitle}
            onChange={(e) => setEditedTabTitle(e.target.value)}
          />
           <label>Choisir une couleur</label>
              <input
                type='color'
                value={editedSpaceColor}
                onChange={(e) => setEditedSpaceColor(e.target.value)}
              />
          <button type="submit">Enregistrer</button>
        </form>
        </div>
      )}
    </div>
  );
}