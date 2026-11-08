/**
 * High-resolution client-side canvas card generator.
 * Draws a luxurious Bengali festive greeting card and triggers a crisp PNG download.
 * Requires NO external API keys or network requests.
 */

export interface CardRenderOptions {
  sender: string;
  receiver: string;
  language: 'bn' | 'en';
  style: 'traditional' | 'devotional' | 'emotional' | 'modern';
  customMessage?: string;
}

const STYLE_MESSAGES = {
  bn: {
    traditional: 'শুভ দীপাবলি ও শ্যামাপূজার আন্তরিক প্রীতি ও শুভেচ্ছা। মাটির প্রদীপের স্নিগ্ধ আলোয় আপনার ঘর ও মন ভরে উঠুক সুখ, শান্তি ও সৌহার্দ্যে।',
    devotional: 'মা কালীর দিব্য চরণে প্রণাম। মায়ের আশীর্বাদে আপনার জীবনের সকল বাধা ও অশুভ শক্তি দূর হোক, অন্তরে বিরাজ করুক চিরন্তন শক্তি ও আলো। জয় মা কালী!',
    emotional: 'আলোর এই পবিত্র উৎসবে তোমার জীবনের প্রতিটি দিন আনন্দ ও ভালোবাসায় ভরে উঠুক। শত মাইল দূর থেকেও তোমার জন্য রইল হৃদয়ের গভীরতম স্নেহ ও শুভেচ্ছা।',
    modern: 'দীপাবলির অফুরন্ত আনন্দ, মিষ্টিমুখ আর আলোকোজ্জ্বল মুহূর্তগুলো তোমার সাথে থাকুক সারা বছর! হ্যাপি দিওয়ালি ও শুভ কালীপূজা!',
  },
  en: {
    traditional: 'Warm greetings on the auspicious occasion of Shubho Deepavali & Kali Puja. May the glow of holy diyas bring prosperity, joy, and peace to your family.',
    devotional: 'Humble salutations at the sacred lotus feet of Maa Kali. May the Divine Mother dispel all fears and illuminate your spiritual path with divine grace. Jai Maa Kali!',
    emotional: 'On this sacred festival of lights, sending you my warmest love and heartfelt prayers. May our bond continue to shine as bright as a golden diya.',
    modern: 'Sparklers, sweets, and shining smiles! Wishing you an unforgettable Diwali and a blessed Kali Puja filled with joy, happiness, and celebrations!',
  },
};

