import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spaceList: [
    {
      id: '1',
      title: 'Projet ressource',
    },
    {
      id: '2',
      title: 'Projet TaskManager',
    },
    {
      id: '3',
      title: 'Projet OhmyFood',

    },
    {
      id: '4',
      title: 'Projet Dièse telecom',
    },
  ],
};

export const spaceSlice = createSlice({
    name: 'space',
    initialState,
    reducers: {

    }
})

export const {} = spaceSlice;

export default spaceSlice.reducer;