import React from 'react';
import '../styles/tables.css';
import { useSelector } from 'react-redux';
//import Snackbar from '@mui/material/Snackbar';
const Message = () => {
  const content = useSelector((state) => state.message.content)
  const type = useSelector((state) => state.message.type)
  const messageTypeClass = type === 'error' ? 'errorMessage' : 'successMessage';

  return (
    <div className={`displayMessage ${messageTypeClass}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;