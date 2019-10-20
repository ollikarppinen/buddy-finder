import { accountsRef } from '../firebase'
import { FETCH_ACCOUNT } from './types'

export const fetchAccount = () => async dispatch => {
  accountsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_ACCOUNT,
      payload: snapshot.val()
    })
  })
}
