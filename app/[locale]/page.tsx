import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { CareersHighlight } from "@/components/sections/CareersHighlight";
import { Stats } from "@/components/sections/Stats";
import { CTABanner } from "@/components/sections/CTABanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { setupLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  await setupLocale(params);

  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <TrustStrip />
      <AboutPreview />
      <ServicesOverview />
      <CareersHighlight />
      <Stats />
      <CTABanner />
    </>
  );
}
