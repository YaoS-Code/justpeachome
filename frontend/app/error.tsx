'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-background-warm flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-4xl font-display font-bold text-primary mb-4">Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="inline-block px-8 py-3 bg-accent-clay text-white rounded-lg font-semibold hover:bg-accent-clay-dark transition-colors"
            >
                Try again
            </button>
        </div>
    )
}
