import React from 'react'
import ContentSection from './../../components/ContentSection'
import StatsSection from './../../components/StatsSection'
import TeamBiosSection from './../../components/TeamBiosSection'
import CtaSection from './../../components/CtaSection'
import { useRouter } from './../../util/router.js'
import './styles.scss'

function AboutPage(props) {
  const router = useRouter()

  return (
    <>
      <ContentSection
        color="white"
        size="large"
        title="We wont help you make money"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!"
      />
      <StatsSection
        color="light"
        size="medium"
        items={[
          {
            title: 'Tweets',
            stat: '0'
          },
          {
            title: 'Following',
            stat: '0'
          },
          {
            title: 'Followers',
            stat: '0'
          },
          {
            title: 'Likes',
            stat: '0'
          }
        ]}
      />
      <TeamBiosSection
        color="white"
        size="medium"
        title="Meet the Team"
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

export default AboutPage
