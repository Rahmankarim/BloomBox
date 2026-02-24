'use client'

import { OCCASIONS } from '@/lib/bouquet-data'
import {
  Heart,
  Cake,
  Gem,
  HeartHandshake,
  GraduationCap,
  Users,
  HandHeart,
  Stethoscope,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Cake,
  Gem,
  HeartHandshake,
  GraduationCap,
  Users,
  HandHeart,
  Stethoscope,
}

interface OccasionSelectorProps {
  selected: string
  onSelect: (occasion: string) => void
}

export function OccasionSelector({ selected, onSelect }: OccasionSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-lg font-semibold text-foreground">
        What is the Occasion?
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {OCCASIONS.map((occasion) => {
          const Icon = ICON_MAP[occasion.icon]
          const isSelected = selected === occasion.id
          return (
            <button
              key={occasion.id}
              onClick={() => onSelect(occasion.id)}
              className={`glass flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all duration-300 ${
                isSelected
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/10'
                  : 'hover:shadow-md'
              }`}
              aria-pressed={isSelected}
            >
              {Icon && (
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              )}
              <span
                className={`text-[11px] font-medium transition-colors ${
                  isSelected ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {occasion.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
