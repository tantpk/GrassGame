# 開發者與工程架構指南 (Developer & Architecture Guide)

## 前端客戶端技術棧 (Client Architecture)
- **架構模式**：純原生 ES6 模組化單頁應用（SPA），零第三方重型框架打包依賴。
- **渲染管線**：HTML5 語義化結構 ＋ 現代 CSS3 Flex/Grid ＋ Web Animations API。
- **音訊工程**：Web Audio API 自主程序化合成器 (`client/js/engine/audio.js`)，支援自震盪音階合成，免加載外部 MP3/WAV。
- **適配範圍**：手機 9:16 直屏、摺疊螢幕與平板寬螢幕自適應。

## 服務端技術棧 (Backend Architecture)
- **核心架構**：Node.js 18+ ＋ Express RESTful API ＋ WebSocket 實時通信。
- **防作弊設計**：
  - 戰鬥採用確定性隨機種子回放驗證 (`/api/v1/combat/verify`)，拒絕客戶端本地單方判定勝負。
  - 離線掛機結算強制以服務端伺服器時間為準。
- **Google Play 結帳校驗**：
  - 接入 Google Play Developer API（Server-to-Server 驗證），雙重校驗 `purchaseToken` 與 `productId`，徹底阻斷外掛假充值。

## Android 發行封裝規範 (Google Play Android Project)
- **開發環境**：Android Studio Iguana / Jellyfish，Gradle 8.0+。
- **配置指標**：
  - `minSdkVersion`: 24 (Android 7.0+)
  - `targetSdkVersion`: 35 (Android 15)
  - `compileSdkVersion`: 35
  - ABI 支援架構：`arm64-v8a`, `armeabi-v7a`, `x86_64`
- **打包指令**：
  ```bash
  cd android
  ./gradlew bundleRelease
  ```
  產出上架專用 `.aab` 檔案（位於 `android/app/build/outputs/bundle/release/`）。

## Google Play 封閉測試與合規審核清單
1. **20人 14天封閉測試**：在 Google Play Console 封閉測試軌道添加 20+ 名真實測試帳號，保持連續 14 天活躍。
2. **IARC 年齡分級**：如實勾選修仙打鬥小說文字描述，獲得普遍級/保護級認證。
3. **資料安全表格 (Data Safety)**：宣告使用 HTTPS 加密傳輸，說明設備標識與購買記錄之用途。