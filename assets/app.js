const LANGS = ['en','zh-Hans','zh-Hant','ja','es','de','fr','ko','pt-BR','it','pl','ru','ar'];
const LOCALES = {
  en: { name: 'English', htmlLang: 'en', direction: 'ltr', dataKey: 'en' },
  'zh-Hans': { name: '简体中文', htmlLang: 'zh-Hans', direction: 'ltr', dataKey: 'zh' },
  'zh-Hant': { name: '繁體中文', htmlLang: 'zh-Hant', direction: 'ltr' },
  ja: { name: '日本語', htmlLang: 'ja', direction: 'ltr', dataKey: 'ja' },
  es: { name: 'Español', htmlLang: 'es', direction: 'ltr', dataKey: 'es' },
  de: { name: 'Deutsch', htmlLang: 'de', direction: 'ltr' },
  fr: { name: 'Français', htmlLang: 'fr', direction: 'ltr' },
  ko: { name: '한국어', htmlLang: 'ko', direction: 'ltr' },
  'pt-BR': { name: 'Português (Brasil)', htmlLang: 'pt-BR', direction: 'ltr' },
  it: { name: 'Italiano', htmlLang: 'it', direction: 'ltr' },
  pl: { name: 'Polski', htmlLang: 'pl', direction: 'ltr' },
  ru: { name: 'Русский', htmlLang: 'ru', direction: 'ltr' },
  ar: { name: 'العربية', htmlLang: 'ar', direction: 'rtl' }
};
const supportEmail = 'animalgames.kids@outlook.com';
let translations = {};

function detectLanguage() {
  const saved = localStorage.getItem('siteLang');
  if (LANGS.includes(saved)) return saved;
  const preferred = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'en'];
  for (const raw of preferred) {
    const lang = String(raw).toLowerCase();
    if (lang.startsWith('zh-hant') || lang.startsWith('zh-tw') || lang.startsWith('zh-hk')) return 'zh-Hant';
    if (lang.startsWith('zh')) return 'zh-Hans';
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('ko')) return 'ko';
    if (lang.startsWith('pt')) return 'pt-BR';
    if (lang.startsWith('it')) return 'it';
    if (lang.startsWith('pl')) return 'pl';
    if (lang.startsWith('ru')) return 'ru';
    if (lang.startsWith('ar')) return 'ar';
  }
  return 'en';
}

const state = { lang: detectLanguage() };

const pageMeta = {
  home: {
    zh: ['CuriousKite｜儿童游戏与家长支持','CuriousKite：为 6–8 岁儿童设计的无广告、无社交、无排行榜、低干扰益智游戏，以及面向家长和监护人的支持与隐私信息。'],
    en: ['CuriousKite | Kids Games & Parent Support','CuriousKite makes low-distraction puzzle games for ages 6–8, with clear support and privacy information for parents and guardians.'],
    ja: ['CuriousKite｜子ども向けゲームと保護者サポート','CuriousKite は6〜8歳向けの落ち着いて遊べるパズルゲームと、保護者向けのサポート・プライバシー情報を提供します。'],
    es: ['CuriousKite | Juegos infantiles y soporte para familias','CuriousKite crea juegos de lógica con pocas distracciones para niños de 6 a 8 años, con información clara de soporte y privacidad para familias.']
  },
  game: {
    zh: ['游戏详情｜CuriousKite','CuriousKite 游戏详情、产品特点和支持入口。'],
    en: ['Game Details | CuriousKite','Game details, product features, and support access for CuriousKite.'],
    ja: ['ゲーム詳細｜CuriousKite','CuriousKite のゲーム詳細、主な特徴、サポート情報。'],
    es: ['Detalles del juego | CuriousKite','Detalles, características y soporte de los juegos CuriousKite.']
  },
  support: {
    zh: ['技术支持中心｜CuriousKite','CuriousKite 技术支持：恢复购买、购买未解锁、设备兼容、故障排查和联系支持。'],
    en: ['Support Center | CuriousKite','CuriousKite support for purchase restoration, device compatibility, troubleshooting, and direct contact.'],
    ja: ['サポートセンター｜CuriousKite','CuriousKite の購入復元、対応端末、トラブルシューティング、お問い合わせ情報。'],
    es: ['Centro de soporte | CuriousKite','Soporte de CuriousKite para restaurar compras, compatibilidad, solución de problemas y contacto.']
  },
  privacy: {
    zh: ['隐私政策｜CuriousKite','CuriousKite 网站与儿童游戏产品的隐私政策和数据处理原则。'],
    en: ['Privacy Policy | CuriousKite','Privacy policy and data-handling principles for the CuriousKite website and children’s games.'],
    ja: ['プライバシーポリシー｜CuriousKite','CuriousKite のウェブサイトと子ども向けゲームに関するプライバシー方針。'],
    es: ['Política de privacidad | CuriousKite','Política de privacidad y principios de tratamiento de datos del sitio y los juegos CuriousKite.']
  },
  '404': {
    zh: ['页面没有找到｜CuriousKite','页面没有找到。'],
    en: ['Page Not Found | CuriousKite','The requested page could not be found.'],
    ja: ['ページが見つかりません｜CuriousKite','指定されたページが見つかりませんでした。'],
    es: ['Página no encontrada | CuriousKite','No se pudo encontrar la página solicitada.']
  }
};

