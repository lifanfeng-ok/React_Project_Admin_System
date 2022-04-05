import {Component} from "react";
import memory from "../../Utils/memory";
import {Redirect,Switch,Route} from "react-router-dom";
import {Form, Layout} from "antd";
import Header from '../../Components/header/header';
import Left from '../../Components/left_nav/left_nav';
import Home from '../Home/home'
import Category from '../Category/category'
import Product from '../Product/product'
import Role from '../Role/role'
import User from '../User/user'
import Bar from '../Charts/bar'
import Line from '../Charts/line'
import Pie from '../Charts/pie'
import {connect} from "react-redux";

const {Footer,Sider,Content} = Layout;


class Admin extends Component {

     render() {
     //    const user = memory.user;
         const user = this.props.user;
         if(!user._id) {
             return <Redirect to='/login' />
         }
         return (
             <Layout style={{height: '100%'}}>
                 <Sider>
                     <Left />
                 </Sider>
                 <Layout>
                     <Header />
                     <Content style={{backgroundColor: '#fff',margin:'20px'}}>
                         <Switch>
                             <Route path='/home' component={Home} />
                             <Route path='/category' component={Category}/>
                             <Route path='/product' component={Product}/>
                             <Route path='/role' component={Role}/>
                             <Route path='/user' component={User}/>
                             <Route path='/charts/bar' component={Bar}/>
                             <Route path='/charts/line' component={Line}/>
                             <Route path='/charts/pie' component={Pie}/>
                             <Redirect  to='/home'/>
                         </Switch>
                     </Content>
                     <Footer style={{textAlign:'center',color:'#cccccc'}}>footer,xxxxxxxxxx</Footer>
                 </Layout>
             </Layout>
         )
     }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin)