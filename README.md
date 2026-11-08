# শুভ দীপাবলি ও শ্যামাপূজা (Shubho Deepavali – The Magic of Bengali Kali Puja)

A premium, culturally authentic, interactive, and cinematic celebration website for Bengali Kali Puja and Deepavali.

![Shubho Deepavali Banner](/images/hero_kali_puja_night_1794077528662.jpg)

## 🌟 Features & Highlights

- **Cinematic Midnight Hero Experience:**
  - Parallax depth with Bengali Kali Puja pandal and midnight starry sky.
  - Golden light-reveal headline animation: `"আলোর উৎসবে, শক্তির আরাধনায়"`.
  - Realistic glowing foreground earthen diyas.
  - Gentle drifting golden particles, red hibiscus petals, and distant night fireworks.

- **Maa Kali Devotional Sanctum (Spiritual Centerpiece):**
  - Traditional Bengali Shyama Kali representation with crimson and midnight-blue sacred lighting.
  - Interactive prayer offering with floating hibiscus petals, sacred illumination, and temple bell chime.
  - Synchronized Aarti reader with sacred mantras (Chandi Pranama, Dhyana Mantra, Jayanti Mangala Kali).
  - Sacred conch shell (শঙ্খধ্বনি) and brass temple bell Web Audio synthesis.

- **Advanced 3-State Virtual Diya System:**
  - 3 visual states: **Unlit** (matte terracotta), **Lighting** (ignition spark), and **Lit** (realistic flame flicker with cyan core).
  - Live Bengali numeral counter: `"আলোর প্রদীপ: [COUNT] / [TOTAL]"`.
  - Dynamic ambient lighting progression that illuminates the section as more diyas are lit.
  - Special celebratory achievement upon lighting all 8 diyas: *"আলোর উৎসবে তোমার অবদান অসাধারণ!"*.

- **Bengali Cultural Heritage Showcase:**
  - 6 authentic cultural dimensions: Kali Puja, Folk Alpana, Sacred Red Hibiscus, Dhunuchi Dance, Deepavali Diyas, and Fireworks.
  - Editorial cards with cultural lore modals.

- **Interactive Festive Surprise Gift (Envelope):**
  - Smooth 3D royal golden envelope with traditional wax seal.
  - Illuminated Bengali patterns, glowing card emergence, and floating festive petals.
  - *"Spread Happiness ❤️"* button with Web Share API and clipboard copy.

- **Bespoke Festive Wish & Card Generator:**
  - Personalized cards with sender and recipient names.
  - 4 greeting styles: *Traditional Bengali*, *Spiritual & Devotional*, *Warm & Emotional*, and *Modern & Friendly*.
  - Live card preview with ornate golden borders and Diya artwork.
  - Direct high-resolution PNG card download rendered client-side on Canvas (zero API key required).
  - WhatsApp and shareable link generator with URL parameter pre-filling.

- **Full Bilingual Support (বাংলা | English):**
  - Seamless language switcher in the navbar.
  - Centralized translation dictionary.
  - Preserves user language in `localStorage` and URL parameters.
  - Beautiful typography: *Noto Serif Bengali*, *Hind Siliguri*, and *Cinzel*.

- **Curated Festive Photo Gallery:**
  - 5 categories: *All*, *Kali Puja*, *Diwali*, *Bengali Traditions*, *Festive Night*.
  - Full-screen lightbox modal with Previous/Next buttons, keyboard arrow controls, Escape key, and touch swipe.

- **Synthesized Ambient Audio Engine:**
  - Real-time Indian Classical Tanpura drone ambient synthesizer.
  - Temple bell, Shankha (conch), and Diya ignition sound effects.
  - Volume slider and mute toggle. Never autoplays without user interaction.

---

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Run Typecheck & Build:**
   ```bash
   npm run lint
   npm run build
   ```

4. **Run Unit Tests:**
   ```bash
   npx tsx --test src/utils/festiveLogic.test.ts
   ```

---

## ⚡ Deployment to Vercel

This project is configured and fully production-ready for deployment on **Vercel**:

1. Push this repository to GitHub or GitLab.
2. In the Vercel dashboard, click **"Add New Project"** and select this repository.
3. Vercel will automatically detect Vite using the pre-configured `vercel.json`:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your festive website will be live in seconds!
