import { getDesignSystem } from '@/lib/sanity'

/**
 * DesignSystemProvider
 * Injects design tokens from Sanity into CSS custom properties
 * This allows dynamic theming without rebuilding the app
 */
export default async function DesignSystemProvider() {
  const designSystem = await getDesignSystem()

  // If no design system is configured, return null (use default CSS)
  if (!designSystem) {
    return null
  }

  // Generate CSS custom properties from Sanity data
  // These override the default values in globals.css
  const cssVariables = `
    :root {
      /* ========================================
         SANITY DESIGN SYSTEM OVERRIDES
         These values come from Sanity CMS and
         override the defaults in globals.css
         ======================================== */

      /* Background Colors */
      --background-warm: ${designSystem.colors.backgrounds.warm};
      --background-cream: ${designSystem.colors.backgrounds.cream};
      --background-white: ${designSystem.colors.backgrounds.white};

      /* Text Colors */
      --text-primary: ${designSystem.colors.text.primary};
      --text-secondary: ${designSystem.colors.text.secondary};
      --text-muted: ${designSystem.colors.text.muted};
      --text-olive: ${designSystem.colors.text.olive};
      --text-white: ${designSystem.colors.text.white};

      /* Accent Colors */
      --accent-clay: ${designSystem.colors.accents.clay};
      --accent-clay-dark: ${designSystem.colors.accents.clayDark};
      --accent-taupe: ${designSystem.colors.accents.taupe};
      --accent-wood: ${designSystem.colors.accents.wood};

      /* Border Colors */
      --border-light: ${designSystem.colors.borders.light};
      --border-medium: ${designSystem.colors.borders.medium};
      --border-dark: ${designSystem.colors.borders.dark};

      /* Typography - Fonts */
      --font-display: ${designSystem.typography.fonts.display};
      --font-body: ${designSystem.typography.fonts.body};

      /* Typography - Heading Sizes */
      --heading-h1: ${designSystem.typography.headingSizes.h1};
      --heading-h2: ${designSystem.typography.headingSizes.h2};
      --heading-h3: ${designSystem.typography.headingSizes.h3};
      --heading-h4: ${designSystem.typography.headingSizes.h4};

      /* Typography - Text Sizes */
      --text-base: ${designSystem.typography.textSizes.base};
      --text-large: ${designSystem.typography.textSizes.large};
      --text-small: ${designSystem.typography.textSizes.small};

      /* Spacing Scale */
      --space-xs: ${designSystem.spacing.xs};
      --space-sm: ${designSystem.spacing.sm};
      --space-md: ${designSystem.spacing.md};
      --space-lg: ${designSystem.spacing.lg};
      --space-xl: ${designSystem.spacing.xl};
      --space-xxl: ${designSystem.spacing.xxl};
    }

    /* ========================================
       TYPOGRAPHY STYLES
       Apply Sanity-controlled sizes and fonts
       ======================================== */

    h1 {
      font-size: var(--heading-h1);
      font-family: var(--font-display);
    }
    h2 {
      font-size: var(--heading-h2);
      font-family: var(--font-display);
    }
    h3 {
      font-size: var(--heading-h3);
      font-family: var(--font-display);
    }
    h4 {
      font-size: var(--heading-h4);
      font-family: var(--font-display);
    }
    h5, h6 {
      font-family: var(--font-display);
    }

    body {
      font-family: var(--font-body);
      font-size: var(--text-base);
    }
  `

  return (
    <style
      dangerouslySetInnerHTML={{ __html: cssVariables }}
      data-source="sanity-design-system"
    />
  )
}

