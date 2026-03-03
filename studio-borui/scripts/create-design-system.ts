import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'yoxfbvg1',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const designSystemData = {
  _id: 'singleton-designSystem',
  _type: 'designSystem',
  colors: {
    backgrounds: {
      warm: '#FAF8F5',      // Warm White / Alabaster
      cream: '#F5F3EF',     // Soft Cream
      white: '#FFFFFF',     // Pure White
    },
    text: {
      primary: '#1A1A1A',   // Near Black - Maximum contrast
      secondary: '#2D3748', // Dark Gray
      muted: '#4A5568',     // Medium Gray
      olive: '#2C3E2D',     // Dark Olive - Better contrast
      white: '#FFFFFF',     // Pure white for dark backgrounds
    },
    accents: {
      clay: '#B8653E',      // Rich Clay/Rust
      clayDark: '#9A5528',  // Darker Clay for hover
      taupe: '#8B7355',     // Warm Taupe
      wood: '#6B5D4F',      // Dark Wood
    },
    borders: {
      light: '#E8E4DF',     // Light border
      medium: '#D1CCC4',    // Medium border
      dark: '#2D3748',      // Dark border
    },
  },
  typography: {
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Manrope', sans-serif",
    },
    headingSizes: {
      h1: '3.5rem',   // 56px
      h2: '2.5rem',   // 40px
      h3: '2rem',     // 32px
      h4: '1.5rem',   // 24px
    },
    textSizes: {
      base: '1rem',   // 16px
      large: '1.25rem', // 20px
      small: '0.875rem', // 14px
    },
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    xxl: '4rem',    // 64px
  },
}

async function createDesignSystem() {
  try {
    console.log('🎨 Creating Design System document...')
    
    const result = await client.createOrReplace(designSystemData)
    
    console.log('✅ Design System created successfully!')
    console.log('📄 Document ID:', result._id)
    console.log('')
    console.log('🎉 You can now view and edit it in Sanity Studio:')
    console.log('   https://justpeachomes.sanity.studio/structure/designSystem')
    console.log('')
    console.log('💡 Next steps:')
    console.log('   1. Review the default values in Sanity Studio')
    console.log('   2. Click "Publish" to make it live')
    console.log('   3. The frontend will automatically use these values')
    
  } catch (error) {
    console.error('❌ Error creating Design System:', error)
    process.exit(1)
  }
}

createDesignSystem()

