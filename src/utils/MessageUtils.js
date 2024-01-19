import { displayMessage } from '../redux/message/MessageSlice';
import { store } from '../redux/store';

export const showMessage = (content, type) => {
  store.dispatch(displayMessage({ content, type }));
};