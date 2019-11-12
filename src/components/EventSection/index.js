import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import EventSectionContainer from '../EventSectionContainer'
import Loader from '../Loader'

const EventSection = props => {
  const { id } = useParams()
  const path = `events/${id}`
  useFirebaseConnect([{ path }])

  const { [id]: event } = useSelector(state => state.firebase.data.events || {})

  if (!isLoaded(event)) {
    return <Loader />
  }
  if (isEmpty(event)) {
    return <div>Event not found</div>
  }

  return (
    <EventSectionContainer {...props} activeTab="event">
      {event.description}
    </EventSectionContainer>
  )
}

export default EventSection
