import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'
import { useDebounce } from 'react-use'

import Section from './../Section'

import './styles.scss'

const AccountSection = ({ firebase, profile }) => {
  return (
    <Section>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Profile</p>
          </header>
          <div className="card-content">
            <div className="content">
              {isLoaded(profile) ? (
                <ProfileForm firebase={firebase} profile={profile} />
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

const ProfileForm = ({ profile, firebase }) => {
  const [name, setName] = useState(profile.name || '')
  const [description, setDescription] = useState(profile.description || '')
  const [imageUrl, setImageUrl] = useState(profile.imageUrl || '')
  const [contactInfo, setContactInfo] = useState(profile.contactInfo || '')
  const useDebouncedFirebaseUpdate = (key, value) =>
    useDebounce(
      () => {
        firebase.updateProfile({ [key]: value })
      },
      2000,
      [value]
    )
  useDebouncedFirebaseUpdate('name', name)
  useDebouncedFirebaseUpdate('description', description)
  useDebouncedFirebaseUpdate('imageUrl', imageUrl)
  useDebouncedFirebaseUpdate('contactInfo', contactInfo)
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
        <label className="label">Contact Info</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Textarea"
            value={contactInfo}
            onChange={e => setContactInfo(e.target.value)}
          />
        </div>
      </div>
    </form>
  )
}

export default compose(
  withFirebase,
  connect(({ firebase: { profile } }) => ({
    profile
  }))
)(AccountSection)
