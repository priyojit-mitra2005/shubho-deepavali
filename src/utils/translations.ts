export type Language = 'bn' | 'en';

export interface TranslationDictionary {
  navbar: {
    brandTitle: string;
    brandSubtitle: string;
    navHome: string;
    navHomeSub: string;
    navKali: string;
    navKaliSub: string;
    navDiya: string;
    navDiyaSub: string;
    navHeritage: string;
    navHeritageSub: string;
    navWishes: string;
    navWishesSub: string;
    navGallery: string;
    navGallerySub: string;
    musicPlay: string;
    musicPause: string;
    sfxMute: string;
    sfxUnmute: string;
    surpriseBtn: string;
  };
  hero: {
    motto: string;
    headlinePart1: string;
    headlinePart2: string;
    subheading: string;
    quote: string;
    ctaCelebrate: string;
    ctaLightDiya: string;
    stat1Title: string;
    stat1Sub: string;
    stat2Title: string;
    stat2Sub: string;
    stat3Title: string;
    stat3Sub: string;
  };
  kali: {
    badge: string;
    title: string;
    idolTitle: string;
    idolSubtitle: string;
    desc1: string;
    desc2: string;
    prayerOfferBtn: string;
    prayerOfferedBadge: string;
    prayerBlessingTitle: string;
    prayerBlessingText: string;
    counterLabel: string;
    aartiBtn: string;
    aartiModalTitle: string;
    aartiAutoplayOn: string;
    aartiAutoplayOff: string;
    bellSoundBtn: string;
    shankhSoundBtn: string;
  };
  diya: {
    badge: string;
    title: string;
    subhead: string;
    diyaCountLabel: string;
    lightAllBtn: string;
    resetBtn: string;
    achievementTitle: string;
    achievementText: string;
    unlitPrompt: string;
    litStatus: string;
    diyas: Array<{
      id: number;
      label: string;
      wish: string;
    }>;
  };
  heritage: {
    badge: string;
    title: string;
    titleHighlight: string;
    subhead: string;
    readMore: string;
    modalClose: string;
    items: Array<{
      id: string;
      title: string;
      subtitle: string;
      desc: string;
      extended: string;
    }>;
  };
  surprise: {
    title: string;
    envelopeSub: string;
    tapPrompt: string;
    openBtn: string;
    greetingTitle: string;
    greetingBody1: string;
    greetingBody2: string;
    spreadBtn: string;
    copyGreeting: string;
    copied: string;
  };
  wishes: {
    badge: string;
    title: string;
    titleHighlight: string;
    subhead: string;
    generatorTitle: string;
    generatorSub: string;
    senderLabel: string;
    senderPlaceholder: string;
    receiverLabel: string;
    receiverPlaceholder: string;
    styleLabel: string;
    langLabel: string;
    downloadCard: string;
    shareWhatsApp: string;
    copyLink: string;
    linkCopied: string;
    previewTitle: string;
    cardFor: string;
    cardFrom: string;
    styles: {
      traditional: { name: string; text: string };
      devotional: { name: string; text: string };
      emotional: { name: string; text: string };
      modern: { name: string; text: string };
    };
  };
  gallery: {
    badge: string;
    title: string;
    subhead: string;
    filterAll: string;
    filterKali: string;
    filterDiya: string;
    filterTraditions: string;
    filterNight: string;
    lightboxClose: string;
    prev: string;
    next: string;
  };
  footer: {
    brandMotto: string;
    quickLinks: string;
    mantraTitle: string;
    mantraText: string;
    rights: string;
    madeWithLove: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  bn: {
    navbar: {
      brandTitle: 'আলোর উৎসব',
      brandSubtitle: 'Shubho Deepavali',
      navHome: 'উৎসবের শুরু',
      navHomeSub: 'Home',
      navKali: 'মা কালী',
      navKaliSub: 'Maa Kali',
      navDiya: 'প্রদীপ জ্বালান',
      navDiyaSub: 'Diya Experience',
      navHeritage: 'বাংলার ঐতিহ্য',
      navHeritageSub: 'Heritage',
      navWishes: 'শুভেচ্ছা কার্ড',
      navWishesSub: 'Wishes',
      navGallery: 'চিত্রশালা',
      navGallerySub: 'Gallery',
      musicPlay: 'সুর শুনুন',
      musicPause: 'সুর থামান',
      sfxMute: 'শব্দ বন্ধ',
      sfxUnmute: 'শব্দ চালু',
      surpriseBtn: 'উপহার ও শুভেচ্ছা',
    },
    hero: {
      motto: 'দীপের আলোয় দীপাবলি, ভক্তের আলোয় মা কালী',
      headlinePart1: 'আলোর উৎসবে,',
      headlinePart2: 'শক্তির আরাধনায়',
      subheading: 'শুভ দীপাবলি ও শ্যামাপূজার আন্তরিক প্রীতি ও শুভেচ্ছা।',
      quote: 'মা কালীর পবিত্র আলোয় দূর হোক আপনার জীবনের সমস্ত অন্ধকার, ভরে উঠুক সাহস, আনন্দ ও সমৃদ্ধিতে।',
      ctaCelebrate: '✨ উৎসবের আনন্দ দেখুন',
      ctaLightDiya: '🪔 প্রদীপ জ্বালান',
      stat1Title: 'কার্তিক অমাবস্যা',
      stat1Sub: 'শ্যামাপূজার তিথি',
      stat2Title: 'আলোর রোশনাই',
      stat2Sub: 'অন্ধকার জয়ের উৎসব',
      stat3Title: 'মায়ের কৃপা',
      stat3Sub: 'শান্তি ও সমৃদ্ধি',
    },
    kali: {
      badge: 'Devotional Sanctum · পবিত্র গর্ভগৃহ',
      title: 'জয় মা কালী',
      idolTitle: 'শ্রী শ্রী শ্যামা কালী',
      idolSubtitle: 'Adishakti Mahamaya · জগজ্জননী',
      desc1: 'কার্তিক অমাবস্যার এই নিশীথ রাতে মা কালীর আরাধনায় মুখরিত হয় আকাশ-বাতাস। তিনি সংহারকারিণী আবার তিনিই অভয়দায়িনী পরম স্নেহের জননী।',
      desc2: 'রক্তজবার রক্তিম স্পর্শে এবং প্রদীপের স্নিগ্ধ আলোয় মায়ের চরণে চিত্ত সমর্পণ করে লাভ করুন অন্তরের অমিত শক্তি ও চিরন্তন শান্তি।',
      prayerOfferBtn: '🌺 মা কালীর চরণে পুষ্পাঞ্জলি দিন (Offer Prayers)',
      prayerOfferedBadge: 'মায়ের শ্রীচরণে ভক্তিপুষ্প নিবেদিত হয়েছে',
      prayerBlessingTitle: 'মা কালীর দিব্য আশীর্বাদ',
      prayerBlessingText: 'মা কালীর কৃপায় তোমার জীবন আলো ও শক্তিতে ভরে উঠুক। সমস্ত ভয় ও বিঘ্ন বিনাশ হয়ে অন্তরে প্রজ্জ্বলিত হোক শুভবোধ ও সাহস।',
      counterLabel: 'ভক্তের নিবেদিত অঞ্জলি',
      aartiBtn: '🔔 আরতি ও স্তোত্র পাঠ শুনুন',
      aartiModalTitle: 'শ্রী শ্রী শ্যামাপূজা আরতি ও স্তোত্রমালা',
      aartiAutoplayOn: 'স্বয়ংক্রিয় পাঠ চালু',
      aartiAutoplayOff: 'স্বয়ংক্রিয় পাঠ বন্ধ',
      bellSoundBtn: 'মন্দিরের ঘণ্টা',
      shankhSoundBtn: 'পবিত্র শঙ্খধ্বনি',
    },
    diya: {
      badge: 'Interactive Devotion · প্রদীপ প্রজ্জ্বলন',
      title: 'প্রদীপ প্রজ্জ্বলন অভিজ্ঞতা',
      subhead: 'প্রতিটি প্রদীপের উপর স্পর্শ করে আলোর ধারা প্রজ্জ্বলিত করুন এবং অন্তরকে পবিত্র আলোয় উদ্ভাসিত করুন।',
      diyaCountLabel: 'আলোর প্রদীপ:',
      lightAllBtn: '✨ সমস্ত প্রদীপ প্রজ্জ্বলন করুন',
      resetBtn: 'পুনরায় সাজান',
      achievementTitle: 'আলোর উৎসবে তোমার অবদান অসাধারণ!',
      achievementText: 'সবকটি প্রদীপ প্রজ্জ্বলিত হয়েছে! আপনার জীবনের প্রতিটি অধ্যায় ভরে উঠুক শুভ আলোয় ও মায়ের কৃপায়।',
      unlitPrompt: 'প্রদীপ জ্বালাতে স্পর্শ করুন',
      litStatus: 'প্রদীপ জ্বলছে',
      diyas: [
        { id: 1, label: 'সুখ ও শান্তি', wish: 'জীবনে আসুক অফুরন্ত মানসিক প্রশান্তি ও সম্প্রীতি।' },
        { id: 2, label: 'জ্ঞান ও প্রজ্ঞা', wish: 'অজ্ঞতার অন্ধকার দূর হয়ে জ্ঞানের আলোয় ভরে উঠুক চিত্ত।' },
        { id: 3, label: 'সুস্বাস্থ্য ও আয়ু', wish: 'শারীরিক ও মানসিক সুস্থতায় দীর্ঘায়ু লাভ হোক।' },
        { id: 4, label: 'সাহস ও শক্তি', wish: 'মা কালীর কৃপায় যেকোনো প্রতিকূলতায় অটল থাকার সাহস।' },
        { id: 5, label: 'সমৃদ্ধি ও কল্যাণ', wish: 'উন্নতি ও সমৃদ্ধিতে ভরে উঠুক আপনার পরিবার ও সমাজ।' },
        { id: 6, label: 'প্রেম ও মৈত্রী', wish: 'সকল ভেদাভেদ ভুলে ভালোবাসার বন্ধন দৃঢ় হোক।' },
        { id: 7, label: 'সত্য ও ন্যায়', wish: 'সত্য ও ন্যায়ের পথে চলার অবিচল নিষ্ঠা।' },
        { id: 8, label: 'ভক্তি ও মোক্ষ', wish: 'মায়ের পাদপদ্মে পরম ভক্তি ও আত্মার পরম মুক্তি।' },
      ],
    },
    heritage: {
      badge: 'Bengali Cultural Heritage · ঐতিহ্য ও সংস্কৃতি',
      title: 'বাংলার ঐতিহ্যে,',
      titleHighlight: 'উৎসবের আবেশে',
      subhead: 'শতবর্ষের আবহমান ঐতিহ্য, ভক্তি ও লোকশিল্পকলার মিলনমেলা। জেনে নিন শ্যামাপূজা ও দীপাবলির অবিচ্ছেদ্য অঙ্গসমূহের গভীর তাৎপর্য।',
      readMore: 'বিস্তারিত তাৎপর্য পড়ুন',
      modalClose: 'ফিরে যান',
      items: [
        {
          id: 'kali-puja',
          title: 'শ্যামাপূজার মহিমা',
          subtitle: 'The Sacred Midnight Celebration of Bengal',
          desc: 'কার্তিক অমাবস্যার নিশাকালে বাংলার ঘরে ঘরে ও মণ্ডপে মণ্ডপে দেবীর আরাধনায় মুখরিত হয় অন্ধকার রাত।',
          extended: 'শ্যামাপূজা বা কালীপূজা হলো শক্তির প্রকাশ ও শুভশক্তির জয়ের এক অনন্য রূপ। গভীর রাতে মন্ত্রোচ্চারণ, বলিদান ও হোম-যজ্ঞের মাধ্যমে দেবীর কৃপা প্রার্থনা করা হয়। আলো আর অন্ধকারের এক অপূর্ব মিলন ঘটে এই রাতে।',
        },
        {
          id: 'alpana',
          title: 'ঐতিহ্যবাহী আলপনা',
          subtitle: 'Sacred White Rice Floor Artistry',
          desc: 'আতপ চালের পিটুলিতে আঁকা জটিল নকশা, যা গৃহের মঙ্গল ও সমৃদ্ধির শুভকামনায় আঁকা হয়।',
          extended: 'বাংলার নারীদের লোকশিল্পকলার এক অনবদ্য নিদর্শন আলপনা। শঙ্খ, পদ্ম, ধানের শীষ ও কল্কার সুনিপুণ মোটিফ দিয়ে সাজানো হয় দেবীর বেদী ও বাড়ির উঠোন। প্রতিটি টানে জড়িয়ে থাকে গভীর আধ্যাত্মিক বিশ্বাস।',
        },
        {
          id: 'jaba-kusum',
          title: 'জবা কুসুম নিবেদন',
          subtitle: 'The Velvet Bloom of Divine Devotion',
          desc: 'রক্তবর্ণ জবা মা কালীর সবচেয়ে প্রিয় পুষ্প। একশো আটটি জবার মালা দিয়ে মাকে সাজানো হয়।',
          extended: 'রক্তজবা শুধুমাত্র একটি ফুল নয়, এটি মায়ের কাছে ভক্তের আত্মনিবেদন ও তেজস্বী শক্তির প্রতীক। ভক্ত রামপ্রসাদ থেকে শুরু করে রামকৃষ্ণ পরমহংস—মায়ের চরণে রক্তজবা অর্পণ করেই রচনা করেছিলেন ভক্তির অমর কাব্য।',
        },
        {
          id: 'dhunuchi-dance',
          title: 'ধুনুচি নাচ',
          subtitle: 'Rhythmic Aromatic Incense Dance',
          desc: 'নারকেলের ছোবড়া ও সুগন্ধি ধুনো সহযোগে মাটির ধুনুচি হাতে ঢাকের তালে ভক্তদের উন্মাতাল নৃত্য।',
          extended: 'পূজার সন্ধ্যায় ঢাকের অবিরাম বোলে ও কর্পূরের ধোঁয়ায় চারপাশ যখন মোহিত হয়, তখন দুই হাতে এবং মুখে ধুনুচি নিয়ে ভক্তরা নৃত্য পরিবেশন করেন। এটি মনের সকল অমঙ্গল ও অহংকার পুড়িয়ে শুদ্ধ করার প্রতীক।',
        },
        {
          id: 'deepavali-diyas',
          title: 'দীপাবলির প্রদীপমালা',
          subtitle: 'Rows of Handcrafted Earthen Lamps',
          desc: 'মাটির প্রদীপে সরিষার তেল ও তুলোর সলতে দিয়ে জ্বালানো হয় আলোর ধারা, যা দূর করে সব অন্ধকার।',
          extended: 'চৌদ্দ প্রদীপের আলো থেকে শুরু করে দীপাবলির রাত পর্যন্ত প্রতি দরজায়, ছাদে ও আঙিনায় প্রদীপ প্রজ্জ্বলন বাংলার চিরন্তন সংস্কৃতি। এটি গৃহকোণকে অশুভ শক্তি থেকে মুক্ত রেখে শুভ ও সৌভাগ্যকে আহ্বান জানায়।',
        },
        {
          id: 'fireworks',
          title: 'আলোর আতসবাজি',
          subtitle: 'Spectacular Night Sky Festivities',
          desc: 'তারাবাতি, তুবড়ি ও চরকির সোনালী আলোর স্ফুলিঙ্গে মেতে ওঠে বাংলার উৎসবমুখর আকাশ।',
          extended: 'দীপাবলির রাতে আতসবাজির ঝলকানি আকাশকে তারার মতো উজ্জ্বল করে তোলে। শিশু থেকে বৃদ্ধ—সবার মনে আনন্দের ঢেউ আনে এই আলোর খেলা। অন্ধকারকে হারিয়ে দিয়ে জীবনের উজ্জ্বলতাকে উদযাপন করার এক অনাবিল মাধ্যম।',
        },
      ],
    },
    surprise: {
      title: 'আপনার জন্য উৎসবের বিশেষ উপহার',
      envelopeSub: 'মা কালীর পবিত্র আশীর্বাদ',
      tapPrompt: 'উপহারটি খুলতে স্পর্শ করুন',
      openBtn: '✨ উপহারটি খুলুন',
      greetingTitle: 'শুভ দীপাবলি ও শুভ শ্যামাপূজা!',
      greetingBody1: 'আলোর এই পবিত্র উৎসবে তোমার জীবন ভরে উঠুক অনাবিল আনন্দ, অফুরন্ত ভালোবাসা আর মায়ের আশীর্বাদে।',
      greetingBody2: 'দীপের শিখায় দূর হোক অন্তরের সকল অন্ধকার, জীবনের প্রতিটি পদক্ষেপ হোক আলোকিত ও নির্ভীক।',
      spreadBtn: 'Spread Happiness ❤️',
      copyGreeting: 'শুভেচ্ছা কপি করুন',
      copied: 'কপি হয়েছে!',
    },
    wishes: {
      badge: 'Bespoke Greetings · শুভেচ্ছা কার্ড নির্মাতা',
      title: 'আপনার পছন্দের',
      titleHighlight: 'উৎসবের শুভেচ্ছা তৈরি করুন',
      subhead: 'নিজের ও প্রিয়জনের নাম লিখুন, পছন্দের শৈলী বেছে নিন এবং নিখুঁত একটি কার্ড তৈরি করে ডাউনলোড বা প্রিয়জনকে উপহার দিন।',
      generatorTitle: 'শুভেচ্ছা কার্ডের বিবরণ',
      generatorSub: 'ব্যক্তিগত স্পর্শে অনন্য করে তুলুন আপনার উৎসবের বার্তা',
      senderLabel: 'আপনার নাম (Sender Name)',
      senderPlaceholder: 'যেমন: শুভঙ্কর',
      receiverLabel: 'প্রিয়জনের নাম (Recipient Name)',
      receiverPlaceholder: 'যেমন: অনিন্দিতা',
      styleLabel: 'শুভেচ্ছা শৈলী (Greeting Style)',
      langLabel: 'কার্ডের ভাষা (Card Language)',
      downloadCard: 'কার্ড ডাউনলোড করুন (PNG)',
      shareWhatsApp: 'হোয়াটসঅ্যাপে শেয়ার করুন',
      copyLink: 'শেয়ার লিংক কপি করুন',
      linkCopied: 'লিংক কপি হয়েছে!',
      previewTitle: 'লাইভ শুভেচ্ছা কার্ড প্রিভিউ',
      cardFor: 'স্নেহভাজন',
      cardFrom: 'সস্নেহ শুভেচ্ছান্তে',
      styles: {
        traditional: {
          name: 'ঐতিহ্যবাহী বাংলা (Traditional)',
          text: 'শুভ দীপাবলি ও শ্যামাপূজার আন্তরিক প্রীতি ও শুভেচ্ছা। মাটির প্রদীপের স্নিগ্ধ আলোয় আপনার ঘর ও মন ভরে উঠুক সুখ, শান্তি ও সৌহার্দ্যে।',
        },
        devotional: {
          name: 'আধ্যাত্মিক ও ভক্তিমূলক (Devotional)',
          text: 'মা কালীর দিব্য চরণে প্রণাম। মায়ের আশীর্বাদে আপনার জীবনের সকল বাধা দূর হোক, অন্তরে বিরাজ করুক অক্ষয় শান্তি ও আধ্যাত্মিক বল। জয় মা কালী!',
        },
        emotional: {
          name: 'স্নেহময় ও আবেগঘন (Emotional)',
          text: 'আলোর এই পবিত্র লগ্নে তোমার জীবনের প্রতিটি দিন আনন্দ ও ভালোবাসায় ভরে উঠুক। শত মাইল দূর থেকেও তোমার জন্য রইল হৃদয়ের গভীরতম ভালোবাসা ও আশীর্বাদ।',
        },
        modern: {
          name: 'বন্ধুত্বপূর্ণ ও আধুনিক (Modern & Friendly)',
          text: 'দীপাবলির অফুরন্ত আনন্দ, মিষ্টিমুখ আর আলোকোজ্জ্বল মুহূর্তগুলো তোমার সাথে থাকুক সারা বছর! হ্যাপি দিওয়ালি ও শুভ কালীপূজা!',
        },
      },
    },
    gallery: {
      badge: 'Visual Celebration · উৎসবের চিত্রশালা',
      title: 'উৎসবের চিত্রশালা',
      subhead: 'বাংলার শ্যামাপূজা ও দীপাবলির অবিস্মরণীয় মুহূর্তসমূহ।',
      filterAll: 'সকল ছবি',
      filterKali: 'কালীপূজা',
      filterDiya: 'দীপাবলি ও প্রদীপ',
      filterTraditions: 'বাংলার ঐতিহ্য',
      filterNight: 'উৎসবের নিশুতি রাত',
      lightboxClose: 'বন্ধ করুন (Esc)',
      prev: 'পূর্ববর্তী',
      next: 'পরবর্তী',
    },
    footer: {
      brandMotto: 'দীপের আলোয় দীপাবলি, ভক্তের আলোয় মা কালী। বাংলার চিরন্তন উৎসবের আলোয় উদ্ভাসিত প্রতিটি হৃদয়।',
      quickLinks: 'দ্রুত লিংক',
      mantraTitle: 'শান্তিমন্ত্র',
      mantraText: 'ওঁ অসতো মা সদ্গময়। তমসো মা জ্যোতির্গময়। মৃত্যোর্মা অমৃতং গময়। ওঁ শান্তিঃ শান্তিঃ শান্তিঃ॥',
      rights: 'সর্বস্বত্ব সংরক্ষিত। শুভ দীপাবলি ও শ্যামাপূজা মহোৎসব।',
      madeWithLove: 'বাংলার ঐতিহ্য ও শ্রদ্ধায় নিবেদিত',
    },
  },
  en: {
    navbar: {
      brandTitle: 'Festival of Lights',
      brandSubtitle: 'Shubho Deepavali & Kali Puja',
      navHome: 'Home',
      navHomeSub: 'উৎসবের শুরু',
      navKali: 'Maa Kali',
      navKaliSub: 'মা কালী',
      navDiya: 'Diya Experience',
      navDiyaSub: 'প্রদীপ জ্বালান',
      navHeritage: 'Heritage',
      navHeritageSub: 'বাংলার ঐতিহ্য',
      navWishes: 'Festive Wishes',
      navWishesSub: 'শুভেচ্ছা কার্ড',
      navGallery: 'Gallery',
      navGallerySub: 'চিত্রশালা',
      musicPlay: 'Play Music',
      musicPause: 'Pause Music',
      sfxMute: 'Mute SFX',
      sfxUnmute: 'Unmute SFX',
      surpriseBtn: 'Festive Gift & Surprise',
    },
    hero: {
      motto: 'By the Light of Diyas, By the Grace of Maa Kali',
      headlinePart1: 'In the Festival of Lights,',
      headlinePart2: 'In Sacred Adoration of Divine Shakti',
      subheading: 'Warm and heartiest greetings on the sacred occasion of Shubho Deepavali & Bengali Kali Puja.',
      quote: 'May the divine radiant light of Maa Kali dispel every shadow of doubt and darkness, blessing you with courage, serenity, and boundless joy.',
      ctaCelebrate: '✨ Explore Festivities',
      ctaLightDiya: '🪔 Light a Holy Diya',
      stat1Title: 'Kartik Amavasya',
      stat1Sub: 'Sacred New Moon Night',
      stat2Title: 'A Million Diyas',
      stat2Sub: 'Triumph of Eternal Light',
      stat3Title: 'Divine Grace',
      stat3Sub: 'Peace, Power & Abundance',
    },
    kali: {
      badge: 'Devotional Sanctum · Sacred Shrine',
      title: 'Jai Maa Kali',
      idolTitle: 'Shree Shree Shyama Kali',
      idolSubtitle: 'Adishakti Mahamaya · Cosmic Mother',
      desc1: 'On the sacred midnight of Kartik Amavasya, the atmosphere resounds with devotional adoration of Maa Kali. She is the fierce slayer of negativity and the tender, loving guardian of all who seek her refuge.',
      desc2: 'Adorned with crimson hibiscus flowers and surrounded by holy oil lamps, surrender your worries at her feet and awaken eternal spiritual strength.',
      prayerOfferBtn: '🌺 Offer Your Devotional Prayers (পুষ্পাঞ্জলি)',
      prayerOfferedBadge: 'Devotional flower offering accepted at Maa’s lotus feet',
      prayerBlessingTitle: 'Divine Blessing of Maa Kali',
      prayerBlessingText: 'May the boundless grace of Maa Kali illuminate your life with courage and divine strength. May all fear, sorrow, and hindrances be dissolved into radiant truth.',
      counterLabel: 'Devotees Blessed',
      aartiBtn: '🔔 Recite Aarti & Sacred Stotrams',
      aartiModalTitle: 'Sacred Shyama Puja Aarti & Hymns',
      aartiAutoplayOn: 'Auto-advance Stotram ON',
      aartiAutoplayOff: 'Auto-advance Stotram OFF',
      bellSoundBtn: 'Temple Bell',
      shankhSoundBtn: 'Sacred Conch (Shankha)',
    },
    diya: {
      badge: 'Interactive Devotion · Virtual Diya Lighting',
      title: 'Virtual Diya Lighting Experience',
      subhead: 'Touch each earthen lamp to ignite its holy flame and witness the radiant dawn of peace and harmony.',
      diyaCountLabel: 'Illuminated Diyas:',
      lightAllBtn: '✨ Light All Holy Diyas',
      resetBtn: 'Reset All Diyas',
      achievementTitle: 'Magnificent! You Have Lit All Diyas!',
      achievementText: 'Every sacred diya is glowing brilliantly! May your journey be forever illuminated by the blessing of the Divine Mother.',
      unlitPrompt: 'Tap to light holy diya',
      litStatus: 'Diya is glowing',
      diyas: [
        { id: 1, label: 'Peace & Bliss', wish: 'May tranquility, harmony, and mental serenity bless your days.' },
        { id: 2, label: 'Wisdom & Light', wish: 'May the darkness of ignorance melt away under the light of knowledge.' },
        { id: 3, label: 'Health & Vitality', wish: 'May robust health, energy, and longevity accompany you.' },
        { id: 4, label: 'Courage & Power', wish: 'May Maa Kali grant you fearless courage to conquer all trials.' },
        { id: 5, label: 'Prosperity & Grace', wish: 'May abundant prosperity and welfare grace your home and loved ones.' },
        { id: 6, label: 'Love & Harmony', wish: 'May affection, compassion, and unity bind our relationships.' },
        { id: 7, label: 'Truth & Justice', wish: 'May you always stand steadfast in righteousness and noble truth.' },
        { id: 8, label: 'Devotion & Liberation', wish: 'May your heart discover supreme devotion at the feet of the Divine.' },
      ],
    },
    heritage: {
      badge: 'Bengali Cultural Heritage · Living Traditions',
      title: 'In the Heart of Bengal,',
      titleHighlight: 'A Festival of Soul',
      subhead: 'A century-old tapestry of devotion, classical folk artistry, and festive joy. Discover the profound cultural significance of Kali Puja and Deepavali.',
      readMore: 'Read Cultural Lore',
      modalClose: 'Close Insight',
      items: [
        {
          id: 'kali-puja',
          title: 'Kali Puja Pandal & Worship',
          subtitle: 'The Sacred Midnight Celebration of Bengal',
          desc: 'On the mysterious new moon of autumn, Bengal awakens in glorious midnight adoration with bells, hymns, and resplendent lights.',
          extended: 'Shyama Puja represents the absolute triumph of righteous energy over dark forces. Under the autumn midnight sky, devotees celebrate with Vedic rituals, sacred fire oblations, and passionate community feasts. It is an unforgettable night where spiritual fervor meets festive joy.',
        },
        {
          id: 'alpana',
          title: 'Bengali Folk Alpana',
          subtitle: 'Sacred White Rice Floor Artistry',
          desc: 'Intricate geometric motifs painted by hand using rice paste, welcoming peace, purity, and sacred prosperity.',
          extended: 'Alpana is a peerless tradition of Bengali folk art passed down across generations. Using sacred motifs such as the conch (Shankha), lotus, grain sheathes, and paisleys, artists turn doorways and temple floors into sacred canvas. Each stroke embodies prayer and artistic elegance.',
        },
        {
          id: 'jaba-kusum',
          title: 'Sacred Red Hibiscus',
          subtitle: 'The Velvet Bloom of Divine Devotion',
          desc: 'The vibrant crimson hibiscus is the most sacred offering beloved by Maa Kali, symbolizing the pure fire of love.',
          extended: 'Red hibiscus (Jaba Kusum) is not merely a blossom; it represents the surrender of the ego at the lotus feet of the Divine Mother. From poet-saint Ramprasad to Sri Ramakrishna, Bengal’s greatest mystics composed eternal poetry holding this crimson flower in devotion.',
        },
        {
          id: 'dhunuchi-dance',
          title: 'Dhunuchi Devotional Dance',
          subtitle: 'Rhythmic Aromatic Incense Dance',
          desc: 'Devotees balance earthen burners of camphor and coconut husk, dancing to the ecstatic beats of the traditional Dhaak drum.',
          extended: 'As the twilight air fills with the soothing aroma of burning frankincense and the mesmerizing rhythm of the Bengali Dhaak, devotees dance with clay dhunuchis held in their hands and even their teeth. It signifies burning away all mental impurities and negativity.',
        },
        {
          id: 'deepavali-diyas',
          title: 'Traditional Deepavali Diyas',
          subtitle: 'Rows of Handcrafted Earthen Lamps',
          desc: 'Handmade clay diyas infused with mustard oil and cotton wicks casting a soft, warm golden glow across every verandah.',
          extended: 'From the traditional fourteen lamps of Choddo Shaak to the grand night of Deepavali, lighting clay diyas is an essential Bengali tradition. It purifies the threshold, protects against misfortune, and invites prosperity and light into the household.',
        },
        {
          id: 'fireworks',
          title: 'Festive Fireworks & Illumination',
          subtitle: 'Spectacular Night Sky Festivities',
          desc: 'Sparklers, golden fountains, and spinning ground wheels turning the midnight sky into a dazzling shower of stars.',
          extended: 'On the festive night, neighborhoods reverberate with laughter as sparklers and fountains light up the streets. Children and elders alike join in the jubilation, welcoming the dawn of hope and dispelling the fears of the night.',
        },
      ],
    },
    surprise: {
      title: 'A Sacred Festive Gift For You',
      envelopeSub: 'Divine Blessings of Maa Kali',
      tapPrompt: 'Tap Royal Envelope to Open',
      openBtn: '✨ Open Royal Envelope',
      greetingTitle: 'Shubho Deepavali & Shubho Shyama Puja!',
      greetingBody1: 'On this sacred festival of lights, may your life be filled with boundless joy, endless love, and the divine blessings of Maa Kali.',
      greetingBody2: 'May the holy flames of a thousand diyas banish every shadow of sorrow, filling your journey ahead with courage, wisdom, and eternal grace.',
      spreadBtn: 'Spread Happiness ❤️',
      copyGreeting: 'Copy Greeting Text',
      copied: 'Copied to Clipboard!',
    },
    wishes: {
      badge: 'Bespoke Greetings · Personalized Card Maker',
      title: 'Create Your Own',
      titleHighlight: 'Festive Wishes & Card',
      subhead: 'Add your name and recipient’s name, select your preferred greeting tone, and generate a downloadable, shareable card instantly.',
      generatorTitle: 'Card Customization Details',
      generatorSub: 'Craft a personalized blessing with rich cultural aesthetic',
      senderLabel: 'Your Name (Sender)',
      senderPlaceholder: 'e.g. Rahul',
      receiverLabel: 'Recipient’s Name',
      receiverPlaceholder: 'e.g. Priya',
      styleLabel: 'Greeting Style',
      langLabel: 'Card Language',
      downloadCard: 'Download Card (PNG)',
      shareWhatsApp: 'Share on WhatsApp',
      copyLink: 'Copy Shareable Link',
      linkCopied: 'Shareable Link Copied!',
      previewTitle: 'Live Festive Greeting Card Preview',
      cardFor: 'Wishing Dearest',
      cardFrom: 'With Warmest Blessings From',
      styles: {
        traditional: {
          name: 'Traditional Bengali (ঐতিহ্যবাহী)',
          text: 'Wishing you and your family a very happy and blessed Shubho Deepavali and Kali Puja. May the warmth of holy diyas bring prosperity, happiness, and timeless peace to your home.',
        },
        devotional: {
          name: 'Spiritual & Devotional (আধ্যাত্মিক)',
          text: 'Humble salutations at the sacred feet of Maa Kali. May the Divine Mother protect you from all harm, grant you inner wisdom, and illuminate your spiritual path. Jai Maa Kali!',
        },
        emotional: {
          name: 'Warm & Emotional (স্নেহময়)',
          text: 'On this glowing festival of lights, I send you my deepest love and heartfelt prayers. Even across distances, may our bond shine as bright as a golden diya.',
        },
        modern: {
          name: 'Modern & Friendly (বন্ধুত্বপূর্ণ)',
          text: 'Sparklers, sweets, and sparkling smiles! Wishing you a super joyful Diwali and an auspicious Kali Puja filled with fantastic moments and celebrations!',
        },
      },
    },
    gallery: {
      badge: 'Visual Celebration · Curated Gallery',
      title: 'Festive Photo Gallery',
      subhead: 'Cinematic moments honoring the sacred celebration of Kali Puja and Diwali in Bengal.',
      filterAll: 'All Moments',
      filterKali: 'Kali Puja',
      filterDiya: 'Diwali & Diyas',
      filterTraditions: 'Bengali Traditions',
      filterNight: 'Festive Night',
      lightboxClose: 'Close (Esc)',
      prev: 'Previous',
      next: 'Next',
    },
    footer: {
      brandMotto: 'By the light of holy diyas and the grace of Maa Kali. May every heart be illuminated by the eternal warmth of Bengal’s celebration.',
      quickLinks: 'Quick Links',
      mantraTitle: 'Universal Peace Prayer',
      mantraText: 'Om Asato Ma Sadgamaya, Tamaso Ma Jyotirgamaya, Mrityorma Amritam Gamaya. Om Shanti, Shanti, Shanti.',
      rights: 'All rights reserved. Shubho Deepavali & Kali Puja Celebration.',
      madeWithLove: 'Crafted with devotion and Bengali cultural heritage',
    },
  },
};

