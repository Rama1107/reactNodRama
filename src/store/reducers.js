import { combineReducers } from 'redux'

const INITIAL_STATE = {
  currentUseri: ''
}

export const weathet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        currentUseri: action.currentUseri,
      }
    default:
      return state
  }
}


export default combineReducers({
  weathet
})