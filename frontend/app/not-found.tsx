
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background-warm flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-4xl font-display font-bold text-primary mb-4">Page Not Found</h2>
            <p className="text-lg text-secondary mb-8">Could not find requested resource</p>
            <Link
                href="/"
                className="inline-block px-8 py-3 bg-accent-clay text-white rounded-lg font-semibold hover:bg-accent-clay-dark transition-colors"
            >
                Return Home
            </Link>
        </div>
    )
}