export async function downloadFestiveCard(options: CardRenderOptions) {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 750;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Midnight & Royal Purple Velvet Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#08070D');
  bgGrad.addColorStop(0.35, '#10162D');
  bgGrad.addColorStop(0.7, '#32134F');
  bgGrad.addColorStop(1, '#1A040A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Central Warm Diya Glow Radial Gradient
  const radialGlow = ctx.createRadialGradient(width / 2, height / 2 - 40, 20, width / 2, height / 2 - 40, 480);
  radialGlow.addColorStop(0, 'rgba(255, 196, 107, 0.22)');
  radialGlow.addColorStop(0.5, 'rgba(142, 23, 41, 0.15)');
  radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. Ornate Golden Outer and Inner Borders
  ctx.strokeStyle = '#D4AF69';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = '#FF9D38';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Corner Alpana Motifs
  const drawCornerMotif = (cx: number, cy: number, flipX: number, flipY: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(flipX, flipY);
    ctx.strokeStyle = '#D4AF69';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI / 2);
    ctx.stroke();

    ctx.fillStyle = '#FFC46B';
    ctx.beginPath();
    ctx.arc(18, 18, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCornerMotif(42, 42, 1, 1);
  drawCornerMotif(width - 42, 42, -1, 1);
  drawCornerMotif(42, height - 42, 1, -1);
  drawCornerMotif(width - 42, height - 42, -1, -1);

  // 4. Sacred Diya Illustration at Top
  const diyaX = width / 2;
  const diyaY = 135;

  // Flame Glow
  const flameGlow = ctx.createRadialGradient(diyaX, diyaY - 20, 5, diyaX, diyaY - 20, 60);
  flameGlow.addColorStop(0, 'rgba(255, 220, 120, 0.9)');
  flameGlow.addColorStop(0.5, 'rgba(255, 157, 56, 0.6)');
  flameGlow.addColorStop(1, 'rgba(255, 69, 0, 0)');
  ctx.fillStyle = flameGlow;
  ctx.beginPath();
  ctx.arc(diyaX, diyaY - 20, 60, 0, Math.PI * 2);
  ctx.fill();

  // Flame Body
  const flameGrad = ctx.createLinearGradient(diyaX, diyaY + 5, diyaX, diyaY - 45);
  flameGrad.addColorStop(0, '#FF4500');
  flameGrad.addColorStop(0.5, '#FFA500');
  flameGrad.addColorStop(1, '#FFFACD');
  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.moveTo(diyaX, diyaY + 5);
  ctx.bezierCurveTo(diyaX - 18, diyaY - 10, diyaX - 14, diyaY - 32, diyaX, diyaY - 45);
  ctx.bezierCurveTo(diyaX + 14, diyaY - 32, diyaX + 18, diyaY - 10, diyaX, diyaY + 5);
  ctx.fill();

  // Inner Flame Core
  ctx.fillStyle = '#67E8F9';
  ctx.beginPath();
  ctx.ellipse(diyaX, diyaY - 6, 4, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Diya Bowl
  const bowlGrad = ctx.createLinearGradient(diyaX, diyaY, diyaX, diyaY + 30);
  bowlGrad.addColorStop(0, '#D4AF69');
  bowlGrad.addColorStop(0.6, '#8E1729');
  bowlGrad.addColorStop(1, '#4A0E17');
  ctx.fillStyle = bowlGrad;
  ctx.beginPath();
  ctx.ellipse(diyaX, diyaY + 12, 45, 18, 0, 0, Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#FFC46B';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 5. Main Heading Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFF1C5';
  ctx.font = 'bold 44px "Noto Serif Bengali", serif';
  const headingText =
    options.language === 'bn'
      ? 'শুভ দীপাবলি ও শুভ শ্যামাপূজা'
      : 'Shubho Deepavali & Kali Puja';
  ctx.fillText(headingText, width / 2, 230);

  // Ornamental Golden Underline Divider
  const divWidth = 240;
  ctx.strokeStyle = '#D4AF69';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - divWidth / 2, 252);
  ctx.lineTo(width / 2 + divWidth / 2, 252);
  ctx.stroke();

  ctx.fillStyle = '#FF9D38';
  ctx.font = '16px serif';
  ctx.fillText('✦ ✦ ✦', width / 2, 257);

  // 6. Recipient Greeting
  const receiverName = options.receiver.trim() || (options.language === 'bn' ? 'প্রিয়জন' : 'Dear Friend');
  ctx.fillStyle = '#FFC46B';
  ctx.font = 'bold 30px "Hind Siliguri", "Noto Serif Bengali", sans-serif';
  const toText = options.language === 'bn' ? `স্নেহের ${receiverName},` : `Wishing Dearest ${receiverName},`;
  ctx.fillText(toText, width / 2, 315);

  // 7. Message Body Text
  const messageBody =
    options.customMessage?.trim() ||
    STYLE_MESSAGES[options.language][options.style] ||
    STYLE_MESSAGES.bn.traditional;

  ctx.fillStyle = '#F1F5F9';
  ctx.font = '22px "Hind Siliguri", "Plus Jakarta Sans", sans-serif';

  // Text Wrapping
  const maxTextWidth = 900;
  const words = messageBody.split(' ');
  let line = '';
  const lines: string[] = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxTextWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  let startY = 380;
  const lineHeight = 38;
  for (let l = 0; l < lines.length; l++) {
    ctx.fillText(lines[l].trim(), width / 2, startY + l * lineHeight);
  }

  // 8. Sender Line
  const senderName = options.sender.trim() || (options.language === 'bn' ? 'শুভাকাঙ্ক্ষী' : 'Your Well-wisher');
  const fromY = height - 140;
  ctx.fillStyle = '#D4AF69';
  ctx.font = 'italic bold 24px "Hind Siliguri", "Cinzel", serif';
  const fromText =
    options.language === 'bn'
      ? `— সস্নেহ শুভেচ্ছান্তে, ${senderName}`
      : `— With Warmest Regards, ${senderName}`;
  ctx.fillText(fromText, width / 2, fromY);

  // 9. Auspicious Blessing Tagline at the bottom
  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px "Cinzel", sans-serif';
  ctx.fillText('SHUBHO DEEPAVALI · FESTIVAL OF LIGHTS · KALI PUJA BLESSINGS', width / 2, height - 70);

  // 10. Trigger client-side direct PNG download
  const imageUri = canvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.download = `Shubho_Deepavali_Greeting_${receiverName.replace(/\s+/g, '_')}.png`;
  downloadLink.href = imageUri;
  downloadLink.click();
}

