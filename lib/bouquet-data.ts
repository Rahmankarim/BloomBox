export interface Flower {
  id: string
  name: string
  emoji: string
  color: string
  description: string
  image: string
}

export interface FlowerPosition {
  flowerId: string
  x: number
  y: number
  rotation: number
  scale: number
}

export interface BouquetConfig {
  flowers: { flowerId: string; count: number }[]
  positions?: FlowerPosition[]
  background: string
  occasion: string
  message: string
  senderName: string
  receiverName: string
}

export const FLOWERS: Flower[] = [
  {
    id: 'purple-flower',
    name: 'Purple Bloom',
    emoji: '💜',
    color: '#9370DB',
    description: 'Mystery and grace',
    image: '/flowers/purple-flower.png',
  },
  {
    id: 'plumeria',
    name: 'Plumeria',
    emoji: '🌸',
    color: '#FF7F50',
    description: 'Tropical beauty',
    image: '/flowers/plumeria.png',
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    emoji: '🌻',
    color: '#FFD700',
    description: 'Joy and happiness',
    image: '/flowers/sunflower.png',
  },
  {
    id: 'orange-dahlia',
    name: 'Orange Dahlia',
    emoji: '🌼',
    color: '#FF8C00',
    description: 'Elegance and dignity',
    image: '/flowers/orange-dahlia.png',
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    emoji: '🌺',
    color: '#FFA500',
    description: 'Harmony and peace',
    image: '/flowers/cosmos.png',
  },
  {
    id: 'zinnia',
    name: 'Zinnia',
    emoji: '🌺',
    color: '#DC143C',
    description: 'Enduring friendship',
    image: '/flowers/zinnia.png',
  },
]

export const BACKGROUNDS = [
  { id: 'blush', name: 'Blush', color: '#FFE8EE' },
  { id: 'cream', name: 'Cream', color: '#FFF9F0' },
  { id: 'lavender', name: 'Lavender', color: '#F0E8F8' },
  { id: 'sage', name: 'Sage', color: '#E8F5E0' },
  { id: 'sunset', name: 'Sunset', color: '#FFF0E5' },
]

export const OCCASIONS = [
  { id: 'love', name: 'Love', icon: 'Heart' },
  { id: 'birthday', name: 'Birthday', icon: 'Cake' },
  { id: 'anniversary', name: 'Anniversary', icon: 'Gem' },
  { id: 'sorry', name: 'Sorry', icon: 'HeartHandshake' },
  { id: 'graduation', name: 'Graduation', icon: 'GraduationCap' },
  { id: 'friendship', name: 'Friendship', icon: 'Users' },
  { id: 'thank-you', name: 'Thank You', icon: 'HandHeart' },
  { id: 'get-well', name: 'Get Well', icon: 'Stethoscope' },
]

export const MESSAGE_SUGGESTIONS: Record<string, string[]> = {
  love: [
    'Every moment with you is a beautiful memory in the making.',
    'You are the most beautiful chapter of my life story.',
    'My heart chose you, and it makes the best decisions.',
    'In a garden full of flowers, I would still pick you.',
  ],
  birthday: [
    'May your birthday bloom with joy and laughter!',
    'Another year of being absolutely wonderful. Happy Birthday!',
    'Wishing you a day as beautiful as your smile!',
    'May this year bring you fields of happiness!',
  ],
  anniversary: [
    'Every year with you is better than the last.',
    'Here is to another year of beautiful moments together.',
    'You make every day feel like a celebration.',
    'Together is the most beautiful place to be.',
  ],
  sorry: [
    'I am sorry for the clouds I brought to your sky.',
    'Please accept these flowers and my heartfelt apology.',
    'I wish I could undo my mistakes. I am truly sorry.',
    'Let these petals carry my sincere apologies to you.',
  ],
  graduation: [
    'Your hard work has bloomed into something beautiful!',
    'The world is your garden now. Go make it bloom!',
    'Congratulations on this beautiful milestone!',
    'You did it! Time to let your dreams blossom!',
  ],
  friendship: [
    'A friend like you is a rare and beautiful flower.',
    'Thank you for being the sunshine in my garden.',
    'True friends are like flowers that never fade.',
    'Our friendship blooms brighter with each passing day.',
  ],
  'thank-you': [
    'Thank you for being such a beautiful soul.',
    'Your kindness deserves a thousand flowers.',
    'Grateful for you, today and always.',
    'These flowers are a small token of my big gratitude.',
  ],
  'get-well': [
    'Sending healing petals and warm wishes your way.',
    'May these flowers bring a smile to your recovery.',
    'Wishing you a speedy recovery and brighter days ahead.',
    'Get well soon! The world needs your beautiful smile.',
  ],
}

export function encodeBouquet(config: BouquetConfig): string {
  // Create a minimal version of the config to reduce URL length
  const minimalConfig = {
    f: config.flowers.map(f => [f.flowerId, f.count]),
    p: config.positions?.map(p => [p.flowerId, Math.round(p.x), Math.round(p.y), Math.round(p.rotation * 100) / 100, Math.round(p.scale * 100) / 100]),
    b: config.background,
    o: config.occasion,
    m: config.message,
    s: config.senderName,
    r: config.receiverName,
  }
  
  const data = JSON.stringify(minimalConfig)
  // Use btoa directly on the JSON string and make it URL-safe
  return btoa(data)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function decodeBouquet(encoded: string): BouquetConfig | null {
  try {
    // Convert URL-safe base64 back to regular base64
    let base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '='
    }
    
    const data = atob(base64)
    const minimalConfig = JSON.parse(data) as any
    
    // Convert back to full config
    return {
      flowers: minimalConfig.f.map((f: any) => ({ flowerId: f[0], count: f[1] })),
      positions: minimalConfig.p?.map((p: any) => ({
        flowerId: p[0],
        x: p[1],
        y: p[2],
        rotation: p[3],
        scale: p[4],
      })),
      background: minimalConfig.b,
      occasion: minimalConfig.o,
      message: minimalConfig.m,
      senderName: minimalConfig.s,
      receiverName: minimalConfig.r,
    }
  } catch (error) {
    console.error('Failed to decode bouquet:', error)
    return null
  }
}
