# 游戏目录与 App Store 同步规范

`assets/games.json` 是游戏卡片和详情页的唯一游戏数据来源。页面不得为某个游戏写专用分支。

## 给一个 App ID 时的流程

公开上架后，只需提供 App Store ID（例如 `6804195627`）：

```sh
node scripts/add-app-store-game.mjs <APP_ID> --country us
node scripts/sync-app-store.mjs --write
node scripts/check-localization.mjs
```

第一步从 Apple 公开 lookup 读取商品名称、说明、商品页 URL、图标和截图来源，并创建目录草稿。第二步下载官方媒体并写入同步时间。商店说明仅用于生成新增游戏的英文摘要草稿，不作为长期重复数据保存；目录公开文案由 `summary` 与 `features` 的 13 语言字段统一管理。新增游戏不需要改 HTML 或 JavaScript。

默认采用本产品线的年龄 `6–8`、`released` 状态、13 种语言（`en`、`zh-Hans`、`zh-Hant`、`ja`、`es`、`de`、`fr`、`ko`、`pt-BR`、`it`、`pl`、`ru`、`ar`）和统一支持页。只有该 App 在指定 storefront 不公开、年龄范围不同、支持页/隐私实践不同，或需要不同详情页 ID 时，才需要开发者补充信息。

默认隐私基线为 `data_collection: none`、`tracking: none`、`advertising: none`、`child_accounts: none`。这必须与每个版本在 App Store Connect 的实际隐私披露一致；任何差异都是发布阻塞项，必须先确认并更新网站与 App Store 资料。

## 数据约定

每个游戏对象包含稳定 `id`、`status`、`age`、`locales`、`privacy`、`app_store`、`artwork` 和 `support_url`。`app_store` 只保存稳定 ID、storefront、同步时间和商品名，不重复缓存整段商店说明。网站公开的 `summary` 与 `features` 必须完成 13 语言审校，并通过固定关卡总数检查；不得把当前内容总量写成长期产品承诺。`artwork.icon` 与 `artwork.screenshots` 是 App Store 媒体在 `assets/` 的本地副本。

发布后的 `id` 不得修改，详情页链接为 `game.html?id=<id>`。
