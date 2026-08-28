# 游戏目录与 App Store 同步规范

`assets/games.json` 是游戏卡片和详情页的唯一游戏数据来源。页面不得为某个游戏写专用分支。

每个游戏对象必须包含稳定 `id`、`status`、`age`、`app_store`、`artwork`、本地化 `title` / `summary` / `features` 和 `support_url`。`artwork.icon` 与 `artwork.screenshots` 使用从 App Store 公开商品页同步到 `assets/` 的本地副本。

新增游戏：添加一个完整对象，下载官方图标和截图，填入 13 种语言的文本。发布后的 `id` 不得修改，详情页链接为 `game.html?id=<id>`。

App Store 同步记录：

```json
"app_store": { "id": "6804195627", "country": "us" },
"artwork": {
  "icon": "assets/animal-puzzle-fun-app-icon.jpg",
  "screenshots": ["assets/animal-puzzle-fun-iphone-01.jpg"]
}
```

同步仅可覆盖官方图标、截图、商店 URL 和英文 App Store 文案候选值。其他 locale、站点支持链接与隐私文案必须通过本地化审校后更新。
