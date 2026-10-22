// 星宿劫源：太初道主 - 太初五極本源天脈與太虛識海神髓
export const MERIDIANS_DATA = [
  {
    id: "wuxing_root",
    name: "太初五極本源天脈",
    title: "逆轉凡命之基",
    desc: "原為下品凡骨雜脈，藉由太初造化神液不斷洗髓，重聚五行混沌之氣，最終修成混沌開天道脈。",
    points: [
      { id: "root_jin", name: "庚金煞穴", reqQi: 220, atk: 50, crit: 3, desc: "金之至利，破盡萬物" },
      { id: "root_mu", name: "青乙生竅", reqQi: 550, hp: 500, mp: 120, desc: "木之長春，生機不息" },
      { id: "root_shui", name: "玄冥靈府", reqQi: 1100, mp: 280, def: 40, desc: "水之化勁，四兩千斤" },
      { id: "root_huo", name: "焚天火脈", reqQi: 1900, atk: 130, crit: 7, desc: "火之狂暴，焚滅諸天" },
      { id: "root_tu", name: "太荒坤宮", reqQi: 3200, hp: 1300, def: 90, desc: "土之厚載，固若金湯" },
      { id: "root_hundun", name: "混沌樞紐", reqQi: 5500, atk: 280, hp: 2200, desc: "五行合璧，混沌初現" }
    ],
    bonus: { name: "混沌五行歸真", desc: "五極圓滿：每回合自生天地混元靈氣，全抗性提高30%，神通威力增加28%。" }
  },
  {
    id: "soul_sea",
    name: "太虛識海神念宮",
    title: "神識永恆本源",
    desc: "修士神魂演化之紫府靈海。神念覆蓋越廣，控火越精妙，煉製極品仙丹成色越高。",
    points: [
      { id: "soul_1", name: "靈犀初醒", reqQi: 320, mp: 180, atk: 35 },
      { id: "soul_2", name: "神念如絲", reqQi: 850, mp: 380, speed: 22 },
      { id: "soul_3", name: "紫府金蓮", reqQi: 1700, mp: 750, def: 55 },
      { id: "soul_4", name: "元神夜遊", reqQi: 2900, mp: 1300, crit: 9 },
      { id: "soul_5", name: "三尸明燈", reqQi: 4800, mp: 2400, atk: 240 },
      { id: "soul_6", name: "太虛天心照徹", reqQi: 7500, mp: 4200, speed: 65 }
    ],
    bonus: { name: "太虛天心通", desc: "神識大成：心魔抗性達至100%，戰鬥中以無形神識壓迫對手，令其每回合削減15%真元！" }
  },
  {
    id: "fleshy_body",
    name: "荒古不滅霸王軀",
    title: "肉身成聖金身",
    desc: "經受億萬雷煞與地煞神火千錘百鍊，洗去肉體凡胎雜質，氣血磅礡如上古神魔！",
    points: [
      { id: "body_1", name: "鋼筋鐵骨", reqQi: 450, hp: 700, def: 45 },
      { id: "body_2", name: "琉璃金玉髓", reqQi: 1200, hp: 1700, def: 95 },
      { id: "body_3", name: "太荒氣血柱", reqQi: 2400, hp: 3000, atk: 160 },
      { id: "body_4", name: "不滅神魔胎", reqQi: 4000, hp: 4800, def: 190 },
      { id: "body_5", name: "滴血衍化道", reqQi: 7000, hp: 8500, atk: 380 }
    ],
    bonus: { name: "神魔不滅身", desc: "肉身成聖：受到致命重創時強制保留1點生機，立即回復50%氣血並獲得3回合狂暴免疫！" }
  }
];