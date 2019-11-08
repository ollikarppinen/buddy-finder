import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import { Link } from './../../util/router'

import Section from './../Section'

export const EventSection = () => {
  useFirebaseConnect([{ path: `events` }])
  const events = useSelector(state => state.firebase.data.events)

  if (!isLoaded(events)) {
    return <div>Loading...</div>
  }
  if (isEmpty(events)) {
    return <div>Events not found</div>
  }

  return (
    <Section>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title breadcrumb">
              <ul>
                <li className="is-active">
                  <Link to={`/events`} aria-current="page">
                    Events
                  </Link>
                </li>
              </ul>
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <EventList events={events} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

const EventList = ({ events = {} }) => (
  <ul>
    {Object.keys(events).map(id => (
      <li key={id}>
        <Link to={`/events/${id}`}>{events[id].name}</Link>
      </li>
    ))}
  </ul>
)

export default EventSection
