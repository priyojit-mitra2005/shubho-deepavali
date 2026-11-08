import React, { useState, useEffect } from 'react';
import { X, Sparkles, Heart, Share2, Copy, Check, Flame } from 'lucide-react';
import { soundManager } from '../utils/audioEngine';
import { createShareText } from '../utils/festiveLogic';
import { useLanguage } from '../context/LanguageContext';

interface FestiveSurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FestiveSurpriseModal: React.FC<FestiveSurpriseModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'closed' | 'opening' | 'revealed'>('closed');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('closed');
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    setStep('opening');
    soundManager.playCelebrationChime();

    setTimeout(() => {
      setStep('revealed');
      soundManager.playTempleBell();
    }, 850);
  };

  const handleSpreadHappiness = () => {
    soundManager.playDiyaLight();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text = createShareText('', '', currentUrl);

    if (navigator.share) {
      navigator
        .share({
          title: 'শুভ দীপাবলি ও শ্যামাপূজা',
          text: text,
          url: currentUrl,
        })
        .catch(() => {
          copyToClipboard(text);
        });
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-title"
    >
      {/* Golden Particles & Floating Red Hibiscus Petals in Background when revealed */}
      {step === 'revealed' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${(i * 2.8) % 95}%`,
                top: `${(i * 6.5) % 90}%`,
                animationDuration: `${1.8 + (i % 4) * 0.4}s`,
                opacity: 0.8,
                filter: 'drop-shadow(0 0 12px rgba(255,196,107,0.8))',
              }}
            >
              {i % 3 === 0 ? '🌺' : i % 3 === 1 ? '✨' : '🪔'}
            </div>
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-lg w-full my-8 z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-black/60 text-slate-400 hover:text-white border border-white/20 hover:border-[#D4AF69] transition-all focus:outline-none"
          aria-label="Close Surprise Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'closed' || step === 'opening' ? (
          /* STEP 1, 2 & 3: Antique Gold Envelope with Illuminating Bengali Patterns */
          <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
            <h3
              id="surprise-title"
              className="font-bengali-title text-2xl sm:text-3xl font-bold text-gold-gradient mb-6"
            >
              {t.surprise.title}
            </h3>

            {/* Envelope Visual */}
            <div
              onClick={handleOpenEnvelope}
              className={`relative w-80 sm:w-96 h-56 sm:h-64 rounded-2xl cursor-pointer shadow-[0_0_60px_rgba(212,175,105,0.45)] transition-all duration-700 transform hover:scale-105 ${
                step === 'opening' ? 'scale-110' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #4A2800 0%, #D4AF69 50%, #8E1729 100%)',
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-[14px] bg-[#1a0f05] relative overflow-hidden flex flex-col items-center justify-center p-6 border border-[#FFC46B]/40">
                {/* Traditional Decorative Alpana Corner Motifs on Envelope */}
                <div className="absolute top-2 left-2 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>
                <div className="absolute top-2 right-2 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>
                <div className="absolute bottom-2 left-2 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>
                <div className="absolute bottom-2 right-2 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>

                {/* Envelope Flap Fold Lines with 3D Flip */}
                <div
                  className={`absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#D4AF69]/40 to-transparent border-b border-[#D4AF69]/60 transform origin-top transition-transform duration-700 ${
                    step === 'opening' ? '-rotate-180 opacity-30' : 'rotate-0'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                />

                {/* Royal Wax Seal in Center */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#6E0D1D] to-[#B81D36] border-2 border-[#D4AF69] shadow-[0_0_25px_rgba(184,29,54,0.9)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bengali-title text-[#FFC46B] font-bold">
                    মা
                  </span>
                </div>

                <div className="mt-4 text-center z-10">
                  <span className="font-bengali text-sm text-[#FFC46B] font-semibold block">
                    {t.surprise.tapPrompt}
                  </span>
                  <span className="text-[10px] font-cinzel text-slate-400 tracking-widest uppercase mt-0.5 block">
                    Tap to Open Envelope
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenEnvelope}
              className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] hover:brightness-110 shadow-[0_0_25px_rgba(255,196,107,0.6)] font-bengali transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#08070D]" />
              <span>{t.surprise.openBtn}</span>
            </button>
          </div>
        ) : (
          /* STEP 4 & 5: Revealed Glowing Greeting Card */
          <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-[#D4AF69] via-[#8E1729] to-[#FF9D38] shadow-[0_0_70px_rgba(255,157,56,0.55)] animate-in zoom-in-95 duration-500">
            <div className="rounded-[22px] bg-[#08070D]/98 backdrop-blur-2xl p-8 sm:p-10 text-center relative overflow-hidden border border-[#D4AF69]/50">
              {/* Inner Radiant Aura */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#FF9D38]/25 rounded-full blur-3xl pointer-events-none" />

              <div className="text-4xl mb-4 animate-bounce">🪔</div>

              <h3 className="font-bengali-title text-3xl sm:text-4xl font-bold text-gold-gradient mb-3">
                {t.surprise.greetingTitle}
              </h3>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF69] to-transparent mx-auto mb-6" />

              <p className="font-bengali text-lg sm:text-xl text-slate-100 font-medium leading-relaxed max-w-md mx-auto">
                {t.surprise.greetingBody1}
              </p>

              <p className="font-bengali text-sm sm:text-base text-[#FFC46B] mt-4 leading-relaxed max-w-md mx-auto">
                {t.surprise.greetingBody2}
              </p>

              {/* Action Buttons: Spread Happiness & Copy */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSpreadHappiness}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] hover:brightness-110 shadow-[0_0_20px_rgba(255,196,107,0.5)] font-bengali transition-all"
                >
                  <Heart className="w-4 h-4 fill-[#08070D]" />
                  <span>{t.surprise.spreadBtn}</span>
                </button>

                <button
                  onClick={handleSpreadHappiness}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-slate-300 bg-[#10162D] border border-[#D4AF69]/40 hover:text-white transition-all font-bengali"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">{t.surprise.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>{t.surprise.copyGreeting}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
