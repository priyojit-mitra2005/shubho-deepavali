import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { festiveImages } from '../assets/images';
import { useLanguage } from '../context/LanguageContext';
import { formatBengaliNumber } from '../utils/festiveLogic';

interface GalleryItem {
  id: string;
  titleBn: string;
  titleEn: string;
  categories: Array<'puja' | 'diwali' | 'traditions' | 'diya' | 'night'>;
  categoryLabelBn: string;
  categoryLabelEn: string;
  image: string;
  captionBn: string;
  captionEn: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    titleBn: 'কার্তিক অমাবস্যার মহোৎসব',
    titleEn: 'Sacred Kali Puja Midnight Pandal',
    categories: ['puja', 'night'],
    categoryLabelBn: 'শ্যামাপূজা',
    categoryLabelEn: 'Kali Puja',
    image: festiveImages.heroKaliPujaNight,
    captionBn: 'আলোয় উদ্ভাসিত ঐতিহ্যবাহী কালীপূজা মণ্ডপ এবং ভক্তদের সম্মিলন।',
    captionEn: 'Dazzling midnight illumination of a traditional Bengali Kali Puja pandal.',
    aspect: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    id: 'g2',
    titleBn: 'শ্রী শ্রী শ্যামা কালী দর্শন',
    titleEn: 'Divine Darshan of Maa Shyama',
    categories: ['puja', 'traditions'],
    categoryLabelBn: 'দেবী দর্শন',
    categoryLabelEn: 'Divine Darshan',
    image: festiveImages.maaKaliDivineDarshan,
    captionBn: 'রক্তজবা ও স্বর্ণালঙ্কারে ভূষিতা শান্ত-ভীষণরূপা মা শ্যামার দিব্য বিগ্রহ।',
    captionEn: 'The awe-inspiring, benevolent form of Maa Kali adorned with crimson garlands.',
    aspect: 'col-span-1 row-span-2',
  },
  {
    id: 'g3',
    titleBn: 'উঠোনে আঁকা চালের আলপনা',
    titleEn: 'Folk Rice-Paste Alpana Floor Art',
    categories: ['traditions', 'diya'],
    categoryLabelBn: 'লোকশিল্প',
    categoryLabelEn: 'Folk Art',
    image: festiveImages.bengaliAlpanaArt,
    captionBn: 'মাটির আঙিনায় শুভ্র চালের গুঁড়োয় আঁকা পবিত্র মাঙ্গলিক আলপনা ও রক্তজবা।',
    captionEn: 'Sacred white motifs hand-painted on earthen courtyards to invite blessings.',
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'g4',
    titleBn: 'পূজার কাঁসার থালিতে রক্তজবা',
    titleEn: 'Sacred Crimson Hibiscus Offering',
    categories: ['puja', 'traditions'],
    categoryLabelBn: 'উপচার',
    categoryLabelEn: 'Offerings',
    image: festiveImages.redHibiscusJabaKusum,
    captionBn: 'পিতলের থালায় সাজানো সতেজ রক্তজবা, মাটির প্রদীপ ও লাল সিঁদুর।',
    captionEn: 'Fresh red hibiscus blooms and traditional clay diyas arranged for devotion.',
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'g5',
    titleBn: 'ধুনুচি নাচের আনন্দ',
    titleEn: 'Devotional Dhunuchi Incense Dance',
    categories: ['traditions', 'puja'],
    categoryLabelBn: 'ঐতিহ্যবাহী নৃত্য',
    categoryLabelEn: 'Traditional Dance',
    image: festiveImages.dhunuchiDanceCelebration,
    captionBn: 'ঢাকের বোল আর সুগন্ধি ধুনোর ধোঁয়ার মাঝে ভক্তদের ভক্তিঘন নৃত্য।',
    captionEn: 'Ecstatic incense dance to the thunderous rhythms of the traditional Dhaak drum.',
    aspect: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    id: 'g6',
    titleBn: 'চতুর্দিকে প্রদীপের মালা',
    titleEn: 'Luminous Rows of Deepavali Diyas',
    categories: ['diwali', 'diya'],
    categoryLabelBn: 'দীপাবলি',
    categoryLabelEn: 'Diwali',
    image: festiveImages.traditionalDiwaliDiyas,
    captionBn: 'গোলাকার আলপনার ওপর সাজানো শত শত মাটির প্রদীপের মায়াবী আভা।',
    captionEn: 'Hundreds of handcrafted earthen lamps casting a warm golden glow across the floor.',
    aspect: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    id: 'g7',
    titleBn: 'রাতের আকাশে আলোর রোশনাই',
    titleEn: 'Midnight Sky Festive Fireworks',
    categories: ['diwali', 'night'],
    categoryLabelBn: 'আতসবাজি',
    categoryLabelEn: 'Fireworks',
    image: festiveImages.festiveFireworksCelebration,
    captionBn: 'মন্দিরচূড়ার উপর চোখ ধাঁধানো আতসবাজির সোনালী রোশনাই।',
    captionEn: 'Spectacular sparkler fountains and firework bursts illuminating the autumn night.',
    aspect: 'col-span-1 row-span-1',
  },
];

type CategoryFilter = 'all' | 'puja' | 'diwali' | 'traditions' | 'diya' | 'night';

