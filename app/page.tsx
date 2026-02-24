import { SiteHeader } from '@/components/bouquet/site-header'
import { BouquetBuilder } from '@/components/bouquet/builder'
import { Flower2, Heart, Sparkles, Gift } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              Create Magic with Flowers
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Send Beautiful
            <br />
            <span className="text-primary">Digital Bouquets</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed">
            Craft a stunning virtual bouquet, write a heartfelt message,
            and share the magic with someone special.
          </p>
        </section>

        {/* Builder section */}
        <section className="mb-16">
          <BouquetBuilder />
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Flower2,
              title: 'Handpicked Flowers',
              description:
                'Choose from roses, tulips, sunflowers, lilies, and more to create your perfect arrangement.',
            },
            {
              icon: Heart,
              title: 'Heartfelt Messages',
              description:
                'Add a personal note with AI-powered suggestions for every occasion.',
            },
            {
              icon: Gift,
              title: 'Magical Delivery',
              description:
                'Recipients experience an animated bouquet unveiling with petals and sparkles.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flower2 className="h-4 w-4 text-primary" />
            <span className="font-serif text-sm font-semibold text-foreground">
              BloomBox
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Crafted with love by Rahman Karim. Send flowers, spread joy.
          </p>
        </div>
      </footer>
    </div>
  )
}
