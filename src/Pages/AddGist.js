import React, { useState, useContext, useEffect } from 'react';
import Code from '../Components/EditCodeComponent';
import Text from '../Components/EditTextComponent';
import ViewText from '../Components/ViewTextComponent';
import Title from '../Components/EditTitleComponent';
import { Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import ShareModal from '../Components/ShareModal';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';

function AddGist() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]) // {type: "Code" or "Text", payload: string, language: string} 
    // TODO: Add different language support
    const [title, setTitle] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [isPrivate, setIsPrivate] = useState(true);
    const [userContext, setUserContext] = useContext(UserContext);
    const { id } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axios.post('https://gisthub-backend.herokuapp.com/viewGist', { user: userContext.user, gistId: id }).then(response => {
                let { gist } = response.data;
                setTitle(gist.title || "");
                setItems(gist.content || []);
                setPermissions(gist.permissions || []);
                setIsPrivate(gist.isPrivate);
            }).catch(err => { console.log(err); setError(err.response.status); })
        }
    }, [id])

    const handleClose = () => setOpen(false);

    const handleChange = (payload, index) => {
        const newItems = [...items]
        items[index].payload = payload;
        setItems(newItems);
    }

    const handleSave = () => {
        axios.post('https://gisthub-backend.herokuapp.com/updateGist', { title, content: items, user: userContext.user, gistId: id }).then(response => console.log(response)).catch(err => console.log(err))
    }

    const EMPTY_CODE = { type: "Code", payload: "" };
    const EMPTY_TEXT = { type: "Text", payload: "" };

    const addCode = () => {
        setItems(items.concat(EMPTY_CODE));
    }

    const addText = () => {
        setItems(items.concat(EMPTY_TEXT));
    }

    return (
        error ?
            <ErrorPage status={error} /> :
            (<div style={{ margin: 50 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Title title={title} setTitle={setTitle}></Title>
                    <Button variant="contained" startIcon={<ShareIcon />} onClick={() => setOpen(true)}>
                        Share
                    </Button>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} style={{ marginLeft: 10 }}>
                        Save
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <ShareModal isPrivate={isPrivate} setIsPrivate={setIsPrivate} invited={permissions} setInvited={setPermissions} />
                </Modal>
                {
                    items.map((item, index) => {
                        const { type, payload } = item
                        if (type === "Code") {
                            return <Code payload={payload} onCodeChange={(payload) => handleChange(payload, index)} />
                        } else {
                            return <Text payload={payload} onTextChange={(payload) => handleChange(payload, index)} />
                        }
                    })
                }
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" startIcon={<TextFieldsIcon />} onClick={addText}>Add Text</Button>
                    <Button variant="contained" startIcon={<CodeIcon />} style={{ marginLeft: 20 }} onClick={addCode}>Add Code</Button>
                </div>
            </div>)
    )
}

export default AddGist;