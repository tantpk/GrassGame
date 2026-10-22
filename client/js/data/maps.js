// 星宿劫源：太初道主 - 諸界九大修仙禁地與古星河版圖
export const MAPS_DATA = [
  {
    id: "region_tiannan",
    name: "蒼瀾古陸 · 青玄道域",
    levelReq: 1,
    realmReq: "凝魄境 1重",
    desc: "連綿萬里的古老靈脈道域，青山如黛，乃散修與各派招募仙緣之地。",
    bgGradient: "linear-gradient(135deg, #1b382d 0%, #2f5c46 100%)",
    nodes: [
      { id: "tn_1", name: "棲霞山散修坊市", type: "market", desc: "群修齊聚，叫賣低階法符與初階靈種，偶現蒙塵古寶。" },
      { id: "tn_2", name: "靈泉斷天涯洞府", type: "rest", desc: "靈霧繚繞的靜謐幽谷，適合布下聚元古陣閉關打坐。" },
      { id: "tn_3", name: "血妖門劫掠哨卡", type: "combat", danger: 2, enemy: { name: "血妖門護法魔修", hp: 850, atk: 80, def: 26, exp: 95, coins: 160, drops: ["pill_zhuji"] } }
    ]
  },
  {
    id: "region_blood_trial",
    name: "荒古禁域 · 殞神墟",
    levelReq: 10,
    realmReq: "洞天境 1重",
    desc: "萬年方現一次的太古諸神埋骨古墟。各宗為爭奪破境靈草生死殺戮！",
    bgGradient: "linear-gradient(135deg, #421818 0%, #7e2828 100%)",
    nodes: [
      { id: "bt_1", name: "萬劫血海泥潭", type: "combat", danger: 4, enemy: { name: "八階紫鱗吞魂蛟", hp: 2100, atk: 155, def: 58, exp: 250, coins: 360, drops: ["ar_taixu_robe", "pill_zhuji"] } },
      { id: "bt_2", name: "青銅葬仙神殿", type: "treasure", desc: "破敗古神巨像下封印著太荒古修遺留下的法寶殘片！" },
      { id: "bt_3", name: "古墟天樞陣樞", type: "boss", danger: 6, enemy: { name: "赤目修羅狂客 (洞天大圓滿)", hp: 4800, atk: 290, def: 98, exp: 620, coins: 880, drops: ["wp_taiyi_swords", "pill_jiangchen"] } }
    ]
  },
  {
    id: "region_chaos_star",
    name: "無垠太虛星河 · 天樞聖城",
    levelReq: 20,
    realmReq: "道胎境 1重",
    desc: "懸浮於星河之巔的巨大古天城。萬星閃耀，各界商盟與獵妖巨擘雲集。",
    bgGradient: "linear-gradient(135deg, #10263b 0%, #1e4566 100%)",
    nodes: [
      { id: "cs_1", name: "天樞中央星宮", type: "event", desc: "聖城核心，星宿真王們在此俯瞰無邊星河波濤。" },
      { id: "cs_2", name: "碎星深空魔穴", type: "combat", danger: 8, enemy: { name: "星海虛空吞噬獸", hp: 9800, atk: 490, def: 185, exp: 1250, coins: 1850, drops: ["wp_zhentian_cauldron"] } },
      { id: "cs_3", name: "廣寒星島道場", type: "rest", desc: "仙氣升騰的寧靜星島，可在此吞服聖丹開闢識海。" }
    ]
  },
  {
    id: "region_demon_valley",
    name: "太始魔窟 · 冥淵裂谷",
    levelReq: 35,
    realmReq: "神藏境 1重",
    desc: "諸神寂滅之地的極惡深淵。虛空裂縫縱橫交錯，魔祖真魂在此狂嘯。",
    bgGradient: "linear-gradient(135deg, #2c1239 0%, #582473 100%)",
    nodes: [
      { id: "dv_1", name: "空間斷層絕地", type: "combat", danger: 12, enemy: { name: "冥淵嗜血魔皇分身", hp: 23000, atk: 950, def: 360, exp: 3100, coins: 4600, drops: ["pill_jieying", "ar_xuanwu_armor"] } },
      { id: "dv_2", name: "玄黃祖果古洞", type: "treasure", desc: "生長著萬年太初玄黃神果，霞光萬道瑞氣千條！" },
      { id: "dv_3", name: "修羅血祭封壇", type: "boss", danger: 15, enemy: { name: "萬劫始祖真魂 (通虛初境)", hp: 50000, atk: 1850, def: 620, exp: 8200, coins: 12500, drops: ["wp_shishen_halberd", "pill_huashen"] } }
    ]
  },
  {
    id: "region_immortal_gate",
    name: "九霄登仙古階 · 太初天門",
    levelReq: 50,
    realmReq: "通虛境大圓滿",
    desc: "通往太初真仙聖界的永恆天階。在此將面臨九九無量混沌雷劫的生死審判！",
    bgGradient: "linear-gradient(135deg, #3e2c08 0%, #7f5b13 100%)",
    nodes: [
      { id: "ig_1", name: "混沌天罰道台", type: "boss", danger: 20, enemy: { name: "天道神霄巡界金仙", hp: 125000, atk: 3900, def: 1250, exp: 26000, coins: 52000, drops: ["ar_hundun_lotus_robe", "ac_suiyue_bead"] } }
    ]
  }
];