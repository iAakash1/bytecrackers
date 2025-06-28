import React from 'react'

const UploadPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Upload Media for Verification</h1>
        <div className="upload-zone">
          <p>Drag and drop your media files here or click to browse</p>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
