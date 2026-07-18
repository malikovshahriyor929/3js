import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustIndicators } from "@/components/sections/TrustIndicators";
import { WhyShipSmart } from "@/components/sections/WhyShipSmart";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { AssetComparison } from "@/components/sections/AssetComparison";
import { Technology } from "@/components/sections/Technology";
import { Coverage } from "@/components/sections/Coverage";
import { ShippingProcess } from "@/components/sections/ShippingProcess";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TruckSceneMount } from "@/experience/TruckSceneMount";
import { companyConfig, seo } from "@/config/company";
import { faqItems } from "@/config/faq";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyConfig.name,
  url: companyConfig.siteUrl,
  description: seo.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Naperville",
    addressRegion: "IL",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "asset-based trucking",
    "freight shipping services",
    "third-party logistics",
    "refrigerated trucking",
    "dry van freight",
    "flatbed and open deck freight",
    "warehousing and fulfillment",
  ],
};

// FAQ structured data mirrors the visible accordion content exactly.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TruckSceneMount />
      <Header />

      <main id="main-content" className="relative z-10">
        <Hero />
        <TrustIndicators />
        <WhyShipSmart />
        <Services />
        <Industries />
        <AssetComparison />
        <Technology />
        <Coverage />
        <ShippingProcess />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <QuoteForm />
        <ClosingCTA />
      </main>

      <Footer />
    </>
  );
}
