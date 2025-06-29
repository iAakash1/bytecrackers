import React from 'react'

const PublicFeedPage: React.FC = () => {
  // Mock verified content data
  const verifiedContent = [
    {
      id: 1,
      title: "Presidential Speech - State of Union 2024",
      type: "video",
      confidence: 94,
      timestamp: "2024-06-28T10:30:00Z",
      verifier: "0x1234...5678",
      thumbnail: "🎥",
      nftMinted: true
    },
    {
      id: 2,
      title: "Breaking News Interview",
      type: "video", 
      confidence: 89,
      timestamp: "2024-06-28T09:15:00Z",
      verifier: "0xabcd...efgh",
      thumbnail: "📺",
      nftMinted: true
    },
    {
      id: 3,
      title: "Celebrity Red Carpet Photo",
      type: "image",
      confidence: 96,
      timestamp: "2024-06-28T08:45:00Z",
      verifier: "0x9999...1111",
      thumbnail: "📸",
      nftMinted: false
    },
    {
      id: 4,
      title: "Sports Victory Celebration",
      type: "video",
      confidence: 91,
      timestamp: "2024-06-27T20:30:00Z",
      verifier: "0x2222...3333",
      thumbnail: "🏆",
      nftMinted: true
    },
    {
      id: 5,
      title: "Corporate CEO Announcement",
      type: "video",
      confidence: 87,
      timestamp: "2024-06-27T15:20:00Z",
      verifier: "0x4444...5555",
      thumbnail: "💼",
      nftMinted: false
    },
    {
      id: 6,
      title: "Concert Performance Clip",
      type: "video",
      confidence: 93,
      timestamp: "2024-06-27T12:10:00Z",
      verifier: "0x6666...7777",
      thumbnail: "🎵",
      nftMinted: true
    }
  ]

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000 / 60) // minutes
    
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🌍 Public Verification Feed
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore recently verified authentic content from our global community
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold">
              🔥 All Content
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              🎥 Videos
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              📸 Images
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              🎯 NFT Minted
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedContent.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-6xl">{item.thumbnail}</div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                {/* Verification Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-green-600 text-2xl">✅</span>
                      <span className="font-bold text-green-600">{item.confidence}%</span>
                    </div>
                    <span className="text-sm text-gray-500">VERIFIED</span>
                  </div>
                  
                  {item.nftMinted && (
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                      🎯 NFT
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{item.type.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified:</span>
                    <span className="font-medium">{formatTimeAgo(item.timestamp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verifier:</span>
                    <span className="font-mono text-xs">{item.verifier}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                    🔍 View Details
                  </button>
                  {!item.nftMinted && (
                    <button className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">
                      🎯 Mint NFT
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            📄 Load More Content
          </button>
        </div>
      </div>
    </div>
  )
}

export default PublicFeedPage
