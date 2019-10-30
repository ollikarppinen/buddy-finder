import React, { useEffect } from 'react'
import EventsSection from './../../components/EventsSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'

const EventsPage = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <EventsSection />
}

export default EventsPage
