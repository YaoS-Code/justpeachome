'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQ {
    question: string
    answer: string
}

interface ServiceFAQProps {
    faqs?: FAQ[]
}

export default function ServiceFAQ({ faqs = [] }: ServiceFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    if (!faqs || faqs.length === 0) return null

    return (
        <section className="py-24 bg-background-warm">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-olive mb-4">
                        Common Questions
                    </h2>
                    <div className="w-24 h-1 bg-accent-clay mx-auto opacity-30"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-border-light overflow-hidden transition-all duration-300 hover:border-accent-clay/30"
                        >
                            <button
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-medium font-display ${index === openIndex ? 'text-accent-clay' : 'text-primary'
                                    }`}>
                                    {faq.question}
                                </span>
                                <span className={`p-2 rounded-full transition-colors ${index === openIndex ? 'bg-accent-clay text-white' : 'bg-background-cream text-muted'
                                    }`}>
                                    {index === openIndex ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${index === openIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-secondary leading-relaxed border-t border-border-light/50 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
