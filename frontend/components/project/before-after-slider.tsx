'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

interface BeforeAfterSliderProps {
    beforeImage: {
        asset: { _ref: string; _type: string }
        alt?: string
    }
    afterImage: {
        asset: { _ref: string; _type: string }
        alt?: string
    }
    description?: string
    aspectRatio?: string // e.g. 'aspect-[4/3]'
}

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    description,
    aspectRatio = 'aspect-[4/3]'
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isResizing, setIsResizing] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback(() => {
        setIsResizing(true)
    }, [])

    const handleMouseUp = useCallback(() => {
        setIsResizing(false)
    }, [])

    const handleMouseMove = useCallback(
        (e: MouseEvent | TouchEvent) => {
            if (!isResizing || !containerRef.current) return

            const containerRect = containerRef.current.getBoundingClientRect()
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
            const position = ((clientX - containerRect.left) / containerRect.width) * 100

            setSliderPosition(Math.min(Math.max(position, 0), 100))
        },
        [isResizing]
    )

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            window.addEventListener('touchmove', handleMouseMove)
            window.addEventListener('touchend', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('touchmove', handleMouseMove)
            window.removeEventListener('touchend', handleMouseUp)
        }
    }, [isResizing, handleMouseMove, handleMouseUp])

    if (!beforeImage || !afterImage) return null

    const beforeUrl = urlForImage(beforeImage).url()
    const afterUrl = urlForImage(afterImage).url()

    return (
        <div className="w-full">
            <div
                ref={containerRef}
                className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl select-none group cursor-ew-resize touch-action-none bg-background-cream/20 border border-border-light shadow-sm`}
                onTouchStart={handleMouseDown}
                onMouseDown={handleMouseDown}
            >
                {/* After Image (Background) */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={afterUrl}
                        alt="After renovation"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                        AFTER
                    </div>
                </div>

                {/* Before Image (Foreground, clipped) */}
                <div
                    className="absolute inset-0 h-full overflow-hidden border-r-2 border-white/80"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <div className="relative w-full h-full">
                        {/* Image in absolute positioned container */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={beforeUrl}
                                alt="Before renovation"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </div>
                        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                            BEFORE
                        </div>
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-110"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="w-8 h-8 rounded-full bg-white text-accent-clay shadow-lg flex items-center justify-center border-2 border-accent-clay/20 -ml-[14px]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </div>
            </div>

            {description && (
                <p className="mt-3 text-sm text-secondary text-center italic">
                    {description}
                </p>
            )}
        </div>
    )
}
