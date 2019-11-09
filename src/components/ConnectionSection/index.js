import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'

import Section from './../Section'

export const ConnectionSection = () => {
  const { id } = useParams()
  const path = `connections/${id}`
  useFirebaseConnect([{ path }])

  const { [id]: connection } = useSelector(
    state => state.firebase.data.connections || {}
  )

  if (!isLoaded(connection)) {
    return <div>Loading...</div>
  }
  if (isEmpty(connection)) {
    return <div>Connection not found</div>
  }
  return (
    <Section>
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Connection</h1>
          <ul>
            <li>createdAt: {connection.createdAt}</li>
            <li>eventUid: {connection.eventUid}</li>
            <li>firstConnectorUid: {connection.firstConnectorUid}</li>
            <li>secondConnectorUid: {connection.secondConnectorUid}</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default ConnectionSection
