import HeroSection from '@/components/sections/HeroSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PricingTeaserSection from '@/components/sections/PricingTeaserSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import CtaBannerSection from '@/components/sections/CtaBannerSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <PricingTeaserSection />
      <TestimonialsSection />
      <FAQSection />
      <CtaBannerSection />
    </>
  )
}
