import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import LoginPage from './ui/login_page';
import Error404Page from './ui/error/404Page';
import ProtectedRoutes from './ui/protectedRoutes';
import LandingPage from './ui/dash_board';

function App() {
  return (
    <Router >
      <Switch>
        <Route path = "/login" component = {LoginPage} />
        <Route path = "/">
          <ProtectedRoutes component = {LandingPage}/>
        </Route>
        <Route component = {Error404Page}/>
      </Switch>
 
    </Router>
  );
}

export default App;