import React from 'react'

import { useAuth } from './../../util/auth.js'
import HeroSection from './../../components/HeroSection'
import FeaturesSection from './../../components/FeaturesSection'
import ClientsSection from './../../components/ClientsSection'
import TestimonialsSection from './../../components/TestimonialsSection'
import CtaSection from './../../components/CtaSection'
import { useRouter } from './../../util/router.js'
import DashboardSection from './../../components/DashboardSection'

import './styles.scss'

export const HomePage = () => {
  const auth = useAuth()
  const router = useRouter()

  if (auth.user === false) {
    return (
      <>
        <HeroSection
          color="primary"
          size="large"
          title="Make the most of your vibrant Uni years"
          subtitle=""
          buttonText="Join"
          buttonOnClick={() => {
            router.push('/signup')
          }}
        />
        <FeaturesSection
          color="white"
          size="medium"
          title="Features"
          subtitle=""
        />
        <ClientsSection
          color="light"
          size="medium"
          title="You're in good company"
          subtitle=""
        />
        <TestimonialsSection
          color="white"
          size="medium"
          title="Here's what people are saying"
          subtitle=""
        />
        <CtaSection
          color="primary"
          size="medium"
          title="Ready to get started?"
          subtitle=""
          buttonText="Get Started"
          buttonOnClick={() => {
            router.push('/signup')
          }}
        />
      </>
    )
  }

  return (
    <DashboardSection
      color="white"
      size="large"
      title="Dashboard"
      subtitle="Coming soon...™"
    />
  )
}

export default HomePage
