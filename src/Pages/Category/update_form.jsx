import React, {Component} from "react";
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'

const Item = Form.Item

class Update_form extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
         this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {categoryName} = this.props;
        return (
            <Form className="update-form">
                <Item>
                    {getFieldDecorator('categoryName', {
                        initialValue: categoryName,
                        rules: [{ required: true, message: 'Must Input' }],
                    })(
                        <Input placeholder="Please Input"/>,
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'update-form' })(Update_form)