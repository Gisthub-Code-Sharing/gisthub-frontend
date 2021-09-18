import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import AddGist from './Pages/AddGist';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/code'} component={AddGist} />
      </Switch>
    </Router>
  );
}

export default App;
