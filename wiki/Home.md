# 《星宿劫源：太初道主》代碼庫 Wiki 總綱 (Repository Wiki Home)

歡迎查閱 **《星宿劫源：太初道主》（Astral Sovereign: Dao of Primordial Genesis）** 官方開發者與企劃全案代碼庫 Wiki。
本項目為一套高完成度、具備獨立運行能力與完整商業化結構的東方玄幻放置圖文 RPG 手機遊戲（首發適配 Google Play / Android 15）。

## 核心設計理念與架構特色
1. **純原創東方玄幻世界觀**：擺脫傳統套路命名，以「太初五極本源」、「太虛星河」、「九階道階」與「神霄天罰」構建宏偉修真宇宙。
2. **經典修仙小說玩法深度再現**：
   - 凡胎逆命，以「太初歲漏玉鑑」每日凝結歲月靈精催熟萬年神草，突破宗閥資源壟斷。
   - 體內熔爐融合「大荒玄煞神火」與「神霄劫雷」，引爆滅世合擊神通。
   - 拍賣行奪圖、城外設伏、九曜劍陣反殺與百分之百儲物納戒搜括（摸屍機制）。
   - 突破道階大境界觸發九天雷劫天威考驗。
3. **極致輕量與零外部依賴**：
   - 基於現代純原生 ES6 模組架構，無龐大第三方框架負擔，冷啟動速度小於 0.5 秒。
   - 內建基於 Web Audio API 的程序化國風音訊合成引擎（古箏仙樂、飛劍錚鳴、神雷裂空、破境玉磬），無需加載外部龐大音訊資源。
4. **完整商業化與 Google Play 發行準備**：
   - 原生對接 Google Play Billing Library v7（終身免廣告令、至尊仙令月卡、天晶寶匣）。
   - 包含 Target API 35 配置、64 位元架構支援與服務端收據雙向驗證邏輯。

## 代碼庫目錄地圖 (Codebase Map)
```
astral_sovereign_game/
├── client/                     # 前端單頁應用客戶端 (SPA)
│   ├── index.html              # 手機豎屏直立主頁面
│   ├── css/style.css           # 國風暗夜星空與太虛道紋樣式
│   └── js/
│       ├── data/               # 純原創玄幻核心數據庫
│       │   ├── sects.js        # 五大遠古聖門與魔剎配置
│       │   ├── skills.js       # 60+ 門大荒神通道藏與合璧連攜
│       │   ├── meridians.js    # 太初天脈、識海神髓與霸王軀
│       │   ├── items.js        # 通天道兵、靈甲、丹藥與古卷
│       │   ├── maps.js         # 蒼瀾九域到太初天門地圖節點
│       │   └── events.js       # 太荒仙緣與黑市奪寶分支奇遇庫
│       ├── engine/             # 底層業務演算引擎
│       │   ├── audio.js        # Web Audio API 國風程序化音效
│       │   ├── combat.js       # 確定性小說體戰鬥模擬引擎
│       │   ├── cultivation.js  # 洞府離線收益與天罰雷劫模擬器
│       │   ├── character.js    # 九階道境與五維道基實體模型
│       │   ├── save.js         # 本地雙模存檔與雲端同步抽象
│       │   └── googleplay.js   # Play Billing v7 與廣告橋接器
│       └── ui/app.js           # 視圖路由與全域交互控制器
├── server/                     # 後端微服務 (Node.js / Express)
│   ├── package.json            # 依賴規範
│   └── server.js               # 萬界天梯榜、雲存檔、戰鬥驗證與訂單校驗
├── android/                    # Google Play 原生 Android 發布工程
│   └── app/                    # Gradle 腳本、Manifest 與 Java 結帳封裝
├── docs/                       # 企劃與上架指導文件
└── wiki/                       # 模組化 GitHub/GitLab Repo Wiki 文檔集
```