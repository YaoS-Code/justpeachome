import Link from 'next/link'
import { DollarSign, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react'

interface GrantProgramHookProps {
  enabled?: boolean
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  highlightColor?: string
  deadline?: string
  eligibility?: string
  officialLink?: string
}

export default function GrantProgramHook({
  enabled = true,
  title = 'Get Paid to Build Your Rental Suite',
  description = 'Planning a secondary suite? You could be eligible for up to $10,000 in government grants for safety upgrades like egress windows and smoke-tight barriers. We handle the permits, the construction, and help you meet the eligibility criteria.',
  ctaText = 'Check My Eligibility',
  ctaLink = '/contact?subject=grant-eligibility',
  highlightColor = '#B8653E',
  deadline = 'Applications Open for 2026',
  eligibility = 'New or legalized suites,Safety upgrades,Calgary residents',
  officialLink = 'https://www.calgary.ca/development/home-building/secondary-suites.html'
}: GrantProgramHookProps) {
  if (!enabled) return null

  const criteriaList = eligibility.split(',').map(item => item.trim())

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: highlightColor }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 md:p-16 shadow-2xl">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            {/* Icon */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-2xl">
                  <DollarSign className="w-12 h-12 md:w-16 md:h-16 text-accent-clay" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white font-bold text-sm">$10K</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed max-w-3xl">
                {description}
              </p>

              {/* Key Benefits / Criteria */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {criteriaList.map((criteria, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{criteria}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                <Link
                  href={ctaLink}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-accent-clay rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  {ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="text-white/80 text-sm">
                  Status: <span className="font-bold text-white bg-green-500/20 px-2 py-1 rounded">{deadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              <strong className="text-white">Calgary Secondary Suite Incentive Program</strong> —
              Funded by the Housing Accelerator Fund.
            </p>
            {officialLink && (
              <a
                href={officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm hover:underline"
              >
                View Official Requirements <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
    </section>
  )
}

