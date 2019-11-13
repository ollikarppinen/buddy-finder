import React from 'react'
import Section from './../Section'
import ImageContainer from './../ImageContainer'
import { Link } from './../../util/router'

import './styles.scss'

export const DashboardSection = () => {
  return (
    <Section>
      <div className="container">
        <div className="card">
          <div className="card-image">
            <ImageContainer
              imageUrl="https://images.unsplash.com/photo-1474525011856-4f1419f039cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80"
              className="image is-3by1"
              style={{ margin: 0 }}
              img={{ style: { objectFit: 'cover', objectPosition: '50% 50%' } }}
            />
          </div>
          <div className="card-content" style={{ minHeight: '400px' }}>
            <div className="tabs">
              <ul>
                <li className="is-active">
                  <Link to={`/`}>Dashboard</Link>
                </li>
                <li>
                  <Link to={`/`}>Upcoming events</Link>
                </li>
                <li>
                  <Link to={`/`}>Messages</Link>
                </li>
              </ul>
            </div>
            <h1 className="title has-text-grey title has-text-centered has-text-weight-light">
              Under construction...
            </h1>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default DashboardSection
