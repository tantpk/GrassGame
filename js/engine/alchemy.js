// 星宿劫源：太初道主 - 藥園催熟與九品丹道引劫演算引擎
import { ALCHEMY_RECIPES_DATA } from '../data/alchemy_recipes.js';
import { audio } from './audio.js';

export class AlchemyEngine {
  constructor(character) {
    this.char = character;
    if (!this.char.garden) {
      this.char.garden = [
        { slot: 0, herbId: "herb_sanqing", name: "三清玄草", progress: 100, status: "可採擷" },
        { slot: 1, herbId: "herb_ziyang", name: "紫陽靈芝", progress: 40, status: "生長中 (40%)" },
        { slot: 2, herbId: "herb_taixu", name: "太虛玄參", progress: 10, status: "生長中 (10%)" }
      ];
    }
    if (this.char.epochDew === undefined) {
      this.char.epochDew = 3;
    }
  }

  dripDew(slotIndex) {
    if (this.char.epochDew <= 0) {
      return { success: false, msg: "歲月靈精不足！請等待每日凝練或開通太初歲漏令。" };
    }
    const plot = this.char.garden[slotIndex];
    if (!plot) return { success: false, msg: "未找到該仙圃。" };

    this.char.epochDew--;
    plot.progress = 100;
    plot.status = "可採擷";
    audio.playQiCharge();
    return {
      success: true,
      msg: `【歲月逆流】一滴太初歲月靈精滴落根莖，【${plot.name}】瞬間成熟，藥力圓滿！`
    };
  }

  harvest(slotIndex) {
    const plot = this.char.garden[slotIndex];
    if (!plot || plot.progress < 100) {
      return { success: false, msg: "靈藥尚未完全成熟，無法採擷。" };
    }
    this.char.addItem(plot.herbId, 2);
    plot.progress = 0;
    plot.status = "生長中 (0%)";
    audio.playLevelUp();
    return {
      success: true,
      msg: `【神藥出圃】採摘獲得【${plot.name}】×2！已收入虛空納戒，仙圃已重新播種。`
    };
  }

  brewPill(recipeId) {
    const rec = ALCHEMY_RECIPES_DATA.find(r => r.id === recipeId);
    if (!rec) return { success: false, msg: "未找到該丹方配方。" };

    for (const req of rec.reqHerbs) {
      const invItem = this.char.inventory.find(i => i.id === req.id);
      if (!invItem || invItem.count < req.count) {
        return { success: false, msg: `藥材不足！煉製【${rec.name}】需【${req.name}】×${req.count}。` };
      }
    }

    for (const req of rec.reqHerbs) {
      this.char.removeItem(req.id, req.count);
    }

    const isSuccess = Math.random() < rec.baseSuccess;
    if (!isSuccess) {
      audio.playFistStrike();
      return { success: false, msg: `【炸爐化渣】丹鼎火候微偏，藥力失衡化作黑灰！` };
    }

    let tribulationMsg = "";
    if (rec.hasTribulation) {
      tribulationMsg = ` 伴隨神丹出世，蒼穹降下丹劫天雷，被修士靈罡成功抵禦！金丹通靈誕生丹紋！`;
    }

    this.char.addItem(rec.targetPillId, 1);
    audio.playLevelUp();
    return {
      success: true,
      msg: `【極品丹成】爐火純青！成功煉出【${rec.name}】×1！${tribulationMsg}`
    };
  }
}
