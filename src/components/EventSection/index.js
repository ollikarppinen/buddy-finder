import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import Section from './../Section'

const eventFields = [
  'createdAt',
  'description',
  'endTime',
  'location',
  'name',
  'startTime'
]

export const EventSection = () => {
  const { id } = useParams()
  useFirebaseConnect([{ path: `events/${id}` }])
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
            <p className="card-header-title">Event</p>
          </header>
          <div className="card-content">
            <div className="content">
              {eventFields.map(key => (
                <div>
                  {key}: {event[key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default EventSection
