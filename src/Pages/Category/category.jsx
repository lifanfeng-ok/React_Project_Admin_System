import React, {Component} from "react";
import { Card, Table, Button, Icon, message, Modal} from 'antd'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../Api/Ajax_list';
import Add_form from "./add_form";
import Update_form from "./update_form";

export default class Category extends Component {

    state = {
          categories:[],
          subcategories: [],
          parentId: '0',
          parentName: '',
          loading: false,
          showStatus: 0
    }

    getCategories = async (parentId) => {
         this.setState({loading: true});
         let params = parentId || this.state.parentId;
         let result = await reqCategorys(params);
         this.setState({loading:false});
         console.log(result);
         if(result.status === 0) {
               let arr = result.data;
               if(params === '0') {
                    this.setState({
                        categories: arr
                    })
               } else {
                    this.setState({
                        subcategories: arr
                    })
               }
         } else {
              message.error('failed to fetch data')
         }
    }

    showCategories = () => {
           this.setState({
               subcategories: [],
               parentId: '0',
               parentName: ''
           })
    }

    showSub = (category) =>{
          this.setState({
              parentId: category._id,
              parentName: category.name
          }, () =>{
                this.getCategories(category._id)
              })
    }

    showAdd = () => {
        this.setState({
            showStatus:1
        })
    }

    showUpdate = (category) =>{
        this.category = category
        this.setState({
            showStatus: 2
        })
    }

    handleCancel = () => {
          this.form.resetFields();
          this.setState({
              showStatus: 0
          })
    }

    addCategory = () => {
        this.form.validateFields(async (err,values) =>{
              if(!err) {
                  this.setState({
                      showStatus: 0
                  })

                  const{parentId,categoryName} = values;
                  this.form.resetFields()
                  let result = await reqAddCategory(categoryName,parentId);
                  if(result.status === 0) {
                        if(parentId === this.state.parentId) {
                            this.getCategories()
                        } else if(parentId === '0') {
                               this.getCategories('0')
                        }
                  } else {
                       message.error('failed')
                  }
              }
        })

    }

    updateCategory =async () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // 0 关闭窗口
                this.setState({
                    showStatus: 0
                })

                const categoryId = this.category._id
                const {categoryName} = values   // this.form.getFieldValue('categoryName')
                console.log(categoryId, categoryName);
                this.form.resetFields()
                const result = await reqUpdateCategory({categoryId, categoryName})
                if (result.status === 0) {
                    this.getCategories()
                } else {
                    message.error(result.msg)
                }
            }
        });
    }

    componentWillMount() {
        this.columns = [
            {
                title: 'Category',
                dataIndex: 'name' // 显示数据对应的属性名
            },
            {
                title: 'Action',
                width: 300,
                render: (category) =>{
                    return (
                        <span>
                             <a onClick={() => {this.showUpdate(category)}} style={{marginRight:'25px'}}>Update</a>
                            {this.state.parentId === '0'? <a onClick={()=>{this.showSub(category)}}>See Sub</a>:null}
                        </span>
                    )
                }
            }

        ]
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const {categories,subcategories,parentId,parentName,loading,showStatus} = this.state
        console.log(categories);
        const category = this.category || {};
        const title = parentId === '0'? 'First Category' : (
            <span>
                <a onClick={this.showCategories}>First Category</a>
                <Icon type='arrow-right' style={{marginRight: '5px', marginLeft: '5px'}}/>
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <Icon type="plus"/>
                Add Category
            </Button>
        )
        return (
             <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId==='0' ? categories : subcategories}
                    columns={this.columns}
                    pagination={{defaultPageSize: 5, showQuickJumper: true}} />
                 <Modal
                     title="Add_category"
                     visible={showStatus === 1}
                     onCancel={this.handleCancel}
                     onOk={this.addCategory}
                 >
                     <Add_form
                         categorys={categories}
                         parentId={parentId}
                         setForm={(form) => {this.form = form}}
                     />
                 </Modal>

                 <Modal
                     title="更新分类"
                     visible={showStatus === 2}
                     onCancel={this.handleCancel}
                     onOk={this.updateCategory}
                 >
                     {/* 组件见的通信  子组件向父组件传递数据*/}
                     <Update_form
                         categoryName={category.name}
                         setForm={(form) => {this.form = form}}
                     />
                 </Modal>
             </Card>
        )
    }
}