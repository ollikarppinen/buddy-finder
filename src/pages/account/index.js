import React, { useEffect } from 'react'
import AccountSection from './../../components/AccountSection'
import { useAuth } from './../../util/auth.js'
import { useRouter } from './../../util/router.js'
import './styles.scss'

function AccountPage(props) {
  const auth = useAuth()
  const router = useRouter()

  // Redirect to /signin
  // if not signed in.
  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin')
    }
  }, [auth, router])

  return (
    <AccountSection
      color="white"
      size="large"
      title="Account"
      subtitle="Customize your account here."
    />
  )
}

export default AccountPage
