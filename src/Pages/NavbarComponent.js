import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"

export default function NavbarComponent({ isLoggedIn, drawerWidth }) {
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
              <Link to='/add'>
                <AddIcon style={{ marginLeft: "1rem" }} />
              </Link>
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
