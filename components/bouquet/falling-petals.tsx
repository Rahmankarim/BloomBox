'use client'

import { useEffect, useState } from 'react'

interface Petal {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  color: string
  type: 'petal' | 'heart'
}

const PETAL_COLORS = ['#FFB7C5', '#F8A4C8', '#FFD6E0', '#E8A0BF', '#FFEAA7', '#B388FF']

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 16,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      type: Math.random() > 0.7 ? 'heart' : 'petal',
    }))
    setPetals(generated)
  }, [])

  if (petals.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.type === 'heart' ? (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill={petal.color}
              opacity="0.7"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width={petal.size}
              height={petal.size * 1.3}
              viewBox="0 0 20 26"
              fill={petal.color}
              opacity="0.6"
            >
              <ellipse cx="10" cy="13" rx="8" ry="12" />
              <ellipse cx="10" cy="10" rx="5" ry="8" fill={petal.color} opacity="0.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
