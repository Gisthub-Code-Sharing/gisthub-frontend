import React, { useState, useEffect } from "react";
import PrivateShareModal from "./PrivateShareModal";
import PublicShareModal from "./PublicShareModal";

function ShareModal(props) {
    const { isPrivate, invited, setInvited, setIsPrivate } = props;

    return (
        < React.Fragment >
            {isPrivate ? (<PrivateShareModal invited={invited} setInvited={setInvited} isPrivate={isPrivate} setIsPrivate={setIsPrivate}/>) : (<PublicShareModal isPrivate={isPrivate} setIsPrivate={setIsPrivate} />)}
        </ React.Fragment >
    );
};
export default ShareModal;