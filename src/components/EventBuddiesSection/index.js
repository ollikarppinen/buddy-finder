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

import Section from './../Section'

export const EventBuddiesSection = ({ user }) => {
  const { id } = useParams()

  const path = `events/${id}`
  useFirebaseConnect([{ path }])

  const { [id]: event } = useSelector(state => state.firebase.data.events || {})

  if (!isLoaded(event)) {
    return <div>Loading...</div>
  }
  if (isEmpty(event)) {
    return <div>Event not found</div>
  }

  return (
    <Section>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <div className="card-header-title breadcrumb">
              <ul>
                <li key="1">
                  <Link to={`/events`}>Events</Link>
                </li>
                <li key="2">
                  <Link to={`/events/${id}`}>{event.name}</Link>
                </li>
                <li key="3" className="is-active">
                  <Link to={path} aria-current="page">
                    Buddies
                  </Link>
                </li>
              </ul>
            </div>
          </header>
          <div className="card-content">
            <BuddyList eventId={id} event={event} userUid={user.uid} />
          </div>
          <footer className="card-footer"></footer>
        </div>
      </div>
    </Section>
  )
}

const BuddyList = ({ event, userUid, eventId }) => {
  const attendees = event.attendees || {}

  const path = `users/${userUid}`
  useFirebaseConnect([{ path }])
  const { [userUid]: user } = useSelector(
    state => state.firebase.data.users || {}
  )
  if (!isLoaded(user)) {
    return <div className="is-loading">Loading...</div>
  }
  const connections = (user.connections || {})[eventId] || {}
  const matches = (user.matches || {})[eventId] || {}

  const candidates = Object.keys(attendees).reduce(
    (acc, uid) => (uid !== userUid && attendees[uid] ? acc.concat(uid) : acc),
    []
  )
  if (candidates.length === 0) {
    return <div>No other attendees for this event :[</div>
  }

  return (
    <ul>
      {candidates.map(uid => (
        <BuddyListItem
          userUid={userUid}
          buddyUid={uid}
          eventId={eventId}
          connected={connections[uid]}
          matchUid={matches[uid]}
        />
      ))}
    </ul>
  )
}

const BuddyListItem = ({ eventId, buddyUid, userUid, connected, matchUid }) => {
  const firebase = useFirebase()
  const path = `users/${buddyUid}`
  useFirebaseConnect([{ path }])
  const { [buddyUid]: buddy } = useSelector(
    state => state.firebase.data.users || {}
  )

  if (!isLoaded(buddy)) {
    return (
      <li key={buddyUid} className="is-loading">
        Loading...
      </li>
    )
  }

  const setConnection = connection => {
    firebase.set(
      `users/${userUid}/connections/${eventId}/${buddyUid}`,
      connection
    )
    if (
      connection &&
      !matchUid &&
      ((buddy.connections || {})[eventId] || {})[userUid]
    ) {
      firebase
        .push('matches', {
          firstMatcherUid: buddyUid,
          secondMatcherUid: userUid,
          eventUid: eventId,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(({ key }) => {
          firebase.set(`users/${userUid}/matches/${eventId}/${buddyUid}`, key)
          firebase.set(`users/${buddyUid}/matches/${eventId}/${userUid}`, key)
        })
    } else if (!connection && matchUid) {
      firebase.remove(`matches/${matchUid}`).then(() => {
        firebase.remove(`users/${userUid}/matches/${eventId}/${buddyUid}`)
        firebase.remove(`users/${buddyUid}/matches/${eventId}/${userUid}`)
      })
    }
  }

  return (
    <li className="media" key={buddyUid}>
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{buddy.name}</strong>
            <br />
            {buddy.description}
          </p>
        </div>
      </div>
      <div className="media-right">
        {matchUid ? <div className="">Connected!</div> : null}
        {connected ? (
          <button
            className="button is-danger"
            onClick={() => setConnection(false)}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="button is-success"
            onClick={() => setConnection(true)}
          >
            Send connection request
          </button>
        )}
      </div>
    </li>
  )
}

export default EventBuddiesSection
