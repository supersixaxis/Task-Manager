import React, { useState } from 'react';
import EditTaskForm from './EditTaskForm';
import { deleteTask} from '../redux/task/TaskSlice';
import { store } from '../redux/Store';
import { showMessage } from '../utils/MessageUtils';
export default function Task({ task, onDragStart,  }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDragStart = (e) => {
    onDragStart(e, task);
  };
  console.log(task)
  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="taskContainer"
      onClick={(e)=>{
        e.stopPropagation()
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <EditTaskForm
          taskId={task.id}
          initialTitle={task.title}
        />
      ) : (
        <>
       
          <p key={task.id}>{task.title}</p>
          <button
          className="taskButton"
          onClick={() => {
            store.dispatch(deleteTask(task.id));
            showMessage('Tâche supprimée avec succès !', 'success');
          }}
        >
          X
        </button>
        </>
      )}
    </div>
  );
}