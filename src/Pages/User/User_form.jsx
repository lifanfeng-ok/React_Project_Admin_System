import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select} from 'antd'
const Item = Form.Item
const Option = Select.Option

class UserForm extends PureComponent {

    static propTypes = {
        setForm: PropTypes.func.isRequired,  // 用来传递form对象的函数
        roles: PropTypes.array.isRequired,
        user: PropTypes.object
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    /*
        对密码进行自定义验证
         用户名/密码的的合法性要求
             1). 必须输入
             2). 必须大于等于4位
             3). 必须小于等于12位
             4). 必须是英文、数字或下划线组成
    */
    validatePwd = (rule, value, callback) => {
        // console.log(value, rule)
        const pwdLen = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            callback('必须输入密码')
        } else if (pwdLen < 4) {
            callback('密码必须大于4位')
        } else if (pwdLen > 16) {
            callback('密码必须小于 16 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、 数组或下划线组成')
        } else {
            callback() // 必须调用 callback
        }

        // 语法
        // callback() // 验证通过
        // callback('xxxx') // 验证失败, 并指定提示的文本
    }

    render() {
        const {roles, user} = this.props

        // 获取数据
        const { getFieldDecorator } = this.props.form
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 6 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }

        return (
            <Form {...formItemLayout} className="user-form">
                <Item label='Username：'>
                    {getFieldDecorator('username', {
                        initialValue: user.username,
                        rules: [
                            { required: true, message: 'Must Input!' },
                            { min: 4, message: 'At least 4' },
                            { max: 12, message: 'At most 12' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: 'Incorrect' }
                        ],
                    })(
                        <Input placeholder="Please Input Username"/>,
                    )}
                </Item>
                {/*  如果修改用户不操作密码  */}
                {
                    user._id ? null : (
                        <Item label='Password'>
                            {
                                getFieldDecorator('password', {
                                    initialValue: user.password,
                                    rules: [
                                        { required: true, message: '请输入密码!' },
                                        // 使用自定义的验证规则
                                        { validator: this.validatePwd }
                                    ],
                                })(
                                    <Input type='password' placeholder='请输入密码'/>
                                )
                            }
                        </Item>
                    )
                }
                <Item label='Phone:'>
                    {getFieldDecorator('phone', {
                        initialValue: user.phone,
                        rules: [
                            { required: true, message: 'Please Input Phone' },
                            { len: 11, message: '11 Number' },
                            { pattern: /^1[3456789]\d{9}$/, message: 'Incorrect Phone number' }
                        ],
                    })(
                        <Input placeholder="Please Input Phone"/>,
                    )}
                </Item>
                <Item label='Email:'>
                    {getFieldDecorator('email', {
                        initialValue: user.email,
                        rules: [
                            { required: true, message: 'Please Input Email' },
                            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: 'Please Input Correct Email' }
                        ],
                    })(
                        <Input placeholder="Please Input Email"/>
                    )}
                </Item>
                <Item label='Role：'>
                    {
                        getFieldDecorator('role_id', {
                            initialValue: user.role_id,
                        })(
                            <Select placeholder="Please Select Role">
                                {
                                    roles.map(role =>
                                        <Option
                                            key={role._id}
                                            value={role._id}
                                        >{role.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'user_form' })(UserForm)