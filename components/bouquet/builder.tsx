'use client'

import { useState, useCallback, useMemo } from 'react'
import { FlowerPicker } from './flower-picker'
import { OccasionSelector } from './occasion-selector'
import { StyleSelector } from './style-selector'
import { MessageComposer } from './message-composer'
import { BouquetPreview } from './bouquet-preview'
import { ShareDialog } from './share-dialog'
import { Button } from '@/components/ui/button'
import { encodeBouquet, type BouquetConfig, type FlowerPosition } from '@/lib/bouquet-data'
import { Send, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react'

const STEPS = ['flowers', 'occasion', 'style', 'message'] as const
type Step = (typeof STEPS)[number]

const STEP_LABELS: Record<Step, string> = {
  flowers: 'Flowers',
  occasion: 'Occasion',
  style: 'Background',
  message: 'Message',
}

export function BouquetBuilder() {
  const [step, setStep] = useState<Step>('flowers')
  const [shareOpen, setShareOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  const [flowers, setFlowers] = useState<{ flowerId: string; count: number }[]>([])
  const [occasion, setOccasion] = useState('love')
  const [background, setBackground] = useState('blush')
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [positions, setPositions] = useState<FlowerPosition[]>([])

  const config: BouquetConfig = useMemo(
    () => ({
      flowers,
      positions,
      background,
      occasion,
      message,
      senderName,
      receiverName,
    }),
    [flowers, positions, background, occasion, message, senderName, receiverName]
  )

  const currentStepIndex = STEPS.indexOf(step)
  const canGoNext = currentStepIndex < STEPS.length - 1
  const canGoPrev = currentStepIndex > 0
  const isLastStep = currentStepIndex === STEPS.length - 1

  const goNext = useCallback(() => {
    if (canGoNext) setStep(STEPS[currentStepIndex + 1])
  }, [canGoNext, currentStepIndex])

  const goPrev = useCallback(() => {
    if (canGoPrev) setStep(STEPS[currentStepIndex - 1])
  }, [canGoPrev, currentStepIndex])

  const handleShare = useCallback(() => {
    const encoded = encodeBouquet(config)
    const url = `${window.location.origin}/bouquet/${encoded}`
    setShareUrl(url)
    setShareOpen(true)
  }, [config])

  const handleReset = useCallback(() => {
    setFlowers([])
    setOccasion('love')
    setBackground('blush')
    setMessage('')
    setSenderName('')
    setReceiverName('')
    setPositions([])
    setStep('flowers')
  }, [])

  const isValid = flowers.length > 0

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Left: Builder Controls */}
      <div className="flex-1 w-full lg:max-w-lg">
        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-6">
          {STEPS.map((s, i) => {
            const isActive = s === step
            const isDone = i < currentStepIndex
            return (
              <button
                key={s}
                onClick={() => setStep(s)}
                className="flex items-center gap-1.5 group"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground scale-110'
                      : isDone
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {isDone ? (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {STEP_LABELS[s]}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="w-6 h-[2px] bg-border mx-1" />
                )}
              </button>
            )
          })}
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl p-6">
          {step === 'flowers' && (
            <FlowerPicker selectedFlowers={flowers} onUpdate={setFlowers} />
          )}
          {step === 'occasion' && (
            <OccasionSelector selected={occasion} onSelect={setOccasion} />
          )}
          {step === 'style' && (
            <StyleSelector
              background={background}
              onBackgroundChange={setBackground}
            />
          )}
          {step === 'message' && (
            <MessageComposer
              message={message}
              onMessageChange={setMessage}
              senderName={senderName}
              onSenderNameChange={setSenderName}
              receiverName={receiverName}
              onReceiverNameChange={setReceiverName}
              occasion={occasion}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {canGoPrev && (
              <Button variant="outline" onClick={goPrev} className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <Button variant="ghost" onClick={handleReset} className="gap-1 text-muted-foreground">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {canGoNext ? (
            <Button onClick={goNext} className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleShare}
              disabled={!isValid}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              Send Bouquet
            </Button>
          )}
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="flex flex-col items-center gap-4 lg:sticky lg:top-24">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Live Preview
        </h3>
        <BouquetPreview
          config={config}
          size="lg"
          editable
          onPositionsChange={setPositions}
        />
        {config.message && (
          <div className="glass rounded-xl p-4 max-w-[320px] text-center">
            {config.receiverName && (
              <p className="text-xs text-muted-foreground mb-1">
                To: {config.receiverName}
              </p>
            )}
            <p className="text-sm text-foreground italic leading-relaxed">
              {`"${config.message}"`}
            </p>
            {config.senderName && (
              <p className="text-xs text-muted-foreground mt-2">
                - {config.senderName}
              </p>
            )}
          </div>
        )}

        {isLastStep && isValid && (
          <Button
            onClick={handleShare}
            size="lg"
            className="w-full max-w-[320px] gap-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
          >
            <Send className="h-4 w-4" />
            Send This Bouquet
          </Button>
        )}
      </div>

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        shareUrl={shareUrl}
        receiverName={receiverName}
      />
    </div>
  )
}
