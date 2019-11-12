import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useFirebase, isLoaded } from 'react-redux-firebase'
import { useRouter } from './../../util/router.js'

import Section from './../Section'
import ImageContainer from '../ImageContainer'

import './styles.scss'

const CreateEventSection = ({ auth }) => {
  return (
    <Section>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Create Event</p>
          </header>
          <div className="card-content">
            <div className="content">
              {isLoaded(auth) ? <EventForm userUid={auth.uid} /> : 'loading...'}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

const EventForm = ({ userUid }) => {
  const router = useRouter()
  const firebase = useFirebase()
  const onCreateEvent = event => {
    event.preventDefault()
    firebase
      .push('events', {
        name,
        description,
        location,
        startTime,
        endTime,
        userUid,
        imageUrl,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      .then(({ key }) => router.push(`/events/${key}`))
  }

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  return (
    <form>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Location</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Starts at</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Ends at</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Image URL</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>
      </div>
      <ImageContainer
        imageUrl={imageUrl}
        className="image is-3by1"
        style={{ margin: 0 }}
        img={{ style: { objectFit: 'cover', objectPosition: '50% 50%' } }}
      />
      <button onClick={onCreateEvent} className="button is-success">
        Create
      </button>
    </form>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

export default compose(connect(mapStateToProps))(CreateEventSection)
