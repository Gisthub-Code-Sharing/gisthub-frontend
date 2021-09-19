import React, { useState, useEffect } from "react";
import { Paper, Typography, Button } from '@mui/material';

function NotAllowedComponent() {
    return (
        <div style={{ margin: "auto", margin: "100px" }}>
            <Typography variant="h4">You do not have permission.</Typography>
            <Button style={{ marginTop: "10px" }} variant="contained">Ask for permission</Button>
        </div>
    );
};
export default NotAllowedComponent;