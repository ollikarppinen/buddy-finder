import React from 'react'
import Section from './../Section'
import SectionHeader from './../SectionHeader'
import './styles.scss'

function AccountSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <div className="card">
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            centered={true}
            size={3}
          />
        </div>
      </div>
    </Section>
  )
}

export default AccountSection
