import React, { useState, useEffect, useContext } from "react";

import { Paper, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 3
};

function PublicShareModal({setIsPrivate}) {
    const {id} = useParams();
    const [userContext, setUserContext] = useContext(UserContext);

    const handleMakePrivate = () => {
        axios.post('https://gisthub-backend.herokuapp.com/updateGist', {isPrivate: true, user: userContext.user, gistId: id}).then(response => console.log(response)).catch(err => console.log(err))
        setIsPrivate(true);
    }

    return (
        < Paper sx={{ ...style }
        } >
            <Typography>Your gist is currently visible to < b > everyone.</b ></Typography>
            <Button variant="outlined" onClick={() => navigator.clipboard.writeText('http://localhost:3000/viewGist/' + id)} style={{marginTop: 20}}>Get link</Button>
            <Button variant="outlined" onClick={handleMakePrivate} style={{marginLeft: 10, marginTop: 20}}>Make private</Button>
        </Paper >
    )
}

export default PublicShareModal;