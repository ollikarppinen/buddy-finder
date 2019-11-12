import React from 'react'

import ImageContainer from '../ImageContainer'

export const Card = ({
  name = '',
  description = '',
  imageUrl,
  footer,
  className,
  ...otherProps
}) => {
  const truncatedDescription =
    description.slice(0, 140) + (description.length > 140 ? '...' : '')
  return (
    <div
      className={className + ' card'}
      {...otherProps}
      style={{ paddingBottom: '96px' }}
    >
      <div className="card-image">
        <ImageContainer
          imageUrl={imageUrl}
          className="image is-4by3"
          style={{ margin: 0 }}
          img={{ style: { objectFit: 'cover', objectPosition: '50% 20%' } }}
        />
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
          </div>
        </div>

        <div className="content">{truncatedDescription}</div>
      </div>
      <footer
        className="card-footer has-text-centered"
        style={{
          position: 'absolute',
          bottom: '32px',
          height: '32px',
          width: '100%',
          display: 'inline-block'
        }}
      >
        {footer}
      </footer>
    </div>
  )
}

export default Card
