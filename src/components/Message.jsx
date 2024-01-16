import React from 'react';
import '../styles/tables.css';
import '../styles/tables.css';
import { useSelector } from 'react-redux';


const Message = () => {
  const content = useSelector((state) => state.message.content)
  const typeMessage = useSelector((state) => state.message.typeMessage)
  const messageTypeClass = typeMessage === 'error' ? 'errorMessage' : 'successMessage';

  return (
    <div className={`displayMessage ${messageTypeClass}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;