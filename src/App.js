import './App.css';
import React, {useContext} from 'react';
import {UserContext} from './contexts/UserContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import TestComponent from './Pages/TestComponent'
import axios from "axios";
function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if (status === UNAUTHORIZED) {
            setUserContext({user: undefined});
            window.reload();
        }
        return Promise.reject(error);
    }
  );
  return (
    <Router>
      <Switch>
        <Route path={'/login'} render={() => {return userContext.user ? <Redirect to="/testing"/> : <Login/>}} />
        <Route path={'/register'} render={() => {return userContext.user ? <Redirect to="/testing"/> : <Register/>}} />
      </Switch>
    </Router>
  );
}

export default App;
