import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Importez Link depuis 'react-router-dom'
import Space from './Space';
import '../styles/space.css';
import SpaceListHeader from './SpaceListHeader';
import AddSpaceForm from './AddSpaceForm'
import React, { useState, useEffect } from 'react';
import { deleteSpaces } from '../redux/space/SpaceSlice';
import { deleteTablesBySpaceId } from '../redux/table/TableSlice'
import { store } from '../redux/store';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { setSpaces } from '../redux/space/SpaceSlice';
import axios from 'axios';
export default function SpaceList() {
  const spaceList = useSelector((state) => state.space.spaceList);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);



const [spaces, setSpaces] = useState([])

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

useEffect(() => {
  axios({
    method: 'get',
    url:'https://firestore.googleapis.com/v1/projects/'+firebaseConfig.projectId+'/databases/(default)/documents/space?key='+firebaseConfig.apiKey,
    responseType:'json'
  })
  .then(function (response) {
    console.log(response.data.documents)
    setSpaces(response.data.documents)
  })
  .catch((error) => {
    console.log(error)
  })  
})


  const handleCheckboxChange = (spaceId) => {
    setSelectedSpaces((prevSelectedSpaces) => {
      if (prevSelectedSpaces.includes(spaceId)) {
        return prevSelectedSpaces.filter((id) => id !== spaceId);
      } else {
        return [...prevSelectedSpaces, spaceId];
      }
    });
  };

  const handleDeleteSpaces = () => {
    store.dispatch(deleteSpaces(selectedSpaces));
       selectedSpaces.forEach((space) => {
      store.dispatch(deleteTablesBySpaceId(space.id));
    });

    setSelectedSpaces([]);
  };
    
 

  const handleFormToggle = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className='spaceContainer'>
      <SpaceListHeader />
      <button onClick={handleDeleteSpaces}>Supprimer en masse</button>
      <AddSpaceForm
        isFormVisible={isFormVisible}
        onFormToggle={handleFormToggle}
      />
      <Box>
        <Grid container spacing={2}>
          {/* {spaceList.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((space, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
            <Space
              key={index}
              space={space}
              isSelected={selectedSpaces.includes(space.id)}
              onCheckboxChange={() => handleCheckboxChange(space.id)}
              isFormVisible={isFormVisible}
            /> 
            </Grid>
        ))}
          {/* {spaces.map((space, index)=> {
            return (
              <div key={index}>
                <div>
                  <p>{space.fields.title.stringValue}</p>
                </div>
              </div>
            )
          })} */}
  
        </Grid>
      </Box>
    </div>
  );
}