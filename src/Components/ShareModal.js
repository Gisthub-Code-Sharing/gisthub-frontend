import React, { useState, useEffect } from "react";
import PrivateShareModal from "./PrivateShareModal";
import PublicShareModal from "./PublicShareModal";

function ShareModal(props) {
    const { isPrivate, invited, setInvited } = props;

    return (
        < React.Fragment >
            {isPrivate ? (<PrivateShareModal invited={invited} setInvited={setInvited}/>) : (<PublicShareModal />)}
        </ React.Fragment >
    );
};
export default ShareModal;