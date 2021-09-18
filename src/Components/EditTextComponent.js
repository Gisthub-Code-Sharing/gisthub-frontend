import * as React from 'react';
import TextField from '@mui/material/TextField';

function TextComponent() {
    return (
        <div style={{ padding: "10px 0px" }}>
            <TextField
                fullWidth
                variant="outlined"
                id="standard-textarea"
                multiline
                size="small"
            />
        </div>
    )
}

export default TextComponent;