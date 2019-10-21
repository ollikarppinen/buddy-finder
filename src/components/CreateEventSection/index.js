import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'
import { useDebounce } from 'react-use'

import Section from './../Section'

import './styles.scss'

const CreateEventSection = ({ firebase, auth }) => {
  const onCreate = () => {}

  return (
    <Section>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Create Event</p>
          </header>
          <div className="card-content">
            <div className="content">
              {isLoaded(auth) ? (
                <EventForm onCreate={onCreate} />
              ) : (
                'loading...'
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

const EventForm = ({ onCreate }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
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
    </form>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(CreateEventSection)
