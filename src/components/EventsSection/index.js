import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import classNames from 'classnames'

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
  const eventUidsByRow = Object.keys(events).reduce(
    (acc, eventUid) => {
      const lastArr = acc[acc.length - 1]
      if (lastArr.length >= 3) {
        acc.push([eventUid])
      } else {
        acc[acc.length - 1] = lastArr.concat(eventUid)
      }
      return acc
    },
    [[]]
  )
  console.log('eventUidsByRow', eventUidsByRow)
  return (
    <div class="tile is-ancestor">
      <div className="tile is-vertical">
        {eventUidsByRow.map((rowEventUids, rowId) => (
          <div className="tile is-parent" key={rowId}>
            {rowEventUids.map(uid => (
              <div className="tile is-parent is-4" key={uid}>
                <EventCard
                  event={events[uid]}
                  eventId={uid}
                  className="tile is-child"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const EventCard = ({ event, eventId, className = '', ...otherProps }) => {
  const { description = '', name } = event
  const truncatedDescription =
    description.slice(0, 140) + (description.length > 140 ? '...' : '')
  return (
    <div className={className + ' card'} {...otherProps}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content" style={{ marginBottom: '96px' }}>
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">{truncatedDescription}</div>
      </div>
      <footer
        className="card-footer has-text-centered"
        style={{
          position: 'absolute',
          bottom: '32px',
          height: '32px',
          width: '100%',
          display: 'inline-block'
        }}
      >
        <Link
          to={`/events/${eventId}`}
          className="button is-info card-footer-item"
          style={{ width: '176px', margin: 'auto' }}
        >
          Read more
        </Link>
      </footer>
    </div>
  )
}

export default EventSection
