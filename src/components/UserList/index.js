import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { Link } from './../../util/router'
import { Tiling } from '../Tiling'
import { Card } from '../Card'
import Loader from '../Loader'

export const UserList = ({
  onlyConnected = false,
  onlyUnconnected = false,
  ...props
}) => {
  const userUid = props.user.uid
  const { id } = useParams()

  const userPath = `users/${userUid}`
  useFirebaseConnect([{ path: userPath }])
  const eventPath = `events/${id}`
  useFirebaseConnect([{ path: eventPath }])

  const { [id]: event } = useSelector(state => state.firebase.data.events || {})
  const { [userUid]: user } = useSelector(
    state => state.firebase.data.users || {}
  )
  if (!isLoaded(user) || !isLoaded(event)) {
    return <Loader />
  }
  if (isEmpty(event)) {
    return <div>Event not found</div>
  }
  const connectionRequests = (user.connectionRequests || {})[id] || {}
  const connections = (user.connections || {})[id] || {}
  const attendees = event.attendees || {}

  const userUids = Object.keys(attendees).reduce(
    (acc, uid) =>
      uid !== userUid &&
      attendees[uid] &&
      (!onlyConnected || connections[uid]) &&
      (!onlyUnconnected || !connections[uid])
        ? acc.concat(uid)
        : acc,
    []
  )
  if (userUids.length === 0) {
    return (
      <div className="has-text-grey title has-text-centered has-text-weight-light is-size-6">
        No users found
      </div>
    )
  }

  return (
    <Tiling perRow={2}>
      {userUids.map(uid => (
        <UserListItem
          userUid={userUid}
          buddyUid={uid}
          eventId={id}
          connected={connectionRequests[uid]}
          connectionUid={connections[uid]}
        />
      ))}
    </Tiling>
  )
}

export const UserListItem = ({
  eventId,
  buddyUid,
  userUid,
  connected,
  connectionUid
}) => {
  const firebase = useFirebase()
  const path = `users/${buddyUid}`
  useFirebaseConnect([{ path }])
  const { [buddyUid]: buddy } = useSelector(
    state => state.firebase.data.users || {}
  )

  if (!isLoaded(buddy)) {
    return <Card loading className="tile is-child" />
  }

  const setConnection = connection => {
    firebase.set(
      `users/${userUid}/connectionRequests/${eventId}/${buddyUid}`,
      connection
    )
    if (
      connection &&
      !connectionUid &&
      ((buddy.connectionRequests || {})[eventId] || {})[userUid]
    ) {
      firebase
        .push('connections', {
          firstConnectorUid: buddyUid,
          secondConnectorUid: userUid,
          eventUid: eventId,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(({ key }) => {
          firebase.set(
            `users/${userUid}/connections/${eventId}/${buddyUid}`,
            key
          )
          firebase.set(
            `users/${buddyUid}/connections/${eventId}/${userUid}`,
            key
          )
        })
    } else if (!connection && connectionUid) {
      firebase.remove(`connections/${connectionUid}`).then(() => {
        firebase.remove(`users/${userUid}/connections/${eventId}/${buddyUid}`)
        firebase.remove(`users/${buddyUid}/connections/${eventId}/${userUid}`)
      })
    }
  }

  const { name, description, imageUrl } = buddy
  const footer = connectionUid ? (
    <Link
      to={`/events/${eventId}/connections/${connectionUid}`}
      className="button is-success has-text-white card-footer-item"
      style={{ width: '176px', margin: 'auto' }}
    >
      See connection
    </Link>
  ) : connected ? (
    <button
      className="button is-danger card-footer-item"
      onClick={() => setConnection(false)}
      style={{ width: '176px', margin: 'auto', lineHeight: '10px' }}
    >
      Cancel request
    </button>
  ) : (
    <button
      className="button is-success card-footer-item has-text-white"
      onClick={() => setConnection(true)}
      style={{ width: '176px', margin: 'auto', lineHeight: '10px' }}
    >
      Send connection request
    </button>
  )

  return (
    <Card
      name={name}
      imageUrl={imageUrl}
      description={description}
      footer={footer}
      className="tile is-child"
    />
  )
}

export default UserList
