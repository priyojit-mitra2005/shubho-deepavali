import React, { useState } from 'react';
import { ArrowUpRight, X, Sparkles } from 'lucide-react';
import { festiveImages } from '../assets/images';
import { useLanguage } from '../context/LanguageContext';

interface HeritageItemStatic {
  id: string;
  image: string;
}

const HERITAGE_ASSETS: Record<string, string> = {
  'kali-puja': festiveImages.heroKaliPujaNight,
  'alpana': festiveImages.bengaliAlpanaArt,
  'jaba-kusum': festiveImages.redHibiscusJabaKusum,
  'dhunuchi-dance': festiveImages.dhunuchiDanceCelebration,
  'deepavali-diyas': festiveImages.traditionalDiwaliDiyas,
  'fireworks': festiveImages.festiveFireworksCelebration,
};

export const BengaliHeritageSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState<{
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    extended: string;
    image: string;
  } | null>(null);

  return (
    <section
      id="heritage"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#1F0A2B] via-[#2F1042] to-[#180624] overflow-hidden border-t-2 border-[#D4AF69]/30"
      aria-label="Bengali Cultural Heritage"
    >
      {/* Royal Purple & Antique Gold Ambiance Glow */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-[#32134F]/50 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#D4AF69]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#D4AF69] tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9D38]" />
            <span>{t.heritage.badge}</span>
          </div>

          <h2 className="font-bengali-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {t.heritage.title}{' '}
            <span className="text-gold-gradient">{t.heritage.titleHighlight}</span>
          </h2>

          <p className="font-bengali text-lg sm:text-xl text-slate-300 mt-4 leading-relaxed max-w-2xl">
            {t.heritage.subhead}
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.heritage.items.map((item) => {
            const imageSrc = HERITAGE_ASSETS[item.id] || festiveImages.heroKaliPujaNight;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem({ ...item, image: imageSrc })}
                className="group relative rounded-2xl overflow-hidden bg-[#10162D]/60 border border-[#D4AF69]/25 hover:border-[#D4AF69]/80 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl hover:shadow-[0_12px_36px_rgba(212,175,105,0.2)] hover:-translate-y-1"
              >
                {/* Image Frame with cinematic aspect */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#08070D]">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10162D] via-transparent to-black/30" />

                  {/* Cultural Subtitle Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-cinzel uppercase tracking-wider px-3 py-1 rounded-full bg-[#08070D]/85 border border-[#D4AF69]/40 text-[#FFC46B] backdrop-blur-md">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-bengali-title text-2xl font-bold text-white group-hover:text-[#FFC46B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-cinzel text-xs text-[#D4AF69]/90 italic mt-1">
                      {item.subtitle}
                    </p>
                    <p className="font-bengali text-sm text-slate-300 mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FF9D38] font-bengali group-hover:text-[#FFC46B]">
                    <span className="font-semibold">{t.heritage.readMore}</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cultural Heritage Insight Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-2xl w-full rounded-2xl bg-[#10162D] border-2 border-[#D4AF69]/60 overflow-hidden shadow-2xl p-6 sm:p-8 my-6">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white border border-white/20 hover:border-[#D4AF69] transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-cinzel tracking-widest text-[#D4AF69] uppercase">
                {activeItem.subtitle}
              </span>
            </div>

            <h3 className="font-bengali-title text-3xl sm:text-4xl font-bold text-gold-gradient mb-2">
              {activeItem.title}
            </h3>

            <div className="rounded-xl overflow-hidden my-5 h-64 sm:h-72 border border-[#D4AF69]/40 shadow-inner">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-bengali text-base sm:text-lg text-slate-200 leading-relaxed">
              {activeItem.extended}
            </p>

            <div className="mt-6 pt-4 border-t border-[#D4AF69]/25 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] font-bengali shadow-md hover:brightness-110"
              >
                {t.heritage.modalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
