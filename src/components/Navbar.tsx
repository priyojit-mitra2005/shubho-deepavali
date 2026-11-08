import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Flame, Menu, X, Sparkles, Moon, Sun, Globe, Sliders } from 'lucide-react';
import { soundManager } from '../utils/audioEngine';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenSurprise: () => void;
  isDarkAmbience: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSurprise, isDarkAmbience, onToggleTheme }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy for active section
      const sections = ['hero', 'maa-kali', 'diya-experience', 'heritage', 'wishes', 'gallery'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMusic = () => {
    const newState = soundManager.toggleAmbience();
    setIsMusicPlaying(newState);
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundManager.setMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundManager.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      soundManager.setMuted(false);
    }
  };

  const navLinks = [
    { id: 'hero', name: t.navbar.navHome, sub: t.navbar.navHomeSub, href: '#hero' },
    { id: 'maa-kali', name: t.navbar.navKali, sub: t.navbar.navKaliSub, href: '#maa-kali' },
    { id: 'diya-experience', name: t.navbar.navDiya, sub: t.navbar.navDiyaSub, href: '#diya-experience' },
    { id: 'heritage', name: t.navbar.navHeritage, sub: t.navbar.navHeritageSub, href: '#heritage' },
    { id: 'wishes', name: t.navbar.navWishes, sub: t.navbar.navWishesSub, href: '#wishes' },
    { id: 'gallery', name: t.navbar.navGallery, sub: t.navbar.navGallerySub, href: '#gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08070D]/95 backdrop-blur-md border-b border-[#D4AF69]/25 py-2.5 shadow-xl shadow-black/60'
          : 'bg-gradient-to-b from-[#08070D]/90 via-[#08070D]/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Wordmark with Glowing Diya Icon */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B] rounded-lg p-1"
          aria-label={t.navbar.brandTitle}
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#8E1729] to-[#32134F] border border-[#D4AF69]/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,157,56,0.4)] group-hover:shadow-[0_0_22px_rgba(255,196,107,0.8)] transition-all">
            <Flame className="w-5 h-5 text-[#FF9D38] fill-[#FFC46B] animate-flame" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bengali-title text-base sm:text-lg font-bold tracking-wide text-gold-gradient whitespace-nowrap">
              {t.navbar.brandTitle}
            </span>
            <span className="font-cinzel text-[10px] tracking-widest text-[#D4AF69]/90 uppercase -mt-0.5 whitespace-nowrap">
              {t.navbar.brandSubtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-6"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`group flex flex-col items-center py-1 text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus-visible:text-[#FFC46B] ${
                  isActive ? 'text-[#FFC46B] font-semibold' : 'text-slate-300 hover:text-[#FFC46B]'
                }`}
              >
                <span className="font-bengali">{link.name}</span>
                <span
                  className={`text-[10px] tracking-wider transition-colors ${
                    isActive ? 'text-[#D4AF69]' : 'text-slate-500 group-hover:text-[#D4AF69]/80'
                  }`}
                >
                  {link.sub}
                </span>
                {isActive && (
                  <span className="w-4 h-0.5 bg-[#FFC46B] rounded-full mt-0.5 shadow-[0_0_6px_#FFC46B]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Language, Audio, Theme, Surprise CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Functional Language Switcher */}
          <div className="flex items-center rounded-full border border-[#D4AF69]/40 bg-[#10162D]/90 p-0.5 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'bn'
                  ? 'bg-gradient-to-r from-[#D4AF69] to-[#FF9D38] text-[#08070D] shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="বাংলা ভাষা নির্বাচন করুন"
              aria-label="Switch to Bengali"
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all font-cinzel text-[11px] ${
                language === 'en'
                  ? 'bg-gradient-to-r from-[#D4AF69] to-[#FF9D38] text-[#08070D] shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to English"
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Ambient Music Button */}
          <button
            onClick={handleToggleMusic}
            aria-label={isMusicPlaying ? t.navbar.musicPause : t.navbar.musicPlay}
            title={isMusicPlaying ? t.navbar.musicPause : t.navbar.musicPlay}
            className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B] ${
              isMusicPlaying
                ? 'bg-[#8E1729]/60 border-[#FF9D38] text-[#FFC46B] shadow-[0_0_12px_rgba(255,157,56,0.6)]'
                : 'bg-black/50 border-[#D4AF69]/30 text-slate-400 hover:text-slate-200 hover:border-[#D4AF69]'
            }`}
          >
            <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse text-[#FFC46B]' : ''}`} />
            <span className="hidden xl:inline text-xs font-bengali">
              {isMusicPlaying ? t.navbar.musicPause : t.navbar.musicPlay}
            </span>
          </button>

          {/* Volume / SFX Button with Popover */}
          <div className="relative">
            <button
              onClick={handleToggleMute}
              onContextMenu={(e) => {
                e.preventDefault();
                setShowVolumeSlider(!showVolumeSlider);
              }}
              aria-label={isMuted ? t.navbar.sfxUnmute : t.navbar.sfxMute}
              title={isMuted ? t.navbar.sfxUnmute : t.navbar.sfxMute}
              className="p-2 rounded-full border border-[#D4AF69]/30 bg-black/50 text-slate-400 hover:text-[#FFC46B] hover:border-[#D4AF69] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Quick volume toggle badge */}
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="hidden sm:inline-flex p-1 -ml-1 text-slate-400 hover:text-[#FFC46B]"
              title="Adjust Volume"
              aria-label="Volume slider toggle"
            >
              <Sliders className="w-3 h-3" />
            </button>

            {showVolumeSlider && (
              <div className="absolute right-0 top-12 p-3 rounded-xl bg-[#10162D] border border-[#D4AF69]/40 shadow-2xl flex flex-col items-center gap-2 z-50 animate-in fade-in zoom-in-95">
                <span className="text-[10px] font-cinzel text-[#FFC46B] uppercase tracking-wider">
                  Volume: {Math.round(volume * 100)}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF9D38]"
                />
              </div>
            )}
          </div>

          {/* Theme Ambience Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDarkAmbience ? 'Deep Midnight Theme Active' : 'Temple Dusk Theme Active'}
            title="Toggle Festive Night Atmosphere"
            className="p-2 rounded-full border border-[#D4AF69]/30 bg-black/50 text-slate-400 hover:text-[#FFC46B] hover:border-[#D4AF69] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
          >
            {isDarkAmbience ? <Moon className="w-4 h-4 text-[#D4AF69]" /> : <Sun className="w-4 h-4 text-[#FF9D38]" />}
          </button>

          {/* Festive Surprise Button */}
          <button
            onClick={onOpenSurprise}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] hover:brightness-110 shadow-[0_0_15px_rgba(255,196,107,0.45)] transition-all font-bengali whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#08070D]" />
            <span>{t.navbar.surpriseBtn}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white border border-[#D4AF69]/30 hover:border-[#D4AF69]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08070D]/98 border-b border-[#D4AF69]/30 backdrop-blur-2xl px-6 py-6 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2 border-b border-white/5 ${
                  activeSection === link.id ? 'text-[#FFC46B]' : 'text-slate-300'
                }`}
              >
                <span className="font-bengali text-base">{link.name}</span>
                <span className="text-xs text-[#D4AF69]/80 font-cinzel tracking-wider">
                  {link.sub}
                </span>
              </a>
            ))}

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  onOpenSurprise();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] shadow-md font-bengali"
              >
                <Sparkles className="w-4 h-4 text-[#08070D]" />
                <span>{t.navbar.surpriseBtn}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
