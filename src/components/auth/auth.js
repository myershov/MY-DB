import React, { Component } from "react";
import { addUserToFirebase } from "../../firebase";
import { connect } from "react-redux";
import {
  getUsersThunk,
  watchUserAddedEvent
} from "../../store/gameboard/actions";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import "./style.css";
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pass: ""
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  //   onInputChange = event => {
  //     const name = event.target.name
  //     this.setState({ [name]: event.target.value })
  //   }
  login = e => {
    let name;
    let pass;

    this.props.form.validateFields((err, values) => {
      //  console.log('Received values of form: ', values)
      name = values.userName.replace(/\s/g, "");
      pass = values.password.replace(/\s/g, "");
      let buff = this.props.tasks.Users.find(item => item.id === name);

      if (buff === undefined) {
        alert("such user not exist  ");
      } else if (buff && buff.User.password !== pass) {
        alert("incorect pass ");
      } else {
        alert("I greet U  " + name);
        localStorage.setItem("myName", name);
      }
    });
    window.location.reload();
  };

  create = () => {
    let name;
    let pass;
    let all;
    let buff;
    this.props.form.validateFields((err, values) => {
      name = values.userName.replace(/\s/g, "");
      pass = values.password.replace(/\s/g, "");
      buff = this.props.tasks.Users.find(item => item.id === name);

      if (buff === undefined) {
        if (!!values.userName && !!values.password) {
          all = { userName: name, password: pass };
          addUserToFirebase(all);
          alert("now u can loggin as " + name);
        } else {
          alert("u must put smth in login and pass fields");
        }
      } else {
        alert("user already exist");
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <div>
        <Form className="login-form" layout="inline" onSubmit={this.clearState}>
          <div className="login-div">
            <FormItem
              validateStatus={userNameError ? "error" : ""}
              help={userNameError || ""}
            >
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? "error" : ""}
              help={passwordError || ""}
            >
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>

            <FormItem>
              <Button
                className="login-form-button"
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={e => {
                  this.login(e);
                }}
              >
                {" "}
                loggin
              </Button>
              <div />
              <Button
                className="login-form-button"
                // style={{ marginLeft: 8 }}
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={() => {
                  this.create();
                }}
              >
                {" "}
                register new
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

const mapState = state => ({
  tasks: state
});

const mapDispatch = dispatch => {
  dispatch(getUsersThunk());
  watchUserAddedEvent(dispatch);
  return {};
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Form.create()(Auth))
);
