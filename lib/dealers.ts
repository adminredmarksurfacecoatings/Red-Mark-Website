export type Dealer = {
  id: string
  name: string
  businessName: string
  city: string
  state: string
  phone: string
  serviceAreas: string[]
  products: string[]
}

/** Mock Ludhiana dealers — replace with imported data when the list is ready. */
export const DEALERS: Dealer[] = [
  {
    id: 'ldh-001',
    name: 'Rajesh Kumar',
    businessName: 'Punjab Surface Studio',
    city: 'Ludhiana',
    state: 'Punjab',
    phone: '+91 98765 43210',
    serviceAreas: ['Ludhiana', 'Jalandhar', 'Khanna'],
    products: ['Stone Finish', 'Pebble Finish', 'Limewash'],
  },
  {
    id: 'ldh-002',
    name: 'Amit Sharma',
    businessName: 'Heritage Coating House',
    city: 'Ludhiana',
    state: 'Punjab',
    phone: '+91 98140 55678',
    serviceAreas: ['Ludhiana', 'Moga', 'Samrala'],
    products: ['Stone Finish', 'Decorative Textures', 'Mineral Finishes'],
  },
  {
    id: 'ldh-003',
    name: 'Gurpreet Singh',
    businessName: 'Red Mark Ludhiana — Model Town',
    city: 'Ludhiana',
    state: 'Punjab',
    phone: '+91 98888 12345',
    serviceAreas: ['Model Town', 'Sarabha Nagar', 'Civil Lines'],
    products: ['Stone Finish', 'Pebble Finish', 'Exterior Systems'],
  },
  {
    id: 'ldh-004',
    name: 'Vikram Malhotra',
    businessName: 'Architectural Finishes Hub',
    city: 'Ludhiana',
    state: 'Punjab',
    phone: '+91 98720 33445',
    serviceAreas: ['Ludhiana', 'Phillaur', 'Doraha'],
    products: ['Stone Finish', 'Interior Textures', 'Limewash'],
  },
  {
    id: 'ldh-005',
    name: 'Sandeep Arora',
    businessName: 'North India Texture Depot',
    city: 'Ludhiana',
    state: 'Punjab',
    phone: '+91 98155 77890',
    serviceAreas: ['Ludhiana', 'Barnala', 'Malerkotla'],
    products: ['Pebble Finish', 'Stone Finish', 'Decorative Coatings'],
  },
]

export function searchDealers(query: string): Dealer[] {
  const q = query.trim().toLowerCase()
  if (!q) return DEALERS

  return DEALERS.filter((dealer) => {
    const haystack = [
      dealer.businessName,
      dealer.name,
      dealer.city,
      dealer.state,
      ...dealer.serviceAreas,
      ...dealer.products,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function dealersInCity(city: string): Dealer[] {
  const c = city.trim().toLowerCase()
  return DEALERS.filter(
    (dealer) =>
      dealer.city.toLowerCase() === c ||
      dealer.serviceAreas.some((area) => area.toLowerCase() === c)
  )
}
