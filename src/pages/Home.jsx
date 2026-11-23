import usePageMeta from '../lib/usePageMeta.js'
import Hero from '../components/home/Hero.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import Occasions from '../components/home/Occasions.jsx'
import CulturalOccasions from '../components/home/CulturalOccasions.jsx'
import FeaturedDesigns from '../components/home/FeaturedDesigns.jsx'
import SampleWishes from '../components/home/SampleWishes.jsx'
import FeatureBento from '../components/home/FeatureBento.jsx'
import FinalCta from '../components/home/FinalCta.jsx'
import AdSlot from '../components/ads/AdSlot.jsx'

export default function Home() {
  usePageMeta(
    'Make Someone’s Day Extra Special',
    'Create a beautiful personalized digital wish for someone you love. Pick a design, write your message, and share one link. Free, no sign-up.',
  )

  return (
    <>
      <Hero />
      <HowItWorks />
      <Occasions />
      <CulturalOccasions />
      <FeaturedDesigns />
      <AdSlot placement="home" className="py-8" />
      <SampleWishes />
      <FeatureBento />
      <FinalCta />
    </>
  )
}
