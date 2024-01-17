import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Importez Link depuis 'react-router-dom'
import Space from './Space';
import '../styles/space.css';
import SpaceListHeader from './SpaceListHeader';
import React, { useState } from 'react';
import { deleteSpaces } from '../redux/space/SpaceSlice';
import { store } from '../redux/Store';
export default function SpaceList() {
    const spaceList = useSelector((state) => state.space.spaceList);
    const [selectedSpaces, setSelectedSpaces] = useState([]);

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
        setSelectedSpaces([]);
      };
    return (
        <div className='spaceContainer'>
            <SpaceListHeader />
            <button onClick={handleDeleteSpaces}>Supprimer en masse</button>
            <div className='spaceListContainer'>
                {spaceList.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((space, index) => (
            
                        <Space
                            key={index}
                            space={space}
                            isSelected={selectedSpaces.includes(space.id)}
                            onCheckboxChange={() => handleCheckboxChange(space.id)}
                        />

                ))}
            </div>
        </div>
    );
}
