
export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS': {
      return {...state, poems: action.payload}
    }
    default:
      return ''
  }
}