import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'; // Importez Link depuis 'react-router-dom'
import Space from './Space';
import '../styles/space.css';
import SpaceListHeader from './SpaceListHeader';
import AddSpaceForm from './AddSpaceForm'
import React, { useState, useEffect } from 'react';
import { deleteSpaces } from '../redux/space/SpaceSlice';
import { deleteTablesBySpaceId } from '../redux/table/TableSlice'
import { store } from '../redux/store.js';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { setSpaces } from '../redux/space/SpaceSlice';
import {useNavigate} from 'react-router-dom'
import { getSpaces, deleteSpacesAPI } from '../api/SpaceApi'
export default function SpaceList() {
  const spaces = useSelector((state) => state.space.spaceList);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);



const navigate = useNavigate()
    const dispatch = useDispatch()


useEffect(()=>{
  let connected = sessionStorage.getItem('connected') === 'true'

  if(!connected){
    return navigate('/login')
  }

  const fetchSpaces = async () => {
      let spaces = await getSpaces()
      dispatch(setSpaces(spaces))
  }

  fetchSpaces()

}, [])


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
    deleteSpacesAPI(selectedSpaces)
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
         {spaces.map((space, index)=> {
           return  <Grid xs={12} sm={6} md={4} lg={3} key={index}>
             <Space
               key={index}
               space={space}
               isSelected={selectedSpaces.includes(space.id)}
               onCheckboxChange={() => handleCheckboxChange(space.id)}
               isFormVisible={isFormVisible}
             /> 
             </Grid>
          })} 
  
        </Grid>
      </Box>
    </div>
  );
}