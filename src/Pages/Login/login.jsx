import React,{Component} from "react";
import './login.less'
import logo from './images/bg.jpg'
import {Button, Form, Icon, Input, message} from 'antd';
import {login_request} from "../../Api/Ajax_list";
import memory from "../../Utils/memory";
import storage from '../../Utils/storage'
import {Redirect} from "react-router-dom";
import {login} from "../../Redux/actions";
import {connect} from "react-redux";

class Login extends Component {
     constructor(props) {
         super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
     }
     handleSubmit(event) {
         event.preventDefault();
     //    const form = this.props.form;
     //    const values = form.getFieldsValue();
         this.props.form.validateFields(async (err,values)=>{
                if(!err) {
                    const {username,password} = values;
                    this.props.login(username,password);
                    // send request
               //     let result = await login_request(username,password);
               //     console.log(result);
              //      if(result.status === 0) { // 登陆成功
                        // message.success('登录成功')
                        // const user = result.data
                        // storage.saveUser(user)
                        // memory.user = user
                        // console.log(user);
                        // 跳转到 admin
                        // 细节： 使用replace表示当我们登陆成功以后是不需要再回到login页面的 故不用push
                     //   this.props.history.replace('/home')
            //        } else {
            //            message.error(result.msg)
            //        }
                } else {
                     message.error('failed')
                }
         })
     }

    validatePwd = (rule, value, callback) => {
        console.log(value, rule)
        const pwdLen = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            callback('必须输入密码')
        } else if (pwdLen < 4) {
            callback('密码必须大于4位')
        } else if (pwdLen > 12) {
            callback('密码必须小于 12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、 数组或下划线组成')
        } else {
            callback() // 必须调用 callback
        }
        // callback() // 验证通过
        // callback('xxxx') // 验证失败, 并指定提示的文本
    }

     render() {
      //   const user = memory.user;
         const user = this.props.user;
         if(user && user._id) {
             return <Redirect to='/home' />
         }
         const { getFieldDecorator } = this.props.form
         return (
             <div className="login">
                   <header className="login-header">
                     <img src={logo} alt="logo" />
                     <h1>React Project</h1>
                   </header>
                   <section className="login-content">
                       <div className={user.errorMsg ? 'error-msg show' :
                           'error-msg'}>{user.errorMsg}</div>
                        <h2>User Login</h2>
                       <Form onSubmit={this.handleSubmit} className="login-form">
                           <Form.Item>
                               {
                                   getFieldDecorator('username', {   // 配置对象: 属性名是特定的一些名称
                                       // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                       rules: [
                                           { required: true, whitespace: true, message: '用户名必须输入!' },
                                           { min: 4, message: '用户名至少4位' },
                                           { max: 12, message: '用户名最多12位' },
                                           { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                                       ],
                                   })(
                                       <Input
                                           prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                           placeholder="Username"
                                       />
                                   )
                               }
                           </Form.Item>
                           <Form.Item>
                               {
                                   getFieldDecorator('password', {
                                       rules: [
                                           { required: true, message: 'Please input your Password!' },
                                           // 使用自定义的验证规则
                                           { validator: this.validatePwd }
                                       ],
                                   })(
                                       <Input
                                           prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                           type="password"
                                           placeholder="Password"
                                       />,
                                   )
                               }
                           </Form.Item>
                           <Form.Item>
                               <Button type="primary" htmlType="submit" className="login-form-button">
                                   登录
                               </Button>
                           </Form.Item>
                       </Form>
                   </section>
             </div>
             )
     }
}

const WrapLogin = Form.create({ name: 'normal_login' })(Login)
export default connect(
    state => ({user: state.user}),
    {login}
)(WrapLogin)