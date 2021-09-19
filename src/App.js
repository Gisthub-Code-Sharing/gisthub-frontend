import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import AddGist from './Pages/AddGist';
import ViewGist from './Pages/ViewGist';
import "./App.css"
import './Themes/prism-one-light.css';

import TestComponent from "./Pages/TestComponent"
import NavbarComponent from "./Pages/NavbarComponent"
import axios from "axios"
import HomePage from "./Pages/HomePage"
import ViewGistsPage from "./Pages/MyGists"
import NotAllowedPage from "./Components/NotAllowedComponent"

function App() {
  const [userContext, setUserContext] = useContext(UserContext)

  const UNAUTHORIZED = 401
  /*
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error)
      const { status } = error.response
      if (status === UNAUTHORIZED) {
        setUserContext({ user: undefined })
        window.reload()
      }
      return Promise.reject(error)
    }
  )
  */
  return (
    <Router>
      <div>
        <NavbarComponent></NavbarComponent>
        <Switch>
          <Route
            exact
            path={"/login"}
            render={() => {
              return userContext.user ? <Redirect to='/viewGists' /> : <Login />
            }}
          />
          <Route
            exact
            path={"/register"}
            render={() => {
              return userContext.user ? (
                <Redirect to='/viewGists' />
              ) : (
                <Register />
              )
            }}
          />
          <Route exact path={"/editGist/:id"} component={AddGist} />
          <Route exact path={"/viewGist/:id"} component={ViewGist} />
          <Route exact path={"/"} component={HomePage} />
          <Route exact path={"/viewGists"} component={ViewGistsPage} />
          <Route exact path={"/no"} component={NotAllowedPage} />

        </Switch>
      </div>
    </Router>
  )
}

export default App
