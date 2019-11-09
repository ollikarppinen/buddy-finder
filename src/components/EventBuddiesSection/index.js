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
    <div className="hero-body">
      <div className="container">
        <h1 className="title has-text-centered">Buddies</h1>
        <BuddyList eventId={id} event={event} userUid={user.uid} />
      </div>
    </div>
  )

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

const BBuddyList = ({ events = {} }) => {
  const eventCards = Object.keys(events).map(eventUid => (
    <BuddyCard
      event={events[eventUid]}
      eventId={eventUid}
      className="tile is-child"
    />
  ))
  return <Tiling perRow={3}>{eventCards}</Tiling>
}

const BuddyCard = ({ buddy, ...otherProps }) => {
  const { description, name } = buddy
  const footer = (
    <Link
      to={`/events`}
      className="button is-info card-footer-item"
      style={{ width: '176px', margin: 'auto' }}
    >
      Connect
    </Link>
  )
  return (
    <Card
      name={name}
      description={description}
      footer={footer}
      {...otherProps}
    />
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
    <Tiling perRow={3}>
      {candidates.map(uid => (
        <BuddyListItem
          userUid={userUid}
          buddyUid={uid}
          eventId={eventId}
          connected={connections[uid]}
          matchUid={matches[uid]}
        />
      ))}
    </Tiling>
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

  const { name, description } = buddy
  const footer = matchUid ? (
    <Link
      to={`/connections/${matchUid}`}
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
      description={description}
      footer={footer}
      className="tile is-child"
    />
  )
}

export default EventBuddiesSection
