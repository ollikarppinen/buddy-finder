import React from 'react'
import Navbar from './../../components/Navbar'
import HomePage from './../home'
import AboutPage from './../about'
import FaqPage from './../faq'
import ContactPage from './../contact'
import AccountPage from './../account'
import SigninPage from './../signin'
import SignupPage from './../signup'
import ForgotpassPage from './../forgotpass'
import ChangepassPage from './../changepass'
import CreateEventPage from './../createEvent'
import EventPage from './../event'
import EventsPage from './../events'
import EventBuddiesPage from './../eventBuddies'
import ConnectionPage from './../connection'
import ConnectionsPage from './../connections'
import { Switch, Route, Router } from './../../util/router.js'
import Footer from './../../components/Footer'
// import analytics from './../../util/analytics.js'
import { ProvideAuth } from './../../util/auth.js'
import './styles.scss'

function App() {
  return (
    <ProvideAuth>
      <Router>
        <>
          <Navbar
            color="primary"
            spaced={true}
            logo="../../../../public/logo.png"
          />

          <main className="site-content">
            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route exact path="/about" component={AboutPage} />

              <Route exact path="/faq" component={FaqPage} />

              <Route exact path="/contact" component={ContactPage} />

              <Route exact path="/account" component={AccountPage} />

              <Route exact path="/signin" component={SigninPage} />

              <Route exact path="/signup" component={SignupPage} />

              <Route exact path="/forgotpass" component={ForgotpassPage} />

              <Route exact path="/changepass" component={ChangepassPage} />

              <Route exact path="/create_event" component={CreateEventPage} />

              <Route exact path="/events" component={EventsPage} />

              <Route exact path="/events/:id" component={EventPage} />

              <Route exact path="/connections/:id" component={ConnectionPage} />

              <Route
                exact
                path="/events/:id/connections/:connectionUid"
                component={ConnectionPage}
              />

              <Route
                exact
                path="/events/:id/connections"
                component={ConnectionsPage}
              />

              <Route
                exact
                path="/events/:id/attendees"
                component={EventBuddiesPage}
              />

              <Route
                component={({ location }) => {
                  return (
                    <div
                      style={{
                        padding: '50px',
                        width: '100%',
                        textAlign: 'center'
                      }}
                    >
                      The page <code>{location.pathname}</code> could not be
                      found.
                    </div>
                  )
                }}
              />
            </Switch>
          </main>

          <Footer color="black" size="medium" />
        </>
      </Router>
    </ProvideAuth>
  )
}

export default App
