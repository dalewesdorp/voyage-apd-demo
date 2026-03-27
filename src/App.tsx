import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import TabBar from './components/TabBar'
import ToastContainer from './components/Toast'
import SearchResults from './pages/SearchResults'
import HotelDetail from './pages/HotelDetail'
import SavedDashboard from './pages/SavedDashboard'
import CollectionDetail from './pages/CollectionDetail'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-mid text-sm">{title} — coming soon</p>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<SearchResults />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/explore" element={<Placeholder title="Explore" />} />
            <Route path="/saved" element={<SavedDashboard />} />
            <Route path="/saved/:id" element={<CollectionDetail />} />
            <Route path="/profile" element={<Placeholder title="Profile" />} />
          </Routes>
          <TabBar />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
