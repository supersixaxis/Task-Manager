import { useState } from 'react';
import { store } from '../redux/Store';
import { addTask } from '../redux/task/TaskSlice';
import { showMessage } from '../utils/MessageUtils.js';

export default function FormAddTask({ tableId }) {
  const [newTableTask, setNewTableTask] = useState('');
  const [isPopinVisible, setPopinVisible] = useState(false);

  const handleButtonClick = () => {
    setPopinVisible(!isPopinVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTableTask.trim() === '') {
      showMessage('Veuillez remplir le nom de votre tâche !', 'error');
      return;
    }

    store.dispatch(addTask({ tableId, taskContent: newTableTask }));
    showMessage('Tâche ajoutée avec succès !', 'success');
    setNewTableTask('');
    setPopinVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Ajouter une tâche</button>
      {isPopinVisible && (
        <form onSubmit={handleSubmit}>
          <label>Ajouter une tâche au tableau</label>
          <input
            type="text"
            value={newTableTask}
            placeholder="Nom de la tâche"
            onChange={(e) => setNewTableTask(e.target.value)}
          />
          <button type="submit">Ajouter une tâche</button>
        </form>
      )}
    </div>
  );
}
