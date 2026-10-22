// 星宿劫源：太初道主 - 太虛萬劫淵肉鴿核心演算引擎
import { ABYSS_RELICS_DATA } from '../data/abyss_relics.js';
import { audio } from './audio.js';

export class AbyssEngine {
  constructor(character) {
    this.char = character;
    if (!this.char.abyssFloor) this.char.abyssFloor = 1;
    if (!this.char.abyssRelics) this.char.abyssRelics = ["relic_jian_mang"];
  }

  exploreNode(nodeType) {
    const floor = this.char.abyssFloor;
    const unownedRelics = ABYSS_RELICS_DATA.filter(r => !this.char.abyssRelics.includes(r.id));
    const picked = unownedRelics.length > 0
      ? unownedRelics[Math.floor(Math.random() * unownedRelics.length)]
      : ABYSS_RELICS_DATA[0];

    this.char.abyssRelics.push(picked.id);
    const gainExp = floor * 400;
    const gainSilver = floor * 250;
    this.char.exp += gainExp;
    this.char.silver += gainSilver;
    this.char.abyssFloor++;

    audio.playLevelUp();
    return {
      success: true,
      relic: picked,
      msg: `【誅滅深淵凶靈】突破第 ${floor} 層！三選一獲得道印【${picked.name}】！累積元氣 +${gainExp}，上品靈石 +${gainSilver}！`
    };
  }

  safeEscape() {
    const earnedExp = this.char.abyssFloor * 500;
    const earnedSilver = this.char.abyssFloor * 300;
    this.char.exp += earnedExp;
    this.char.silver += earnedSilver;

    this.char.abyssFloor = 1;
    this.char.abyssRelics = ["relic_jian_mang"];

    audio.playLevelUp();
    return {
      success: true,
      msg: `【安全破虛】消耗破虛挪移符安全撤退！全量結算帶回洞府：元氣 +${earnedExp}，靈石 +${earnedSilver}！萬劫淵進度重置。`
    };
  }
}
