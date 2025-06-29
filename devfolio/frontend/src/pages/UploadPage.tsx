import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  PhotoIcon, 
  CloudArrowUpIcon, 
  CheckBadgeIcon, 
  ExclamationTriangleIcon,
  CpuChipIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface AnalysisResult {
  confidence: number
  isAuthentic: boolean
  aiModel: string
  timestamp: string
  details: {
    faceSwapDetected: boolean
    lipSyncInconsistency: boolean
    artifactScore: string
  }
}

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setProgress(0)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  })

  const analyzeContent = async () => {
    if (!file) return
    
    setIsAnalyzing(true)
    setProgress(0)
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 200)
    
    // Simulate AI analysis (mock data for demo)
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        confidence: Math.random() > 0.3 ? 87 + Math.floor(Math.random() * 10) : 23 + Math.floor(Math.random() * 30),
        isAuthentic: Math.random() > 0.3,
        aiModel: "DeepFake Detector v2.1",
        timestamp: new Date().toISOString(),
        details: {
          faceSwapDetected: Math.random() > 0.7,
          lipSyncInconsistency: Math.random() > 0.8,
          artifactScore: (Math.random() * 0.4).toFixed(3)
        }
      }
      clearInterval(progressInterval)
      setProgress(100)
      setResult(mockResult)
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upload & Verify Content
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Upload your images or videos to detect AI-generated deepfakes with our advanced machine learning algorithms.
            </p>
          </motion.div>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragActive 
                  ? 'border-blue-400 bg-blue-400/10' 
                  : 'border-white/20 hover:border-blue-400/50 hover:bg-white/5'
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={{ 
                  scale: isDragActive ? 1.1 : 1,
                  rotate: isDragActive ? 5 : 0 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              </motion.div>
              
              {isDragActive ? (
                <p className="text-xl text-blue-300 mb-2 font-semibold">
                  Drop your files here!
                </p>
              ) : (
                <>
                  <p className="text-xl text-white mb-2 font-semibold">
                    Drag and drop your media files here
                  </p>
                  <p className="text-gray-400 mb-4">
                    or click to browse your files
                  </p>
                </>
              )}
              
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span className="bg-white/10 px-3 py-1 rounded-full">JPG</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">PNG</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">MP4</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">MOV</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">Max 50MB</span>
              </div>
            </div>
            
            {/* File Preview */}
            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <PhotoIcon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{file.name}</p>
                        <p className="text-sm text-gray-400">
                          Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={analyzeContent}
                      disabled={isAnalyzing}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 font-semibold flex items-center gap-2 shadow-lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <CpuChipIcon className="w-5 h-5" />
                          </motion.div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <CpuChipIcon className="w-5 h-5" />
                          Analyze Content
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Analysis Progress */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-6"
                  >
                    <CpuChipIcon className="w-full h-full text-blue-400" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">AI Analysis in Progress</h3>
                  <p className="text-gray-300 mb-6">
                    Running advanced deepfake detection algorithms on your content
                  </p>
                  <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    {progress.toFixed(0)}% Complete
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      result.isAuthentic 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {result.isAuthentic ? (
                      <CheckBadgeIcon className="w-10 h-10" />
                    ) : (
                      <ExclamationTriangleIcon className="w-10 h-10" />
                    )}
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {result.isAuthentic ? 'Content Verified ✓' : 'Potential Deepfake Detected ⚠️'}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-gray-400">Confidence:</span>
                    <span className={`text-2xl font-bold ${
                      result.isAuthentic ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Analysis Details */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CpuChipIcon className="w-5 h-5" />
                      Analysis Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Face Swap Detected:</span>
                        <span className={`font-semibold ${result.details.faceSwapDetected ? 'text-red-400' : 'text-green-400'}`}>
                          {result.details.faceSwapDetected ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Lip Sync Issues:</span>
                        <span className={`font-semibold ${result.details.lipSyncInconsistency ? 'text-red-400' : 'text-green-400'}`}>
                          {result.details.lipSyncInconsistency ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Artifact Score:</span>
                        <span className="text-white font-semibold">{result.details.artifactScore}</span>
                      </div>
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5" />
                      System Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">AI Model:</span>
                        <span className="text-white font-semibold">{result.aiModel}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Analysis Time:</span>
                        <span className="text-white font-semibold flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">File Size:</span>
                        <span className="text-white font-semibold">
                          {(file!.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFile(null)
                      setResult(null)
                      setProgress(0)
                    }}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 font-semibold flex items-center justify-center gap-2 border border-white/20"
                  >
                    <CloudArrowUpIcon className="w-5 h-5" />
                    Analyze Another File
                  </motion.button>
                  
                  {result.isAuthentic && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 font-semibold flex items-center gap-2 shadow-lg"
                    >
                      <CheckBadgeIcon className="w-5 h-5" />
                      Mint Authenticity NFT
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
