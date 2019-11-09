import React, { useEffect } from 'react'
import ConnectionSection from './../../components/ConnectionSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'

const ConnectionPage = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <ConnectionSection />
}

export default ConnectionPage
