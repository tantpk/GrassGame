// 星宿劫源：太初道主 - 核心修士境界、本命源器與神藏模型
import { ITEMS_DATA } from '../data/items.js';
import { MERIDIANS_DATA } from '../data/meridians.js';

export class Character {
  constructor(data = {}) {
    this.name = data.name || "陸沉舟";
    this.gender = data.gender || "male";
    this.origin = data.origin || "mortal"; // mortal (凡塵孤童), rogue (荒原散修), clan (破落古族)
    
    // 五維大荒道基
    this.strength = data.strength || 20;     // 荒古力魄
    this.agility = data.agility || 20;       // 虛空遁速
    this.rootBone = data.rootBone || 20;     // 骨相天脈
    this.comprehension = data.comprehension || 20; // 悟性神照
    this.luck = data.luck || 20;             // 大道天命

    // 九階道階境界 (0: 凝魄, 1: 洞天, 2: 道胎, 3: 神藏, 4: 通虛, 5: 星宿真王, 6: 乾坤界主, 7: 無量至尊, 8: 太初道主)
    this.realmIndex = data.realmIndex || 0;
    this.realmLayer = data.realmLayer || 1;
    this.exp = data.exp || 0; // 天地元氣
    this.qi = data.qi || 100; // 混沌本源真氣

    // 宗門陣營
    this.sectId = data.sectId || "taixu_sword";
    this.sectRank = data.sectRank || 1;
    this.sectContribution = data.sectContribution || 0;

    // 善惡心境與殺戮業火
    this.morality = data.morality || 5; 
    this.sinKarma = data.sinKarma || 0; 

    // 諸界流通靈幣
    this.silver = data.silver || 600; // 上品靈石
    this.ingots = data.ingots || 120; // 混沌天晶

    // 習得道訣與配備
    this.learnedSkills = data.learnedSkills || ["tx_gengjin_jian", "dx_bi_sui_yan"];
    this.equippedSkills = data.equippedSkills || ["tx_gengjin_jian", "dx_bi_sui_yan"];
    this.unlockedAcupoints = data.unlockedAcupoints || []; 

    // 本命道兵靈甲
    this.equipSlots = data.equipSlots || {
      weapon: "wp_taiyi_swords",
      armor: "ar_taixu_robe",
      accessory: "ac_dinghai_pearl"
    };

    // 虛空納戒
    this.inventory = data.inventory || [
      { id: "pill_zhuji", count: 3 },
      { id: "pill_jiangchen", count: 1 }
    ];

    this.lastCultivateTime = data.lastCultivateTime || Date.now();
  }

  getRealmTitle() {
    const realms = [
      "凝魄境", "洞天境", "道胎境", "神藏境", 
      "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"
    ];
    const rName = realms[this.realmIndex] || "太初混沌境";
    if (this.realmIndex === 8) return "太初道主 (大圓滿)";
    return `${rName} 第${this.realmLayer}重天`;
  }

  getEffectiveStat(stat) {
    let val = 0;
    const realmMultiplier = 1 + (this.realmIndex * 9 + this.realmLayer) * 0.16;

    switch (stat) {
      case "hp":
        val = (380 + this.rootBone * 32) * realmMultiplier;
        break;
      case "mp":
        val = (160 + this.comprehension * 22) * realmMultiplier;
        break;
      case "atk":
        val = (55 + this.strength * 6) * realmMultiplier;
        break;
      case "def":
        val = (28 + this.rootBone * 3.5) * realmMultiplier;
        break;
      case "speed":
        val = (48 + this.agility * 3);
        break;
      case "crit":
        val = 7 + Math.floor(this.agility * 0.25) + Math.floor(this.luck * 0.15);
        break;
      case "dodge":
        val = 5 + Math.floor(this.agility * 0.25);
        break;
    }

    Object.values(this.equipSlots).forEach(itemId => {
      if (!itemId) return;
      const item = ITEMS_DATA.find(i => i.id === itemId);
      if (item && item.stats && item.stats[stat]) {
        val += item.stats[stat];
      }
    });

    MERIDIANS_DATA.forEach(meridian => {
      meridian.points.forEach(pt => {
        if (this.unlockedAcupoints.includes(pt.id)) {
          if (pt[stat]) val += pt[stat];
        }
      });
    });

    return Math.floor(val);
  }

  addItem(itemId, count = 1) {
    const existing = this.inventory.find(i => i.id === itemId);
    if (existing) {
      existing.count += count;
    } else {
      this.inventory.push({ id: itemId, count });
    }
  }

  removeItem(itemId, count = 1) {
    const idx = this.inventory.findIndex(i => i.id === itemId);
    if (idx !== -1) {
      if (this.inventory[idx].count > count) {
        this.inventory[idx].count -= count;
      } else {
        this.inventory.splice(idx, 1);
      }
      return true;
    }
    return false;
  }

  equipItem(itemId) {
    const item = ITEMS_DATA.find(i => i.id === itemId);
    if (!item || !item.slot) return false;

    const currentEquip = this.equipSlots[item.slot];
    if (currentEquip) {
      this.addItem(currentEquip, 1);
    }

    this.removeItem(itemId, 1);
    this.equipSlots[item.slot] = itemId;
    return true;
  }

  unequipItem(slot) {
    const currentEquip = this.equipSlots[slot];
    if (currentEquip) {
      this.addItem(currentEquip, 1);
      this.equipSlots[slot] = null;
      return true;
    }
    return false;
  }
}