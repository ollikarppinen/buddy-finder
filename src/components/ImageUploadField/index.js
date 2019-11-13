import React, { useCallback } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useDropzone } from 'react-dropzone'

import ImageContainer from '../ImageContainer'

export const ImageUploadField = ({ afterUpload, name, imageUrl }) => {
  const firebase = useFirebase()
  const imagesPath = 'uploadedImages'
  const onFilesDrop = files => {
    if (files.length !== 1) {
      alert('You can only upload 1 file')
    }
    const file = files[0]
    if (file['type'].split('/')[0] !== 'image') {
      alert('You can only upload images')
    }
    const splitFilename = file.name.split('.')
    const fileExtension = splitFilename[splitFilename.length - 1]
    if (!fileExtension) {
      alert('Missing file extension')
    }
    const options = {
      name: () => name
    }
    firebase.uploadFile(imagesPath, file, imagesPath, options).then(afterUpload)
  }

  const onDrop = useCallback(acceptedFiles => {
    onFilesDrop(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="field" {...getRootProps()}>
      <div className="file">
        <div className="file-label">
          <input
            className="file-input"
            type="file"
            name="image"
            accept="image/*"
            {...getInputProps()}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Upload</span>
          </span>
        </div>
      </div>
      <br />
      <div style={{ maxWidth: '50%' }}>
        <ImageContainer
          imageUrl={imageUrl}
          className="image is-4by3"
          style={{ margin: 0 }}
          img={{ style: { objectFit: 'cover', objectPosition: '50% 20%' } }}
        />
      </div>
    </div>
  )
}

export default ImageUploadField
