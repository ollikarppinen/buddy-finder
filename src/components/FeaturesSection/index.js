import React from 'react'
import Section from './../Section'
import SectionHeader from './../SectionHeader'
import Features from './../Features'
import './styles.scss'

function FeaturesSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <div className="FeaturesSection__box box">
          <Features
            columns={2}
            items={[
              {
                title: 'Burst your bubble',
                body: '',
                image: 'https://uploads.divjoy.com/undraw-fish_bowl_uu88.svg'
              },
              {
                title: 'Foo',
                body: '',
                image: 'https://uploads.divjoy.com/undraw-directions_x53j.svg'
              },
              {
                title: 'Bar',
                body: '',
                image:
                  'https://uploads.divjoy.com/undraw-stability_ball_b4ia.svg'
              },
              {
                title: 'Baz',
                body: '',
                image:
                  'https://uploads.divjoy.com/undraw-personal_settings_kihd.svg'
              }
            ]}
          />
        </div>
      </div>
    </Section>
  )
}

export default FeaturesSection
