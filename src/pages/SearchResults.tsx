import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HotelCard from '../components/HotelCard'
import { HOTELS } from '../data/mockData'
import type { Hotel } from '../types'

const FILTERS = ['Price', 'Stars', 'Free cancel']

export default function SearchResults() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(true)

  const handleSave = (hotel: Hotel, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowTooltip(false)
    navigate(`/hotel/${hotel.id}?save=1`)
  }

  return (
    <div className="page-enter flex flex-col h-full">
      {/* Search bar */}
      <div className="px-4 pt-12 pb-3 bg-bg">
        <div className="bg-inputbg border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-light flex-shrink-0">
            <circle cx="11" cy="11" r="7" stroke="#868D98" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="#868D98" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-sm text-dark">Rome, Italy</p>
            <p className="text-light text-xs">13–25 Aug · 2 guests</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M6 12h12M9 18h6" stroke="#5E6775" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
                activeFilter === f
                  ? 'bg-h900 text-white border-h900'
                  : 'bg-white text-mid border-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2">
        <p className="text-mid text-xs">{HOTELS.length} hotels found</p>
      </div>

      {/* Hotel list */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 flex flex-col gap-3">
        {HOTELS.map((hotel, i) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onSave={handleSave}
            showTooltip={i === 0 && showTooltip}
          />
        ))}
      </div>
    </div>
  )
}
