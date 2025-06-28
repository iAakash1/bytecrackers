const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">AI Deepfake Authenticity Checker</h3>
            <p className="text-gray-300 mb-4">
              Protecting digital content authenticity through AI analysis and blockchain verification.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="/upload" className="text-gray-300 hover:text-white transition-colors">Upload</a></li>
              <li><a href="/public-feed" className="text-gray-300 hover:text-white transition-colors">Public Feed</a></li>
              <li><a href="/nft-gallery" className="text-gray-300 hover:text-white transition-colors">NFT Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AI Deepfake Authenticity Checker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