function t(zh,en,ja,es){
  const legacyKey = LOCALES[state.lang]?.dataKey;
  if (legacyKey === 'zh') return zh;
  if (legacyKey === 'ja') return ja;
  if (legacyKey === 'es') return es;
  return translate(en);
}
function translate(english){
  return translations[english]?.[state.lang] ?? english;
}
function gv(g, field){
  const localeKey = LOCALES[state.lang]?.dataKey ?? state.lang;
  const flatValue = g[`${field}_${localeKey}`] ?? g[`${field}_en`] ?? g[`${field}_zh`];
  if (flatValue != null) return flatValue;

  const value = g[field];
  if (value && typeof value === 'object') {
    return value[localeKey] ?? value[state.lang] ?? value.en ?? value.zh;
  }
  return value;
}

function gameIcon(g){
  const src = g.artwork?.icon ?? g.icon_url;
  return src
    ? `<img class="game-artwork" src="${src}" alt=""/>`
    : g.icon ?? '🧩';
}

function applyStaticText(){
  document.querySelectorAll('[data-zh]').forEach(el => {
    const legacyKey = LOCALES[state.lang]?.dataKey;
    const value = legacyKey ? el.dataset[legacyKey] : translate(el.dataset.en);
    if (value != null) el.textContent = value;
  });
  document.querySelectorAll('[data-support-mail]').forEach(el => {
    el.textContent = supportEmail;
    if (el.tagName === 'A') el.href = `mailto:${supportEmail}`;
  });
  const select = document.getElementById('langSelect');
  if (select) {
    select.innerHTML = LANGS.map(code => `<option value="${code}">${LOCALES[code].name}</option>`).join('');
    select.value = state.lang;
  }
  document.documentElement.lang = LOCALES[state.lang].htmlLang;
  document.documentElement.dir = LOCALES[state.lang].direction;

  const page = document.body?.dataset.page;
  const meta = pageMeta[page]?.[LOCALES[state.lang]?.dataKey] ?? pageMeta[page]?.en;
  if (meta){
    const text = LOCALES[state.lang]?.dataKey ? meta[0] : translate(meta[0]);
    const description = LOCALES[state.lang]?.dataKey ? meta[1] : translate(meta[1]);
    document.title = text;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description);
  }
}

async function loadTranslations(){
  const res = await fetch('assets/translations.json', {cache:'no-store'});
  if (!res.ok) throw new Error(`translations.json ${res.status}`);
  translations = await res.json();
}

async function loadGames(){
  const res = await fetch('assets/games.json', {cache:'no-store'});
  if (!res.ok) throw new Error(`games.json ${res.status}`);
  return res.json();
}

function card(g){
  const fs = (gv(g,'features') || []).slice(0,2);
  return `<a class="game-card" href="game.html?id=${encodeURIComponent(g.id)}">
    <div class="game-card-art" aria-hidden="true">${gameIcon(g)}</div>
    <div class="game-card-content">
      <div class="game-top">
        <span class="badge badge-${g.status}">${gv(g,'status')}</span>
        <span class="age-chip">${t('适合年龄','Ages','対象年齢','Edades')} ${g.age}</span>
      </div>
      <h3>${gv(g,'title')}</h3>
      <p>${gv(g,'summary')}</p>
      <div class="chips">${fs.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
      <div class="game-foot"><span class="details">${t('查看详情','Details','詳細を見る','Detalles')} →</span></div>
    </div>
  </a>`;
}

async function renderHome(){
  const el = document.getElementById('gamesList');
  if (!el) return;
  try{
    const gs = await loadGames();
    if (!gs.length){
      el.innerHTML = `<div class="notice">${t(
        'CuriousKite 的正式发布游戏会在这里出现。',
        'Released CuriousKite games will appear here.',
        'CuriousKite の正式リリース済みゲームはこちらに掲載されます。',
        'Los juegos de CuriousKite publicados oficialmente aparecerán aquí.'
      )}</div>`;
      return;
    }
    el.innerHTML = gs.map(card).join('');
  }catch{
    el.innerHTML = `<div class="notice">${t(
      '游戏信息暂时无法加载，请刷新页面。',
      'Game information is temporarily unavailable. Please refresh.',
      'ゲーム情報を読み込めませんでした。ページを再読み込みしてください。',
      'La información de los juegos no está disponible temporalmente. Actualiza la página.'
    )}</div>`;
  }
}

