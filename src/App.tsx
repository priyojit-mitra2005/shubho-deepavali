/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FestiveParticleCanvas } from './components/FestiveParticleCanvas';
import { HeroSection } from './components/HeroSection';
import { MaaKaliSection } from './components/MaaKaliSection';
import { VirtualDiyaExperience } from './components/VirtualDiyaExperience';
import { BengaliHeritageSection } from './components/BengaliHeritageSection';
import { FestiveWishesSection } from './components/FestiveWishesSection';
import { FestiveGallerySection } from './components/FestiveGallerySection';
import { FestiveSurpriseModal } from './components/FestiveSurpriseModal';
import { Footer } from './components/Footer';
import { ShyamaSangitPlayer } from './components/ShyamaSangitPlayer';
import { LanguageProvider } from './context/LanguageContext';

function MainApp() {
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [isDarkAmbience, setIsDarkAmbience] = useState(true);

  useEffect(() => {
    // Check if URL specifies surprise modal
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('surprise') === '1') {
        setSurpriseOpen(true);
      }
    }
  }, []);

  const handleLightDiyaScroll = () => {
    const el = document.getElementById('diya-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreScroll = () => {
    const el = document.getElementById('heritage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleTheme = () => {
    setIsDarkAmbience((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen text-slate-100 relative transition-colors duration-700 ${
        isDarkAmbience ? 'bg-[#08070D]' : 'bg-[#0f0e17]'
      }`}
    >
      {/* Interactive Festive Particle Canvas (Twinkling stars, sparks, hibiscus petals, firework burst on click) */}
      <FestiveParticleCanvas intensity="gentle" interactiveClick={true} />

      {/* Top Navigation */}
      <Navbar
        onOpenSurprise={() => setSurpriseOpen(true)}
        isDarkAmbience={isDarkAmbience}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Cinematic Festive Night Hero Section */}
        <HeroSection
          onLightDiyaClick={handleLightDiyaScroll}
          onExploreClick={handleExploreScroll}
        />

        {/* 2. Maa Kali Devotional Sanctum */}
        <MaaKaliSection />

        {/* 3. Virtual Diya Lighting Experience */}
        <VirtualDiyaExperience />

        {/* 4. Bengali Cultural Heritage */}
        <BengaliHeritageSection />

        {/* 5. Festive Wishes & Personalized Wish Card Generator */}
        <FestiveWishesSection />

        {/* 6. Festive Photo Gallery */}
        <FestiveGallerySection />
      </main>

      {/* Footer */}
      <Footer onOpenSurprise={() => setSurpriseOpen(true)} />

      {/* Special Surprise Interactive Envelope Modal */}
      <FestiveSurpriseModal
        isOpen={surpriseOpen}
        onClose={() => setSurpriseOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
