// taskSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  taskList: [
    {
      id: '1',
      title: 'titre de ma tache',
      tableId: '1',
      color: ''
    },
    {
      id: '2',
      title: 'titre de ma tache 2',
      tableId: '2',
      color: ''
    },
  ],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { tableId, taskContent, color } = action.payload;
      if (taskContent !== '') {
        const newTask = {
          id: uuidv4(),
          title: taskContent,
          tableId,
          color
        };
        state.taskList.push(newTask);
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.taskList = state.taskList.filter((task) => task.id !== taskId);
    },
    editTask: (state, action) => {
      const { taskId, newTitle, color  } = action.payload;
      state.taskList = state.taskList.map((task) =>
        task.id === taskId ? { ...task, title: newTitle, color  } : task,
        
      );
    },
    moveTask: (state, action) => {
        const { droppedTask, newTableId } = action.payload;
        const updatedTask = { ...droppedTask, tableId: newTableId };
        state.taskList = state.taskList.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      },
  },
});

export const { addTask, deleteTask, editTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
