import './styles/app.css';
import Tables from './components/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import Login from './components/Login';
import Message from './components/Message';
import SpaceList from './components/SpaceList';
function App() 
{
  return (
    <>
    <Message />
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/space/tasklist/:id' element={<Tables/>} />
    <Route path='/spacelist' element={<SpaceList/>} />
    </Routes>
    </>
  );
}

export default App;