export const FestiveGallerySection: React.FC = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    filter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.categories.includes(filter));

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredItems]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null || selectedIndex === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      // Swiped left -> next
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    } else if (distance < -50) {
      // Swiped right -> prev
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeImage = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0A1324] via-[#10213B] to-[#070D18] overflow-hidden border-t-2 border-[#D4AF69]/30"
      aria-label="Festive Cultural Gallery"
    >
      {/* Sapphire Twilight & Starlight Radiance */}
      <div className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[#1E3A8A]/25 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#D4AF69]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-cinzel text-[#D4AF69] tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9D38]" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="font-bengali-title text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {t.gallery.title}
            </h2>
            <p className="font-bengali text-base sm:text-lg text-slate-300 mt-2 max-w-xl">
              {t.gallery.subhead}
            </p>
          </div>

          {/* 5-Category Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#10162D] rounded-2xl border border-[#D4AF69]/30 overflow-x-auto self-start lg:self-auto max-w-full">
            <button
              onClick={() => {
                setFilter('all');
                setSelectedIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-bengali transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#FFC46B] to-[#FF9D38] text-[#08070D] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.gallery.filterAll}
            </button>
            <button
              onClick={() => {
                setFilter('puja');
                setSelectedIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-bengali transition-all whitespace-nowrap ${
                filter === 'puja'
                  ? 'bg-gradient-to-r from-[#FFC46B] to-[#FF9D38] text-[#08070D] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.gallery.filterKali}
            </button>
            <button
              onClick={() => {
                setFilter('diwali');
                setSelectedIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-bengali transition-all whitespace-nowrap ${
                filter === 'diwali'
                  ? 'bg-gradient-to-r from-[#FFC46B] to-[#FF9D38] text-[#08070D] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.gallery.filterDiya}
            </button>
            <button
              onClick={() => {
                setFilter('traditions');
                setSelectedIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-bengali transition-all whitespace-nowrap ${
                filter === 'traditions'
                  ? 'bg-gradient-to-r from-[#FFC46B] to-[#FF9D38] text-[#08070D] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.gallery.filterTraditions}
            </button>
            <button
              onClick={() => {
                setFilter('night');
                setSelectedIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-bengali transition-all whitespace-nowrap ${
                filter === 'night'
                  ? 'bg-gradient-to-r from-[#FFC46B] to-[#FF9D38] text-[#08070D] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.gallery.filterNight}
            </button>
          </div>
        </div>

        {/* Masonry-Style Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className={`group relative rounded-2xl overflow-hidden border border-[#D4AF69]/30 hover:border-[#FFC46B] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_10px_35px_rgba(212,175,105,0.25)] ${
                item.aspect.includes('col-span-2') ? 'md:col-span-2' : 'col-span-1'
              } ${item.aspect.includes('row-span-2') ? 'row-span-2' : 'row-span-1'}`}
            >
              <img
                src={item.image}
                alt={language === 'bn' ? item.titleBn : item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08070D] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-cinzel uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#08070D]/80 border border-[#D4AF69]/40 text-[#FFC46B] backdrop-blur-md">
                  {language === 'bn' ? item.categoryLabelBn : item.categoryLabelEn}
                </span>
              </div>

              {/* View Icon Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full bg-black/60 text-[#FFC46B] border border-[#D4AF69]/50 backdrop-blur-md shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="font-bengali-title text-xl font-bold text-white group-hover:text-[#FFC46B] transition-colors">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                <p className="font-bengali text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                  {language === 'bn' ? item.captionBn : item.captionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal with Keyboard & Touch Swipe Navigation */}
      {activeImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-black/70 text-slate-300 hover:text-white border border-white/20 hover:border-[#D4AF69] transition-all z-20"
            aria-label={t.gallery.lightboxClose}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation: Prev Button */}
          <button
            onClick={() =>
              setSelectedIndex(
                (selectedIndex - 1 + filteredItems.length) % filteredItems.length
              )
            }
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-black/60 hover:bg-[#10162D] text-[#FFC46B] border border-[#D4AF69]/40 transition-all z-20"
            aria-label={t.gallery.prev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation: Next Button */}
          <button
            onClick={() =>
              setSelectedIndex((selectedIndex + 1) % filteredItems.length)
            }
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-black/60 hover:bg-[#10162D] text-[#FFC46B] border border-[#D4AF69]/40 transition-all z-20"
            aria-label={t.gallery.next}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Image Card */}
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF69]/60 shadow-[0_0_50px_rgba(212,175,105,0.3)] max-h-[75vh] w-full flex items-center justify-center bg-black">
              <img
                src={activeImage.image}
                alt={language === 'bn' ? activeImage.titleBn : activeImage.titleEn}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="flex items-center justify-center gap-3 text-xs text-[#D4AF69] font-cinzel mb-1">
                <span>
                  {language === 'bn'
                    ? activeImage.categoryLabelBn
                    : activeImage.categoryLabelEn}
                </span>
                <span>•</span>
                <span>
                  {language === 'bn'
                    ? `${formatBengaliNumber(selectedIndex + 1)} / ${formatBengaliNumber(
                        filteredItems.length
                      )}`
                    : `${selectedIndex + 1} of ${filteredItems.length}`}
                </span>
              </div>
              <h3 className="font-bengali-title text-2xl font-bold text-white">
                {language === 'bn' ? activeImage.titleBn : activeImage.titleEn}
              </h3>
              <p className="font-bengali text-sm text-slate-300 mt-1">
                {language === 'bn' ? activeImage.captionBn : activeImage.captionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
