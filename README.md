# Animal Games Kids — GitHub Pages

面向家长和监护人的儿童 iOS 游戏官网与支持中心。纯 HTML / CSS / JavaScript，无外部框架。

## 当前公开联系
- Support / Privacy: `animalgames.kids@outlook.com`

## 主要页面
- `index.html` — 首页、游戏库、家长信任信息
- `support.html` — 恢复购买、购买异常、技术故障和人工支持
- `privacy.html` — 网站与儿童游戏隐私原则
- `game.html?id=...` — 游戏详情
- `404.html` — 404 页面
- `assets/games.json` — 游戏数据

## 隐私设计
- 源码不写个人姓名、家庭地址、私人邮箱或个人 GitHub 用户名。
- 当前不使用外部字体、广告、统计脚本或联系表单。
- 对外联系统一使用 `animalgames.kids@outlook.com`。

## 发布新游戏时
1. 更新 `assets/games.json` 的状态、App Store URL 和实际功能。
2. 核对支持页中的版本/设备信息。
3. 核对隐私政策是否仍与实际 App 数据处理一致。
4. 只宣传已经真实实现的功能。

## GitHub Pages
将全部文件上传到仓库根目录，Pages 使用 `main` + `/(root)` 发布。


## 语言
- 支持简体中文、English、日本語
- 首次访问自动读取浏览器首选语言：
  - 浏览器第一首选语言为 `zh-*` → 中文
  - 浏览器第一首选语言为 `ja-*` → 日本語
  - 其他第一首选语言 → English
- 用户手动切换后使用 `localStorage` 记住选择
- 页面标题、描述、支持邮件主题也随语言切换

- 用户已手动选择的语言优先级高于浏览器语言。

## 家长安心与游戏价值
首页把两类信息分开：
- 家长安心：无广告、无社交、无聊天、无排行榜、无订阅、无需儿童账号、成人确认购买。
- 游戏价值：益智与问题解决、专注、观察、空间理解、逻辑判断、难度递进。
- 文案避免“提高智商/开发大脑/保证学习效果”等不可验证承诺。
