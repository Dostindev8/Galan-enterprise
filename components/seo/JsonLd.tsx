import { COMPANY_NAME, DISPLAY_PHONE, INSTAGRAM_URL, SITE_URL } from "@/lib/constants";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/galan-logo.png`,
    telephone: DISPLAY_PHONE,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-689-253-0469",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
    },
    ...(INSTAGRAM_URL ? { sameAs: [INSTAGRAM_URL] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JobPostingJsonLd({ description }: { description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Non-CDL Driver — 26 ft. Box Truck",
    description,
    hiringOrganization: {
      "@type": "Organization",
      name: COMPANY_NAME,
      sameAs: SITE_URL,
    },
    employmentType: "FULL_TIME",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "USA",
    },
    industry: "Freight and logistics",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
