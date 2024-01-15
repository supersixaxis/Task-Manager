import { useState } from 'react'
export default function FormAddTask({ addTaskTable, tableId }) {
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
              addTaskTable(tableId, newTableTask);
              setNewTableTask('');
              setPopinVisible(false);
            
          }}
        >
          <label>Ajouter une tâche au tableau</label>
          <input
            type="text"
            value={newTableTask}
            placeholder="Nom de la tâche"
            onChange={(e) => setNewTableTask(e.target.value)}
          />
          <button type='submit'>Ajouter une tâche</button>
        </form>
      )}
    </div>
  );
}