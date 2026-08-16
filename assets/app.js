const LANGS = ['zh','en','ja'];
const supportEmail = 'animalgames.kids@outlook.com';

function detectLanguage() {
  const saved = localStorage.getItem('siteLang');
  if (LANGS.includes(saved)) return saved;

  const raw = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages[0]
    : (navigator.language || 'en');

  const lang = String(raw).toLowerCase();
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ja')) return 'ja';
  return 'en';
}

const state = { lang: detectLanguage() };

const pageMeta = {
  home: {
    zh: ['Animal Games Kids｜儿童游戏与家长支持','Animal Games Kids：为 6–8 岁儿童设计的无广告、低干扰益智游戏，以及面向家长和监护人的支持与隐私信息。'],
    en: ['Animal Games Kids | Kids Games & Parent Support','Animal Games Kids offers low-distraction puzzle games for ages 6–8, plus clear support and privacy information for parents and guardians.'],
    ja: ['Animal Games Kids｜子ども向けゲームと保護者サポート','Animal Games Kids は6〜8歳向けの落ち着いて遊べるパズルゲームと、保護者向けのサポート・プライバシー情報を提供します。']
  },
  game: {
    zh: ['游戏详情｜Animal Games Kids','Animal Games Kids 游戏详情、产品特点和支持入口。'],
    en: ['Game Details | Animal Games Kids','Game details, product features, and support access for Animal Games Kids.'],
    ja: ['ゲーム詳細｜Animal Games Kids','Animal Games Kids のゲーム詳細、主な特徴、サポート情報。']
  },
  support: {
    zh: ['技术支持中心｜Animal Games Kids','Animal Games Kids 技术支持：恢复购买、购买未解锁、设备兼容、故障排查和联系支持。'],
    en: ['Support Center | Animal Games Kids','Animal Games Kids support for purchase restoration, device compatibility, troubleshooting, and direct contact.'],
    ja: ['サポートセンター｜Animal Games Kids','Animal Games Kids の購入復元、対応端末、トラブルシューティング、お問い合わせ情報。']
  },
  privacy: {
    zh: ['隐私政策｜Animal Games Kids','Animal Games Kids 网站与儿童游戏产品的隐私政策和数据处理原则。'],
    en: ['Privacy Policy | Animal Games Kids','Privacy policy and data-handling principles for the Animal Games Kids website and children’s games.'],
    ja: ['プライバシーポリシー｜Animal Games Kids','Animal Games Kids のウェブサイトと子ども向けゲームに関するプライバシー方針。']
  },
  '404': {
    zh: ['页面没有找到｜Animal Games Kids','页面没有找到。'],
    en: ['Page Not Found | Animal Games Kids','The requested page could not be found.'],
    ja: ['ページが見つかりません｜Animal Games Kids','指定されたページが見つかりませんでした。']
  }
};

function pick(obj) {
  if (!obj) return '';
  return obj[state.lang] ?? obj.en ?? obj.zh ?? obj.ja ?? '';
}

function t(zh,en,ja) {
  return state.lang === 'zh' ? zh : state.lang === 'ja' ? ja : en;
}

function staticText() {
  document.querySelectorAll('[data-zh]').forEach(el => {
    const value = state.lang === 'zh' ? el.dataset.zh :
                  state.lang === 'ja' ? el.dataset.ja :
                  el.dataset.en;
    if (value != null) el.textContent = value;
  });

  const select = document.getElementById('langSelect');
  if (select) select.value = state.lang;

  document.documentElement.lang =
    state.lang === 'zh' ? 'zh-CN' :
    state.lang === 'ja' ? 'ja-JP' : 'en';

  const page = document.body?.dataset.page;
  const meta = pageMeta[page]?.[state.lang];
  if (meta) {
    document.title = meta[0];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta[1]);
  }
}

async function loadGames() {
  const r = await fetch('assets/games.json',{cache:'no-cache'});
  if (!r.ok) throw new Error('games');
  return r.json();
}

function gv(g, field) {
  return g[`${field}_${state.lang}`] ?? g[`${field}_en`] ?? g[`${field}_zh`];
}

