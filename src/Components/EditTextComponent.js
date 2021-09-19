import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';

function TextComponent({payload, onTextChange}) {
    return (
        <div style={{ padding: "10px 0px" }}>
            <TextField
                fullWidth
                variant="outlined"
                id="standard-textarea"
                multiline
                size="small"
                value={payload}
                onChange={event => onTextChange(event.target.value)}
            />
        </div>
    )
}

export default TextComponent;