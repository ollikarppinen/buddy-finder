import React, { useEffect } from 'react'
import CreateEventSection from './../../components/CreateEventSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'

const CreateEventPage = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <CreateEventSection />
}

export default CreateEventPage
