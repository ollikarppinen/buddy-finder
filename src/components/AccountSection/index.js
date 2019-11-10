import React, { useState } from 'react'
import { useFirebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

import { useDebounce } from 'react-use'

import Section from './../Section'
import { ImageUploadField } from '../ImageUploadField'

import './styles.scss'

const AccountSection = ({ user }) => {
  return (
    <Section>
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Profile</h1>
          <div className="box">
            {user ? <ProfileLoader user={user} /> : 'logging in...'}
          </div>
        </div>
      </div>
    </Section>
  )
}

const ProfileLoader = ({ user }) => {
  const { uid: userUid } = user
  useFirebaseConnect([{ path: `users/${userUid}` }])
  const { [userUid]: profile } = useSelector(
    state => state.firebase.data.users || {}
  )
  if (!isLoaded(profile)) {
    return 'loading...'
  }
  return <ProfileForm profile={profile} userUid={userUid} />
}

const ProfileForm = ({ profile = {}, userUid }) => {
  const firebase = useFirebase()
  const [name, setName] = useState(profile.name || '')
  const [description, setDescription] = useState(profile.description || '')

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

  const afterUpload = e => {
    const { downloadURL, key } = e
    firebase.updateProfile({ imageUrl: downloadURL, imageUid: key })
  }

  return (
    <form>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Name</label>
        </div>
        <div className="field-body">
          <div className="field">
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
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Image</label>
        </div>

        <div className="field-body">
          <ImageUploadField afterUpload={afterUpload} name={userUid} />
        </div>
      </div>

      {profile.imageUrl ? (
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label"></label>
          </div>

          <div className="field-body">
            <figure className="image is-128x128">
              <img className="" src={profile.imageUrl} />
            </figure>
          </div>
        </div>
      ) : null}

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Description</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AccountSection
