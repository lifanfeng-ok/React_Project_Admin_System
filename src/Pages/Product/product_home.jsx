import React, {Component} from "react";
import {Button, Card, Icon, Input, message, Select, Table} from "antd";
import {reqProducts,reqSearchProducts,reqUpdateStatus} from "../../Api/Ajax_list";

export default class Product_home extends Component {
    state = {
        total: 0,
        loading: false,
        products: [],
        searchName: '',
        searchType: 'productName'
    }

    getProducts = async (pageNum) => {
          this.pageNum = pageNum;
          this.setState({
              loading:true
          });
          let result;
          if(this.state.searchName!== '') {
              result = await reqSearchProducts({
                  pageNum,
                  pageSize:2,
                  searchType: this.state.searchType,
                  searchName: this.state.searchName
              })
          } else {
             result = await reqProducts({pageNum,pageSize:2});
          }
          this.setState({loading: false});
          if(result.status === 0) {
                const {total,list} = result.data;
                this.setState({
                    total,
                    products:list
                })
          } else {
              message.error('failed');
          }
    }

    updateStatus = async (id,newstatus) => {
         let result = await reqUpdateStatus(id,newstatus);
         if(result.status === 0) {
              message.success('Update Successfully');
              this.getProducts(this.pageNum)
         }
    }

    componentWillMount() {
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Description',
                dataIndex: 'desc'
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
               title: 'Status',
               width: 100,
               render: (product) => {
                     const {status,_id} = product;
                     const newstatus = status === 1? 2:1
                     return (
                         <span>
                            <Button type='primary' onClick={()=>{
                                this.updateStatus(_id,newstatus)
                            }}>{status === 1? 'down' : 'on'}</Button>
                            <span>{status ===1? 'on sale': 'already down'}</span>
                         </span>
                     )
               }
            },
            {
                width: 100,
                title: 'Action',
                render: (product) => {
                    return (
                        <span>
                            {/*将product对象使用state传递给目标路由组件*/}
                            <a onClick={()=>{
                                this.props.history.push('/product/detail',product)
                            }}>Detail</a> <br/>
                            <a onClick={()=>{
                                this.props.history.push('/product/addupdate',product)
                            }}>Update</a>
                        </span>
                    )
                }
            },
        ]
    }

    componentDidMount() {
        this.getProducts(1)
    }

    render() {
        const {loading,products,total,searchName,searchType,} = this.state;
        let title = (
            <span>
                <Select value={searchType} onChange={(value)=>{this.setState({
                    searchType: value
                })}}>
                     <Select.Option value='productName'>By Name</Select.Option>
                    <Select.Option value='productDesc'>By Desc</Select.Option>
                </Select>
                <Input value={searchName}
                       onChange={(event)=>{
                           this.setState({
                               searchName: event.target.value
                           })
                       }}
                       placeholder='Please input keywords' style={{width:'100px',margin: '0 15px'}}/>
                <Button type='primary' onClick={() => this.getProducts(1)}>Search</Button>
            </span>
        )
        let extra = (
            <Button type="primary" onClick={()=>{this.props.history.push('/product/addupdate')}}>
                <Icon type="plus"/>
                Add Product
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    loading={loading}
                    rowKey='_id'
                    columns={this.columns}
                    dataSource={products}
                    pagination={{
                        total,
                        defaultPageSize: 2,
                        showQuickJumper: true,
                        onChange: (pageNum) => {
                              this.getProducts(pageNum);
                        }
                    }}
                />
            </Card>
        )
    }
}