async function renderGame(){
  const el = document.getElementById('gameDetail');
  if (!el) return;
  try{
    const id = new URLSearchParams(location.search).get('id');
    const gs = await loadGames();
    if (!gs.length){
      el.innerHTML = `<article class="page-card">
        <a class="breadcrumb" href="index.html#games">← ${t('返回游戏目录','Back to games','ゲーム一覧に戻る','Volver a los juegos')}</a>
        <h1>${t('暂无已发布游戏','No released games yet','公開済みゲームはまだありません','Aún no hay juegos publicados')}</h1>
        <p class="lead">${t(
          'CuriousKite 的正式发布游戏会在这里出现。',
          'Released CuriousKite games will appear here.',
          'CuriousKite の正式リリース済みゲームはこちらに掲載されます。',
          'Los juegos de CuriousKite publicados oficialmente aparecerán aquí.'
        )}</p>
      </article>`;
      return;
    }
    const g = gs.find(x=>x.id===id);
    if (!g){
      el.innerHTML = `<article class="page-card">
        <a class="breadcrumb" href="index.html#games">← ${t('返回游戏目录','Back to games','ゲーム一覧に戻る','Volver a los juegos')}</a>
        <h1>${t('未找到该游戏','Game not found','ゲームが見つかりません','Juego no encontrado')}</h1>
        <p class="lead">${t(
          '这个链接可能已过期，请返回游戏目录。',
          'This link may be outdated. Please return to the game list.',
          'このリンクは古い可能性があります。ゲーム一覧に戻ってください。',
          'Este enlace puede estar desactualizado. Vuelve a la lista de juegos.'
        )}</p>
      </article>`;
      return;
    }
    const fs = gv(g,'features') || [];
    document.title = `${gv(g,'title')} | CuriousKite`;
    const screenshots = g.artwork?.screenshots ?? [];
    el.innerHTML = `<article class="page-card game-detail-card">
      <a class="breadcrumb" href="index.html#games">← ${t('返回全部游戏','Back to games','ゲーム一覧に戻る','Volver a los juegos')}</a>
      <div class="game-detail-hero">
        <div class="game-detail-art" aria-hidden="true">${gameIcon(g)}</div>
        <div>
          <div class="game-top"><span class="badge badge-${g.status}">${gv(g,'status')}</span><span class="age-chip">${t('适合年龄','Ages','対象年齢','Edades')} ${g.age}</span></div>
          <h1>${gv(g,'title')}</h1>
          <p class="lead">${gv(g,'summary')}</p>
        </div>
      </div>
      <div class="meta">
        <span>${t('无广告','No ads','広告なし','Sin anuncios')}</span>
        <span>${t('无订阅','No subscriptions','サブスクリプションなし','Sin suscripciones')}</span>
      </div>
      <h2>${t('核心特点','Key features','主な特徴','Características principales')}</h2>
      <ul class="feature-list">${fs.map(x=>`<li>✓ ${x}</li>`).join('')}</ul>
      ${screenshots.length ? `<div class="game-screenshots">${screenshots.map((src, index) => `<img src="${src}" alt="${gv(g,'title')} ${t('游戏截图','game screenshot','ゲーム画面','captura del juego')} ${index + 1}" loading="lazy"/>`).join('')}</div>` : ''}
      <h2>App Store</h2>
      ${g.app_store_url
        ? `<a class="btn primary" href="${g.app_store_url}" target="_blank" rel="noopener">${t('在 App Store 查看','View on the App Store','App Store で見る','Ver en App Store')} ↗</a>`
        : g.status === 'approved'
          ? `<div class="release-box approved-release">${gv(g,'release_note')}</div>`
        : `<div class="release-box">${t(
            '此目录项缺少已确认的 App Store 链接，请暂勿发布该目录项。',
            'This catalog entry is missing a confirmed App Store link and should not be published yet.',
            'この項目には確認済みの App Store リンクがありません。公開しないでください。',
            'Esta entrada no tiene un enlace confirmado de App Store y todavía no debe publicarse.'
          )}</div>`
      }
      <p class="game-support-link"><a class="text-link" href="${g.support_url ?? 'support.html'}">${t('需要帮助？前往支持中心','Need help? Visit Support Center','サポートが必要ですか？サポートセンターへ','¿Necesitas ayuda? Visita el centro de soporte')}</a></p>
    </article>`;
  }catch{
    el.innerHTML = `<div class="page-card"><p>${t('游戏信息暂时无法加载。','Game information is temporarily unavailable.','ゲーム情報を読み込めません。','La información del juego no está disponible temporalmente.')}</p></div>`;
  }
}

async function refresh(){
  await loadTranslations();
  applyStaticText();
  await Promise.all([renderHome(),renderGame()]);
}

document.addEventListener('change', e => {
  if (e.target?.id === 'langSelect'){
    state.lang = e.target.value;
    localStorage.setItem('siteLang', state.lang);
    refresh();
  }
});

refresh();
