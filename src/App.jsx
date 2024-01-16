import './styles/app.css';
import Tables from './components/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import Login from './components/Login';
import Message from './components/Message';
import { useSelector } from 'react-redux'
function App() 
{
  const viewMessage = useSelector((state) => state.message.viewMessage)
  return (
    <>
     {viewMessage && <Message />}
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/tasklist' element={<Tables/>} />
    </Routes>
    </>
  );
}

export default App;
