import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import LoginPage from './ui/login_page';
import Error404Page from './ui/error/404Page';
import ProtectedRoutes from './ui/protectedRoutes';
import LandingPage from './ui/dash_board';
import ConferencePage from './ui/samtv_page/ConferencePage';
import { BackTop } from 'antd';


function App() {
  return (
    <Router >
       <BackTop />
      <Switch>
        <Route path = "/login" component = {LoginPage} />
           <Route path = "/sam-tv/live">
          <ProtectedRoutes component = {ConferencePage}/>
        </Route>
        <Route path = "/">
          <ProtectedRoutes component = {LandingPage}/>
        </Route>
        <Route component = {Error404Page}/>

      </Switch>
 
    </Router>
  );
}

export default App;
