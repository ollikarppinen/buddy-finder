import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import classNames from 'classnames'

import Section from './../Section'
import { Link } from './../../util/router'
import ImageContainer from '../ImageContainer'

export const EventSectionContainer = ({ user, children, activeTab }) => {
  const { id } = useParams()
  const firebase = useFirebase()
  const path = `events/${id}`
  useFirebaseConnect([{ path }])

  const { [id]: event } = useSelector(state => state.firebase.data.events || {})

  if (!isLoaded(event)) {
    return <div>Loading...</div>
  }
  if (isEmpty(event)) {
    return <div>Event not found</div>
  }
  const { attendees = {}, name, location, startTime, endTime, imageUrl } = event
  const isAttending = attendees[user.uid]

  const setAttending = attending => {
    firebase.set(`${path}/attendees/${user.uid}`, attending)
    firebase.set(`users/${user.uid}/events/${user.uid}`, attending)
  }

  return (
    <Section>
      <div className="container">
        <div className="card">
          <div className="card-image">
            <ImageContainer
              imageUrl={imageUrl}
              className="image is-3by1"
              style={{ margin: 0 }}
              img={{ style: { objectFit: 'cover', objectPosition: '50% 50%' } }}
            />
          </div>
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column is-two-thirds">
                  <div className="tabs">
                    <ul>
                      <li
                        className={classNames({
                          'is-active': activeTab === 'event'
                        })}
                      >
                        <Link to={`/events/${id}`}>About</Link>
                      </li>
                      <li
                        className={classNames({
                          'is-active': activeTab === 'attendees'
                        })}
                      >
                        <Link to={`/events/${id}/attendees`}>Attendees</Link>
                      </li>
                      <li
                        className={classNames({
                          'is-active': activeTab === 'connections'
                        })}
                      >
                        <Link to={`/events/${id}/connections`}>
                          Connections
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="content">{children}</div>
                </div>
                <div className="column box">
                  <h1 className="title has-text-centered is-size-5">{name}</h1>
                  <br />
                  <div className="is-uppercase has-text-weight-bold is-size-7">
                    Where
                  </div>
                  <div>{location}</div>
                  <br />
                  <div className="is-uppercase has-text-weight-bold is-size-7">
                    Starts at
                  </div>
                  <div>{startTime}</div>
                  <br />
                  <div className="is-uppercase has-text-weight-bold is-size-7">
                    Ends at
                  </div>
                  <div>{endTime}</div>
                  <br />
                  {isAttending ? (
                    <button
                      className="button is-danger"
                      onClick={() => setAttending(false)}
                    >
                      Unattend
                    </button>
                  ) : (
                    <button
                      className="button is-success has-text-white"
                      onClick={() => setAttending(true)}
                    >
                      Attend
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default EventSectionContainer
