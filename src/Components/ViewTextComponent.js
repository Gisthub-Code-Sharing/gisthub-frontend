import React, { useEffect } from 'react';
import { Typography } from '@mui/material/';

function TextComponent({ payload }) {
    return (
        <div style={{ padding: "10px 0px" }}>
            <Typography
                variant="body1"
                id="standard-textarea"
                multiline
                size="small"
            >{payload}
            </Typography>
        </div>
    )
}

export default TextComponent;