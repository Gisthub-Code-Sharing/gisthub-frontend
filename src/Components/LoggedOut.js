import React, { useState, useEffect } from "react";
import { Paper, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom"

function NotAllowedComponent() {
    return (
        <div style={{ margin: "auto", margin: "100px" }}>
            <Typography variant="h4">Please log in to proceed.</Typography>
            <Link to='/login'>
                <Button style={{ marginTop: "10px" }} variant="contained">Login</Button>
            </Link>
        </div>
    );
};
export default NotAllowedComponent;