import React, {Component} from "react";
import {Form, Input, Tree} from "antd";
import PropTypes from 'prop-types';
import menu from "../../Config/menu";

const {Item} = Form
const { TreeNode } = Tree

export default class Auth_tree extends Component {

    static propTypes = {
        role: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        const {menus} = props.role;
        this.state = {
             selectedKeys : menus
        }
    }

    getSelectedKeys = () =>{
           return this.state.selectedKeys;
    }

    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps()', nextProps)
        const menus = nextProps.role.menus
        this.setState({
            selectedKeys: menus
        })
    }

    onCheck = (checkedKeys) => {
        this.setState({
            selectedKeys: checkedKeys
        })
    }

    getTreeNodes = (menu) => {
        return menu.reduce((pre,current)=>{
                   pre.push(
                       <TreeNode title={current.title} key={current.key}>
                           {current.children? this.getTreeNodes(current.children): null}
                       </TreeNode>
                   )
                   return pre;
         },[])
    }

    componentWillMount() {
        this.treeNodes = this.getTreeNodes(menu);
    }

    render() {
        const {name} = this.props.role;
        const {selectedKeys} = this.state;
        let {treeNodes} = this
        return (
            <Form>
                <Item label='Role Name：'>
                    <Input placeholder="Please" value={name} disabled/>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={selectedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="All" key="all">
                        {treeNodes}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}