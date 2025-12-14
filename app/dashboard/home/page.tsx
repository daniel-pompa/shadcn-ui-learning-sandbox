import {
  HeroSection,
  TechStackSection,
  FeaturesSection,
  LearningModulesSection,
  CTASection,
  CreditsSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className='bg-linear-to-b from-background to-muted/20'>
      <HeroSection />
      <TechStackSection />
      <FeaturesSection />
      <LearningModulesSection />
      <CTASection />
      <CreditsSection />
    </div>
  );
}
