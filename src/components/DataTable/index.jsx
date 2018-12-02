import React, { Component } from "react";
import { addTaskToFirebase, removeTaskFromFirebase } from "../../firebase";
import AddButton from "./AddButton.jsx";
import { Button, Table, Divider } from "antd";
import {
  getTasksThunk,
  watchTaskAddedEvent,
  watchTaskRemovedEvent,
  getUsersThunk,
  selectRow,
  getTasks
} from "../../store/gameboard/actions";
import { connect } from "react-redux";
import { Input, InputNumber } from "antd";
import Auth from "../auth/auth";
import Edit from "./EditButton.jsx";
import Search from "./Search.jsx";
import { forEach } from "@firebase/util";

class DataTable extends Component {
  state = {
    curent: 1,
    search: false
  };
  buffForKeys = new Map();

  updateData = t => {
    this.setState({ search: t, curent: 1 });
  };

  onChangePagination = page => {
    //  debugger;
    // console.log(page);
    let key;
    let count = 11;
    let dif;

    if (page - this.state.curent == 1) {
      key = this.props.tasks[this.props.tasks.length - 1].id;
      this.buffForKeys.set(page, key);
    } else if (page - this.state.curent > 1) {
      this.buffForKeys.forEach((elem, index) => {
        if (this.state.curent == index) {
          key = elem;
          return true;
        }
      });
      count = (page - this.state.curent) * 2 + 11;
    } else if (page - this.state.curent < 1) {
      if (this.buffForKeys.has(page)) {
        key = this.buffForKeys.get(page);
      } else {
        this.buffForKeys.forEach((elem, index) => {
          if (page > index) {
            key = elem;
            count = (page - index) * 2 + 11;
            return true;
          }
        });
      }
    } else {
      key = "";
    }
    //todo:when pagination --
    console.log(this.buffForKeys);
    if (this.state.search == false) {
      this.setState({ curent: page }, () =>
        this.props.dispatch(getTasksThunk(page, key, count))
      );
    } else {
      this.props.dispatch(getTasks([]));
    }
  };

  componentDidMount() {
    this.props.dispatch(getTasksThunk());
    this.props.dispatch(getUsersThunk());
    // TODO: Recheck below
    watchTaskRemovedEvent(this.props.dispatch);
    // watchTaskAddedEvent(this.props.dispatch);
  }
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  checkUser = () => {
    if (this.props.users[0] && this.props.users[0].id) {
      let name = localStorage.getItem("myName");
      let buff = this.props.users.find(item => item.id === name);
      return buff;
    }
  };
  columns = [
    {
      title: "Дата народження",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Пошта",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Ім'я",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Прізвище",
      dataIndex: "surName",
      key: "surName"
    },
    {
      title: "по Батькові",
      dataIndex: "secondName",
      key: "secondName"
    },
    {
      title: "профессія",
      dataIndex: "job",
      key: "job"
    },
    {
      title: "номер дільниці",
      dataIndex: "numberOfPlot",
      key: "numberOfPlot"
    },
    {
      title: "Группа",
      dataIndex: "group",
      key: "group"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="javascript:void(0);"
            onClick={() => this.props.dispatch(selectRow(record))}
          >
            Change
          </a>
          <Divider type="vertical" />
          <a
            href="javascript:void(0);"
            onClick={() => removeTaskFromFirebase(record.key)}
          >
            Delete
          </a>
        </span>
      )
    }
  ];
  renderContent = () => {
    if (this.checkUser() == null) {
      return <Auth style={{ marginLeft: 8 }} />;
    } else {
      return (
        <div>
          <Search updateData={this.updateData} />
          <Edit onClick={addTaskToFirebase} />
          <Table
            pagination={{
              onChange: current => this.onChangePagination(current),
              pageSize: 10,
              total: 4420,
              simple: true,
              input: false
            }}
            columns={this.columns}
            dataSource={(this.props.tasks || []).map(i => i.task)}
          />
          <AddButton onClick={addTaskToFirebase} />
        </div>
      );
    }
  };
  render() {
    // debugger;
    //console.log(this.tasks);
    console.log(this.props.tasks);
    //console.log(this.state);
    // TODO: Add edit/delete of plans
    return <div>{this.renderContent()}</div>;
  }
}

const mapState = state => ({
  Row: state,
  tasks: state.tasks,
  users: state.Users
});

export default connect(mapState)(DataTable);
