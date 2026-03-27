export interface Hotel {
  id: string
  name: string
  location: string
  stars: number
  pricePerNight: number
  imageEmoji: string
  amenities: string[]
  description: string
  totalPrice?: number
  nights?: number
}

export interface SavedHotel {
  hotelId: string
  note?: string
  savedAt: string
}

export interface Collection {
  id: string
  name: string
  emoji: string
  notes?: string
  hotels: SavedHotel[]
  destinations: Destination[]
  createdAt: string
}

export interface Destination {
  id: string
  name: string
  areasCount: number
  emoji: string
}

export interface Toast {
  id: string
  collectionName: string
  collectionId: string
}
