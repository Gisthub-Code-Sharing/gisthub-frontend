import React, { useState, useEffect } from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Paper, Typography, Button, List, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';

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

// replace with getUsers API
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function PrivateShareModal(props) {
    const { invited } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...sampleEmails]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <Paper sx={{ ...style }} >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingBottom: '10px'
            }}>
                <PersonAddIcon fontSize="large" style={{ paddingRight: 10 }} />
                <Typography variant="h5"> Share with people</Typography>
            </div>
            <Autocomplete
                id="asynchronous-demo"
                size="small"
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                // isOptionEqualToValue={(option, value) => option.title === value.title}
                // getOptionLabel={(option) => option.title}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Add People"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
            <List>
                {invited.map(person => (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography>{person}</Typography>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>))}
            </List>
            <Button variant="outlined" onClick={() => navigator.clipboard.writeText(window.location.href)}>Get link</Button>
            <Button variant="outlined">Make public</Button>
        </Paper >
    )
}

const sampleEmails = ['abc@def.com', 'def@abc.com']

export default PrivateShareModal;