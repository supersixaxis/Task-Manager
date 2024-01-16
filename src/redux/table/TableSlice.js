import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tablesList: [
    {
      id: '1',
      title: 'Projet ressource',
      order: 1
    },
    {
      id: '2',
      title: 'Sujet de la prochaine réunion',
      order: 2
    },
    {
      id: '3',
      title: 'A faire',
      order: 3
    },
    {
      id: '4',
      title: 'En cours',
      order: 4
    },
  ],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTable: (state, action) => {
      const newTable = {
        id: action.payload.id,
        title: action.payload.title,
        order: state.tablesList.length + 1,
      };
      state.tablesList.push(newTable);
    },
    editTableTitle: (state, action) => {
      const { id, newTitle } = action.payload;
      state.tablesList = state.tablesList.map((table) =>
        table.id === id ? { ...table, title: newTitle } : table
      );
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
    // ... autres actions pour les tables
  },
});

export const { addTable, editTableTitle, deleteTable, moveTable } = tableSlice.actions;

export default tableSlice.reducer;
