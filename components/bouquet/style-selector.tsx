'use client'

import { BACKGROUNDS } from '@/lib/bouquet-data'
import { Check } from 'lucide-react'

interface StyleSelectorProps {
  background: string
  onBackgroundChange: (bg: string) => void
}

export function StyleSelector({
  background,
  onBackgroundChange,
}: StyleSelectorProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Background Theme
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose a backdrop color for your bouquet.
        </p>
        <div className="grid grid-cols-5 gap-4">
          {BACKGROUNDS.map((bg) => {
            const isSelected = background === bg.id
            return (
              <button
                key={bg.id}
                onClick={() => onBackgroundChange(bg.id)}
                className="flex flex-col items-center gap-2 transition-all duration-300"
                aria-pressed={isSelected}
              >
                <div
                  className={`relative h-14 w-14 rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary scale-110 shadow-lg shadow-primary/20'
                      : 'border-transparent hover:border-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: bg.color }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isSelected ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {bg.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
