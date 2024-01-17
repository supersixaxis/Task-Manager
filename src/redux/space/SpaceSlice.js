import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spaceList: [
    {
      id: '1',
      title: 'Projet ressource',
      color: '#6559b4bd'
    },
    {
      id: '2',
      title: 'Projet TaskManager',
      color: '#6559b4bd'
    },
    {
      id: '3',
      title: 'Projet OhmyFood',
      color: '#6559b4bd'

    },
    {
      id: '4',
      title: 'Projet Dièse telecom',
      color: '#6559b4bd'
    },
  ],
};

export const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {
        editSpaceTitle: (state, action) => {
            const { id, newTitle, newColor} = action.payload;
            state.spaceList = state.spaceList.map((space) =>
            space.id === id ? { ...space, title: newTitle, color: newColor } : space
            );
          
          },
          deleteSpaces: (state, action) => {
            const spaceIdsToDelete = action.payload;
            state.spaceList = state.spaceList.filter((space) => !spaceIdsToDelete.includes(space.id));
          },
        },
})

export const { editSpaceTitle,deleteSpaces  } = spaceSlice.actions;
export default spaceSlice.reducer;