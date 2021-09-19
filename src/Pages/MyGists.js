import React, { useEffect, useContext, useState } from "react"
import Typography from "@mui/material/Typography"
import {
  Avatar,
  Card,
  Paper,
  CardActionArea,
  CardActions,
  Button,
  Tab
} from "@mui/material"
import axios from "axios"
import { UserContext } from "../contexts/UserContext"
import Link from '@mui/material/Link';

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 300,
      height: 300,
      fontSize: 50,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  }
}

export default function ViewGistsPage() {
  const [gistsData, setGistsData] = useState([]);
  const [sharedData, setSharedData] = useState([]);

  const [userContext, setUserContext] = useContext(UserContext)
  const [sharedWithMe, setSharedWithMe] = useState(false);

  const name = `${userContext.user.firstName} ${userContext.user.lastName}`

  useEffect(() => {
    axios
      .post("https://gisthub-backend.herokuapp.com/myGists", {
        user: userContext.user,
      })
      .then((response) => {
        let { gists, sharedWithMe } = response.data
        setGistsData(gists);
        setSharedData(sharedWithMe);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            flex: "1",
            padding: "50px",
            flexDirection: "column",
            alignItems: "center",

            display: "flex",
          }}
        >
          <Avatar {...stringAvatar(name)} />
          <Typography
            style={{ fontWeight: "bold", marginTop: "2rem" }}
            variant='h4'
          >
            {name}
          </Typography>
          <Typography style={{ marginTop: "1.5rem" }} variant='h5'>
            @{userContext.user.userName}
          </Typography>
          <Typography style={{ marginTop: "1rem" }} variant='subtitle1'>
            {gistsData.length} gists
          </Typography>
        </div>
        <Paper
          style={{
            flex: "3",
            padding: "20px",
            backgroundColor: "rgb(242, 242, 242, 0.4)",
            borderRadius: 0,
          }}
        >
          {!sharedWithMe && (
            <>
              <Typography display="inline" variant='h4' sx={{ textTransform: "none" }}>My gists / </Typography>
              <Link onClick={() => setSharedWithMe(true)}>
                <Typography display="inline" variant='h4' sx={{ textTransform: "none" }}>Shared with me</Typography>
              </Link>
            </>
          )}
          {sharedWithMe && (
            <>
              <Link onClick={() => setSharedWithMe(false)}>
                <Typography display="inline" variant='h4' sx={{ textTransform: "none" }}>My gists</Typography>
              </Link>
              <Typography display="inline" variant='h4' sx={{ textTransform: "none" }}> / Shared with me</Typography>
            </>
          )}
          {/* <Button variant="outlined" disabled={!sharedWithMe} onClick={() => setSharedWithMe(false)}> <Typography variant='h4' sx={{ textTransform: "none" }}>My gists</Typography></Button><Typography variant='h4' sx={{ display: "inline" }}>/</Typography>
          <Button variant="outlined" disabled={sharedWithMe} onClick={() => setSharedWithMe(true)}><Typography variant='h4' sx={{ textTransform: "none" }}>Shared with me</Typography></Button> */}

          {sharedWithMe && sharedData.map((gist) => (
            <Card variant='outlined' style={{ margin: "10px" }}>
              <Typography
                variant='h6'
                style={{ paddingLeft: "15px", paddingTop: "10px" }}
              >
                {gist.title}
              </Typography>

              <CardActionArea
                href={`/viewGist/${gist._id}`}
                style={{ padding: "10px" }}
              >
                {" "}
                <CardActions>
                  <Button size='small'>View This Gist</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
          {!sharedWithMe && gistsData.map((gist) => (
            <Card variant='outlined' style={{ margin: "10px" }}>
              <Typography
                variant='h6'
                style={{ paddingLeft: "15px", paddingTop: "10px" }}
              >
                {gist.title}
              </Typography>

              <CardActionArea
                href={`/viewGist/${gist._id}`}
                style={{ padding: "10px" }}
              >
                {" "}
                <CardActions>
                  <Button size='small'>View This Gist</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
        </Paper>
      </div>
    </>
  )
}
