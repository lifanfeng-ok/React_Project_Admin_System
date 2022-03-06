import React, {Component} from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/login.jsx';

export default class App extends Component{
     render() {
         return (
             <HashRouter>
                  <Switch>
                       <Route path='/login' component={Login} />
                  </Switch>
             </HashRouter>
             )
     }
}