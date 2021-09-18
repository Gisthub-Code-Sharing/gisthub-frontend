import React, { useState, useEffect } from "react";

import { Paper, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

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

function PublicShareModal() {
    return (
        < Paper sx={{ ...style }
        } >
            <Typography>Your gist is currently visible to < b > everyone.</b ></Typography>
            <Button variant="outlined" onClick={() => navigator.clipboard.writeText(window.location.href)}>Get link</Button>
            <Button variant="outlined">Make private</Button>
        </Paper >
    )
}

export default PublicShareModal;