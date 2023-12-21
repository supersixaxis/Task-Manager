import React, { useState } from 'react';

const AddTableForm = ({ onAddTable }) => {
  const [isPopinVisible, setPopinVisible] = useState(false);
  const [newTableTitle, setNewTableTitle] = useState('');

  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddTable(newTableTitle);
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