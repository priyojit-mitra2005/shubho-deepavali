import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Check,
  BellRing,
  Flame,
  Volume2,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { soundManager } from '../utils/audioEngine';
import { AARTI_STOTRAMS, getNextStanzaIndex, getPrevStanzaIndex, formatBengaliNumber } from '../utils/festiveLogic';
import { festiveImages } from '../assets/images';
import { useLanguage } from '../context/LanguageContext';

export const MaaKaliSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [prayersOffered, setPrayersOffered] = useState(false);
  const [offeringAnimation, setOfferingAnimation] = useState(false);
  const [prayerCount, setPrayerCount] = useState(108);

  // Aarti Mode states
  const [isAartiActive, setIsAartiActive] = useState(false);
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOfferPrayers = () => {
    soundManager.playTempleBell();
    setOfferingAnimation(true);
    setPrayersOffered(true);
    setPrayerCount((prev) => prev + 1);

    setTimeout(() => {
      setOfferingAnimation(false);
    }, 3200);
  };

  // Start Aarti Mode
  const handleStartAarti = () => {
    setIsAartiActive(true);
    setCurrentStanzaIndex(0);
    setIsAutoScrolling(true);
    soundManager.playShankhSound();
  };

  // Exit Aarti Mode
  const handleStopAarti = () => {
    setIsAartiActive(false);
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  };

  // Auto-scroll stotram lyrics timer
  useEffect(() => {
    if (isAartiActive && isAutoScrolling) {
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentStanzaIndex((prev) => getNextStanzaIndex(prev, AARTI_STOTRAMS.length));
      }, 6500);
    } else if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAartiActive, isAutoScrolling]);

  // Listen to Escape key to exit Aarti Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAartiActive) {
        handleStopAarti();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAartiActive]);

  const activeStanza = AARTI_STOTRAMS[currentStanzaIndex];

  return (
    <section
      id="maa-kali"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#1C0409] via-[#350813] to-[#20040A] overflow-hidden border-t-2 border-[#D4AF69]/40 shadow-inner"
      aria-label="Maa Kali Devotional Shrine"
    >
      {/* Background Sacred Motif Glow & Deep Crimson Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#8E1729]/35 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF9D38]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#32134F]/40 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Traditional Temple Arch Pattern */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF69]/60 to-transparent" />

      {/* Altar Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF69]/40 bg-[#08070D]/80 mb-3 shadow-sm">
            <span className="text-[#FF9D38] text-xs">🌺</span>
            <span className="text-xs font-cinzel text-[#FFC46B] tracking-widest uppercase">
              {t.kali.badge}
            </span>
          </div>
          <h2 className="font-bengali-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <span className="text-crimson-gradient">{t.kali.title}</span>
          </h2>
          <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF69] to-transparent mx-auto mt-4" />
        </div>

        {/* 2-Column Sanctum Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Sacred Iconography Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group w-full max-w-md">
              {/* Ornamental Outer Frame & Sacred Glow */}
              <div
                className={`absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#8E1729] via-[#D4AF69] to-[#32134F] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-700 ${
                  offeringAnimation ? 'opacity-100 blur-xl scale-105' : ''
                }`}
              />

              {/* Sanctum Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF69]/70 bg-[#10162D] shadow-2xl shadow-black">
                <img
                  src={festiveImages.maaKaliDivineDarshan}
                  alt="Maa Kali traditional Shyama Puja idol adorned with red hibiscus garlands and golden crown"
                  className={`w-full h-[480px] sm:h-[540px] object-cover object-top filter brightness-95 contrast-105 transition-all duration-700 ${
                    offeringAnimation ? 'brightness-110' : ''
                  }`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Incense Smoke & Holy Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070D] via-transparent to-black/30 pointer-events-none" />

                {/* Golden Illumination Halo on Prayer Offering */}
                {offeringAnimation && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FFC46B]/25 via-transparent to-[#8E1729]/30 pointer-events-none animate-pulse duration-500" />
                )}

                {/* Devotional Caption Ribbon */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#08070D] via-[#08070D]/90 to-transparent backdrop-blur-[2px] text-center border-t border-[#D4AF69]/30">
                  <span className="font-bengali-title text-xl text-[#FFC46B] font-bold block">
                    {t.kali.idolTitle}
                  </span>
                  <span className="font-cinzel text-xs text-[#D4AF69]/90 tracking-widest uppercase mt-0.5 block">
                    {t.kali.idolSubtitle}
                  </span>
                </div>

                {/* Dynamic Hibiscus Petals Shower Overlay on click */}
                {offeringAnimation && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#8E1729]/20 animate-pulse" />
                    {Array.from({ length: 28 }).map((_, idx) => (
                      <span
                        key={idx}
                        className="absolute text-2xl animate-bounce"
                        style={{
                          left: `${(idx * 7) % 90 + 5}%`,
                          top: `${(idx * 8) % 85}%`,
                          animationDuration: `${1.2 + (idx % 4) * 0.4}s`,
                          filter: 'drop-shadow(0 2px 10px rgba(142,23,41,0.9))',
                        }}
                      >
                        🌺
                      </span>
                    ))}
                    <div className="relative px-6 py-3 rounded-full bg-[#08070D]/95 border border-[#D4AF69] text-[#FFC46B] font-bengali shadow-2xl text-center animate-in zoom-in-75 duration-300">
                      {t.kali.prayerOfferedBadge}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Devotional Reflections & Interactive Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-4">
              <blockquote className="p-6 rounded-2xl bg-[#08070D]/85 border border-[#D4AF69]/35 backdrop-blur-md shadow-xl relative">
                <span className="text-3xl text-[#D4AF69]/50 font-cinzel absolute top-3 left-4">&ldquo;</span>
                <p className="font-bengali text-lg sm:text-xl text-slate-100 font-medium leading-relaxed pl-5">
                  {t.kali.desc1}
                </p>
                <p className="font-bengali text-base sm:text-lg text-[#FFC46B] mt-3 pl-5 leading-relaxed">
                  {t.kali.desc2}
                </p>
              </blockquote>

              {/* Sacred Sanskrit Pranama Stotram Card */}
              <div className="p-5 rounded-xl bg-[#32134F]/30 border border-[#D4AF69]/25 text-center shadow-lg">
                <span className="text-[11px] font-cinzel text-[#D4AF69] tracking-widest uppercase block mb-1">
                  — শ্রী শ্রী চণ্ডী প্রণাম মন্ত্র —
                </span>
                <p className="font-bengali text-base text-slate-200 tracking-wide leading-relaxed italic">
                  সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে।<br />
                  শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥
                </p>
                <p className="font-bengali text-xs text-[#D4AF69]/80 mt-2">
                  &ldquo;হে সর্বমঙ্গলময়ী কল্যাণী শিবে, হে শরণাগতের আশ্রয়দাত্রী ত্রিনয়নী গৌরী নারায়ণী, তোমাকে প্রণাম।&rdquo;
                </p>
              </div>
            </div>

            {/* Interactive Actions: Offer Prayers & Aarti Mode Button */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleOfferPrayers}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#8E1729] via-[#A81B34] to-[#32134F] border border-[#D4AF69] hover:border-[#FFC46B] shadow-[0_0_22px_rgba(142,23,41,0.5)] hover:shadow-[0_0_32px_rgba(255,157,56,0.65)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
                  aria-label="Offer Devotional Prayers to Maa Kali"
                >
                  <span className="text-lg group-hover:scale-125 transition-transform">🌺</span>
                  <span className="font-bengali">{t.kali.prayerOfferBtn}</span>
                  <Sparkles className="w-4 h-4 text-[#FFC46B]" />
                </button>

                {/* Aarti Mode Button */}
                <button
                  onClick={handleStartAarti}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] border border-transparent hover:border-white shadow-[0_0_25px_rgba(255,196,107,0.55)] hover:shadow-[0_0_35px_rgba(255,196,107,0.85)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Activate Aarti Mode with Sacred Conch Sound and Aarti Lyrics"
                >
                  <Flame className="w-4 h-4 text-[#8E1729] fill-[#8E1729] group-hover:scale-110 transition-transform" />
                  <span className="font-bengali font-bold">{t.kali.aartiBtn}</span>
                </button>
              </div>

              {/* Devotional Count Ribbon & Audio Triggers */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#08070D]/70 border border-[#D4AF69]/20 shadow-inner">
                  <BellRing className="w-3.5 h-3.5 text-[#FF9D38]" />
                  <span className="text-xs text-slate-300 font-bengali">
                    {t.kali.counterLabel}:{' '}
                    <strong className="text-[#FFC46B] font-mono tabular-nums">
                      {language === 'bn' ? formatBengaliNumber(prayerCount) : prayerCount}
                    </strong>
                  </span>
                </div>

                <button
                  onClick={() => soundManager.playTempleBell()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10162D] hover:bg-[#10162D]/90 border border-[#D4AF69]/30 text-xs text-[#FFC46B] transition-colors font-bengali"
                  title="মন্দিরের পবিত্র ঘণ্টা বাজান"
                >
                  <span>🔔</span>
                  <span>{t.kali.bellSoundBtn}</span>
                </button>

                <button
                  onClick={() => soundManager.playShankhSound()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10162D] hover:bg-[#10162D]/90 border border-[#D4AF69]/30 text-xs text-[#FFC46B] transition-colors font-bengali"
                  title="পবিত্র শঙ্খধ্বনি শুনুন"
                >
                  <span>🐚</span>
                  <span>{t.kali.shankhSoundBtn}</span>
                </button>
              </div>
            </div>

            {/* Devotional Blessing Response Card */}
            {prayersOffered && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#8E1729]/30 to-[#32134F]/30 border border-[#D4AF69]/50 flex items-start gap-3 animate-in fade-in duration-300 shadow-xl">
                <div className="w-7 h-7 rounded-full bg-[#8E1729] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bengali font-bold text-sm text-[#FFC46B]">
                    {t.kali.prayerBlessingTitle}
                  </h4>
                  <p className="font-bengali text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                    {t.kali.prayerBlessingText}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SYNCHRONIZED AARTI MODE MODAL & LIGHT-DIMMING SCENE */}
      {isAartiActive && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#040306]/98 backdrop-blur-xl animate-in fade-in duration-700 p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={t.kali.aartiModalTitle}
        >
          {/* Top Bar with Exit and Shankh Audio Triggers */}
          <div className="w-full max-w-5xl flex items-center justify-between z-20 pt-2 pb-4 border-b border-[#D4AF69]/25">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8E1729] to-[#FF9D38] flex items-center justify-center border border-[#D4AF69] shadow-[0_0_15px_rgba(255,157,56,0.6)]">
                <Flame className="w-5 h-5 text-white fill-white animate-flame" />
              </div>
              <div>
                <span className="font-bengali-title text-base sm:text-lg font-bold text-gold-gradient block">
                  {t.kali.aartiModalTitle}
                </span>
                <span className="text-[10px] font-cinzel text-slate-400 tracking-widest uppercase block -mt-0.5">
                  Synchronized Aarti & Stotram Recitation
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play Shankh Conch Shell Button */}
              <button
                onClick={() => soundManager.playShankhSound()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#8E1729]/80 hover:bg-[#8E1729] border border-[#FF9D38]/60 shadow-[0_0_12px_rgba(255,157,56,0.4)] transition-all font-bengali"
                title="শঙ্খধ্বনি বাজান (Play Conch Shell)"
              >
                <span>🐚</span>
                <span>{t.kali.shankhSoundBtn}</span>
              </button>

              {/* Temple Bell */}
              <button
                onClick={() => soundManager.playTempleBell()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#10162D] hover:bg-[#10162D]/80 border border-[#D4AF69]/40 transition-all font-bengali"
                title="ঘণ্টা বাজান (Ring Bell)"
              >
                <span>🔔</span>
                <span>{t.kali.bellSoundBtn}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={handleStopAarti}
                className="p-2 rounded-full bg-black/60 text-slate-400 hover:text-white border border-white/20 hover:border-[#D4AF69] transition-all ml-2"
                aria-label="Exit Aarti Mode"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Sanctum Aarti Stage with Glowing Deity and Lyrics */}
          <div className="relative my-auto max-w-4xl w-full flex flex-col items-center text-center px-4 py-8 z-10">
            {/* Soft Holy Aarti Lamp Halo Glow */}
            <div className="w-32 h-32 rounded-full bg-[#FF9D38]/20 blur-3xl absolute -top-10 pointer-events-none animate-pulse" />

            {/* Sacred Deity Darshan Thumbnail */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#D4AF69] shadow-[0_0_35px_rgba(255,196,107,0.7)] mb-6">
              <img
                src={festiveImages.maaKaliDivineDarshan}
                alt="Divine Darshan of Maa Kali"
                className="w-full h-full object-cover object-top filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Active Stanza Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF69]/30 bg-[#10162D]/60 mb-3 text-xs font-cinzel text-[#FFC46B]">
              <span>স্তোত্র {activeStanza.id} / {AARTI_STOTRAMS.length}</span>
              <span>·</span>
              <span>{activeStanza.titleBn}</span>
            </div>

            {/* Sacred Sanskrit Hymn */}
            <p className="font-bengali-title text-2xl sm:text-3xl md:text-4xl font-bold text-gold-gradient tracking-wide leading-relaxed my-4 whitespace-pre-line drop-shadow-md">
              {activeStanza.bengali}
            </p>

            {/* Auspicious Meaning */}
            <div className="max-w-2xl mt-4 p-4 rounded-xl bg-[#08070D]/80 border border-[#D4AF69]/30 backdrop-blur-md">
              <span className="text-xs font-cinzel text-[#D4AF69] uppercase tracking-widest block mb-1">
                মহামায়ের স্তোত্রার্থ (Sacred Meaning)
              </span>
              <p className="font-bengali text-sm sm:text-base text-slate-200 leading-relaxed">
                &ldquo;{activeStanza.meaning}&rdquo;
              </p>
            </div>

            {/* Aarti Carousel Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8">
              <button
                onClick={() =>
                  setCurrentStanzaIndex((prev) => getPrevStanzaIndex(prev, AARTI_STOTRAMS.length))
                }
                className="p-3 rounded-full bg-[#10162D] border border-[#D4AF69]/40 text-[#FFC46B] hover:bg-[#D4AF69] hover:text-[#08070D] transition-all"
                aria-label="Previous Stanza"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all font-bengali ${
                  isAutoScrolling
                    ? 'bg-[#8E1729]/60 border-[#FF9D38] text-[#FFC46B]'
                    : 'bg-[#10162D] border-slate-700 text-slate-400'
                }`}
              >
                {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoScrolling ? t.kali.aartiAutoplayOn : t.kali.aartiAutoplayOff}</span>
              </button>

              <button
                onClick={() =>
                  setCurrentStanzaIndex((prev) => getNextStanzaIndex(prev, AARTI_STOTRAMS.length))
                }
                className="p-3 rounded-full bg-[#10162D] border border-[#D4AF69]/40 text-[#FFC46B] hover:bg-[#D4AF69] hover:text-[#08070D] transition-all"
                aria-label="Next Stanza"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
