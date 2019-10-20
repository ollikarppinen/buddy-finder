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
              <div className="column is-3">
                <div className="menu">
                  <p className="menu-label">Company</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="has-text-white">
                        Customer Service
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Report
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-3">
                <div className="menu">
                  <p className="menu-label">Discover</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="has-text-white">
                        Browse Events
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Add events
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-3">
                <div className="menu">
                  <p className="menu-label">Join Us</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="has-text-white">
                        Create a new account
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Request a new password
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Account settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-3">
                <div className="menu">
                  <p className="menu-label">Terms & Policies</p>
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="has-text-white">
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="has-text-white">
                        Cookie Policy
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