function card(g) {
  const fs = gv(g,'features').slice(0,2);
  return `<a class="game-card" href="game.html?id=${encodeURIComponent(g.id)}">
    <div class="game-top">
      <div class="game-icon" aria-hidden="true">${g.icon}</div>
      <span class="badge badge-${g.status}">${gv(g,'status')}</span>
    </div>
    <h3>${gv(g,'title')}</h3>
    <p>${gv(g,'summary')}</p>
    <div class="chips">${fs.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
    <div class="game-foot">
      <span>${t('适合','Ages','対象年齢')} ${g.age}</span>
      <span class="details">${t('查看详情','Details','詳細を見る')} →</span>
    </div>
  </a>`;
}

async function renderHome() {
  const el = document.getElementById('gamesList');
  if (!el) return;
  try {
    el.innerHTML = (await loadGames()).map(card).join('');
  } catch {
    el.innerHTML = `<div class="notice">${t(
      '游戏信息暂时无法加载，请刷新页面。',
      'Game information is temporarily unavailable. Please refresh.',
      'ゲーム情報を読み込めませんでした。ページを再読み込みしてください。'
    )}</div>`;
  }
}

async function renderGame() {
  const el = document.getElementById('gameDetail');
  if (!el) return;
  try {
    const id = new URLSearchParams(location.search).get('id');
    const gs = await loadGames();
    const g = gs.find(x=>x.id===id) || gs[0];
    const fs = gv(g,'features');

    document.title = `${gv(g,'title')} | Animal Games Kids`;

    el.innerHTML = `<article class="page-card">
      <a class="breadcrumb" href="index.html#games">← ${t('返回全部游戏','Back to games','ゲーム一覧に戻る')}</a>
      <div class="game-top" style="margin-top:22px">
        <div class="game-icon">${g.icon}</div>
        <span class="badge badge-${g.status}">${gv(g,'status')}</span>
      </div>
      <h1>${gv(g,'title')}</h1>
      <p class="lead">${gv(g,'summary')}</p>
      <div class="meta">
        <span>${t('适合年龄','Ages','対象年齢')} ${g.age}</span>
        <span>${t('无广告','No ads','広告なし')}</span>
        <span>${t('无社交','No social features','ソーシャル機能なし')}</span>
        <span>${t('无排行榜','No leaderboards','ランキングなし')}</span>
        <span>${t('无订阅','No subscriptions','サブスクリプションなし')}</span>
      </div>
      <h2>${t('核心特点','Key features','主な特徴')}</h2>
      <ul class="feature-list">${fs.map(x=>`<li>✓ ${x}</li>`).join('')}</ul>
      <h2>App Store</h2>
      ${g.app_store_url
        ? `<a class="btn brand" href="${g.app_store_url}" target="_blank" rel="noopener">${t('在 App Store 查看','View on the App Store','App Store で見る')} ↗</a>`
        : `<div class="notice">${t(
            '这款游戏尚未正式上架。发布后这里会提供 App Store 链接、正式截图和版本支持信息。',
            'This game has not been released yet. App Store links, final screenshots, and version-specific support information will appear here after launch.',
            'このゲームはまだ正式リリース前です。リリース後、App Store リンク、正式なスクリーンショット、バージョン別サポート情報を掲載します。'
          )}</div>`}
      <h2>${t('需要帮助？','Need help?','お困りですか？')}</h2>
      <p>${t(
        '购买恢复、设备兼容或游戏问题，请前往支持中心。',
        'For purchase restoration, device compatibility, or gameplay issues, visit the Support Center.',
        '購入の復元、対応端末、ゲームの不具合についてはサポートセンターをご覧ください。'
      )}</p>
      <a class="btn" href="support.html">${t('打开支持中心','Open Support Center','サポートセンターを開く')} →</a>
    </article>`;
  } catch {
    el.innerHTML = `<article class="page-card"><p>${t(
      '游戏信息暂时无法加载。',
      'Game information is temporarily unavailable.',
      'ゲーム情報を読み込めませんでした。'
    )}</p></article>`;
  }
}

function mailLinks() {
  const subject =
    state.lang === 'zh' ? 'Animal Games Kids 技术支持' :
    state.lang === 'ja' ? 'Animal Games Kids サポート' :
    'Animal Games Kids Support';

  document.querySelectorAll('[data-support-mail]').forEach(a => {
    a.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`;
  });
}

async function refresh() {
  staticText();
  mailLinks();
  await Promise.all([renderHome(),renderGame()]);
}

document.addEventListener('change', e => {
  if (e.target?.id === 'langSelect') {
    state.lang = LANGS.includes(e.target.value) ? e.target.value : 'en';
    localStorage.setItem('siteLang', state.lang);
    refresh();
  }
});

refresh();
