import React, { useEffect } from 'react'
import AccountSection from './../../components/AccountSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'
import './styles.scss'

const AccountPage = ({ fetchAccount }) => {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return <AccountSection />
}

export default AccountPage
