import React, {Component} from "react";
import {Button, Card, Modal, Table,message} from "antd";
import Date_form from '../../Utils/Date_form';
import {reqAddRole, reqRoles, reqUpdateRole} from "../../Api/Ajax_list";
import AddForm from "./role_add_form";
import Auth_tree from "./auth_tree";
import memory from "../../Utils/memory";
import storage from "../../Utils/storage";
import {connect} from 'react-redux'
import {logout} from "../../Redux/actions";

class Role extends Component {

    constructor(props) {
        super(props);
        this.tree = React.createRef();
    }

    state = {
         roles: [],
         selected_role: {},
         isShowAuth: false,
         isShowAdd: false,
         isShowLoading:false
    }


    getRoles = async () =>{
        this.setState({
            isShowLoading: true
        })
        const result = await reqRoles();
        console.log(result.data)
        if(result.status===0) {
            this.setState({
                roles: result.data,
                isShowLoading: false
            })
        }
    }

    onRow = (role) => {
        return {
            onClick: event => { // 点击确认行
                this.setState({
                    selected_role: role
                })
            }
        }
    }

    updateRole = async () =>{
        this.setState({
            isShowAuth: false
        })
        const role = this.state.selected_role
        // Get Latest Menus
        role.menus = this.tree.current.getSelectedKeys()
        role.auth_time = Date.now()
       // role.auth_name = memory.user.username
        role.auth_name = this.props.user.username
        // 2 Send Request
        const result = await reqUpdateRole(role)

        if (result.status === 0) {
            // message.success('Role Set Successfully')
            // this.setState({
            //          roles: [...this.state.roles]
            //      })
          //   this.getRoles()
            if (role._id === this.props.user.role_id) {
                this.props.logout()
            //    memory.user = {}
           //     storage.removeUser()
           //     this.props.history.replace('/login')
              message.info('Role has Changed, Please Login Again')
            } else {
                message.success('Role Set Successfully')
                this.setState({
                    roles: [...this.state.roles]
                })
            }
        } else {
            message.error(result.msg)
        }
    }

    addRole = () =>{
          this.form.validateFields( async (err,values) =>{
               if(!err) {
                   this.setState({
                       isShowAdd: false
                   })

                   const { roleName } = values
                   this.form.resetFields()

                   const result = await reqAddRole(roleName)
                   if (result.status === 0) {
                       message.success('添加角色成功')
                       const role = result.data

                       this.setState(state => ({
                           roles: [...state.roles, role]
                       }))
                   } else {
                       message.error(result.msg)
                   }
               }
          })
    }

    componentWillMount() {
        this.columns = [
                {
                    title: 'Role Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Create Time',
                    dataIndex: 'create_time',
                    render: (create_time) => Date_form(create_time)
                },
                {
                    title: 'Auth Time',
                    dataIndex: 'auth_time',
                    render: (auth_time) => Date_form(auth_time)
                },
                {
                    title: 'Auth Person',
                    dataIndex: 'auth_name'
                }
        ]
    }

    componentDidMount() {
         this.getRoles();
    }

    render() {
        const {roles, selected_role, isShowAuth, isShowAdd,isShowLoading} = this.state
        let title = (
              <span>
                 <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>Add Roles</Button>&nbsp;&nbsp;
                 <Button type='primary' disabled={!selected_role._id} onClick={()=>{this.setState({isShowAuth:true})}}>Set Auth</Button>
              </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={isShowLoading}
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: 3}}
                    rowSelection = {{
                        type: 'radio',
                        selectedRowKeys: [selected_role._id],
                        onSelect: (role) =>{
                             this.setState({
                                 selected_role: role
                             })
                        }
                    }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onCancel={() => {
                        this.setState({
                            isShowAdd: false
                        })
                        this.form.resetFields()
                    }}
                    onOk={this.addRole}
                >
                    <AddForm
                        setForm={(form) => {this.form = form}}
                    />
                </Modal>
                <Modal
                    title="Set Roles"
                    visible={isShowAuth}
                    onCancel={() => {
                        this.setState({
                            isShowAuth: false
                        })
                    }}
                    onOk={this.updateRole}
                >
                    <Auth_tree
                        ref={this.tree}
                        role={selected_role}
                    />
                </Modal>

            </Card>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {logout}
)(Role);