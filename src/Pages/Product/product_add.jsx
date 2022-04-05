import React, {Component} from "react";
import {
    Card,
    Icon,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
import {reqAddOrUpdateProduct, reqCategorys} from "../../Api/Ajax_list";
import PicturesWall from "./product_pw";
const { Item } = Form
const { TextArea } = Input

class Product_add extends Component {

    constructor(props) {
        super(props)

        this.pw = React.createRef()
        this.editor = React.createRef()
    }

    state = {
        options: []
    }

    validatePrice = (rule, value, callback) => {
        // console.log(value, typeof value)
        if(value * 1 > 0) {
            callback() // 验证通过
        }else {
            callback('价格必须大于0') // 验证没通过
        }
    }

    setOptions =async (categories) => {
         let options = categories.map((c)=>{
              return {
                  value: c._id,
                  label: c.name,
                  isLeaf: false, // 不是叶子
              }
         })

         let {isUpdate,product} = this;
         const {pCategoryId} =product;
         if(isUpdate&&pCategoryId!=='0') {
             let result = await this.getCategories(pCategoryId);
             const childrenOptions = result.map((item)=>{
                  return {
                      value: item._id,
                      label: item.name,
                      isLeaf: true, // 不是叶子
                  }
             })
             let target_first_option = options.find((option)=>{
                 return option.value === pCategoryId
             })
             target_first_option.children = childrenOptions
         }

         this.setState({
             options: options
         })

    }

    getCategories =async (parentId) => {
          let result = await reqCategorys(parentId);
          if(result.status === 0) {
                let categories = result.data;
                if(parentId === '0') {
                     this.setOptions(categories);
                } else {
                      return categories;
                }
          }
    }

    loadData = async (targetoptions)=> {
           let target = targetoptions[0];
           target.loading = true;
           let subcategories =await this.getCategories(target.value)
           target.loading =false;
           if(subcategories&&subcategories.length>0) {
                  let childrenOptions = subcategories.map((item)=>{
                       return {
                           value: item._id,
                           label: item.name,
                           isLeaf: true
                       }
                  })
                  target.children = childrenOptions
           } else {
                target.isLeaf = true;
           }
           this.setState({
                 options : [...this.state.options]
           })
    }

    handleSubmit = () =>{
         this.props.form.validateFields(async (err,values)=>{
                if(!err) {
                    const { name, desc, price, categoryIds } = values;
                    let pCategoryId, categoryId
                    if(categoryIds.length === 1) {
                        pCategoryId = '0'
                        categoryId = categoryIds[0]
                    } else {
                        pCategoryId = categoryIds[0]
                        categoryId = categoryIds[1]
                    }
                    const imgs = this.pw.current.getImgs();
                    let product = {
                        name, desc, price, imgs, detail:'', pCategoryId, categoryId
                    }
                    if(this.isUpdate) {
                        product._id = this.product._id
                    }
                    const result = await reqAddOrUpdateProduct(product)
                    if (result.status === 0) {
                        message.success(`${this.isUpdate ? 'Update' : 'Add'}Successfully!`)
                        this.props.history.goBack()
                    } else {
                        message.error(`${this.isUpdate ? 'Update' : 'Add'}failed!`)
                    }
                }
         })
    }

    componentWillMount() {
         let product = this.props.location.state;
         this.isUpdate = product;
         this.product = product || {};
    }

    componentDidMount() {
         this.getCategories('0')
    }

    render() {
        const {isUpdate,product} = this;
        const {pCategoryId,categoryId,imgs} =product;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }
        let categoryIds = []
        if(isUpdate) {
             if(pCategoryId === '0') {
                  categoryIds.push(categoryId)
             } else {
                  categoryIds.push(pCategoryId);
                  categoryIds.push(categoryId);
             }
        }
        const title = (
            <span>
                <Icon type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}/>
                <span>Add Product</span>
            </span>
        )
        return (
            <Card title={title}>
                 <Form {...formItemLayout}>
                     <Item label="Name">
                         {
                             getFieldDecorator('name', {
                                 initialValue: product.name,
                                 rules: [
                                     {required: true, message: 'must input name'}
                                 ]
                             })(<Input placeholder='please input name'/>)
                         }
                     </Item>
                     <Item label="description">
                         {
                             getFieldDecorator('desc', {
                                 initialValue: product.desc,
                                 rules: [
                                     {required: true, message: 'must input description'}
                                 ]
                             })(<TextArea placeholder="please input desc" autosize={{ minRows: 2, maxRows: 6 }} />)
                         }
                     </Item>
                     <Item label="Price">
                         {
                             getFieldDecorator('price', {
                                 initialValue: product.price,
                                 rules: [
                                     {required: true, message: 'Must input price'},
                                     {validator: this.validatePrice}
                                 ]
                             })(<Input type='number' placeholder='please input price' addonAfter='元'/>)
                         }
                     </Item>
                     <Item label="Categories">
                         {
                             getFieldDecorator('categoryIds', {
                                 initialValue: categoryIds,
                                 rules: [
                                     {required: true, message: '必须请指定商品分类'}
                                 ]
                             })(<Cascader
                                 placeholder='Please select category'
                                 options={this.state.options}  /*需要显示的列表数据数组*/
                                 loadData={this.loadData}  /*当选择某个列表项, 加载下一级列表的监听回调*/
                             />)
                         }
                     </Item>
                     <Item label="Pictures">
                         <PicturesWall ref={this.pw} imgs={imgs}>

                         </PicturesWall>
                     </Item>
                     <Item>
                         <Button type='primary' onClick={this.handleSubmit}>Submit</Button>
                     </Item>
                 </Form>
            </Card>
        )
    }
}

export default Form.create()(Product_add)