import React from 'react'
import FaqSection from './../../components/FaqSection'
import CtaSection from './../../components/CtaSection'
import { useRouter } from './../../util/router.js'
import './styles.scss'

function FaqPage(props) {
  const router = useRouter()

  return (
    <>
      <FaqSection
        color="white"
        size="medium"
        title="Frequently Asked Questions"
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

export default FaqPage
