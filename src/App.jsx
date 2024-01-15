import './styles/app.css';
import Tables from './components/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import Login from './components/Login';
function App() {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/tasklist' element={<Tables/>} />
    </Routes>
  );
}

export default App;
