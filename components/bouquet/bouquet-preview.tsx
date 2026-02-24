'use client'

import { BACKGROUNDS, type BouquetConfig, type FlowerPosition } from '@/lib/bouquet-data'
import { FlowerSVG } from './flower-svg'
import { useMemo, useState, useRef, useCallback, useEffect } from 'react'
import { Move, Lock, Unlock } from 'lucide-react'

interface BouquetPreviewProps {
  config: BouquetConfig
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
  editable?: boolean
  onPositionsChange?: (positions: FlowerPosition[]) => void
}

function generateDefaultPositions(
  allFlowers: string[],
  containerW: number,
  containerH: number
): FlowerPosition[] {
  const positions: FlowerPosition[] = []
  const total = allFlowers.length
  if (total === 0) return positions

  const centerX = containerW / 2
  const centerY = containerH * 0.42

  // Place center flower
  positions.push({
    flowerId: allFlowers[0],
    x: centerX,
    y: centerY,
    rotation: 0,
    scale: 1,
  })

  if (total === 1) return positions

  // Inner ring
  const innerCount = Math.min(total - 1, 6)
  const innerRadius = Math.min(containerW, containerH) * 0.2
  for (let i = 0; i < innerCount; i++) {
    const angle = ((i * 360) / innerCount - 90) * (Math.PI / 180)
    positions.push({
      flowerId: allFlowers[1 + i],
      x: centerX + Math.cos(angle) * innerRadius,
      y: centerY + Math.sin(angle) * innerRadius * 0.8,
      rotation: (Math.random() - 0.5) * 25,
      scale: 0.85 + Math.random() * 0.1,
    })
  }

  // Outer ring
  const outerCount = total - 1 - innerCount
  const outerRadius = Math.min(containerW, containerH) * 0.35
  for (let i = 0; i < outerCount; i++) {
    const angle = ((i * 360) / Math.max(outerCount, 1) - 60) * (Math.PI / 180)
    positions.push({
      flowerId: allFlowers[1 + innerCount + i],
      x: centerX + Math.cos(angle) * outerRadius,
      y: centerY + Math.sin(angle) * outerRadius * 0.7,
      rotation: (Math.random() - 0.5) * 30,
      scale: 0.75 + Math.random() * 0.1,
    })
  }

  return positions
}

export function BouquetPreview({
  config,
  animated = false,
  size = 'md',
  editable = false,
  onPositionsChange,
}: BouquetPreviewProps) {
  const bgStyle = BACKGROUNDS.find((b) => b.id === config.background) || BACKGROUNDS[0]

  const allFlowers = useMemo(() => {
    const result: string[] = []
    config.flowers.forEach((f) => {
      for (let i = 0; i < f.count; i++) {
        result.push(f.flowerId)
      }
    })
    return result
  }, [config.flowers])

  const containerSize = size === 'lg' ? 440 : size === 'md' ? 340 : 240
  const flowerSize = size === 'lg' ? 180 : size === 'md' ? 150 : 110

  const [positions, setPositions] = useState<FlowerPosition[]>([])
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [positionLocked, setPositionLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate or update positions when flowers change
  useEffect(() => {
    if (config.positions && config.positions.length === allFlowers.length) {
      setPositions(config.positions)
    } else {
      const newPos = generateDefaultPositions(allFlowers, containerSize, containerSize)
      setPositions(newPos)
      onPositionsChange?.(newPos)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFlowers.length, allFlowers.join(','), containerSize])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, index: number) => {
      if (!editable || positionLocked) return
      e.preventDefault()
      e.stopPropagation()
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const pos = positions[index]
      if (!pos) return
      setDragIndex(index)
      setDragOffset({
        x: e.clientX - rect.left - pos.x,
        y: e.clientY - rect.top - pos.y,
      })
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [editable, positionLocked, positions]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragIndex === null) return
      e.preventDefault()
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const newX = Math.max(20, Math.min(containerSize - 20, e.clientX - rect.left - dragOffset.x))
      const newY = Math.max(20, Math.min(containerSize - 20, e.clientY - rect.top - dragOffset.y))
      setPositions((prev) => {
        const next = [...prev]
        next[dragIndex] = { ...next[dragIndex], x: newX, y: newY }
        return next
      })
    },
    [dragIndex, containerSize, dragOffset]
  )

  const handlePointerUp = useCallback(() => {
    if (dragIndex !== null) {
      onPositionsChange?.(positions)
    }
    setDragIndex(null)
  }, [dragIndex, onPositionsChange, positions])

  if (allFlowers.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-3xl border-2 border-dashed border-border/50"
        style={{
          width: containerSize,
          height: containerSize,
          backgroundColor: bgStyle.color,
        }}
      >
        <p className="text-muted-foreground text-sm text-center px-8 leading-relaxed">
          Pick some flowers to see your bouquet come to life
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={containerRef}
        className={`relative rounded-3xl overflow-hidden shadow-xl transition-shadow duration-300 ${
          editable && !positionLocked ? 'cursor-grab ring-2 ring-primary/20' : ''
        } ${dragIndex !== null ? 'cursor-grabbing' : ''}`}
        style={{
          width: containerSize,
          height: containerSize,
          backgroundColor: bgStyle.color,
          touchAction: editable && !positionLocked ? 'none' : 'auto',
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Soft vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 50%, ${bgStyle.color}88 100%)`,
          }}
        />

        {/* Flowers */}
        {positions.map((pos, index) => {
          if (!pos) return null
          const isDragging = dragIndex === index
          return (
            <div
              key={`${pos.flowerId}-${index}`}
              className={`absolute transition-shadow duration-200 ${
                editable && !positionLocked ? 'hover:drop-shadow-lg' : ''
              } ${isDragging ? 'z-50 drop-shadow-2xl scale-105' : ''}`}
              style={{
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%) rotate(${pos.rotation}deg) scale(${pos.scale})`,
                zIndex: isDragging ? 100 : Math.round(20 + pos.y / 10),
                cursor: editable && !positionLocked ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
              onPointerDown={(e) => handlePointerDown(e, index)}
            >
              <FlowerSVG
                flowerId={pos.flowerId}
                size={flowerSize}
                animated={animated}
                delay={index * 150}
              />
            </div>
          )
        })}
      </div>

      {/* Arrange controls */}
      {editable && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPositionLocked(!positionLocked)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              positionLocked
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-primary/10 text-primary'
            }`}
            aria-label={positionLocked ? 'Unlock flower positions' : 'Lock flower positions'}
          >
            {positionLocked ? (
              <>
                <Lock className="h-3 w-3" />
                <span>Locked</span>
              </>
            ) : (
              <>
                <Unlock className="h-3 w-3" />
                <span>Drag to arrange</span>
              </>
            )}
          </button>
          {!positionLocked && (
            <button
              onClick={() => {
                const newPos = generateDefaultPositions(allFlowers, containerSize, containerSize)
                setPositions(newPos)
                onPositionsChange?.(newPos)
              }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-secondary/80"
            >
              <Move className="h-3 w-3" />
              <span>Reset layout</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
