import React from 'react'
import { Form, Input, Button, DatePicker } from "antd";

export default class ExpenseForm extends React.Component {
    onSubmit = (e) =>{
        this.props.onSubmit(this.state)
    }
    render() {
        return (
            <div>
                <Form 
                    name="Expense Form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: false}}
                    onFinish={(values) => {
                        this.setState(()=> ({
                            description: values.description,
                            amount: values.amount,
                            note: values.note,
                            createdAt: values.createdAt._d.valueOf()
                        }))
                        this.onSubmit()
                    }}
                    >
                        <Form.Item
                            label="Description"
                            name="description"
                            initialValue=""
                            rules={[{
                                required: true,
                                message: "Please input the desciption for the expense"
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{
                                required: true,
                                message: "Please input the amount for the expense",
                            }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            label="Note"
                            name="note"
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Date"
                            name="createdAt"
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            </div>
        )
    }
}