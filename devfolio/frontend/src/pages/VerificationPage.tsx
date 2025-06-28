import React from 'react'
import { useParams } from 'react-router-dom'

const VerificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Verification Results - {id}
        </h1>
        <div className="verification-card">
          <p>Verification details will be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage
