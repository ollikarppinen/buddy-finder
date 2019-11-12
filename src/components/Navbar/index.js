import React, { useState } from 'react'
import NavbarContainer from './../NavbarContainer'
import { Link } from './../../util/router.js'
import { useAuth } from './../../util/auth.js'
import logo from './../../static/logo.png'
import classNames from 'classnames'
import './styles.scss'

function Navbar(props) {
  const auth = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const closeMenu = () => {
    setMenuOpen(false)
    setAccountMenuOpen(false)
  }

  return (
    <NavbarContainer spaced={props.spaced} color={props.color}>
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
              <img className="image" src={logo} alt="Logo" />
            </Link>
          </div>
          <div
            className={classNames('navbar-burger burger', {
              'is-active': menuOpen
            })}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          className={classNames('navbar-menu', {
            'is-active': menuOpen
          })}
        >
          {auth.user && (
            <div className="navbar-end">
              <Link className="navbar-item" to="/events" onClick={closeMenu}>
                <span className="icon is-medium">
                  <i className="far fa-calendar"></i>
                </span>
                Events
              </Link>
              <div
                className={classNames('navbar-item has-dropdown', {
                  'is-active': accountMenuOpen
                })}
              >
                <div
                  className="navbar-link"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                >
                  <span className="icon is-medium">
                    <i className="far fa-user"></i>
                  </span>
                  Account
                </div>
                <div className="navbar-dropdown is-boxed">
                  <Link
                    className="navbar-item"
                    to="/account"
                    onClick={closeMenu}
                  >
                    <span className="icon is-medium">
                      <i className="fas fa-cog"></i>
                    </span>
                    Profile
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/dashboard"
                    onClick={closeMenu}
                  >
                    <span className="icon is-medium">
                      <i className="fas fa-bell"></i>
                    </span>
                    Dashboard
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/create_event"
                    onClick={closeMenu}
                  >
                    <span className="icon is-medium">
                      <i className="fas fa-calendar-plus"></i>
                    </span>
                    Create event
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/signout"
                    onClick={e => {
                      e.preventDefault()
                      closeMenu()
                      auth.signout()
                    }}
                  >
                    <span className="icon is-medium">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!auth.user && (
            <div className="navbar-end">
              <Link className="navbar-item" to="/signin">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </NavbarContainer>
  )
}

export default Navbar
