import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useFirebaseConnect,
  isLoaded,
  isEmpty,
  useFirebase
} from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import { EventSectionContainer } from '../EventSectionContainer'
import Loader from '../Loader'

export const ConnectionSection = props => {
  const { user } = props
  const { connectionUid } = useParams()
  const connectionPath = `connections/${connectionUid}`

  useFirebaseConnect([{ path: connectionPath }])

  const { [connectionUid]: connection } = useSelector(
    state => state.firebase.data.connections || {}
  )

  if (!isLoaded(connection)) {
    return <Loader />
  }
  if (isEmpty(connection)) {
    return <div>Connection not found</div>
  }

  const connectedUserUid =
    user.uid === connection.firstConnectorUid
      ? connection.secondConnectorUid
      : connection.firstConnectorUid
  return (
    <EventSectionContainer {...props} activeTab="connections">
      <ConnectedUserPanel userUid={connectedUserUid} />
      <MessagingPanel userUid={user.uid} connection={connection} />
    </EventSectionContainer>
  )
}

const ConnectedUserPanel = ({ userUid }) => {
  const userPath = `users/${userUid}`

  useFirebaseConnect([{ path: userPath }])
  const { [userUid]: user } = useSelector(
    state => state.firebase.data.users || {}
  )
  if (!isLoaded(user)) {
    return <Loader />
  }

  const {
    imageUrl = 'https://bulma.io/images/placeholders/128x128.png',
    name,
    description
  } = user

  return (
    <article className="media">
      <div className="media-left">
        <figure style={{ overflow: 'hidden' }} className="image is-128x128">
          <img
            style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
            src={imageUrl}
            alt="Image"
          />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong>
            <br />
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}

const MessagingPanel = ({ connection, userUid }) => {
  return (
    <div>
      <MessageList messages={connection.messages} userUid={userUid} />
      <MessageInput userUid={userUid} />
    </div>
  )
}

const MessageList = ({ messages = {}, userUid }) => {
  const messageUids = Object.keys(messages)
  if (messageUids.length === 0) {
    return (
      <div className="has-text-grey title has-text-centered has-text-weight-light is-size-6">
        No messages
      </div>
    )
  }

  return (
    <div className="field">
      {messageUids.map(messageUid => (
        <Message message={messages[messageUid]} userUid={userUid} />
      ))}
    </div>
  )
}

const Message = ({ message, userUid }) => {
  const { content } = message
  return (
    <article
      className={classNames('message', {
        'is-success': message.userUid === userUid
      })}
    >
      <div className="message-body">{content}</div>
    </article>
  )
}

const MessageInput = ({ userUid }) => {
  const firebase = useFirebase()
  const { connectionUid } = useParams()
  const [message, setMessage] = useState('')
  const onSend = () => {
    firebase.push(`connections/${connectionUid}/messages`, {
      userUid,
      content: message,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    })
    setMessage('')
  }
  const onChange = event => setMessage(event.target.value)
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      onSend()
    }
  }

  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={message}
        />
      </div>
      <div class="control">
        <button className="button is-success has-text-white" onClick={onSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ConnectionSection
