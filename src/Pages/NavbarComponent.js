import React, {useContext} from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import {useHistory} from 'react-router-dom';

export default function NavbarComponent({ isLoggedIn, drawerWidth }) {
  const [userContext, setUserContext] = useContext(UserContext);
  const history = useHistory();

  const handleAddGist = () => {
    axios.post('https://gisthub-backend.herokuapp.com/createGist', {user: userContext.user}).then(resp => {
      history.push('/editGist/' + resp.data.id);
    }).catch(err => console.log(err))
  }
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
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Gisthub
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color='inherit'>View my gists</Button>
              <IconButton onClick={handleAddGist}>
                <AddIcon />
              </IconButton>
            </>
          ) : (
            <Link to='/login'>
              <Button color='inherit'>Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
