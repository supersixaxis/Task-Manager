import React, { useState } from 'react';
import EditTaskForm from './EditTaskForm';
import { deleteTask} from '../redux/task/TaskSlice';
import { store } from '../redux/Store';
import { showMessage } from '../utils/MessageUtils.js';
export default function Task({ task, onDragStart  }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDragStart = (e) => {
    onDragStart(e, task);
  };
  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="taskContainer"
      style={{ backgroundColor: task.color }}
      onClick={(e)=>{
        e.stopPropagation()
        setIsEditing(true);
      }}
    >
      {isEditing ? (
        <EditTaskForm
          taskId={task.id}
          initialTitle={task.title}
          setIsEditing={setIsEditing}
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