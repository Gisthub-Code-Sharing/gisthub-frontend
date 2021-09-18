import React, { useState } from "react";
import TextField from '@mui/material/TextField';

function TitleComponent() {
    const [title, setTitle] = useState("");

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <TextField
            InputProps={{
                disableUnderline: true,
                style: {
                    fontSize: '2.125rem',
                    fontWeight: '400'
                }
            }}
            fullWidth
            variant="standard"
            value={title}
            onChange={handleChange}
            placeholder="Untitled"
        />
    )
}
export default TitleComponent;