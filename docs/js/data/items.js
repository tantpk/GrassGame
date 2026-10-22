// 星宿劫源：太初道主 - 奇珍異寶、通天靈寶、靈丹神藥與太初聖物庫
export const ITEMS_DATA = [
  // 通天殺伐重寶 (Weapons)
  {
    id: "wp_taiyi_swords",
    name: "太乙玄庚飛劍 (三十六柄)",
    type: "weapon",
    slot: "weapon",
    rarity: "purple",
    rarityName: "純陽靈寶",
    price: 3500,
    stats: { atk: 195, crit: 9, speed: 18 },
    desc: "採太古庚金之精鍛打九九八十一載，自帶辟邪神光，鋒利無雙。"
  },
  {
    id: "wp_zhentian_cauldron",
    name: "混元鎮天定天鼎",
    type: "weapon",
    slot: "weapon",
    rarity: "orange",
    rarityName: "通天造化至寶",
    price: 9000,
    stats: { atk: 380, def: 90, stunChance: 0.22 },
    desc: "祭出化作巍峨神嶽，引萬鈞鎮壓之力鎮殺敵手識海。"
  },
  {
    id: "wp_shishen_halberd",
    name: "太古戮界凶神戈",
    type: "weapon",
    slot: "weapon",
    rarity: "red",
    rarityName: "混沌大荒禁器",
    price: 26000,
    stats: { atk: 780, crit: 28, armorPen: 0.45 },
    desc: "太初古界崩塌時由億萬煞氣凝結的凶物，持之殺意滔天，斬仙滅魔！"
  },

  // 護體仙衣與防具 (Armor)
  {
    id: "ar_taixu_robe",
    name: "太虛流雲天絲道袍",
    type: "armor",
    slot: "armor",
    rarity: "blue",
    rarityName: "中品靈寶",
    price: 650,
    stats: { hp: 550, def: 65 },
    desc: "以九天星絲紡織而成，防塵防水，削弱五行術法侵襲。"
  },
  {
    id: "ar_xuanwu_armor",
    name: "玄武鎮嶽霸天甲",
    type: "armor",
    slot: "armor",
    rarity: "purple",
    rarityName: "上品古寶",
    price: 3000,
    stats: { hp: 2400, def: 260, resAll: 22 },
    desc: "上古純血真靈玄武蛻甲所製，能硬扛三道九霄天劫神雷而不毀。"
  },
  {
    id: "ar_hundun_lotus_robe",
    name: "太初青蓮護體天衣",
    type: "armor",
    slot: "armor",
    rarity: "red",
    rarityName: "混沌仙甲",
    price: 23000,
    stats: { hp: 7000, def: 580, reflect: 0.28 },
    desc: "太初混沌青蓮所生之甲，諸法避退，受擊時反震敵手28%傷害。"
  },

  // 輔助本命奇物 (Accessories)
  {
    id: "ac_dinghai_pearl",
    name: "定海辟塵靈珠",
    type: "accessory",
    slot: "accessory",
    rarity: "purple",
    rarityName: "上品異寶",
    price: 3200,
    stats: { mp: 850, dodge: 12, speed: 28 },
    desc: "內部封印整座靈海之重，安神鎮魂，消除心魔。"
  },
  {
    id: "ac_suiyue_bead",
    name: "太初歲漏玉鑑 (殘)",
    type: "accessory",
    slot: "accessory",
    rarity: "red",
    rarityName: "鴻蒙造化初寶",
    price: 55000,
    stats: { hp: 3200, mp: 2200, expBoost: 0.4 },
    desc: "主角核心金手指！吸納天地歲月精華催熟古藥，修煉進境激增40%！"
  },

  // 丹道神藥 (Alchemy & Elixirs)
  {
    id: "pill_zhuji",
    name: "三清凝液通脈丹",
    type: "consumable",
    price: 320,
    effect: { addExp: 1600, addQi: 320 },
    desc: "衝擊洞天境必備之丹，三清靈藥合煉，洗去周身雜氣。"
  },
  {
    id: "pill_jiangchen",
    name: "道胎絳霞造化丸",
    type: "consumable",
    price: 1300,
    effect: { addExp: 6500, addQi: 1600 },
    desc: "孕育本命道胎之至寶，吞服引下丹道霞光，洗刷經脈。"
  },
  {
    id: "pill_jieying",
    name: "神藏破界九轉真丹",
    type: "consumable",
    price: 5200,
    effect: { addExp: 32000, addQi: 8500, fullHeal: true },
    desc: "開啟體內五大神藏之無上仙丹，破境成功率倍增！"
  },
  {
    id: "pill_huashen",
    name: "太虛涅槃不滅金丹",
    type: "consumable",
    price: 21000,
    effect: { addExp: 130000, addQi: 32000, breakthroughGuarantee: true },
    desc: "以萬年紫陽芝合煉之神丹，吞之神魂融於虛空，必成通虛至尊！"
  }
];