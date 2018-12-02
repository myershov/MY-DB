const initialState = []

export default function Users(state = initialState, action) {
  const u = {
    'get users': () => action.users,
    'add user': () => [...state, action.user],
    'remove user': () => state.filter(task => task.id !== action.task.id),
  }
  return u[action.type] ? u[action.type]() : state
}
