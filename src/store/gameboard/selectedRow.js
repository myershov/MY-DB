const initialState = []

const selectedRow = (state = initialState, action) => {
  const s = {
    'select.row': () => action.row,
  }
  return s[action.type] ? s[action.type]() : state
}

export default selectedRow
