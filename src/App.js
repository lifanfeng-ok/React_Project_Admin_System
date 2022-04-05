import React, {Component} from "react";
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Login from './Pages/Login/login.jsx';
import Admin from "./Pages/Admin/admin.jsx";
import './App.css'

export default class App extends Component{
     render() {
         return (
             <BrowserRouter>
                  <Switch>
                       <Route path='/login' component={Login} />
                       <Route path='/' component={Admin} />
                  </Switch>
             </BrowserRouter>
             )
     }
}