import { FETCH_ACCOUNT } from '../actions/types'

const defaultState = {}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_ACCOUNT:
      return payload
    default:
      return state
  }
}
