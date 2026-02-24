'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check, Share2, MessageCircle } from 'lucide-react'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareUrl: string
  receiverName: string
}

export function ShareDialog({ open, onOpenChange, shareUrl, receiverName }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const input = document.createElement('input')
      input.value = shareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function shareWhatsApp() {
    const text = `I made a special digital bouquet for ${receiverName || 'you'}! Open it here: ${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  function shareNative() {
    if (navigator.share) {
      navigator.share({
        title: `A Digital Bouquet for ${receiverName || 'You'}`,
        text: `I created a beautiful digital bouquet just for you!`,
        url: shareUrl,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass sm:max-w-md border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground">
            Share Your Bouquet
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Send this magical bouquet to someone special.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="glass border-border/50 text-sm text-foreground"
            />
            <Button onClick={copyLink} variant="outline" className="shrink-0">
              {copied ? (
                <Check className="h-4 w-4 text-sage" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={shareWhatsApp}
              className="flex-1 bg-[#25D366] text-white hover:bg-[#20BD5A]"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            {'share' in navigator && (
              <Button
                onClick={shareNative}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            The recipient will see an animated bouquet opening experience
            when they click the link.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
