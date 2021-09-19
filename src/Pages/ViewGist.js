import React, { useState, useContext, useEffect } from 'react';
import Code from '../Components/EditCodeComponent';
import ViewCode from '../Components/ViewCodeComponent';
import ViewText from '../Components/ViewTextComponent';
import ViewTitle from '../Components/ViewTitleComponent';
import { Button } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import ShareModal from '../Components/ShareModal';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import NotAllowedComponent from '../Components/NotAllowedComponent';

function ViewGist() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{ type: "Code", payload: "let" }, { type: "Text", payload: "" }]) // {type: "Code" or "Text", payload: string, language: string} 
    // TODO: Add different language support
    const [title, setTitle] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const { id } = useParams();
    const [error, setError] = useState(false);

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
            }).catch(err => { console.log(err); if (err.response.status === 403) { setError(true) }; })
        }
    }, [id])

    return (
        error ? <NotAllowedComponent /> :
            (<div style={{ margin: 50 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ViewTitle title={title}></ViewTitle>
                    {/* TODO: Add an edit button to move to AddGist page if owner */}
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" startIcon={<TextFieldsIcon />} onClick={addText}>Add Text</Button>
                    <Button variant="contained" startIcon={<CodeIcon />} style={{ marginLeft: 20 }} onClick={addCode}>Add Code</Button>
                </div>
            </div>)
    )
}

export default ViewGist;