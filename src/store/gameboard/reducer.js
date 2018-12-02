const initialState = []

const tasks = (state = initialState, action) => {
  const o = {
    'get tasks': () => action.tasks,
    'add task': () => [...state, action.task],
    'remove task': () => state.filter(task => task.id !== action.task.id),
  }
  return o[action.type] ? o[action.type]() : state
}

export default tasks
