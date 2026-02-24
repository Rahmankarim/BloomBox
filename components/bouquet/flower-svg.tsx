'use client'

import { FLOWERS } from '@/lib/bouquet-data'
import Image from 'next/image'
import { useState } from 'react'

interface FlowerImageProps {
  flowerId: string
  size?: number
  className?: string
  animated?: boolean
  delay?: number
}

export function FlowerSVG({
  flowerId,
  size = 100,
  className = '',
  animated = false,
  delay = 0,
}: FlowerImageProps) {
  const flower = FLOWERS.find((f) => f.id === flowerId)
  const [imageError, setImageError] = useState(false)

  if (!flower) return null

  // If image fails to load, show emoji fallback
  if (imageError) {
    return (
      <div
        className={`relative select-none flex items-center justify-center ${animated ? 'animate-bloom' : ''} ${className}`}
        style={{
          width: size,
          height: size,
          animationDelay: animated ? `${delay}ms` : undefined,
          animationFillMode: animated ? 'both' : undefined,
        }}
      >
        <div
          className="flex items-center justify-center drop-shadow-lg pointer-events-none"
          style={{
            fontSize: size * 0.7,
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
          }}
        >
          {flower.emoji}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative select-none ${animated ? 'animate-bloom' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: animated ? `${delay}ms` : undefined,
        animationFillMode: animated ? 'both' : undefined,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          mixBlendMode: 'darken',
        }}
      >
        <Image
          src={flower.image}
          alt={flower.name}
          width={size}
          height={size}
          className="object-contain drop-shadow-lg pointer-events-none"
          style={{
            mixBlendMode: 'multiply',
          }}
          draggable={false}
          priority
          unoptimized
          onError={() => setImageError(true)}
        />
      </div>
    </div>
  )
}
