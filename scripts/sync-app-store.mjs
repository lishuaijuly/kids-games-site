import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const catalogPath = join(root, 'assets/games.json');
const write = process.argv.includes('--write');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function download(url, path) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  writeFileSync(path, Buffer.from(await response.arrayBuffer()));
}

for (const game of catalog) {
  if (!game.app_store?.id) continue;
  const country = game.app_store.country ?? 'us';
  const lookup = await getJson(`https://itunes.apple.com/lookup?id=${encodeURIComponent(game.app_store.id)}&country=${encodeURIComponent(country)}`);
  const app = lookup.results?.[0];
  if (!app) throw new Error(`APP_STORE_NOT_FOUND: ${game.id}`);

  const screenshots = [...(app.screenshotUrls ?? []), ...(app.ipadScreenshotUrls ?? [])].slice(0, 4);
  const slug = game.id;
  game.app_store_url = String(app.trackViewUrl).replace(/\?uo=4$/, '');
  game.artwork ??= {};
  game.artwork.icon ??= `assets/${slug}-app-icon.jpg`;
  game.artwork.screenshots = screenshots.map((_, index) => `assets/${slug}-screenshot-${String(index + 1).padStart(2, '0')}.jpg`);
  game.app_store.last_synced = new Date().toISOString();
  game.app_store.store_name_en = app.trackName;
  console.log(`${game.id}: ${app.trackName} (${screenshots.length} screenshots)`);
  if (!write) continue;
  mkdirSync(join(root, 'assets'), { recursive: true });
  await download(app.artworkUrl512, join(root, game.artwork.icon));
  await Promise.all(screenshots.map((url, index) => download(url, join(root, game.artwork.screenshots[index]))));
}

if (write) {
  writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log('APP_STORE_SYNC_WRITTEN');
} else {
  console.log('APP_STORE_SYNC_DRY_RUN (use --write to update assets and catalog)');
}
