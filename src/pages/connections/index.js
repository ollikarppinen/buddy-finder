import React, { useEffect } from 'react'
import ConnectionsSection from './../../components/ConnectionsSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'

const ConnectionsPage = () => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <ConnectionsSection user={auth.user} />
}

export default ConnectionsPage
