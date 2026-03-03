import Link from 'next/link'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <nav
        className="flex items-center space-x-2 text-sm py-4"
        aria-label="Breadcrumb navigation"
      >
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index === items.length - 1 ? (
              <span className="text-muted-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
