import { FETCH_ACCOUNT } from '../actions/types'

const defaultState = {}

export default (state = defaultState, { type, payload, ...action }) => {
  switch (type) {
    case FETCH_ACCOUNT:
      return payload
    default:
      return state
  }
}
