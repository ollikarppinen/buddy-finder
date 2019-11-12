import React from 'react'

import ReactLoader from 'react-loader-spinner'
import classNames from 'classnames'

export const Loader = ({ className }) => (
  <ReactLoader
    type="Oval"
    color="#d8d8d8"
    height={200}
    width={100}
    className={classNames(className, 'has-text-centered')}
  />
)

export default Loader
