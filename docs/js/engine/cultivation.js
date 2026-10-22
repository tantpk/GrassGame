// 星宿劫源：太初道主 - 靈台修持與九重天雷劫考驗
export class CultivationEngine {
  constructor(character) {
    this.char = character;
  }

  calculateElapsed(nowMs) {
    const last = this.char.lastCultivateTime || nowMs;
    const elapsedSeconds = Math.max(0, Math.floor((nowMs - last) / 1000));
    const cappedSeconds = Math.min(elapsedSeconds, 24 * 3600);

    const baseExpPerMin = 28 * (1 + this.char.realmIndex * 0.42) * (1 + this.char.comprehension * 0.06);
    const baseQiPerMin = 16 * (1 + this.char.rootBone * 0.05);

    const minutes = cappedSeconds / 60;
    const gainedExp = Math.floor(minutes * baseExpPerMin);
    const gainedQi = Math.floor(minutes * baseQiPerMin);

    return { elapsedSeconds, cappedSeconds, gainedExp, gainedQi };
  }

  settleOfflineRewards() {
    const now = Date.now();
    const res = this.calculateElapsed(now);
    if (res.gainedExp > 0 || res.gainedQi > 0) {
      this.char.exp += res.gainedExp;
      this.char.qi += res.gainedQi;
      this.char.lastCultivateTime = now;
    }
    return res;
  }

  attemptBreakthrough() {
    const realms = [
      { name: "凝魄境", maxLayers: 9, reqExpBase: 350, hasTribulation: false },
      { name: "洞天境", maxLayers: 9, reqExpBase: 1400, hasTribulation: false },
      { name: "道胎境", maxLayers: 9, reqExpBase: 4500, hasTribulation: true },
      { name: "神藏境", maxLayers: 9, reqExpBase: 13500, hasTribulation: true },
      { name: "通虛境", maxLayers: 9, reqExpBase: 38000, hasTribulation: true },
      { name: "星宿真王", maxLayers: 9, reqExpBase: 95000, hasTribulation: true },
      { name: "乾坤界主", maxLayers: 9, reqExpBase: 240000, hasTribulation: true },
      { name: "無量至尊", maxLayers: 9, reqExpBase: 550000, hasTribulation: true },
      { name: "太初道主", maxLayers: 1, reqExpBase: 1600000, hasTribulation: true }
    ];

    const curRealm = realms[this.char.realmIndex] || realms[0];
    const reqExp = Math.floor(curRealm.reqExpBase * Math.pow(1.35, this.char.realmLayer - 1));

    if (this.char.exp < reqExp) {
      return {
        success: false,
        msg: `天地元氣不足！當前修為 ${this.char.exp}，叩擊天關需積累 ${reqExp} 點元氣。`
      };
    }

    const baseRate = 0.80 - (this.char.realmIndex * 0.04) + (this.char.comprehension * 0.01);
    const roll = Math.random();

    this.char.exp -= reqExp;

    if (roll < baseRate) {
      const isNextRealm = (this.char.realmLayer >= curRealm.maxLayers);
      if (!isNextRealm) {
        this.char.realmLayer++;
        return {
          success: true,
          realmName: this.char.getRealmTitle(),
          msg: `【靈台洞徹】功行圓滿！成功進階至【${this.char.getRealmTitle()}】，真元暴漲！`
        };
      } else {
        if (this.char.realmIndex < realms.length - 1) {
          this.char.realmIndex++;
          this.char.realmLayer = 1;
          const nextRealm = realms[this.char.realmIndex];
          let extraMsg = "";
          if (nextRealm.hasTribulation) {
            extraMsg = ` 九天神霄雷雲聚集，你以本命重寶硬抗萬丈天罰神雷，洗骨超凡！`;
          }
          return {
            success: true,
            realmName: this.char.getRealmTitle(),
            msg: `【大境界蛻變】打破天道桎梏，登臨【${this.char.getRealmTitle()}】！${extraMsg}`
          };
        }
      }
    } else {
      return {
        success: false,
        msg: `【道心生障】天道威壓降臨，衝擊失敗！幸得太初歲漏玉鑑庇護，無損根本，請調息再叩天關。`
      };
    }
  }
}