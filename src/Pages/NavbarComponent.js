import React, { useContext } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavbarComponent({ isLoggedIn, drawerWidth }) {
  const [userContext, setUserContext] = useContext(UserContext);
  const history = useHistory();

  const handleAddGist = () => {
    axios.post('https://gisthub-backend.herokuapp.com/createGist', { user: userContext.user }).then(resp => {
      history.push('/editGist/' + resp.data.id);
    }).catch(err => console.log(err))
  }

  const handleLogout = () => {
    setUserContext({});
    Cookies.remove('auth_github');
    history.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{ width: `calc(100% - $drawerWidth)px` }}
        position='static'
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant='h6' component='div' sx={{ color: "white", flexGrow: 1 }}>
            <Link to='/'>
              Gisthub
            </Link>
          </Typography>
          {userContext.user ? (
            <>
              <Button href='/viewGists' sx={{ color: "white" }}>View my gists</Button>
              <IconButton sx={{ color: "white" }} onClick={handleAddGist}>
                <AddCircleIcon />
              </IconButton>
              <Button sx={{ color: "white" }} onClick={() => handleLogout()}>Logout</Button>
            </>
          ) : (
            <>
              <Button href='/login' sx={{ color: "white" }} variant="text">Login</Button>
              <Button href='/register' sx={{ color: "white" }} variant="text">Sign up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
