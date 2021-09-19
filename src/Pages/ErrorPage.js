import React, { useState, useEffect } from "react";
import NotAllowedComponent from "../Components/NotAllowedComponent"
import LoggedOutComponent from "../Components/LoggedOut";

function ErrorPage({ status }) {
    switch (status) {
        case (403): return (<NotAllowedComponent />);
        case (401): return (<LoggedOutComponent />);
        default: return (<NotAllowedComponent />);
    }
};
export default ErrorPage;