import React from 'react';

interface BlogHeroProps {
    title?: string;
    description?: string;
}

export default function BlogHero({ title, description }: BlogHeroProps) {
    return (
        <section className="relative w-full py-16 md:py-32 texture-paper overflow-hidden px-6">
            <div className="max-w-4xl mx-auto text-center z-10 relative">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-medium tracking-tight mb-4 md:mb-6 text-olive leading-tight">
                    {title || 'The Design Journal'}
                </h1>
                <p className="text-base md:text-xl text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                    {description || 'Insights on crafting organic modern homes in Calgary.'}
                </p>
            </div>

            {/* Decorative noise/texture overlay is handled by texture-paper class */}
        </section>
    );
}
