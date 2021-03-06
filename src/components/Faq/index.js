import React from 'react'
import FaqItem from './../FaqItem'
import './styles.scss'

function Faq(props) {
  return (
    <>
      {props.items.map((item, index) => (
        <FaqItem question={item.question} answer={item.answer} key={index} />
      ))}
    </>
  )
}

export default Faq
