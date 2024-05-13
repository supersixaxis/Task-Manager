import { displayMessage } from '../redux/message/MessageSlice';
import { store } from '../redux/store.js';

export const showMessage = (content, type) => {
  store.dispatch(displayMessage({ content, type }));
};