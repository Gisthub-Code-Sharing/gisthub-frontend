import React, { useState } from 'react';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { IconButton } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Tooltip from '@mui/material/Tooltip';

function CodeComponent() {
    const [code, setCode] = useState(``);

    const [copyTooltip, setCopyTooltip] = useState(false);

    const handleTooltipClose = () => {
        setCopyTooltip(false);
    };

    const handleTooltipOpen = () => {
        setCopyTooltip(true);
        setTimeout(handleTooltipClose, 600);
    };

    return (
        <div style={{ position: "relative", padding: "10px 0px" }}>
            <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    backgroundColor: "rgb(242, 242, 242)"
                }}
            />
            <Tooltip style={{ position: "absolute", top: "10px", right: "0" }} title="Copied" open={copyTooltip} onClose={handleTooltipClose}>
                <IconButton aria-label="copy" onClick={() => { navigator.clipboard.writeText(code); handleTooltipOpen(); }}>
                    <CopyAllIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default CodeComponent;