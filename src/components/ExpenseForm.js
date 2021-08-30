import React from 'react'
import moment from "moment";
import { Form, Input, Button, DatePicker } from "antd";

export default class ExpenseForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount / 100).toString() : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        calendarFocused: false,
        error: ''
      };
    }
    onDescriptionChange = (e) => {
      const description = e.target.value;
      this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
      const note = e.target.value;
      this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
      const amount = e.target.value;
  
      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState(() => ({ amount }));
      }
    };
    onDateChange = (createdAt) => {
      if (createdAt) {
        this.setState(() => ({ createdAt }));
      }
    };
    onFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        console.log("Im here",this.state)

      if (!this.state.description || !this.state.amount) {
        this.setState(() => ({ error: 'Please provide description and amount.' }));
      }
      this.setState(() => ({ error: '' }));
        this.props.onSubmit({
          description: this.state.description,
          amount: parseFloat(this.state.amount, 10) * 100,
          createdAt: this.state.createdAt.valueOf(),
          note: this.state.note
        });
    };
    render() {
      return (
        <div>
                  <Form 
                      name="Expense Form"
                      labelCol={{span: 8}}
                      wrapperCol={{span: 16}}
                      initialValues={{remember: false}}
                      onFinish={this.onSubmit}
                      >
                          <Form.Item
                              label="Description"
                              name="description"
                              rules={[{
                                  required: true,
                                  message: "Please input the desciption for the expense"
                              }]}
                              initialValue={this.state.description}
                          >
                              <Input 
                                  onChange={this.onDescriptionChange}
                              />
                          </Form.Item>
                          <Form.Item
                              label="Amount"
                              name="amount"
                              rules={[{
                                  required: true,
                                  message: "Please input the amount for the expense",
                              }]}
                              initialValue={this.state.amount}
                          >
                              <Input 
                                  type="number"
                                  onChange={this.onAmountChange}
                              />
                          </Form.Item>
                          <Form.Item
                              label="Note"
                              name="note"
                              initialValue={this.state.note}
                          >
                              <Input.TextArea 
                                  onChange={this.onNoteChange}
                              />
                          </Form.Item>
                          <Form.Item
                              label="Date"
                              name="createdAt"
                              initialValue={this.state.createdAt}
                          >
                              <DatePicker 
                                  onFocusChange={this.onDateChange}
                              />
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