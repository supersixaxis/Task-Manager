//import 'bootstrap/dist/css/bootstrap.min.css'
//import './App.css'
import Tables from './components/Tables'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Message from './components/Message'
import { useSelector } from 'react-redux'
import SpaceList from './components/SpaceList'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

function App() {

  const navigate = useNavigate()

  return (
    <div className="gradient-background container-app">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
              {[{title: 'Accueil', link: '/'}, {title: 'Espaces', link: '/spaces'}].map((element, index) => (
                <Link to={element.link} key={index}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={element.title} />
                    </ListItemButton>
                  </ListItem>              
                </Link>
              ))}
            <ListItem disablePadding onClick={()=>{
              if(sessionStorage.getItem('connected') === "true"){
                sessionStorage.setItem('connected', false)
              }
              return navigate('/login')
            }}>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={sessionStorage.getItem('connected') === "true" ? 'Déconnexion' : 'Connexion'} />
              </ListItemButton>
            </ListItem> 
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'transparent', p: 3 }}
        >
          <Toolbar />
          <Message />
            <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/space/tasklist/:id' element={<Tables/>} />
            <Route path='/spaces' element={<SpaceList/>} />
            </Routes>
        </Box>
      </Box>
    </div>

  )
}

export default App