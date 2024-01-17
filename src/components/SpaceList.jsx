import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Importez Link depuis 'react-router-dom'
import Space from './Space';
import '../styles/space.css';
import SpaceListHeader from './SpaceListHeader';

export default function SpaceList() {
    const spaceList = useSelector((state) => state.space.spaceList);

    return (
        <div className='spaceContainer'>
            <SpaceListHeader />
            <div className='spaceListContainer'>
                {spaceList.slice().sort((a, b) => (a.order > b.order ? 1 : -1)).map((space, index) => (
            
                        <Space
                            key={index}
                            space={space}
                        />

                ))}
            </div>
        </div>
    );
}
