import React from 'react'

const NFTGalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">My NFT Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="nft-card p-6">
            <p>Your authenticity NFTs will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTGalleryPage
