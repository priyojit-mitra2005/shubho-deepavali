/**
 * ShyamaSangitPlayer — Embedded YouTube playlist for শ্যামা সংগীত / Shyama Sangit.
 * Uses a privacy-enhanced embed (youtube-nocookie.com) with no autoplay.
 * Fully responsive, bilingual label, festive temple-inspired design.
 */

import React, { useState, useRef } from 'react';
import { Music2, ExternalLink, Play, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const YOUTUBE_VIDEO_ID = 'R7f_Kk8P8XY';
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white&iv_load_policy=3`;
const YOUTUBE_WATCH_URL = `https://youtu.be/${YOUTUBE_VIDEO_ID}`;

export const ShyamaSangitPlayer: React.FC = () => {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isBengali = language === 'bn';

  /* ── labels ─────────────────────────────────────────── */
  const labels = {
    sectionTag: isBengali ? 'ভক্তিসংগীত' : 'DEVOTIONAL MUSIC',
    titleBn: 'শ্যামা সংগীত',
    titleEn: 'Shyama Sangit',
    subtitle: isBengali
      ? 'মায়ের চরণে নিবেদিত পবিত্র ভক্তিগীতি'
      : 'Sacred devotional songs offered at the feet of Maa Kali',
    playBtn: isBengali ? 'সংগীত শুনুন' : 'Listen Now',
    watchFull: isBengali ? 'YouTube-এ দেখুন' : 'Watch on YouTube',
    nowPlaying: isBengali ? 'এখন বাজছে…' : 'Now Playing…',
    description: isBengali
      ? 'শ্যামা সংগীত বাংলার এক অনন্য আধ্যাত্মিক ঐতিহ্য — মা কালীর প্রতি গভীর ভক্তি ও ভালোবাসার সুর। রামপ্রসাদ সেন থেকে কাজী নজরুল ইসলাম, প্রতিটি গানে ঝরে পড়ে মায়ের প্রতি অকৃত্রিম অনুরাগ।'
      : 'Shyama Sangit is a unique spiritual tradition of Bengal — melodies of deep devotion and love for Maa Kali. From Ramprasad Sen to Kazi Nazrul Islam, each song brims with heartfelt longing for the Divine Mother.',
  };

  return (
    <section
      id="shyama-sangit"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{
        background:
          'linear-gradient(160deg, #130220 0%, #1e0530 25%, #2a0a1a 50%, #180216 75%, #0e0115 100%)',
      }}
      aria-label={`${labels.titleBn} – ${labels.titleEn}`}
    >
      {/* ── Decorative top border ── */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #D4AF69 20%, #FF9D38 50%, #D4AF69 80%, transparent 100%)',
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #8E1729 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #32134F 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Floating music notes (pure CSS) ── */}
      <div
        className="pointer-events-none absolute top-10 right-10 text-4xl opacity-10 select-none animate-bounce"
        aria-hidden="true"
        style={{ animationDuration: '3s' }}
      >
        ♪
      </div>
      <div
        className="pointer-events-none absolute bottom-14 left-10 text-3xl opacity-10 select-none animate-bounce"
        aria-hidden="true"
        style={{ animationDuration: '4s', animationDelay: '1s' }}
      >
        ♫
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Section header ── */}
        <div className="text-center mb-12">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF69]/40 bg-[#D4AF69]/10 mb-5">
            <Music2 className="w-3.5 h-3.5 text-[#FFC46B]" />
            <span className="font-cinzel text-[11px] tracking-[0.2em] text-[#FFC46B] uppercase">
              {labels.sectionTag}
            </span>
          </div>

          {/* Bilingual title — always shows both */}
          <h2 className="mb-2">
            <span
              className="block font-bengali-title text-4xl sm:text-5xl font-bold"
              style={{
                background:
                  'linear-gradient(135deg, #FFC46B 0%, #D4AF69 40%, #FF9D38 70%, #FFC46B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {labels.titleBn}
            </span>
            <span
              className="block font-cinzel text-lg sm:text-xl tracking-[0.15em] mt-1"
              style={{ color: '#D4AF69cc' }}
            >
              {labels.titleEn}
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF69]/60" />
            <span className="text-[#FF9D38] text-xl" aria-hidden="true">
              🪔
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF69]/60" />
          </div>

          {/* Subtitle */}
          <p
            className="font-bengali text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#c8b4d4' }}
          >
            {labels.subtitle}
          </p>
        </div>

        {/* ── Player card ── */}
        <div
          className="relative rounded-2xl overflow-hidden border border-[#D4AF69]/25 shadow-2xl"
          style={{
            background:
              'linear-gradient(145deg, rgba(50,19,79,0.6) 0%, rgba(20,5,35,0.85) 100%)',
            boxShadow:
              '0 0 60px rgba(212,175,105,0.12), 0 0 120px rgba(142,23,41,0.1), inset 0 1px 0 rgba(212,175,105,0.2)',
          }}
        >
          {/* ── Top bar of card ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF69]/20">
            <div className="flex items-center gap-3">
              {/* Vinyl record icon */}
              <div
                className={`w-9 h-9 rounded-full border-2 border-[#D4AF69]/50 flex items-center justify-center ${
                  showPlayer && isLoaded ? 'animate-spin' : ''
                }`}
                style={
                  showPlayer && isLoaded
                    ? { animationDuration: '3s' }
                    : {}
                }
              >
                <div className="w-3 h-3 rounded-full bg-[#D4AF69]/70" />
              </div>
              <div>
                <p
                  className="font-bengali-title text-sm font-semibold"
                  style={{ color: '#FFC46B' }}
                >
                  শ্যামা সংগীত
                </p>
                <p className="font-cinzel text-[10px] tracking-widest text-[#D4AF69]/70 uppercase">
                  Shyama Sangit
                </p>
              </div>
            </div>

            {/* Status + external link */}
            <div className="flex items-center gap-3">
              {showPlayer && isLoaded && (
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-cinzel text-[#FFC46B]/80 tracking-wider">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF9D38] animate-pulse"
                    aria-hidden="true"
                  />
                  {labels.nowPlaying}
                </span>
              )}
              <a
                href={YOUTUBE_WATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-cinzel tracking-wider border border-[#D4AF69]/40 text-[#D4AF69] hover:bg-[#D4AF69]/15 hover:border-[#D4AF69]/70 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
                aria-label={`${labels.watchFull} – opens YouTube`}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden sm:inline">{labels.watchFull}</span>
                <span className="sm:hidden">YouTube</span>
              </a>
            </div>
          </div>

          {/* ── Video area ── */}
          <div className="p-4 sm:p-6">
            {!showPlayer ? (
              /* ── Thumbnail / Play prompt ── */
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: '16/9' }}
                onClick={() => setShowPlayer(true)}
                onKeyDown={(e) => e.key === 'Enter' && setShowPlayer(true)}
                role="button"
                tabIndex={0}
                aria-label={labels.playBtn}
              >
                {/* YouTube thumbnail (hqdefault always exists) */}
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                  alt="শ্যামা সংগীত – Shyama Sangit thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,7,13,0.75) 0%, rgba(8,7,13,0.3) 60%, transparent 100%)',
                  }}
                />
                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,196,107,0.6)]"
                    style={{
                      background:
                        'linear-gradient(135deg, #D4AF69 0%, #FF9D38 50%, #FFC46B 100%)',
                      boxShadow: '0 0 25px rgba(255,196,107,0.4)',
                    }}
                  >
                    <Play
                      className="w-7 h-7 sm:w-9 sm:h-9 text-[#08070D] ml-1"
                      fill="currentColor"
                    />
                  </div>
                  <div className="text-center px-4">
                    <p
                      className="font-bengali-title text-lg sm:text-xl font-bold text-white drop-shadow-md"
                    >
                      {labels.playBtn}
                    </p>
                    <p className="font-cinzel text-xs tracking-widest text-[#FFC46B]/80 mt-1 uppercase">
                      শ্যামা সংগীত · Shyama Sangit
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Actual iframe embed ── */
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0e0115]/80 rounded-xl z-10">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-[#D4AF69]/40 border-t-[#FF9D38] animate-spin"
                      aria-label="Loading"
                    />
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={YOUTUBE_EMBED_URL}
                  title="শ্যামা সংগীত – Shyama Sangit"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-xl"
                  onLoad={() => setIsLoaded(true)}
                  style={{ border: 'none' }}
                />
              </div>
            )}
          </div>

          {/* ── Description area ── */}
          <div className="px-5 sm:px-8 pb-6 pt-0">
            <div
              className="rounded-xl px-5 py-4 border border-[#D4AF69]/15"
              style={{ background: 'rgba(212,175,105,0.05)' }}
            >
              <p
                className="font-bengali text-sm sm:text-base leading-7 text-center"
                style={{ color: '#c4aed4' }}
              >
                {labels.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Scroll cue into next section ── */}
        <div className="flex justify-center mt-10 opacity-50">
          <ChevronDown className="w-5 h-5 text-[#D4AF69] animate-bounce" aria-hidden="true" />
        </div>
      </div>

      {/* ── Decorative bottom border ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #D4AF69 20%, #FF9D38 50%, #D4AF69 80%, transparent 100%)',
        }}
      />
    </section>
  );
};

