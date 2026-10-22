// 墨刃江湖：風雲行 - Google Play Billing v7 與 Play 遊戲服務橋接器
export class GooglePlayBridge {
  constructor(character) {
    this.char = character;
    this.isAndroid = typeof window !== 'undefined' && !!window.AndroidGooglePlay;
  }

  // 發起內購商品購買
  async purchaseProduct(productId) {
    console.log(`[GooglePlayBridge] 發起購買: ${productId}`);

    if (this.isAndroid) {
      // 調用 Android 原生 Java 接口
      window.AndroidGooglePlay.launchBillingFlow(productId);
      return { status: "pending", msg: "已喚起 Google Play 結帳收銀台" };
    }

    // 瀏覽器 / 本地測試環境模擬結帳
    return new Promise((resolve) => {
      setTimeout(() => {
        this.fulfillPurchase(productId);
        resolve({ status: "success", msg: "【測試環境】模擬購買成功！商品已入帳。" });
      }, 800);
    });
  }

  // 發放內購商品權益
  fulfillPurchase(productId) {
    switch (productId) {
      case "ad_remove_lifetime":
        localStorage.setItem("VIP_AD_FREE", "true");
        alert("已開通【終身免廣告特權】！江湖遊歷不再受限。");
        break;
      case "monthly_card_vip":
        this.char.ingots += 300;
        localStorage.setItem("VIP_MONTHLY_EXPIRE", Date.now() + 30 * 24 * 3600 * 1000);
        alert("成功開通【江湖月卡】！立即獲贈 300 元寶，每日可在客棧領取 100 元寶。");
        break;
      case "ingots_60":
        this.char.ingots += 60;
        break;
      case "ingots_300":
        this.char.ingots += 330; // 贈送 10%
        break;
      case "ingots_980":
        this.char.ingots += 1180; // 贈送 20%
        break;
      default:
        console.warn("未知商品 ID:", productId);
    }
  }

  // 激勵影片廣告觀看回調
  showRewardAd(onSuccess) {
    if (localStorage.getItem("VIP_AD_FREE") === "true") {
      // 免廣告特權用戶直接獲取獎勵
      onSuccess();
      return;
    }

    if (this.isAndroid && window.AndroidGooglePlay.showRewardedAd) {
      window.AndroidGooglePlay.showRewardedAd();
      window.onAdRewardSuccess = onSuccess;
    } else {
      // 網頁端模擬廣告播放 2 秒
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;";
      overlay.innerHTML = "<h3 style='margin-bottom:10px;'>正在播放江湖特約廣告...</h3><p>觀看中 (2s)</p>";
      document.body.appendChild(overlay);

      setTimeout(() => {
        document.body.removeChild(overlay);
        onSuccess();
      }, 2000);
    }
  }
}