import React from 'react';

const SelectTableDelete = ({ options, selectedOption, onSelectChange, onDeleteButtonClick }) => {
  return (
    <div>
      <label>Select an option:</label>
      <select value={selectedOption || ''} onChange={(e) => onSelectChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
      <button onClick={onDeleteButtonClick}>Delete</button>
    </div>
  );
};

export default SelectTableDelete;