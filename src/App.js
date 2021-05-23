import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import LoginPage from './ui/login_page';
import Error404Page from './ui/error/404Page';

function App() {
  return (
    <Router >
      <Switch>
        <Route path = "/login" component = {LoginPage} />
        
        <Route component = {Error404Page}/>
      </Switch>
 
    </Router>
  );
}

export default App;
