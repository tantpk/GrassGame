# 星宿劫源：太初道主 (Astral Sovereign: Dao of Primordial Genesis) — v43.0 完整打包版

超大型原創東方玄幻修真 × 秘境割草彈幕手遊全案與完整原始碼（搭載 `AstralSovereignShaderVFXEngine v43.0` 次世代 HD-2D 流光漸層、十大魔物差異化戰術 AI 與十波鎮關魔尊立體絕技系統）。

## 📦 壓縮包目錄結構
- `index.html` / `game.js` / `style.css`：根目錄獨立免安裝直開版（雙擊 `index.html` 即可直接遊玩，內嵌完整代碼、音效與離屏預烘焙 HD-2D 貼圖）
- `client/`：標準前端模組化工程目錄（含 `client/index.html`、`client/js/game.js`、`client/js/ui/app.js`、`client/css/style.css` 與各子系統資料表 `data/`、`engine/`）
- `server/`：Node.js 雲端存檔與排行榜伺服器
- `android/`：Google Play 發行工程與計費包裝器
- `docs/` & `wiki/`（及根目錄同名 `.md`）：五份完整技術架構、數值企劃、玩家攻略與專案維基文檔（已全面同步更新至 v43.0）

## 🚀 本機即刻體驗方式
1. **免伺服器直接雙擊啟動（最推薦）**：解壓縮後，直接用瀏覽器打開根目錄的 `index.html` 或 `client/index.html` 即可立即遊玩！
2. **本機 HTTP 伺服器啟動**：進入解壓縮根目錄或 `client/` 目錄，執行 `python3 -m http.server 8080`，瀏覽器訪問 `http://localhost:8080`。
3. **Node.js 服務端部署**：進入 `server/` 目錄，執行 `npm install && node server.js`。
