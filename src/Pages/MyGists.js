import React, { useEffect, useContext, useState } from "react"
import Typography from "@mui/material/Typography"
import { Avatar, Grid, Card, Paper, CardActionArea } from "@mui/material"
import axios from "axios"
import { UserContext } from '../contexts/UserContext';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 100,
      height: 100,
      fontSize: 40,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ViewGistsPage() {
  const [gistsData, setGistsData] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [userContext, setUserContext] = useContext(UserContext);

  const name = `${userContext.user.firstName} ${userContext.user.lastName}`;

  useEffect(() => {
    axios.post('https://gisthub-backend.herokuapp.com/myGists', { user: userContext.user }).then(response => {
      let { gists } = response.data;
      setGistsData(gists);
      console.log(gists);
    }).catch(err => { console.log(err); })
  }, []);

  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: "1", padding: "50px", flexDirection: "column" }}>
          <Avatar {...stringAvatar(name)} style={{ margin: "auto", marginBottom: "20px" }} />
          <Typography variant="h4" >{name}</Typography>
          <Typography variant="h5" >{userContext.user.userName}</Typography>
          <Typography variant="subtitle1" >{gistsData.length} gists</Typography>
        </div>
        <Paper style={{ flex: "3", padding: "20px", backgroundColor: "rgb(242, 242, 242, 0.4)", borderRadius: 0 }}>
          <Typography variant="h5">Your gists</Typography>

          {gistsData.map(gist => (
            <Card variant="outlined" style={{ margin: '10px' }} >
              <CardActionArea href={`/viewGist/${gist._id}`} style={{ padding: '10px' }}>
                <Typography variant="h6">{gist.title}</Typography>
              </CardActionArea>
            </Card>
          ))}
        </Paper>
      </div>
    </>
  )
}
