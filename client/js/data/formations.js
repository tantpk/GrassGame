// 星宿劫源：太初道主 - 奇門陣道演武五大陣盤
export const FORMATIONS_DATA = [
  {
    id: "tian_gang",
    name: "天罡北斗伏魔陣",
    type: "attack",
    desc: "天盤主殺：全隊攻擊穿透提升 40%，先手速度提升 25，命中率 100%。",
    buff: { armorPen: 0.4, speed: 25, critBoost: 0.3 }
  },
  {
    id: "jiu_gong",
    name: "九宮八卦兩儀陣",
    type: "defense",
    desc: "地盤主化：受擊反震 35% 傷害，全五行抗性提升 30%，格擋幾率提升 25%。",
    buff: { reflect: 0.35, defBoost: 0.5, resAll: 30 }
  },
  {
    id: "qing_long",
    name: "青龍七宿生生陣",
    type: "sustain",
    desc: "人盤主生：每回合回復全體 12% 氣血，免疫持續灼燒與流血狀態。",
    buff: { regen: 0.12, clearDebuffs: true }
  },
  {
    id: "zhuxian_sha",
    name: "太荒誅仙戮神陣",
    type: "extreme_burst",
    desc: "極限爆發殺伐大陣：全隊傷害提升 60%，暴擊傷害翻倍，自身防禦降低 20%。",
    buff: { dmgBoost: 0.6, critDmgBoost: 1.0, defPenalty: -0.2 }
  }
];
