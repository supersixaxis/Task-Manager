import React, { useState } from 'react';
import '../styles/space.css';
import edit from '../assets/edit.svg'
import EditSpaceTitleForm  from './EditSpaceTitleForm'
import { Link } from 'react-router-dom';

export default function Space({ space, isSelected, onCheckboxChange }) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleClick = (e) => {
            e.stopPropagation();
          setIsEditingTitle(true);
      };

  return (
    <>
    {isEditingTitle ? (
        <>
        <EditSpaceTitleForm
          spaceId={space.id}
          initialTitle={space.title}
          initialColor={space.color}
          setIsEditingSpaceTitle={setIsEditingTitle}
        />
        <div className='spaceCardContainer' style={{ backgroundColor: space.color }}>
        <div className='btnEditContainer'>
         <button className='btnEdit' onClick={handleClick}><img src={edit} alt=""   /></button>
         <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </label>
         </div>
        <Link className="btnTab" to={`/space/tasklist/${space.id}`}>
            <div className='spaceCard'>
            <p>{space.title}</p> 
        </div>
    </Link>
</div>
</>
      ) : (
        <div className='spaceCardContainer' style={{ backgroundColor: space.color }}>
          <div className='btnEditContainer'>
            <button className='btnEdit' onClick={handleClick}>
              <img src={edit} alt='' />
            </button>
            <label>
              <input
                type='checkbox'
                checked={isSelected}
                onChange={onCheckboxChange}
              />
            </label>
          </div>
          <Link className='btnTab' to={`/space/tasklist/${space.id}`}>
            <div className='spaceCard'>
              <p>{space.title}</p>
            </div>
          </Link>
        </div>
      
      )}

    </>
  )
}
