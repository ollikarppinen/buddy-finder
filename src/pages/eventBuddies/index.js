import React, { useEffect } from 'react'
import EventBuddiesSection from './../../components/EventBuddiesSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'

const EventBuddiesPage = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <EventBuddiesSection user={auth.user} />
}

export default EventBuddiesPage
