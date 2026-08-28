import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const locales = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'es', 'de', 'fr', 'ko', 'pt-BR', 'it', 'pl', 'ru', 'ar'];
const legacy = { 'zh-Hans': 'zh', ja: 'ja', es: 'es', en: 'en' };
const translations = JSON.parse(readFileSync(join(root, 'assets/translations.json'), 'utf8'));
const games = JSON.parse(readFileSync(join(root, 'assets/games.json'), 'utf8'));
const htmlFiles = readdirSync(root).filter(name => name.endsWith('.html'));
const english = new Set();

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), 'utf8');
  for (const match of html.matchAll(/data-en="([^"]*)"/g)) english.add(match[1]);
}

const missing = [];
const fixedInventoryWords = /\bone[\s-]+hundred\b|\bcien(?:to)?\b|(?:ein)?hundert|cento|\bcent\b|\bcem\b|\bsto\b|\bсто\b|(?:百|백|مائة|مئة)/i;

function hasFixedInventoryTotal(value) {
  const normalizedDigits = value.replace(/[０-９٠-٩۰-۹]/g, digit => {
    const code = digit.codePointAt(0);
    if (code >= 0xFF10 && code <= 0xFF19) return String(code - 0xFF10);
    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);
    return String(code - 0x06F0);
  });
  // Small numbers may truthfully describe a mechanic (for example 2 turns or
  // a 3×3 board). Larger inventory counts are release data, not durable copy.
  const hasLargeNumber = [...normalizedDigits.matchAll(/\d+/g)].some(match => Number(match[0]) >= 21);
  return hasLargeNumber || fixedInventoryWords.test(value);
}
for (const [source, values] of Object.entries(translations)) {
  if (values.ar?.includes('。')) missing.push(`ar punctuation: ${source}`);
}
for (const source of english) {
  for (const locale of locales) {
    if (legacy[locale]) continue;
    if (!translations[source]?.[locale]) missing.push(`${locale}: ${source}`);
  }
}

for (const game of games) {
  if (game.age !== '6–8' || JSON.stringify(game.locales) !== JSON.stringify(locales)) missing.push(`${game.id}.product-defaults`);
  if (Object.values(game.privacy ?? {}).some(value => value !== 'none') || Object.keys(game.privacy ?? {}).length !== 4) missing.push(`${game.id}.privacy-defaults`);
  for (const field of ['title', 'summary', 'features']) {
    for (const locale of locales) {
      const key = locale === 'zh-Hans' ? 'zh' : locale;
      if (!game[field]?.[key]) missing.push(`${game.id}.${field}.${key}`);
    }
  }
  const publicDiscoveryCopy = {
    summary: game.summary,
    features: game.features
  };
  if (hasFixedInventoryTotal(JSON.stringify(publicDiscoveryCopy))) {
    missing.push(`${game.id}.public-copy-fixed-level-total`);
  }
  if (!game.artwork?.icon || !existsSync(join(root, game.artwork.icon))) missing.push(`${game.id}.artwork.icon`);
  for (const screenshot of game.artwork?.screenshots ?? []) {
    if (!existsSync(join(root, screenshot))) missing.push(`${game.id}.artwork.screenshots: ${screenshot}`);
  }
}

if (missing.length) {
  console.error(`LOCALIZATION_MISSING (${missing.length})`);
  console.error(missing.join('\n'));
  process.exit(1);
}
console.log(`LOCALIZATION_PASS: ${english.size} static strings × ${locales.length} locales; ${games.length} game records`);
