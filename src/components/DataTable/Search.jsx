import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { filterTasks } from "../../store/gameboard/actions";

class Search extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values == "") {
        this.props.updateData(false);
      } else {
        this.props.updateData(true);

        console.log("Received values of form: ", values);
        this.props.dispatch(filterTasks(values.website));
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          style={{ width: "30%" }}
          placeholder="введіть ... щоб почати пошук"
          label="Пошук"
        >
          {getFieldDecorator("website", {})(<Input />)}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Знайти
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    );
  }
}

const mapState = state => ({
  tasks: state
});

export default connect(mapState)(Form.create()(Search));
