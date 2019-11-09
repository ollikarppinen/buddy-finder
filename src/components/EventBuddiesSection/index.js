import React from 'react'
import { EventSectionContainer } from '../EventSectionContainer'
import { UserList } from '../UserList'

export const EventBuddiesSection = props => (
  <EventSectionContainer {...props} activeTab="attendees">
    <UserList {...props} onlyUnconnected />
  </EventSectionContainer>
)

export default EventBuddiesSection
