import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UserProvider} from './contexts/UserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);