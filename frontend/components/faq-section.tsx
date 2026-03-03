"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    items?: FAQItem[]
}

export default function FAQSection({ items }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    // If no items are passed, return null to hide section (or you could keep the hardcoded fallback if desired, but for now we follow the dynamic plan)
    if (!items || items.length === 0) return null

    return (
        <section className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-accent-clay font-bold tracking-wider text-sm uppercase">Common Questions</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-olive mt-2 mb-6">
                    Professional. Precise. Proven.
                </h2>
                <p className="text-lg text-secondary max-w-2xl mx-auto">
                    Transparency is the foundation of our business. Here are answers to the most common questions we receive.
                </p>
            </div>

            <div className="space-y-4">
                {items.map((faq, i) => (
                    <div
                        key={i}
                        className="border border-surface-stone rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className="text-xl font-display font-semibold text-olive pr-8">
                                {faq.question}
                            </span>
                            <div className={`flex-shrink-0 p-2 rounded-full transition-colors ${openIndex === i ? 'bg-accent-clay text-white' : 'bg-surface-stone/20 text-olive'}`}>
                                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                        </button>

                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 pt-0 text-secondary leading-relaxed border-t border-transparent">
                                        <div className="pt-4 border-t border-surface-stone/10">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    )
}
