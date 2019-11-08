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

const eventFields = [
  'createdAt',
  'description',
  'endTime',
  'location',
  'name',
  'startTime'
]

export const EventSection = ({ user }) => {
  const { id } = useParams()
  const firebase = useFirebase()
  const path = `events/${id}`
  useFirebaseConnect([{ path }])

  const { [id]: event } = useSelector(state => state.firebase.data.events || {})

  if (!isLoaded(event)) {
    return <div>Loading...</div>
  }
  if (isEmpty(event)) {
    return <div>Event not found</div>
  }

  const isAttending = (event.attendees || {})[user.uid]

  const setAttending = attending => {
    firebase.set(`${path}/attendees/${user.uid}`, attending)
    firebase.set(`users/${user.uid}/events/${user.uid}`, attending)
  }

  return (
    <Section>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title breadcrumb">
              <ul>
                <li>
                  <Link to={`/events`}>Events</Link>
                </li>
                <li className="is-active">
                  <Link to={`/events/${id}`} aria-current="page">
                    {event.name}
                  </Link>
                </li>
              </ul>
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              {eventFields.map(key => (
                <div key={key}>
                  {key}: {event[key]}
                </div>
              ))}
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              {isAttending ? (
                <button
                  className="button is-danger"
                  onClick={() => setAttending(false)}
                >
                  Unattend
                </button>
              ) : (
                <button
                  className="button is-success"
                  onClick={() => setAttending(true)}
                >
                  Attend
                </button>
              )}
            </p>
            <p className="card-footer-item">
              <Link
                className="button is-success"
                disabled={!isAttending}
                to={`/events/${id}/buddies`}
              >
                Browse buddies
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </Section>
  )
}

export default EventSection
