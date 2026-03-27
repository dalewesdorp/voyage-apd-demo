import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SaveButton from './SaveButton'
import type { Hotel } from '../types'

interface HotelCardProps {
  hotel: Hotel
  onSave: (hotel: Hotel, e: React.MouseEvent) => void
  showTooltip?: boolean
  compact?: boolean
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="text-amber-400 text-xs">{'★'.repeat(stars)}</span>
  )
}

export default function HotelCard({ hotel, onSave, showTooltip, compact }: HotelCardProps) {
  const navigate = useNavigate()
  const { isHotelSaved } = useApp()
  const saved = isHotelSaved(hotel.id)

  return (
    <div
      className="bg-white border border-border rounded-2xl overflow-hidden flex cursor-pointer active:bg-gray-50 transition-colors"
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      {/* Image area */}
      <div className="w-[88px] min-w-[88px] bg-h100 flex items-center justify-center">
        <span className="text-3xl">{hotel.imageEmoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-extrabold text-sm text-dark truncate">{hotel.name}</p>
            <p className="text-light text-xs truncate">{hotel.location}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <StarRating stars={hotel.stars} />
              {!compact && (
                <span className="text-xs text-mid">€{hotel.totalPrice ?? hotel.pricePerNight * 3} total</span>
              )}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <SaveButton
              saved={saved}
              onClick={(e) => onSave(hotel, e)}
              size="sm"
            />
            {showTooltip && !saved && (
              <div className="absolute -top-8 right-0 bg-dark text-white text-[10px] rounded-lg px-2 py-1 whitespace-nowrap">
                Tap ♡ to save
                <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark" />
              </div>
            )}
          </div>
        </div>
        <p className="text-h900 font-semibold text-xs mt-1.5">€{hotel.pricePerNight} / night</p>
      </div>
    </div>
  )
}
