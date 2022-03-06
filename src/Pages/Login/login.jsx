import React,{Component} from "react";
import './login.less'
import logo from './images/bg.jpg'

export default class Login extends Component {
     render() {
         return (
             <div className="login">
                   <header className="login-header">
                     <img src={logo} alt="logo" />
                     <h1>React Project</h1>
                   </header>
                   <div className="login-content">

                   </div>
             </div>
             )
     }
}