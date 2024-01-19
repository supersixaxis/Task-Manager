import React, { useState } from 'react';
import { store } from '../redux/Store';
import { addSpace } from '../redux/space/SpaceSlice';
import { showMessage } from '../utils/MessageUtils.js';
import { v4 as uuidv4 } from 'uuid';
const AddSpaceForm = ({  }) => {
  const [isPopinVisible, setPopinVisible] = useState(false);
  const [newSpaceTitle, setNewSpaceTitle] = useState('');
  const [editedSpaceColor, setEditedSpaceColor] = useState("");
  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (newSpaceTitle.trim() === '') {
      showMessage('Veuillez remplir le nom de votre espace de travail !', 'error');
      return;
    }
  
    store.dispatch(addSpace({ id: uuidv4(), title: newSpaceTitle, color: editedSpaceColor }));
    showMessage('Espace de travail ajouté avec succès !', 'success');
    setNewSpaceTitle('');
    setPopinVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Ajouter un espace de travail</button>
 
      {isPopinVisible && (
               <div className='addSpaceContainer'>
            <div className='addSpaceContent'>  

          <form onSubmit={handleFormSubmit}>
            <label>Nouvelle espace de travail :</label>
            <input
              type="text"
              value={newSpaceTitle}
              onChange={(e) => setNewSpaceTitle(e.target.value)}
            />
             <label>Choisir une couleur</label>
              <input
                type='color'
                value={editedSpaceColor}
                onChange={(e) => setEditedSpaceColor(e.target.value)}
              />
            <button type="submit">Ajouter</button>
          </form> 
          </div>
          </div>
      )}
      
    </div>
  );
};

export default AddSpaceForm;
