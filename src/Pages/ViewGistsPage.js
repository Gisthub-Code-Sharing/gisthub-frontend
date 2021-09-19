import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import React, { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import profilePicture from "../img/profile-photo.jpeg"
import { Avatar, Grid } from "@mui/material"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
const drawerWidth = 440

export default function ViewGistsPage() {
  const [fullName, setFullName] = useState("Gaurang Ruparelia")
  const [userName, setUserName] = useState("username")

  const [gistsData, setGistsData] = useState([])
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    axios({
      method: "POST",
      url: "https://gisthub-backend.herokuapp.com/createGist",
    }).then((res) => {
      setGistsData(res.gists)
    })

    /*
      setUserInfo(gistResults.gists.owner)
  
      setGistsData(gistResults.gists.content)
  */
    console.log(gistsData)
  }, [])
  return (
    <>
      <NavbarComponent
        drawerWidth={drawerWidth}
        isLoggedIn={true}
      ></NavbarComponent>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Toolbar />
          <Divider />

          <Divider />
          <Avatar
            style={{ alignSelf: "center", marginTop: "2rem" }}
            alt='Gisthub user'
            src={profilePicture}
            sx={{ width: 294, height: 354 }}
          />
          <Typography
            style={{ alignSelf: "center", marginTop: "2rem" }}
            variant='h4'
            component='h4'
          >
            Gaurang Ruparelia
          </Typography>
          <Typography
            style={{ alignSelf: "center", marginTop: "1rem" }}
            variant='h6'
            component='h6'
          >
            @gaurang1402
          </Typography>
        </Drawer>
        <Box
          component='main'
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <React.Fragment>
            <Grid container className='grid-container'>
              <Grid item xs={12} className={"grid-column"}>
                <h1>Column 1</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>new line</h1>
                <h1>scroll down again</h1>
                <h1>app bar is gone</h1>
              </Grid>
            </Grid>
          </React.Fragment>
        </Box>
      </Box>
    </>
  )
}
