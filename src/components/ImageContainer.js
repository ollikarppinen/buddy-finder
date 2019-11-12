import React from 'react'

export const ImageContainer = ({ imageUrl, img = {}, ...props }) => {
  const src =
    imageUrl && imageUrl.length > 0
      ? imageUrl
      : 'https://bulma.io/images/placeholders/1280x960.png'
  return (
    <figure {...props}>
      <img src={src} alt="Placeholder image" {...img} />
    </figure>
  )
}

export default ImageContainer
