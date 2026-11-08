import React, { useState, useEffect } from 'react';
import { Copy, Check, Share2, Sparkles, Send, Heart, Flame, Download, RefreshCw } from 'lucide-react';
import { generateWishUrl, parseWishParams, createShareText } from '../utils/festiveLogic';
import { soundManager } from '../utils/audioEngine';
import { downloadFestiveCard } from '../utils/cardGenerator';
import { useLanguage } from '../context/LanguageContext';

export const FestiveWishesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [cardLang, setCardLang] = useState<'bn' | 'en'>(language);
  const [greetingStyle, setGreetingStyle] = useState<'traditional' | 'devotional' | 'emotional' | 'modern'>('traditional');
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Sync cardLang default with main language
  useEffect(() => {
    setCardLang(language);
  }, [language]);

  // Check incoming URL params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parsed = parseWishParams(window.location.search);
      if (parsed.sender || parsed.receiver) {
        setSenderName(parsed.sender);
        setReceiverName(parsed.receiver);
      }
    }
  }, []);

  const currentGreeting = t.wishes.styles[greetingStyle]?.text || t.wishes.styles.traditional.text;

  const handleGenerateAndCopy = () => {
    soundManager.playCelebrationChime();
    const currentBase = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const fullUrl = generateWishUrl(senderName, receiverName, '', currentBase);
    setGeneratedLink(fullUrl);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    soundManager.playDiyaLight();
    const currentBase = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const url = generatedLink || generateWishUrl(senderName, receiverName, '', currentBase);
    const text = createShareText(senderName, receiverName, url);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCard = async () => {
    soundManager.playCelebrationChime();
    setIsDownloading(true);
    try {
      await downloadFestiveCard({
        sender: senderName,
        receiver: receiverName,
        language: cardLang,
        style: greetingStyle,
        customMessage: currentGreeting,
      });
    } catch (e) {
      console.warn('Card download error', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="wishes"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#260714] via-[#380D21] to-[#1C061C] overflow-hidden border-t-2 border-[#D4AF69]/30"
      aria-label="Festive Wishes and Personalized Cards"
    >
      {/* Festive Saffron & Warm Ruby Aura Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF9D38]/12 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-[#8E1729]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF69]/40 bg-[#08070D]/80 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9D38]" />
            <span className="text-xs font-cinzel text-[#FFC46B] tracking-widest uppercase">
              {t.wishes.badge}
            </span>
          </div>

          <h2 className="font-bengali-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {t.wishes.title}{' '}
            <span className="text-gold-gradient">{t.wishes.titleHighlight}</span>
          </h2>
          <p className="font-bengali text-lg sm:text-xl text-slate-300 mt-4 leading-relaxed max-w-2xl mx-auto">
            {t.wishes.subhead}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF69] to-transparent mx-auto mt-4" />
        </div>

        {/* Live Card Preview Box */}
        <div className="mb-14">
          <div className="max-w-3xl mx-auto text-center mb-4">
            <span className="text-xs font-cinzel text-[#D4AF69] uppercase tracking-widest inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9D38]" />
              {t.wishes.previewTitle}
            </span>
          </div>

          {/* Master Festive Wishes Card with Animated Golden Ornamental Frame */}
          <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-[#D4AF69] via-[#8E1729] to-[#FF9D38] shadow-[0_0_50px_rgba(212,175,105,0.3)] max-w-4xl mx-auto">
            <div className="rounded-[22px] bg-[#08070D]/98 backdrop-blur-2xl p-8 sm:p-12 relative overflow-hidden text-center border border-[#D4AF69]/35">
              {/* Corner Traditional Alpana Accents */}
              <div className="absolute top-3 left-3 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>
              <div className="absolute top-3 right-3 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>
              <div className="absolute bottom-3 left-3 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>
              <div className="absolute bottom-3 right-3 text-[#D4AF69]/40 text-xs font-cinzel">✦ ✦</div>

              {/* Top Ornamental Diya Motifs */}
              <div className="flex items-center justify-center gap-3 mb-6 text-[#FF9D38]">
                <span className="text-xs font-cinzel">✦ ✦ ✦</span>
                <Flame className="w-7 h-7 text-[#FF9D38] fill-[#FFC46B] animate-flame" />
                <span className="text-xs font-cinzel">✦ ✦ ✦</span>
              </div>

              {/* Title Header */}
              <h3 className="font-bengali-title text-2xl sm:text-3xl font-bold text-gold-gradient mb-4">
                {cardLang === 'bn' ? 'শুভ দীপাবলি ও শুভ শ্যামাপূজা' : 'Shubho Deepavali & Kali Puja'}
              </h3>

              {/* Personalized Recipient Header */}
              <div className="mb-6">
                <span className="font-bengali-title text-2xl sm:text-3xl text-[#FFC46B] font-bold block">
                  {receiverName.trim()
                    ? `${cardLang === 'bn' ? 'প্রিয়' : 'Dearest'} ${receiverName},`
                    : cardLang === 'bn'
                    ? 'প্রিয় সুহৃদ,'
                    : 'Dear Friend,'}
                </span>
              </div>

              {/* Core Greeting Message */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="font-bengali text-lg sm:text-xl text-slate-100 font-medium leading-relaxed">
                  {currentGreeting}
                </p>
              </div>

              {/* Sender Sign-off */}
              <div className="mt-8 pt-6 border-t border-[#D4AF69]/25 max-w-md mx-auto text-right">
                <span className="font-bengali text-base sm:text-lg text-[#D4AF69] block">
                  — {cardLang === 'bn' ? t.wishes.cardFrom : 'With Warmest Regards'},{' '}
                  <strong className="text-white">
                    {senderName.trim() ? senderName : cardLang === 'bn' ? 'আপনার প্রিয়জন' : 'Your Well-wisher'}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Festive Wish Card Creator Form */}
        <div className="rounded-3xl bg-[#10162D]/95 border-2 border-[#D4AF69]/40 p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3 className="font-bengali-title text-2xl sm:text-3xl font-bold text-gold-gradient">
              {t.wishes.generatorTitle}
            </h3>
            <p className="font-bengali text-sm sm:text-base text-slate-300 mt-2">
              {t.wishes.generatorSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Sender Name */}
            <div>
              <label
                htmlFor="sender-name-input"
                className="block text-xs font-cinzel text-[#D4AF69] uppercase tracking-wider mb-2 text-left"
              >
                {t.wishes.senderLabel}
              </label>
              <input
                id="sender-name-input"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder={t.wishes.senderPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#08070D] border border-slate-700 focus:border-[#FFC46B] focus:outline-none text-slate-100 font-bengali text-sm placeholder:text-slate-600 transition-colors shadow-inner"
              />
            </div>

            {/* Recipient Name */}
            <div>
              <label
                htmlFor="receiver-name-input"
                className="block text-xs font-cinzel text-[#D4AF69] uppercase tracking-wider mb-2 text-left"
              >
                {t.wishes.receiverLabel}
              </label>
              <input
                id="receiver-name-input"
                type="text"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder={t.wishes.receiverPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#08070D] border border-slate-700 focus:border-[#FFC46B] focus:outline-none text-slate-100 font-bengali text-sm placeholder:text-slate-600 transition-colors shadow-inner"
              />
            </div>

            {/* Greeting Style Selection */}
            <div>
              <label
                htmlFor="style-select"
                className="block text-xs font-cinzel text-[#D4AF69] uppercase tracking-wider mb-2 text-left"
              >
                {t.wishes.styleLabel}
              </label>
              <select
                id="style-select"
                value={greetingStyle}
                onChange={(e) =>
                  setGreetingStyle(e.target.value as 'traditional' | 'devotional' | 'emotional' | 'modern')
                }
                className="w-full px-4 py-3 rounded-xl bg-[#08070D] border border-slate-700 focus:border-[#FFC46B] focus:outline-none text-slate-100 font-bengali text-sm transition-colors cursor-pointer shadow-inner"
              >
                <option value="traditional">{t.wishes.styles.traditional.name}</option>
                <option value="devotional">{t.wishes.styles.devotional.name}</option>
                <option value="emotional">{t.wishes.styles.emotional.name}</option>
                <option value="modern">{t.wishes.styles.modern.name}</option>
              </select>
            </div>

            {/* Card Language Selection */}
            <div>
              <label
                htmlFor="lang-select"
                className="block text-xs font-cinzel text-[#D4AF69] uppercase tracking-wider mb-2 text-left"
              >
                {t.wishes.langLabel}
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-[#08070D] p-1 h-[48px] items-center">
                <button
                  type="button"
                  onClick={() => setCardLang('bn')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold font-bengali transition-all ${
                    cardLang === 'bn'
                      ? 'bg-gradient-to-r from-[#D4AF69] to-[#FF9D38] text-[#08070D]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা (Bengali)
                </button>
                <button
                  type="button"
                  onClick={() => setCardLang('en')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold font-cinzel transition-all ${
                    cardLang === 'en'
                      ? 'bg-gradient-to-r from-[#D4AF69] to-[#FF9D38] text-[#08070D]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Action Sharing & Download Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {/* Download Card PNG Button */}
            <button
              onClick={handleDownloadCard}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-[#08070D] bg-gradient-to-r from-[#FFC46B] via-[#FF9D38] to-[#D4AF69] hover:brightness-110 shadow-[0_0_25px_rgba(255,196,107,0.55)] font-bengali transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isDownloading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#08070D]" />
              ) : (
                <Download className="w-4 h-4 text-[#08070D]" />
              )}
              <span>{t.wishes.downloadCard}</span>
            </button>

            {/* Share WhatsApp Button */}
            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] font-bengali transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.wishes.shareWhatsApp}</span>
            </button>

            {/* Copy Shareable Link */}
            <button
              onClick={handleGenerateAndCopy}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-slate-200 bg-[#10162D] border border-[#D4AF69]/40 hover:border-[#FFC46B] hover:text-white shadow-md font-bengali transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC46B]"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.wishes.linkCopied : t.wishes.copyLink}</span>
            </button>
          </div>

          {generatedLink && (
            <div className="mt-6 max-w-2xl mx-auto p-3.5 rounded-xl bg-[#08070D]/90 border border-[#D4AF69]/30 text-xs text-slate-400 font-mono break-all text-center">
              {generatedLink}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
