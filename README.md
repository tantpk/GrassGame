# 星宿劫源：太初道主 (Astral Sovereign: Dao of Primordial Genesis)

超大型原創玄幻修真圖文手遊全案與原始碼（Google Play 發行規格）。
融合凡命逆天、造化時光神露催熟、玄煞火雷交融熔爐、九重天門雷劫與太虛拍賣伏擊反殺體系，擁有完全獨立自主的原創東方玄幻名詞庫與世界觀。

## 本機即刻體驗
1. 進入 `client/` 目錄，執行 `python3 -m http.server 8080`
2. 瀏覽器訪問 `http://localhost:8080` 開啟修仙體驗！

## 服務端部署
1. 進入 `server/` 目錄，執行 `npm install`
2. 執行 `node server.js` 啟動服務

## Google Play 打包
1. 用 Android Studio 打開 `android/` 目錄
2. 執行 `./gradlew bundleRelease` 產出 `.aab` 發行包