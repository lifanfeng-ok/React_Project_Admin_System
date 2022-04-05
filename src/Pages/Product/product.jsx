import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import './product.less'
import ProductHome from './product_home'
import ProductAddUpdate from './product_add'
import ProductDetail from './product_detail'

class Product extends Component {
    state = {  }
    render() {
        return (
            <Switch>
                {/* exact 如果为 true，则只有在路径完全匹配 location.pathname 时才匹配*/}
                <Route path='/product' exact component={ProductHome} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product'/>
            </Switch>
        );
    }
}

export default Product;