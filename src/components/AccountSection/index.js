import React from 'react'
import Section from './../Section'
import SectionHeader from './../SectionHeader'
import './styles.scss'

const AccountSection = ({ title, subtitle, color, size }) => {
  return (
    <Section color={color} size={size}>
      <div className="container">
        <div className="card">
          <header class="card-header">
            <p class="card-header-title">{title}</p>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris.
              <a href="#">@bulmaio</a>. <a href="#">#css</a>{' '}
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">
              Save
            </a>
            <a href="#" class="card-footer-item">
              Edit
            </a>
            <a href="#" class="card-footer-item">
              Delete
            </a>
          </footer>
        </div>
      </div>
    </Section>
  )
}

export default AccountSection
