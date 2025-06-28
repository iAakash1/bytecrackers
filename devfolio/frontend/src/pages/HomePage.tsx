import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">AI Deepfake</span>
              <br />
              Authenticity Checker
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Verify the authenticity of digital content using cutting-edge AI technology and 
              mint NFT certificates for verified authentic media on the blockchain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/upload"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                📤 Verify Content Now
              </Link>
              <Link 
                to="/public-feed"
                className="inline-flex items-center px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                🔍 Browse Verified Content
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-gray-600">Total Verifications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">891</div>
              <div className="text-gray-600">Authentic Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">356</div>
              <div className="text-gray-600">Deepfakes Detected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">234</div>
              <div className="text-gray-600">NFTs Minted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to verify media authenticity and combat deepfakes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Detection
              </h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms detect deepfakes with 95%+ accuracy
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📤</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Upload
              </h3>
              <p className="text-gray-600">
                Simply drag and drop your media files for instant verification
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                NFT Certificates
              </h3>
              <p className="text-gray-600">
                Get blockchain-verified authenticity certificates as NFTs
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Public Verification
              </h3>
              <p className="text-gray-600">
                Search and verify content shared across the platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Recent Verifications
            </h2>
            <Link
              to="/public-feed"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Image</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Authentic
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Confidence</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: '94%' }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Video</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Fake
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Confidence</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: '87%' }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">5 minutes ago</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Image</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Authentic
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Confidence</span>
                  <span>96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: '96%' }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">8 minutes ago</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Verify Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users protecting themselves from deepfakes and misinformation
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            📤 Start Verification Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
