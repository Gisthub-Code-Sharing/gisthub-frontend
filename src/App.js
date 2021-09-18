import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/LoginPage'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/login'} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
