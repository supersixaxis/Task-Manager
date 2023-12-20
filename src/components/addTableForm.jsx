// AddTableForm.jsx
import { useState } from 'react';

const AddTableForm = ({ onAddTable }) => {
  const [newTableTitle, setNewTableTitle] = useState('');

  const handleInputChange = (event) => {
    setNewTableTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTableTitle.trim() !== '') {
      onAddTable(newTableTitle);
      setNewTableTitle('');
    } else alert("Veuiller renseigner le formulaire")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du tableau"
        value={newTableTitle}
        onChange={handleInputChange}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddTableForm;
