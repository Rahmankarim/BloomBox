'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { decodeBouquet, OCCASIONS, type BouquetConfig } from '@/lib/bouquet-data'
import { BouquetPreview } from '@/components/bouquet/bouquet-preview'
import { SiteHeader } from '@/components/bouquet/site-header'
import { FallingPetals } from '@/components/bouquet/falling-petals'
import { SparkleEffect } from '@/components/bouquet/sparkle-effect'
import { Button } from '@/components/ui/button'
import { Gift, Flower2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BouquetReceiverPage() {
  const params = useParams()
  const data = params.data as string

  const [phase, setPhase] = useState<'envelope' | 'unwrapping' | 'revealed'>('envelope')
  const [config, setConfig] = useState<BouquetConfig | null>(null)

  useEffect(() => {
    if (data) {
      const decoded = decodeBouquet(data)
      setConfig(decoded)
    }
  }, [data])

  const occasion = useMemo(
    () => OCCASIONS.find((o) => o.id === config?.occasion),
    [config?.occasion]
  )

  const bgColor = '#FFE8EE'

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Flower2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
            Bouquet Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This bouquet link may be invalid or expired.
          </p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create Your Own Bouquet
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {phase === 'revealed' && <FallingPetals />}
      {phase === 'revealed' && <SparkleEffect />}

      <main className="mx-auto max-w-2xl px-4 py-12 flex flex-col items-center">
        {/* Phase: Envelope */}
        {phase === 'envelope' && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
            <div className="text-center">
              {config.receiverName && (
                <p className="text-sm text-muted-foreground mb-2">
                  A special delivery for
                </p>
              )}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                {config.receiverName
                  ? `Dear ${config.receiverName},`
                  : 'Someone sent you something special'}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {config.senderName
                  ? `${config.senderName} created a beautiful bouquet just for you`
                  : 'A beautiful bouquet has been created just for you'}
              </p>
              {occasion && (
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mt-4">
                  <span className="text-xs font-medium text-primary">
                    {occasion.name}
                  </span>
                </div>
              )}
            </div>

            {/* Envelope animation */}
            <div
              className="relative cursor-pointer group"
              onClick={() => setPhase('unwrapping')}
              role="button"
              tabIndex={0}
              aria-label="Open the bouquet"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setPhase('unwrapping')
              }}
            >
              <div className="relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: bgColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass rounded-full p-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                    <Gift className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <p className="text-center mt-4 text-sm text-primary font-medium animate-pulse">
                Tap to open your bouquet
              </p>
            </div>
          </div>
        )}

        {/* Phase: Unwrapping */}
        {phase === 'unwrapping' && (
          <div
            className="flex flex-col items-center gap-4 animate-unwrap"
            onAnimationEnd={() => setPhase('revealed')}
          >
            <div className="relative">
              <BouquetPreview config={config} size="lg" animated />
            </div>
          </div>
        )}

        {/* Phase: Revealed */}
        {phase === 'revealed' && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-1000">
            <div className="relative">
              <BouquetPreview config={config} size="lg" />
            </div>

            {config.message && (
              <div className="glass rounded-2xl p-6 max-w-md text-center">
                {config.receiverName && (
                  <p className="text-sm text-muted-foreground mb-2">
                    To {config.receiverName},
                  </p>
                )}
                <p className="font-serif text-lg text-foreground italic leading-relaxed">
                  {`"${config.message}"`}
                </p>
                {config.senderName && (
                  <p className="text-sm text-muted-foreground mt-4">
                    With love, {config.senderName}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Want to send your own bouquet?
              </p>
              <Link href="/">
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Create Your Bouquet
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
