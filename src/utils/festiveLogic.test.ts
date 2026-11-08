import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBengaliNumber,
  calculateDiyaIllumination,
  generateWishUrl,
  parseWishParams,
  createShareText,
  AARTI_STOTRAMS,
  getNextStanzaIndex,
  getPrevStanzaIndex
} from './festiveLogic';

test('formatBengaliNumber converts English digits to Bengali numerals accurately', () => {
  assert.equal(formatBengaliNumber(0), '০');
  assert.equal(formatBengaliNumber(12345), '১২৩৪৫');
  assert.equal(formatBengaliNumber(67890), '৬৭৮৯০');
});

test('calculateDiyaIllumination calculates correct illumination percentages and states', () => {
  const zeroState = calculateDiyaIllumination(0, 8);
  assert.equal(zeroState.litCount, 0);
  assert.equal(zeroState.percentage, 0);
  assert.equal(zeroState.isAllLit, false);
  assert.match(zeroState.message, /প্রদীপের উপর স্পর্শ করে/);

  const halfState = calculateDiyaIllumination(4, 8);
  assert.equal(halfState.percentage, 50);
  assert.equal(halfState.isAllLit, false);

  const fullState = calculateDiyaIllumination(8, 8);
  assert.equal(fullState.litCount, 8);
  assert.equal(fullState.percentage, 100);
  assert.equal(fullState.isAllLit, true);
  assert.match(fullState.message, /সমস্ত প্রদীপ প্রজ্জ্বলিত/);

  // Clamping test
  const overflowState = calculateDiyaIllumination(12, 8);
  assert.equal(overflowState.litCount, 8);
  assert.equal(overflowState.percentage, 100);
});

test('generateWishUrl and parseWishParams roundtrip properly', () => {
  const sender = 'রাহুল';
  const receiver = 'অনন্যা';
  const note = 'আনন্দে কাটুক উৎসব';
  const url = generateWishUrl(sender, receiver, note, 'https://example.com');

  assert.ok(url.includes('from=%E0%A6%B0%E0%A6%BE%E0%A6%B9%E0%A7%81%E0%A6%B2'));
  assert.ok(url.includes('to=%E0%A6%85%E0%A6%A8%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE'));

  const parsed = parseWishParams(url.split('?')[1]);
  assert.equal(parsed.sender, sender);
  assert.equal(parsed.receiver, receiver);
  assert.equal(parsed.note, note);
});

test('createShareText formats respectful festive message', () => {
  const share = createShareText('শুভ্র', 'প্রিয়া', 'https://example.com?from=test');
  assert.ok(share.includes('প্রিয় প্রিয়া'));
  assert.ok(share.includes('মা কালী'));
  assert.ok(share.includes('শুভ্র'));
  assert.ok(share.includes('https://example.com?from=test'));
});

test('Aarti stotrams list and index cyclers operate cyclically and accurately', () => {
  assert.ok(AARTI_STOTRAMS.length >= 5);
  assert.ok(AARTI_STOTRAMS[0].titleBn.includes('চণ্ডী'));
  assert.equal(getNextStanzaIndex(0, AARTI_STOTRAMS.length), 1);
  assert.equal(getNextStanzaIndex(AARTI_STOTRAMS.length - 1, AARTI_STOTRAMS.length), 0);
  assert.equal(getPrevStanzaIndex(0, AARTI_STOTRAMS.length), AARTI_STOTRAMS.length - 1);
  assert.equal(getPrevStanzaIndex(2, AARTI_STOTRAMS.length), 1);
});

test('translations dictionary contains all required keys for bn and en', async () => {
  const { translations } = await import('./translations');
  assert.ok(translations.bn);
  assert.ok(translations.en);
  assert.equal(translations.bn.hero.headlinePart1, 'আলোর উৎসবে,');
  assert.equal(translations.en.hero.headlinePart1, 'In the Festival of Lights,');
  assert.ok(translations.bn.diya.diyas.length === 8);
  assert.ok(translations.en.diya.diyas.length === 8);
  assert.ok(translations.bn.heritage.items.length === 6);
  assert.ok(translations.en.heritage.items.length === 6);
});
