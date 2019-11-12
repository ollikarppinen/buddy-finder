import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import { Link } from './../../util/router'
import { Card } from '../Card'
import { Tiling } from '../Tiling'

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
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Events</h1>
          <EventList events={events} />
        </div>
      </div>
    </Section>
  )
}

const EventList = ({ events = {} }) => {
  const eventCards = Object.keys(events).map(eventUid => (
    <EventCard
      event={events[eventUid]}
      eventId={eventUid}
      className="tile is-child"
    />
  ))
  return <Tiling perRow={3}>{eventCards}</Tiling>
}

const EventCard = ({ event, eventId, ...otherProps }) => {
  const { description, name, imageUrl } = event
  const footer = (
    <Link
      to={`/events/${eventId}`}
      className="button is-info card-footer-item"
      style={{ width: '176px', margin: 'auto' }}
    >
      Read more
    </Link>
  )
  return (
    <Card
      name={name}
      description={description}
      imageUrl={imageUrl}
      footer={footer}
      {...otherProps}
    />
  )
}

export default EventSection
