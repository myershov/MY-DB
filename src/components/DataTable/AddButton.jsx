import React, { Component } from "react";
import AddForm from "./AddForm.jsx";
import { Button } from "antd";
import uuid from "uuid/v4";
import { addTask } from "../../store/gameboard/actions";
import { connect } from "react-redux";
class AddButton extends Component {
  state = {
    visible: false
  };

  handleCreate = () => {
    let buff;
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;

      values.key = uuid();

      values.date = values.date.format();
      //values.sortlist = values.name + "~" + values.surName + "~" + values.email;
      this.props.onClick(values);
      buff = {
        id: values.key,
        task: values
      };
      this.props.dispatch(addTask(buff));
      form.resetFields();
      this.setState({ visible: false });

      //
    });
  };

  // TODO: Recheck and use modern way of refs
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button
          style={{ top: -48 }}
          type="primary"
          onClick={() => this.setState({ visible: true })}
        >
          Add
        </Button>
        {(this.props.selectedRow || this.state.visible) && (
          <AddForm
            selected={this.props.selectedRow}
            wrappedComponentRef={this.saveFormRef}
            onCancel={() => this.setState({ visible: false })}
            onCreate={this.handleCreate}
          />
        )}
      </div>
    );
  }
}
const mapState = state => ({
  Row: state
});

export default connect(mapState)(AddButton);
