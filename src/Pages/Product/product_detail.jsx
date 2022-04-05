import React, {Component} from "react";
import {Card, Icon, List} from "antd";
import {reqCategory} from "../../Api/Ajax_list";
import {BASE_IMG_URL} from "../../Utils/constants";

const { Item } = List

export default class Product_detail extends Component {
    state = {
        cname1: '',
        cname2: '',
        isloading: false
    }

    async componentDidMount() {
        this.setState({
            isloading: true
        })
        let {categoryId,pCategoryId} = this.props.location.state;
        if(pCategoryId === '0'){
            let result = await reqCategory(categoryId);
            console.log(result)
            if(result.status === 0) {
                this.setState({
                    cname1: result.data.name,
                    isloading: false
                })
            }
        } else {
            let results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]);
            console.log(results)
            let cname1 = results[0].data.name;
            let cname2 = results[1].data.name;
            this.setState({
                cname1,
                cname2,
                isloading: false
            })
        }

    }

    render() {
        const {name, desc, price, detail, imgs} = this.props.location.state || {};
        const {cname1,cname2,isloading} = this.state;
        const title = (
            <span>
                <Icon type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}/>
                <span>Product Detail</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List loading={isloading}>
                    <Item style={{display: 'flex', justifyContent: 'initial' }}>
                        <span className="left" style={{marginRight:'67px'}}>Name:</span>
                        <span >{name}</span>
                    </Item>
                    <Item style={{display: 'flex', justifyContent: 'initial' }}>
                        <span className="left">Description:</span>
                        <span >{desc}</span>
                    </Item>
                    <Item style={{display: 'flex', justifyContent: 'initial' }}>
                        <span className="left" style={{marginRight:'77px'}}>Price:</span>
                        <span >{price}元</span>
                    </Item>
                    <Item style={{display: 'flex', justifyContent: 'initial' }}>
                        <span className="left" style={{marginRight:'23px'}}>Categories:</span>
                        <span >{cname1} {cname2 ? ' --> '+cname2 : ''}</span>
                    </Item>
                    <Item style={{display: 'flex', justifyContent: 'initial' }}>
                        <span className="left" style={{marginRight:'45px'}}>Pictures:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        src={BASE_IMG_URL + img}
                                        className="product-img"
                                        alt="img"
                                    />
                                ))
                            }
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}