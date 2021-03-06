import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useFirebase, isLoaded } from 'react-redux-firebase'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'

import { useRouter } from './../../util/router.js'
import Section from './../Section'
import ImageContainer from '../ImageContainer'
import Loader from '../Loader'

import './styles.scss'

const CreateEventSection = ({ auth }) => {
  return (
    <Section>
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Create Event</h1>
          <div className="box">
            {isLoaded(auth) ? <EventForm userUid={auth.uid} /> : <Loader />}
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
        category,
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
  const [category, setCategory] = useState('')
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
        <label className="label">Category</label>
        <div className="control">
          <select
            className="select"
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Select a category for the event</option>
            <option value="Parties">Parties</option>
            <option value="Culture">Culture</option>
            <option value="Sport & Wellness">Sport & Wellness</option>
          </select>
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
          <DateTimePicker
            onChange={time => setStartTime(moment(time).unix())}
            value={
              Number.isInteger(startTime) ? new Date(startTime * 1000) : null
            }
            minDate={new Date()}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Ends at</label>
        <div className="control">
          <DateTimePicker
            onChange={time => setEndTime(moment(time).unix())}
            value={Number.isInteger(endTime) ? new Date(endTime * 1000) : null}
            minDate={new Date()}
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
        <br />
        <ImageContainer
          imageUrl={imageUrl}
          className="image is-3by1"
          style={{ margin: 0 }}
          img={{ style: { objectFit: 'cover', objectPosition: '50% 50%' } }}
        />
      </div>
      <button onClick={onCreateEvent} className="button is-large">
        Create
      </button>
    </form>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

export default compose(connect(mapStateToProps))(CreateEventSection)
