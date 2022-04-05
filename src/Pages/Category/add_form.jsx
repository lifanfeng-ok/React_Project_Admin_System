import React, {Component} from "react";
import {Form, Input, Select} from "antd";
import PropTypes from "prop-types";
const Item = Form.Item

class Add_form extends Component {
    static propTypes = {
        parentId: PropTypes.string.isRequired,
        categorys: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {parentId,categorys} = this.props;
        const {getFieldDecorator}= this.props.form;
        return (
            <Form className="add-form">

                <Item label='Category type'>
                    {getFieldDecorator('parentId', {
                            initialValue: parentId,
                            rules: [{ required: true}],
                        })(
                        <Select >
                            <Select.Option value='0' key='0'>一级分类</Select.Option>
                            {
                                categorys.map((category)=>{
                                    return (
                                        <Select.Option value={category._id} key={category._id}>
                                            {category.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </Item>
                <Item label='Category Names'>
                    {getFieldDecorator('categoryName', {
                        initialValue: '',
                        rules: [{ required: true, message: 'Must Input' }],
                    })(
                        <Input placeholder="Please input category name"/>,
                    )}
                </Item>
            </Form>
        )
    }
}
export default Form.create({ name: 'add_form' })(Add_form)