import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, ChevronDown } from 'lucide-react';
import { festiveImages } from '../assets/images';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onLightDiyaClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLightDiyaClick, onExploreClick }) => {
  const { t } = useLanguage();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax offset (-10px to +10px)
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16"
      aria-label="Festive Night Hero"
    >
      {/* Background Image with layered cinematic gradients & subtle parallax - prominently visible */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `scale(1.08) translate(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px)`,
        }}
      >
        <img
          src={festiveImages.heroKaliPujaNight}
          alt="Traditional Bengali Kali Puja Pandal illuminated with diyas and festive lights at midnight"
          className="w-full h-full object-cover object-center filter brightness-105 contrast-110 saturate-115"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Layered cinematic vignettes - tuned to keep the pandal prominent */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08070D] via-[#08070D]/35 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(8,7,13,0.75)_100%)]" />
      </div>

      {/* Decorative Traditional Bengali Alpana Overlay Ring */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
        <svg
          viewBox="0 0 800 800"
          className="w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] animate-[spin_160s_linear_infinite]"
          fill="none"
          stroke="#FFF"
          strokeWidth="1.2"
        >
          <circle cx="400" cy="400" r="380" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="320" />
          <circle cx="400" cy="400" r="260" strokeDasharray="12 12" />
          <circle cx="400" cy="400" r="180" />
          <circle cx="400" cy="400" r="90" />
          {/* Petal Motifs */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d={`M 400 400 Q ${400 + Math.cos((i * Math.PI) / 8) * 220} ${
                400 + Math.sin((i * Math.PI) / 8) * 220
              } ${400 + Math.cos(((i + 0.5) * Math.PI) / 8) * 320} ${
                400 + Math.sin(((i + 0.5) * Math.PI) / 8) * 320
              }`}
            />
          ))}
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Sacred Bengali Motto Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF69]/50 bg-[#08070D]/85 backdrop-blur-md mb-6 shadow-[0_0_24px_rgba(212,175,105,0.3)] animate-in fade-in zoom-in-95 duration-700">
          <span className="text-[#FF9D38] text-xs font-cinzel">✦</span>
          <span
            className="font-bengali text-xs sm:text-sm text-[#FFC46B] font-semibold"
            style={{ fontVariantLigatures: 'normal' }}
          >
            {t.hero.motto}
          </span>
          <span className="text-[#FF9D38] text-xs font-cinzel">✦</span>
        </div>

        {/* Main Bengali Headline with Golden Light Reveal Animation */}
        <h1 className="font-bengali-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-4xl">
          <span className="animate-light-reveal block">
            {t.hero.headlinePart1}
          </span>
          <span className="text-white block mt-1 sm:mt-2">
            {t.hero.headlinePart2}
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-bengali text-lg sm:text-2xl text-slate-200 mt-5 font-normal tracking-wide drop-shadow-md max-w-2xl leading-relaxed">
          {t.hero.subheading}
        </p>

        {/* Sacred Quote / Blessing */}
        <p className="font-cinzel text-xs sm:text-sm text-[#D4AF69]/90 italic max-w-2xl mt-4 leading-relaxed tracking-wider drop-shadow">
          &ldquo;{t.hero.quote}&rdquo;
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#8E1729] via-[#4A0E17] to-[#32134F] border border-[#D4AF69]/50 hover:border-[#FFC46B] shadow-[0_0_22px_rgba(142,23,41,0.5)] hover:shadow-[0_0_32px_rgba(255,157,56,0.6)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
          >
            <Sparkles className="w-4 h-4 text-[#FFC46B] group-hover:rotate-12 transition-transform" />
            <span className="font-bengali tracking-wide font-medium">{t.hero.ctaCelebrate}</span>
          </button>

          <button
            onClick={onLightDiyaClick}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] border border-transparent hover:border-white shadow-[0_0_25px_rgba(255,196,107,0.55)] hover:shadow-[0_0_38px_rgba(255,196,107,0.85)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Flame className="w-4 h-4 text-[#8E1729] fill-[#8E1729] group-hover:scale-110 transition-transform" />
            <span className="font-bengali tracking-wide font-bold">{t.hero.ctaLightDiya}</span>
          </button>
        </div>

        {/* Live Devotional Stats / Markers */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 pt-6 border-t border-[#D4AF69]/25 w-full max-w-2xl text-center">
          <div>
            <span className="font-bengali-title text-sm sm:text-base text-[#FFC46B] font-bold block">
              {t.hero.stat1Title}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-bengali mt-0.5 block">
              {t.hero.stat1Sub}
            </span>
          </div>
          <div>
            <span className="font-bengali-title text-sm sm:text-base text-[#FFC46B] font-bold block">
              {t.hero.stat2Title}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-bengali mt-0.5 block">
              {t.hero.stat2Sub}
            </span>
          </div>
          <div>
            <span className="font-bengali-title text-sm sm:text-base text-[#FFC46B] font-bold block">
              {t.hero.stat3Title}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-bengali mt-0.5 block">
              {t.hero.stat3Sub}
            </span>
          </div>
        </div>

        {/* Foreground Realistic Glowing Diyas Row - In Natural Flow (No Overlap) */}
        <div className="w-full max-w-lg mx-auto mt-8 flex justify-around items-end px-4 select-none pointer-events-none">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center transform transition-transform ${
                idx === 2 ? 'scale-110' : idx === 1 || idx === 3 ? 'scale-95' : 'scale-85 hidden sm:flex'
              }`}
            >
              {/* Ambient flame halo */}
              <div className="w-10 h-10 -mb-6 rounded-full bg-[#FF9D38]/30 blur-md animate-pulse" />
              {/* Animated flickering flame */}
              <div className="w-4 h-7 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-[#FF4500] via-[#FFA500] to-[#FFFACD] animate-flame shadow-[0_0_20px_#FFA500] flex items-center justify-center">
                <div className="w-1 h-2 rounded-full bg-cyan-300 opacity-80 mt-3" />
              </div>
              {/* Wick */}
              <div className="w-0.5 h-1.5 bg-amber-950 -mt-0.5 rounded-sm" />
              {/* Terracotta Diya body */}
              <div className="w-14 h-5 rounded-[0_0_100px_100px] bg-gradient-to-b from-[#8E1729] via-[#66101F] to-[#2B040B] border-t border-[#D4AF69]/80 shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />
            </div>
          ))}
        </div>

        {/* Animated Scroll Down Indicator - In Natural Flow */}
        <div className="mt-8">
          <a
            href="#maa-kali"
            className="inline-flex flex-col items-center text-slate-400 hover:text-[#FFC46B] transition-colors focus:outline-none group"
            aria-label="Scroll to Maa Kali section"
          >
            <span className="text-[10px] font-cinzel tracking-widest uppercase text-[#D4AF69]/80 mb-1.5 group-hover:text-[#FFC46B]">
              Scroll Down
            </span>
            <div className="w-5 h-8 rounded-full border border-[#D4AF69]/40 group-hover:border-[#FFC46B] flex items-start justify-center p-1 transition-colors">
              <ChevronDown className="w-3 h-3 text-[#FFC46B] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
