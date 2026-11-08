import React, { useState } from 'react';
import { Flame, Heart, Share2, Check, ArrowUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createShareText } from '../utils/festiveLogic';
import { soundManager } from '../utils/audioEngine';

export const Footer: React.FC<{ onOpenSurprise: () => void }> = ({ onOpenSurprise }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShareWebsite = () => {
    soundManager.playCelebrationChime();
    const currentUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
    const shareData = {
      title: 'Shubho Deepavali | শুভ দীপাবলি ও শ্যামাপূজা',
      text: 'Celebrate the magic of Diwali and Bengali Kali Puja with interactive diyas, festive wishes, and sacred blessings.',
      url: currentUrl,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        copyFallback(currentUrl);
      });
    } else {
      copyFallback(currentUrl);
    }
  };

  const copyFallback = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#130720] via-[#0E0417] to-[#06020A] border-t-2 border-[#D4AF69]/30 pt-16 pb-12 overflow-hidden text-center sm:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8E1729] to-[#32134F] border border-[#D4AF69]/40 flex items-center justify-center shadow-[0_0_12px_rgba(255,157,56,0.4)]">
                <Flame className="w-4 h-4 text-[#FF9D38] fill-[#FFC46B] animate-flame" />
              </div>
              <span className="font-bengali-title text-xl font-bold text-gold-gradient">
                {t.navbar.brandTitle} – {t.navbar.brandSubtitle}
              </span>
            </div>

            <p className="font-bengali text-sm text-slate-300 max-w-sm leading-relaxed">
              {t.footer.brandMotto}
            </p>

            {/* Universal Peace Prayer */}
            <div className="p-3.5 rounded-xl bg-[#10162D]/60 border border-[#D4AF69]/25 max-w-sm">
              <span className="text-[10px] font-cinzel text-[#D4AF69] tracking-widest uppercase block mb-1">
                {t.footer.mantraTitle}
              </span>
              <p className="font-bengali text-xs text-slate-200 leading-relaxed italic">
                {t.footer.mantraText}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#FFC46B] font-semibold">
              {t.footer.quickLinks}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-bengali text-slate-300">
              <a href="#hero" className="hover:text-[#FFC46B] transition-colors py-1">
                {t.navbar.navHome}
              </a>
              <a href="#maa-kali" className="hover:text-[#FFC46B] transition-colors py-1">
                {t.navbar.navKali}
              </a>
              <a href="#diya-experience" className="hover:text-[#FFC46B] transition-colors py-1">
                {t.navbar.navDiya}
              </a>
              <a href="#heritage" className="hover:text-[#FFC46B] transition-colors py-1">
                {t.navbar.navHeritage}
              </a>
              <a href="#wishes" className="hover:text-[#FFC46B] transition-colors py-1">
                {t.navbar.navWishes}
              </a>
              <a href="#gallery" className="hover:text-[#FFC46B] transition-colors py-1">
                {t.navbar.navGallery}
              </a>
            </div>
          </div>

          {/* Share & Surprise Card Actions */}
          <div className="md:col-span-3 space-y-3 flex flex-col items-center sm:items-start justify-center">
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#FFC46B] font-semibold">
              {t.surprise.title}
            </h4>
            <p className="text-xs text-slate-300 font-bengali">
              {t.surprise.greetingBody1}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
              <button
                onClick={onOpenSurprise}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] hover:brightness-110 shadow-md font-bengali transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.navbar.surpriseBtn}</span>
              </button>

              {/* Share Website Button */}
              <button
                onClick={handleShareWebsite}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-slate-200 bg-[#10162D] border border-[#D4AF69]/40 hover:border-[#FFC46B] transition-all font-bengali"
                title="Share Website"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'শেয়ার করুন'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-bengali">
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>{t.footer.madeWithLove}</span>
              <Heart className="w-3.5 h-3.5 text-[#8E1729] fill-[#8E1729]" />
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#10162D] border border-[#D4AF69]/30 text-[#FFC46B] hover:text-white hover:border-[#FFC46B] transition-all"
              title="Scroll to Top"
              aria-label="Scroll to top of the page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
