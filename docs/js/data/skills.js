// 星宿劫源：太初道主 - 60+ 門大荒神通道藏與異火神雷體系
export const SKILLS_DATA = [
  // ===================== 太虛飛劍 (Void Blade) =====================
  {
    id: "tx_gengjin_jian",
    name: "太乙玄庚飛劍式",
    category: "sword",
    categoryName: "神劍道訣",
    rarity: "green",
    rarityName: "靈階初窺",
    power: 1.28,
    qiCost: 22,
    cd: 0,
    target: "single",
    effect: { type: "none" },
    desc: "太虛玄劍宮基礎劍訣，以庚金銳氣灌注本命飛劍，破空化虹。",
    flavor: "{att}並指一劃，一口通體剔透的太乙玄庚劍胚化作金色匹練，撕裂音障直斬{def}！"
  },
  {
    id: "tx_wanhua_kongjian",
    name: "分元斷空劍氣陣",
    category: "sword",
    categoryName: "神劍道訣",
    rarity: "blue",
    rarityName: "地階中位",
    power: 1.68,
    qiCost: 48,
    cd: 1,
    target: "single",
    effect: { type: "armorBreak", val: 0.22, duration: 2 },
    desc: "一劍生萬芒，在虛空中開闢千道細密空間切口，瓦解目標護體罡氣。",
    flavor: "{att}掐動劍訣，身前劍芒驟然分化為三十六道森然劍煞，封鎖四方虛空直逼{def}！"
  },
  {
    id: "tx_xinghe_zhenfa",
    name: "九曜星河劍界",
    category: "sword",
    categoryName: "神劍道訣",
    rarity: "purple",
    rarityName: "天階上位",
    power: 2.30,
    qiCost: 85,
    cd: 2,
    target: "single",
    effect: { type: "comboStrike", hitCount: 4, val: 0.65 },
    desc: "引九天星宿之力化作星辰劍界，劍落如群星墜地，連環轟殺！",
    flavor: "{att}袖袍翻飛引落漫天星宿投影，九道百丈星劍自蒼穹轟然墜落，重重劈向{def}！"
  },
  {
    id: "tx_taixu_juedai",
    name: "太荒寂滅大戮仙劍",
    category: "sword",
    categoryName: "神劍道訣",
    rarity: "red",
    rarityName: "至尊絕品",
    power: 3.60,
    qiCost: 170,
    cd: 3,
    target: "single",
    effect: { type: "ignoreDefense", val: 0.65, duration: 2 },
    desc: "太初開天殺道，一劍斬出，萬法寂滅，神佛難擋！",
    flavor: "{att}周身浮現灰濛混沌氣，本命飛劍化作一道寂滅黑線，無視時空阻隔，悍然貫穿{def}神藏本源！"
  },

  // ===================== 大荒煞火 (Primal Calamity Flame) =====================
  {
    id: "dx_bi_sui_yan",
    name: "幽冥碧髓煞火",
    category: "flame",
    categoryName: "玄煞神火",
    rarity: "blue",
    rarityName: "地階初位",
    power: 1.58,
    qiCost: 42,
    cd: 1,
    target: "single",
    effect: { type: "burn", val: 0.28, duration: 3 },
    desc: "採自幽冥地底萬丈之下的碧髓陰煞神火，專蝕生靈骨髓靈力。",
    flavor: "{att}掌中升騰起森綠碧色冰火，化作火蟒狂噬而至，將{def}護身靈光燃燒出劇烈青煙！"
  },
  {
    id: "dx_danling_guixu",
    name: "大日梵天真陽炎",
    category: "flame",
    categoryName: "玄煞神火",
    rarity: "purple",
    rarityName: "天階中位",
    power: 2.18,
    qiCost: 78,
    cd: 2,
    target: "single",
    effect: { type: "burn", val: 0.45, duration: 3 },
    desc: "凝聚至陽星日之菁華，焚江煮海，觸之瞬化灰燼。",
    flavor: "{att}丹田轟鳴，一道金色炎陽火環如烈日降世般擴散，恐怖高溫令{def}立足之處化為熔岩！"
  },
  {
    id: "dx_fentian_huolian",
    name: "乾坤煞滅混沌火蓮",
    category: "flame",
    categoryName: "玄煞神火",
    rarity: "red",
    rarityName: "至尊絕品",
    power: 3.75,
    qiCost: 190,
    cd: 3,
    target: "single",
    effect: { type: "critExplosion", val: 0.6, duration: 2 },
    desc: "將狂暴相斥的碧髓陰火與大日金炎在丹田熔爐中融合，爆炸威能足以抹平界域！",
    flavor: "{att}神色冷冽，十指在狂暴波瀾中交疊，雙色神火強行揉合成一朵徐徐旋轉的滅世蓮花，輕飄飄飄向{def}胸膛驟然轟爆！"
  },

  // ===================== 神霄劫雷 (Empyrean Tribulation Thunder) =====================
  {
    id: "sx_gengjin_tianlei",
    name: "庚金天罡破邪雷",
    category: "thunder",
    categoryName: "天劫雷法",
    rarity: "blue",
    rarityName: "地階中位",
    power: 1.55,
    qiCost: 38,
    cd: 0,
    target: "single",
    effect: { type: "paralyze", chance: 0.3, duration: 1 },
    desc: "金色庚金神雷，金性至堅至利，擊中可麻痹敵手神魂筋脈。",
    flavor: "{att}凌空一抓，一道燦金雷霆如金槍般脫手擲出，劈啪炸裂間精準洞穿{def}防禦！"
  },
  {
    id: "sx_du_tian_shenlei",
    name: "都天紫極辟邪神雷",
    category: "thunder",
    categoryName: "天劫雷法",
    rarity: "purple",
    rarityName: "天階上位",
    power: 2.35,
    qiCost: 90,
    cd: 2,
    target: "single",
    effect: { type: "demonSlayer", extraVsEvil: 0.55, stunChance: 0.35 },
    desc: "降自九天雷罰本源的神雷，紫氣浩蕩，專克一切陰邪魔道。",
    flavor: "{att}踏步虛空召來都天紫霄雷陣，無數紫蛇狂舞轟落，照亮萬里天幕，狠狠鎮壓{def}！"
  },
  {
    id: "sx_leihai_mieyu",
    name: "混沌九劫都天神罰",
    category: "thunder",
    categoryName: "天劫雷法",
    rarity: "red",
    rarityName: "至尊絕品",
    power: 3.70,
    qiCost: 185,
    cd: 3,
    target: "single",
    effect: { type: "stun", chance: 0.5, duration: 1 },
    desc: "天道太初雷劫源種顯化，黑白混沌雷光劈落，判定萬靈因果！",
    flavor: "{att}引爆體內雷源神印，天地間響起大道天音，混沌雷雲倒灌直下，狂暴天罰將{def}完全吞沒！"
  },

  // ===================== 修羅幽冥與神念 (Soul & Nether) =====================
  {
    id: "wj_shura_sharen",
    name: "滅度神念破魂刺",
    category: "soul",
    categoryName: "太虛神念",
    rarity: "purple",
    rarityName: "天階中位",
    power: 1.95,
    qiCost: 70,
    cd: 1,
    target: "single",
    effect: { type: "silence", duration: 2, manaBurn: 0.25 },
    desc: "神魂力量高度凝聚成無形透骨神刺，直襲神識紫府。",
    flavor: "{att}眉心天眼幽光大綻，無形無質的神識尖刺無聲洞穿虛空，直接釘入{def}識海深處！"
  },
  {
    id: "wj_minghai_tunling",
    name: "萬劫修羅吞靈爪",
    category: "demon",
    categoryName: "幽冥魔功",
    rarity: "purple",
    rarityName: "天階上位",
    power: 2.25,
    qiCost: 75,
    cd: 2,
    target: "single",
    effect: { type: "lifesteal", val: 0.4 },
    desc: "顯化修羅血海巨爪，捏碎目標真元護罩並瘋狂抽取生命本源滋養己身。",
    flavor: "{att}背後升騰起千丈修羅法相，巨爪撕裂天地，緊扣{def}肉身汲取滾滾生機！"
  },

  // ===================== 太初命源心法與身法 (Genesis Arts) =====================
  {
    id: "dx_zaohua_shengxian",
    name: "太初太玄造化神訣",
    category: "internal",
    categoryName: "無上心法",
    rarity: "red",
    rarityName: "至尊絕品",
    power: 1.0,
    qiCost: 115,
    cd: 4,
    target: "self",
    effect: { type: "buffRegen", hpPercent: 0.25, clearDebuffs: true, duration: 3 },
    desc: "源自太初開天第一縷生生不息之靈氣，重塑筋骨，淨化心魔。",
    flavor: "{att}運轉太初造化神訣，周身浮現九朵碧青道蓮，生機如潮汐洶湧，瞬間撫平周身傷痕！"
  },
  {
    id: "yc_guanghan_xuankong",
    name: "踏月九步破虛遁",
    category: "light",
    categoryName: "虛空身法",
    rarity: "purple",
    rarityName: "天階身法",
    power: 1.0,
    qiCost: 55,
    cd: 2,
    target: "self",
    effect: { type: "superDodge", val: 0.6, duration: 2 },
    desc: "踏碎空間漣漪，身融微芒虛空，讓敵手神通徹底落空。",
    flavor: "{att}蓮步微踏，身影分化為九道虛幻月影，飄渺間避開了{def}驚天動地的狂暴攻勢！"
  }
];

// 神通合璧 (Divine Art Combos)
export const KUNGFU_COMBOS = [
  {
    id: "combo_fentian_leihuo",
    name: "雷火焚天滅世劫",
    skills: ["dx_fentian_huolian", "sx_du_tian_shenlei"],
    effectDesc: "煞火與神雷交融：暴擊幾率增加45%，暴擊傷害翻倍！",
    buff: { critBoost: 0.45, critDmgBoost: 1.0 }
  },
  {
    id: "combo_jian_lei_zhen",
    name: "九曜天雷降魔陣",
    skills: ["tx_xinghe_zhenfa", "sx_du_tian_shenlei"],
    effectDesc: "星河飛劍加持辟邪雷：無視目標45%靈罡防禦，命中必定麻痹！",
    buff: { armorPen: 0.45, guaranteedStun: true }
  },
  {
    id: "combo_zaohua_buxiu",
    name: "太初虛空不朽界",
    skills: ["dx_zaohua_shengxian", "yc_guanghan_xuankong"],
    effectDesc: "造化真元與破虛遁共鳴：每回合回復12%氣血，閃避率提升35%！",
    buff: { superRegen: 0.12, dodgeBoost: 0.35 }
  }
];