const REMOVE_USER = "session/REMOVE_USER"

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null }

export const logout = () => async (dispatch) => {
  dispatch(removeUser())
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_USER:
      return { user: null }

    default:
      return state
  }
}
