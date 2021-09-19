import './App.css';
import './Themes/prism-one-light.css';
import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import AddGist from './Pages/AddGist';
import ViewGist from './Pages/ViewGist';

import TestComponent from './Pages/TestComponent'
import axios from "axios";
function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  // const UNAUTHORIZED = 401;
  // axios.interceptors.response.use(
  //   response => response,
  //   error => {
  //     const { status } = error.response;
  //     if (status === UNAUTHORIZED) {
  //       setUserContext({ user: undefined });
  //       window.reload();
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return (
    <Router>
      <Switch>
        <Route exact path={'/login'} render={() => { return userContext.user ? <Redirect to="/code" /> : <Login /> }} />
        <Route exact path={'/register'} render={() => { return userContext.user ? <Redirect to="/code" /> : <Register /> }} />
        <Route exact path={'/code'} component={AddGist} />
        <Route exact path={'/code/view'} component={ViewGist} />
      </Switch>
    </Router>
  );
}

export default App;
