import React from "react";
import { Typography } from '@mui/material';

function ViewTitleComponent(props) {
    return (
        <Typography variant="h4">{props.text}</Typography>
    )
}

export default ViewTitleComponent;