import React, { useState } from 'react'

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const analyzeContent = async () => {
    if (!file) return
    
    setIsAnalyzing(true)
    
    // Simulate AI analysis (mock data for demo)
    setTimeout(() => {
      const mockResult = {
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
      setResult(mockResult)
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          🔍 Upload Media for Verification
        </h1>
        
        {/* Upload Zone */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,video/*"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-6xl mb-4">📤</div>
              <p className="text-xl text-gray-600 mb-2">
                Drag and drop your media files here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports: Images (JPG, PNG), Videos (MP4, MOV) - Max 50MB
              </p>
            </label>
          </div>
          
          {file && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900">📁 {file.name}</p>
                  <p className="text-sm text-blue-700">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={analyzeContent}
                  disabled={isAnalyzing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
                >
                  {isAnalyzing ? '🔄 Analyzing...' : '🚀 Analyze Content'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="animate-spin text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress...</h3>
              <p className="text-gray-600 mb-4">
                Running deepfake detection algorithms on your content
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              📊 Analysis Results
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Authenticity Score */}
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${result.isAuthentic ? 'text-green-600' : 'text-red-600'}`}>
                  {result.confidence}%
                </div>
                <div className={`text-xl font-semibold ${result.isAuthentic ? 'text-green-600' : 'text-red-600'}`}>
                  {result.isAuthentic ? '✅ AUTHENTIC' : '❌ POTENTIALLY FAKE'}
                </div>
                <p className="text-gray-600 mt-2">
                  Confidence Score
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">AI Model:</span>
                  <span className="font-semibold">{result.aiModel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Face Swap Detected:</span>
                  <span className={result.details.faceSwapDetected ? 'text-red-600' : 'text-green-600'}>
                    {result.details.faceSwapDetected ? '⚠️ Yes' : '✅ No'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Lip Sync Issues:</span>
                  <span className={result.details.lipSyncInconsistency ? 'text-red-600' : 'text-green-600'}>
                    {result.details.lipSyncInconsistency ? '⚠️ Detected' : '✅ None'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Artifact Score:</span>
                  <span className="font-mono">{result.details.artifactScore}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {result.isAuthentic && (
              <div className="mt-8 text-center">
                <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  🎯 Mint Authenticity NFT
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Create an NFT certificate for this verified authentic content
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
