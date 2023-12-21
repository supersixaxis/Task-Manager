import React, { useState } from 'react';

export default function FormAddTask({ tables, addTaskTable }) {
    const [idTableSelected, setIdTableSelected] = useState(0)
    const [newTableTask, setNewTableTask] = useState('');
    const [isPopinVisible, setPopinVisible] = useState(false);

    const handleButtonClick = () => {
      setPopinVisible(!isPopinVisible);
    };
  return (
    <div>
      <button onClick={handleButtonClick}>Ajouter une tâche</button>
      {isPopinVisible && (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        if (idTableSelected.toString() === '0') {
          alert('Veuillez sélectionner un tableau à éditer');
        } else if (newTableTask.trim() === "") {
          alert('Veuillez sélectionner un tableau à éditer');
        }
        else {
          addTaskTable(idTableSelected, newTableTask);
          setIdTableSelected('0');
          setNewTableTask('');
          setPopinVisible(false);
        }
      }}
    >
          <label>Ajouter une tâche au tableau</label>
        <select  value={idTableSelected} onChange={(e) => setIdTableSelected(e.target.value)}>
        <option value={0}>---</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              {table.title}
            </option>
          ))}
        </select>
        <input type="text" value={newTableTask}    placeholder="Nom de la tache" onChange={(e) => setNewTableTask(e.target.value)}/>
        <button type='submit'>Ajouter une tâche</button>
        
        </form>
      )}
      </div>
  )
}
