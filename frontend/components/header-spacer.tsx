'use client'

import { usePathname } from 'next/navigation'

export default function HeaderSpacer() {
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    if (isHomePage) {
        return null
    }

    return <div className="header-spacer" />
}
