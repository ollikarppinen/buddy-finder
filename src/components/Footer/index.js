import React from 'react'
import Section from './../Section'
import { Link } from './../../util/router.js'
import Divider from './../../components/Divider'
import './styles.scss'

function Footer(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="FooterComponent__container container">
        <div className="columns">
          <div className="column is-8 is-10-widescreen is-offset-1-widescreen is-offset-2">
            <div className="columns">
              <div className="column is-4">
                <div className="menu">
                  <p className="menu-label">Discover</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/events" className="has-text-white">
                        Browse Events
                      </Link>
                    </li>
                    <li>
                      <Link to="/create_event" className="has-text-white">
                        Add events
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-4">
                <div className="menu">
                  <p className="menu-label">Join Us</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/signup" className="has-text-white">
                        Create a new account
                      </Link>
                    </li>
                    <li>
                      <Link to="/forgotpass" className="has-text-white">
                        Request a new password
                      </Link>
                    </li>
                    <li>
                      <Link to="/account" className="has-text-white">
                        Account settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-4">
                <div className="menu">
                  <p className="menu-label">Site</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/contact" className="has-text-white">
                        Contact us
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="has-text-white">
                        about
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq" className="has-text-white">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Divider color="white" />
            <span className="has-text-weight-light is-size-7">
              © 2019 BuddyFinder, Inc. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Footer
