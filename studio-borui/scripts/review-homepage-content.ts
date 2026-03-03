import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

async function checkHomePageContent() {
    console.log('📋 Fetching Home Page content from Sanity...\n')

    const query = `*[_type == "homePage"][0]{
    title,
    heroType,
    hero {
      headline,
      subheadline,
      ctaText,
      ctaLink
    },
    splitHero {
      left {
        headline,
        subheadline,
        ctaText,
        ctaLink
      },
      right {
        headline,
        subheadline,
        ctaText,
        ctaLink
      }
    },
    trustBadges {
      enabled,
      title,
      badges[] {
        icon,
        title,
        description
      }
    },
    valueProposition {
      title,
      subtitle,
      premiumStandard {
        title,
        focus,
        materials,
        design,
        durability,
        roi
      },
      investmentStandard {
        title,
        focus,
        materials,
        design,
        durability,
        roi
      }
    },
    grantProgram {
      enabled,
      title,
      description,
      ctaText,
      deadline,
      eligibility,
      officialLink
    },
    roiCalculator {
      enabled,
      title,
      subtitle,
      disclaimer
    },
    featuredProjects {
      title,
      subtitle,
      useTabs,
      luxuryTabLabel,
      incomeTabLabel
    },
    servicesSection {
      title,
      description
    },
    statsSection {
      items[] {
        value,
        label
      }
    },
    benefits {
      title,
      items[] {
        icon,
        title,
        description
      }
    },
    communitiesSection {
      title,
      description
    },
    insightsSection {
      title,
      description
    },
    ctaSection {
      title,
      subtitle,
      ctaText,
      ctaLink
    }
  }`

    const data = await client.fetch(query)

    console.log('='.repeat(80))
    console.log('HOME PAGE CONTENT REVIEW')
    console.log('='.repeat(80))
    console.log('\n')

    if (data.heroType === 'split' && data.splitHero) {
        console.log('🎯 SPLIT HERO')
        console.log('─'.repeat(80))
        console.log('LEFT SIDE (Dream Home):')
        console.log(`  Headline: "${data.splitHero.left?.headline}"`)
        console.log(`  Subheadline: "${data.splitHero.left?.subheadline}"`)
        console.log(`  CTA: "${data.splitHero.left?.ctaText}" → ${data.splitHero.left?.ctaLink}`)
        console.log('\nRIGHT SIDE (Investment):')
        console.log(`  Headline: "${data.splitHero.right?.headline}"`)
        console.log(`  Subheadline: "${data.splitHero.right?.subheadline}"`)
        console.log(`  CTA: "${data.splitHero.right?.ctaText}" → ${data.splitHero.right?.ctaLink}`)
        console.log('\n')
    }

    if (data.trustBadges?.enabled) {
        console.log('🛡️  TRUST BADGES')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.trustBadges.title}"`)
        data.trustBadges.badges?.forEach((badge: any, i: number) => {
            console.log(`\n  Badge ${i + 1}:`)
            console.log(`    Title: "${badge.title}"`)
            console.log(`    Description: "${badge.description}"`)
        })
        console.log('\n')
    }

    if (data.valueProposition) {
        console.log('⚖️  VALUE PROPOSITION (Comparison Table)')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.valueProposition.title}"`)
        console.log(`Subtitle: "${data.valueProposition.subtitle}"`)
        console.log('\nPREMIUM STANDARD:')
        console.log(`  Focus: "${data.valueProposition.premiumStandard?.focus}"`)
        console.log(`  Materials: "${data.valueProposition.premiumStandard?.materials}"`)
        console.log(`  Durability: "${data.valueProposition.premiumStandard?.durability}"`)
        console.log(`  ROI: "${data.valueProposition.premiumStandard?.roi}"`)
        console.log('\nINVESTMENT STANDARD:')
        console.log(`  Focus: "${data.valueProposition.investmentStandard?.focus}"`)
        console.log(`  Materials: "${data.valueProposition.investmentStandard?.materials}"`)
        console.log(`  Durability: "${data.valueProposition.investmentStandard?.durability}"`)
        console.log(`  ROI: "${data.valueProposition.investmentStandard?.roi}"`)
        console.log('\n')
    }

    if (data.grantProgram?.enabled) {
        console.log('💰 GRANT PROGRAM')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.grantProgram.title}"`)
        console.log(`Description: "${data.grantProgram.description}"`)
        console.log(`CTA: "${data.grantProgram.ctaText}"`)
        console.log(`Deadline: "${data.grantProgram.deadline}"`)
        console.log(`Eligibility: "${data.grantProgram.eligibility}"`)
        console.log('\n')
    }

    if (data.roiCalculator?.enabled) {
        console.log('🧮 ROI CALCULATOR')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.roiCalculator.title}"`)
        console.log(`Subtitle: "${data.roiCalculator.subtitle}"`)
        console.log(`Disclaimer: "${data.roiCalculator.disclaimer}"`)
        console.log('\n')
    }

    if (data.featuredProjects) {
        console.log('🏗️  FEATURED PROJECTS')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.featuredProjects.title}"`)
        console.log(`Subtitle: "${data.featuredProjects.subtitle}"`)
        if (data.featuredProjects.useTabs) {
            console.log(`Luxury Tab: "${data.featuredProjects.luxuryTabLabel}"`)
            console.log(`Income Tab: "${data.featuredProjects.incomeTabLabel}"`)
        }
        console.log('\n')
    }

    if (data.benefits) {
        console.log('✨ WHY CHOOSE US')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.benefits.title}"`)
        data.benefits.items?.forEach((item: any, i: number) => {
            console.log(`\n  ${i + 1}. "${item.title}"`)
            console.log(`     ${item.description}`)
        })
        console.log('\n')
    }

    if (data.ctaSection) {
        console.log('📞 BOTTOM CTA')
        console.log('─'.repeat(80))
        console.log(`Title: "${data.ctaSection.title}"`)
        console.log(`Subtitle: "${data.ctaSection.subtitle}"`)
        console.log(`CTA: "${data.ctaSection.ctaText}" → ${data.ctaSection.ctaLink}`)
        console.log('\n')
    }

    console.log('='.repeat(80))
    console.log('END OF REVIEW')
    console.log('='.repeat(80))
}

checkHomePageContent().catch(console.error)
