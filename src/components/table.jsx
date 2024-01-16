import React, { useState } from 'react';
import Task from './Task';
import EditTableTitleForm from './EditTableTitleForm';
import FormAddTask from './FormAddTask';
import { moveTable, editTableTitle } from '../redux/table/TableSlice';
import { store } from '../redux/Store';
import { moveTask } from '../redux/task/TaskSlice';
import { showMessage } from '../utils/MessageUtils';
export default function Table({
  table,
  tasks,
  onDragStart,
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const tasksForTable = tasks.filter((task) => task.tableId === table.id);

  const handleClick = (e) => {
    if (e.target.className === 'tableTitle') {
      setIsEditingTitle(true);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const droppedTask = tasks.find((task) => task.id === taskId);
    let id_table_drag = e.dataTransfer.getData('id_table_drag');
    const order_table_drag = e.dataTransfer.getData('order_table_drag');
    if (droppedTask) {
      store.dispatch(moveTask({droppedTask, newTableId: table.id}));
    } else if (id_table_drag) {
      // J'ai droppé un tableau
      store.dispatch(moveTable({ id_table_drag, order_table_drag, id_table_drop: table.id, order_table_drop: table.order }));
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="table"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('id_table_drag', table.id);
        e.dataTransfer.setData('order_table_drag', table.order);
      }}
      onDrop={handleDrop}
      onDragOver={allowDrop}
      onClick={handleClick}
    >
      {isEditingTitle ? (
        <EditTableTitleForm
          tableId={table.id}
          initialTitle={table.title}
          setIsEditingTitle={setIsEditingTitle}
        />
      ) : (
        <p className="tableTitle">{table.title}</p>
      )}

      {tasksForTable.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDragStart={(e) => onDragStart(e, task)}
        />
      ))}
      <FormAddTask tableId={table.id} />
    </div>
  );
}
