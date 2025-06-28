import { Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import VerificationPage from './pages/VerificationPage'
import NFTGalleryPage from './pages/NFTGalleryPage'
import PublicFeedPage from './pages/PublicFeedPage'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/verification/:id" element={<VerificationPage />} />
          <Route path="/nft-gallery" element={<NFTGalleryPage />} />
          <Route path="/public-feed" element={<PublicFeedPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
