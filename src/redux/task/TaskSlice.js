import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
taskList:
 [
  {
    id: '1',
    title: 'titre de ma tache',
    tableId: '1',
  },
  {
    id: '2',
    title: 'titre de ma tache 2',
    tableId: '2',
  },
],
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      addTask: (state, action) => {
        const { tableId, taskContent } = action.payload;
        if (taskContent !== '') {
          const newTask = {
            id: uuidv4(),
            title: taskContent,
            tableId,
          };
          state.taskList.push(newTask);
        }
      },
      deleteTask: (state, action) => {
        const taskId = action.payload;
        state.taskList = state.taskList.filter((task) => task.id !== taskId);
      },
      editTask: (state, action) => {
        const { taskId, newTitle } = action.payload;
        console.log('Edit Task Action Received:', { taskId, newTitle });
        state.taskList = state.taskList.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
      //  console.log(state.taskList)
      },
    },
  });

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;