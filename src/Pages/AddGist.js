import React, { useState } from 'react';
import Code from '../Components/EditCodeComponent';
import Text from '../Components/EditTextComponent';
import Title from '../Components/EditTitleComponent';
import { Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ShareModal from '../Components/ShareModal';
import Modal from '@mui/material/Modal';

function AddGist() {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    return (
        <div style={{ margin: 50 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Title></Title>
                <Button variant="contained" startIcon={<ShareIcon />} onClick={() => setOpen(true)}>
                    Share
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ShareModal isPrivate={true} invited={['invited1', 'invited2']} />
                </Modal>
            </div>
            <Code></Code>
            <Text></Text>
        </div>
    )
}

export default AddGist;