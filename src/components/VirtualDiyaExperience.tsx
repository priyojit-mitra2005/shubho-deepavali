import React, { useState } from 'react';
import { Flame, RotateCcw, Sparkles, CheckCircle2, Award, Heart } from 'lucide-react';
import { calculateDiyaIllumination, formatBengaliNumber } from '../utils/festiveLogic';
import { soundManager } from '../utils/audioEngine';
import { useLanguage } from '../context/LanguageContext';

type DiyaState = 'unlit' | 'lighting' | 'lit';

interface DiyaItem {
  id: number;
  labelBn: string;
  labelEn: string;
  wishBn: string;
  wishEn: string;
  state: DiyaState;
}

const INITIAL_DIYAS_DATA = [
  { id: 1, labelBn: 'সুখ ও শান্তি', labelEn: 'Peace & Bliss', wishBn: 'জীবনে আসুক অফুরন্ত মানসিক প্রশান্তি ও সম্প্রীতি।', wishEn: 'May tranquility, harmony, and peace bless your days.' },
  { id: 2, labelBn: 'জ্ঞান ও প্রজ্ঞা', labelEn: 'Wisdom & Light', wishBn: 'অজ্ঞতার অন্ধকার দূর হয়ে জ্ঞানের আলোয় ভরে উঠুক চিত্ত।', wishEn: 'May the darkness of ignorance melt away under the light of wisdom.' },
  { id: 3, labelBn: 'সুস্বাস্থ্য ও আয়ু', labelEn: 'Health & Vitality', wishBn: 'শারীরিক ও মানসিক সুস্থতায় দীর্ঘায়ু লাভ হোক।', wishEn: 'May robust health, energy, and long life accompany you.' },
  { id: 4, labelBn: 'সাহস ও শক্তি', labelEn: 'Courage & Power', wishBn: 'মা কালীর কৃপায় যেকোনো প্রতিকূলতায় অটল থাকার সাহস।', wishEn: 'May Maa Kali grant you fearless courage to conquer all trials.' },
  { id: 5, labelBn: 'সমৃদ্ধি ও কল্যাণ', labelEn: 'Prosperity & Grace', wishBn: 'উন্নতি ও সমৃদ্ধিতে ভরে উঠুক আপনার পরিবার ও সমাজ।', wishEn: 'May abundant prosperity and welfare grace your home.' },
  { id: 6, labelBn: 'প্রেম ও মৈত্রী', labelEn: 'Love & Harmony', wishBn: 'সকল ভেদাভেদ ভুলে ভালোবাসার বন্ধন দৃঢ় হোক।', wishEn: 'May affection, compassion, and unity bind our relationships.' },
  { id: 7, labelBn: 'সত্য ও ন্যায়', labelEn: 'Truth & Justice', wishBn: 'সত্য ও ন্যায়ের পথে চলার অবিচল নিষ্ঠা।', wishEn: 'May you always stand steadfast in righteousness and truth.' },
  { id: 8, labelBn: 'ভক্তি ও মোক্ষ', labelEn: 'Devotion & Light', wishBn: 'মায়ের পাদপদ্মে পরম ভক্তি ও আত্মার পরম মুক্তি।', wishEn: 'May your heart discover supreme devotion at the lotus feet of the Divine.' }
];

