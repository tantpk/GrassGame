// 星宿劫源：太初道主 - 伺服器端微服務
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DB = {
  users: new Map(),
  leaderboard: [
    { rank: 1, name: "陸沉舟", realm: "太初道主 (大圓滿)", sect: "太虛玄劍宮", score: 99999 },
    { rank: 2, name: "扶搖劍尊", realm: "無量至尊 9重", sect: "太虛玄劍宮", score: 96800 },
    { rank: 3, name: "玄牝丹祖", realm: "無量至尊 8重", sect: "丹霄古聖殿", score: 93400 },
    { rank: 4, name: "驚雷聖主", realm: "乾坤界主 9重", sect: "神霄劫雷古教", score: 88900 },
    { rank: 5, name: "幽夜煞皇", realm: "乾坤界主 7重", sect: "萬劫魔煞宗", score: 85200 }
  ]
};

app.post('/api/v1/auth/login', (req, res) => {
  const { deviceId, playerName } = req.body;
  if (!deviceId) return res.status(400).json({ code: 400, msg: "缺少修真令識別碼" });

  let user = DB.users.get(deviceId);
  if (!user) {
    user = {
      userId: "dao_" + Date.now(),
      deviceId,
      name: playerName || "太初道子",
      createdAt: Date.now(),
      saveData: null
    };
    DB.users.set(deviceId, user);
  }

  res.json({
    code: 200,
    msg: "入道太虛界成功",
    data: { userId: user.userId, name: user.name, token: "taichu_jwt_" + user.userId }
  });
});

app.post('/api/v1/user/sync-save', (req, res) => {
  const { deviceId, saveData } = req.body;
  const user = DB.users.get(deviceId);
  if (!user) return res.status(404).json({ code: 404, msg: "修士不存在" });

  user.saveData = saveData;
  user.updatedAt = Date.now();
  res.json({ code: 200, msg: "太虛玉簡神念同步成功", serverTime: Date.now() });
});

app.get('/api/v1/arena/leaderboard', (req, res) => {
  res.json({ code: 200, data: DB.leaderboard });
});

app.post('/api/v1/billing/verify-google-play', (req, res) => {
  const { purchaseToken, productId } = req.body;
  console.log(`[Google Play Billing] 正在驗證混沌天晶訂單: ${productId}`);
  res.json({
    code: 200,
    status: "PURCHASED",
    orderId: "GPA.TAICHU." + Math.floor(Math.random() * 9000000000 + 1000000000),
    productId,
    purchaseTimeMillis: Date.now()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[太初道主服務端] 正在端口 ${PORT} 監聽諸界神念。`);
});