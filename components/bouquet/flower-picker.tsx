'use client'

import { FLOWERS } from '@/lib/bouquet-data'
import { FlowerSVG } from './flower-svg'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlowerPickerProps {
  selectedFlowers: { flowerId: string; count: number }[]
  onUpdate: (flowers: { flowerId: string; count: number }[]) => void
  maxTotal?: number
}

export function FlowerPicker({ selectedFlowers, onUpdate, maxTotal = 12 }: FlowerPickerProps) {
  const totalCount = selectedFlowers.reduce((sum, f) => sum + f.count, 0)

  function addFlower(flowerId: string) {
    if (totalCount >= maxTotal) return
    const existing = selectedFlowers.find((f) => f.flowerId === flowerId)
    if (existing) {
      onUpdate(
        selectedFlowers.map((f) =>
          f.flowerId === flowerId ? { ...f, count: f.count + 1 } : f
        )
      )
    } else {
      onUpdate([...selectedFlowers, { flowerId, count: 1 }])
    }
  }

  function removeFlower(flowerId: string) {
    const existing = selectedFlowers.find((f) => f.flowerId === flowerId)
    if (!existing) return
    if (existing.count <= 1) {
      onUpdate(selectedFlowers.filter((f) => f.flowerId !== flowerId))
    } else {
      onUpdate(
        selectedFlowers.map((f) =>
          f.flowerId === flowerId ? { ...f, count: f.count - 1 } : f
        )
      )
    }
  }

  function getCount(flowerId: string): number {
    return selectedFlowers.find((f) => f.flowerId === flowerId)?.count ?? 0
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Choose Your Flowers
        </h3>
        <span className="text-sm text-muted-foreground">
          {totalCount}/{maxTotal} stems
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {FLOWERS.map((flower) => {
          const count = getCount(flower.id)
          const isSelected = count > 0
          return (
            <div
              key={flower.id}
              className={`glass flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-300 ${
                isSelected
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/10 scale-[1.02]'
                  : 'hover:shadow-md hover:scale-[1.01]'
              }`}
            >
              <div
                className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                onClick={() => addFlower(flower.id)}
                role="button"
                tabIndex={0}
                aria-label={`Add ${flower.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') addFlower(flower.id)
                }}
              >
                <FlowerSVG flowerId={flower.id} size={96} />
              </div>
              <span className="text-sm font-medium text-foreground text-center leading-tight">
                {flower.name}
              </span>
              <span className="text-xs text-muted-foreground text-center leading-tight">
                {flower.description}
              </span>
              {isSelected ? (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => removeFlower(flower.id)}
                    aria-label={`Remove one ${flower.name}`}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-base font-bold text-primary min-w-[1.5rem] text-center">
                    {count}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => addFlower(flower.id)}
                    disabled={totalCount >= maxTotal}
                    aria-label={`Add one more ${flower.name}`}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => addFlower(flower.id)}
                  disabled={totalCount >= maxTotal}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
