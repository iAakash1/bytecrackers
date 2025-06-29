import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PhotoIcon, 
  CheckBadgeIcon, 
  XMarkIcon,
  FunnelIcon,
  EyeIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface ContentItem {
  id: string
  type: 'image' | 'video'
  title: string
  uploadDate: string
  verificationStatus: 'verified' | 'flagged' | 'pending'
  confidenceScore: number
  imageUrl: string
  category: string
  fileSize: string
}

const PublicFeedPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | 'flagged' | 'pending'>('all')
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration - using the real images we have
  const mockContent: ContentItem[] = [
    {
      id: '1',
      type: 'image',
      title: 'Portrait Photo Verification',
      uploadDate: '2024-01-15',
      verificationStatus: 'verified',
      confidenceScore: 99.7,
      imageUrl: '/images/1.jpeg',
      category: 'Portrait',
      fileSize: '2.4 MB'
    },
    {
      id: '2',
      type: 'image',
      title: 'Landscape Image Analysis',
      uploadDate: '2024-01-14',
      verificationStatus: 'verified',
      confidenceScore: 98.2,
      imageUrl: '/images/2.avif',
      category: 'Landscape',
      fileSize: '1.8 MB'
    },
    {
      id: '3',
      type: 'image',
      title: 'Street Photography Check',
      uploadDate: '2024-01-13',
      verificationStatus: 'verified',
      confidenceScore: 97.5,
      imageUrl: '/images/3.jpg',
      category: 'Street',
      fileSize: '3.1 MB'
    },
    {
      id: '4',
      type: 'image',
      title: 'Corporate Headshot',
      uploadDate: '2024-01-12',
      verificationStatus: 'flagged',
      confidenceScore: 25.3,
      imageUrl: '/images/1.jpeg',
      category: 'Corporate',
      fileSize: '2.7 MB'
    },
    {
      id: '5',
      type: 'image',
      title: 'Social Media Content',
      uploadDate: '2024-01-11',
      verificationStatus: 'pending',
      confidenceScore: 0,
      imageUrl: '/images/2.avif',
      category: 'Social',
      fileSize: '1.5 MB'
    },
    {
      id: '6',
      type: 'image',
      title: 'Event Photography',
      uploadDate: '2024-01-10',
      verificationStatus: 'verified',
      confidenceScore: 96.8,
      imageUrl: '/images/3.jpg',
      category: 'Event',
      fileSize: '4.2 MB'
    }
  ]

  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(mockContent)

  const filterOptions = [
    { key: 'all', label: 'All Content', count: mockContent.length },
    { key: 'verified', label: 'Verified', count: mockContent.filter(item => item.verificationStatus === 'verified').length },
    { key: 'flagged', label: 'Flagged', count: mockContent.filter(item => item.verificationStatus === 'flagged').length },
    { key: 'pending', label: 'Pending', count: mockContent.filter(item => item.verificationStatus === 'pending').length }
  ]

  const stats = [
    { label: 'Total Verifications', value: '1,247', icon: EyeIcon },
    { label: 'Success Rate', value: '99.7%', icon: CheckBadgeIcon },
    { label: 'Flagged Content', value: '23', icon: ExclamationTriangleIcon },
    { label: 'Processing Time', value: '< 2s', icon: ShieldCheckIcon }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredContent(mockContent)
    } else {
      setFilteredContent(mockContent.filter(item => item.verificationStatus === selectedFilter))
    }
  }, [selectedFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'flagged': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckBadgeIcon
      case 'flagged': return ExclamationTriangleIcon
      case 'pending': return CalendarDaysIcon
      default: return PhotoIcon
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white text-lg">Loading verification gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Verification Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore real-time content verification results from our AI-powered deepfake detection system.
              See how our technology identifies authentic vs. manipulated media.
            </p>
          </motion.div>

          {/* Stats Banner */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            className="flex flex-wrap gap-2 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setSelectedFilter(option.key as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedFilter === option.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <FunnelIcon className="w-4 h-4" />
                {option.label}
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {option.count}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredContent.map((item, index) => {
                const StatusIcon = getStatusIcon(item.verificationStatus)
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg border flex items-center gap-1 backdrop-blur-sm ${getStatusColor(item.verificationStatus)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-semibold capitalize">{item.verificationStatus}</span>
                      </div>
                      {item.verificationStatus === 'verified' && (
                        <div className="absolute bottom-3 left-3 bg-green-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                          {item.confidenceScore}% Authentic
                        </div>
                      )}
                      {item.verificationStatus === 'flagged' && (
                        <div className="absolute bottom-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                          {item.confidenceScore}% Confidence
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarDaysIcon className="w-4 h-4" />
                          {new Date(item.uploadDate).toLocaleDateString()}
                        </span>
                        <span>{item.fileSize}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-blue-400">View Details →</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filteredContent.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <PhotoIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No content found</h3>
              <p className="text-gray-400">Try adjusting your filter to see more results.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">{selectedItem.title}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div className={`mt-1 px-3 py-2 rounded-lg border inline-flex items-center gap-2 ${getStatusColor(selectedItem.verificationStatus)}`}>
                      {React.createElement(getStatusIcon(selectedItem.verificationStatus), { className: "w-4 h-4" })}
                      <span className="font-semibold capitalize">{selectedItem.verificationStatus}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Confidence Score</label>
                    <div className="mt-1 text-white font-semibold">
                      {selectedItem.verificationStatus === 'pending' ? 'Processing...' : `${selectedItem.confidenceScore}%`}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Upload Date</label>
                    <div className="mt-1 text-white">{new Date(selectedItem.uploadDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">File Size</label>
                    <div className="mt-1 text-white">{selectedItem.fileSize}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-400">Category</label>
                  <div className="mt-1">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {selectedItem.category}
                    </span>
                  </div>
                </div>
                {selectedItem.verificationStatus === 'verified' && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <CheckBadgeIcon className="w-5 h-5" />
                      <span className="font-semibold">Verification Complete</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      This content has been verified as authentic with {selectedItem.confidenceScore}% confidence. 
                      Our AI analysis detected no signs of manipulation or deepfake technology.
                    </p>
                  </div>
                )}
                {selectedItem.verificationStatus === 'flagged' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <ExclamationTriangleIcon className="w-5 h-5" />
                      <span className="font-semibold">Potential Manipulation Detected</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Our analysis suggests this content may be AI-generated or manipulated. 
                      Confidence level: {selectedItem.confidenceScore}%. Please verify the source.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PublicFeedPage
