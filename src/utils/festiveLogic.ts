/**
 * Pure festive calculations and greeting URL management.
 */

export interface WishData {
  sender: string;
  receiver: string;
  note: string;
}

export interface IlluminationState {
  litCount: number;
  totalCount: number;
  percentage: number;
  isAllLit: boolean;
  message: string;
}

export interface AartiStanza {
  id: number;
  titleBn: string;
  titleEn: string;
  sanskrit: string;
  bengali: string;
  meaning: string;
}

export const AARTI_STOTRAMS: AartiStanza[] = [
  {
    id: 1,
    titleBn: 'শ্রী শ্রী চণ্ডী প্রণাম স্তোত্র',
    titleEn: 'Chandi Pranama Mantra',
    sanskrit: 'সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে।\nশরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥',
    bengali: 'সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে।\nশরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥',
    meaning: 'হে সর্বমঙ্গলময়ী কল্যাণী শিবে, হে সকল মনোবাঞ্ছা পূরণকারিণী, শরণাগতের আশ্রয়দাত্রী ত্রিনয়নী গৌরী নারায়ণী, তোমাকে প্রণাম।'
  },
  {
    id: 2,
    titleBn: 'শ্রী শ্রী দক্ষিণাকালী ধ্যানমন্ত্র',
    titleEn: 'Maa Kali Dhyana Mantra',
    sanskrit: 'ওঁ করালবদনাং ঘোরাং মুক্তকেশীং চতুর্ভুজাম্।\nকালিকাং দক্ষিণাং দিব্যাং মুণ্ডমালাবিভূষিতাঁ॥',
    bengali: 'ওঁ করালবদনাং ঘোরাং মুক্তকেশীং চতুর্ভুজাম্।\nকালিকাং দক্ষিণাং দিব্যাং মুণ্ডমালাবিভূষিতাঁ॥',
    meaning: 'যিনি করালবদনা, আলুলায়িতকেশী, চতুর্ভুজা, দিব্যভাবময়ী এবং নরমুণ্ডমালাভূষিতা—সেই মা দক্ষিণাকালিকাকে প্রণাম।'
  },
  {
    id: 3,
    titleBn: 'জয়ন্তী মঙ্গলা কালী স্তোত্র',
    titleEn: 'Jayanti Mangala Kali Stotram',
    sanskrit: 'জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী।\nদুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥',
    bengali: 'জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী।\nদুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥',
    meaning: 'যিনি সর্বশ্রেষ্ঠা জয়ন্তী, পরম কল্যাণদায়িনী মঙ্গলা, কালী, ভদ্রকালী, কপালিনী, দুর্গা, শিবা, ক্ষমা ও ধাত্রী—সেই পরমাপ্রকৃতিকে প্রণাম।'
  },
  {
    id: 4,
    titleBn: 'মহাপূজা আরতি দীপ বন্দনা',
    titleEn: 'Aarti Deepa Vandana',
    sanskrit: 'দীপেন ত্বাং সমারাধ্যে দেবি বিশ্বেশ্বরী প্রিয়ে।\nতমসং নাশয় ত্বং মে জ্ঞানদীপং প্রদীপয়॥',
    bengali: 'দীপেন ত্বাং সমারাধ্যে দেবি বিশ্বেশ্বরী প্রিয়ে।\nতমসং নাশয় ত্বং মে জ্ঞানদীপং প্রদীপয়॥',
    meaning: 'হে মা বিশ্বেশ্বরী, এই কর্পূর ও প্রদীপের স্নিগ্ধ শিখায় তোমার পবিত্র আরতি করি। আমার অন্তরের অন্ধকার নাশ করে জ্ঞানের দীপ জ্বালিয়ে দাও।'
  },
  {
    id: 5,
    titleBn: 'শ্রীরামপ্রসাদী ভক্তিগীতি',
    titleEn: 'Ramprasadi Devotional Song',
    sanskrit: 'মা তোর কতই রঙ্গ দেখি গো সংসারে।\nযারে রাখো তারে মারো, যারে মারো তারে রাখো গো তারে॥',
    bengali: 'মন রে কৃষিকাজ জানো না!\nএমন মানব-জমিন রইলো পতিত, আবাদ করলে ফলত সোনা।\nকালী নামের দাও রে বেড়া, ফসলে তছরুপ হবে না...',
    meaning: 'মায়ের শ্রীচরণে আত্মসমর্পণ করলেই মানবজীবন সার্থক হয়; ভক্তিরূপ বেড়ায় রক্ষা পায় ভক্তের চিত্তরূপ ক্ষেত্র।'
  }
];

