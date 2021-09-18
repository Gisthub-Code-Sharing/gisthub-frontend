import React, { useState, useEffect } from "react";
import PrivateShareModal from "./PrivateShareModal";
import PublicShareModal from "./PublicShareModal";

function ShareModal(props) {
    const { isPrivate, invited } = props;

    return (
        < React.Fragment >
            {isPrivate ? (<PrivateShareModal invited={invited} />) : (<PublicShareModal />)}
        </ React.Fragment >
    );
};
export default ShareModal;