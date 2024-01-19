import React, { useState } from 'react';
import { store } from '../redux/store';
import { addTable } from '../redux/table/TableSlice';
import { showMessage } from '../utils/MessageUtils.js';
import { v4 as uuidv4 } from 'uuid';
const AddTableForm = ({ spaceId }) => {
  const [isPopinVisible, setPopinVisible] = useState(false);
  const [newTableTitle, setNewTableTitle] = useState('');

  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newTableTitle.trim() === '') {
      showMessage('Veuillez remplir le nom de votre tableau !', 'error');
      return;
    }

    store.dispatch(addTable({ id: uuidv4(), title: newTableTitle, spaceId: parseInt(spaceId) }));
    showMessage('Tableau ajouté avec succès !', 'success');
    setNewTableTitle('');
    setPopinVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Ajouter un tableau</button>

      {isPopinVisible && (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label>Nouveau tableau :</label>
            <input
              type="text"
              value={newTableTitle}
              onChange={(e) => setNewTableTitle(e.target.value)}
            />
            <button type="submit">Ajouter</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTableForm;