export function getNextStanzaIndex(currentIndex: number, totalCount: number): number {
  if (totalCount <= 0) return 0;
  return (currentIndex + 1) % totalCount;
}

export function getPrevStanzaIndex(currentIndex: number, totalCount: number): number {
  if (totalCount <= 0) return 0;
  return (currentIndex - 1 + totalCount) % totalCount;
}

/**
 * Converts Western digits to traditional Bengali numerals.
 */
export function formatBengaliNumber(num: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num)
    .split('')
    .map(ch => {
      const digit = parseInt(ch, 10);
      return !isNaN(digit) ? bengaliDigits[digit] : ch;
    })
    .join('');
}

/**
 * Calculates diya illumination statistics and auspicious devotional messages.
 */
export function calculateDiyaIllumination(litCount: number, totalCount: number): IlluminationState {
  const safeTotal = Math.max(1, totalCount);
  const clampedLit = Math.min(Math.max(0, litCount), safeTotal);
  const percentage = Math.round((clampedLit / safeTotal) * 100);
  const isAllLit = clampedLit === safeTotal;

  let message = 'একটি প্রদীপ জ্বালান, অন্ধকারকে দূরে সরান।';
  if (clampedLit === 0) {
    message = 'প্রদীপের উপর স্পর্শ করে আলোর উৎসব শুরু করুন।';
  } else if (clampedLit > 0 && clampedLit < safeTotal / 2) {
    message = 'আলোর প্রদীপ জ্বলছে, শুভ শক্তির আগমন ঘটছে।';
  } else if (clampedLit >= safeTotal / 2 && clampedLit < safeTotal) {
    message = 'চতুর্দিক আলোয় ভরে উঠছে, আনন্দ ও শান্তির সূচনা।';
  } else if (isAllLit) {
    message = 'সমস্ত প্রদীপ প্রজ্জ্বলিত! মা কালীর আশীর্বাদে দূর হোক সমস্ত অন্ধকার।';
  }

  return {
    litCount: clampedLit,
    totalCount: safeTotal,
    percentage,
    isAllLit,
    message,
  };
}

/**
 * Builds a shareable URL with personalized sender and receiver names.
 */
export function generateWishUrl(sender: string, receiver: string, customNote = '', baseUrl = ''): string {
  const params = new URLSearchParams();
  if (sender.trim()) params.set('from', sender.trim());
  if (receiver.trim()) params.set('to', receiver.trim());
  if (customNote.trim()) params.set('note', customNote.trim());

  const queryString = params.toString();
  if (!queryString) return baseUrl || '/';
  
  if (baseUrl) {
    return `${baseUrl.split('?')[0]}?${queryString}`;
  }
  return `?${queryString}`;
}

/**
 * Parses query parameters from window.location.search or string.
 */
export function parseWishParams(searchQuery: string): WishData {
  const query = searchQuery.startsWith('?') ? searchQuery.slice(1) : searchQuery;
  const params = new URLSearchParams(query);
  
  const sender = params.get('from')?.trim() || '';
  const receiver = params.get('to')?.trim() || '';
  const note = params.get('note')?.trim() || '';

  return {
    sender,
    receiver,
    note,
  };
}

/**
 * Generates ready-to-share festive WhatsApp or social text message.
 */
export function createShareText(sender: string, receiver: string, url: string): string {
  const toPart = receiver ? `প্রিয় ${receiver},\n\n` : '';
  const fromPart = sender ? `\n— আন্তরিক শুভকামনায়, ${sender}` : '';
  
  return (
    `🪔 শুভ দীপাবলি ও শুভ শ্যামাপূজা! 🌺\n\n` +
    `${toPart}` +
    `দীপের আলোয় দীপাবলি, ভক্তের আলোয় মা কালী।\n` +
    `আলোর এই পবিত্র উৎসবে তোমার জীবন ভরে উঠুক সুখ, শান্তি ও অনাবিল আনন্দে।\n` +
    `${fromPart}\n\n` +
    `✨ তোমার জন্য বিশেষ উৎসবের প্রদীপ ও আশীর্বাদ গ্রহণ করো:\n${url}`
  );
}
