import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const appId = process.argv.find(value => /^\d{6,}$/.test(value));
const countryIndex = process.argv.indexOf('--country');
const country = countryIndex >= 0 ? process.argv[countryIndex + 1] : 'us';
const root = new URL('..', import.meta.url).pathname;
const catalogPath = join(root, 'assets/games.json');
if (!appId) throw new Error('Usage: node scripts/add-app-store-game.mjs <App Store ID> [--country us]');

const response = await fetch(`https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}&country=${encodeURIComponent(country)}`);
if (!response.ok) throw new Error(`APP_STORE_LOOKUP_FAILED: ${response.status}`);
const app = (await response.json()).results?.[0];
if (!app) throw new Error(`APP_STORE_NOT_FOUND: ${appId} (${country})`);

const slug = String(app.bundleId ?? app.trackName).split('.').pop().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
if (catalog.some(game => game.app_store?.id === appId || game.id === slug)) throw new Error(`APP_STORE_GAME_EXISTS: ${appId}`);

catalog.push({
  id: slug, status: 'released', age: '6–8',
  app_store: { id: appId, country, store_name_en: app.trackName, store_description_en: app.description },
  artwork: { icon: `assets/${slug}-app-icon.jpg`, screenshots: [] },
  app_store_url: String(app.trackViewUrl).replace(/\?uo=4$/, ''),
  title: { en: app.trackName }, summary: { en: String(app.description ?? '').split(/\n\s*\n/)[0].trim() }, features: { en: [] }, support_url: 'support.html'
});
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`APP_STORE_GAME_ADDED: ${slug}; run node scripts/sync-app-store.mjs --write`);
