import React from 'react'
import { hideMessage } from '../redux/message/MessageSlice'
import { useSelector } from 'react-redux'
import { store } from '../redux/store'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
//import Snackbar from '@mui/material/Snackbar';
const Message = () => {
  const content = useSelector((state) => state.message.content)
  const type = useSelector((state) => state.message.type)
  const viewMessage = useSelector((state) => state.message.viewMessage)

  return (

    <Snackbar open={viewMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={3000} onClose={() =>{ store.dispatch( hideMessage()) }}>
        <Alert
            severity={type}
            variant="filled"
            sx={{ width: '100%' }}
            onClose={() =>{ store.dispatch( hideMessage()) }}
        >
            {content}
        </Alert>
    </Snackbar>
)
};

export default Message;