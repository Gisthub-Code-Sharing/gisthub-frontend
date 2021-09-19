import React, { useState, useContext, useEffect } from 'react';
import Code from '../Components/EditCodeComponent';
import ViewCode from '../Components/ViewCodeComponent';
import ViewText from '../Components/ViewTextComponent';
import ViewTitle from '../Components/ViewTitleComponent';
import { Button } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import EditIcon from '@mui/icons-material/Edit';
import ShareModal from '../Components/ShareModal';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import ShareIcon from '@mui/icons-material/Share';

function ViewGist() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{ type: "Code", payload: "let" }, { type: "Text", payload: "" }]) // {type: "Code" or "Text", payload: string, language: string} 
    // TODO: Add different language support
    const [title, setTitle] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [owner, setOwner] = useState(false);
    const [isPrivate, setIsPrivate] = useState(true);
    const [permissions, setPermissions] = useState([]);

    const handleClose = () => setOpen(false);

    const handleChange = (payload, index) => {
        const newItems = [...items]
        items[index].payload = payload;
        setItems(newItems);
    }

    const EMPTY_CODE = { type: "Code", payload: "" };
    const EMPTY_TEXT = { type: "Text", payload: "" };

    const addCode = () => {
        setItems(items.concat(EMPTY_CODE));
    }

    const addText = () => {
        setItems(items.concat(EMPTY_TEXT));
    }

    useEffect(() => {
        if (id) {
            axios.post('https://gisthub-backend.herokuapp.com/viewGist', { user: userContext.user, gistId: id }).then(response => {
                let { gist } = response.data;
                setTitle(gist.title || "");
                setItems(gist.content || []);
                setOwner(userContext.user.id === gist.owner.toString());
                setIsPrivate(gist.isPrivate);
                setPermissions(gist.permissions || []);
            }).catch(err => { console.log(err); setError(err.response.status); })
        }
    }, [id])

    return (
        error ? <ErrorPage status={error} /> :
            (<div style={{ margin: 50 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ViewTitle title={title}></ViewTitle>
                    {owner && (
                        <>
                            <Button variant="contained" startIcon={<ShareIcon />} onClick={() => setOpen(true)}>
                                Share
                            </Button>
                            <Button href={`/editGist/${id}`} variant="contained" startIcon={<EditIcon />} style={{ marginLeft: 10 }}>
                                Edit
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <ShareModal isPrivate={isPrivate} setIsPrivate={setIsPrivate} invited={permissions} setInvited={setPermissions} />
                            </Modal>
                        </>)}
                </div>

                {
                    items.map((item, index) => {
                        const { type, payload } = item
                        if (type === "Code") {
                            return <ViewCode payload={payload} />
                        } else {
                            return <ViewText payload={payload} />
                        }
                    })
                }
            </div>)
    )
}

export default ViewGist;