export const VirtualDiyaExperience: React.FC = () => {
  const { language, t } = useLanguage();
  const [diyas, setDiyas] = useState<DiyaItem[]>(() =>
    INITIAL_DIYAS_DATA.map((d) => ({ ...d, state: 'unlit' as DiyaState }))
  );
  const [lastLitDiya, setLastLitDiya] = useState<DiyaItem | null>(null);

  const litCount = diyas.filter((d) => d.state === 'lit' || d.state === 'lighting').length;
  const illumination = calculateDiyaIllumination(litCount, diyas.length);

  const toggleDiya = (id: number) => {
    setDiyas((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          if (d.state === 'unlit') {
            soundManager.playDiyaLight();
            // Transition: unlit -> lighting -> lit
            setTimeout(() => {
              setDiyas((current) =>
                current.map((item) => (item.id === id ? { ...item, state: 'lit' } : item))
              );
            }, 450);
            const updated = { ...d, state: 'lighting' as DiyaState };
            setLastLitDiya(updated);
            return updated;
          } else {
            // Already lit -> unlit
            return { ...d, state: 'unlit' };
          }
        }
        return d;
      })
    );
  };

  const handleLightAll = () => {
    soundManager.playCelebrationChime();
    setDiyas((prev) =>
      prev.map((d) => ({ ...d, state: 'lighting' as DiyaState }))
    );
    setTimeout(() => {
      setDiyas((prev) =>
        prev.map((d) => ({ ...d, state: 'lit' as DiyaState }))
      );
    }, 450);
    setLastLitDiya(diyas[diyas.length - 1]);
  };

  const handleReset = () => {
    setDiyas(INITIAL_DIYAS_DATA.map((d) => ({ ...d, state: 'unlit' as DiyaState })));
    setLastLitDiya(null);
  };

  const isAllLit = litCount === diyas.length;

  return (
    <section
      id="diya-experience"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0D1426] via-[#15203D] to-[#0C1124] overflow-hidden border-t-2 border-[#D4AF69]/30 transition-all duration-700"
      aria-label="Virtual Diya Lighting Experience"
    >
      {/* Dynamic Ambient Background Illumination - expands as more diyas are lit */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full blur-[170px] pointer-events-none transition-all duration-1000"
        style={{
          backgroundColor:
            litCount > 0
              ? `rgba(255, 157, 56, ${0.12 + (litCount / diyas.length) * 0.38})`
              : 'rgba(56, 189, 248, 0.08)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF69]/40 bg-[#10162D]/90 mb-3 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#FF9D38]" />
            <span className="text-xs font-cinzel text-[#FFC46B] tracking-widest uppercase">
              {t.diya.badge}
            </span>
          </div>

          <h2 className="font-bengali-title text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <span className="text-gold-gradient">{t.diya.title}</span>
          </h2>

          <p className="font-bengali text-lg sm:text-xl text-slate-300 mt-4 leading-relaxed">
            {t.diya.subhead}
          </p>

          {/* Diya Counter & Progress Bar */}
          <div className="mt-7 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#10162D]/90 border border-[#D4AF69]/50 shadow-inner">
              <span className="text-sm font-bengali text-slate-300">
                {t.diya.diyaCountLabel}
              </span>
              <span className="font-bengali-title text-xl font-bold text-[#FFC46B] font-mono tabular-nums">
                {language === 'bn' ? formatBengaliNumber(litCount) : litCount} /{' '}
                {language === 'bn' ? formatBengaliNumber(diyas.length) : diyas.length}
              </span>
              <span className="text-xs text-[#D4AF69] font-cinzel">
                ({illumination.percentage}%)
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full max-w-md h-2.5 bg-slate-800/90 rounded-full mt-4 overflow-hidden border border-[#D4AF69]/30 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#8E1729] via-[#FF9D38] to-[#FFC46B] rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(255,196,107,0.9)]"
                style={{ width: `${illumination.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Special Achievement Banner when all Diyas are lit */}
        {isAllLit && (
          <div className="max-w-2xl mx-auto my-6 p-5 rounded-2xl bg-gradient-to-r from-[#8E1729]/50 via-[#32134F]/60 to-[#8E1729]/50 border-2 border-[#D4AF69] shadow-[0_0_40px_rgba(255,196,107,0.5)] animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6 text-[#FFC46B] animate-bounce" />
              <span className="font-bengali-title text-xl sm:text-2xl font-bold text-gold-gradient">
                {t.diya.achievementTitle}
              </span>
              <Sparkles className="w-5 h-5 text-[#FF9D38]" />
            </div>
            <p className="font-bengali text-sm sm:text-base text-slate-200">
              {t.diya.achievementText}
            </p>
          </div>
        )}

        {/* Diya Grid Array (3 Visual States: unlit, lighting, lit) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 max-w-4xl mx-auto my-8">
          {diyas.map((diya) => {
            const isLit = diya.state === 'lit';
            const isLighting = diya.state === 'lighting';
            const isUnlit = diya.state === 'unlit';
            const currentLabel = language === 'bn' ? diya.labelBn : diya.labelEn;
            const currentSubLabel = language === 'bn' ? diya.labelEn : diya.labelBn;

            return (
              <button
                key={diya.id}
                onClick={() => toggleDiya(diya.id)}
                className={`group relative flex flex-col items-center p-5 rounded-2xl border transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B] select-none ${
                  isLit
                    ? 'bg-gradient-to-b from-[#32134F]/40 to-[#10162D]/95 border-[#D4AF69] shadow-[0_0_35px_rgba(255,157,56,0.4)]'
                    : isLighting
                    ? 'bg-gradient-to-b from-[#8E1729]/40 to-[#10162D]/95 border-[#FF9D38] shadow-[0_0_45px_rgba(255,196,107,0.8)] scale-105'
                    : 'bg-[#10162D]/40 border-slate-800/80 hover:border-[#D4AF69]/50 hover:bg-[#10162D]/60'
                }`}
                aria-label={`${currentLabel} - ${isLit ? t.diya.litStatus : t.diya.unlitPrompt}`}
              >
                {/* Flame & Wick Area */}
                <div className="relative w-20 h-24 flex items-end justify-center pb-2">
                  {/* STATE 1: Fully Lit */}
                  {isLit && (
                    <>
                      {/* Golden Radiant Halo Aura */}
                      <div className="absolute inset-0 bg-[#FF9D38]/30 rounded-full blur-xl animate-pulse" />

                      {/* Floating Golden Sparks */}
                      <div className="absolute -top-3 w-1.5 h-1.5 bg-[#FFF1C5] rounded-full blur-[0.5px] animate-ping opacity-75" />

                      {/* Realistic Animated Flickering Flame */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-5 h-9 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-[#FF4500] via-[#FFA500] to-[#FFFACD] animate-flame shadow-[0_0_24px_rgba(255,196,107,0.95)] flex items-center justify-center">
                          {/* Cyan Inner Core Flame */}
                          <div className="w-1.5 h-3 rounded-full bg-cyan-300 opacity-80 mt-4" />
                        </div>
                        {/* Burning Wick */}
                        <div className="w-1 h-2 bg-amber-950 -mt-0.5 rounded-sm" />
                      </div>
                    </>
                  )}

                  {/* STATE 2: Lighting Ignition */}
                  {isLighting && (
                    <>
                      <div className="absolute inset-0 bg-[#FFC46B]/40 rounded-full blur-2xl animate-pulse" />
                      <div className="relative z-10 flex flex-col items-center animate-ignition">
                        <div className="w-6 h-10 rounded-full bg-gradient-to-t from-[#FF4500] via-[#FFD700] to-white shadow-[0_0_30px_#FFD700] flex items-center justify-center">
                          <div className="w-2 h-4 rounded-full bg-white opacity-90" />
                        </div>
                        <div className="w-1 h-2 bg-amber-900 -mt-0.5" />
                      </div>
                    </>
                  )}

                  {/* STATE 3: Unlit */}
                  {isUnlit && (
                    <div className="flex flex-col items-center mb-1 group-hover:scale-110 transition-transform">
                      <span className="text-[10px] text-slate-500 font-cinzel mb-1 tracking-wider opacity-80">
                        {language === 'bn' ? 'স্পর্শ করুন' : 'Tap to Light'}
                      </span>
                      {/* Unlit Dark Wick */}
                      <div className="w-1 h-3.5 bg-stone-600 rounded-sm" />
                    </div>
                  )}

                  {/* Terracotta Clay Diya Bowl */}
                  <div className="absolute bottom-0 w-16 h-6 bg-gradient-to-b from-[#A44222] via-[#853116] to-[#5C200C] rounded-b-full border-t border-[#D97706]/40 shadow-md flex items-center justify-center">
                    <div className="w-12 h-2.5 bg-[#4A1706] rounded-full opacity-60 -mt-2.5" />
                  </div>
                </div>

                {/* Diya Label */}
                <div className="mt-3 text-center">
                  <span
                    className={`font-bengali-title text-sm sm:text-base font-bold block transition-colors ${
                      isLit ? 'text-[#FFC46B]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {currentLabel}
                  </span>
                  <span className="text-[10px] text-[#D4AF69]/70 font-cinzel tracking-wider block">
                    {currentSubLabel}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="mt-2">
                  {isLit ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#FF9D38] font-bengali">
                      <CheckCircle2 className="w-3 h-3 text-[#FFC46B]" /> {t.diya.litStatus}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-bengali">
                      {t.diya.unlitPrompt}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Diya Devotional Wish Display */}
        {lastLitDiya && (
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-gradient-to-r from-[#8E1729]/30 via-[#32134F]/30 to-[#8E1729]/30 border border-[#D4AF69]/40 backdrop-blur-md mb-8 animate-in fade-in zoom-in-95 duration-300">
            <span className="text-xs font-cinzel text-[#D4AF69] tracking-widest uppercase block mb-1">
              {language === 'bn' ? lastLitDiya.labelBn : lastLitDiya.labelEn}{' '}
              {language === 'bn' ? 'এর আশীর্বাদ' : 'Blessing'}
            </span>
            <p className="font-bengali text-base sm:text-lg text-slate-100 font-medium">
              &ldquo;{language === 'bn' ? lastLitDiya.wishBn : lastLitDiya.wishEn}&rdquo;
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleLightAll}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] to-[#FF9D38] hover:brightness-110 shadow-[0_0_20px_rgba(255,196,107,0.45)] transition-all font-bengali focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.diya.lightAllBtn}</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-slate-300 bg-[#10162D] border border-slate-700 hover:border-[#D4AF69] hover:text-white transition-all font-bengali focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>{t.diya.resetBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
