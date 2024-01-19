import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tablesList: [
    {
      id: '1',
      title: 'Projet ressource',
      order: 1,
      color: '#6559b4bd',
      spaceId:1
    },
    {
      id: '2',
      title: 'Sujet de la prochaine réunion',
      order: 2,
      color: '#6559b4bd',
      spaceId:2
    },
    {
      id: '3',
      title: 'A faire',
      order: 3,
      color: '#6559b4bd',
      spaceId:3
    },
    {
      id: '4',
      title: 'En cours',
      order: 4,
      color: '#6559b4bd',
      spaceId:4
    },
    {
      id: '5',
      title: 'Terminer',
      order: 5,
      color: '#6559b4bd',
      spaceId:4
    },
  ],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTable: (state, action) => {
      const { id, title, spaceId, color } = action.payload;
      const newTable = {
        id,
        title,
        order: state.tablesList.length + 1,
        spaceId,
        color,
      };
      
      state.tablesList = state.tablesList.concat(newTable);
    },
    editTableTitle: (state, action) => {
      const { id, newTitle, newColor } = action.payload;
      state.tablesList = state.tablesList.map((table) =>
        table.id === id ? { ...table, title: newTitle, color: newColor } : table
      );
      console.log(state.tablesList)
    },
    deleteTable: (state, action) => {
      const idToDelete = action.payload;
      state.tablesList = state.tablesList.filter(table => table.id !== idToDelete);
    },
    moveTable: (state, action) => {
      const { id_table_drag, order_table_drag, id_table_drop, order_table_drop } = action.payload;

      const newTables = state.tablesList.map((table) => {
        if (table.id === id_table_drag) {
          table.order = Number(order_table_drop);
        } else if (table.id === id_table_drop) {
          table.order = order_table_drop > order_table_drag ? table.order - 1 : table.order + 1;
        } else if (
          order_table_drop > order_table_drag &&
          table.order > order_table_drag &&
          table.order <= order_table_drop
        ) {
          table.order = table.order - 1;
        } else if (
          order_table_drop < order_table_drag &&
          table.order < order_table_drag &&
          table.order >= order_table_drop
        ) {
          table.order = table.order + 1;
        }
        return table;
      });

      state.tablesList = newTables;
    },
    deleteTablesBySpaceId: (state, action) => {
      const spaceIdToDelete = action.payload;
      state.tablesList = state.tablesList.filter(table => table.spaceId !== spaceIdToDelete);
      console.log(state.tablesList)
    },
    // ... autres actions pour les tables
  },
});

export const { addTable, editTableTitle, deleteTable, moveTable, deleteTablesBySpaceId  } = tableSlice.actions;

export default tableSlice.reducer;
