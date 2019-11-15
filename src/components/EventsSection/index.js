import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import { Link } from './../../util/router'
import { Card } from '../Card'
import { Tiling } from '../Tiling'
import Loader from '../Loader'

import Section from './../Section'

export const EventSection = () => {
  useFirebaseConnect([{ path: `events` }])
  const events = useSelector(state => state.firebase.data.events)

  const categories = ['All events', 'Parties', 'Culture', 'Sport & Wellness']
  const eventlists = categories.map(category => (
    <div className="hero-body">
      <div className="container">
        <h1 className="title has-text-centered">{category}</h1>
        {isLoaded(events) ? (
          <EventList events={events} category={category} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  ))

  return <Section>{eventlists}</Section>
}

const NoEvents = () => (
  <div className="has-text-grey title has-text-centered has-text-weight-light is-size-6">
    No events
  </div>
)

const EventList = ({ events = {}, category }) => {
  var eventsInCategory = {}
  for (var event of Object.entries(events)) {
    var eventUid = event[0]
    var eventData = event[1]
    if (eventData['category'] === category || category == 'All events') {
      eventsInCategory[eventUid] = eventData
    }
  }
  if (isEmpty(eventsInCategory)) {
    return <NoEvents />
  }
  const eventCards = Object.keys(eventsInCategory).map(eventUid => (
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
      className="button card-footer-item"
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
