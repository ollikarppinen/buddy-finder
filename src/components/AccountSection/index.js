import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'
import Section from './../Section'

import './styles.scss'

const AccountSection = ({ title, color, size, ...props }) => {
  const { firebase, profile } = props
  return (
    <Section color={color} size={size}>
      <div className="container">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Profile</p>
          </header>
          <div className="card-content">
            <div className="content">
              <h2>Update User Profile</h2>
              <span>
                Click the button to update profile to include role parameter
              </span>
              <button onClick={() => firebase.updateProfile({ role: 'admin' })}>
                Add Role To User
              </button>
              <div>
                {isLoaded(profile)
                  ? JSON.stringify(profile, null, 2)
                  : 'Loading...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default compose(
  withFirebase,
  connect(({ firebase: { profile } }) => ({
    profile
  }))
)(AccountSection)
