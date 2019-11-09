import React from 'react'
import { EventSectionContainer } from '../EventSectionContainer'
import { UserList } from '../UserList'

export const ConnectionsSection = props => (
  <EventSectionContainer {...props} activeTab="connections">
    <UserList {...props} onlyConnected />
  </EventSectionContainer>
)

export default ConnectionsSection
