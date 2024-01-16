import { displayMessage, hideMessage } from '../redux/message/MessageSlice';
import { store } from '../redux/Store';

export const showMessage = (content, type) => {
  store.dispatch(displayMessage({ content, type }));
  setTimeout(() => {
    store.dispatch(hideMessage());
  }, 3000);
};