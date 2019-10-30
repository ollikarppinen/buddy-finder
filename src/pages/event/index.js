import React, { useEffect } from 'react'
import EventSection from './../../components/EventSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'

const EventPage = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <EventSection />
}

export default EventPage
