import React from "react";
import { Typography } from '@mui/material';

function ViewTitleComponent({ title }) {
    return (
        <Typography variant="h4" sx={{ flex: 1 }}>{title}</Typography>
    )
}

export default ViewTitleComponent;