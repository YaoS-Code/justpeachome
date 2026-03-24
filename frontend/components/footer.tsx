import Link from 'next/link'
import type { SiteSettings } from '@/lib/sanity'

interface FooterProps {
    settings?: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
    const contact = settings?.contactInfo
    const socialLinks = settings?.socialLinks || []

    return (
        <footer className="bg-background-cream text-primary pt-16 pb-8 border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-display font-bold tracking-tight text-olive">
                            {settings?.title || 'JUST PEAC HOMES'}
                        </Link>
                        <p className="text-secondary/70 text-sm leading-relaxed max-w-xs mt-2">
                            {settings?.footer?.brandStatement || 'Building with intention. Living with purpose. Rooted in Calgary, inspired by nature.'}
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-lg font-display font-semibold mb-6 text-accent-clay">
                            Services
                        </h3>
                        <ul className="space-y-4 text-sm text-secondary">
                            <li><Link href="/services/custom-homes" className="hover:text-accent-clay transition-colors">Custom Homes</Link></li>
                            <li><Link href="/services/renovations" className="hover:text-accent-clay transition-colors">Renovations</Link></li>
                            <li><Link href="/services/infill-developments" className="hover:text-accent-clay transition-colors">Infill Developments</Link></li>
                            <li><Link href="/services/heritage-restoration" className="hover:text-accent-clay transition-colors">Heritage Restoration</Link></li>
                            <li><Link href="/services/design-consultation" className="hover:text-accent-clay transition-colors">Design Consultation</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-display font-semibold mb-6 text-accent-clay">
                            Company
                        </h3>
                        <ul className="space-y-4 text-sm text-secondary">
                            <li><Link href="/about" className="hover:text-accent-clay transition-colors">Our Story</Link></li>
                            <li><Link href="/portfolio" className="hover:text-accent-clay transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-accent-clay transition-colors">Design Journal</Link></li>
                            <li><Link href="/contact" className="hover:text-accent-clay transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent-clay transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-lg font-display font-semibold mb-6 text-accent-clay">
                            Contact
                        </h3>
                        <ul className="space-y-4 text-sm text-secondary/80">
                            <li className="flex items-start">
                                <span className="block whitespace-pre-line">
                                    {contact?.address || 'Calgary, Alberta\n(By Appointment Only)'}
                                </span>
                            </li>
                            <li>
                                <a href={`mailto:${contact?.email || 'info@justpeachome.ca'}`} className="hover:text-accent-clay transition-colors">
                                    {contact?.email || 'info@justpeachome.ca'}
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${contact?.phone?.replace(/\D/g, '') || '+14038508386'}`} className="hover:text-accent-clay transition-colors">
                                    {contact?.phone || '(403) 850-8386'}
                                </a>
                            </li>
                            <li className="pt-4 flex gap-4">
                                {socialLinks.length > 0 ? (
                                    socialLinks.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-accent-clay hover:text-white transition-colors cursor-pointer text-olive text-xs font-bold"
                                        >
                                            <span className="sr-only">{link.platform}</span>
                                            {link.platform.substring(0, 2).toUpperCase()}
                                        </a>
                                    ))
                                ) : (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-accent-clay hover:text-white transition-colors cursor-pointer text-olive text-xs font-bold">
                                            <span className="sr-only">Instagram</span>
                                            IG
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-accent-clay hover:text-white transition-colors cursor-pointer text-olive text-xs font-bold">
                                            <span className="sr-only">Pinterest</span>
                                            PI
                                        </div>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
                    <p>{settings?.footer?.copyrightText || `© ${new Date().getFullYear()} Just Peac Homes. All rights reserved.`}</p>
                    <p className="mt-2 md:mt-0">Built with intention in Calgary.</p>
                </div>
            </div>
        </footer>
    )
}
