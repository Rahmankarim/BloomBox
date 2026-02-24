'use client'

import { MESSAGE_SUGGESTIONS } from '@/lib/bouquet-data'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Sparkles, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useCallback } from 'react'

interface MessageComposerProps {
  message: string
  onMessageChange: (msg: string) => void
  senderName: string
  onSenderNameChange: (name: string) => void
  receiverName: string
  onReceiverNameChange: (name: string) => void
  occasion: string
}

export function MessageComposer({
  message,
  onMessageChange,
  senderName,
  onSenderNameChange,
  receiverName,
  onReceiverNameChange,
  occasion,
}: MessageComposerProps) {
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const suggestions = MESSAGE_SUGGESTIONS[occasion] || MESSAGE_SUGGESTIONS['love']

  const applySuggestion = useCallback(() => {
    onMessageChange(suggestions[suggestionIndex])
    setSuggestionIndex((prev) => (prev + 1) % suggestions.length)
  }, [suggestions, suggestionIndex, onMessageChange])

  const shuffleSuggestion = useCallback(() => {
    const next = (suggestionIndex + 1) % suggestions.length
    setSuggestionIndex(next)
  }, [suggestionIndex, suggestions.length])

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-serif text-lg font-semibold text-foreground">
        Add Your Message
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="sender-name" className="text-xs font-medium text-muted-foreground mb-1 block">
              From
            </label>
            <Input
              id="sender-name"
              placeholder="Your name"
              value={senderName}
              onChange={(e) => onSenderNameChange(e.target.value)}
              className="glass border-border/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="receiver-name" className="text-xs font-medium text-muted-foreground mb-1 block">
              To
            </label>
            <Input
              id="receiver-name"
              placeholder="Recipient's name"
              value={receiverName}
              onChange={(e) => onReceiverNameChange(e.target.value)}
              className="glass border-border/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-xs font-medium text-muted-foreground mb-1 block">
            Your message
          </label>
          <Textarea
            id="message"
            placeholder="Write something beautiful..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={3}
            maxLength={300}
            className="glass border-border/50 resize-none text-foreground placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-muted-foreground">
              {message.length}/300
            </span>
          </div>
        </div>

        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-foreground">AI Suggestion</span>
          </div>
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            {`"${suggestions[suggestionIndex]}"`}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={applySuggestion}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Use this
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={shuffleSuggestion}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Another
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
