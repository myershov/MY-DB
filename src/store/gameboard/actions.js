// import { gameboardService } from "project-services";
import * as types from "./actionTypes";
import { createStore, applyMiddleware } from "redux";
import database from "../../firebase";
import thunkMiddleware from "redux-thunk";
import Reducer from "../reducers";

export const getTasks = tasks => ({ type: types.GET_TASKS, tasks });
export const addTask = task => ({ type: types.ADD_TASK, task });
export const removeTask = task => ({ type: types.REMOVE_TASK, task });
export const addUser = user => ({ type: types.ADD_USER, user });
export const selectRow = row => ({ type: types.SELECTED_ROW, row });
/**
 * LISTENERS
 */
export function watchUserAddedEvent(dispatch) {
  database.ref(`/USERS/`).on("child_added", snap => {
    dispatch(addUser(snap.val()));
  });
}
export const watchTaskAddedEvent = dispatch => {
  //  debugger;
  database.ref(`/Tasks/`).on("child_added", snap => {
    dispatch(addTask(snap.val()));
  });
};

export const watchTaskRemovedEvent = dispatch => {
  database.ref(`/Tasks/`).on("child_removed", snap => {
    dispatch(removeTask(snap.val()));
  });
};

/**
 * THUNKS
 */
function extend(base) {
  var parts = Array.prototype.slice.call(arguments, 1);
  parts.forEach(function(p) {
    if (p && typeof p === "object") {
      for (var k in p) {
        if (p.hasOwnProperty(k)) {
          base[k] = p[k];
        }
      }
    }
  });
  return base;
}

export const filterTasks = select => dispatch => {
  if (select == undefined) {
    select = "";
  }
  let buff;
  // console.log(select);
  const tasks = [];

  database
    .ref(`/Tasks/`)
    .orderByChild("task/name")
    .startAt(select)
    .endAt(select + "\uf8ff")
    .once("value", function(userSnap) {
      database
        .ref(`/Tasks/`)
        .orderByChild("task/email")
        .startAt(select)
        .endAt(select + "\uf8ff")
        .once("value", function(mediaSnap) {
          database
            .ref(`/Tasks/`)
            .orderByChild("task/surName")
            .startAt(select)
            .endAt(select + "\uf8ff")
            .once("value", function(surNameSnap) {
              buff = extend(
                {},
                userSnap.val(),
                mediaSnap.val(),
                surNameSnap.val()
              );
              Object.values(buff).forEach(data => {
                tasks.push(data);
              });
            });
        });
    })
    .then(() => dispatch(getTasks(tasks)));
};

export const getTasksThunk = (select, key, c) => dispatch => {
  //debugger;
  if (c == undefined) {
    c = 10;
  }

  const tasks = [];
  console.log("count", c);
  database
    .ref(`/Tasks`)
    .orderByChild("id")
    .limitToFirst(c)
    .startAt(key)
    .once("value", snap => {
      snap.forEach(data => {
        let task = data.val();

        tasks.push(task);
      });
    })
    .then(() => dispatch(getTasks(tasks)));
  console.log("tasks", tasks);
};
export function getUsersThunk() {
  return dispatch => {
    const users = [];
    database
      .ref(`/USERS/`)
      .once("value", snap => {
        snap.forEach(data => {
          let user = data.val();
          user && users.push(user);
        });
      })
      .then(() => dispatch({ type: types.GET_USERS, users }));
  };
}

export default createStore(Reducer, applyMiddleware(thunkMiddleware));
