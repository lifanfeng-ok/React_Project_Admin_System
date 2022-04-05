import React, {Component} from "react";
import {Button, Card, message, Modal, Table} from "antd";
import Date_form from "../../Utils/Date_form";
import UserForm from "./User_form";
import {reqAddOrUpdateUser, reqDeleteUser, reqUsers} from "../../Api/Ajax_list";

export default class User extends Component {
    state = {
        users:[],
        roles: [],
        isShow:false,
        isShowLoading:false
    }

    getRoleMap =(roles) =>{
          return roles.reduce((pre,current) =>{
                pre[current._id] = current.name
                return pre
          },{})
    }

    getUsers = async () =>{
         this.setState({
             isShowLoading:true
         })
         let result = await reqUsers();
         if(result.status === 0){
             let {users,roles} = result.data;
             this.role_list = this.getRoleMap(roles);
             this.setState(
                 {users, roles, isShowLoading : false}
             )
         }

    }

    showAdd = () =>{
         this.user = null;
         this.setState({isShow:true});
    }

    showUpdate = (user) =>{
          this.user = user;
          this.setState({isShow: true})
    }

    deleteUser = (user) =>{
         Modal.confirm({
             title: `Confirm Delete ${user.username}?`,
             onOk: async () =>{
                 let result = await reqDeleteUser(user);
                 if(result.status === 0) {
                      message.success('Delete Successfully');
                      this.getUsers();
                 }
             }
         })
    }

    addOrUpdateUser =  () =>{
          this.form.validateFields(async (err,values)=>{
             if(!err) {
                 this.setState({
                     isShow: false
                 })
                 let user = values;
                 if(this.user) {
                     user._id = this.user._id;
                 }
                 let result = await reqAddOrUpdateUser(user);
                 if(result.status === 0) {
                      message.success(`${this.user? 'Update success' : 'Add Success'}`)
                      this.getUsers();
                 }
             }
          })
    }

    componentWillMount() {
        this.columns = [
            {
                title: 'Username',
                dataIndex: 'username'
            },
            {
                title: 'Email',
                dataIndex: 'email'
            },
            {
                title: 'Phone',
                dataIndex: 'phone'
            },
            {
                title: 'Registered Time',
                dataIndex: 'create_time',
                render: (time) => Date_form(time)
            },
            {
                title: 'Role',
                dataIndex: 'role_id',
                render: (role_id) => this.role_list[role_id]
            },
            {
                title: 'Action',
                render: (user) => (
                    <span>
                        <a onClick={() => this.showUpdate(user)}>Update</a>&nbsp;&nbsp;
                        <a onClick={() => this.deleteUser(user)}>Delete</a>
                    </span>
                )
            }
        ]
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const title = <Button type='primary' onClick={this.showAdd}>Create Users</Button>
        const {users,isShow,roles,isShowLoading} = this.state;
        const user = this.user || {};

        return (
             <Card title={title}>
                 <Table
                     bordered
                     loading={isShowLoading}
                     rowKey='_id'
                     dataSource={users}
                     columns={this.columns}
                     pagination={{defaultPageSize: 4, showQuickJumper: true}}
                 />

                 <Modal
                     title={user._id ? 'Update User' : 'Add User'}
                     visible={isShow}
                     onOk={this.addOrUpdateUser}
                     onCancel={() => {
                         this.form.resetFields()
                         this.setState({isShow: false})
                     }}
                 >
                     <UserForm
                         setForm={form => this.form = form}
                         roles={roles}
                         user={user}
                     />
                 </Modal>
             </Card>
        )
    }
}