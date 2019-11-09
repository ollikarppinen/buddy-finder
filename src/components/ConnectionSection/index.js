import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'

import { EventSectionContainer } from '../EventSectionContainer'

export const ConnectionSection = props => {
  const { connectionUid } = useParams()
  const path = `connections/${connectionUid}`
  useFirebaseConnect([{ path }])

  const { [connectionUid]: connection } = useSelector(
    state => state.firebase.data.connections || {}
  )

  if (!isLoaded(connection)) {
    return <div>Loading...</div>
  }
  if (isEmpty(connection)) {
    return <div>Connection not found</div>
  }

  return (
    <EventSectionContainer {...props} activeTab="connections">
      <ul>
        <li>createdAt: {connection.createdAt}</li>
        <li>eventUid: {connection.eventUid}</li>
        <li>firstConnectorUid: {connection.firstConnectorUid}</li>
        <li>secondConnectorUid: {connection.secondConnectorUid}</li>
      </ul>
    </EventSectionContainer>
  )
}

export default ConnectionSection
