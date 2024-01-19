import React, { useState } from 'react';
import { editSpaceTitle } from '../redux/space/SpaceSlice';
import { store } from '../redux/Store';
import { showMessage } from '../utils/MessageUtils.js'

export default function EditSpaceTitleForm({  initialTitle, spaceId,  initialColor, setIsEditingSpaceTitle }) {
    const [editedSpaceTitle, setEditedSpaceTitle] = useState(initialTitle);
    const [isPopinVisible, setPopinVisible] = useState(true);
    const [editedSpaceColor, setEditedSpaceColor] = useState(initialColor);
    const handleSubmit = (e) => {
        e.preventDefault();
        store.dispatch(
          editSpaceTitle({ id: spaceId, newTitle: editedSpaceTitle, newColor: editedSpaceColor })
        );
        showMessage('Projet modifié avec succès !', 'success');
        setIsEditingSpaceTitle(false)
        setPopinVisible(false);
      };
      return (
        <div className='editSpaceContainer'>
          {isPopinVisible && (
            <div className='editSpaceContent'> 
            <form onSubmit={handleSubmit}>
              <label>Editer le projet</label>
              <input
                type='text'
                placeholder='Editer la tâche'
                value={editedSpaceTitle}
                onChange={(e) => setEditedSpaceTitle(e.target.value)}
              />
              <label>Choisir une couleur</label>
              <input
                type='color'
                value={editedSpaceColor}
                onChange={(e) => setEditedSpaceColor(e.target.value)}
              />
              <button type='submit'>Enregistrer</button>
            </form>
            </div>
          )}
        </div>
      );
}
