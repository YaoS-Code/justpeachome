'use client';

import React, { useState, useRef } from 'react';
import { sendContactEmail } from '@/app/actions';

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await sendContactEmail(formData);

            if (result.success) {
                setStatus({
                    type: 'success',
                    message: 'Thank you! Your message has been sent successfully. We will get back to you soon.'
                });
                if (formRef.current) formRef.current.reset();
            } else {
                setStatus({
                    type: 'error',
                    message: result.error || 'Something went wrong. Please try again.'
                });
            }
        } catch (err) {
            console.error('Contact form submission error:', err);
            setStatus({
                type: 'error',
                message: 'An unexpected error occurred on the client. Please check the console.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-border-light text-primary">
            <h2 className="text-2xl font-display font-semibold text-olive mb-8">
                Send us a Message
            </h2>

            {status && (
                <div className={`mb-8 p-4 rounded-lg text-sm ${status.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {status.message}
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2 uppercase tracking-wide">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-colors text-primary"
                        placeholder="Your Name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2 uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-border-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-colors text-primary"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2 uppercase tracking-wide">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-border-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-colors text-primary"
                            placeholder="(403) 000-0000"
                        />
                        <p className="mt-1 text-xs text-muted italic">We will call you to discuss your project.</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-secondary mb-2 uppercase tracking-wide">Project Address / Neighborhood</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-colors text-primary"
                        placeholder="e.g., Altadore, Calgary"
                    />
                </div>

                <div>
                    <label htmlFor="project-type" className="block text-sm font-medium text-secondary mb-2 uppercase tracking-wide">Project Type</label>
                    <select
                        id="project-type"
                        name="project-type"
                        className="w-full px-4 py-3 rounded-lg border border-border-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-colors bg-white text-primary h-12"
                    >
                        <option value="New Custom Build">New Custom Build</option>
                        <option value="Major Renovation">Major Renovation</option>
                        <option value="Kitchen/Bath Remodel">Kitchen/Bath Remodel</option>
                        <option value="Design Consultation">Design Consultation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2 uppercase tracking-wide">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-border-medium focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-colors text-primary"
                        placeholder="Tell us a bit about your project..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-olive text-white font-medium py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-olive-dark shadow-sm hover:shadow-md'
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : 'Send Message'}
                </button>
            </form>
        </div>
    );
}
