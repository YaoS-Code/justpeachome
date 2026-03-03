'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity'

interface HeroSplitProps {
    splitHero: {
        left: {
            image: any
            headline: string
            subheadline: string
            ctaText: string
            ctaLink: string
        }
        right: {
            image: any
            headline: string
            subheadline: string
            ctaText: string
            ctaLink: string
        }
    }
}

export default function HeroSplit({ splitHero }: HeroSplitProps) {
    const [sliderPosition, setSliderPosition] = useState(40)
    const [isResizing, setIsResizing] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle Dragging
    const handleMove = (clientX: number) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100
        setSliderPosition(percentage)
    }

    const handleMouseDown = () => setIsResizing(true)
    const handleTouchStart = () => setIsResizing(true)


    // Global event listeners for smooth dragging
    useEffect(() => {
        const handleWindowMove = (e: MouseEvent) => {
            if (isResizing) handleMove(e.clientX)
        }
        const handleWindowTouchMove = (e: TouchEvent) => {
            if (isResizing) handleMove(e.touches[0].clientX)
        }
        const handleWindowUp = () => setIsResizing(false)

        if (isResizing) {
            window.addEventListener('mousemove', handleWindowMove)
            window.addEventListener('touchmove', handleWindowTouchMove)
            window.addEventListener('mouseup', handleWindowUp)
            window.addEventListener('touchend', handleWindowUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleWindowMove)
            window.removeEventListener('touchmove', handleWindowTouchMove)
            window.removeEventListener('mouseup', handleWindowUp)
            window.removeEventListener('touchend', handleWindowUp)
        }
    }, [isResizing])

    // Mobile Tab View (simplified fallback for < md screens if needed, but slider works too)
    // For this implementation, we'll try to keep the slider responsive but add a "hint"

    const getSafeUrl = (image: any, side: string) => {
        try {
            if (image?.asset) {
                return urlForImage(image).url()
            }
            console.warn(`[HeroSplit] ${side} image missing asset`)
            return null
        } catch (e) {
            console.error(`[HeroSplit] Error rendering ${side} image`, e)
            return null
        }
    }

    // Safe access to left and right data with fallbacks
    const leftData = splitHero?.left
    const rightData = splitHero?.right
    
    const leftUrl = leftData ? getSafeUrl(leftData.image, 'Left') : null
    const rightUrl = rightData ? getSafeUrl(rightData.image, 'Right') : null
    
    // Early return if both sides are missing
    if (!leftData && !rightData) {
        console.error('[HeroSplit] Both left and right splitHero data are missing')
        return null
    }

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[85vh] min-h-[600px] overflow-hidden select-none group"
        >
            {/* RIGHT SIDE (Underneath / Background - Income) */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full">
                    {rightUrl && (
                        <Image
                            src={rightUrl}
                            alt="Income Suite"
                            fill
                            className={`object-cover transition-all duration-700 ${sliderPosition < 50 ? 'brightness-100 blur-0' : 'brightness-50 blur-sm'}`}
                            priority
                        />
                    )}
                    <div
                        className="absolute inset-0 bg-black transition-opacity duration-700"
                        style={{ opacity: sliderPosition < 50 ? 0.2 : 0.6 }}
                    /> {/* Dynamic Overlay: Light overlay when active to ensure text pop, Dark when inactive */}

                    {/* Right Content (Income) - Positioned on the RIGHT side */}
                    <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center p-8 md:p-16 z-10 pointer-events-none">
                        <div className="text-center md:text-left max-w-lg transition-opacity duration-300" style={{ opacity: sliderPosition < 45 ? 1 : 0.3 }}>
                            <span className="inline-block py-1 px-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 text-sm font-medium mb-4 shadow-sm">
                                For Investors
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-xl">
                                {rightData?.headline}
                            </h2>
                            <p className="text-lg text-white/95 mb-8 drop-shadow-lg font-medium">
                                {rightData?.subheadline}
                            </p>
                            <div className="pointer-events-auto">
                                <Link
                                    href={rightData?.ctaLink || '#'}
                                    className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
                                >
                                    {rightData?.ctaText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LEFT SIDE (diagonal clipped - Lifestyle) */}
            <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{
                    clipPath: `polygon(
                        0 0,
                        calc(${sliderPosition}% + 10vh) 0,
                        calc(${sliderPosition}% - 10vh) 100%,
                        0 100%
                    )`
                }}
            >
                <div className="relative w-full h-full">
                    {leftUrl && (
                        <Image
                            src={leftUrl}
                            alt="Lifestyle Suite"
                            fill
                            className={`object-cover transition-all duration-700 ${sliderPosition >= 50 ? 'brightness-100 blur-0' : 'brightness-50 blur-sm'}`}
                            priority
                        />
                    )}
                    <div
                        className="absolute inset-0 bg-black transition-opacity duration-700"
                        style={{ opacity: sliderPosition >= 50 ? 0.2 : 0.6 }}
                    />

                    {/* Left Content (Lifestyle) - Positioned on the LEFT side */}
                    <div className="absolute inset-y-0 left-0 w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
                        <div className="text-center md:text-left max-w-lg transition-opacity duration-300" style={{ opacity: sliderPosition > 55 ? 1 : 0.3 }}>
                            <span className="inline-block py-1 px-3 rounded-full bg-accent-clay backdrop-blur-md text-white border border-white/10 text-sm font-medium mb-4 shadow-sm">
                                For Homeowners
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
                                {leftData?.headline}
                            </h2>
                            <p className="text-lg text-white/90 mb-8 drop-shadow-md">
                                {leftData?.subheadline}
                            </p>
                            <Link
                                href={leftData?.ctaLink || '#'}
                                className="inline-block bg-accent-clay text-white font-semibold py-3 px-8 rounded-lg hover:bg-accent-clay-dark hover:text-white transition-colors shadow-lg"
                            >
                                {leftData?.ctaText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* DRAG HANDLE - Diagonal Line */}
            <div
                className="absolute inset-0 z-30 pointer-events-none"
            >
                {/* Diagonal line - rotated 45deg */}
                <div
                    className="absolute top-1/2 bg-white/50 backdrop-blur hover:bg-white transition-colors pointer-events-auto cursor-ew-resize"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{
                        left: `${sliderPosition}%`,
                        width: '2px',
                        height: '141.42vh', // sqrt(2) * 100vh to cover full diagonal
                        transform: 'translate(-50%, -50%) rotate(45deg)',
                        transformOrigin: 'center',
                    }}
                />

                {/* Drag handle circle at center */}
                <div
                    className="absolute w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-900/10 pointer-events-auto cursor-ew-resize"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{
                        left: `${sliderPosition}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                    </svg>
                </div>
            </div>

            {/* INSTRUCTIONS (Mobile Hint) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden pointer-events-none">
                <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                    Swipe to compare
                </span>
            </div>
        </section>
    )
}
