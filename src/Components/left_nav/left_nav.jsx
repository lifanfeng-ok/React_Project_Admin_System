import React, {Component, memo} from "react";
import './left_nav.less'
import logo from '../../Assets/imgs/Happy.png';
import {Link,withRouter} from "react-router-dom";
import menu from "../../Config/menu";
import {Menu,Icon} from "antd";
import memory from "../../Utils/memory";
import {connect} from 'react-redux'
import {setHeadTitle} from "../../Redux/actions";

const { SubMenu } = Menu

class Left_nav extends Component {

      has_auth = (item) =>{
          const { key, isPublic } = item;
          const menus = this.props.user.role.menus;
          const username = this.props.user.username;
          if(username === 'admin' || isPublic || menus.indexOf(key)!==-1) {
               return true
          } else if (item.children) {
             let c_item = item.children.find((child)=>{
                  return  menus.indexOf(child.key)!==-1
              })
              return !!c_item;
          }
          return false;
      }

      getMenuList = (menu) =>{
             const path = this.props.location.pathname;
             return menu.map((item_menu)=>{
                     if(this.has_auth(item_menu)) {
                         if (item_menu.key === path || path.indexOf(item_menu.key) === 0) {
                             // 更新redux中的headerTitle状态
                             this.props.setHeadTitle(item_menu.title)
                         }
                         if(!item_menu.children) {
                             return  (
                                 <Menu.Item key={item_menu.key}>
                                     <Link to={item_menu.key} onClick={()=>{this.props.setHeadTitle(item_menu.title)}}>
                                         <Icon type={item_menu.icon} />
                                         <span>{item_menu.title}</span>
                                     </Link>
                                 </Menu.Item>
                             )
                         } else {
                             let citem = item_menu.children.find((child)=>{
                                 return  path.indexOf(child.key) === 0
                             })
                             if(citem) {
                                 this.openKey = item_menu.key;
                             }
                             return (
                                 <SubMenu
                                     key={item_menu.key}
                                     title={
                                         <span>
                                        <Icon type={item_menu.icon}/>
                                        <span>{item_menu.title}</span>
                                       </span>
                                     }>
                                     {this.getMenuList(item_menu.children)}
                                 </SubMenu>
                             )
                         }

                     }
             })
      }

      componentWillMount() {
          this.menuNodes = this.getMenuList(menu);
      }

      render() {
          let path = this.props.location.pathname;
          if(path.indexOf('/product') === 0 ) {
              path = '/product'
          }
          const openKey = this.openKey;
          return (
              <div>
                  <div  className='left-nav'>
                      <Link to='/home' className='left-nav-header'>
                          <img src={logo} alt='img'/>
                          <h1>Admin_System</h1>
                      </Link>
                  </div>
                  <Menu
                      selectedKeys={[path]}
                      defaultOpenKeys={[openKey]}
                      mode="inline"
                      theme="dark">
                      {this.menuNodes}
                  </Menu>
              </div>
          )
      }
}

export default connect(
    state => ({user: state.user}),
    {setHeadTitle}
)(withRouter(Left_nav))