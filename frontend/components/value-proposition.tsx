import { Check } from 'lucide-react'

interface ValuePropositionProps {
  title?: string
  subtitle?: string
  premiumStandard?: {
    title?: string
    focus?: string
    materials?: string
    design?: string
    durability?: string
    roi?: string
  }
  investmentStandard?: {
    title?: string
    focus?: string
    materials?: string
    design?: string
    durability?: string
    roi?: string
  }
}

export default function ValueProposition({
  title = 'Two Standards, One Promise of Quality',
  subtitle = "We understand that different projects have different goals. That's why we offer two distinct approaches.",
  premiumStandard = {
    title: 'Premium Standard',
    focus: 'Unique aesthetics, smart home integration, high-end appliances',
    materials: 'Hardwood, quartz, custom cabinetry',
    design: 'Personalized to your taste',
    durability: 'High-maintenance, requires care',
    roi: 'Increases overall property value'
  },
  investmentStandard = {
    title: 'Investment Standard',
    focus: 'Durability, easy maintenance, tenant safety code compliance',
    materials: 'Vinyl plank (LVP), laminate, pre-fab cabinets',
    design: 'Neutral tones to appeal to mass market',
    durability: 'Commercial grade, tenant-proof',
    roi: 'Maximized rental yield (10-15%)'
  }
}: ValuePropositionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-olive mb-4">
            {title}
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Premium Standard (Left) */}
          <div className="bg-gradient-to-br from-accent-clay/5 to-accent-clay/10 rounded-3xl p-8 md:p-12 border-2 border-accent-clay/20 hover:border-accent-clay/40 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-clay flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-accent-clay">
                {premiumStandard.title}
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-accent-clay" />
                  <h4 className="font-bold text-primary-olive">Focus</h4>
                </div>
                <p className="text-secondary ml-7">{premiumStandard.focus}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-accent-clay" />
                  <h4 className="font-bold text-primary-olive">Materials</h4>
                </div>
                <p className="text-secondary ml-7">{premiumStandard.materials}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-accent-clay" />
                  <h4 className="font-bold text-primary-olive">Design</h4>
                </div>
                <p className="text-secondary ml-7">{premiumStandard.design}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-accent-clay/10 space-y-4">
              <div>
                <h4 className="font-bold text-accent-clay text-sm uppercase tracking-wide mb-1">Durability</h4>
                <p className="text-secondary text-sm">{premiumStandard.durability}</p>
              </div>
              <div>
                <h4 className="font-bold text-accent-clay text-sm uppercase tracking-wide mb-1">Valuation</h4>
                <p className="text-secondary text-sm">{premiumStandard.roi}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-accent-clay/20">
              <p className="text-sm text-accent-clay font-semibold uppercase tracking-wider">
                For Homeowners
              </p>
            </div>
          </div>

          {/* Investment Standard (Right) */}
          <div className="bg-gradient-to-br from-primary-olive/5 to-primary-olive/10 rounded-3xl p-8 md:p-12 border-2 border-primary-olive/20 hover:border-primary-olive/40 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-olive flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-olive">
                {investmentStandard.title}
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-primary-olive" />
                  <h4 className="font-bold text-primary-olive">Focus</h4>
                </div>
                <p className="text-secondary ml-7">{investmentStandard.focus}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-primary-olive" />
                  <h4 className="font-bold text-primary-olive">Materials</h4>
                </div>
                <p className="text-secondary ml-7">{investmentStandard.materials}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-primary-olive" />
                  <h4 className="font-bold text-primary-olive">Design</h4>
                </div>
                <p className="text-secondary ml-7">{investmentStandard.design}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-primary-olive/10 space-y-4">
              <div>
                <h4 className="font-bold text-primary-olive text-sm uppercase tracking-wide mb-1">Durability</h4>
                <p className="text-secondary text-sm">{investmentStandard.durability}</p>
              </div>
              <div>
                <h4 className="font-bold text-primary-olive text-sm uppercase tracking-wide mb-1">ROI Focus</h4>
                <p className="text-secondary text-sm">{investmentStandard.roi}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-primary-olive/20">
              <p className="text-sm text-primary-olive font-semibold uppercase tracking-wider">
                For Investors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

