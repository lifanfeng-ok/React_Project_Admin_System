import React, {Component} from "react";
import './header.less';
import memory from "../../Utils/memory";
import {Link,withRouter} from "react-router-dom";
import date from "../../Utils/Date_form";
import {req_weather} from "../../Api/Ajax_list";
import menu from "../../Config/menu";
import {Modal} from "antd";
import storage from "../../Utils/storage";
import logo from '../../Assets/imgs/Happy.png';
import {connect} from 'react-redux'
import {logout} from "../../Redux/actions";

class Header extends Component {

    state = {
        sysTime: date(Date.now()),
        dayPictureUrl: '', // 天气图片的 url
        weather: ''
    }

    updateWeather = async ()=>{
           let result = await req_weather(222405);
           let weather;
           if (result.message === 'success' && result.status === 0) {
                weather = result.result.now.text;
           }
           this.setState({
               weather:weather
           })
    }

    updateTime= () =>{
        this.timer = setInterval(()=>{
              let current = date(Date.now());
              this.setState({
                  sysTime: current
              })
        },1000)
    }

    getTitle = (path) =>{
        let title;
        menu.forEach((item)=>{
            if(item.key === path) {
                title = item.title
            } else if(item.children) {
                let citem = item.children.find((i)=>{
                       return  path.indexOf(i.key) ===0
                 })
                if(citem) {
                     title =citem.title
                }
            }
        })
        return title;
    }

    handleExit = (e) =>{
           e.preventDefault();
            Modal.confirm({
                content: 'Are you sure to Exit',
                onOk: () => {
                    // // 要用箭头函数  存在this 的问题
                  //  storage.removeUser()
                //    memory.user = {}
                //    this.props.history.replace('/login')
                    this.props.logout()
                },
                onCancel() {
                    console.log('cancel')
                }
            });

    }

    componentDidMount() {
        this.updateTime();
        this.updateWeather();
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {sysTime,weather} = this.state;
     //   const user = memory.user;
        const user = this.props.user;
    //    const path  = this.props.location.pathname;
     //   let title = this.getTitle(path);
        const title = this.props.headTitle;
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>Welcome,{user.username}</span>
                    <a  className='link_button' onClick={this.handleExit}>Exit</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                           <span>{title}</span>
                    </div>
                    <div className='header-bottom-right'>
                         <span>{sysTime}</span>
                         <img src={logo} alt='Weather' />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({headTitle: state.headTitle, user:state.user}),
    {logout}
)(withRouter(Header))