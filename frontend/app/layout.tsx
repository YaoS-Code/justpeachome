import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import HeaderSpacer from "@/components/header-spacer";
import Footer from "@/components/footer";
import DesignSystemProvider from "@/components/design-system-provider";
import { getServices, getProjects, getCommunities, getSiteSettings } from "@/lib/sanity";

/* ========================================
   SEO Metadata (Default)
   ======================================== */

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL('https://justpeachome.ca'),
    alternates: {
      canonical: './',
    },
    title: {
      default: settings?.title || "JUST PEAC HOMES | Calgary Renovation & Custom Homes",
      template: "%s | JUST PEAC HOMES"
    },
    description: settings?.description || "Premier renovation and custom home builder in Calgary, AB.",
    keywords: [
      "Calgary renovations",
      "custom homes Calgary",
      "infill development",
      "R-CG zoning",
      "kitchen renovation Calgary",
      "bathroom renovation Calgary",
      "Altadore renovations",
      "Lake Bonavista builder",
      "heritage home restoration",
      "basement suite Calgary",
    ],
    authors: [{ name: "JUST PEAC HOMES" }],
    creator: "JUST PEAC HOMES",
    publisher: "JUST PEAC HOMES",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_CA",
      url: "https://justpeachome.ca",
      title: settings?.title || "JUST PEAC HOMES | Calgary Renovation & Custom Homes",
      description: settings?.description || "Premier renovation and custom home builder in Calgary specializing in R-CG infill development",
      siteName: "JUST PEAC HOMES",
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.title || "JUST PEAC HOMES | Calgary Renovation",
      description: settings?.description || "Premier renovation and custom home builder",
    },
  };
}

/* ========================================
   Root Layout
   ======================================== */

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let services = [];
  let projects = [];
  let communities = [];
  let settings = null;

  try {
    const [servicesData, projectsData, communitiesData, settingsData] = await Promise.all([
      getServices(),
      getProjects(),
      getCommunities(),
      getSiteSettings()
    ]);
    services = servicesData;
    projects = projectsData;
    communities = communitiesData;
    settings = settingsData;
  } catch (error) {
    console.error("Failed to fetch sanity data:", error);
  }

  return (
    <html lang="en-CA" className="scroll-smooth">
      <head>
        <DesignSystemProvider />
      </head>
      <body
        className="antialiased"
      >
        <Navigation services={services} projects={projects} communities={communities} />
        <HeaderSpacer />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
