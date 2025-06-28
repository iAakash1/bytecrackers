import React from 'react'

const PublicFeedPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Public Verification Feed</h1>
        <div className="space-y-6">
          <div className="verification-card">
            <p>Public verification results will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicFeedPage
