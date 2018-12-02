//import firebase from 'firebase'
import uuid from 'uuid/v4'
import firebase from 'firebase/app'
import 'firebase/database'
var config = {
  apiKey: "AIzaSyDw9OImEQewWPefCQVpEb-GzfKgfaDBr5M",
  authDomain: "my-db-de8b2.firebaseapp.com",
  databaseURL: "https://my-db-de8b2.firebaseio.com",
  projectId: "my-db-de8b2",
  storageBucket: "my-db-de8b2.appspot.com",
  messagingSenderId: "608955261186"
}
firebase.initializeApp(config)

const database = firebase.database()
export default database
//firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export const addTaskToFirebase = task => {
  const id = task.key
  database.ref(`/Tasks/${id}`).set({
    task,
    id,
  })
}

export const removeTaskFromFirebase = id => {
  database.ref(`/Tasks/${id}`).remove()
}

export const addUserToFirebase = User => {
  const id = User.userName
  database.ref(`/USERS/${id}`).set({
    User,
    id,
  })
}
