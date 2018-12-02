import { Modal, Form, Input, DatePicker, Select } from "antd";
import React, { Component } from "react";
import moment from "moment";
const Option = Select.Option;
class AddForm extends Component {
  // TODO: Add radio, switcher and swipe between daily plan
  // and end of day status incluading totally hours worked
  state = { switch: false };
  switch = checked => {
    this.setState({ switch: !this.state.switch });
  };
  // endData = () => {
  //   if (this.props.selected && this.props.selected.date) {
  //     return moment().diff(moment(this.props.selected.date), 'minutes')
  //   } else {
  //     return '0'
  //   }
  // }
  render() {
    // console.log(this.props.selected);
    let dailyPlan = this.props.selected && this.props.selected.plan;
    let futurePlan = "";
    let Notes = "";

    if (this.props.selected && this.props.selected.key) {
      dailyPlan = this.props.selected.dailyPlan;
      futurePlan = this.props.selected.futurePlan;
      Notes = this.props.selected.notes;
    }

    const {
      form: { getFieldDecorator },
      onCancel,
      onCreate,
      visible
    } = this.props;

    return (
      <Modal
        onCancel={onCancel}
        visible
        onOk={onCreate}
        title="Daily Plan"
        okText="OK"
      >
        <Form layout="vertical">
          {this.props.selected == undefined && (
            <Form.Item label="Дата народження">
              {getFieldDecorator("date", {
                rules: [{ required: true, message: "Повинно бути заповнено" }],
                initialValue: moment()
              })(<DatePicker />)}
            </Form.Item>
          )}
          <Form.Item label="пошта">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Повинно бути заповнено" }],
              initialValue: ""
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Ім'я">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Повинно бути заповнено" }],
              initialValue: ""
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="Прізвище">
            {getFieldDecorator("surName", {
              rules: [{ required: true, message: "Повинно бути заповнено" }],
              initialValue: ""
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="По батькові">
            {getFieldDecorator("secondName", {
              rules: [{ required: true, message: "Повинно бути заповнено" }],
              initialValue: ""
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="Професія">
            {getFieldDecorator("job", {
              rules: [{ required: true, message: "Повинно бути заповнено" }],
              initialValue: ""
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="номер дільниці">
            {getFieldDecorator("numberOfPlot", {
              rules: [{ required: true, message: "Повинно бути заповнено" }],
              initialValue: ""
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item
            label="Группа"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("group", {
              rules: [{ required: true, message: "Повинно бути заповнено" }]
            })(
              <Select placeholder="виберіть одне із значень ">
                <Option value="члени">члени</Option>
                <Option value="прихильники">прихильники</Option>
                <Option value="члени двк">члени двк</Option>
                <Option value="спостерігачі">спостерігачі</Option>
                <Option value="намет">намет</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddForm);
