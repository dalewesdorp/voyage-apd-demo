import type { Hotel, Collection } from '../types'

export const HOTELS: Hotel[] = [
  {
    id: 'hotel-eden',
    name: 'Hotel Eden',
    location: 'Via Ludovisi 49, Rome',
    stars: 5,
    pricePerNight: 340,
    imageEmoji: '🏨',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Breakfast'],
    description:
      'A landmark overlooking Villa Borghese gardens. Rooftop terrace with panoramic views of Rome and timeless interiors.',
    totalPrice: 1020,
    nights: 3,
  },
  {
    id: 'palazzo-hotel',
    name: 'Palazzo Hotel',
    location: 'Via Veneto 125, Rome',
    stars: 4,
    pricePerNight: 218,
    imageEmoji: '🏛️',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym'],
    description:
      'Elegant palazzo hotel in the heart of Rome with original Renaissance architecture and modern comforts.',
    totalPrice: 654,
    nights: 3,
  },
  {
    id: 'st-regis-rome',
    name: 'The St. Regis Rome',
    location: 'Via Vittorio Emanuele, Rome',
    stars: 5,
    pricePerNight: 590,
    imageEmoji: '⭐',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Butler', 'Restaurant'],
    description:
      'Iconic luxury hotel steps from the Spanish Steps, with sumptuous rooms and legendary butler service.',
    totalPrice: 1770,
    nights: 3,
  },
  {
    id: 'boutique-trastevere',
    name: 'Boutique Trastevere',
    location: 'Via della Lungaretta, Rome',
    stars: 4,
    pricePerNight: 175,
    imageEmoji: '🌿',
    amenities: ['Free WiFi', 'Courtyard', 'Breakfast', 'Bar'],
    description:
      'Charming boutique hotel in the bohemian Trastevere neighbourhood, with cobblestone streets and vibrant nightlife.',
    totalPrice: 525,
    nights: 3,
  },
  {
    id: 'le-marais-boutique',
    name: 'Le Marais Boutique',
    location: 'Rue de Bretagne, Paris',
    stars: 4,
    pricePerNight: 195,
    imageEmoji: '🗼',
    amenities: ['Free WiFi', 'Restaurant', 'Concierge'],
    description:
      'Stylish boutique hotel in the heart of Le Marais, Paris. Walking distance to the Pompidou Centre.',
    totalPrice: 585,
    nights: 3,
  },
  {
    id: 'amalfi-view',
    name: 'Amalfi View Hotel',
    location: 'Via Pantaleone Comite, Amalfi',
    stars: 4,
    pricePerNight: 285,
    imageEmoji: '🌊',
    amenities: ['Pool', 'Sea View', 'Restaurant', 'Spa'],
    description:
      'Perched on the cliff with breathtaking views of the Amalfi Coast. Infinity pool overlooking the Mediterranean.',
    totalPrice: 855,
    nights: 3,
  },
]

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-italy',
    name: 'Italy Summer 2025',
    emoji: '🇮🇹',
    hotels: [
      { hotelId: 'hotel-eden', note: 'Great rooftop bar! Book early', savedAt: new Date().toISOString() },
      { hotelId: 'palazzo-hotel', savedAt: new Date().toISOString() },
    ],
    destinations: [
      { id: 'dest-rome', name: 'Rome — Tuscany', areasCount: 3, emoji: '🗺️' },
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'col-nyc',
    name: 'NYC Weekend',
    emoji: '🗽',
    hotels: [
      { hotelId: 'st-regis-rome', savedAt: new Date().toISOString() },
    ],
    destinations: [],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'col-honeymoon',
    name: 'Paris Honeymoon',
    emoji: '💍',
    hotels: [
      { hotelId: 'le-marais-boutique', savedAt: new Date().toISOString() },
    ],
    destinations: [
      { id: 'dest-paris', name: 'Paris', areasCount: 5, emoji: '🗺️' },
    ],
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
]
