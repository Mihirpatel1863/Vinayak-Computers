import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceCounters } from "@/components/ExperienceCounters";
import { PracticeAreas } from "@/components/PracticeAreas";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AdvocateModal } from "@/components/AdvocateModal";
import { ServicesSection } from "@/components/ServicesSection";
import { AIChatbot } from "@/components/AIChatbot";
import { IntroAnimation } from "@/components/IntroAnimation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { useSiteData } from "@/context/SiteContext";
import seniorImage from "@/assets/images/senior-advocate.png";
import advocateImage from "@/assets/images/advocate.png";

const DEFAULT_PHOTOS: Record<string, string> = {
  senior: seniorImage,
  advocate: advocateImage,
};

const INTRO_KEY = "vinayak_intro_shown";

export default function Home() {
  const { data } = useSiteData();
  const [selectedAdvocateId, setSelectedAdvocateId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem(INTRO_KEY);
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setShowIntro(false);
  };

  const handleOpenModal = (id: string) => {
    setSelectedAdvocateId(id);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedAdvocateId(null);
    document.body.style.overflow = "unset";
  };

  const selectedAdvocate = selectedAdvocateId
    ? {
        ...data.advocates.find(a => a.id === selectedAdvocateId)!,
        image: data.advocates.find(a => a.id === selectedAdvocateId)?.photo || DEFAULT_PHOTOS[selectedAdvocateId] || seniorImage,
      }
    : null;

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Global premium overlays */}
      <ScrollProgress />
      <BackToTop />

      <div className="bg-black min-h-screen text-foreground selection:bg-primary/30">
        <Header />
        <main>
          <HeroSection onOpenModal={handleOpenModal} />
          <AboutSection />
          <ExperienceCounters />
          <PracticeAreas />
          <ServicesSection />
          <WhyChooseUs />
          <Testimonials />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
        <AIChatbot />

        <AdvocateModal
          advocate={selectedAdvocate}
          isOpen={!!selectedAdvocateId}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
}
