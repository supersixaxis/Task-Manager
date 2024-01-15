import React from 'react';
import '../styles/tables.css';
import '../styles/tables.css';


const Message = ({ type, content }) => {
  const messageTypeClass = type === 'error' ? 'errorMessage' : 'successMessage';

  return (
    <div className={`displayMessage ${messageTypeClass}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;