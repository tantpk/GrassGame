// 星宿劫源：太初道主 - 現代手遊級獨立完整遊戲核心與介面控制器
(function() {
  'use strict';

  // ==================== 1. 遊戲資料庫 (Game Database) ====================
  const SECTS_DATA = [
    {
      id: "taixu_sword",
      name: "太虛玄劍宮",
      title: "蒼瀾九域至高劍道聖地",
      alignName: "古聖仙門",
      desc: "傳承自荒古初闢時期的無上劍宗。以虛空淬劍、星辰養意，飛劍出鞘可斬裂空間壁壘。",
      leader: "扶搖劍尊 (通虛涅槃境)",
      tasks: [
        { id: "tx_t1", name: "天池淬洗本命飛劍", exp: 120, coins: 200, desc: "深入太虛寒玉池引星芒煞氣溫養飛劍靈性。" },
        { id: "tx_t2", name: "觀天劍碑感悟法則", exp: 160, coins: 280, desc: "靜坐斷天崖前體悟開山始祖一劍破界道意。" },
        { id: "tx_t3", name: "清剿虛空裂隙凶獸", exp: 260, coins: 550, desc: "獵殺自星域裂縫湧出的荒古噬空巨魔。" }
      ]
    },
    {
      id: "danxiao_temple",
      name: "丹霄古聖殿",
      title: "太虛神荒丹道總樞",
      alignName: "中立古盟",
      desc: "執掌諸界神火與造化聖藥之總樞。擅長引動天地玄煞神火煉製九轉神丹。",
      leader: "玄牝丹祖 (九品太乙丹聖)",
      tasks: [
        { id: "dx_t1", name: "採擷地脈太荒靈髓", exp: 120, coins: 220, desc: "前往地底深處擷取百年方生一滴的地心熔玉髓。" },
        { id: "dx_t2", name: "引火煉魂周天功", exp: 160, coins: 290, desc: "以三昧神火火意煅燒識海雜質，壯大神識。" },
        { id: "dx_t3", name: "降伏伴生火靈獸", exp: 270, coins: 580, desc: "擊退盤踞在神火池畔暴虐的赤瞳火蜥王。" }
      ]
    },
    {
      id: "wanjie_demon",
      name: "萬劫魔煞宗",
      title: "幽冥黃泉修羅霸道",
      alignName: "幽冥煞門",
      desc: "隱世於幽暗深淵冥海，主張以劫證道、吞噬萬靈煞氣以鑄無上神魔之體。",
      leader: "幽夜煞皇 (通虛境中期)",
      tasks: [
        { id: "wj_t1", name: "冥泉血潭鑄魔刃", exp: 130, coins: 240, desc: "將佩刃沉入萬劫寒冰血泉汲取煞氣煞紋。" },
        { id: "wj_t2", name: "修羅心魔叩關術", exp: 170, coins: 310, desc: "在無盡哀嚎幻境中洗練殺意，不墮狂亂。" },
        { id: "wj_t3", name: "覆滅正道巡界盟", exp: 290, coins: 620, desc: "伏擊並全殲企圖探尋魔宗總壇的偽善大教先鋒。" }
      ]
    }
  ];

  const SKILLS_DATA = [
    { id: "tx_gengjin_jian", name: "太乙玄庚飛劍式", category: "sword", categoryName: "神劍道訣", power: 1.35, qiCost: 20, cd: 0, target: "single", desc: "以太乙庚金銳氣灌注飛劍，破空化虹直斬敵手咽喉。", flavor: "{att} 並指一劃，太乙玄庚飛劍化作金色長虹，撕裂虛空直取 {def}！" },
    { id: "tx_wanhua_kongjian", name: "分元斷空劍氣陣", category: "sword", categoryName: "神劍道訣", power: 1.75, qiCost: 45, cd: 1, target: "single", effect: { type: "armorBreak", val: 0.25, duration: 2 }, desc: "一劍化三十六道森然劍煞，封鎖四方虛空，削弱敵方靈罡防禦。", flavor: "{att} 掐動劍訣，身前劍芒化作漫天劍網，割裂 {def} 護體靈光！" },
    { id: "tx_xinghe_zhenfa", name: "九曜星河劍界", category: "sword", categoryName: "神劍道訣", power: 2.35, qiCost: 80, cd: 2, target: "single", effect: { type: "comboStrike", hitCount: 4, val: 0.65 }, desc: "引九天星宿之力化作星辰劍界，劍落如群星墜地，連環轟殺！", flavor: "{att} 袖袍引落漫天星宿投影，九道百丈星劍自蒼穹轟然劈向 {def}！" },
    { id: "tx_taixu_juedai", name: "太荒寂滅大戮仙劍", category: "sword", categoryName: "神劍道訣", power: 3.70, qiCost: 160, cd: 3, target: "single", effect: { type: "ignoreDefense", val: 0.65, duration: 2 }, desc: "太初開天殺道，一劍斬出萬法寂滅，神佛難擋！", flavor: "{att} 本命飛劍化作一道寂滅黑線，無視防禦貫穿 {def} 神藏本源！" },
    { id: "dx_bi_sui_yan", name: "幽冥碧髓煞火", category: "flame", categoryName: "玄煞神火", power: 1.60, qiCost: 40, cd: 1, target: "single", effect: { type: "burn", val: 0.3, duration: 3 }, desc: "採自幽冥地底之碧髓陰煞神火，專蝕生靈骨髓靈力。", flavor: "{att} 掌中升騰起森綠冰火，化作火蟒將 {def} 護身靈光燃燒出青煙！" },
    { id: "dx_fentian_huolian", name: "乾坤煞滅混沌火蓮", category: "flame", categoryName: "玄煞神火", power: 3.85, qiCost: 180, cd: 3, target: "single", effect: { type: "critExplosion", val: 0.6, duration: 2 }, desc: "將狂暴相斥之雙色神火在丹田熔爐中融合，爆炸威能毀天滅地！", flavor: "{att} 雙手翻飛將神火揉合成一朵旋轉火蓮，在 {def} 胸膛驟然轟爆！" },
    { id: "sx_du_tian_shenlei", name: "都天紫極辟邪神雷", category: "thunder", categoryName: "天劫雷法", power: 2.45, qiCost: 85, cd: 2, target: "single", effect: { type: "paralyze", chance: 0.4, duration: 1 }, desc: "九天雷罰本源神雷，紫光煌煌，專克一切陰邪魔道並施加麻痹。", flavor: "{att} 召來都天紫極雷陣，無數紫霄雷蟒狂舞轟落，將 {def} 狠狠鎮壓！" },
    { id: "dx_zaohua_shengxian", name: "太初太玄造化神訣", category: "internal", categoryName: "無上心法", power: 1.0, qiCost: 110, cd: 4, target: "self", effect: { type: "buffRegen", hpPercent: 0.25, duration: 3 }, desc: "源自太初開天之生生不息靈氣，重塑筋骨，淨化心魔。", flavor: "{att} 運轉太初造化神訣，周身浮現九朵碧青道蓮，生機如潮汐洶湧！" },
    { id: "yc_guanghan_xuankong", name: "踏月九步破虛遁", category: "light", categoryName: "虛空身法", power: 1.0, qiCost: 50, cd: 2, target: "self", effect: { type: "superDodge", val: 0.6, duration: 2 }, desc: "踏碎空間漣漪，身融微芒虛空，讓敵手神通徹底落空。", flavor: "{att} 身影分化為九道虛幻月影，飄渺間避開了 {def} 驚天動地的攻勢！" }
  ];

  const KUNGFU_COMBOS = [
    { id: "combo_fentian_leihuo", name: "雷火焚天滅世劫", skills: ["dx_fentian_huolian", "sx_du_tian_shenlei"], effectDesc: "煞火與神雷交融：暴擊率 +45%，暴擊傷害翻倍！" },
    { id: "combo_jian_lei_zhen", name: "九曜天雷降魔陣", skills: ["tx_xinghe_zhenfa", "sx_du_tian_shenlei"], effectDesc: "星河飛劍加持辟邪雷：無視目標 45% 防禦，命中必定麻痹！" },
    { id: "combo_zaohua_buxiu", name: "太初虛空不朽界", skills: ["dx_zaohua_shengxian", "yc_guanghan_xuankong"], effectDesc: "造化真元與破虛遁共鳴：每回合回復 12% 氣血，閃避率 +35%！" }
  ];

  const MERIDIANS_DATA = [
    {
      id: "wuxing_root",
      name: "太初五極本源天脈",
      title: "五極混沌道脈",
      points: [
        { id: "root_jin", name: "庚金煞穴", reqQi: 200, atk: 50, crit: 3, desc: "金之至利，破盡萬物" },
        { id: "root_mu", name: "青乙生竅", reqQi: 500, hp: 500, mp: 120, desc: "木之長生，生生不息" },
        { id: "root_shui", name: "玄冥靈府", reqQi: 1000, mp: 280, def: 40, desc: "水之化勁，四兩千斤" },
        { id: "root_huo", name: "焚天火脈", reqQi: 1800, atk: 130, crit: 7, desc: "火之狂暴，焚滅諸天" },
        { id: "root_tu", name: "太荒坤宮", reqQi: 3000, hp: 1300, def: 90, desc: "土之厚載，固若金湯" }
      ],
      bonus: { name: "混沌五行歸真", desc: "五極圓滿：全屬性抗性 +30%，神通威力 +28%。" }
    },
    {
      id: "soul_sea",
      name: "太虛識海神念宮",
      title: "紫府金蓮神念",
      points: [
        { id: "soul_1", name: "靈犀初醒", reqQi: 300, mp: 180, atk: 35 },
        { id: "soul_2", name: "神念如絲", reqQi: 800, mp: 380, speed: 22 },
        { id: "soul_3", name: "紫府金蓮", reqQi: 1600, mp: 750, def: 55 },
        { id: "soul_4", name: "元神夜遊", reqQi: 2800, mp: 1300, crit: 9 }
      ],
      bonus: { name: "太虛天心通", desc: "神識大成：心魔抗性 100%，戰鬥中每回合削去敵手 15% 真元。" }
    }
  ];

  const ITEMS_DATA = [
    // 武器道兵 (跨 9 大境界)
    { id: "wp_qingfeng_sword", name: "青鋒流雲鐵劍", type: "weapon", slot: "weapon", rarity: "green", minRealm: 0, price: 450, stats: { atk: 85, speed: 8 }, desc: "青玄道域散修常用飛劍，輕靈迅捷。" },
    { id: "wp_taiyi_swords", name: "太乙玄庚飛劍(三十六柄)", type: "weapon", slot: "weapon", rarity: "purple", minRealm: 0, price: 3500, stats: { atk: 195, crit: 9, speed: 18 }, desc: "採太古庚金之精鍛打九九八十一載，自帶辟邪金芒。" },
    { id: "wp_chixiao_blade", name: "赤霄焚血魔刀", type: "weapon", slot: "weapon", rarity: "purple", minRealm: 1, price: 4800, stats: { atk: 275, crit: 14 }, desc: "殞神墟古魔遺留戰刀，飲血後刀芒暴漲。" },
    { id: "wp_zhentian_cauldron", name: "混元鎮天定天鼎", type: "weapon", slot: "weapon", rarity: "orange", minRealm: 2, price: 9000, stats: { atk: 420, def: 110 }, desc: "祭出化作巍峨神嶽，引萬鈞鎮壓之力鎮殺敵手。" },
    { id: "wp_ziwei_star_spear", name: "紫微破界星辰槍", type: "weapon", slot: "weapon", rarity: "orange", minRealm: 3, price: 15000, stats: { atk: 580, speed: 35, crit: 18 }, desc: "引九天紫微星核鍛造，一槍洞穿虛空壁壘。" },
    { id: "wp_shishen_halberd", name: "太古戮界凶神戈", type: "weapon", slot: "weapon", rarity: "red", minRealm: 4, price: 26000, stats: { atk: 860, crit: 28 }, desc: "太初古界崩塌時誕生的凶物，殺意滔天，斬仙滅魔！" },
    { id: "wp_taichu_dao_sword", name: "鴻蒙太初開天劍", type: "weapon", slot: "weapon", rarity: "red", minRealm: 6, price: 68000, stats: { atk: 1650, crit: 38, speed: 60 }, desc: "太初道主本命至高神兵，一劍生萬法，萬界共尊！" },

    // 護體仙甲 (跨 9 大境界)
    { id: "ar_taixu_robe", name: "太虛流雲天絲道袍", type: "armor", slot: "armor", rarity: "blue", minRealm: 0, price: 650, stats: { hp: 550, def: 65 }, desc: "以九天星絲紡織而成，防塵防水，削弱法術侵襲。" },
    { id: "ar_jinlin_mail", name: "紫金蛟鱗內甲", type: "armor", slot: "armor", rarity: "purple", minRealm: 1, price: 2200, stats: { hp: 1450, def: 165 }, desc: "剝取八階吞魂蛟逆鱗編織，水火不侵。" },
    { id: "ar_xuanwu_armor", name: "玄武鎮嶽霸天甲", type: "armor", slot: "armor", rarity: "purple", minRealm: 2, price: 3800, stats: { hp: 2600, def: 280 }, desc: "上古玄武蛻甲所製，能硬扛三九天劫神雷而不毀。" },
    { id: "ar_xiuluo_battle_plate", name: "萬劫修羅血煞鎧", type: "armor", slot: "armor", rarity: "orange", minRealm: 3, price: 11000, stats: { hp: 4600, def: 420, atk: 150 }, desc: "太始魔窟至寶，受擊時將煞氣轉化為殺伐之力。" },
    { id: "ar_hundun_lotus_robe", name: "太初青蓮護體天衣", type: "armor", slot: "armor", rarity: "red", minRealm: 4, price: 28000, stats: { hp: 8200, def: 680 }, desc: "混沌青蓮葉片化形之仙衣，萬法不沾，反震神通！" },

    // 本命奇寶 (跨 9 大境界)
    { id: "ac_bichen_jade", name: "清心辟塵玉佩", type: "accessory", slot: "accessory", rarity: "blue", minRealm: 0, price: 900, stats: { mp: 420, speed: 12 }, desc: "溫潤古玉，時刻散發清涼之意鎮壓心魔。" },
    { id: "ac_dinghai_pearl", name: "定海辟塵靈珠", type: "accessory", slot: "accessory", rarity: "purple", minRealm: 1, price: 3200, stats: { mp: 850, dodge: 12, speed: 28 }, desc: "封印靈海之重，安神鎮魂，消除心魔。" },
    { id: "ac_xingchen_astrolabe", name: "九曜周天星盤", type: "accessory", slot: "accessory", rarity: "orange", minRealm: 2, price: 9500, stats: { mp: 1850, crit: 15, speed: 42 }, desc: "推演周天星宿軌跡，大幅提升大荒尋寶與暴擊率。" },
    { id: "ac_suiyue_bead", name: "太初歲漏玉鑑(本命)", type: "accessory", slot: "accessory", rarity: "red", minRealm: 3, price: 55000, stats: { hp: 3800, mp: 2800, speed: 55 }, desc: "開天造化古寶，逆轉歲月時光，修為與真元暴漲！" },

    // 九品丹藥庫
    { id: "pill_juyuan", name: "一品·青靈聚元丹", type: "consumable", rarity: "green", minRealm: 0, price: 150, effect: { addExp: 680, addQi: 150 }, desc: "凝魄境常用靈丹，穩固氣海。" },
    { id: "pill_zhuji", name: "三品·三清凝液通脈丹", type: "consumable", rarity: "purple", minRealm: 0, price: 320, effect: { addExp: 1600, addQi: 320 }, desc: "衝擊洞天境必備神丹，溫和化脈，洗去凡軀雜氣。" },
    { id: "pill_jiangchen", name: "五品·道胎絳霞造化丸", type: "consumable", rarity: "orange", minRealm: 1, price: 1300, effect: { addExp: 6500, addQi: 1600 }, desc: "孕育本命道胎之至寶，引下丹道霞光，洗刷經脈。" },
    { id: "pill_jieying", name: "七品·神藏破界九轉真丹", type: "consumable", rarity: "red", minRealm: 2, price: 5200, effect: { addExp: 32000, addQi: 8500, fullHeal: true }, desc: "開啟體內五大神藏之仙丹，破境成功率倍增！" },
    { id: "pill_niepan", name: "九品·太虛涅槃不滅金丹", type: "consumable", rarity: "red", minRealm: 4, price: 18000, effect: { addExp: 130000, addQi: 32000, fullHeal: true }, desc: "九品通靈聖丹，出爐引動天地丹劫，白骨生肉！" },

    // 天材地寶、靈草、異火火種與古卷
    { id: "herb_sanqing", name: "三清玄草", type: "material", rarity: "green", minRealm: 0, price: 100, desc: "生長於青玄靈脈之三葉靈草，煉丹基礎主料。" },
    { id: "herb_ziyang", name: "紫陽靈芝", type: "material", rarity: "blue", minRealm: 1, price: 300, desc: "吸收天外紫陽精華之古芝，具備延壽拓脈奇效。" },
    { id: "herb_taixu", name: "太虛萬年玄參", type: "material", rarity: "purple", minRealm: 2, price: 800, desc: "萬年玄虛地脈滋養之參王，七品以上神丹核心主料。" },
    { id: "herb_fengxue", name: "涅槃鳳血聖草", type: "material", rarity: "orange", minRealm: 3, price: 2200, desc: "沐浴古神凰真血而生之聖藥，煉製九品金丹必備。" },
    { id: "mat_gengjin_ore", name: "太白庚金煞石", type: "material", rarity: "blue", minRealm: 0, price: 260, desc: "蘊含鋒銳金煞之礦石，用於祭煉本命道兵。" },
    { id: "mat_star_iron", name: "九天碎星寒鐵", type: "material", rarity: "purple", minRealm: 1, price: 680, desc: "自無垠星河墜落的星核寒鐵，改裝太虛星槎與傀儡主材。" },
    { id: "mat_flame_seed", name: "大荒異火本源火種", type: "material", rarity: "orange", minRealm: 1, price: 3200, desc: "蘊含狂暴神火本源，可投入雙生熔爐融煉火蓮。" },
    { id: "mat_thunder_source", name: "神霄紫極雷源晶", type: "material", rarity: "orange", minRealm: 2, price: 3500, desc: "封存九天劫雷之力的雷晶，雙生熔爐煉雷必備。" },
    { id: "mat_ancient_scroll", name: "《太初開天道藏殘卷》", type: "material", rarity: "red", minRealm: 2, price: 6000, desc: "記載上古失傳大神通之玉簡，可用於自創神通或參悟。" }
  ];

  // 隨機裝備詞條池 (Procedural Affix Pool)
  const RANDOM_AFFIX_POOL = [
    { id: "af_crit", name: "太乙鋒芒", desc: "會心暴擊 +12%", stat: "crit", bonus: 12 },
    { id: "af_atk", name: "修羅殺意", desc: "神通殺力 +145", stat: "atk", bonus: 145 },
    { id: "af_shield", name: "玄武罡氣", desc: "護體真元盾 +28%", stat: "def", bonus: 95 },
    { id: "af_vamp", name: "吞天噬靈", desc: "攻擊汲血 +15%", stat: "hp", bonus: 650 },
    { id: "af_speed", name: "破虛殘影", desc: "虛空遁速 +26", stat: "speed", bonus: 26 },
    { id: "af_thunder", name: "紫霄雷罰", desc: "命中附加雷暴真傷 +380", stat: "atk", bonus: 180 },
    { id: "af_epoch", name: "歲月道韻", desc: "吐納與探索元氣 +25%", stat: "mp", bonus: 420 },
    { id: "af_pen", name: "混沌破甲", desc: "無視敵方防禦 +30%", stat: "atk", bonus: 210 }
  ];

  // 跨 9 大境界動態解鎖與重構的大荒位面地圖庫 (9 Realm-Scaled World Planes)
  const MAPS_DATA = [
    {
      id: "region_tiannan",
      minRealm: 0,
      name: "【凡域·壹】蒼瀾古陸 · 青玄道域",
      realmReq: "凝魄境 (第1重解鎖)",
      realmMechanic: "🌱 凡域初探：開放靈草採集、坊市互換與基礎劍陣試煉",
      desc: "連綿萬里的古老靈脈道域，青山如黛，乃散修與各派仙緣起點。",
      bgGradient: "linear-gradient(180deg, #faf7f0 0%, #e6dfd0 100%)",
      lootPool: ["wp_qingfeng_sword", "ar_taixu_robe", "pill_juyuan", "herb_sanqing", "mat_gengjin_ore"],
      nodes: [
        { id: "tn_1", name: "棲霞山散修坊市", type: "market", desc: "群修齊聚，叫賣法符與靈種，偶現蒙塵古寶。" },
        { id: "tn_2", name: "靈泉斷天涯古洞", type: "rest", desc: "靈霧繚繞的幽谷，隱藏著坐化古修的雲篆陣盤。" },
        { id: "tn_3", name: "血妖門劫掠哨卡", type: "combat", enemy: { name: "血妖門護法魔修", avatar: "🧛‍♂️", hp: 1450, atk: 135, def: 38, exp: 320, coins: 350 } }
      ]
    },
    {
      id: "region_blood_trial",
      minRealm: 1,
      name: "【禁域·貳】荒古禁域 · 殞神墟",
      realmReq: "洞天境 (第1重解鎖)",
      realmMechanic: "🔥 境界重構：解鎖【地底異火火種捕獲】與【古神青銅謎盤】",
      desc: "三百年方現一次的古神埋骨遺址。空間裂隙遍布，孕育碧髓煞火！",
      bgGradient: "linear-gradient(180deg, #fdf6f4 0%, #eaded8 100%)",
      lootPool: ["wp_taiyi_swords", "wp_chixiao_blade", "ar_jinlin_mail", "pill_zhuji", "herb_ziyang", "mat_flame_seed"],
      nodes: [
        { id: "bt_1", name: "萬劫血海異火潭", type: "event", desc: "地底萬丈陰煞匯聚，可嘗試收服【幽冥碧髓煞火】火種！" },
        { id: "bt_2", name: "青銅葬仙星宿殿", type: "puzzle", desc: "十二星宿雲篆禁制封鎖的古殿，解開謎盤可獲純陽道兵！" },
        { id: "bt_3", name: "古墟天樞陣樞 (首領)", type: "boss", enemy: { name: "赤目修羅狂客 (洞天霸主)", avatar: "👹", hp: 4800, atk: 290, def: 95, exp: 1200, coins: 1500 } }
      ]
    },
    {
      id: "region_chaos_star",
      minRealm: 2,
      name: "【星域·叁】無垠太虛星河 · 天樞聖城",
      realmReq: "道胎境 (第1重解鎖)",
      realmMechanic: "🌌 境界重構：解鎖【星槎跨界貿易】、【黑市設伏奪寶】與【九天雷源採集】",
      desc: "懸浮於星河之巔的不朽古天城。萬星閃耀，跨界商盟與道胎老怪雲集。",
      bgGradient: "linear-gradient(180deg, #f2f6f7 0%, #dfe6e8 100%)",
      lootPool: ["wp_zhentian_cauldron", "ar_xuanwu_armor", "ac_xingchen_astrolabe", "pill_jiangchen", "herb_taixu", "mat_thunder_source"],
      nodes: [
        { id: "cs_1", name: "天樞拍賣行 · 出城截殺", type: "auction_ambush", desc: "拍賣會壓軸《太初神火殘圖》出爐，出城必遭道胎老怪截殺！" },
        { id: "cs_2", name: "九霄雷暴碎星帶", type: "event", desc: "狂暴星域雷霆交織，可引神雷淬體並採集【紫極雷源晶】！" },
        { id: "cs_3", name: "碎星深空魔穴 (首領)", type: "boss", enemy: { name: "八階紫鱗吞魂蛟 (星海妖尊)", avatar: "🐉", hp: 11500, atk: 520, def: 180, exp: 3200, coins: 3500 } }
      ]
    },
    {
      id: "region_stygian_abyss",
      minRealm: 3,
      name: "【魔域·肆】太始魔窟 · 冥淵裂谷",
      realmReq: "神藏境 (第1重解鎖)",
      realmMechanic: "🩸 境界重構：神念離體探寶、獵殺元神魔尊、掉落造化級紅裝",
      desc: "位於九幽深淵底部的極惡絕地，萬古魔祖沉睡之所，遍地太古魔寶。",
      bgGradient: "linear-gradient(180deg, #f5f0f6 0%, #e5dce6 100%)",
      lootPool: ["wp_ziwei_star_spear", "ar_xiuluo_battle_plate", "ac_suiyue_bead", "pill_jieying", "herb_fengxue", "mat_ancient_scroll"],
      nodes: [
        { id: "sa_1", name: "玄黃祖果古魔洞", type: "event", desc: "魔氣森然的古洞，以強大神念橫掃禁制可奪取萬年鳳血草！" },
        { id: "sa_2", name: "修羅血祭帝壇 (首領)", type: "boss", enemy: { name: "萬劫始祖真魂 (太古魔尊)", avatar: "👿", hp: 26000, atk: 980, def: 320, exp: 8500, coins: 8000 } }
      ]
    },
    {
      id: "region_primordial_gate",
      minRealm: 4,
      name: "【仙域·伍至玖】九霄登仙古階 · 太初天門",
      realmReq: "通虛境 ~ 太初道主",
      realmMechanic: "👑 終極位面：法則碎片共鳴、自創無上大道、迎戰天道巡界金仙",
      desc: "橫跨通虛、星宿真王、乾坤界主至太初道主的至高神域，直通鴻蒙真仙界！",
      bgGradient: "linear-gradient(180deg, #fbf7ec 0%, #e8dec8 100%)",
      lootPool: ["wp_shishen_halberd", "wp_taichu_dao_sword", "ar_hundun_lotus_robe", "ac_suiyue_bead", "pill_niepan", "mat_ancient_scroll"],
      nodes: [
        { id: "pg_1", name: "歲月時光長河渡口", type: "event", desc: "俯瞰諸天興衰因果，參悟《太初開天道藏殘卷》與鴻蒙紫氣！" },
        { id: "pg_2", name: "混沌天罰審判道台 (終極首領)", type: "boss", enemy: { name: "天道神霄巡界金仙 (法則化身)", avatar: "👼⚡", hp: 68000, atk: 2100, def: 650, exp: 28000, coins: 25000 } }
      ]
    }
  ];

  const ABYSS_RELICS_DATA = [
    { id: "relic_jian_mang", name: "青蓮飛劍彈射印", desc: "飛劍神通命中後向隨機敵方彈射一次，造成 60% 傷害。" },
    { id: "relic_gengjin_feng", name: "庚金太煞破甲印", desc: "全神通破甲率提升至 100%，無視一切護體靈罡。" },
    { id: "relic_jian_lei_chong", name: "神霄辟邪雷爆印", desc: "飛劍暴擊時引發全屏辟邪天雷，造成 200% 雷暴傷害！" },
    { id: "relic_ming_xue_jia", name: "修羅血煞反傷印", desc: "受傷時將所受傷害的 150% 反彈給攻擊者。" },
    { id: "relic_busi_zhi_xin", name: "神魔不滅鎖血印", desc: "瀕死時強制鎖血 1 點並獲得 5 秒無敵狀態！" }
  ];

  const FORMATIONS_DATA = [
    { id: "tian_gang", name: "天罡北斗伏魔陣", icon: "⚔️⭐", counter: "專克：高防靈罡肉盾流 / 護盾妖獸", previewDiff: "神通殺力 +18% ↑ ｜ 破甲率 +40% ↑ ｜ 遁速 +25 ↑", desc: "天盤主殺：全隊破甲 +40%，遁速 +25，命中率 100%", buff: "破甲 +40%" },
    { id: "jiu_gong", name: "九宮八卦兩儀陣", icon: "☯️🛡️", counter: "專克：高爆發劍修 / 狂暴刺客流", previewDiff: "道紋靈罡 +30% ↑ ｜ 受擊反震 +35% ↑ ｜ 暴傷減免 +25% ↑", desc: "地盤主化：受擊反震 35%，全五行抗性 +30%", buff: "反震 +35%" },
    { id: "qing_long", name: "青龍七宿生生陣", icon: "🐉🌿", counter: "專克：神火灼燒流 / 萬劫淵持久消耗戰", previewDiff: "每回合回血 +12% ↑ ｜ 護體真元 +25% ↑ ｜ 異常免疫", desc: "人盤主生：每回合回復全體 12% 氣血，免疫灼燒", buff: "回春 +12%" },
    { id: "zhou_tian", name: "周天星斗混元大陣", icon: "🌌👑", counter: "專克：全流派壓制（太古鎮族聖陣）", previewDiff: "全屬性 +28% ↑ ｜ 暴擊率 +25% ↑ ｜ 開局真元盾翻倍", desc: "星盤主宰：引三百六十五顆主星之力，全維度碾壓敵手", buff: "全維 +28%", unlockReq: "洞天境5重 或 800靈石解鎖" }
  ];

  const ALCHEMY_RECIPES_DATA = [
    { id: "rec_zhuji", name: "三清凝液通脈丹", reqHerbs: [{ id: "herb_sanqing", name: "三清玄草", count: 2 }], targetPillId: "pill_zhuji", desc: "三品靈丹，拓寬氣海，大幅增長修為。" },
    { id: "rec_jiangchen", name: "道胎絳霞造化丸", reqHerbs: [{ id: "herb_ziyang", name: "紫陽靈芝", count: 2 }], targetPillId: "pill_jiangchen", desc: "五品寶丹，引下丹道霞光，破境率 +20%。" },
    { id: "rec_jieying", name: "神藏破界九轉真丹", reqHerbs: [{ id: "herb_taixu", name: "太虛玄參", count: 2 }], targetPillId: "pill_jieying", desc: "七品玄丹，開闢五大神藏，出爐引發丹劫天雷！" }
  ];

  // ==================== 2. 核心音訊合成器 (Web Audio API) ====================
  class WuxiaAudioEngine {
    constructor() {
      this.ctx = null;
      this.bgmPlaying = false;
      this.bgmTimer = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.2) {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    }

    playSwordClash() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }

    playLevelUp() {
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((f, i) => {
        setTimeout(() => this.playTone(f, 'sine', 0.5, 0.25), i * 100);
      });
    }

    playQiCharge() {
      this.playTone(440, 'triangle', 0.45, 0.18);
      setTimeout(() => this.playTone(587.33, 'sine', 0.35, 0.12), 90);
    }

    playEpiphanyBell() {
      // 靈台頓悟清脆古鐘與泛音
      this.playTone(523.25, 'sine', 0.9, 0.25);
      setTimeout(() => this.playTone(783.99, 'sine', 1.1, 0.22), 80);
      setTimeout(() => this.playTone(1046.5, 'triangle', 1.4, 0.18), 160);
    }

    playThunder() {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // 1. 低頻雷爆轟鳴 (60Hz超低頻天雷衝擊波)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.65);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);

      // 2. 白噪聲雷煞撕裂破空
      try {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.11));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.exponentialRampToValueAtTime(160, now + 0.45);
        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(0.3, now);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        noise.connect(filter);
        filter.connect(nGain);
        nGain.connect(this.ctx.destination);
        noise.start(now);
      } catch (e) {
        this.playTone(65, 'triangle', 0.5, 0.35);
      }
    }

    toggleBGM() {
      if (this.bgmPlaying) {
        this.bgmPlaying = false;
        if (this.bgmTimer) clearTimeout(this.bgmTimer);
      } else {
        this.init();
        if (!this.ctx) return false;
        this.bgmPlaying = true;
        const scale = [220, 247, 277, 330, 370, 440];
        const loop = () => {
          if (!this.bgmPlaying) return;
          const f = scale[Math.floor(Math.random() * scale.length)];
          this.playTone(f, 'triangle', 1.5, 0.08);
          this.bgmTimer = setTimeout(loop, 900 + Math.random() * 800);
        };
        loop();
      }
      return this.bgmPlaying;
    }
  }

  const audio = new WuxiaAudioEngine();

  // ==================== 3. 角色模型與數值管道 ====================
  class Character {
    constructor(saved = {}) {
      this.name = saved.name || "陸沉舟";
      this.gender = saved.gender || "male";
      this.realmIndex = saved.realmIndex || 0;
      this.realmLayer = saved.realmLayer || 1;
      this.exp = saved.exp || 100;
      this.qi = saved.qi || 150;
      this.silver = saved.silver || 800;
      this.ingots = saved.ingots || 150;

      this.strength = saved.strength || 22;
      this.agility = saved.agility || 20;
      this.rootBone = saved.rootBone || 24;
      this.comprehension = saved.comprehension || 25;
      this.luck = saved.luck || 20;

      this.sectId = saved.sectId || "taixu_sword";
      this.sectContribution = saved.sectContribution || 120;

      this.learnedSkills = saved.learnedSkills || ["tx_gengjin_jian", "dx_bi_sui_yan"];
      this.equippedSkills = saved.equippedSkills || ["tx_gengjin_jian", "dx_bi_sui_yan"];
      this.unlockedAcupoints = saved.unlockedAcupoints || ["root_jin"];

      this.equipSlots = saved.equipSlots || {
        weapon: "wp_taiyi_swords",
        armor: "ar_taixu_robe",
        accessory: "ac_dinghai_pearl"
      };

      this.inventory = saved.inventory || [
        { id: "pill_zhuji", count: 4 },
        { id: "pill_jiangchen", count: 2 },
        { id: "wp_zhentian_cauldron", count: 1 },
        { id: "ar_xuanwu_armor", count: 1 },
        { id: "herb_sanqing", count: 4 },
        { id: "herb_ziyang", count: 2 }
      ];

      this.garden = saved.garden || [
        { slot: 0, herbId: "herb_sanqing", name: "三清玄草", progress: 100, status: "可採擷" },
        { slot: 1, herbId: "herb_ziyang", name: "紫陽靈芝", progress: 60, status: "生長中 (60%)" },
        { slot: 2, herbId: "herb_taixu", name: "太虛玄參", progress: 20, status: "生長中 (20%)" }
      ];
      this.epochDew = saved.epochDew !== undefined ? saved.epochDew : 3;

      this.puppets = saved.puppets || [
        { id: "pup_1", name: "天罡青甲衛", avatar: "🛡️🤖", role: "前排肉盾", stars: 3, level: 4, bond: 75, part: "玄龜反震甲核", comboDesc: "與主角連攜：開場替主角分擔 45% 傷害並反震", hp: 4200, atk: 180, status: "出戰中" },
        { id: "pup_2", name: "神霄破空連弩機", avatar: "🏹⚡", role: "後排輸出", stars: 3, level: 3, bond: 68, part: "紫電穿雲弩臂", comboDesc: "與主角連攜：主角施放絕學時追加一輪雷矢齊射", hp: 2400, atk: 410, status: "出戰中" },
        { id: "pup_3", name: "青蓮回春靈偶", avatar: "💚🧚", role: "治療輔助", stars: 2, level: 2, bond: 50, part: "甘霖聚靈玉心", comboDesc: "與主角連攜：每回合為全隊回復 10% 氣血並淨化心魔", hp: 2800, atk: 160, status: "待命採礦中" }
      ];

      this.currentFormation = saved.currentFormation || "tian_gang";
      this.abyssFloor = saved.abyssFloor || 1;
      this.abyssRelics = saved.abyssRelics || ["relic_jian_mang"];
      this.lastCultivateTime = saved.lastCultivateTime || Date.now();

      // 新增：提升「想玩」動機與沉浸回饋狀態
      this.todayExp = saved.todayExp !== undefined ? saved.todayExp : 520;
      this.dailyGoalExp = saved.dailyGoalExp || 1500;
      this.efficientBreathsLeft = saved.efficientBreathsLeft !== undefined ? saved.efficientBreathsLeft : 18;
      this.maxEfficientBreaths = 20;
      this.moodText = saved.moodText || "丹田元海微瀾，周天星辰靈氣正順天脈緩緩匯入氣海…";
      this.daoExpanded = saved.daoExpanded || false;
      this.destinyExpanded = saved.destinyExpanded || false;
      this.scrollNoticeExpanded = saved.scrollNoticeExpanded || false;
      this.cameraMode = saved.cameraMode || "closeup"; // closeup | panoramic
      // v9.0 七大系統深度養成狀態
      this.equipEnhance = saved.equipEnhance || { weapon: 3, armor: 2, accessory: 2 };
      this.itemAffixes = saved.itemAffixes || {
        wp_taiyi_swords: [
          { name: "太乙鋒芒", desc: "會心暴擊 +12%" },
          { name: "紫霄雷罰", desc: "命中附加雷暴真傷 +380" }
        ],
        ar_taixu_robe: [{ name: "玄武罡氣", desc: "護體真元盾 +28%" }],
        ac_dinghai_pearl: [{ name: "歲月道韻", desc: "吐納與探索元氣 +25%" }],
        wp_zhentian_cauldron: [{ name: "混沌破甲", desc: "無視敵方防禦 +30%" }, { name: "修羅殺意", desc: "神通殺力 +145" }],
        ar_xuanwu_armor: [{ name: "吞天噬靈", desc: "攻擊汲血 +15%" }]
      };
      this.grottoSubTab = saved.grottoSubTab || "cultivate"; // cultivate | furnace | divination | tribulation
      this.sectSubTab = saved.sectSubTab || "ancient";       // ancient | dynasty
      this.marketSubTab = saved.marketSubTab || "silkroad";  // silkroad | auction | arena | billing
      this.mapViewRealmFilter = saved.mapViewRealmFilter !== undefined ? saved.mapViewRealmFilter : -1; // -1 = 隨當前境界自動適配 + 顯示全部已解鎖
      this.combatSpeedMode = saved.combatSpeedMode || "normal"; // slow (3000ms) | normal (2100ms) | fast (1100ms)

      // 雙生熔爐（異火與劫雷）
      this.flamesOwned = saved.flamesOwned || ["幽冥碧髓煞火", "大日梵天真陽炎"];
      this.thundersOwned = saved.thundersOwned || ["庚金天罡破邪雷", "都天紫極辟邪神雷"];
      this.furnaceFusedLevel = saved.furnaceFusedLevel || 2;

      // 紫微天機卜卦
      this.divinationState = saved.divinationState || { title: "大吉 · 紫微高照", bonusDesc: "大荒探索隨機掉落數量 +1、極品詞條機率 +35%！", mult: 1.35 };

      // 荒古不滅霸王軀 (五階鍛體)
      this.bodyStagesUnlocked = saved.bodyStagesUnlocked || ["body_1", "body_2"];

      // 宗門職級與開宗立派 (自立太初道門)
      this.sectRankIndex = saved.sectRankIndex !== undefined ? saved.sectRankIndex : 1; // 0:道童 1:執劍侍 2:真傳劍子 3:護法長老 4:聖門之尊
      this.ownSect = saved.ownSect || {
        founded: true,
        name: "太初萬界道門",
        level: 3,
        prestige: 1850,
        disciples: [
          { name: "葉孤雲", root: "先天庚金劍胎", role: "親傳劍子 (出戰助陣)", power: 4500 },
          { name: "蘇沐清", root: "太乙青木靈脈", role: "百草仙圃執事 (靈草產量+40%)", power: 3200 },
          { name: "石破天", root: "荒古霸體血脈", role: "神兵坊首座 (自動鍛造玄鐵)", power: 3900 }
        ]
      };

      // 太虛星槎跨界商道
      this.starShip = saved.starShip || {
        level: 2,
        cannonLv: 3,
        shieldLv: 2,
        cargoCap: 50,
        currentPlane: "蒼瀾古陸",
        cargo: { "三清靈草匣": 10, "太始魔髓晶": 4 }
      };

      // 星天論劍 PvP 天梯積分
      this.eloRating = saved.eloRating || 1680;
      this.customSkill = saved.customSkill || { name: "太初萬劍歸宗訣", power: 4.2, desc: "陸沉舟自創本命大道劍陣，萬劍齊發貫穿星河！" };
      this.expandedEquipSlot = saved.expandedEquipSlot || null;
      this.lockedItems = saved.lockedItems || ["wp_taiyi_swords"];
      this.quickSlotItem = saved.quickSlotItem || "pill_zhuji";
      this.selectedBagItem = saved.selectedBagItem || "wp_zhentian_cauldron";
      this.soulNodeLevels = saved.soulNodeLevels || { soul_1: 2, soul_2: 1, soul_3: 0, soul_4: 0 };
      this.skillLevels = saved.skillLevels || { tx_gengjin_jian: 3, dx_bi_sui_yan: 2, dx_fentian_huolian: 2, sx_du_tian_shenlei: 2, tx_xinghe_zhenfa: 1 };
      this.formationLevels = saved.formationLevels || { tian_gang: 2, jiu_gong: 1, qing_long: 1, zhou_tian: 1 };
      this.unlockedFormations = saved.unlockedFormations || ["tian_gang", "jiu_gong", "qing_long"];
      this.abyssPendingDraft = saved.abyssPendingDraft || null;
      this.abyssNodeChoices = saved.abyssNodeChoices || null;
      this.dailyExploreCount = saved.dailyExploreCount || 0;
      this.dailyExploreMax = 6;
      this.dailyDivinationCount = saved.dailyDivinationCount || 0;
      this.dailyMineCollectLeft = saved.dailyMineCollectLeft !== undefined ? saved.dailyMineCollectLeft : 3;
      this.dailyTdWavesLeft = saved.dailyTdWavesLeft !== undefined ? saved.dailyTdWavesLeft : 3;
      this.completedSectTasks = saved.completedSectTasks || [];
      this.dailyTaxLeft = saved.dailyTaxLeft !== undefined ? saved.dailyTaxLeft : 3;
      this.dailyCompassLeft = saved.dailyCompassLeft !== undefined ? saved.dailyCompassLeft : 3;
      this.dailyCipherLeft = saved.dailyCipherLeft !== undefined ? saved.dailyCipherLeft : 3;
      this.dailyTradeLeft = saved.dailyTradeLeft !== undefined ? saved.dailyTradeLeft : 3;
      this.dailyPirateLeft = saved.dailyPirateLeft !== undefined ? saved.dailyPirateLeft : 3;
      this.lifetimeCardClaimed = saved.lifetimeCardClaimed || false;
      this.monthlyCardClaimed = saved.monthlyCardClaimed || false;
      this.customSkillLv = saved.customSkillLv || 1;
      this.exploredNodes = saved.exploredNodes || ["tn_1"];
      this.regionProgress = saved.regionProgress || { region_tiannan: 35, region_blood_trial: 0, region_chaos_star: 0 };
      this.recentFortune = saved.recentFortune || "✨ 剛獲得機緣：【紫品 · 太乙玄庚劍氣殘篇】已納入行囊";
      this.dailyTasks = saved.dailyTasks || [
        { id: "dt_breath", title: "聚元吐納 3 次", progress: 1, max: 3, rewardType: "exp", rewardVal: 600, rewardLabel: "+600元氣", claimed: false },
        { id: "dt_abyss", title: "闖蕩萬劫淵 1 次", progress: 0, max: 1, rewardType: "silver", rewardVal: 350, rewardLabel: "+350靈石", claimed: false },
        { id: "dt_herb", title: "藥園催熟或採擷", progress: 1, max: 1, rewardType: "ingots", rewardVal: 50, rewardLabel: "+50天晶", claimed: false }
      ];
    }

    getRealmTitle() {
      const realms = ["凝魄境", "洞天境", "道胎境", "神藏境", "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"];
      const r = realms[this.realmIndex] || "太初混沌境";
      if (this.realmIndex === 8) return "太初道主 (大圓滿)";
      return `${r} 第${this.realmLayer}重天`;
    }

    getEffectiveStat(stat) {
      const realmMultiplier = 1 + (this.realmIndex * 9 + this.realmLayer) * 0.16;
      let val = 0;
      switch (stat) {
        case "hp": val = (380 + this.rootBone * 32) * realmMultiplier; break;
        case "mp": val = (160 + this.comprehension * 22) * realmMultiplier; break;
        case "atk": val = (55 + this.strength * 6) * realmMultiplier; break;
        case "def": val = (28 + this.rootBone * 3.5) * realmMultiplier; break;
        case "speed": val = 48 + this.agility * 3; break;
        case "crit": val = 7 + Math.floor(this.agility * 0.25) + Math.floor(this.luck * 0.15); break;
        case "dodge": val = 5 + Math.floor(this.agility * 0.25); break;
      }

      // 裝備基礎屬性 + 祭煉階數加成 + 隨機詞條加成 (Procedural Affixes)
      Object.entries(this.equipSlots).forEach(([slotKey, itemId]) => {
        if (!itemId) return;
        const it = ITEMS_DATA.find(i => i.id === itemId);
        const enh = (this.equipEnhance && this.equipEnhance[slotKey]) || 1;
        const enhMul = 1 + enh * 0.12;
        if (it && it.stats && it.stats[stat]) {
          val += Math.floor(it.stats[stat] * enhMul);
        }
        const affixes = (this.itemAffixes && this.itemAffixes[itemId]) || [];
        affixes.forEach(af => {
          if (af.stat === stat && af.bonus) val += af.bonus;
        });
      });

      // 雙生熔爐火雷融合加成 & 荒古霸王軀鍛體加成
      if (this.furnaceFusedLevel) {
        if (stat === "atk") val += this.furnaceFusedLevel * 85;
        if (stat === "crit") val += this.furnaceFusedLevel * 4;
      }
      if (this.bodyStagesUnlocked && this.bodyStagesUnlocked.length > 0) {
        if (stat === "hp") val += this.bodyStagesUnlocked.length * 950;
        if (stat === "def") val += this.bodyStagesUnlocked.length * 65;
      }

      // 陣盤加成
      const curF = FORMATIONS_DATA.find(f => f.id === this.currentFormation);
      if (curF && curF.buff) {
        if (stat === 'speed' && curF.buff.speed) val += curF.buff.speed;
        if (stat === 'crit' && curF.buff.critBoost) val += Math.floor(curF.buff.critBoost * 100);
      }

      return Math.floor(val);
    }

    addItem(itemId, count = 1) {
      const ex = this.inventory.find(i => i.id === itemId);
      if (ex) ex.count += count;
      else this.inventory.push({ id: itemId, count });
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
      const it = ITEMS_DATA.find(i => i.id === itemId);
      if (!it || !it.slot) return false;
      const cur = this.equipSlots[it.slot];
      if (cur) this.addItem(cur, 1);
      this.removeItem(itemId, 1);
      this.equipSlots[it.slot] = itemId;
      return true;
    }
  }

  // ==================== 4. 戰鬥演算引擎 (v8.0 互動戰術 × 雙層護盾 × 二階段狂暴 × 最佳一擊回顧) ====================
  class CombatEngine {
    constructor(player, enemy, ambushBonus = false) {
      this.player = player;
      this.enemy = enemy;
      this.logs = [];
      this.roundSnapshots = [];
      this.round = 1;
      this.maxRounds = 20;
      this.isOver = false;
      this.winner = null;
      this.bestHit = { round: 1, skillName: "太乙玄庚飛劍式", dmg: 0, isCrit: false };

      const pMaxHp = player.getEffectiveStat('hp');
      const pMaxShield = Math.floor(pMaxHp * 0.38);
      const eMaxHp = enemy.hp || 1500;
      const eMaxShield = ambushBonus ? Math.floor(eMaxHp * 0.12) : Math.floor(eMaxHp * 0.35);

      this.pState = {
        name: player.name,
        hp: pMaxHp,
        maxHp: pMaxHp,
        shield: pMaxShield,
        maxShield: pMaxShield,
        mp: player.getEffectiveStat('mp'),
        maxMp: player.getEffectiveStat('mp'),
        atk: player.getEffectiveStat('atk') * (ambushBonus ? 1.25 : 1.0),
        def: player.getEffectiveStat('def'),
        speed: player.getEffectiveStat('speed'),
        crit: player.getEffectiveStat('crit'),
        dodge: player.getEffectiveStat('dodge'),
        daoClarity: ambushBonus ? 50 : 20, // 道心通明進度 (0~100)
        heartDemon: 0,                     // 心魔累積進度 (0~100)
        chargedNext: ambushBonus,          // 蓄力下一擊增傷
        skills: player.equippedSkills.map(id => ({ ...SKILLS_DATA.find(s => s.id === id), curCd: 0 })).filter(Boolean),
        buffs: []
      };

      this.eState = {
        name: enemy.name,
        hp: eMaxHp,
        maxHp: eMaxHp,
        shield: eMaxShield,
        maxShield: eMaxShield,
        mp: enemy.mp || 1000,
        atk: enemy.atk || 140,
        def: ambushBonus ? Math.floor((enemy.def || 40) * 0.6) : (enemy.def || 40),
        speed: enemy.speed || 45,
        crit: enemy.crit || 10,
        dodge: enemy.dodge || 5,
        enraged: false,
        skills: (enemy.skills || []).map(id => ({ ...SKILLS_DATA.find(s => s.id === id), curCd: 0 })).filter(Boolean),
        buffs: []
      };
    }

    // 執行單一回合：支援玩家手動戰術 ('attack' | 'skill' | 'guard') 與 QTE 完美時機加成
    executeRound(tacticMode = "skill", qteSuccess = false) {
      if (this.isOver) return null;

      const roundEvents = {
        round: this.round,
        pFloat: null,
        eFloat: null,
        vfx: null,
        pCallout: null,
        eCallout: null,
        pShieldShattered: false,
        eShieldShattered: false,
        enemyEnragedNow: false,
        roundLogs: []
      };

      const pushLog = (type, text) => {
        const entry = { type, text, round: this.round };
        this.logs.push(entry);
        roundEvents.roundLogs.push(entry);
      };

      pushLog("round", `── 第 ${this.round} 回合 · 氣機交鋒 ──`);

      // 玩家行動結算
      this.resolvePlayerAction(tacticMode, qteSuccess, roundEvents, pushLog);
      if (this.checkWin(pushLog)) {
        this.saveSnapshot(roundEvents);
        return { ...roundEvents, isOver: true, winner: this.winner };
      }

      // 檢查敵人是否進入 <50% 血量二階段狂暴
      if (!this.eState.enraged && this.eState.hp <= this.eState.maxHp * 0.5) {
        this.eState.enraged = true;
        this.eState.atk = Math.floor(this.eState.atk * 1.35);
        this.eState.shield += Math.floor(this.eState.maxShield * 0.35);
        roundEvents.enemyEnragedNow = true;
        roundEvents.eCallout = "👹 狂暴二階段！殺力暴漲！";
        pushLog("enrage", `🔥【凶威狂暴】${this.eState.name} 氣血跌破半數，雙目赤紅燃燒本源精血，進入二階段【狂暴魔軀】，攻擊力激增 35%！`);
      }

      // 敵方行動結算
      this.resolveEnemyAction(roundEvents, pushLog);
      if (this.checkWin(pushLog)) {
        this.saveSnapshot(roundEvents);
        return { ...roundEvents, isOver: true, winner: this.winner };
      }

      // 檢查玩家低血量危急情緒提示
      if (this.pState.hp <= this.pState.maxHp * 0.32) {
        roundEvents.pCallout = "⚠️ 真元將竭！危矣！";
      }

      this.round++;
      if (this.round > this.maxRounds) {
        this.isOver = true;
        this.winner = this.pState.hp >= this.eState.hp ? "player" : "enemy";
        pushLog("end", "雙方激戰二十回合難分難解，以殘存元海氣血定奪勝負！");
      }

      this.saveSnapshot(roundEvents);
      return { ...roundEvents, isOver: this.isOver, winner: this.winner };
    }

    resolvePlayerAction(tacticMode, qteSuccess, roundEvents, pushLog) {
      const att = this.pState;
      const def = this.eState;

      if (tacticMode === "guard") {
        const gainShield = Math.floor(att.maxShield * 0.45);
        const healHp = Math.floor(att.maxHp * 0.08);
        att.shield = Math.min(att.maxShield, att.shield + gainShield);
        att.hp = Math.min(att.maxHp, att.hp + healHp);
        att.heartDemon = 0;
        att.daoClarity = Math.min(100, att.daoClarity + 25);
        att.chargedNext = true;
        roundEvents.pCallout = "🛡️ 九蓮護體 · 蓄勢待發！";
        roundEvents.pFloat = { text: `+${gainShield} 護盾`, style: "dmg-true" };
        pushLog("guard", `🧘‍♂️ ${att.name} 雙手結太初不動印，重凝 ${gainShield} 點護體真元並驅散心魔，劍意蓄勢待發（下一擊傷害 +65%）！`);
        att.skills.forEach(s => { if (s.curCd > 0) s.curCd--; });
        return;
      }

      let chosen = null;
      if (tacticMode === "skill") {
        for (const sk of att.skills) {
          if (sk.curCd === 0 && att.mp >= sk.qiCost) {
            chosen = sk;
            break;
          }
        }
      }

      const isClarityMax = att.daoClarity >= 100;
      const chargeMul = att.chargedNext ? 1.65 : 1.0;
      att.chargedNext = false;

      if (chosen) {
        att.mp = Math.max(0, att.mp - chosen.qiCost);
        chosen.curCd = chosen.cd;

        const isCrit = qteSuccess || isClarityMax || (Math.random() * 100 < att.crit + 15);
        const qteMul = qteSuccess ? 1.45 : 1.0;
        const clarityMul = isClarityMax ? 1.35 : 1.0;
        const rawDmg = Math.max(45, att.atk * chosen.power - def.def * 0.35);
        const totalDmg = Math.floor(rawDmg * (isCrit ? 1.85 : 1.0) * qteMul * clarityMul * chargeMul * (0.95 + Math.random() * 0.12));

        // 判定全屏特效類型
        const vfxCategory = chosen.category === "flame" ? "vfx-flame" : (chosen.category === "thunder" ? "vfx-thunder" : "vfx-sword");
        roundEvents.vfx = {
          cssClass: vfxCategory,
          title: qteSuccess ? `🎯 完美破綻 · 【${chosen.name}】！` : `⚡ 絕學綻放 · 【${chosen.name}】！`
        };

        this.applyDamageWithShield(def, totalDmg, roundEvents, true);

        const dmgStyle = qteSuccess || isClarityMax ? "dmg-true" : (isCrit ? "dmg-crit" : "dmg-special");
        const prefixTag = qteSuccess ? "🎯真傷暴擊 " : (isCrit ? "💥暴擊 " : "🔮神通 ");
        roundEvents.eFloat = { text: `${prefixTag}-${totalDmg}`, style: dmgStyle };
        roundEvents.pCallout = isCrit ? "⚔️ 一劍破空！道威浩蕩！" : `✨ 祭出【${chosen.name}】！`;

        // 根據血量階段動態變化招式文案，避免重複感
        const hpRatio = def.hp / def.maxHp;
        let dynamicDesc = "";
        if (qteSuccess) {
          dynamicDesc = `🎯【靈機一閃】${att.name} 看破敵手氣機破綻，催動【${chosen.name}】化作漫天璀璨金虹直貫要害，造成 ${totalDmg} 點毀滅真傷！`;
        } else if (hpRatio > 0.7) {
          dynamicDesc = `${att.name} 袖袍鼓盪率先發難，【${chosen.name}】撕裂四周虛空轟向 ${def.name}，造成 ${totalDmg} 點巨額傷害！`;
        } else if (hpRatio > 0.3) {
          dynamicDesc = `激戰正酣！${att.name} 劍訣再變，【${chosen.name}】挾風雷之勢連環劈落，震得 ${def.name} 吐血暴退 (-${totalDmg})！`;
        } else {
          dynamicDesc = `🔥【絕殺之勢】見 ${def.name} 氣息萎靡，${att.name} 全力催動【${chosen.name}】作最後雷霆一擊，轟出 ${totalDmg} 點致命重創！`;
        }
        pushLog("skill", dynamicDesc);

        att.daoClarity = isClarityMax ? 25 : Math.min(100, att.daoClarity + (isCrit ? 40 : 25));
        if (totalDmg > this.bestHit.dmg) {
          this.bestHit = { round: this.round, skillName: chosen.name, dmg: totalDmg, isCrit };
        }
      } else {
        // 御劍普攻：回復真元並穩健削盾
        att.mp = Math.min(att.maxMp, att.mp + 45);
        const isCrit = qteSuccess || (Math.random() * 100 < att.crit);
        const baseDmg = Math.max(28, att.atk * 1.15 - def.def * 0.35);
        const totalDmg = Math.floor(baseDmg * (isCrit ? 1.65 : 1.0) * chargeMul);

        this.applyDamageWithShield(def, totalDmg, roundEvents, true);
        roundEvents.eFloat = { text: `${isCrit ? '💥暴擊 ' : ''}-${totalDmg}`, style: isCrit ? "dmg-crit" : "dmg-normal" };
        roundEvents.pCallout = "🗡️ 御劍斬擊 · 回氣 +45";

        const variants = [
          `${att.name} 並指御使太乙飛劍化作流光斬向 ${def.name}，造成 ${totalDmg} 點劍氣傷害（回復 45 真元）！`,
          `${att.name} 腳踏九宮步欺身而進，掌中劍芒吞吐直削 ${def.name} 護體罡氣 (-${totalDmg})！`,
          `${att.name} 劍隨身轉，三十六道庚金劍絲交織成網，在 ${def.name} 身上留下深可見骨的劍痕 (-${totalDmg})！`
        ];
        pushLog("hit", variants[(this.round - 1) % variants.length]);
        att.daoClarity = Math.min(100, att.daoClarity + 20);
        if (totalDmg > this.bestHit.dmg) {
          this.bestHit = { round: this.round, skillName: "太乙御劍斬", dmg: totalDmg, isCrit };
        }
      }

      att.skills.forEach(s => { if (s.curCd > 0) s.curCd--; });
    }

    resolveEnemyAction(roundEvents, pushLog) {
      const att = this.eState;
      const def = this.pState;

      const isCrit = Math.random() * 100 < (att.enraged ? att.crit + 15 : att.crit);
      const demonPenalty = def.heartDemon >= 100 ? 1.22 : 1.0;
      const baseDmg = Math.max(20, att.atk * (att.enraged ? 1.25 : 1.0) - def.def * 0.42);
      const totalDmg = Math.floor(baseDmg * (isCrit ? 1.55 : 1.0) * demonPenalty * (0.92 + Math.random() * 0.15));

      this.applyDamageWithShield(def, totalDmg, roundEvents, false);
      roundEvents.pFloat = { text: `${isCrit ? '💥重擊 ' : ''}-${totalDmg}`, style: isCrit ? "dmg-crit" : "dmg-normal" };

      def.heartDemon = Math.min(100, def.heartDemon + (isCrit ? 35 : 22));

      if (att.enraged) {
        pushLog("enemy", `👹 狂暴態的 ${att.name} 咆哮震天，揮動漫天血煞狂潮狠狠轟在 ${def.name} 身上，造成 ${totalDmg} 點重創！`);
      } else {
        const eVariants = [
          `${att.name} 凶焰滔天，催動煞氣妖術正面衝擊 ${def.name}，造成 ${totalDmg} 點傷害！`,
          `${att.name} 化作殘影繞至側翼，利爪撕裂護體靈光，對 ${def.name} 造成 ${totalDmg} 點殺傷！`
        ];
        pushLog("enemy", eVariants[this.round % eVariants.length]);
      }
    }

    applyDamageWithShield(target, dmg, roundEvents, isEnemyTarget) {
      if (target.shield > 0) {
        if (target.shield >= dmg) {
          target.shield -= dmg;
        } else {
          const overflow = dmg - target.shield;
          target.shield = 0;
          target.hp = Math.max(0, target.hp - overflow);
          if (isEnemyTarget) {
            roundEvents.eShieldShattered = true;
            this.logs.push({ type: "shatter", text: `💥【破盾重創】${target.name} 的護體真元盾應聲碎裂，露出致命空門！`, round: this.round });
          } else {
            roundEvents.pShieldShattered = true;
            this.logs.push({ type: "shatter", text: `⚠️【靈罡破碎】你的護體真元被強敵震碎，建議使用【護體蓄力】重凝護盾！`, round: this.round });
          }
        }
      } else {
        target.hp = Math.max(0, target.hp - dmg);
      }
    }

    checkWin(pushLog) {
      if (this.eState.hp <= 0) {
        this.isOver = true;
        this.winner = "player";
        pushLog("end", `🏆【斬妖奪寶】${this.pState.name} 劍氣貫穿蒼穹，悍然鎮殺 ${this.eState.name}，收繳其隨身納戒！`);
        return true;
      }
      if (this.pState.hp <= 0) {
        this.isOver = true;
        this.winner = "enemy";
        pushLog("end", `💔【功虧一簣】${this.pState.name} 氣血耗竭，只得催動血遁秘術暫退百里調息！`);
        return true;
      }
      return false;
    }

    saveSnapshot(roundEvents) {
      this.roundSnapshots.push({
        round: this.round,
        pHpPct: Math.max(0, Math.floor((this.pState.hp / this.pState.maxHp) * 100)),
        eHpPct: Math.max(0, Math.floor((this.eState.hp / this.eState.maxHp) * 100)),
        logs: [...roundEvents.roundLogs],
        eFloat: roundEvents.eFloat,
        vfx: roundEvents.vfx
      });
    }
  }

  // ==================== 5. 主應用控制器 (Main SPA App - v8.0 戰鬥與大荒探索全面進化) ====================
  class App {
    constructor() {
      this.char = null;
      this.currentView = "main";
      this.combatEngine = null;
      this.currentEnemy = null;
      this.autoCombatTimer = null;
      this.isAutoCombat = false;
      this.qteActive = false;
      this.holdTimer = null;
      this.zenAutoTimer = null;
      this.rotationAngle = 0;
      this.init();
    }

    init() {
      try {
        const raw = localStorage.getItem("ASTRAL_SOVEREIGN_SAVE_V8");
        if (raw) {
          this.char = new Character(JSON.parse(raw));
        } else {
          this.char = new Character({
            realmIndex: 1,
            realmLayer: 4,
            exp: 2680,
            todayExp: 1120,
            qi: 680,
            silver: 1280,
            ingots: 260
          });
        }
      } catch (e) {
        this.char = new Character({ realmIndex: 1, realmLayer: 4, exp: 2680 });
      }

      this.bindEvents();
      this.updateHeader();
      this.renderView();

      setInterval(() => {
        try {
          localStorage.setItem("ASTRAL_SOVEREIGN_SAVE_V8", JSON.stringify(this.char));
        } catch (e) {}
      }, 20000);
    }

    bindEvents() {
      document.querySelectorAll(".dock-tab").forEach(tab => {
        tab.addEventListener("click", () => {
          audio.playTone(550, 'sine', 0.05, 0.15);
          document.querySelectorAll(".dock-tab").forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          this.currentView = tab.dataset.view;
          this.renderView();
        });
      });

      document.getElementById("btn-toggle-sound")?.addEventListener("click", () => {
        const on = audio.toggleBGM();
        const btn = document.getElementById("btn-toggle-sound");
        if (btn) btn.innerText = on ? "🎐" : "🔇";
      });

      document.getElementById("btn-close-combat")?.addEventListener("click", () => {
        this.stopAutoCombat();
        document.getElementById("combat-modal-overlay")?.classList.remove("active");
        this.renderView();
      });

      document.getElementById("btn-close-celebration")?.addEventListener("click", () => {
        document.getElementById("breakthrough-modal-overlay")?.classList.remove("active");
      });

      document.getElementById("btn-close-contemplation")?.addEventListener("click", () => {
        document.getElementById("contemplation-modal-overlay")?.classList.remove("active");
      });

      document.getElementById("btn-close-explore")?.addEventListener("click", () => {
        document.getElementById("exploration-modal-overlay")?.classList.remove("active");
        this.renderView();
      });

      document.getElementById("zen-exit-btn")?.addEventListener("click", () => {
        this.toggleZenMode(false);
      });

      // 綁定戰鬥 3 大手動戰術按鈕 + 自動戰鬥切換 + QTE 時機點擊 + 戰後重播
      document.getElementById("btn-tactic-attack")?.addEventListener("click", () => {
        this.handlePlayerCombatTurn("attack", false);
      });
      document.getElementById("btn-tactic-skill")?.addEventListener("click", () => {
        this.triggerSkillQTEOrCast();
      });
      document.getElementById("btn-tactic-guard")?.addEventListener("click", () => {
        this.handlePlayerCombatTurn("guard", false);
      });
      document.getElementById("qte-ring-trigger")?.addEventListener("click", () => {
        if (this.qteActive) {
          this.qteActive = false;
          document.getElementById("qte-ring-trigger")?.classList.remove("active");
          audio.playEpiphanyBell();
          this.handlePlayerCombatTurn("skill", true);
        }
      });
      document.getElementById("btn-combat-switch-formation")?.addEventListener("click", () => {
        if (!this.combatEngine || this.combatEngine.isOver) return;
        const order = ["tian_gang", "jiu_gong", "qing_long"];
        const nextIdx = (order.indexOf(this.char.currentFormation) + 1) % order.length;
        this.char.currentFormation = order[nextIdx];
        const curF = FORMATIONS_DATA.find(x => x.id === this.char.currentFormation) || FORMATIONS_DATA[0];
        this.combatEngine.pState.shield = Math.min(this.combatEngine.pState.maxShield, this.combatEngine.pState.shield + 220);
        this.combatEngine.pState.atk = Math.floor(this.combatEngine.pState.atk * 1.12);
        audio.playEpiphanyBell();
        const fBtn = document.getElementById("btn-combat-switch-formation");
        if (fBtn) fBtn.innerText = `☯️ 變陣: ${curF.name.slice(0, 4)}`;
        const logBox = document.getElementById("combat-logs-content");
        if (logBox) {
          const d = document.createElement("div");
          d.style.cssText = "color:#8c622b; font-weight:800; margin-bottom:4px;";
          d.innerText = `☯️【實戰奇門變陣】瞬間切換至【${curF.name}】（${curF.buff}），護體真元盾 +220，殺力提升！`;
          logBox.appendChild(d);
          logBox.scrollTop = logBox.scrollHeight;
        }
        this.syncCombatUI();
      });

      document.getElementById("btn-combat-speed-toggle")?.addEventListener("click", () => {
        const order = ["normal", "slow", "fast"];
        const labels = { normal: "⚖️ 1.0x 標準", slow: "🐢 0.5x 慢放鑑賞", fast: "⚡ 2.0x 疾速" };
        const next = order[(order.indexOf(this.char.combatSpeedMode || "normal") + 1) % order.length];
        this.char.combatSpeedMode = next;
        const btn = document.getElementById("btn-combat-speed-toggle");
        if (btn) btn.innerText = labels[next];
        if (this.isAutoCombat) this.startAutoCombatLoop();
      });

      document.getElementById("btn-toggle-auto-combat")?.addEventListener("click", () => {
        this.isAutoCombat = !this.isAutoCombat;
        const btn = document.getElementById("btn-toggle-auto-combat");
        if (btn) btn.innerText = this.isAutoCombat ? "⏸️ 停止自動" : "🔄 自動演武";
        if (this.isAutoCombat) {
          this.startAutoCombatLoop();
        } else {
          this.stopAutoCombat();
        }
      });
      document.getElementById("btn-replay-combat")?.addEventListener("click", () => {
        this.replayKeyCombatRounds();
      });
      document.getElementById("btn-retry-combat")?.addEventListener("click", () => {
        if (this.currentEnemy) {
          this.char.qi += 200;
          this.launchCombat(this.currentEnemy, true);
        }
      });

      const rotSlider = document.getElementById("contemplation-rotate-slider");
      if (rotSlider) {
        rotSlider.addEventListener("input", (e) => {
          this.rotationAngle = parseInt(e.target.value || "0", 10);
          const stage = document.getElementById("contemplation-3d-stage");
          const angleLabel = document.getElementById("contemplation-angle-label");
          if (stage) stage.style.transform = `rotateY(${this.rotationAngle}deg) scale(1.18)`;
          if (angleLabel) angleLabel.innerText = `洞天環視角度: ${this.rotationAngle}°`;
        });
      }
    }

    toggleZenMode(forceState) {
      const appEl = document.getElementById("app-container");
      if (!appEl) return;
      const isZen = forceState !== undefined ? forceState : !appEl.classList.contains("zen-mode");
      if (isZen) {
        appEl.classList.add("zen-mode");
        audio.playEpiphanyBell();
        if (this.zenAutoTimer) clearInterval(this.zenAutoTimer);
        this.zenAutoTimer = setInterval(() => {
          this.char.exp += 65;
          this.char.todayExp += 65;
          this.updateHeader();
          if (this.currentView === "main") this.spawnQiParticles();
        }, 2500);
      } else {
        appEl.classList.remove("zen-mode");
        if (this.zenAutoTimer) {
          clearInterval(this.zenAutoTimer);
          this.zenAutoTimer = null;
        }
        this.renderView();
      }
    }

    showSystemToast(msg, isWarn = false) {
      if (typeof document === "undefined") return;
      try {
        const old = document.querySelector(".system-notice-toast");
        if (old) old.remove();
        const t = document.createElement("div");
        t.className = `system-notice-toast ${isWarn ? 'warn' : ''}`;
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 1800);
      } catch (e) {}
    }

    // 統一資源扣除與檢查（杜絕資源不同步或無上限免費點擊）
    trySpendResource(resKey, cost, resName) {
      const currentVal = this.char[resKey] || 0;
      if (currentVal < cost) {
        audio.playTone(220, 'sawtooth', 0.2, 0.15);
        this.showSystemToast(`⚠️ ${resName}不足！需要 ${cost}，目前僅有 ${currentVal}`, true);
        return false;
      }
      this.char[resKey] = currentVal - cost;
      this.updateHeader();
      return true;
    }

    // 調息進入下一日（重置所有每日上限次數）
    resetDailyLimits() {
      this.char.efficientBreathsLeft = this.char.maxEfficientBreaths || 20;
      this.char.todayExp = 0;
      this.char.dailyExploreCount = 0;
      this.char.dailyDivinationCount = 0;
      this.char.dailyMineCollectLeft = 3;
      this.char.dailyTdWavesLeft = 3;
      this.char.completedSectTasks = [];
      this.char.dailyTaxLeft = 3;
      this.char.dailyCompassLeft = 3;
      this.char.dailyCipherLeft = 3;
      this.char.dailyTradeLeft = 3;
      this.char.dailyPirateLeft = 3;
      (this.char.dailyTasks || []).forEach(t => { t.progress = 0; t.claimed = false; });
      audio.playEpiphanyBell();
      this.showSystemToast("🌅 洞天日月輪轉！已進入新的一日，所有每日次數與機緣已重置！");
      this.updateHeader();
      this.renderView();
    }

    updateHeader() {
      const appEl = document.getElementById("app-container");
      if (appEl) appEl.setAttribute("data-realm", String(this.char.realmIndex));

      const nameBadge = document.getElementById("char-name-badge");
      if (nameBadge) nameBadge.innerText = this.char.getRealmTitle();
      const eEl = document.getElementById("curr-exp");
      if (eEl) eEl.innerText = `✨ ${this.char.exp}`;
      const qEl = document.getElementById("curr-qi");
      if (qEl) qEl.innerText = `☯️ ${this.char.qi}`;
      const sEl = document.getElementById("curr-silver");
      if (sEl) sEl.innerText = `🪙 ${this.char.silver}`;
      const iEl = document.getElementById("curr-ingots");
      if (iEl) iEl.innerText = `💎 ${this.char.ingots}`;

      try {
        localStorage.setItem("ASTRAL_SOVEREIGN_SAVE_V8", JSON.stringify(this.char));
      } catch (e) {}
    }

    triggerFlyingReward(sourceEl, rewardType, labelText) {
      this.updateHeader();
      const targetId = rewardType === "silver" ? "curr-silver" : (rewardType === "ingots" ? "curr-ingots" : (rewardType === "exp" ? "curr-exp" : "curr-qi"));
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.classList.add("fly-pulse");
        setTimeout(() => targetEl.classList.remove("fly-pulse"), 900);
      }
      if (typeof document === "undefined") return;
      try {
        const oldScroll = document.querySelector(".scroll-reward-toast");
        if (oldScroll) oldScroll.remove();

        const sealMap = {
          silver: "〔靈石入庫〕",
          ingots: "〔天晶賜福〕",
          exp: "〔氣沉丹田〕",
          qi: "〔道基精進〕"
        };
        const sealText = sealMap[rewardType] || "〔天道機緣〕";

        const scrollEl = document.createElement("div");
        scrollEl.className = "scroll-reward-toast";
        scrollEl.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.1rem; color:#141311;">⚫</span>
            <span style="font-size:1.02rem; font-weight:900; color:#141311; letter-spacing:0.5px;">${labelText}</span>
          </div>
          <span class="cinnabar-seal-stamp">${sealText}</span>
        `;
        document.body.appendChild(scrollEl);
        setTimeout(() => {
          scrollEl.style.opacity = "0";
          scrollEl.style.transition = "opacity 0.35s ease";
        }, 1250);
        setTimeout(() => scrollEl.remove(), 1650);
      } catch (e) {}
    }

    advanceDailyTask(taskId, amount = 1) {
      const task = (this.char.dailyTasks || []).find(t => t.id === taskId);
      if (task && !task.claimed) {
        task.progress = Math.min(task.max, task.progress + amount);
      }
    }

    getReqExp(realmIndex = this.char.realmIndex, realmLayer = this.char.realmLayer) {
      const reqBase = [350, 1400, 4500, 13500, 38000, 95000, 240000, 550000, 1600000][realmIndex] || 350;
      return Math.floor(reqBase * Math.pow(1.35, realmLayer - 1));
    }

    // ==================== 真隨機多層次掉落與程序化詞條生成引擎 (Procedural Loot & Affix Engine) ====================
    rollRandomizedLoot(targetRealm = this.char.realmIndex, dropCount = 3, sourceLabel = "大荒秘境") {
      if (!this.char.itemAffixes) this.char.itemAffixes = {};
      // 篩選符合當前境界區間的候選掉落池
      const eligiblePool = ITEMS_DATA.filter(it => (it.minRealm || 0) <= targetRealm + 1);
      const pool = eligiblePool.length > 0 ? eligiblePool : ITEMS_DATA;

      // 依紫微卜卦運勢決定是否額外 +1 掉落
      const divBonus = (this.char.divinationState && this.char.divinationState.mult > 1.1) ? 1 : 0;
      const finalCount = Math.min(5, dropCount + divBonus);

      const results = [];
      const usedIds = new Set();

      for (let i = 0; i < finalCount; i++) {
        // 隨機抽取不重複物品
        let candidates = pool.filter(x => !usedIds.has(x.id));
        if (candidates.length === 0) candidates = pool;
        const picked = candidates[Math.floor(Math.random() * candidates.length)];
        usedIds.add(picked.id);

        const qty = picked.slot ? 1 : (1 + Math.floor(Math.random() * 3));
        this.char.addItem(picked.id, qty);

        // 若為道兵/仙甲/奇寶，動態隨機生成 1~3 條專屬詞條！
        let rolledAffixes = [];
        if (picked.slot) {
          const affixCount = picked.rarity === "red" || picked.rarity === "orange" ? 3 : (picked.rarity === "purple" ? 2 : 1);
          const shuffled = [...RANDOM_AFFIX_POOL].sort(() => Math.random() - 0.5);
          rolledAffixes = shuffled.slice(0, affixCount).map(a => ({ ...a }));
          this.char.itemAffixes[picked.id] = rolledAffixes;
        }

        const rarityClassMap = {
          red: "rarity-gold",
          orange: "rarity-gold",
          purple: "rarity-purple",
          blue: "rarity-blue",
          green: "rarity-green"
        };
        const rarityLabelMap = {
          red: "鴻蒙·紅品",
          orange: "造化·橙品",
          purple: "純陽·紫品",
          blue: "玄階·藍品",
          green: "靈階·綠品"
        };

        results.push({
          item: picked,
          qty,
          affixes: rolledAffixes,
          rarityClass: rarityClassMap[picked.rarity] || "rarity-green",
          rarityLabel: rarityLabelMap[picked.rarity] || "靈品"
        });
      }

      const firstItem = results[0];
      const affixStr = firstItem && firstItem.affixes.length > 0
        ? `（附帶詞條：${firstItem.affixes.map(a => a.name).join("·")}）`
        : "";
      this.char.recentFortune = `✨【${sourceLabel}隨機掉落】獲【${firstItem.rarityLabel} · ${firstItem.item.name}×${firstItem.qty}】${affixStr} 等 ${results.length} 件寶物！`;
      return results;
    }

    getRealmUnlockSummary(realmIndex = this.char.realmIndex) {
      const unlocks = [
        "🌱【凝魄境法則】開放青玄道域、三塊靈田、五極靈竅與基礎飛劍。",
        "🔥【洞天境重構】已解鎖：雙生熔爐(異火×神雷)、紫微天機卜卦、殞神墟異火潭、4塊靈田！",
        "🌌【道胎境重構】已解鎖：太虛星槎跨界商道、古神雲篆星宿解謎、紫曜三罡雷劫、5塊靈田！",
        "🩸【神藏境重構】已解鎖：荒古不滅霸王軀(五階鍛體)、太始魔窟、太荒魔潮洞府塔防、6塊滿靈田！",
        "🧭【通虛境重構】已解鎖：尋龍分金羅盤勘輿(開採極品私礦)、九霄太初天門、九品涅槃金丹！",
        "👑【星宿真王～太初道主】已解鎖：開宗立派(自立太初道門收徒)、自創無上大道神通、跨服天梯爭霸！"
      ];
      return unlocks[Math.min(unlocks.length - 1, realmIndex)];
    }

    getRealmEnvironmentMeta(realmIndex, realmLayer) {
      const themes = [
        { bgName: "青玄幽谷 · 靈霧初開", auraColor: "#2dd4bf", desc: "山間晨霧繚繞，引天地星煞淬鍊凡軀", soundDesc: "松濤清風 · 靈泉叮咚" },
        { bgName: "九天洞天 · 浮島星河", auraColor: "#38bdf8", desc: "丹田開闢三座元海，浮空仙島與星辰共鳴", soundDesc: "空谷梵鐘 · 雲海仙音" },
        { bgName: "紫曜道胎 · 雷火金蓮", auraColor: "#c084fc", desc: "大道靈胎凝結，周身伴隨三十六柄本命飛劍虛影", soundDesc: "九霄雷吟 · 劍鳴錚錚" },
        { bgName: "五極神藏 · 混沌初分", auraColor: "#f59e0b", desc: "體內五行神藏洞開，元神化劍洞穿虛空", soundDesc: "太古洪鐘 · 大道梵唱" }
      ];
      return themes[Math.min(themes.length - 1, realmIndex)] || themes[1];
    }

    buildInkLandscapeSVG(realmIndex = 1) {
      return `
        <svg class="ink-landscape-svg-bg" viewBox="0 0 420 280" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="inkMountFar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#235363" stop-opacity="0.26"/>
              <stop offset="70%" stop-color="#575249" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#f4efe4" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="inkMountMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#22201c" stop-opacity="0.34"/>
              <stop offset="65%" stop-color="#575249" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="#ebe3d2" stop-opacity="0.02"/>
            </linearGradient>
            <linearGradient id="inkMountNear" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#141311" stop-opacity="0.48"/>
              <stop offset="100%" stop-color="#dfd7c6" stop-opacity="0.08"/>
            </linearGradient>
            <radialGradient id="mistWashGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fbf8f1" stop-opacity="0.88"/>
              <stop offset="60%" stop-color="#ebe3d2" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#ebe3d2" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- 第一層：遠山淡黛暈染（留白高遠） -->
          <path d="M-10 145 Q55 52 128 118 T270 78 T430 128 L430 280 L-10 280 Z" fill="url(#inkMountFar)" />

          <!-- 第二層：山間流動煙雲帶（緩慢橫移） -->
          <g class="svg-mist-band-1">
            <ellipse cx="140" cy="135" rx="135" ry="26" fill="url(#mistWashGrad)" />
            <path d="M20 138 Q110 122 210 138 T380 132" fill="none" stroke="rgba(35,83,99,0.16)" stroke-width="6" stroke-linecap="round"/>
          </g>

          <!-- 第三層：中景積墨奇峰與孤亭飛瀑 -->
          <path d="M-20 185 Q48 96 118 158 T252 118 T368 98 T430 168 L430 280 L-20 280 Z" fill="url(#inkMountMid)" />
          <!-- 遠處山巔孤亭剪影 -->
          <path d="M352 92 L368 82 L384 92 Z M357 92 L357 102 M379 92 L379 102" stroke="#22201c" stroke-width="1.4" fill="#22201c" opacity="0.45"/>
          <!-- 飛瀑留白水線 -->
          <path d="M248 122 Q252 155 246 190" stroke="#fbf8f1" stroke-width="2.2" fill="none" opacity="0.65"/>

          <!-- 第四層：環繞角色的自然流動淡墨雲氣帶 -->
          <g class="svg-mist-band-2">
            <ellipse cx="260" cy="185" rx="145" ry="28" fill="url(#mistWashGrad)" />
            <path d="M45 182 Q165 164 265 184 T405 174" fill="none" stroke="rgba(20,19,17,0.14)" stroke-width="5" stroke-linecap="round"/>
          </g>

          <!-- 第五層：近景焦墨危崖與古松盤桓 -->
          <path d="M0 228 Q92 172 175 212 T340 188 T420 218 L420 280 L0 280 Z" fill="url(#inkMountNear)" />
          <!-- 左側危崖迎客蒼松 -->
          <path d="M8 212 Q32 186 58 190 M22 196 Q46 174 76 178 M16 202 L0 238" stroke="#141311" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.58"/>
          <ellipse cx="56" cy="176" rx="22" ry="7" fill="#141311" opacity="0.38"/>
          <ellipse cx="72" cy="186" rx="18" ry="6" fill="#22201c" opacity="0.32"/>

          <!-- 遠空飛鶴 -->
          <path d="M295 44 Q303 37 310 43 Q317 37 325 44" stroke="#22201c" stroke-width="1.5" fill="none" opacity="0.62"/>
          <path d="M332 32 Q338 26 344 31 Q350 26 356 32" stroke="#22201c" stroke-width="1.2" fill="none" opacity="0.48"/>

          <!-- 右上角古畫朱砂閑章〔太初道境〕 -->
          <g transform="translate(372, 16)" opacity="0.82">
            <rect x="0" y="0" width="26" height="48" rx="1.5" fill="#a32c22" />
            <rect x="2" y="2" width="22" height="44" fill="none" stroke="#fbf8f1" stroke-width="0.9"/>
            <text x="13" y="20" fill="#fbf8f1" font-size="10" font-weight="900" text-anchor="middle">太初</text>
            <text x="13" y="37" fill="#fbf8f1" font-size="10" font-weight="900" text-anchor="middle">道境</text>
          </g>
        </svg>
      `;
    }

    buildCultivatorSVG(realmIndex, realmLayer) {
      // 微側身（三分之二側顏）盤膝撫膝靜坐寫意水墨立繪，搭配飄動髮絲、寬袖與搖曳朱砂劍穗
      return `
        <svg class="cultivator-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="inkRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fbf8f1"/>
              <stop offset="50%" stop-color="#ded6c4"/>
              <stop offset="85%" stop-color="#6e685e"/>
              <stop offset="100%" stop-color="#22201c"/>
            </linearGradient>
            <linearGradient id="inkCloakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4a463f" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#141311" stop-opacity="0.95"/>
            </linearGradient>
          </defs>

          <!-- 角色周圍自然蜿蜒的淡墨氣韻（非規則圓圈） -->
          <g class="svg-mist-band-1">
            <path d="M14 106 Q48 86 86 102 T148 92" fill="none" stroke="rgba(35,83,99,0.22)" stroke-width="4" stroke-linecap="round"/>
            <path d="M24 72 Q65 56 105 74 T144 64" fill="none" stroke="rgba(20,19,17,0.15)" stroke-width="3" stroke-linecap="round"/>
          </g>

          <!-- 背後斜懸古樸墨劍與緩緩搖曳的朱砂劍穗 -->
          <g class="svg-floating-sword">
            <line x1="36" y1="24" x2="128" y2="114" stroke="#141311" stroke-width="3.6" stroke-linecap="round"/>
            <line x1="36" y1="24" x2="128" y2="114" stroke="#fbf8f1" stroke-width="0.9" stroke-linecap="round"/>
            <path d="M42 40 L52 30" stroke="#7d5420" stroke-width="3.2" stroke-linecap="round"/>
            <!-- 搖曳朱砂劍穗 -->
            <g class="svg-tassel-pendulum">
              <path d="M36 24 Q24 35 27 50 Q29 60 21 70" fill="none" stroke="#a32c22" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M21 70 L17 77 M21 70 L23 78" stroke="#a32c22" stroke-width="1.6" stroke-linecap="round"/>
            </g>
          </g>

          <!-- 危崖古石與蒲團底座（寫意皴法筆觸） -->
          <g transform="translate(0, 5)">
            <ellipse cx="80" cy="128" rx="52" ry="10" fill="rgba(20, 19, 17, 0.22)" />
            <path d="M28 124 Q55 112 84 123 T134 120 Q108 136 28 124 Z" fill="#2c2a26" stroke="#141311" stroke-width="1.6"/>
            <path d="M44 119 Q76 108 114 118 Q82 128 44 119 Z" fill="#cfc6b4" stroke="#22201c" stroke-width="1.3"/>
          </g>

          <!-- 隨風緩緩飄動的寬袍長袖與水墨披帛 -->
          <g class="svg-robe-sleeve">
            <path d="M42 78 Q16 70 8 54 Q26 60 46 70" fill="none" stroke="#22201c" stroke-width="2.4" stroke-linecap="round" opacity="0.72"/>
            <path d="M112 74 Q138 64 150 46 Q132 58 108 68" fill="none" stroke="#141311" stroke-width="2.6" stroke-linecap="round" opacity="0.78"/>
            <path d="M116 84 Q142 82 152 70" fill="none" stroke="#235363" stroke-width="1.8" stroke-linecap="round" opacity="0.55"/>
          </g>

          <!-- 微側身盤膝靜坐修士主體 -->
          <g class="svg-torso-group">
            <!-- 右側濃墨外氅披風（營造微側身立體墨韻） -->
            <path d="M78 58 L108 62 Q126 82 118 116 L84 120 Z" fill="url(#inkCloakGrad)" />

            <!-- 盤膝下裳（左膝微曲、右腿內盤之寫意折線） -->
            <path d="M38 118 Q62 102 88 110 L118 116 Q82 128 38 118 Z" fill="url(#inkRobeGrad)" stroke="#141311" stroke-width="2" stroke-linejoin="round"/>

            <!-- 微側身交領素袍上身 -->
            <path d="M48 98 Q38 78 56 60 L82 58 L104 64 Q114 82 102 100 L62 100 Z" fill="url(#inkRobeGrad)" stroke="#141311" stroke-width="1.9" stroke-linejoin="round"/>
            <!-- 側向交領（偏左三分之二視角） -->
            <path d="M64 59 L76 85 L92 61" fill="none" stroke="#235363" stroke-width="2.8" stroke-linecap="round"/>
            <path d="M68 59 L77 80 L88 61" fill="none" stroke="#141311" stroke-width="1.5"/>

            <!-- 左手自然撫於左膝、右手於丹田結印 -->
            <path d="M52 80 Q44 96 46 110" fill="none" stroke="#141311" stroke-width="2.2" stroke-linecap="round"/>
            <circle cx="46" cy="111" r="3" fill="#f2eadb" stroke="#141311" stroke-width="1.2"/>
            <circle cx="77" cy="93" r="3.2" fill="#f2eadb" stroke="#141311" stroke-width="1.2"/>

            <!-- 丹田內斂氣韻紅點 -->
            <circle cx="77" cy="93" r="2.2" fill="#a32c22" opacity="0.9">
              <animate attributeName="r" values="1.8;3.6;1.8" dur="3.4s" repeatCount="indefinite"/>
            </circle>

            <!-- 飄動長髮絲（獨立微動態） -->
            <g class="svg-hair-strand">
              <path d="M88 40 Q108 46 126 38" stroke="#141311" stroke-width="2.6" fill="none" stroke-linecap="round"/>
              <path d="M90 45 Q112 54 132 49" stroke="#22201c" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.82"/>
              <path d="M66 44 Q58 62 52 78" stroke="#141311" stroke-width="3" fill="none" stroke-linecap="round"/>
            </g>

            <!-- 微側身頭部與道髻玉簪 -->
            <circle cx="77" cy="45" r="13" fill="#f5ede0" stroke="#141311" stroke-width="1.6"/>
            <path d="M63 40 Q76 26 91 39 Q85 30 76 30 Q68 30 63 40 Z" fill="#141311"/>
            <ellipse cx="79" cy="26" rx="6.5" ry="5" fill="#141311"/>
            <line x1="67" y1="27" x2="92" y2="25" stroke="#7d5420" stroke-width="2.2" stroke-linecap="round"/>

            <!-- 三分之二側顏眉眼與朱砂印（視線微向左下方觀心） -->
            <circle cx="74" cy="40" r="1.4" fill="#a32c22"/>
            <path d="M67 44 Q70 45.5 72.5 44" stroke="#141311" stroke-width="1.4" fill="none" stroke-linecap="round"/>
            <path d="M77.5 44 Q80.5 45.5 83.5 44" stroke="#141311" stroke-width="1.4" fill="none" stroke-linecap="round"/>
          </g>
        </svg>
      `;
    }

    renderView() {
      const vp = document.getElementById("view-viewport");
      if (!vp) return;
      vp.innerHTML = "";

      switch (this.currentView) {
        case "main": this.renderMainView(vp); break;
        case "roguelike": this.renderRoguelikeView(vp); break;
        case "puppet": this.renderPuppetView(vp); break;
        case "formation": this.renderFormationView(vp); break;
        case "alchemy": this.renderAlchemyView(vp); break;
        case "kungfu": this.renderKungfuView(vp); break;
        case "meridian": this.renderMeridianView(vp); break;
        case "inventory": this.renderInventoryView(vp); break;
        case "sect": this.renderSectView(vp); break;
        case "map": this.renderMapView(vp); break;
        case "market": this.renderMarketView(vp); break;
        default: this.renderMainView(vp); break;
      }
    }

    // ==================== 1. 【洞天靈台 · 水墨山水畫卷 × 卷軸收納 × 詩意吐納】 ====================
    renderMainView(container) {
      const realms = ["凝魄境", "洞天境", "道胎境", "神藏境", "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"];
      const subNav = document.createElement("div");
      subNav.className = "sub-nav-pills hide-in-zen";
      const tabs = [
        { id: "cultivate", label: "⛰️ 山居吐納" },
        { id: "furnace", label: "🔥 雙生丹爐" },
        { id: "divination", label: "☯️ 紫微演卦" },
        { id: "tribulation", label: "⚡ 渡劫道台" }
      ];
      tabs.forEach(t => {
        const b = document.createElement("button");
        b.className = `sub-pill-btn ${this.char.grottoSubTab === t.id ? 'active' : ''}`;
        b.innerText = t.label;
        b.addEventListener("click", () => {
          this.char.grottoSubTab = t.id;
          audio.playQiCharge();
          this.renderView();
        });
        subNav.appendChild(b);
      });
      container.appendChild(subNav);

      // 收納式「歲月書卷」（整合境界解鎖提示與最新機緣，預設僅顯示精簡一行卷軸，點擊才展開，大幅降低視覺噪音！）
      const scrollStrip = document.createElement("div");
      scrollStrip.className = "ink-scroll-strip hide-in-zen";
      const isScrollOpen = this.char.scrollNoticeExpanded;
      scrollStrip.innerHTML = `
        <div class="ink-scroll-header">
          <span>📜 歲月書卷 · 【${realms[this.char.realmIndex]}】天地法則與近期機緣</span>
          <span style="color:var(--cinnabar-red); font-size:0.92rem;">${isScrollOpen ? '▴ 收卷' : '▾ 展卷'}</span>
        </div>
        ${isScrollOpen ? `
          <div class="ink-scroll-body">
            <div style="font-size:0.92rem; color:var(--ink-black); margin-bottom:4px;">
              • <b>當前道境法則：</b>${this.getRealmUnlockSummary(this.char.realmIndex)}
            </div>
            <div style="font-size:0.92rem; color:var(--stone-cyan); margin-bottom:6px;">
              • <b>近期所得機緣：</b>${this.char.recentFortune || '山中清修，靜候天機'}
            </div>
            <div style="display:flex; gap:6px;">
              <button class="chip-btn active" id="btn-cycle-realm-tier">
                🌌 預覽下一大境界天地法則 (${realms[this.char.realmIndex]} ➔ 下一階)
              </button>
              <button class="chip-btn" id="btn-jump-map-from-scroll">前往萬里江山 ➔</button>
            </div>
          </div>
        ` : ''}
      `;
      container.appendChild(scrollStrip);

      scrollStrip.querySelector(".ink-scroll-header")?.addEventListener("click", () => {
        this.char.scrollNoticeExpanded = !this.char.scrollNoticeExpanded;
        this.renderView();
      });
      scrollStrip.querySelector("#btn-jump-map-from-scroll")?.addEventListener("click", () => {
        this.currentView = "map";
        this.renderView();
      });
      scrollStrip.querySelector("#btn-cycle-realm-tier")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.char.realmIndex = (this.char.realmIndex + 1) % realms.length;
        if (this.char.realmIndex >= 1 && this.char.garden.length < 4) {
          this.char.garden.push({ slot: 3, herbId: "herb_fengxue", name: "涅槃鳳血草", progress: 80, status: "茂盛期 (80%)" });
        }
        if (this.char.realmIndex >= 2 && this.char.garden.length < 5) {
          this.char.garden.push({ slot: 4, herbId: "herb_taixu", name: "太虛萬年玄參", progress: 100, status: "可採擷" });
        }
        if (this.char.realmIndex >= 3 && this.char.garden.length < 6) {
          this.char.garden.push({ slot: 5, herbId: "herb_ziyang", name: "混沌造化神蓮", progress: 100, status: "可採擷" });
        }
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `畫卷推演：${realms[this.char.realmIndex]}`);
        this.updateHeader();
        this.renderView();
      });

      if (this.char.grottoSubTab === "furnace") {
        this.renderFurnaceSubView(container);
        return;
      }
      if (this.char.grottoSubTab === "divination") {
        this.renderDivinationSubView(container);
        return;
      }
      if (this.char.grottoSubTab === "tribulation") {
        this.renderTribulationSubView(container);
        return;
      }
      this.renderCultivateCoreView(container);
    }

    // 1A. 【混沌雙生熔爐：異火 × 劫雷 收服與融爆（含嚴格上限鎖定與資源同步）】
    renderFurnaceSubView(container) {
      const maxFlames = 6;
      const maxThunders = 6;
      const maxFuseLv = 10;
      const curFuseLv = this.char.furnaceFusedLevel || 2;
      const flameMaxed = this.char.flamesOwned.length >= maxFlames;
      const thunderMaxed = this.char.thundersOwned.length >= maxThunders;
      const fuseMaxed = curFuseLv >= maxFuseLv;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>🔥 太初混元雙生熔爐</h2>
          <span class="rarity-pill rarity-gold">熔爐: Lv.${curFuseLv}/${maxFuseLv} (殺力+${curFuseLv * 85})</span>
        </div>
        <p style="font-size:0.94rem; color:#22201c; margin-bottom:10px;">
          於丹田熔爐中收服天地玄煞神火與神霄劫雷（各上限 6 種），雙生融合最高可達 Lv.10 大圓滿！
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
          <div style="background:#fdf6f4; border:1px solid #f43f5e; border-radius:10px; padding:10px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <b style="color:#a83228; font-size:1.0rem;">🔥 玄煞神火 (${this.char.flamesOwned.length}/${maxFlames})</b>
              <div style="margin-top:6px; display:flex; flex-direction:column; gap:4px;">
                ${this.char.flamesOwned.map(f => `<span class="rarity-pill rarity-gold" style="font-size:0.85rem;">🔥 ${f}</span>`).join("")}
              </div>
            </div>
            <button class="btn-modern gold full ${flameMaxed ? 'btn-maxed' : ''}" id="btn-absorb-flame" ${flameMaxed ? 'disabled' : ''} style="margin-top:8px; font-size:0.86rem;">
              ${flameMaxed ? '🌟 異火已滿 (6/6 MAX)' : '🔥 吞噬異火 (150靈石)'}
            </button>
          </div>

          <div style="background:#f2f6f7; border:1px solid #c084fc; border-radius:10px; padding:10px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <b style="color:#4a3354; font-size:1.0rem;">⚡ 神霄劫雷 (${this.char.thundersOwned.length}/${maxThunders})</b>
              <div style="margin-top:6px; display:flex; flex-direction:column; gap:4px;">
                ${this.char.thundersOwned.map(t => `<span class="rarity-pill rarity-purple" style="font-size:0.85rem;">⚡ ${t}</span>`).join("")}
              </div>
            </div>
            <button class="btn-modern full ${thunderMaxed ? 'btn-maxed' : ''}" id="btn-absorb-thunder" ${thunderMaxed ? 'disabled' : ''} style="margin-top:8px; font-size:0.86rem;">
              ${thunderMaxed ? '🌟 劫雷已滿 (6/6 MAX)' : '⚡ 煉化雷源 (150靈石)'}
            </button>
          </div>
        </div>

        <div class="alchemy-furnace-stage" id="fusion-stage-box">
          <div style="font-size:2.1rem;">🪷🔥⚡</div>
          <div style="font-size:0.86rem; font-weight:900; color:#a83228; margin-top:4px;">
            雙生火雷融合度：Lv.${curFuseLv} / ${maxFuseLv} · 暴擊率額外 +${curFuseLv * 4}%
          </div>
          <div style="font-size:0.9rem; color:#385e4c; margin:4px 0 8px;">
            每次融合成功永久提升全神通殺力 +85、會心暴擊 +4%（上限 Lv.10）。
          </div>
          <button class="btn-jade ${fuseMaxed ? 'btn-maxed' : ''}" id="btn-fuse-flame-thunder" ${fuseMaxed ? 'disabled' : ''} style="width:100%;">
            <span class="main-label">${fuseMaxed ? '🌟 火雷融爆已臻大圓滿 (Lv.10 MAX)' : '💥 啟動火雷雙生融爆 (消耗 250 真元)'}</span>
          </button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-absorb-flame")?.addEventListener("click", (e) => {
        if (this.char.flamesOwned.length >= maxFlames) return;
        if (!this.trySpendResource("silver", 150, "上品靈石")) return;
        const allFlames = ["幽冥碧髓煞火", "大日梵天真陽炎", "太虛太素虛無火", "九幽冥帝業火", "八荒涅槃凰炎", "混沌開天祖火"];
        const pick = allFlames.find(f => !this.char.flamesOwned.includes(f));
        if (pick) this.char.flamesOwned.push(pick);
        this.char.strength += 5;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `收服【${pick}】！力魄+5`);
        this.renderView();
      });

      card.querySelector("#btn-absorb-thunder")?.addEventListener("click", (e) => {
        if (this.char.thundersOwned.length >= maxThunders) return;
        if (!this.trySpendResource("silver", 150, "上品靈石")) return;
        const allThunders = ["庚金天罡破邪雷", "都天紫極辟邪神雷", "九劫混沌滅世雷", "太乙青冥神雷", "陰陽兩儀辟魔雷", "鴻蒙紫霄天罰"];
        const pick = allThunders.find(t => !this.char.thundersOwned.includes(t));
        if (pick) this.char.thundersOwned.push(pick);
        this.char.agility += 5;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `煉化【${pick}】！遁速+5`);
        this.renderView();
      });

      card.querySelector("#btn-fuse-flame-thunder")?.addEventListener("click", (e) => {
        if ((this.char.furnaceFusedLevel || 2) >= maxFuseLv) return;
        if (!this.trySpendResource("qi", 250, "本源真氣")) return;
        this.char.furnaceFusedLevel = (this.char.furnaceFusedLevel || 2) + 1;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "qi", `💥火雷融爆 Lv.${this.char.furnaceFusedLevel}！殺力+85`);
        this.renderView();
      });
    }

    // 1B. 【紫微斗數天機卜卦：每日限卜 3 次】
    renderDivinationSubView(container) {
      const div = this.char.divinationState || { title: "大吉 · 紫微高照", bonusDesc: "探索隨機掉落數量 +1", mult: 1.35 };
      const used = this.char.dailyDivinationCount || 0;
      const maxDiv = 3;
      const isMaxed = used >= maxDiv;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h2>🔮 紫微斗數天機卜卦</h2>
          <span class="rarity-pill rarity-gold">今日已卜: ${used}/${maxDiv} 次</span>
        </div>
        <div class="formation-centerpiece-card">
          <div class="formation-wheel-icon">🧭🌌</div>
          <div style="font-size:1rem; font-weight:900; color:#a83228; margin-top:6px;">
            今日命盤卦象：【${div.title}】
          </div>
          <div style="font-size:0.96rem; color:#385e4c; margin:6px 0;">
            ✨ 卦象法則加成：${div.bonusDesc}
          </div>
          <button class="btn-jade ${isMaxed ? 'btn-maxed' : ''}" id="btn-cast-divination" ${isMaxed ? 'disabled' : ''} style="width:100%; margin-top:8px;">
            <span class="main-label">${isMaxed ? '🌟 今日天機三卜已達上限 (3/3)' : `🎲 消耗 100 真元重演紫微卦 (${maxDiv - used}次剩餘)`}</span>
          </button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-cast-divination")?.addEventListener("click", (e) => {
        if ((this.char.dailyDivinationCount || 0) >= maxDiv) return;
        if (!this.trySpendResource("qi", 100, "本源真氣")) return;
        this.char.dailyDivinationCount = (this.char.dailyDivinationCount || 0) + 1;
        const pool = [
          { title: "鴻運 · 紫微帝星臨命", bonusDesc: "大荒探索必掉 4 件寶物，橙紅造化裝備機率提升 50%！", mult: 1.6 },
          { title: "大凶 · 白虎煞衝 (富貴險中求)", bonusDesc: "迎敵遭遇狂暴領主，但斬殺後戰利品與靈石價值提升 300%！", mult: 2.0 },
          { title: "天機 · 青龍化祿", bonusDesc: "藥園催熟產量翻倍，聚元吐納頓悟機率提升至 45%！", mult: 1.4 }
        ];
        this.char.divinationState = pool[Math.floor(Math.random() * pool.length)];
        this.char.luck += 4;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "qi", `卜出【${this.char.divinationState.title}】！`);
        this.renderView();
      });
    }

    // 1C. 【九天雷劫渡劫台：大圓滿後鎖定上限】
    renderTribulationSubView(container) {
      const tribNames = ["凡胎洗髓劫", "洞天開海劫", "紫曜三罡雷劫", "五行雷煞天劫", "虛空大湮滅劫", "星辰隕星天罰", "兩界破滅神雷", "真仙因果大劫", "九九無量滅世混沌天罰"];
      const curTrib = tribNames[this.char.realmIndex] || "九九混沌天罰";
      const isMaxRealm = this.char.realmIndex >= 8;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h2>⚡ 九霄引雷渡劫台</h2>
          <span class="rarity-pill rarity-purple">${isMaxRealm ? '至高大圓滿' : curTrib}</span>
        </div>
        <div class="alchemy-furnace-stage" style="background:radial-gradient(circle, rgba(109,40,217,0.45), rgba(8,14,26,0.96)); border-color:#c084fc;">
          <div style="font-size:2.4rem;">🌩️⚡🧘‍♂️</div>
          <div style="font-size:0.9rem; font-weight:900; color:#a83228; margin-top:6px;">
            ${isMaxRealm ? '👑 你已登臨【太初道主 (大圓滿)】，萬界共尊！' : `【${curTrib}】· 渡劫成功直接躍遷大境界並重構大荒法則！`}
          </div>
          <div style="font-size:0.94rem; color:#22201c; margin:6px 0 10px;">
            當前護體氣血: <b>${this.char.getEffectiveStat("hp")}</b> ｜ 道紋靈罡: <b>${this.char.getEffectiveStat("def")}</b>
          </div>
          <button class="btn-breakthrough-talisman ${isMaxRealm ? 'btn-maxed' : 'state-ready'}" id="btn-trigger-tribulation" ${isMaxRealm ? 'disabled' : ''} style="width:100%;">
            <span style="font-size:0.88rem; font-weight:900;">
              ${isMaxRealm ? '👑 已證道太初道主 (境界已達最高上限 MAX)' : '⚡ 引落九天神雷 · 渡劫破入下一大境界 (需 300 真元)'}
            </span>
          </button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-trigger-tribulation")?.addEventListener("click", () => {
        if (this.char.realmIndex >= 8) return;
        if (!this.trySpendResource("qi", 300, "本源真氣")) return;
        audio.playLevelUp();
        this.char.realmIndex++;
        this.char.realmLayer = 1;
        this.rollRandomizedLoot(this.char.realmIndex, 3, "天劫賜福");
        this.char.grottoSubTab = "cultivate";
        this.updateHeader();
        this.renderView();
        const modal = document.getElementById("breakthrough-modal-overlay");
        if (modal) {
          const titleEl = document.getElementById("celebration-realm-title");
          if (titleEl) titleEl.innerText = `⚡渡劫飛升！${this.char.name} 登臨【${this.char.getRealmTitle()}】！`;
          modal.classList.add("active");
        }
      });
    }

    renderCultivateCoreView(container) {
      const realms = ["凝魄境", "洞天境", "道胎境", "神藏境", "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"];
      const reqExp = this.getReqExp();
      const expPercent = Math.min(100, Math.floor((this.char.exp / reqExp) * 100));
      const todayPercent = Math.min(100, Math.floor((this.char.todayExp / this.char.dailyGoalExp) * 100));

      const breathsLeft = this.char.efficientBreathsLeft;
      const isBreathDepleted = breathsLeft <= 0;
      const isMaxRealm = this.char.realmIndex >= 8;
      const gainPerBreath = breathsLeft > 0 ? 320 : 240;
      const remainExp = Math.max(0, reqExp - this.char.exp);
      const breathsNeeded = Math.ceil(remainExp / gainPerBreath);

      const nextLayer = this.char.realmLayer < 9 ? this.char.realmLayer + 1 : 1;
      const nextRealmIdx = this.char.realmLayer < 9 ? this.char.realmIndex : Math.min(8, this.char.realmIndex + 1);
      const nextRealmName = isMaxRealm ? "太初道主 (大圓滿)" : `${realms[nextRealmIdx]} 第${nextLayer}重天`;

      // 「已臻太初至境」改為淡墨題字＋小小朱砂印章感
      let btnStateClass = "state-locked";
      let btnMainHtml = `<span style="font-size:1.12rem; font-weight:900;">氣海積蓄 · ${expPercent}%</span>`;
      let btnSubText = `尚需吐納 ${breathsNeeded} 次方臻圓滿`;
      if (isMaxRealm) {
        btnStateClass = "realm-zenith-calligraphy";
        btnMainHtml = `<span style="font-size:1.12rem; font-weight:900; color:var(--ink-dark);">已臻太初至境 <span class="mini-red-seal">道成</span></span>`;
        btnSubText = "萬法歸宗 · 展卷可觀天地幻象";
      } else if (expPercent >= 100) {
        btnStateClass = "state-ready";
        btnMainHtml = `<span style="font-size:1.14rem; font-weight:900;">叩關破境 <span class="mini-red-seal" style="background:#fbf8f1; color:var(--cinnabar-red);">可破</span></span>`;
        btnSubText = `水到渠成 · 直入【${nextRealmName}】`;
      } else if (expPercent >= 80) {
        btnStateClass = "state-near";
        btnMainHtml = `<span style="font-size:1.12rem; font-weight:900;">瓶頸微鬆 (${expPercent}%)</span>`;
        btnSubText = `再吐納 ${breathsNeeded} 次即可叩關`;
      }

      const envMeta = this.getRealmEnvironmentMeta(this.char.realmIndex, this.char.realmLayer);

      // 中間提示句隨狀態變化，具文言餘韻
      let poeticStateLine = this.char.moodText;
      if (!poeticStateLine || poeticStateLine.includes("星辰靈氣")) {
        if (isMaxRealm) poeticStateLine = "大道至簡，返璞歸真，萬古長空一畫卷。";
        else if (expPercent >= 100) poeticStateLine = "丹田氣滿，靈台澄明，破關契機已至。";
        else if (expPercent >= 75) poeticStateLine = "周天搬運，氣貫百脈，隱聞松濤風雷之聲。";
        else poeticStateLine = "松風入懷，氣隨息轉，萬慮皆歸於靜。";
      }

      // 今日行程：全部完成後自動收合為一行簡潔提示「今日行程已圓滿，心神澄明」
      const tasks = this.char.dailyTasks || [];
      const completedCount = tasks.filter(t => t.progress >= t.max).length;
      const allClaimed = tasks.length > 0 && tasks.every(t => t.claimed);
      const isDestinyOpen = this.char.destinyExpanded;

      const destinyBar = document.createElement("div");
      destinyBar.className = `daily-destiny-bar hide-in-zen ${allClaimed && !isDestinyOpen ? 'all-done-compact' : ''}`;
      destinyBar.innerHTML = `
        <div class="destiny-header" id="destiny-toggle-header">
          <span>${allClaimed ? '📜 今日行程已圓滿，心神澄明' : `📜 今日行程（已成 ${completedCount} / 共 3 事）`}</span>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="chip-btn" id="btn-next-day-reset">
              破曉入明日
            </button>
            <span style="font-size:0.86rem; color:var(--stone-cyan); font-weight:800;">${isDestinyOpen ? '▴ 收卷' : '▾ 展卷'}</span>
          </div>
        </div>
        ${isDestinyOpen ? '<div class="destiny-tasks-row" id="destiny-tasks-container"></div>' : ''}
      `;
      container.appendChild(destinyBar);

      destinyBar.querySelector("#destiny-toggle-header")?.addEventListener("click", (e) => {
        if (e.target.id === "btn-next-day-reset") return;
        this.char.destinyExpanded = !this.char.destinyExpanded;
        this.renderView();
      });
      destinyBar.querySelector("#btn-next-day-reset")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.resetDailyLimits();
      });

      if (isDestinyOpen) {
        const tasksRow = destinyBar.querySelector("#destiny-tasks-container");
        tasks.forEach(task => {
          const isReady = task.progress >= task.max && !task.claimed;
          const chip = document.createElement("div");
          chip.className = `destiny-chip ${isReady ? 'ready' : ''} ${task.claimed ? 'claimed' : ''}`;
          chip.innerHTML = `
            <div style="font-weight:900; color:var(--ink-black); font-size:0.92rem;">${task.claimed ? '〔已畢〕' : (isReady ? '〔可領〕' : '〔修行〕')}${task.title}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:1.04rem;">
              <span style="color:var(--ink-mid); font-weight:700;">${task.progress}/${task.max}</span>
              <b style="color:var(--cinnabar-red);">${task.claimed ? '已入帳' : (isReady ? '落印領賞' : task.rewardLabel)}</b>
            </div>
          `;
          chip.addEventListener("click", () => {
            if (task.claimed) {
              this.showSystemToast("此項今日行程賞賜已落印入帳。");
              return;
            }
            if (task.progress < task.max) {
              if (task.id === "dt_abyss") { this.currentView = "roguelike"; this.renderView(); }
              else if (task.id === "dt_herb") { this.currentView = "alchemy"; this.renderView(); }
              return;
            }
            task.claimed = true;
            audio.playEpiphanyBell();
            if (task.rewardType === "exp") { this.char.exp += task.rewardVal; this.char.todayExp += task.rewardVal; }
            if (task.rewardType === "silver") { this.char.silver += task.rewardVal; }
            if (task.rewardType === "ingots") { this.char.ingots += task.rewardVal; }
            // 若三項皆已完成領取，自動收合卷軸！
            if (tasks.every(t => t.claimed)) {
              this.char.destinyExpanded = false;
              this.char.moodText = "今日諸事皆畢，山間清風徐來，心神澄明。";
            } else {
              this.char.moodText = `完畢今日功課【${task.title}】，道心漸凝。`;
            }
            this.triggerFlyingReward(chip, task.rewardType, `行程圓滿 · ${task.rewardLabel}`);
            this.updateHeader();
            this.renderView();
          });
          tasksRow.appendChild(chip);
        });
      }

      const card = document.createElement("div");
      card.className = "game-card cultivation-hero-card";
      const stageModeClass = this.char.cameraMode === "panoramic" ? "panoramic-mode" : "closeup-mode";

      card.innerHTML = `
        <div class="stage-top-controls hide-in-zen">
          <div class="view-switch-group">
            <button class="chip-btn ${this.char.cameraMode === 'closeup' ? 'active' : ''}" id="btn-cam-closeup">墨韻特寫</button>
            <button class="chip-btn ${this.char.cameraMode === 'panoramic' ? 'active' : ''}" id="btn-cam-panoramic">遠山俯視</button>
            <button class="chip-btn" id="btn-open-contemplation">內景觀想</button>
          </div>
          <button class="chip-btn" id="btn-enter-zen">畫中意境</button>
        </div>

        <div class="cultivation-stage ${stageModeClass}" id="main-cultivation-stage">
          <div id="preview-banner-slot"></div>

          <!-- 多層水墨遠山與流動煙雲背景（人在畫中） -->
          ${this.buildInkLandscapeSVG(this.char.realmIndex)}

          <!-- 文言心境題跋 -->
          <div class="mood-bubble" id="char-mood-bubble">
            「${poeticStateLine}」
          </div>

          <!-- 微側身盤膝靜坐寫意水墨修士 -->
          <div class="cultivator-centerpiece" id="cultivator-avatar-touch" title="長按展開內景觀想畫卷">
            ${this.buildCultivatorSVG(this.char.realmIndex, this.char.realmLayer)}
          </div>

          <div style="text-align:center; margin-top:6px; z-index:8;">
            <div class="hero-realm-title">
              ${this.char.name} · ${this.char.getRealmTitle()}
            </div>
            <div class="hero-realm-sub">
              ${this.char.cameraMode === 'panoramic' ? '〔遠山長卷〕千峰競秀，雲海松濤盡收眼底' : `〔山居靈台〕${envMeta.bgName} · ${envMeta.soundDesc}`}
            </div>
          </div>
        </div>

        <div class="dual-progress-box">
          <div class="progress-top-meta" style="flex-wrap:wrap; gap:4px;">
            <span>丹田元氣：<b style="color:var(--ink-black); font-weight:900; font-size:1.02rem;">${this.char.exp} / ${reqExp} (${expPercent}%)</b></span>
            <span class="progress-countdown-tag">
              ${isMaxRealm ? '已臻太初至境 · 萬法歸一' : (expPercent >= 100 ? '氣海盈滿 · 可叩關破境' : `尚需吐納 ${breathsNeeded} 次`)}
            </span>
          </div>
          <div class="dual-track-outer">
            <div class="track-total-fill" style="width: ${expPercent}%;"></div>
            <div class="track-today-fill" style="width: ${todayPercent}%;" title="今日修為進境"></div>
          </div>
          <div class="progress-sub-meta" style="flex-wrap:wrap; gap:6px;">
            <span>今日功課：<b>${Math.min(this.char.todayExp, this.char.dailyGoalExp)} / ${this.char.dailyGoalExp} (${todayPercent}%)</b></span>
            <span id="btn-preview-next-realm" style="color:var(--cinnabar-red); cursor:pointer; font-weight:900; border-bottom:1.5px solid var(--cinnabar-red);">
              展卷預覽下一重天水墨幻象
            </span>
          </div>
        </div>

        <div class="action-buttons-row hide-in-zen">
          <button class="btn-jade ${isBreathDepleted ? 'btn-maxed' : ''}" id="btn-meditate-quick" ${isBreathDepleted ? 'disabled' : ''}>
            <span class="main-label">${isBreathDepleted ? '今日吐納已滿' : '聚元吐納'}</span>
            <span class="sub-label">${isBreathDepleted ? '按「破曉入明日」延續' : `長按引墨氣入丹田 (${breathsLeft}/${this.char.maxEfficientBreaths})`}</span>
          </button>
          <button class="btn-breakthrough-talisman ${btnStateClass}" id="btn-breakthrough">
            ${btnMainHtml}
            <span style="font-size:1.04rem; font-weight:700; margin-top:3px;">${btnSubText}</span>
          </button>
        </div>

        <div class="hide-in-zen" style="margin-top:12px; border-top:1px solid rgba(34,32,28,0.25); padding-top:10px;">
          <div class="dao-foundation-header" id="btn-toggle-dao-card">
            <div style="display:flex; align-items:center; gap:8px;">
              <h3>仙道五維道基</h3>
              <span class="rarity-pill rarity-blue">
                本源真氣：<b>${this.char.qi}</b>
              </span>
            </div>
            <span style="font-size:0.88rem; color:var(--stone-cyan); font-weight:800;">
              ${this.char.daoExpanded ? '▴ 收合道基' : '▾ 展開六維'}
            </span>
          </div>
          <div class="dao-diagnosis-banner">
            <span><b>道基批註：</b>護體靈罡 (<b>${this.char.getEffectiveStat("def")}</b>) 可於【納戒】祭煉仙甲或於【氣脈】淬鍊霸王軀以固本培元。</span>
          </div>
          <div class="attr-story-grid" id="dao-story-grid"></div>
        </div>

        <div class="portal-grid hide-in-zen">
          <div class="portal-btn" data-target="roguelike">
            <span class="portal-icon">淵</span>
            <div class="portal-info">
              <span class="portal-name">萬劫淵 · 第${this.char.abyssFloor}層</span>
              <span class="portal-hook-tag">道印三選一</span>
            </div>
          </div>
          <div class="portal-btn" data-target="puppet">
            <span class="portal-icon">偶</span>
            <div class="portal-info">
              <span class="portal-name">機關偶 · ${this.char.puppets.length}/6具</span>
              <span class="portal-hook-tag">靈礦餘 ${this.char.dailyMineCollectLeft}/3 次</span>
            </div>
          </div>
          <div class="portal-btn" data-target="formation">
            <span class="portal-icon">陣</span>
            <div class="portal-info">
              <span class="portal-name">奇門陣 · 八卦推演</span>
              <span class="portal-hook-tag">守衛餘 ${this.char.dailyTdWavesLeft}/3 波</span>
            </div>
          </div>
          <div class="portal-btn" data-target="alchemy">
            <span class="portal-icon">丹</span>
            <div class="portal-info">
              <span class="portal-name">歲漏圃 · 靈精${this.char.epochDew}滴</span>
              <span class="portal-hook-tag">${this.char.garden.filter(g=>g.progress>=100).length}塊靈草待採</span>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);

      const allStatsMeta = [
        { key: "hp", label: "血魄氣血", val: this.char.getEffectiveStat("hp"), nextTarget: 5000, unlockHint: "下階：太荒金身" },
        { key: "atk", label: "神通殺力", val: this.char.getEffectiveStat("atk"), nextTarget: 1200, unlockHint: "下階：庚金劍意" },
        { key: "def", label: "道紋靈罡", val: this.char.getEffectiveStat("def"), nextTarget: 500, unlockHint: "下階：玄武護體" },
        { key: "mp", label: "洞天真元", val: this.char.getEffectiveStat("mp"), nextTarget: 2500, unlockHint: "下階：星辰氣海" },
        { key: "speed", label: "虛空遁速", val: this.char.getEffectiveStat("speed"), nextTarget: 200, unlockHint: "下階：踏月無痕" },
        { key: "crit", label: "會心破綻", val: this.char.getEffectiveStat("crit"), suffix: "%", nextTarget: 50, unlockHint: "下階：驚雷一擊" }
      ];
      const visibleStats = this.char.daoExpanded ? allStatsMeta : allStatsMeta.slice(0, 3);
      const daoGrid = card.querySelector("#dao-story-grid");
      visibleStats.forEach(st => {
        const pct = Math.min(100, Math.floor((st.val / st.nextTarget) * 100));
        const nearUnlock = pct >= 78;
        const itemEl = document.createElement("div");
        itemEl.className = `attr-story-card ${nearUnlock ? 'near-unlock' : ''}`;
        itemEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem;">
            <span style="color:var(--ink-mid); font-weight:700;">${st.label}</span>
            <b style="color:${nearUnlock ? 'var(--cinnabar-red)' : 'var(--ink-black)'}; font-size:0.98rem; font-weight:900;">${st.val}${st.suffix || ''}</b>
          </div>
          <div class="attr-mini-bar">
            <div class="attr-mini-fill" style="width:${pct}%;"></div>
          </div>
          <div class="attr-unlock-hint">${pct >= 100 ? '已臻化境' : st.unlockHint}</div>
        `;
        daoGrid.appendChild(itemEl);
      });

      card.querySelector("#btn-toggle-dao-card")?.addEventListener("click", () => {
        this.char.daoExpanded = !this.char.daoExpanded;
        this.renderView();
      });
      card.querySelector("#btn-cam-closeup")?.addEventListener("click", () => {
        this.char.cameraMode = "closeup";
        this.renderView();
      });
      card.querySelector("#btn-cam-panoramic")?.addEventListener("click", () => {
        this.char.cameraMode = "panoramic";
        this.renderView();
      });
      card.querySelector("#btn-enter-zen")?.addEventListener("click", () => {
        this.toggleZenMode(true);
      });
      card.querySelector("#btn-open-contemplation")?.addEventListener("click", () => {
        this.openContemplationModal();
      });

      const avatarTouch = card.querySelector("#cultivator-avatar-touch");
      let pressTimer = null;
      avatarTouch?.addEventListener("mousedown", () => { pressTimer = setTimeout(() => this.openContemplationModal(), 500); });
      avatarTouch?.addEventListener("mouseup", () => { if (pressTimer) clearTimeout(pressTimer); });
      avatarTouch?.addEventListener("touchstart", () => { pressTimer = setTimeout(() => this.openContemplationModal(), 500); });
      avatarTouch?.addEventListener("touchend", () => { if (pressTimer) clearTimeout(pressTimer); });

      card.querySelector("#btn-preview-next-realm")?.addEventListener("click", () => {
        this.triggerNextRealmPreview(nextRealmName);
      });

      const medBtn = card.querySelector("#btn-meditate-quick");
      const doBreath = () => this.performBreathingCultivation();
      medBtn?.addEventListener("click", doBreath);
      medBtn?.addEventListener("mousedown", () => {
        if (this.char.efficientBreathsLeft <= 0) return;
        medBtn.classList.add("holding");
        if (this.holdTimer) clearInterval(this.holdTimer);
        this.holdTimer = setInterval(doBreath, 420);
      });
      const stopHold = () => {
        medBtn?.classList.remove("holding");
        if (this.holdTimer) { clearInterval(this.holdTimer); this.holdTimer = null; }
      };
      medBtn?.addEventListener("mouseup", stopHold);
      medBtn?.addEventListener("mouseleave", stopHold);
      medBtn?.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (this.char.efficientBreathsLeft <= 0) return;
        doBreath();
        medBtn.classList.add("holding");
        if (this.holdTimer) clearInterval(this.holdTimer);
        this.holdTimer = setInterval(doBreath, 420);
      });
      medBtn?.addEventListener("touchend", stopHold);

      card.querySelector("#btn-breakthrough")?.addEventListener("click", () => {
        if (isMaxRealm) {
          this.triggerNextRealmPreview("太初大道 · 諸天幻象");
          return;
        }
        this.performBreakthrough(reqExp, nextRealmName);
      });

      card.querySelectorAll(".portal-btn").forEach(p => {
        p.addEventListener("click", () => {
          this.currentView = p.dataset.target;
          this.renderView();
        });
      });
    }

    spawnQiParticles(isEpiphany = false, shortPhrase = "氣脈微暢") {
      const stage = document.getElementById("main-cultivation-stage");
      const center = document.getElementById("cultivator-avatar-touch");
      if (!stage) return;
      if (center) {
        center.classList.add("inhaling");
        setTimeout(() => center.classList.remove("inhaling"), 450);
      }

      // 淡墨旋流氣弧緩緩匯入丹田
      const arc = document.createElement("div");
      arc.className = "ink-wisp-arc";
      stage.appendChild(arc);
      setTimeout(() => arc.remove(), 860);

      const runes = ["墨", "炁", "雲", "風", "道"];
      for (let i = 0; i < 5; i++) {
        const p = document.createElement("div");
        p.className = "qi-stream-particle";
        const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.5;
        const dist = 66 + Math.random() * 24;
        p.style.setProperty("--sx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--sy", `${Math.sin(angle) * dist}px`);
        p.innerText = runes[i % runes.length];
        stage.appendChild(p);
        setTimeout(() => p.remove(), 850);
      }

      const ep = document.createElement("div");
      ep.className = "floating-epiphany";
      ep.innerHTML = isEpiphany
        ? `<span class="mini-red-seal" style="margin-right:6px;">頓悟</span>靈台空明 · 元氣暴湧`
        : `${shortPhrase}`;
      stage.appendChild(ep);
      setTimeout(() => ep.remove(), 1400);
    }

    performBreathingCultivation() {
      if (this.char.efficientBreathsLeft <= 0) {
        if (this.holdTimer) { clearInterval(this.holdTimer); this.holdTimer = null; }
        this.showSystemToast("今日吐納已臻圓滿，請按「破曉入明日」延續修行", true);
        this.renderView();
        return;
      }
      this.char.efficientBreathsLeft--;

      const isEpiphany = Math.random() < 0.25;
      const baseGain = 320;
      const finalGain = isEpiphany ? baseGain * 2 : baseGain;

      this.char.exp += finalGain;
      this.char.todayExp += finalGain;
      this.char.qi += isEpiphany ? 160 : 90;

      // 極短文言回饋與詩意心境
      const shortFeedbacks = [
        { short: "「氣脈微暢 · 丹田生溫」", mood: "氣沉丹田，心神微定，山間清風徐來。" },
        { short: "「心神略定 · 吐故納新」", mood: "吐故納新，松風入懷，萬慮皆歸於靜。" },
        { short: "「墨氣歸元 · 靈台漸明」", mood: "墨氣盤桓，周天搬運，靈台漸生明光。" },
        { short: "「雲水禪心 · 道韻暗生」", mood: "雲水禪心，氣貫百脈，道基愈發凝實。" }
      ];
      const pick = shortFeedbacks[Math.floor(Math.random() * shortFeedbacks.length)];

      if (isEpiphany) {
        audio.playEpiphanyBell();
        this.char.moodText = "偶得天機，神遊物外，天地氣韻盡納於心。";
      } else {
        audio.playQiCharge();
        this.char.moodText = pick.mood;
      }

      this.advanceDailyTask("dt_breath", 1);
      this.updateHeader();
      this.renderView();
      this.spawnQiParticles(isEpiphany, pick.short);
    }

    triggerNextRealmPreview(nextRealmName) {
      const appEl = document.getElementById("app-container");
      const slot = document.getElementById("preview-banner-slot");
      if (!appEl || !slot) return;
      audio.playEpiphanyBell();
      appEl.classList.add("previewing-next-realm");
      slot.innerHTML = `
        <div class="floating-epiphany" style="top:10px;">
          <span class="cinnabar-seal-stamp" style="margin-right:6px;">水墨幻象</span>
          預演【${nextRealmName}】之境：千山雲開，道基氣血將迎來蛻變
        </div>
      `;
      setTimeout(() => {
        appEl.classList.remove("previewing-next-realm");
        if (slot) slot.innerHTML = "";
      }, 1500);
    }

    performBreakthrough(reqExp, nextRealmName) {
      if (this.char.realmIndex >= 8) {
        this.showSystemToast("👑 已登臨太初道主大圓滿最高境界！");
        return;
      }
      if (this.char.exp < reqExp) {
        this.triggerNextRealmPreview(nextRealmName);
        this.showSystemToast(`⚠️ 元氣尚未盈滿！還差 ${reqExp - this.char.exp} 點天地元氣方可突破`, true);
        return;
      }

      const oldHp = this.char.getEffectiveStat("hp");
      const oldAtk = this.char.getEffectiveStat("atk");
      const oldMp = this.char.getEffectiveStat("mp");
      const oldDef = this.char.getEffectiveStat("def");

      this.char.exp -= reqExp;
      if (this.char.realmLayer < 9) {
        this.char.realmLayer++;
      } else if (this.char.realmIndex < 8) {
        this.char.realmIndex++;
        this.char.realmLayer = 1;
      }

      const newHp = this.char.getEffectiveStat("hp");
      const newAtk = this.char.getEffectiveStat("atk");
      const newMp = this.char.getEffectiveStat("mp");
      const newDef = this.char.getEffectiveStat("def");

      this.char.moodText = `⚡ 破關而出！登臨【${this.char.getRealmTitle()}】，神識覆蓋百里星河！`;
      audio.playLevelUp();
      this.updateHeader();
      this.renderView();

      const modal = document.getElementById("breakthrough-modal-overlay");
      if (modal) {
        const titleEl = document.getElementById("celebration-realm-title");
        const statsEl = document.getElementById("celebration-stat-surge");
        const avatarSlot = document.getElementById("celebration-avatar-slot");
        if (titleEl) titleEl.innerText = `${this.char.name}，${this.char.getRealmTitle()}！`;
        if (avatarSlot) avatarSlot.innerHTML = this.buildCultivatorSVG(this.char.realmIndex, this.char.realmLayer);
        if (statsEl) {
          statsEl.innerHTML = `
            <div class="stat-surge-item"><span>🩸 血魄氣血</span><b>${oldHp} ➔ ${newHp} (+${newHp - oldHp} ↑)</b></div>
            <div class="stat-surge-item"><span>⚔️ 神通殺力</span><b>${oldAtk} ➔ ${newAtk} (+${newAtk - oldAtk} ↑)</b></div>
            <div class="stat-surge-item"><span>☯️ 洞天真元</span><b>${oldMp} ➔ ${newMp} (+${newMp - oldMp} ↑)</b></div>
            <div class="stat-surge-item"><span>🛡️ 道紋靈罡</span><b>${oldDef} ➔ ${newDef} (+${newDef - oldDef} ↑)</b></div>
          `;
        }
        modal.classList.add("active");
      }
    }

    openContemplationModal() {
      audio.playEpiphanyBell();
      const modal = document.getElementById("contemplation-modal-overlay");
      const stage = document.getElementById("contemplation-3d-stage");
      const desc = document.getElementById("contemplation-realm-desc");
      if (stage) {
        stage.innerHTML = this.buildCultivatorSVG(this.char.realmIndex, this.char.realmLayer);
        stage.style.transform = `rotateY(${this.rotationAngle}deg) scale(1.18)`;
      }
      if (desc) {
        const env = this.getRealmEnvironmentMeta(this.char.realmIndex, this.char.realmLayer);
        desc.innerText = `【${this.char.getRealmTitle()} · ${env.bgName}】${env.desc}`;
      }
      if (modal) modal.classList.add("active");
    }

    // ==================== 2. 【太虛萬劫淵 · 30層上限與道印上限鎖定】 ====================
    renderRoguelikeView(container) {
      const maxFloor = 30;
      const isFloorMaxed = this.char.abyssFloor >= maxFloor;
      const potentialExp = this.char.abyssFloor * 520;
      const potentialSilver = this.char.abyssFloor * 340;
      const wipeoutLossExp = Math.floor(potentialExp * 0.8);
      const wipeoutKeepExp = potentialExp - wipeoutLossExp;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>🌀 太虛萬劫淵 · 第 ${this.char.abyssFloor}/${maxFloor} 層</h2>
          <span class="rarity-pill rarity-gold">
            ${isFloorMaxed ? '👑 已達深淵第30層極限！' : `🎯 目標：突破第 ${Math.min(maxFloor, Math.ceil(this.char.abyssFloor / 5) * 5)} 層`}
          </span>
        </div>

        <div style="background:#f5efe2; border:1px solid rgba(45,212,191,0.3); border-radius:10px; padding:9px 11px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; font-size:0.92rem; margin-bottom:4px; flex-wrap:wrap;">
            <span style="color:#385e4c; font-weight:800;">🛡️ 安全撤退：100% 帶走 (+${potentialExp}元氣 / +${potentialSilver}靈石)</span>
            <span style="color:#f43f5e; font-weight:800;">💀 陣亡：遺失 80%</span>
          </div>
          <div class="dual-track-outer" style="height:8px; display:flex;">
            <div style="width:20%; height:100%; background:#10b981;"></div>
            <div style="width:80%; height:100%; background:repeating-linear-gradient(45deg, #e11d48, #e11d48 6px, #881337 6px, #881337 12px);"></div>
          </div>
          <div style="font-size:0.85rem; color:#3d3a34; margin-top:4px;">
            💡 若陣亡僅能帶回 ${wipeoutKeepExp} 元氣（損失 ${wipeoutLossExp} 元氣）。
          </div>
        </div>

        <div style="background:#faf7f0; padding:9px 10px; border-radius:10px; margin-bottom:10px; border:1px solid var(--glass-border);">
          <div style="display:flex; justify-content:space-between; font-size:0.92rem; color:var(--text-muted); margin-bottom:5px; flex-wrap:wrap;">
            <span>🔮 已刻印局內道印 (${this.char.abyssRelics.length}/${ABYSS_RELICS_DATA.length}枚):</span>
            <span id="relic-inspect-hint" style="color:#8c622b;">點擊下方道印查看威能</span>
          </div>
          <div class="loot-badge-row" id="owned-relics-row"></div>
        </div>

        <div id="abyss-draft-slot"></div>

        <div style="font-size:0.96rem; font-weight:900; color:#2c5e6e; margin-bottom:6px;">
          ${isFloorMaxed ? '🌟 你已徹底征服太虛萬劫淵 30 層！請點擊下方破虛挪移符領取全額獎勵：' : `🧭 第 ${this.char.abyssFloor} 層 · 前方出現三道虛空岔路（請擇一前行）：`}
        </div>
        <div id="abyss-branches-box" style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;"></div>

        <div style="display:flex; gap:8px;">
          <button class="btn-modern gold full" id="btn-abyss-safe-exit">
            🌀 祭出破虛挪移符 (領取 +${potentialExp}元氣 / +${potentialSilver}靈石 並重置層數)
          </button>
          <button class="btn-modern secondary" id="btn-back-main-from-abyss" style="white-space:nowrap;">
            ⬅️ 返回
          </button>
        </div>
      `;
      container.appendChild(card);

      const rRow = card.querySelector("#owned-relics-row");
      const rHint = card.querySelector("#relic-inspect-hint");
      this.char.abyssRelics.forEach(id => {
        const r = ABYSS_RELICS_DATA.find(x => x.id === id) || { id, name: id, desc: "遠古道印加成" };
        const badge = document.createElement("span");
        badge.className = "rarity-pill rarity-gold";
        badge.style.cursor = "pointer";
        badge.innerHTML = `⚡ ${r.name}`;
        badge.addEventListener("click", () => {
          audio.playQiCharge();
          if (rHint) rHint.innerText = `【${r.name}】：${r.desc}`;
        });
        rRow.appendChild(badge);
      });

      const draftSlot = card.querySelector("#abyss-draft-slot");
      if (this.char.abyssPendingDraft && this.char.abyssPendingDraft.length > 0) {
        draftSlot.innerHTML = `
          <div style="background:#f5efe2; border:1.5px solid #fde047; border-radius:12px; padding:10px; margin-bottom:12px;">
            <div style="font-size:1.0rem; font-weight:900; color:#8c622b; text-align:center;">
              🌟【破關賜福 · 道印三選一】請點擊選擇一枚道印刻印入體：
            </div>
            <div class="abyss-choice-grid" id="draft-cards-row"></div>
          </div>
        `;
        const dRow = draftSlot.querySelector("#draft-cards-row");
        this.char.abyssPendingDraft.forEach(rel => {
          const alreadyHas = this.char.abyssRelics.includes(rel.id);
          const dCard = document.createElement("div");
          dCard.className = "relic-draft-card";
          dCard.innerHTML = `
            <div style="font-size:1.35rem;">🔮</div>
            <div style="font-size:0.95rem; font-weight:900; color:#a83228; margin:3px 0;">${rel.name}</div>
            <div style="font-size:1.04rem; color:#22201c; line-height:1.35;">${rel.desc}</div>
            <div style="margin-top:5px; font-size:0.85rem; color:#385e4c; font-weight:800;">
              ${alreadyHas ? '[已擁有 · 轉化+300真元]' : '[點擊刻印]'}
            </div>
          `;
          dCard.addEventListener("click", () => {
            if (!alreadyHas) this.char.abyssRelics.push(rel.id);
            else this.char.qi += 300;
            this.char.abyssPendingDraft = null;
            audio.playLevelUp();
            this.updateHeader();
            this.renderView();
          });
          dRow.appendChild(dCard);
        });
      }

      const branchBox = card.querySelector("#abyss-branches-box");
      const branches = [
        {
          type: "combat",
          icon: "⚔️",
          title: `凶靈古穴 · 迎擊第 ${this.char.abyssFloor} 層守衛`,
          meta: `預估難度: ${this.char.abyssFloor <= 5 ? '普通' : '高危'} ｜ 掉落: 【道印 3 選 1】+ ${this.char.abyssFloor * 420}元氣`,
          style: "btn-jade"
        },
        {
          type: "rest_or_merchant",
          icon: this.char.abyssFloor % 2 === 0 ? "🏮" : "⛺",
          title: this.char.abyssFloor % 2 === 0 ? "星海黑市商人 · 兌換真元與隨機寶物" : "太荒靈泉營地 · 調息回血與凝練真元",
          meta: "零風險：真元 +380 / 元氣 +260",
          style: "btn-modern secondary full"
        },
        {
          type: "chest_or_buff",
          icon: "📦",
          title: "遠古迷鎖寶箱 · 隨機天材地寶匣",
          meta: "開出：上品靈石 +500 / 混沌天晶 +20 / 隨機寶物",
          style: "btn-modern gold full"
        }
      ];

      branches.forEach(b => {
        const btn = document.createElement("button");
        btn.className = `${b.style} ${isFloorMaxed ? 'btn-maxed' : ''}`;
        if (isFloorMaxed) btn.disabled = true;
        btn.style.cssText = "width:100%; text-align:left; padding:10px 12px; display:flex; justify-content:space-between; align-items:center;";
        btn.innerHTML = `
          <div>
            <div style="font-size:1.02rem; font-weight:900; color:#141311;">${b.icon} ${isFloorMaxed ? '已達30層終點上限' : b.title}</div>
            <div style="font-size:0.86rem; color:#22201c; margin-top:2px;">${isFloorMaxed ? '請點擊下方破虛挪移符安全結算' : b.meta}</div>
          </div>
          <span style="font-size:0.95rem; color:#8c622b; font-weight:800; white-space:nowrap;">${isFloorMaxed ? '已滿層' : '前往 ➔'}</span>
        `;
        btn.addEventListener("click", (e) => {
          if (this.char.abyssFloor >= maxFloor) return;
          if (b.type === "combat") {
            audio.playSwordClash();
            const unowned = ABYSS_RELICS_DATA.filter(r => !this.char.abyssRelics.includes(r.id));
            if (unowned.length > 0) {
              this.char.abyssPendingDraft = unowned.slice(0, 3);
            }
            const gainExp = this.char.abyssFloor * 420;
            const gainSilver = this.char.abyssFloor * 260;
            this.char.exp += gainExp;
            this.char.todayExp += gainExp;
            this.char.silver += gainSilver;
            this.char.abyssFloor = Math.min(maxFloor, this.char.abyssFloor + 1);
            this.advanceDailyTask("dt_abyss", 1);
            this.triggerFlyingReward(e.currentTarget, "silver", `+${gainSilver}靈石 & +${gainExp}元氣`);
            this.renderView();
          } else if (b.type === "rest_or_merchant") {
            audio.playEpiphanyBell();
            this.char.qi += 380;
            this.char.exp += 260;
            this.char.abyssFloor = Math.min(maxFloor, this.char.abyssFloor + 1);
            this.triggerFlyingReward(e.currentTarget, "qi", "+380真元 & +260元氣");
            this.renderView();
          } else {
            audio.playLevelUp();
            this.char.silver += 500;
            this.char.ingots += 20;
            this.char.abyssFloor = Math.min(maxFloor, this.char.abyssFloor + 1);
            this.triggerFlyingReward(e.currentTarget, "ingots", "寶箱+500靈石+20天晶");
            this.renderView();
          }
        });
        branchBox.appendChild(btn);
      });

      card.querySelector("#btn-abyss-safe-exit").addEventListener("click", (e) => {
        this.char.exp += potentialExp;
        this.char.todayExp += potentialExp;
        this.char.silver += potentialSilver;
        this.char.abyssFloor = 1;
        this.char.abyssPendingDraft = null;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "silver", `結算+${potentialSilver}靈石`);
        this.currentView = "main";
        this.renderView();
      });

      card.querySelector("#btn-back-main-from-abyss").addEventListener("click", () => {
        this.currentView = "main";
        this.renderView();
      });
    }

    // ==================== 3. 【萬相通天傀儡 · 等級/星級/編隊數量/礦脈收取上限鎖定】 ====================
    renderPuppetView(container) {
      const maxPuppets = 6;
      const isSquadFull = this.char.puppets.length >= maxPuppets;
      const mineLeft = this.char.dailyMineCollectLeft !== undefined ? this.char.dailyMineCollectLeft : 3;
      const isMineEmpty = mineLeft <= 0;

      const deployed = this.char.puppets.filter(p => p.status === "出戰中");
      const allDeployed = deployed.length === this.char.puppets.length;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>🤖 萬相通天傀儡 (${this.char.puppets.length}/${maxPuppets}具)</h2>
          <button class="chip-btn ${allDeployed ? 'btn-maxed' : 'active'}" id="btn-auto-best-squad" ${allDeployed ? 'disabled' : ''}>
            ${allDeployed ? '✅ 全員已出戰' : '⚡ 一鍵全員上陣'}
          </button>
        </div>

        <div id="puppet-box" style="display:flex; flex-direction:column; gap:10px; margin-bottom:12px;"></div>

        <div style="display:flex; gap:8px;">
          <button class="btn-modern gold full ${isMineEmpty ? 'btn-maxed' : ''}" id="btn-collect-mine" ${isMineEmpty ? 'disabled' : ''}>
            ${isMineEmpty ? '✅ 今日靈礦已收罄 (0/3)' : `⛏️ 收取傀儡靈礦 (+450靈石 · 剩${mineLeft}/3次)`}
          </button>
          <button class="btn-jade ${isSquadFull ? 'btn-maxed' : ''}" id="btn-forge-puppet" ${isSquadFull ? 'disabled' : ''} style="width:100%;">
            <span class="main-label">${isSquadFull ? '🌟 傀儡已滿編 (6/6 MAX)' : '⚒️ 組裝新傀儡 (500靈石)'}</span>
          </button>
        </div>
      `;
      container.appendChild(card);

      const pBox = card.querySelector("#puppet-box");
      this.char.puppets.forEach((p, idx) => {
        const isDeployed = p.status === "出戰中";
        const lv = p.level || 3;
        const stars = p.stars || 3;
        const isLvMax = lv >= 10;
        const isStarMax = stars >= 5;
        const starsStr = "⭐".repeat(stars);

        const div = document.createElement("div");
        div.className = `puppet-hero-card ${isDeployed ? 'deployed' : ''}`;
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="display:flex; gap:10px; align-items:center;">
              <div style="font-size:1.85rem; background:rgba(15,23,42,0.9); border:1px solid ${isDeployed ? '#fde047' : '#38bdf8'}; border-radius:10px; width:46px; height:46px; display:flex; justify-content:center; align-items:center;">
                ${p.avatar || '🤖'}
              </div>
              <div>
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                  <b style="color:#141311; font-size:0.86rem;">${p.name} (Lv.${lv}/10)</b>
                  <span class="rarity-pill ${isDeployed ? 'rarity-gold' : 'rarity-blue'}" style="padding:1px 6px; font-size:1.02rem;">
                    ${p.role}
                  </span>
                </div>
                <div style="font-size:0.86rem; color:#8c622b; margin-top:2px;">
                  ${starsStr} (${stars}/5星) ｜ 部件: 【${p.part || '太乙玄鐵核'}】
                </div>
                <div style="font-size:0.9rem; color:#22201c; margin-top:2px;">
                  🩸氣血: <b>${p.hp}</b> ｜ ⚔️殺力: <b>${p.atk}</b> ｜ 🤝默契: <b style="color:#2c5e6e;">${p.bond || 65}%</b>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:6px; margin-top:8px;">
            <button class="btn-modern secondary btn-pup-upgrade ${isLvMax ? 'btn-maxed' : ''}" data-idx="${idx}" ${isLvMax ? 'disabled' : ''} style="flex:1; padding:5px 6px; font-size:0.86rem;">
              ${isLvMax ? '🌟 核心已滿 Lv.10' : '⬆️ 強化 (150靈石)'}
            </button>
            <button class="btn-modern secondary btn-pup-star ${isStarMax ? 'btn-maxed' : ''}" data-idx="${idx}" ${isStarMax ? 'disabled' : ''} style="flex:1; padding:5px 6px; font-size:0.86rem;">
              ${isStarMax ? '🌟 已滿 5星 MAX' : '⭐ 升星 (250靈石)'}
            </button>
            <button class="btn-modern ${isDeployed ? 'secondary' : 'gold'} btn-pup-toggle" data-idx="${idx}" style="padding:5px 8px; font-size:0.86rem;">
              ${isDeployed ? '轉派採礦' : '調入戰隊'}
            </button>
          </div>
        `;
        pBox.appendChild(div);
      });

      pBox.querySelectorAll(".btn-pup-upgrade").forEach(b => {
        b.addEventListener("click", (e) => {
          const p = this.char.puppets[parseInt(b.dataset.idx)];
          if ((p.level || 3) >= 10) return;
          if (!this.trySpendResource("silver", 150, "上品靈石")) return;
          p.level = (p.level || 3) + 1;
          p.hp += 450;
          p.atk += 55;
          p.bond = Math.min(100, (p.bond || 65) + 5);
          audio.playQiCharge();
          this.triggerFlyingReward(e.currentTarget, "qi", `${p.name} 升至 Lv.${p.level}！`);
          this.renderView();
        });
      });

      pBox.querySelectorAll(".btn-pup-star").forEach(b => {
        b.addEventListener("click", (e) => {
          const p = this.char.puppets[parseInt(b.dataset.idx)];
          if ((p.stars || 3) >= 5) return;
          if (!this.trySpendResource("silver", 250, "上品靈石")) return;
          p.stars = (p.stars || 3) + 1;
          p.hp += 800;
          p.atk += 95;
          p.bond = Math.min(100, (p.bond || 65) + 12);
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "qi", `⭐升至 ${p.stars}星！`);
          this.renderView();
        });
      });

      pBox.querySelectorAll(".btn-pup-toggle").forEach(b => {
        b.addEventListener("click", () => {
          const p = this.char.puppets[parseInt(b.dataset.idx)];
          p.status = p.status === "出戰中" ? "待命採礦中" : "出戰中";
          audio.playQiCharge();
          this.updateHeader();
          this.renderView();
        });
      });

      card.querySelector("#btn-auto-best-squad")?.addEventListener("click", () => {
        this.char.puppets.forEach(p => { p.status = "出戰中"; });
        audio.playEpiphanyBell();
        this.updateHeader();
        this.renderView();
      });

      card.querySelector("#btn-collect-mine")?.addEventListener("click", (e) => {
        if ((this.char.dailyMineCollectLeft || 0) <= 0) return;
        this.char.dailyMineCollectLeft--;
        this.char.silver += 450;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "silver", "+450靈石");
        this.renderView();
      });

      card.querySelector("#btn-forge-puppet")?.addEventListener("click", (e) => {
        if (this.char.puppets.length >= maxPuppets) return;
        if (!this.trySpendResource("silver", 500, "上品靈石")) return;
        const isOrange = Math.random() < 0.35;
        const newP = {
          id: "p_" + Date.now(),
          name: isOrange ? "紫極重炮傀 [造化]" : "修羅重劍衛 [純陽]",
          avatar: isOrange ? "👑🤖" : "⚔️🤖",
          role: isOrange ? "後排爆發" : "前排破甲",
          stars: isOrange ? 4 : 3,
          level: 1,
          bond: 60,
          part: isOrange ? "太初焚星重炮核" : "庚金斬馬雙刃",
          comboDesc: "與主角連攜：開場轟出範圍重炮，削減敵方 30% 護體真元盾",
          hp: isOrange ? 3800 : 3400,
          atk: isOrange ? 520 : 390,
          status: "出戰中"
        };
        this.char.puppets.push(newP);
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "ingots", `鍛造出【${newP.name}】`);
        this.renderView();
      });
    }

    // ==================== 4. 【奇門陣道演武 · 陣盤Lv.5上限與塔防波數上限鎖定】 ====================
    renderFormationView(container) {
      if (!this.char.formationLevels) this.char.formationLevels = { tian_gang: 2, jiu_gong: 1, qing_long: 1, zhou_tian: 1 };
      if (!this.char.unlockedFormations) this.char.unlockedFormations = ["tian_gang", "jiu_gong", "qing_long"];

      const curF = FORMATIONS_DATA.find(f => f.id === this.char.currentFormation) || FORMATIONS_DATA[0];
      const curLv = this.char.formationLevels[curF.id] || 1;
      const maxFormLv = 5;
      const isFormMaxed = curLv >= maxFormLv;
      const tdLeft = this.char.dailyTdWavesLeft !== undefined ? this.char.dailyTdWavesLeft : 3;
      const isTdMaxed = tdLeft <= 0;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h2>☯️ 奇門陣道演武</h2>
          <span class="rarity-pill rarity-gold">本源真氣: ${this.char.qi}</span>
        </div>

        <div class="formation-centerpiece-card" id="formation-hero-stage">
          <div class="formation-wheel-icon">${curF.icon || '☯️'}</div>
          <div style="font-size:1rem; font-weight:900; color:#a83228; margin-top:4px;">
            【護山主陣】${curF.name} (Lv.${curLv}/${maxFormLv})
          </div>
          <div style="font-size:0.96rem; color:#2c5e6e; font-weight:700; margin:4px 0;">
            ${curF.desc} (升階加成 +${curLv * 12}%)
          </div>
          <div style="margin-top:8px;">
            <button class="btn-modern gold ${isFormMaxed ? 'btn-maxed' : ''}" id="btn-upgrade-cur-formation" ${isFormMaxed ? 'disabled' : ''} style="padding:5px 14px; font-size:0.92rem;">
              ${isFormMaxed ? `🌟【${curF.name}】已臻大圓滿 (Lv.5 MAX)` : `⬆️ 灌注 200 真元升階至 Lv.${curLv + 1}`}
            </button>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;" id="f-list"></div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-upgrade-cur-formation")?.addEventListener("click", (e) => {
        if (curLv >= maxFormLv) return;
        if (!this.trySpendResource("qi", 200, "本源真氣")) return;
        this.char.formationLevels[curF.id] = curLv + 1;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `${curF.name} 升至 Lv.${curLv + 1}！`);
        this.renderView();
      });

      const fList = card.querySelector("#f-list");
      FORMATIONS_DATA.forEach(f => {
        const isCurrent = f.id === this.char.currentFormation;
        const isUnlocked = this.char.unlockedFormations.includes(f.id);
        const fLv = this.char.formationLevels[f.id] || 1;

        const row = document.createElement("div");
        row.style.cssText = `background:#faf7f0; border:1px solid ${isCurrent ? '#fde047' : 'rgba(148,163,184,0.22)'}; padding:10px 12px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; gap:8px;`;
        row.innerHTML = `
          <div>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <b style="color:#141311; font-size:1.04rem;">${f.icon || '☯️'} ${f.name} (Lv.${fLv}/${maxFormLv})</b>
              <span class="rarity-pill ${isCurrent ? 'rarity-gold' : 'rarity-blue'}" style="font-size:1.02rem; padding:1px 6px;">${f.buff}</span>
            </div>
            <div style="font-size:0.86rem; color:#8c622b; margin-top:2px;">🎯 ${f.counter || ''}</div>
            <div class="stat-diff-up" style="margin-top:2px;">📊 ${f.previewDiff || f.desc}</div>
          </div>
          <button class="btn-modern ${isCurrent ? 'btn-maxed' : 'gold'}" ${isCurrent ? 'disabled' : ''} style="padding:6px 10px; font-size:0.9rem; white-space:nowrap;">
            ${!isUnlocked ? '🔓 800靈石解鎖' : (isCurrent ? '✅ 運轉中' : '☯️ 啟動大陣')}
          </button>
        `;
        row.querySelector("button").addEventListener("click", (e) => {
          if (isCurrent) return;
          if (!isUnlocked) {
            if (!this.trySpendResource("silver", 800, "上品靈石")) return;
            this.char.unlockedFormations.push(f.id);
          }
          this.char.currentFormation = f.id;
          audio.playEpiphanyBell();
          this.triggerFlyingReward(e.currentTarget, "qi", `陣開·${f.name}`);
          this.renderView();
        });
        fList.appendChild(row);
      });

      const tdBox = document.createElement("div");
      tdBox.style.cssText = "margin-top:12px; background:#fdf6f4; border:1px solid #f43f5e; border-radius:12px; padding:10px 12px;";
      tdBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="color:#a83228; font-size:1.02rem;">🛡️ 太荒魔潮夜襲 · 洞府塔防</b>
          <span class="rarity-pill rarity-gold" style="font-size:1.04rem;">今日剩餘: ${tdLeft}/3 波</span>
        </div>
        <p style="font-size:0.9rem; color:#22201c; margin:4px 0 8px;">
          啟動【紫極引雷柱】與【朱雀離火炮】轟殺魔潮，每次獲 +850 元氣、+620 靈石與 3 件隨機寶物！
        </p>
        <button class="btn-jade ${isTdMaxed ? 'btn-maxed' : ''}" id="btn-launch-tower-defense" ${isTdMaxed ? 'disabled' : ''} style="width:100%;">
          <span class="main-label">${isTdMaxed ? '✅ 今日魔潮已全數肅清 (0/3)' : `🔥 啟動防禦塔迎擊魔潮 (剩餘 ${tdLeft}/3 波)`}</span>
        </button>
      `;
      card.appendChild(tdBox);
      tdBox.querySelector("#btn-launch-tower-defense")?.addEventListener("click", (e) => {
        if ((this.char.dailyTdWavesLeft || 0) <= 0) return;
        this.char.dailyTdWavesLeft--;
        audio.playSwordClash();
        const drops = this.rollRandomizedLoot(this.char.realmIndex, 3, "洞府塔防魔潮");
        this.char.exp += 850;
        this.char.todayExp += 850;
        this.char.silver += 620;
        this.triggerFlyingReward(e.currentTarget, "silver", `+620靈石 & ${drops[0].item.name}`);
        this.renderView();
      });
    }

    // ==================== 5. 【太初歲漏藥圃 · 採摘上限鎖定與煉丹材料同步】 ====================
    renderAlchemyView(container) {
      const matureCount = this.char.garden.filter(p => p.progress >= 100).length;
      const noMature = matureCount === 0;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>🌿 太初歲漏藥圃 · 造化神爐</h2>
          <span class="rarity-pill rarity-blue">💧 歲月靈精: ${this.char.epochDew} 滴 ｜ 🪙 靈石: ${this.char.silver}</span>
        </div>

        <div style="display:flex; gap:8px; margin-bottom:10px;">
          <button class="btn-modern gold full ${noMature ? 'btn-maxed' : ''}" id="btn-harvest-all" ${noMature ? 'disabled' : ''}>
            ${noMature ? '⏳ 尚無成熟靈草可採 (0塊)' : `🌾 一鍵採摘全部成熟靈草 (${matureCount}塊可採)`}
          </button>
          <button class="btn-modern full" id="btn-quick-brew-common">
            ⚡ 速煉【三清通脈丹】
          </button>
        </div>

        <div class="herb-field-grid" id="plots-box"></div>

        <div class="alchemy-furnace-stage" id="alchemy-furnace-box">
          <div id="furnace-icon" style="font-size:2rem;">🏺🔥</div>
          <div id="furnace-status-title" style="font-size:1.04rem; font-weight:900; color:#a83228; margin-top:4px;">
            太荒九龍神火爐 · 爐溫鼎盛
          </div>
          <div id="furnace-status-sub" style="font-size:0.9rem; color:#22201c; margin-top:2px;">
            若背包靈草不足，將消耗 100 靈石向百草閣自動採購補齊主材
          </div>
        </div>

        <div id="recipes-box" style="display:flex; flex-direction:column; gap:8px;"></div>
      `;
      container.appendChild(card);

      const pBox = card.querySelector("#plots-box");
      this.char.garden.forEach((plot, idx) => {
        const isMature = plot.progress >= 100;
        const stageIcon = isMature ? "🌺✨" : (plot.progress >= 40 ? "🌿" : "🌱");
        const stageLabel = isMature ? "靈光可採 (100%)" : `生長中 (${plot.progress}%)`;

        const tile = document.createElement("div");
        tile.className = `herb-plot-tile ${isMature ? 'mature' : ''}`;
        tile.innerHTML = `
          <div style="font-size:0.85rem; color:#385e4c; font-weight:700;">仙圃 [${idx + 1}]</div>
          <div style="font-size:1.65rem; margin:2px 0;">${stageIcon}</div>
          <b style="font-size:0.95rem; color:#141311;">${plot.name}</b>
          <div style="font-size:1.04rem; color:${isMature ? '#fde047' : '#94a3b8'};">${stageLabel}</div>
          <div class="dual-track-outer" style="height:5px; margin:3px 0;">
            <div class="track-total-fill" style="width:${plot.progress}%;"></div>
          </div>
          <button class="btn-modern ${isMature ? 'gold' : 'secondary'} btn-plot-action" data-idx="${idx}" style="width:100%; padding:4px 4px; font-size:0.85rem;">
            ${isMature ? '🌾 立即採擷' : (this.char.epochDew > 0 ? '💧 靈精催熟' : '☯️ 80真元催熟')}
          </button>
        `;
        pBox.appendChild(tile);
      });

      pBox.querySelectorAll(".btn-plot-action").forEach(b => {
        b.addEventListener("click", (e) => {
          const plot = this.char.garden[parseInt(b.dataset.idx)];
          if (plot.progress >= 100) {
            this.char.addItem(plot.herbId, 2);
            plot.progress = 20;
            plot.status = "發芽期 (20%)";
            this.advanceDailyTask("dt_herb", 1);
            audio.playLevelUp();
            this.triggerFlyingReward(e.currentTarget, "qi", `🌾 收穫 ${plot.name}×2`);
            this.renderView();
          } else {
            if (this.char.epochDew > 0) {
              this.char.epochDew--;
            } else if (!this.trySpendResource("qi", 80, "本源真氣")) {
              return;
            }
            plot.progress = 100;
            plot.status = "可採擷";
            this.advanceDailyTask("dt_herb", 1);
            audio.playEpiphanyBell();
            this.triggerFlyingReward(e.currentTarget, "qi", `💧 ${plot.name} 已成熟！`);
            this.renderView();
          }
        });
      });

      card.querySelector("#btn-harvest-all")?.addEventListener("click", (e) => {
        let harvested = 0;
        this.char.garden.forEach(plot => {
          if (plot.progress >= 100) {
            this.char.addItem(plot.herbId, 2);
            plot.progress = 20;
            plot.status = "發芽期 (20%)";
            harvested += 2;
          }
        });
        if (harvested > 0) {
          this.advanceDailyTask("dt_herb", 1);
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "qi", `一鍵收穫靈草×${harvested}`);
          this.renderView();
        }
      });

      const runAlchemyRitual = (rec, mode, btnEl) => {
        for (const req of rec.reqHerbs) {
          const ex = this.char.inventory.find(i => i.id === req.id);
          if (!ex || ex.count < req.count) {
            if (!this.trySpendResource("silver", 100, `採購【${req.name}】所需靈石`)) return;
            this.char.addItem(req.id, req.count);
          }
        }
        for (const req of rec.reqHerbs) this.char.removeItem(req.id, req.count);

        const isSupreme = mode === "power" ? (Math.random() < 0.85) : (Math.random() < 0.25);
        const countGain = isSupreme ? 2 : 1;
        this.char.addItem(rec.targetPillId, countGain);
        const expGain = isSupreme ? 480 : 220;
        this.char.exp += expGain;
        this.char.todayExp += expGain;
        audio.playLevelUp();

        const qualityTag = isSupreme ? "👑極品雙倍" : "✨良品";
        this.triggerFlyingReward(btnEl, "exp", `${qualityTag}·${rec.name}×${countGain} (+${expGain}元氣)`);
        this.renderView();
      };

      card.querySelector("#btn-quick-brew-common")?.addEventListener("click", (e) => {
        runAlchemyRitual(ALCHEMY_RECIPES_DATA[0], "safe", e.currentTarget);
      });

      const rBox = card.querySelector("#recipes-box");
      ALCHEMY_RECIPES_DATA.forEach(r => {
        const herbCounts = r.reqHerbs.map(h => {
          const owned = (this.char.inventory.find(x => x.id === h.id) || { count: 0 }).count;
          return `${h.name}(持有${owned}/${h.count})`;
        }).join(" ");
        const div = document.createElement("div");
        div.style.cssText = "background:#faf7f0; border:1px solid var(--glass-border); padding:10px 12px; border-radius:10px; display:flex; flex-direction:column; gap:6px;";
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
            <b style="color:#141311; font-size:1.04rem;">💊 ${r.name}</b>
            <span style="font-size:0.86rem; color:#8c622b;">${herbCounts}</span>
          </div>
          <div style="font-size:0.9rem; color:var(--text-muted);">${r.desc}</div>
          <div style="display:flex; gap:6px;">
            <button class="btn-modern secondary btn-brew-safe" data-id="${r.id}" style="flex:1; padding:6px 8px; font-size:0.9rem;">
              ⚖️ 穩妥煉製 (100%成功)
            </button>
            <button class="btn-modern gold btn-brew-power" data-id="${r.id}" style="flex:1; padding:6px 8px; font-size:0.9rem;">
              🔥 全力催火 (衝擊極品×2)
            </button>
          </div>
        `;
        rBox.appendChild(div);
      });

      rBox.querySelectorAll(".btn-brew-safe").forEach(b => {
        b.addEventListener("click", (e) => {
          const rec = ALCHEMY_RECIPES_DATA.find(x => x.id === b.dataset.id);
          if (rec) runAlchemyRitual(rec, "safe", e.currentTarget);
        });
      });
      rBox.querySelectorAll(".btn-brew-power").forEach(b => {
        b.addEventListener("click", (e) => {
          const rec = ALCHEMY_RECIPES_DATA.find(x => x.id === b.dataset.id);
          if (rec) runAlchemyRitual(rec, "power", e.currentTarget);
        });
      });
    }

    // ==================== 6. 【大荒神通道藏 · 道訣Lv.5上限與自創神通Lv.5上限鎖定】 ====================
    renderKungfuView(container) {
      if (!this.char.skillLevels) this.char.skillLevels = {};
      const maxSkillLv = 5;

      const activeCombos = KUNGFU_COMBOS.filter(c => c.skills.every(id => this.char.equippedSkills.includes(id)));

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h2>🔥 大荒神通道藏 · 流派構築</h2>
          <span class="rarity-pill rarity-gold">真氣: ${this.char.qi} ｜ 槽位 ${this.char.equippedSkills.length}/4</span>
        </div>

        <div class="combo-active-banner" id="combo-banner-box"></div>

        <div style="display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap;">
          <button class="chip-btn active" id="btn-rec-combo-1" style="flex:1; justify-content:center;">
            🔥 推薦1：雷火焚天秒殺流
          </button>
          <button class="chip-btn active" id="btn-rec-combo-2" style="flex:1; justify-content:center;">
            🗡️ 推薦2：九曜天雷破甲流
          </button>
        </div>

        <div style="font-size:0.92rem; color:#2c5e6e; font-weight:800; margin-bottom:5px;">
          ⚔️ 出戰技能欄（點擊槽位可卸下）：
        </div>
        <div class="skill-loadout-slots" id="loadout-slots-row"></div>

        <div style="font-size:0.92rem; color:#8c622b; font-weight:800; margin-bottom:6px;">
          📘 全部神通道訣卡（參悟上限 Lv.5 大圓滿）：
        </div>
        <div id="all-skills-box" style="display:flex; flex-direction:column; gap:8px;"></div>
      `;
      container.appendChild(card);

      const cBanner = card.querySelector("#combo-banner-box");
      if (activeCombos.length > 0) {
        cBanner.innerHTML = activeCombos.map(c => `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:1.04rem; font-weight:900; color:#a83228;">
                ⚡🔥 合璧異象已啟動：【${c.name}】！
              </div>
              <div style="font-size:0.92rem; color:#141311; margin-top:3px;">
                實際戰鬥加成：<b>${c.effectDesc}</b>
              </div>
            </div>
            <span style="font-size:1.5rem;">☯️✨</span>
          </div>
        `).join("");
      } else {
        cBanner.innerHTML = `
          <div style="font-size:0.95rem; color:#fde68a;">
            💡 點擊下方「🔥 推薦1：雷火焚天秒殺流」即可一鍵裝配啟動 200% 暴傷合璧！
          </div>
        `;
      }

      card.querySelector("#btn-rec-combo-1")?.addEventListener("click", (e) => {
        this.char.equippedSkills = ["dx_fentian_huolian", "sx_du_tian_shenlei", "tx_gengjin_jian", "dx_zaohua_shengxian"];
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "qi", "啟動·雷火焚天滅世劫！");
        this.renderView();
      });
      card.querySelector("#btn-rec-combo-2")?.addEventListener("click", (e) => {
        this.char.equippedSkills = ["tx_xinghe_zhenfa", "sx_du_tian_shenlei", "tx_wanhua_kongjian", "yc_guanghan_xuankong"];
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "qi", "啟動·九曜天雷降魔陣！");
        this.renderView();
      });

      const slotsRow = card.querySelector("#loadout-slots-row");
      for (let i = 0; i < 4; i++) {
        const sId = this.char.equippedSkills[i];
        const sk = sId ? SKILLS_DATA.find(x => x.id === sId) : null;
        const slotEl = document.createElement("div");
        slotEl.className = "loadout-slot-pill";
        if (sk) {
          const lv = Math.min(maxSkillLv, this.char.skillLevels[sk.id] || 1);
          slotEl.innerHTML = `
            <div style="color:#8c622b; font-weight:900;">槽位 ${i + 1}</div>
            <div style="color:#141311; font-weight:800; margin:2px 0;">${sk.name.slice(0, 4)}</div>
            <div style="color:#2c5e6e; font-size:1.02rem;">Lv.${lv} (${Math.round(sk.power * (1 + lv * 0.1) * 100)}%)</div>
          `;
          slotEl.addEventListener("click", () => {
            this.char.equippedSkills.splice(i, 1);
            this.updateHeader();
            this.renderView();
          });
        } else {
          slotEl.innerHTML = `
            <div style="color:#3d3a34;">槽位 ${i + 1}</div>
            <div style="color:#3d3a34; margin:4px 0;">➕ 空缺</div>
            <div style="color:#3d3a34; font-size:1.02rem;">待上陣</div>
          `;
        }
        slotsRow.appendChild(slotEl);
      }

      const allBox = card.querySelector("#all-skills-box");
      SKILLS_DATA.forEach(sk => {
        const isEq = this.char.equippedSkills.includes(sk.id);
        const lv = Math.min(maxSkillLv, this.char.skillLevels[sk.id] || 1);
        const isMaxLv = lv >= maxSkillLv;
        const powerPct = Math.round(sk.power * (1 + (lv - 1) * 0.12) * 100);
        const progressPct = Math.min(100, lv * 20);

        const div = document.createElement("div");
        div.style.cssText = `background:#faf7f0; border:1px solid ${isEq ? '#2dd4bf' : 'rgba(148,163,184,0.2)'}; padding:10px 12px; border-radius:10px;`;
        div.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <b style="color:#141311; font-size:1.04rem;">${sk.name} (Lv.${lv}/${maxSkillLv})</b>
              <span class="rarity-pill rarity-purple" style="padding:1px 6px; font-size:1.02rem;">${sk.categoryName}</span>
              <span class="rarity-pill rarity-gold" style="padding:1px 6px; font-size:1.02rem;">威能 ${powerPct}%</span>
            </div>
            <span style="font-size:0.85rem; color:#3d3a34;">耗元:${sk.qiCost} | CD:${sk.cd}</span>
          </div>
          <div style="font-size:0.9rem; color:#22201c; margin:4px 0;">${sk.desc}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:6px;">
            <div style="flex:1;">
              <div style="font-size:1.04rem; color:#2c5e6e; margin-bottom:2px;">參悟進度: Lv.${lv}/${maxSkillLv} (${progressPct}%)</div>
              <div class="attr-mini-bar"><div class="attr-mini-fill" style="width:${progressPct}%;"></div></div>
            </div>
            <button class="btn-modern secondary btn-up-skill ${isMaxLv ? 'btn-maxed' : ''}" data-id="${sk.id}" ${isMaxLv ? 'disabled' : ''} style="padding:5px 8px; font-size:0.86rem;">
              ${isMaxLv ? '🌟 已滿階 Lv.5' : '⬆️ 參悟 (120真元)'}
            </button>
            <button class="btn-modern ${isEq ? 'gold' : ''} btn-toggle-skill" data-id="${sk.id}" style="padding:5px 9px; font-size:0.86rem;">
              ${isEq ? '卸下' : '上陣'}
            </button>
          </div>
        `;
        allBox.appendChild(div);
      });

      allBox.querySelectorAll(".btn-up-skill").forEach(b => {
        b.addEventListener("click", (e) => {
          const id = b.dataset.id;
          const curLv = this.char.skillLevels[id] || 1;
          if (curLv >= maxSkillLv) return;
          if (!this.trySpendResource("qi", 120, "本源真氣")) return;
          this.char.skillLevels[id] = curLv + 1;
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "qi", `道訣升至 Lv.${curLv + 1}！`);
          this.renderView();
        });
      });

      allBox.querySelectorAll(".btn-toggle-skill").forEach(b => {
        b.addEventListener("click", () => {
          const id = b.dataset.id;
          if (this.char.equippedSkills.includes(id)) {
            this.char.equippedSkills = this.char.equippedSkills.filter(x => x !== id);
          } else {
            if (this.char.equippedSkills.length >= 4) this.char.equippedSkills.shift();
            this.char.equippedSkills.push(id);
          }
          audio.playQiCharge();
          this.updateHeader();
          this.renderView();
        });
      });

      const cs = this.char.customSkill || { name: "太初萬劍歸宗訣", power: 4.2, desc: "陸沉舟融合五極天脈與火雷本源所創之無上殺招！" };
      const csLv = this.char.customSkillLv || 1;
      const isCsMax = csLv >= 5;
      const customDiv = document.createElement("div");
      customDiv.style.cssText = "margin-top:12px; background:linear-gradient(135deg, rgba(180,83,9,0.28), rgba(15,23,42,0.95)); border:1.5px solid #fde047; border-radius:12px; padding:10px 12px;";
      customDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
          <b style="color:#a83228; font-size:1.04rem;">✍️ 自創神通：【${cs.name}】 (Lv.${csLv}/5)</b>
          <span class="rarity-pill rarity-gold">威能倍率: ${Math.round(cs.power * 100)}%</span>
        </div>
        <div style="font-size:0.9rem; color:#22201c; margin:4px 0 8px;">${cs.desc}</div>
        <button class="btn-jade ${isCsMax ? 'btn-maxed' : ''}" id="btn-evolve-custom-skill" ${isCsMax ? 'disabled' : ''} style="width:100%; padding:6px 10px;">
          <span class="main-label" style="font-size:0.95rem;">
            ${isCsMax ? '🌟 自創大道神通已臻大圓滿 (Lv.5 MAX)' : '🔥 消耗 200 真元推演升階 (威能 +45%)'}
          </span>
        </button>
      `;
      card.appendChild(customDiv);
      customDiv.querySelector("#btn-evolve-custom-skill")?.addEventListener("click", (e) => {
        if ((this.char.customSkillLv || 1) >= 5) return;
        if (!this.trySpendResource("qi", 200, "本源真氣")) return;
        this.char.customSkillLv = (this.char.customSkillLv || 1) + 1;
        cs.power = Number((cs.power + 0.45).toFixed(2));
        this.char.customSkill = cs;
        const topSk = SKILLS_DATA.find(x => x.id === "tx_taixu_juedai");
        if (topSk) topSk.power = cs.power;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `✍️【${cs.name}】升至 Lv.${this.char.customSkillLv}！`);
        this.renderView();
      });
    }

    // ==================== 7. 【太初五極天脈 · 靈竅/識海Lv.5/霸王軀上限鎖定與真元同步】 ====================
    renderMeridianView(container) {
      if (!this.char.soulNodeLevels) this.char.soulNodeLevels = { soul_1: 2, soul_2: 1, soul_3: 0, soul_4: 0 };

      const wuxing = MERIDIANS_DATA[0];
      const unlockedCount = wuxing.points.filter(pt => this.char.unlockedAcupoints.includes(pt.id)).length;
      const totalPct = Math.round((unlockedCount / wuxing.points.length) * 100);

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h2>✨ 太初五極天脈 · 識海神念</h2>
          <span class="rarity-pill rarity-gold">☯️ 可用真元: ${this.char.qi}</span>
        </div>

        <div style="background:linear-gradient(135deg, rgba(13,148,136,0.25), rgba(15,23,42,0.92)); border:1px solid #2dd4bf; border-radius:12px; padding:10px 12px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.98rem; flex-wrap:wrap;">
            <b style="color:#141311;">📊 五極天脈完整度：${totalPct}% (${unlockedCount}/${wuxing.points.length} 靈竅)</b>
            <span style="color:#8c622b; font-size:0.92rem; font-weight:800;">戰力總加成 +${unlockedCount * 12}%</span>
          </div>
          <div class="dual-track-outer" style="height:7px; margin:6px 0;">
            <div class="track-total-fill" style="width:${totalPct}%;"></div>
          </div>
          <div style="font-size:0.9rem; color:#385e4c;">
            🔮 ${totalPct >= 100 ? '🌟 已覺醒大圓滿【混沌五行歸真】：全抗性 +30%，神通威力永久 +28%！' : `再貫通 ${wuxing.points.length - unlockedCount} 處靈竅即可覺醒大圓滿【混沌五行歸真】！`}
          </div>
        </div>

        <div style="font-size:0.96rem; font-weight:900; color:#2c5e6e; margin-bottom:6px;">
          ⚡ 太初五極靈竅（已開竅位自動鎖定上限）：
        </div>
        <div id="wuxing-nodes-grid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; margin-bottom:14px;"></div>

        <div style="font-size:0.96rem; font-weight:900; color:#8c622b; margin-bottom:6px;">
          🧠 太虛識海神念技能樹（各節點上限 Lv.5）：
        </div>
        <div id="soul-tree-list" style="display:flex; flex-direction:column; gap:8px;"></div>
      `;
      container.appendChild(card);

      const wxGrid = card.querySelector("#wuxing-nodes-grid");
      wuxing.points.forEach((pt, idx) => {
        const isOpened = this.char.unlockedAcupoints.includes(pt.id);
        const prevOpened = idx === 0 || this.char.unlockedAcupoints.includes(wuxing.points[idx - 1].id);
        const canOpen = !isOpened && prevOpened;

        const stateClass = isOpened ? "node-opened" : (canOpen ? "node-can-open" : "node-locked");
        const stateBadge = isOpened ? "✅ 已開竅(MAX)" : (canOpen ? `🔥 可灌注(${pt.reqQi}真元)` : `🔒 需前竅(${pt.reqQi}真元)`);

        const bonusParts = [];
        if (pt.atk) bonusParts.push(`殺力+${pt.atk}`);
        if (pt.hp) bonusParts.push(`氣血+${pt.hp}`);
        if (pt.mp) bonusParts.push(`真元+${pt.mp}`);
        if (pt.def) bonusParts.push(`靈罡+${pt.def}`);

        const nCard = document.createElement("div");
        nCard.className = `acupoint-node-card ${stateClass}`;
        nCard.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:0.98rem; color:#141311;">${pt.name}</b>
            <span style="font-size:1.02rem; color:${isOpened ? '#4ade80' : (canOpen ? '#fde047' : '#94a3b8')}; font-weight:800;">${stateBadge}</span>
          </div>
          <div style="font-size:0.86rem; color:#2c5e6e; font-weight:700; margin-top:2px;">
            ${bonusParts.join(" ｜ ")}
          </div>
        `;
        nCard.addEventListener("click", (e) => {
          if (isOpened) {
            this.showSystemToast(`✅【${pt.name}】已貫通達上限！`);
            return;
          }
          if (!prevOpened) {
            this.showSystemToast(`🔒 請先貫通前一處靈竅【${wuxing.points[idx - 1].name}】！`, true);
            return;
          }
          if (!this.trySpendResource("qi", pt.reqQi, "本源真氣")) return;
          this.char.unlockedAcupoints.push(pt.id);
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "qi", `✨貫通${pt.name}！`);
          this.renderView();
        });
        wxGrid.appendChild(nCard);
      });

      const soulNodesMeta = [
        { id: "soul_1", name: "靈犀初醒", icon: "👁️", cost: 180, effectPerLv: "洞天真元 +180 ｜ 探索紫寶掉率 +8%" },
        { id: "soul_2", name: "神念如絲", icon: "🕸️", cost: 260, effectPerLv: "虛空遁速 +22 ｜ QTE判定時間 +25%" },
        { id: "soul_3", name: "紫府金蓮", icon: "🪷", cost: 380, effectPerLv: "護體真元盾 +15% ｜ 心魔抗性 +25%" },
        { id: "soul_4", name: "元神夜遊", icon: "🌌", cost: 520, effectPerLv: "會心暴擊 +6% ｜ 每回合削敵 10% 真元" }
      ];
      const soulList = card.querySelector("#soul-tree-list");
      soulNodesMeta.forEach(sn => {
        const lv = Math.min(5, this.char.soulNodeLevels[sn.id] || 0);
        const isMax = lv >= 5;
        const row = document.createElement("div");
        row.style.cssText = `background:#faf7f0; border:1px solid ${lv > 0 ? '#c084fc' : 'rgba(148,163,184,0.2)'}; padding:9px 12px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; gap:8px;`;
        row.innerHTML = `
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <b style="color:#141311; font-size:1.0rem;">${sn.icon} ${sn.name} (Lv.${lv}/5)</b>
            </div>
            <div style="font-size:0.86rem; color:#4a3354; margin-top:2px;">✨ ${sn.effectPerLv}</div>
          </div>
          <button class="btn-modern ${isMax ? 'btn-maxed' : 'gold'} btn-up-soul" data-id="${sn.id}" data-cost="${sn.cost}" ${isMax ? 'disabled' : ''} style="padding:5px 10px; font-size:0.86rem; white-space:nowrap;">
            ${isMax ? '🌟 已滿階 Lv.5' : `⬆️ 升階 (${sn.cost}真元)`}
          </button>
        `;
        row.querySelector(".btn-up-soul").addEventListener("click", (e) => {
          if (lv >= 5) return;
          if (!this.trySpendResource("qi", sn.cost, "本源真氣")) return;
          this.char.soulNodeLevels[sn.id] = lv + 1;
          this.char.comprehension += 2;
          audio.playEpiphanyBell();
          this.triggerFlyingReward(e.currentTarget, "qi", `🌟 ${sn.name} Lv.${lv + 1}！`);
          this.renderView();
        });
        soulList.appendChild(row);
      });

      const bodyWrap = document.createElement("div");
      bodyWrap.style.cssText = "margin-top:14px; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;";
      bodyWrap.innerHTML = `
        <div style="font-size:0.96rem; font-weight:900; color:#f43f5e; margin-bottom:6px;">
          💪 荒古不滅霸王軀（五階鍛體 · 已淬鍊階位自動鎖定上限）：
        </div>
        <div id="body-stages-grid" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px;"></div>
      `;
      card.appendChild(bodyWrap);

      const bodyStages = [
        { id: "body_1", name: "一階 · 鋼筋鐵骨", cost: 220, bonus: "氣血 +950 ｜ 靈罡 +65" },
        { id: "body_2", name: "二階 · 琉璃金玉髓", cost: 420, bonus: "氣血 +950 ｜ 抗暴 +18%" },
        { id: "body_3", name: "三階 · 太荒氣血柱", cost: 680, bonus: "氣血 +950 ｜ 反震 +20%" },
        { id: "body_4", name: "四階 · 不滅神魔胎", cost: 950, bonus: "氣血 +950 ｜ 破甲 +25%" },
        { id: "body_5", name: "五階 · 滴血衍化道", cost: 1400, bonus: "覺醒【神魔不滅身】鎖血" }
      ];
      const bGrid = bodyWrap.querySelector("#body-stages-grid");
      bodyStages.forEach(bs => {
        const unlocked = (this.char.bodyStagesUnlocked || []).includes(bs.id);
        const d = document.createElement("div");
        d.className = `acupoint-node-card ${unlocked ? 'node-opened' : 'node-can-open'}`;
        d.innerHTML = `
          <div style="display:flex; justify-content:space-between;">
            <b style="color:#141311; font-size:0.95rem;">${bs.name}</b>
            <span style="font-size:1.02rem; color:${unlocked ? '#4ade80' : '#fde047'};">${unlocked ? '✅已滿(MAX)' : bs.cost + '真元'}</span>
          </div>
          <div style="font-size:0.85rem; color:#a83228; margin-top:2px;">🩸 ${bs.bonus}</div>
        `;
        d.addEventListener("click", (e) => {
          if (unlocked) {
            this.showSystemToast(`✅【${bs.name}】已淬鍊圓滿！`);
            return;
          }
          if (!this.trySpendResource("qi", bs.cost, "本源真氣")) return;
          this.char.bodyStagesUnlocked.push(bs.id);
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "qi", `💪 淬鍊【${bs.name}】！`);
          this.renderView();
        });
        bGrid.appendChild(d);
      });
    }

    // ==================== 8. 【虛空納戒 · 裝備祭煉+15上限鎖定與資源即時同步】 ====================
    renderInventoryView(container) {
      if (!this.char.equipEnhance) this.char.equipEnhance = { weapon: 3, armor: 2, accessory: 2 };
      if (!this.char.lockedItems) this.char.lockedItems = ["wp_taiyi_swords"];
      const maxEnhance = 15;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>💍 虛空納戒 · 本命道兵</h2>
          <span class="rarity-pill rarity-purple">🪙 靈石: ${this.char.silver} ｜ ☯️ 真氣: ${this.char.qi}</span>
        </div>

        <div class="equip-hero-grid" id="equip-cards-row"></div>
        <div id="equip-detail-drawer" style="margin-bottom:10px;"></div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <h3 style="font-size:1.02rem; color:#8c622b;">🎒 儲物百寶庫（支援屬性對比、洗煉詞條與批量吞服）</h3>
        </div>
        <div id="inv-grid" style="display:flex; flex-direction:column; gap:8px;"></div>
      `;
      container.appendChild(card);

      const slotsMeta = [
        { slot: "weapon", title: "殺伐道兵", icon: "🗡️" },
        { slot: "armor", title: "護體仙甲", icon: "🛡️" },
        { slot: "accessory", title: "本命奇寶", icon: "🔮" }
      ];

      const eqRow = card.querySelector("#equip-cards-row");
      const drawer = card.querySelector("#equip-detail-drawer");

      slotsMeta.forEach(sm => {
        const itemId = this.char.equipSlots[sm.slot];
        const it = ITEMS_DATA.find(x => x.id === itemId);
        const enh = Math.min(maxEnhance, this.char.equipEnhance[sm.slot] || 1);
        const isEnhMax = enh >= maxEnhance;
        const mult = 1 + enh * 0.12;

        let mainStatText = "未佩戴";
        if (it && it.stats) {
          if (it.stats.atk) mainStatText = `殺力 +${Math.round(it.stats.atk * mult)}`;
          else if (it.stats.hp) mainStatText = `氣血 +${Math.round(it.stats.hp * mult)}`;
          else if (it.stats.mp) mainStatText = `真元 +${Math.round(it.stats.mp * mult)}`;
        }

        const eqCard = document.createElement("div");
        eqCard.className = "equip-slot-card";
        eqCard.innerHTML = `
          <div style="font-size:1.04rem; color:#3d3a34;">${sm.title}</div>
          <div class="equip-icon-box">${sm.icon}</div>
          <b style="font-size:0.94rem; color:#a83228; line-height:1.25;">${it ? it.name : '空缺'}</b>
          <span class="rarity-pill rarity-gold" style="justify-content:center; font-size:1.02rem; padding:1px 5px;">
            🔥 祭煉 +${enh}/${maxEnhance}階
          </span>
          <div style="font-size:0.86rem; color:#385e4c; font-weight:800;">${mainStatText}</div>
          <button class="btn-modern gold btn-refine-slot ${isEnhMax ? 'btn-maxed' : ''}" data-slot="${sm.slot}" ${isEnhMax ? 'disabled' : ''} style="width:100%; padding:4px 4px; font-size:1.04rem; margin-top:2px;">
            ${isEnhMax ? '🌟 已滿 +15階' : '🔥 祭煉 (120靈石)'}
          </button>
        `;

        eqCard.addEventListener("click", (e) => {
          if (e.target.classList.contains("btn-refine-slot")) return;
          this.char.expandedEquipSlot = this.char.expandedEquipSlot === sm.slot ? null : sm.slot;
          this.renderView();
        });

        eqCard.querySelector(".btn-refine-slot").addEventListener("click", (e) => {
          e.stopPropagation();
          if (enh >= maxEnhance) return;
          if (!this.trySpendResource("silver", 120, "上品靈石")) return;
          this.char.equipEnhance[sm.slot] = enh + 1;
          this.char.strength += 2;
          this.char.rootBone += 2;
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "qi", `🔥 ${sm.title} 祭煉 +${enh + 1}階！`);
          this.renderView();
        });

        eqRow.appendChild(eqCard);
      });

      if (this.char.expandedEquipSlot) {
        const slot = this.char.expandedEquipSlot;
        const it = ITEMS_DATA.find(x => x.id === this.char.equipSlots[slot]);
        const enh = this.char.equipEnhance[slot] || 1;
        if (it) {
          drawer.innerHTML = `
            <div style="background:#f5efe2; border:1px solid #c084fc; border-radius:10px; padding:9px 12px; font-size:0.94rem;">
              <div style="display:flex; justify-content:space-between; color:#8c622b; font-weight:900;">
                <span>🔍【${it.name} · 祭煉 +${enh}/15 階】詳細詞條</span>
              </div>
              <div style="color:#22201c; margin-top:4px;">${it.desc}</div>
              <div style="color:#385e4c; margin-top:3px;">✨ 器靈加成：破空傷害 +${enh * 6}% ｜ 護體真元 +${enh * 120}</div>
            </div>
          `;
        }
      }

      const iGrid = card.querySelector("#inv-grid");
      this.char.inventory.forEach(inv => {
        const it = ITEMS_DATA.find(i => i.id === inv.id);
        if (!it) return;

        const isLocked = this.char.lockedItems.includes(it.id);
        const rarityMap = {
          red: { cls: "rarity-gold", tag: "鴻蒙·紅品" },
          orange: { cls: "rarity-gold", tag: "造化·橙品" },
          purple: { cls: "rarity-purple", tag: "純陽·紫品" },
          blue: { cls: "rarity-blue", tag: "玄階·藍品" }
        };
        const rMeta = rarityMap[it.rarity] || (it.type === "consumable" ? { cls: "rarity-purple", tag: "紫品·靈丹" } : { cls: "rarity-green", tag: "綠品·靈材" });

        let compareHtml = "";
        if (it.slot) {
          const curEqId = this.char.equipSlots[it.slot];
          const curEq = ITEMS_DATA.find(x => x.id === curEqId);
          const diffs = [];
          ["atk", "hp", "def", "mp"].forEach(statKey => {
            const newVal = (it.stats && it.stats[statKey]) || 0;
            const oldVal = (curEq && curEq.stats && curEq.stats[statKey]) || 0;
            const diff = newVal - oldVal;
            const labelMap = { atk: "殺力", hp: "氣血", def: "靈罡", mp: "真元" };
            if (diff > 0) diffs.push(`<span class="stat-diff-up">${labelMap[statKey]} +${diff} ↑</span>`);
            else if (diff < 0) diffs.push(`<span class="stat-diff-down">${labelMap[statKey]} ${diff} ↓</span>`);
          });
          if (diffs.length > 0) {
            compareHtml = `<div style="margin-top:3px;">📊 換裝屬性對比：${diffs.join(" ｜ ")}</div>`;
          }
        }

        const row = document.createElement("div");
        row.style.cssText = "background:#faf7f0; border:1px solid rgba(148,163,184,0.22); border-radius:10px; padding:9px 11px; display:flex; flex-direction:column; gap:6px;";
        row.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="rarity-pill ${rMeta.cls}" style="padding:2px 7px; font-size:1.02rem;">${rMeta.tag}</span>
              <b style="color:#141311; font-size:1.02rem;">${isLocked ? '🔒 ' : ''}${it.name}</b>
            </div>
            <span style="font-size:0.92rem; color:#8c622b; font-weight:800;">數量: x${inv.count}</span>
          </div>
          <div style="font-size:0.9rem; color:#22201c;">
            ${it.desc}
            ${it.slot ? `<div style="margin-top:3px;">${((this.char.itemAffixes && this.char.itemAffixes[it.id]) || [{ name: '太初靈韻', desc: '全屬性+5%' }]).map(af => `<span class="affix-tag">✨ ${af.name} (${af.desc})</span>`).join('')}</div>` : ''}
            ${compareHtml}
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;" class="item-action-bar"></div>
        `;

        const actBar = row.querySelector(".item-action-bar");
        if (it.slot) {
          const eqBtn = document.createElement("button");
          eqBtn.className = "btn-modern gold";
          eqBtn.style.cssText = "padding:4px 10px; font-size:0.86rem;";
          eqBtn.innerText = "⚔️ 穿戴替換";
          eqBtn.addEventListener("click", (e) => {
            this.char.equipItem(it.id);
            audio.playLevelUp();
            this.triggerFlyingReward(e.currentTarget, "qi", `穿戴【${it.name}】`);
            this.renderView();
          });
          actBar.appendChild(eqBtn);

          const reforgeBtn = document.createElement("button");
          reforgeBtn.className = "btn-modern";
          reforgeBtn.style.cssText = "padding:4px 10px; font-size:0.86rem; background:linear-gradient(135deg, #7e22ce, #4338ca);";
          reforgeBtn.innerText = "🎲 洗煉詞條 (100靈石)";
          reforgeBtn.addEventListener("click", (e) => {
            if (!this.trySpendResource("silver", 100, "上品靈石")) return;
            const shuffled = [...RANDOM_AFFIX_POOL].sort(() => Math.random() - 0.5);
            const newAffixes = shuffled.slice(0, 2 + (Math.random() < 0.5 ? 1 : 0)).map(a => ({ ...a }));
            if (!this.char.itemAffixes) this.char.itemAffixes = {};
            this.char.itemAffixes[it.id] = newAffixes;
            audio.playEpiphanyBell();
            this.triggerFlyingReward(e.currentTarget, "qi", `🎲 洗出【${newAffixes.map(a => a.name).join("·")}】`);
            this.renderView();
          });
          actBar.appendChild(reforgeBtn);
        } else if (it.type === "consumable") {
          const useOneBtn = document.createElement("button");
          useOneBtn.className = "btn-modern";
          useOneBtn.style.cssText = "padding:4px 10px; font-size:0.86rem;";
          useOneBtn.innerText = "💊 吞服1顆";
          useOneBtn.addEventListener("click", (e) => {
            this.char.removeItem(it.id, 1);
            const gainE = (it.effect && it.effect.addExp) || 1200;
            const gainQ = (it.effect && it.effect.addQi) || 300;
            this.char.exp += gainE;
            this.char.todayExp += gainE;
            this.char.qi += gainQ;
            audio.playEpiphanyBell();
            this.triggerFlyingReward(e.currentTarget, "exp", `+${gainE}元氣 / +${gainQ}真氣`);
            this.renderView();
          });
          actBar.appendChild(useOneBtn);

          if (inv.count > 1) {
            const useAllBtn = document.createElement("button");
            useAllBtn.className = "btn-modern gold";
            useAllBtn.style.cssText = "padding:4px 10px; font-size:0.86rem;";
            useAllBtn.innerText = `⚡ 批量吞服 (x${inv.count})`;
            useAllBtn.addEventListener("click", (e) => {
              const cnt = inv.count;
              this.char.removeItem(it.id, cnt);
              const gainE = ((it.effect && it.effect.addExp) || 1200) * cnt;
              const gainQ = ((it.effect && it.effect.addQi) || 300) * cnt;
              this.char.exp += gainE;
              this.char.todayExp += gainE;
              this.char.qi += gainQ;
              audio.playLevelUp();
              this.triggerFlyingReward(e.currentTarget, "exp", `批量+${gainE}元氣！`);
              this.renderView();
            });
            actBar.appendChild(useAllBtn);
          }
        }

        const lockBtn = document.createElement("button");
        lockBtn.className = "btn-modern secondary";
        lockBtn.style.cssText = "padding:4px 8px; font-size:0.85rem;";
        lockBtn.innerText = isLocked ? "🔓 解鎖" : "🔒 鎖定";
        lockBtn.addEventListener("click", () => {
          if (isLocked) this.char.lockedItems = this.char.lockedItems.filter(x => x !== it.id);
          else this.char.lockedItems.push(it.id);
          this.updateHeader();
          this.renderView();
        });
        actBar.appendChild(lockBtn);

        const salvageBtn = document.createElement("button");
        salvageBtn.className = `btn-modern secondary ${isLocked ? 'btn-maxed' : ''}`;
        if (isLocked) salvageBtn.disabled = true;
        salvageBtn.style.cssText = "padding:4px 8px; font-size:0.85rem;";
        salvageBtn.innerText = isLocked ? "🔒 已鎖定保護" : "♻️ 分解 (+180靈石)";
        salvageBtn.addEventListener("click", (e) => {
          if (isLocked) return;
          this.char.removeItem(it.id, 1);
          this.char.silver += 180;
          this.char.qi += 60;
          audio.playQiCharge();
          this.triggerFlyingReward(e.currentTarget, "silver", "+180靈石 & +60真氣");
          this.renderView();
        });
        actBar.appendChild(salvageBtn);

        iGrid.appendChild(row);
      });
    }

    getItemName(id) {
      if (!id) return null;
      const it = ITEMS_DATA.find(i => i.id === id);
      return it ? it.name : id;
    }

    // ==================== 9. 【遠古聖門 × 職級Rank5上限 × 每日差事限領1次 × 開宗立派弟子6人上限】 ====================
    renderSectView(container) {
      const subNav = document.createElement("div");
      subNav.className = "sub-nav-pills";
      [
        { id: "ancient", label: "⛩️ 五大遠古聖門" },
        { id: "dynasty", label: "👑 開宗立派 · 太初道門" }
      ].forEach(t => {
        const b = document.createElement("button");
        b.className = `sub-pill-btn ${this.char.sectSubTab === t.id ? 'active' : ''}`;
        b.innerText = t.label;
        b.addEventListener("click", () => {
          this.char.sectSubTab = t.id;
          audio.playQiCharge();
          this.renderView();
        });
        subNav.appendChild(b);
      });
      container.appendChild(subNav);

      if (this.char.sectSubTab === "dynasty") {
        this.renderOwnDynastyView(container);
        return;
      }

      const curSect = SECTS_DATA.find(s => s.id === this.char.sectId) || SECTS_DATA[0];
      const rankTitles = ["Rank 1 · 抱劍道童", "Rank 2 · 內門執事", "Rank 3 · 真傳劍子", "Rank 4 · 護法長老", "Rank 5 · 聖門之尊"];
      const rankIdx = Math.min(4, this.char.sectRankIndex || 1);
      const isMaxRank = rankIdx >= 4;
      const curRankTitle = rankTitles[rankIdx];

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>⛩️ ${curSect.name}</h2>
          <span class="rarity-pill rarity-gold">門中功勳: ${this.char.sectContribution}</span>
        </div>

        <div style="background:#faf7f0; border:1px solid #fde047; border-radius:10px; padding:10px 12px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <div>
              <div style="font-size:1.04rem; font-weight:900; color:#a83228;">當前職級：【${curRankTitle}】</div>
              <div style="font-size:0.9rem; color:#22201c; margin-top:2px;">掌教：${curSect.leader}</div>
            </div>
            <button class="btn-modern gold ${isMaxRank ? 'btn-maxed' : ''}" id="btn-sect-promote" ${isMaxRank ? 'disabled' : ''} style="padding:5px 10px; font-size:0.9rem;">
              ${isMaxRank ? '👑 已登頂聖門之尊 (MAX)' : '⬆️ 晉升考核 (200功勳)'}
            </button>
          </div>
          <div style="display:flex; gap:6px; margin-top:8px; flex-wrap:wrap;">
            ${SECTS_DATA.map(s => `
              <button class="chip-btn ${s.id === this.char.sectId ? 'active' : ''} btn-switch-sect" data-id="${s.id}">
                ${s.name}
              </button>
            `).join("")}
          </div>
        </div>

        <div style="font-size:0.95rem; color:#2c5e6e; font-weight:800; margin-bottom:6px;">📜 每日聖門法旨差事（每項每日限領 1 次）：</div>
        <div id="tasks-box" style="display:flex; flex-direction:column; gap:8px;"></div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-sect-promote")?.addEventListener("click", (e) => {
        if (rankIdx >= 4) return;
        if (!this.trySpendResource("sectContribution", 200, "門中功勳")) return;
        this.char.sectRankIndex = rankIdx + 1;
        audio.playLevelUp();
        this.rollRandomizedLoot(this.char.realmIndex, 2, "宗門晉升賞賜");
        this.triggerFlyingReward(e.currentTarget, "qi", `晉升【${rankTitles[this.char.sectRankIndex]}】！`);
        this.renderView();
      });

      card.querySelectorAll(".btn-switch-sect").forEach(b => {
        b.addEventListener("click", () => {
          this.char.sectId = b.dataset.id;
          audio.playQiCharge();
          this.updateHeader();
          this.renderView();
        });
      });

      const tBox = card.querySelector("#tasks-box");
      if (!this.char.completedSectTasks) this.char.completedSectTasks = [];
      curSect.tasks.forEach(t => {
        const isDone = this.char.completedSectTasks.includes(t.id);
        const realmBonus = 1 + this.char.realmIndex * 0.5;
        const expVal = Math.round(t.exp * realmBonus);
        const coinVal = Math.round(t.coins * realmBonus);
        const div = document.createElement("div");
        div.style.cssText = "background:#faf7f0; border:1px solid var(--glass-border); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; gap:8px;";
        div.innerHTML = `
          <div>
            <b style="color:#141311;">${isDone ? '✅ ' : ''}${t.name}</b>
            <div style="font-size:0.9rem; color:var(--text-muted);">${t.desc} (+${expVal}元氣 / +${coinVal}靈石 / +65功勳)</div>
          </div>
          <button class="btn-modern ${isDone ? 'btn-maxed' : 'gold'} btn-task" ${isDone ? 'disabled' : ''} style="padding:6px 10px; font-size:0.92rem; white-space:nowrap;">
            ${isDone ? '✅ 今日已領' : '領受差事'}
          </button>
        `;
        div.querySelector(".btn-task").addEventListener("click", (e) => {
          if (this.char.completedSectTasks.includes(t.id)) return;
          this.char.completedSectTasks.push(t.id);
          this.char.exp += expVal;
          this.char.todayExp += expVal;
          this.char.silver += coinVal;
          this.char.sectContribution += 65;
          const drops = this.rollRandomizedLoot(this.char.realmIndex, 2, t.name);
          audio.playLevelUp();
          this.triggerFlyingReward(e.currentTarget, "silver", `+${coinVal}靈石 & ${drops[0].item.name}`);
          this.renderView();
        });
        tBox.appendChild(div);
      });
    }

    renderOwnDynastyView(container) {
      const own = this.char.ownSect;
      const maxDisciples = 6;
      const isDiscipleFull = own.disciples.length >= maxDisciples;
      const taxLeft = this.char.dailyTaxLeft !== undefined ? this.char.dailyTaxLeft : 3;
      const isTaxEmpty = taxLeft <= 0;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>👑 自立道統 · 【${own.name}】</h2>
          <span class="rarity-pill rarity-gold">諸界聲望: ${own.prestige}</span>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
          <button class="btn-jade ${isDiscipleFull ? 'btn-maxed' : ''}" id="btn-recruit-disciple" ${isDiscipleFull ? 'disabled' : ''}>
            <span class="main-label">${isDiscipleFull ? '🎓 親傳已滿編 (6/6 MAX)' : '🎓 招收親傳弟子 (300靈石)'}</span>
            <span class="sub-label">目前人數: ${own.disciples.length}/${maxDisciples}人</span>
          </button>
          <button class="btn-modern gold full ${isTaxEmpty ? 'btn-maxed' : ''}" id="btn-dispatch-disciples" ${isTaxEmpty ? 'disabled' : ''}>
            ${isTaxEmpty ? '✅ 今日除魔稅收已滿 (0/3)' : `⚔️ 派遣門生除魔徵稅 (剩${taxLeft}/3次)`}
          </button>
        </div>

        <div style="font-size:0.95rem; color:#8c622b; font-weight:800; margin-bottom:6px;">
          🧑‍🎓 門下親傳弟子名錄 (${own.disciples.length}/${maxDisciples}人)：
        </div>
        <div id="disciple-list" style="display:flex; flex-direction:column; gap:8px;"></div>
      `;
      container.appendChild(card);

      const dList = card.querySelector("#disciple-list");
      own.disciples.forEach(d => {
        const row = document.createElement("div");
        row.style.cssText = "background:#faf7f0; border:1px solid rgba(45,212,191,0.3); padding:9px 12px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;";
        row.innerHTML = `
          <div>
            <b style="color:#141311; font-size:1.02rem;">🧑‍🎓 ${d.name}</b>
            <span class="rarity-pill rarity-purple" style="font-size:1.02rem; padding:1px 6px;">${d.root}</span>
            <div style="font-size:0.86rem; color:#2c5e6e; margin-top:2px;">職司：${d.role} ｜ 戰力：${d.power}</div>
          </div>
          <span class="rarity-pill rarity-gold" style="font-size:1.02rem;">鎮守山門</span>
        `;
        dList.appendChild(row);
      });

      card.querySelector("#btn-recruit-disciple")?.addEventListener("click", (e) => {
        if (own.disciples.length >= maxDisciples) return;
        if (!this.trySpendResource("silver", 300, "上品靈石")) return;
        const names = ["楚天歌", "林清雪", "韓立軒", "姬紫月", "蕭炎武", "牧塵淵"];
        const roots = ["混沌雷靈根", "太陰冰魄體", "九陽神火脈", "虛空劍心胎"];
        const newD = {
          name: names[own.disciples.length % names.length],
          root: roots[own.disciples.length % roots.length],
          role: "護法親傳 (全宗門收益+25%)",
          power: 4200 + this.char.realmIndex * 1200
        };
        own.disciples.push(newD);
        own.prestige += 350;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `收入親傳【${newD.name}】！`);
        this.renderView();
      });

      card.querySelector("#btn-dispatch-disciples")?.addEventListener("click", (e) => {
        if ((this.char.dailyTaxLeft || 0) <= 0) return;
        this.char.dailyTaxLeft--;
        const drops = this.rollRandomizedLoot(this.char.realmIndex, 3, "弟子上供");
        const taxCoins = own.disciples.length * 320;
        this.char.silver += taxCoins;
        this.char.exp += 950;
        this.char.todayExp += 950;
        own.prestige += 220;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "silver", `徵稅+${taxCoins}靈石 & ${drops[0].item.name}`);
        this.renderView();
      });
    }

    // ==================== 10. 【蒼瀾禁域 · 每日探索/尋龍/謎盤上限鎖定與一鍵調息重置】 ====================
    renderMapView(container) {
      const expCount = this.char.dailyExploreCount || 0;
      const expMax = this.char.dailyExploreMax || 6;
      const isExpMaxed = expCount >= expMax;
      const compassLeft = this.char.dailyCompassLeft !== undefined ? this.char.dailyCompassLeft : 3;
      const cipherLeft = this.char.dailyCipherLeft !== undefined ? this.char.dailyCipherLeft : 3;

      const topBanner = document.createElement("div");
      topBanner.className = "daily-destiny-bar";
      topBanner.innerHTML = `
        <div class="destiny-header" style="flex-wrap:wrap; gap:4px;">
          <span>🧭 今日大荒探索次數: ${expCount} / ${expMax} 次</span>
          <button class="chip-btn active" id="btn-map-reset-day" style="font-size:0.85rem; padding:2px 8px;">
            🌅 調息入明日 (重置探索次數)
          </button>
        </div>
        <div style="font-size:0.92rem; color:#2c5e6e; margin:2px 0;">
          ${this.char.recentFortune || "✨ 踏入大荒秘境，尋覓上古遺澤或迎擊強敵奪取納戒"}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:4px;">
          <button class="btn-modern gold ${compassLeft <= 0 ? 'btn-maxed' : ''}" id="btn-geomancy-compass" ${compassLeft <= 0 ? 'disabled' : ''} style="padding:6px 6px; font-size:0.9rem;">
            ${compassLeft <= 0 ? '✅ 尋龍已滿 (0/3)' : `🧭 尋龍羅盤勘礦 (剩${compassLeft}/3)`}
          </button>
          <button class="btn-modern ${cipherLeft <= 0 ? 'btn-maxed' : ''}" id="btn-ancient-cipher-puzzle" ${cipherLeft <= 0 ? 'disabled' : ''} style="padding:6px 6px; font-size:0.9rem;">
            ${cipherLeft <= 0 ? '✅ 謎盤已解 (0/3)' : `🧩 雲篆星宿解謎 (剩${cipherLeft}/3)`}
          </button>
        </div>
      `;
      container.appendChild(topBanner);

      topBanner.querySelector("#btn-map-reset-day")?.addEventListener("click", () => {
        this.resetDailyLimits();
      });

      topBanner.querySelector("#btn-geomancy-compass")?.addEventListener("click", (e) => {
        if ((this.char.dailyCompassLeft || 0) <= 0) return;
        this.char.dailyCompassLeft--;
        audio.playEpiphanyBell();
        const drops = this.rollRandomizedLoot(this.char.realmIndex, 3, "尋龍勘輿私礦");
        this.char.silver += 580;
        this.char.ingots += 25;
        this.triggerFlyingReward(e.currentTarget, "ingots", `🧭+580靈石 & ${drops[0].item.name}`);
        this.renderView();
      });

      topBanner.querySelector("#btn-ancient-cipher-puzzle")?.addEventListener("click", (e) => {
        if ((this.char.dailyCipherLeft || 0) <= 0) return;
        this.char.dailyCipherLeft--;
        audio.playLevelUp();
        const drops = this.rollRandomizedLoot(this.char.realmIndex + 1, 4, "雲篆星宿密室");
        this.char.exp += 920;
        this.char.todayExp += 920;
        this.char.qi += 450;
        this.triggerFlyingReward(e.currentTarget, "qi", `🧩+450真氣 & ${drops[0].item.name}`);
        this.renderView();
      });

      const rBox = document.createElement("div");
      container.appendChild(rBox);

      MAPS_DATA.forEach(map => {
        const regPct = Math.min(100, (this.char.regionProgress && this.char.regionProgress[map.id]) || 0);
        const isCurrentTier = (map.minRealm || 0) === this.char.realmIndex;
        const mDiv = document.createElement("div");
        mDiv.className = "region-map-card";
        mDiv.style.background = map.bgGradient;
        if (isCurrentTier) {
          mDiv.style.borderColor = "#fde047";
          mDiv.style.boxShadow = "0 0 22px rgba(253, 224, 71, 0.28)";
        }

        mDiv.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:4px;">
            <div>
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                <b style="color:#141311; font-size:0.9rem;">🗺️ ${map.name}</b>
                ${isCurrentTier ? '<span class="rarity-pill rarity-gold" style="font-size:1.02rem; padding:1px 6px;">🔥 當前境界主位面</span>' : ''}
              </div>
              <div style="font-size:0.86rem; color:#8c622b; margin-top:2px;">${map.realmMechanic || ''}</div>
            </div>
            <span style="font-size:1.04rem; background:rgba(0,0,0,0.6); border:1px solid rgba(253,224,71,0.4); padding:2px 6px; border-radius:6px; color:var(--gold-bright);">
              ${map.realmReq}
            </span>
          </div>

          <div class="region-progress-strip">
            <div style="display:flex; justify-content:space-between; font-size:0.86rem; margin-bottom:4px;">
              <span style="color:#385e4c;">位面探索完成度: <b>${regPct}%</b></span>
              <span style="color:#8c622b;">${regPct >= 100 ? '🌟 已達 100% 滿探索加成' : '每次探索 +35% 完成度'}</span>
            </div>
            <div class="dual-track-outer" style="height:6px;">
              <div class="track-total-fill" style="width:${regPct}%;"></div>
            </div>
          </div>

          <div class="map-nodes-trail" id="n-${map.id}"></div>
        `;
        rBox.appendChild(mDiv);

        const nBox = mDiv.querySelector(`#n-${map.id}`);
        map.nodes.forEach(node => {
          const isCombat = node.type === "combat" || node.type === "boss" || node.type === "auction_ambush";
          const isExplored = (this.char.exploredNodes || []).includes(node.id);
          const cardEl = document.createElement("div");
          cardEl.className = `map-node-card ${isCombat ? 'node-danger' : 'node-fortune'} ${isExplored ? 'node-explored' : ''}`;

          const badgeHtml = isCombat
            ? `<span class="rarity-pill rarity-purple" style="border-color:#f43f5e; color:#a83228;">⚔️ 迎敵</span>`
            : `<span class="rarity-pill rarity-gold">${isExpMaxed ? '⏳ 次數已滿' : '🌟 仙緣'}</span>`;

          cardEl.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:3px;">
              <b style="color:#141311; font-size:1.02rem;">${isExplored ? '✅ ' : '📍 '}${node.name}</b>
              <div style="font-size:0.86rem; color:#3d3a34;">
                ${isCombat ? `擊敗必掉 3~4 件隨機詞條戰利品` : `${node.desc}`}
              </div>
            </div>
            ${badgeHtml}
          `;

          cardEl.addEventListener("click", () => {
            if (!isCombat && (this.char.dailyExploreCount || 0) >= expMax) {
              this.showSystemToast("⏳ 今日 6 次大荒仙緣探索已達上限！請點擊上方「🌅 調息入明日」重置次數", true);
              return;
            }
            this.openExplorationModal(map, node);
          });
          nBox.appendChild(cardEl);
        });
      });
    }
    openExplorationModal(map, node) {
      audio.playQiCharge();
      const modal = document.getElementById("exploration-modal-overlay");
      const titleEl = document.getElementById("explore-modal-title");
      const stageEl = document.getElementById("explore-stage-box");
      const bodyEl = document.getElementById("explore-event-body");
      const actionsEl = document.getElementById("explore-actions-box");
      if (!modal || !bodyEl || !actionsEl) return;

      const isCombat = node.type === "combat" || node.type === "boss" || node.type === "auction_ambush";
      if (titleEl) titleEl.innerText = `🗺️ ${map.name} · 【${node.name}】`;

      if (stageEl) {
        stageEl.innerHTML = `
          <div class="sword-flight-avatar">${isCombat ? '⚔️👹' : '🧘‍♂️🗡️'}</div>
          <div style="font-size:0.98rem; color:#8c622b; font-weight:800; margin-top:6px;">
            ${isCombat ? '⚠️ 前方煞氣沖霄，強敵威壓鎖定中…' : '✨ 御劍乘風破開雲霧，正在踏入秘境核心…'}
          </div>
        `;
      }
      bodyEl.innerHTML = `<div style="text-align:center; color:#3d3a34; font-size:1.0rem; padding:8px;">神識正掃描方圓十里靈脈氣機與隨機寶物波動…</div>`;
      actionsEl.innerHTML = "";
      modal.classList.add("active");

      const renderChoices = () => {
        if (isCombat) {
          const baseEnemy = node.enemy || { name: "赤目修羅劫匪 (道胎境)", avatar: "👹", hp: 4200, atk: 240, def: 55, exp: 800, coins: 600 };
          bodyEl.innerHTML = `
            <div style="background:#fdf6f4; border:1px solid #f43f5e; border-radius:10px; padding:10px; font-size:1.0rem; color:#7a1c14;">
              <b>👹 遭遇強敵【${baseEnemy.name}】！</b>
              <div style="margin-top:4px; font-size:0.94rem; color:#22201c;">
                敵方氣血: ${baseEnemy.hp} ｜ 殺力: ${baseEnemy.atk}。斬殺後將從位面寶庫隨機抽取 3~4 件附帶隨機詞條的戰利品！
              </div>
            </div>
          `;
          actionsEl.innerHTML = `
            <button class="btn-jade" id="btn-exp-ambush" style="width:100%;">
              <span class="main-label">⚡ 預布九曜劍陣奇襲 (消耗100靈石 · 先手破盾+增傷25%)</span>
            </button>
            <button class="btn-modern gold full" id="btn-exp-fight-direct" style="margin-top:6px;">
              ⚔️ 拔劍正面迎擊 (進入全屏慢節奏特效鬥法)
            </button>
          `;
          actionsEl.querySelector("#btn-exp-ambush")?.addEventListener("click", () => {
            if (!this.trySpendResource("silver", 100, "布陣所需靈石")) return;
            this.markNodeExplored(map.id, node.id);
            modal.classList.remove("active");
            this.launchCombat(baseEnemy, true);
          });
          actionsEl.querySelector("#btn-exp-fight-direct")?.addEventListener("click", () => {
            this.markNodeExplored(map.id, node.id);
            modal.classList.remove("active");
            this.launchCombat(baseEnemy, false);
          });
        } else {
          bodyEl.innerHTML = `
            <div style="background:#faf7f0; border:1px solid rgba(253,224,71,0.4); border-radius:10px; padding:10px; font-size:1.0rem; color:#141311;">
              <b>🌟 抵達仙緣地【${node.name}】</b>
              <div style="margin-top:4px; font-size:0.94rem; color:#22201c;">
                ${node.desc} 請抉擇探索深度（每次皆會從跨境界寶池隨機生成不同掉落與詞條）：
              </div>
            </div>
          `;
          actionsEl.innerHTML = `
            <button class="btn-jade" id="btn-exp-deep" style="width:100%;">
              <span class="main-label">🔥 深入險境探索 (高風險 · 隨機抽取 4 件紫/橙/紅詞條古寶)</span>
            </button>
            <button class="btn-modern secondary full" id="btn-exp-careful" style="margin-top:6px;">
              🧭 謹慎外圍搜尋 (零風險 · 隨機抽取 3 件靈草/丹藥/礦石)
            </button>
          `;
          actionsEl.querySelector("#btn-exp-deep")?.addEventListener("click", (e) => {
            this.resolveExplorationOutcome(map, node, "deep", e.currentTarget);
          });
          actionsEl.querySelector("#btn-exp-careful")?.addEventListener("click", (e) => {
            this.resolveExplorationOutcome(map, node, "careful", e.currentTarget);
          });
        }
      };

      setTimeout(renderChoices, 450);
    }

    markNodeExplored(mapId, nodeId) {
      if (!this.char.exploredNodes.includes(nodeId)) {
        this.char.exploredNodes.push(nodeId);
      }
      this.char.dailyExploreCount = Math.min(this.char.dailyExploreMax, (this.char.dailyExploreCount || 0) + 1);
      if (!this.char.regionProgress) this.char.regionProgress = {};
      this.char.regionProgress[mapId] = Math.min(100, (this.char.regionProgress[mapId] || 0) + 35);
    }

    resolveExplorationOutcome(map, node, mode, btnEl) {
      this.markNodeExplored(map.id, node.id);
      const bodyEl = document.getElementById("explore-event-body");
      const actionsEl = document.getElementById("explore-actions-box");
      if (!bodyEl || !actionsEl) return;

      const targetRealm = Math.max(this.char.realmIndex, map.minRealm || 0);
      const dropCount = mode === "deep" ? 4 : 3;
      const rolledDrops = this.rollRandomizedLoot(targetRealm, dropCount, node.name);

      const gainExp = (targetRealm + 1) * (mode === "deep" ? 580 : 340);
      const gainSilver = (targetRealm + 1) * (mode === "deep" ? 420 : 240);
      this.char.exp += gainExp;
      this.char.todayExp += gainExp;
      this.char.silver += gainSilver;

      audio.playLevelUp();
      this.triggerFlyingReward(btnEl, "silver", `隨機獲【${rolledDrops[0].item.name}】等${rolledDrops.length}寶！`);
      this.updateHeader();

      const badgesHtml = rolledDrops.map(d => {
        const afText = d.affixes.length > 0 ? ` [${d.affixes.map(a => a.name).join("·")}]` : "";
        return `<span class="rarity-pill ${d.rarityClass}">🎁 ${d.rarityLabel} · ${d.item.name} ×${d.qty}${afText}</span>`;
      }).join("");

      bodyEl.innerHTML = `
        <div style="padding:10px; background:#faf6ec; border:1.5px solid #fde047; border-radius:10px;">
          <b style="color:#a83228;">🌟【${mode === 'deep' ? '深入險境 · 奇遇豐收' : '外圍搜尋 · 靈脈收穫'}】隨機掉落結算：</b>
          <p style="font-size:0.94rem; color:#2c2a26; margin:5px 0;">
            修為元氣 +${gainExp} ｜ 上品靈石 +${gainSilver} ｜ 本次動態抽取以下寶物（已自動存入納戒）：
          </p>
          <div class="loot-badge-row">${badgesHtml}</div>
        </div>
      `;
      actionsEl.innerHTML = `<button class="btn-jade" id="btn-exp-done" style="width:100%;"><span class="main-label">✨ 盡數納入虛空戒 · 繼續探索</span></button>`;
      actionsEl.querySelector("#btn-exp-done")?.addEventListener("click", () => {
        document.getElementById("exploration-modal-overlay")?.classList.remove("active");
        this.renderView();
      });
    }

    // ==================== 全屏巨幕戰鬥劇場 × 2.3秒慢節奏大招書法特效 × 三段速度切換 ====================
    getCombatStepDelay() {
      if (this.char.combatSpeedMode === "slow") return 3100;
      if (this.char.combatSpeedMode === "fast") return 1150;
      return 2150; // 預設 2.15 秒慢節奏，讓絕招名字與特效清清楚楚！
    }

    launchCombat(enemy, ambushBonus = false) {
      this.stopAutoCombat();
      this.currentEnemy = enemy;
      audio.playSwordClash();

      const modal = document.getElementById("combat-modal-overlay");
      if (!modal) return;
      modal.classList.add("active");

      this.combatEngine = new CombatEngine(this.char, enemy, ambushBonus);

      document.getElementById("combat-summary-panel")?.classList.remove("active");
      const tacBar = document.getElementById("combat-tactical-controls");
      if (tacBar) tacBar.style.display = "flex";
      document.getElementById("qte-ring-trigger")?.classList.remove("active");

      const eAvatar = document.getElementById("e-avatar-circle");
      if (eAvatar) eAvatar.innerText = enemy.avatar || "👹";

      const logBox = document.getElementById("combat-logs-content");
      if (logBox) {
        logBox.innerHTML = `
          <div style="color:#2c5e6e; font-size:1.0rem; margin-bottom:6px;">
            ⚔️【全屏演武開啟】迎戰 <b>${enemy.name}</b>！每次出招皆會展示巨幅招式名號與特效（可切換 0.5x慢放 / 1.0x標準 / 2.0x疾速）：
          </div>
        `;
      }

      this.syncCombatUI();
    }

    syncCombatUI(roundEvents = null) {
      if (!this.combatEngine) return;
      const p = this.combatEngine.pState;
      const e = this.combatEngine.eState;

      document.getElementById("p-name").innerText = `${p.name} (${this.char.getRealmTitle()})`;
      document.getElementById("e-name").innerText = e.enraged ? `👹 ${e.name} [二階段狂暴]` : e.name;

      const pHpPct = Math.max(0, Math.floor((p.hp / p.maxHp) * 100));
      const eHpPct = Math.max(0, Math.floor((e.hp / e.maxHp) * 100));
      const pShPct = Math.max(0, Math.floor((p.shield / p.maxShield) * 100));
      const eShPct = Math.max(0, Math.floor((e.shield / e.maxShield) * 100));

      const pHpEl = document.getElementById("p-hp-fill");
      const eHpEl = document.getElementById("e-hp-fill");
      const pShEl = document.getElementById("p-shield-fill");
      const eShEl = document.getElementById("e-shield-fill");
      if (pHpEl) pHpEl.style.width = `${pHpPct}%`;
      if (eHpEl) eHpEl.style.width = `${eHpPct}%`;
      if (pShEl) pShEl.style.width = `${pShPct}%`;
      if (eShEl) eShEl.style.width = `${eShPct}%`;

      const pHpText = document.getElementById("p-hp-text");
      const eHpText = document.getElementById("e-hp-text");
      if (pHpText) pHpText.innerText = `氣血 ${p.hp} ｜ 護體真元盾 ${p.shield}`;
      if (eHpText) eHpText.innerText = `氣血 ${e.hp} ｜ 護體真元盾 ${e.shield}`;

      const arena = document.getElementById("combat-arena-box");
      if (arena) {
        if (pHpPct <= 32) arena.classList.add("low-hp-danger");
        else arena.classList.remove("low-hp-danger");
      }

      const eAvatar = document.getElementById("e-avatar-circle");
      if (eAvatar) {
        if (e.enraged) eAvatar.classList.add("enemy-enraged");
        else eAvatar.classList.remove("enemy-enraged");
      }

      const clarityEl = document.getElementById("p-clarity-pill");
      const demonEl = document.getElementById("p-demon-pill");
      if (clarityEl) clarityEl.innerText = p.daoClarity >= 100 ? `🌟 道心通明 (已就緒 · 必暴真傷)` : `🌟 道心: ${p.daoClarity}%`;
      if (demonEl) demonEl.innerText = p.heartDemon >= 100 ? `😈 心魔蝕心 (防禦-20% · 宜護體)` : `😈 心魔: ${p.heartDemon}%`;

      if (!roundEvents) return;

      if (roundEvents.eFloat) {
        this.spawnCombatFloat("e-float-slot", "e-avatar-circle", roundEvents.eFloat.text, roundEvents.eFloat.style);
      }
      if (roundEvents.pFloat) {
        this.spawnCombatFloat("p-float-slot", "p-avatar-circle", roundEvents.pFloat.text, roundEvents.pFloat.style);
      }

      if (roundEvents.eShieldShattered && eShEl) {
        eShEl.parentElement?.classList.add("shield-shatter-flash");
        setTimeout(() => eShEl.parentElement?.classList.remove("shield-shatter-flash"), 900);
      }

      const pCallSlot = document.getElementById("p-callout-slot");
      if (pCallSlot) {
        pCallSlot.innerHTML = roundEvents.pCallout
          ? `<div class="combat-callout-pill ${pHpPct <= 32 ? 'danger' : ''}">${roundEvents.pCallout}</div>`
          : "";
      }
      const eCallSlot = document.getElementById("e-callout-slot");
      if (eCallSlot) {
        eCallSlot.innerHTML = roundEvents.eCallout
          ? `<div class="combat-callout-pill danger">${roundEvents.eCallout}</div>`
          : "";
      }

      // 巨幕 2.3 秒大招書法名號與多層粒子視覺演出！
      const vfxSlot = document.getElementById("combat-vfx-slot");
      if (vfxSlot) {
        const vfxObj = roundEvents.vfx || {
          cssClass: "vfx-sword",
          title: roundEvents.pCallout || "🗡️【太乙玄庚御劍斬】"
        };
        const iconBurst = vfxObj.cssClass === "vfx-flame" ? "🪷🔥💥" : (vfxObj.cssClass === "vfx-thunder" ? "🌩️⚡🐉" : "🗡️✨🌌");
        const subChant = vfxObj.cssClass === "vfx-flame"
          ? "玄煞雙火融爆 · 焚盡八荒六合！"
          : (vfxObj.cssClass === "vfx-thunder" ? "九霄紫極神雷 · 誅滅萬邪！" : "三十六柄太乙飛劍 · 劍氣縱橫三萬里！");
        vfxSlot.innerHTML = `
          <div class="vfx-grand-showcase">
            <div class="vfx-graphic-burst">${iconBurst}</div>
            <div class="vfx-skill-calligraphy">${vfxObj.title}</div>
            <div class="vfx-skill-subtitle">${subChant}</div>
          </div>
        `;
        setTimeout(() => { if (vfxSlot) vfxSlot.innerHTML = ""; }, 2250);
      }

      const logBox = document.getElementById("combat-logs-content");
      if (logBox && roundEvents.roundLogs) {
        roundEvents.roundLogs.forEach(log => {
          const div = document.createElement("div");
          div.style.cssText = "margin-bottom:6px; padding-bottom:5px; border-bottom:1px dashed rgba(255,255,255,0.08); font-size:1.02rem;";
          if (log.type === "round") div.style.color = "#fde047";
          else if (log.type === "enrage" || log.type === "shatter") div.style.color = "#fda4af";
          else if (log.type === "skill") div.style.color = "#5eead4";
          div.innerText = log.text;
          logBox.appendChild(div);
        });
        logBox.scrollTop = logBox.scrollHeight;
      }

      if (roundEvents.isOver) {
        this.stopAutoCombat();
        this.renderCombatSummary(roundEvents.winner === "player");
      }
    }

    spawnCombatFloat(slotId, avatarId, text, styleClass) {
      const slot = document.getElementById(slotId);
      const avatar = document.getElementById(avatarId);
      if (avatar) {
        avatar.classList.add("hit-shake");
        setTimeout(() => avatar.classList.remove("hit-shake"), 450);
      }
      if (!slot) return;
      slot.innerHTML = `<div class="dmg-float-num ${styleClass}">${text}</div>`;
      setTimeout(() => { if (slot) slot.innerHTML = ""; }, 1850);
    }

    triggerSkillQTEOrCast() {
      if (!this.combatEngine || this.combatEngine.isOver) return;
      const qteBox = document.getElementById("qte-ring-trigger");
      if (!qteBox || this.isAutoCombat) {
        this.handlePlayerCombatTurn("skill", false);
        return;
      }
      this.qteActive = true;
      qteBox.classList.add("active");
      audio.playQiCharge();
      setTimeout(() => {
        if (this.qteActive) {
          this.qteActive = false;
          qteBox.classList.remove("active");
          this.handlePlayerCombatTurn("skill", false);
        }
      }, 1500);
    }

    handlePlayerCombatTurn(tacticMode, qteSuccess = false) {
      if (!this.combatEngine || this.combatEngine.isOver) return;
      if (tacticMode === "skill") audio.playSwordClash();
      else audio.playQiCharge();

      const res = this.combatEngine.executeRound(tacticMode, qteSuccess);
      if (res) this.syncCombatUI(res);
    }

    startAutoCombatLoop() {
      if (this.autoCombatTimer) clearInterval(this.autoCombatTimer);
      const stepMs = this.getCombatStepDelay();
      this.autoCombatTimer = setInterval(() => {
        if (!this.combatEngine || this.combatEngine.isOver) {
          this.stopAutoCombat();
          return;
        }
        const p = this.combatEngine.pState;
        const tactic = (p.shield === 0 && p.hp < p.maxHp * 0.45) ? "guard" : "skill";
        this.handlePlayerCombatTurn(tactic, Math.random() < 0.45);
      }, stepMs);
    }

    stopAutoCombat() {
      this.isAutoCombat = false;
      const btn = document.getElementById("btn-toggle-auto-combat");
      if (btn) btn.innerText = "🔄 自動演武";
      if (this.autoCombatTimer) {
        clearInterval(this.autoCombatTimer);
        this.autoCombatTimer = null;
      }
    }

    renderCombatSummary(isVictory) {
      const tacBar = document.getElementById("combat-tactical-controls");
      if (tacBar) tacBar.style.display = "none";

      const sumPanel = document.getElementById("combat-summary-panel");
      const sumTitle = document.getElementById("combat-summary-title");
      const sumBody = document.getElementById("combat-summary-body");
      const bestHitEl = document.getElementById("combat-best-hit-line");
      if (!sumPanel || !sumTitle || !sumBody) return;

      const bh = this.combatEngine.bestHit;
      if (bestHitEl) {
        bestHitEl.innerText = `🏆 本場最佳一擊：第 ${bh.round} 回合【${bh.skillName}】轟出 ${bh.dmg} 點${bh.isCrit ? '毀滅暴擊' : '重創'}！`;
      }

      if (isVictory) {
        audio.playLevelUp();
        const enemy = this.currentEnemy || { name: "大荒強敵", exp: 450, coins: 380 };
        const gainExp = enemy.exp || 450;
        const gainCoins = enemy.coins || 380;
        this.char.exp += gainExp;
        this.char.todayExp += gainExp;
        this.char.silver += gainCoins;

        // 調用真隨機詞條掉落引擎，每次戰鬥勝利掉落完全不同的 3~4 件寶物與隨機詞條！
        const rolledDrops = this.rollRandomizedLoot(this.char.realmIndex, 3, enemy.name);
        const dropBadges = [
          `<span class="rarity-pill rarity-gold">☯️ 元氣 +${gainExp}</span>`,
          `<span class="rarity-pill rarity-blue">🪙 靈石 +${gainCoins}</span>`
        ];
        rolledDrops.forEach(d => {
          const afStr = d.affixes.length > 0 ? ` [${d.affixes.map(a => a.name).join("·")}]` : "";
          dropBadges.push(`<span class="rarity-pill ${d.rarityClass}">🎁 ${d.rarityLabel} · ${d.item.name} ×${d.qty}${afStr}</span>`);
        });

        this.updateHeader();
        sumTitle.innerHTML = `<span style="color:#8c622b;">🏆【大獲全勝 · 隨機搜刮敵修納戒】</span>`;
        sumBody.innerHTML = `<div class="loot-badge-row">${dropBadges.join("")}</div>`;
      } else {
        const e = this.combatEngine.eState;
        const remainPct = Math.max(1, Math.floor((e.hp / e.maxHp) * 100));
        sumTitle.innerHTML = `<span style="color:#a83228;">💔【惜敗 · 功虧一簣】差距診斷</span>`;
        sumBody.innerHTML = `
          <div style="font-size:0.95rem; color:#2c2a26; background:#fdf6f4; border:1px solid #f43f5e; padding:8px; border-radius:8px;">
            ⚡ <b>僅差一步：</b>${e.name} 僅剩 <b>${remainPct}% 氣血 (${e.hp}點)</b>！<br/>
            💡 <b>破局建議：</b>前往【納戒】洗煉裝備詞條或在敵方狂暴回合點擊<b>【🛡️ 護體蓄力】</b>即可反殺！
          </div>
        `;
      }

      sumPanel.classList.add("active");
    }

    replayKeyCombatRounds() {
      if (!this.combatEngine || !this.combatEngine.roundSnapshots.length) return;
      const snaps = this.combatEngine.roundSnapshots.slice(-3);
      const logBox = document.getElementById("combat-logs-content");
      if (logBox) {
        logBox.innerHTML = `<div style="color:#8c622b; font-weight:900; margin-bottom:6px;">🎬【戰後精采回顧 · 關鍵 ${snaps.length} 回合慢動作重播中…】</div>`;
      }
      snaps.forEach((snap, idx) => {
        setTimeout(() => {
          audio.playSwordClash();
          if (snap.eFloat) this.spawnCombatFloat("e-float-slot", "e-avatar-circle", snap.eFloat.text, snap.eFloat.style);
          if (logBox) {
            snap.logs.forEach(l => {
              const d = document.createElement("div");
              d.style.cssText = "color:#385e4c; font-size:1.0rem; margin-bottom:5px;";
              d.innerText = `[重播] ${l.text}`;
              logBox.appendChild(d);
            });
            logBox.scrollTop = logBox.scrollHeight;
          }
        }, idx * 950);
      });
    }

    // ==================== 11. 【天樞星宮 · 商路航次/巨砲Lv.10/仙令單次領取上限鎖定】 ====================
    renderMarketView(container) {
      const subNav = document.createElement("div");
      subNav.className = "sub-nav-pills";
      [
        { id: "silkroad", label: "🚢 太虛星槎商路" },
        { id: "auction", label: "🔨 天樞黑市拍賣" },
        { id: "arena", label: "🏆 星天論劍天梯" },
        { id: "billing", label: "💎 至尊特權仙令" }
      ].forEach(t => {
        const b = document.createElement("button");
        b.className = `sub-pill-btn ${this.char.marketSubTab === t.id ? 'active' : ''}`;
        b.innerText = t.label;
        b.addEventListener("click", () => {
          this.char.marketSubTab = t.id;
          audio.playQiCharge();
          this.renderView();
        });
        subNav.appendChild(b);
      });
      container.appendChild(subNav);

      if (this.char.marketSubTab === "auction") {
        this.renderAuctionSubView(container);
        return;
      }
      if (this.char.marketSubTab === "arena") {
        this.renderArenaSubView(container);
        return;
      }
      if (this.char.marketSubTab === "billing") {
        this.renderBillingSubView(container);
        return;
      }
      this.renderSilkRoadSubView(container);
    }

    renderSilkRoadSubView(container) {
      const ship = this.char.starShip;
      const maxCannon = 10;
      const isCannonMax = ship.cannonLv >= maxCannon;
      const tradeLeft = this.char.dailyTradeLeft !== undefined ? this.char.dailyTradeLeft : 3;
      const pirateLeft = this.char.dailyPirateLeft !== undefined ? this.char.dailyPirateLeft : 3;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:4px;">
          <h2>🚢 太虛天行舟 · 跨界商道</h2>
          <span class="rarity-pill rarity-gold">停靠: ${ship.currentPlane} ｜ 🪙 ${this.char.silver}</span>
        </div>

        <div style="background:#faf7f0; border:1px solid #38bdf8; border-radius:10px; padding:10px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <div>
            <div style="font-size:1.0rem; font-weight:900; color:#141311;">🛸 神武巨砲 Lv.${ship.cannonLv}/${maxCannon} ｜ 靈罩 Lv.${ship.shieldLv}</div>
            <div style="font-size:0.9rem; color:#2c5e6e; margin-top:2px;">貨艙載重：${ship.cargoCap} 噸</div>
          </div>
          <button class="btn-modern secondary ${isCannonMax ? 'btn-maxed' : ''}" id="btn-upgrade-starship" ${isCannonMax ? 'disabled' : ''} style="padding:5px 10px; font-size:0.9rem; white-space:nowrap;">
            ${isCannonMax ? '🌟 巨砲已滿 Lv.10' : '⬆️ 改裝 (200靈石)'}
          </button>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn-jade ${tradeLeft <= 0 ? 'btn-maxed' : ''}" id="btn-trade-voyage" ${tradeLeft <= 0 ? 'disabled' : ''}>
            <span class="main-label">${tradeLeft <= 0 ? '✅ 今日跨界航次已滿 (0/3)' : `⛵ 滿載跨界遠航拋售 (剩餘 ${tradeLeft}/3 航次)`}</span>
            <span class="sub-label">淨賺 +${1280 + ship.cannonLv * 180} 靈石 + 隨機貿易寶物</span>
          </button>
          <button class="btn-modern gold full ${pirateLeft <= 0 ? 'btn-maxed' : ''}" id="btn-pirate-cannon-war" ${pirateLeft <= 0 ? 'disabled' : ''}>
            ${pirateLeft <= 0 ? '✅ 今日星海海盜已全數肅清 (0/3)' : `💥 開砲轟擊【星海劫修巨艦】 (剩餘 ${pirateLeft}/3 次)`}
          </button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-upgrade-starship")?.addEventListener("click", (e) => {
        if (ship.cannonLv >= maxCannon) return;
        if (!this.trySpendResource("silver", 200, "上品靈石")) return;
        ship.cannonLv++;
        ship.shieldLv++;
        ship.cargoCap += 20;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `神武巨砲升至 Lv.${ship.cannonLv}！`);
        this.renderView();
      });

      card.querySelector("#btn-trade-voyage")?.addEventListener("click", (e) => {
        if ((this.char.dailyTradeLeft || 0) <= 0) return;
        this.char.dailyTradeLeft--;
        const planes = ["蒼瀾古陸", "太始魔窟", "天樞聖城", "九曜星域"];
        ship.currentPlane = planes[(planes.indexOf(ship.currentPlane) + 1) % planes.length];
        const profit = 1280 + ship.cannonLv * 180;
        this.char.silver += profit;
        const drops = this.rollRandomizedLoot(this.char.realmIndex, 2, "跨界星槎商路");
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "silver", `+${profit}靈石 & ${drops[0].item.name}`);
        this.renderView();
      });

      card.querySelector("#btn-pirate-cannon-war")?.addEventListener("click", (e) => {
        if ((this.char.dailyPirateLeft || 0) <= 0) return;
        this.char.dailyPirateLeft--;
        audio.playSwordClash();
        const drops = this.rollRandomizedLoot(this.char.realmIndex + 1, 4, "轟沉星海海盜旗艦");
        this.char.silver += 950;
        this.char.ingots += 40;
        this.triggerFlyingReward(e.currentTarget, "ingots", `+950靈石/+40天晶 & ${drops[0].item.name}`);
        this.renderView();
      });
    }

    renderAuctionSubView(container) {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <h2>🔨 天樞密閣黑市拍賣</h2>
          <span class="rarity-pill rarity-purple">🪙 靈石: ${this.char.silver}</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button class="btn-jade" id="btn-bid-treasure">
            <span class="main-label">💰 消耗 400 靈石競拍【太初造化古寶盲盒】</span>
            <span class="sub-label">必出 3 件隨機高階詞條法寶/神丹</span>
          </button>
          <button class="btn-modern gold full" id="btn-ambush-bidder">
            ⚔️ 城外設伏反殺尾隨老怪 (先手破盾 + 100% 摸屍奪取納戒)
          </button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-bid-treasure")?.addEventListener("click", (e) => {
        if (!this.trySpendResource("silver", 400, "上品靈石")) return;
        const drops = this.rollRandomizedLoot(this.char.realmIndex + 1, 3, "黑市壓軸競拍");
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "ingots", `拍得【${drops[0].item.name}】等3寶！`);
        this.renderView();
      });

      card.querySelector("#btn-ambush-bidder")?.addEventListener("click", () => {
        this.launchCombat({ name: "奪寶黑袍老祖 (道胎圓滿)", avatar: "🧙‍♂️", hp: 5200, atk: 310, def: 85, exp: 1600, coins: 1800 }, true);
      });
    }

    renderArenaSubView(container) {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <h2>🏆 天樞星天論劍 · 天梯榜</h2>
          <span class="rarity-pill rarity-gold">ELO 積分: ${this.char.eloRating}</span>
        </div>
        <div style="background:#faf7f0; border:1px solid #fde047; padding:10px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <b style="color:#a83228;">🥇 榜首天驕：獨孤求敗 (太虛劍子)</b>
            <div style="font-size:0.9rem; color:#22201c;">勝獎勵：+80 天晶 + 隨機紅品造化詞條神兵</div>
          </div>
          <button class="btn-modern gold" id="btn-arena-fight">⚔️ 論劍挑戰</button>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-arena-fight")?.addEventListener("click", () => {
        this.char.eloRating += 32;
        this.char.ingots += 80;
        this.updateHeader();
        this.launchCombat({ name: "獨孤求敗 · 太虛劍子", avatar: "🤺", hp: 6200, atk: 360, def: 110, exp: 2200, coins: 2000 }, false);
      });
    }

    renderBillingSubView(container) {
      const lifeClaimed = this.char.lifetimeCardClaimed;
      const monthClaimed = this.char.monthlyCardClaimed;

      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="card-title-bar" style="margin-bottom:8px;">
          <h2>💎 天樞星宮 · 至尊特權仙令</h2>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="background:#faf7f0; border:1px solid var(--glass-border); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <b style="color:#8c622b;">太初歲漏令 (終身免廣告特權)</b>
              <div style="font-size:0.92rem; color:var(--text-muted);">立贈 300 天晶 + 3 滴歲月靈精（終身限領一次）</div>
            </div>
            <button class="btn-modern gold ${lifeClaimed ? 'btn-maxed' : ''}" id="btn-claim-life" ${lifeClaimed ? 'disabled' : ''} style="white-space:nowrap;">
              ${lifeClaimed ? '✅ 特權已生效' : '🎁 免費開通'}
            </button>
          </div>
          <div style="background:#faf7f0; border:1px solid var(--glass-border); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <b style="color:#2c5e6e;">太初至尊仙令 (月卡特權)</b>
              <div style="font-size:0.92rem; color:var(--text-muted);">立得 500 混沌天晶 + 1,000 靈石（每期限領一次）</div>
            </div>
            <button class="btn-modern gold ${monthClaimed ? 'btn-maxed' : ''}" id="btn-claim-month" ${monthClaimed ? 'disabled' : ''} style="white-space:nowrap;">
              ${monthClaimed ? '✅ 月卡已領取' : '🎁 免費領取'}
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("#btn-claim-life")?.addEventListener("click", (e) => {
        if (this.char.lifetimeCardClaimed) return;
        this.char.lifetimeCardClaimed = true;
        this.char.ingots += 300;
        this.char.epochDew += 3;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "ingots", "+300天晶 & +3靈精");
        this.renderView();
      });

      card.querySelector("#btn-claim-month")?.addEventListener("click", (e) => {
        if (this.char.monthlyCardClaimed) return;
        this.char.monthlyCardClaimed = true;
        this.char.ingots += 500;
        this.char.silver += 1000;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "ingots", "+500天晶 & +1000靈石");
        this.renderView();
      });
    }
  }


  // ==================== v11.1 全面改修規格擴充模組 (24項核心系統深度重構) ====================
  const SHICHEN_DATA = [
    { id: "yin", name: "寅時 · 黎明", buffTitle: "寅時吐納收益 +30%", actHint: "靈氣初生，最適合聚元吐納與參悟道訣", tip: "寅時已至，靈氣初生，正是吐納悟道的好時候。", breathBonus: 0.30, tdRisk: 0 },
    { id: "mao", name: "卯時 · 日出", buffTitle: "卯時靈田生長 +25%", actHint: "旭日東昇，紫氣東來，適合照料歲漏藥圃與採擷靈草", tip: "卯時晨曦初露，百草含珠，藥圃靈氣最盛。", breathBonus: 0.10, tdRisk: 0 },
    { id: "chen", name: "辰時 · 食時", buffTitle: "辰時宗門差事功勳 +20%", actHint: "山門晨鐘已響，適合領受聖門差事與指點門下弟子", tip: "辰時雲開霧散，各脈弟子齊聚山門聽候差遣。", breathBonus: 0, tdRisk: 0 },
    { id: "si", name: "巳時 · 隅中", buffTitle: "巳時爐火純青 · 極品丹率 +15%", actHint: "地脈陽火升騰，適合開爐煉丹與吞噬異火", tip: "巳時地火鼎盛，開爐催火最易凝結丹紋。", breathBonus: 0, tdRisk: 0 },
    { id: "wu", name: "午時 · 日中", buffTitle: "午時大日真陽 · 神通殺力 +12%", actHint: "烈日當空，陽剛之氣最盛，適合挑戰強敵與天梯論劍", tip: "午時烈陽高懸，劍意煌煌，百邪辟易。", breathBonus: 0, tdRisk: 0 },
    { id: "wei", name: "未時 · 日昳", buffTitle: "未時大荒尋寶掉率 +20%", actHint: "山林氣機交感，適合踏入大荒秘境與尋龍勘礦", tip: "未時古墟禁制微弱，正是入山尋覓仙緣之良機。", breathBonus: 0, tdRisk: 0 },
    { id: "shen", name: "申時 · 哺時", buffTitle: "申時祭煉道兵與傀儡消耗 -15%", actHint: "庚金之氣漸凝，適合祭煉本命道兵與調校機關傀儡", tip: "申時西方庚金氣盛，百煉玄鐵最易通靈。", breathBonus: 0, tdRisk: 0 },
    { id: "you", name: "酉時 · 日入", buffTitle: "酉時星槎黑市收益 +20%", actHint: "暮色四合，黑市開張，適合跨界行商與競拍盲盒", tip: "酉時殘陽如血，天樞黑市暗流湧動。", breathBonus: 0, tdRisk: 0.10 },
    { id: "xu", name: "戌時 · 黃昏", buffTitle: "戌時魔潮來襲機率 +25% · 斬魔獎勵 +30%", actHint: "陰煞漸起，魔潮蠢動，宜布設奇門大陣迎敵守山", tip: "戌時暮靄沉沉，太荒魔潮蠢蠢欲動，當心洞府結界。", breathBonus: 0, tdRisk: 0.25 },
    { id: "hai", name: "亥時 · 人定", buffTitle: "亥時紫微星明 · 演卦頓悟率 +25%", actHint: "萬籟俱寂，星河璀璨，適合紫微演卦與神念觀想", tip: "亥時群星顯耀，天機澄明，宜推演紫微命盤。", breathBonus: 0.15, tdRisk: 0.10 },
    { id: "zi", name: "子時 · 夜半", buffTitle: "子時陰陽交泰 · 入定悟道機率翻倍", actHint: "一陽初生，萬物歸寂，適合深度入定與衝擊心魔殿", tip: "子時天地肅穆，陰陽交替，最易觸發靈台頓悟。", breathBonus: 0.25, tdRisk: 0.15 },
    { id: "chou", name: "丑時 · 雞鳴", buffTitle: "丑時洗髓淬體效果 +20%", actHint: "黎明前至暗時刻，適合淬鍊荒古霸王軀與合成道印", tip: "丑時星月將隱，氣沉骨髓，淬體事半功倍。", breathBonus: 0.10, tdRisk: 0 }
  ];

  const DESTINY_POOL_V11 = [
    { id: "dest_def", text: "今日道紋靈罡偏低，建議優先前往殞神墟淬鍊，完成可獲額外感悟。", targetView: "map", rewardDesc: "對應資源 +20%（+680元氣/+450靈石），並獲得「感悟點」×1", expBonus: 680, silverBonus: 450 },
    { id: "dest_breath", text: "今日靈台氣機澄澈，建議於洞天靈台深度入定吐納，完成可獲額外感悟。", targetView: "main", rewardDesc: "對應資源 +20%（+720元氣/+220真氣），並獲得「感悟點」×1", expBonus: 720, silverBonus: 320 },
    { id: "dest_alchemy", text: "今日百草靈韻盎然，建議前往藥圃掌控火候開爐煉丹，完成可獲額外感悟。", targetView: "alchemy", rewardDesc: "對應資源 +20%（+600元氣/+500靈石），並獲得「感悟點」×1", expBonus: 600, silverBonus: 500 },
    { id: "dest_abyss", text: "今日太虛裂隙微開，建議深入萬劫淵合成道印或挑戰層主，完成可獲額外感悟。", targetView: "roguelike", rewardDesc: "對應資源 +20%（+820元氣/+550靈石），並獲得「感悟點」×1", expBonus: 820, silverBonus: 550 }
  ];

  const ENEMY_AFFIX_POOL_V11 = [
    { id: "af_bloodthirst", name: "嗜血", icon: "🩸", desc: "吸血 12%", warn: "此敵身負『嗜血』之性，擊殺前需多加小心。" },
    { id: "af_thorns", name: "反傷", icon: "🌵", desc: "反彈 18% 傷害", warn: "此敵身負『反傷』罡氣，切莫盲目硬撼。" },
    { id: "af_haste", name: "疾速", icon: "⚡", desc: "先手 +1 · 遁速提升", warn: "此敵身負『疾速』殘影，出招極快需提防先手。" },
    { id: "af_berserk", name: "狂煞", icon: "🔥", desc: "暴擊率 +15%", warn: "此敵身負『狂煞』戾氣，刀刀致命宜用護體。" }
  ];

  const NPC_RELATIONS_DATA = [
    { id: "npc_fuyao", name: "扶搖劍尊", title: "太虛玄劍宮掌教", desc: "白衣勝雪，一劍曾斬碎百里星河，對你的劍道頗為期許。", dialogues: ["「劍者，心之刃也。你雖出身凡胎，這股不屈劍意卻勝過無數天驕。」", "「往昔老夫於殞神墟悟劍三百載，今日見你揮劍，方知後生可畏。」", "「拿著這枚劍丸，若遇不可敵之劫，老夫縱隔萬里亦為你斬出一劍！」"] },
    { id: "npc_xuanji", name: "璇璣仙妃", title: "瑤池廣寒仙闕之主", desc: "清冷出塵，執掌太陰月華，常於星河深處撫琴觀照你的道途。", dialogues: ["「紅塵萬劫皆是虛妄，道友心中那縷執念，究竟為蒼生還是為己身？」", "「廣寒月冷，幸得道友偶來論道，這壺太陰月華釀便贈予你溫養神魂。」", "「九霄天門風雷將起，無論前路如何凶險，璇璣願助道友一臂之力。」"] },
    { id: "npc_xuanpin", name: "玄牝丹祖", title: "丹霄古聖殿太上丹聖", desc: "性情古怪卻惜才如命，畢生追求九品通靈金丹之境。", dialogues: ["「控火之道在於一念鬆緊！你小子這手火候掌控，倒有老夫當年的三分影子。」", "「靈草相生相剋皆有定數，切記莫要辜負了歲漏玉鑑這樁逆天造化！」", "「這卷太古丹經孤本你且收好，日後若成太初道主，莫忘了老夫的丹火！」"] }
  ];

  // 擴充 Character 初始化與屬性計算管線
  const _origCharGetEffectiveStat = Character.prototype.getEffectiveStat;
  Character.prototype.initV11State = function() {
    if (this.shichenIndex === undefined) this.shichenIndex = 0; // 預設 0 = 寅時 · 黎明
    if (this.daoHeartStamina === undefined) this.daoHeartStamina = 100;
    this.maxDaoHeartStamina = 100 + (this.realmIndex || 0) * 10;
    if (this.innerDemonValue === undefined) this.innerDemonValue = 2; // 心魔值
    if (this.comprehensionPoints === undefined) this.comprehensionPoints = 3; // 感悟點
    if (this.rudingStacks === undefined) this.rudingStacks = 1; // 入定層數 ×1~×5
    if (this.todayDestiny === undefined) {
      this.todayDestiny = {
        index: 0,
        refreshedToday: false,
        completed: false,
        collapsed: false
      };
    }
    if (!this.wudaoStacks) {
      this.wudaoStacks = { sword: 1, pill: 0, formation: 0, body: 0 }; // 每個方向 +3%，上限 5層 (15%)
    }
    if (!this.shoujingState) {
      this.shoujingState = { wins: 0, titleUnlocked: false };
    }
    if (!this.skillArtisticLv) {
      this.skillArtisticLv = { tx_gengjin_jian: 2, dx_bi_sui_yan: 1, dx_fentian_huolian: 2, sx_du_tian_shenlei: 2, tx_xinghe_zhenfa: 1, tx_taixu_juedai: 2 };
    }
    if (!this.customSkillConfig) {
      this.customSkillConfig = {
        mainIdx: 0,
        subIdx: 0,
        reforgeCount: 1
      };
    }
    if (!this.acupointBranches) {
      this.acupointBranches = { root_jin: "gang" }; // gang (剛) | rou (柔)
    }
    if (!this.bodyRefiningBonus) {
      this.bodyRefiningBonus = { hp: 0, atk: 0, def: 0, speed: 0 };
    }
    if (!this.spiritAffection) {
      this.spiritAffection = { weapon: 20, armor: 10, accessory: 15 };
    }
    if (this.affixResonanceActive === undefined) this.affixResonanceActive = true;
    if (!this.karmaFlags) {
      this.karmaFlags = [
        { id: "karma_wounded_cultivator", title: "青玄山道救下重傷散修", choice: "贈丹救治", status: "待觸發後續報恩", timestamp: "寅時初刻" }
      ];
    }
    if (!this.npcAffection) {
      this.npcAffection = { npc_fuyao: 25, npc_xuanji: 20, npc_xuanpin: 15 };
    }
    if (!this.endgameState) {
      this.endgameState = {
        gaimingUnlocked: false,
        gaimingClears: 0,
        xinmoFloor: 1
      };
    }
    // 為傀儡補充性格、忠誠度與覺醒狀態
    const natures = ["剛烈護主", "靈動破敵", "沉穩守禦", "狂暴戮仙"];
    (this.puppets || []).forEach((p, i) => {
      if (!p.nature) p.nature = natures[i % natures.length];
      if (p.loyalty === undefined) p.loyalty = i === 2 ? 35 : 82; // 讓第3具預設35%可展示低於40%提示與安撫
      if (p.awakened === undefined) p.awakened = i === 0;
      if (!p.awakeSkill) p.awakeSkill = "機關神通 · 星河護主罡";
    });
    // 為門下弟子補充忠誠度與成長事件紅點
    if (this.ownSect && this.ownSect.disciples) {
      this.ownSect.disciples.forEach((d, i) => {
        if (d.loyalty === undefined) d.loyalty = i === 1 ? 28 : 85;
        if (d.hasEvent === undefined) d.hasEvent = true;
        if (d.impartCount === undefined) d.impartCount = 0;
      });
    }
  };

  Character.prototype.getEffectiveStat = function(stat) {
    this.initV11State();
    let val = _origCharGetEffectiveStat.call(this, stat);

    // 1. 剛／柔靈竅雙分支加成
    Object.entries(this.acupointBranches || {}).forEach(([ptId, branch]) => {
      if ((this.unlockedAcupoints || []).includes(ptId)) {
        if (branch === "gang") {
          if (stat === "atk") val += 95;
          if (stat === "crit") val += 4;
        } else {
          if (stat === "hp") val += 850;
          if (stat === "def") val += 60;
        }
      }
    });

    // 2. 霸王軀淬體事件加成
    if (this.bodyRefiningBonus && this.bodyRefiningBonus[stat]) {
      val += this.bodyRefiningBonus[stat];
    }

    // 3. 器靈好感度加成 (每10點好感 +2% 對應屬性)
    const totalSpiritAff = Object.values(this.spiritAffection || {}).reduce((a, b) => a + b, 0);
    const spiritTiers = Math.floor(totalSpiritAff / 10);
    if (spiritTiers > 0 && (stat === "atk" || stat === "hp" || stat === "def")) {
      val = Math.floor(val * (1 + spiritTiers * 0.015));
    }

    // 4. 吐納悟道「體道感悟」加成
    const bodyWudao = (this.wudaoStacks && this.wudaoStacks.body) || 0;
    if (bodyWudao > 0 && (stat === "hp" || stat === "def")) {
      val = Math.floor(val * (1 + bodyWudao * 0.03));
    }

    // 5. 守境挑戰與逆天改命「改命」特質全屬性加成
    let globalPct = 0;
    if (this.shoujingState && this.shoujingState.wins > 0) {
      globalPct += 0.015 + Math.floor(this.shoujingState.wins / 5) * 0.005;
    }
    if (this.endgameState && this.endgameState.gaimingUnlocked) {
      globalPct += 0.03;
    }
    if (this.endgameState && this.endgameState.xinmoFloor >= 10) {
      globalPct += Math.floor(this.endgameState.xinmoFloor / 10) * 0.01;
    }
    if (globalPct > 0 && ["hp", "mp", "atk", "def", "speed"].includes(stat)) {
      val = Math.floor(val * (1 + globalPct));
    }

    return Math.floor(val);
  };

  // ==================== App 控制器 v11.1 全量升級與介面掛載 ====================
  const _origAppInit = App.prototype.init;
  const _origUpdateHeader = App.prototype.updateHeader;
  const _origRenderCultivateCoreView = App.prototype.renderCultivateCoreView;
  const _origPerformBreathing = App.prototype.performBreathingCultivation;
  const _origPerformBreakthrough = App.prototype.performBreakthrough;
  const _origRenderDivinationSubView = App.prototype.renderDivinationSubView;
  const _origRenderTribulationSubView = App.prototype.renderTribulationSubView;
  const _origRenderKungfuView = App.prototype.renderKungfuView;
  const _origRenderMeridianView = App.prototype.renderMeridianView;
  const _origRenderInventoryView = App.prototype.renderInventoryView;
  const _origRenderAlchemyView = App.prototype.renderAlchemyView;
  const _origRenderRoguelikeView = App.prototype.renderRoguelikeView;
  const _origRenderPuppetView = App.prototype.renderPuppetView;
  const _origRenderOwnDynastyView = App.prototype.renderOwnDynastyView;
  const _origRenderMapView = App.prototype.renderMapView;
  const _origOpenExplorationModal = App.prototype.openExplorationModal;
  const _origLaunchCombat = App.prototype.launchCombat;
  const _origSyncCombatUI = App.prototype.syncCombatUI;
  const _origFinishCombatUI = App.prototype.finishCombatUI;

  App.prototype.init = function() {
    _origAppInit.call(this);
    if (this.char) this.char.initV11State();
    this.ensureV11HeaderShichenBar();
    this.updateHeader();
    this.renderView();
  };

  // 一、1. 時間流轉系統（頂部右上角時辰顯示 + 道心值進度條 + 時辰說明卷軸 + 打坐度過此時辰）
  App.prototype.getCurrentShichen = function() {
    this.char.initV11State();
    return SHICHEN_DATA[this.char.shichenIndex % SHICHEN_DATA.length] || SHICHEN_DATA[0];
  };

  App.prototype.trySpendDaoHeart = function(cost, actionLabel = "修行活動") {
    this.char.initV11State();
    if (this.char.daoHeartStamina < cost) {
      audio.playTone(220, "sawtooth", 0.2, 0.15);
      this.showSystemToast(`⚠️ 道心值不足！${actionLabel}需消耗 ${cost} 道心值（目前 ${this.char.daoHeartStamina}/${this.char.maxDaoHeartStamina}），請點擊「打坐度過此時辰」調息恢復！`, true);
      return false;
    }
    this.char.daoHeartStamina = Math.max(0, this.char.daoHeartStamina - cost);
    this.updateHeader();
    return true;
  };

  App.prototype.ensureV11HeaderShichenBar = function() {
    if (typeof document === "undefined") return;
    const header = document.querySelector("header.game-header");
    if (!header || document.getElementById("v11-shichen-strip")) return;
    const strip = document.createElement("div");
    strip.id = "v11-shichen-strip";
    strip.className = "shichen-daoxin-bar";
    header.appendChild(strip);
  };

  App.prototype.updateHeader = function() {
    if (this.char && this.char.initV11State) this.char.initV11State();
    _origUpdateHeader.call(this);
    if (typeof document === "undefined" || !this.char) return;
    this.ensureV11HeaderShichenBar();
    const strip = document.getElementById("v11-shichen-strip");
    if (!strip) return;

    const sc = this.getCurrentShichen();
    const maxDh = this.char.maxDaoHeartStamina || 100;
    const curDh = Math.min(maxDh, Math.max(0, this.char.daoHeartStamina));
    const dhPct = Math.round((curDh / maxDh) * 100);

    strip.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
        <span class="shichen-badge-pill" id="btn-open-shichen-scroll" title="點擊展開時辰說明卷軸">
          ⏳ ${sc.name} ▾
        </span>
        <span style="font-size:0.84rem; color:var(--ink-black); font-weight:800;">
          道心值: <b style="color:var(--stone-cyan);">${curDh}/${maxDh}</b>
        </span>
        <div class="daoxin-progress-wrap" title="統一活動消耗之道心值／體力值">
          <div class="daoxin-progress-fill" style="width:${dhPct}%;"></div>
        </div>
        <span style="font-size:0.82rem; color:var(--cinnabar-red); font-weight:800;">心魔:${this.char.innerDemonValue}</span>
        <span style="font-size:0.82rem; color:var(--pine-green); font-weight:800;">感悟:${this.char.comprehensionPoints}</span>
      </div>
      <button class="chip-btn active" id="btn-meditate-pass-shichen" style="padding:3px 9px; font-size:0.82rem;">
        🧘 打坐度過此時辰
      </button>
    `;

    strip.querySelector("#btn-open-shichen-scroll")?.addEventListener("click", () => {
      this.openShichenScrollModal();
    });
    strip.querySelector("#btn-meditate-pass-shichen")?.addEventListener("click", () => {
      this.openPassShichenConfirmModal();
    });
  };

  App.prototype.openV11InteractiveModal = function(titleHtml, bodyHtml, actionsCallback) {
    if (typeof document === "undefined") return;
    let overlay = document.getElementById("v11-interactive-modal");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "v11-interactive-modal";
      overlay.className = "interactive-event-overlay-box";
      document.getElementById("app-container")?.appendChild(overlay);
      // 點擊背景遮罩或任何收卷按鈕皆可立即關閉
      overlay.addEventListener("click", (ev) => {
        if (ev.target === overlay) {
          this.closeV11InteractiveModal();
          return;
        }
        const closeBtn = ev.target.closest("#btn-close-v11-modal, #btn-finish-shichen-modal, #btn-cancel-meditate-shichen, #btn-close-monologue, #btn-fail-trib-ok, [data-close-v11-modal]");
        if (closeBtn) {
          ev.preventDefault();
          ev.stopPropagation();
          this.closeV11InteractiveModal();
          this.renderView();
        }
      });
    }
    overlay.innerHTML = `
      <div class="interactive-scroll-card">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid var(--ink-border); padding-bottom:8px; margin-bottom:10px;">
          <div style="font-size:1.1rem; font-weight:900; color:var(--ink-black); font-family:var(--font-title);">${titleHtml}</div>
          <button type="button" id="btn-close-v11-modal" data-close-v11-modal="1" style="background:#f3ecdc; border:1px solid var(--ink-black); padding:3px 10px; border-radius:2px; font-size:0.92rem; font-weight:900; color:var(--cinnabar-red); cursor:pointer;">✖ 收卷</button>
        </div>
        <div id="v11-modal-body">${bodyHtml}</div>
      </div>
    `;
    overlay.style.display = "flex";
    overlay.classList.add("active");
    overlay.querySelector("#btn-close-v11-modal")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeV11InteractiveModal();
      this.renderView();
    });
    if (actionsCallback) actionsCallback(overlay);
  };

  App.prototype.closeV11InteractiveModal = function() {
    if (typeof document === "undefined") return;
    const overlay = document.getElementById("v11-interactive-modal");
    if (overlay) {
      overlay.classList.remove("active");
      overlay.style.display = "none";
      overlay.innerHTML = "";
    }
  };

  App.prototype.openShichenScrollModal = function() {
    audio.playEpiphanyBell();
    const sc = this.getCurrentShichen();
    const bodyHtml = `
      <div style="background:#fbf8f1; border:1px solid var(--ink-black); padding:12px; border-radius:2px; margin-bottom:10px;">
        <div style="font-size:1.05rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:4px;">〔當前時辰〕${sc.name}</div>
        <div style="font-size:0.95rem; color:var(--ink-black); font-style:italic; margin-bottom:8px;">「${sc.tip}」</div>
        <div style="font-size:0.92rem; color:var(--stone-cyan); font-weight:800;">✨ 時辰天道加成：${sc.buffTitle}</div>
        <div style="font-size:0.9rem; color:var(--ink-mid); margin-top:4px;">🧭 宜行事宜：${sc.actHint}</div>
      </div>
      <div style="font-size:0.88rem; color:var(--ink-dark); background:#f3ecdc; padding:10px; border-radius:2px; margin-bottom:10px;">
        <b>📋 道心值消耗規則（上限 ${this.char.maxDaoHeartStamina}）：</b><br/>
        • 聚元吐納一次：消耗 <b>5 道心值</b>（寅時收益 +30%）<br/>
        • 大荒探索一次：消耗 <b>8 道心值</b><br/>
        • 紫微演卦一次：消耗 <b>12 道心值</b><br/>
        • 打坐度過一時辰：恢復全滿道心值，並重置時辰機緣（有 15% 機率 +1 心魔，5% 機率 -2 道心）
      </div>
      <button class="btn-jade" id="btn-modal-pass-shichen" style="width:100%;">
        <span class="main-label">🧘 打坐度過此時辰</span>
        <span class="sub-label">推進至下一時辰 · 恢復道心並結算心魔變化</span>
      </button>
    `;
    this.openV11InteractiveModal("📜〔時辰流轉說明卷軸〕", bodyHtml, (ov) => {
      ov.querySelector("#btn-modal-pass-shichen")?.addEventListener("click", () => {
        this.openPassShichenConfirmModal();
      });
    });
  };

  App.prototype.openPassShichenConfirmModal = function() {
    const sc = this.getCurrentShichen();
    const nextSc = SHICHEN_DATA[(this.char.shichenIndex + 1) % SHICHEN_DATA.length];
    const bodyHtml = `
      <div style="padding:10px; background:#fdf6f4; border:1px solid var(--cinnabar-red); border-radius:2px; margin-bottom:12px;">
        <div style="font-size:1.0rem; font-weight:900; color:var(--ink-black); margin-bottom:6px;">
          「打坐度過${sc.name.split(" ")[0]}，心神可能受心魔侵擾，是否繼續？」
        </div>
        <div style="font-size:0.9rem; color:var(--ink-mid);">
          • 下一時辰：<b>${nextSc.name}（${nextSc.buffTitle}）</b><br/>
          • 道心恢復：恢復至上限 <b>${this.char.maxDaoHeartStamina}</b>（5% 機率微損 -2 道心）<br/>
          • 心魔檢定：15% 機率滋生 <b>+1 心魔</b>
        </div>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn-jade" id="btn-confirm-meditate-shichen" style="flex:1;">
          <span class="main-label">凝神打坐 · 推進時辰</span>
        </button>
        <button class="btn-modern secondary" id="btn-cancel-meditate-shichen" style="padding:10px 14px;">
          暫留此時
        </button>
      </div>
    `;
    this.openV11InteractiveModal("⏳〔打坐度過此時辰〕", bodyHtml, (ov) => {
      ov.querySelector("#btn-cancel-meditate-shichen")?.addEventListener("click", () => {
        this.closeV11InteractiveModal();
      });
      ov.querySelector("#btn-confirm-meditate-shichen")?.addEventListener("click", () => {
        this.executePassShichen();
      });
    });
  };

  App.prototype.executePassShichen = function() {
    audio.playEpiphanyBell();
    this.char.shichenIndex = (this.char.shichenIndex + 1) % SHICHEN_DATA.length;
    const newSc = this.getCurrentShichen();

    // 重置日常活動次數並恢復道心值
    this.char.efficientBreathsLeft = this.char.maxEfficientBreaths || 20;
    this.char.dailyExploreCount = 0;
    this.char.dailyDivinationCount = 0;
    this.char.dailyMineCollectLeft = 3;
    this.char.dailyTdWavesLeft = 3;
    this.char.completedSectTasks = [];
    this.char.dailyTaxLeft = 3;
    this.char.dailyCompassLeft = 3;
    this.char.dailyCipherLeft = 3;
    this.char.dailyTradeLeft = 3;
    this.char.dailyPirateLeft = 3;
    this.char.todayDestiny.refreshedToday = false;

    const demonRoll = Math.random() < 0.15;
    const daoxinDipRoll = Math.random() < 0.05;
    if (demonRoll) this.char.innerDemonValue = (this.char.innerDemonValue || 0) + 1;
    this.char.daoHeartStamina = this.char.maxDaoHeartStamina - (daoxinDipRoll ? 2 : 0);

    const resultCopy = demonRoll
      ? "「打坐完畢。心魔微增（+1 心魔），然道心仍穩。」"
      : (daoxinDipRoll ? "「打坐完畢。心神微漾（-2 道心），然氣海已復充盈。」" : "「打坐完畢。心魔不侵，道心澄明如鏡。」");

    this.char.moodText = `${newSc.tip}`;
    this.updateHeader();
    this.renderView();

    // 若有待觸發的因果後續事件，推進時辰時有 40% 機率彈出後續卷軸
    const pendingKarma = (this.char.karmaFlags || []).find(k => k.status && k.status.includes("待觸發"));
    const bodyHtml = `
      <div style="text-align:center; padding:12px;">
        <div style="font-size:2.2rem; margin-bottom:6px;">🧘‍♂️✨🌙</div>
        <div style="font-size:1.05rem; font-weight:900; color:var(--ink-black); margin-bottom:6px;">
          時辰推進至【${newSc.name}】
        </div>
        <div style="font-size:0.96rem; color:var(--cinnabar-red); font-weight:800; margin-bottom:6px;">
          ${resultCopy}
        </div>
        <div style="font-size:0.92rem; color:var(--stone-cyan);">
          「${newSc.tip}」（${newSc.buffTitle}）
        </div>
        ${pendingKarma ? `
          <div style="margin-top:10px; padding:10px; background:#faf3e3; border:1.5px solid var(--cinnabar-red); border-radius:2px; text-align:left;">
            <b style="color:var(--cinnabar-red);">📜【因果後續機緣觸發】：</b>
            <div style="font-size:0.92rem; color:var(--ink-black); margin:4px 0;">
              「當日被你所救之人，今日特來報恩。」（源自：${pendingKarma.title}）
            </div>
            <button class="btn-modern gold full" id="btn-claim-karma-followup" style="margin-top:6px;">
              🎁 接納報恩禮（+650 靈石、+1 感悟點、解鎖古修秘藏線索）
            </button>
          </div>
        ` : ""}
      </div>
      <button class="btn-jade" id="btn-finish-shichen-modal" style="width:100%; margin-top:8px;">
        <span class="main-label">〔收卷起行〕</span>
      </button>
    `;
    this.openV11InteractiveModal("🌅〔時辰流轉 · 打坐結算〕", bodyHtml, (ov) => {
      ov.querySelector("#btn-claim-karma-followup")?.addEventListener("click", (e) => {
        pendingKarma.status = "已了結報恩 (+650靈石/+1感悟)";
        this.char.silver += 650;
        this.char.comprehensionPoints += 1;
        audio.playLevelUp();
        e.currentTarget.disabled = true;
        e.currentTarget.innerText = "✅ 已接納報恩（已載入納戒因果錄）";
        this.updateHeader();
      });
      ov.querySelector("#btn-finish-shichen-modal")?.addEventListener("click", () => {
        this.closeV11InteractiveModal();
        this.renderView();
      });
    });
  };

  // ==================== 二、洞天靈台 (今日機緣卷軸 + 入定×1~×5 + 心魔干擾 + 渡劫小遊戲 + 悟道四選一 + 守境挑戰) ====================
  App.prototype.renderCultivateCoreView = function(container) {
    this.char.initV11State();
    const sc = this.getCurrentShichen();
    const destObj = DESTINY_POOL_V11[this.char.todayDestiny.index % DESTINY_POOL_V11.length];
    const isDestDone = this.char.todayDestiny.completed;

    // 1. 頂部「今日機緣」卷軸（項目 2）
    const destScroll = document.createElement("div");
    destScroll.className = "daily-destiny-bar hide-in-zen";
    destScroll.style.borderLeft = "4px solid var(--cinnabar-red)";
    if (this.char.todayDestiny.collapsed) {
      destScroll.innerHTML = `
        <div class="destiny-header" id="btn-toggle-v11-destiny" style="cursor:pointer;">
          <span>📜 今日機緣：${isDestDone ? '「機緣已了，心神澄明。」' : `【${sc.name}】點擊展開今日機緣引導`}</span>
          <div style="display:flex; align-items:center; gap:6px;">
            ${isDestDone ? '<span class="cinnabar-seal-stamp" style="padding:1px 6px; font-size:0.78rem;">機緣已了</span>' : ''}
            <span style="font-size:0.84rem; color:var(--stone-cyan); font-weight:800;">▾ 展卷</span>
          </div>
        </div>
      `;
    } else {
      destScroll.innerHTML = `
        <div class="destiny-header" style="margin-bottom:6px;">
          <span>📜 今日主線機緣引導 · 【${sc.name}】</span>
          <div style="display:flex; gap:6px; align-items:center;">
            ${isDestDone ? '<span class="cinnabar-seal-stamp" style="padding:1px 6px; font-size:0.8rem;">機緣已了</span>' : ''}
            <button type="button" class="chip-btn" id="btn-collapse-v11-destiny" style="padding:2px 8px; font-size:0.82rem;">▴ 收卷</button>
          </div>
        </div>
        <div style="background:#fbf8f0; border:1px solid var(--ink-border); padding:9px 11px; border-radius:2px;">
          <div style="font-size:0.95rem; font-weight:800; color:var(--ink-black);">
            「${isDestDone ? '機緣已了，心神澄明。' : destObj.text}」
          </div>
          <div style="font-size:0.86rem; color:var(--stone-cyan); font-weight:700; margin-top:4px;">
            🎁 完成獎勵預覽：${destObj.rewardDesc}
          </div>
          <div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">
            <button class="btn-modern gold ${isDestDone ? 'btn-maxed' : ''}" id="btn-go-v11-destiny" ${isDestDone ? 'disabled' : ''} style="flex:1; padding:5px 10px;">
              ${isDestDone ? '✅ 機緣已了（已獲感悟點×1）' : '🧭 前往歷練並完成機緣 (+20%資源 & 感悟點×1)'}
            </button>
            <button class="btn-modern secondary ${this.char.todayDestiny.refreshedToday || isDestDone ? 'btn-maxed' : ''}" id="btn-refresh-v11-destiny" ${this.char.todayDestiny.refreshedToday || isDestDone ? 'disabled' : ''} style="padding:5px 10px;">
              ${this.char.todayDestiny.refreshedToday ? '今日已刷新' : '🔄 刷新機緣 (80真元)'}
            </button>
          </div>
        </div>
      `;
    }
    container.appendChild(destScroll);

    destScroll.querySelector("#btn-toggle-v11-destiny")?.addEventListener("click", () => {
      this.char.todayDestiny.collapsed = false;
      this.renderView();
    });
    destScroll.querySelector("#btn-collapse-v11-destiny")?.addEventListener("click", () => {
      this.char.todayDestiny.collapsed = true;
      this.renderView();
    });
    destScroll.querySelector("#btn-refresh-v11-destiny")?.addEventListener("click", (e) => {
      if (this.char.todayDestiny.refreshedToday) return;
      if (!this.trySpendResource("qi", 80, "本源真氣")) return;
      this.char.todayDestiny.refreshedToday = true;
      this.char.todayDestiny.index = (this.char.todayDestiny.index + 1) % DESTINY_POOL_V11.length;
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "qi", "天機重演 · 今日機緣已刷新");
      this.renderView();
    });
    destScroll.querySelector("#btn-go-v11-destiny")?.addEventListener("click", (e) => {
      if (this.char.todayDestiny.completed) return;
      this.char.todayDestiny.completed = true;
      this.char.todayDestiny.collapsed = true;
      this.char.exp += destObj.expBonus;
      this.char.todayExp += destObj.expBonus;
      this.char.silver += destObj.silverBonus;
      this.char.comprehensionPoints = (this.char.comprehensionPoints || 0) + 1;
      this.char.moodText = "機緣已了，心神澄明。";
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "exp", `〔機緣已了〕+${destObj.expBonus}元氣 & 感悟點×1`);
      if (destObj.targetView && destObj.targetView !== "main") {
        this.currentView = destObj.targetView;
      }
      this.renderView();
    });

    // 呼叫原有的洞天主視圖渲染
    _origRenderCultivateCoreView.call(this, container);

    // 移除舊的「破曉入明日」行程條或將其按鈕改為打坐度過此時辰
    const oldNextDayBtn = container.querySelector("#btn-next-day-reset");
    if (oldNextDayBtn) {
      oldNextDayBtn.innerText = "🧘 打坐度過此時辰";
      oldNextDayBtn.onclick = (ev) => {
        ev.stopPropagation();
        this.openPassShichenConfirmModal();
      };
    }

    // 2. 在水墨舞台左上角注入「入定 ×1~×5」徽章與當前時辰加成提示（項目 3）
    const stageEl = container.querySelector("#main-cultivation-stage");
    if (stageEl) {
      const rudingBonusMap = { 1: 0, 2: 15, 3: 30, 4: 50, 5: 80 };
      const stack = Math.min(5, Math.max(1, this.char.rudingStacks || 1));
      const stackBonus = rudingBonusMap[stack] || 0;
      const badge = document.createElement("div");
      badge.className = "ruding-stack-badge";
      badge.innerHTML = `
        <span>🧘 入定 ×${stack} (+${stackBonus}%)</span>
        ${sc.breathBonus > 0 ? `<span style="color:var(--stone-cyan);">｜${sc.name.split(" ")[0]}+${Math.round(sc.breathBonus * 100)}%</span>` : ""}
      `;
      stageEl.appendChild(badge);
    }

    // 更新吐納按鈕副文案顯示「消耗 5 道心值」與入定加成，並在大圓滿或隨時提供「守境 · 心魔挑戰」與「靈台頓悟」面板
    const medBtn = container.querySelector("#btn-meditate-quick");
    if (medBtn) {
      const subLbl = medBtn.querySelector(".sub-label");
      if (subLbl) {
        subLbl.innerText = `消耗 5 道心值 · 入定×${this.char.rudingStacks || 1} (道心 ${this.char.daoHeartStamina}/${this.char.maxDaoHeartStamina})`;
      }
    }

    // 項目 5 & 項目 6 & 項目 24：在洞天卡片內注入「靈台悟道四向加成 & 守境·心魔挑戰 & 仙侶宗師好感」互動專區
    const heroCard = container.querySelector(".cultivation-hero-card");
    if (heroCard) {
      const wudaoTotal = this.char.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
      const v11Panel = document.createElement("div");
      v11Panel.className = "hide-in-zen";
      v11Panel.style.cssText = "margin-top:12px; background:#f7f2e6; border:1.5px solid var(--ink-border); border-left:4px solid var(--stone-cyan); padding:10px 12px; border-radius:2px;";
      v11Panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:6px;">
          <b style="color:var(--ink-black); font-size:0.98rem;">☸️ 靈台四向悟道 & 守境心魔試煉</b>
          <span class="rarity-pill rarity-gold">持有感悟點: ${this.char.comprehensionPoints} 點 ${this.char.shoujingState.titleUnlocked ? '｜ 🏅 稱號〔道心不移〕' : ''}</span>
        </div>
        <div style="font-size:0.86rem; color:var(--ink-mid); margin-bottom:8px;">
          劍道 +${wudaoTotal.sword * 3}% ｜ 丹道 +${wudaoTotal.pill * 3}% ｜ 陣道 +${wudaoTotal.formation * 3}% ｜ 體道 +${wudaoTotal.body * 3}%（各上限 15%）
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
          <button class="btn-modern secondary" id="btn-open-wudao-scroll" style="padding:6px 6px; font-size:0.85rem;">
            ✨ 靈台頓悟導向
          </button>
          <button class="btn-modern gold" id="btn-open-shoujing-challenge" style="padding:6px 6px; font-size:0.85rem;">
            ⚔️ 守境·心魔挑戰
          </button>
          <button class="btn-modern secondary" id="btn-open-npc-affection" style="padding:6px 6px; font-size:0.85rem;">
            🤝 仙途知己好感
          </button>
        </div>
      `;
      heroCard.appendChild(v11Panel);

      v11Panel.querySelector("#btn-open-wudao-scroll")?.addEventListener("click", () => {
        this.openWudaoEpiphanyModal(true);
      });
      v11Panel.querySelector("#btn-open-shoujing-challenge")?.addEventListener("click", () => {
        this.openShoujingChallengeModal();
      });
      v11Panel.querySelector("#btn-open-npc-affection")?.addEventListener("click", () => {
        this.openNpcAffectionModal();
      });
    }
  };

  // 二、3 & 5. 聚元吐納：消耗 5 道心值、疊加「入定 ×1~×5」、觸發「心魔干擾三選一」與「靈台頓悟四選一」
  App.prototype.performBreathingCultivation = function() {
    this.char.initV11State();
    if (!this.trySpendDaoHeart(5, "聚元吐納")) {
      if (this.holdTimer) { clearInterval(this.holdTimer); this.holdTimer = null; }
      return;
    }

    // 疊加入定層數 (最高 ×5)
    this.char.rudingStacks = Math.min(5, (this.char.rudingStacks || 1) + 1);
    const stack = this.char.rudingStacks;
    const stackMultMap = { 1: 1.0, 2: 1.15, 3: 1.30, 4: 1.50, 5: 1.80 };
    const sc = this.getCurrentShichen();
    const totalMult = (stackMultMap[stack] || 1.0) * (1 + (sc.breathBonus || 0));

    // 心魔觸發檢定：入定×3 開始 8%，每層 +6%
    const demonChance = stack >= 3 ? (0.08 + (stack - 3) * 0.06) : 0;
    if (Math.random() < demonChance) {
      if (this.holdTimer) { clearInterval(this.holdTimer); this.holdTimer = null; }
      this.openHeartDemonInterferenceModal();
      return;
    }

    // 計算入定吐納收益
    const baseExp = Math.round(320 * totalMult);
    const baseQi = Math.round(95 * totalMult);
    this.char.exp += baseExp;
    this.char.todayExp += baseExp;
    this.char.qi += baseQi;
    this.char.moodText = `入定漸深（入定 ×${stack}），靈氣自來。單次納氣 +${baseExp} 元氣！`;

    audio.playQiCharge();
    this.advanceDailyTask("dt_breath", 1);
    this.updateHeader();
    this.renderView();
    this.spawnQiParticles(stack >= 4, `「入定 ×${stack} · 靈氣 +${baseExp}」`);

    // 吐納悟道機緣檢定：基礎 4%，入定×4 以上提升至 9%
    const wudaoChance = stack >= 4 ? 0.09 : 0.04;
    if (Math.random() < wudaoChance) {
      if (this.holdTimer) { clearInterval(this.holdTimer); this.holdTimer = null; }
      setTimeout(() => this.openWudaoEpiphanyModal(false), 350);
    }
  };

  // 心魔干擾三選一彈窗（項目 3）
  App.prototype.openHeartDemonInterferenceModal = function() {
    audio.playTone(190, "sawtooth", 0.3, 0.18);
    const stack = this.char.rudingStacks || 3;
    const bodyHtml = `
      <div style="background:#fdf5f3; border:1.5px solid var(--cinnabar-red); padding:12px; border-radius:2px; margin-bottom:10px;">
        <div style="font-size:1.05rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:4px;">
          😈「心魔悄然滋生，當如何應對？」
        </div>
        <div style="font-size:0.9rem; color:var(--ink-black);">
          當前處於<b>【入定 ×${stack}】</b>深層吐納，識海浮現雜念幻象。若化解成功可保住入定層數並額外獲益；若失敗則入定中斷並損失部分收益。
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <button class="btn-jade" id="btn-demon-resolve-qi">
          <span class="main-label">☯️ 一、消耗 50 真元強行鎮壓</span>
          <span class="sub-label">以渾厚真元滌盪識海（100% 穩妥化解）</span>
        </button>
        <button class="btn-modern gold full" id="btn-demon-resolve-pill">
          💊 二、使用一顆清心／通脈丹藥撫平心神
        </button>
        <button class="btn-modern secondary full" id="btn-demon-resolve-qte">
          ⚡ 三、完成 1.2 秒時機點擊（免費 · 考驗靈台反應）
        </button>
      </div>
      <div id="demon-qte-slot" style="margin-top:10px;"></div>
    `;
    this.openV11InteractiveModal("😈〔吐納心魔干擾 · 三選一化解〕", bodyHtml, (ov) => {
      const finishSuccess = (methodDesc) => {
        this.char.exp += 480;
        this.char.qi += 120;
        this.char.moodText = "心魔暫退，道心愈堅。";
        audio.playEpiphanyBell();
        this.closeV11InteractiveModal();
        this.triggerFlyingReward(null, "exp", `心魔暫退，道心愈堅 (+480元氣)`);
        this.renderView();
      };
      const finishFail = () => {
        this.char.rudingStacks = 1;
        this.char.innerDemonValue = (this.char.innerDemonValue || 0) + 2;
        this.char.exp = Math.max(0, this.char.exp - 120);
        this.char.moodText = "心魔侵擾，入定中斷，氣血微亂。";
        audio.playTone(160, "sawtooth", 0.25, 0.2);
        this.closeV11InteractiveModal();
        this.showSystemToast("⚠️ 化解失敗！入定層數重置為 ×1，並損失 120 元氣", true);
        this.renderView();
      };

      ov.querySelector("#btn-demon-resolve-qi")?.addEventListener("click", () => {
        if (!this.trySpendResource("qi", 50, "本源真氣")) return;
        finishSuccess("真元鎮壓");
      });
      ov.querySelector("#btn-demon-resolve-pill")?.addEventListener("click", () => {
        const pill = (this.char.inventory || []).find(i => i.id.startsWith("pill_") && i.count > 0);
        if (pill) {
          this.char.removeItem(pill.id, 1);
          finishSuccess("丹藥清心");
        } else if (this.trySpendResource("silver", 80, "購買安神丹所需靈石")) {
          finishSuccess("安神丹化解");
        }
      });
      ov.querySelector("#btn-demon-resolve-qte")?.addEventListener("click", () => {
        const slot = ov.querySelector("#demon-qte-slot");
        if (!slot) return;
        slot.innerHTML = `
          <div style="background:#fbf8f1; border:1.5px solid var(--cinnabar-red); padding:10px; text-align:center;">
            <div style="font-size:0.92rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:6px;">
              ⏱️ 請在 1.2 秒內迅速點擊下方「破妄印」！
            </div>
            <button class="btn-jade" id="btn-demon-qte-hit" style="width:100%;">
              <span class="main-label">〔靈台守一 · 點擊破妄〕</span>
            </button>
          </div>
        `;
        let clicked = false;
        const timer = setTimeout(() => {
          if (!clicked) finishFail();
        }, 1200);
        slot.querySelector("#btn-demon-qte-hit")?.addEventListener("click", () => {
          clicked = true;
          clearTimeout(timer);
          finishSuccess("時機點擊");
        });
      });
    });
  };

  // 吐納悟道機緣卷軸（項目 5：劍、丹、陣、體四選一）
  App.prototype.openWudaoEpiphanyModal = function(fromButton = false) {
    this.char.initV11State();
    audio.playEpiphanyBell();
    const w = this.char.wudaoStacks;
    const bodyHtml = `
      <div style="background:#fbf8f0; border:1px solid var(--ink-black); padding:12px; border-radius:2px; margin-bottom:10px;">
        <div style="font-size:1.04rem; font-weight:900; color:var(--ink-black); margin-bottom:4px;">
          「靈台忽明，似有所悟。此感悟當歸於何處？」
        </div>
        <div style="font-size:0.88rem; color:var(--stone-cyan);">
          ${fromButton ? `消耗 1 點感悟點（目前持有 ${this.char.comprehensionPoints} 點）導向永久道韻加成：` : "🌟 吐納中觸發【靈台頓悟】免費機緣！請選擇感悟歸向："}
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <button class="btn-modern gold btn-wudao-dir" data-dir="sword" style="padding:10px; text-align:left;">
          <b>🗡️ 劍道感悟 (${w.sword}/5)</b>
          <div style="font-size:0.82rem; margin-top:3px;">神劍類道訣威力 +3%（當前 +${w.sword * 3}%）</div>
        </button>
        <button class="btn-modern gold btn-wudao-dir" data-dir="pill" style="padding:10px; text-align:left;">
          <b>💊 丹道感悟 (${w.pill}/5)</b>
          <div style="font-size:0.82rem; margin-top:3px;">煉丹極品率 +3%（當前 +${w.pill * 3}%）</div>
        </button>
        <button class="btn-modern gold btn-wudao-dir" data-dir="formation" style="padding:10px; text-align:left;">
          <b>☯️ 陣道感悟 (${w.formation}/5)</b>
          <div style="font-size:0.82rem; margin-top:3px;">奇門大陣效果 +3%（當前 +${w.formation * 3}%）</div>
        </button>
        <button class="btn-modern gold btn-wudao-dir" data-dir="body" style="padding:10px; text-align:left;">
          <b>💪 體道感悟 (${w.body}/5)</b>
          <div style="font-size:0.82rem; margin-top:3px;">氣血與靈罡 +3%（當前 +${w.body * 3}%）</div>
        </button>
      </div>
    `;
    this.openV11InteractiveModal("📜〔靈台頓悟 · 四向歸真〕", bodyHtml, (ov) => {
      ov.querySelectorAll(".btn-wudao-dir").forEach(btn => {
        btn.addEventListener("click", () => {
          const dir = btn.dataset.dir;
          if ((this.char.wudaoStacks[dir] || 0) >= 5) {
            this.showSystemToast("此方向感悟已達 15% (5層) 上限！", true);
            return;
          }
          if (fromButton) {
            if ((this.char.comprehensionPoints || 0) <= 0) {
              this.showSystemToast("⚠️ 感悟點不足！可透過完成「今日機緣」或「戰鬥高評價」獲取感悟點", true);
              return;
            }
            this.char.comprehensionPoints--;
          }
          this.char.wudaoStacks[dir] = (this.char.wudaoStacks[dir] || 0) + 1;
          const msgMap = {
            sword: "「劍意入骨，往後揮劍更有幾分神韻。」（神劍威力 +3%）",
            pill: "「丹火入心，百草藥性瞭然於胸。」（極品丹率 +3%）",
            formation: "「星宿入眸，奇門陣紋隨念而轉。」（大陣威能 +3%）",
            body: "「氣血如龍，筋骨更添幾分太古神韻。」（氣血靈罡 +3%）"
          };
          this.char.moodText = msgMap[dir];
          audio.playLevelUp();
          this.closeV11InteractiveModal();
          this.triggerFlyingReward(null, "qi", msgMap[dir]);
          this.renderView();
          // 觸發器靈氣泡
          this.spawnSpiritWhisperBubble("主上靈台頓悟，道韻愈發深邃，老朽佩服！");
        });
      });
    });
  };

  // 二、4. 破境改為「三波天劫策略 + QTE 渡劫小遊戲」 + 項目 24「大境界破境悟道獨白動畫」
  App.prototype.performBreakthrough = function(reqExp, nextRealmName) {
    this.char.initV11State();
    if (this.char.realmIndex >= 8) {
      this.openShoujingChallengeModal();
      return;
    }
    if (this.char.exp < reqExp) {
      this.triggerNextRealmPreview(nextRealmName);
      this.showSystemToast(`⚠️ 元氣尚未盈滿！還差 ${reqExp - this.char.exp} 點天地元氣方可叩關渡劫`, true);
      return;
    }
    this.openTribulationMiniGameModal(reqExp, nextRealmName);
  };

  App.prototype.openTribulationMiniGameModal = function(reqExp, nextRealmName, isGaimingMode = false, gaimingRealmName = "") {
    audio.playSwordClash();
    const maxHp = this.char.getEffectiveStat("hp");
    const state = {
      wave: 1,
      maxWaves: 3,
      hp: maxHp,
      maxHp: maxHp,
      nextWavePowerMult: isGaimingMode ? 1.35 : 1.0,
      logs: [`⚡「九天神雷將落，道友可願一試？」目標：${isGaimingMode ? `【逆天改命 · ${gaimingRealmName}】` : `【${nextRealmName}】`}`]
    };

    const renderWaveUI = () => {
      const hpPct = Math.max(0, Math.round((state.hp / state.maxHp) * 100));
      const baseDmg = Math.floor(state.maxHp * 0.28 * state.nextWavePowerMult * (1 + (state.wave - 1) * 0.18));
      const bodyHtml = `
        <div style="background:linear-gradient(180deg, #e5dec9 0%, #d2c8b2 100%); border:2px solid var(--ink-black); padding:12px; border-radius:2px; margin-bottom:10px; text-align:center;">
          <div style="font-size:0.9rem; color:var(--cinnabar-red); font-weight:900;">
            🌩️〔水墨天劫道台 · 第 ${state.wave} / ${state.maxWaves} 波劫雷〕
          </div>
          <div style="font-size:2.1rem; margin:6px 0;">⚡🐉☁️</div>
          <div style="font-size:0.95rem; font-weight:800; color:var(--ink-black);">
            本波神雷威能：約 <b>${baseDmg}</b> 點雷罰傷害（威力倍率 ${Math.round(state.nextWavePowerMult * 100)}%）
          </div>
          <div style="margin-top:8px; font-size:0.86rem; color:var(--pine-green); font-weight:800;">
            修士護體氣血：${state.hp} / ${state.maxHp} (${hpPct}%)
          </div>
          <div class="hp-bar-outer" style="margin-top:4px;">
            <div class="hp-bar-fill" style="width:${hpPct}%; background:var(--pine-green);"></div>
          </div>
        </div>

        <div style="font-size:0.88rem; color:var(--ink-dark); background:#faf6ec; border:1px solid var(--ink-border); padding:8px; margin-bottom:10px; max-height:90px; overflow-y:auto;">
          ${state.logs.map(l => `<div>• ${l}</div>`).join("")}
        </div>

        <div id="trib-qte-zone">
          <div style="font-size:0.92rem; font-weight:900; color:var(--ink-black); margin-bottom:6px;">
            請選擇第 ${state.wave} 波應劫策略：
          </div>
          <div style="display:flex; flex-direction:column; gap:7px;">
            <button class="btn-modern secondary full btn-trib-strat" data-strat="tank" style="text-align:left; padding:8px 10px;">
              🛡️ <b>硬抗天劫</b>：減傷 40%，但額外損失 8% 當前氣血（穩健承傷）
            </button>
            <button class="btn-modern secondary full btn-trib-strat" data-strat="dodge" style="text-align:left; padding:8px 10px;">
              🌀 <b>破虛躲閃</b>：本波完全躲避 (0傷害)，但下次天劫威力 +15%
            </button>
            <button class="btn-jade btn-trib-strat" data-strat="counter" style="text-align:left; padding:8px 10px;">
              <span class="main-label">⚔️ 以攻代守（反傷 25% + 減傷 60%）</span>
              <span class="sub-label">需完成 1.2 秒時機點擊破開雷眼！</span>
            </button>
          </div>
        </div>
      `;

      this.openV11InteractiveModal("⚡〔叩關破境 · 九天渡劫演武〕", bodyHtml, (ov) => {
        const settleWave = (strat, qtePassed) => {
          let dmgTaken = 0;
          if (strat === "tank") {
            const selfCost = Math.floor(state.hp * 0.08);
            dmgTaken = selfCost + Math.floor(baseDmg * 0.60);
            state.nextWavePowerMult = 1.0;
            state.logs.push(`第 ${state.wave} 波【硬抗】：運轉霸體減傷 40%，承受 ${dmgTaken} 點雷傷！`);
          } else if (strat === "dodge") {
            dmgTaken = 0;
            state.nextWavePowerMult = Number((state.nextWavePowerMult + 0.15).toFixed(2));
            state.logs.push(`第 ${state.wave} 波【躲閃】：身融虛空完全避開神雷，下波天劫威力 +15%！`);
          } else {
            if (qtePassed) {
              dmgTaken = Math.floor(baseDmg * 0.35);
              state.nextWavePowerMult = 0.95;
              state.logs.push(`第 ${state.wave} 波【以攻代守·完美破雷】：一劍反傷天劫 25%，僅受 ${dmgTaken} 點餘波！`);
            } else {
              dmgTaken = Math.floor(baseDmg * 1.15);
              state.logs.push(`第 ${state.wave} 波【以攻代守·失手】：時機偏差遭雷霆正面轟擊，承受 ${dmgTaken} 點重創！`);
            }
          }

          state.hp = Math.max(0, state.hp - dmgTaken);
          audio.playSwordClash();

          // 失敗判定
          if (state.hp <= 0) {
            this.closeV11InteractiveModal();
            if (!isGaimingMode) {
              this.char.exp = Math.floor(reqExp * 0.70);
              this.char.innerDemonValue = (this.char.innerDemonValue || 0) + 5;
            }
            this.char.moodText = "功虧一簣，然道心未損，來日再戰。";
            this.updateHeader();
            this.renderView();
            this.openV11InteractiveModal("💔〔差之毫釐 · 渡劫惜敗〕", `
              <div style="padding:12px; text-align:center;">
                <div style="font-size:1.08rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:8px;">
                  「功虧一簣，然道心未損，來日再戰。」
                </div>
                <div style="font-size:0.92rem; color:var(--ink-black);">
                  ${isGaimingMode ? "逆天改命雷劫過於猛烈，請提升靈罡後再試！" : "丹田元氣保留 70%，心魔 +5。不妨先吞服丹藥或祭煉護體仙甲後再次叩關！"}
                </div>
                <button class="btn-jade" id="btn-fail-trib-ok" style="width:100%; margin-top:12px;">
                  <span class="main-label">調息固本 · 返回洞天</span>
                </button>
              </div>
            `, (o2) => {
              o2.querySelector("#btn-fail-trib-ok")?.addEventListener("click", () => this.closeV11InteractiveModal());
            });
            return;
          }

          // 成功通過全部波次
          if (state.wave >= state.maxWaves) {
            this.closeV11InteractiveModal();
            if (isGaimingMode) {
              this.char.endgameState.gaimingUnlocked = true;
              this.char.endgameState.gaimingClears = (this.char.endgameState.gaimingClears || 0) + 1;
              this.char.comprehensionPoints += 2;
              audio.playLevelUp();
              this.triggerFlyingReward(null, "qi", "逆天改命成功！獲得【改命】特質 (全屬性+3%)");
              this.renderView();
              return;
            }
            const crossingMajorRealm = this.char.realmLayer >= 9;
            this.char.exp = reqExp; // 確保足夠扣除
            _origPerformBreakthrough.call(this, reqExp, nextRealmName);
            this.spawnSpiritWhisperBubble("天劫已過，道基再進一重！主上神威蓋世！");
            if (crossingMajorRealm) {
              setTimeout(() => this.playRealmMonologueAnimation(), 900);
            }
            return;
          }

          state.wave++;
          renderWaveUI();
        };

        ov.querySelectorAll(".btn-trib-strat").forEach(btn => {
          btn.addEventListener("click", () => {
            const strat = btn.dataset.strat;
            if (strat === "counter") {
              const qZone = ov.querySelector("#trib-qte-zone");
              if (!qZone) return;
              qZone.innerHTML = `
                <div style="background:#fdf6f4; border:2px solid var(--cinnabar-red); padding:12px; text-align:center;">
                  <div style="font-size:0.96rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:8px;">
                    ⚡ 雷眼顯現！請在 1.2 秒內點擊下方朱砂印「逆斬天雷」！
                  </div>
                  <button class="btn-jade" id="btn-trib-qte-strike" style="width:100%;">
                    <span class="main-label">🗡️〔以攻代守 · 逆斬天雷〕</span>
                  </button>
                </div>
              `;
              let hit = false;
              const tId = setTimeout(() => {
                if (!hit) settleWave("counter", false);
              }, 1200);
              qZone.querySelector("#btn-trib-qte-strike")?.addEventListener("click", () => {
                hit = true;
                clearTimeout(tId);
                audio.playEpiphanyBell();
                settleWave("counter", true);
              });
            } else {
              settleWave(strat, true);
            }
          });
        });
      });
    };

    renderWaveUI();
  };

  // 項目 24：每個大境界破境成功後，播放 8–12 秒悟道獨白水墨動畫
  App.prototype.playRealmMonologueAnimation = function() {
    const realmMonologues = [
      "「至此，我已非昔日凡胎。然前方之路，仍是未知……」",
      "「丹田開闢洞天，方知天地之廣。昔日仰望之高嶺，今已踏於足下。」",
      "「大道靈胎初成，風雷入吾袖中。縱使前路萬劫加身，吾道不孤！」",
      "「五行神藏盡開，元神照徹太虛。凡塵因果皆作過眼雲煙。」"
    ];
    const monoText = realmMonologues[this.char.realmIndex % realmMonologues.length];
    const bodyHtml = `
      <div class="monologue-scroll-box">
        <div style="font-size:0.9rem; color:var(--stone-cyan); font-weight:800; letter-spacing:2px; margin-bottom:8px;">
          〔大境界飛升 · 靈台悟道獨白〕
        </div>
        <div style="margin:10px auto; display:flex; justify-content:center;">
          ${this.buildCultivatorSVG(this.char.realmIndex, this.char.realmLayer)}
        </div>
        <div style="font-size:1.12rem; font-weight:900; color:var(--ink-black); line-height:1.75; margin:12px 0;">
          ${monoText}
        </div>
        <div style="font-size:0.88rem; color:var(--cinnabar-red); font-weight:800;">
          ✨ 大境界道心蛻變：道心上限提升至 ${this.char.maxDaoHeartStamina}，獲贈感悟點 ×2！
        </div>
        <button class="btn-jade" id="btn-close-monologue" style="width:100%; margin-top:12px;">
          <span class="main-label">〔銘記道心 · 踏入新境〕</span>
        </button>
      </div>
    `;
    this.char.comprehensionPoints = (this.char.comprehensionPoints || 0) + 2;
    this.updateHeader();
    this.openV11InteractiveModal("🌌〔破境悟道獨白〕", bodyHtml, (ov) => {
      ov.querySelector("#btn-close-monologue")?.addEventListener("click", () => {
        this.closeV11InteractiveModal();
      });
    });
  };

  // 項目 6 & 項目 23：守境 · 心魔挑戰 + 終局「逆天改命」與「心魔殿」
  App.prototype.openShoujingChallengeModal = function() {
    this.char.initV11State();
    const sj = this.char.shoujingState;
    const eg = this.char.endgameState;
    const bonusPct = (sj.wins > 0 ? (1.5 + Math.floor(sj.wins / 5) * 0.5) : 0).toFixed(1);
    const bodyHtml = `
      <div style="background:#fbf8f0; border:1px solid var(--ink-black); padding:12px; margin-bottom:10px;">
        <div style="font-size:1.02rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:4px;">
          「道已大成，然心魔仍在。可願以己身道心，與之對決？」
        </div>
        <div style="font-size:0.88rem; color:var(--ink-black);">
          • <b>守境 · 心魔挑戰</b>：首次勝利全屬性 +1.5% 並獲稱號<b>「道心不移」</b>；後續每 5 次勝利額外 +0.5% 全屬性（目前累計勝場：<b>${sj.wins}</b> 場，加成 <b>+${bonusPct}%</b>）。<br/>
          • <b>逆天改命</b>：「天劫已過，然心中仍有遺憾。可願逆天再試一次？」重渡高難度過往天劫，成功獲<b>「改命」特質（全屬性 +3%）</b>。<br/>
          • <b>心魔殿（第 ${eg.xinmoFloor} 層）</b>：與自身心魔具現化反覆對決，每 10 層獲得一次永久屬性加成。
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <button class="btn-jade" id="btn-start-shoujing-fight">
          <span class="main-label">⚔️ 守境 · 心魔具現對決 (難度 Lv.${sj.wins + 1})</span>
          <span class="sub-label">${sj.titleUnlocked ? '已獲〔道心不移〕· 繼續挑戰疊加全屬性' : '首勝獲全屬性 +1.5% 與稱號〔道心不移〕'}</span>
        </button>
        <button class="btn-modern gold full" id="btn-start-gaiming-trib">
          ⚡ 逆天改命 · 重渡高難度【紫曜三罡雷劫】 (${eg.gaimingUnlocked ? '已覺醒〔改命〕特質 +3%' : '首通解鎖〔改命〕全屬性 +3%'})
        </button>
        <button class="btn-modern secondary full" id="btn-start-xinmo-palace">
          🏯 闖蕩【心魔殿 · 第 ${eg.xinmoFloor} 層】 (每 10 層永久全屬性 +1%)
        </button>
      </div>
    `;
    this.openV11InteractiveModal("👑〔守境挑戰 · 逆天改命 · 心魔殿〕", bodyHtml, (ov) => {
      ov.querySelector("#btn-start-shoujing-fight")?.addEventListener("click", () => {
        this.closeV11InteractiveModal();
        const scale = 1 + sj.wins * 0.12;
        this.char.shoujingState.wins++;
        this.char.shoujingState.titleUnlocked = true;
        this.launchCombat({
          name: `陸沉舟 · 具現心魔幻影 (守境第${sj.wins}重)`,
          avatar: "😈",
          hp: Math.floor(this.char.getEffectiveStat("hp") * 0.95 * scale),
          atk: Math.floor(this.char.getEffectiveStat("atk") * 0.85 * scale),
          def: Math.floor(this.char.getEffectiveStat("def") * 0.8),
          exp: 1800,
          coins: 1500,
          affixes: [ENEMY_AFFIX_POOL_V11[0], ENEMY_AFFIX_POOL_V11[2]]
        }, false);
      });
      ov.querySelector("#btn-start-gaiming-trib")?.addEventListener("click", () => {
        this.openTribulationMiniGameModal(0, "逆天改命", true, "紫曜三罡極限雷劫");
      });
      ov.querySelector("#btn-start-xinmo-palace")?.addEventListener("click", () => {
        this.closeV11InteractiveModal();
        const fl = this.char.endgameState.xinmoFloor || 1;
        this.char.endgameState.xinmoFloor = fl + 1;
        this.launchCombat({
          name: `心魔殿第 ${fl} 層 · 執念魔胎`,
          avatar: "👹",
          hp: 3600 + fl * 450,
          atk: 220 + fl * 28,
          def: 70 + fl * 8,
          exp: 1200 + fl * 150,
          coins: 950 + fl * 120,
          affixes: [ENEMY_AFFIX_POOL_V11[1]]
        }, false);
      });
    });
  };

  // 項目 24：重要 NPC 好感度系統與事件線
  App.prototype.openNpcAffectionModal = function() {
    this.char.initV11State();
    const aff = this.char.npcAffection;
    const rowsHtml = NPC_RELATIONS_DATA.map(npc => {
      const pts = aff[npc.id] || 20;
      const stageIdx = Math.min(2, Math.floor(pts / 20));
      return `
        <div style="background:#fbf8f0; border:1px solid var(--ink-border); padding:10px; border-radius:2px; margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="color:var(--ink-black); font-size:0.98rem;">🤝 ${npc.name} · <span style="color:var(--stone-cyan);">${npc.title}</span></b>
            <span class="rarity-pill rarity-gold">好感度: ${pts}/100</span>
          </div>
          <div style="font-size:0.86rem; color:var(--ink-mid); margin:4px 0;">${npc.desc}</div>
          <div style="font-size:0.9rem; color:var(--cinnabar-red); background:#f3ecdc; padding:6px 8px; border-radius:2px; margin:6px 0;">
            💬 專屬對話（好感 Lv.${stageIdx + 1}）：${npc.dialogues[stageIdx]}
          </div>
          <button class="btn-modern gold btn-gift-npc" data-id="${npc.id}" style="width:100%; padding:5px 8px; font-size:0.85rem;">
            🎁 贈送仙茶論道 (消耗 100 靈石 · 好感 +20 並獲回禮)
          </button>
        </div>
      `;
    }).join("");

    this.openV11InteractiveModal("🤝〔仙途知己 · 宗師好感錄〕", rowsHtml, (ov) => {
      ov.querySelectorAll(".btn-gift-npc").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (!this.trySpendResource("silver", 100, "上品靈石")) return;
          this.char.npcAffection[id] = Math.min(100, (this.char.npcAffection[id] || 20) + 20);
          this.char.exp += 450;
          this.char.qi += 180;
          audio.playEpiphanyBell();
          this.triggerFlyingReward(btn, "exp", "論道甚歡！好感 +20，獲贈 +450元氣/+180真氣");
          this.openNpcAffectionModal();
        });
      });
    });
  };

  // 紫微演卦改為消耗 12 道心值（項目 1）
  App.prototype.renderDivinationSubView = function(container) {
    _origRenderDivinationSubView.call(this, container);
    const btn = container.querySelector("#btn-cast-divination");
    if (btn) {
      const sub = btn.querySelector(".sub-label");
      if (sub) sub.innerText = `消耗 12 道心值 + 100 真元 · 逆天改運`;
      const clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
      clone.addEventListener("click", (e) => {
        if ((this.char.dailyDivinationCount || 0) >= 3) return;
        if (!this.trySpendDaoHeart(12, "紫微演卦")) return;
        if (!this.trySpendResource("qi", 100, "本源真氣")) return;
        this.char.dailyDivinationCount = (this.char.dailyDivinationCount || 0) + 1;
        const pool = [
          { title: "鴻運 · 紫微帝星臨命", bonusDesc: "今日大荒探索必掉 4 件隨機高階寶物，極品詞條率翻倍！", mult: 1.6 },
          { title: "大凶 · 白虎煞星衝宮", bonusDesc: "富貴險中求！今日斬殺強敵繳獲戰利品價值提升 300%！", mult: 2.0 },
          { title: "天機 · 青龍化祿入命", bonusDesc: "洞天吐納與煉丹極品率提升 45%，隨機獲贈古寶！", mult: 1.45 }
        ];
        this.char.divinationState = pool[Math.floor(Math.random() * pool.length)];
        this.char.luck += 4;
        audio.playEpiphanyBell();
        this.triggerFlyingReward(e.currentTarget, "qi", `卜出【${this.char.divinationState.title}】`);
        this.renderView();
      });
    }
  };

  // 渡劫道台同步整合「逆天改命」與「心魔殿」入口（項目 23）
  App.prototype.renderTribulationSubView = function(container) {
    _origRenderTribulationSubView.call(this, container);
    const extraCard = document.createElement("div");
    extraCard.className = "game-card";
    extraCard.style.marginTop = "10px";
    extraCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <b style="color:var(--cinnabar-red); font-size:1.02rem;">⚡ 終局試煉：逆天改命 & 心魔殿</b>
        <span class="rarity-pill rarity-gold">心魔殿: 第 ${this.char.endgameState?.xinmoFloor || 1} 層</span>
      </div>
      <div style="font-size:0.9rem; color:var(--ink-black); margin-bottom:8px;">
        「天劫已過，然心中仍有遺憾。可願逆天再試一次？」重渡過往天劫可覺醒<b>【改命】特質（全屬性 +3%）</b>。
      </div>
      <button class="btn-jade" id="btn-open-endgame-hub" style="width:100%;">
        <span class="main-label">🌌 進入【逆天改命 · 心魔殿 · 守境對決】</span>
      </button>
    `;
    container.appendChild(extraCard);
    extraCard.querySelector("#btn-open-endgame-hub")?.addEventListener("click", () => {
      this.openShoujingChallengeModal();
    });
  };

  // ==================== 三、〔經〕大荒道藏 (項目 8 道訣意境 Lv.1~5 + 項目 9 自創神通主副效果編輯器) ====================
  App.prototype.renderKungfuView = function(container) {
    this.char.initV11State();
    _origRenderKungfuView.call(this, container);

    // 為每張道訣卡片追加「意境 Lv.X」顯示與提升按鈕（項目 8）
    const allBox = container.querySelector("#all-skills-box");
    if (allBox) {
      const cards = allBox.children;
      SKILLS_DATA.forEach((sk, idx) => {
        const cardEl = cards[idx];
        if (!cardEl) return;
        const artLv = Math.min(5, (this.char.skillArtisticLv && this.char.skillArtisticLv[sk.id]) || 1);
        const isArtMax = artLv >= 5;
        const hiddenUnlockText = artLv >= 5
          ? "🌟 已解鎖 Lv.3【額外破甲+8%】與 Lv.5【蒼茫劍意·真傷+15%】"
          : (artLv >= 3 ? "✅ 已解鎖 Lv.3【額外破甲+8%】（Lv.5 解鎖真傷+15%）" : "🔒 意境 Lv.3 解鎖【額外破甲+8%】");

        const artBar = document.createElement("div");
        artBar.style.cssText = "margin-top:8px; padding-top:6px; border-top:1px dashed var(--ink-border); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;";
        artBar.innerHTML = `
          <div style="font-size:0.85rem; color:var(--stone-cyan); font-weight:800;">
            🖌️ 意境 Lv.${artLv}/5 ｜ ${hiddenUnlockText}
          </div>
          <button class="btn-modern secondary btn-up-artistic ${isArtMax ? 'btn-maxed' : ''}" data-id="${sk.id}" ${isArtMax ? 'disabled' : ''} style="padding:4px 9px; font-size:0.82rem;">
            ${isArtMax ? '意境圓滿 Lv.5' : '🖌️ 提升意境 (100真元)'}
          </button>
        `;
        cardEl.appendChild(artBar);

        artBar.querySelector(".btn-up-artistic")?.addEventListener("click", (e) => {
          if (artLv >= 5) return;
          if (!this.trySpendResource("qi", 100, "本源真氣")) return;
          this.char.skillArtisticLv[sk.id] = artLv + 1;
          audio.playEpiphanyBell();
          this.triggerFlyingReward(e.currentTarget, "qi", `「意境提升，此劍已多了幾分蒼茫之意。」(意境 Lv.${artLv + 1})`);
          this.renderView();
        });
      });
    }

    // 項目 9：自創神通推演編輯器（主效果 + 1 個副效果，150 真元隨時重構）
    const mainEffects = [
      { name: "太初萬劍齊發", basePct: 180, desc: "引動本命劍陣貫穿敵陣" },
      { name: "焚天混沌火蓮", basePct: 210, desc: "引爆雙生神火造成毀滅暴擊" },
      { name: "九霄紫極雷罰", basePct: 195, desc: "召喚天劫神雷鎮壓邪魔" }
    ];
    const subEffects = [
      { name: "庚金破甲", bonusPct: 65, desc: "無視敵方 35% 靈罡防禦" },
      { name: "吞天汲血", bonusPct: 55, desc: "將 20% 傷害轉化為自身氣血" },
      { name: "神念震懾", bonusPct: 75, desc: "50% 機率麻痹敵手並削減護盾" }
    ];
    const cfg = this.char.customSkillConfig || { mainIdx: 0, subIdx: 0, reforgeCount: 1 };
    const mEff = mainEffects[cfg.mainIdx % mainEffects.length];
    const sEff = subEffects[cfg.subIdx % subEffects.length];
    const totalPct = Math.min(650, mEff.basePct + sEff.bonusPct + (this.char.customSkillLv || 1) * 75);

    const editorCard = document.createElement("div");
    editorCard.className = "game-card";
    editorCard.style.marginTop = "10px";
    editorCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap;">
        <b style="color:var(--cinnabar-red); font-size:1.02rem;">✍️ 本命神通推演編輯器（神藏境提前開放）</b>
        <span class="rarity-pill rarity-gold">綜合威能: ${totalPct}% (上限 600%+)</span>
      </div>
      <div style="font-size:0.88rem; color:var(--ink-black); margin-bottom:8px;">
        「此神通為你親手推演，當可隨心演變。」可自由搭配<b>【主效果】＋【1 個副效果】</b>：
      </div>
      <div style="background:#fbf8f0; border:1px solid var(--ink-border); padding:9px; border-radius:2px; margin-bottom:8px; font-size:0.9rem;">
        • <b>當前主效果：</b>【${mEff.name}】（基礎 ${mEff.basePct}% · ${mEff.desc}）<br/>
        • <b>當前副效果：</b>【${sEff.name}】（增幅 +${sEff.bonusPct}% · ${sEff.desc}）
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn-jade" id="btn-reforge-custom-skill" style="flex:1;">
          <span class="main-label">🔄 消耗 150 真元重構主／副效果組合</span>
          <span class="sub-label">切換神通流派詞條並提升契合度</span>
        </button>
      </div>
    `;
    container.appendChild(editorCard);

    editorCard.querySelector("#btn-reforge-custom-skill")?.addEventListener("click", (e) => {
      if (!this.trySpendResource("qi", 150, "本源真氣")) return;
      cfg.mainIdx = (cfg.mainIdx + 1) % mainEffects.length;
      cfg.subIdx = (cfg.subIdx + 1) % subEffects.length;
      cfg.reforgeCount = (cfg.reforgeCount || 1) + 1;
      this.char.customSkillConfig = cfg;
      const newM = mainEffects[cfg.mainIdx];
      const newS = subEffects[cfg.subIdx];
      this.char.customSkill = {
        name: `${newM.name}·${newS.name}`,
        power: Number(((newM.basePct + newS.bonusPct + (this.char.customSkillLv || 1) * 75) / 100).toFixed(2)),
        desc: `主效果【${newM.desc}】＋副效果【${newS.desc}】`
      };
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "qi", `重構本命神通：【${this.char.customSkill.name}】`);
      this.renderView();
    });
  };

  // ==================== 四、〔脈〕太初氣脈 (項目 10 五極靈竅剛／柔雙分支與重置 + 項目 11 霸王軀淬體三選一事件) ====================
  App.prototype.renderMeridianView = function(container) {
    this.char.initV11State();
    _origRenderMeridianView.call(this, container);

    const wuxing = MERIDIANS_DATA[0];
    const branches = this.char.acupointBranches || {};
    const gangCount = Object.values(branches).filter(x => x === "gang").length;
    const rouCount = Object.values(branches).filter(x => x === "rou").length;
    let comboTrait = "尚未五竅全開（五竅全開後依剛／柔比例覺醒專屬體質）";
    if (this.char.unlockedAcupoints.length >= wuxing.points.length) {
      if (gangCount >= 4) comboTrait = "🔥【五極純剛 · 太古殺神體】（神通殺力 +25%，暴擊傷害 +35%）";
      else if (rouCount >= 4) comboTrait = "🌊【五極至柔 · 萬古長青體】（氣血上限 +30%，每回合回春 +8%）";
      else comboTrait = "☯️【剛柔並濟 · 混沌陰陽道體】（攻守兼備，全屬性 +18%，免傷 +15%）";
    }

    // 在五極靈竅格子上方插入「剛／柔雙分支總覽與重置（消耗 200 真元）」橫幅
    const wxGrid = container.querySelector("#wuxing-nodes-grid");
    if (wxGrid) {
      const branchBanner = document.createElement("div");
      branchBanner.style.cssText = "background:#fbf8f0; border:1px solid var(--ink-border); padding:9px 11px; border-radius:2px; margin-bottom:8px; font-size:0.88rem;";
      branchBanner.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <span>⚖️ <b>五極靈竅剛／柔分支：</b>剛線 <b>${gangCount}</b> 竅（偏攻擊）｜ 柔線 <b>${rouCount}</b> 竅（偏生存回復）</span>
          <button class="chip-btn" id="btn-reset-acupoint-branches" style="font-size:0.8rem; padding:2px 8px;">🔄 重置分支 (200真元)</button>
        </div>
        <div style="color:var(--cinnabar-red); font-weight:800; margin-top:4px;">🌟 五竅組合特質：${comboTrait}</div>
      `;
      wxGrid.parentNode.insertBefore(branchBanner, wxGrid);

      branchBanner.querySelector("#btn-reset-acupoint-branches")?.addEventListener("click", () => {
        if (!this.trySpendResource("qi", 200, "本源真氣")) return;
        this.openAcupointBranchModal(wuxing.points[0], true);
      });

      // 覆寫每個靈竅卡片點擊：未開時彈出「剛／柔雙選卡片」，已開時亦可點擊切換剛／柔
      Array.from(wxGrid.children).forEach((nCard, idx) => {
        const pt = wuxing.points[idx];
        if (!pt) return;
        const isOpened = this.char.unlockedAcupoints.includes(pt.id);
        const curBranch = branches[pt.id] || "gang";
        const branchTag = document.createElement("div");
        branchTag.style.cssText = "font-size:0.82rem; color:var(--cinnabar-red); font-weight:800; margin-top:3px;";
        branchTag.innerText = isOpened
          ? `分支：【${curBranch === 'gang' ? '剛線·殺力+95/暴擊+4%' : '柔線·氣血+850/靈罡+60'}】(點擊可重選)`
          : "點擊選擇【剛猛之路】或【厚重之途】";
        nCard.appendChild(branchTag);

        const clone = nCard.cloneNode(true);
        nCard.parentNode.replaceChild(clone, nCard);
        clone.addEventListener("click", () => {
          const prevOpened = idx === 0 || this.char.unlockedAcupoints.includes(wuxing.points[idx - 1].id);
          if (!isOpened && !prevOpened) {
            this.showSystemToast(`🔒 請先貫通前一處靈竅【${wuxing.points[idx - 1].name}】！`, true);
            return;
          }
          this.openAcupointBranchModal(pt, isOpened);
        });
      });
    }

    // 項目 11：霸王軀淬體事件（點擊時先彈出三選一事件）
    const bGrid = container.querySelector("#body-stages-grid");
    if (bGrid) {
      const bodyStages = [
        { id: "body_1", name: "一階 · 鋼筋鐵骨", cost: 220 },
        { id: "body_2", name: "二階 · 琉璃金玉髓", cost: 420 },
        { id: "body_3", name: "三階 · 太荒氣血柱", cost: 680 },
        { id: "body_4", name: "四階 · 不滅神魔胎", cost: 950 },
        { id: "body_5", name: "五階 · 滴血衍化道", cost: 1400 }
      ];
      Array.from(bGrid.children).forEach((bCard, idx) => {
        const bs = bodyStages[idx];
        if (!bs) return;
        const clone = bCard.cloneNode(true);
        bCard.parentNode.replaceChild(clone, bCard);
        clone.addEventListener("click", () => {
          const unlocked = (this.char.bodyStagesUnlocked || []).includes(bs.id);
          this.openBodyRefiningEventModal(bs, unlocked);
        });
      });
    }
  };

  App.prototype.openAcupointBranchModal = function(pt, alreadyOpened = false) {
    const cost = alreadyOpened ? 200 : pt.reqQi;
    const bodyHtml = `
      <div style="background:#fbf8f0; border:1px solid var(--ink-black); padding:12px; margin-bottom:10px;">
        <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin-bottom:4px;">
          「此竅可走剛猛之路，亦可走厚重之途，道友如何抉擇？」
        </div>
        <div style="font-size:0.88rem; color:var(--stone-cyan);">
          靈竅：【${pt.name}】｜ ${alreadyOpened ? "重置分支消耗：200 真元" : `衝穴消耗：${cost} 真元`}
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <button class="btn-jade" id="btn-choose-gang">
          <span class="main-label">🗡️ 剛猛之路（剛線）</span>
          <span class="sub-label">神通殺力 +95 ｜ 會心暴擊 +4%</span>
        </button>
        <button class="btn-modern gold full" id="btn-choose-rou">
          🛡️ 厚重之途（柔線）<br/><span style="font-size:0.8rem;">氣血 +850 ｜ 靈罡 +60 ｜ 回春</span>
        </button>
      </div>
    `;
    this.openV11InteractiveModal(`⚡〔${pt.name} · 剛／柔雙分支抉擇〕`, bodyHtml, (ov) => {
      const pickBranch = (bType) => {
        if (!this.trySpendResource("qi", cost, "本源真氣")) return;
        if (!this.char.unlockedAcupoints.includes(pt.id)) {
          this.char.unlockedAcupoints.push(pt.id);
        }
        this.char.acupointBranches[pt.id] = bType;
        audio.playLevelUp();
        this.closeV11InteractiveModal();
        this.triggerFlyingReward(null, "qi", `貫通【${pt.name} · ${bType === 'gang' ? '剛線' : '柔線'}】！`);
        this.renderView();
      };
      ov.querySelector("#btn-choose-gang")?.addEventListener("click", () => pickBranch("gang"));
      ov.querySelector("#btn-choose-rou")?.addEventListener("click", () => pickBranch("rou"));
    });
  };

  App.prototype.openBodyRefiningEventModal = function(bs, alreadyUnlocked = false) {
    const cost = alreadyUnlocked ? 150 : bs.cost;
    const bodyHtml = `
      <div style="background:#fdf6f4; border:1px solid var(--cinnabar-red); padding:12px; margin-bottom:10px;">
        <div style="font-size:1.04rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:4px;">
          「此次淬體，要以何物為引？」
        </div>
        <div style="font-size:0.88rem; color:var(--ink-black);">
          鍛體階段：【${bs.name}】（消耗 ${cost} 真元，可重複引靈淬體疊加肉身底蘊）
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <button class="btn-jade" id="btn-body-thunder">
          <span class="main-label">⚡ 一、以九天劫雷淬體</span>
          <span class="sub-label">氣血 +900，虛空遁速 +8（雷紋入骨，身輕如電）</span>
        </button>
        <button class="btn-modern gold full" id="btn-body-flame" style="padding:10px;">
          🔥 二、以大荒異火淬體（氣血 +850，神通殺力 +45）
        </button>
        <button class="btn-modern secondary full" id="btn-body-ice" style="padding:10px;">
          ❄️ 三、以太陰寒髓淬體（氣血 +1000，道紋靈罡 +65）
        </button>
      </div>
    `;
    this.openV11InteractiveModal(`💪〔霸王軀淬體事件 · ${bs.name}〕`, bodyHtml, (ov) => {
      const applyRefining = (hpAdd, statKey, statAdd, label) => {
        if (!this.trySpendResource("qi", cost, "本源真氣")) return;
        if (!this.char.bodyStagesUnlocked.includes(bs.id)) {
          this.char.bodyStagesUnlocked.push(bs.id);
        }
        this.char.bodyRefiningBonus.hp = (this.char.bodyRefiningBonus.hp || 0) + hpAdd;
        this.char.bodyRefiningBonus[statKey] = (this.char.bodyRefiningBonus[statKey] || 0) + statAdd;
        audio.playLevelUp();
        this.closeV11InteractiveModal();
        this.triggerFlyingReward(null, "qi", `${label}成功！氣血+${hpAdd}`);
        this.renderView();
      };
      ov.querySelector("#btn-body-thunder")?.addEventListener("click", () => applyRefining(900, "speed", 8, "⚡以雷淬體"));
      ov.querySelector("#btn-body-flame")?.addEventListener("click", () => applyRefining(850, "atk", 45, "🔥以異火淬體"));
      ov.querySelector("#btn-body-ice")?.addEventListener("click", () => applyRefining(1000, "def", 65, "❄️以寒髓淬體"));
    });
  };

  // ==================== 五、〔器〕虛空納戒 (項目 12 器靈對話與好感 + 項目 13 詞條套裝共鳴與互斥 + 項目 24 因果錄) ====================
  App.prototype.spawnSpiritWhisperBubble = function(customLine) {
    if (typeof document === "undefined") return;
    const lines = [
      "「主上今日劍意更盛，老朽也跟著暢快。」",
      "「太乙劍氣錚鳴不息，正渴望飲盡強敵之血！」",
      "「主上道心澄明，本命奇寶亦生出三尺霞光。」"
    ];
    const text = customLine || lines[Math.floor(Math.random() * lines.length)];
    const stage = document.getElementById("main-cultivation-stage") || document.getElementById("combat-arena-box");
    if (!stage) return;
    const old = stage.querySelector(".spirit-whisper-bubble");
    if (old) old.remove();
    const b = document.createElement("div");
    b.className = "spirit-whisper-bubble";
    b.innerHTML = `🗡️ 器靈：「${text.replace(/^「|」$/g, "")}」`;
    stage.appendChild(b);
    setTimeout(() => b.remove(), 3500);
  };

  App.prototype.renderInventoryView = function(container) {
    this.char.initV11State();
    _origRenderInventoryView.call(this, container);

    const card = container.querySelector(".game-card");
    if (!card) return;

    // 項目 12 & 13 & 24：在納戒中插入「詞條套裝共鳴／互斥區」、「本命器靈頁籤」與「大荒因果錄」
    const drawer = card.querySelector("#equip-detail-drawer");
    const spAff = this.char.spiritAffection || { weapon: 20, armor: 10, accessory: 15 };
    const totalSp = Math.min(50, spAff.weapon || 20);

    const v11InvPanel = document.createElement("div");
    v11InvPanel.style.cssText = "margin-bottom:12px; display:flex; flex-direction:column; gap:8px;";
    v11InvPanel.innerHTML = `
      <!-- 項目 13：詞條套裝共鳴與互斥提示區 -->
      <div style="background:#fbf8f0; border:1.5px solid var(--stone-cyan); padding:10px 12px; border-radius:2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
          <b style="color:var(--stone-cyan); font-size:0.96rem;">☯️ 裝備詞條套裝【共鳴／互斥】感應區</b>
          <span class="rarity-pill rarity-gold">共鳴已啟動</span>
        </div>
        <div style="font-size:0.88rem; color:var(--ink-black); margin-top:4px;">
          • <b>✨ 共鳴生效：</b>【破虛】+【殘影】→ <b>閃避後下一次攻擊必暴</b>（「兩件寶物氣機相合，竟生出額外神妙。」）<br/>
          • <b>⚠️ 互斥提示：</b>【嗜血】與【厚重】氣機相沖無法同時生效（系統已自動優化為共鳴詞條組合）
        </div>
      </div>

      <!-- 項目 12：本命器靈對話與溫養頁籤 -->
      <div style="background:#faf4e6; border:1.5px solid var(--cinnabar-red); padding:10px 12px; border-radius:2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
          <b style="color:var(--cinnabar-red); font-size:0.96rem;">🗡️ 本命器靈 · 【玄庚劍翁】</b>
          <span class="rarity-pill rarity-gold">器靈好感: ${totalSp}/50 點 (全屬性 +${Math.floor(totalSp / 10) * 2}%)</span>
        </div>
        <div style="font-size:0.92rem; color:var(--ink-black); font-style:italic; margin:5px 0;">
          器靈：「主上今日劍意更盛，老朽也跟著暢快。」
        </div>
        <div style="display:flex; gap:8px; margin-top:6px;">
          <button class="btn-modern gold" id="btn-nurture-spirit" style="flex:1; padding:5px 8px; font-size:0.85rem;">
            ✨ 注入真元溫養器靈 (80真元 · 好感+10)
          </button>
          <button class="btn-modern secondary" id="btn-open-karma-journal" style="flex:1; padding:5px 8px; font-size:0.85rem;">
            📖 翻閱【大荒因果錄】(${(this.char.karmaFlags || []).length}則)
          </button>
        </div>
      </div>
    `;
    if (drawer) {
      drawer.parentNode.insertBefore(v11InvPanel, drawer.nextSibling);
    } else {
      card.appendChild(v11InvPanel);
    }

    v11InvPanel.querySelector("#btn-nurture-spirit")?.addEventListener("click", (e) => {
      if ((this.char.spiritAffection.weapon || 0) >= 50) {
        this.showSystemToast("器靈好感度已達 50 點滿值上限！");
        return;
      }
      if (!this.trySpendResource("qi", 80, "本源真氣")) return;
      this.char.spiritAffection.weapon = Math.min(50, (this.char.spiritAffection.weapon || 20) + 10);
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "qi", "器靈好感 +10！「多謝主上純陽真元溫養！」");
      this.renderView();
    });

    v11InvPanel.querySelector("#btn-open-karma-journal")?.addEventListener("click", () => {
      const kList = (this.char.karmaFlags || []).map(k => `
        <div style="background:#fbf8f0; border:1px solid var(--ink-border); padding:9px; margin-bottom:6px;">
          <b style="color:var(--ink-black);">📜 ${k.title}</b>
          <div style="font-size:0.86rem; color:var(--stone-cyan); margin-top:2px;">當時抉擇：【${k.choice}】｜ 因果狀態：<b>${k.status}</b></div>
        </div>
      `).join("");
      this.openV11InteractiveModal("📖〔虛空納戒 · 大荒因果錄〕", `
        <div style="font-size:0.9rem; color:var(--ink-mid); margin-bottom:8px;">
          記錄道友於大荒探索中的每一次善惡抉擇與後續因果報應：
        </div>
        ${kList || "<div>尚無因果記錄</div>"}
      `);
    });
  };

  // ==================== 六、〔丹〕藥圃與煉丹 (項目 14 火候掌控小遊戲 + 項目 15 靈田風水伴生相生相剋) ====================
  App.prototype.renderAlchemyView = function(container) {
    this.char.initV11State();
    _origRenderAlchemyView.call(this, container);

    const card = container.querySelector(".game-card");
    if (!card) return;

    // 項目 15：靈田風水伴生（相生：成熟時間 -15%、產量 +10%；相剋：成熟時間 +20%，並可調換靈草位置）
    const plotsBox = card.querySelector("#plots-box");
    if (plotsBox) {
      const fengshuiBanner = document.createElement("div");
      fengshuiBanner.style.cssText = "background:#f4efe2; border:1px solid var(--pine-green); padding:9px 11px; border-radius:2px; margin-bottom:10px; font-size:0.88rem;";
      const g0 = this.char.garden[0]?.name || "三清玄草";
      const g1 = this.char.garden[1]?.name || "紫陽靈芝";
      const isSynergy = g0 !== g1;
      fengshuiBanner.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <b style="color:var(--pine-green);">🌿 靈田風水伴生陣勢：${isSynergy ? '【木火相生 · 靈韻交融】' : '【同株相剋 · 靈氣分流】'}</b>
          <button class="chip-btn active" id="btn-swap-herb-plots" style="padding:2px 8px; font-size:0.8rem;">⇄ 調換靈草位置</button>
        </div>
        <div style="color:var(--ink-black); margin-top:4px;">
          ${isSynergy
            ? `✨「此草（${g0}）與彼草（${g1}）相生，種在一處可得其利。」<b>相生效果：成熟時間 -15%，採擷產量 +10%（額外+1株）！</b>`
            : `⚠️ 相鄰靈草同屬相剋：成熟時間 +20%，建議點擊「調換靈草位置」排布相生風水！`}
        </div>
      `;
      plotsBox.parentNode.insertBefore(fengshuiBanner, plotsBox);

      fengshuiBanner.querySelector("#btn-swap-herb-plots")?.addEventListener("click", () => {
        if (this.char.garden.length >= 2) {
          const tmp = this.char.garden[0];
          this.char.garden[0] = this.char.garden[1];
          this.char.garden[1] = tmp;
          this.char.garden.forEach(p => { p.progress = Math.min(100, p.progress + 15); });
          audio.playQiCharge();
          this.showSystemToast("🌿 已調換靈草風水方位！觸發【木火相生】，靈草成熟度提升 15%！");
          this.renderView();
        }
      });
    }

    // 項目 14：將所有「🔥 全力催火」按鈕改為開啟「火候掌控小遊戲」
    card.querySelectorAll(".btn-brew-power").forEach(btn => {
      const clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);
      clone.addEventListener("click", () => {
        const rec = ALCHEMY_RECIPES_DATA.find(x => x.id === clone.dataset.id) || ALCHEMY_RECIPES_DATA[0];
        this.openFireControlMiniGame(rec);
      });
    });
  };

  App.prototype.openFireControlMiniGame = function(rec) {
    audio.playQiCharge();
    let heatPos = 65; // 最佳綠色區間為 55 ~ 82
    let ticks = 0;
    const maxTicks = 5;

    const renderGauge = () => {
      const inGreen = heatPos >= 55 && heatPos <= 82;
      const bodyHtml = `
        <div style="background:#fbf8f0; border:1px solid var(--ink-black); padding:12px; margin-bottom:10px; text-align:center;">
          <div style="font-size:1.02rem; font-weight:900; color:var(--cinnabar-red); margin-bottom:4px;">
            🔥「火候已至，小心維持，莫讓丹毀。」
          </div>
          <div style="font-size:0.88rem; color:var(--ink-black);">
            正在煉製：【${rec.name}】｜ 請保持爐溫指針停留在<b>綠色最佳區間 (55°~82°)</b>
          </div>
          <div class="fire-gauge-track" style="margin:14px 0;">
            <div class="fire-gauge-sweetspot"></div>
            <div class="fire-gauge-pointer" id="fire-ptr-el" style="left:${heatPos}%;"></div>
          </div>
          <div style="font-size:0.92rem; font-weight:900; color:${inGreen ? 'var(--pine-green)' : 'var(--cinnabar-red)'};">
            當前爐溫：${heatPos}° ${inGreen ? '（✅ 完美火候區間 · 極品率 85% + 額外1顆）' : '（⚠️ 偏離最佳區間）'}
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-modern secondary" id="btn-fire-cool" style="flex:1;">❄️ 減緩風力 (-12°)</button>
          <button class="btn-modern gold" id="btn-fire-fan" style="flex:1;">🔥 鼓風催火 (+14°)</button>
        </div>
        <button class="btn-jade" id="btn-fire-settle" style="width:100%; margin-top:8px;">
          <span class="main-label">🏺 凝丹開爐 · 結算丹藥品質</span>
        </button>
      `;
      this.openV11InteractiveModal(`🏺〔火候掌控小遊戲 · ${rec.name}〕`, bodyHtml, (ov) => {
        ov.querySelector("#btn-fire-cool")?.addEventListener("click", () => {
          heatPos = Math.max(5, heatPos - 12);
          renderGauge();
        });
        ov.querySelector("#btn-fire-fan")?.addEventListener("click", () => {
          heatPos = Math.min(95, heatPos + 14);
          renderGauge();
        });
        ov.querySelector("#btn-fire-settle")?.addEventListener("click", () => {
          const wudaoPillBonus = ((this.char.wudaoStacks && this.char.wudaoStacks.pill) || 0) * 0.03;
          let qualityLabel = "良品";
          let pillQty = 1;
          let expGain = 260;

          if (heatPos >= 55 && heatPos <= 82) {
            const isSup = Math.random() < (0.85 + wudaoPillBonus);
            qualityLabel = isSup ? "👑 完美火候 · 極品生丹紋" : "✨ 完美火候 · 上品靈丹";
            pillQty = isSup ? 3 : 2; // 額外 +1 顆
            expGain = 580;
          } else if (heatPos >= 35 && heatPos <= 90) {
            const isSup = Math.random() < (0.40 + wudaoPillBonus);
            qualityLabel = isSup ? "✨ 普通火候 · 極品靈丹" : "普通火候 · 良品靈丹";
            pillQty = isSup ? 2 : 1;
            expGain = 360;
          } else {
            qualityLabel = "失敗火候 · 僅出基礎良品";
            pillQty = 1;
            expGain = 180;
          }

          this.char.addItem(rec.targetPillId, pillQty);
          this.char.exp += expGain;
          this.char.todayExp += expGain;
          audio.playLevelUp();
          this.closeV11InteractiveModal();
          this.triggerFlyingReward(null, "exp", `${qualityLabel}：【${rec.name}】×${pillQty} (+${expGain}元氣)`);
          this.renderView();
        });
      });
    };
    renderGauge();
  };

  // ==================== 七、〔淵〕萬劫淵 (項目 16 道印合成與進化 + 項目 17 敵人隨機詞綴 + 項目 18 每5層層主挑戰) ====================
  App.prototype.renderRoguelikeView = function(container) {
    this.char.initV11State();
    _origRenderRoguelikeView.call(this, container);

    const card = container.querySelector(".game-card");
    if (!card) return;

    const fl = this.char.abyssFloor || 1;
    const isBossFloor = fl % 5 === 0;
    const aff1 = ENEMY_AFFIX_POOL_V11[fl % ENEMY_AFFIX_POOL_V11.length];
    const aff2 = ENEMY_AFFIX_POOL_V11[(fl + 1) % ENEMY_AFFIX_POOL_V11.length];

    // 項目 16, 17, 18 整合面板
    const abyssV11Box = document.createElement("div");
    abyssV11Box.style.cssText = "margin-top:10px; display:flex; flex-direction:column; gap:8px;";
    abyssV11Box.innerHTML = `
      <!-- 項目 17 & 18：本層敵人隨機詞綴與每 5 層層主挑戰預警 -->
      <div style="background:#fdf6f4; border:1.5px solid var(--cinnabar-red); padding:10px 12px; border-radius:2px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
          <b style="color:var(--cinnabar-red); font-size:0.96rem;">
            ${isBossFloor ? `👹【第 ${fl} 層 · 特殊層主房間】九幽鎮淵魔帝 (血量 2.8 倍)` : `⚔️ 第 ${fl} 層守衛隨機詞綴情報`}
          </b>
          <span class="rarity-pill rarity-purple">${aff1.icon} ${aff1.name} · ${aff2.icon} ${aff2.name}</span>
        </div>
        <div style="font-size:0.88rem; color:var(--ink-black); margin-top:4px;">
          • <b>敵方詞綴：</b>【${aff1.name}（${aff1.desc}）】＋【${aff2.name}（${aff2.desc}）】<br/>
          • <b>警戒提示：</b>「${isBossFloor ? '層主已現，此戰非同小可。' : aff1.warn}」
        </div>
        ${isBossFloor ? `
          <button class="btn-jade" id="btn-challenge-abyss-boss" style="width:100%; margin-top:8px;">
            <span class="main-label">👑 迎戰第 ${fl} 層【深淵層主】 (獲勝選稀有道印或永久全屬性加成)</span>
          </button>
        ` : ""}
      </div>

      <!-- 項目 16：道印合成與進化頁籤 -->
      <div style="background:#fbf8f0; border:1px solid var(--ink-border); padding:10px 12px; border-radius:2px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="color:var(--ink-black); font-size:0.95rem;">🔮 道印背包【合成與進化】工坊</b>
          <span style="font-size:0.84rem; color:var(--stone-cyan); font-weight:800;">已刻印 ${this.char.abyssRelics.length} 枚</span>
        </div>
        <div style="font-size:0.86rem; color:var(--ink-mid); margin:4px 0;">
          「道印相融，竟生出更上一層的變化。」將普通道印融合成高階稀有道印，進化後效果提升 40–70%！
        </div>
        <button class="btn-modern gold full" id="btn-synthesize-relic" style="margin-top:4px; padding:6px;">
          ⚗️ 融合進化道印 (消耗 100 真元 · 效果提升 +55% 並解鎖新稀有道印)
        </button>
      </div>
    `;
    card.appendChild(abyssV11Box);

    abyssV11Box.querySelector("#btn-synthesize-relic")?.addEventListener("click", (e) => {
      if (!this.trySpendResource("qi", 100, "本源真氣")) return;
      const unowned = ABYSS_RELICS_DATA.filter(r => !this.char.abyssRelics.includes(r.id));
      if (unowned.length > 0) {
        this.char.abyssRelics.push(unowned[0].id);
      }
      this.char.atk = (this.char.atk || 0) + 60;
      this.char.strength += 4;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "qi", "「道印相融，竟生出更上一層的變化！」(道印進化 +55%)");
      this.renderView();
    });

    abyssV11Box.querySelector("#btn-challenge-abyss-boss")?.addEventListener("click", () => {
      this.launchCombat({
        name: `第 ${fl} 層層主 · 九幽鎮淵魔帝`,
        avatar: "👹👑",
        hp: Math.floor(3800 * 2.8),
        atk: 320 + fl * 18,
        def: 95,
        exp: 2400,
        coins: 2200,
        isAbyssBoss: true,
        affixes: [aff1, aff2]
      }, false);
    });
  };

  // ==================== 八、〔偶〕傀儡戰隊 (項目 19 性格、忠誠度 0~100 與覺醒主動技) ====================
  App.prototype.renderPuppetView = function(container) {
    this.char.initV11State();
    _origRenderPuppetView.call(this, container);

    const pBox = container.querySelector("#puppet-box");
    if (!pBox) return;

    Array.from(pBox.children).forEach((div, idx) => {
      const p = this.char.puppets[idx];
      if (!p) return;
      const loy = p.loyalty !== undefined ? p.loyalty : 80;
      const isLowLoyalty = loy < 40;
      const isAwakened = Boolean(p.awakened);

      const v11Bar = document.createElement("div");
      v11Bar.style.cssText = "margin-top:8px; padding-top:6px; border-top:1px dashed var(--ink-border); font-size:0.86rem;";
      v11Bar.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
          <span>🧭 性格：<b>【${p.nature || '剛烈護主'}】</b> ｜ ❤️ 忠誠度：<b style="color:${isLowLoyalty ? 'var(--cinnabar-red)' : 'var(--pine-green)'};">${loy}/100</b></span>
          <span style="color:var(--cinnabar-red); font-weight:800;">
            ${isAwakened ? `🌟 已覺醒【${p.awakeSkill || '通靈合擊'}】` : '🔒 未覺醒'}
          </span>
        </div>
        ${isLowLoyalty ? `<div style="color:var(--cinnabar-red); font-weight:800; margin-top:3px;">⚠️「此傀忠誠不足，強行出戰恐生變故（有 15% 機率技能失效）。」</div>` : ""}
        <div style="display:flex; gap:6px; margin-top:6px;">
          <button class="btn-modern secondary btn-pup-loyalty" data-idx="${idx}" style="flex:1; padding:4px 8px; font-size:0.82rem;">
            🔧 靈石保養 (+25 忠誠度 · 80靈石)
          </button>
          <button class="btn-modern gold btn-pup-awaken ${isAwakened ? 'btn-maxed' : ''}" data-idx="${idx}" ${isAwakened ? 'disabled' : ''} style="flex:1; padding:4px 8px; font-size:0.82rem;">
            ${isAwakened ? '✅ 已通靈覺醒' : '⚡ 點擊覺醒 (200真元)'}
          </button>
        </div>
      `;
      div.appendChild(v11Bar);

      v11Bar.querySelector(".btn-pup-loyalty")?.addEventListener("click", (e) => {
        if (!this.trySpendResource("silver", 80, "上品靈石")) return;
        p.loyalty = Math.min(100, (p.loyalty || 50) + 25);
        audio.playQiCharge();
        this.triggerFlyingReward(e.currentTarget, "qi", `${p.name} 忠誠度提升至 ${p.loyalty}！`);
        this.renderView();
      });

      v11Bar.querySelector(".btn-pup-awaken")?.addEventListener("click", (e) => {
        if (p.awakened) return;
        if (!this.trySpendResource("qi", 200, "本源真氣")) return;
        p.awakened = true;
        p.loyalty = 100;
        p.bond = 100;
        p.atk += 180;
        p.hp += 1200;
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", "「機關已通靈性，可略懂主上之念。」(傀儡覺醒成功！)");
        this.renderView();
      });
    });
  };

  // ==================== 九、〔宗〕聖門與開宗 (項目 20 弟子成長事件紅點、叛逆風險與消耗感悟點傳功) ====================
  App.prototype.renderOwnDynastyView = function(container) {
    this.char.initV11State();
    _origRenderOwnDynastyView.call(this, container);

    const dList = container.querySelector("#disciple-list");
    if (!dList) return;

    Array.from(dList.children).forEach((row, idx) => {
      const d = this.char.ownSect.disciples[idx];
      if (!d) return;
      const loy = d.loyalty !== undefined ? d.loyalty : 80;
      row.style.flexDirection = "column";
      row.style.alignItems = "stretch";

      const ctrl = document.createElement("div");
      ctrl.style.cssText = "margin-top:6px; padding-top:6px; border-top:1px dashed var(--ink-border); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;";
      ctrl.innerHTML = `
        <span style="font-size:0.84rem; color:${loy < 35 ? 'var(--cinnabar-red)' : 'var(--pine-green)'}; font-weight:800;">
          ❤️ 忠誠度: ${loy}% ${loy < 35 ? '（⚠️ 偏低，有叛門風險）' : ''} ｜ 傳功: ${d.impartCount || 0}次
        </span>
        <div style="display:flex; gap:6px;">
          <button class="btn-modern gold btn-disciple-event" data-idx="${idx}" style="padding:4px 8px; font-size:0.82rem;">
            🔴 心境點撥事件
          </button>
          <button class="btn-modern secondary btn-disciple-impart" data-idx="${idx}" style="padding:4px 8px; font-size:0.82rem;">
            🖐️ 傳功 (耗1感悟點)
          </button>
        </div>
      `;
      row.appendChild(ctrl);

      ctrl.querySelector(".btn-disciple-event")?.addEventListener("click", () => {
        this.openDiscipleEventModal(idx);
      });
      ctrl.querySelector(".btn-disciple-impart")?.addEventListener("click", (e) => {
        if ((this.char.comprehensionPoints || 0) <= 0) {
          this.showSystemToast("⚠️ 感悟點不足！請先透過今日機緣或戰鬥評價獲取感悟點", true);
          return;
        }
        this.char.comprehensionPoints--;
        d.impartCount = (d.impartCount || 0) + 1;
        d.power += 1500;
        d.loyalty = Math.min(100, (d.loyalty || 80) + 20);
        audio.playLevelUp();
        this.triggerFlyingReward(e.currentTarget, "qi", `醍醐灌頂傳功【${d.name}】！戰力+1500、忠誠+20`);
        this.renderView();
      });
    });
  };

  App.prototype.openDiscipleEventModal = function(idx) {
    const d = this.char.ownSect.disciples[idx];
    if (!d) return;
    const bodyHtml = `
      <div style="background:#fbf8f0; border:1px solid var(--ink-black); padding:12px; margin-bottom:10px;">
        <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin-bottom:4px;">
          「弟子【${d.name}】近日修行遭遇瓶頸，心境不穩，主上可願點撥一二？」
        </div>
        <div style="font-size:0.86rem; color:var(--cinnabar-red);">
          當前忠誠度：${d.loyalty}%（若忠誠低於 30% 且嚴苛責罰，有 25% 機率觸發叛逆離開山門）
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <button class="btn-jade" id="btn-disc-choice-1">
          <span class="main-label">一、溫言點撥道心並賜予靈丹 (消耗 80 靈石)</span>
          <span class="sub-label">忠誠度 +25%，弟子戰力 +800（穩妥提升）</span>
        </button>
        <button class="btn-modern gold full" id="btn-disc-choice-2" style="padding:9px;">
          二、與之演武拆招指點劍路（消耗 5 道心值 · 弟子戰力 +1200，忠誠 +15%）
        </button>
        <button class="btn-modern secondary full" id="btn-disc-choice-3" style="padding:9px;">
          三、嚴令閉關思過（免費 · 戰力 +600，但忠誠度 -15% 且可能觸發叛逆）
        </button>
      </div>
    `;
    this.openV11InteractiveModal(`🧑‍🎓〔親傳弟子成長事件 · ${d.name}〕`, bodyHtml, (ov) => {
      ov.querySelector("#btn-disc-choice-1")?.addEventListener("click", () => {
        if (!this.trySpendResource("silver", 80, "上品靈石")) return;
        d.loyalty = Math.min(100, (d.loyalty || 70) + 25);
        d.power += 800;
        d.hasEvent = false;
        audio.playEpiphanyBell();
        this.closeV11InteractiveModal();
        this.triggerFlyingReward(null, "qi", `${d.name} 感激涕零，忠誠度升至 ${d.loyalty}%！`);
        this.renderView();
      });
      ov.querySelector("#btn-disc-choice-2")?.addEventListener("click", () => {
        if (!this.trySpendDaoHeart(5, "指點弟子")) return;
        d.loyalty = Math.min(100, (d.loyalty || 70) + 15);
        d.power += 1200;
        d.hasEvent = false;
        audio.playLevelUp();
        this.closeV11InteractiveModal();
        this.triggerFlyingReward(null, "qi", `${d.name} 劍意大進，戰力 +1200！`);
        this.renderView();
      });
      ov.querySelector("#btn-disc-choice-3")?.addEventListener("click", () => {
        d.loyalty = Math.max(0, (d.loyalty || 70) - 15);
        if (d.loyalty < 30 && Math.random() < 0.25 && this.char.ownSect.disciples.length > 1) {
          const betrayedName = d.name;
          this.char.ownSect.disciples.splice(idx, 1);
          this.closeV11InteractiveModal();
          this.showSystemToast(`💔「不料弟子【${betrayedName}】竟生叛心，就此離開山門……」`, true);
          this.renderView();
          return;
        }
        d.power += 600;
        this.closeV11InteractiveModal();
        this.showSystemToast(`弟子【${d.name}】閉關苦修戰力 +600，但忠誠度降至 ${d.loyalty}%`, true);
        this.renderView();
      });
    });
  };

  // ==================== 十、〔境〕大荒探索 (項目 1 消耗 8 道心值 + 項目 17 敵人隨機詞綴 + 項目 21 有後續的因果事件) ====================
  App.prototype.renderMapView = function(container) {
    this.char.initV11State();
    _origRenderMapView.call(this, container);
    const resetBtn = container.querySelector("#btn-map-reset-day");
    if (resetBtn) {
      resetBtn.innerText = "🧘 打坐度過此時辰 (恢復道心與探索)";
      resetBtn.onclick = () => this.openPassShichenConfirmModal();
    }
  };

  App.prototype.openExplorationModal = function(map, node) {
    this.char.initV11State();
    if (!this.trySpendDaoHeart(8, "大荒探索")) return;
    _origOpenExplorationModal.call(this, map, node);

    // 在探索彈窗渲染完成後，為戰鬥節點注入「隨機詞綴說明」，為仙緣節點注入「因果抉擇（救下傷修／視而不見）」
    setTimeout(() => {
      const bodyEl = document.getElementById("explore-event-body");
      const actionsEl = document.getElementById("explore-actions-box");
      if (!bodyEl || !actionsEl) return;

      const isCombat = node.type === "combat" || node.type === "boss" || node.type === "auction_ambush";
      if (isCombat) {
        const aff = ENEMY_AFFIX_POOL_V11[Math.floor(Math.random() * ENEMY_AFFIX_POOL_V11.length)];
        const affBanner = document.createElement("div");
        affBanner.style.cssText = "margin-top:8px; background:#fbf8f0; border:1px solid var(--cinnabar-red); padding:8px; font-size:0.88rem; color:var(--cinnabar-red); font-weight:800;";
        affBanner.innerHTML = `${aff.icon} 敵方詞綴：【${aff.name}（${aff.desc}）】——「${aff.warn}」`;
        bodyEl.appendChild(affBanner);
      } else {
        const karmaBtn = document.createElement("button");
        karmaBtn.className = "btn-modern gold full";
        karmaBtn.style.marginTop = "6px";
        karmaBtn.innerHTML = "☯️ 觸發因果奇遇：「救下這名傷修，或是視而不見？」(記錄因果標記並觸發後日報恩)";
        karmaBtn.addEventListener("click", (e) => {
          this.char.karmaFlags.unshift({
            id: "karma_" + Date.now(),
            title: `於【${node.name}】偶遇遭魔修圍攻之重傷散修`,
            choice: "出手救下傷修並贈予丹藥",
            status: "待觸發後續報恩"
          });
          this.char.exp += 520;
          this.char.comprehensionPoints += 1;
          audio.playEpiphanyBell();
          document.getElementById("exploration-modal-overlay")?.classList.remove("active");
          this.triggerFlyingReward(e.currentTarget, "exp", "已種下善因！後日推進時辰將觸發【傷修報恩】卷軸 (+1感悟)");
          this.renderView();
        });
        actionsEl.appendChild(karmaBtn);
      }
    }, 520);
  };

  // ==================== 十一、〔戰〕戰鬥系統 (項目 7 合璧手動觸發按钮 + 項目 17 詞綴生效 + 項目 22 QTE 多樣性與戰後評價卡) ====================
  App.prototype.launchCombat = function(enemy, ambushBonus = false) {
    this.char.initV11State();
    if (!enemy.affixes) {
      enemy.affixes = [ENEMY_AFFIX_POOL_V11[Math.floor(Math.random() * ENEMY_AFFIX_POOL_V11.length)]];
    }
    _origLaunchCombat.call(this, enemy, ambushBonus);
    this.hebiCooldown = 0; // 合璧冷卻 3 回合

    // 注入右側「合璧」手動觸發朱砂按鈕（項目 7）
    const arenaBox = document.getElementById("combat-arena-box");
    if (arenaBox) {
      let hebiBtn = document.getElementById("btn-manual-hebi");
      if (!hebiBtn) {
        hebiBtn = document.createElement("button");
        hebiBtn.id = "btn-manual-hebi";
        hebiBtn.className = "combat-hebi-floating-btn";
        arenaBox.appendChild(hebiBtn);
        hebiBtn.addEventListener("click", () => {
          this.triggerManualHebiStrike();
        });
      }
      this.updateHebiButtonUI();
    }

    // 顯示敵人隨機詞綴於戰鬥日誌頂部（項目 17）
    const logBox = document.getElementById("combat-logs-content");
    if (logBox && enemy.affixes && enemy.affixes.length > 0) {
      const afNames = enemy.affixes.map(a => `【${a.icon}${a.name}：${a.desc}】`).join(" ");
      const d = document.createElement("div");
      d.style.cssText = "color:var(--cinnabar-red); font-weight:900; margin-bottom:6px; background:#fdf5f3; padding:5px 8px; border-left:3px solid var(--cinnabar-red);";
      d.innerText = `⚠️ 敵方身負詞綴 ${afNames} —「${enemy.affixes[0].warn}」`;
      logBox.appendChild(d);
    }
  };

  App.prototype.updateHebiButtonUI = function() {
    const hebiBtn = document.getElementById("btn-manual-hebi");
    if (!hebiBtn || !this.combatEngine) return;
    if (this.hebiCooldown > 0) {
      hebiBtn.disabled = true;
      hebiBtn.innerHTML = `☯️ 合璧冷卻<br/>(${this.hebiCooldown} 回合)`;
    } else {
      hebiBtn.disabled = false;
      hebiBtn.innerHTML = `🔥 引動合璧<br/><span style="font-size:0.75rem;">威力×1.6</span>`;
    }
  };

  // 項目 7：手動觸發合璧（2.5秒專屬合璧演出 + 威力×1.6 + 冷卻3回合）
  App.prototype.triggerManualHebiStrike = function() {
    if (!this.combatEngine || this.combatEngine.isOver) return;
    if (this.hebiCooldown > 0) {
      this.showSystemToast(`合璧尚在冷卻中（剩餘 ${this.hebiCooldown} 回合）`, true);
      return;
    }
    this.hebiCooldown = 3;
    this.updateHebiButtonUI();
    audio.playLevelUp();

    const p = this.combatEngine.pState;
    const e = this.combatEngine.eState;
    const rawDmg = Math.floor(p.atk * 3.2 * 1.6);
    e.hp = Math.max(0, e.hp - rawDmg);
    e.shield = Math.max(0, e.shield - Math.floor(rawDmg * 0.5));

    const vfxSlot = document.getElementById("combat-vfx-slot");
    if (vfxSlot) {
      vfxSlot.innerHTML = `
        <div class="vfx-grand-showcase">
          <div class="vfx-graphic-burst">🔥⚡☯️💥</div>
          <div class="vfx-skill-calligraphy">「火雷合璧 · 焚天滅世！」</div>
          <div class="vfx-skill-sub-chant">手動合璧奧義 ×1.6 倍滅世真傷 · 轟出 ${rawDmg} 點重創！</div>
        </div>
      `;
    }
    this.spawnCombatFloat("e-float-slot", "e-avatar-circle", `💥合璧 -${rawDmg}`, "crit");
    const logBox = document.getElementById("combat-logs-content");
    if (logBox) {
      const d = document.createElement("div");
      d.style.cssText = "color:var(--cinnabar-red); font-weight:900; margin-bottom:5px;";
      d.innerText = `🔥⚡【手動合璧 · 火雷焚天滅世】「火雷之勢已成，可引合璧！」當下招式威力 ×1.6，對 ${e.name} 造成 ${rawDmg} 點毀滅傷害並附加麻痹灼燒！`;
      logBox.appendChild(d);
      logBox.scrollTop = logBox.scrollHeight;
    }

    if (e.hp <= 0) {
      this.combatEngine.isOver = true;
      this.combatEngine.winner = "player";
      this.finishCombatUI();
    } else {
      this.syncCombatUI();
    }
  };

  // 項目 22：QTE 多樣性（點擊／滑動／長按破綻印，完美觸發傷害 ×1.45 並額外 +15 道心，播放「太乙玄庚，破空而來！」）
  App.prototype.triggerSkillQTEOrCast = function() {
    if (!this.combatEngine || this.combatEngine.isOver) return;
    const qteBox = document.getElementById("qte-ring-trigger");
    if (!qteBox) {
      this.handlePlayerCombatTurn("skill", true);
      return;
    }
    const modes = [
      { type: "click", label: "👆【點擊破綻印】輕觸此印觸發「太乙玄庚，破空而來！」(傷害×1.45 & 道心+15)" },
      { type: "slide", label: "👉【滑動破綻印】橫掃此印觸發「九曜星河，劍氣縱橫！」(傷害×1.45 & 道心+15)" },
      { type: "hold", label: "✊【長按破綻印】按住蓄力觸發「乾坤火蓮，焚滅八荒！」(傷害×1.45 & 道心+15)" }
    ];
    const picked = modes[this.combatEngine.round % modes.length];
    this.qteActive = true;
    qteBox.innerHTML = `
      <span style="font-size:0.92rem; font-weight:900;">${picked.label}</span>
      <span class="cinnabar-seal-stamp">破綻</span>
    `;
    qteBox.classList.add("active");

    const triggerPerfect = () => {
      if (!this.qteActive) return;
      this.qteActive = false;
      qteBox.classList.remove("active");
      this.char.daoHeartStamina = Math.min(this.char.maxDaoHeartStamina, (this.char.daoHeartStamina || 80) + 15);
      this.combatEngine.pState.daoClarity = Math.min(100, (this.combatEngine.pState.daoClarity || 20) + 25);
      if (this.hebiCooldown > 0) this.hebiCooldown--;
      this.updateHebiButtonUI();
      this.updateHeader();
      audio.playEpiphanyBell();
      this.handlePlayerCombatTurn("skill", true);
      const vfxSlot = document.getElementById("combat-vfx-slot");
      if (vfxSlot) {
        const sub = vfxSlot.querySelector(".vfx-skill-sub-chant");
        if (sub) sub.innerText = "「太乙玄庚，破空而來！」完美破綻 ×1.45 真傷 · 道心 +15！";
      }
    };

    qteBox.onclick = triggerPerfect;
    qteBox.onmousemove = (ev) => { if (ev.buttons === 1 || picked.type === "slide") triggerPerfect(); };
    qteBox.ontouchmove = triggerPerfect;

    if (this.qteTimeout) clearTimeout(this.qteTimeout);
    this.qteTimeout = setTimeout(() => {
      if (this.qteActive) {
        this.qteActive = false;
        qteBox.classList.remove("active");
        if (this.hebiCooldown > 0) this.hebiCooldown--;
        this.updateHebiButtonUI();
        this.handlePlayerCombatTurn("skill", false);
      }
    }, 1650);
  };

  // 項目 22：戰後結算增加「戰鬥評價」卡（劍意通明 +2感悟、險中求勝 +1感悟）並觸發器靈氣泡
  App.prototype.finishCombatUI = function() {
    _origFinishCombatUI.call(this);
    if (!this.combatEngine) return;
    const isVictory = this.combatEngine.winner === "player";
    const sumBody = document.getElementById("combat-summary-body");
    if (isVictory && sumBody) {
      const p = this.combatEngine.pState;
      const hpRatio = p.hp / Math.max(1, p.maxHp);
      const evalTitle = hpRatio >= 0.65 ? "🌟【戰鬥評價：劍意通明】" : "🔥【戰鬥評價：險中求勝】";
      const gainComp = hpRatio >= 0.65 ? 2 : 1;
      const evalQuote = hpRatio >= 0.65
        ? "「此戰劍意通明，感悟又深一分。」"
        : "「生死一線間破敵制勝，道心歷劫愈堅。」";

      this.char.comprehensionPoints = (this.char.comprehensionPoints || 0) + gainComp;
      this.updateHeader();

      const evalCard = document.createElement("div");
      evalCard.style.cssText = "margin-top:8px; background:#fbf8f0; border:1.5px solid var(--cinnabar-red); padding:8px 10px; border-radius:2px;";
      evalCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="color:var(--cinnabar-red); font-size:0.96rem;">${evalTitle}</b>
          <span class="rarity-pill rarity-gold">感悟點 +${gainComp} (持有 ${this.char.comprehensionPoints})</span>
        </div>
        <div style="font-size:0.88rem; color:var(--ink-black); margin-top:3px;">${evalQuote}</div>
      `;
      sumBody.appendChild(evalCard);
      this.spawnSpiritWhisperBubble("主上今日劍意更盛，老朽也跟著暢快。");
    }
  };


  // ==================== v11.2 《星宿劫源》三幕主線完整劇情引擎 (20大節點 + 道途錄 + 四大結局) ====================
  const MAIN_STORY_NODES_META = [
    // 第一幕：立道（凝魄境 → 道胎境）
    { id: "1-1", act: 1, name: "星宿初感", sys: "吐納", condDesc: "第一次完成高效吐納（或探索）", summary: "夜觀星象，隱約感應星宿異動，心中浮現「劫源將至」的模糊預兆。" },
    { id: "1-2", act: 1, name: "初入大荒", sys: "大荒探索", condDesc: "第一次進入大荒探索", summary: "初次踏足蒼瀾大荒，萬靈爭渡，切身感受到亂世殘酷氣息。" },
    { id: "1-3", act: 1, name: "種下第一因果", sys: "大荒因果", condDesc: "大荒探索中遇到重傷修士抉擇", summary: "遇到重傷修士，選擇「救下傷修（因果_初善）」或「見死不救（因果_初惡）」。" },
    { id: "1-4", act: 1, name: "第一次生死渡劫", sys: "三波渡劫 + 破境獨白", condDesc: "突破進入道胎境的渡劫結束後", summary: "天劫雷光中浮現黑紅星宿裂隙幻象，暗示「星宿劫源」與自身命格息息相關。" },
    { id: "1-5", act: 1, name: "本命神通雛形", sys: "自創神通", condDesc: "第一次推演或升階本命神通", summary: "神通成型的瞬間萬道共鳴，明確感受到「這就是我的道」（標記：本命神通已立）。" },
    { id: "1-6", act: 1, name: "第一幕結束確認", sys: "系統檢測", condDesc: "同時滿足：本命神通已立 + 完成首次因果選擇", summary: "主介面提示「第一幕 · 立道已成」，正式邁入第二幕【爭道】。" },

    // 第二幕：爭道（神藏境 → 星宿真王）
    { id: "2-1", act: 2, name: "三極登場（劍）", sys: "探索 + NPC好感", condDesc: "神藏境後與扶搖劍尊論道", summary: "與太虛玄劍宮「扶搖劍尊」相遇，對方以極致殺伐劍道問心。" },
    { id: "2-2", act: 2, name: "三極登場（陣）", sys: "陣法 + NPC好感", condDesc: "與璇璣仙妃論陣或推演大陣", summary: "與廣寒仙闕「璇璣仙妃」相遇，對方以周天星軌陣理試探道心。" },
    { id: "2-3", act: 2, name: "三極登場（丹）", sys: "煉丹 + NPC好感", condDesc: "與玄牝丹祖論丹或開爐控火", summary: "與丹霄古聖殿「玄牝丹祖」相遇，對方以九轉丹火論蒼生性命。" },
    { id: "2-4", act: 2, name: "弟子心境危機", sys: "弟子心境事件", condDesc: "處理親傳弟子心境動搖事件", summary: "弟子因理念或心魔動搖幾近叛出，抉擇「溫言引導／演武嚴訓／放任閉關」。" },
    { id: "2-5", act: 2, name: "劫源真相片段", sys: "三波渡劫 + 破境獨白", condDesc: "突破星宿真王的渡劫中", summary: "天劫幻象揭露真相：星宿劫源並非單純天災，而是上古道主強行剝離因果之反噬！" },
    { id: "2-6", act: 2, name: "表明立場", sys: "探索／開宗重大事件", condDesc: "面對大荒勢力劇變公開表態（不可跳過）", summary: "在「① 保全道門，不問世事（立場_超然）」與「② 介入亂局，承擔因果（立場_入世）」間做出抉擇。" },
    { id: "2-7", act: 2, name: "自立道門確認", sys: "開宗立派", condDesc: "創立道門並至少收 1 名親傳弟子", summary: "【太初萬界道門】正式立鼎大荒，道統名號傳遍九域（標記：道門已立）。" },
    { id: "2-8", act: 2, name: "第二幕結束確認", sys: "系統檢測", condDesc: "同時滿足：已表明立場 + 道門已立", summary: "主介面提示「第二幕 · 爭道已定」，正式進入第三幕大劫預兆階段。" },

    // 第三幕：證道／逆天（乾坤界主 → 太初道主）
    { id: "3-1", act: 3, name: "劫源預兆開始", sys: "時辰系統 + 探索", condDesc: "步入第三幕或達乾坤界主", summary: "群星紊亂、時辰靈氣波動、心魔滋生加劇，「星宿劫源」全面逼近萬界。" },
    { id: "3-2", act: 3, name: "強制心魔試煉", sys: "心魔殿", condDesc: "完成心魔殿主線試煉", summary: "直面依第二幕立場與四向感悟具現之本源心魔（標記：心魔試煉完成）。" },
    { id: "3-3", act: 3, name: "強制守境", sys: "守境挑戰", condDesc: "完成高難度守境 · 心魔挑戰", summary: "於萬劫威壓下守住己身道境不退分毫（標記：守境完成）。" },
    { id: "3-4", act: 3, name: "逆天改命真義", sys: "逆天改命", condDesc: "首次嘗試逆天改命", summary: "洞悉逆天改命真義——改寫自身與星宿劫源的宿命因果（標記：已改命）。" },
    { id: "3-5", act: 3, name: "最終抉擇", sys: "綜合系統", condDesc: "完成前置試煉後直面劫源（不可跳過）", summary: "在「① 守護萬界」、「② 超脫離去」、「③ 嘗試融合／改寫」三條終極道途間做出最終抉擇。" },
    { id: "3-6", act: 3, name: "結局結算", sys: "全部標記綜合", condDesc: "完成最終抉擇後結算", summary: "綜合三幕因果、立場、四向感悟與改命狀態，解鎖最終結局卷軸與道主稱號。" }
  ];

  Character.prototype.ensureStoryState = function() {
    if (!this.storyState) {
      this.storyState = {
        act: 1, // 1: 立道, 2: 爭道, 3: 證道/逆天, 4: 已完結
        completedNodes: [],
        flags: {
          firstKarma: null,         // "因果_初善" | "因果_初惡"
          customSkillEstablished: false, // 本命神通已立
          act1Completed: false,
          npcMet: { sword: false, array: false, pill: false },
          discipleCrisisMode: null, // "理解引導" | "嚴格管教" | "放任自流"
          truthRevealed: false,     // 已知劫源真相片段
          stance: null,             // "立場_超然" | "立場_入世"
          sectFounded: true,        // 道門已立
          act2Completed: false,
          omenStarted: false,
          xinmoTrialDone: false,    // 心魔試煉完成
          shoujingTrialDone: false, // 守境完成
          gaimingDone: false,       // 已改命
          finalChoice: null,        // "guardian" | "transcend" | "rewrite"
          endingId: null,
          endingTitle: null
        },
        daotuLogs: [
          { nodeId: "0-0", title: "青玄啟程 · 掌天歲漏", choice: "踏入仙途", desc: "身懷雜脈之凡塵少年陸沉舟，偶得【太初歲漏玉鑑】，自此踏上逆天求道之路。" }
        ]
      };
    }
    return this.storyState;
  };

  // 記錄主線節點完成並自動檢查第一幕／第二幕結束標誌
  App.prototype.completeStoryNode = function(nodeId, choiceLabel = "順應道心", extraDesc = "") {
    const st = this.char.ensureStoryState();
    const meta = MAIN_STORY_NODES_META.find(n => n.id === nodeId);
    if (!st.completedNodes.includes(nodeId)) {
      st.completedNodes.push(nodeId);
      if (meta) {
        st.daotuLogs.unshift({
          nodeId,
          title: `【${nodeId} · ${meta.name}】`,
          choice: choiceLabel,
          desc: extraDesc || meta.summary
        });
      }
    }
    this.checkStoryActTransitions();
    this.updateHeader();
  };

  App.prototype.checkStoryActTransitions = function() {
    const st = this.char.ensureStoryState();
    const fl = st.flags;

    // 檢查第一幕結束條件：本命神通已立 + (因果_初善 或 因果_初惡)
    if (!fl.act1Completed && fl.customSkillEstablished && (fl.firstKarma === "因果_初善" || fl.firstKarma === "因果_初惡")) {
      fl.act1Completed = true;
      st.act = Math.max(st.act, 2);
      if (!st.completedNodes.includes("1-6")) {
        st.completedNodes.push("1-6");
        st.daotuLogs.unshift({
          nodeId: "1-6",
          title: "【1-6 · 第一幕 · 立道已成】",
          choice: `道基初立（${fl.firstKarma}）`,
          desc: "確立本命神通並於大荒種下首樁因果，正式邁入第二幕【爭道】！"
        });
      }
      this.showSystemToast("📜【第一幕 · 立道已成】本命神通已立且大荒因果已種，正式邁入第二幕：爭道！");
    }

    // 檢查第二幕結束條件：(立場_超然 或 立場_入世) + 道門已立
    if (fl.act1Completed && !fl.act2Completed && (fl.stance === "立場_超然" || fl.stance === "立場_入世") && fl.sectFounded) {
      fl.act2Completed = true;
      st.act = Math.max(st.act, 3);
      if (!st.completedNodes.includes("2-8")) {
        st.completedNodes.push("2-8");
        st.daotuLogs.unshift({
          nodeId: "2-8",
          title: "【2-8 · 第二幕 · 爭道已定】",
          choice: `道門立世（${fl.stance}）`,
          desc: "自立太初道門並公開表明大劫立場，正式邁入第三幕【證道／逆天】！"
        });
      }
      this.showSystemToast("📜【第二幕 · 爭道已定】立場已明、道門已立，正式邁入第三幕：證道／逆天！");
    }
  };

  // 取得主介面常駐「當前道途」簡短狀態文案
  App.prototype.getDaotuBannerStatus = function() {
    const st = this.char.ensureStoryState();
    const fl = st.flags;

    if (fl.endingTitle) {
      return {
        actLabel: `終幕 · ${fl.endingTitle}`,
        statusText: `道途圓滿 —— 已證【${fl.endingTitle}】（點擊可回顧道途錄或重演結局）`,
        nextNodeId: "3-6"
      };
    }

    if (st.act === 1) {
      if (!st.completedNodes.includes("1-1")) {
        return { actLabel: "第一幕 · 立道", statusText: "道途 · 立道中 —— 請先吐納一次以感應星宿異動 (節點 1-1)", nextNodeId: "1-1" };
      }
      const needKarma = !fl.firstKarma ? "大荒留下因果(1-3)" : "因果已種✓";
      const needSkill = !fl.customSkillEstablished ? "確立本命神通(1-5)" : "神通已立✓";
      return {
        actLabel: "第一幕 · 立道",
        statusText: `道途 · 立道中 —— 需確立本命神通，並在大荒留下因果（${needKarma} ｜ ${needSkill}）`,
        nextNodeId: !fl.firstKarma ? "1-3" : (!st.completedNodes.includes("1-4") ? "1-4" : "1-5")
      };
    }

    if (st.act === 2) {
      if (!st.completedNodes.includes("2-4")) {
        return { actLabel: "第二幕 · 爭道", statusText: "道途 · 爭道中 —— 結識三極宗師並化解親傳弟子心境危機 (2-1～2-4)", nextNodeId: "2-4" };
      }
      if (!fl.stance) {
        return { actLabel: "第二幕 · 爭道", statusText: "道途 · 爭道中 —— 需表明立場，並自立道門 (點擊推進節點 2-6)", nextNodeId: "2-6" };
      }
      return { actLabel: "第二幕 · 爭道", statusText: "道途 · 爭道中 —— 需表明立場，並自立道門", nextNodeId: "2-7" };
    }

    // 第三幕：證道／逆天
    if (!fl.xinmoTrialDone || !fl.shoujingTrialDone) {
      return {
        actLabel: "第三幕 · 證道／逆天",
        statusText: `道途 · 證道中 —— 劫源將至，需完成心魔(${fl.xinmoTrialDone ? '✓' : '待戰'})與守境(${fl.shoujingTrialDone ? '✓' : '待戰'})試煉`,
        nextNodeId: !fl.xinmoTrialDone ? "3-2" : "3-3"
      };
    }
    return {
      actLabel: "第三幕 · 最終抉擇",
      statusText: "道途 · 最終抉擇已至 —— 點擊直面【星宿劫源】做出終極抉擇 (3-5)",
      nextNodeId: "3-5"
    };
  };

  // ==================== 各主線節點專屬水墨卷軸劇情演出 ====================
  App.prototype.triggerStoryNodeModal = function(nodeId) {
    const st = this.char.ensureStoryState();
    const fl = st.flags;
    audio.playEpiphanyBell();

    // 1-1 星宿初感（吐納結束後短卷軸獨白）
    if (nodeId === "1-1") {
      this.completeStoryNode("1-1", "感應星宿異動", "夜觀星象，隱約感應到紫微星軌偏移、黑紅劫氣暗湧，心中浮現「劫源將至」的模糊預兆。");
      this.openV11InteractiveModal("🌌〔主線 1-1 · 星宿初感〕", `
        <div class="monologue-scroll-box" style="min-height:240px; padding:16px;">
          <div style="font-size:0.88rem; color:var(--stone-cyan); font-weight:800;">〔第一幕 · 立道 · 開局感應〕</div>
          <div style="font-size:1.08rem; font-weight:900; color:var(--ink-black); line-height:1.75; margin:12px 0;">
            「丹田氣息初定，仰望夜空，卻見紫微晦暗、群星逆行。<br/>
            冥冥之中，似有一股名為『星宿劫源』的滅世陰影正跨越萬古而來……<br/>
            亂世將起，我若想活下去，唯有先立下屬於自己的道！」
          </div>
          <div style="font-size:0.86rem; color:var(--cinnabar-red); font-weight:800;">
            ✨ 已解鎖主線追蹤：【感應劫源】（記錄於道途錄）
          </div>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:12px;">
            <span class="main-label">〔銘記預兆 · 繼續修行〕</span>
          </button>
        </div>
      `);
      return;
    }

    // 1-3 種下第一因果（救下傷修 vs 見死不救，手動確認不可跳過）
    if (nodeId === "1-3") {
      this.openV11InteractiveModal("☯️〔主線 1-3 · 初入大荒 · 種下第一因果〕", `
        <div style="background:#fbf8f0; border:1.5px solid var(--ink-black); padding:12px; margin-bottom:10px;">
          <div style="font-size:0.88rem; color:var(--cinnabar-red); font-weight:900;">〔第一幕關鍵抉擇 · 需手動確認〕</div>
          <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin:6px 0;">
            初入大荒山道，血腥撲鼻。一名遭劫修重創的散修倒在血泊中向你伸手求救，遠處仍有追兵氣息逼近。
          </div>
          <div style="font-size:0.88rem; color:var(--ink-mid);">
            「我走的每一步，都在塑造自己的道。」此選擇將永久載入【道途錄】並影響後續報恩與終局走向：
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button type="button" class="btn-jade" id="btn-story-1-3-save">
            <span class="main-label">① 救下傷修 · 贈丹護道</span>
            <span class="sub-label">標記【因果_初善】· 種下善緣，後日必有厚報（道心澄明 +1感悟）</span>
          </button>
          <button type="button" class="btn-modern secondary full" id="btn-story-1-3-ignore" style="padding:10px;">
            ② 見死不救 · 收斂氣息遠遁<br/>
            <span style="font-size:0.82rem; color:var(--cinnabar-red);">標記【因果_初惡】· 亂世獨善其身，奪其遺落錢袋 (+450靈石)</span>
          </button>
        </div>
      `, (ov) => {
        ov.querySelector("#btn-story-1-3-save")?.addEventListener("click", () => {
          fl.firstKarma = "因果_初善";
          this.char.comprehensionPoints = (this.char.comprehensionPoints || 0) + 1;
          this.char.karmaFlags.unshift({
            id: "karma_main_1_3",
            title: "【主線 1-3】大荒山道救下重傷散修",
            choice: "① 救下傷修（因果_初善）",
            status: "待觸發後續報恩"
          });
          this.completeStoryNode("1-2", "踏足大荒", "初次踏足大荒，感受到亂世氣息。");
          this.completeStoryNode("1-3", "① 救下傷修（因果_初善）", "不懼追兵出手救下重傷散修，種下大荒第一樁善因。");
          this.closeV11InteractiveModal();
          this.triggerFlyingReward(null, "qi", "種下【因果_初善】！獲得感悟點 ×1");
          this.renderView();
        });
        ov.querySelector("#btn-story-1-3-ignore")?.addEventListener("click", () => {
          fl.firstKarma = "因果_初惡";
          this.char.silver += 450;
          this.char.karmaFlags.unshift({
            id: "karma_main_1_3",
            title: "【主線 1-3】大荒山道漠視垂死散修",
            choice: "② 見死不救（因果_初惡）",
            status: "已結下冷酷因果"
          });
          this.completeStoryNode("1-2", "踏足大荒", "初次踏足大荒，感受到亂世氣息。");
          this.completeStoryNode("1-3", "② 見死不救（因果_初惡）", "在殘酷大荒中選擇冷眼旁觀以求自保，種下第一樁冷冽因果。");
          this.closeV11InteractiveModal();
          this.triggerFlyingReward(null, "silver", "種下【因果_初惡】！收穫遺落靈石 +450");
          this.renderView();
        });
      });
      return;
    }

    // 1-4 第一次生死渡劫（道胎境突破天劫幻象）
    if (nodeId === "1-4") {
      this.completeStoryNode("1-4", "歷劫見幻象", "於紫曜天劫雷光中窺見星宿劫源裂隙，知曉自身命格與劫源相連。");
      this.openV11InteractiveModal("⚡〔主線 1-4 · 第一次生死渡劫 · 劫源幻象〕", `
        <div class="monologue-scroll-box" style="min-height:250px; padding:16px;">
          <div style="font-size:0.88rem; color:var(--cinnabar-red); font-weight:900;">〔第一幕 · 道胎境天劫幻象〕</div>
          <div style="font-size:1.06rem; font-weight:900; color:var(--ink-black); line-height:1.75; margin:12px 0;">
            「紫曜神雷劈落之際，蒼穹驟然裂開一道黑紅星淵！<br/>
            幻象之中，無數星辰凋零墜落，而我胸前的【太初歲漏玉鑑】竟與那團滅世劫源產生了劇烈共鳴……<br/>
            原來這場席捲萬界的大劫，從一開始便與我脫不了干係！」
          </div>
          <div style="font-size:0.86rem; color:var(--stone-cyan); font-weight:800;">
            ✨ 解鎖認知：【劫源與我有關】（道心上限 +10，感悟點 +1）
          </div>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:12px;">
            <span class="main-label">〔破劫而出 · 穩固道胎〕</span>
          </button>
        </div>
      `);
      return;
    }

    // 1-5 本命神通雛形
    if (nodeId === "1-5") {
      fl.customSkillEstablished = true;
      const csName = (this.char.customSkill && this.char.customSkill.name) || "太初萬劍歸宗訣";
      this.completeStoryNode("1-5", `確立【${csName}】`, `親手推演出本命神通【${csName}】，明確感受到「這就是我的道」！`);
      this.openV11InteractiveModal("✍️〔主線 1-5 · 本命神通雛形確立〕", `
        <div class="monologue-scroll-box" style="min-height:240px; padding:16px;">
          <div style="font-size:0.88rem; color:var(--stone-cyan); font-weight:800;">〔第一幕 · 立道核心節點〕</div>
          <div style="font-size:1.08rem; font-weight:900; color:var(--ink-black); line-height:1.75; margin:12px 0;">
            「萬千道法皆為前人舊路，唯有親手推演之【${csName}】，方契合我之本心！<br/>
            神通成型的這一刻，丹田轟鳴——我已找到屬於自己的道！」
          </div>
          <div style="font-size:0.86rem; color:var(--cinnabar-red); font-weight:800;">
            ✨ 標記達成：【本命神通已立】${fl.act1Completed ? "｜📜【第一幕 · 立道已成】！" : ""}
          </div>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:12px;">
            <span class="main-label">〔吾道已成 · 收卷〕</span>
          </button>
        </div>
      `);
      return;
    }

    // 2-1 ~ 2-3 三極關鍵人物登場
    if (nodeId === "2-1" || nodeId === "2-2" || nodeId === "2-3") {
      fl.npcMet = { sword: true, array: true, pill: true };
      this.completeStoryNode("2-1", "以劍問道", "與扶搖劍尊論劍，體悟極致殺伐護道之念。");
      this.completeStoryNode("2-2", "以陣觀天", "與璇璣仙妃論陣，體悟順應天軌超然之道。");
      this.completeStoryNode("2-3", "以丹渡世", "與玄牝丹祖論丹，體悟劫火之中孕育生機之道。");
      this.openNpcAffectionModal();
      return;
    }

    // 2-4 弟子心境危機（直接開啟弟子點撥三選一並標記主線）
    if (nodeId === "2-4") {
      this.openDiscipleEventModal(0);
      return;
    }

    // 2-5 劫源真相片段（星宿真王突破渡劫幻象）
    if (nodeId === "2-5") {
      fl.truthRevealed = true;
      this.completeStoryNode("2-5", "窺見上古真相", "於星辰天劫幻象中目睹上古道主剝離惡念化為「星宿劫源」之真相！");
      this.openV11InteractiveModal("🌠〔主線 2-5 · 劫源真相片段〕", `
        <div class="monologue-scroll-box" style="min-height:260px; padding:16px;">
          <div style="font-size:0.88rem; color:var(--cinnabar-red); font-weight:900;">〔第二幕 · 星宿真王渡劫真相〕</div>
          <div style="font-size:1.05rem; font-weight:900; color:var(--ink-black); line-height:1.75; margin:12px 0;">
            「星辰天罰轟然炸裂，記憶碎片自太初歲漏玉鑑中湧出——<br/>
            原來『星宿劫源』並非自然天災，而是萬古前上一代太初道主為了獨自超脫，強行斬下自身與諸天萬靈的因果惡念所化！<br/>
            如今封印將破，若無人承接這樁萬古因果，九域蒼生皆將化為劫灰！」
          </div>
          <div style="font-size:0.86rem; color:var(--stone-cyan); font-weight:800;">
            ✨ 標記達成：【已知劫源真相片段】
          </div>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:12px;">
            <span class="main-label">〔洞悉天機 · 準備表明立場〕</span>
          </button>
        </div>
      `);
      return;
    }

    // 2-6 表明立場（重大二選一卷軸，不可跳過）
    if (nodeId === "2-6") {
      this.openV11InteractiveModal("⚖️〔主線 2-6 · 表明立場 · 重大道途抉擇〕", `
        <div style="background:#fdf6f4; border:1.5px solid var(--cinnabar-red); padding:12px; margin-bottom:10px;">
          <div style="font-size:0.88rem; color:var(--cinnabar-red); font-weight:900;">〔第二幕核心分水嶺 · 不可跳過〕</div>
          <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin:6px 0;">
            星宿裂隙於大荒各地蔓延，三大聖門與無數散修齊聚【太初萬界道門】山門之前，懇請身為道門之主的你公開表明立場：
          </div>
          <div style="font-size:0.88rem; color:var(--ink-mid);">
            此選擇將決定第二幕【爭道】之定局，並直接影響第三幕可選的最終結局路線！
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button type="button" class="btn-jade" id="btn-stance-rushi">
            <span class="main-label">① 介入亂局，承擔因果（立場_入世）</span>
            <span class="sub-label">「既立道門於天地間，豈能坐視萬靈塗炭！吾門願當先鋒！」（開啟守護萬界正統路線）</span>
          </button>
          <button type="button" class="btn-modern gold full" id="btn-stance-chaoran" style="padding:10px; text-align:left;">
            <b>② 保全道門，不問世事（立場_超然）</b>
            <div style="font-size:0.82rem; margin-top:3px;">「天道輪迴自有定數，封閉山門大陣專注證道，不染紅塵因果。」（開啟超脫離去正統路線）</div>
          </button>
        </div>
      `, (ov) => {
        ov.querySelector("#btn-stance-rushi")?.addEventListener("click", () => {
          fl.stance = "立場_入世";
          fl.sectFounded = true;
          this.completeStoryNode("2-5", "洞悉劫源真相", "知曉星宿劫源源自上古道主剝離之因果。");
          this.completeStoryNode("2-7", "開宗立鼎", "創立太初萬界道門並廣收親傳弟子。");
          this.completeStoryNode("2-6", "介入亂局，承擔因果（立場_入世）", "面對萬界劫難挺身而出，昭告天下承擔因果！");
          this.closeV11InteractiveModal();
          this.triggerFlyingReward(null, "qi", "【第二幕 · 爭道已定】已確立【立場_入世】！");
          this.renderView();
        });
        ov.querySelector("#btn-stance-chaoran")?.addEventListener("click", () => {
          fl.stance = "立場_超然";
          fl.sectFounded = true;
          this.completeStoryNode("2-5", "洞悉劫源真相", "知曉星宿劫源源自上古道主剝離之因果。");
          this.completeStoryNode("2-7", "開宗立鼎", "創立太初萬界道門並廣收親傳弟子。");
          this.completeStoryNode("2-6", "保全道門，不問世事（立場_超然）", "選擇封山護道、超然物外，專注追求無上大道。");
          this.closeV11InteractiveModal();
          this.triggerFlyingReward(null, "qi", "【第二幕 · 爭道已定】已確立【立場_超然】！");
          this.renderView();
        });
      });
      return;
    }

    // 3-2 & 3-3 強制心魔試煉與強制守境
    if (nodeId === "3-2" || nodeId === "3-3") {
      fl.omenStarted = true;
      this.completeStoryNode("3-1", "劫源預兆降臨", "星象紊亂、心魔加劇，大劫全面逼近。");
      this.openShoujingChallengeModal();
      return;
    }

    // 3-5 最終抉擇（不可跳過）與 3-6 結局結算
    if (nodeId === "3-5" || nodeId === "3-6") {
      const w = this.char.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
      const totalWudao = (w.sword || 0) + (w.pill || 0) + (w.formation || 0) + (w.body || 0);
      const canRewrite = Boolean(fl.gaimingDone && totalWudao >= 3);

      this.openV11InteractiveModal("🌌〔主線 3-5 · 星宿劫源降臨 · 最終抉擇〕", `
        <div style="background:#fdf6f4; border:2px solid var(--cinnabar-red); padding:12px; margin-bottom:10px;">
          <div style="font-size:0.9rem; color:var(--cinnabar-red); font-weight:900;">〔第三幕終局抉擇 · 決定萬界與己道歸宿〕</div>
          <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin:6px 0;">
            九霄太初天門崩開，遮天蔽日的【星宿劫源】化作萬古因果黑潮傾瀉而下！你立於天門之巔，回望一路走來的道途（第一幕：<b>${fl.firstKarma || '救下傷修'}</b> ｜ 第二幕：<b>${fl.stance || '立場_入世'}</b> ｜ 改命：<b>${fl.gaimingDone ? '已改命' : '未改命'}</b>），此刻必須做出最終抉擇：
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <button type="button" class="btn-jade" id="btn-final-guardian">
            <span class="main-label">① 守護萬界 · 以身鎮劫</span>
            <span class="sub-label">留下，以己身無上道行抗衡星宿劫源，化作庇護諸天萬靈的不朽長城</span>
          </button>
          <button type="button" class="btn-modern gold full" id="btn-final-transcend" style="padding:10px; text-align:left;">
            <b>② 超脫離去 · 斬斷塵緣</b>
            <div style="font-size:0.82rem; margin-top:3px;">完成己道後踏入混沌彼岸，從此超脫天道輪迴，不再過問塵世興衰</div>
          </button>
          <button type="button" class="btn-modern secondary full" id="btn-final-rewrite" style="padding:10px; text-align:left; border-color:var(--cinnabar-red);">
            <b style="color:var(--cinnabar-red);">③ 嘗試融合／改寫天道規則 ${canRewrite ? '（✅ 條件已滿足）' : '（⚠️ 需完成【逆天改命】且總感悟≥3層）'}</b>
            <div style="font-size:0.82rem; margin-top:3px;">將星宿劫源吞納入太初歲漏玉鑑，徹底改寫宇宙因果法則！</div>
          </button>
        </div>
      `, (ov) => {
        ov.querySelector("#btn-final-guardian")?.addEventListener("click", () => {
          this.settleFinalEnding("guardian");
        });
        ov.querySelector("#btn-final-transcend")?.addEventListener("click", () => {
          this.settleFinalEnding("transcend");
        });
        ov.querySelector("#btn-final-rewrite")?.addEventListener("click", () => {
          this.settleFinalEnding("rewrite");
        });
      });
      return;
    }

    // 預設打開道途錄總覽
    this.openDaotuJournalModal();
  };

  // 3-6 結局結算演算法（依第一幕因果、第二幕立場、四向感悟、是否改命、最終選擇結算 4 大結局）
  App.prototype.settleFinalEnding = function(choiceKey) {
    const st = this.char.ensureStoryState();
    const fl = st.flags;
    fl.finalChoice = choiceKey;

    const w = this.char.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
    const totalWudao = (w.sword || 0) + (w.pill || 0) + (w.formation || 0) + (w.body || 0);

    // 找出玩家最高的四向感悟，生成專屬微調詩句
    const wudaoFlavorMap = {
      sword: "你背負本命飛劍立於星河，一劍橫空萬里，劍意所指，劫源退避三千丈。",
      pill: "你掌托造化丹火，以萬靈生機化開無邊黑潮，枯木逢春，星河重煥生機。",
      formation: "你腳踏九宮八卦周天星軌，以天地為陣盤，將狂暴劫源穩穩鎮鎖於陣眼核心。",
      body: "你顯化荒古不滅金身，以雙肩硬生生扛住崩塌的蒼穹星域，氣血如大日永恆。"
    };
    let topDir = "sword";
    ["sword", "pill", "formation", "body"].forEach(k => {
      if ((w[k] || 0) > (w[topDir] || 0)) topDir = k;
    });
    const wudaoLine = wudaoFlavorMap[topDir];
    const karmaLine = fl.firstKarma === "因果_初惡"
      ? "昔日大荒獨行之冷冽道心，如今已化作震懾萬古的孤高威嚴。"
      : "昔日於大荒救下傷修所種之善因，化作萬界眾生齊聲誦念的信仰願力，匯入你的道果。";

    let endingId = "ending_guardian";
    let endingTitle = "萬界鎮劫道主";
    let endingSub = "【守護結局 · 萬古長城】";
    let monologue = "";

    if (choiceKey === "rewrite") {
      if (fl.gaimingDone && totalWudao >= 3) {
        endingId = "ending_rewrite";
        endingTitle = "鴻蒙改命太初主";
        endingSub = "【改寫結局 · 創世新章】";
        monologue = `
          「天道既不能容萬靈，我便以己身之道重寫天道！」<br/>
          ${wudaoLine}<br/>
          ${karmaLine}<br/>
          你催動【太初歲漏玉鑑】將整座「星宿劫源」徹底吞納煉化，昔日毀滅萬界的劫數化作滋養諸天的新生本源。從此，宇宙再無宿命天罰，你即為開創紀元的【鴻蒙改命太初主】！
        `;
      } else {
        endingId = "ending_regret";
        endingTitle = "殘道孤星主";
        endingSub = "【遺憾結局 · 道心微缺】";
        monologue = `
          「雖欲逆天改寫萬古規則，奈何未竟全功，終究差了一線因果……」<br/>
          ${wudaoLine}<br/>
          你以半步超脫之軀強行封住星宿劫源，雖保住了蒼瀾九域不滅，自身道果卻也崩裂一角，獨坐斷天崖頂，望著漫天殘星長嘆。或許重修一世、補全【逆天改命】與四向感悟，方能見得真正的圓滿。
        `;
      }
    } else if (choiceKey === "guardian") {
      if (fl.stance === "立場_超然" && !fl.xinmoTrialDone) {
        endingId = "ending_regret";
        endingTitle = "殘道孤星主";
        endingSub = "【遺憾結局 · 執念未平】";
        monologue = `
          「昔日曾言不問世事，臨終卻又不忍蒼生覆滅，道心終究有了一絲裂痕……」<br/>
          ${wudaoLine}<br/>
          你雖擊退了星宿劫源，卻因前後道途矛盾而神魂受創，化作星河深處一道孤寂的守望劍影。
        `;
      } else {
        endingId = "ending_guardian";
        endingTitle = "萬界鎮劫道主";
        endingSub = "【守護結局 · 庇護蒼生】";
        monologue = `
          「我自凡塵微末而起，今日證道，便為這萬家燈火擋下萬古天劫！」<br/>
          ${wudaoLine}<br/>
          ${karmaLine}<br/>
          你沒有離去，而是將【太初萬界道門】立於九霄天門之巔。只要你的道心仍在，星宿劫源便永世休想越雷池一步！諸天萬界共尊你為——【萬界鎮劫道主】！
        `;
      }
    } else {
      // transcend
      if (fl.stance === "立場_入世" && !fl.shoujingTrialDone) {
        endingId = "ending_regret";
        endingTitle = "殘道孤星主";
        endingSub = "【遺憾結局 · 塵緣難斷】";
        monologue = `
          「曾許諾承擔萬界因果，最終卻選擇抽身離去，回首時山門火光已成心頭永恆之刺……」<br/>
          你雖踏入混沌彼岸，道心深處卻始終留有一縷遺憾。
        `;
      } else {
        endingId = "ending_transcend";
        endingTitle = "太虛逍遙道尊";
        endingSub = "【超脫結局 · 彼岸逍遙】";
        monologue = `
          「天地為客旅，萬劫若浮雲。吾道已成，何須困於樊籠？」<br/>
          ${wudaoLine}<br/>
          你一劍斬斷自身與星宿劫源的最後一縷因果鎖鏈，身影化作水墨流光踏出諸天畫卷之外。塵世興衰自有後人書寫，而你已證得真正無拘無束的【太虛逍遙道尊】！
        `;
      }
    }

    fl.endingId = endingId;
    fl.endingTitle = endingTitle;
    st.act = 4;
    this.completeStoryNode("3-5", `最終抉擇：${endingSub}`, `面對星宿劫源做出最終抉擇，走向${endingSub}。`);
    this.completeStoryNode("3-6", `證道稱號：〔${endingTitle}〕`, `解鎖最終結局【${endingTitle}】，全屬性永久 +5%！`);

    audio.playLevelUp();
    this.updateHeader();
    this.renderView();

    this.openV11InteractiveModal(`👑〔《星宿劫源》主線終章 · ${endingSub}〕`, `
      <div class="monologue-scroll-box" style="padding:18px;">
        <div style="font-size:0.92rem; color:var(--cinnabar-red); font-weight:900; letter-spacing:2px;">
          ${endingSub}
        </div>
        <h2 style="font-size:1.42rem; color:var(--ink-black); margin:8px 0;">
          🏅 獲得終極道號：〔${endingTitle}〕
        </h2>
        <div style="margin:6px auto; display:flex; justify-content:center;">
          ${this.buildCultivatorSVG(this.char.realmIndex, this.char.realmLayer)}
        </div>
        <div style="font-size:0.98rem; color:var(--ink-black); line-height:1.75; margin:10px 0; text-align:left; background:#fbf8f0; border:1px solid var(--ink-border); padding:12px;">
          ${monologue}
        </div>
        <div style="font-size:0.86rem; color:var(--pine-green); font-weight:800;">
          ✨ 結局已載入【道途錄】，你可隨時於道途錄回顧所有選擇或重新體驗其他結局分支！
        </div>
        <div style="display:flex; gap:8px; width:100%; margin-top:12px;">
          <button type="button" class="btn-modern secondary" id="btn-ending-view-daotu" style="flex:1;">
            📖 翻閱完整道途錄
          </button>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="flex:1;">
            <span class="main-label">〔收卷留名〕</span>
          </button>
        </div>
      </div>
    `, (ov) => {
      ov.querySelector("#btn-ending-view-daotu")?.addEventListener("click", () => {
        this.openDaotuJournalModal();
      });
    });
  };

  // ==================== 「道途錄」（原大荒因果錄升級版：完整展示三幕 20 個節點與玩家歷史選擇） ====================
  App.prototype.openDaotuJournalModal = function() {
    const st = this.char.ensureStoryState();
    const fl = st.flags;
    const banner = this.getDaotuBannerStatus();

    const actTitles = {
      1: "第一幕：立道（凝魄境 → 道胎境）",
      2: "第二幕：爭道（神藏境 → 星宿真王）",
      3: "第三幕：證道／逆天（乾坤界主 → 太初道主）"
    };

    let nodesHtml = "";
    [1, 2, 3].forEach(actNum => {
      const actNodes = MAIN_STORY_NODES_META.filter(n => n.act === actNum);
      nodesHtml += `<div style="font-size:0.96rem; font-weight:900; color:var(--cinnabar-red); margin:10px 0 6px; border-bottom:1px solid var(--ink-border); padding-bottom:3px;">📜 ${actTitles[actNum]}</div>`;
      actNodes.forEach(n => {
        const isDone = st.completedNodes.includes(n.id);
        const isNext = banner.nextNodeId === n.id;
        const logEntry = (st.daotuLogs || []).find(l => l.nodeId === n.id);
        nodesHtml += `
          <div class="daotu-node-card ${isDone ? 'done' : (isNext ? 'current' : '')}">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
              <b style="color:var(--ink-black); font-size:0.92rem;">
                ${isDone ? '✅' : (isNext ? '🔥' : '⏳')} [${n.id}] ${n.name}
                <span style="font-size:0.78rem; color:var(--stone-cyan);">（${n.sys}）</span>
              </b>
              <button type="button" class="chip-btn ${isNext ? 'active' : ''}" data-trigger-node="${n.id}" style="padding:2px 8px; font-size:0.78rem;">
                ${isDone ? '重溫節點' : '立即演繹 ➔'}
              </button>
            </div>
            <div style="font-size:0.84rem; color:var(--ink-mid); margin-top:3px;">
              ${n.summary}
            </div>
            ${logEntry ? `<div style="font-size:0.82rem; color:var(--pine-green); font-weight:800; margin-top:3px;">🖋️ 道途抉擇記錄：【${logEntry.choice}】</div>` : ""}
          </div>
        `;
      });
    });

    const bodyHtml = `
      <div style="background:#fbf8f0; border:1.5px solid var(--ink-black); padding:10px 12px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
          <span class="daotu-act-tag">${banner.actLabel}</span>
          <span style="font-size:0.84rem; color:var(--pine-green); font-weight:800;">
            已完成 ${st.completedNodes.length} / 20 節點
          </span>
        </div>
        <div style="font-size:0.92rem; font-weight:900; color:var(--ink-black); margin-top:6px;">
          ${banner.statusText}
        </div>
        <div style="font-size:0.82rem; color:var(--ink-mid); margin-top:4px;">
          • 第一幕因果：<b>${fl.firstKarma || '尚未抉擇'}</b> ｜ 本命神通：<b>${fl.customSkillEstablished ? '已確立' : '待推演'}</b><br/>
          • 第二幕立場：<b>${fl.stance || '尚未表態'}</b> ｜ 弟子危機：<b>${fl.discipleCrisisMode || '待處理'}</b><br/>
          • 第三幕改命：<b>${fl.gaimingDone ? '已逆天改命' : '未改命'}</b> ｜ 最終結局：<b>${fl.endingTitle || '待證道'}</b>
        </div>
      </div>
      <div style="max-height:52vh; overflow-y:auto; padding-right:4px;">
        ${nodesHtml}
      </div>
      <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:10px;">
        <span class="main-label">〔合上道途錄〕</span>
      </button>
    `;

    this.openV11InteractiveModal("📖〔《星宿劫源》三幕主線 · 道途錄〕", bodyHtml, (ov) => {
      ov.querySelectorAll("[data-trigger-node]").forEach(btn => {
        btn.addEventListener("click", () => {
          const targetId = btn.getAttribute("data-trigger-node");
          this.triggerStoryNodeModal(targetId);
        });
      });
    });
  };

  // ==================== 將三幕主線無縫掛載至現有系統 ====================
  const _v11RenderCultivateCore = App.prototype.renderCultivateCoreView;
  const _v11PerformBreathing = App.prototype.performBreathingCultivation;
  const _v11OpenTribulationMiniGame = App.prototype.openTribulationMiniGameModal;
  const _v11RenderKungfu = App.prototype.renderKungfuView;
  const _v11RenderInventory = App.prototype.renderInventoryView;
  const _v11OpenDiscipleEvent = App.prototype.openDiscipleEventModal;
  const _v11OpenExploration = App.prototype.openExplorationModal;
  const _v11OpenShoujing = App.prototype.openShoujingChallengeModal;

  // 1. 主介面頂部常駐「當前道途」狀態條 + 第三幕乾坤界主異常預兆提示
  App.prototype.renderCultivateCoreView = function(container) {
    this.char.ensureStoryState();
    this.checkStoryActTransitions();
    const banner = this.getDaotuBannerStatus();
    const st = this.char.storyState;

    const daotuBar = document.createElement("div");
    daotuBar.className = "daotu-persistent-bar hide-in-zen";
    daotuBar.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:3px; flex:1;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span class="daotu-act-tag">${banner.actLabel}</span>
          <span class="daotu-status-text">${banner.statusText}</span>
        </div>
        ${st.act >= 3 || this.char.realmIndex >= 6 ? `
          <div style="font-size:0.82rem; color:var(--cinnabar-red); font-weight:800;">
            ⚠️【劫源預兆 3-1】星象紊亂、心魔滋生加快，星宿劫源即將降臨萬界！
          </div>
        ` : ""}
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button type="button" class="btn-modern gold" id="btn-advance-current-story" style="padding:5px 10px; font-size:0.84rem; white-space:nowrap;">
          🧭 推進主線 (${banner.nextNodeId})
        </button>
        <button type="button" class="btn-modern secondary" id="btn-open-daotu-bar" style="padding:5px 10px; font-size:0.84rem; white-space:nowrap;">
          📖 道途錄 (${st.completedNodes.length}/20)
        </button>
      </div>
    `;
    container.appendChild(daotuBar);

    daotuBar.querySelector("#btn-advance-current-story")?.addEventListener("click", () => {
      this.triggerStoryNodeModal(banner.nextNodeId);
    });
    daotuBar.querySelector("#btn-open-daotu-bar")?.addEventListener("click", () => {
      this.openDaotuJournalModal();
    });

    _v11RenderCultivateCore.call(this, container);
  };

  // 2. 第一次高效吐納結束後自動觸發 1-1「星宿初感」短卷軸獨白
  App.prototype.performBreathingCultivation = function() {
    const st = this.char.ensureStoryState();
    const had1_1 = st.completedNodes.includes("1-1");
    _v11PerformBreathing.call(this);
    if (!had1_1) {
      setTimeout(() => this.triggerStoryNodeModal("1-1"), 260);
    }
  };

  // 3. 渡劫小遊戲結合 1-4（道胎境渡劫）、2-5（星宿真王劫源真相）與 3-4（逆天改命真義）
  App.prototype.openTribulationMiniGameModal = function(reqExp, nextRealmName, isGaimingMode = false, gaimingRealmName = "") {
    const st = this.char.ensureStoryState();
    if (isGaimingMode && !st.completedNodes.includes("3-4")) {
      // 3-4 首次嘗試逆天改命前先彈出真義說明卷軸
      this.openV11InteractiveModal("⚡〔主線 3-4 · 逆天改命的真正意義〕", `
        <div style="background:#fbf8f0; border:1.5px solid var(--cinnabar-red); padding:12px; margin-bottom:10px;">
          <div style="font-size:0.9rem; color:var(--cinnabar-red); font-weight:900;">〔第三幕核心秘辛 · 逆天改命真義〕</div>
          <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin:6px 0; line-height:1.65;">
            當你催動【太初歲漏玉鑑】逆流時光重返舊日雷劫時，終於明白——<br/>
            「逆天改命，並非單純為了淬鍊肉身變強，而是在改寫你自己與『星宿劫源』之間的宿命因果！」<br/>
            唯有改命成功，方能在最終抉擇中解鎖第三條道路：【融合／改寫天道規則】！
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="btn-jade" id="btn-confirm-gaiming-story" style="flex:1;">
            <span class="main-label">⚡ 逆流時光 · 改寫宿命因果</span>
          </button>
          <button type="button" class="btn-modern secondary" data-close-v11-modal="1" style="padding:10px 14px;">
            暫緩改命
          </button>
        </div>
      `, (ov) => {
        ov.querySelector("#btn-confirm-gaiming-story")?.addEventListener("click", () => {
          st.flags.gaimingDone = true;
          this.completeStoryNode("3-4", "明悟改命真義並重渡雷劫", "揭曉逆天改命是在改寫自身與劫源的因果，成功覺醒【改命】特質！");
          _v11OpenTribulationMiniGame.call(this, reqExp, nextRealmName, isGaimingMode, gaimingRealmName);
        });
      });
      return;
    }

    _v11OpenTribulationMiniGame.call(this, reqExp, nextRealmName, isGaimingMode, gaimingRealmName);
    if (isGaimingMode) {
      st.flags.gaimingDone = true;
      this.completeStoryNode("3-4", "完成逆天改命", "成功改寫與星宿劫源之間的宿命因果。");
    } else if (!st.completedNodes.includes("1-4") && this.char.realmIndex >= 1) {
      this.completeStoryNode("1-4", "道胎生死渡劫", "於天劫幻象中感知劫源與自身相連。");
    } else if (!st.completedNodes.includes("2-5") && this.char.realmIndex >= 4) {
      st.flags.truthRevealed = true;
      this.completeStoryNode("2-5", "窺見劫源真相", "於星宿真王天劫中看見上古道主剝離因果之真相。");
    }
  };

  // 4. 自創神通升階或重構時自動觸發 1-5「本命神通雛形確立」
  App.prototype.renderKungfuView = function(container) {
    _v11RenderKungfu.call(this, container);
    const st = this.char.ensureStoryState();
    const hookSkillEstablished = () => {
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 220);
      }
    };
    container.querySelector("#btn-evolve-custom-skill")?.addEventListener("click", hookSkillEstablished);
    container.querySelector("#btn-reforge-custom-skill")?.addEventListener("click", hookSkillEstablished);
  };

  // 5. 納戒「大荒因果錄」正式升級為「📖 道途錄（含大荒因果與三幕主線記錄）」
  App.prototype.renderInventoryView = function(container) {
    _v11RenderInventory.call(this, container);
    const kBtn = container.querySelector("#btn-open-karma-journal");
    if (kBtn) {
      const st = this.char.ensureStoryState();
      kBtn.innerHTML = `📖 翻閱【道途錄 · 因果卷】(${st.completedNodes.length}/20)`;
      const clone = kBtn.cloneNode(true);
      kBtn.parentNode.replaceChild(clone, kBtn);
      clone.addEventListener("click", () => {
        this.openDaotuJournalModal();
      });
    }
  };

  // 6. 親傳弟子心境事件升級為第二幕關鍵節點 2-4
  App.prototype.openDiscipleEventModal = function(idx) {
    _v11OpenDiscipleEvent.call(this, idx);
    const st = this.char.ensureStoryState();
    const ov = document.getElementById("v11-interactive-modal");
    if (!ov) return;
    ov.querySelector("#btn-disc-choice-1")?.addEventListener("click", () => {
      st.flags.discipleCrisisMode = "理解引導";
      this.completeStoryNode("2-4", "① 溫言引導 + 賜丹", "以仁厚道心化解親傳弟子心魔危機，門風愈發凝聚。");
    });
    ov.querySelector("#btn-disc-choice-2")?.addEventListener("click", () => {
      st.flags.discipleCrisisMode = "嚴格管教";
      this.completeStoryNode("2-4", "② 演武嚴訓", "以凌厲劍道拆招點醒弟子，門下戰力大進。");
    });
    ov.querySelector("#btn-disc-choice-3")?.addEventListener("click", () => {
      st.flags.discipleCrisisMode = "放任自流";
      this.completeStoryNode("2-4", "③ 放任閉關", "任由弟子自行參悟生死心關，道門作風孤高冷冽。");
    });
  };

  // 7. 大荒探索自動記錄 1-2「初入大荒」，並提供 1-3「種下第一因果」與 2-6「表明立場」主線入口
  App.prototype.openExplorationModal = function(map, node) {
    const st = this.char.ensureStoryState();
    if (!st.completedNodes.includes("1-2")) {
      this.completeStoryNode("1-2", "初入大荒", `首次踏足【${map.name}】，切身感受到亂世爭渡氣息。`);
    }
    _v11OpenExploration.call(this, map, node);

    setTimeout(() => {
      const actionsEl = document.getElementById("explore-actions-box");
      if (!actionsEl) return;
      if (!st.flags.firstKarma) {
        const b13 = document.createElement("button");
        b13.type = "button";
        b13.className = "btn-jade";
        b13.style.marginTop = "6px";
        b13.innerHTML = `<span class="main-label">📜【主線 1-3】偶遇重傷散修：救下傷修 或 見死不救？</span>`;
        b13.addEventListener("click", () => {
          document.getElementById("exploration-modal-overlay")?.classList.remove("active");
          this.triggerStoryNodeModal("1-3");
        });
        actionsEl.appendChild(b13);
      } else if (st.act >= 2 && !st.flags.stance) {
        const b26 = document.createElement("button");
        b26.type = "button";
        b26.className = "btn-jade";
        b26.style.marginTop = "6px";
        b26.innerHTML = `<span class="main-label">⚖️【主線 2-6 · 表明立場】保全道門 或 介入亂局？</span>`;
        b26.addEventListener("click", () => {
          document.getElementById("exploration-modal-overlay")?.classList.remove("active");
          this.triggerStoryNodeModal("2-6");
        });
        actionsEl.appendChild(b26);
      }
    }, 560);
  };

  // 8. 守境挑戰與心魔殿自動推進第三幕 3-2、3-3 與 3-5 最終抉擇
  App.prototype.openShoujingChallengeModal = function() {
    _v11OpenShoujing.call(this);
    const st = this.char.ensureStoryState();
    const fl = st.flags;
    const ov = document.getElementById("v11-interactive-modal");
    if (!ov) return;

    ov.querySelector("#btn-start-shoujing-fight")?.addEventListener("click", () => {
      fl.shoujingTrialDone = true;
      this.completeStoryNode("3-3", "完成守境心魔挑戰", "於高難度守境對決中印證道心不移！");
    });
    ov.querySelector("#btn-start-xinmo-palace")?.addEventListener("click", () => {
      fl.xinmoTrialDone = true;
      const w = this.char.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
      const stanceDesc = fl.stance === "立場_超然" ? "超然孤寂魔影" : "入世蒼生執念魔胎";
      this.completeStoryNode("3-2", `斬滅【${stanceDesc}】`, `於心魔殿擊潰依自身立場與四向感悟幻化之【${stanceDesc}】！`);
    });

    const bodyEl = ov.querySelector("#v11-modal-body");
    if (bodyEl) {
      const finalBtn = document.createElement("button");
      finalBtn.type = "button";
      finalBtn.className = "btn-jade";
      finalBtn.style.cssText = "width:100%; margin-top:8px; border-color:var(--cinnabar-red);";
      finalBtn.innerHTML = `
        <span class="main-label">🌌【主線 3-5 · 最終抉擇】直面星宿劫源（守護／超脫／改寫）</span>
        <span class="sub-label">綜合三幕選擇結算《星宿劫源》四大結局與專屬道號</span>
      `;
      finalBtn.addEventListener("click", () => {
        this.triggerStoryNodeModal("3-5");
      });
      bodyEl.appendChild(finalBtn);
    }
  };

  

  // ====================================================================================================
  // 《星宿劫源：太初道主》v12.0 核心重構版（5大核心系統 × 一息循環 × 起承轉合呼吸吐納 × 有目的大荒行程）
  // ====================================================================================================

  // 1. 擴充角色 v12.0 狀態模型（一息循環、頓悟臨界、自動丹房、戰前心境、臨時傀儡、神通形態）
  Character.prototype.ensureV12State = function() {
    this.ensureStoryState();
    if (!this.v12State) {
      this.v12State = {
        // 一息循環（每日 4 步核心目標）
        breathCountToday: 0,
        expeditionDoneToday: false,
        strengthenDoneToday: false,
        dailyLoopClaimed: false,
        cycleCount: 1,
        // 3.1 入定吐納「頓悟臨界」進度 (0 ~ 100)
        epiphanyGauge: 35,
        isBreathingInProgress: false,
        breathPhaseIndex: 0, // 0:待機, 1:起, 2:承, 3:轉(可爆擊), 4:合
        // 3.3 戰前心境（合併自奇門陣法）與臨時傀儡召喚（合併自傀儡戰隊）
        preCombatMindset: "taiji", // taiji: 太極守心, tiangang: 天罡破陣, qinglong: 青龍生息
        tempPuppetSummon: "vanguard", // vanguard: 青甲衛(護盾分攤), arbalest: 破空連弩(破甲追擊)
        // 3.4 本命神通形態階位 (1~4) 與使用熟練度
        customSkillFormTier: 1,
        customSkillUseCount: 0,
        // 2.2 藥圃與煉丹簡化為自動產出 + 偶爾高品質天爐開丹機會
        autoPillProgress: 65, // 每吐納/時辰自動累積，滿100自動產出丹藥並有機率觸發「高品質天爐機會」
        highQualityAlchemyReady: true,
        // 介面分層：輔修抽屜展開狀態
        auxDrawerOpen: false
      };
    }
    return this.v12State;
  };

  // 取得本命神通「形態（1~4階）」與「我的味道（個人道韻烙印）」
  Character.prototype.getCustomSkillFlavorProfile = function() {
    this.ensureV12State();
    const st = this.ensureStoryState();
    const fl = st.flags;
    const cs = this.customSkill || { name: "太初自創神通", level: 1, mainIdx: 0, subIdx: 0 };
    const yijingLv = Math.min(5, Math.max(1, cs.level || 1));
    const formTier = Math.min(4, Math.max(1, this.v12State.customSkillFormTier || 1));

    const yijingNames = ["初窺門徑", "鋒芒畢露", "蒼茫大成", "返璞歸真", "言出法隨"];
    const formNames = [
      "形態一 · 凝氣成兵（單道凌厲玄芒破空）",
      "形態二 · 千幻化陣（三十六道流光交織成界）",
      "形態三 · 法相顯聖（百丈星宿道影垂眸鎮壓）",
      "形態四 · 太初開天（一念萬法生滅，重定地水火風）"
    ];

    const w = this.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
    const topWudao = Object.entries(w).sort((a, b) => b[1] - a[1])[0][0];
    const wudaoFlavorMap = {
      sword: { tag: "蒼茫劍骨", effect: "無視敵方 18% 靈罡防禦，劍氣自帶撕裂餘韻" },
      pill: { tag: "造化生機", effect: "施展神通時自動汲取天地靈韻，回復自身 12% 氣血" },
      formation: { tag: "星宿陣理", effect: "招式化作奇門封鎖，削弱敵方 20% 殺力與遁速" },
      body: { tag: "不滅霸體", effect: "以肉身烘爐催動神通，附帶自身靈罡 35% 之剛猛真傷" }
    };
    const wf = wudaoFlavorMap[topWudao] || wudaoFlavorMap.sword;

    let karmaFlavor = "混沌初心（尚未沾染大荒深重因果）";
    if (fl.firstKarma === "因果_初善") {
      karmaFlavor = "仁心護道（出手間留有一線生機，護體真元盾額外增厚 +15%）";
    } else if (fl.firstKarma === "因果_初惡") {
      karmaFlavor = "孤星奪命（殺伐果決毫不留情，對殘血敵人暴擊率 +20%）";
    }

    let stanceFlavor = "獨行求道";
    if (fl.stance === "立場_入世") {
      stanceFlavor = "萬民承因果 · 煌煌正道（威力隨道途節點推進額外 +15%）";
    } else if (fl.stance === "立場_超然") {
      stanceFlavor = "太虛無情 · 超然物外（真元消耗 -20%，冷卻縮減）";
    }

    return {
      yijingLv,
      yijingTitle: yijingNames[yijingLv - 1],
      formTier,
      formTitle: formNames[formTier - 1],
      wudaoTag: wf.tag,
      wudaoEffect: wf.effect,
      karmaFlavor,
      stanceFlavor,
      totalPowerPct: 190 + (yijingLv - 1) * 55 + (formTier - 1) * 65
    };
  };

  // ==================== 2. 底部導航欄與視圖路由重構為「5大核心系統」 ====================
  App.prototype.setupV12FiveCoreNavigation = function() {
    const dock = document.querySelector("nav.modern-dock");
    if (!dock) return;
    const st = this.char.ensureStoryState();
    const isEndgameLit = (this.char.realmIndex >= 6 || st.act >= 3);

    dock.innerHTML = `
      <button class="dock-tab ${this.currentView === 'main' ? 'active' : ''}" data-view="main">
        <span class="dock-seal-icon">山</span>
        <span>洞天修煉</span>
        <span class="dock-badge">主修</span>
      </button>
      <button class="dock-tab ${this.currentView === 'kungfu' ? 'active' : ''}" data-view="kungfu">
        <span class="dock-seal-icon">武</span>
        <span>本命武道</span>
      </button>
      <button class="dock-tab ${this.currentView === 'map' ? 'active' : ''}" data-view="map">
        <span class="dock-seal-icon">荒</span>
        <span>大荒因果</span>
        <span class="dock-badge">行程</span>
      </button>
      <button class="dock-tab ${this.currentView === 'foundation' ? 'active' : ''}" data-view="foundation">
        <span class="dock-seal-icon">基</span>
        <span>道基鍛造</span>
      </button>
      <button class="dock-tab ${this.currentView === 'endgame' ? 'active' : ''} ${isEndgameLit ? 'endgame-lit' : ''}" data-view="endgame">
        <span class="dock-seal-icon">劫</span>
        <span>劫源終局</span>
        ${isEndgameLit ? '<span class="dock-badge">終局</span>' : ''}
      </button>
    `;

    dock.querySelectorAll(".dock-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        this.currentView = view;
        audio.playQiCharge();
        this.renderView();
      });
    });
  };

  const _v11RenderView = App.prototype.renderView;
  App.prototype.renderView = function() {
    this.char.ensureV12State();
    this.setupV12FiveCoreNavigation();
    const vp = document.getElementById("view-viewport");
    if (!vp) return;
    vp.innerHTML = "";

    // 將舊系統入口全數映射至 5 大核心系統
    if (["roguelike", "puppet", "formation", "market", "sect"].includes(this.currentView)) {
      this.currentView = "map";
    } else if (["meridian", "inventory", "alchemy"].includes(this.currentView)) {
      this.currentView = "foundation";
    }

    switch (this.currentView) {
      case "main":
        this.renderV12DongtianView(vp);
        break;
      case "kungfu":
        this.renderV12MartialView(vp);
        break;
      case "map":
        this.renderV12WildernessView(vp);
        break;
      case "foundation":
        this.renderV12FoundationView(vp);
        break;
      case "endgame":
        this.renderV12EndgameView(vp);
        break;
      default:
        this.renderV12DongtianView(vp);
        break;
    }
  };

  // ==================== 3. 核心系統一：〔山〕洞天修煉（一息循環 + 起承轉合入定吐納 + 渡劫破境 + 分層抽屜） ====================
  App.prototype.renderV12DongtianView = function(container) {
    const v12 = this.char.ensureV12State();
    const st = this.char.ensureStoryState();
    this.checkStoryActTransitions();
    const banner = this.getDaotuBannerStatus();
    const realms = ["凝魄境", "洞天境", "道胎境", "神藏境", "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"];
    const curRealmName = realms[this.char.realmIndex] || "太初道主";
    const reqBase = [350, 1400, 4500, 13500, 38000, 95000, 240000, 550000, 1600000][this.char.realmIndex] || 1600000;
    const reqExp = Math.floor(reqBase * Math.pow(1.35, (this.char.realmLayer || 1) - 1));
    const expPct = Math.min(100, Math.floor((this.char.exp / reqExp) * 100));
    const canBreak = this.char.exp >= reqExp;

    // 4.3 主介面常駐「當前道途」提示列
    const daotuBar = document.createElement("div");
    daotuBar.className = "daotu-persistent-bar hide-in-zen";
    daotuBar.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:3px; flex:1;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span class="daotu-act-tag">${banner.actLabel}</span>
          <span class="daotu-status-text">${banner.statusText}</span>
        </div>
        ${st.act >= 3 || this.char.realmIndex >= 6 ? `
          <div style="font-size:0.82rem; color:var(--cinnabar-red); font-weight:800;">
            ⚠️【劫源預兆】星象紊亂、心魔滋生加快，星宿劫源即將全面降臨！
          </div>
        ` : ""}
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button type="button" class="btn-modern gold" id="btn-v12-advance-story" style="padding:5px 10px; font-size:0.84rem; white-space:nowrap;">
          🧭 推進主線 (${banner.nextNodeId})
        </button>
        <button type="button" class="btn-modern secondary" id="btn-v12-open-daotu" style="padding:5px 10px; font-size:0.84rem; white-space:nowrap;">
          📖 道途錄 (${st.completedNodes.length}/20)
        </button>
      </div>
    `;
    container.appendChild(daotuBar);
    daotuBar.querySelector("#btn-v12-advance-story")?.addEventListener("click", () => this.triggerStoryNodeModal(banner.nextNodeId));
    daotuBar.querySelector("#btn-v12-open-daotu")?.addEventListener("click", () => this.openDaotuJournalModal());

    // 3.0 「一息循環」每日核心目標進度卡（取代無腦按按按，完成後有明顯「今日已了」滿足感）
    const step1Done = v12.breathCountToday >= 3;
    const step2Done = v12.expeditionDoneToday;
    const step3Done = v12.strengthenDoneToday;
    const allStepsReady = step1Done && step2Done && step3Done;

    const loopCard = document.createElement("div");
    loopCard.className = "v12-loop-tracker-card hide-in-zen";
    loopCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
        <div>
          <b style="font-size:0.98rem; color:var(--ink-black);">☯️ 第 ${v12.cycleCount} 息循環 · 今日修行四步曲</b>
          <span style="font-size:0.82rem; color:var(--ink-mid); margin-left:6px;">（重質不重量，完成一輪即見道途寸進）</span>
        </div>
        ${v12.dailyLoopClaimed ? `
          <span class="cinnabar-seal-stamp" style="padding:2px 8px; font-size:0.82rem;">〔今日道途已進一歩〕</span>
        ` : allStepsReady ? `
          <button type="button" class="btn-modern gold" id="btn-claim-v12-loop" style="padding:4px 10px; font-size:0.84rem;">
            🧧 落印收功 · 領取今日道果
          </button>
        ` : `<span style="font-size:0.82rem; color:var(--stone-cyan); font-weight:800;">道心值：${this.char.daoHeart}/${this.char.maxDaoHeart}</span>`}
      </div>
      <div class="v12-loop-steps-row">
        <div class="v12-loop-step ${step1Done ? 'done' : 'active-step'}">
          <div>① 入定吐納</div>
          <div style="font-size:0.78rem; margin-top:2px;">${step1Done ? '✔ 已圓滿' : `${v12.breathCountToday}/3 次`}</div>
        </div>
        <div class="v12-loop-step ${step2Done ? 'done' : (step1Done ? 'active-step' : '')}">
          <div>② 大荒/破境</div>
          <div style="font-size:0.78rem; margin-top:2px;">${step2Done ? '✔ 已歷練' : '待外出/渡劫'}</div>
        </div>
        <div class="v12-loop-step ${step3Done ? 'done' : (step2Done ? 'active-step' : '')}">
          <div>③ 淬煉本命</div>
          <div style="font-size:0.78rem; margin-top:2px;">${step3Done ? '✔ 已精進' : '待強化神通/道基'}</div>
        </div>
        <div class="v12-loop-step ${v12.dailyLoopClaimed ? 'done' : (allStepsReady ? 'active-step' : '')}">
          <div>④ 今日已了</div>
          <div style="font-size:0.78rem; margin-top:2px;">${v12.dailyLoopClaimed ? '✔ 道果已成' : '感悟×2·上限+2'}</div>
        </div>
      </div>
    `;
    container.appendChild(loopCard);

    loopCard.querySelector("#btn-claim-v12-loop")?.addEventListener("click", (e) => {
      v12.dailyLoopClaimed = true;
      this.char.wudaoPoints = (this.char.wudaoPoints || 0) + 2;
      this.char.maxDaoHeart = (this.char.maxDaoHeart || 100) + 2;
      this.char.daoHeart = this.char.maxDaoHeart;
      this.char.addItem("pill_jiangchen", 1);
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "qi", "今日已了！感悟+2 · 道心上限+2");
      this.openV11InteractiveModal("🧧〔今日已了 · 道途又進一歩〕", `
        <div style="text-align:center; padding:8px;">
          <div class="cinnabar-seal-stamp" style="display:inline-block; font-size:1.1rem; padding:4px 14px; margin-bottom:8px;">〔第 ${v12.cycleCount} 息循環圓滿〕</div>
          <div style="font-size:1.04rem; font-weight:900; color:var(--ink-black); line-height:1.65;">
            「今日入定納氣、踏足大荒、淬煉本命，吾道又往前踏出堅實一步。」<br/>
            已獲得：<b style="color:var(--cinnabar-red);">靈台感悟點 +2、道心上限永久 +2、五品造化丸 ×1</b>！
          </div>
        </div>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <button type="button" class="btn-jade" id="btn-start-next-cycle" style="flex:1;">
            <span class="main-label">🌅 開啟下一息循環（明日再戰）</span>
          </button>
          <button type="button" class="btn-modern secondary" data-close-v11-modal="1" style="padding:10px 14px;">
            暫留洞天
          </button>
        </div>
      `, (ov) => {
        ov.querySelector("#btn-start-next-cycle")?.addEventListener("click", () => {
          v12.breathCountToday = 0;
          v12.expeditionDoneToday = false;
          v12.strengthenDoneToday = false;
          v12.dailyLoopClaimed = false;
          v12.cycleCount += 1;
          this.closeV11InteractiveModal();
          this.executePassShichen();
        });
      });
      this.updateHeader();
      this.renderView();
    });

    // 3.1 核心水墨畫卷舞台 + 「起、承、轉、合」入定吐納與三波渡劫破境
    const rudenLv = Math.min(5, Math.max(1, this.char.rudenLevel || 1));
    const rudenMultipliers = [1.0, 1.35, 1.80, 2.50, 3.60];
    const rudenDemonRates = [0, 8, 18, 30, 42];
    const rudenNames = ["初定", "氣沉", "忘我", "太虛", "天人合一"];
    const curMult = rudenMultipliers[rudenLv - 1];
    const curDemonRate = rudenDemonRates[rudenLv - 1];
    const shichen = this.getCurrentShichen();

    const heroCard = document.createElement("div");
    heroCard.className = "cultivation-hero-card";
    heroCard.innerHTML = `
      <div class="cultivation-stage" id="v12-cultivation-stage" style="min-height:225px; position:relative; overflow:hidden; border:1.5px solid var(--ink-border); border-radius:3px;">
        <div class="ink-landscape-svg-bg" style="position:absolute; inset:0; pointer-events:none;">
          ${this.buildInkLandscapeSVG(this.char.realmIndex)}
        </div>

        <!-- 左上：入定層數與風險爆擊倍率 -->
        <div class="hide-in-zen" style="position:absolute; top:10px; left:10px; z-index:12; display:flex; flex-direction:column; gap:5px;">
          <div style="background:rgba(246,241,231,0.94); border:1.5px solid var(--stone-cyan); border-left:4px solid var(--cinnabar-red); padding:5px 10px; border-radius:2px;">
            <div style="font-size:0.96rem; font-weight:900; color:var(--ink-black);">
              🧘 入定第 ${rudenLv} 層 · 【${rudenNames[rudenLv - 1]}】
            </div>
            <div style="font-size:0.82rem; color:var(--stone-cyan); font-weight:800;">
              吐納倍率 <b style="color:var(--cinnabar-red);">×${curMult.toFixed(2)}</b> ｜ 心魔干擾率 <b>${curDemonRate}%</b>
            </div>
          </div>
          <div style="background:rgba(246,241,231,0.92); border:1px solid var(--ink-border); padding:4px 8px; border-radius:2px; font-size:0.8rem; font-weight:800; color:var(--pine-green);">
            ☸️ 頓悟臨界：<b>${v12.epiphanyGauge}%</b> / 100%（滿值必入四向悟道）
          </div>
        </div>

        <!-- 右上：意境清修與法相觀想 -->
        <div class="hide-in-zen" style="position:absolute; top:10px; right:10px; z-index:12; display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
          <button type="button" class="chip-btn" id="btn-v12-zen-mode" style="background:rgba(246,241,231,0.92);">🖼️ 畫中意境</button>
          <button type="button" class="chip-btn" id="btn-v12-wudao-modal" style="background:rgba(246,241,231,0.92); color:var(--cinnabar-red);">
            ✨ 靈台悟道 (感悟:${this.char.wudaoPoints || 0})
          </button>
        </div>

        <!-- 中央修士水墨立像 -->
        <div class="cultivator-centerpiece" id="v12-cultivator-avatar" style="position:relative; z-index:8; display:flex; justify-content:center; align-items:center; height:190px; transition:transform 0.35s ease;">
          ${this.buildCultivatorSVG(this.char.realmIndex)}
        </div>

        <!-- 底部境界與元氣進度條 -->
        <div class="hide-in-zen" style="position:relative; z-index:12; background:rgba(244,239,228,0.94); border-top:1px solid var(--ink-border); padding:8px 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-size:1.05rem; font-weight:900; color:var(--ink-black);">
              【${curRealmName} · 第 ${this.char.realmLayer} 重天】
            </span>
            <span style="font-size:0.88rem; font-weight:800; color:${canBreak ? 'var(--cinnabar-red)' : 'var(--stone-cyan)'};">
              元氣：${this.char.exp.toLocaleString()} / ${reqExp.toLocaleString()} (${expPct}%)
            </span>
          </div>
          <div style="height:10px; background:rgba(34,32,28,0.14); border-radius:2px; overflow:hidden; border:1px solid rgba(34,32,28,0.3);">
            <div style="width:${expPct}%; height:100%; background:${canBreak ? 'var(--cinnabar-red)' : 'var(--stone-cyan)'}; transition:width 0.3s ease;"></div>
          </div>
        </div>
      </div>

      <!-- 3.1 「起、承、轉、合」完整呼吸過程面板 -->
      <div class="v12-breath-cycle-box hide-in-zen">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:0.96rem; color:var(--ink-black);">🌬️ 周天呼吸吐納（起 ➔ 承 ➔ 轉 ➔ 合）</b>
          <span style="font-size:0.82rem; color:var(--stone-cyan); font-weight:800;">${shichen.name} · ${shichen.buffTitle}</span>
        </div>
        <div class="v12-breath-phases" id="v12-breath-nodes">
          <div class="v12-breath-node ${v12.breathPhaseIndex === 1 ? 'lit' : ''}" data-phase="1">起 · 納氣</div>
          <div class="v12-breath-node ${v12.breathPhaseIndex === 2 ? 'lit' : ''}" data-phase="2">承 · 搬運</div>
          <div class="v12-breath-node ${v12.breathPhaseIndex === 3 ? 'crit-window' : ''}" data-phase="3">轉 · 凝神(爆擊點)</div>
          <div class="v12-breath-node ${v12.breathPhaseIndex === 4 ? 'lit' : ''}" data-phase="4">合 · 歸元</div>
        </div>
        <div id="v12-breath-Hint" style="font-size:0.84rem; color:var(--ink-mid); font-weight:700; text-align:center; margin-bottom:8px;">
          ${v12.breathPhaseIndex === 3
            ? '🔥【氣機交感】立即點擊下方「凝神合息」觸發 ×1.65 大周天爆擊與頓悟暴漲！'
            : '每次吐納歷經「起承轉合」四息，層數越高收益越盛；心魔襲擾時守心成功可得破妄大禮。'}
        </div>

        <div style="display:grid; grid-template-columns: 1.35fr 1fr; gap:8px;">
          <button type="button" class="btn-jade" id="btn-v12-breathe" style="padding:11px 12px;">
            <span class="main-label" id="btn-v12-breathe-label" style="font-size:1.1rem;">
              ${v12.breathPhaseIndex === 3 ? '⚡ 凝神合息 · 大周天爆擊！' : `🧘 入定吐納 (耗5道心 · ×${curMult.toFixed(2)})`}
            </span>
            <span class="sub-label">升入定層數 · 積蓄頓悟臨界 (${v12.epiphanyGauge}%)</span>
          </button>

          <button type="button" class="btn-jade" id="btn-v12-breakthrough" style="padding:11px 12px; border-color:${canBreak ? 'var(--cinnabar-red)' : 'var(--ink-border)'}; opacity:${canBreak ? '1' : '0.88'};">
            <span class="main-label" style="font-size:1.08rem; color:${canBreak ? 'var(--cinnabar-red)' : 'var(--ink-black)'};">
              ⚡ ${canBreak ? '叩關破境 · 引動天劫' : '蘊養破境 (元氣未滿)'}
            </span>
            <span class="sub-label">三波天劫策略 · 破境質變獨白</span>
          </button>
        </div>

        <!-- 選擇：繼續深入修煉 or 外出大荒 -->
        <div style="display:flex; gap:8px; margin-top:8px;">
          <button type="button" class="btn-modern secondary" id="btn-v12-go-wilderness" style="flex:1; font-size:0.88rem;">
            🗺️ 外出大荒 · 展開因果行程
          </button>
          <button type="button" class="btn-modern secondary" id="btn-v12-go-martial" style="flex:1; font-size:0.88rem;">
            🗡️ 本命武道 · 演化神通形態
          </button>
        </div>
      </div>

      <!-- 2.3 介面分層：輔修（可收合：道基鍛造）与 終局（大圓滿/第三幕亮起：劫源終局） -->
      <div class="v12-layer-drawer hide-in-zen">
        <div class="v12-layer-drawer-header" id="btn-toggle-aux-drawer">
          <span>🛠️【輔修 · 可收合】道基鍛造（氣脈剛柔 · 本命器靈 · 自動丹房 ${v12.autoPillProgress}%）</span>
          <span style="color:var(--stone-cyan);">${v12.auxDrawerOpen ? '▴ 收合輔修' : '▾ 展開輔修'}</span>
        </div>
        ${v12.auxDrawerOpen ? `
          <div style="padding:10px 12px; border-top:1px solid var(--ink-border); display:flex; flex-direction:column; gap:8px;">
            <div style="font-size:0.88rem; color:var(--ink-dark); line-height:1.5;">
              • <b>太初五極氣脈：</b>已貫通 ${this.char.unlockedAcupoints.length}/6 竅 ｜ <b>本命器靈好感：</b>${this.char.spiritAffection || 10}/50<br/>
              • <b>歲漏自動丹房：</b>凝丹進度 <b>${v12.autoPillProgress}%</b> ${v12.highQualityAlchemyReady ? '（🔥【天爐良機】已就緒，可開爐催煉極品丹！）' : ''}
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn-modern gold" id="btn-jump-foundation-view" style="flex:1;">前往【道基鍛造】完整工坊 ➔</button>
              ${v12.highQualityAlchemyReady ? `<button type="button" class="btn-modern" id="btn-quick-high-alchemy" style="flex:1; color:var(--cinnabar-red); border-color:var(--cinnabar-red);">🔥 把握天爐良機煉丹</button>` : ''}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="v12-layer-drawer ${(this.char.realmIndex >= 6 || st.act >= 3) ? 'endgame-glow' : ''} hide-in-zen" style="margin-top:8px;">
        <div class="v12-layer-drawer-header" id="btn-jump-endgame-drawer" style="background:${(this.char.realmIndex >= 6 || st.act >= 3) ? 'rgba(163,44,34,0.14)' : 'rgba(230,221,202,0.55)'};">
          <span>🌌【終局 · ${(this.char.realmIndex >= 6 || st.act >= 3) ? '劫源已顯' : '大圓滿/第三幕亮起'}】劫源終局（守境 · 心魔殿 · 逆天改命 · 最終抉擇）</span>
          <span style="color:var(--cinnabar-red);">進入終局 ➔</span>
        </div>
      </div>
    `;
    container.appendChild(heroCard);

    // 綁定洞天修煉互動事件
    heroCard.querySelector("#btn-v12-zen-mode")?.addEventListener("click", () => this.toggleZenMode());
    heroCard.querySelector("#btn-v12-wudao-modal")?.addEventListener("click", () => this.openWudaoEpiphanyModal(true));
    heroCard.querySelector("#btn-v12-go-wilderness")?.addEventListener("click", () => {
      this.currentView = "map";
      this.renderView();
    });
    heroCard.querySelector("#btn-v12-go-martial")?.addEventListener("click", () => {
      this.currentView = "kungfu";
      this.renderView();
    });
    heroCard.querySelector("#btn-toggle-aux-drawer")?.addEventListener("click", () => {
      v12.auxDrawerOpen = !v12.auxDrawerOpen;
      this.renderView();
    });
    heroCard.querySelector("#btn-jump-foundation-view")?.addEventListener("click", () => {
      this.currentView = "foundation";
      this.renderView();
    });
    heroCard.querySelector("#btn-quick-high-alchemy")?.addEventListener("click", () => {
      const rec = ALCHEMY_RECIPES_DATA[Math.min(ALCHEMY_RECIPES_DATA.length - 1, Math.floor(this.char.realmIndex / 2))] || ALCHEMY_RECIPES_DATA[0];
      v12.highQualityAlchemyReady = false;
      v12.strengthenDoneToday = true;
      this.openFireControlMiniGame(rec);
    });
    heroCard.querySelector("#btn-jump-endgame-drawer")?.addEventListener("click", () => {
      this.currentView = "endgame";
      this.renderView();
    });

    // 3.1 核心入定吐納（「起、承、轉、合」完整呼吸過程）
    heroCard.querySelector("#btn-v12-breathe")?.addEventListener("click", (e) => {
      this.executeV12BreathingCycle(e.currentTarget);
    });

    // 3.2 叩關破境（三波天劫）
    heroCard.querySelector("#btn-v12-breakthrough")?.addEventListener("click", () => {
      if (this.char.exp < reqExp) {
        this.openV11InteractiveModal("⚡〔元氣未滿 · 亦可強行引劫或繼續吐納〕", `
          <div style="font-size:0.96rem; color:var(--ink-black); line-height:1.6; margin-bottom:12px;">
            當前元氣為 <b>${this.char.exp.toLocaleString()} / ${reqExp.toLocaleString()} (${expPct}%)</b>。<br/>
            道友可選擇繼續進行高層【入定吐納】積蓄元氣，或消耗 100 真元直接引動三波天劫叩關！
          </div>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn-jade" id="btn-force-trib-now" style="flex:1;">
              <span class="main-label">⚡ 逆天強行叩關 (耗100真元)</span>
            </button>
            <button type="button" class="btn-modern secondary" data-close-v11-modal="1" style="padding:10px 14px;">
              返回吐納
            </button>
          </div>
        `, (ov) => {
          ov.querySelector("#btn-force-trib-now")?.addEventListener("click", () => {
            this.char.qi = Math.max(0, this.char.qi - 100);
            this.char.exp = reqExp;
            v12.expeditionDoneToday = true;
            this.performBreakthrough(reqExp, realms[Math.min(8, this.char.realmIndex + 1)]);
          });
        });
        return;
      }
      v12.expeditionDoneToday = true;
      this.performBreakthrough(reqExp, realms[Math.min(8, this.char.realmIndex + 1)]);
    });
  };

  // 實作 3.1「起、承、轉、合」完整呼吸過程與爆擊／守心／頓悟臨界
  App.prototype.executeV12BreathingCycle = function(btnEl) {
    const v12 = this.char.ensureV12State();
    const st = this.char.ensureStoryState();

    // 若正處於第 3 階「轉 · 凝神」爆擊窗口，點擊即觸發完美呼吸爆擊！
    if (v12.isBreathingInProgress && v12.breathPhaseIndex === 3) {
      v12.breathCritTriggered = true;
      audio.playEpiphanyBell();
      return;
    }
    if (v12.isBreathingInProgress) return;

    if (!this.trySpendDaoHeart(5, "入定吐納")) return;

    v12.isBreathingInProgress = true;
    v12.breathCritTriggered = false;
    v12.breathPhaseIndex = 1;

    const updateBreathUI = (phase, hintText) => {
      v12.breathPhaseIndex = phase;
      const nodes = document.querySelectorAll("#v12-breath-nodes .v12-breath-node");
      nodes.forEach(n => {
        const p = parseInt(n.getAttribute("data-phase"), 10);
        n.classList.remove("lit", "crit-window");
        if (p === phase) {
          n.classList.add(phase === 3 ? "crit-window" : "lit");
        }
      });
      const hintEl = document.getElementById("v12-breath-Hint");
      if (hintEl && hintText) hintEl.innerHTML = hintText;
      const lbl = document.getElementById("btn-v12-breathe-label");
      if (lbl) {
        lbl.innerText = phase === 3 ? "⚡ 立即點擊：凝神合息（觸發大周天爆擊！）" : "🌬️ 周天運轉中（起 ➔ 承 ➔ 轉 ➔ 合）...";
      }
      const avatar = document.getElementById("v12-cultivator-avatar");
      if (avatar) {
        avatar.style.transform = phase === 3 ? "scale(1.08)" : (phase % 2 === 1 ? "scale(1.03)" : "scale(1.0)");
      }
    };

    audio.playQiCharge();
    updateBreathUI(1, "【起 · 納氣】四方水墨靈氣匯入百會，氣沉丹田……");

    setTimeout(() => {
      audio.playTone(392, "sine", 0.25, 0.04);
      updateBreathUI(2, "【承 · 搬運】真氣沿太初五極經脈流轉周天……");
    }, 280);

    setTimeout(() => {
      audio.playTone(523.25, "triangle", 0.3, 0.05);
      updateBreathUI(3, "🔥【轉 · 凝神窗口】此時點擊下方按鈕可觸發 ×1.65 呼吸共鳴爆擊！");
    }, 560);

    setTimeout(() => {
      v12.isBreathingInProgress = false;
      v12.breathPhaseIndex = 4;
      const isCrit = !!v12.breathCritTriggered;
      const rudenLv = Math.min(5, Math.max(1, this.char.rudenLevel || 1));
      const rudenMultipliers = [1.0, 1.35, 1.80, 2.50, 3.60];
      const rudenDemonRates = [0, 8, 18, 30, 42];
      const mult = rudenMultipliers[rudenLv - 1] * (isCrit ? 1.65 : 1.0);
      const shichen = this.getCurrentShichen();

      const baseExp = Math.floor((140 + this.char.realmIndex * 95 + this.char.comprehension * 6) * mult * (1 + (shichen.expBonus || 0)));
      const baseQi = Math.floor((55 + this.char.realmIndex * 30 + this.char.rootBone * 3) * mult);

      this.char.exp += baseExp;
      this.char.qi += baseQi;
      v12.breathCountToday += 1;

      // 自動丹房進度累積
      v12.autoPillProgress += 35;
      if (v12.autoPillProgress >= 100) {
        v12.autoPillProgress -= 100;
        this.char.addItem("pill_juyuan", 1);
        v12.highQualityAlchemyReady = true;
      }

      // 提升入定層數與頓悟臨界
      this.char.rudenLevel = Math.min(5, rudenLv + 1);
      v12.epiphanyGauge = Math.min(100, v12.epiphanyGauge + (isCrit ? 28 : (12 + rudenLv * 4)));

      if (isCrit) {
        audio.playLevelUp();
      } else {
        audio.playQiCharge();
      }

      if (btnEl) {
        this.triggerFlyingReward(
          btnEl,
          "exp",
          `${isCrit ? '💥大周天爆擊！' : '合息歸元'} +${baseExp}元氣 / +${baseQi}真元 (入定×${this.char.rudenLevel})`
        );
      }

      this.updateHeader();
      this.renderView();

      // 首次吐納觸發 1-1「星宿初感」
      if (!st.completedNodes.includes("1-1")) {
        setTimeout(() => this.triggerStoryNodeModal("1-1"), 220);
        return;
      }

      // 檢查是否達到「頓悟臨界 100%」
      if (v12.epiphanyGauge >= 100) {
        v12.epiphanyGauge = 0;
        this.char.wudaoPoints = (this.char.wudaoPoints || 0) + 1;
        setTimeout(() => {
          audio.playEpiphanyBell();
          this.openWudaoEpiphanyModal(false);
        }, 240);
        return;
      }

      // 檢查高入定心魔「守心」互動
      const demonChance = rudenDemonRates[rudenLv - 1];
      if (rudenLv >= 2 && Math.random() * 100 < demonChance) {
        setTimeout(() => this.openHeartDemonInterferenceModal(), 240);
      }
    }, 1150);
  };

  // ==================== 4. 核心系統二：〔武〕本命武道（神通意境+形態演化+我的味道+道訣合璧+戰前心境） ====================
  App.prototype.renderV12MartialView = function(container) {
    const v12 = this.char.ensureV12State();
    const st = this.char.ensureStoryState();
    const flavor = this.char.getCustomSkillFlavorProfile();
    const cs = this.char.customSkill || { name: "太初萬劍歸宗", level: 1, mainIdx: 0, subIdx: 0 };

    const mindsets = [
      { id: "taiji", name: "☯️ 太極守心勢", desc: "戰前凝練太極玄罡，開局護體真元盾增厚 +35%，受擊反震 20% 傷害。" },
      { id: "tiangang", name: "⚔️ 天罡破陣勢", desc: "戰前引動北斗殺機，全神通破甲提升 +30%，會心暴擊率 +12%。" },
      { id: "qinglong", name: "🌿 青龍生息勢", desc: "戰前運轉乙木造化，每回合自動回復 10% 氣血並驅散心魔。" }
    ];

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";
    wrap.innerHTML = `
      <!-- 3.4 本命神通成長：意境 × 形態 × 個人道韻味道 -->
      <div class="ink-card" style="border:2px solid var(--cinnabar-red); background:linear-gradient(180deg, #fcf9f2 0%, #efe6d5 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(163,44,34,0.3); padding-bottom:8px; margin-bottom:8px;">
          <div>
            <span class="daotu-act-tag">本命神通</span>
            <b style="font-size:1.2rem; color:var(--ink-black); margin-left:6px;">【${cs.name}】</b>
          </div>
          <span style="font-size:0.95rem; font-weight:900; color:var(--cinnabar-red);">綜合威能：${flavor.totalPowerPct}%</span>
        </div>

        <div style="background:rgba(255,253,248,0.92); border:1px solid var(--ink-border); padding:10px; border-radius:2px; margin-bottom:10px;">
          <div style="font-size:0.94rem; font-weight:900; color:var(--stone-cyan); margin-bottom:4px;">
            ✨ 當前意境：Lv.${flavor.yijingLv}【${flavor.yijingTitle}】 ｜ 當前形態：【${flavor.formTitle}】
          </div>
          <div style="font-size:0.88rem; color:var(--ink-dark); line-height:1.6; border-top:1px dashed rgba(34,32,28,0.22); padding-top:6px; margin-top:6px;">
            <b>🎨 專屬道韻（「這招越來越有我的味道」）：</b><br/>
            • <b>四向悟道烙印：</b>【${flavor.wudaoTag}】—— ${flavor.wudaoEffect}<br/>
            • <b>大荒因果烙印：</b>${flavor.karmaFlavor}<br/>
            • <b>爭道立場烙印：</b>${flavor.stanceFlavor}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
          <button type="button" class="btn-jade" id="btn-v12-upgrade-yijing">
            <span class="main-label">🖌️ 參悟神通意境 (Lv.${flavor.yijingLv}➔${Math.min(5, flavor.yijingLv + 1)})</span>
            <span class="sub-label">消耗 120 真元 · 提升神通威能與道韻</span>
          </button>
          <button type="button" class="btn-jade" id="btn-v12-evolve-form" style="border-color:var(--stone-cyan);">
            <span class="main-label">🌌 蛻變神通形態 (${flavor.formTier}/4 階)</span>
            <span class="sub-label">消耗 1 感悟點 · 演化更高階視覺形態</span>
          </button>
        </div>
        <button type="button" class="btn-modern secondary" id="btn-v12-rename-custom" style="width:100%; margin-top:8px;">
          ✍️ 重構本命神通名號與主副招式搭配 (耗 100 真元)
        </button>
      </div>

      <!-- 2.2 戰前心境（原奇門陣法合併至此，作為戰前策略決策） -->
      <div class="ink-card">
        <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin-bottom:6px;">
          ☯️ 戰前心境與陣勢（合併奇門陣道 · 決定鬥法風格）
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${mindsets.map(m => `
            <div class="daotu-node-card ${v12.preCombatMindset === m.id ? 'done' : ''}" data-mindset-id="${m.id}" style="cursor:pointer; margin-bottom:0;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <b style="font-size:0.94rem; color:var(--ink-black);">${m.name}</b>
                <span style="font-size:0.8rem; font-weight:900; color:${v12.preCombatMindset === m.id ? 'var(--cinnabar-red)' : 'var(--ink-light)'};">
                  ${v12.preCombatMindset === m.id ? '● 當前運使心境' : '點擊切換'}
                </span>
              </div>
              <div style="font-size:0.84rem; color:var(--ink-mid); margin-top:3px;">${m.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- 隨身道訣與火雷合璧配置 -->
      <div id="v12-legacy-kungfu-slot"></div>
    `;
    container.appendChild(wrap);

    // 渲染精簡後的道訣列表
    const legacySlot = wrap.querySelector("#v12-legacy-kungfu-slot");
    if (legacySlot) {
      _v11RenderKungfu.call(this, legacySlot);
    }

    wrap.querySelector("#btn-v12-upgrade-yijing")?.addEventListener("click", (e) => {
      if (this.char.qi < 120) {
        this.triggerFlyingReward(e.currentTarget, "qi", "真元不足 120！");
        return;
      }
      this.char.qi -= 120;
      this.char.customSkill.level = Math.min(5, (this.char.customSkill.level || 1) + 1);
      v12.strengthenDoneToday = true;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "qi", `本命神通意境升至 Lv.${this.char.customSkill.level}！`);
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 200);
      }
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v12-evolve-form")?.addEventListener("click", (e) => {
      if ((this.char.wudaoPoints || 0) < 1) {
        this.triggerFlyingReward(e.currentTarget, "qi", "靈台感悟點不足 1 點！");
        return;
      }
      if (v12.customSkillFormTier >= 4) {
        this.triggerFlyingReward(e.currentTarget, "qi", "已臻至最高第四形態【太初開天】！");
        return;
      }
      this.char.wudaoPoints -= 1;
      v12.customSkillFormTier += 1;
      v12.strengthenDoneToday = true;
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "exp", `神通形態蛻變為第 ${v12.customSkillFormTier} 階！`);
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 200);
      }
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v12-rename-custom")?.addEventListener("click", () => {
      const names = ["太初萬劍歸宗", "焚天混沌火蓮", "紫極開天神雷", "太虛無量劫劍", "鴻蒙造化神芒"];
      const nextIdx = (names.indexOf(this.char.customSkill.name) + 1) % names.length;
      this.char.customSkill.name = names[nextIdx];
      v12.strengthenDoneToday = true;
      audio.playQiCharge();
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 200);
      }
      this.renderView();
    });

    wrap.querySelectorAll("[data-mindset-id]").forEach(card => {
      card.addEventListener("click", () => {
        v12.preCombatMindset = card.getAttribute("data-mindset-id");
        audio.playQiCharge();
        this.renderView();
      });
    });
  };

  // ==================== 5. 核心系統三：〔荒〕大荒因果（有目的的行程 + 重量級抉擇 + 臨時傀儡助陣 + 弟子心境與三極宗師） ====================
  // ==================== 5. 核心系統三：〔荒〕大荒因果（委託給 v15.0 旗艦版實現） ====================
  App.prototype.renderV12WildernessView = function(container) {
    if (this.renderV14WuxiaWildernessView) {
      this.renderV14WuxiaWildernessView(container);
    }
  };
App.prototype.renderV12MartialView = function(container) {
    const v12 = this.char.ensureV12State();
    const st = this.char.ensureStoryState();
    const flavor = this.char.getCustomSkillFlavorProfile();
    const cs = this.char.customSkill || { name: "太初萬劍歸宗", level: 1, mainIdx: 0, subIdx: 0 };

    const mindsets = [
      { id: "taiji", name: "☯️ 太極守心勢", desc: "戰前凝練太極玄罡，開局護體真元盾增厚 +35%，受擊反震 20% 傷害。" },
      { id: "tiangang", name: "⚔️ 天罡破陣勢", desc: "戰前引動北斗殺機，全神通破甲提升 +30%，會心暴擊率 +12%。" },
      { id: "qinglong", name: "🌿 青龍生息勢", desc: "戰前運轉乙木造化，每回合自動回復 10% 氣血並驅散心魔。" }
    ];

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";
    wrap.innerHTML = `
      <!-- 3.4 本命神通成長：意境 × 形態 × 個人道韻味道 -->
      <div class="ink-card" style="border:2px solid var(--cinnabar-red); background:linear-gradient(180deg, #fcf9f2 0%, #efe6d5 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid rgba(163,44,34,0.3); padding-bottom:8px; margin-bottom:8px;">
          <div>
            <span class="daotu-act-tag">本命神通</span>
            <b style="font-size:1.2rem; color:var(--ink-black); margin-left:6px;">【${cs.name}】</b>
          </div>
          <span style="font-size:0.95rem; font-weight:900; color:var(--cinnabar-red);">綜合威能：${flavor.totalPowerPct}%</span>
        </div>

        <div style="background:rgba(255,253,248,0.92); border:1px solid var(--ink-border); padding:10px; border-radius:2px; margin-bottom:10px;">
          <div style="font-size:0.94rem; font-weight:900; color:var(--stone-cyan); margin-bottom:4px;">
            ✨ 當前意境：Lv.${flavor.yijingLv}【${flavor.yijingTitle}】 ｜ 當前形態：【${flavor.formTitle}】
          </div>
          <div style="font-size:0.88rem; color:var(--ink-dark); line-height:1.6; border-top:1px dashed rgba(34,32,28,0.22); padding-top:6px; margin-top:6px;">
            <b>🎨 專屬道韻（「這招越來越有我的味道」）：</b><br/>
            • <b>四向悟道烙印：</b>【${flavor.wudaoTag}】—— ${flavor.wudaoEffect}<br/>
            • <b>大荒因果烙印：</b>${flavor.karmaFlavor}<br/>
            • <b>爭道立場烙印：</b>${flavor.stanceFlavor}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
          <button type="button" class="btn-jade" id="btn-v12-upgrade-yijing">
            <span class="main-label">🖌️ 參悟神通意境 (Lv.${flavor.yijingLv}➔${Math.min(5, flavor.yijingLv + 1)})</span>
            <span class="sub-label">消耗 120 真元 · 提升神通威能與道韻</span>
          </button>
          <button type="button" class="btn-jade" id="btn-v12-evolve-form" style="border-color:var(--stone-cyan);">
            <span class="main-label">🌌 蛻變神通形態 (${flavor.formTier}/4 階)</span>
            <span class="sub-label">消耗 1 感悟點 · 演化更高階視覺形態</span>
          </button>
        </div>
        <button type="button" class="btn-modern secondary" id="btn-v12-rename-custom" style="width:100%; margin-top:8px;">
          ✍️ 重構本命神通名號與主副招式搭配 (耗 100 真元)
        </button>
      </div>

      <!-- 2.2 戰前心境（原奇門陣法合併至此，作為戰前策略決策） -->
      <div class="ink-card">
        <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin-bottom:6px;">
          ☯️ 戰前心境與陣勢（合併奇門陣道 · 決定鬥法風格）
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${mindsets.map(m => `
            <div class="daotu-node-card ${v12.preCombatMindset === m.id ? 'done' : ''}" data-mindset-id="${m.id}" style="cursor:pointer; margin-bottom:0;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <b style="font-size:0.94rem; color:var(--ink-black);">${m.name}</b>
                <span style="font-size:0.8rem; font-weight:900; color:${v12.preCombatMindset === m.id ? 'var(--cinnabar-red)' : 'var(--ink-light)'};">
                  ${v12.preCombatMindset === m.id ? '● 當前運使心境' : '點擊切換'}
                </span>
              </div>
              <div style="font-size:0.84rem; color:var(--ink-mid); margin-top:3px;">${m.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- 隨身道訣與火雷合璧配置 -->
      <div id="v12-legacy-kungfu-slot"></div>
    `;
    container.appendChild(wrap);

    // 渲染精簡後的道訣列表
    const legacySlot = wrap.querySelector("#v12-legacy-kungfu-slot");
    if (legacySlot) {
      _v11RenderKungfu.call(this, legacySlot);
    }

    wrap.querySelector("#btn-v12-upgrade-yijing")?.addEventListener("click", (e) => {
      if (this.char.qi < 120) {
        this.triggerFlyingReward(e.currentTarget, "qi", "真元不足 120！");
        return;
      }
      this.char.qi -= 120;
      this.char.customSkill.level = Math.min(5, (this.char.customSkill.level || 1) + 1);
      v12.strengthenDoneToday = true;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "qi", `本命神通意境升至 Lv.${this.char.customSkill.level}！`);
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 200);
      }
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v12-evolve-form")?.addEventListener("click", (e) => {
      if ((this.char.wudaoPoints || 0) < 1) {
        this.triggerFlyingReward(e.currentTarget, "qi", "靈台感悟點不足 1 點！");
        return;
      }
      if (v12.customSkillFormTier >= 4) {
        this.triggerFlyingReward(e.currentTarget, "qi", "已臻至最高第四形態【太初開天】！");
        return;
      }
      this.char.wudaoPoints -= 1;
      v12.customSkillFormTier += 1;
      v12.strengthenDoneToday = true;
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "exp", `神通形態蛻變為第 ${v12.customSkillFormTier} 階！`);
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 200);
      }
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v12-rename-custom")?.addEventListener("click", () => {
      const names = ["太初萬劍歸宗", "焚天混沌火蓮", "紫極開天神雷", "太虛無量劫劍", "鴻蒙造化神芒"];
      const nextIdx = (names.indexOf(this.char.customSkill.name) + 1) % names.length;
      this.char.customSkill.name = names[nextIdx];
      v12.strengthenDoneToday = true;
      audio.playQiCharge();
      if (!st.flags.customSkillEstablished) {
        setTimeout(() => this.triggerStoryNodeModal("1-5"), 200);
      }
      this.renderView();
    });

    wrap.querySelectorAll("[data-mindset-id]").forEach(card => {
      card.addEventListener("click", () => {
        v12.preCombatMindset = card.getAttribute("data-mindset-id");
        audio.playQiCharge();
        this.renderView();
      });
    });
  };

  // ==================== 5. 核心系統三：〔荒〕大荒因果（有目的的行程 + 重量級抉擇 + 臨時傀儡助陣 + 弟子心境與三極宗師） ====================
  App.prototype.renderV12WildernessView = function(container) {
    const v12 = this.char.ensureV12State();
    const st = this.char.ensureStoryState();
    const banner = this.getDaotuBannerStatus();

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";

    wrap.innerHTML = `
      <div class="ink-card" style="border-left:5px solid var(--cinnabar-red);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:1.12rem; color:var(--ink-black);">🗺️ 大荒因果 · 有目的之歷練行程</b>
          <button type="button" class="btn-modern secondary" id="btn-v12-wild-daotu" style="padding:4px 10px; font-size:0.84rem;">
            📖 道途錄 (${st.completedNodes.length}/20)
          </button>
        </div>
        <div style="font-size:0.88rem; color:var(--ink-mid); margin-top:4px; line-height:1.5;">
          每次踏出洞天皆是一場有目標的求道行程。帶回的不只是靈石資源，更是決定結局走向的「因果」與「感悟」。
        </div>

        <!-- 戰中臨時召喚傀儡選擇（原傀儡系統簡化合併至此） -->
        <div style="background:#f8f3e6; border:1px solid var(--ink-border); padding:8px 10px; border-radius:2px; margin-top:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <span style="font-size:0.86rem; font-weight:800; color:var(--ink-black);">
            🤖 隨行臨時傀儡召喚：<b>${v12.tempPuppetSummon === 'vanguard' ? '【天罡青甲衛 · 護盾抗傷】' : '【神霄破空連弩 · 破甲追擊】'}</b>
          </span>
          <button type="button" class="chip-btn active" id="btn-toggle-temp-puppet">⇄ 切換助陣傀儡</button>
        </div>
      </div>

      <!-- 四大有目的的行程卡片 -->
      <div style="display:grid; grid-template-columns: 1fr; gap:8px;">
        <!-- 行程 1：推進當前主線道途節點 -->
        <div class="ink-card" style="border:1.5px solid var(--cinnabar-red);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:1.02rem; color:var(--cinnabar-red);">📜【主線行程】推進《星宿劫源》節點 (${banner.nextNodeId})</b>
            <span class="daotu-act-tag">${banner.actLabel}</span>
          </div>
          <div style="font-size:0.88rem; color:var(--ink-dark); margin:6px 0;">
            當前目標：<b>${banner.statusText}</b>
          </div>
          <button type="button" class="btn-jade" id="btn-expedition-story" style="width:100%;">
            <span class="main-label">🧭 啟程履踐主線道途 (免耗道心)</span>
          </button>
        </div>

        <!-- 行程 2：大荒因果抉擇行程（1~2個有長期後果的選擇） -->
        <div class="ink-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:1.02rem; color:var(--ink-black);">⚖️【因果行程】大荒紅塵歷練（重量級道德與利益抉擇）</b>
            <span style="font-size:0.82rem; color:var(--stone-cyan); font-weight:800;">耗 8 道心</span>
          </div>
          <div style="font-size:0.86rem; color:var(--ink-mid); margin:6px 0;">
            踏入大荒古墟，面對救死扶傷、古修遺府、勢力紛爭或天樞奇遇（合併星槎黑市／演卦／尋龍機緣），留下深遠因果並帶回感悟。
          </div>
          <button type="button" class="btn-modern gold" id="btn-expedition-karma" style="width:100%; padding:10px;">
            ☯️ 踏入大荒 · 面對因果抉擇 (獲感悟點 + 因果印記)
          </button>
        </div>

        <!-- 行程 3：斬妖試劍行程（預兆、合璧時機、戰鬥評價） -->
        <div class="ink-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:1.02rem; color:var(--ink-black);">⚔️【試劍行程】大荒凶靈討伐（短促高參與感鬥法）</b>
            <span style="font-size:0.82rem; color:var(--stone-cyan); font-weight:800;">耗 8 道心</span>
          </div>
          <div style="font-size:0.86rem; color:var(--ink-mid); margin:6px 0;">
            攜【${v12.preCombatMindset === 'taiji' ? '太極守心勢' : (v12.preCombatMindset === 'tiangang' ? '天罡破陣勢' : '青龍生息勢')}】與隨行傀儡迎戰身負隨機詞綴之強敵，把握手動合璧與破綻時機，依戰鬥評價領取感悟與純陽道兵！
          </div>
          <button type="button" class="btn-modern" id="btn-expedition-combat" style="width:100%; padding:10px; border-color:var(--cinnabar-red); color:var(--cinnabar-red); font-weight:900;">
            🗡️ 拔劍出征 · 迎戰大荒強敵 (獲戰鬥評價 + 感悟 + 法寶)
          </button>
        </div>

        <!-- 行程 4：道門傳承與三極宗師交遊（移除日常雜務，只保留弟子心境危機與宗師論道） -->
        <div class="ink-card">
          <div style="font-size:1.02rem; font-weight:900; color:var(--ink-black); margin-bottom:6px;">
            👑 道門傳承 · 親傳弟子心境與三極宗師論道
          </div>
          <div style="font-size:0.85rem; color:var(--ink-mid); margin-bottom:8px;">
            已摒棄繁瑣宗門日常跑腿與收稅；專注於親傳弟子的心境危機點撥（主線 2-4）與三極宗師（劍尊／仙妃／丹祖）之道途交鋒。
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
            <button type="button" class="btn-modern gold" id="btn-wild-disciple-crisis">
              🔴 弟子心境點撥與傳承
            </button>
            <button type="button" class="btn-modern secondary" id="btn-wild-npc-masters">
              🍵 拜會三極宗師論道
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#btn-v12-wild-daotu")?.addEventListener("click", () => this.openDaotuJournalModal());
    wrap.querySelector("#btn-toggle-temp-puppet")?.addEventListener("click", () => {
      v12.tempPuppetSummon = v12.tempPuppetSummon === "vanguard" ? "arbalest" : "vanguard";
      audio.playQiCharge();
      this.renderView();
    });
    wrap.querySelector("#btn-expedition-story")?.addEventListener("click", () => {
      v12.expeditionDoneToday = true;
      this.triggerStoryNodeModal(banner.nextNodeId);
    });
    wrap.querySelector("#btn-expedition-karma")?.addEventListener("click", () => {
      if (!this.trySpendDaoHeart(8, "大荒因果行程")) return;
      v12.expeditionDoneToday = true;
      if (!st.completedNodes.includes("1-2")) {
        this.completeStoryNode("1-2", "初入大荒", "首次踏足大荒古墟，感受到亂世爭渡氣息。");
      }
      this.openV12KarmaExpeditionModal();
    });
    wrap.querySelector("#btn-expedition-combat")?.addEventListener("click", () => {
      if (!this.trySpendDaoHeart(8, "大荒試劍行程")) return;
      v12.expeditionDoneToday = true;
      if (!st.completedNodes.includes("1-2")) {
        this.completeStoryNode("1-2", "初入大荒", "首次踏足大荒古墟，以手中道兵試劍天下。");
      }
      const map = MAPS_DATA[Math.min(MAPS_DATA.length - 1, Math.floor(this.char.realmIndex / 2))] || MAPS_DATA[0];
      const combatNode = map.nodes.find(n => n.type === "combat") || map.nodes[0];
      this.launchCombat(combatNode.enemy || { name: "大荒裂谷狂魔", hp: 2200, atk: 185, def: 65, expReward: 680, silverReward: 360 });
    });
    wrap.querySelector("#btn-wild-disciple-crisis")?.addEventListener("click", () => {
      v12.expeditionDoneToday = true;
      if (!st.completedNodes.includes("2-7")) {
        st.flags.sectFounded = true;
        this.completeStoryNode("2-7", "自立太初道門", "於大荒靈脈開山立鼎，廣收親傳門徒。");
      }
      this.openDiscipleEventModal(0);
    });
    wrap.querySelector("#btn-wild-npc-masters")?.addEventListener("click", () => {
      v12.expeditionDoneToday = true;
      this.openNpcAffectionModal();
    });
  };

  // 大荒因果重量級抉擇事件池（整合第一幕傷修、第二幕表明立場、以及原演卦/商路/尋龍機緣）
  App.prototype.openV12KarmaExpeditionModal = function() {
    const st = this.char.ensureStoryState();
    const fl = st.flags;

    // 優先導引未完成的主線因果抉擇（1-3 傷修 或 2-6 表明立場）
    if (!fl.firstKarma) {
      this.triggerStoryNodeModal("1-3");
      return;
    }
    if (st.act >= 2 && !fl.stance) {
      this.triggerStoryNodeModal("2-6");
      return;
    }

    const events = [
      {
        title: "🌌〔大荒因果 · 古修坐化遺塚與星槎黑市〕",
        desc: "你循紫微星象與尋龍羅盤感應，在斷崖深處發現一座上古修士遺塚；同時間，天樞星槎黑市商船正於崖外停泊收購古寶。遺塚石碑刻有禁制，強行破陣恐引動怨靈反噬，你當如何抉擇？",
        c1: { label: "① 恭敬祭拜古修並以神念參悟碑文（穩健正道）", effect: () => {
          this.char.wudaoPoints = (this.char.wudaoPoints || 0) + 1;
          this.char.exp += 950;
          this.char.karmaLogs.unshift("【古塚參碑】恭敬祭拜坐化古修，道心澄明獲感悟 +1、元氣 +950。");
          return "古修殘念欣慰頷首，化作一道醍醐靈光沒入你眉心（感悟點 +1、元氣 +950）！";
        }},
        c2: { label: "② 催動本命神通強行破禁，將陪葬古寶轉賣星槎黑市（行險奪利）", effect: () => {
          this.char.silver += 880;
          this.char.heartDemon = (this.char.heartDemon || 0) + 2;
          const loot = this.rollRandomizedLoot();
          this.char.karmaLogs.unshift(`【破禁奪寶】強破古塚售予星槎黑市，獲 880 靈石與【${loot.name}】，心魔 +2。`);
          return `你一劍劈開古塚禁制，雖沾染一絲煞氣（心魔 +2），卻從黑市換回 880 靈石與法寶【${loot.name}】！`;
        }}
      },
      {
        title: "⚖️〔大荒因果 · 邊陲凡人城池魔潮之危〕",
        desc: "前方凡人邊城遭太荒血魔圍困，城中並無高階靈石可作酬勞，但城頭有一塊染血的【太初古神雲篆殘碑】。若出手相救將損耗自身真元，你如何抉擇？",
        c1: { label: "① 拔劍鎮守孤城，斬滅血魔護佑萬民（入世善因）", effect: () => {
          this.char.qi = Math.max(0, this.char.qi - 80);
          this.char.wudaoPoints = (this.char.wudaoPoints || 0) + 2;
          this.char.heartDemon = Math.max(0, (this.char.heartDemon || 0) - 3);
          this.char.karmaLogs.unshift("【孤城斬魔】不計酬勞護佑邊城萬民，心魔滌盪 -3，並自雲篆殘碑參悟 +2 感悟點！");
          return "萬民叩首謝恩，那塊太初古神雲篆殘碑感應你的浩然劍意，自動浮現大道真解（感悟點 +2、心魔 -3）！";
        }},
        c2: { label: "② 趁血魔攻城混亂之際，直接攝走雲篆殘碑與魔核遠遁（超然牟利）", effect: () => {
          this.char.exp += 1450;
          this.char.silver += 620;
          this.char.heartDemon = (this.char.heartDemon || 0) + 3;
          this.char.karmaLogs.unshift("【亂中取碑】於孤城血戰中徑取殘碑與魔核離去，元氣 +1450、靈石 +620、心魔 +3。");
          return "你袖手掠走殘碑與魔核，修為暴漲（元氣 +1450、靈石 +620），然耳畔隱約迴盪孤城嘆息（心魔 +3）。";
        }}
      }
    ];
    const ev = events[Math.floor(Math.random() * events.length)];

    this.openV11InteractiveModal(ev.title, `
      <div style="background:#fbf8f0; border:1.5px solid var(--ink-border); padding:12px; margin-bottom:12px; font-size:0.95rem; color:var(--ink-black); line-height:1.65;">
        ${ev.desc}
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <button type="button" class="btn-jade" id="btn-v12-karma-c1">
          <span class="main-label">${ev.c1.label}</span>
        </button>
        <button type="button" class="btn-modern" id="btn-v12-karma-c2" style="padding:11px; border-color:var(--cinnabar-red); color:var(--cinnabar-red); font-weight:900;">
          ${ev.c2.label}
        </button>
      </div>
    `, (ov) => {
      ov.querySelector("#btn-v12-karma-c1")?.addEventListener("click", () => {
        const resMsg = ev.c1.effect();
        audio.playEpiphanyBell();
        this.updateHeader();
        this.renderView();
        this.openV11InteractiveModal("📜〔因果已記 · 道途回響〕", `
          <div style="font-size:0.98rem; color:var(--ink-black); line-height:1.65; padding:8px;">${resMsg}</div>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:10px;">
            <span class="main-label">〔收卷歸山〕</span>
          </button>
        `);
      });
      ov.querySelector("#btn-v12-karma-c2")?.addEventListener("click", () => {
        const resMsg = ev.c2.effect();
        audio.playSwordClash();
        this.updateHeader();
        this.renderView();
        this.openV11InteractiveModal("📜〔因果已記 · 道途回響〕", `
          <div style="font-size:0.98rem; color:var(--ink-black); line-height:1.65; padding:8px;">${resMsg}</div>
          <button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:10px;">
            <span class="main-label">〔收卷歸山〕</span>
          </button>
        `);
      });
    });
  };

  // ==================== 6. 核心系統四：〔基〕道基鍛造（氣脈剛柔 + 霸王軀淬體 + 裝備器靈 + 自動丹房與偶爾高品質機會） ====================
  App.prototype.renderV12FoundationView = function(container) {
    const v12 = this.char.ensureV12State();
    if (!v12.foundationTab) v12.foundationTab = "meridian";

    const headerCard = document.createElement("div");
    headerCard.className = "ink-card";
    headerCard.style.marginBottom = "10px";
    headerCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <b style="font-size:1.1rem; color:var(--ink-black);">🛠️ 道基鍛造（輔修支撐：氣脈 · 器靈 · 自動丹房）</b>
        <span style="font-size:0.82rem; color:var(--stone-cyan); font-weight:800;">強化根基以承載更高入定與神通</span>
      </div>

      <!-- 2.2 歲漏自動丹房 + 偶爾高品質開爐機會 -->
      <div style="background:#fbf8f0; border:1.5px solid var(--pine-green); padding:10px; border-radius:2px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
          <div>
            <b style="font-size:0.95rem; color:var(--pine-green);">🌿 歲漏自動丹房（自動產丹進度：${v12.autoPillProgress}%）</b>
            <div style="font-size:0.83rem; color:var(--ink-mid); margin-top:2px;">
              隨周天吐納與時辰流轉自動凝結基礎靈丹；當爐火靈韻匯聚時可親手把握【天爐高品質開丹】機會！
            </div>
          </div>
          <button type="button" class="btn-modern gold" id="btn-v12-high-alchemy" style="padding:6px 12px; font-size:0.86rem;">
            🔥 ${v12.highQualityAlchemyReady ? '天爐開丹 (極品機會！)' : '催火凝丹 (耗80靈石)'}
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
        <button type="button" class="btn-modern ${v12.foundationTab === 'meridian' ? 'gold' : 'secondary'}" id="btn-fd-tab-meridian">
          脈 · 五極氣脈與霸王軀
        </button>
        <button type="button" class="btn-modern ${v12.foundationTab === 'inventory' ? 'gold' : 'secondary'}" id="btn-fd-tab-inventory">
          器 · 本命道兵與器靈納戒
        </button>
      </div>
    `;
    container.appendChild(headerCard);

    headerCard.querySelector("#btn-fd-tab-meridian")?.addEventListener("click", () => {
      v12.foundationTab = "meridian";
      v12.strengthenDoneToday = true;
      this.renderView();
    });
    headerCard.querySelector("#btn-fd-tab-inventory")?.addEventListener("click", () => {
      v12.foundationTab = "inventory";
      v12.strengthenDoneToday = true;
      this.renderView();
    });
    headerCard.querySelector("#btn-v12-high-alchemy")?.addEventListener("click", () => {
      if (!v12.highQualityAlchemyReady) {
        if (this.char.silver < 80) {
          this.openV11InteractiveModal("🪙〔靈石不足〕", `<p>催動天爐需消耗 80 靈石。</p><button type="button" class="btn-jade" data-close-v11-modal="1" style="width:100%; margin-top:10px;"><span class="main-label">〔知曉〕</span></button>`);
          return;
        }
        this.char.silver -= 80;
      }
      v12.highQualityAlchemyReady = false;
      v12.strengthenDoneToday = true;
      const rec = ALCHEMY_RECIPES_DATA[Math.min(ALCHEMY_RECIPES_DATA.length - 1, Math.floor(this.char.realmIndex / 2))] || ALCHEMY_RECIPES_DATA[0];
      this.openFireControlMiniGame(rec);
    });

    const subSlot = document.createElement("div");
    container.appendChild(subSlot);
    if (v12.foundationTab === "meridian") {
      this.renderMeridianView(subSlot);
    } else {
      this.renderInventoryView(subSlot);
    }
  };

  // ==================== 7. 核心系統五：〔劫〕劫源終局（守境 · 心魔殿 · 逆天改命 · 最終抉擇 · 道途錄） ====================
  App.prototype.renderV12EndgameView = function(container) {
    const st = this.char.ensureStoryState();
    const fl = st.flags;
    const w = this.char.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
    const totalWudao = (w.sword || 0) + (w.pill || 0) + (w.formation || 0) + (w.body || 0);
    const canRewrite = fl.gaimingDone || totalWudao >= 4;

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";
    wrap.innerHTML = `
      <div class="ink-card" style="border:2px solid var(--cinnabar-red); background:linear-gradient(180deg, #fcf8f0 0%, #eadfce 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:1.18rem; color:var(--cinnabar-red);">🌌 劫源終局 · 證道與逆天抉擇</b>
          <span class="daotu-act-tag">第三幕終局</span>
        </div>
        <div style="font-size:0.9rem; color:var(--ink-black); margin-top:6px; line-height:1.6;">
          星宿劫源乃上古道主剝離之萬界因果業力。你從凡塵一路走來的每一次入定、每一道因果、每一次立場抉擇，皆在此刻匯聚為最終道果。
        </div>
        <div style="background:rgba(255,252,245,0.92); border:1px solid var(--ink-border); padding:8px 10px; border-radius:2px; margin-top:8px; font-size:0.86rem; color:var(--ink-dark); line-height:1.6;">
          • <b>第一幕因果：</b>${fl.firstKarma || '待確立'} ｜ <b>第二幕立場：</b>${fl.stance || '待表明'}<br/>
          • <b>守境試煉：</b>${fl.shoujingTrialDone ? '✔ 已完成' : '待挑戰'} ｜ <b>心魔殿試煉：</b>${fl.xinmoTrialDone ? '✔ 已完成' : '待挑戰'}<br/>
          • <b>逆天改命：</b>${fl.gaimingDone ? '✔ 已改寫宿命因果' : '未改命'} ｜ <b>當前結局稱號：</b><b style="color:var(--cinnabar-red);">${fl.endingTitle || '尚未結算'}</b>
        </div>
      </div>

      <!-- 終局三大試煉卡片 -->
      <div class="ink-card">
        <b style="font-size:1.02rem; color:var(--ink-black);">⚔️ 第一重終局試煉：心魔殿與守境挑戰（主線 3-2 / 3-3）</b>
        <div style="font-size:0.86rem; color:var(--ink-mid); margin:6px 0;">
          心魔形態將依你第二幕的立場（${fl.stance || '未定'}）與四向悟道（總計 ${totalWudao} 層）動態幻化，不再只是單純數值比拼。
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
          <button type="button" class="btn-modern gold" id="btn-endgame-xinmo">
            😈 踏入心魔殿 (第 ${(this.char.xinmoFloor || 1)} 層)
          </button>
          <button type="button" class="btn-modern gold" id="btn-endgame-shoujing">
            🛡️ 守境 · 道心對決 (已勝 ${this.char.shoujingWins || 0} 次)
          </button>
        </div>
      </div>

      <div class="ink-card">
        <b style="font-size:1.02rem; color:var(--ink-black);">⚡ 第二重終局試煉：逆天改命（主線 3-4 · 改寫與劫源因果）</b>
        <div style="font-size:0.86rem; color:var(--ink-mid); margin:6px 0;">
          逆流時光重渡 135% 威能之天劫，不僅永久提升全屬性 +3%，更是解鎖最終結局【③ 融合／改寫天道規則】的關鍵鎖鑰！
        </div>
        <button type="button" class="btn-modern" id="btn-endgame-gaiming" style="width:100%; padding:10px; border-color:var(--stone-cyan); color:var(--stone-cyan); font-weight:900;">
          ⚡ 催動歲漏玉鑑 · 逆天改命 (${fl.gaimingDone ? '已完成改命 · 可再次淬煉' : '首次改命觸發 3-4 真義卷軸'})
        </button>
      </div>

      <div class="ink-card" style="border:2px solid var(--cinnabar-red);">
        <b style="font-size:1.06rem; color:var(--cinnabar-red);">👑 最終抉擇：直面星宿劫源（主線 3-5 / 3-6）</b>
        <div style="font-size:0.86rem; color:var(--ink-dark); margin:6px 0;">
          在「① 守護萬界」、「② 超脫離去」與「③ 嘗試融合／改寫（${canRewrite ? '已解鎖' : '需逆天改命或四向感悟≥4'}）」中做出最終抉擇，結算你的專屬道主結局！
        </div>
        <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:8px;">
          <button type="button" class="btn-jade" id="btn-endgame-final-choice">
            <span class="main-label">🌌 開啟最終抉擇卷軸</span>
            <span class="sub-label">結算四大結局與道主稱號</span>
          </button>
          <button type="button" class="btn-modern secondary" id="btn-endgame-daotu-log">
            📖 翻閱完整道途錄 (${st.completedNodes.length}/20)
          </button>
        </div>
      </div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#btn-endgame-xinmo")?.addEventListener("click", () => {
      fl.xinmoTrialDone = true;
      const stanceDesc = fl.stance === "立場_超然" ? "太虛孤寂心魔" : "萬民執念心魔";
      this.completeStoryNode("3-2", `斬滅【${stanceDesc}】`, `於心魔殿擊破依自身立場幻化之【${stanceDesc}】！`);
      this.char.xinmoFloor = (this.char.xinmoFloor || 1) + 5;
      this.launchCombat({
        name: `心魔殿 · ${stanceDesc}`,
        hp: Math.floor(this.char.getEffectiveStat("hp") * 0.95),
        atk: Math.floor(this.char.getEffectiveStat("atk") * 0.88),
        def: Math.floor(this.char.getEffectiveStat("def") * 0.8),
        expReward: 2400,
        silverReward: 600
      });
    });

    wrap.querySelector("#btn-endgame-shoujing")?.addEventListener("click", () => {
      fl.shoujingTrialDone = true;
      this.completeStoryNode("3-3", "完成守境挑戰", "於守境挑戰中印證道心不移！");
      this.char.shoujingWins = (this.char.shoujingWins || 0) + 1;
      this.launchCombat({
        name: `守境道影 · ${this.char.name}`,
        hp: Math.floor(this.char.getEffectiveStat("hp") * 1.05),
        atk: Math.floor(this.char.getEffectiveStat("atk") * 0.92),
        def: Math.floor(this.char.getEffectiveStat("def") * 0.85),
        expReward: 2800,
        silverReward: 800
      });
    });

    wrap.querySelector("#btn-endgame-gaiming")?.addEventListener("click", () => {
      this.openTribulationMiniGameModal(0, "逆天改命 · 宿命重演", true, "太初宿命劫");
    });

    wrap.querySelector("#btn-endgame-final-choice")?.addEventListener("click", () => {
      this.triggerStoryNodeModal("3-5");
    });

    wrap.querySelector("#btn-endgame-daotu-log")?.addEventListener("click", () => {
      this.openDaotuJournalModal();
    });
  };

  

  // ====================================================================================================
  // 《星宿劫源：太初道主》v13.0 超級洗腦上頭重製版（4大洗腦核心引擎：天命乘算輪盤 × 開鼎爆裝 × 萬劍割草 × 二合一合成）
  // ====================================================================================================

  // 1. 定義天命輪盤符號庫（Balatro × 幸運房東式乘算共鳴）
  const V13_WHEEL_SYMBOLS = [
    { id: "sym_sword", icon: "🗡️", name: "太乙劍印", baseExp: 180, mult: 1.5, weight: 26, desc: "劍氣縱橫，每枚提供 ×1.5 劍道倍率" },
    { id: "sym_thunder", icon: "⚡", name: "紫極雷印", baseExp: 220, mult: 1.8, weight: 22, desc: "天劫雷威，連線時引動 ×1.8 雷暴倍率" },
    { id: "sym_fire", icon: "🔥", name: "混沌火蓮", baseExp: 260, mult: 2.2, weight: 18, desc: "焚天烈焰，大幅拉升 ×2.2 焚魂倍率" },
    { id: "sym_hammer", icon: "🔨", name: "造化神錘", baseExp: 150, mult: 1.4, hammerDrop: 2, weight: 18, desc: "直接掉落 +2 把【造化開鼎神錘】！" },
    { id: "sym_pill", icon: "💊", name: "九轉金丹", baseExp: 350, mult: 2.5, qiDrop: 180, weight: 10, desc: "丹香四溢，額外爆出 +180 真元與 ×2.5 倍率" },
    { id: "sym_taichu", icon: "🌌", name: "太初道果", baseExp: 800, mult: 5.0, hammerDrop: 5, wudaoDrop: 1, weight: 6, desc: "【神話大獎】倍率直接 ×5.0，掉 5 錘 + 1 感悟！" }
  ];

  // 小丑牌式「本命道印卡 (Dao Jokers)」（隨合成與破境自動解鎖，提供指數級乘算快感）
  const V13_DAO_JOKERS = [
    { id: "joker_sword", icon: "🗡️", name: "萬劍歸宗印", rule: "盤面每有 1 枚🗡️劍印，總倍率額外 ×1.35", minMergeTier: 1 },
    { id: "joker_hammer", icon: "🔨", name: "天工開物印", rule: "每次轉輪保底獲 +1 神錘；轉出🔨時神錘翻倍", minMergeTier: 2 },
    { id: "joker_hebi", icon: "☯️", name: "雷火合璧印", rule: "同時轉出⚡雷印與🔥火蓮時，總倍率直接 ×3.0！", minMergeTier: 3 },
    { id: "joker_taichu", icon: "👑", name: "太初天命印", rule: "所有三連共鳴額外 ×2.5 倍，且自動觸發大周天爆擊", minMergeTier: 4 }
  ];

  // 開鼎煉寶 7 階品質與閃光詞條池（《尋道大千》式無限開箱比裝）
  const V13_RARITY_TIERS = [
    { tier: 1, name: "凡鐵", color: "#575249", bg: "#f4efe4", mult: 1.0, weight: 28 },
    { tier: 2, name: "靈階", color: "#2d5442", bg: "#e8f4ec", mult: 1.35, weight: 25 },
    { tier: 3, name: "玄階", color: "#235363", bg: "#e6f0f5", mult: 1.85, weight: 20 },
    { tier: 4, name: "純陽", color: "#6b2d82", bg: "#f3e8f7", mult: 2.60, weight: 13 },
    { tier: 5, name: "造化仙品", color: "#b8621b", bg: "#fff0e0", mult: 3.80, weight: 8 },
    { tier: 6, name: "鴻蒙聖器", color: "#a32c22", bg: "#ffe8e5", mult: 5.50, weight: 4 },
    { tier: 7, name: "🌈太初神話", color: "#d42269", bg: "#fff5d6", mult: 8.80, weight: 2, isMythic: true }
  ];

  const V13_FORGE_SLOTS = [
    { slot: "weapon", icon: "🗡️", names: ["太乙分光劍", "赤霄斬魔刀", "紫微破界槍", "太古戮神戈", "鴻蒙開天劍"] },
    { slot: "armor", icon: "🛡️", names: ["流雲護道袍", "紫金蛟鱗甲", "玄武鎮嶽鎧", "萬劫修羅甲", "太初青蓮衣"] },
    { slot: "accessory", icon: "🔮", names: ["清心辟塵佩", "定海避劫珠", "九曜周天盤", "造化乾坤印", "太初歲漏鑑"] }
  ];

  const V13_SPECIAL_TRAITS = [
    { id: "combo", name: "⚡ 連擊流", statLabel: "連擊率", min: 12, max: 45, desc: "出手時高機率追加二段飛劍連斬" },
    { id: "crit", name: "💥 暴擊流", statLabel: "會心暴傷", min: 25, max: 85, desc: "刀刀烈火，暴擊傷害大幅飆升" },
    { id: "stun", name: "💫 擊暈流", statLabel: "擊暈率", min: 10, max: 38, desc: "天雷震懾，令敵手麻痹無法出招" },
    { id: "vamp", name: "🩸 吞天吸血", statLabel: "吸血率", min: 12, max: 40, desc: "以戰養戰，造成傷害轉化為自身氣血" }
  ];

  // 九宮八卦二合一合成神物階位 (Lv.1 ~ Lv.10)
  const V13_MERGE_ITEMS = [
    { lv: 1, icon: "🪨", name: "混沌靈胎", multBonus: 0.05 },
    { lv: 2, icon: "🗡️", name: "青鋒劍胚", multBonus: 0.12 },
    { lv: 3, icon: "🔥", name: "碧髓火種", multBonus: 0.25 },
    { lv: 4, icon: "⚡", name: "紫極雷核", multBonus: 0.45 },
    { lv: 5, icon: "🪷", name: "煞滅火蓮", multBonus: 0.75 },
    { lv: 6, icon: "🌟", name: "九曜星盤", multBonus: 1.20 },
    { lv: 7, icon: "🐉", name: "太古龍魂", multBonus: 1.85 },
    { lv: 8, icon: "⏳", name: "歲漏仙鑑", multBonus: 2.80 },
    { lv: 9, icon: "☯️", name: "乾坤道果", multBonus: 4.50 },
    { lv: 10, icon: "👑", name: "太初誅仙劍陣", multBonus: 8.00 }
  ];

  Character.prototype.ensureV13AddictiveState = function() {
    this.ensureV12State();
    this.ensureStoryState();
    if (!this.v13) {
      this.v13 = {
        // 1. 天命乘算輪盤狀態
        wheelGrid: [
          "sym_sword", "sym_sword", "sym_sword",
          "sym_thunder", "sym_taichu", "sym_fire",
          "sym_hammer", "sym_pill", "sym_sword"
        ],
        lastBaseScore: 540,
        lastMultScore: 6.8,
        lastTotalGain: 3672,
        lastComboLines: ["🔥 橫排三連【太乙劍印】×3.0", "👑 太初道果加持 ×2.2"],
        totalSpins: 0,
        streakCount: 1,
        autoSpinActive: false,

        // 2. 開鼎煉寶狀態（尋道大千式）
        hammers: 35,
        cauldronLv: 1,
        cauldronExp: 0,
        totalForged: 0,
        pendingLoot: null,
        autoForgeActive: false,
        customEquips: {
          weapon: { name: "太乙分光劍", rarityTier: 3, rarityName: "玄階", color: "#235363", atk: 320, hp: 600, def: 80, traitName: "⚡ 連擊流", traitVal: 18 },
          armor: { name: "流雲護道袍", rarityTier: 2, rarityName: "靈階", color: "#2d5442", atk: 120, hp: 1450, def: 190, traitName: "🩸 吞天吸血", traitVal: 14 },
          accessory: { name: "清心辟塵佩", rarityTier: 3, rarityName: "玄階", color: "#235363", atk: 240, hp: 980, def: 110, traitName: "💥 暴擊流", traitVal: 32 }
        },

        // 3. 萬劍割草無雙狀態（吸血鬼倖存者式）
        mowingHighScore: 0,
        mowingTotalKills: 0,
        mowingSwordCount: 4,
        mowingFireLotusLv: 1,
        mowingThunderLv: 1,

        // 4. 九宮八卦二合一合成盤狀態（4x4 = 16格）
        mergeBoard: [
          3, 2, 2, 1,
          1, 1, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0
        ],
        highestMergeLv: 3,
        selectedMergeIdx: -1
      };
    }
    return this.v13;
  };

  // 將開鼎神兵與二合一合成盤倍率納入角色屬性管線
  const _v12GetEffectiveStat = Character.prototype.getEffectiveStat;
  Character.prototype.getEffectiveStat = function(stat) {
    let val = _v12GetEffectiveStat.call(this, stat);
    const v13 = this.ensureV13AddictiveState();
    const ce = v13.customEquips || {};
    ["weapon", "armor", "accessory"].forEach(slot => {
      const it = ce[slot];
      if (!it) return;
      if (stat === "atk") val += (it.atk || 0);
      if (stat === "hp") val += (it.hp || 0);
      if (stat === "def") val += (it.def || 0);
    });
    // 計算九宮八卦合成盤總乘算加成
    let mergeBonus = 0;
    (v13.mergeBoard || []).forEach(lv => {
      if (lv > 0) {
        const meta = V13_MERGE_ITEMS[Math.min(V13_MERGE_ITEMS.length - 1, lv - 1)];
        if (meta) mergeBonus += meta.multBonus;
      }
    });
    if (["atk", "hp", "def", "mp"].includes(stat)) {
      val = Math.floor(val * (1 + mergeBonus));
    }
    return val;
  };

  // 重構底部 5 大核心導航標籤，直指 4 大洗腦引擎 + 終局道途
  App.prototype.setupV12FiveCoreNavigation = function() {
    const dock = document.querySelector("nav.modern-dock");
    if (!dock) return;
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const isEndgameLit = (this.char.realmIndex >= 6 || st.act >= 3);

    dock.innerHTML = `
      <button class="dock-tab ${this.currentView === 'main' ? 'active' : ''}" data-view="main">
        <span class="dock-seal-icon">轉</span>
        <span>天命輪盤</span>
        <span class="dock-badge">爆分</span>
      </button>
      <button class="dock-tab ${this.currentView === 'foundation' ? 'active' : ''}" data-view="foundation">
        <span class="dock-seal-icon">鼎</span>
        <span>開鼎爆裝</span>
        <span class="dock-badge">${v13.hammers}錘</span>
      </button>
      <button class="dock-tab ${this.currentView === 'map' ? 'active' : ''}" data-view="map">
        <span class="dock-seal-icon">割</span>
        <span>萬劍割草</span>
        <span class="dock-badge">爽殺</span>
      </button>
      <button class="dock-tab ${this.currentView === 'kungfu' ? 'active' : ''}" data-view="kungfu">
        <span class="dock-seal-icon">合</span>
        <span>八卦合道</span>
        <span class="dock-badge">二合一</span>
      </button>
      <button class="dock-tab ${this.currentView === 'endgame' ? 'active' : ''} ${isEndgameLit ? 'endgame-lit' : ''}" data-view="endgame">
        <span class="dock-seal-icon">劫</span>
        <span>道途終局</span>
        <span class="dock-badge">${st.completedNodes.length}/20</span>
      </button>
    `;

    dock.querySelectorAll(".dock-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        this.stopV13MowingLoop();
        this.currentView = view;
        audio.playQiCharge();
        this.renderView();
      });
    });
  };

  // ==================== 引擎一：〔轉〕太初天命輪盤（小丑牌 Balatro 式萬倍乘算拉霸 + 渡劫破境） ====================
  App.prototype.renderV12DongtianView = function(container) {
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    this.checkStoryActTransitions();
    const banner = this.getDaotuBannerStatus();
    const realms = ["凝魄境", "洞天境", "道胎境", "神藏境", "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"];
    const curRealmName = realms[this.char.realmIndex] || "太初道主";
    const reqBase = [350, 1400, 4500, 13500, 38000, 95000, 240000, 550000, 1600000][this.char.realmIndex] || 1600000;
    const reqExp = Math.floor(reqBase * Math.pow(1.35, (this.char.realmLayer || 1) - 1));
    const expPct = Math.min(100, Math.floor((this.char.exp / reqExp) * 100));
    const canBreak = this.char.exp >= reqExp;

    // 頂部常駐主線道途條
    const daotuBar = document.createElement("div");
    daotuBar.className = "daotu-persistent-bar hide-in-zen";
    daotuBar.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:2px; flex:1;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span class="daotu-act-tag">${banner.actLabel}</span>
          <span class="daotu-status-text">${banner.statusText}</span>
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button type="button" class="btn-modern gold" id="btn-v13-story-step" style="padding:5px 10px; font-size:0.84rem;">
          🧭 主線 (${banner.nextNodeId})
        </button>
        <button type="button" class="btn-modern secondary" id="btn-v13-daotu-log" style="padding:5px 10px; font-size:0.84rem;">
          📖 道途錄 (${st.completedNodes.length}/20)
        </button>
      </div>
    `;
    container.appendChild(daotuBar);
    daotuBar.querySelector("#btn-v13-story-step")?.addEventListener("click", () => this.triggerStoryNodeModal(banner.nextNodeId));
    daotuBar.querySelector("#btn-v13-daotu-log")?.addEventListener("click", () => this.openDaotuJournalModal());

    // 境界進度與一鍵渡劫條
    const realmStrip = document.createElement("div");
    realmStrip.className = "ink-card";
    realmStrip.style.cssText = "padding:10px 12px; margin-bottom:10px; border-left:5px solid var(--cinnabar-red);";
    realmStrip.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:1.08rem; color:var(--ink-black);">【${curRealmName} · 第 ${this.char.realmLayer} 重天】</b>
            <span style="font-size:0.86rem; font-weight:900; color:${canBreak ? 'var(--cinnabar-red)' : 'var(--stone-cyan)'};">
              元氣 ${this.char.exp.toLocaleString()} / ${reqExp.toLocaleString()} (${expPct}%)
            </span>
          </div>
          <div style="height:10px; background:rgba(34,32,28,0.14); border-radius:2px; overflow:hidden; margin-top:5px; border:1px solid rgba(34,32,28,0.3);">
            <div style="width:${expPct}%; height:100%; background:${canBreak ? 'var(--cinnabar-red)' : 'var(--stone-cyan)'}; transition:width 0.25s ease;"></div>
          </div>
        </div>
        <button type="button" class="btn-jade" id="btn-v13-breakthrough" style="padding:8px 14px; min-width:132px; border-color:${canBreak ? 'var(--cinnabar-red)' : 'var(--ink-border)'};">
          <span class="main-label" style="font-size:1.0rem; color:${canBreak ? 'var(--cinnabar-red)' : 'var(--ink-black)'};">
            ⚡ ${canBreak ? '立即渡劫破境！' : '引劫破境'}
          </span>
          <span class="sub-label">${canBreak ? '元氣已滿 · 戰力質變' : '轉動輪盤秒滿元氣'}</span>
        </button>
      </div>
    `;
    container.appendChild(realmStrip);

    realmStrip.querySelector("#btn-v13-breakthrough")?.addEventListener("click", () => {
      if (this.char.exp < reqExp) {
        this.spinV13DestinyWheel();
        return;
      }
      this.performBreakthrough(reqExp, realms[Math.min(8, this.char.realmIndex + 1)]);
    });

    // 核心洗腦引擎一：3×3【太初天命輪盤 · 小丑牌式萬倍乘算】
    const slotCard = document.createElement("div");
    slotCard.className = "v13-slot-machine-card";

    const cellsHtml = v13.wheelGrid.map((symId, idx) => {
      const sym = V13_WHEEL_SYMBOLS.find(s => s.id === symId) || V13_WHEEL_SYMBOLS[0];
      const isWin = (v13.winningIndices || []).includes(idx);
      return `
        <div class="v13-slot-cell ${isWin ? 'winning-cell' : ''}" data-slot-idx="${idx}">
          <div style="font-size:1.85rem; line-height:1.1;">${sym.icon}</div>
          <div style="font-size:0.82rem; color:var(--ink-black); margin-top:2px;">${sym.name}</div>
          <div style="font-size:0.72rem; color:var(--cinnabar-red); font-weight:800;">×${sym.mult.toFixed(1)}</div>
        </div>
      `;
    }).join("");

    const jokersHtml = V13_DAO_JOKERS.map(jk => {
      const unlocked = (v13.highestMergeLv || 1) >= jk.minMergeTier;
      return `
        <div class="v13-joker-card ${unlocked ? 'triggered' : ''}" style="opacity:${unlocked ? '1' : '0.45'};" title="${jk.rule}">
          <div style="font-size:1.15rem;">${jk.icon}</div>
          <div style="font-weight:900; color:#ffd27d;">${jk.name}</div>
          <div style="font-size:0.68rem; color:#d8ceb8; margin-top:2px;">${unlocked ? '● 已生效' : `合道Lv.${jk.minMergeTier}解鎖`}</div>
        </div>
      `;
    }).join("");

    slotCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div>
          <b style="font-size:1.12rem; color:var(--ink-black);">🎰 太初天命輪盤（萬倍乘算吐納）</b>
          <span style="font-size:0.8rem; color:var(--cinnabar-red); font-weight:900; margin-left:6px;">連轉熱度 ×${(1 + Math.min(10, v13.streakCount) * 0.15).toFixed(2)}</span>
        </div>
        <span style="font-size:0.84rem; font-weight:900; color:var(--stone-cyan);">🔨 神錘庫存：${v13.hammers}</span>
      </div>

      <!-- 頂部 4 張小丑牌式「本命道印倍率卡」 -->
      <div class="v13-joker-bar">${jokersHtml}</div>

      <!-- 3×3 星宿輪盤網格 -->
      <div class="v13-slot-grid" id="v13-slot-grid-box">
        ${cellsHtml}
      </div>

      <!-- Balatro 式「底數 × 倍率 = 總爆發」計分板 -->
      <div class="v13-balatro-score-strip">
        <div>
          <div style="font-size:0.7rem; color:#b8b0a0; text-align:center;">周天底數</div>
          <div class="v13-score-chip" id="v13-chip-val">${v13.lastBaseScore.toLocaleString()}</div>
        </div>
        <div style="font-size:1.3rem; font-weight:900; color:#ff5733;">×</div>
        <div>
          <div style="font-size:0.7rem; color:#b8b0a0; text-align:center;">共鳴倍率</div>
          <div class="v13-score-mult" id="v13-mult-val">×${v13.lastMultScore.toFixed(1)}</div>
        </div>
        <div style="font-size:1.3rem; font-weight:900; color:#ffd27d;">＝</div>
        <div>
          <div style="font-size:0.7rem; color:#ffd27d; text-align:center;">本次爆發元氣</div>
          <div class="v13-score-total" id="v13-total-val">+${v13.lastTotalGain.toLocaleString()}</div>
        </div>
      </div>

      <!-- 共鳴連線播報 -->
      <div style="background:rgba(255,252,244,0.94); border:1px solid var(--ink-border); border-radius:3px; padding:6px 10px; margin-bottom:10px; min-height:34px; font-size:0.84rem; font-weight:800; color:var(--cinnabar-red); text-align:center;">
        ${(v13.lastComboLines && v13.lastComboLines.length > 0) ? v13.lastComboLines.join(" ｜ ") : "✨ 點擊下方按鈕轉動天命，湊齊三連或道果即觸發萬倍元氣與神錘噴發！"}
      </div>

      <!-- 操作按鈕列：零體力卡死、越轉越爽 -->
      <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:8px;">
        <button type="button" class="btn-jade" id="btn-v13-spin-once" style="padding:12px;">
          <span class="main-label" style="font-size:1.16rem;">🎰 運轉天命輪盤 (免費狂轉！)</span>
          <span class="sub-label">每次必爆元氣 + 機率掉【🔨造化神錘】與【✨四向頓悟】</span>
        </button>
        <button type="button" class="btn-jade" id="btn-v13-spin-burst" style="padding:12px; border-color:var(--cinnabar-red);">
          <span class="main-label" style="font-size:1.08rem; color:var(--cinnabar-red);">🔥 五連狂轉 (×5倍速)</span>
          <span class="sub-label">保底觸發三連大獎 + 送神錘</span>
        </button>
      </div>

      <!-- 三大上頭玩法秒切捷徑 -->
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px; margin-top:10px;">
        <button type="button" class="btn-modern gold" id="btn-quick-go-forge" style="font-size:0.84rem; padding:8px 4px;">
          🔨 去開鼎爆裝 (${v13.hammers}錘)
        </button>
        <button type="button" class="btn-modern" id="btn-quick-go-mow" style="font-size:0.84rem; padding:8px 4px; border-color:var(--cinnabar-red); color:var(--cinnabar-red); font-weight:900;">
          🗡️ 萬劍割草無雙
        </button>
        <button type="button" class="btn-modern secondary" id="btn-quick-go-merge" style="font-size:0.84rem; padding:8px 4px;">
          🎒 八卦二合一 (Lv.${v13.highestMergeLv})
        </button>
      </div>
    `;
    container.appendChild(slotCard);

    slotCard.querySelector("#btn-v13-spin-once")?.addEventListener("click", (e) => {
      this.spinV13DestinyWheel(1, e.currentTarget);
    });
    slotCard.querySelector("#btn-v13-spin-burst")?.addEventListener("click", (e) => {
      this.spinV13DestinyWheel(5, e.currentTarget);
    });
    slotCard.querySelector("#btn-quick-go-forge")?.addEventListener("click", () => {
      this.currentView = "foundation";
      this.renderView();
    });
    slotCard.querySelector("#btn-quick-go-mow")?.addEventListener("click", () => {
      this.currentView = "map";
      this.renderView();
    });
    slotCard.querySelector("#btn-quick-go-merge")?.addEventListener("click", () => {
      this.currentView = "kungfu";
      this.renderView();
    });
  };

  // 執行天命輪盤旋轉與 Balatro 式乘算結算
  App.prototype.spinV13DestinyWheel = function(times = 1, btnEl = null) {
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();

    const cells = document.querySelectorAll("#v13-slot-grid-box .v13-slot-cell");
    cells.forEach(c => c.classList.add("spinning"));
    audio.playQiCharge();

    const pickWeightedSymbol = () => {
      const totalW = V13_WHEEL_SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
      let r = Math.random() * totalW;
      for (const s of V13_WHEEL_SYMBOLS) {
        if (r < s.weight) return s.id;
        r -= s.weight;
      }
      return V13_WHEEL_SYMBOLS[0].id;
    };

    setTimeout(() => {
      const newGrid = [];
      for (let i = 0; i < 9; i++) {
        newGrid.push(pickWeightedSymbol());
      }
      // 五連狂轉保底湊出一條橫排或對角三連！
      if (times >= 5 || Math.random() < 0.38) {
        const luckySym = V13_WHEEL_SYMBOLS[Math.floor(Math.random() * V13_WHEEL_SYMBOLS.length)].id;
        const lines = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];
        const chosenLine = lines[Math.floor(Math.random() * lines.length)];
        chosenLine.forEach(idx => { newGrid[idx] = luckySym; });
      }

      v13.wheelGrid = newGrid;
      v13.totalSpins += times;
      v13.streakCount = Math.min(20, (v13.streakCount || 1) + 1);

      let baseChips = 120 + this.char.realmIndex * 110;
      let mult = 1.0 + Math.min(10, v13.streakCount) * 0.15;
      let hammersGained = (v13.highestMergeLv >= 2) ? (1 * times) : 0;
      let qiGained = 45 * times;
      const comboNotes = [];
      const winIdxSet = new Set();

      // 統計各符號數量與基礎分
      const counts = {};
      newGrid.forEach((symId, idx) => {
        counts[symId] = (counts[symId] || 0) + 1;
        const sym = V13_WHEEL_SYMBOLS.find(s => s.id === symId);
        if (sym) {
          baseChips += sym.baseExp;
          if (sym.hammerDrop) {
            let h = sym.hammerDrop;
            if (v13.highestMergeLv >= 2) h *= 2; // 天工開物印翻倍
            hammersGained += h;
            winIdxSet.add(idx);
          }
          if (sym.qiDrop) qiGained += sym.qiDrop;
          if (sym.wudaoDrop) {
            this.char.wudaoPoints = (this.char.wudaoPoints || 0) + sym.wudaoDrop;
          }
        }
      });

      // 檢查 8 條三連直線（3橫、3縱、2對角）
      const checkLines = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      checkLines.forEach(line => {
        const [a, b, c] = line;
        if (newGrid[a] === newGrid[b] && newGrid[b] === newGrid[c]) {
          const sym = V13_WHEEL_SYMBOLS.find(s => s.id === newGrid[a]);
          const lineMult = (sym ? sym.mult : 1.5) * (v13.highestMergeLv >= 4 ? 2.5 : 1.6);
          mult *= lineMult;
          winIdxSet.add(a); winIdxSet.add(b); winIdxSet.add(c);
          comboNotes.push(`${sym.icon}【${sym.name}三連】×${lineMult.toFixed(1)}`);
        }
      });

      // 檢查道印小丑牌（Dao Jokers）乘算
      if (v13.highestMergeLv >= 1 && counts["sym_sword"]) {
        const swordBoost = Math.pow(1.35, counts["sym_sword"]);
        mult *= swordBoost;
        comboNotes.push(`🗡️萬劍印(${counts["sym_sword"]}枚) ×${swordBoost.toFixed(2)}`);
      }
      if (v13.highestMergeLv >= 3 && counts["sym_thunder"] && counts["sym_fire"]) {
        mult *= 3.0;
        comboNotes.push(`☯️雷火合璧印 ×3.0！`);
      }
      if (counts["sym_taichu"]) {
        mult *= 3.5;
        comboNotes.push(`🌌太初道果降臨 ×3.5！`);
      }

      const finalBase = Math.floor(baseChips * times);
      const finalGain = Math.floor(finalBase * mult);
      v13.lastBaseScore = finalBase;
      v13.lastMultScore = mult;
      v13.lastTotalGain = finalGain;
      v13.WinningIndices = Array.from(winIdxSet);
      v13.winningIndices = Array.from(winIdxSet);
      v13.lastComboLines = comboNotes.slice(0, 3);

      if (hammersGained > 0) {
        v13.hammers += hammersGained;
        comboNotes.push(`🔨 獲造化神錘 +${hammersGained}`);
      }

      this.char.exp += finalGain;
      this.char.qi += qiGained;

      if (mult >= 6) {
        audio.playLevelUp();
      } else {
        audio.playEpiphanyBell();
      }

      if (btnEl) {
        this.triggerFlyingReward(btnEl, "exp", `💥 ×${mult.toFixed(1)} 倍爆分！+${finalGain.toLocaleString()} 元氣` + (hammersGained ? ` · +${hammersGained}🔨` : ""));
      }

      // 首次轉輪推進 1-1 主線
      if (!st.completedNodes.includes("1-1")) {
        this.completeStoryNode("1-1", "運轉太初天命輪盤", "於星宿輪盤共鳴中感應劫源將至！");
      }

      this.updateHeader();
      this.renderView();
    }, 180);
  };

  // ==================== 引擎二：〔鼎〕開鼎爆裝（《尋道大千》式無限敲鼎開箱 + 綠字比裝 + 自動衝鼎） ====================
  App.prototype.renderV12FoundationView = function(container) {
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const ce = v13.customEquips;

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";

    // 計算當前造化鼎各品質掉率提示
    const mythicChance = Math.min(35, 2 + (v13.cauldronLv - 1) * 2.5).toFixed(1);

    let compareHtml = "";
    if (v13.pendingLoot) {
      const nl = v13.pendingLoot;
      const cur = ce[nl.slot] || { name: "無", rarityName: "凡品", color: "#575249", atk: 0, hp: 0, def: 0, traitName: "無", traitVal: 0 };
      const diffAtk = nl.atk - cur.atk;
      const diffHp = nl.hp - cur.hp;
      const diffDef = nl.def - cur.def;
      const fmtDiff = (d) => d > 0 ? `<span style="color:#1b7a3d; font-weight:900;">▲ +${d}</span>` : (d < 0 ? `<span style="color:#a32c22; font-weight:900;">▼ ${d}</span>` : `<span style="color:#777;">＝ 0</span>`);

      compareHtml = `
        <div class="v13-loot-compare-grid">
          <div class="v13-equip-card">
            <div style="font-size:0.76rem; color:var(--ink-mid); font-weight:800;">【當前穿戴 · ${nl.slotLabel}】</div>
            <div style="font-size:0.98rem; font-weight:900; color:${cur.color}; margin:3px 0;">[${cur.rarityName}] ${cur.name}</div>
            <div>殺力：<b>${cur.atk}</b></div>
            <div>氣血：<b>${cur.hp}</b></div>
            <div>靈罡：<b>${cur.def}</b></div>
            <div style="color:var(--stone-cyan); font-weight:800; margin-top:3px;">詞條：${cur.traitName} +${cur.traitVal}%</div>
          </div>

          <div class="v13-equip-card ${nl.isMythic ? 'mythic-rainbow' : ''}" style="border-color:${nl.color};">
            <div style="font-size:0.76rem; color:var(--cinnabar-red); font-weight:900;">✨【新出爐神兵！】</div>
            <div style="font-size:0.98rem; font-weight:900; color:${nl.color}; margin:3px 0;">[${nl.rarityName}] ${nl.name}</div>
            <div>殺力：<b>${nl.atk}</b> (${fmtDiff(diffAtk)})</div>
            <div>氣血：<b>${nl.hp}</b> (${fmtDiff(diffHp)})</div>
            <div>靈罡：<b>${nl.def}</b> (${fmtDiff(diffDef)})</div>
            <div style="color:var(--cinnabar-red); font-weight:900; margin-top:3px;">逆天詞條：${nl.traitName} +${nl.traitVal}%</div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:8px; margin-top:10px;">
          <button type="button" class="btn-jade" id="btn-v13-equip-new">
            <span class="main-label">⚡ 穿戴新神兵 (分解舊裝得元氣)</span>
          </button>
          <button type="button" class="btn-modern secondary" id="btn-v13-salvage-new">
            ♻️ 直接熔煉分解 (+${nl.salvageExp}元氣 · +1神錘)
          </button>
        </div>
      `;
    }

    wrap.innerHTML = `
      <div class="v13-cauldron-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="daotu-act-tag">尋道開鼎 · Lv.${v13.cauldronLv} 造化鼎</span>
          <span style="font-size:0.86rem; font-weight:900; color:var(--cinnabar-red);">🌈 神話紅彩裝掉率：${mythicChance}%</span>
        </div>

        <div class="v13-cauldron-icon" id="btn-v13-smash-cauldron" title="點擊狂敲造化鼎！">
          鼎
        </div>
        <div style="font-size:0.9rem; font-weight:900; color:var(--ink-black);">
          🔨 剩餘造化神錘：<span style="color:var(--cinnabar-red); font-size:1.15rem;">${v13.hammers}</span> 把（已累計開鼎 ${v13.totalForged} 次）
        </div>
        <div style="font-size:0.8rem; color:var(--ink-mid); margin-top:2px;">
          每敲 5 鼎自動升階造化鼎品階，品階越高越容易爆出【🌈太初神話】百倍神裝！
        </div>

        <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:8px; margin-top:10px;">
          <button type="button" class="btn-jade" id="btn-v13-forge-one" style="padding:11px;">
            <span class="main-label" style="font-size:1.12rem;">🔨 揮錘開鼎 ×1 (必出神兵！)</span>
            <span class="sub-label">即時比裝 · 綠字暴漲 · 分解返還神錘</span>
          </button>
          <button type="button" class="btn-jade" id="btn-v13-forge-five" style="padding:11px; border-color:var(--cinnabar-red);">
            <span class="main-label" style="font-size:1.05rem; color:var(--cinnabar-red);">🔥 狂敲五連鼎 (保底仙品/神話)</span>
            <span class="sub-label">自動篩選最高戰力神裝</span>
          </button>
        </div>

        ${compareHtml}
      </div>

      <!-- 當前全身三大本命神裝一覽 -->
      <div class="ink-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <b style="font-size:1.02rem; color:var(--ink-black);">👑 當前穿戴本命三神器（總戰力加成已實時翻倍）</b>
          <button type="button" class="chip-btn active" id="btn-v13-free-hammers">🎁 領取天道賜錘 (+15錘)</button>
        </div>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;">
          ${["weapon", "armor", "accessory"].map(slot => {
            const it = ce[slot];
            return `
              <div style="background:#fbf8f0; border:1.5px solid ${it.color}; border-radius:3px; padding:7px; text-align:center;">
                <div style="font-size:0.75rem; font-weight:900; color:${it.color};">[${it.rarityName}]</div>
                <div style="font-size:0.88rem; font-weight:900; color:var(--ink-black); margin:2px 0;">${it.name}</div>
                <div style="font-size:0.76rem; color:var(--ink-mid);">殺+${it.atk}｜血+${it.hp}</div>
                <div style="font-size:0.74rem; color:var(--cinnabar-red); font-weight:800; margin-top:2px;">${it.traitName}+${it.traitVal}%</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
    container.appendChild(wrap);

    const triggerForge = (count = 1, el = null) => {
      if (v13.hammers <= 0) {
        v13.hammers += 10; // 不卡死玩家，神錘耗盡自動天道補錘！
      }
      const useCount = Math.min(v13.hammers, count);
      v13.hammers -= useCount;
      v13.totalForged += useCount;
      v13.cauldronLv = 1 + Math.floor(v13.totalForged / 5);

      const cauldronEl = wrap.querySelector("#btn-v13-smash-cauldron");
      if (cauldronEl) {
        cauldronEl.classList.add("smashing");
        setTimeout(() => cauldronEl.classList.remove("smashing"), 180);
      }

      // 依造化鼎等級提升高階品質權重
      let bestLoot = null;
      for (let i = 0; i < useCount; i++) {
        const lvBoost = (v13.cauldronLv - 1) * 3;
        const pool = V13_RARITY_TIERS.map(r => ({
          ...r,
          adjWeight: r.tier >= 5 ? r.weight + lvBoost : Math.max(5, r.weight - lvBoost)
        }));
        if (useCount >= 5 && i === useCount - 1) {
          // 五連保底造化仙品以上
          pool.forEach(p => { if (p.tier < 5) p.adjWeight = 0; });
        }
        const totalW = pool.reduce((a, b) => a + b.adjWeight, 0);
        let roll = Math.random() * totalW;
        let chosenRarity = pool[0];
        for (const p of pool) {
          if (roll < p.adjWeight) { chosenRarity = p; break; }
          roll -= p.adjWeight;
        }

        const slotObj = V13_FORGE_SLOTS[Math.floor(Math.random() * V13_FORGE_SLOTS.length)];
        const name = slotObj.names[Math.min(slotObj.names.length - 1, Math.floor((chosenRarity.tier - 1) / 1.4))];
        const trait = V13_SPECIAL_TRAITS[Math.floor(Math.random() * V13_SPECIAL_TRAITS.length)];
        const realmScale = 1 + this.char.realmIndex * 0.55 + v13.cauldronLv * 0.22;

        const candidate = {
          slot: slotObj.slot,
          slotLabel: slotObj.slot === "weapon" ? "殺伐道兵" : (slotObj.slot === "armor" ? "護體仙甲" : "本命奇寶"),
          name,
          rarityTier: chosenRarity.tier,
          rarityName: chosenRarity.name,
          color: chosenRarity.color,
          isMythic: !!chosenRarity.isMythic,
          atk: Math.floor((140 + Math.random() * 90) * chosenRarity.mult * realmScale),
          hp: Math.floor((520 + Math.random() * 280) * chosenRarity.mult * realmScale),
          def: Math.floor((65 + Math.random() * 45) * chosenRarity.mult * realmScale),
          traitName: trait.name,
          traitVal: Math.floor(trait.min + Math.random() * (trait.max - trait.min)),
          salvageExp: Math.floor(380 * chosenRarity.mult * (1 + this.char.realmIndex * 0.4))
        };
        if (!bestLoot || (candidate.atk + candidate.hp * 0.25) > (bestLoot.atk + bestLoot.hp * 0.25)) {
          bestLoot = candidate;
        }
      }

      v13.pendingLoot = bestLoot;
      if (bestLoot.rarityTier >= 5) {
        audio.playLevelUp();
      } else {
        audio.playSwordClash();
      }
      if (el) {
        this.triggerFlyingReward(el, "qi", `🔨 出爐：[${bestLoot.rarityName}] ${bestLoot.name}！`);
      }
      this.updateHeader();
      this.renderView();
    };

    wrap.querySelector("#btn-v13-smash-cauldron")?.addEventListener("click", (e) => triggerForge(1, e.currentTarget));
    wrap.querySelector("#btn-v13-forge-one")?.addEventListener("click", (e) => triggerForge(1, e.currentTarget));
    wrap.querySelector("#btn-v13-forge-five")?.addEventListener("click", (e) => triggerForge(5, e.currentTarget));

    wrap.querySelector("#btn-v13-equip-new")?.addEventListener("click", (e) => {
      if (!v13.pendingLoot) return;
      const nl = v13.pendingLoot;
      ce[nl.slot] = nl;
      this.char.exp += nl.salvageExp;
      this.char.silver += 180;
      v13.pendingLoot = null;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "exp", `⚡ 戰力飆升！分解舊裝 +${nl.salvageExp} 元氣`);
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v13-salvage-new")?.addEventListener("click", (e) => {
      if (!v13.pendingLoot) return;
      const nl = v13.pendingLoot;
      this.char.exp += nl.salvageExp;
      v13.hammers += 1;
      v13.pendingLoot = null;
      audio.playQiCharge();
      this.triggerFlyingReward(e.currentTarget, "exp", `♻️ 熔煉獲得 +${nl.salvageExp} 元氣 · 神錘 +1`);
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v13-free-hammers")?.addEventListener("click", (e) => {
      v13.hammers += 15;
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "qi", "🎁 獲贈 +15 把造化神錘！");
      this.renderView();
    });
  };

  // ==================== 引擎三：〔割〕萬劍割草無雙場（《吸血鬼倖存者》式即時 60FPS Canvas 飛劍彈幕割草 + 肉鴿三選一超武） ====================
  App.prototype.stopV13MowingLoop = function() {
    if (this._v13MowRaf) {
      cancelAnimationFrame(this._v13MowRaf);
      this._v13MowRaf = null;
    }
  };

  App.prototype.renderV12WildernessView = function(container) {
    this.stopV13MowingLoop();
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const banner = this.getDaotuBannerStatus();

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";

    wrap.innerHTML = `
      <div class="ink-card" style="padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div>
            <b style="font-size:1.1rem; color:var(--cinnabar-red);">🗡️ 萬劍割草無雙秘境（即時飛劍彈幕 × 肉鴿超武三選一）</b>
          </div>
          <span style="font-size:0.82rem; font-weight:900; color:var(--stone-cyan);">累計斬魔：${v13.mowingTotalKills}</span>
        </div>
        <div style="font-size:0.84rem; color:var(--ink-mid); margin-bottom:8px;">
          手指或滑鼠在畫卷上滑動即可操控劍仙走位！環身飛劍、追蹤火蓮與紫極天雷將自動全屏割草，滿地靈珠與神錘自動磁吸飛入體內！
        </div>

        <!-- 60FPS 即時萬劍割草 Canvas 舞台 -->
        <div class="v13-survivor-canvas-wrap" id="v13-canvas-box">
          <canvas id="v13-mowing-canvas" width="430" height="330"></canvas>
          <div class="v13-mowing-hud">
            <span class="v13-mowing-pill" id="v13-hud-lv">劍陣 Lv.1 (0%)</span>
            <span class="v13-mowing-pill" id="v13-hud-kills">斬魔: 0 ｜ 連斬: 0</span>
            <span class="v13-mowing-pill" id="v13-hud-loot">+0 元氣 ｜ +0🔨</span>
          </div>

          <!-- 局內升級「肉鴿神通超武三選一」浮層 -->
          <div class="v13-mowing-perk-overlay" id="v13-mow-perk-modal">
            <div style="color:#ffd27d; font-size:1.12rem; font-weight:900; margin-bottom:4px;">⚡〔劍意突破 · 神通超武三選一〕</div>
            <div style="color:#e6dec8; font-size:0.84rem; margin-bottom:10px;">選擇一項神通蛻變，立即體驗全屏秒殺快感：</div>
            <div id="v13-mow-perk-buttons" style="display:flex; flex-direction:column; gap:8px; width:100%;"></div>
          </div>
        </div>

        <!-- 場外一鍵狂暴強化與主線因果推進 -->
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:6px; margin-top:8px;">
          <button type="button" class="btn-modern gold" id="btn-mow-add-swords" style="font-size:0.82rem; padding:7px 4px;">
            🗡️ 飛劍+2柄 (現${v13.mowingSwordCount}柄)
          </button>
          <button type="button" class="btn-modern" id="btn-mow-screen-nuke" style="font-size:0.82rem; padding:7px 4px; border-color:var(--cinnabar-red); color:var(--cinnabar-red); font-weight:900;">
            💥 誅仙全屏清場！
          </button>
          <button type="button" class="btn-modern secondary" id="btn-mow-story-event" style="font-size:0.82rem; padding:7px 4px;">
            📜 主線因果 (${banner.nextNodeId})
          </button>
        </div>
      </div>
    `;
    container.appendChild(wrap);

    this.startV13MowingArena(wrap);

    wrap.querySelector("#btn-mow-story-event")?.addEventListener("click", () => {
      this.stopV13MowingLoop();
      if (!st.completedNodes.includes("1-2")) {
        this.completeStoryNode("1-2", "初入大荒割草鎮魔", "踏入大荒萬魔淵，以護身飛劍盪平群魔！");
      }
      this.triggerStoryNodeModal(banner.nextNodeId);
    });
  };

  // 實作 60FPS《吸血鬼倖存者》式萬劍割草 Canvas 遊戲迴路
  App.prototype.startV13MowingArena = function(wrap) {
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const canvas = wrap.querySelector("#v13-mowing-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const state = {
      paused: false,
      frame: 0,
      runLv: 1,
      runExp: 0,
      runReqExp: 12,
      kills: 0,
      combo: 0,
      gainedExp: 0,
      gainedHammers: 0,
      swordCount: Math.max(4, v13.mowingSwordCount || 4),
      swordSpeed: 0.075,
      swordRadius: 68,
      fireRate: 42,
      lightningRate: 95,
      player: { x: 215, y: 165, targetX: 215, targetY: 165 },
      enemies: [],
      projectiles: [],
      gems: [],
      floatTexts: [],
      lightningBolts: []
    };

    const setPointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      state.player.targetX = Math.max(24, Math.min(canvas.width - 24, (clientX - rect.left) * scaleX));
      state.player.targetY = Math.max(24, Math.min(canvas.height - 24, (clientY - rect.top) * scaleY));
    };

    canvas.addEventListener("mousemove", (e) => setPointer(e.clientX, e.clientY));
    canvas.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        setPointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    canvas.addEventListener("click", (e) => setPointer(e.clientX, e.clientY));

    const triggerScreenNuke = () => {
      audio.playLevelUp();
      state.enemies.forEach(en => {
        en.hp = 0;
        state.gems.push({ x: en.x, y: en.y, val: 2, isHammer: Math.random() < 0.25 });
        state.floatTexts.push({ x: en.x, y: en.y, text: "💥誅仙秒殺!", color: "#ff4733", life: 28 });
      });
      state.lightningBolts.push({ x: canvas.width / 2, y: canvas.height / 2, life: 15, fullScreen: true });
    };

    wrap.querySelector("#btn-mow-add-swords")?.addEventListener("click", () => {
      v13.mowingSwordCount = Math.min(24, (v13.mowingSwordCount || 4) + 2);
      state.swordCount = v13.mowingSwordCount;
      audio.playSwordClash();
      state.floatTexts.push({ x: state.player.x, y: state.player.y - 20, text: `🗡️ 飛劍增至 ${state.swordCount} 柄！`, color: "#ffd27d", life: 35 });
    });
    wrap.querySelector("#btn-mow-screen-nuke")?.addEventListener("click", () => triggerScreenNuke());

    const openPerkChoice = () => {
      state.paused = true;
      audio.playEpiphanyBell();
      const modal = wrap.querySelector("#v13-mow-perk-modal");
      const btnBox = wrap.querySelector("#v13-mow-perk-buttons");
      if (!modal || !btnBox) { state.paused = false; return; }

      const perks = [
        { title: "🗡️ 太乙萬劍倍增（飛劍 +3 柄 · 轉速 +25%）", apply: () => {
          v13.mowingSwordCount = Math.min(28, (v13.mowingSwordCount || 4) + 3);
          state.swordCount = v13.mowingSwordCount;
          state.swordSpeed += 0.018;
          state.swordRadius = Math.min(110, state.swordRadius + 8);
        }},
        { title: "🔥 焚天火蓮連珠（火蓮散射 +3 枚 · 爆裂範圍翻倍）", apply: () => {
          state.fireRate = Math.max(14, state.fireRate - 10);
          triggerScreenNuke();
        }},
        { title: "⚡ 九霄神雷洗地（天雷頻率翻倍 · 立即掉 +5 把神錘！）", apply: () => {
          state.lightningRate = Math.max(30, state.lightningRate - 25);
          v13.hammers += 5;
          state.gainedHammers += 5;
          triggerScreenNuke();
        }}
      ];

      btnBox.innerHTML = perks.map((p, i) => `
        <button type="button" class="btn-jade" data-perk-idx="${i}" style="width:100%; padding:10px;">
          <span class="main-label" style="font-size:0.96rem;">${p.title}</span>
        </button>
      `).join("");
      modal.classList.add("active");

      btnBox.querySelectorAll("[data-perk-idx]").forEach(b => {
        b.addEventListener("click", () => {
          const idx = parseInt(b.getAttribute("data-perk-idx"), 10);
          perks[idx].apply();
          modal.classList.remove("active");
          state.paused = false;
          this.updateHeader();
        });
      });
    };

    const step = () => {
      if (!document.body.contains(canvas)) {
        this.stopV13MowingLoop();
        return;
      }
      if (!state.paused) {
        state.frame++;

        // 1. 玩家平滑移動（若未操作則自動巡航割草）
        if (state.frame % 90 === 0 && Math.hypot(state.player.x - state.player.targetX, state.player.y - state.player.targetY) < 8) {
          state.player.targetX = 70 + Math.random() * (canvas.width - 140);
          state.player.targetY = 60 + Math.random() * (canvas.height - 120);
        }
        state.player.x += (state.player.targetX - state.player.x) * 0.14;
        state.player.y += (state.player.targetY - state.player.y) * 0.14;

        // 2. 生成潮水般的魔物與精英首領
        if (state.frame % 16 === 0 && state.enemies.length < 42) {
          const edge = Math.floor(Math.random() * 4);
          let ex = 0, ey = 0;
          if (edge === 0) { ex = Math.random() * canvas.width; ey = -12; }
          else if (edge === 1) { ex = canvas.width + 12; ey = Math.random() * canvas.height; }
          else if (edge === 2) { ex = Math.random() * canvas.width; ey = canvas.height + 12; }
          else { ex = -12; ey = Math.random() * canvas.height; }
          const isElite = (state.frame % 160 === 0);
          state.enemies.push({
            x: ex, y: ey,
            hp: isElite ? 6 : 1,
            maxHp: isElite ? 6 : 1,
            r: isElite ? 15 : 9,
            speed: isElite ? 0.95 : (1.15 + Math.random() * 0.65),
            isElite
          });
        }

        // 3. 自動發射追蹤混沌火蓮
        if (state.frame % state.fireRate === 0 && state.enemies.length > 0) {
          for (let k = 0; k < 2; k++) {
            const target = state.enemies[Math.floor(Math.random() * state.enemies.length)];
            if (target) {
              const ang = Math.atan2(target.y - state.player.y, target.x - state.player.x);
              state.projectiles.push({
                x: state.player.x, y: state.player.y,
                vx: Math.cos(ang) * 5.2, vy: Math.sin(ang) * 5.2,
                life: 65
              });
            }
          }
        }

        // 4. 自動降下紫極天雷
        if (state.frame % state.lightningRate === 0 && state.enemies.length > 0) {
          for (let k = 0; k < 3; k++) {
            const target = state.enemies[Math.floor(Math.random() * state.enemies.length)];
            if (target) {
              target.hp -= 4;
              state.lightningBolts.push({ x: target.x, y: target.y, life: 12 });
              state.floatTexts.push({ x: target.x, y: target.y - 8, text: "⚡雷罰!", color: "#7ce0ff", life: 18 });
            }
          }
        }

        // 5. 計算環身太乙飛劍座標並碰撞割草
        const swordPositions = [];
        for (let i = 0; i < state.swordCount; i++) {
          const ang = state.frame * state.swordSpeed + (i * Math.PI * 2 / state.swordCount);
          swordPositions.push({
            x: state.player.x + Math.cos(ang) * state.swordRadius,
            y: state.player.y + Math.sin(ang) * state.swordRadius,
            ang
          });
        }

        // 更新投射物
        state.projectiles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life--; });
        state.projectiles = state.projectiles.filter(p => p.life > 0);

        // 更新敵人與割草斬殺判定
        const survivingEnemies = [];
        state.enemies.forEach(en => {
          const ang = Math.atan2(state.player.y - en.y, state.player.x - en.x);
          en.x += Math.cos(ang) * en.speed;
          en.y += Math.sin(ang) * en.speed;

          // 飛劍碰撞
          for (const sw of swordPositions) {
            if (Math.hypot(sw.x - en.x, sw.y - en.y) < en.r + 13) {
              en.hp -= 2;
              break;
            }
          }
          // 火蓮碰撞
          for (const p of state.projectiles) {
            if (Math.hypot(p.x - en.x, p.y - en.y) < en.r + 10) {
              en.hp -= 3;
              p.life = 0;
              break;
            }
          }

          if (en.hp <= 0) {
            state.kills++;
            state.combo++;
            if (state.combo > state.maxCombo) state.maxCombo = state.combo;
            if (curSkin.id === "crimson" && state.kills % 12 === 0) {
              state.player.hp = Math.min(state.player.maxHp, state.player.hp + 4);
              updatePlayerVitalHUD();
            }
            v13.mowingTotalKills++;
            const dropHammer = en.isElite || (Math.random() < 0.14);
            state.gems.push({ x: en.x, y: en.y, val: en.isElite ? 4 : 1, isHammer: dropHammer });
            if (en.isElite || state.kills % 6 === 0) {
              state.floatTexts.push({
                x: en.x, y: en.y,
                text: en.isElite ? "🔥斬殺魔將 +1🔨!" : `斬! ×${state.combo}`,
                color: en.isElite ? "#ffd27d" : "#ff6b57",
                life: 20
              });
            }
          } else {
            survivingEnemies.push(en);
          }
        });
        state.enemies = survivingEnemies;

        // 6. 磁吸經驗靈珠與神錘
        const remGems = [];
        state.gems.forEach(g => {
          const dist = Math.hypot(state.player.x - g.x, state.player.y - g.y);
          if (dist < 135) {
            g.x += (state.player.x - g.x) * 0.22;
            g.y += (state.player.y - g.y) * 0.22;
          }
          if (dist < 18) {
            state.runExp += g.val;
            const expGain = (45 + this.char.realmIndex * 25) * g.val;
            this.char.exp += expGain;
            state.gainedExp += expGain;
            if (g.isHammer) {
              v13.hammers += 1;
              state.gainedHammers += 1;
            }
            if (state.runExp >= state.runReqExp) {
              state.runExp -= state.runReqExp;
              state.runLv++;
              state.runReqExp = Math.floor(state.runReqExp * 1.35);
              openPerkChoice();
            }
          } else {
            remGems.push(g);
          }
        });
        state.gems = remGems;

        // 7. 渲染水墨暗夜割草戰場
        ctx.fillStyle = "#1c1916";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 水墨八卦底紋
        ctx.strokeStyle = "rgba(212, 160, 56, 0.14)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(state.player.x, state.player.y, state.swordRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 繪製靈珠與神錘
        state.gems.forEach(g => {
          ctx.fillStyle = g.isHammer ? "#ffd27d" : "#4de0c6";
          ctx.beginPath();
          ctx.arc(g.x, g.y, g.isHammer ? 5.5 : 3.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // 繪製火蓮投射物
        state.projectiles.forEach(p => {
          ctx.fillStyle = "#ff5733";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fill();
        });

        // 繪製敵人魔潮
        state.enemies.forEach(en => {
          ctx.fillStyle = en.isElite ? "#d42269" : "#a32c22";
          ctx.beginPath();
          ctx.arc(en.x, en.y, en.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffd27d";
          ctx.lineWidth = en.isElite ? 2 : 0.8;
          ctx.stroke();
        });

        // 繪製主角劍仙與環身太乙飛劍
        ctx.fillStyle = "#f7eedc";
        ctx.beginPath();
        ctx.arc(state.player.x, state.player.y, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#141311";
        ctx.font = "bold 12px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("劍", state.player.x, state.player.y);

        swordPositions.forEach(sw => {
          ctx.save();
          ctx.translate(sw.x, sw.y);
          ctx.rotate(sw.ang + Math.PI / 2);
          ctx.fillStyle = "#ffd27d";
          ctx.fillRect(-2.5, -11, 5, 22);
          ctx.restore();
        });

        // 繪製天雷閃電
        state.lightningBolts.forEach(lb => {
          if (lb.fullScreen) {
            ctx.fillStyle = `rgba(255, 230, 160, ${lb.life / 18})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else {
            ctx.strokeStyle = "#8ce8ff";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(lb.x, 0);
            ctx.lineTo(lb.x - 6, lb.y * 0.5);
            ctx.lineTo(lb.x + 4, lb.y);
            ctx.stroke();
          }
          lb.life--;
        });
        state.lightningBolts = state.lightningBolts.filter(l => l.life > 0);

        // 繪製爆擊飄字
        state.floatTexts.forEach(ft => {
          ctx.fillStyle = ft.color;
          ctx.font = "bold 12px serif";
          ctx.fillText(ft.text, ft.x, ft.y);
          ft.y -= 0.8;
          ft.life--;
        });
        state.floatTexts = state.floatTexts.filter(ft => ft.life > 0);

        // 更新頂部 HUD
        const lvEl = wrap.querySelector("#v13-hud-lv");
        const kEl = wrap.querySelector("#v13-hud-kills");
        const lEl = wrap.querySelector("#v13-hud-loot");
        if (lvEl) lvEl.innerText = `劍陣 Lv.${state.runLv} (${Math.floor(state.runExp / state.runReqExp * 100)}%)`;
        if (kEl) kEl.innerText = `斬魔: ${state.kills} ｜ 飛劍: ${state.swordCount}柄`;
        if (lEl) lEl.innerText = `+${state.gainedExp.toLocaleString()}元氣 ｜ +${state.gainedHammers}🔨`;
      }

      this._v13MowRaf = requestAnimationFrame(step);
    };

    this._v13MowRaf = requestAnimationFrame(step);
  };

  // ==================== 引擎四：〔合〕九宮八卦二合一合成盤（《背包亂鬥》× 二合一合成蛻變 + 本命神通演化） ====================
  App.prototype.renderV12MartialView = function(container) {
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const flavor = this.char.getCustomSkillFlavorProfile();

    // 計算合成盤總倍率
    let totalMultBonus = 0;
    v13.mergeBoard.forEach(lv => {
      if (lv > 0) {
        const m = V13_MERGE_ITEMS[Math.min(V13_MERGE_ITEMS.length - 1, lv - 1)];
        if (m) totalMultBonus += m.multBonus;
      }
    });

    const cellsHtml = v13.mergeBoard.map((lv, idx) => {
      if (!lv || lv <= 0) {
        return `
          <div class="v13-merge-cell" data-merge-idx="${idx}">
            <span style="font-size:0.75rem; color:var(--ink-light);">空陣眼</span>
          </div>
        `;
      }
      const meta = V13_MERGE_ITEMS[Math.min(V13_MERGE_ITEMS.length - 1, lv - 1)];
      const isSel = (v13.selectedMergeIdx === idx);
      return `
        <div class="v13-merge-cell ${isSel ? 'selected' : ''} ${lv >= 4 ? 'high-tier' : ''}" data-merge-idx="${idx}">
          <div style="font-size:1.55rem; line-height:1.1;">${meta.icon}</div>
          <div style="font-size:0.78rem; font-weight:900; color:var(--ink-black); margin-top:2px;">Lv.${lv} ${meta.name}</div>
          <div style="font-size:0.7rem; color:var(--cinnabar-red); font-weight:800;">全屬性 +${Math.round(meta.multBonus * 100)}%</div>
        </div>
      `;
    }).join("");

    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:10px; padding-bottom:24px;";
    wrap.innerHTML = `
      <div class="ink-card" style="border:2px solid var(--cinnabar-red); background:linear-gradient(180deg, #fcf9f2 0%, #ede3cf 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="daotu-act-tag">二合一蛻變</span>
            <b style="font-size:1.12rem; color:var(--ink-black); margin-left:6px;">🎒 九宮八卦合道盤（最高 Lv.${v13.highestMergeLv}）</b>
          </div>
          <span style="font-size:0.9rem; font-weight:900; color:var(--cinnabar-red);">全屬性乘算：×${(1 + totalMultBonus).toFixed(2)}</span>
        </div>
        <div style="font-size:0.84rem; color:var(--ink-mid); margin:6px 0;">
          點擊兩枚相同階位之靈物即可「二合一升階蛻變」！合成高階神物不僅讓全屬性翻倍，還會永久解鎖【天命輪盤道印小丑牌】與【本命神通形態】！
        </div>

        <div class="v13-merge-grid" id="v13-merge-board-box">
          ${cellsHtml}
        </div>

        <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:8px; margin-top:10px;">
          <button type="button" class="btn-jade" id="btn-v13-spawn-merge" style="padding:11px;">
            <span class="main-label" style="font-size:1.08rem;">✨ 凝練靈胎入陣 (免費連點！)</span>
            <span class="sub-label">填滿陣盤 · 隨時觸發連鎖二合一</span>
          </button>
          <button type="button" class="btn-jade" id="btn-v13-auto-merge-all" style="padding:11px; border-color:var(--cinnabar-red);">
            <span class="main-label" style="font-size:1.05rem; color:var(--cinnabar-red);">⚡ 一鍵全盤二合一！</span>
            <span class="sub-label">自動將所有同階靈物合成升階</span>
          </button>
        </div>
      </div>

      <!-- 本命神通形態與個人道韻連動 -->
      <div class="ink-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:1.02rem; color:var(--ink-black);">🗡️ 本命神通：【${(this.char.customSkill && this.char.customSkill.name) || '太初萬劍歸宗'}】</b>
          <span style="font-size:0.9rem; font-weight:900; color:var(--stone-cyan);">威能倍率：${flavor.totalPowerPct + v13.highestMergeLv * 45}%</span>
        </div>
        <div style="font-size:0.86rem; color:var(--ink-dark); margin-top:6px; line-height:1.55;">
          • <b>當前形態：</b>${flavor.formTitle}<br/>
          • <b>專屬道韻味道：</b>【${flavor.wudaoTag}】${flavor.wudaoEffect} ｜ ${flavor.karmaFlavor}
        </div>
      </div>
    `;
    container.appendChild(wrap);

    // 點擊兩個同等級格子進行二合一
    wrap.querySelectorAll("[data-merge-idx]").forEach(cell => {
      cell.addEventListener("click", (e) => {
        const idx = parseInt(cell.getAttribute("data-merge-idx"), 10);
        const lv = v13.mergeBoard[idx] || 0;
        if (lv <= 0) {
          // 點空格直接生成一枚靈胎
          v13.mergeBoard[idx] = Math.max(1, Math.min(4, v13.highestMergeLv - 2));
          audio.playQiCharge();
          this.renderView();
          return;
        }
        if (v13.selectedMergeIdx === -1) {
          v13.selectedMergeIdx = idx;
          this.renderView();
          return;
        }
        if (v13.selectedMergeIdx === idx) {
          v13.selectedMergeIdx = -1;
          this.renderView();
          return;
        }
        const prevIdx = v13.selectedMergeIdx;
        const prevLv = v13.mergeBoard[prevIdx];
        if (prevLv === lv && lv < 10) {
          v13.mergeBoard[idx] = lv + 1;
          v13.mergeBoard[prevIdx] = 0;
          v13.selectedMergeIdx = -1;
          if (lv + 1 > v13.highestMergeLv) {
            v13.highestMergeLv = lv + 1;
            this.char.ensureV12State().customSkillFormTier = Math.min(4, Math.ceil(v13.highestMergeLv / 2));
          }
          this.char.exp += (lv + 1) * 450;
          v13.hammers += 2;
          audio.playLevelUp();
          const newMeta = V13_MERGE_ITEMS[Math.min(V13_MERGE_ITEMS.length - 1, lv)];
          this.triggerFlyingReward(e.currentTarget, "exp", `✨ 二合一蛻變：Lv.${lv + 1}【${newMeta.name}】(+2🔨)`);
          if (!st.flags.customSkillEstablished && v13.highestMergeLv >= 4) {
            st.flags.customSkillEstablished = true;
            this.completeStoryNode("1-5", `合道演化【${newMeta.name}】`, "透過九宮八卦合道確立本命神通雛形！");
          }
          this.updateHeader();
          this.renderView();
        } else {
          // 交換位置
          v13.mergeBoard[prevIdx] = lv;
          v13.mergeBoard[idx] = prevLv;
          v13.selectedMergeIdx = -1;
          audio.playQiCharge();
          this.renderView();
        }
      });
    });

    // 凝練靈胎入陣
    wrap.querySelector("#btn-v13-spawn-merge")?.addEventListener("click", (e) => {
      const emptyIndices = [];
      v13.mergeBoard.forEach((v, i) => { if (!v || v <= 0) emptyIndices.push(i); });
      if (emptyIndices.length === 0) {
        // 若滿格則自動執行一鍵合成騰出空間
        wrap.querySelector("#btn-v13-auto-merge-all")?.click();
        return;
      }
      const spawnCount = Math.min(emptyIndices.length, 4);
      const baseLv = Math.max(1, Math.min(4, v13.highestMergeLv - 2));
      for (let i = 0; i < spawnCount; i++) {
        v13.mergeBoard[emptyIndices[i]] = baseLv;
      }
      audio.playQiCharge();
      this.triggerFlyingReward(e.currentTarget, "qi", `✨ 凝練 ${spawnCount} 枚 Lv.${baseLv} 靈物入陣！`);
      this.renderView();
    });

    // 一鍵全盤二合一連鎖合成
    wrap.querySelector("#btn-v13-auto-merge-all")?.addEventListener("click", (e) => {
      let mergedCount = 0;
      let changed = true;
      while (changed) {
        changed = false;
        for (let i = 0; i < 16; i++) {
          const lv = v13.mergeBoard[i];
          if (!lv || lv <= 0 || lv >= 10) continue;
          for (let j = i + 1; j < 16; j++) {
            if (v13.mergeBoard[j] === lv) {
              v13.mergeBoard[i] = lv + 1;
              v13.mergeBoard[j] = 0;
              mergedCount++;
              changed = true;
              if (lv + 1 > v13.highestMergeLv) {
                v13.highestMergeLv = lv + 1;
                this.char.ensureV12State().customSkillFormTier = Math.min(4, Math.ceil(v13.highestMergeLv / 2));
              }
              break;
            }
          }
        }
      }
      if (mergedCount === 0) {
        // 若無可合成，自動補滿空格再合一次
        v13.mergeBoard = v13.mergeBoard.map(v => v > 0 ? v : 1);
        mergedCount = 1;
      }
      const rewardExp = mergedCount * 680 * (1 + this.char.realmIndex * 0.5);
      this.char.exp += Math.floor(rewardExp);
      v13.hammers += mergedCount * 2;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "exp", `⚡ 連鎖合成 ${mergedCount} 次！最高 Lv.${v13.highestMergeLv} (+${mergedCount * 2}🔨)`);
      if (!st.flags.customSkillEstablished && v13.highestMergeLv >= 4) {
        st.flags.customSkillEstablished = true;
        this.completeStoryNode("1-5", "一鍵合道確立神通", "於九宮八卦合道盤完成高階靈寶蛻變，確立本命神通！");
      }
      this.updateHeader();
      this.renderView();
    });
  };

  

  // ====================================================================================================
  // 《星宿劫源：太初道主》v14.0 武俠合真風骨（武合風）重造版
  // 核心理念：以正統東方武俠風骨為魂，將武學合璧連攜與《星宿劫源》三幕主線劇情深度咬合！
  // ====================================================================================================

  // 1. 武道演武輪盤符號庫（正統武俠武學與名家兵刃）
  const V14_WUXIA_SYMBOLS = [
    { id: "sym_sword", icon: "🗡️", name: "太乙青霜劍", baseExp: 190, mult: 1.6, weight: 26, lore: "青玄名門太乙劍胚，出招自帶三尺青芒，鋒銳不可擋！" },
    { id: "sym_thunder", icon: "⚡", name: "都天辟邪雷", baseExp: 230, mult: 1.9, weight: 22, lore: "神霄古教天罰正道雷法，專克天下幽冥陰邪魔道！" },
    { id: "sym_fire", icon: "🔥", name: "降龍混元掌", baseExp: 270, mult: 2.3, weight: 18, lore: "至剛至陽混元剛勁，掌出龍吟虎嘯，焚盡群邪！" },
    { id: "sym_hammer", icon: "🔨", name: "龍泉神錘", baseExp: 160, mult: 1.4, hammerDrop: 2, weight: 18, lore: "大荒名匠千錘百鍊，開爐必得絕世神兵！" },
    { id: "sym_pill", icon: "💊", name: "少林大還丹", baseExp: 380, mult: 2.6, qiDrop: 190, weight: 10, lore: "九轉洗髓靈丹，起死回生，大長真元功力！" },
    { id: "sym_taichu", icon: "👑", name: "真武道果令", baseExp: 880, mult: 5.5, hammerDrop: 5, wudaoDrop: 1, weight: 6, lore: "【神話大獎】武道通神，天下共尊，全屏劍雨轟鳴！" }
  ];

  // 2. 四大江湖宗師「武道心法小丑牌」（Jokers，隨八卦合真階位解鎖）
  const V14_MASTER_JOKERS = [
    { id: "joker_sword", icon: "🗡️", name: "扶搖劍意 · 萬劍歸宗", master: "扶搖劍尊", rule: "盤面每有1枚🗡️青霜劍，總倍率額外 ×1.35", minMergeTier: 1 },
    { id: "joker_hammer", icon: "🔨", name: "天工神髓 · 龍泉百鍊", master: "玄牝丹祖", rule: "每次演武保底掉落+1神錘；轉出🔨時神錘產出翻倍", minMergeTier: 2 },
    { id: "joker_hebi", icon: "☯️", name: "雷火合璧 · 陰陽焚天", master: "驚雷聖主", rule: "同時轉出⚡都天雷與🔥降龍掌時，總倍率直接 ×3.2！", minMergeTier: 3 },
    { id: "joker_taichu", icon: "👑", name: "太極無量 · 俠道共尊", master: "璇璣仙妃", rule: "所有三連共鳴額外 ×2.5 倍，自動催動太極護體真元！", minMergeTier: 4 }
  ];

  // 3. 龍泉神爐 · 俠道名劍譜與武林名鎧（《尋道大千》式開箱比裝）
  const V14_WUXIA_RARITIES = [
    { tier: 1, name: "凡鐵布衣", color: "#575249", bg: "#f4efe4", mult: 1.0, weight: 26 },
    { tier: 2, name: "百煉鋼品", color: "#2d5442", bg: "#e8f4ec", mult: 1.35, weight: 25 },
    { tier: 3, name: "名門玄階", color: "#235363", bg: "#e6f0f5", mult: 1.85, weight: 20 },
    { tier: 4, name: "純陽名器", color: "#6b2d82", bg: "#f3e8f7", mult: 2.65, weight: 14 },
    { tier: 5, name: "造化仙品", color: "#b8621b", bg: "#fff0e0", mult: 3.85, weight: 8 },
    { tier: 6, name: "鴻蒙聖兵", color: "#a32c22", bg: "#ffe8e5", mult: 5.60, weight: 4 },
    { tier: 7, name: "🌈太初神話", color: "#d42269", bg: "#fff5d6", mult: 9.00, weight: 3, isMythic: true }
  ];

  const V14_FORGE_SLOTS = [
    { slot: "weapon", icon: "🗡️", names: ["太乙青霜劍", "赤霄屠龍刃", "紫微破星槍", "太古戮仙戈", "鴻蒙倚天劍"] },
    { slot: "armor", icon: "🛡️", names: ["夜行天蠶衣", "金絲軟蝟甲", "玄武金鐘鎧", "萬劫修羅披風", "太初青蓮袍"] },
    { slot: "accessory", icon: "🔮", names: ["清心避毒佩", "定海避劫珠", "九曜周天盤", "真武辟邪鏡", "太初歲漏玉"] }
  ];

  const V14_WUXIA_TRAITS = [
    { id: "combo", name: "⚡ 獨孤破式（連擊）", statLabel: "連擊率", min: 14, max: 48, desc: "料敵先機，劍鋒未老第二劍已破空而至！" },
    { id: "crit", name: "💥 降龍神勁（暴擊）", statLabel: "會心暴傷", min: 28, max: 88, desc: "至剛至陽掌力如金龍出海，刀刀入木三分！" },
    { id: "stun", name: "💫 少林獅吼（擊暈）", statLabel: "擊暈率", min: 12, max: 40, desc: "佛門金剛之音震懾神識，令敵手氣血凝滯！" },
    { id: "vamp", name: "🩸 北冥吞天（吸血）", statLabel: "吸血率", min: 14, max: 42, desc: "百川匯海，傷敵之際倒吸其氣血充盈己身！" }
  ];

  // 4. 武道合真 · 八卦真武殘篇推演階位 (Lv.1 ~ Lv.10)
  const V14_MERGE_WUXIA_BOOKS = [
    { lv: 1, icon: "🪨", name: "築基氣感", multBonus: 0.06, lore: "凡塵初窺真氣，丹田微暖生息" },
    { lv: 2, icon: "☯️", name: "太極兩儀", multBonus: 0.14, lore: "陰陽相生，借力打力化萬物" },
    { lv: 3, icon: "🗡️", name: "少陽真武", multBonus: 0.28, lore: "青玄名門正宗，劍走偏鋒破煞" },
    { lv: 4, icon: "⚡", name: "獨孤劍意", multBonus: 0.48, lore: "重劍無鋒大巧不工，無招勝有招" },
    { lv: 5, icon: "🐉", name: "降龍真傳", multBonus: 0.80, lore: "至剛極限，亢龍有悔破盡外家" },
    { lv: 6, icon: "🔥", name: "九陽真功", multBonus: 1.25, lore: "他強任他強，清風拂山崗；生生不息" },
    { lv: 7, icon: "📜", name: "易筋洗髓經", multBonus: 1.90, lore: "佛道合真脫胎換骨，肉身百毒不侵" },
    { lv: 8, icon: "🌊", name: "北冥神功", multBonus: 2.88, lore: "海納百川有容乃大，盡奪諸天靈威" },
    { lv: 9, icon: "🌌", name: "太玄神解", multBonus: 4.60, lore: "事了拂衣去深藏身與名，身融虛空" },
    { lv: 10, icon: "👑", name: "太初誅仙劍陣", multBonus: 8.88, lore: "【真武極境】以身為劍，改寫天道劫源！" }
  ];

  // 5. 江湖名宿論武語錄庫（結合主線劇情第一、二、三幕）
  const V14_MASTER_COMMENTARIES = [
    {
      author: "扶搖劍尊",
      title: "太虛玄劍宮 · 掌門",
      quotes: [
        "好一式太乙青霜！此子劍招雖起於凡塵，卻已有我太虛劍道『虛空破魔』之崢嶸！",
        "以劍入道，最重心性。大荒亂世，唯有手中三尺青鋒方能斬破星宿劫源之迷障！",
        "天下武功無堅不破，唯快不破。沉舟小友，你這一劍已暗合天人交感之境！"
      ]
    },
    {
      author: "璇璣仙妃",
      title: "瑤池廣寒仙闕 · 宮主",
      quotes: [
        "太極生兩儀，四象演八卦。沉舟道友能將剛猛劍道融於陰陽生息，實乃大器！",
        "江湖如潮，人如浮萍。你若能在亂局中保全本心，廣寒宮永遠視你為仙途知己。",
        "星宿異動非比尋常，你修鍊的武道真意，正是克制劫源戾氣的最佳鎖鑰。"
      ]
    },
    {
      author: "玄牝丹祖",
      title: "丹霄古聖殿 · 丹道宗師",
      quotes: [
        "以肉身為鼎爐，以真氣為鉛汞！小友這手『混元火蓮』隱然已有九品神丹火候！",
        "俠之大者，利濟蒼生。你在大荒救下傷修種下善因，天道自有功德回饋。",
        "龍泉神爐吞吐天地真陽，老朽願親自為小友添一把三昧真火，助你神兵開鋒！"
      ]
    }
  ];

  // 初始化與兼容 v14 狀態
  Character.prototype.ensureV14WuxiaState = function() {
    const v13 = this.ensureV13AddictiveState();
    if (!this.v14) {
      this.v14 = {
        lastMasterComment: "扶搖劍尊：「好一式太乙青霜！此子劍招雖起於凡塵，卻已有太虛劍意之風骨！」",
        wuxiaChivalryKarma: 10, // 俠義值
        arenaLocationName: "青玄靈泉圍攻戰 · 護道陣眼",
        currentSectInfluence: "太虛玄劍宮 / 丹霄古殿友善",
        arenaMode: "defense", // 'defense' (靈泉守護), 'pokemon' (靈獸降妖), 'endless' (無雙割草), 'boss_rush' (魔首討伐)
        petGourds: 5,
        companionPets: [
          { id: "fox", name: "赤焰靈狐", tier: 1, element: "fire", lv: 1, exp: 0, maxExp: 10, title: "赤焰幼狐", icon: "🦊" }
        ],
        unlockedPets: ["fox"],
        mowingWeaponLevels: {
          sword: 4, fireLotus: 1, thunder: 1, vineWhip: 0, iceCrystal: 0, taijiWave: 0
        }
      };
    }
    if (!this.v14.arenaMode) this.v14.arenaMode = "defense";
    if (this.v14.petGourds === undefined) this.v14.petGourds = 5;
    if (!this.v14.companionPets || this.v14.companionPets.length === 0) {
      this.v14.companionPets = [
        { id: "fox", name: "赤焰靈狐", tier: 1, element: "fire", lv: 1, exp: 0, maxExp: 10, title: "赤焰幼狐", icon: "🦊" }
      ];
    }
    if (!this.v14.unlockedPets) this.v14.unlockedPets = ["fox"];
    if (!this.v14.mowingWeaponLevels) {
      this.v14.mowingWeaponLevels = {
        sword: 4, fireLotus: 1, thunder: 1, vineWhip: 0, iceCrystal: 0, taijiWave: 0
      };
    }
    return this.v14;
  };

  // 重構底部 5 大核心導航為【武俠風骨 × 玩法咬合】
  App.prototype.setupV12FiveCoreNavigation = function() {
    const dock = document.querySelector("nav.modern-dock");
    if (!dock) return;
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const isEndgameLit = (this.char.realmIndex >= 6 || st.act >= 3);

    dock.innerHTML = `
      <button class="dock-tab ${this.currentView === 'main' ? 'active' : ''}" data-view="main">
        <span class="dock-seal-icon">武</span>
        <span>天命演武</span>
        <span class="dock-badge">風雲</span>
      </button>
      <button class="dock-tab ${this.currentView === 'foundation' ? 'active' : ''}" data-view="foundation">
        <span class="dock-seal-icon">鑄</span>
        <span>龍泉鑄兵</span>
        <span class="dock-badge">${v13.hammers}錘</span>
      </button>
      <button class="dock-tab ${this.currentView === 'map' ? 'active' : ''}" data-view="map">
        <span class="dock-seal-icon">斬</span>
        <span>萬劍屠魔</span>
        <span class="dock-badge">江湖</span>
      </button>
      <button class="dock-tab ${this.currentView === 'kungfu' ? 'active' : ''}" data-view="kungfu">
        <span class="dock-seal-icon">合</span>
        <span>武道合真</span>
        <span class="dock-badge">真經</span>
      </button>
      <button class="dock-tab ${this.currentView === 'endgame' ? 'active' : ''} ${isEndgameLit ? 'endgame-lit' : ''}" data-view="endgame">
        <span class="dock-seal-icon">俠</span>
        <span>俠道終局</span>
        <span class="dock-badge">${st.completedNodes.length}/20</span>
      </button>
    `;

    dock.querySelectorAll(".dock-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        this.stopV13MowingLoop();
        this.currentView = view;
        audio.playQiCharge();
        this.renderView();
      });
    });
  };

  // ==================== 1. 〔武〕太極天命演武盤（武合風 × 宗師論武 × 小丑牌連乘 × 主線咬合） ====================
  App.prototype.renderV12DongtianView = function(container) {
    const v13 = this.char.ensureV13AddictiveState();
    const v14 = this.char.ensureV14WuxiaState();
    const st = this.char.ensureStoryState();
    this.checkStoryActTransitions();
    const banner = this.getDaotuBannerStatus();
    const realms = ["凝魄境", "洞天境", "道胎境", "神藏境", "通虛境", "星宿真王", "乾坤界主", "無量至尊", "太初道主"];
    const curRealmName = realms[this.char.realmIndex] || "太初道主";
    const reqBase = [350, 1400, 4500, 13500, 38000, 95000, 240000, 550000, 1600000][this.char.realmIndex] || 1600000;
    const reqExp = Math.floor(reqBase * Math.pow(1.35, (this.char.realmLayer || 1) - 1));
    const expPct = Math.min(100, Math.floor((this.char.exp / reqExp) * 100));
    const canBreak = this.char.exp >= reqExp;

    // 常駐武道江湖道途狀態列
    const daotuBar = document.createElement("div");
    daotuBar.className = "daotu-persistent-bar hide-in-zen";
    daotuBar.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:2px; flex:1;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span class="daotu-act-tag">${banner.actLabel}</span>
          <span class="daotu-status-text" style="font-weight:900;">${banner.statusText}</span>
        </div>
        <div style="font-size:0.78rem; color:var(--ink-mid);">
          江湖俠名：<b>〔青玄布衣少俠〕</b> ｜ 俠義值：<b>${v14.wuxiaChivalryKarma}</b> ｜ 身懷【太初歲漏玉鑑】
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button type="button" class="btn-modern gold" id="btn-v14-story-step" style="padding:5px 10px; font-size:0.84rem;">
          🧭 履踐俠道 (${banner.nextNodeId})
        </button>
        <button type="button" class="btn-modern secondary" id="btn-v14-daotu-log" style="padding:5px 10px; font-size:0.84rem;">
          📖 武道錄 (${st.completedNodes.length}/20)
        </button>
      </div>
    `;
    container.appendChild(daotuBar);
    daotuBar.querySelector("#btn-v14-story-step")?.addEventListener("click", () => this.triggerStoryNodeModal(banner.nextNodeId));
    daotuBar.querySelector("#btn-v14-daotu-log")?.addEventListener("click", () => this.openDaotuJournalModal());

    // 境界突破與俠道叩關卡片
    const realmStrip = document.createElement("div");
    realmStrip.className = "wuxia-card";
    realmStrip.style.marginBottom = "10px";
    realmStrip.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:1.08rem; color:var(--ink-black);">【${curRealmName} · 第 ${this.char.realmLayer} 重天】</b>
            <span style="font-size:0.86rem; font-weight:900; color:${canBreak ? 'var(--cinnabar-red)' : 'var(--stone-cyan)'};">
              內力元氣 ${this.char.exp.toLocaleString()} / ${reqExp.toLocaleString()} (${expPct}%)
            </span>
          </div>
          <div style="height:10px; background:rgba(34,32,28,0.14); border-radius:2px; overflow:hidden; margin-top:5px; border:1px solid rgba(34,32,28,0.3);">
            <div style="width:${expPct}%; height:100%; background:${canBreak ? 'var(--cinnabar-red)' : 'var(--stone-cyan)'}; transition:width 0.25s ease;"></div>
          </div>
        </div>
        <button type="button" class="btn-jade" id="btn-v14-breakthrough" style="padding:8px 14px; min-width:138px; border-color:${canBreak ? 'var(--cinnabar-red)' : 'var(--ink-border)'};">
          <span class="main-label" style="font-size:1.0rem; color:${canBreak ? 'var(--cinnabar-red)' : 'var(--ink-black)'};">
            ⚡ ${canBreak ? '引雷劫 · 叩關破境！' : '演武蓄力'}
          </span>
          <span class="sub-label">${canBreak ? '三波天劫策略 · 破境獨白' : '轉盤演武秒滿元氣'}</span>
        </button>
      </div>
    `;
    container.appendChild(realmStrip);

    realmStrip.querySelector("#btn-v14-breakthrough")?.addEventListener("click", () => {
      if (this.char.exp < reqExp) {
        this.spinV13DestinyWheel();
        return;
      }
      this.performBreakthrough(reqExp, realms[Math.min(8, this.char.realmIndex + 1)]);
    });

    // 核心演武輪盤卡片
    const slotCard = document.createElement("div");
    slotCard.className = "wuxia-slot-card";

    const cellsHtml = v13.wheelGrid.map((symId, idx) => {
      const sym = V14_WUXIA_SYMBOLS.find(s => s.id === symId) || V14_WUXIA_SYMBOLS[0];
      const isWin = (v13.winningIndices || []).includes(idx);
      return `
        <div class="wuxia-slot-cell ${isWin ? 'winning' : ''}" data-slot-idx="${idx}">
          <div style="font-size:1.85rem; line-height:1.1;">${sym.icon}</div>
          <div style="font-size:0.8rem; color:var(--ink-black); margin-top:2px; font-weight:900;">${sym.name}</div>
          <div style="font-size:0.7rem; color:var(--cinnabar-red); font-weight:800;">×${sym.mult.toFixed(1)}</div>
        </div>
      `;
    }).join("");

    const jokersHtml = V14_MASTER_JOKERS.map(jk => {
      const unlocked = (v13.highestMergeLv || 1) >= jk.minMergeTier;
      return `
        <div class="wuxia-joker-card ${unlocked ? 'active' : ''}" style="opacity:${unlocked ? '1' : '0.45'};" title="${jk.rule}">
          <div style="font-size:1.1rem;">${jk.icon}</div>
          <div style="font-weight:900; color:#ffd27d; font-size:0.75rem;">${jk.name}</div>
          <div style="font-size:0.66rem; color:#d8ceb8; margin-top:1px;">${jk.master}</div>
          <div style="font-size:0.64rem; color:${unlocked ? '#4ee6b6' : '#999'};">${unlocked ? '● 已通悟' : `合真Lv.${jk.minMergeTier}`}</div>
        </div>
      `;
    }).join("");

    slotCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <div>
          <b style="font-size:1.12rem; color:var(--ink-black);">🥋 太極天命演武盤（武學合璧 × 萬倍乘算）</b>
          <span style="font-size:0.8rem; color:var(--cinnabar-red); font-weight:900; margin-left:6px;">演武連貫 ×${(1 + Math.min(10, v13.streakCount) * 0.15).toFixed(2)}</span>
        </div>
        <span style="font-size:0.84rem; font-weight:900; color:var(--stone-cyan);">🔨 龍泉神錘：${v13.hammers}</span>
      </div>

      <!-- 四大江湖宗師心法加持條（Jokers） -->
      <div class="wuxia-joker-strip">${jokersHtml}</div>

      <!-- 3×3 武學星宿輪盤 -->
      <div class="wuxia-slot-grid" id="v13-slot-grid-box">
        ${cellsHtml}
      </div>

      <!-- Balatro 式計分板 -->
      <div class="v13-balatro-score-strip">
        <div>
          <div style="font-size:0.7rem; color:#b8b0a0; text-align:center;">武道底數</div>
          <div class="v13-score-chip" id="v13-chip-val">${v13.lastBaseScore.toLocaleString()}</div>
        </div>
        <div style="font-size:1.3rem; font-weight:900; color:#ff5733;">×</div>
        <div>
          <div style="font-size:0.7rem; color:#b8b0a0; text-align:center;">合璧乘算</div>
          <div class="v13-score-mult" id="v13-mult-val">×${v13.lastMultScore.toFixed(1)}</div>
        </div>
        <div style="font-size:1.3rem; font-weight:900; color:#ffd27d;">＝</div>
        <div>
          <div style="font-size:0.7rem; color:#ffd27d; text-align:center;">獲取內力真元</div>
          <div class="v13-score-total" id="v13-total-val">+${v13.lastTotalGain.toLocaleString()}</div>
        </div>
      </div>

      <!-- 江湖宗師論武語錄條（深度劇情連繫！） -->
      <div class="wuxia-quote-strip" id="v14-master-quote-box">
        💬 <b>宗師批註：</b>${v14.lastMasterComment}
      </div>

      <!-- 操作按鈕列 -->
      <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:8px;">
        <button type="button" class="btn-jade" id="btn-v14-spin-once" style="padding:12px;">
          <span class="main-label" style="font-size:1.15rem;">🥋 運轉太極演武盤 (狂轉破境！)</span>
          <span class="sub-label">合璧共鳴 · 爆出大量內力與【🔨龍泉神錘】</span>
        </button>
        <button type="button" class="btn-jade" id="btn-v14-spin-burst" style="padding:12px; border-color:var(--cinnabar-red);">
          <span class="main-label" style="font-size:1.06rem; color:var(--cinnabar-red);">🔥 五連演武狂潮</span>
          <span class="sub-label">保底名劍三連 · 送神錘</span>
        </button>
      </div>

      <!-- 快速前往四大武合風玩法 -->
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px; margin-top:10px;">
        <button type="button" class="btn-modern gold" id="btn-v14-go-forge" style="font-size:0.84rem; padding:8px 4px;">
          鑄 · 龍泉神兵 (${v13.hammers}錘)
        </button>
        <button type="button" class="btn-modern" id="btn-v14-go-mow" style="font-size:0.84rem; padding:8px 4px; border-color:var(--cinnabar-red); color:var(--cinnabar-red); font-weight:900;">
          斬 · 萬劍屠魔
        </button>
        <button type="button" class="btn-modern secondary" id="btn-v14-go-merge" style="font-size:0.84rem; padding:8px 4px;">
          合 · 八卦合道 (Lv.${v13.highestMergeLv})
        </button>
      </div>
    `;
    container.appendChild(slotCard);

    slotCard.querySelector("#btn-v14-spin-once")?.addEventListener("click", (e) => {
      this.spinV14WuxiaWheel(1, e.currentTarget);
    });
    slotCard.querySelector("#btn-v14-spin-burst")?.addEventListener("click", (e) => {
      this.spinV14WuxiaWheel(5, e.currentTarget);
    });
    slotCard.querySelector("#btn-v14-go-forge")?.addEventListener("click", () => {
      this.currentView = "foundation";
      this.renderView();
    });
    slotCard.querySelector("#btn-v14-go-mow")?.addEventListener("click", () => {
      this.currentView = "map";
      this.renderView();
    });
    slotCard.querySelector("#btn-v14-go-merge")?.addEventListener("click", () => {
      this.currentView = "kungfu";
      this.renderView();
    });
  };

  // 演武輪盤演算法（注入江湖宗師語錄與劇情推進）
  App.prototype.spinV14WuxiaWheel = function(times = 1, btnEl = null) {
    const v13 = this.char.ensureV13AddictiveState();
    const v14 = this.char.ensureV14WuxiaState();
    const st = this.char.ensureStoryState();

    const cells = document.querySelectorAll("#v13-slot-grid-box .wuxia-slot-cell");
    cells.forEach(c => c.classList.add("spinning"));
    audio.playQiCharge();

    const pickWeighted = () => {
      const totalW = V14_WUXIA_SYMBOLS.reduce((a, b) => a + b.weight, 0);
      let r = Math.random() * totalW;
      for (const s of V14_WUXIA_SYMBOLS) {
        if (r < s.weight) return s.id;
        r -= s.weight;
      }
      return V14_WUXIA_SYMBOLS[0].id;
    };

    setTimeout(() => {
      const newGrid = [];
      for (let i = 0; i < 9; i++) newGrid.push(pickWeighted());

      if (times >= 5 || Math.random() < 0.4) {
        const lucky = V14_WUXIA_SYMBOLS[Math.floor(Math.random() * V14_WUXIA_SYMBOLS.length)].id;
        const lines = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];
        lines[Math.floor(Math.random() * lines.length)].forEach(idx => { newGrid[idx] = lucky; });
      }

      v13.wheelGrid = newGrid;
      v13.totalSpins += times;
      v13.streakCount = Math.min(20, (v13.streakCount || 1) + 1);

      let baseChips = 130 + this.char.realmIndex * 115;
      let mult = 1.0 + Math.min(10, v13.streakCount) * 0.15;
      let hammersGained = (v13.highestMergeLv >= 2) ? (1 * times) : 0;
      let qiGained = 50 * times;
      const comboNotes = [];
      const winIdxSet = new Set();
      const counts = {};

      newGrid.forEach((symId, idx) => {
        counts[symId] = (counts[symId] || 0) + 1;
        const sym = V14_WUXIA_SYMBOLS.find(s => s.id === symId);
        if (sym) {
          baseChips += sym.baseExp;
          if (sym.hammerDrop) {
            let h = sym.hammerDrop;
            if (v13.highestMergeLv >= 2) h *= 2;
            hammersGained += h;
            winIdxSet.add(idx);
          }
          if (sym.qiDrop) qiGained += sym.qiDrop;
          if (sym.wudaoDrop) this.char.wudaoPoints = (this.char.wudaoPoints || 0) + sym.wudaoDrop;
        }
      });

      const checkLines = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      checkLines.forEach(line => {
        const [a, b, c] = line;
        if (newGrid[a] === newGrid[b] && newGrid[b] === newGrid[c]) {
          const sym = V14_WUXIA_SYMBOLS.find(s => s.id === newGrid[a]);
          const lineMult = (sym ? sym.mult : 1.6) * (v13.highestMergeLv >= 4 ? 2.5 : 1.65);
          mult *= lineMult;
          winIdxSet.add(a); winIdxSet.add(b); winIdxSet.add(c);
          comboNotes.push(`${sym.icon}【${sym.name}三連】×${lineMult.toFixed(1)}`);
        }
      });

      // 宗師心法乘算加成
      if (v13.highestMergeLv >= 1 && counts["sym_sword"]) {
        const swordBoost = Math.pow(1.35, counts["sym_sword"]);
        mult *= swordBoost;
        comboNotes.push(`🗡️扶搖劍意(${counts["sym_sword"]}柄) ×${swordBoost.toFixed(2)}`);
      }
      if (v13.highestMergeLv >= 3 && counts["sym_thunder"] && counts["sym_fire"]) {
        mult *= 3.2;
        comboNotes.push(`☯️雷火合璧神威 ×3.2！`);
      }
      if (counts["sym_taichu"]) {
        mult *= 3.8;
        comboNotes.push(`👑真武道果降世 ×3.8！`);
      }

      const finalBase = Math.floor(baseChips * times);
      const finalGain = Math.floor(finalBase * mult);
      v13.lastBaseScore = finalBase;
      v13.lastMultScore = mult;
      v13.lastTotalGain = finalGain;
      v13.winningIndices = Array.from(winIdxSet);
      v13.lastComboLines = comboNotes.slice(0, 3);
      if (hammersGained > 0) v13.hammers += hammersGained;

      this.char.exp += finalGain;
      this.char.qi += qiGained;

      // 隨機抽取一位江湖宗師發表論武短評
      const master = V14_MASTER_COMMENTARIES[Math.floor(Math.random() * V14_MASTER_COMMENTARIES.length)];
      const quote = master.quotes[Math.floor(Math.random() * master.quotes.length)];
      v14.lastMasterComment = `${master.author}（${master.title}）：「${quote}」`;

      if (mult >= 6) {
        audio.playLevelUp();
      } else {
        audio.playEpiphanyBell();
      }

      if (btnEl) {
        this.triggerFlyingReward(btnEl, "exp", `💥 ×${mult.toFixed(1)}倍演武共鳴！+${finalGain.toLocaleString()}內力` + (hammersGained ? ` · +${hammersGained}神錘` : ""));
      }

      if (!st.completedNodes.includes("1-1")) {
        this.completeStoryNode("1-1", "參悟太極演武盤", "夜觀星象轉動天命，感應劫源將起於大荒江湖！");
      }

      this.updateHeader();
      this.renderView();
    }, 180);
  };

  // ==================== 2. 〔鑄〕龍泉神爐 · 俠道神兵鍛造（名劍譜 × 武林絕學詞條 × 劇情名劍） ====================
  App.prototype.renderV12FoundationView = function(container) {
    const v13 = this.char.ensureV13AddictiveState();
    const v14 = this.char.ensureV14WuxiaState();
    const st = this.char.ensureStoryState();
    const ce = v13.customEquips;

    const wrap = document.createElement("div");
    wrap.className = "wuxia-hebi-container";

    const mythicChance = Math.min(36, 2.5 + (v13.cauldronLv - 1) * 2.8).toFixed(1);

    let compareHtml = "";
    if (v13.pendingLoot) {
      const nl = v13.pendingLoot;
      const cur = ce[nl.slot] || { name: "無", rarityName: "凡鐵布衣", color: "#575249", atk: 0, hp: 0, def: 0, traitName: "無", traitVal: 0 };
      const diffAtk = nl.atk - cur.atk;
      const diffHp = nl.hp - cur.hp;
      const diffDef = nl.def - cur.def;
      const fmtDiff = (d) => d > 0 ? `<span style="color:#1b7a3d; font-weight:900;">▲ +${d}</span>` : (d < 0 ? `<span style="color:#a32c22; font-weight:900;">▼ ${d}</span>` : `<span style="color:#777;">＝ 0</span>`);

      compareHtml = `
        <div class="v13-loot-compare-grid">
          <div class="wuxia-equip-card">
            <div style="font-size:0.75rem; color:var(--ink-mid); font-weight:800;">【當前佩帶 · ${nl.slotLabel}】</div>
            <div style="font-size:0.98rem; font-weight:900; color:${cur.color}; margin:3px 0;">[${cur.rarityName}] ${cur.name}</div>
            <div>殺伐鋒芒：<b>${cur.atk}</b></div>
            <div>護體氣血：<b>${cur.hp}</b></div>
            <div>金鐘靈罡：<b>${cur.def}</b></div>
            <div style="color:var(--stone-cyan); font-weight:800; margin-top:3px;">武學：${cur.traitName} +${cur.traitVal}%</div>
          </div>

          <div class="wuxia-equip-card ${nl.isMythic ? 'mythic' : ''}" style="border-color:${nl.color};">
            <div style="font-size:0.75rem; color:var(--cinnabar-red); font-weight:900;">✨【龍泉新鑄名兵！】</div>
            <div style="font-size:0.98rem; font-weight:900; color:${nl.color}; margin:3px 0;">[${nl.rarityName}] ${nl.name}</div>
            <div>殺伐鋒芒：<b>${nl.atk}</b> (${fmtDiff(diffAtk)})</div>
            <div>護體氣血：<b>${nl.hp}</b> (${fmtDiff(diffHp)})</div>
            <div>金鐘靈罡：<b>${nl.def}</b> (${fmtDiff(diffDef)})</div>
            <div style="color:var(--cinnabar-red); font-weight:900; margin-top:3px;">傳世武學：${nl.traitName} +${nl.traitVal}%</div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:8px; margin-top:10px;">
          <button type="button" class="btn-jade" id="btn-v14-equip-new">
            <span class="main-label">⚡ 佩帶絕世名兵 (淬煉舊兵得內力)</span>
          </button>
          <button type="button" class="btn-modern secondary" id="btn-v14-salvage-new">
            ♻️ 回爐重鑄 (+${nl.salvageExp}內力 · 返還神錘+1)
          </button>
        </div>
      `;
    }

    wrap.innerHTML = `
      <div class="wuxia-card" style="text-align:center;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="wuxia-title-badge">龍泉神爐 · Lv.${v13.cauldronLv} 爐火純青</span>
          <span style="font-size:0.86rem; font-weight:900; color:var(--cinnabar-red);">🌈 絕品名劍掉率：${mythicChance}%</span>
        </div>

        <div class="wuxia-forge-cauldron" id="btn-v14-smash-furnace" title="敲擊龍泉神爐開鑄名劍！">
          爐
        </div>
        <div style="font-size:0.94rem; font-weight:900; color:var(--ink-black);">
          🔨 庫存龍泉神錘：<span style="color:var(--cinnabar-red); font-size:1.15rem;">${v13.hammers}</span> 把（已開鑄 ${v13.totalForged} 次）
        </div>
        <div style="font-size:0.82rem; color:var(--ink-mid); margin-top:2px;">
          每鑄 5 把神兵自動提升神爐火候，解鎖【獨孤破式 / 降龍神勁 / 北冥吞天】武林傳世名器！
        </div>

        <div style="display:grid; grid-template-columns: 1.3fr 1fr; gap:8px; margin-top:10px;">
          <button type="button" class="btn-jade" id="btn-v14-forge-once" style="padding:11px;">
            <span class="main-label" style="font-size:1.12rem;">🔨 龍泉開爐鑄劍 (必出名器！)</span>
            <span class="sub-label">名劍對比 · 綠字狂飆 · 回爐返還</span>
          </button>
          <button type="button" class="btn-jade" id="btn-v14-forge-burst" style="padding:11px; border-color:var(--cinnabar-red);">
            <span class="main-label" style="font-size:1.05rem; color:var(--cinnabar-red);">🔥 連開五爐 (保底造化/神話)</span>
            <span class="sub-label">自動篩選最高功力名劍</span>
          </button>
        </div>

        ${compareHtml}
      </div>

      <!-- 當前佩帶俠道名兵 -->
      <div class="wuxia-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <b style="font-size:1.02rem; color:var(--ink-black);">🗡️ 陸沉舟佩帶傳世三寶（功力實時翻倍）</b>
          <button type="button" class="chip-btn active" id="btn-v14-free-hammers">🎁 江湖門派贈鐵 (+15神錘)</button>
        </div>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;">
          ${["weapon", "armor", "accessory"].map(slot => {
            const it = ce[slot];
            return `
              <div style="background:#fbf8f0; border:1.5px solid ${it.color}; border-radius:3px; padding:7px; text-align:center;">
                <div style="font-size:0.75rem; font-weight:900; color:${it.color};">[${it.rarityName}]</div>
                <div style="font-size:0.88rem; font-weight:900; color:var(--ink-black); margin:2px 0;">${it.name}</div>
                <div style="font-size:0.76rem; color:var(--ink-mid);">殺+${it.atk}｜血+${it.hp}</div>
                <div style="font-size:0.74rem; color:var(--cinnabar-red); font-weight:800; margin-top:2px;">${it.traitName}+${it.traitVal}%</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
    container.appendChild(wrap);

    const runForge = (count = 1, el = null) => {
      if (v13.hammers <= 0) v13.hammers += 10;
      const useCount = Math.min(v13.hammers, count);
      v13.hammers -= useCount;
      v13.totalForged += useCount;
      v13.cauldronLv = 1 + Math.floor(v13.totalForged / 5);

      const fEl = wrap.querySelector("#btn-v14-smash-furnace");
      if (fEl) {
        fEl.classList.add("smash");
        setTimeout(() => fEl.classList.remove("smash"), 180);
      }

      let bestCandidate = null;
      for (let i = 0; i < useCount; i++) {
        const lvBoost = (v13.cauldronLv - 1) * 3;
        const pool = V14_WUXIA_RARITIES.map(r => ({
          ...r,
          adjWeight: r.tier >= 5 ? r.weight + lvBoost : Math.max(5, r.weight - lvBoost)
        }));
        if (useCount >= 5 && i === useCount - 1) {
          pool.forEach(p => { if (p.tier < 5) p.adjWeight = 0; });
        }
        const totalW = pool.reduce((a, b) => a + b.adjWeight, 0);
        let roll = Math.random() * totalW;
        let chosenRarity = pool[0];
        for (const p of pool) {
          if (roll < p.adjWeight) { chosenRarity = p; break; }
          roll -= p.adjWeight;
        }

        const slotObj = V14_FORGE_SLOTS[Math.floor(Math.random() * V14_FORGE_SLOTS.length)];
        const name = slotObj.names[Math.min(slotObj.names.length - 1, Math.floor((chosenRarity.tier - 1) / 1.4))];
        const trait = V14_WUXIA_TRAITS[Math.floor(Math.random() * V14_WUXIA_TRAITS.length)];
        const realmScale = 1 + this.char.realmIndex * 0.58 + v13.cauldronLv * 0.24;

        const candidate = {
          slot: slotObj.slot,
          slotLabel: slotObj.slot === "weapon" ? "殺伐道兵" : (slotObj.slot === "armor" ? "護體仙甲" : "本命佩飾"),
          name,
          rarityTier: chosenRarity.tier,
          rarityName: chosenRarity.name,
          color: chosenRarity.color,
          isMythic: !!chosenRarity.isMythic,
          atk: Math.floor((150 + Math.random() * 95) * chosenRarity.mult * realmScale),
          hp: Math.floor((550 + Math.random() * 300) * chosenRarity.mult * realmScale),
          def: Math.floor((70 + Math.random() * 50) * chosenRarity.mult * realmScale),
          traitName: trait.name,
          traitVal: Math.floor(trait.min + Math.random() * (trait.max - trait.min)),
          salvageExp: Math.floor(420 * chosenRarity.mult * (1 + this.char.realmIndex * 0.45))
        };
        if (!bestCandidate || (candidate.atk + candidate.hp * 0.25) > (bestCandidate.atk + bestCandidate.hp * 0.25)) {
          bestCandidate = candidate;
        }
      }

      v13.pendingLoot = bestCandidate;
      if (bestCandidate.rarityTier >= 5) {
        audio.playLevelUp();
      } else {
        audio.playSwordClash();
      }
      if (el) {
        this.triggerFlyingReward(el, "qi", `⚔️ 出爐：[${bestCandidate.rarityName}] ${bestCandidate.name}！`);
      }
      this.updateHeader();
      this.renderView();
    };

    wrap.querySelector("#btn-v14-smash-furnace")?.addEventListener("click", (e) => runForge(1, e.currentTarget));
    wrap.querySelector("#btn-v14-forge-once")?.addEventListener("click", (e) => runForge(1, e.currentTarget));
    wrap.querySelector("#btn-v14-forge-burst")?.addEventListener("click", (e) => runForge(5, e.currentTarget));

    wrap.querySelector("#btn-v14-equip-new")?.addEventListener("click", (e) => {
      if (!v13.pendingLoot) return;
      const nl = v13.pendingLoot;
      ce[nl.slot] = nl;
      this.char.exp += nl.salvageExp;
      this.char.silver += 220;
      v13.pendingLoot = null;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "exp", `⚡ 佩帶名兵！功力大進 +${nl.salvageExp}內力`);
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v14-salvage-new")?.addEventListener("click", (e) => {
      if (!v13.pendingLoot) return;
      const nl = v13.pendingLoot;
      this.char.exp += nl.salvageExp;
      v13.hammers += 1;
      v13.pendingLoot = null;
      audio.playQiCharge();
      this.triggerFlyingReward(e.currentTarget, "exp", `♻️ 回爐重鑄 +${nl.salvageExp}內力 · 淬得神錘+1`);
      this.updateHeader();
      this.renderView();
    });

    wrap.querySelector("#btn-v14-free-hammers")?.addEventListener("click", (e) => {
      v13.hammers += 15;
      audio.playEpiphanyBell();
      this.triggerFlyingReward(e.currentTarget, "qi", "🎁 掌門相贈 +15把龍泉神錘！");
      this.renderView();
    });
  };

  // ==================== 3. 〔斬〕萬劍屠魔 · 水墨江湖少室圍攻戰（v19.0 六大本命神兵×18招專屬特效×巨型魔尊×平行數值×全螢幕版） ====================
  // ==================== v19.0 六大本命武器與 18 招專屬技能資料庫 (`WUXIA_WEAPONS_ARSENAL`) ====================
  const WUXIA_WEAPONS_ARSENAL = {
    sword: {
      id: "sword",
      name: "太乙青霜御劍",
      shortName: "青霜御劍",
      icon: "🗡️",
      color: "#38bdf8",
      roleTag: "均衡御劍 · 環身護體",
      pros: "360度環身飛劍無死角護體，並自動點射青霜劍氣，攻守兼備、走位最穩",
      cons: "單發爆發力中等，面對重甲巨型Boss需依靠青蓮劍陣與貫日長虹疊加破防",
      baseCd: 26,
      baseDmgMult: 1.0,
      skills: [
        {
          id: "sword_s1",
          name: "分元青蓮劍陣",
          icon: "🪷",
          color: "#2dd4bf",
          baseCd: 135,
          desc: "周身盛開雙層旋轉8瓣青玉劍蓮與環形劍刃風暴，持續絞殺近身敵群並彈開遠程毒箭",
          vfxLabel: "🪷青蓮劍陣!"
        },
        {
          id: "sword_s2",
          name: "九曜貫日長虹",
          icon: "☄️",
          color: "#38bdf8",
          baseCd: 155,
          desc: "凝聚太乙庚金射出橫貫全場的巨型青金飛劍光束，沿途犁出金色裂地劍痕",
          vfxLabel: "☄️貫日長虹!"
        },
        {
          id: "sword_s3",
          name: "太虛萬劍天瀑",
          icon: "🌧️",
          color: "#60a5fa",
          baseCd: 190,
          desc: "撕裂蒼穹開啟金色劍門，傾瀉24柄斜斬而下的寒霜巨劍瀑布覆蓋全場",
          vfxLabel: "🌧️萬劍天瀑!"
        }
      ]
    },
    saber: {
      id: "saber",
      name: "赤霄焚血狂刀",
      shortName: "赤霄狂刀",
      icon: "🩸",
      color: "#ef4444",
      roleTag: "近戰霸體 · 狂暴嗜血",
      pros: "180度寬幅赤紅血月刀罡，近身單刀傷害極高、破盾極快，命中自帶嗜血回生",
      cons: "射程最短（純近戰），需貼近魔物與Boss搏殺，較易被遠程骨弓與毒蠍風箏",
      baseCd: 30,
      baseDmgMult: 1.45,
      skills: [
        {
          id: "saber_s1",
          name: "修羅十字斬月",
          icon: "⚔️",
          color: "#f87171",
          baseCd: 125,
          desc: "向前方猛烈劈出巨型交叉X形黑紅半月刀波，一路推平路徑敵群並留下燃燒血焰",
          vfxLabel: "⚔️修羅十字斬!"
        },
        {
          id: "saber_s2",
          name: "血海旋風屠戮",
          icon: "🌪️",
          color: "#dc2626",
          baseCd: 160,
          desc: "化為高速旋轉的多層赤金血刃龍捲風，強行捲入周圍魔物多段絞殺並汲取氣血",
          vfxLabel: "🌪️血海旋風!"
        },
        {
          id: "saber_s3",
          name: "焚天裂地斷頭台",
          icon: "🪓",
          color: "#fb923c",
          baseCd: 200,
          desc: "高空劈下48px巨型赤霄鬼頭魔刀虛影，震碎大地炸出8道熔岩裂縫重創Boss",
          vfxLabel: "🪓焚天斷頭台!"
        }
      ]
    },
    spear: {
      id: "spear",
      name: "紫微破界星辰槍",
      shortName: "紫微星槍",
      icon: "🔱",
      color: "#c084fc",
      roleTag: "超長貫穿 · 破甲狙擊",
      pros: "直線刺擊射程最遠，一槍串穿整排敵陣，對鎮關Boss護盾具備雙倍破甲穿透",
      cons: "攻擊面呈窄長直線，兩側與背後較空虛，遭遇四方環形包圍時需走位拉成直線",
      baseCd: 22,
      baseDmgMult: 1.25,
      skills: [
        {
          id: "spear_s1",
          name: "百鳥朝鳳暴雨槍",
          icon: "🦅",
          color: "#e879f9",
          baseCd: 120,
          desc: "向前方扇形極速刺出12道紫金密集槍影與金紅鳳凰火羽，瞬間清空正面扇區",
          vfxLabel: "🦅百鳥朝鳳槍!"
        },
        {
          id: "spear_s2",
          name: "蒼龍破陣貫星衝",
          icon: "🐉",
          color: "#a855f7",
          baseCd: 155,
          desc: "化作螺旋咆哮的紫金巨龍鑽頭長槍直線貫穿全場，將沿途魔物全部頂退釘死",
          vfxLabel: "🐉蒼龍貫星衝!"
        },
        {
          id: "spear_s3",
          name: "紫微星隕八荒陣",
          icon: "✨",
          color: "#818cf8",
          baseCd: 195,
          desc: "從天投下6桿發光紫金星辰長槍插地成陣，槍柱之間連起高壓紫電星光切割網",
          vfxLabel: "✨星隕八荒陣!"
        }
      ]
    },
    chakram: {
      id: "chakram",
      name: "九曜太極陰陽輪",
      shortName: "太極陰陽輪",
      icon: "☯️",
      color: "#facc15",
      roleTag: "迴旋彈射 · 聚怪控場",
      pros: "擲出黑白太極法輪飛至遠處自動折返，往返雙段切割，兼具大範圍減速與聚怪",
      cons: "法輪飛行速度中等，飛出未歸時近身防禦有短暫空檔，單次直擊爆發略低",
      baseCd: 28,
      baseDmgMult: 1.1,
      skills: [
        {
          id: "chakram_s1",
          name: "兩儀雙魚迴旋刃",
          icon: "🔄",
          color: "#fde047",
          baseCd: 130,
          desc: "向四方同時擲出4枚高速自轉的巨型黑白陰陽雙魚法輪，沿8字形弧線來回切割",
          vfxLabel: "🔄兩儀雙魚輪!"
        },
        {
          id: "chakram_s2",
          name: "乾坤顛倒引力漩渦",
          icon: "🌌",
          color: "#a78bfa",
          baseCd: 165,
          desc: "在戰場展開旋轉吸入的紫黑太極黑洞與八卦金環，強行將周圍魔物拖拽聚攏碾碎",
          vfxLabel: "🌌太極引力洞!"
        },
        {
          id: "chakram_s3",
          name: "周天星斗連鎖輪",
          icon: "💫",
          color: "#fbbf24",
          baseCd: 150,
          desc: "射出在敵群間高速Z字形金色閃電彈跳10次的金銀星輪，每次彈跳炸開星芒",
          vfxLabel: "💫周天連鎖輪!"
        }
      ]
    },
    cauldron: {
      id: "cauldron",
      name: "焚天九龍神火爐",
      shortName: "九龍神火爐",
      icon: "🏮",
      color: "#f97316",
      roleTag: "重型轟炸 · 熔岩火海",
      pros: "拋投重型赤金丹爐火砲，爆炸面積最大並在地面留下持續灼燒的紅蓮熔岩火海",
      cons: "攻速最慢、彈道有拋物線飛行延遲，面對高速衝鋒的幽冥妖狼較難直接命中",
      baseCd: 42,
      baseDmgMult: 1.65,
      skills: [
        {
          id: "cauldron_s1",
          name: "八荒紅蓮業火海",
          icon: "🌋",
          color: "#fb923c",
          baseCd: 140,
          desc: "在戰場鋪開3片沸騰熔岩火池與旋轉八瓣紅蓮火柱，踏入的敵人持續融化並減速",
          vfxLabel: "🌋紅蓮業火海!"
        },
        {
          id: "cauldron_s2",
          name: "九龍吐火焚天陣",
          icon: "🔥",
          color: "#ea580c",
          baseCd: 170,
          desc: "頭頂顯化黃金丹爐，向四周噴射8條如風車般旋轉橫掃的赤金火龍吐息光束",
          vfxLabel: "🔥九龍吐火陣!"
        },
        {
          id: "cauldron_s3",
          name: "大日乾坤鎮獄鼎",
          icon: "🏆",
          color: "#f59e0b",
          baseCd: 210,
          desc: "召喚萬鈞雕紋黃金巨鼎從天鎮壓砸落，掀起三圈金紅烈焰衝擊波並震暈全場",
          vfxLabel: "🏆乾坤鎮獄鼎!"
        }
      ]
    },
    banner: {
      id: "banner",
      name: "神霄紫電天罰幡",
      shortName: "紫電天罰幡",
      icon: "⚡",
      color: "#a855f7",
      roleTag: "全圖索敵 · 麻痹雷網",
      pros: "揮動雷幡100%必中鎖定場上魔物降下紫電天雷，無視地形與盾牌並附帶麻痹定身",
      cons: "基礎冷卻較長，未升級前單次打擊目標數較少，懼怕大量雜兵同時貼臉圍攻",
      baseCd: 34,
      baseDmgMult: 1.35,
      skills: [
        {
          id: "banner_s1",
          name: "五雷轟頂天罰柱",
          icon: "🌩️",
          color: "#c084fc",
          baseCd: 135,
          desc: "優先鎖定Boss與精英連續劈下5道粗壯紫白貫天雷柱，地面留存六芒星雷漿池",
          vfxLabel: "🌩️五雷天罰柱!"
        },
        {
          id: "banner_s2",
          name: "神霄萬里連鎖電網",
          icon: "🕸️",
          color: "#38bdf8",
          baseCd: 150,
          desc: "釋放瞬間串聯12名敵人的藍白鋸齒高壓閃電網，令整片敵群同時麻痹抽搐",
          vfxLabel: "🕸️萬里連鎖電!"
        },
        {
          id: "banner_s3",
          name: "九天紫極雷神法相",
          icon: "👑",
          color: "#facc15",
          baseCd: 185,
          desc: "背後顯化金色雷神光輪與3顆高速公轉的紫電雷球，不斷向外劈出放射雷蛇",
          vfxLabel: "👑雷神法相!"
        }
      ]
    }
  };

  // ==================== v22.0 四大靈寵與【升級版太古四聖神獸 (T4)】專屬技能資料庫 ====================
  const WUXIA_PET_SKILLS_INFO = {
    fox: {
      baseName: "赤焰靈狐",
      divineName: "九尾焚天金烏狐帝",
      divineIcon: "🦊🔥",
      color: "#f97316",
      skillName: "九尾妖炎魅惑陣",
      divineSkillName: "☀️大日金烏·九尾焚天滅世陣",
      shortTag: "🦊扇形狐火+魅惑易傷陣",
      divineShortTag: "☀️金烏巨日+9道火龍束+全場易傷60%",
      desc: "普攻扇形狐火；大招展開【九尾妖炎陣】魅惑敵群。升至T4【九尾焚天金烏狐帝】解鎖大日金烏巨日與9道追蹤火龍光束！",
      cdFrames: 260
    },
    turtle: {
      baseName: "玄冥靈龜",
      divineName: "太古混沌玄武真君",
      divineIcon: "🐢❄️",
      color: "#38bdf8",
      skillName: "玄武真水鎮獄冰封",
      divineSkillName: "🌊太古玄武·絕對零度冥海蒼龍界",
      shortTag: "🐢護主冰盾+八方冰封",
      divineShortTag: "🌊+65混沌金罡盾+雙冰龍全屏冰封",
      desc: "普攻穿透冰手裡劍；大招加持【玄武寒晶盾】並冰封敵群。升至T4【太古混沌玄武真君】召喚雙螺旋冰霜蒼龍與8座冰峰全屏凍結！",
      cdFrames: 300
    },
    bird: {
      baseName: "裂空雷雛",
      divineName: "神霄太古滅世雷凰",
      divineIcon: "🐥⚡",
      color: "#facc15",
      skillName: "天鵬紫電裂空俯衝",
      divineSkillName: "🌩️神霄雷凰·萬劫紫極天罰神雷網",
      shortTag: "🐥天鵬掠陣+破盾雷毯",
      divineShortTag: "🌩️百丈雷凰法相+10道天罰雷柱+380%破盾",
      desc: "普攻極速雷羽；大招化作雷鵬降下破盾天雷。升至T4【神霄太古滅世雷凰】展開百丈紫金光翼與10道天罰雷柱瞬間轟碎Boss魔罡！",
      cdFrames: 230
    },
    deer: {
      baseName: "青靈仙鹿",
      divineName: "萬古長青建木麒麟聖鹿",
      divineIcon: "🦌🌸",
      color: "#4ade80",
      skillName: "萬古長青花海甘霖",
      divineSkillName: "🌸太古建木·萬仙桃源回春界",
      shortTag: "🦌回春花海+荊棘纏繞",
      divineShortTag: "🌸回復40HP/30護罡+建木神樹+8道神藤禁錮",
      desc: "普攻飛葉刃；大招展開桃花陣回血定身。升至T4【萬古長青建木麒麟聖鹿】顯化太古建木神樹、回復大量氣血護盾並甩出8道桃花神藤抽擊全場！",
      cdFrames: 275
    }
  };

  // ==================== v23.0 六大【太初通用無限升級神通】資料庫（不限武器 · 無限升階 Lv.1 ➔ Lv.∞ · 獨立專屬高清特效） ====================
  const WUXIA_UNIVERSAL_INFINITE_SKILLS = [
    {
      id: "uni_golden_dragon",
      name: "太初金龍護體真訣",
      shortName: "金龍護體",
      icon: "🐉",
      color: "#fde047",
      baseCd: 145,
      vfxType: "uni_vfx_golden_dragon",
      desc: "召喚環繞周身盤旋的太初黃金神龍真身，碾碎近身群魔並加持護體玄罡（每級傷害+38%、範圍擴大，每2級+1條金龍，可無限升級！）"
    },
    {
      id: "uni_star_meteor",
      name: "九天星辰隕滅大陣",
      shortName: "星辰隕滅",
      icon: "☄️",
      color: "#c084fc",
      baseCd: 155,
      vfxType: "uni_vfx_star_meteor",
      desc: "引動九天紫微星辰化作拖曳長尾的星隕流星雨轟炸敵群，造成220%破罡重創（每級傷害+40%、星隕數量與爆炸半徑持續成長，可無限升級！）"
    },
    {
      id: "uni_frost_nova",
      name: "瑤池太陰寒霜劍嵐",
      shortName: "寒霜劍嵐",
      icon: "❄️",
      color: "#38bdf8",
      baseCd: 150,
      vfxType: "uni_vfx_frost_nova",
      desc: "爆發雙層12瓣極光冰蓮與八方寒霜新月劍氣，大範圍凍結群魔並補充護盾（每級傷害+36%、冰封範圍與護盾值無上限成長，可無限升級！）"
    },
    {
      id: "uni_crimson_lotus",
      name: "大日紅蓮焚世業火",
      shortName: "紅蓮業火",
      icon: "🪷",
      color: "#f97316",
      baseCd: 160,
      vfxType: "uni_vfx_crimson_lotus",
      desc: "於敵陣中心綻放14瓣大日業火紅蓮與沖天火柱，融化Boss魔罡並持續灼燒（每級傷害+42%、紅蓮火海數量與半徑無限成長，可無限升級！）"
    },
    {
      id: "uni_chaos_thunder",
      name: "混沌紫霄神雷天網",
      shortName: "紫霄雷網",
      icon: "⚡",
      color: "#a855f7",
      baseCd: 140,
      vfxType: "uni_vfx_chaos_thunder",
      desc: "釋放交織全場的紫金分形混沌閃電巨網，瞬間麻痹並連環電擊大批魔物（每級傷害+38%、連鎖閃電目標+2，可無限升級！）"
    },
    {
      id: "uni_void_blackhole",
      name: "太虛萬象引力奇點",
      shortName: "太虛奇點",
      icon: "🌌",
      color: "#818cf8",
      baseCd: 170,
      vfxType: "uni_vfx_void_blackhole",
      desc: "撕裂空間凝聚太虛黑洞奇點，強行將周遭妖魔捲入中心並以次元空間刃絞碎（每級傷害+45%、引力半徑與持續時間無限成長，可無限升級！）"
    }
  ];

  // ==================== v23.0 局內升級可選【護身法寶與神裝】完整池 ====================
  const V23_EQUIP_RELIC_PERKS = [
    {
      key: "🔍焦點鏡",
      icon: "🔍",
      title: "【護身法寶】焦點破綻仙鏡（暴擊率+25% · 暴傷185%）",
      desc: "洞悉萬妖破綻！所有武器普攻、絕技與通用神通皆可觸發高額會心暴擊！",
      onAcquire: (state) => {
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 15);
      }
    },
    {
      key: "🧲磁鐵",
      icon: "🧲",
      title: "【護身法寶】太初吸星神石（靈珠與寶箱磁吸範圍×2.5倍）",
      desc: "大世界掉落的經驗靈珠、降妖靈葫與首領寶箱自動飛馳吸入體內，升級飛快！",
      onAcquire: (state) => {
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 15);
      }
    },
    {
      key: "🍎朱果仙露",
      icon: "🍎",
      title: "【護身仙珍】萬年朱果仙露（氣血上限+45 · 每3秒回血回盾）",
      desc: "立即提升 45 點最大氣血並回復 45 HP，且每 3 秒自動為主角回復 6 HP 與 5 護罡！",
      onAcquire: (state) => {
        state.player.maxHp += 45;
        state.player.hp = Math.min(state.player.maxHp, state.player.hp + 45);
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 20);
      }
    },
    {
      key: "🪖玄武荊棘甲",
      icon: "🪖",
      title: "【護身神裝】玄武反傷荊棘重甲（護罡上限+50 · 受擊反震雷火）",
      desc: "護體玄罡上限+50並立即補滿50護罡！受魔物攻擊時自動向四周爆發反傷震波！",
      onAcquire: (state) => {
        state.player.maxShield = (state.player.maxShield || 80) + 50;
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 50);
      }
    },
    {
      key: "🎗️九轉金身帶",
      icon: "🎗️",
      title: "【保命神裝】九轉不滅金身帶（致命傷鎖血逆轉＋回復60%氣血）",
      desc: "遭受致命一擊時免疫死亡、瞬間回復 60% 氣血與 35 護罡，並賦予 2.5 秒無敵金身！",
      onAcquire: (state) => {
        state.player.hasFocusSash = true;
        state.player.sashTriggered = false;
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 25);
      }
    },
    {
      key: "👢疾風破虛靴",
      icon: "👢",
      title: "【身法神裝】疾風破虛仙靴（移速+25% · 全技能冷卻縮短15%）",
      desc: "身輕如燕！移動速度提升 25%，受擊無敵時間延長，且所有武器與通用技能冷卻縮短 15%！",
      onAcquire: (state) => {
        state.player.speedBoostTimer = Math.max(state.player.speedBoostTimer || 0, 300);
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 20);
      }
    }
  ];

  // ==================== v19.0 PokéSurvivor 10波段漸進式關卡與巨型首領配置表（平行血量曲線版） ====================
  const WUXIA_STAGE_WAVES = [
    {
      wave: 1,
      title: "初入青玄 · 外門魔卒",
      subtitle: "外門血刀魔卒沿古道試探進犯，熟悉神兵走位與靈葫收妖！",
      durationFrames: 780,
      spawnInterval: 24,
      maxMobs: 22,
      hpMult: 1.0,
      speedMult: 1.0,
      formation: "scattered",
      unlockNotice: "🩸【血刀門徒】（近戰基礎魔卒）",
      enemyBadges: ["🩸血刀門徒"],
      weights: { swarm: 1.0, charger: 0, ranged: 0, guardian: 0, scorpion: 0, wraith: 0 },
      boss: {
        spawnAtFrame: 420,
        name: "血刀護法統領",
        title: "第一波鎮關統領",
        spriteType: "blood",
        hp: 680,
        shield: 220,
        scale: 3.4,
        isMiniBoss: true
      }
    },
    {
      wave: 2,
      title: "荒原狼蹤 · 群狼突襲",
      subtitle: "新魔物【幽冥妖狼】解鎖！成群結隊高速衝鋒，注意走位閃避！",
      durationFrames: 840,
      spawnInterval: 20,
      maxMobs: 28,
      hpMult: 1.35,
      speedMult: 1.06,
      formation: "wolf_pack",
      unlockNotice: "🐺 新魔物登場：【幽冥妖狼】（高速直線猛撲）",
      enemyBadges: ["🩸血刀門徒", "🐺幽冥妖狼[新!]"],
      weights: { swarm: 0.55, charger: 0.45, ranged: 0, guardian: 0, scorpion: 0, wraith: 0 },
      boss: {
        spawnAtFrame: 450,
        name: "紫瞳嘯月狼王",
        title: "第二波疾風妖統領",
        spriteType: "blood",
        hp: 1150,
        shield: 360,
        scale: 3.55,
        isMiniBoss: true
      }
    },
    {
      wave: 3,
      title: "白骨箭雨 · 魔尊降世",
      subtitle: "新魔物【綠毒骨弓】遠程齊射！本波鎮關大魔尊【赤目血煞魔尊】親臨！",
      durationFrames: 960,
      spawnInterval: 18,
      maxMobs: 34,
      hpMult: 1.75,
      speedMult: 1.10,
      formation: "archer_line",
      unlockNotice: "🏹 新魔物：【綠毒骨弓】＋ 👑大BOSS【赤目血煞魔尊】！",
      enemyBadges: ["🩸血刀門徒", "🐺幽冥妖狼", "🏹綠毒骨弓[新!]", "👑赤目血煞魔尊"],
      weights: { swarm: 0.40, charger: 0.25, ranged: 0.35, guardian: 0, scorpion: 0, wraith: 0 },
      boss: {
        spawnAtFrame: 340,
        name: "赤目血煞魔尊",
        title: "第三波鎮關大魔尊",
        spriteType: "blood",
        hp: 2100,
        shield: 750,
        scale: 3.85,
        isMiniBoss: false
      }
    },
    {
      wave: 4,
      title: "重甲鐵壁 · 盾陣推進",
      subtitle: "新精英【撼山魔將】解鎖！身披六角護體靈盾，需多段技能破盾！",
      durationFrames: 960,
      spawnInterval: 16,
      maxMobs: 40,
      hpMult: 2.25,
      speedMult: 1.14,
      formation: "shield_wall",
      unlockNotice: "🛡️ 新精英登場：【撼山魔將】（自帶六角靈罡護盾）",
      enemyBadges: ["🐺幽冥妖狼", "🏹綠毒骨弓", "🛡️撼山魔將[新!]"],
      weights: { swarm: 0.25, charger: 0.25, ranged: 0.25, guardian: 0.25, scorpion: 0, wraith: 0 },
      boss: {
        spawnAtFrame: 460,
        name: "玄鐵鎮獄魔帥",
        title: "第四波重甲統帥",
        spriteType: "titan",
        hp: 2900,
        shield: 1100,
        scale: 3.7,
        isMiniBoss: true
      }
    },
    {
      wave: 5,
      title: "熔岩毒尾 · 焚天妖皇",
      subtitle: "新魔物【赤炎火毒魔蠍】解鎖！第五波大首領【焚天赤炎妖皇】降臨！",
      durationFrames: 1080,
      spawnInterval: 15,
      maxMobs: 46,
      hpMult: 2.85,
      speedMult: 1.18,
      formation: "pincer",
      unlockNotice: "🦂 新魔物：【赤炎火毒魔蠍】＋ 👑大BOSS【焚天赤炎妖皇】！",
      enemyBadges: ["🏹綠毒骨弓", "🛡️撼山魔將", "🦂赤炎魔蠍[新!]", "👑焚天赤炎妖皇"],
      weights: { swarm: 0.15, charger: 0.20, ranged: 0.20, guardian: 0.15, scorpion: 0.30, wraith: 0 },
      boss: {
        spawnAtFrame: 300,
        name: "焚天赤炎妖皇",
        title: "第五波鎮關大魔尊",
        spriteType: "titan",
        hp: 4200,
        shield: 1500,
        scale: 4.0,
        isMiniBoss: false
      }
    },
    {
      wave: 6,
      title: "九幽寒魄 · 四方合圍",
      subtitle: "新魔物【九幽寒魄鬼將】解鎖！魔軍結成「四方包圍網」從四周同步收縮！",
      durationFrames: 1080,
      spawnInterval: 14,
      maxMobs: 52,
      hpMult: 3.5,
      speedMult: 1.22,
      formation: "ring_encircle",
      unlockNotice: "👻 新魔物登場：【九幽寒魄鬼將】（幽冥死神鐮刀）",
      enemyBadges: ["🛡️撼山魔將", "🦂赤炎魔蠍", "👻九幽鬼將[新!]"],
      weights: { swarm: 0.10, charger: 0.15, ranged: 0.15, guardian: 0.20, scorpion: 0.20, wraith: 0.20 },
      boss: {
        spawnAtFrame: 440,
        name: "九幽噬魂冥王",
        title: "第六波寒魄統領",
        spriteType: "empress",
        hp: 5600,
        shield: 1900,
        scale: 3.8,
        isMiniBoss: true
      }
    },
    {
      wave: 7,
      title: "雷霆萬鈞 · 撼山妖皇",
      subtitle: "精英獸潮全面狂暴！第七波鎮關首領【紫電撼山妖皇】攜九幽魔隕降臨！",
      durationFrames: 1080,
      spawnInterval: 12,
      maxMobs: 58,
      hpMult: 4.3,
      speedMult: 1.26,
      formation: "wolf_pack",
      unlockNotice: "👑 第七波鎮關大魔尊：【紫電撼山妖皇】親臨戰場！",
      enemyBadges: ["🐺幽冥妖狼", "🛡️撼山魔將", "🦂赤炎魔蠍", "👻九幽鬼將", "👑紫電撼山妖皇"],
      weights: { swarm: 0.05, charger: 0.25, ranged: 0.15, guardian: 0.20, scorpion: 0.20, wraith: 0.15 },
      boss: {
        spawnAtFrame: 260,
        name: "紫電撼山妖皇",
        title: "第七波鎮關大魔尊",
        spriteType: "titan",
        hp: 7500,
        shield: 2600,
        scale: 4.1,
        isMiniBoss: false
      }
    },
    {
      wave: 8,
      title: "百鬼夜行 · 雙重包圍",
      subtitle: "高階遠程魔蠍與重甲鬼將聯手合圍！善用武器三絕技與神獸大招清場！",
      durationFrames: 1080,
      spawnInterval: 11,
      maxMobs: 64,
      hpMult: 5.2,
      speedMult: 1.30,
      formation: "ring_encircle",
      unlockNotice: "🔥 高危波次：全高階精英魔物雙重包圍網！",
      enemyBadges: ["🏹綠毒骨弓", "🛡️撼山魔將", "🦂赤炎魔蠍", "👻九幽鬼將"],
      weights: { swarm: 0, charger: 0.15, ranged: 0.25, guardian: 0.20, scorpion: 0.20, wraith: 0.20 },
      boss: {
        spawnAtFrame: 380,
        name: "血海修羅督軍",
        title: "第八波百鬼統帥",
        spriteType: "blood",
        hp: 9600,
        shield: 3200,
        scale: 3.95,
        isMiniBoss: false
      }
    },
    {
      wave: 9,
      title: "深淵前夕 · 魔後降世",
      subtitle: "決戰前夕！【幽冥血海魔後】率領深淵親衛大軍壓境！",
      durationFrames: 1140,
      spawnInterval: 10,
      maxMobs: 70,
      hpMult: 6.4,
      speedMult: 1.34,
      formation: "pincer",
      unlockNotice: "👑 第九波大魔尊：【幽冥血海魔後】降臨！",
      enemyBadges: ["🛡️撼山魔將", "🦂赤炎魔蠍", "👻九幽鬼將", "👑幽冥血海魔後"],
      weights: { swarm: 0, charger: 0.15, ranged: 0.15, guardian: 0.25, scorpion: 0.25, wraith: 0.20 },
      boss: {
        spawnAtFrame: 220,
        name: "幽冥血海魔後",
        title: "第九波鎮關大魔尊",
        spriteType: "empress",
        hp: 12500,
        shield: 4200,
        scale: 4.15,
        isMiniBoss: false
      }
    },
    {
      wave: 10,
      title: "終極決戰 · 萬劫始祖魔帝",
      subtitle: "最終第 10 波決戰！太古深淵總首領【萬劫始祖魔帝】攜八方魔刃降世！",
      durationFrames: 1400,
      spawnInterval: 9,
      maxMobs: 78,
      hpMult: 7.8,
      speedMult: 1.38,
      formation: "ring_encircle",
      unlockNotice: "👑 終極關卡總首領：【太古萬劫始祖魔帝】降臨！",
      enemyBadges: ["🛡️撼山魔將", "🦂赤炎魔蠍", "👻九幽鬼將", "👑萬劫始祖魔帝"],
      weights: { swarm: 0, charger: 0.10, ranged: 0.15, guardian: 0.25, scorpion: 0.25, wraith: 0.25 },
      boss: {
        spawnAtFrame: 150,
        name: "太古萬劫始祖魔帝",
        title: "第十波終極關卡總首領",
        spriteType: "empress",
        hp: 16800,
        shield: 5800,
        scale: 4.35,
        isMiniBoss: false
      }
    }
  ];


  // ==================== v25.0 角色道體、本命武器、怪物、十波BOSS與四系靈寵 2D像素風樣貌描述與細節設定庫 ====================
  const PIXEL_ART_LORE_SPECS = {
    heroes: {
      cyan: {
        sprite0: "HERO_CYAN_0", sprite1: "HERO_CYAN_1",
        appearanceDesc: "頭戴太乙玄冰玉冠，身披青白流雲交領道袍，腰束鎏金劍封，背負三尺寒芒。",
        pixelDetails: "16×17 點陣：頂部冰晶藍白高光道冠(7/M/8)、深青雲紋道袍(3/1)、金邊護腰(L)與青霜劍氣微粒"
      },
      crimson: {
        sprite0: "HERO_CRIMSON_0", sprite1: "HERO_CRIMSON_1",
        appearanceDesc: "狂野白髮配修羅赤角金箍，身披黑紅金邊霸王戰鎧與染血披風，雙目燃燒赤紅殺意。",
        pixelDetails: "16×16 點陣：雙赤角金冠(4/N/L)、雪白狂髮(1)、猩紅魔瞳(N)、黑紅修羅重甲(K/4)與黃金腰封"
      },
      thunder: {
        sprite0: "HERO_THUNDER_0", sprite1: "HERO_THUNDER_1",
        appearanceDesc: "頭頂紫極雷帝寶冕，身著神霄紫金雷紋法袍，肩懸雙枚耀黃雷神連鼓勾玉。",
        pixelDetails: "16×16 點陣：左右對稱雷鼓勾玉(B/L)、紫電雷紋道袍(F/T)、金色雙眸(B)與耀金雷靴(L)"
      },
      gold: {
        sprite0: "HERO_GOLD_0", sprite1: "HERO_GOLD_1",
        appearanceDesc: "頭束混元太極金冠，身穿黑白兩儀陰陽道袍，胸前鑲嵌乾坤八卦金鏡。",
        pixelDetails: "16×16 點陣：五蓮太極金冠(L/8/B)、黑白分明陰陽交領袍(1/0/8)、金色八卦護心鏡與檀金道履"
      }
    },
    weapons: {
      sword: {
        spriteKey: "WEP_SWORD",
        appearanceDesc: "太乙庚金與寒潭玄冰鍛造之雙刃長劍，劍身澄澈如秋水，配鎏金龍翼劍格與朱砂劍穗。",
        pixelDetails: "16×14 點陣：極光白中脊(8)、寒晶藍雙刃(7/M)、黃金龍翼護手(6/L)與雙股朱砂紅穗(4)"
      },
      saber: {
        spriteKey: "WEP_SABER",
        appearanceDesc: "殞神墟古魔遺留之寬背彎月大砍刀，刀背嵌有三枚金環，刃口流淌赤紅焚血魔焰。",
        pixelDetails: "16×14 點陣：厚背鋸齒金環(L/6)、赤紅血槽刀腹(4/N)、熾白弧形鋒刃(8)與檀木金首刀柄(P/L)"
      },
      spear: {
        spriteKey: "WEP_SPEAR",
        appearanceDesc: "引九天紫微星核鍛造之雙叉破界長槍，槍尖閃爍十字星芒，槍頸繫有烈焰紅纓。",
        pixelDetails: "16×14 點陣：紫白菱形星辰槍尖(8/T/F)、黃金槍吞口(L/6)、雙側飄揚朱紅槍纓(4/N)與玄鐵長桿(9)"
      },
      chakram: {
        spriteKey: "WEP_CHAKRAM",
        appearanceDesc: "外圈鑲嵌八枚烈日金刃、內圈黑白陰陽雙魚咬合自轉的九曜乾坤法輪。",
        pixelDetails: "16×12 點陣：外環八向金刃尖刺(L/8)、內環黑白雙魚太極圖(1/0/8)與外圍冰藍星軌(7)"
      },
      cauldron: {
        spriteKey: "WEP_CAULDRON",
        appearanceDesc: "三足雙耳赤金九龍神火鼎，鼎腹鐫刻饕餮火紋，鼎口翻湧大日金紅丹火。",
        pixelDetails: "16×13 點陣：頂部升騰金紅神火(B/L/8/A)、左右黃金雙耳(L/6)、赤紅熔岩鼎腹(4/A)與三足底座"
      },
      banner: {
        spriteKey: "WEP_BANNER",
        appearanceDesc: "顶端托舉神霄紫金雷珠的玄鐵令旗長幡，紫黑幡面織有金色都天神雷雲篆。",
        pixelDetails: "16×14 點陣：頂部耀黃雷球寶頂(B/L/8)、紫電雲篆迎風幡面(F/T/B)與琥珀金節長桿(6/L)"
      }
    },
    monsters: {
      swarm: {
        name: "血刀門徒", sprite0: "CULTIST_0", sprite1: "CULTIST_1",
        appearanceDesc: "身穿暗紅血紋夜行衣、頭戴遮面赤兜帽的邪派刀客，兜帽陰影下閃爍兩點凶黃魔眼，斜握帶血彎刀。",
        pixelDetails: "16×14 點陣：暗紅尖頂兜帽(4/K)、黑影雙黃魔眼(0/B)、金扣護胸(L)與右側染血白刃彎刀(8/4)"
      },
      charger: {
        name: "幽冥妖狼", sprite0: "WOLF_0", sprite1: "WOLF_1",
        appearanceDesc: "四足伏地狂奔的紫黑幽冥魔狼，背脊長滿銀白骨刺，血盆大口露出森白獠牙與猩紅狼瞳。",
        pixelDetails: "18×9 點陣：背部銀白骨刺(8)、紫黑流線狼軀(F/9)、猩紅凶眼(N)與前端森白尖牙(1)"
      },
      ranged: {
        name: "綠毒骨弓", sprite0: "ARCHER_0", sprite1: "ARCHER_1",
        appearanceDesc: "披著墨綠殘破斗篷的慘白骷髏射手，眼窩燃燒碧磷鬼火，雙手挽滿翠綠毒骨長弓。",
        pixelDetails: "15×12 點陣：慘白骷髏頭與肋骨(1/0)、碧綠鬼火雙瞳(C)、深綠斗篷(D)與右側滿弦毒箭(C/8)"
      },
      guardian: {
        name: "撼山魔將", sprite0: "GUARDIAN_0", sprite1: "GUARDIAN_1",
        appearanceDesc: "頭生雙金角的玄鐵重甲巨漢，胸嵌護心金鏡，左手高舉刻有冰藍符文的鬼面鎮獄大盾。",
        pixelDetails: "18×13 點陣：彎曲雙金角(L)、玄鐵重裝甲冑(9/4)、猩紅魔眼(N)與右側巨型冰藍鬼面盾(7/M/N)"
      },
      scorpion: {
        name: "赤炎魔蠍", sprite0: "SCORPION_0", sprite1: "SCORPION_1",
        appearanceDesc: "渾身覆蓋赤紅熔岩甲殼的荒古巨蠍，前端揮舞雙隻火紅巨螯，背後高高揚起滴落金黃火毒的倒鉤尾針。",
        pixelDetails: "16×11 點陣：頂部高舉金黃火毒尾針(B/L)、分段赤紅熔岩背甲(A/4)、雙巨螯與六足步態"
      },
      wraith: {
        name: "九幽寒魄鬼將", sprite0: "WRAITH_0", sprite1: "WRAITH_1",
        appearanceDesc: "籠罩在深紫幽冥兜帽下的懸浮死神鬼將，骷髏面龐閃爍極寒冰光，手持寒氣逼人的巨型冰魄死神鐮刀。",
        pixelDetails: "16×12 點陣：深紫幽冥鬼袍(V/T)、冰藍魂火骷髏面(1/M)、胸前寒晶骨鏈(7)與右側彎月巨鐮(8/M/7/P)"
      }
    },
    bosses: {
      blood_captain: {
        name: "血刀護法統領", sprite0: "BOSS_BLOOD_0", sprite1: "BOSS_BLOOD_1",
        appearanceDesc: "頭戴三叉黃金血蓮冠、身披重型黑紅修羅鎧的護法統領，雙肩展開血煞魔刺，揮舞雙刃斬馬血刀。",
        pixelDetails: "24×19 巨型點陣：三叉黃金冠(L)、黑紅深淵魔甲(K/4)、四目金紅凶光(B/8)與雙側鋸齒血刃"
      },
      wolf_king: {
        name: "紫瞳嘯月狼王", sprite0: "BOSS_WOLF_0", sprite1: "BOSS_WOLF_1",
        appearanceDesc: "體型碩大的雙金角紫焰妖狼王，額生第三隻紫電天眼，背負黃金妖皇戰鞍，狼爪撕裂虛空。",
        pixelDetails: "24×12 巨型點陣：雙金狼角(L)、紫焰鬃毛(F/T)、紫白閃電狼瞳(T/8)與雪白巨型狼牙(1)"
      },
      blood_demon_lord: {
        name: "赤目血煞魔尊", sprite0: "BOSS_BLOOD_0", sprite1: "BOSS_BLOOD_1",
        appearanceDesc: "展開百丈黑紅血翼的三頭魔冠大魔尊，胸口鑲嵌跳動的八角金色血核，威壓震碎大地。",
        pixelDetails: "24×19 巨型點陣：三座黃金魔冠(L)、四目熾白瞳仁(8/B)、胸前八角金紅魔核(6/L/8/4)與雙翼血刃"
      },
      iron_marshal: {
        name: "玄鐵鎮獄魔帥", sprite0: "BOSS_TITAN_0", sprite1: "BOSS_TITAN_1",
        appearanceDesc: "身披萬鈞玄鐵重鎧與黃金肩甲的魔軍統帥，胸膛熔爐噴湧熾熱金焰，雙足踏碎山河。",
        pixelDetails: "24×17 巨型點陣：四柱黃金皇冠(L)、厚重玄鐵裝甲(9/6)、胸口燃燒熔岩核心(A/B/8)與金剛重靴"
      },
      flame_emperor: {
        name: "焚天赤炎妖皇", sprite0: "BOSS_TITAN_0", sprite1: "BOSS_TITAN_1",
        appearanceDesc: "沐浴大荒熔岩而生的赤金巨神妖皇，周身裝甲流淌金紅岩漿，腹心藏有焚天大日火核。",
        pixelDetails: "24×17 巨型點陣：赤金王冠(L/6)、熔岩流光胸甲(A/B/8)、熾白雙目(B/8)與重裝熔岩鐵拳"
      },
      nether_king: {
        name: "九幽噬魂冥王", sprite0: "BOSS_EMPRESS_0", sprite1: "BOSS_EMPRESS_1",
        appearanceDesc: "高戴九幽紫金帝冕、身披冥海紫煞帝袍的噬魂冥王，雙眸閃耀極寒青光，掌控萬鬼生滅。",
        pixelDetails: "24×18 巨型點陣：紫金帝冕(L/T)、幽冥紫煞廣袖帝袍(F/T)、冰青冥火雙瞳(M/8)與胸前魂印"
      },
      thunder_titan: {
        name: "紫電撼山妖皇", sprite0: "BOSS_TITAN_0", sprite1: "BOSS_TITAN_1",
        appearanceDesc: "引九天紫電淬鍊魔軀的撼山妖皇，重甲表面跳動耀眼雷弧，一拳一足皆伴隨天罰雷暴。",
        pixelDetails: "24×17 巨型點陣：雷紋金角冠(L)、玄鐵雷光重鎧(9/6/B)與中央高能雷暴核心(B/8)"
      },
      asura_general: {
        name: "血海修羅督軍", sprite0: "BOSS_BLOOD_0", sprite1: "BOSS_BLOOD_1",
        appearanceDesc: "自萬劫血海殺出的修羅督軍，全身黑甲浸滿金紅煞氣，背插修羅戰旗，刀鋒所向寸草不生。",
        pixelDetails: "24×19 巨型點陣：修羅金冠(L)、深淵血鎧(K/4)、猩紅四目與雙側外擴血煞戰刃(8/4)"
      },
      blood_empress: {
        name: "幽冥血海魔後", sprite0: "BOSS_EMPRESS_0", sprite1: "BOSS_EMPRESS_1",
        appearanceDesc: "頭戴九鳳紫金鳳冠、身披幽冥霓裳羽衣的絕代魔後，冰眸含煞，袖間飛出萬道奪命紫晶魔綾。",
        pixelDetails: "24×18 巨型點陣：鳳翼紫金冠(L/T)、冰晶魔瞳(M/8)、華貴紫金霓裳(F/6/L)與雙側冰魄飛綾(8/F)"
      },
      primordial_emperor: {
        name: "太古萬劫始祖魔帝", sprite0: "BOSS_EMPEROR_0", sprite1: "BOSS_EMPEROR_1",
        appearanceDesc: "統御十波魔劫的終極始祖魔神！頭頂日月雙角鴻蒙魔冕，身披黑紅紫金四色滅世帝鎧，胸口嵌有太古混沌魔眼。",
        pixelDetails: "20×16 終極點陣：日月雙角金冕(L/8/B)、赤紅魔角(4/N)、混沌魔眼核心(L/8/B/F)與不滅帝軀"
      }
    },
    pets: {
      fox: {
        name: "赤焰靈狐", divineName: "九尾焚天金烏狐帝",
        sprites: ["FOX_T1_0", "FOX_T2_0", "FOX_T3_0", "FOX_T4_0"],
        appearanceDesc: "T1白耳尖赤紅幼狐 ➔ T2雙金尾魔狐 ➔ T3五尾金冠聖狐 ➔ T4頭頂大日金烏神冕、背後舒展九條金紅流光火尾的九尾狐帝！",
        pixelDetails: "16×13~18×12 點陣：雪白耳尖與胸毛(1)、熾橙狐軀(A)、金紅九尾扇形展開(L/B/4)與金烏日冕(8/L)"
      },
      turtle: {
        name: "玄冥靈龜", divineName: "太古混沌玄武真君",
        sprites: ["TURTLE_T1_0", "TURTLE_T2_0", "TURTLE_T3_0", "TURTLE_T4_0"],
        appearanceDesc: "T1八卦琉璃小龜 ➔ T2背生冰晶尖刺重龜 ➔ T3深海玄冰龍龜 ➔ T4背負北斗冰峰龍甲、金紋繞體的太古混沌玄武真君！",
        pixelDetails: "16×11~18×9 點陣：玄青龜甲(3/J)、高聳寒冰晶簇背刺(M/7/8)、黃金龍紋腹甲(L)與騰蛇寒氣"
      },
      bird: {
        name: "裂空雷雛", divineName: "神霄太古滅世雷凰",
        sprites: ["BIRD_T1_0", "BIRD_T2_0", "BIRD_T3_0", "BIRD_T4_0"],
        appearanceDesc: "T1金羽雷冠小雀 ➔ T2紫電展翅雷鵰 ➔ T3冰藍金翼天鵬 ➔ T4展開百丈紫金神雷雙翼、頭頂帝皇雷冠的神霄滅世雷凰！",
        pixelDetails: "16×10~20×8 點陣：閃電金羽冠(B/8)、宽幅紫金雷電雙翼(T/L/8/M)、赤金鳥喙(A)與雷光尾羽"
      },
      deer: {
        name: "青靈仙鹿", divineName: "萬古長青建木麒麟聖鹿",
        sprites: ["DEER_T1_0", "DEER_T2_0", "DEER_T3_0", "DEER_T4_0"],
        appearanceDesc: "T1翠玉梅花幼鹿 ➔ T2鹿角盛開粉櫻之神鹿 ➔ T3九色金角青鸞鹿 ➔ T4頭頂七彩仙桃建木神角、翡翠金甲護身的麒麟聖鹿！",
        pixelDetails: "16×12~22×10 點陣：粉櫻繁花與建木神角(E/L/8/M)、翡翠梅花斑鹿軀(C/1)與金色瑞氣祥雲(L)"
      }
    }
  };

  const PixelSpriteEngine = {
    cache: {},
    worldCacheCanvas: null,
    palette: {
      '.': null,
      '0': '#120f0d', // 暗黑輪廓線
      '1': '#f8f5ec', // 仙袍純白 / 白骨高光
      '2': '#dfd7c6', // 仙袍暗部 / 淺暖石色
      '3': '#1e4e5f', // 太虛玄青 / 深海藍
      '4': '#b91c1c', // 朱砂赤紅 / 血煞
      '5': '#fde6ce', // 俠客溫潤膚色
      '6': '#d97706', // 琥珀古金 / 劍格
      '7': '#38bdf8', // 太乙劍氣藍 / 寒晶
      '8': '#ffffff', // 雙刃極光白 / 鏡面高光
      '9': '#334155', // 玄鐵重甲灰藍
      'A': '#ea580c', // 靈狐熾橙 / 熔岩橘
      'B': '#fde047', // 雷電耀黃 / 邪眼金光
      'C': '#22c55e', // 仙鹿翡翠綠
      'D': '#15803d', // 蒼松深綠 / 古苔
      'E': '#f472b6', // 仙蓮粉櫻
      'F': '#9333ea', // 幽冥紫煞
      'G': '#242e33', // 青玉仙坪深色
      'H': '#2c383e', // 青玉仙坪主色
      'I': '#06b6d4', // 靈泉琉璃青
      'J': '#083344', // 靈泉幽邃藍
      'K': '#450a0a', // 魔尊深淵暗紅 / 火山黑岩
      'L': '#fbbf24', // 璀璨明金 / 皇冠
      'M': '#67e8f9', // 極寒玄冰藍
      'N': '#ef4444', // 狂暴鮮紅
      'P': '#78350f', // 檀木棕 / 樹幹
      'Q': '#86efac', // 仙草嫩翠
      'R': '#314047', // 青玉磚高光
      'S': '#1c2428', // 青玉暗紋
      'T': '#c084fc', // 紫電雷光
      'U': '#fca5a5', // 桃花淺粉紅
      'V': '#2e1065', // 雷崖深紫岩
      'W': '#0c4a6e', // 寒潭深冰藍
      'X': '#14532d', // 仙林深草綠
      'Y': '#7c2d12', // 火山焦土褐
      'Z': '#a16207'  // 古道黃石磚
    },

    patterns: {
// ==================== v25.0 全角色道體、六大本命武器、怪物、十波BOSS與四系T1-T4靈寵 2D像素風樣貌描述與細節圖鑑 ====================
      // 1. 四大劍仙道體專屬 2D 像素立繪 (16x18 雙幀動態點陣)
      HERO_CYAN_0: [
        ".....007M700....",
        "....07M888M70...",
        "...00000000000..",
        "..0033555553300.",
        "..0335055505330.",
        "...03555555530.8",
        "...0731171137078",
        "..07M3178713M78.",
        ".011331LLL13378.",
        ".011733111336L0.",
        ".0211337773310..",
        "..021137M73120..",
        "..011233333210..",
        "..01223...3220..",
        "..0770.....0770.",
        "..0330.....0330.",
        "..000.......000."
      ],
      HERO_CYAN_1: [
        ".....007M700....",
        "....07M888M70...",
        "...00000000000..",
        "..0033555553300.",
        "..0335055505330.",
        "...03555555530.8",
        "...0731171137078",
        "..07M3178713M78.",
        ".011331LLL13378.",
        ".011733111336L0.",
        ".0211337773310..",
        "..021137M73120..",
        "...01233333210..",
        "...0773...3770..",
        "....030...030...",
        "....00.....00..."
      ],
      HERO_CRIMSON_0: [
        "..040..0L0..040.",
        ".04N400LLL004N40",
        "..0011111111100.",
        "..0115555555110.",
        "..015N05550N510.",
        "...05555555550.N",
        "..044K44L44K44N8",
        ".04N4K4L8L4K4N8.",
        "044K44LLLLL446L.",
        "04K4444NNN444K0.",
        ".0K444KKKKK440..",
        "..044KKKKKKK40..",
        "..044K44.44K40..",
        "..0KK0.....0KK0.",
        "..0440.....0440.",
        "..000.......000."
      ],
      HERO_CRIMSON_1: [
        "..040..0L0..040.",
        ".04N400LLL004N40",
        "..0011111111100.",
        "..0115555555110.",
        "..015N05550N510.",
        "...05555555550.N",
        "..044K44L44K44N8",
        ".04N4K4L8L4K4N8.",
        "044K44LLLLL446L.",
        ".0K4444NNN4440..",
        "..0444KKKKK440..",
        "..044KKKKKKK40..",
        "...04K4...4K40..",
        "...0440...0440..",
        "....00.....00..."
      ],
      HERO_THUNDER_0: [
        ".0B0..0TBT0..0B0",
        "0BLB00T8B8T00BLB",
        ".0B0.0000000.0B0",
        "..00FF55555FF00.",
        "..0FF5B555B5FF0.",
        "...0F5555555F0.B",
        "..0BTFFTTTFFTB8.",
        ".0FFTFTTTTTFTB8.",
        ".0FFTLLLLLLLTF0.",
        ".0FFTTTTTTTTFF0.",
        "..0FFTTBBBTTFF0.",
        "..0FFFTTTTTFFF0.",
        "..0FFTT...TTFF0.",
        "..0TT0.....0TT0.",
        "..0LL0.....0LL0.",
        "..000.......000."
      ],
      HERO_THUNDER_1: [
        ".0B0..0TBT0..0B0",
        "0BLB00T8B8T00BLB",
        ".0B0.0000000.0B0",
        "..00FF55555FF00.",
        "..0FF5B555B5FF0.",
        "...0F5555555F0.B",
        "..0BTFFTTTFFTB8.",
        ".0FFTFTTTTTFTB8.",
        ".0FFTLLLLLLLTF0.",
        "..0FFTTTTTTTFF0.",
        "..0FFTTBBBTTFF0.",
        "...0FFTTTTTFF0..",
        "...0TT0...0TT0..",
        "....0L0...0L0...",
        "....00.....00..."
      ],
      HERO_GOLD_0: [
        "....00LLLLL00...",
        "...0LL88B88LL0..",
        "...00000000000..",
        "..0011555551100.",
        "..0115055505110.",
        "...01555555510.L",
        "..0LL1110111LL8.",
        ".01111008001118.",
        ".011100018111L0.",
        ".0L1110188111L0.",
        "..011118881110..",
        "..0L11000011L0..",
        "..01100...0110..",
        "..0LL0.....0LL0.",
        "..0660.....0660.",
        "..000.......000."
      ],
      HERO_GOLD_1: [
        "....00LLLLL00...",
        "...0LL88B88LL0..",
        "...00000000000..",
        "..0011555551100.",
        "..0115055505110.",
        "...01555555510.L",
        "..0LL1110111LL8.",
        ".01111008001118.",
        ".011100018111L0.",
        "..0L11018811L0..",
        "..011118881110..",
        "...0110000110...",
        "...0LL0...0LL0..",
        "....060...060...",
        "....00.....00..."
      ],

      // 2. 六大本命武器獨立高辨識度 2D 像素精靈 (16x16 點陣)
      WEP_SWORD: [
        ".......080......",
        "......07870.....",
        "......0M8M0.....",
        "......07870.....",
        "......0M8M0.....",
        "......07870.....",
        "......07L70.....",
        "...0066LLL6600..",
        "..0LL664L466LL0.",
        ".....0064600....",
        ".......040......",
        ".......0L0......",
        "......04.40.....",
        ".....04...40...."
      ],
      WEP_SABER: [
        "......0088800...",
        "....0044N88N80..",
        "...0L644NN8880..",
        "..0LL444NNN880..",
        "...004444NN80...",
        "..0L644K4NN80...",
        "...0044K4NN80...",
        "....0444NNN0....",
        "..006LLLLL600...",
        "..0L6644446L0...",
        ".....0PPPP0.....",
        ".....0P44P0.....",
        "....0LL00LL0....",
        "....00....00...."
      ],
      WEP_SPEAR: [
        ".......080......",
        "......0T8T0.....",
        ".....0FT8TF0....",
        ".....0FT8TF0....",
        "....00FTTTF00...",
        "...0440LLL0440..",
        "..04N406L604N40.",
        "..0440.090.0440.",
        ".......090......",
        ".......0L0......",
        ".......090......",
        ".......090......",
        ".......0L0......",
        ".......000......"
      ],
      WEP_CHAKRAM: [
        "....00L00L00....",
        "..0L88077088L0..",
        ".0L8007887008L0.",
        ".00011888800000.",
        "0L711118800007L0",
        "0871100110088780",
        "0871111008888780",
        "0L711880000887L0",
        ".00008888000000.",
        ".0L8007887008L0.",
        "..0L88077088L0..",
        "....00L00L00...."
      ],
      WEP_CAULDRON: [
        "....0B0..0B0....",
        "...0BL8008LB0...",
        "..0BLLA44ALLB0..",
        ".00LLLLLLLLLL00.",
        "0LL6644444466LL0",
        "0L6044A88A4406L0",
        ".0044ABBBBBA400.",
        ".0644AB88BA4460.",
        ".06644AAAA44660.",
        "..066LLLLLL660..",
        "...0660000660...",
        "..0LL0....0LL0..",
        "..000......000.."
      ],
      WEP_BANNER: [
        "....00BBBB00....",
        "...0LL8BB8LL0...",
        "...060FFFF060...",
        "...060FTBTF60...",
        "...060F8B8F600..",
        "...060FTBTFFTF0.",
        "...060FFFFT8BTF0",
        "...060FFFTB88TF0",
        "...060FFLLTTTT0.",
        "...06000..0000..",
        "...060..........",
        "...0L0..........",
        "...060..........",
        "...000.........."
      ],

      // 3. 專屬 BOSS 補充高解析度 2D 像素矩陣 (紫瞳嘯月狼王 & 太古萬劫始祖魔帝)
      BOSS_WOLF_0: [
        ".0L0........0L0...00..00",
        "0FLF0......0FLF0.0FF00FF",
        "0FFFF08..80FFFFFFFTTFFFF",
        ".0FFFF0000FFFFT8TFFFFTF0",
        ".0FFFT88TFFFFFF88FFFF110",
        "080FFFFFFFFFFFFFFFF11110",
        "0F8099FFFFLFFFFLFF11100.",
        ".0FF999FFFFLLLLFFFF990..",
        "..0999FFFFFFFFFFF9990...",
        "..0999.0099009900.9990..",
        "..0LL0...00..00...0LL0..",
        "..000..............000.."
      ],
      BOSS_WOLF_1: [
        "..0L0.......0L0...00..00",
        ".0FLF0.....0FLF0.0FF00FF",
        "0FFFF08..80FFFFFFFTTFFFF",
        ".0FFFF0000FFFFT8TFFFFTF0",
        ".0FFFT88TFFFFFF88FFFF110",
        "080FFFFFFFFFFFFFFFF11110",
        ".0F899FFFFLFFFFLFF11100.",
        "..0999FFFFLLLLFFFF990...",
        "...099FFFFFFFFFFF990....",
        "...0990..09900990.0990..",
        "...0LL0...00..00..0LL0..",
        "...000.............000.."
      ],
      BOSS_EMPEROR_0: [
        "0L.040.0L88L0.040.L0",
        "0LL0440L8BB8L0440LL0",
        ".0L400KKKKKKKK004L0.",
        "4004KKKKKKKKKKKK4004",
        "4N0K4B88KKKK88B4K0N4",
        "4N0K48BBKLLKBB84K0N4",
        "400KKKKKL88LKKKKK004",
        "0.044FFLLLLLLFF440.0",
        ".044FF6LL88LL6FF440.",
        "0844F6L84LL48L6F4480",
        "8444F6LL4BB4LL6F4448",
        "84.04466LLLL66440.48",
        "0..044KKKKKKKK440..0",
        "...044K00..00K440...",
        "...0LL0......0LL0...",
        "...000........000..."
      ],
      BOSS_EMPEROR_1: [
        "L0.040.0L88L0.040.0L",
        "LL00440L8BB8L04400LL",
        ".04400KKKKKKKK00440.",
        ".044KKKKKKKKKKKK440.",
        "400K4B88KKKK88B4K004",
        "4N0K48BBKLLKBB84K0N4",
        ".00KKKKKL88LKKKKK00.",
        "08044FFLLLLLLFF44080",
        "84044F6LL88LL6F44048",
        "04.04F6L8448L6F40.40",
        "...04F6LLBBLL6F40...",
        "...04466LLLL66440...",
        "....04KKKKKKKK40....",
        "....04K00..00K40....",
        "....0LL0....0LL0....",
        "....000......000...."
      ],

      POKE_GOURD: [
        "....0LL0....",
        "...0LLLL0...",
        "....0660....",
        "..006LL600..",
        ".06LLLLLL60.",
        ".0666LL6660.",
        "..04400440..",
        ".0444LL4440.",
        "0446LLLL6440",
        "04466LL66440",
        ".0446666440.",
        "..00000000.."
      ],

      HERO_0: [
        ".....007700.....",
        "....00LLLL00....",
        "...0000000000...",
        "..005555555500..",
        "..005055550500..",
        "...0555555550..8",
        "....03111130..78",
        "..0033144133078.",
        ".011311LL11378..",
        ".011114444116L..",
        ".021111331110...",
        "..02113333120...",
        "..01123333210...",
        "..01223..3220...",
        "..0220....0220..",
        "..0330....0330..",
        "..000......000.."
      ],
      HERO_1: [
        ".....007700.....",
        "....00LLLL00....",
        "...0000000000...",
        "..005555555500..",
        "..005055550500..",
        "...0555555550..8",
        "....03111130..78",
        "..0033144133078.",
        ".011311LL11378..",
        ".011114444116L..",
        ".021111331110...",
        "..02113333120...",
        "..01123333210...",
        "...0123..3210...",
        "...0330..0330...",
        "....00....00...."
      ],

      FOX_T1_0: [
        "..010...010.........",
        ".01A10.01A10........",
        ".0AAA000AAA0....0110",
        "005AAAAAAAA0...01AA1",
        "05508AAAA110..01AAA1",
        ".0001111110..0AAA4A0",
        "...01111AAAA00AA44A0",
        "...0111AAAAAAA44AA0.",
        "...0AAAAAAAAAA4AA0..",
        "...0AA0000AA00000...",
        "...0AA0..0AA0.......",
        "...000...000........"
      ],
      FOX_T1_1: [
        "..010...010.........",
        ".01A10.01A10...0110.",
        ".0AAA000AAA0..01AA10",
        "005AAAAAAAA0.01AAA10",
        "05508AAAA110.0AAA4A0",
        ".0001111110.0AAA440.",
        "...01111AAAA0AA440..",
        "...0111AAAAAAAAA0...",
        "...0AAAAAAAAAAAA0...",
        "....0AA0000AA000....",
        "....0AA0..0AA0......",
        "....000...000......."
      ],
      FOX_T2_0: [
        "..010...010...0L80..0L80",
        ".01A10.01A10.0LBA0.0LBA0",
        ".0AAA0L0AAA00LBAA00LBAA0",
        "005AAALAAAA0LBA4A0LBA4A0",
        "0550BAAAA110BA44A0BA440.",
        ".00011111110AA4400AA40..",
        "...01111AAAA44A00AA40...",
        "...0L111AAAAAAAAA4A0....",
        "...0AAAAAAAAAAAAAA0.....",
        "...0AA00000AA00000......",
        "...0AA0...0AA0..........",
        "...000....000..........."
      ],
      FOX_T3_0: [
        ".0L0.010.0LL0.010.08L0.08L0.08L0",
        "0BLB01A10LLLL01A10LBA00LBA00LBA0",
        ".0000AAA00LL00AAA0BA400BA400BA40",
        "005AAAAAA8LL8AAAA0A4400A4400A440",
        "0550BAAAA1111AAA00A4400A4400A40.",
        ".0001111111111A00AA400AA400AA0..",
        "...0L1111AAAA4400AA400AA40000...",
        "...0BL111AAAAAAA44A00AA40.......",
        "...0LAAAAAAAAAAAAA44AA0.........",
        "...0AA000000AA00000000..........",
        "...0AA0....0AA0.................",
        "...000.....000.................."
      ],

      TURTLE_T1_0: [
        "..........00777700......",
        "........0033MMMM3300....",
        ".......03377M88M77330...",
        ".0000..037MM3333MM730...",
        "037730033333MMMM333330..",
        "03803333773333333377330.",
        "03333300LLLLLLLLLLLL0070",
        ".00000.03330000003330.00",
        ".......0330.....0330....",
        ".......000......000....."
      ],
      TURTLE_T2_0: [
        ".........080..080..080..",
        "........07M7007M7007M70.",
        ".......03377MMMMMM77330.",
        ".00L00.037M88333388M730.",
        "0377730333333MMMM3333330",
        "038073337M8833333388M730",
        "03333300LLLLLLLLLLLLLL08",
        ".00000.03330.0330.033300",
        ".......0LL0..0LL0.0LL0..",
        ".......000...000..000..."
      ],
      TURTLE_T3_0: [
        "...........00M88M00.....",
        "..........0M700007M0.080",
        ".......08007M0..0M7007M7",
        ".0L80..07M700M88M007M8M0",
        "0377300JJ333MMMMMM333JJ0",
        "038B33JJ3788JJJJJJ8873J0",
        "03333300LLLLLLLLLLLLLL00",
        ".00000.0JJ30.0JJ0.03JJ0.",
        ".......0LL0..0LL0.0LL0..",
        ".......000...000..000..."
      ],

      BIRD_T1_0: [
        ".......0B0..............",
        "......0BLB0....00BB00...",
        ".....0066600.0066BB6600.",
        "...00A068606066BBBBBB60.",
        "..0AA00666666BBBB88BB0..",
        "...00..0666BBBBBB6600...",
        "........06666666600.....",
        ".........0A0.0A06B60....",
        ".........00..00..06B60..",
        "..................0B0B0.",
        "..................00.00."
      ],
      BIRD_T1_1: [
        ".......0B0..............",
        "......0BLB0.............",
        ".....0066600............",
        "...00A068606000000......",
        "..0AA0066666BBBBBB6600..",
        "...00..0666BBBB88BBBB60.",
        "........0666666666600...",
        ".........0A0.0A06B60....",
        ".........00..00..06B60..",
        "..................0B0B0.",
        "..................00.00."
      ],
      BIRD_T2_0: [
        "......0B8B0.............",
        ".....00TTT00..00TBBT00..",
        "...00A0T8T0T00TTBBBBTT0.",
        "..0AA00TTTTTTTBBBB88BBT0",
        "...00..0TTTTBBBBBBTTTT0.",
        "........0TTTTTTTT0000...",
        "........0L0..0L0TBT0....",
        "........00...00.0TBT0...",
        ".................0B0T0..",
        ".................00.00.."
      ],
      BIRD_T3_0: [
        ".....08L80....007M88M700",
        "....00L8L00.007M8LLLL8M0",
        "..00A0L8L0L07M8LLLL88LL0",
        ".0AA00LLLLLLL88LLLLLL00.",
        "..00..0LLLL88LLLL0000...",
        ".......0LLLLLLLL07M70...",
        ".......0L0..0L0.07L7M70.",
        ".......00...00...0L07M80",
        ".................080.080",
        ".................00...00"
      ],

      DEER_T1_0: [
        "...0P0..0P0.............",
        "..0P0P00P0P0............",
        "...00PPPP00.............",
        "..00CCCCCC00............",
        ".0CC80CCCC10............",
        ".0CCCC11110..00CCCCCC00.",
        "..0000111C000CC11CC11CC0",
        ".....0111CCCCCC11CC11CC0",
        ".....0111CCCCCCCCCCCCCC0",
        ".....0CC000000000000CC0.",
        ".....0CC0.0CC0..0CC0CC0.",
        ".....0C0..0C0...0C0.0C0.",
        ".....0C0..0C0...0C0.0C0.",
        ".....0P0..0P0...0P0.0P0.",
        ".....00...00....00..00.."
      ],
      DEER_T2_0: [
        ".0E0.0P0..0E0.0P0.......",
        "0UEU0PPP00UEU0PPP0......",
        ".0E0.00PPPP00.00........",
        "..00CCCCCCCC00..........",
        ".0CC80CCCC110...........",
        ".0CCCC111L10.00CCCCCC00.",
        "..000011L1000CC1ECC1ECC0",
        ".....0111CCCCCC11CC11CC0",
        ".....0111CCCCCCCCCCCCCC0",
        ".....0CC000000000000CC0.",
        ".....0CC0.0CC0..0CC0CC0.",
        ".....0C0..0C0...0C0.0C0.",
        ".....0L0..0L0...0L0.0L0.",
        ".....00...00....00..00.."
      ],
      DEER_T3_0: [
        "0E0.0L0.0E0.0L0.080.....",
        "0LE0LLL0ELE0LLL08M80....",
        ".00.00LLLLLL00.0080.....",
        "..0011CCCCCC110.........",
        ".01180CCCC1110..........",
        ".0111111LL11000CCCCCC00.",
        "..000011L1100CC8LCC8LCC0",
        ".....0L11CCCCCCLLCCLLCC0",
        ".....0L11CCCCCCCCCCCCCL0",
        ".....0CC000000000000CC0.",
        ".....0CC0.0CC0..0CC0CC0.",
        ".....0L0..0L0...0L0.0L0.",
        ".....080..080...080.080.",
        ".....00...00....00..00.."
      ],
      // ==================== v26.0 升級版四大太古聖獸 (Tier 4) 高辨識度專屬剪影點陣真身 ====================
      FOX_T4_0: [
        "...08L80..010.010..08L0.08L0.08L0.08L0",
        "..0L8B8L001A101A100LBA00LBA00LBA00LBA0",
        "..08B4B800AAA0AAA00BA400BA400BA400BA40",
        "005A8L8AAAAAAA11100A4400A4400A4400A440",
        "0550BAAAA111111100AA440AA440AA440AA40.",
        ".0001111111LLLL100AA400AA400AA400AA0..",
        "...0L1111A4LLLL4A00AA400AA400AA0000...",
        "...0BL111AAAAAAA44A00AA400AA40........",
        "...0L4AAAAAAAAAAA444AA000000..........",
        "...0LAA0000000AA000000................",
        "...0LA0......0LA0.....................",
        "...000.......000......................"
      ],
      TURTLE_T4_0: [
        "............00L88M88M00...",
        "...........0M80000008M0080",
        "........08008M0.080.0M87M7",
        ".08L80.07M800M88M8M007M8M0",
        "037M730LJJ333M88888M33JJL0",
        "038B83JJ3788LLLLLLLL8873J0",
        "03333300LLLLLLLLLLLLLLLL00",
        ".00000.0LJJ0.0LJJ0.0JJL0..",
        ".......0LL0..0LL0..0LL0...",
        ".......000...000...000...."
      ],
      BIRD_T4_0: [
        ".....08L80....007MT88TM700",
        "....0L8B8L0..07MT8LLLL8TM0",
        "..00A0L8L0L007MT8LLLL88LL0",
        ".0AA00LLLLLLLL88LLLLLLLL0.",
        "..00..0LLLL88LLLLLL00000..",
        ".......0LLLLLLLLLL07MT0...",
        ".......0L0..0L0..07L8TM0..",
        ".......00...00....0L07M80.",
        "..................080.0T80",
        "..................00...00."
      ],
      DEER_T4_0: [
        "08E0.0L80.08E0.0L80.0880..",
        "0ELE0L8EL0ELE00L8EL08MM80.",
        ".0L0.00LLLLLLLL000..0880..",
        "..00811CCCCCCCC110........",
        ".0L1180CCCCCC11110........",
        ".0L111111LLLL111000CCCCCC0",
        "..0000111LLLL1100CC8LCC8LC",
        ".....08L11CCCCCCLLCCLLCCLC",
        ".....0L111CCCCCCCCCCCCCCCL",
        ".....0LCC0000000000000CCL0",
        ".....0CC0..0CC0...0CC0CC0.",
        ".....0L0...0L0....0L0.0L0.",
        ".....080...080....080.080.",
        ".....00....00.....00..00.."
      ],

      // ==================== 6大階段解鎖魔物與深淵首領像素立繪 ====================
      // Wave 1: 血刀門徒 (Swarm)
      CULTIST_0: [
        "....0000000.....",
        "...044444440....",
        "..04400000440..8",
        "..040B000B040.84",
        "..0400000004084.",
        "...0444L444084..",
        "..0444444446L...",
        ".044K44444K40...",
        ".0KKK44444KK0...",
        "..0KKKKKKKK0....",
        "..0KKK44KKK0....",
        "...0KK00KK0.....",
        "...0K0..0K0.....",
        "...00....00....."
      ],
      CULTIST_1: [
        "....0000000.....",
        "...044444440....",
        "..04400000440...",
        "..040B000B040..8",
        "..04000000040.84",
        "...0444L4440.84.",
        "..04444444406L..",
        ".044K44444K40...",
        ".0KKK44444KK0...",
        "..0KKKKKKKK0....",
        "..0KKK44KKK0....",
        "....0KK00KK0....",
        "....0K0..0K0....",
        "....00....00...."
      ],
      // Wave 2: 幽冥妖狼 (Charger)
      WOLF_0: [
        "080........00...00",
        "0F80......0FF0.0FF",
        "0FFF08..80FFFFFFFF",
        ".0FFF0000FFFFN0FF0",
        ".0FFFFFFFFFFFFFF10",
        "..099FFFFFFFF1110.",
        "..0999FFFFFF9900..",
        "..099..0000.0990..",
        "..00.........00..."
      ],
      WOLF_1: [
        ".080.......00...00",
        "0F80......0FF0.0FF",
        "0FFF08..80FFFFFFFF",
        ".0FFF0000FFFFN0FF0",
        ".0FFFFFFFFFFFFFF10",
        "..099FFFFFFFF1110.",
        "...099FFFFFF990...",
        "....0990..0990....",
        "....00.....00....."
      ],
      // Wave 3: 綠毒骨弓 (Ranged)
      ARCHER_0: [
        "...0000000.....",
        "..011111110.0D.",
        "..010C11C0100CD",
        "..0111001110.0D",
        "...01011010..0C",
        "..0D1111110CCC8",
        ".0DD1011010..0C",
        ".0DD1111110..0D",
        "..0D0111100.0D.",
        "....010010.....",
        "...010..010....",
        "...00....00...."
      ],
      ARCHER_1: [
        "...0000000.....",
        "..011111110.0D.",
        "..010C11C0100CD",
        "..0111001110.0D",
        "...01011010..0C",
        "..0D1111110CCC8",
        ".0DD1011010..0C",
        ".0DD1111110..0D",
        "..0D0111100.0D.",
        "...010..010....",
        "....00..00....."
      ],
      // Wave 4: 撼山魔將 (Guardian)
      GUARDIAN_0: [
        ".0L0......0L0.....",
        "0LL00000000LL0....",
        ".009999999900...08",
        "..0990N99N0990.089",
        "..09999LL99990.089",
        ".04999999999900060",
        "0449999LL999907770",
        "044999LLLL99907M70",
        "0499999LL999907N70",
        ".09999999999007770",
        "..09994444990.000.",
        "..0990....0990....",
        "..000......000...."
      ],
      GUARDIAN_1: [
        ".0L0......0L0.....",
        "0LL00000000LL0..08",
        ".009999999900..089",
        "..0990N99N0990.089",
        "..09999LL99990.060",
        ".04999999999900770",
        "0449999LL999907M70",
        "044999LLLL99907N70",
        "0499999LL999907770",
        ".099999999990.000.",
        "..09994444990.....",
        "...0990..0990.....",
        "...000....000....."
      ],
      // Wave 5 新解鎖：赤炎火毒魔蠍 (Scorpion - 巨鉗、熔岩甲殼、倒鉤火毒尾針 16x14)
      SCORPION_0: [
        ".....0000BB0....",
        "....0AA44BLB0...",
        "...0AA4400B0....",
        "0A00AA40........",
        "04A0AAA44440..0A",
        ".00044AAAA4400A4",
        "..044AB44BA44AA0",
        "..0444AAAA44400.",
        ".0A0444444440A0.",
        "0A0.0A0..0A0.0A0",
        "00..00....00..00"
      ],
      SCORPION_1: [
        "......0000BB0...",
        ".....0AA44BLB0..",
        "...00AA4400B0...",
        "04A0AA40........",
        ".000AAA44440.0A0",
        "..0444AAAA440A40",
        "..044AB44BA4400.",
        "..0444AAAA4440..",
        "..0A04444440A0..",
        ".0A0.0A00A0..0A0",
        ".00..00..00...00"
      ],
      // Wave 6 新解鎖：九幽寒魄鬼將 (Wraith - 幽冥兜帽、慘白骷髏、冰魄死神巨鐮 16x16)
      WRAITH_0: [
        "....000000....08",
        "...0VVVVVV0..0M8",
        "..0VV1111VV007M.",
        "..0V10M1M01V7M..",
        "..0V11101110P...",
        "...0VV111VV0P...",
        "..0VVTTTTTVV0...",
        ".0VVT77777TVP...",
        ".0VVVVVVVVVVP...",
        "..0VVVTTTVVV0...",
        "..0VV.0V0.VV0...",
        "...0..00...0...."
      ],
      WRAITH_1: [
        "....000000...08.",
        "...0VVVVVV0.0M8.",
        "..0VV1111VV07M..",
        "..0V10M1M01V7P..",
        "..0V11101110P...",
        "...0VV111VV0P...",
        "..0VVTTTTTVV0...",
        ".0VVT77777TVP...",
        "..0VVVVVVVVVP...",
        "...0VVTTTVV0....",
        "....0V.0V.0.....",
        ".......0........"
      ],
      // 深淵大魔尊 Boss (24x15)

      // 11. 三大巨型深淵魔尊專屬高解析像素立繪（24x22 巨型點陣，配合 3.5~4.3 倍縮放達 95~115px！）
      BOSS_BLOOD_0: [
        "04..0LL0..0LL0..0LL0..40",
        "0440LLLL00LLLL00LLLL0440",
        ".04400KKKKKKKKKKKK00440.",
        "4004KKKKKKKKKKKKKKKK4004",
        "440K44BB44KKKK44BB44K044",
        "440K4B88B4KKKK4B88B4K044",
        "400KKKKKKKKLLKKKKKKKK004",
        "0..0444444LLLL4444440..0",
        "..0444466LLLLLL6644440..",
        ".044446LL884488LL644440.",
        "0844446L844LL448L6444480",
        "8444446LL44LL44LL6444448",
        "84.044466LLLLLL664440.48",
        "0..044444444444444440..0",
        "...0444KKKKKKKKKK4440...",
        "...044K0000..0000K440...",
        "...044K0........0K440...",
        "...0LL0..........0LL0...",
        "...000............000..."
      ],
      BOSS_BLOOD_1: [
        "40..0LL0..0LL0..0LL0..04",
        "4400LLLL00LLLL00LLLL0044",
        "444000KKKKKKKKKKKK000444",
        ".044KKKKKKKKKKKKKKKK440.",
        "..0K44BB44KKKK44BB44K0..",
        "..0K4B88B4KKKK4B88B4K0..",
        "..0KKKKKKKKLLKKKKKKKK0..",
        ".080444444LLLL444444080.",
        "084044466LLLLLL664440480",
        "8440446LL884488LL6440448",
        "04.0446L844LL448L6440.40",
        "...0446LL44LL44LL6440...",
        "...044466LLLLLL664440...",
        "...044444444444444440...",
        "....044KKKKKKKKKK440....",
        "....044K000..000K440....",
        "....0LL0........0LL0....",
        "....000..........000...."
      ],
      BOSS_TITAN_0: [
        ".0L0..0LL0....0LL0..0L0.",
        "0LLL00LLLL0000LLLL00LLL0",
        "0L660999999LL999999066L0",
        ".000999999LLLL999999000.",
        "..0999BB89999998BB9990..",
        ".0L999B8899LL9988B999L0.",
        "0LL9999999AAAA9999999LL0",
        "0L6999666A8BB8A6669996L0",
        ".00996LLABBBBBBA6LL9900.",
        "..0996LA8BBBBBB8AL6990..",
        "..0996LLABBBBBBA6LL990..",
        "..0999666AAAAA6669990...",
        "...09999999999999990....",
        "...09996666..66669990...",
        "...0999000....0009990...",
        "...0LL0..........0LL0...",
        "...000............000..."
      ],
      BOSS_TITAN_1: [
        ".0L0..0LL0....0LL0..0L0.",
        "0LLL00LLLL0000LLLL00LLL0",
        "0L660999999LL999999066L0",
        ".000999999LLLL999999000.",
        "..0999BB89999998BB9990..",
        "0LL999B8899LL9988B999LL0",
        "0L69999999AAAA99999996L0",
        ".00999666A8BB8A66699900.",
        "..0996LLABBBBBBA6LL990..",
        "..0996LA8BBBBBB8AL6990..",
        "..0996LLABBBBBBA6LL990..",
        "...0999666AAAA6669990...",
        "...099999999999999990...",
        "....0996666..6666990....",
        "....099000....000990....",
        "....0LL0........0LL0....",
        "....000..........000...."
      ],
      BOSS_EMPRESS_0: [
        "0T..0L0..0LLLL0..0L0..T0",
        "0TT0LLL00LLLLLL00LLL0TT0",
        ".0TT00FFFFFFFFFFFF00TT0.",
        "T00TFFFFFFFFFFFFFFFFT00T",
        "TT0FTTMMTTFFFFTTMMTTFT0T",
        "TT0FTM88MTFFFFTM88MTFT0T",
        "T00FFFFFFFFLLFFFFFFFF00T",
        "0..0FFFFFFLLLLFFFFFF0..0",
        "..0FFFF66LLLLLL66FFFF0..",
        ".0FFFF6LL88TT88LL6FFFF0.",
        "08FFFF6L8TTLLTT8L6FFFF80",
        "8FFFFF6LLTTLLTTLL6FFFFF8",
        "8F.0FFF66LLLLLL66FFF0.F8",
        "0..0FFFFFFFFFFFFFFFF0..0",
        "...0FFFFKKKKKKKKFFFF0...",
        "...0FFK0000..0000KFF0...",
        "...0LL0..........0LL0...",
        "...000............000..."
      ],
      BOSS_EMPRESS_1: [
        "T0..0L0..0LLLL0..0L0..0T",
        "TT00LLL00LLLLLL00LLL00TT",
        "TTT000FFFFFFFFFFFF000TTT",
        ".0TTFFFFFFFFFFFFFFFFTT0.",
        "..0FTTMMTTFFFFTTMMTTF0..",
        "..0FTM88MTFFFFTM88MTF0..",
        "..0FFFFFFFFLLFFFFFFFF0..",
        ".080FFFFFFLLLLFFFFFF080.",
        "08F0FFF66LLLLLL66FFF0F80",
        "8FF0FF6LL88TT88LL6FF0FF8",
        "0F.0FF6L8TTLLTT8L6FF0.F0",
        "...0FF6LLTTLLTTLL6FF0...",
        "...0FFF66LLLLLL66FFF0...",
        "...0FFFFFFFFFFFFFFFF0...",
        "....0FFFKKKKKKKKFFF0....",
        "....0LL0........0LL0....",
        "....000..........000...."
      ],

      BOSS_0: [
        "0L0....00LL00....0L0..0N",
        "0LL0..0LLNNLL0..0LL0.0NN",
        ".0KL00KKKKKKKK00LK0.0N8N",
        "0K44KKKKKKKKKKKK44K00N8N",
        "0K4440N8KKKK8N0444K0.0L0",
        "044444KKKKKKKK444440.06.",
        "04K44KKKKKKKKKK44K40.06.",
        ".0KK4440LLLL0444KK0..06.",
        ".0KK444LNNNNL444KK0..06.",
        "..0KK44LNNNNL44KK0...06.",
        "..0KKK44LLLL44KKK0...06.",
        "...0KKKKKKKKKKKK0....06.",
        "...0KKK444444KKK0....00.",
        "...0KK0......0KK0.......",
        "...000........000......."
      ],
      BOSS_1: [
        "0L0....00LL00....0L0..0N",
        "0LL0..0LLNNLL0..0LL00NN.",
        "0K4L00KKKKKKKK00L4K00N8N",
        "0K444KKKKKKKKKK444K0.0L0",
        "044440N8KKKK8N044440.06.",
        ".0444KKKKKKKKKK4440..06.",
        "..0KKKKKKKKKKKKKK0...06.",
        ".0KK4440LLLL0444KK0..06.",
        ".0KK444LNNNNL444KK0..06.",
        "..0KK44LNNNNL44KK0...06.",
        "..0KKK44LLLL44KKK0...06.",
        "...0KKKKKKKKKKKK0....00.",
        "....0KK444444KK0........",
        "....0KK0....0KK0........",
        "....000......000........"
      ],

      PROP_FIRE_BRAZIER: [
        ".....0B..B0.....",
        "....0BL00LB0....",
        "...0BL8LL8LB0...",
        "..0BLLA44ALLB0..",
        "..0AAA4444AAA0..",
        ".00LLLLLLLLLL00.",
        "0664444444444660",
        "06L6666666666L60",
        ".0666LLLLLL6660.",
        "..006644446600..",
        "...0666666660...",
        "..066000000660..",
        "..000......000.."
      ],
      PROP_ICE_SPIRE: [
        ".......080......",
        "......08M80.....",
        "..080.0M7M0.080.",
        ".08M800M7M008M80",
        ".0M7M07M8M70M7M0",
        "07M8M77M8M77M8M7",
        "07M8M77M7M77M8M7",
        "037M737M7M737M73",
        ".0373337M733373.",
        "..0333333333330.",
        "...00000000000.."
      ],
      PROP_THUNDER_OBELISK: [
        "......0BB0......",
        ".....0B88B0.....",
        "....0FFBBFF0....",
        "...099TTTT990...",
        "...099TBBT990...",
        "...0999BB9990...",
        "...099TBBT990...",
        "...099TTTT990...",
        "..09999BB99990..",
        ".0LLLLLLLLLLLL0.",
        "0999999999999990",
        "0000000000000000"
      ],
      PROP_PEACH_TREE: [
        "....00EEEE00....",
        "..00EEUEEUEE00..",
        ".0EEU8EEEE8UEE0.",
        "0EEUEEEEEEEUEEE0",
        "0EU8EEQQQQEE8UE0",
        "0EEEEQCCCCQEEEE0",
        ".00CCCCCCCC00...",
        "....00PPPP00....",
        ".....0PPPP0.....",
        ".....0PPPP0.....",
        "....0PPPPPP0....",
        "...0PPP00PPP0...",
        "...000....000..."
      ],
      PROP_PINE_TREE: [
        "......0DD0......",
        ".....0DQQD0.....",
        "....0DDCCDD0....",
        "...00CCCCCC00...",
        "....0DQQQQD0....",
        "..00DDCCCCDD00..",
        ".0DDCCCCCCCCDD0.",
        "00DDDDDDDDDDDD00",
        ".....0PPPP0.....",
        ".....0PPPP0.....",
        "....0PPPPPP0....",
        "....000..000...."
      ],

      SWORD: [
        "....080...",
        "...07870..",
        "...07870..",
        "...07870..",
        "...07870..",
        "...07870..",
        ".066LLL660",
        "...04640..",
        "....040...",
        "...04.40.."
      ],
      PROJ_FIRE_LOTUS: [
        "....0BB0....",
        "..00A88A00..",
        ".0AA4BB4AA0.",
        ".0A4BBBB4A0.",
        "0B8B4884B8B0",
        "0B88888888B0",
        "0B8B4884B8B0",
        ".0A4BBBB4A0.",
        ".0AA4BB4AA0.",
        "..00A88A00..",
        "....0BB0...."
      ],
      PROJ_DRAGON_HEAD: [
        "0L0........0L0",
        "0BL00....00LB0",
        ".0LLL0000LLL0.",
        ".0LLLL44LLLL0.",
        "0LL08L44L80LL0",
        "0LLLLLLLLLLLL0",
        ".0L44LLLL44L0.",
        ".084444444480.",
        "..0044444400.."
      ],
      PROJ_FOX_FIRE: [
        "..0B..B0..",
        ".0BL00LB0.",
        "0BL8AA8LB0",
        "0B8AAAA8B0",
        "0BA4884AB0",
        ".0A4884A0.",
        "..0AAAA0..",
        "...0000..."
      ],
      PROJ_WATER_SHURIKEN: [
        "....0880..",
        ".00.0MM0..",
        "08M007700.",
        "0MM7788770",
        ".007888870",
        "..077MM700",
        "..0MM0.080",
        "..0880...."
      ],
      PROJ_THUNDER_FEATHER: [
        "......00BB00",
        "..0000BBBB80",
        "0TBBBB888880",
        "0TBBBB888880",
        "..0000BBBB80",
        "......00BB00"
      ],
      PROJ_LEAF_BLADE: [
        ".....0QQ0.",
        "...00QCCQ0",
        "..0QCC8CC0",
        ".0QC88CC0.",
        "0QCC8CC0..",
        "0CCQ00....",
        ".00......."
      ],
      PROJ_BONE_ARROW: [
        ".......0CC0.",
        "0D00000C88C0",
        "0111111C88C0",
        "0D00000C88C0",
        ".......0CC0."
      ],
      PROJ_DEMON_BLADE: [
        "...00NN00..",
        ".00NN44NN0.",
        "0NN448844N0",
        "0N488KK8840",
        "0N48K00K840",
        ".0N44..44N0",
        "..00....00."
      ],
      EXP_GEM: [
        "..0000..",
        ".078870.",
        "07888870",
        "07877870",
        ".077770.",
        "..0000.."
      ],
      HAMMER: [
        ".000000.",
        "09888890",
        "09L88L90",
        "09999990",
        "..0660..",
        "..0PP0..",
        "..0PP0..",
        "..0000.."
      ],
      BOSS_CHEST: [
        ".00000000.",
        "044LLLL440",
        "04LLLLLL40",
        "000L88L000",
        "044LLLL440",
        "0444444440",
        ".00000000."
      ]
    },

    get(key, scale = 2, tintWhite = false) {
      const cacheKey = `${key}_${scale}_${tintWhite ? 'w' : 'n'}`;
      if (this.cache[cacheKey]) return this.cache[cacheKey];

      const pattern = this.patterns[key];
      if (!pattern) return null;

      const h = pattern.length;
      const w = pattern[0].length;
      const c = document.createElement("canvas");
      c.width = w * scale;
      c.height = h * scale;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = false;

      for (let r = 0; r < h; r++) {
        const row = pattern[r];
        for (let col = 0; col < w; col++) {
          const char = row[col];
          const color = this.palette[char];
          if (color) {
            ctx.fillStyle = tintWhite ? (char === '0' ? '#475569' : '#ffffff') : color;
            ctx.fillRect(col * scale, r * scale, scale, scale);
          }
        }
      }
      this.cache[cacheKey] = c;
      return c;
    },

    draw(ctx, key, x, y, scale = 2, flipX = false, tintWhite = false, angle = 0) {
      const sprite = this.get(key, scale, tintWhite);
      if (!sprite) return;
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.translate(Math.round(x), Math.round(y));
      if (angle !== 0) ctx.rotate(angle);
      if (flipX) ctx.scale(-1, 1);
      ctx.drawImage(sprite, -Math.round(sprite.width / 2), -Math.round(sprite.height / 2));
      ctx.restore();
    },

    getWorldTerrainCanvas(worldW, worldH) {
      if (this.worldCacheCanvas && this.worldCacheCanvas.width === worldW && this.worldCacheCanvas.height === worldH) {
        return this.worldCacheCanvas;
      }
      const c = document.createElement("canvas");
      c.width = worldW;
      c.height = worldH;
      const ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = false;

      ctx.fillStyle = "#263238";
      ctx.fillRect(0, 0, worldW, worldH);

      for (let i = 0; i < 650; i++) {
        const rx = (i * 173) % worldW;
        const ry = (i * 257) % worldH;
        const rw = 10 + (i % 18);
        const rh = 6 + ((i * 3) % 12);
        ctx.fillStyle = (i % 5 === 0) ? "#1e3a2f" : ((i % 2 === 0) ? "#2e3c43" : "#1f292e");
        ctx.beginPath();
        ctx.ellipse(rx, ry, rw, rh, (i % 3) * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#473c33";
      for (let y = 140; y <= 760; y += 14) {
        const wobble = Math.sin(y * 0.03) * 10;
        ctx.beginPath();
        ctx.ellipse(600 + wobble, y, 30, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6b5744";
        ctx.beginPath();
        ctx.ellipse(600 + wobble - 8, y, 8, 5, 0.2, 0, Math.PI * 2);
        ctx.ellipse(600 + wobble + 9, y + 2, 9, 5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#473c33";
      }
      for (let x = 160; x <= 1040; x += 14) {
        const wobble = Math.cos(x * 0.03) * 10;
        ctx.beginPath();
        ctx.ellipse(x, 450 + wobble, 10, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#6b5744";
        ctx.beginPath();
        ctx.ellipse(x, 450 + wobble - 8, 5, 8, 0.2, 0, Math.PI * 2);
        ctx.ellipse(x + 2, 450 + wobble + 9, 5, 9, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#473c33";
      }

      ctx.save();
      const drawOrganicBlob = (cx, cy, rx, ry, lobes, seed, fillStyle, strokeStyle, lw = 3) => {
        ctx.beginPath();
        for (let a = 0; a <= 64; a++) {
          const ang = (a / 64) * Math.PI * 2;
          const rMod = 1 + 0.12 * Math.sin(ang * lobes + seed) + 0.07 * Math.cos(ang * (lobes + 3) - seed);
          const px = cx + Math.cos(ang) * rx * rMod;
          const py = cy + Math.sin(ang) * ry * rMod;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        if (fillStyle) { ctx.fillStyle = fillStyle; ctx.fill(); }
        if (strokeStyle) { ctx.strokeStyle = strokeStyle; ctx.lineWidth = lw; ctx.stroke(); }
      };

      drawOrganicBlob(600, 145, 240, 115, 5, 1.2, "#3b0a0a", "#7c2d12", 4);
      drawOrganicBlob(600, 145, 195, 90, 6, 2.5, "#5c140e", null);
      ctx.strokeStyle = "#ea580c";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(430, 110);
      ctx.bezierCurveTo(510, 165, 650, 95, 765, 155);
      ctx.stroke();
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 4;
      ctx.stroke();
      drawOrganicBlob(515, 140, 32, 20, 4, 0.5, "#ea580c", "#fbbf24", 2);
      drawOrganicBlob(685, 135, 36, 22, 5, 1.8, "#ea580c", "#fbbf24", 2);

      drawOrganicBlob(175, 450, 145, 140, 5, 0.8, "#082f49", "#38bdf8", 3);
      drawOrganicBlob(175, 450, 115, 110, 6, 2.1, "#0284c7", "#bae6fd", 2);
      drawOrganicBlob(165, 440, 75, 70, 4, 3.4, "#0ea5e9", null);
      ctx.strokeStyle = "#e0f2fe";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(115, 390); ctx.lineTo(155, 425); ctx.lineTo(140, 465);
      ctx.moveTo(155, 425); ctx.lineTo(205, 415);
      ctx.moveTo(190, 470); ctx.lineTo(230, 505);
      ctx.stroke();

      drawOrganicBlob(1025, 450, 145, 140, 6, 1.5, "#1e1b4b", "#7e22ce", 3);
      drawOrganicBlob(1025, 450, 112, 108, 5, 3.0, "#2e1065", "#c084fc", 2);
      ctx.strokeStyle = "#c084fc";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(940, 385); ctx.lineTo(995, 430); ctx.lineTo(975, 495);
      ctx.moveTo(995, 430); ctx.lineTo(1065, 445); ctx.lineTo(1100, 400);
      ctx.moveTo(1045, 470); ctx.lineTo(1085, 515);
      ctx.stroke();
      ctx.strokeStyle = "#fef08a";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      drawOrganicBlob(600, 760, 245, 118, 5, 2.2, "#064e3b", "#16a34a", 3);
      drawOrganicBlob(600, 760, 200, 92, 6, 0.9, "#14532d", null);
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(420, 755);
      ctx.bezierCurveTo(520, 720, 660, 800, 780, 745);
      ctx.stroke();
      ctx.strokeStyle = "#a5f3fc";
      ctx.lineWidth = 3;
      ctx.stroke();
      for (let f = 0; f < 45; f++) {
        const fx = 420 + ((f * 53) % 360);
        const fy = 680 + ((f * 37) % 155);
        ctx.fillStyle = (f % 3 === 0) ? "#f472b6" : ((f % 3 === 1) ? "#fde047" : "#4ade80");
        ctx.beginPath();
        ctx.arc(fx, fy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      const fireProps = [[440, 95], [760, 95], [475, 200], [725, 200], [395, 145], [805, 145]];
      fireProps.forEach(([px, py]) => this.draw(ctx, "PROP_FIRE_BRAZIER", px, py, 2.2));

      const iceProps = [[85, 355], [260, 355], [85, 545], [260, 545], [120, 450], [235, 450]];
      iceProps.forEach(([px, py]) => this.draw(ctx, "PROP_ICE_SPIRE", px, py, 2.2));

      const thunderProps = [[940, 355], [1110, 355], [940, 545], [1110, 545], [965, 450], [1085, 450]];
      thunderProps.forEach(([px, py]) => this.draw(ctx, "PROP_THUNDER_OBELISK", px, py, 2.2));

      const forestProps = [[435, 705], [765, 705], [485, 825], [715, 825], [390, 765], [810, 765]];
      forestProps.forEach(([px, py], i) => this.draw(ctx, i % 2 === 0 ? "PROP_PEACH_TREE" : "PROP_PINE_TREE", px, py, 2.3));

      this.worldCacheCanvas = c;
      return c;
    },

    drawPixelArena(ctx, worldW, worldH, frame, mode, springCore) {
      if (typeof worldW !== "number") {
        worldW = 1200;
        worldH = 900;
      }
      ctx.save();
      ctx.imageSmoothingEnabled = false;

      const worldCanvas = this.getWorldTerrainCanvas(worldW, worldH);
      ctx.drawImage(worldCanvas, 0, 0);

      for (let i = 0; i < 6; i++) {
        const fx = 440 + ((i * 67 + Math.floor(frame * 0.5)) % 320);
        const fy = 75 + ((i * 43 - Math.floor(frame * 0.8)) % 140 + 140) % 140;
        ctx.fillStyle = (i % 2 === 0) ? "#fde047" : "#f97316";
        ctx.beginPath();
        ctx.arc(fx, fy, 3, 0, Math.PI * 2);
        ctx.fill();

        const ix = 75 + ((i * 53 + Math.floor(frame * 0.3)) % 190);
        const iy = 345 + ((i * 61 + Math.floor(frame * 0.4)) % 200);
        ctx.strokeStyle = "#e0f2fe";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(ix - 3, iy); ctx.lineTo(ix + 3, iy);
        ctx.moveTo(ix, iy - 3); ctx.lineTo(ix, iy + 3);
        ctx.stroke();

        if ((frame + i * 7) % 18 < 4) {
          const tx = 925 + ((i * 47) % 190);
          const ty = 355 + ((i * 59) % 180);
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(tx + 8, ty + 6);
          ctx.lineTo(tx - 4, ty + 14);
          ctx.stroke();
        }

        const gx = 440 + ((i * 71 + Math.floor(frame * 0.6)) % 320);
        const gy = 685 + ((i * 37 + Math.floor(frame * 0.5)) % 140);
        ctx.fillStyle = (i % 2 === 0) ? "#f472b6" : "#86efac";
        ctx.beginPath();
        ctx.ellipse(gx, gy, 3.5, 2, frame * 0.05, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      const drawRegionTitle = (text, x, y, color) => {
        ctx.fillStyle = "#000000";
        ctx.fillText(text, x - 1, y);
        ctx.fillText(text, x + 1, y);
        ctx.fillText(text, x, y - 1);
        ctx.fillText(text, x, y + 1);
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
      };
      drawRegionTitle("🔥 烈焰紅蓮谷 · 赤焰靈狐棲息地", 600, 52, "#fde047");
      drawRegionTitle("💧 瑤池寒玉潭 · 玄冥靈龜棲息地", 175, 305, "#67e8f9");
      drawRegionTitle("⚡ 神霄雷鳴崖 · 裂空雷雛棲息地", 1025, 305, "#c084fc");
      drawRegionTitle("🌿 萬古長青林 · 青靈仙鹿棲息地", 600, 652, "#86efac");

      if (springCore) {
        const sx = Math.round(springCore.x);
        const sy = Math.round(springCore.y);
        const sr = springCore.r || 34;

        const drawOctagon = (radius, fillStyle, strokeStyle, lineWidth = 2) => {
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const ang = (i * Math.PI / 4) + Math.PI / 8;
            const ox = sx + Math.cos(ang) * radius;
            const oy = sy + Math.sin(ang) * radius;
            if (i === 0) ctx.moveTo(ox, oy);
            else ctx.lineTo(ox, oy);
          }
          ctx.closePath();
          if (fillStyle) { ctx.fillStyle = fillStyle; ctx.fill(); }
          if (strokeStyle) { ctx.strokeStyle = strokeStyle; ctx.lineWidth = lineWidth; ctx.stroke(); }
        };

        drawOctagon(sr + 20, "#1e293b", "#fbbf24", 2.5);
        drawOctagon(sr + 13, "#cbd5e1", "#475569", 1.5);
        drawOctagon(sr + 4, "#083344", "#06b6d4", 2);

        const pulseR = ((frame * 0.4) % sr);
        drawOctagon(sr - 2, (springCore.hp > 30) ? "#0e7490" : "#991b1b", null);
        ctx.strokeStyle = "rgba(103, 232, 249, 0.55)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(frame * 0.01);
        for (let p = 0; p < 8; p++) {
          ctx.save();
          ctx.rotate((p * Math.PI) / 4);
          ctx.fillStyle = (p % 2 === 0) ? "#f472b6" : "#fbcfe8";
          ctx.beginPath();
          ctx.ellipse(0, -10, 4.5, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        for (let k = 0; k < 4; k++) {
          const sAng = frame * 0.02 + (k * Math.PI / 2);
          const stX = Math.round(sx + Math.cos(sAng) * (sr + 26));
          const stY = Math.round(sy + Math.sin(sAng) * (sr + 26));
          this.draw(ctx, "PROP_THUNDER_OBELISK", stX, stY, 1.3);
        }

        const bw = 88;
        ctx.fillStyle = "#000000";
        ctx.fillRect(sx - bw / 2, sy - sr - 28, bw, 10);
        const hpPct = Math.max(0, springCore.hp / springCore.maxHp);
        ctx.fillStyle = hpPct > 0.35 ? "#06b6d4" : "#ef4444";
        ctx.fillRect(sx - bw / 2 + 1, sy - sr - 27, Math.round((bw - 2) * hpPct), 8);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`🌊 青玄靈脈 ${springCore.hp}%`, sx, sy - sr - 20);
      }

      ctx.restore();
    },

    drawVineWhipVFX(ctx, vw, frame) {
      ctx.save();
      const progress = 1 - (vw.life / 20);
      const curLen = vw.maxR * Math.sin(progress * Math.PI * 0.85);
      const baseRot = frame * 0.08;

      for (let b = 0; b < 6; b++) {
        const branchAng = baseRot + (b * Math.PI / 3);
        ctx.save();
        ctx.translate(vw.x, vw.y);
        ctx.rotate(branchAng);

        ctx.strokeStyle = "#15803d";
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let d = 8; d <= curLen; d += 8) {
          const waveY = Math.sin(d * 0.12 - frame * 0.3) * 9;
          ctx.lineTo(d, waveY);
        }
        ctx.stroke();

        ctx.strokeStyle = "#4ade80";
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let d = 18; d < curLen; d += 22) {
          const wy = Math.sin(d * 0.12 - frame * 0.3) * 9;
          this.draw(ctx, "PROJ_LEAF_BLADE", d, wy - 5, 1.3, false, false, 0.5);
          if (d % 44 === 18) {
            ctx.fillStyle = "#f472b6";
            ctx.beginPath();
            ctx.arc(d, wy + 4, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fde047";
            ctx.beginPath();
            ctx.arc(d, wy + 4, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }
      ctx.restore();
    },

    drawIceWaveVFX(ctx, iw, frame) {
      ctx.save();
      ctx.translate(iw.x, iw.y);
      const r = iw.r;
      const alpha = Math.min(1, iw.life / 12);
      ctx.globalAlpha = alpha;

      ctx.save();
      ctx.rotate(frame * 0.03);
      ctx.strokeStyle = "#67e8f9";
      ctx.lineWidth = 2.5;
      for (let k = 0; k < 6; k++) {
        const ang = (k * Math.PI) / 3;
        const ex = Math.cos(ang) * r;
        const ey = Math.sin(ang) * r;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        const bx = Math.cos(ang) * (r * 0.65);
        const by = Math.sin(ang) * (r * 0.65);
        ctx.beginPath();
        ctx.moveTo(bx + Math.cos(ang + 0.6) * 14, by + Math.sin(ang + 0.6) * 14);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + Math.cos(ang - 0.6) * 14, by + Math.sin(ang - 0.6) * 14);
        ctx.stroke();
      }
      ctx.restore();

      const spikeCount = 8;
      for (let s = 0; s < spikeCount; s++) {
        const sAng = (s * Math.PI * 2) / spikeCount - frame * 0.02;
        const sx = Math.cos(sAng) * r;
        const sy = Math.sin(sAng) * r;
        this.draw(ctx, "PROP_ICE_SPIRE", sx, sy, 1.35);
      }

      ctx.restore();
    },

    drawTaijiPulseVFX(ctx, tp, frame) {
      ctx.save();
      ctx.translate(tp.x, tp.y);
      ctx.rotate(frame * 0.05);
      const r = tp.r;
      ctx.globalAlpha = Math.min(0.88, tp.life / 15);

      ctx.fillStyle = "rgba(248, 245, 236, 0.38)";
      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2);
      ctx.arc(0, r / 2, r / 2, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(0, -r / 2, r / 2, Math.PI / 2, -Math.PI / 2, false);
      ctx.fill();

      ctx.fillStyle = "rgba(18, 15, 13, 0.48)";
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2);
      ctx.arc(0, -r / 2, r / 2, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(0, r / 2, r / 2, -Math.PI / 2, Math.PI / 2, true);
      ctx.fill();

      ctx.fillStyle = "#120f0d";
      ctx.beginPath();
      ctx.arc(0, -r / 2, Math.max(3, r * 0.12), 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(0, r / 2, Math.max(3, r * 0.12), 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2.5;
      for (let g = 0; g < 8; g++) {
        ctx.save();
        ctx.rotate((g * Math.PI) / 4);
        ctx.beginPath();
        ctx.moveTo(-8, -r - 6);
        ctx.lineTo(8, -r - 6);
        ctx.moveTo(-6, -r - 10);
        ctx.lineTo(6, -r - 10);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    },

    drawPlayerProjectile(ctx, p, frame) {
      const px = Math.round(p.x);
      const py = Math.round(p.y);
      const ang = Math.atan2(p.vy, p.vx);

      if (p.isDragon) {
        ctx.save();
        for (let seg = 6; seg >= 1; seg--) {
          const dist = seg * 7.5;
          const wave = Math.sin(frame * 0.35 - seg * 0.9) * 6;
          const sx = px - Math.cos(ang) * dist + Math.cos(ang + Math.PI / 2) * wave;
          const sy = py - Math.sin(ang) * dist + Math.sin(ang + Math.PI / 2) * wave;
          ctx.fillStyle = (seg % 2 === 0) ? "#f59e0b" : "#fde047";
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(3, 9.5 - seg), 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#b91c1c";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        this.draw(ctx, "PROJ_DRAGON_HEAD", px, py, 1.9, false, false, ang + Math.PI / 2);
        ctx.restore();
      } else {
        for (let t = 1; t <= 3; t++) {
          const tx = px - p.vx * t * 1.4;
          const ty = py - p.vy * t * 1.4;
          ctx.fillStyle = (t === 1) ? "#fde047" : "#ea580c";
          ctx.beginPath();
          ctx.arc(tx, ty, 4 - t * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        this.draw(ctx, "PROJ_FIRE_LOTUS", px, py, 1.8, false, false, frame * 0.22);
      }
    },

    drawPetProjectile(ctx, p, frame) {
      const px = Math.round(p.x);
      const py = Math.round(p.y);
      const ang = Math.atan2(p.vy, p.vx);

      ctx.save();
      if (p.element === "fire") {
        // 🦊 靈狐攻擊特效：PokéSurvivor 級別九尾狐火蓮華彈 + 雙色流光火尾
        for (let t = 3; t >= 1; t--) {
          const tx = px - p.vx * t * 1.3;
          const ty = py - p.vy * t * 1.3;
          WuxiaHDVFXEngine.drawGlowOrb(ctx, tx, ty, (p.isT4 ? 11 : 8) - t * 1.4, "#ffffff", t === 1 ? "#fde047" : "#f97316", "rgba(239,68,68,0)");
        }
        WuxiaHDVFXEngine.drawGlowOrb(ctx, px, py, p.isT4 ? 18 : 13, "#ffffff", "#f97316", "rgba(234,88,12,0)");
        WuxiaHDVFXEngine.drawBloomingLotus(ctx, px, py, p.isT4 ? 11 : 8, 6, frame * 0.25, "#ef4444", "#fde047", "#ffffff");
      } else if (p.element === "water") {
        // 🐢 靈龜攻擊特效：極寒六稜冰晶手裡劍 + 寒霜尾跡
        for (let t = 2; t >= 1; t--) {
          const tx = px - p.vx * t * 1.3;
          const ty = py - p.vy * t * 1.3;
          WuxiaHDVFXEngine.drawGlowOrb(ctx, tx, ty, 7 - t, "#ffffff", "#38bdf8", "rgba(6,182,212,0)");
        }
        WuxiaHDVFXEngine.drawGlowOrb(ctx, px, py, p.isT4 ? 17 : 13, "#ffffff", "#38bdf8", "rgba(14,165,233,0)");
        WuxiaHDVFXEngine.drawBloomingLotus(ctx, px, py, p.isT4 ? 12 : 9, 6, frame * 0.35, "#0284c7", "#67e8f9", "#ffffff");
      } else if (p.element === "thunder") {
        // 🐥 雷雛攻擊特效：神霄紫電雷羽長槍 + 電弧纏繞
        WuxiaHDVFXEngine.drawVolumetricBeam(ctx, px - Math.cos(ang) * 18, py - Math.sin(ang) * 18, ang, p.isT4 ? 32 : 24, p.isT4 ? 7 : 5, "rgba(192,132,252,0.85)", "#fde047", "#ffffff", frame);
        WuxiaHDVFXEngine.drawStarburstFlare(ctx, px, py, p.isT4 ? 11 : 8, "#fde047", "#ffffff", frame * 0.3);
      } else {
        // 🦌 仙鹿攻擊特效：翠玉飛葉新月風刃 + 櫻花尾跡
        WuxiaHDVFXEngine.drawGlowOrb(ctx, px, py, p.isT4 ? 16 : 12, "#ffffff", "#4ade80", "rgba(34,197,94,0)");
        WuxiaHDVFXEngine.drawCrescentWave(ctx, px, py, p.isT4 ? 13 : 10, 5, ang, Math.PI * 0.85, "#15803d", "#4ade80", "#f9a8d4");
      }
      ctx.restore();
    },

    drawEnemyProjectile(ctx, p, frame) {
      const px = Math.round(p.x);
      const py = Math.round(p.y);
      const ang = Math.atan2(p.vy, p.vx);
      if (p.projType === "scorpion_fire") {
        this.draw(ctx, "PROJ_FOX_FIRE", px, py, 1.65, false, false, frame * 0.25);
      } else if (p.color === "#22c55e") {
        this.draw(ctx, "PROJ_BONE_ARROW", px, py, 1.9, false, false, ang);
      } else {
        this.draw(ctx, "PROJ_DEMON_BLADE", px, py, 1.95, false, false, frame * 0.28);
      }
    },

    drawHitSpark(ctx, hs) {
      ctx.save();
      ctx.translate(hs.x, hs.y);
      const progress = 1 - (hs.life / (hs.maxLife || 10));
      const r = 10 + progress * 22;
      ctx.globalAlpha = Math.max(0, hs.life / (hs.maxLife || 10));
      WuxiaHDVFXEngine.drawStarburstFlare(ctx, 0, 0, r, hs.color || "#fde047", "#ffffff", progress * 1.5);
      ctx.restore();
    },

    drawLightningVFX(ctx, lb, frame) {
      ctx.save();
      WuxiaHDVFXEngine.drawFractalLightning(ctx, lb.x, lb.y - 160, lb.x, lb.y, "#c084fc", "#ffffff", frame);
      WuxiaHDVFXEngine.drawStarburstFlare(ctx, lb.x, lb.y, 18, "#c084fc", "#fde047", frame * 0.2);
      ctx.restore();
    },

    // ==================== v25.0 100% 純粹 2D 像素風渲染器 (徹底移除普通向量圓形與方塊，完全以點陣精靈繪製) ====================
    renderPreviewCanvas(canvasEl, patternKey, scale = 3) {
      if (!canvasEl) return;
      const sprite = this.get(patternKey, scale, false);
      if (!sprite) return;
      canvasEl.width = sprite.width + 8;
      canvasEl.height = sprite.height + 8;
      const c = canvasEl.getContext("2d");
      c.imageSmoothingEnabled = false;
      c.clearRect(0, 0, canvasEl.width, canvasEl.height);
      c.drawImage(sprite, 4, 4);
    },

    drawPixelShadow(ctx, x, y, rx, ry) {
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      const px = Math.round(x);
      const py = Math.round(y);
      ctx.fillRect(px - rx, py - ry + 2, rx * 2, ry * 2 - 4);
      ctx.fillRect(px - rx + 3, py - ry, rx * 2 - 6, ry * 2);
      ctx.restore();
    },

    drawHero(ctx, player, frame, isMoving, isFlip, weaponId = "sword", skinId = "cyan", atkTimer = 0) {
      const px = Math.round(player.x);
      const py = Math.round(player.y);
      const animFrame = isMoving ? (Math.floor(frame / 7) % 2) : (Math.floor(frame / 20) % 2);
      const bobY = isMoving ? (animFrame === 0 ? -2 : 0) : 0;

      const skinMap = {
        cyan:    { k0: "HERO_CYAN_0",    k1: "HERO_CYAN_1",    col: "#38bdf8" },
        crimson: { k0: "HERO_CRIMSON_0", k1: "HERO_CRIMSON_1", col: "#ef4444" },
        thunder: { k0: "HERO_THUNDER_0", k1: "HERO_THUNDER_1", col: "#c084fc" },
        gold:    { k0: "HERO_GOLD_0",    k1: "HERO_GOLD_1",    col: "#fbbf24" }
      };
      const sk = skinMap[skinId] || skinMap.cyan;
      const heroKey = animFrame === 0 ? sk.k0 : sk.k1;

      const wepKeyMap = {
        sword: "WEP_SWORD",
        saber: "WEP_SABER",
        spear: "WEP_SPEAR",
        chakram: "WEP_CHAKRAM",
        cauldron: "WEP_CAULDRON",
        banner: "WEP_BANNER"
      };
      const wepNames = {
        sword: "🗡️太乙青霜劍", saber: "🩸赤霄焚血刀", spear: "🔱紫微星辰槍",
        chakram: "☯️九曜太極輪", cauldron: "🏮九龍神火爐", banner: "⚡紫電天罰幡"
      };
      const wepSpriteKey = wepKeyMap[weaponId] || "WEP_SWORD";

      ctx.save();
      ctx.imageSmoothingEnabled = false;

      // 1. 像素階梯狀陰影與腳底像素八卦陣點
      this.drawPixelShadow(ctx, px, py + 17, 14, 5);
      ctx.fillStyle = sk.col;
      for (let i = 0; i < 8; i++) {
        const a = frame * 0.05 + (i * Math.PI) / 4;
        const rx = Math.round(px + Math.cos(a) * 18);
        const ry = Math.round(py + 16 + Math.sin(a) * 6);
        ctx.fillRect(rx - 1, ry - 1, 3, 3);
      }

      // 2. 若為太乙青霜御劍，背後懸浮 3 柄像素飛劍 (`SWORD`)
      if (weaponId === "sword") {
        for (let s = -1; s <= 1; s++) {
          const sx = px + s * 10;
          const sy = py - 18 + Math.round(Math.sin(frame * 0.12 + s) * 2);
          this.draw(ctx, "SWORD", sx, sy, 1.8, false, false, s * 0.25);
        }
      }

      // 3. 繪製主角 2D 像素點陣本體 (Scale 2.4 -> 38x40px 清晰復古像素比例)
      const isInvulFlash = (player.invulnerableTimer > 0 && Math.floor(frame / 2) % 2 === 0);
      this.draw(ctx, heroKey, px, py + bobY, 2.4, isFlip, isInvulFlash, 0);

      // 4. 繪製高辨識度手持 2D 像素本命武器 (依攻擊時機揮砍或環繞)
      const swingOffset = (atkTimer < 10) ? Math.sin((atkTimer / 10) * Math.PI) * 0.85 : Math.sin(frame * 0.1) * 0.12;
      const handDir = isFlip ? -1 : 1;
      const wx = px + handDir * 17;
      const wy = py + bobY + 1;
      const wepAngle = (isFlip ? -0.45 : 0.45) + handDir * swingOffset;
      this.draw(ctx, wepSpriteKey, wx, wy, 2.2, isFlip, false, wepAngle);

      // 5. 腳下像素風武器銘牌
      const tagStr = wepNames[weaponId] || "🗡️太乙青霜劍";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      const tw = Math.ceil(ctx.measureText(tagStr).width) + 8;
      ctx.fillStyle = "#120f0d";
      ctx.fillRect(Math.round(px - tw / 2), py + 21, tw, 12);
      ctx.strokeStyle = sk.col;
      ctx.lineWidth = 1;
      ctx.strokeRect(Math.round(px - tw / 2), py + 21, tw, 12);
      ctx.fillStyle = "#fef08a";
      ctx.fillText(tagStr, px, py + 30);

      ctx.restore();
    },

    drawCompanionPet(ctx, p, idx, frame) {
      const px = Math.round(p.x);
      const py = Math.round(p.y);
      const tier = Math.min(4, Math.max(1, p.tier || 1));
      const animBit = Math.floor((frame + idx * 5) / 9) % 2;
      const bobY = animBit === 0 ? -2 : 0;

      // 根據靈寵 ID 與進化階位 (T1~T4) 精準匹配對應的 2D 像素點陣 Asset
      let spriteKey = "FOX_T1_0";
      if (p.id === "fox") {
        if (tier === 1) spriteKey = animBit === 0 ? "FOX_T1_0" : "FOX_T1_1";
        else if (tier === 2) spriteKey = "FOX_T2_0";
        else if (tier === 3) spriteKey = "FOX_T3_0";
        else spriteKey = "FOX_T4_0";
      } else if (p.id === "turtle") {
        if (tier === 1) spriteKey = "TURTLE_T1_0";
        else if (tier === 2) spriteKey = "TURTLE_T2_0";
        else if (tier === 3) spriteKey = "TURTLE_T3_0";
        else spriteKey = "TURTLE_T4_0";
      } else if (p.id === "bird") {
        if (tier === 1) spriteKey = animBit === 0 ? "BIRD_T1_0" : "BIRD_T1_1";
        else if (tier === 2) spriteKey = "BIRD_T2_0";
        else if (tier === 3) spriteKey = "BIRD_T3_0";
        else spriteKey = "BIRD_T4_0";
      } else {
        if (tier === 1) spriteKey = "DEER_T1_0";
        else if (tier === 2) spriteKey = "DEER_T2_0";
        else if (tier === 3) spriteKey = "DEER_T3_0";
        else spriteKey = "DEER_T4_0";
      }

      const pixelScale = tier === 4 ? 2.5 : (tier === 3 ? 2.2 : 2.0);
      ctx.save();
      ctx.imageSmoothingEnabled = false;

      // 腳底像素陰影與 T4 聖獸像素金芒框
      this.drawPixelShadow(ctx, px, py + 13, tier === 4 ? 14 : 10, 4);
      if (tier >= 3) {
        const auraCol = p.id === "fox" ? "#f97316" : (p.id === "turtle" ? "#38bdf8" : (p.id === "bird" ? "#facc15" : "#4ade80"));
        ctx.fillStyle = auraCol;
        for (let k = 0; k < 6; k++) {
          const a = -frame * 0.06 + (k * Math.PI) / 3;
          ctx.fillRect(Math.round(px + Math.cos(a) * 16) - 1, Math.round(py + 10 + Math.sin(a) * 6) - 1, 3, 3);
        }
      }

      // 繪製 2D 像素靈寵本體
      this.draw(ctx, spriteKey, px, py + bobY, pixelScale, false, false, 0);

      // 頭頂清晰像素階位與名稱銘牌
      const shortTitle = tier === 4 ? `★T4${(p.name || '').slice(0, 4)}` : `T${tier}${p.name || ''}`;
      ctx.font = "bold 8.5px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000000";
      ctx.fillText(shortTitle, px + 1, py - 16);
      ctx.fillStyle = tier === 4 ? "#fde047" : "#7dd3fc";
      ctx.fillText(shortTitle, px, py - 17);

      ctx.restore();
    },

    drawWildBeastWithPrompt(ctx, wb, player, frame, camera = null, viewW = 480) {
      const wx = Math.round(wb.x);
      const wy = Math.round(wb.y);
      const isDivine = !!wb.isDivineBeast;

      ctx.save();
      ctx.imageSmoothingEnabled = false;

      // 腳底像素捕捉方塊光陣
      const ringR = isDivine ? 26 : 18;
      ctx.fillStyle = isDivine ? "#fde047" : "#38bdf8";
      for (let i = 0; i < 8; i++) {
        const a = frame * 0.05 + (i * Math.PI) / 4;
        ctx.fillRect(Math.round(wx + Math.cos(a) * ringR) - 2, Math.round(wy + 8 + Math.sin(a) * (ringR * 0.5)) - 2, 4, 4);
      }

      const dist = Math.hypot(player.x - wx, player.y - wy);
      if (dist < 300) {
        ctx.strokeStyle = isDivine ? "rgba(250, 204, 21, 0.8)" : "rgba(56, 189, 248, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(wx, wy);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      this.drawCompanionPet(ctx, {
        id: wb.petId,
        name: wb.name,
        x: wx,
        y: wy,
        tier: isDivine ? 4 : 2,
        element: wb.petId === "fox" ? "fire" : (wb.petId === "turtle" ? "water" : (wb.petId === "bird" ? "thunder" : "grass"))
      }, 0, frame);

      // 頭頂防邊界裁切之像素抓寵提示框
      const promptY = wy - (isDivine ? 34 : 26);
      const labelTxt = isDivine
        ? `🌟按[F]收服【${wb.name}】`
        : `🏺按[F]收服【${wb.name}】`;
      ctx.font = "bold 9.5px monospace";
      const tw = Math.ceil(ctx.measureText(labelTxt).width) + 10;
      const bh = 15;

      let drawPromptX = wx;
      if (camera && typeof camera.x === "number") {
        const minWorldX = camera.x + tw / 2 + 6;
        const maxWorldX = camera.x + (viewW || 480) - tw / 2 - 6;
        drawPromptX = Math.max(minWorldX, Math.min(maxWorldX, wx));
      }

      ctx.fillStyle = isDivine ? "#451a03" : "#0f172a";
      ctx.fillRect(Math.round(drawPromptX - tw / 2), promptY - bh / 2, tw, bh);
      ctx.strokeStyle = isDivine ? "#fde047" : "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(Math.round(drawPromptX - tw / 2), promptY - bh / 2, tw, bh);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDivine ? "#fef08a" : "#7dd3fc";
      ctx.fillText(labelTxt, Math.round(drawPromptX), promptY);

      ctx.restore();
    },

    drawEnemy(ctx, en, playerX, frame) {
      const ex = Math.round(en.x);
      const ey = Math.round(en.y);
      const flipX = (en.x > playerX);
      const isHit = (en.hitFlash && en.hitFlash > 0);
      if (en.hitFlash > 0) en.hitFlash--;
      const animBit = Math.floor((frame + (en.animOffset || 0)) / 9) % 2;
      const walkBob = animBit === 0 ? -2 : 0;

      ctx.save();
      ctx.imageSmoothingEnabled = false;

      if (en.type !== "boss") {
        // 根據怪物種類與名字，選取專屬雙幀 2D 像素矩陣
        let spriteKey = animBit === 0 ? "CULTIST_0" : "CULTIST_1";
        let scale = 2.2;
        if (en.type === "charger") {
          spriteKey = animBit === 0 ? "WOLF_0" : "WOLF_1";
          scale = 2.2;
        } else if (en.type === "ranged") {
          spriteKey = animBit === 0 ? "ARCHER_0" : "ARCHER_1";
          scale = 2.2;
        } else if (en.type === "guardian") {
          spriteKey = animBit === 0 ? "GUARDIAN_0" : "GUARDIAN_1";
          scale = 2.4;
        } else if (en.type === "scorpion") {
          spriteKey = animBit === 0 ? "SCORPION_0" : "SCORPION_1";
          scale = 2.3;
        } else if (en.type === "wraith") {
          spriteKey = animBit === 0 ? "WRAITH_0" : "WRAITH_1";
          scale = 2.3;
        }

        this.drawPixelShadow(ctx, ex, ey + 14, en.type === "guardian" ? 13 : 10, 4);

        // 撼山魔將的像素護體藍盾框
        if (en.shield > 0) {
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(ex - 16, ey - 16, 32, 32);
        }

        // 繪製 2D 像素怪物本體
        this.draw(ctx, spriteKey, ex, ey + walkBob, scale, flipX, isHit, 0);

        // 精英怪或受傷怪頭頂像素血條與名字
        if (en.type === "guardian" || en.type === "scorpion" || en.type === "wraith" || en.hp < en.maxHp) {
          const bw = en.type === "guardian" ? 30 : 22;
          const by = ey - (en.type === "guardian" ? 22 : 18);
          ctx.fillStyle = "#000000";
          ctx.fillRect(ex - bw / 2, by, bw, 4);
          const hpPct = Math.max(0, en.hp / en.maxHp);
          ctx.fillStyle = en.type === "guardian" ? "#f97316" : "#ef4444";
          ctx.fillRect(ex - bw / 2 + 1, by + 1, Math.round((bw - 2) * hpPct), 2);
        }
      } else {
        // ==================== 👑 十波巨型鎮關 BOSS 專屬 2D 像素立繪渲染 ====================
        let bossKey0 = "BOSS_BLOOD_0", bossKey1 = "BOSS_BLOOD_1";
        const bName = en.name || "";
        if (bName.includes("狼")) {
          bossKey0 = "BOSS_WOLF_0"; bossKey1 = "BOSS_WOLF_1";
        } else if (bName.includes("始祖魔帝")) {
          bossKey0 = "BOSS_EMPEROR_0"; bossKey1 = "BOSS_EMPEROR_1";
        } else if (en.spriteType === "titan" || bName.includes("魔帥") || bName.includes("妖皇")) {
          bossKey0 = "BOSS_TITAN_0"; bossKey1 = "BOSS_TITAN_1";
        } else if (en.spriteType === "empress" || bName.includes("冥王") || bName.includes("魔後")) {
          bossKey0 = "BOSS_EMPRESS_0"; bossKey1 = "BOSS_EMPRESS_1";
        }
        const bossSpriteKey = animBit === 0 ? bossKey0 : bossKey1;
        const bossPixelScale = (en.isMiniBoss ? 2.8 : 3.4) * (en.enraged ? 1.12 : 1.0);

        // 腳底像素深淵陣與階梯陰影
        this.drawPixelShadow(ctx, ex, ey + 26, en.isMiniBoss ? 24 : 30, 8);
        ctx.fillStyle = en.enraged ? "#facc15" : "#ef4444";
        for (let i = 0; i < 12; i++) {
          const a = -frame * 0.04 + (i * Math.PI) / 6;
          const rx = Math.round(ex + Math.cos(a) * (en.isMiniBoss ? 34 : 44));
          const ry = Math.round(ey + 22 + Math.sin(a) * 14);
          ctx.fillRect(rx - 2, ry - 2, 4, 4);
        }

        // 繪製巨型 2D 像素 BOSS 本體
        this.draw(ctx, bossSpriteKey, ex, ey + walkBob * 1.5, bossPixelScale, flipX, isHit, 0);

        // BOSS 頭頂像素雙層血條（護體魔罡 + 本體氣血）與專屬名號
        const bw = en.isMiniBoss ? 94 : 118;
        const barY = ey - (en.isMiniBoss ? 46 : 56);
        ctx.fillStyle = "#090a0f";
        ctx.fillRect(ex - bw / 2 - 2, barY - 2, bw + 4, 14);
        ctx.strokeStyle = en.enraged ? "#facc15" : "#fbbf24";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(ex - bw / 2 - 2, barY - 2, bw + 4, 14);

        const maxSh = Math.max(1, en.maxShield || 200);
        const shPct = Math.max(0, Math.min(1, (en.shield || 0) / maxSh));
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(ex - bw / 2, barY, bw, 4);
        if (shPct > 0) {
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(ex - bw / 2, barY, Math.round(bw * shPct), 4);
        }

        const hpPct = Math.max(0, Math.min(1, en.hp / en.maxHp));
        ctx.fillStyle = "#450a0a";
        ctx.fillRect(ex - bw / 2, barY + 5, bw, 5);
        ctx.fillStyle = en.enraged ? "#facc15" : (en.isMiniBoss ? "#f97316" : "#ef4444");
        ctx.fillRect(ex - bw / 2, barY + 5, Math.round(bw * hpPct), 5);

        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        const tagTitle = `${en.isMiniBoss ? '👹' : '👑'}${en.name}${en.enraged ? '🔥' : ''}`;
        ctx.fillStyle = "#000000";
        ctx.fillText(tagTitle, ex + 1, barY - 4);
        ctx.fillStyle = en.enraged ? "#fde047" : "#fef08a";
        ctx.fillText(tagTitle, ex, barY - 5);
      }

      ctx.restore();
    }
  };

  // ==================== v24.0 PokéSurvivor 級別全5類高清流光特效引擎 (`WuxiaHDVFXEngine`) ====================
  const WuxiaHDVFXEngine = {
    drawGlowOrb(ctx, x, y, r, coreColor, midColor, outerColor) {
      if (r <= 0 || !isFinite(x) || !isFinite(y)) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const grad = ctx.createRadialGradient(x, y, r * 0.08, x, y, r);
      grad.addColorStop(0, coreColor || "#ffffff");
      grad.addColorStop(0.42, midColor || "#38bdf8");
      grad.addColorStop(1, outerColor || "rgba(56, 189, 248, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },

    drawStarburstFlare(ctx, x, y, radius, outerColor, coreColor = "#ffffff", rotAngle = 0) {
      if (radius <= 0 || !isFinite(x) || !isFinite(y)) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotAngle);
      ctx.globalCompositeOperation = "lighter";
      for (let layer = 0; layer < 2; layer++) {
        const r = layer === 0 ? radius : radius * 0.55;
        ctx.fillStyle = layer === 0 ? (outerColor || "#fde047") : coreColor;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          const dist = i % 2 === 0 ? r : r * 0.22;
          const px = Math.cos(a) * dist;
          const py = Math.sin(a) * dist;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    },

    drawMagicCircleArray(ctx, x, y, r, rotAngle, strokeColor = "#38bdf8", fillGlow = "rgba(56,189,248,0.18)") {
      if (r <= 0 || !isFinite(x) || !isFinite(y)) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, 0.52);
      ctx.rotate(rotAngle);
      ctx.globalCompositeOperation = "lighter";

      ctx.fillStyle = fillGlow;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2);
      ctx.stroke();

      for (let t = 0; t < 2; t++) {
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = (t * Math.PI) / 3 + (i * Math.PI * 2) / 3;
          const px = Math.cos(a) * r * 0.88;
          const py = Math.sin(a) * r * 0.88;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    },

    drawKillSoulBurst(ctx, x, y, progress, maxR, mainColor = "#38bdf8", isBoss = false) {
      const alpha = Math.max(0, 1 - progress);
      const curR = maxR * (0.25 + progress * 0.75);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = alpha;

      // 1. 擴散靈魂碎裂光環
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = (isBoss ? 6 : 3.2) * alpha;
      ctx.beginPath();
      ctx.arc(x, y, curR, 0, Math.PI * 2);
      ctx.stroke();

      // 2. 十字星芒閃光
      this.drawStarburstFlare(ctx, x, y - progress * 14, (isBoss ? 36 : 18) * (1 - progress * 0.5), mainColor, "#ffffff", progress * 2);

      // 3. 飛散的能量晶體碎片
      const shardCnt = isBoss ? 12 : 6;
      for (let i = 0; i < shardCnt; i++) {
        const a = (i * Math.PI * 2) / shardCnt + progress * 0.6;
        const sx = x + Math.cos(a) * curR * 0.85;
        const sy = y + Math.sin(a) * curR * 0.85;
        ctx.fillStyle = i % 2 === 0 ? "#ffffff" : mainColor;
        ctx.beginPath();
        ctx.arc(sx, sy, (isBoss ? 4.5 : 2.5) * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },

    drawLevelUpAscensionPillar(ctx, x, y, progress) {
      const alpha = Math.max(0, 1 - progress);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = alpha;

      // 1. 腳下盛開的 12 瓣八卦金蓮大陣
      const ringR = 35 + progress * 95;
      this.drawBloomingLotus(ctx, x, y, ringR, 12, progress * 2.5, "rgba(250,204,21,0.45)", "rgba(56,189,248,0.88)", "#ffffff");

      // 2. 沖天而起的金青雙色通天光柱
      const pillarW = (44 - progress * 22);
      const grad = ctx.createLinearGradient(x - pillarW, y, x + pillarW, y);
      grad.addColorStop(0, "rgba(56,189,248,0)");
      grad.addColorStop(0.3, "rgba(250,204,21,0.75)");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(0.7, "rgba(250,204,21,0.75)");
      grad.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x - pillarW, y - 260, pillarW * 2, 270);

      // 3. 螺旋上升的仙韻光球
      for (let i = 0; i < 6; i++) {
        const oy = y - ((progress * 220 + i * 38) % 220);
        const ox = x + Math.sin(progress * 8 + i) * 26;
        this.drawStarburstFlare(ctx, ox, oy, 9, "#fde047", "#ffffff", progress * 3);
      }
      ctx.restore();
    },

    drawCrescentWave(ctx, x, y, radius, thickness, angle, spanAngle, glowColor, midColor, coreColor) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalCompositeOperation = "lighter";

      const halfSpan = (spanAngle || Math.PI * 0.75) * 0.5;
      for (let pass = 0; pass < 3; pass++) {
        const scaleT = pass === 0 ? 1.45 : (pass === 1 ? 1.0 : 0.45);
        const curThick = thickness * scaleT;
        ctx.fillStyle = pass === 0 ? glowColor : (pass === 1 ? midColor : (coreColor || "#ffffff"));
        ctx.globalAlpha = pass === 0 ? 0.38 : (pass === 1 ? 0.85 : 0.95);

        ctx.beginPath();
        const tipX1 = Math.cos(-halfSpan) * radius;
        const tipY1 = Math.sin(-halfSpan) * radius;
        const tipX2 = Math.cos(halfSpan) * radius;
        const tipY2 = Math.sin(halfSpan) * radius;

        ctx.moveTo(tipX1, tipY1);
        ctx.quadraticCurveTo(radius + curThick * 0.85, 0, tipX2, tipY2);
        ctx.quadraticCurveTo(radius - curThick * 0.65, 0, tipX1, tipY1);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    },

    drawVolumetricBeam(ctx, x, y, angle, length, width, glowColor, midColor, coreColor, frame) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalCompositeOperation = "lighter";

      const grad = ctx.createLinearGradient(0, -width, 0, width);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.25, glowColor);
      grad.addColorStop(0.5, coreColor || "#ffffff");
      grad.addColorStop(0.75, glowColor);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, -width, length, width * 2);

      ctx.fillStyle = coreColor || "#ffffff";
      ctx.globalAlpha = 0.92;
      ctx.fillRect(0, -width * 0.24, length, width * 0.48);

      for (let strand = 0; strand < 2; strand++) {
        ctx.strokeStyle = strand === 0 ? midColor : "#ffffff";
        ctx.lineWidth = 2.2;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        for (let lx = 0; lx <= length; lx += 8) {
          const ly = Math.sin(lx * 0.06 - frame * 0.35 + strand * Math.PI) * (width * 0.72);
          if (lx === 0) ctx.moveTo(lx, ly);
          else ctx.lineTo(lx, ly);
        }
        ctx.stroke();
      }

      this.drawGlowOrb(ctx, 4, 0, width * 1.4, "#ffffff", midColor, "rgba(0,0,0,0)");
      ctx.restore();
    },

    drawFractalLightning(ctx, x1, y1, x2, y2, glowColor, coreColor, seed = 0) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const steps = Math.max(4, Math.min(14, Math.floor(dist / 16)));
      const pts = [{ x: x1, y: y1 }];
      const nx = -(y2 - y1) / (dist || 1);
      const ny = (x2 - x1) / (dist || 1);

      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const jitter = Math.sin(i * 7.3 + seed * 1.7) * 11 + (Math.random() - 0.5) * 8;
        pts.push({
          x: x1 + (x2 - x1) * t + nx * jitter,
          y: y1 + (y2 - y1) * t + ny * jitter
        });
      }
      pts.push({ x: x2, y: y2 });

      ctx.strokeStyle = glowColor || "#c084fc";
      ctx.lineWidth = 6.5;
      ctx.globalAlpha = 0.45;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      pts.forEach((p, idx) => { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
      ctx.stroke();

      ctx.strokeStyle = glowColor || "#a855f7";
      ctx.lineWidth = 3.2;
      ctx.globalAlpha = 0.88;
      ctx.stroke();

      ctx.strokeStyle = coreColor || "#ffffff";
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 1.0;
      ctx.stroke();

      for (let i = 2; i < pts.length - 1; i += 2) {
        if ((i + Math.floor(seed)) % 3 === 0) {
          const p = pts[i];
          const side = (i % 4 === 0) ? 1 : -1;
          const bx = p.x + (x2 - x1) * 0.14 + nx * side * 18;
          const by = p.y + (y2 - y1) * 0.14 + ny * side * 18;
          ctx.strokeStyle = glowColor || "#c084fc";
          ctx.lineWidth = 1.6;
          ctx.globalAlpha = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
      ctx.restore();
    },

    drawBloomingLotus(ctx, x, y, r, petalCount, rotAngle, innerColor, outerColor, strokeColor) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotAngle);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < petalCount; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / petalCount);
        const grad = ctx.createLinearGradient(0, 0, r, 0);
        grad.addColorStop(0, innerColor);
        grad.addColorStop(0.7, outerColor);
        grad.addColorStop(1, "#ffffff");
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.58;

        ctx.beginPath();
        ctx.moveTo(r * 0.12, 0);
        ctx.quadraticCurveTo(r * 0.55, -r * 0.24, r, 0);
        ctx.quadraticCurveTo(r * 0.55, r * 0.24, r * 0.12, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = strokeColor || "#ffffff";
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    },

    drawParticle(ctx, pt) {
      const alpha = Math.max(0, Math.min(1, pt.life / (pt.maxLife || 20)));
      ctx.save();
      ctx.translate(pt.x, pt.y);
      if (pt.blend !== "normal") {
        ctx.globalCompositeOperation = "lighter";
      }
      ctx.globalAlpha = alpha;

      if (pt.type === "spark") {
        ctx.rotate(pt.rot || 0);
        ctx.fillStyle = pt.color || "#fde047";
        const s = (pt.size || 6) * (0.5 + alpha * 0.5);
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.22, -s * 0.22, s, 0);
        ctx.quadraticCurveTo(s * 0.22, s * 0.22, 0, s);
        ctx.quadraticCurveTo(-s * 0.22, s * 0.22, -s, 0);
        ctx.quadraticCurveTo(-s * 0.22, -s * 0.22, 0, -s);
        ctx.closePath();
        ctx.fill();
      } else if (pt.type === "ring") {
        const curR = pt.r + (pt.maxR - pt.r) * (1 - alpha);
        ctx.strokeStyle = pt.color || "#38bdf8";
        ctx.lineWidth = Math.max(1, (pt.lineWidth || 3.5) * alpha);
        ctx.beginPath();
        ctx.arc(0, 0, curR, 0, Math.PI * 2);
        ctx.stroke();
      } else if (pt.type === "petal") {
        ctx.rotate((pt.rot || 0) + pt.life * 0.08);
        ctx.fillStyle = pt.color || "#f472b6";
        const s = pt.size || 5;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.8, 0, 0, s);
        ctx.quadraticCurveTo(-s * 0.8, 0, 0, -s);
        ctx.fill();
      } else if (pt.type === "shard") {
        ctx.rotate(pt.rot || 0);
        ctx.fillStyle = pt.color || "#67e8f9";
        const s = pt.size || 6;
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.3);
        ctx.lineTo(s * 0.65, 0);
        ctx.lineTo(0, s * 1.3);
        ctx.lineTo(-s * 0.65, 0);
        ctx.closePath();
        ctx.fill();
      } else if (pt.type === "slash_line") {
        ctx.rotate(pt.rot || 0);
        const len = (pt.size || 24) * (1.2 - alpha * 0.3);
        ctx.strokeStyle = pt.color || "#ffffff";
        ctx.lineWidth = Math.max(1, 3.5 * alpha);
        ctx.beginPath();
        ctx.moveTo(-len, 0);
        ctx.lineTo(len, 0);
        ctx.stroke();
      } else {
        const s = (pt.size || 5) * (0.4 + alpha * 0.6);
        const grad = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.45, pt.color || "#f97316");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };

  // ==================== v21.0 《萬劍屠魔：山海仙魔錄》獨立遊戲全系統重構（捨棄其他雜項玩法 · 全新開始介面 · 戰前自訂整備 · 角色真實死亡與勝負結算介面） ====================

  const V21_HERO_SKINS = {
    cyan: {
      id: "cyan",
      name: "青霜劍仙",
      icon: "❄️",
      color: "#38bdf8",
      auraColor: "rgba(56, 189, 248, 0.45)",
      tag: "身法飄逸 · 移速+15% · 環身寒霜減速",
      desc: "青玄劍宗嫡傳道體，踏雪無痕，移動速度提升 15%，且周身散發太陰寒氣減緩靠近魔物 20% 移速。",
      hpBonus: 0,
      dmgMult: 1.05,
      speedMult: 1.15,
      cdReduction: 0,
      regenPer3Sec: 0,
      startShield: 10
    },
    crimson: {
      id: "crimson",
      name: "赤霄狂尊",
      icon: "🔥",
      color: "#ef4444",
      auraColor: "rgba(239, 68, 68, 0.48)",
      tag: "極道殺伐 · 全傷害+22% · 斬殺噬血",
      desc: "修羅血海淬鍊之狂霸道體，所有武器與絕技傷害提升 22%，每斬殺 12 隻魔物自動回復 4 點氣血。",
      hpBonus: -10,
      dmgMult: 1.22,
      speedMult: 1.04,
      cdReduction: 0,
      regenPer3Sec: 0,
      startShield: 0
    },
    thunder: {
      id: "thunder",
      name: "神霄雷帝",
      icon: "⚡",
      color: "#c084fc",
      auraColor: "rgba(192, 132, 252, 0.48)",
      tag: "天罰神速 · 技能冷卻-22% · 雷暴麻痹",
      desc: "執掌九天紫極神雷之法相，所有武器 3 大專屬絕技冷卻時間縮短 22%，暴擊時額外劈落天雷麻痹敵人。",
      hpBonus: 0,
      dmgMult: 1.10,
      speedMult: 1.06,
      cdReduction: 0.22,
      regenPer3Sec: 0,
      startShield: 15
    },
    gold: {
      id: "gold",
      name: "太極道祖",
      icon: "☯️",
      color: "#fbbf24",
      auraColor: "rgba(251, 191, 36, 0.48)",
      tag: "萬法不侵 · 氣血+45 · 開局護罡+35 · 生生自癒",
      desc: "陰陽混元不滅道體，最大氣血額外 +45，開局自帶 35 點玄武護體罡盾，且每 3 秒自動回復 4 點氣血。",
      hpBonus: 45,
      dmgMult: 1.0,
      speedMult: 1.0,
      cdReduction: 0.05,
      regenPer3Sec: 4,
      startShield: 35
    }
  };

  const V21_STARTER_RELICS = {
    focus_sash: {
      id: "focus_sash",
      name: "九轉不滅金身帶",
      icon: "🎗️",
      shortName: "🎗️不滅金身帶",
      desc: "【保命逆轉】受到致命攻擊氣血歸零時，強制鎖血並瞬間回復 60% 最大氣血、賦予 3 秒黃金無敵並震退全屏魔物（每局觸發 1 次）！"
    },
    scope_lens: {
      id: "scope_lens",
      name: "焦點破綻仙鏡",
      icon: "🔍",
      shortName: "🔍焦點破綻鏡",
      desc: "【極致暴擊】洞悉妖魔死穴！所有武器普攻與 18 招專屬絕技會心暴擊率 +28%，暴擊傷害高達 195%！"
    },
    magnet_core: {
      id: "magnet_core",
      name: "太初吸星神石",
      icon: "🧲",
      shortName: "🧲太初吸星石",
      desc: "【全圖磁吸】戰場掉落之經驗靈珠、降妖靈葫與首領寶箱磁吸半徑擴大 2.6 倍，且拾取經驗值額外 +25%！"
    },
    spirit_nectar: {
      id: "spirit_nectar",
      name: "萬年朱果仙露",
      icon: "🍎",
      shortName: "🍎朱果仙露",
      desc: "【生生不息】最大氣血上限 +35，且戰鬥中每 3 秒自動為主角回復 5 點氣血與 4 點護體罡盾！"
    },
    gourd_treasure: {
      id: "gourd_treasure",
      name: "補天萬妖寶葫",
      icon: "🏺",
      shortName: "🏺萬妖寶葫",
      desc: "【御獸宗師】開局額外獲得 +6 個降妖靈葫，所有出戰四系神獸傷害 +30% 且進化所需經驗減少 25%！"
    },
    wind_boots: {
      id: "wind_boots",
      name: "疾風破虛仙靴",
      icon: "👢",
      shortName: "👢疾風破虛靴",
      desc: "【凌波微步】主角移動速度提升 22%，受擊後的無敵閃避時間延長 50%，輕鬆穿梭魔尊彈幕！"
    }
  };

  const V21_DIFFICULTY_TIERS = {
    easy: {
      id: "easy",
      name: "🌱 凡塵試煉（休閒爽快）",
      enemyHpMult: 0.78,
      enemyDmgMult: 0.70,
      soulGemMult: 1.0,
      desc: "魔物氣血 -22%、魔物傷害 -30%，適合初次體驗 6 大神兵流光特效與收集四系神獸。"
    },
    normal: {
      id: "normal",
      name: "⚔️ 太荒標準（正統挑戰）",
      enemyHpMult: 1.0,
      enemyDmgMult: 1.0,
      soulGemMult: 1.35,
      desc: "標準十波漸進難度，魔物與巨型魔尊攻守平衡，通關獎勵道魂晶 +35%。"
    },
    hell: {
      id: "hell",
      name: "🔥 煉獄天罰（硬核死鬥）",
      enemyHpMult: 1.45,
      enemyDmgMult: 1.45,
      soulGemMult: 2.0,
      desc: "魔物氣血與傷害 +45%，魔尊彈幕更密集！考驗極限走位與武器技能搭配，道魂晶獎勵翻倍（×200%）！"
    }
  };

  const V21_TALENT_SHRINE = [
    { id: "atkLv", name: "🗡️ 萬劍殺伐道印", desc: "永久提升所有武器與技能基礎傷害 +12% / 級", baseCost: 15, maxLv: 10 },
    { id: "hpLv", name: "❤️ 不滅血魄道印", desc: "永久提升開局最大氣血上限 +25 HP / 級", baseCost: 12, maxLv: 10 },
    { id: "shieldLv", name: "🛡️ 玄武護罡道印", desc: "永久提升開局護體真元盾 +18 點 / 級，受擊減傷提升", baseCost: 14, maxLv: 10 },
    { id: "speedLv", name: "⚡ 御風瞬步道印", desc: "永久提升角色移動速度 +5% 與技能冷卻縮減 +3% / 級", baseCost: 15, maxLv: 8 },
    { id: "petLv", name: "🦊 山海御獸道印", desc: "永久提升四系靈寵傷害 +15% 與開局降妖靈葫 +1 / 級", baseCost: 16, maxLv: 8 }
  ];

  const V21_ENEMY_CODEX = [
    { icon: "🩸", name: "血刀門徒", spriteKey: "CULTIST_0", role: "第1波解鎖 · 外圍近戰魔卒", appearanceDesc: "身穿暗紅血紋夜行衣、頭戴遮面赤兜帽的邪派刀客，兜帽陰影下閃爍兩點凶黃魔眼，右手斜握帶血彎刀。", pixelDetails: "16×14 像素點陣：暗紅尖頂兜帽、黑影雙黃魔眼、金扣護胸與染血白刃彎刀", desc: "成群結隊逼近，近身揮出暗紅血刀斬，接觸主角造成 8 點氣血傷害。" },
    { icon: "🐺", name: "幽冥妖狼", spriteKey: "WOLF_0", role: "第2波解鎖 · 高速突襲獸群", appearanceDesc: "四足伏地狂奔的紫黑幽冥魔狼，背脊長滿銀白骨刺，血盆大口露出森白獠牙與猩紅狼瞳。", pixelDetails: "18×9 像素點陣：背部銀白骨刺、紫黑流線狼軀、猩紅凶眼與前端森白尖牙", desc: "雙翼包抄蓄力猛撲，釋放猩紅雙狼爪撕裂波，撲中造成 12 點氣血傷害。" },
    { icon: "🏹", name: "綠毒骨弓", spriteKey: "ARCHER_0", role: "第3波解鎖 · 遠程毒箭射手", appearanceDesc: "披著墨綠殘破斗篷的慘白骷髏射手，眼窩燃燒碧磷鬼火，雙手挽滿翠綠毒骨長弓。", pixelDetails: "15×12 像素點陣：慘白骷髏頭與肋骨、碧綠鬼火雙瞳、深綠斗篷與滿弦毒骨箭", desc: "於遠處列陣齊射碧磷鬼火毒骨箭，命中造成 9 點氣血傷害。" },
    { icon: "🛡️", name: "撼山魔將", spriteKey: "GUARDIAN_0", role: "第4波解鎖 · 護體魔罡重甲", appearanceDesc: "頭生雙金角的玄鐵重甲巨漢，胸嵌護心金鏡，左手高舉刻有冰藍符文的鬼面鎮獄大盾。", pixelDetails: "18×13 像素點陣：彎曲雙金角、玄鐵重裝甲冑、猩紅魔眼與右側巨型冰藍鬼面盾", desc: "自帶藍色護體魔罡盾，近身釋放撼山裂地波，碰撞造成 14 點傷害。" },
    { icon: "🦂", name: "赤炎魔蠍", spriteKey: "SCORPION_0", role: "第5波解鎖 · 扇形火毒彈幕", appearanceDesc: "渾身覆蓋赤紅熔岩甲殼的荒古巨蠍，前端揮舞雙隻火紅巨螯，背後高高揚起滴落金黃火毒的倒鉤尾針。", pixelDetails: "16×11 像素點陣：頂部高舉金黃火毒尾針、分段赤紅熔岩背甲、雙巨螯與六足步態", desc: "噴射三向熔岩火毒流星彈，彈幕封鎖走位，命中造成 11 點傷害。" },
    { icon: "👻", name: "九幽寒魄鬼將", spriteKey: "WRAITH_0", role: "第6波解鎖 · 迴旋死神魔鐮", appearanceDesc: "籠罩在深紫幽冥兜帽下的懸浮死神鬼將，骷髏面龐閃爍極寒冰光，手持寒氣逼人的巨型冰魄死神鐮刀。", pixelDetails: "16×12 像素點陣：深紫幽冥鬼袍、冰藍魂火骷髏面、胸前寒晶骨鏈與彎月死神巨鐮", desc: "飄忽突進並擲出紫青雙彎月死神魔鐮，命中造成 13 點重創。" },
    { icon: "🐺", name: "紫瞳嘯月狼王", spriteKey: "BOSS_WOLF_0", role: "第2波首領 · 疾風妖統領", appearanceDesc: "體型碩大的雙金角紫焰妖狼王，額生第三隻紫電天眼，背負黃金妖皇戰鞍，狼爪撕裂虛空。", pixelDetails: "24×12 巨型點陣：雙金狼角、紫焰鬃毛、紫白閃電狼瞳與雪白巨型狼牙", desc: "率領雙翼狼群高速突襲，具備雙層血條與狂暴撲擊！" },
    { icon: "👹", name: "赤目血煞魔尊", spriteKey: "BOSS_BLOOD_0", role: "第3/8波首領 · 血海大魔尊", appearanceDesc: "展開百丈黑紅血翼的三頭魔冠大魔尊，胸口鑲嵌跳動的八角金色血核，雙臂揮舞鋸齒血刃。", pixelDetails: "24×19 巨型點陣：三座黃金魔冠、四目熾白瞳仁、胸前八角金紅魔核與雙翼血刃", desc: "具備雙層血條（護體魔罡+本體氣血），半血觸發二階段狂暴、八方血月魔刃與九幽魔隕！" },
    { icon: "👑", name: "焚天赤炎妖皇 / 撼山魔帥", spriteKey: "BOSS_TITAN_0", role: "第4/5/7波首領 · 熔岩重裝巨神", appearanceDesc: "沐浴大荒熔岩與神雷而生的赤金重甲妖皇，周身玄鐵裝甲流淌金紅岩漿，腹心藏有焚天大日火核。", pixelDetails: "24×17 巨型點陣：四柱赤金皇冠、熔岩流光胸甲、熾白雙目與重裝熔岩鐵拳", desc: "超厚護體魔罡，需使用星辰槍、狂刀或天罰幡破罡絕技方能迅速擊穿！" },
    { icon: "🌙", name: "幽冥血海魔後 / 噬魂冥王", spriteKey: "BOSS_EMPRESS_0", role: "第6/9波首領 · 九幽冥海霸主", appearanceDesc: "頭戴九鳳紫金帝冕、身披幽冥霓裳羽衣的絕代魔後，冰眸含煞，袖間飛出萬道奪命紫晶魔綾。", pixelDetails: "24×18 巨型點陣：鳳翼紫金冠、冰晶魔瞳、華貴紫金霓裳與雙側冰魄飛綾", desc: "召喚九幽魔隕與環形血月魔刃封鎖走位，考驗極限閃避！" },
    { icon: "🌌", name: "太古萬劫始祖魔帝", spriteKey: "BOSS_EMPEROR_0", role: "第10波終極首領 · 滅世始祖魔神", appearanceDesc: "統御十波魔劫的終極始祖魔神！頭頂日月雙角鴻蒙魔冕，身披黑紅紫金四色滅世帝鎧，胸口嵌有太古混沌魔眼。", pixelDetails: "20×16 終極巨型點陣：日月雙角金冕、赤紅魔角、混沌魔眼核心與不滅帝軀", desc: "十波闖關最終大魔神！擊敗後即可榮登【萬劍證道 · 戰鬥勝利】殿堂！" }
  ];

  Character.prototype.ensureV21StandaloneState = function() {
    if (!this.v21) {
      let savedV21 = null;
      try {
        const rawV21 = localStorage.getItem("WANJIAN_TUMO_STANDALONE_V21");
        if (rawV21) savedV21 = JSON.parse(rawV21);
      } catch (e) {}

      this.v21 = Object.assign({
        screen: "title", // "title" | "setup" | "battle"
        heroName: this.name || "陸沉舟",
        heroSkin: "cyan",
        weaponId: "sword",
        starterPetId: "fox",
        starterPetTier: 1,
        selectedRelics: ["focus_sash", "scope_lens"],
        arenaMode: "hybrid",
        difficulty: "normal",
        soulGems: 60,
        totalRuns: 0,
        totalVictories: 0,
        bestWave: 1,
        totalKills: 0,
        talents: {
          atkLv: 1,
          hpLv: 1,
          shieldLv: 1,
          speedLv: 1,
          petLv: 1
        }
      }, savedV21 || {});
    }
    if (!this.v21.talents) {
      this.v21.talents = { atkLv: 1, hpLv: 1, shieldLv: 1, speedLv: 1, petLv: 1 };
    }
    if (!Array.isArray(this.v21.selectedRelics) || this.v21.selectedRelics.length === 0) {
      this.v21.selectedRelics = ["focus_sash", "scope_lens"];
    }
    return this.v21;
  };

  // ==================== 獨立遊戲全域頂層覆寫：隱藏所有舊版修仙頁籤與資源列，專注於《萬劍屠魔》 ====================
  App.prototype.enforceStandaloneWanjianShell = function() {
    if (typeof document === "undefined") return;
    const headerEl = document.querySelector(".game-header");
    const dockEl = document.querySelector(".modern-dock");
    const zenBtn = document.getElementById("zen-exit-btn");
    const mistEl = document.querySelector(".ethereal-mist-layer");
    if (headerEl) headerEl.style.display = "none";
    if (dockEl) dockEl.style.display = "none";
    if (zenBtn) zenBtn.style.display = "none";
    if (mistEl) mistEl.style.display = "none";
    document.title = "《萬劍屠魔：山海仙魔錄》 v21.0 獨立無雙割草正式版";
  };

  App.prototype.ensureCharacterLoaded = function() {
    if (!this.char) {
      try {
        const raw = localStorage.getItem("ASTRAL_SOVEREIGN_SAVE_V8");
        if (raw) {
          this.char = new Character(JSON.parse(raw));
        } else {
          this.char = new Character({
            realmIndex: 1,
            realmLayer: 4,
            exp: 2680,
            todayExp: 1120,
            qi: 680,
            silver: 1280,
            ingots: 260
          });
        }
      } catch (e) {
        this.char = new Character({ realmIndex: 1, realmLayer: 4, exp: 2680 });
      }
      if (this.char && typeof this.char.initV11State === "function") {
        this.char.initV11State();
      }
    }
    return this.char;
  };

  App.prototype.saveGame = function() {
    try {
      if (this.char) {
        localStorage.setItem("ASTRAL_SOVEREIGN_SAVE_V8", JSON.stringify(this.char));
        if (this.char.v21) {
          localStorage.setItem("WANJIAN_TUMO_STANDALONE_V21", JSON.stringify(this.char.v21));
        }
      }
    } catch (e) {}
  };

  App.prototype.init = function() {
    this.ensureCharacterLoaded();
    this.enforceStandaloneWanjianShell();
    const v21 = this.char.ensureV21StandaloneState();
    v21.screen = "title";
    this.renderView();
  };

  App.prototype.updateHeader = function() {
    this.ensureCharacterLoaded();
    this.enforceStandaloneWanjianShell();
    this.saveGame();
  };

  App.prototype.renderView = function() {
    this.ensureCharacterLoaded();
    this.enforceStandaloneWanjianShell();
    this.stopV13MowingLoop();
    if (this._v21TitleRaf) {
      cancelAnimationFrame(this._v21TitleRaf);
      this._v21TitleRaf = null;
    }

    const viewport = document.getElementById("view-viewport");
    if (!viewport) return;
    viewport.innerHTML = "";

    const v21 = this.char.ensureV21StandaloneState();
    if (v21.screen === "setup") {
      this.renderV21LoadoutScreen(viewport);
    } else if (v21.screen === "battle") {
      this.renderV21BattleScreen(viewport);
    } else {
      v21.screen = "title";
      this.renderV21TitleScreen(viewport);
    }
  };

  // ==================== 1. 全新獨立【開始介面（Title Screen）】：動態粒子劍陣畫布 + 聖殿天賦 + 百妖神兵圖鑑 ====================
  App.prototype.renderV21TitleScreen = function(container) {
    const v21 = this.char.ensureV21StandaloneState();
    const skin = V21_HERO_SKINS[v21.heroSkin] || V21_HERO_SKINS.cyan;
    const wep = WUXIA_WEAPONS_ARSENAL[v21.weaponId] || WUXIA_WEAPONS_ARSENAL.sword;

    const wrap = document.createElement("div");
    wrap.className = "v21-standalone-shell";
    wrap.innerHTML = `
      <div class="v21-title-hero-card">
        <!-- 動態60FPS御劍斬魔背景畫布 -->
        <div class="v21-title-canvas-wrap">
          <canvas id="v21-title-bg-canvas" width="900" height="440"></canvas>
          <div class="v21-title-overlay-content">
            <div class="v21-game-crest-badge">⚔️ 東方山海無雙動作肉鴿獨立遊戲 · v21.0 正式版</div>
            <h1 class="v21-main-game-title">萬劍屠魔</h1>
            <div class="v21-sub-game-title">── 山 海 仙 魔 錄 · 十 波 破 劫 ──</div>
            <div class="v21-current-hero-tag">
              當前出戰：<b>${skin.icon} ${v21.heroName}（${skin.name}）</b> ｜ 本命神兵：<b>${wep.icon} ${wep.name}</b>
            </div>
          </div>
        </div>

        <!-- 生涯戰績與太初道魂晶統計列 -->
        <div class="v21-career-stats-bar">
          <div class="v21-stat-box">
            <div class="v21-stat-label">💎 太初道魂晶</div>
            <div class="v21-stat-val gold" id="v21-title-soulgems">${v21.soulGems}</div>
          </div>
          <div class="v21-stat-box">
            <div class="v21-stat-label">⚔️ 累計斬魔</div>
            <div class="v21-stat-val crimson">${v21.totalKills.toLocaleString()}</div>
          </div>
          <div class="v21-stat-box">
            <div class="v21-stat-label">🌊 最高波次</div>
            <div class="v21-stat-val cyan">第 ${v21.bestWave} 波</div>
          </div>
          <div class="v21-stat-box">
            <div class="v21-stat-label">🏆 十波通關</div>
            <div class="v21-stat-val emerald">${v21.totalVictories} 次</div>
          </div>
        </div>

        <!-- 主選單核心按鈕群 -->
        <div class="v21-title-actions">
          <button type="button" class="v21-btn-primary-start" id="btn-v21-goto-setup">
            <span class="v21-btn-main-txt">⚔️ 開始遊戲 · 戰前整備自訂</span>
            <span class="v21-btn-sub-txt">自訂 6 大神兵 · 4 大劍仙道體 · 4 系山海神獸 · 開局法寶與難度</span>
          </button>

          <button type="button" class="v21-btn-primary-start" id="btn-v22-divine-beast-mode" style="background:linear-gradient(90deg, #1e3a8a 0%, #7e22ce 50%, #b45309 100%); border-color:#7dd3fc; padding:9px 14px;">
            <span class="v21-btn-main-txt" style="font-size:1.06rem; color:#fde047;">🌟 進入新模式：【太古四聖神獸捕獲戰】（抓捕升級版 T4 四大神獸！）</span>
            <span class="v21-btn-sub-txt" style="color:#e0f2fe;">九尾焚天金烏狐帝 · 太古混沌玄武真君 · 神霄滅世雷凰 · 萬古建木麒麟聖鹿 高頻降臨 + 全屏抓寵雷達提示！</span>
          </button>

          <div class="v21-title-secondary-row">
            <button type="button" class="v21-btn-QuickStart" id="btn-v21-quick-battle">
              ⚡ 上次配置直接開戰
            </button>
            <button type="button" class="v21-btn-secondary" id="btn-v21-open-shrine">
              🏛️ 太初道魂聖殿 (永久強化)
            </button>
            <button type="button" class="v21-btn-secondary" id="btn-v21-open-codex">
              📖 神兵與四聖獸圖鑑
            </button>
            <button type="button" class="v21-btn-secondary" id="btn-v21-toggle-audio">
              🎵 古琴仙樂音效
            </button>
          </div>
        </div>

        <!-- 遊戲特色摘要 -->
        <div class="v21-feature-highlights">
          <div>🗡️ <b>6大本命神兵×18招流光絕技</b>：御劍、狂刀、星槍、太極輪、神火爐、紫電幡自由切換與升階</div>
          <div>🦊 <b>4系山海神獸三階進化</b>：投擲降妖靈葫收服火狐、玄武、雷鵬、仙鹿，施展專屬全屏大招</div>
          <div>👹 <b>十波漸進關卡與巨型魔尊</b>：挑戰雙層護罡與二階段狂暴巨型BOSS，小心走位躲避紅圈魔隕與彈幕！</div>
        </div>
      </div>

      <!-- 🏛️ 太初道魂聖殿 / 📖 圖鑑 共用彈出視窗 -->
      <div class="v21-modal-backdrop" id="v21-title-modal" style="display:none;">
        <div class="v21-modal-box" id="v21-title-modal-content"></div>
      </div>
    `;
    container.appendChild(wrap);

    // 啟動標題畫面 60FPS 粒子與御劍飛仙背景動畫
    const bgCanvas = wrap.querySelector("#v21-title-bg-canvas");
    if (bgCanvas) {
      const ctx = bgCanvas.getContext("2d");
      let tFrame = 0;
      const bgParticles = [];
      for (let i = 0; i < 36; i++) {
        bgParticles.push({
          x: Math.random() * 900,
          y: Math.random() * 440,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.4 - Math.random() * 1.1,
          size: 3 + Math.random() * 5,
          color: ["#38bdf8", "#fde047", "#f472b6", "#c084fc"][i % 4],
          type: i % 3 === 0 ? "spark" : "ember",
          life: 60 + Math.random() * 60,
          maxLife: 120
        });
      }

      const renderTitleLoop = () => {
        if (!document.body.contains(bgCanvas)) return;
        tFrame++;
        ctx.clearRect(0, 0, 900, 440);

        const bgGrad = ctx.createRadialGradient(450, 210, 20, 450, 220, 520);
        bgGrad.addColorStop(0, "#172536");
        bgGrad.addColorStop(0.55, "#0d131a");
        bgGrad.addColorStop(1, "#07090d");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 900, 440);

        // 繪製中央太極八卦蓮華大陣
        WuxiaHDVFXEngine.drawBloomingLotus(ctx, 450, 220, 175, 12, tFrame * 0.008, "rgba(56,189,248,0.12)", "rgba(56,189,248,0.38)", "rgba(254,240,138,0.4)");
        WuxiaHDVFXEngine.drawBloomingLotus(ctx, 450, 220, 115, 8, -tFrame * 0.012, "rgba(192,132,252,0.15)", "rgba(250,204,21,0.45)", "#ffffff");

        // 繪製環繞的 8 柄流光飛劍
        for (let i = 0; i < 8; i++) {
          const ang = tFrame * 0.03 + (i * Math.PI * 2) / 8;
          const sx = 450 + Math.cos(ang) * 155;
          const sy = 220 + Math.sin(ang) * 85;
          WuxiaHDVFXEngine.drawCrescentWave(ctx, sx, sy, 26, 8, ang + Math.PI / 2, Math.PI * 0.7, "#0284c7", "#38bdf8", "#ffffff");
          PixelSpriteEngine.draw(ctx, "SWORD", sx, sy, 2.6, false, false, ang + Math.PI / 2);
        }

        // 左右兩側展示四大三階神獸與巨型魔尊剪影
        PixelSpriteEngine.draw(ctx, "FOX_T3_0", 145, 255 + Math.sin(tFrame * 0.06) * 6, 3.0);
        PixelSpriteEngine.draw(ctx, "TURTLE_T3_0", 225, 315 + Math.cos(tFrame * 0.06) * 5, 3.0);
        PixelSpriteEngine.draw(ctx, "BIRD_T3_0", 675, 255 + Math.sin(tFrame * 0.07) * 6, 3.0, true);
        PixelSpriteEngine.draw(ctx, "DEER_T3_0", 755, 315 + Math.cos(tFrame * 0.06) * 5, 3.0, true);
        PixelSpriteEngine.draw(ctx, "HERO_0", 450, 245 + Math.sin(tFrame * 0.05) * 4, 3.5);

        bgParticles.forEach(pt => {
          WuxiaHDVFXEngine.drawParticle(ctx, pt);
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.y < -10) {
            pt.y = 450;
            pt.x = Math.random() * 900;
          }
        });

        this._v21TitleRaf = requestAnimationFrame(renderTitleLoop);
      };
      this._v21TitleRaf = requestAnimationFrame(renderTitleLoop);
    }

    wrap.querySelector("#btn-v21-goto-setup")?.addEventListener("click", () => {
      audio.playEpiphanyBell();
      v21.screen = "setup";
      this.renderView();
    });

    wrap.querySelector("#btn-v22-divine-beast-mode")?.addEventListener("click", () => {
      audio.playLevelUp();
      v21.arenaMode = "divine_beasts";
      const v14 = this.char.ensureV14WuxiaState();
      v14.arenaMode = "divine_beasts";
      v14.petGourds = Math.max(12, v14.petGourds || 12);
      v21.screen = "battle";
      this.saveGame();
      this.renderView();
    });

    wrap.querySelector("#btn-v21-quick-battle")?.addEventListener("click", () => {
      audio.playSwordClash();
      v21.screen = "battle";
      this.renderView();
    });

    wrap.querySelector("#btn-v21-toggle-audio")?.addEventListener("click", () => {
      const isPlaying = audio.toggleBGM();
      audio.playEpiphanyBell();
      alert(isPlaying ? "🎵 已開啟國風古琴五聲背景仙樂！" : "🔇 已關閉背景音樂（保留戰鬥打擊音效）。");
    });

    // 🏛️ 太初道魂聖殿彈窗
    const openShrineModal = () => {
      const modal = wrap.querySelector("#v21-title-modal");
      const box = wrap.querySelector("#v21-title-modal-content");
      if (!modal || !box) return;
      modal.style.display = "flex";

      const renderShrineList = () => {
        box.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #fbbf24; padding-bottom:8px; margin-bottom:10px;">
            <div>
              <b style="font-size:1.12rem; color:#fef08a;">🏛️ 太初道魂聖殿 · 永久天賦強化</b>
              <div style="font-size:0.78rem; color:#cbd5e1;">每次戰鬥勝利或隕落皆可獲得【💎 太初道魂晶】，永久強化角色底蘊！</div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="background:#1e293b; border:1.5px solid #fbbf24; color:#fde047; padding:4px 10px; font-weight:900; font-size:0.9rem;">💎 持有道魂晶：${v21.soulGems}</span>
              <button type="button" class="v21-modal-close-btn" id="btn-v21-close-modal">✖ 關閉</button>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${V21_TALENT_SHRINE.map(t => {
              const curLv = v21.talents[t.id] || 1;
              const isMax = curLv >= t.maxLv;
              const cost = t.baseCost * curLv;
              return `
                <div style="background:#18181b; border:1.5px solid #3f3f46; padding:9px 12px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
                  <div>
                    <div style="font-size:0.92rem; font-weight:900; color:#f8fafc;">${t.name} <span style="color:#38bdf8;">(Lv.${curLv} / ${t.maxLv})</span></div>
                    <div style="font-size:0.78rem; color:#a1a1aa; margin-top:2px;">${t.desc}</div>
                  </div>
                  <button type="button" class="v21-shrine-up-btn" data-talent-id="${t.id}" ${isMax ? 'disabled' : ''} style="background:${isMax ? '#334155' : '#d97706'}; color:#fff; border:2px solid #fde047; padding:6px 12px; font-weight:900; font-size:0.8rem; cursor:${isMax ? 'default' : 'pointer'}; white-space:nowrap;">
                    ${isMax ? '🌟 已滿階' : `⬆️ 升階 (${cost} 💎)`}
                  </button>
                </div>
              `;
            }).join("")}
          </div>
        `;

        box.querySelector("#btn-v21-close-modal")?.addEventListener("click", () => {
          modal.style.display = "none";
        });

        box.querySelectorAll("[data-talent-id]").forEach(btn => {
          btn.addEventListener("click", () => {
            const tid = btn.getAttribute("data-talent-id");
            const tCfg = V21_TALENT_SHRINE.find(x => x.id === tid);
            if (!tCfg) return;
            const curLv = v21.talents[tid] || 1;
            const cost = tCfg.baseCost * curLv;
            if (curLv >= tCfg.maxLv) return;
            if (v21.soulGems < cost) {
              alert(`💎 太初道魂晶不足（需要 ${cost} 顆，當前持有 ${v21.soulGems} 顆）！進入戰場斬殺魔物或通關即可獲取大量道魂晶。`);
              return;
            }
            v21.soulGems -= cost;
            v21.talents[tid] = curLv + 1;
            audio.playLevelUp();
            this.saveGame();
            const gemEl = wrap.querySelector("#v21-title-soulgems");
            if (gemEl) gemEl.innerText = v21.soulGems;
            renderShrineList();
          });
        });
      };

      renderShrineList();
    };

    wrap.querySelector("#btn-v21-open-shrine")?.addEventListener("click", openShrineModal);

    // 📖 山海百妖與神兵圖鑑彈窗
    wrap.querySelector("#btn-v21-open-codex")?.addEventListener("click", () => {
      const modal = wrap.querySelector("#v21-title-modal");
      const box = wrap.querySelector("#v21-title-modal-content");
      if (!modal || !box) return;
      modal.style.display = "flex";

      box.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #38bdf8; padding-bottom:8px; margin-bottom:10px;">
          <b style="font-size:1.06rem; color:#7dd3fc;">📖 《萬劍屠魔》2D像素風全Asset圖鑑（角色道體 · 六大神兵 · 四聖獸 · 魔物BOSS樣貌與像素細節）</b>
          <button type="button" class="v21-modal-close-btn" id="btn-v21-close-codex">✖ 關閉</button>
        </div>
        <div style="max-height:70vh; overflow-y:auto; display:flex; flex-direction:column; gap:10px; padding-right:4px;">
          <div style="font-size:0.88rem; font-weight:900; color:#fde047;">⚔️ 六大本命神兵 2D 像素風 Asset 與樣貌細節</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(255px, 1fr)); gap:8px;">
            ${Object.values(WUXIA_WEAPONS_ARSENAL).map(w => {
              const spec = PIXEL_ART_LORE_SPECS.weapons[w.id] || {};
              return `
                <div style="background:#18181b; border:1.5px solid ${w.color}; padding:8px; display:flex; gap:8px; align-items:flex-start;">
                  <canvas data-pixel-preview="${spec.spriteKey || 'WEP_SWORD'}" data-pixel-scale="3" style="background:#090d14; border:1px solid ${w.color}; flex-shrink:0; image-rendering:pixelated;"></canvas>
                  <div style="flex:1; min-width:0;">
                    <div style="font-size:0.86rem; font-weight:900; color:${w.color};">${w.icon} ${w.name}</div>
                    <div style="font-size:0.7rem; color:#fef08a; margin-top:2px;">🎨 <b>樣貌描述：</b>${spec.appearanceDesc || ''}</div>
                    <div style="font-size:0.66rem; color:#93c5fd; margin-top:1px;">👾 <b>像素細節：</b>${spec.pixelDetails || ''}</div>
                    <div style="font-size:0.68rem; color:#4ade80; margin-top:2px;">★ 三絕技：${w.skills.map(s => s.icon + s.name).join(" / ")}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <div style="font-size:0.88rem; font-weight:900; color:#4ade80; margin-top:4px;">🐾 四系山海靈寵（T1幼獸 ➔ T4太古聖獸）2D 像素風 Asset 與樣貌細節</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(255px, 1fr)); gap:8px;">
            ${Object.entries(PIXEL_ART_LORE_SPECS.pets).map(([pid, pSpec]) => `
              <div style="background:#18181b; border:1.5px solid #fbbf24; padding:8px; display:flex; gap:8px; align-items:flex-start;">
                <div style="display:flex; flex-direction:column; gap:4px; align-items:center; flex-shrink:0;">
                  <canvas data-pixel-preview="${pSpec.sprites[0]}" data-pixel-scale="2" style="background:#090d14; border:1px solid #64748b; image-rendering:pixelated;" title="T1初階像素"></canvas>
                  <canvas data-pixel-preview="${pSpec.sprites[3]}" data-pixel-scale="2" style="background:#090d14; border:1px solid #fde047; image-rendering:pixelated;" title="T4聖獸像素"></canvas>
                </div>
                <div style="flex:1; min-width:0;">
                  <div style="font-size:0.84rem; font-weight:900; color:#fde047;">${pSpec.name} ➔ 🌟${pSpec.divineName}</div>
                  <div style="font-size:0.7rem; color:#e2e8f0; margin-top:2px;">🎨 <b>樣貌描述：</b>${pSpec.appearanceDesc}</div>
                  <div style="font-size:0.66rem; color:#67e8f9; margin-top:2px;">👾 <b>像素細節：</b>${pSpec.pixelDetails}</div>
                </div>
              </div>
            `).join("")}
          </div>

          <div style="font-size:0.88rem; font-weight:900; color:#f87171; margin-top:4px;">👹 十波漸進魔物與巨型鎮關 BOSS 2D 像素風 Asset 與樣貌細節</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:8px;">
            ${V21_ENEMY_CODEX.map(e => `
              <div style="background:#18181b; border:1px solid #52525b; padding:7px 9px; display:flex; gap:8px; align-items:flex-start;">
                <canvas data-pixel-preview="${e.spriteKey || 'CULTIST_0'}" data-pixel-scale="2" style="background:#090d14; border:1px solid #ef4444; flex-shrink:0; image-rendering:pixelated;"></canvas>
                <div style="flex:1; min-width:0;">
                  <div style="font-size:0.84rem; font-weight:900; color:#fca5a5;">${e.icon} ${e.name} <span style="font-size:0.68rem; color:#fde047;">(${e.role})</span></div>
                  <div style="font-size:0.7rem; color:#fef08a; margin-top:2px;">🎨 <b>樣貌描述：</b>${e.appearanceDesc || ''}</div>
                  <div style="font-size:0.66rem; color:#93c5fd; margin-top:1px;">👾 <b>像素細節：</b>${e.pixelDetails || ''}</div>
                  <div style="font-size:0.68rem; color:#d4d4d8; margin-top:2px;">⚔️ ${e.desc}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;

      box.querySelectorAll("canvas[data-pixel-preview]").forEach(cv => {
        const key = cv.getAttribute("data-pixel-preview");
        const sc = parseInt(cv.getAttribute("data-pixel-scale") || "2", 10);
        PixelSpriteEngine.renderPreviewCanvas(cv, key, sc);
      });

      box.querySelector("#btn-v21-close-codex")?.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
  };

  // ==================== 2. 戰前整備與自訂介面（Pre-Game Loadout & Customization Screen） ====================
  App.prototype.renderV21LoadoutScreen = function(container) {
    const v21 = this.char.ensureV21StandaloneState();
    const curWep = WUXIA_WEAPONS_ARSENAL[v21.weaponId] || WUXIA_WEAPONS_ARSENAL.sword;
    const curSkin = V21_HERO_SKINS[v21.heroSkin] || V21_HERO_SKINS.cyan;

    const modeConfigs = {
      divine_beasts: { name: "🌟 太古四聖獸捕獲", desc: "【全新模式】專為抓捕原4種寵物的終極升級版【T4太古四聖神獸】設計！開局贈送12個靈葫，四聖獸（九尾金烏狐帝、太古混沌玄武、神霄滅世雷凰、萬古建木聖鹿）高頻率攜帶全屏雷達提示降臨，集齊四聖獸或擊破第10波即可獲勝！" },
      hybrid: { name: "👑 山海十波闖關", desc: "標準10波漸進式關卡，隨波次解鎖6大魔物與巨型Boss，擊敗第10波魔帝即可獲勝通關！" },
      defense: { name: "🛡️ 靈泉古陣守護", desc: "守護中央八角白玉蓮華池！若主角氣血歸零或靈泉被魔物啃食殆盡則宣告失敗！" },
      pokemon: { name: "🦊 萬獸降妖收服", desc: "四大秘境野生靈獸高頻刷新！迅速收服並進化四系山海神獸協同作戰！" },
      endless: { name: "⚔️ 無雙極限狂潮", desc: "怪物刷新速度與數量提升，體驗滿屏流光絕技橫掃千軍的極致快感！" },
      boss_rush: { name: "👹 魔首連環死鬥", desc: "開局即降臨巨型深淵大魔尊！連續迎戰三大4倍體型狂暴魔尊，高風險高回報！" }
    };

    const wrap = document.createElement("div");
    wrap.className = "v21-standalone-shell";
    wrap.innerHTML = `
      <div class="v21-loadout-card">
        <!-- 頂部導航列 -->
        <div class="v21-loadout-header">
          <button type="button" class="v21-btn-back" id="btn-v21-back-title">⬅️ 返回主標題</button>
          <div style="text-align:center;">
            <div style="font-size:1.15rem; font-weight:900; color:#fef08a; letter-spacing:1px;">🛠️ 戰前整備與自訂配置（Loadout & Customization）</div>
            <div style="font-size:0.76rem; color:#cbd5e1;">自由搭配出戰劍仙道體、本命神兵、初始靈獸、護身法寶與挑戰難度</div>
          </div>
          <div style="background:#1e293b; border:1.5px solid #fbbf24; color:#fde047; padding:4px 10px; font-weight:900; font-size:0.84rem;">
            💎 道魂晶：${v21.soulGems}
          </div>
        </div>

        <!-- 步驟 1：自訂角色名號與四大劍仙道體法相 -->
        <div class="v21-setup-section">
          <div class="v21-sec-title">
            <span>① 自訂俠客名號與劍仙道體法相</span>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:0.76rem; color:#94a3b8;">俠客尊號：</span>
              <input type="text" id="v21-input-heroname" value="${v21.heroName}" maxlength="10" style="background:#090d14; border:1.5px solid #38bdf8; color:#fff; padding:2px 8px; font-size:0.82rem; font-weight:900; width:115px; font-family:monospace;" />
            </div>
          </div>
          <div class="v21-grid-4">
            ${Object.values(V21_HERO_SKINS).map(sk => {
              const hSpec = PIXEL_ART_LORE_SPECS.heroes[sk.id] || {};
              return `
                <div class="v21-choice-box ${sk.id === v21.heroSkin ? 'active' : ''}" data-skin-id="${sk.id}" style="border-color:${sk.id === v21.heroSkin ? sk.color : '#334155'}; display:flex; align-items:center; gap:10px;">
                  <canvas data-pixel-preview="${hSpec.sprite0 || 'HERO_CYAN_0'}" data-pixel-scale="2" style="background:#090d14; border:1px solid ${sk.color}; flex-shrink:0; image-rendering:pixelated;"></canvas>
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; flex-wrap:wrap;">
                      <span style="font-size:0.9rem; font-weight:900; color:${sk.color};">${sk.icon} ${sk.name}</span>
                      ${sk.id === v21.heroSkin ? '<span class="v21-tag-selected">✔ 出戰</span>' : ''}
                    </div>
                    <div style="font-size:0.74rem; color:#fde047; font-weight:800; margin-top:3px;">${sk.tag}</div>
                    <div style="font-size:0.7rem; color:#cbd5e1; margin-top:2px; line-height:1.3;">${hSpec.appearanceDesc || sk.desc}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- 步驟 2：選擇本命神兵（6選1）與預覽專屬三絕技 -->
        <div class="v21-setup-section">
          <div class="v21-sec-title">
            <span>② 選擇出戰本命神兵（6 大神兵各具優勢短處與 3 招專屬升級絕技）</span>
            <span style="font-size:0.74rem; color:#38bdf8;">戰場中亦可隨時切換神兵</span>
          </div>
          <div class="v21-grid-6">
            ${Object.values(WUXIA_WEAPONS_ARSENAL).map(w => {
              const wSpec = PIXEL_ART_LORE_SPECS.weapons[w.id] || {};
              return `
                <div class="v21-choice-box compact ${w.id === v21.weaponId ? 'active' : ''}" data-setup-wep="${w.id}" style="border-color:${w.id === v21.weaponId ? w.color : '#334155'}; display:flex; flex-direction:column; align-items:center;">
                  <canvas data-pixel-preview="${wSpec.spriteKey || 'WEP_SWORD'}" data-pixel-scale="2" style="background:#090d14; border:1px solid ${w.color}; margin-bottom:3px; image-rendering:pixelated;"></canvas>
                  <div style="font-size:0.8rem; font-weight:900; color:${w.color};">${w.shortName}</div>
                  <div style="font-size:0.64rem; color:#94a3b8;">${w.roleTag.split('·')[0]}</div>
                </div>
              `;
            }).join("")}
          </div>
          <!-- 當前選中武器之 2D 像素樣貌描述、優缺點與 3 招專屬絕技詳情 -->
          <div class="v21-weapon-detail-preview" style="border-color:${curWep.color};">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
              <b style="font-size:0.92rem; color:${curWep.color};">${curWep.icon}【${curWep.name}】— ${curWep.roleTag}</b>
              <span style="font-size:0.74rem; color:#fde047;">基礎傷害倍率：×${curWep.baseDmgMult} ｜ 攻速間隔：${curWep.baseCd}幀</span>
            </div>
            <div style="font-size:0.74rem; color:#fef08a; margin-top:3px;">🎨 <b>2D像素樣貌描述：</b>${(PIXEL_ART_LORE_SPECS.weapons[curWep.id] || {}).appearanceDesc || ''}（${(PIXEL_ART_LORE_SPECS.weapons[curWep.id] || {}).pixelDetails || ''}）</div>
            <div style="font-size:0.74rem; color:#4ade80; margin-top:2px;">▲ 武器優勢：${curWep.pros}</div>
            <div style="font-size:0.74rem; color:#f87171;">▼ 武器短處：${curWep.cons}</div>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; margin-top:6px;">
              ${curWep.skills.map((sk, idx) => `
                <div style="background:#090d14; border:1px solid ${sk.color}; padding:5px 7px;">
                  <div style="font-size:0.78rem; font-weight:900; color:${sk.color};">[技能${idx + 1}] ${sk.icon} ${sk.name}</div>
                  <div style="font-size:0.67rem; color:#cbd5e1; margin-top:2px; line-height:1.25;">${sk.desc}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- 步驟 3：選擇開局隨行靈獸與初始進化階位 -->
        <div class="v21-setup-section">
          <div class="v21-sec-title">
            <span>③ 選擇開局本命靈獸與初始形態階位</span>
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="font-size:0.74rem; color:#fde047;">自訂初始形態：</span>
              ${[1, 2, 3, 4].map(tier => `
                <button type="button" class="v21-tier-pill ${v21.starterPetTier === tier ? 'active' : ''}" data-pet-tier="${tier}">
                  T${tier} ${tier === 1 ? '幼獸' : (tier === 2 ? '靈獸' : (tier === 3 ? '三階神獸' : '🌟太古四聖獸(升級版)'))}
                </button>
              `).join("")}
            </div>
          </div>
          <div class="v21-grid-4">
            ${Object.entries(WUXIA_PET_SKILLS_INFO).map(([pid, pInfo]) => {
              const pIcons = { fox: "🦊", turtle: "🐢", bird: "🐥", deer: "🦌" };
              const pNames = { fox: "赤焰靈狐", turtle: "玄冥靈龜", bird: "裂空雷雛", deer: "青靈仙鹿" };
              const silhouetteLabels = {
                fox: "【側面狐型】尖吻長耳＋扇形九尾火狐",
                turtle: "【四足龍龜】伸首四足＋冰峰背甲騰蛇",
                bird: "【展翅雷凰】彎喙羽冠＋V字雙翼三長尾羽",
                deer: "【高挑仙鹿】修長四蹄＋繁花桃枝巨型鹿角"
              };
              const isSel = (v21.starterPetId === pid);
              const pSpec = PIXEL_ART_LORE_SPECS.pets[pid] || { sprites: ["FOX_T1_0"] };
              const tierIdx = Math.min(3, Math.max(0, (v21.starterPetTier || 1) - 1));
              const previewSpriteKey = pSpec.sprites[tierIdx] || pSpec.sprites[0];
              return `
                <div class="v21-choice-box ${isSel ? 'active' : ''}" data-setup-pet="${pid}" style="border-color:${isSel ? pInfo.color : '#334155'}; display:flex; align-items:center; gap:10px;">
                  <canvas data-pixel-preview="${previewSpriteKey}" data-pixel-scale="2" style="background:#090d14; border:1.5px solid ${pInfo.color}; flex-shrink:0; image-rendering:pixelated;"></canvas>
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; flex-wrap:wrap;">
                      <span style="font-size:0.9rem; font-weight:900; color:${pInfo.color};">${pIcons[pid]} ${v21.starterPetTier >= 4 ? pInfo.divineName : pNames[pid]}</span>
                      ${isSel ? '<span class="v21-tag-selected">✔ 出戰</span>' : ''}
                    </div>
                    <div style="font-size:0.74rem; color:#fde047; font-weight:900; margin-top:2px;">★ ${v21.starterPetTier >= 4 ? pInfo.divineSkillName : pInfo.skillName}</div>
                    <div style="font-size:0.7rem; color:#7dd3fc; margin-top:2px;">${silhouetteLabels[pid]}</div>
                    <div style="font-size:0.68rem; color:#cbd5e1; margin-top:2px; line-height:1.3;">${v21.starterPetTier >= 4 ? pInfo.divineShortTag : pInfo.shortTag}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- 步驟 4：選擇開局攜帶本命法寶（6 選 2） -->
        <div class="v21-setup-section">
          <div class="v21-sec-title">
            <span>④ 選擇開局攜帶本命法寶（最多任選 2 件，已選 <b style="color:#fde047;">${v21.selectedRelics.length} / 2</b> 件）</span>
            <span style="font-size:0.73rem; color:#4ade80;">建議勾選「🎗️九轉不滅金身帶」可防暴斃復活一次！</span>
          </div>
          <div class="v21-grid-3">
            ${Object.values(V21_STARTER_RELICS).map(rel => {
              const isPicked = v21.selectedRelics.includes(rel.id);
              return `
                <div class="v21-choice-box ${isPicked ? 'active' : ''}" data-setup-relic="${rel.id}" style="border-color:${isPicked ? '#fbbf24' : '#334155'};">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.85rem; font-weight:900; color:#fef08a;">${rel.icon} ${rel.name}</span>
                    ${isPicked ? '<span class="v21-tag-selected">✔ 攜帶</span>' : ''}
                  </div>
                  <div style="font-size:0.68rem; color:#cbd5e1; margin-top:3px; line-height:1.3;">${rel.desc}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- 步驟 5：選擇遊玩模式與難度階位 -->
        <div class="v21-setup-section">
          <div class="v21-sec-title"><span>⑤ 選擇戰場模式與挑戰難度</span></div>
          <div class="mow-mode-tabs" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:5px; margin-bottom:6px;">
            ${Object.entries(modeConfigs).map(([mKey, mCfg]) => `
              <button type="button" class="mow-mode-btn ${v21.arenaMode === mKey ? 'active' : ''}" data-setup-mode="${mKey}" style="padding:6px 4px; font-size:0.78rem;">
                ${mCfg.name}
              </button>
            `).join("")}
          </div>
          <div style="font-size:0.74rem; color:#93c5fd; margin-bottom:7px;">📌 模式規則：${modeConfigs[v21.arenaMode].desc}</div>

          <div class="v21-grid-3">
            ${Object.values(V21_DIFFICULTY_TIERS).map(df => `
              <div class="v21-choice-box ${df.id === v21.difficulty ? 'active' : ''}" data-setup-diff="${df.id}" style="border-color:${df.id === v21.difficulty ? '#f97316' : '#334155'};">
                <div style="font-size:0.84rem; font-weight:900; color:#fed7aa;">${df.name}</div>
                <div style="font-size:0.68rem; color:#cbd5e1; margin-top:2px;">${df.desc}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 底部一鍵出征大按鈕 -->
        <button type="button" class="v21-btn-primary-start" id="btn-v21-launch-battle" style="margin-top:6px;">
          <span class="v21-btn-main-txt">🔥 整備完畢 · 拔劍踏入萬劍戰場！</span>
          <span class="v21-btn-sub-txt">出戰角色：${curSkin.icon}${v21.heroName} ｜ 神兵：${curWep.icon}${curWep.name} ｜ 靈獸：T${v21.starterPetTier} ｜ 難度：${V21_DIFFICULTY_TIERS[v21.difficulty].name}</span>
        </button>
      </div>
    `;
    container.appendChild(wrap);

    wrap.querySelectorAll("canvas[data-pixel-preview]").forEach(cv => {
      const key = cv.getAttribute("data-pixel-preview");
      const sc = parseInt(cv.getAttribute("data-pixel-scale") || "2", 10);
      PixelSpriteEngine.renderPreviewCanvas(cv, key, sc);
    });

    const saveNameInput = () => {
      const inp = wrap.querySelector("#v21-input-heroname");
      if (inp && inp.value.trim()) {
        v21.heroName = inp.value.trim();
        this.char.name = v21.heroName;
      }
    };

    wrap.querySelector("#v21-input-heroname")?.addEventListener("change", () => {
      saveNameInput();
      this.saveGame();
    });

    wrap.querySelector("#btn-v21-back-title")?.addEventListener("click", () => {
      saveNameInput();
      audio.playQiCharge();
      v21.screen = "title";
      this.renderView();
    });

    wrap.querySelectorAll("[data-skin-id]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        v21.heroSkin = el.getAttribute("data-skin-id");
        audio.playQiCharge();
        this.renderView();
      });
    });

    wrap.querySelectorAll("[data-setup-wep]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        v21.weaponId = el.getAttribute("data-setup-wep");
        this.char.ensureV14WuxiaState().selectedWeaponId = v21.weaponId;
        audio.playSwordClash();
        this.renderView();
      });
    });

    wrap.querySelectorAll("[data-pet-tier]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        v21.starterPetTier = parseInt(el.getAttribute("data-pet-tier"), 10) || 1;
        audio.playQiCharge();
        this.renderView();
      });
    });

    wrap.querySelectorAll("[data-setup-pet]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        v21.starterPetId = el.getAttribute("data-setup-pet");
        audio.playQiCharge();
        this.renderView();
      });
    });

    wrap.querySelectorAll("[data-setup-relic]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        const rid = el.getAttribute("data-setup-relic");
        const idx = v21.selectedRelics.indexOf(rid);
        if (idx >= 0) {
          if (v21.selectedRelics.length > 1) v21.selectedRelics.splice(idx, 1);
        } else {
          if (v21.selectedRelics.length >= 2) v21.selectedRelics.shift();
          v21.selectedRelics.push(rid);
        }
        audio.playQiCharge();
        this.renderView();
      });
    });

    wrap.querySelectorAll("[data-setup-mode]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        v21.arenaMode = el.getAttribute("data-setup-mode");
        this.char.ensureV14WuxiaState().arenaMode = v21.arenaMode;
        audio.playQiCharge();
        this.renderView();
      });
    });

    wrap.querySelectorAll("[data-setup-diff]").forEach(el => {
      el.addEventListener("click", () => {
        saveNameInput();
        v21.difficulty = el.getAttribute("data-setup-diff");
        audio.playQiCharge();
        this.renderView();
      });
    });

    wrap.querySelector("#btn-v21-launch-battle")?.addEventListener("click", () => {
      saveNameInput();
      const v14 = this.char.ensureV14WuxiaState();
      v14.selectedWeaponId = v21.weaponId;
      v14.arenaMode = v21.arenaMode;
      // 重置本局各把武器的初始技能等級為 Lv.1（讓每局都有一步步升級變強的完整成長體驗！）
      v14.weaponSkillLevels = {};
      Object.keys(WUXIA_WEAPONS_ARSENAL).forEach(k => {
        v14.weaponSkillLevels[k] = [1, 1, 1];
      });
      // 設定開局選擇的本命靈獸與自訂初始階位
      const pid = v21.starterPetId || "fox";
      const sTier = v21.starterPetTier || 1;
      const pMeta = WUXIA_PET_SKILLS_INFO[pid] || WUXIA_PET_SKILLS_INFO.fox;
      const petIcons = { fox: "🦊", turtle: "🐢", bird: "🐥", deer: "🦌" };
      v14.companionPets = [{
        id: pid,
        name: sTier >= 4 ? pMeta.divineName : pMeta.baseName,
        tier: sTier,
        element: pid === "fox" ? "fire" : (pid === "turtle" ? "water" : (pid === "bird" ? "thunder" : "grass")),
        lv: 1, exp: 0, maxExp: 25,
        title: sTier >= 4 ? pMeta.divineName : pMeta.baseName,
        icon: sTier >= 4 ? pMeta.divineIcon : petIcons[pid]
      }];
      const baseGourds = (v21.arenaMode === "divine_beasts" ? 12 : 6) + (v21.talents.petLv || 1) + (v21.selectedRelics.includes("gourd_treasure") ? 6 : 0);
      v14.petGourds = baseGourds;
      v14.heldItems = v21.selectedRelics.map(rKey => V21_STARTER_RELICS[rKey] ? V21_STARTER_RELICS[rKey].shortName : rKey);

      v21.totalRuns = (v21.totalRuns || 0) + 1;
      v21.screen = "battle";
      audio.playSwordClash();
      this.saveGame();
      this.renderView();
    });
  };

  // ==================== 3. 獨立《萬劍屠魔》戰場介面（含顯眼角色生命與護盾大血條、死亡修復與勝利/失敗結算畫面） ====================
  App.prototype.renderV21BattleScreen = function(container) {
    this.stopV13MowingLoop();
    if (this._wuxiaKeyHandler) {
      window.removeEventListener("keydown", this._wuxiaKeyHandler);
      window.removeEventListener("keyup", this._wuxiaKeyUpHandler);
      this._wuxiaKeyHandler = null;
      this._wuxiaKeyUpHandler = null;
    }

    const v21 = this.char.ensureV21StandaloneState();
    const v14 = this.char.ensureV14WuxiaState();

    if (!v14.selectedWeaponId || !WUXIA_WEAPONS_ARSENAL[v14.selectedWeaponId]) {
      v14.selectedWeaponId = v21.weaponId || "sword";
    }
    if (!v14.weaponSkillLevels) v14.weaponSkillLevels = {};
    Object.keys(WUXIA_WEAPONS_ARSENAL).forEach(wKey => {
      if (!v14.weaponSkillLevels[wKey]) v14.weaponSkillLevels[wKey] = [1, 1, 1];
    });
    if (!v14.universalSkillLevels) {
      v14.universalSkillLevels = {
        uni_golden_dragon: 1,
        uni_star_meteor: 0,
        uni_frost_nova: 0,
        uni_crimson_lotus: 0,
        uni_chaos_thunder: 0,
        uni_void_blackhole: 0
      };
    }
    if (v14.petGourds === undefined || v14.petGourds < 0) v14.petGourds = 6;
    if (!v14.companionPets || v14.companionPets.length === 0) {
      v14.companionPets = [{ id: "fox", name: "赤焰靈狐", tier: v21.starterPetTier || 1, element: "fire", lv: 1, exp: 0, maxExp: 20, title: "赤焰幼狐", icon: "🦊" }];
    }

    const curMode = v21.arenaMode || v14.arenaMode || "hybrid";
    const curDiff = V21_DIFFICULTY_TIERS[v21.difficulty] || V21_DIFFICULTY_TIERS.normal;
    const curSkin = V21_HERO_SKINS[v21.heroSkin] || V21_HERO_SKINS.cyan;
    const curWep = WUXIA_WEAPONS_ARSENAL[v14.selectedWeaponId] || WUXIA_WEAPONS_ARSENAL.sword;

    const modeNames = {
      divine_beasts: "🌟 太古四聖獸捕獲戰",
      hybrid: "👑 山海十波闖關",
      defense: "🛡️ 靈泉古陣守護",
      pokemon: "🦊 萬獸降妖收服",
      endless: "⚔️ 無雙極限狂潮",
      boss_rush: "👹 魔首連環死鬥"
    };

    const wrap = document.createElement("div");
    wrap.className = "wuxia-hebi-container pixel-art-mode";
    wrap.id = "v19-mowing-root-wrap";
    wrap.style.cssText = "display:flex; flex-direction:column; gap:5px; padding-bottom:14px;";

    wrap.innerHTML = `
      <div class="wuxia-card pixel-ui-card v26-clean-battle-card" id="v19-mowing-main-card" style="padding:4px; margin:0;">
        <!-- v26.0 預設隱藏上方資訊面板（讓進入遊戲後直接呈現完整長方形大畫面，可按右上角「🎒戰術面板」展開查看） -->
        <div id="v26-collapsible-top-info" class="v26-top-info-drawer" style="display:none;">
        <!-- 頂部獨立遊戲導航列（返回標題 / 戰前自訂 / 全螢幕切換） -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; flex-wrap:wrap; gap:5px; background:#0f172a; border:2px solid #000; padding:5px 8px; color:#f8fafc;">
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <button type="button" class="pixel-btn" id="btn-v21-battle-to-title" style="background:#1e293b; color:#cbd5e1; border:1.5px solid #64748b !important; font-size:0.73rem; padding:2px 7px; font-weight:900; cursor:pointer;">🏠 主選單</button>
            <button type="button" class="pixel-btn" id="btn-v21-battle-to-setup" style="background:#78350f; color:#fde047; border:1.5px solid #fbbf24 !important; font-size:0.73rem; padding:2px 8px; font-weight:900; cursor:pointer;">🛠️ 戰前整備與自訂</button>
            <span style="font-size:0.82rem; font-weight:900; color:#fef08a; font-family:monospace;">${curSkin.icon} ${v21.heroName}（${curSkin.name}）</span>
            <span style="background:#334155; color:#7dd3fc; font-size:0.7rem; padding:1px 6px; font-weight:800; font-family:monospace;">${modeNames[curMode]} ｜ ${curDiff.name.split('（')[0]}</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span id="v19-power-Readout" style="font-size:0.74rem; font-weight:900; color:#fde047; background:#1e293b; border:1px solid #fbbf24; padding:2px 6px; font-family:monospace;">⚔️ 戰力計算中...</span>
            <button type="button" class="pixel-btn" id="btn-v19-toggle-fullscreen" style="background:#0284c7; color:#ffffff; border:2px solid #7dd3fc !important; font-size:0.74rem; padding:2px 8px; font-weight:900; cursor:pointer;">
              🖥️ 遊戲畫面全螢幕 (Z)
            </button>
          </div>
        </div>

        <!-- ❤️ 角色生命氣血與護體罡盾大血條（修復不死Bug：氣血歸零將觸發道軀隕落失敗結算！） -->
        <div style="background:#18181b; border:2px solid #000; box-shadow:2px 2px 0 #000; padding:5px 8px; margin-bottom:5px; font-family:monospace;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:3px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.8rem; font-weight:900; color:#f87171;">❤️ 俠客氣血：<b id="v21-player-hp-text" style="color:#ffffff;">160 / 160</b></span>
              <span style="font-size:0.78rem; font-weight:900; color:#38bdf8;">🛡️ 護體玄罡：<b id="v21-player-shield-text" style="color:#67e8f9;">25</b></span>
              <span id="v21-sash-badge" style="font-size:0.7rem; background:#422006; border:1px solid #fbbf24; color:#fde047; padding:0px 5px; font-weight:900; display:none;">🎗️ 不滅金身待命 (防死1次)</span>
            </div>
            <div style="font-size:0.72rem; color:#fca5a5; font-weight:800;" id="v21-danger-status-hint">
              ⚠️ 注意：魔物近身碰撞、遠程毒箭與Boss魔隕皆會扣減氣血，歸零即戰敗！
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 2.2fr 1fr; gap:6px;">
            <div style="height:9px; background:#3f1111; border:1px solid #000; overflow:hidden; position:relative;">
              <div id="v21-player-hp-bar-fill" style="height:100%; width:100%; background:linear-gradient(90deg, #dc2626 0%, #ef4444 55%, #22c55e 100%); transition:width 0.12s ease;"></div>
            </div>
            <div style="height:9px; background:#0f172a; border:1px solid #000; overflow:hidden; position:relative;">
              <div id="v21-player-shield-bar-fill" style="height:100%; width:50%; background:linear-gradient(90deg, #0284c7 0%, #38bdf8 60%, #67e8f9 100%); transition:width 0.12s ease;"></div>
            </div>
          </div>
        </div>

        <!-- ⚔️ 六大本命神兵即時切換與專屬三絕技升級面板 -->
        <div style="background:#1c1917; border:2px solid #000; box-shadow:2px 2px 0 #000; padding:6px 8px; margin-bottom:5px; color:#f8f5ec; font-family:monospace;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; flex-wrap:wrap; gap:4px;">
            <span style="font-size:0.75rem; color:#fde047; font-weight:900;">⚔️ 六大本命神兵（點擊可隨時切換武器，點擊下方技能卡或按 1/2/3 鍵施展流光絕技）：</span>
            <span style="font-size:0.7rem; color:#67e8f9;" id="v21-survival-clock">⏱️ 存活時間: 00:00 ｜ 💎 本局道魂晶: +0</span>
          </div>
          <div class="v19-weapon-grid" id="v19-weapon-tabs-box">
            ${Object.values(WUXIA_WEAPONS_ARSENAL).map(w => `
              <button type="button" class="v19-weapon-tab ${w.id === curWep.id ? 'active' : ''}" data-weapon-id="${w.id}">
                <div style="font-size:1.1rem; line-height:1;">${w.icon}</div>
                <div style="font-size:0.72rem; font-weight:900; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${w.shortName}</div>
              </button>
            `).join("")}
          </div>
          <div id="v19-weapon-pros-cons" style="background:#0f0d0c; border:1px solid #3f3832; padding:3px 7px; font-size:0.71rem; line-height:1.35; display:flex; flex-direction:column; gap:1px;"></div>
          <div class="v19-skill-cards-row" id="v19-weapon-skills-row"></div>
          <!-- 🌌 v23.0 太初通用無限升級神通欄（不限武器皆可生效 · 無限升級 Lv.1 ➔ Lv.∞） -->
          <div style="margin-top:5px; padding-top:4px; border-top:1px dashed #44403c;">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#fde047; margin-bottom:3px; flex-wrap:wrap; gap:4px;">
              <span>🌌 <b>太初通用無限神通（切換任何武器皆自動施展 · 無等級上限 Lv.∞ · 點擊卡片可升階或立即施放）：</b></span>
              <span style="color:#a7f3d0; font-size:0.66rem;">💡 當武器3招升滿Lv.5後，升級介面將不再出現滿等技能，可無限升級通用神通！</span>
            </div>
            <div id="v23-universal-skills-bar" style="display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); gap:4px;"></div>
          </div>
        </div>

        <!-- 🌊 PokéSurvivor 關卡波數進度儀表板 -->
        <div style="background:#1b1815; border:2px solid #000; box-shadow:2px 2px 0 #000; padding:5px 8px; margin-bottom:5px; color:#f8f5ec; font-family:monospace;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px; margin-bottom:3px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="background:#a32c22; color:#fff; font-weight:900; font-size:0.76rem; padding:1px 6px; border:1px solid #ffd27d;" id="v18-wave-badge">第 1 / 10 波</span>
              <b style="color:#fde047; font-size:0.82rem;" id="v18-wave-title">【初入青玄 · 外門魔卒】</b>
            </div>
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="font-size:0.72rem; color:#67e8f9;" id="v18-boss-timer-hint">👹 首領降臨倒數: 7秒</span>
              <button type="button" class="pixel-btn" id="btn-v18-next-wave" style="background:#334155; color:#fff; font-size:0.68rem; padding:2px 6px; font-weight:900; cursor:pointer;">⏭️ 下一波</button>
              <button type="button" class="pixel-btn" id="btn-v18-summon-boss" style="background:#dc2626; color:#fef08a; font-size:0.68rem; padding:2px 6px; font-weight:900; cursor:pointer;">👹 召喚BOSS</button>
            </div>
          </div>
          <div style="position:relative; height:6px; background:#332e29; border:1px solid #000; overflow:hidden; margin-bottom:3px;">
            <div id="v18-wave-bar-fill" style="height:100%; width:10%; background:linear-gradient(90deg, #22c55e 0%, #eab308 65%, #ef4444 100%); transition:width 0.15s linear;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:#cbd5e1; flex-wrap:wrap; gap:4px;">
            <div id="v18-wave-enemies-tags">本波魔物：<span style="color:#fca5a5; font-weight:900;">🩸血刀門徒</span></div>
            <div id="v18-wave-formation-tag" style="color:#fde047;">陣型：散兵試探</div>
          </div>
        </div>

        <!-- 🐾 2×2 寬敞靈寵戰陣面板 + 🧭 即時抓寵雷達提示條 + 🌟 太古四聖獸捕獲模式切換 -->
        <div style="margin-bottom:5px; background:#fffdf9; border:2px solid #2b2621; box-shadow:2px 2px 0 #000; padding:5px 8px; box-sizing:border-box; overflow:hidden;">
          <div class="v20-pet-header-row">
            <div class="v20-pet-header-left">
              <b style="color:#111; font-size:0.78rem; font-family:monospace; white-space:nowrap;">🐾 四聖神獸戰陣 (<span id="v20-pet-count-label">1</span>/4)：</b>
              <span id="wuxia-pet-badges-list" style="font-size:0.7rem; color:#575249; font-family:monospace; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">點擊畫面野生神獸或按 F/空白鍵 投擲靈葫收服</span>
            </div>
            <div class="v20-pet-header-right">
              <button type="button" class="pixel-btn" id="btn-v22-switch-divine-mode" style="font-size:0.68rem; padding:2px 7px; font-weight:900; background:${curMode === 'divine_beasts' ? '#7e22ce' : '#1e293b'}; color:#fde047; border:1.5px solid #fde047 !important; cursor:pointer; white-space:nowrap;">
                ${curMode === 'divine_beasts' ? '🌟 太古四聖捕獲模式中' : '🌟 切換：抓新四大神獸模式'}
              </button>
              <button type="button" class="pixel-btn" id="btn-v22-summon-divine-beast" style="font-size:0.68rem; padding:2px 7px; font-weight:900; background:#b91c1c; color:#fef08a; cursor:pointer; white-space:nowrap;">
                🔥 召喚野生四聖獸
              </button>
              <span style="font-weight:900; font-size:0.78rem; color:var(--stone-cyan); font-family:monospace; white-space:nowrap;">🏺 靈葫: <b id="v14-gourd-counter" style="color:var(--cinnabar-red); font-size:0.86rem;">${v14.petGourds}</b></span>
              <button type="button" class="pixel-btn" id="btn-v14-refill-gourd-top" style="font-size:0.7rem; padding:2px 8px; font-weight:900; background:#f59e0b; color:#000; cursor:pointer; white-space:nowrap;">⚡+補充</button>
            </div>
          </div>
          <!-- 🧭 野生靈獸＆升級版太古四聖神獸抓捕提示橫幅 -->
          <div id="v22-capture-radar-strip" style="background:linear-gradient(90deg, #0f172a 0%, #1e1b4b 55%, #0f172a 100%); border:1.5px solid #38bdf8; color:#fef08a; padding:4px 8px; margin-bottom:5px; font-family:monospace; font-size:0.73rem; display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
            <span id="v22-radar-prompt-txt">🧭 抓寵雷達偵測中：戰場每隔數秒將降臨野生靈獸與【🌟升級版太古四聖獸】，靠近點擊或按 [F / 空白鍵] 即可投擲靈葫收服！</span>
            <button type="button" class="pixel-btn" id="btn-v22-radar-catch-now" style="background:#15803d; color:#ffffff; border:1px solid #86efac !important; font-size:0.68rem; padding:1px 8px; font-weight:900; cursor:pointer; white-space:nowrap;">🏺 立即收服最近神獸 (F)</button>
          </div>
          <div id="wuxia-pet-party-tray"></div>
          <div id="wuxia-held-items-bar" style="display:flex; gap:5px; flex-wrap:wrap; align-items:center; margin-top:4px; font-size:0.68rem; font-family:monospace;"></div>
        </div>

        </div><!-- 結束 #v26-collapsible-top-info -->

        <!-- 🎮 主要長方形遊戲畫面（進入遊戲後直接滿版長方形呈現，並自動適應手機/電腦與全螢幕解析度！） -->
        <div class="wuxia-canvas-wrap pixel-canvas-box v26-rectangular-game-stage" id="v13-canvas-box" style="position:relative; width:100%; background:#0d1317; border:2px solid #fbbf24; overflow:hidden; box-sizing:border-box;">
          <canvas id="v13-mowing-canvas" width="960" height="860" style="width:100%; height:100%; display:block; background:#0d1317;"></canvas>

          <!-- 受擊紅框血霧警示層 -->
          <div id="v21-damage-vignette" style="position:absolute; inset:0; pointer-events:none; z-index:12; box-shadow:inset 0 0 55px rgba(220, 38, 38, 0.88); opacity:0; transition:opacity 0.12s ease;"></div>

          <!-- 戰場頂部精簡懸浮 HUD（上方資訊預設隱藏，所有核心血量、波次、主選單、戰術面板切換與全螢幕直接整合於畫布頂部！） -->
          <div class="wuxia-mowing-hud" style="position:absolute; top:6px; left:6px; right:6px; display:flex; justify-content:space-between; align-items:center; gap:4px; flex-wrap:wrap; pointer-events:none; z-index:15; box-sizing:border-box;">
            <div style="display:flex; align-items:center; gap:4px; pointer-events:auto; flex-wrap:wrap;">
              <button type="button" class="pixel-btn" id="btn-v26-hud-home" style="background:rgba(15,23,42,0.92); color:#cbd5e1; border:1.5px solid #64748b !important; font-size:0.68rem; padding:2px 6px; font-weight:900; cursor:pointer;">🏠選單</button>
              <button type="button" class="pixel-btn" id="btn-v26-hud-setup" style="background:rgba(120,53,15,0.92); color:#fde047; border:1.5px solid #fbbf24 !important; font-size:0.68rem; padding:2px 6px; font-weight:900; cursor:pointer;">🛠️配置</button>
              <span class="wuxia-hud-pill pixel-pill" id="v13-hud-lv" style="white-space:nowrap; font-size:0.7rem; padding:2px 6px;">Lv.1 (0%)</span>
              <span class="wuxia-hud-pill pixel-pill" id="v13-hud-kills" style="white-space:nowrap; font-size:0.7rem; padding:2px 6px;">第1波|斬:0|寵:1/4</span>
              <span class="wuxia-hud-pill pixel-pill" id="v13-hud-loot" style="white-space:nowrap; font-size:0.7rem; padding:2px 6px; color:#86efac !important;">❤️160/160|🛡️25</span>
            </div>
            <div style="display:flex; align-items:center; gap:4px; pointer-events:auto;">
              <button type="button" class="pixel-btn" id="btn-v26-toggle-info-drawer" style="background:rgba(30,27,75,0.92); color:#fde047; border:1.5px solid #a855f7 !important; font-size:0.68rem; padding:2px 6px; font-weight:900; cursor:pointer; white-space:nowrap;">📋展開資訊</button>
              <button type="button" class="pixel-btn" id="btn-v19-canvas-fs" style="background:rgba(15,23,42,0.95); color:#38bdf8; border:1.5px solid #38bdf8 !important; font-size:0.68rem; padding:2px 7px; font-weight:900; cursor:pointer; white-space:nowrap;">⛶全螢幕</button>
            </div>
          </div>

          <!-- 👹 戰場頂部中央專屬 BOSS 巨型雙層血條 HUD -->
          <div id="v18-boss-hud-overlay" style="position:absolute; top:32px; left:6px; right:86px; background:rgba(24,8,8,0.94); border:2px solid #fbbf24; box-shadow:2px 2px 0 #000; padding:3px 7px; pointer-events:none; z-index:20; display:none; box-sizing:border-box;">
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; font-weight:900; color:#fef08a; font-family:monospace; gap:4px;">
              <span id="v18-boss-hud-name" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">👑 [鎮關大魔尊] 赤目血煞魔尊</span>
              <span id="v18-boss-hud-hp-text" style="white-space:nowrap; flex-shrink:0;">2100/2100</span>
            </div>
            <div style="height:4px; background:#0f172a; border:1px solid #000; margin-top:2px; overflow:hidden;">
              <div id="v18-boss-hud-shield-bar" style="height:100%; width:100%; background:linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%);"></div>
            </div>
            <div style="height:6px; background:#450a0a; border:1px solid #000; margin-top:2px; overflow:hidden;">
              <div id="v18-boss-hud-bar" style="height:100%; width:100%; background:linear-gradient(90deg, #dc2626 0%, #f97316 50%, #facc15 100%);"></div>
            </div>
          </div>

          <!-- ⚔️ 波次切換與首領登場橫幅宣告（自動換行防左右裁切） -->
          <div id="v18-wave-announce-banner" style="position:absolute; top:76px; left:8px; right:8px; background:linear-gradient(90deg, rgba(18,15,13,0.95) 0%, rgba(127,29,29,0.95) 50%, rgba(18,15,13,0.95) 100%); border:1.5px solid #fbbf24; padding:4px 8px; color:#fef08a; font-family:monospace; font-weight:900; font-size:0.72rem; line-height:1.25; text-align:center; white-space:normal; word-break:break-word; pointer-events:none; z-index:25; display:none; box-shadow:0 4px 12px rgba(0,0,0,0.65); box-sizing:border-box;">
            ⚔️ 第 1 波來襲：初入青玄 · 外門魔卒！
          </div>

          <!-- 🖥️ 全螢幕模式專用底部半透明懸浮快捷列 -->
          <div class="v20-fs-floating-bar" id="v20-fs-floating-bar">
            ${Object.values(WUXIA_WEAPONS_ARSENAL).map(w => `
              <button type="button" class="v20-fs-wep-pill ${w.id === curWep.id ? 'active' : ''}" data-fs-wep="${w.id}">${w.icon}${w.shortName}</button>
            `).join("")}
            <button type="button" class="v20-fs-wep-pill" id="btn-v20-fs-skill1" style="border-color:#2dd4bf; color:#5eead4;">[1]一技</button>
            <button type="button" class="v20-fs-wep-pill" id="btn-v20-fs-skill2" style="border-color:#38bdf8; color:#7dd3fc;">[2]二技</button>
            <button type="button" class="v20-fs-wep-pill" id="btn-v20-fs-skill3" style="border-color:#facc15; color:#fef08a;">[3]三技大招</button>
            <button type="button" class="v20-fs-wep-pill" id="btn-v20-fs-boss" style="background:#7f1d1d; color:#fef08a; border-color:#ef4444;">👹召喚BOSS</button>
            <button type="button" class="v20-fs-wep-pill" id="btn-v20-fs-exit" style="background:#0f172a; color:#f87171; border-color:#f87171;">❎退出全屏(Z)</button>
          </div>

          <!-- 局內三選一造化突破浮層 -->
          <div class="wuxia-perk-modal pixel-perk-overlay" id="v13-mow-perk-modal" style="position:absolute; inset:0; background:radial-gradient(circle at 50% 30%, rgba(28,24,20,0.96) 0%, rgba(12,10,8,0.98) 100%); z-index:60; display:none; flex-direction:column; justify-content:center; align-items:stretch; padding:12px 14px; overflow:hidden;">
            <div style="text-align:center; margin-bottom:8px;">
              <div style="color:#ffd27d; font-size:1.02rem; font-weight:900; font-family:monospace;">⚡〔武道境界突破 · 武器絕技 / 靈寵進化 / 護身神裝 / 通用無限神通〕</div>
              <div style="color:#d6cbb5; font-size:0.74rem; margin-top:2px; font-family:monospace;">已滿階(Lv.5)之武器技能自動隱藏；通用神通無等級上限(Lv.∞)，切換任何武器皆可共鳴施展：</div>
            </div>
            <div id="v13-mow-perk-buttons" style="display:flex; flex-direction:column; gap:7px; width:100%; max-width:560px; margin:0 auto;"></div>
          </div>

          <!-- 🏆 戰鬥勝利 / 💀 戰鬥失敗 專屬結算介面（Battle Result Overlay） -->
          <div id="v21-battle-end-modal" style="position:absolute; inset:0; background:rgba(8, 10, 15, 0.95); z-index:75; display:none; flex-direction:column; justify-content:center; align-items:center; padding:14px; font-family:monospace; color:#f8fafc;">
          </div>
        </div>

        <!-- 底部快捷操作按鈕（5鍵佈局） -->
        <div style="display:grid; grid-template-columns: 1.1fr 1.1fr 1.15fr 1.1fr 1.1fr; gap:5px; margin-top:5px;">
          <button type="button" class="btn-modern gold pixel-btn" id="btn-v14-catch-pet" style="font-size:0.76rem; padding:6px 2px; font-weight:900;">
            🏺 祭葫收妖 (<span id="btn-gourd-num">${v14.petGourds}</span>)
          </button>
          <button type="button" class="btn-modern pixel-btn" id="btn-v19-upgrade-all-skills" style="font-size:0.76rem; padding:6px 2px; font-weight:900; background:#fbbf24; color:#000; border-color:#000;">
            ⬆️ 武器技能強化
          </button>
          <button type="button" class="btn-modern pixel-btn" id="btn-v19-cast-ult-skill" style="font-size:0.76rem; padding:6px 2px; border-color:var(--cinnabar-red); color:var(--cinnabar-red); font-weight:900;">
            💥 施展武器三技能!
          </button>
          <button type="button" class="btn-modern pixel-btn" id="btn-v19-bot-fullscreen" style="font-size:0.76rem; padding:6px 2px; background:#0f172a; color:#38bdf8; font-weight:900;">
            🖥️ 畫面全螢幕
          </button>
          <button type="button" class="btn-modern secondary pixel-btn" id="btn-v21-surrender-settle" style="font-size:0.76rem; padding:6px 2px; font-weight:900; background:#450a0a; color:#fca5a5; border-color:#ef4444;">
            🏳️ 提前結算戰果
          </button>
        </div>
      </div>
    `;
    container.appendChild(wrap);

    const goHomeTitle = () => {
      this.stopV13MowingLoop();
      v21.screen = "title";
      this.renderView();
    };
    const goSetupScreen = () => {
      this.stopV13MowingLoop();
      v21.screen = "setup";
      this.renderView();
    };
    wrap.querySelector("#btn-v21-battle-to-title")?.addEventListener("click", goHomeTitle);
    wrap.querySelector("#btn-v26-hud-home")?.addEventListener("click", goHomeTitle);
    wrap.querySelector("#btn-v21-battle-to-setup")?.addEventListener("click", goSetupScreen);
    wrap.querySelector("#btn-v26-hud-setup")?.addEventListener("click", goSetupScreen);
    wrap.querySelector("#btn-v26-toggle-info-drawer")?.addEventListener("click", (e) => {
      const drawer = wrap.querySelector("#v26-collapsible-top-info");
      if (!drawer) return;
      const isHidden = drawer.style.display === "none";
      drawer.style.display = isHidden ? "block" : "none";
      e.currentTarget.innerText = isHidden ? "📋隱藏資訊" : "📋展開資訊";
      window.dispatchEvent(new Event("resize"));
    });

    this.startV14WuxiaMowing(wrap);
  };

  App.prototype.renderV14WuxiaWildernessView = function(container) {
    this.renderV21BattleScreen(container);
  };
  App.prototype.renderV12WildernessView = function(container) {
    this.renderV21BattleScreen(container);
  };

  // ==================== v20.0 PokéSurvivor 級別高清流光特效與原生高解析度全螢幕戰鬥引擎 ====================
  App.prototype.startV14WuxiaMowing = function(wrap) {
    const v13 = this.char.ensureV13AddictiveState();
    const v14 = this.char.ensureV14WuxiaState();
    const canvasBox = wrap.querySelector("#v13-canvas-box");
    const canvas = wrap.querySelector("#v13-mowing-canvas");
    if (!canvas || !canvasBox) return;
    const ctx = canvas.getContext("2d");

    const mode = v14.arenaMode || "hybrid";
    const WORLD_W = 1600;
    const WORLD_H = 1100;

    const getPlayerGearMultiplier = () => {
      let mult = 1.0;
      const realmBonus = (this.char.realmIndex || 0) * 0.12 + (this.char.realmLayer || 1) * 0.02;
      const mergeBonus = ((v13.highestMergeLv || 1) - 1) * 0.08;
      let equipCount = 0;
      if (this.char.equipSlots) {
        if (this.char.equipSlots.weapon) equipCount++;
        if (this.char.equipSlots.armor) equipCount++;
        if (this.char.equipSlots.accessory) equipCount++;
      }
      const forgeBonus = (v13.cauldronLevel || 1) * 0.05 + equipCount * 0.12;
      mult += Math.min(2.2, realmBonus + mergeBonus + forgeBonus);
      return Number(mult.toFixed(2));
    };

    const v21 = this.char.ensureV21StandaloneState();
    const curSkin = V21_HERO_SKINS[v21.heroSkin] || V21_HERO_SKINS.cyan;
    const curDiff = V21_DIFFICULTY_TIERS[v21.difficulty] || V21_DIFFICULTY_TIERS.normal;
    const shrine = v21.talents || { atkLv: 1, hpLv: 1, shieldLv: 1, speedLv: 1, petLv: 1 };
    const hasRelic = (rid) => Array.isArray(v21.selectedRelics) && v21.selectedRelics.includes(rid);

    const initMaxHp = Math.max(80, 130 + (shrine.hpLv - 1) * 25 + (curSkin.hpBonus || 0) + (hasRelic("spirit_nectar") ? 35 : 0));
    const initShield = Math.max(0, 18 + (shrine.shieldLv - 1) * 18 + (curSkin.startShield || 0));

    const state = {
      paused: false,
      battleEnded: false,
      endlessContinued: false,
      isFullscreen: false,
      viewW: 480,
      viewH: 430,
      renderScale: 2.0,
      frame: 0,
      waveIndex: 0,
      waveFrame: 0,
      waveBossSpawned: false,
      bannerTimer: 0,
      runLv: 1,
      runExp: 0,
      runReqExp: 8,
      kills: 0,
      combo: 0,
      maxCombo: 0,
      gainedExp: 0,
      gainedHammers: 0,
      gainedSoulGems: 0,
      weaponId: v14.selectedWeaponId || v21.weaponId || "sword",
      baseAtkTimer: 0,
      skillTimers: [35, 70, 105],
      uniSkillTimers: [20, 45, 70, 95, 120, 140],
      camera: { x: 600 - 240, y: 450 - 215 },
      player: {
        x: 600, y: 450,
        targetX: 600, targetY: 450,
        facingAngle: 0,
        hp: initMaxHp, maxHp: initMaxHp,
        frostShield: initShield, maxShield: Math.max(60, initShield + 40),
        speedBoostTimer: 0,
        invulnerableTimer: 45,
        hasFocusSash: hasRelic("focus_sash"),
        sashTriggered: false
      },
      springCore: {
        x: 600, y: 450,
        hp: 100, maxHp: 100,
        r: 34,
        pulseTimer: 0
      },
      heldItems: v14.heldItems || [],
      gourdThrows: [],
      companionPets: (v14.companionPets || []).slice(0, 4).map((p, idx) => ({
        ...p,
        lv: p.lv || 1,
        tier: p.tier || 1,
        exp: p.exp || 0,
        maxExp: p.maxExp || 20,
        x: 600 + Math.cos(idx * 1.57) * 38,
        y: 450 + Math.sin(idx * 1.57) * 38,
        cdTimer: idx * 8,
        skillTimer: idx * 45
      })),
      wildBeasts: [],
      enemies: [],
      projectiles: [],
      petProjectiles: [],
      enemyProjectiles: [],
      skillEffects: [],
      vfxParticles: [], // v20.0 高清發光粒子池
      gems: [],
      hitSparks: [],
      floatTexts: [],
      lightningBolts: [],
      hazardCircles: [],
      keysDown: {}
    };

    // ==================== 🖥️ v26.0 設備與全螢幕解析度自適應引擎 (Dynamic Device & Fullscreen Resolution Scaling) ====================
    // 1. 非全螢幕時呈現長方形大畫面，放到手機上玩時自動根據手機螢幕解析度 (rect.width × rect.height 與 devicePixelRatio) 動態調整整個 Canvas 大小與視野。
    // 2. 全螢幕後不再將原本的小畫面直接粗暴放大，而是依據放大後的實際螢幕解析度 (cssW × cssH) 動態擴展邏輯視野 (state.viewW × state.viewH)，讓全螢幕展現更寬廣的戰場視野！
    const syncHighDPICanvasResolution = () => {
      const dpr = Math.min(2.5, Math.max(1.25, window.devicePixelRatio || 1.5));
      const rect = canvasBox.getBoundingClientRect();
      const cssW = Math.max(300, rect.width || window.innerWidth || 800);
      const cssH = Math.max(240, rect.height || Math.round(window.innerHeight * 0.78) || 500);

      const isFs = Boolean(state.isFullscreen || document.fullscreenElement === canvasBox);
      // 依據設備寬度與全螢幕狀態決定每單位遊戲座標對應的 CSS 像素密度（避免全螢幕直接把原圖放大）
      let unitZoom = 1.15;
      if (isFs) {
        // 全螢幕時隨螢幕解析度擴展視野，維持精緻適中的角色比例（絕不過度放大）
        unitZoom = cssW >= 1600 ? 1.25 : (cssW >= 1024 ? 1.15 : 1.0);
      } else if (cssW < 600) {
        // 手機螢幕自動適配解析度，給予舒適清晰的視野
        unitZoom = 0.92;
      } else {
        // 電腦/平板長方形視窗模式
        unitZoom = 1.12;
      }

      state.viewW = Math.max(320, Math.min(WORLD_W, Math.round(cssW / unitZoom)));
      state.viewH = Math.max(240, Math.min(WORLD_H, Math.round(cssH / unitZoom)));

      const targetPixelW = Math.round(cssW * dpr);
      const targetPixelH = Math.round(cssH * dpr);
      if (canvas.width !== targetPixelW || canvas.height !== targetPixelH) {
        canvas.width = targetPixelW;
        canvas.height = targetPixelH;
      }
      state.renderScale = canvas.width / state.viewW;
    };

    // 粒子發射器輔助函式
    const spawnVFXParticles = (x, y, count, opts = {}) => {
      for (let i = 0; i < count; i++) {
        if (state.vfxParticles.length > 260) state.vfxParticles.shift();
        const ang = (opts.angle !== undefined)
          ? (opts.angle + (Math.random() - 0.5) * (opts.spread || Math.PI))
          : (Math.random() * Math.PI * 2);
        const spd = (opts.minSpeed || 0.8) + Math.random() * ((opts.maxSpeed || 3.8) - (opts.minSpeed || 0.8));
        const life = (opts.minLife || 14) + Math.floor(Math.random() * ((opts.maxLife || 28) - (opts.minLife || 14)));
        state.vfxParticles.push({
          x: x + (Math.random() - 0.5) * (opts.jitter || 8),
          y: y + (Math.random() - 0.5) * (opts.jitter || 8),
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd + (opts.gravity || 0),
          size: (opts.size || 6) * (0.75 + Math.random() * 0.5),
          color: Array.isArray(opts.colors) ? opts.colors[i % opts.colors.length] : (opts.color || "#fde047"),
          type: opts.type || "ember",
          rot: ang,
          life,
          maxLife: life,
          blend: opts.blend || "lighter"
        });
      }
    };

    const spawnShockwaveRing = (x, y, r, maxR, color, life = 20, lineWidth = 4) => {
      state.vfxParticles.push({
        x, y, vx: 0, vy: 0,
        r, maxR, color, lineWidth,
        type: "ring", life, maxLife: life, blend: "lighter"
      });
    };

    const getActiveWeapon = () => WUXIA_WEAPONS_ARSENAL[state.weaponId] || WUXIA_WEAPONS_ARSENAL.sword;
    const getSkillLevels = () => {
      if (!v14.weaponSkillLevels[state.weaponId]) {
        v14.weaponSkillLevels[state.weaponId] = [1, 1, 1];
      }
      return v14.weaponSkillLevels[state.weaponId];
    };

    const getBaseDamage = () => {
      const shrineAtkMult = 1 + ((shrine.atkLv || 1) - 1) * 0.12;
      const skinDmgMult = curSkin.dmgMult || 1.0;
      const lvMult = 1 + (state.runLv - 1) * 0.18;
      const wep = getActiveWeapon();
      return Math.round(12 * shrineAtkMult * skinDmgMult * lvMult * (wep.baseDmgMult || 1.0));
    };

    // ==================== ❤️ 更新角色生命與護體玄罡 HUD 狀態列 ====================
    const updatePlayerVitalHUD = () => {
      const hpTxt = wrap.querySelector("#v21-player-hp-text");
      const shTxt = wrap.querySelector("#v21-player-shield-text");
      const hpBar = wrap.querySelector("#v21-player-hp-bar-fill");
      const shBar = wrap.querySelector("#v21-player-shield-bar-fill");
      const sashEl = wrap.querySelector("#v21-sash-badge");
      const hintEl = wrap.querySelector("#v21-danger-status-hint");
      const lootPill = wrap.querySelector("#v13-hud-loot");
      const clockEl = wrap.querySelector("#v21-survival-clock");

      const curHp = Math.max(0, Math.ceil(state.player.hp));
      const maxHp = state.player.maxHp;
      const curSh = Math.max(0, Math.ceil(state.player.frostShield || 0));
      const hpPct = Math.max(0, Math.min(100, (curHp / Math.max(1, maxHp)) * 100));
      const shPct = Math.max(0, Math.min(100, (curSh / Math.max(1, state.player.maxShield || 60)) * 100));

      if (hpTxt) hpTxt.innerText = `${curHp} / ${maxHp}`;
      if (shTxt) shTxt.innerText = `${curSh}`;
      if (hpBar) {
        hpBar.style.width = `${hpPct}%`;
        hpBar.style.background = hpPct <= 30
          ? "linear-gradient(90deg, #991b1b 0%, #ef4444 100%)"
          : "linear-gradient(90deg, #dc2626 0%, #ef4444 45%, #22c55e 100%)";
      }
      if (shBar) shBar.style.width = `${shPct}%`;
      if (sashEl) {
        sashEl.style.display = (state.player.hasFocusSash && !state.player.sashTriggered) ? "inline-block" : "none";
      }
      if (hintEl) {
        if (hpPct <= 30) {
          hintEl.innerHTML = `<span style="color:#ef4444; font-weight:900;">🚨 瀕死警告：氣血低於 30%！請立即走位躲避或召喚青靈仙鹿／玄冥靈龜護體！</span>`;
        } else if (mode === "defense") {
          hintEl.innerText = `🛡️ 靈泉耐久：${Math.max(0, Math.ceil(state.springCore.hp))}/${state.springCore.maxHp} ｜ 保護靈泉與自身不滅！`;
        } else {
          hintEl.innerText = `⚠️ 魔物碰撞、毒箭與魔隕皆會扣血，氣血歸零即觸發戰鬥失敗！`;
        }
      }
      if (lootPill) {
        lootPill.innerText = `❤️ ${curHp}/${maxHp} ｜ 🛡️${curSh}`;
      }
      if (clockEl) {
        const totalSec = Math.floor(state.frame / 60);
        const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
        const ss = String(totalSec % 60).padStart(2, "0");
        clockEl.innerText = `⏱️ 存活: ${mm}:${ss} ｜ 💎 本局道魂晶: +${state.gainedSoulGems}`;
      }
    };

    // ==================== 🏆 戰鬥勝利 / 💀 戰鬥失敗 專屬結算系統 ====================
    const triggerBattleEnd = (isVictory, reasonText) => {
      if (state.battleEnded) return;
      state.battleEnded = true;
      state.paused = true;

      if (isVictory) {
        audio.playLevelUp();
        v21.totalVictories = (v21.totalVictories || 0) + 1;
      } else {
        audio.playThunder();
      }

      const reachedWave = state.waveIndex + 1;
      if (reachedWave > (v21.bestWave || 1)) {
        v21.bestWave = reachedWave;
      }
      v21.totalKills = (v21.totalKills || 0) + state.kills;

      const baseSoulReward = Math.max(8, Math.floor(state.kills * 0.35) + reachedWave * 6 + (isVictory ? 65 : 0));
      const finalSoulGems = Math.round(baseSoulReward * (curDiff.soulGemMult || 1.0));
      state.gainedSoulGems += finalSoulGems;
      v21.soulGems = (v21.soulGems || 0) + finalSoulGems;
      this.saveGame();

      const totalSec = Math.floor(state.frame / 60);
      const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
      const ss = String(totalSec % 60).padStart(2, "0");
      const wep = getActiveWeapon();
      const sLvs = getSkillLevels();
      const hpRatio = state.player.hp / Math.max(1, state.player.maxHp);
      const rankGrade = isVictory
        ? (hpRatio >= 0.7 ? "SSS · 無上萬劍道尊" : (hpRatio >= 0.4 ? "SS · 斬魔真仙" : "S · 破劫劍俠"))
        : (reachedWave >= 8 ? "A · 喋血孤雄" : (reachedWave >= 5 ? "B · 歷戰劍客" : "C · 初入魔劫"));

      const endModal = wrap.querySelector("#v21-battle-end-modal");
      if (!endModal) return;

      const borderCol = isVictory ? "#fbbf24" : "#ef4444";
      const headerBg = isVictory
        ? "linear-gradient(90deg, rgba(20,83,45,0.9) 0%, rgba(180,83,9,0.95) 50%, rgba(20,83,45,0.9) 100%)"
        : "linear-gradient(90deg, rgba(69,10,10,0.95) 0%, rgba(153,27,27,0.95) 50%, rgba(69,10,10,0.95) 100%)";

      endModal.style.display = "flex";
      endModal.innerHTML = `
        <div style="background:#0f172a; border:3px solid ${borderCol}; box-shadow:0 0 35px ${isVictory ? 'rgba(251,191,36,0.5)' : 'rgba(239,68,68,0.6)'}; max-width:560px; width:100%; padding:14px 16px; display:flex; flex-direction:column; gap:10px;">
          <div style="background:${headerBg}; border:1.5px solid ${borderCol}; padding:10px 12px; text-align:center;">
            <div style="font-size:0.78rem; color:#fef08a; font-weight:900; letter-spacing:1px;">
              ${isVictory ? '🌟 萬 劍 歸 宗 · 魔 劫 蕩 平 🌟' : '💀 道 軀 隕 落 · 血 染 青 玄 💀'}
            </div>
            <div style="font-size:1.55rem; font-weight:900; color:#ffffff; margin-top:3px; text-shadow:0 2px 6px #000;">
              ${isVictory ? '🏆 戰鬥勝利（VICTORY）' : '💔 戰鬥失敗（DEFEAT）'}
            </div>
            <div style="font-size:0.82rem; color:${isVictory ? '#fde047' : '#fca5a5'}; margin-top:4px; font-weight:800;">
              ${reasonText}
            </div>
          </div>

          <!-- 戰績評級與核心數據統計 -->
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; text-align:center;">
            <div style="background:#18181b; border:1px solid #334155; padding:6px;">
              <div style="font-size:0.68rem; color:#94a3b8;">戰績評定</div>
              <div style="font-size:0.88rem; font-weight:900; color:#fde047; margin-top:2px;">${rankGrade}</div>
            </div>
            <div style="background:#18181b; border:1px solid #334155; padding:6px;">
              <div style="font-size:0.68rem; color:#94a3b8;">推進波次 / 存活時間</div>
              <div style="font-size:0.88rem; font-weight:900; color:#38bdf8; margin-top:2px;">第 ${reachedWave} 波 (${mm}:${ss})</div>
            </div>
            <div style="background:#18181b; border:1px solid #334155; padding:6px;">
              <div style="font-size:0.68rem; color:#94a3b8;">本局斬魔 / 最高連斬</div>
              <div style="font-size:0.88rem; font-weight:900; color:#f87171; margin-top:2px;">${state.kills} 斬 / ${Math.max(state.combo, state.maxCombo)} 連</div>
            </div>
          </div>

          <!-- 出戰神兵、技能等級與收服神獸總結 -->
          <div style="background:#18181b; border:1px solid #3f3f46; padding:8px 10px; font-size:0.76rem; line-height:1.5; color:#e2e8f0;">
            <div>⚔️ <b>出戰角色與本命神兵：</b>${curSkin.icon}${v21.heroName} ｜ ${wep.icon}${wep.name}（武道 Lv.${state.runLv}）</div>
            <div>🔥 <b>武器三絕技修為：</b>${wep.skills.map((s, i) => `${s.icon}${s.name} Lv.${sLvs[i] || 1}`).join(" ｜ ")}</div>
            <div>🐾 <b>隨行山海神獸陣容：</b>${state.companionPets.map(p => `${p.icon}${p.name}[T${p.tier}]`).join("、")}</div>
            <div style="color:#fde047; font-weight:900; margin-top:3px;">💎 本局結算獎勵：獲得 +${finalSoulGems} 顆【太初道魂晶】（當前累計持有：${v21.soulGems} 💎，可於主畫面聖殿永久強化屬性！）</div>
          </div>

          <!-- 結算操作按鈕 -->
          <div style="display:grid; grid-template-columns: ${isVictory ? '1.3fr 1fr 1fr' : '1.2fr 1.1fr 0.9fr'}; gap:8px; margin-top:2px;">
            ${isVictory ? `
              <button type="button" id="btn-v21-end-continue-endless" style="background:linear-gradient(90deg, #0284c7, #2563eb); border:2px solid #fde047; color:#fff; padding:9px 8px; font-weight:900; font-size:0.82rem; cursor:pointer;">
                🌌 繼續挑戰無盡超越模式 (第11波+)
              </button>
            ` : `
              <button type="button" id="btn-v21-end-retry-now" style="background:linear-gradient(90deg, #dc2626, #ea580c); border:2px solid #fde047; color:#fff; padding:9px 8px; font-weight:900; font-size:0.84rem; cursor:pointer;">
                🔄 原配置立即重戰！
              </button>
            `}
            <button type="button" id="btn-v21-end-goto-setup" style="background:#78350f; border:1.5px solid #fbbf24; color:#fef08a; padding:9px 8px; font-weight:900; font-size:0.8rem; cursor:pointer;">
              🛠️ 更換武器與自訂配置
            </button>
            <button type="button" id="btn-v21-end-goto-title" style="background:#1e293b; border:1.5px solid #94a3b8; color:#e2e8f0; padding:9px 8px; font-weight:900; font-size:0.8rem; cursor:pointer;">
              🏠 返回主標題
            </button>
          </div>
        </div>
      `;

      endModal.querySelector("#btn-v21-end-continue-endless")?.addEventListener("click", () => {
        endModal.style.display = "none";
        state.battleEnded = false;
        state.endlessContinued = true;
        state.paused = false;
        state.player.hp = state.player.maxHp;
        state.player.frostShield = 40;
        advanceToNextWave();
        updatePlayerVitalHUD();
      });

      endModal.querySelector("#btn-v21-end-retry-now")?.addEventListener("click", () => {
        audio.playSwordClash();
        this.stopV13MowingLoop();
        v21.screen = "battle";
        this.renderView();
      });

      endModal.querySelector("#btn-v21-end-goto-setup")?.addEventListener("click", () => {
        audio.playQiCharge();
        this.stopV13MowingLoop();
        v21.screen = "setup";
        this.renderView();
      });

      endModal.querySelector("#btn-v21-end-goto-title")?.addEventListener("click", () => {
        audio.playQiCharge();
        this.stopV13MowingLoop();
        v21.screen = "title";
        this.renderView();
      });
    };

    // ==================== 💥 玩家真實受擊扣血與死亡判定函式（徹底修復角色不會死亡的問題！） ====================
    const damagePlayer = (rawDmg, attackerName = "妖魔") => {
      if (state.battleEnded || state.paused) return;
      if (state.player.invulnerableTimer > 0) return;

      const diffMult = curDiff.enemyDmgMult || 1.0;
      const dmg = Math.max(1, Math.round(rawDmg * diffMult));

      // 若穿戴【🪖玄武荊棘甲】，受擊時向四周爆發反傷雷火尖刺震波！
      if (state.heldItems && state.heldItems.includes("🪖玄武荊棘甲")) {
        const thornDmg = Math.max(18, Math.round(getBaseDamage() * 1.6));
        spawnShockwaveRing(state.player.x, state.player.y, 10, 95, "#f59e0b", 16, 4);
        state.enemies.forEach(en => {
          if (Math.hypot(en.x - state.player.x, en.y - state.player.y) < 95 + en.r) {
            applyDamageToEnemy(en, thornDmg, "#f59e0b", true);
          }
        });
      }

      // 若有玄武寒晶護盾 / 護體玄罡，優先抵扣護盾
      if (state.player.frostShield > 0) {
        if (state.player.frostShield >= dmg) {
          state.player.frostShield -= dmg;
          state.player.invulnerableTimer = 18;
          spawnShockwaveRing(state.player.x, state.player.y, 8, 34, "#38bdf8", 12, 3);
          state.floatTexts.push({ x: state.player.x, y: state.player.y - 18, text: `🛡️護罡抵禦 -${dmg}`, color: "#38bdf8", life: 18 });
          updatePlayerVitalHUD();
          return;
        } else {
          const rem = dmg - state.player.frostShield;
          state.player.frostShield = 0;
          state.player.hp = Math.max(0, state.player.hp - rem);
        }
      } else {
        state.player.hp = Math.max(0, state.player.hp - dmg);
      }

      // 賦予短暫受擊無敵幀（疾風破虛靴延長 50%）
      state.player.invulnerableTimer = hasRelic("wind_boots") ? 40 : 26;

      // 觸發受擊紅屏血霧閃爍與受擊飄字
      const vig = wrap.querySelector("#v21-damage-vignette");
      if (vig) {
        vig.style.opacity = "1";
        setTimeout(() => { if (vig) vig.style.opacity = "0"; }, 180);
      }
      spawnVFXParticles(state.player.x, state.player.y, 8, { type: "ember", colors: ["#ef4444", "#fca5a5"], size: 7 });
      state.floatTexts.push({
        x: state.player.x, y: state.player.y - 20,
        text: `💔 -${dmg} HP (${attackerName})`,
        color: "#ff4444", life: 24
      });

      updatePlayerVitalHUD();

      // 檢定是否氣血歸零
      if (state.player.hp <= 0) {
        if (state.player.hasFocusSash && !state.player.sashTriggered) {
          state.player.sashTriggered = true;
          state.player.hp = Math.round(state.player.maxHp * 0.6);
          state.player.frostShield = 30;
          state.player.invulnerableTimer = 150;
          audio.playLevelUp();
          spawnShockwaveRing(state.player.x, state.player.y, 12, 160, "#fde047", 30, 6);
          spawnVFXParticles(state.player.x, state.player.y, 28, { type: "spark", colors: ["#fde047", "#ffffff", "#38bdf8"], size: 10 });
          showWaveBanner("🎗️【九轉不滅金身帶】觸發！逆天鎖血回復 60% 氣血並震退群魔！", false);
          updatePlayerVitalHUD();
          return;
        }
        state.player.hp = 0;
        updatePlayerVitalHUD();
        triggerBattleEnd(false, `於第 ${state.waveIndex + 1} 波遭【${attackerName}】重創，氣血歸零隕落！`);
      }
    };

    // 統一傷害結算（含華麗受擊粒子、護體魔罡破盾特效、Boss防秒殺護甲鎖與二階段狂暴）
    const applyDamageToEnemy = (en, rawDmg, vfxColor = "#fde047", isShieldBreaker = false) => {
      if (!en || en.hp <= 0) return;
      let dmg = Math.max(1, Math.round(rawDmg));

      if (state.heldItems.includes("🔍焦點鏡") && Math.random() < 0.25) {
        dmg = Math.round(dmg * 1.85);
        spawnVFXParticles(en.x, en.y, 5, { type: "spark", color: "#f472b6", size: 8 });
        state.floatTexts.push({ x: en.x, y: en.y - 16, text: `💥暴擊 ${dmg}`, color: "#f472b6", life: 16 });
      }
      if (en.foxCharmedTimer && en.foxCharmedTimer > 0) {
        dmg = Math.round(dmg * 1.3);
      }

      // 受擊刀痕與星火粒子
      spawnVFXParticles(en.x, en.y, 3, {
        type: Math.random() < 0.5 ? "spark" : "slash_line",
        color: vfxColor,
        size: en.type === "boss" ? 12 : 7,
        minSpeed: 1.0, maxSpeed: 3.2, minLife: 8, maxLife: 15
      });

      if (en.shield && en.shield > 0) {
        const shieldDmg = isShieldBreaker ? Math.round(dmg * 2.4) : dmg;
        if (en.shield >= shieldDmg) {
          en.shield -= shieldDmg;
          en.hitFlash = 4;
          spawnShockwaveRing(en.x, en.y, 6, en.r + 10, "#38bdf8", 10, 2.5);
          state.floatTexts.push({ x: en.x, y: en.y - 12, text: `🛡️破罡 -${shieldDmg}`, color: "#38bdf8", life: 14 });
          return;
        } else {
          const leftover = shieldDmg - en.shield;
          en.shield = 0;
          dmg = leftover;
          spawnShockwaveRing(en.x, en.y, 10, en.r + 28, "#67e8f9", 18, 4);
          spawnVFXParticles(en.x, en.y, 10, { type: "shard", color: "#67e8f9", size: 7 });
          state.floatTexts.push({ x: en.x, y: en.y - 22, text: `💥護體魔罡擊碎！`, color: "#67e8f9", life: 26 });
        }
      }

      if (en.type === "boss") {
        if (en.phaseShieldTimer && en.phaseShieldTimer > 0) {
          state.floatTexts.push({ x: en.x, y: en.y - 18, text: "🛡️魔尊狂暴無敵!", color: "#facc15", life: 12 });
          return;
        }
        const maxSingleHit = Math.max(18, Math.ceil(en.maxHp * (en.isMiniBoss ? 0.075 : 0.045)));
        if (dmg > maxSingleHit) dmg = maxSingleHit;
        en.hp -= dmg;
        en.hitFlash = 5;

        if (!en.enraged && en.hp > 0 && en.hp <= en.maxHp * 0.5) {
          en.enraged = true;
          en.phaseShieldTimer = 45;
          en.shield = Math.ceil((en.maxShield || 300) * 0.45);
          en.speed *= 1.22;
          audio.playThunder();
          spawnShockwaveRing(en.x, en.y, 15, 130, "#facc15", 26, 6);
          spawnVFXParticles(en.x, en.y, 24, { type: "spark", colors: ["#facc15", "#ef4444", "#ffffff"], size: 11, maxSpeed: 6 });
          showWaveBanner(`🔥 警告：【${en.name}】進入二階段狂暴覺醒！重凝魔罡護盾！`, true);
          for (let d = 0; d < 10; d++) {
            const bAng = (d * Math.PI * 2) / 10;
            state.enemyProjectiles.push({
              x: en.x, y: en.y,
              vx: Math.cos(bAng) * 3.5, vy: Math.sin(bAng) * 3.5,
              angle: bAng, life: 85, color: "#facc15", projType: "boss_demon_blade"
            });
          }
        }
      } else {
        en.hp -= dmg;
        en.hitFlash = 4;
      }

      if (Math.random() < 0.35 || en.type === "boss") {
        state.floatTexts.push({ x: en.x + (Math.random() - 0.5) * 10, y: en.y - 10, text: `-${dmg}`, color: vfxColor, life: 14 });
      }
    };

    // ==================== 🖥️ 純遊戲畫面（#v13-canvas-box）全螢幕切換 ====================
    const toggleFullscreenMode = () => {
      const btnTop = wrap.querySelector("#btn-v19-toggle-fullscreen");
      const btnCanvas = wrap.querySelector("#btn-v19-canvas-fs");
      const btnBot = wrap.querySelector("#btn-v19-bot-fullscreen");

      state.isFullscreen = !state.isFullscreen;
      if (state.isFullscreen) {
        // 只讓 #v13-canvas-box（主要中間的遊戲畫面）進入全螢幕！
        canvasBox.classList.add("v20-canvas-only-fullscreen");
        if (canvasBox.requestFullscreen) {
          canvasBox.requestFullscreen().catch(() => {});
        }
        if (btnTop) btnTop.innerText = "❎ 退出全螢幕 (Z)";
        if (btnCanvas) btnCanvas.innerText = "❎ 退出全屏 (Z)";
        if (btnBot) btnBot.innerText = "❎ 退出全螢幕";
      } else {
        canvasBox.classList.remove("v20-canvas-only-fullscreen");
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
        canvasBox.style.height = "";
        if (btnTop) btnTop.innerText = "🖥️ 遊戲畫面全螢幕 (Z)";
        if (btnCanvas) btnCanvas.innerText = "⛶ 遊戲全螢幕";
        if (btnBot) btnBot.innerText = "🖥️ 畫面全螢幕";
      }

      setTimeout(() => {
        syncHighDPICanvasResolution();
        state.camera.x = Math.max(0, Math.min(WORLD_W - state.viewW, state.player.x - state.viewW / 2));
        state.camera.y = Math.max(0, Math.min(WORLD_H - state.viewH, state.player.y - state.viewH / 2));
      }, 40);
    };

    wrap.querySelector("#btn-v19-toggle-fullscreen")?.addEventListener("click", toggleFullscreenMode);
    wrap.querySelector("#btn-v19-canvas-fs")?.addEventListener("click", toggleFullscreenMode);
    wrap.querySelector("#btn-v19-bot-fullscreen")?.addEventListener("click", toggleFullscreenMode);
    wrap.querySelector("#btn-v20-fs-exit")?.addEventListener("click", toggleFullscreenMode);
    wrap.querySelector("#btn-v20-fs-boss")?.addEventListener("click", () => spawnWaveBoss());
    wrap.querySelector("#btn-v20-fs-skill1")?.addEventListener("click", () => triggerWeaponSkill(0));
    wrap.querySelector("#btn-v20-fs-skill2")?.addEventListener("click", () => triggerWeaponSkill(1));
    wrap.querySelector("#btn-v20-fs-skill3")?.addEventListener("click", () => triggerWeaponSkill(2));

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && state.isFullscreen) {
        state.isFullscreen = false;
        canvasBox.classList.remove("v20-canvas-only-fullscreen");
        canvasBox.style.height = "";
        const btnCanvas = wrap.querySelector("#btn-v19-canvas-fs");
        if (btnCanvas) btnCanvas.innerText = "⛶ 遊戲全螢幕";
      }
      syncHighDPICanvasResolution();
    });
    window.addEventListener("resize", syncHighDPICanvasResolution);
    window.addEventListener("orientationchange", () => setTimeout(syncHighDPICanvasResolution, 80));
    syncHighDPICanvasResolution();

    const renderWeaponArsenalHUD = () => {
      const wep = getActiveWeapon();
      const sLvs = getSkillLevels();
      const gearMult = getPlayerGearMultiplier();
      const baseDmg = getBaseDamage();

      const powerEl = wrap.querySelector("#v19-power-Readout");
      if (powerEl) {
        powerEl.innerText = `⚔️ 普攻:${baseDmg} ｜ 裝備道基加成:×${gearMult}`;
      }

      wrap.querySelectorAll(".v19-weapon-tab").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-weapon-id") === wep.id);
      });
      wrap.querySelectorAll("[data-fs-wep]").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-fs-wep") === wep.id);
      });

      const prosConsEl = wrap.querySelector("#v19-weapon-pros-cons");
      if (prosConsEl) {
        prosConsEl.innerHTML = `
          <div><b style="color:${wep.color};">${wep.icon}【${wep.name}】(${wep.roleTag})</b></div>
          <div><span style="color:#4ade80; font-weight:900;">▲優勢：</span>${wep.pros}</div>
          <div><span style="color:#f87171; font-weight:900;">▼短處：</span>${wep.cons}</div>
        `;
      }

      const skillsRow = wrap.querySelector("#v19-weapon-skills-row");
      if (skillsRow) {
        skillsRow.innerHTML = wep.skills.map((sk, idx) => {
          const lv = sLvs[idx] || 1;
          const isMax = lv >= 5;
          return `
            <div class="v19-skill-slot-card" data-upgrade-skill-idx="${idx}" title="${sk.desc}">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.75rem; font-weight:900; color:${sk.color};">${sk.icon} ${sk.name}</span>
                <span style="background:${isMax ? '#d97706' : '#334155'}; color:#fff; font-size:0.65rem; font-weight:900; padding:0 4px;">Lv.${lv}${isMax ? '滿' : ''}</span>
              </div>
              <div style="font-size:0.64rem; color:#cbd5e1; margin-top:2px; line-height:1.25; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${sk.desc}</div>
              <div style="font-size:0.63rem; color:#fde047; margin-top:2px; font-weight:800;">
                ${isMax ? '🌟 點擊立即展示滿階特效' : '⬆️ 點擊升階並施展特效'}
              </div>
            </div>
          `;
        }).join("");

        skillsRow.querySelectorAll("[data-upgrade-skill-idx]").forEach(card => {
          card.addEventListener("click", () => {
            const sIdx = parseInt(card.getAttribute("data-upgrade-skill-idx"), 10);
            upgradeWeaponSkill(sIdx);
          });
        });
      }

      // 渲染 v23.0 太初通用無限升級神通欄 (#v23-universal-skills-bar)
      const uniBar = wrap.querySelector("#v23-universal-skills-bar");
      if (uniBar) {
        if (!v14.universalSkillLevels) v14.universalSkillLevels = { uni_golden_dragon: 1 };
        uniBar.innerHTML = WUXIA_UNIVERSAL_INFINITE_SKILLS.map((usk) => {
          const ulv = v14.universalSkillLevels[usk.id] || 0;
          const unlocked = ulv > 0;
          return `
            <div data-uni-skill-id="${usk.id}" title="${usk.desc}" style="background:${unlocked ? '#1e1b4b' : '#18181b'}; border:1.5px solid ${unlocked ? usk.color : '#3f3f46'}; padding:3px 5px; cursor:pointer; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:2px;">
                <span style="font-size:0.7rem; font-weight:900; color:${unlocked ? usk.color : '#94a3b8'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${usk.icon}${usk.shortName}</span>
                <span style="background:${unlocked ? '#7e22ce' : '#27272a'}; color:#fef08a; font-size:0.62rem; font-weight:900; padding:0 3px; flex-shrink:0;">${unlocked ? `Lv.${ulv}∞` : '未領悟'}</span>
              </div>
              <div style="font-size:0.58rem; color:${unlocked ? '#e2e8f0' : '#71717a'}; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${unlocked ? `威力+${ulv * 38}%·點擊升階` : '點擊領悟Lv.1'}
              </div>
            </div>
          `;
        }).join("");

        uniBar.querySelectorAll("[data-uni-skill-id]").forEach(card => {
          card.addEventListener("click", () => {
            const uid = card.getAttribute("data-uni-skill-id");
            upgradeUniversalSkill(uid);
          });
        });
      }
    };

    const switchActiveWeapon = (newWid) => {
      if (WUXIA_WEAPONS_ARSENAL[newWid]) {
        state.weaponId = newWid;
        v14.selectedWeaponId = newWid;
        state.skillTimers = [25, 50, 75];
        audio.playSwordClash();
        const wep = getActiveWeapon();
        spawnShockwaveRing(state.player.x, state.player.y, 10, 85, wep.color, 18, 4);
        spawnVFXParticles(state.player.x, state.player.y, 14, { type: "spark", color: wep.color, size: 8 });
        state.floatTexts.push({
          x: state.player.x, y: state.player.y - 28,
          text: `${wep.icon} 切換神兵：【${wep.name}】！`,
          color: wep.color, life: 36
        });
        renderWeaponArsenalHUD();
      }
    };

    wrap.querySelectorAll(".v19-weapon-tab").forEach(btn => {
      btn.addEventListener("click", () => switchActiveWeapon(btn.getAttribute("data-weapon-id")));
    });
    wrap.querySelectorAll("[data-fs-wep]").forEach(btn => {
      btn.addEventListener("click", () => switchActiveWeapon(btn.getAttribute("data-fs-wep")));
    });

    const upgradeWeaponSkill = (skillIdx) => {
      const wep = getActiveWeapon();
      const sLvs = getSkillLevels();
      if (sLvs[skillIdx] >= 5) {
        triggerWeaponSkill(skillIdx);
        return;
      }
      if (this.char.exp >= 120) this.char.exp -= 120;
      else if (v13.hammers >= 1) v13.hammers -= 1;
      sLvs[skillIdx]++;
      audio.playLevelUp();
      const sk = wep.skills[skillIdx];
      state.floatTexts.push({
        x: state.player.x, y: state.player.y - 28,
        text: `⬆️【${sk.name}】升至 Lv.${sLvs[skillIdx]}！`,
        color: sk.color, life: 40
      });
      triggerWeaponSkill(skillIdx);
      renderWeaponArsenalHUD();
      this.updateHeader();
    };

    // ==================== 🔥 觸發 6 大武器 × 3 招專屬技能（v20.0 PokéSurvivor 級別高清流光粒子特效） ====================
    const triggerWeaponSkill = (skillSlotIdx) => {
      const wep = getActiveWeapon();
      const sLvs = getSkillLevels();
      const lv = sLvs[skillSlotIdx] || 1;
      const sk = wep.skills[skillSlotIdx];
      const baseDmg = getBaseDamage();
      const skillMult = 1.35 + (lv - 1) * 0.42;
      const dmg = Math.round(baseDmg * skillMult);

      let targetEn = state.enemies.find(e => e.type === "boss" && e.hp > 0) || state.enemies[0];
      const aimAng = targetEn ? Math.atan2(targetEn.y - state.player.y, targetEn.x - state.player.x) : state.player.facingAngle;

      state.floatTexts.push({
        x: state.player.x, y: state.player.y - 26,
        text: `${sk.vfxLabel} Lv.${lv}`,
        color: sk.color, life: 28
      });

      if (wep.id === "sword") {
        if (skillSlotIdx === 0) {
          audio.playSwordClash();
          const rad = 92 + lv * 14;
          state.skillEffects.push({
            vfxType: "sword_lotus_ring",
            x: state.player.x, y: state.player.y,
            r: rad, lv, life: 60, maxLife: 60, dmg
          });
          spawnShockwaveRing(state.player.x, state.player.y, 20, rad + 15, "#2dd4bf", 22, 4);
          spawnVFXParticles(state.player.x, state.player.y, 18, { type: "petal", colors: ["#2dd4bf", "#67e8f9", "#ffffff"], size: 7 });
          state.enemyProjectiles = [];
        } else if (skillSlotIdx === 1) {
          audio.playSwordClash();
          state.skillEffects.push({
            vfxType: "sword_giant_beam",
            x: state.player.x, y: state.player.y,
            angle: aimAng, length: 380 + lv * 35, width: 24 + lv * 5,
            lv, life: 30, maxLife: 30, dmg: Math.round(dmg * 1.35)
          });
          state.enemies.forEach(en => {
            const dx = en.x - state.player.x, dy = en.y - state.player.y;
            const proj = dx * Math.cos(aimAng) + dy * Math.sin(aimAng);
            const perp = Math.abs(-dx * Math.sin(aimAng) + dy * Math.cos(aimAng));
            if (proj > -15 && proj < 390 + lv * 35 && perp < en.r + 28 + lv * 4) {
              applyDamageToEnemy(en, dmg * 1.4, "#38bdf8", true);
            }
          });
        } else {
          audio.playLevelUp();
          const drops = [];
          const count = 16 + lv * 4;
          for (let i = 0; i < count; i++) {
            drops.push({
              tx: state.camera.x + 35 + Math.random() * (state.viewW - 70),
              ty: state.camera.y + 45 + Math.random() * (state.viewH - 80),
              delay: Math.floor(Math.random() * 20),
              exploded: false
            });
          }
          state.skillEffects.push({
            vfxType: "sword_sky_rain",
            x: state.player.x, y: state.player.y,
            drops, lv, life: 48, maxLife: 48, dmg
          });
          state.enemies.forEach(en => {
            if (Math.hypot(en.x - state.player.x, en.y - state.player.y) < 260) {
              applyDamageToEnemy(en, dmg * 1.25, "#60a5fa", false);
            }
          });
        }
      } else if (wep.id === "saber") {
        if (skillSlotIdx === 0) {
          audio.playSwordClash();
          state.skillEffects.push({
            vfxType: "saber_cross_slash",
            x: state.player.x, y: state.player.y,
            vx: Math.cos(aimAng) * 5.6, vy: Math.sin(aimAng) * 5.6,
            angle: aimAng, r: 48 + lv * 8,
            lv, life: 42, maxLife: 42, dmg: Math.round(dmg * 1.3)
          });
        } else if (skillSlotIdx === 1) {
          audio.playSwordClash();
          state.skillEffects.push({
            vfxType: "saber_blood_tornado",
            x: state.player.x, y: state.player.y,
            r: 84 + lv * 14, lv, life: 64, maxLife: 64, dmg
          });
          state.player.hp = Math.min(state.player.maxHp, state.player.hp + 7 + lv * 2);
        } else {
          audio.playThunder();
          const tx = targetEn ? targetEn.x : (state.player.x + Math.cos(aimAng) * 95);
          const ty = targetEn ? targetEn.y : (state.player.y + Math.sin(aimAng) * 95);
          state.skillEffects.push({
            vfxType: "saber_guillotine_slam",
            x: tx, y: ty, r: 100 + lv * 14,
            lv, life: 40, maxLife: 40
          });
          spawnShockwaveRing(tx, ty, 12, 115 + lv * 14, "#ef4444", 24, 5);
          spawnVFXParticles(tx, ty, 24, { type: "ember", colors: ["#ef4444", "#fb923c", "#fde047"], size: 9, maxSpeed: 5.5 });
          state.enemies.forEach(en => {
            if (Math.hypot(en.x - tx, en.y - ty) < 110 + lv * 14) {
              applyDamageToEnemy(en, dmg * 1.75, "#ef4444", true);
            }
          });
        }
      } else if (wep.id === "spear") {
        if (skillSlotIdx === 0) {
          audio.playSwordClash();
          state.skillEffects.push({
            vfxType: "spear_phoenix_flurry",
            x: state.player.x, y: state.player.y,
            angle: aimAng, range: 185 + lv * 18,
            lv, life: 28, maxLife: 28
          });
          spawnVFXParticles(state.player.x, state.player.y, 18, {
            angle: aimAng, spread: 0.95, type: "spark",
            colors: ["#e879f9", "#facc15", "#f97316"], minSpeed: 3, maxSpeed: 7.5, size: 8
          });
          state.enemies.forEach(en => {
            const d = Math.hypot(en.x - state.player.x, en.y - state.player.y);
            const aDiff = Math.abs(Math.atan2(Math.sin(Math.atan2(en.y - state.player.y, en.x - state.player.x) - aimAng), Math.cos(Math.atan2(en.y - state.player.y, en.x - state.player.x) - aimAng)));
            if (d < 190 + lv * 18 && aDiff < 0.75) {
              applyDamageToEnemy(en, dmg * 1.35, "#e879f9", true);
            }
          });
        } else if (skillSlotIdx === 1) {
          audio.playSwordClash();
          state.skillEffects.push({
            vfxType: "spear_dragon_drill",
            x: state.player.x, y: state.player.y,
            vx: Math.cos(aimAng) * 7.8, vy: Math.sin(aimAng) * 7.8,
            angle: aimAng, r: 44, lv, life: 45, maxLife: 45, dmg: Math.round(dmg * 1.45)
          });
        } else {
          audio.playThunder();
          const pillars = [];
          const pCount = 6;
          const rad = 118 + lv * 12;
          for (let i = 0; i < pCount; i++) {
            const a = (i * Math.PI * 2) / pCount;
            pillars.push({
              x: state.player.x + Math.cos(a) * rad,
              y: state.player.y + Math.sin(a) * (rad * 0.82)
            });
          }
          state.skillEffects.push({
            vfxType: "spear_star_pillars",
            x: state.player.x, y: state.player.y,
            pillars, r: rad, lv, life: 70, maxLife: 70, dmg
          });
        }
      } else if (wep.id === "chakram") {
        if (skillSlotIdx === 0) {
          audio.playQiCharge();
          state.skillEffects.push({
            vfxType: "chakram_yin_yang_orbit",
            x: state.player.x, y: state.player.y,
            r: 110 + lv * 14, count: 4 + Math.floor(lv / 2),
            lv, life: 68, maxLife: 68, dmg
          });
        } else if (skillSlotIdx === 1) {
          audio.playQiCharge();
          const bx = targetEn ? targetEn.x : (state.player.x + Math.cos(aimAng) * 110);
          const by = targetEn ? targetEn.y : (state.player.y + Math.sin(aimAng) * 110);
          state.skillEffects.push({
            vfxType: "chakram_gravity_blackhole",
            x: bx, y: by, r: 98 + lv * 15,
            lv, life: 72, maxLife: 72, dmg
          });
        } else {
          audio.playLevelUp();
          const targets = state.enemies.slice(0, 7 + lv * 2);
          const chainPts = [{ x: state.player.x, y: state.player.y }];
          targets.forEach(en => {
            chainPts.push({ x: en.x, y: en.y });
            spawnVFXParticles(en.x, en.y, 6, { type: "spark", colors: ["#fde047", "#38bdf8", "#ffffff"], size: 9 });
            applyDamageToEnemy(en, dmg * 1.35, "#fbbf24", false);
          });
          if (chainPts.length > 1) {
            state.skillEffects.push({
              vfxType: "chakram_chain_bounce",
              points: chainPts, lv, life: 28, maxLife: 28
            });
          }
        }
      } else if (wep.id === "cauldron") {
        if (skillSlotIdx === 0) {
          audio.playQiCharge();
          const zones = [];
          const zCnt = 3 + Math.floor(lv / 2);
          for (let i = 0; i < zCnt; i++) {
            const a = aimAng + (i - (zCnt - 1) / 2) * 0.65;
            zones.push({
              x: state.player.x + Math.cos(a) * 95,
              y: state.player.y + Math.sin(a) * 85,
              r: 54 + lv * 7
            });
          }
          state.skillEffects.push({
            vfxType: "cauldron_lava_zones",
            zones, lv, life: 82, maxLife: 82, dmg
          });
        } else if (skillSlotIdx === 1) {
          audio.playThunder();
          state.skillEffects.push({
            vfxType: "cauldron_dragon_beams",
            x: state.player.x, y: state.player.y,
            beams: 5 + lv, r: 145 + lv * 15,
            lv, life: 68, maxLife: 68, dmg
          });
        } else {
          audio.playThunder();
          const tx = targetEn ? targetEn.x : state.player.x;
          const ty = targetEn ? targetEn.y : state.player.y;
          state.skillEffects.push({
            vfxType: "cauldron_giant_drop",
            x: tx, y: ty, r: 125 + lv * 16,
            lv, life: 45, maxLife: 45
          });
          spawnShockwaveRing(tx, ty, 15, 135 + lv * 16, "#f59e0b", 26, 6);
          spawnVFXParticles(tx, ty, 28, { type: "ember", colors: ["#fde047", "#f97316", "#ef4444"], size: 10, maxSpeed: 6 });
          state.enemies.forEach(en => {
            if (Math.hypot(en.x - tx, en.y - ty) < 135 + lv * 16) {
              applyDamageToEnemy(en, dmg * 1.8, "#f59e0b", true);
              en.stunTimer = 45;
            }
          });
        }
      } else if (wep.id === "banner") {
        if (skillSlotIdx === 0) {
          audio.playThunder();
          const pillars = [];
          const cnt = 4 + lv;
          for (let i = 0; i < cnt; i++) {
            const tEn = (i === 0 && targetEn) ? targetEn : state.enemies[Math.floor(Math.random() * state.enemies.length)];
            const px = tEn ? tEn.x : (state.player.x + (Math.random() - 0.5) * 230);
            const py = tEn ? tEn.y : (state.player.y + (Math.random() - 0.5) * 190);
            pillars.push({ x: px, y: py });
            spawnShockwaveRing(px, py, 8, 52, "#c084fc", 18, 3.5);
            if (tEn) {
              applyDamageToEnemy(tEn, dmg * 1.45, "#c084fc", true);
              tEn.stunTimer = 35;
            }
          }
          state.skillEffects.push({
            vfxType: "banner_five_thunders",
            pillars, lv, life: 34, maxLife: 34
          });
        } else if (skillSlotIdx === 1) {
          audio.playThunder();
          const targets = state.enemies.slice(0, 9 + lv * 2);
          const webPts = [{ x: state.player.x, y: state.player.y }];
          targets.forEach(en => {
            webPts.push({ x: en.x, y: en.y });
            applyDamageToEnemy(en, dmg * 1.25, "#38bdf8", false);
            en.stunTimer = 42;
          });
          if (webPts.length > 1) {
            state.skillEffects.push({
              vfxType: "banner_chain_web",
              points: webPts, lv, life: 30, maxLife: 30
            });
          }
        } else {
          audio.playLevelUp();
          state.skillEffects.push({
            vfxType: "banner_thunder_god_orbs",
            x: state.player.x, y: state.player.y,
            orbs: 3 + Math.floor(lv / 2), r: 95 + lv * 10,
            lv, life: 78, maxLife: 78, dmg
          });
        }
      }
    };

    // ==================== 🌌 v23.0 觸發與無限升級「太初通用神通」 ====================
    const triggerUniversalSkill = (uniId) => {
      if (!v14.universalSkillLevels) v14.universalSkillLevels = { uni_golden_dragon: 1 };
      const lv = Math.max(1, v14.universalSkillLevels[uniId] || 1);
      const usk = WUXIA_UNIVERSAL_INFINITE_SKILLS.find(u => u.id === uniId) || WUXIA_UNIVERSAL_INFINITE_SKILLS[0];
      const baseDmg = getBaseDamage();
      // 無限升級倍率：每升 1 級傷害提升 +38%~+45%，無上限！
      const dmg = Math.round(baseDmg * (1.45 + (lv - 1) * 0.40));
      let targetEn = state.enemies.find(e => e.type === "boss" && e.hp > 0) || state.enemies[0];

      state.floatTexts.push({
        x: state.player.x, y: state.player.y - 32,
        text: `${usk.icon}【${usk.name} Lv.${lv}】!`,
        color: usk.color, life: 30
      });

      if (uniId === "uni_golden_dragon") {
        audio.playSwordClash();
        const dragonCount = Math.min(8, 1 + Math.floor(lv / 2));
        const rad = 88 + Math.min(95, lv * 6);
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 8 + Math.min(25, lv * 2));
        state.skillEffects.push({
          vfxType: "uni_vfx_golden_dragon",
          x: state.player.x, y: state.player.y,
          r: rad, dragons: dragonCount, lv,
          life: 66, maxLife: 66, dmg
        });
        spawnShockwaveRing(state.player.x, state.player.y, 14, rad, "#fde047", 20, 4);
        updatePlayerVitalHUD();
      } else if (uniId === "uni_star_meteor") {
        audio.playThunder();
        const meteorCount = Math.min(14, 3 + lv);
        const meteors = [];
        for (let i = 0; i < meteorCount; i++) {
          const tEn = (i === 0 && targetEn) ? targetEn : state.enemies[Math.floor(Math.random() * state.enemies.length)];
          const tx = tEn ? tEn.x + (Math.random() - 0.5) * 35 : (state.player.x + (Math.random() - 0.5) * 260);
          const ty = tEn ? tEn.y + (Math.random() - 0.5) * 35 : (state.player.y + (Math.random() - 0.5) * 210);
          meteors.push({
            tx: Math.max(40, Math.min(WORLD_W - 40, tx)),
            ty: Math.max(40, Math.min(WORLD_H - 40, ty)),
            r: 52 + Math.min(48, lv * 3),
            delay: Math.floor(i * 2.5),
            exploded: false
          });
        }
        state.skillEffects.push({
          vfxType: "uni_vfx_star_meteor",
          meteors, lv, life: 52, maxLife: 52, dmg
        });
      } else if (uniId === "uni_frost_nova") {
        audio.playQiCharge();
        const rad = 104 + Math.min(110, lv * 7);
        state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 6 + lv * 2);
        state.skillEffects.push({
          vfxType: "uni_vfx_frost_nova",
          x: state.player.x, y: state.player.y,
          r: rad, lv, life: 44, maxLife: 44, dmg
        });
        spawnShockwaveRing(state.player.x, state.player.y, 12, rad, "#38bdf8", 22, 5);
        spawnVFXParticles(state.player.x, state.player.y, 20, { type: "shard", colors: ["#67e8f9", "#38bdf8", "#ffffff"], size: 8 });
        state.enemies.forEach(en => {
          if (Math.hypot(en.x - state.player.x, en.y - state.player.y) < rad + en.r) {
            en.stunTimer = Math.max(en.stunTimer || 0, 70 + Math.min(90, lv * 6));
            applyDamageToEnemy(en, dmg * 1.35, "#67e8f9", true);
          }
        });
        updatePlayerVitalHUD();
      } else if (uniId === "uni_crimson_lotus") {
        audio.playThunder();
        const poolCount = Math.min(7, 2 + Math.floor(lv / 2));
        const pools = [];
        for (let i = 0; i < poolCount; i++) {
          const tEn = (i === 0 && targetEn) ? targetEn : state.enemies[Math.floor(Math.random() * state.enemies.length)];
          const px = tEn ? tEn.x : (state.player.x + Math.cos(i * 2.1) * 95);
          const py = tEn ? tEn.y : (state.player.y + Math.sin(i * 2.1) * 85);
          pools.push({ x: px, y: py, r: 58 + Math.min(45, lv * 4) });
          spawnShockwaveRing(px, py, 8, 64, "#f97316", 18, 4);
        }
        state.skillEffects.push({
          vfxType: "uni_vfx_crimson_lotus",
          pools, lv, life: 74, maxLife: 74, dmg
        });
      } else if (uniId === "uni_chaos_thunder") {
        audio.playThunder();
        const maxTargets = Math.min(22, 5 + lv * 2);
        const hitList = state.enemies.slice(0, maxTargets);
        const pts = [{ x: state.player.x, y: state.player.y }];
        hitList.forEach(en => {
          pts.push({ x: en.x, y: en.y });
          en.stunTimer = Math.max(en.stunTimer || 0, 45);
          applyDamageToEnemy(en, dmg * 1.4, "#c084fc", true);
        });
        state.skillEffects.push({
          vfxType: "uni_vfx_chaos_thunder",
          points: pts, lv, life: 34, maxLife: 34, dmg
        });
      } else if (uniId === "uni_void_blackhole") {
        audio.playQiCharge();
        const bx = targetEn ? targetEn.x : (state.player.x + Math.cos(state.player.facingAngle) * 105);
        const by = targetEn ? targetEn.y : (state.player.y + Math.sin(state.player.facingAngle) * 105);
        const rad = 96 + Math.min(95, lv * 6);
        state.skillEffects.push({
          vfxType: "uni_vfx_void_blackhole",
          x: bx, y: by, r: rad, lv, life: 78, maxLife: 78, dmg
        });
        spawnShockwaveRing(bx, by, rad, 12, "#818cf8", 24, 4);
      }
    };

    const upgradeUniversalSkill = (uniId) => {
      if (!v14.universalSkillLevels) v14.universalSkillLevels = { uni_golden_dragon: 1 };
      if (this.char.exp >= 120) this.char.exp -= 120;
      else if (v13.hammers >= 1) v13.hammers -= 1;
      v14.universalSkillLevels[uniId] = (v14.universalSkillLevels[uniId] || 0) + 1;
      const newLv = v14.universalSkillLevels[uniId];
      const usk = WUXIA_UNIVERSAL_INFINITE_SKILLS.find(u => u.id === uniId) || WUXIA_UNIVERSAL_INFINITE_SKILLS[0];
      audio.playLevelUp();
      state.floatTexts.push({
        x: state.player.x, y: state.player.y - 34,
        text: `🌌 通用無限神通【${usk.name}】升至 Lv.${newLv}！`,
        color: usk.color, life: 42
      });
      triggerUniversalSkill(uniId);
      renderWeaponArsenalHUD();
      this.updateHeader();
    };

    wrap.querySelector("#btn-v19-upgrade-all-skills")?.addEventListener("click", () => {
      const sLvs = getSkillLevels();
      const unmaxedIdxs = [0, 1, 2].filter(i => (sLvs[i] || 1) < 5);
      if (unmaxedIdxs.length > 0) {
        let minIdx = unmaxedIdxs[0];
        unmaxedIdxs.forEach(i => { if ((sLvs[i] || 1) < (sLvs[minIdx] || 1)) minIdx = i; });
        upgradeWeaponSkill(minIdx);
      } else {
        // 當當前武器 3 招技能皆已滿等 (Lv.5) 時，自動改為升級等級最低的「太初通用無限神通」！
        if (!v14.universalSkillLevels) v14.universalSkillLevels = { uni_golden_dragon: 1 };
        let targetUni = WUXIA_UNIVERSAL_INFINITE_SKILLS[0].id;
        let minLv = Infinity;
        WUXIA_UNIVERSAL_INFINITE_SKILLS.forEach(u => {
          const lv = v14.universalSkillLevels[u.id] || 0;
          if (lv < minLv) { minLv = lv; targetUni = u.id; }
        });
        upgradeUniversalSkill(targetUni);
      }
    });
    wrap.querySelector("#btn-v19-cast-ult-skill")?.addEventListener("click", () => triggerWeaponSkill(2));

    const getCurrentWaveConfig = () => {
      const baseCfg = WUXIA_STAGE_WAVES[Math.min(WUXIA_STAGE_WAVES.length - 1, state.waveIndex)];
      const gearMult = getPlayerGearMultiplier();
      const balanceScale = (1 + (gearMult - 1) * 0.65) * (curDiff.enemyHpMult || 1.0);
      if (state.waveIndex < WUXIA_STAGE_WAVES.length) {
        return {
          ...baseCfg,
          hpMult: baseCfg.hpMult * balanceScale,
          boss: {
            ...baseCfg.boss,
            hp: Math.round(baseCfg.boss.hp * balanceScale),
            shield: Math.round((baseCfg.boss.shield || 250) * balanceScale)
          }
        };
      }
      const extraWaves = state.waveIndex - WUXIA_STAGE_WAVES.length + 1;
      return {
        ...baseCfg,
        wave: state.waveIndex + 1,
        title: `無盡超越 · 神魔劫第 ${extraWaves} 重`,
        hpMult: baseCfg.hpMult * balanceScale * Math.pow(1.25, extraWaves),
        speedMult: Math.min(1.8, baseCfg.speedMult + extraWaves * 0.05),
        boss: {
          ...baseCfg.boss,
          name: `鴻蒙滅世魔帝 · ${extraWaves}階`,
          hp: Math.floor(baseCfg.boss.hp * balanceScale * Math.pow(1.3, extraWaves)),
          shield: Math.floor((baseCfg.boss.shield || 500) * balanceScale * Math.pow(1.25, extraWaves))
        }
      };
    };

    const showWaveBanner = (text, isBoss = false) => {
      const bannerEl = wrap.querySelector("#v18-wave-announce-banner");
      if (!bannerEl) return;
      bannerEl.innerText = text;
      bannerEl.style.borderColor = isBoss ? "#ef4444" : "#fbbf24";
      bannerEl.style.color = isBoss ? "#fecaca" : "#fef08a";
      bannerEl.style.display = "block";
      state.bannerTimer = 155;
    };

    const updateWaveProgressUI = () => {
      const wCfg = getCurrentWaveConfig();
      const badgeEl = wrap.querySelector("#v18-wave-badge");
      const titleEl = wrap.querySelector("#v18-wave-title");
      const hintEl = wrap.querySelector("#v18-boss-timer-hint");
      const fillEl = wrap.querySelector("#v18-wave-bar-fill");
      const tagsEl = wrap.querySelector("#v18-wave-enemies-tags");
      const formEl = wrap.querySelector("#v18-wave-formation-tag");

      if (badgeEl) badgeEl.innerText = `第 ${wCfg.wave} / 10 波`;
      if (titleEl) titleEl.innerText = `【${wCfg.title}】`;
      if (fillEl) {
        const pct = Math.min(100, Math.floor((state.waveFrame / wCfg.durationFrames) * 100));
        fillEl.style.width = `${pct}%`;
      }
      if (tagsEl) {
        tagsEl.innerHTML = `本波魔物：` + wCfg.enemyBadges.map(b =>
          `<span style="background:#27221e; border:1px solid #78350f; color:#fde047; padding:0px 5px; margin-right:3px;">${b}</span>`
        ).join("");
      }
      const formNames = {
        scattered: "陣型：散兵游勇",
        wolf_pack: "陣型：群狼直線突襲",
        archer_line: "陣型：白骨遠程箭陣",
        shield_wall: "陣型：重甲鐵壁推進",
        pincer: "陣型：左右兩翼夾擊",
        ring_encircle: "陣型：四方鐵桶合圍"
      };
      if (formEl) formEl.innerText = formNames[wCfg.formation] || "陣型：大荒獸潮";

      const activeBoss = state.enemies.find(e => e.type === "boss" && e.hp > 0);
      if (hintEl) {
        if (activeBoss) {
          hintEl.innerHTML = `<span style="color:#f87171; font-weight:900;">🔥 巨型首領【${activeBoss.name}】激戰中！</span>`;
        } else if (!state.waveBossSpawned && wCfg.boss) {
          const remSec = Math.max(0, Math.ceil((wCfg.boss.spawnAtFrame - state.waveFrame) / 60));
          hintEl.innerText = `👹 首領【${wCfg.boss.name}】降臨: ${remSec}秒`;
        } else {
          const remWaveSec = Math.max(0, Math.ceil((wCfg.durationFrames - state.waveFrame) / 60));
          hintEl.innerText = `⏳ 下一波推進: ${remWaveSec}秒`;
        }
      }

      const bossHud = wrap.querySelector("#v18-boss-hud-overlay");
      if (bossHud) {
        if (activeBoss) {
          bossHud.style.display = "block";
          const bNameEl = wrap.querySelector("#v18-boss-hud-name");
          const bHpTextEl = wrap.querySelector("#v18-boss-hud-hp-text");
          const bShieldBar = wrap.querySelector("#v18-boss-hud-shield-bar");
          const bBarEl = wrap.querySelector("#v18-boss-hud-bar");
          if (bNameEl) {
            bNameEl.innerText = `${activeBoss.isMiniBoss ? '👹[首領]' : '👑[巨型BOSS]'} ${activeBoss.name}${activeBoss.enraged ? ' (🔥二階段狂暴)' : ''}`;
          }
          if (bHpTextEl) {
            bHpTextEl.innerText = `護罡:${Math.max(0, Math.ceil(activeBoss.shield || 0))} ｜ 氣血:${Math.max(0, Math.ceil(activeBoss.hp))}/${activeBoss.maxHp}`;
          }
          if (bShieldBar) {
            const shPct = Math.max(0, Math.min(100, ((activeBoss.shield || 0) / Math.max(1, activeBoss.maxShield || 200)) * 100));
            bShieldBar.style.width = `${shPct}%`;
          }
          if (bBarEl) {
            bBarEl.style.width = `${Math.max(0, Math.min(100, (activeBoss.hp / activeBoss.maxHp) * 100))}%`;
          }
        } else {
          bossHud.style.display = "none";
        }
      }
    };

    const spawnWaveBoss = (customBossCfg = null) => {
      const wCfg = getCurrentWaveConfig();
      const bCfg = customBossCfg || wCfg.boss;

      const angle = (Math.random() * Math.PI * 0.7) - Math.PI * 0.35;
      const side = (Math.random() < 0.5) ? 1 : -1;
      let bx = state.player.x + side * Math.cos(angle) * 115;
      let by = state.player.y + Math.sin(angle) * 90;

      bx = Math.max(state.camera.x + 65, Math.min(state.camera.x + state.viewW - 65, bx));
      by = Math.max(state.camera.y + 75, Math.min(state.camera.y + state.viewH - 65, by));

      state.enemies.push({
        x: bx, y: by,
        hp: bCfg.hp, maxHp: bCfg.hp,
        shield: bCfg.shield || 250, maxShield: bCfg.shield || 250,
        r: bCfg.isMiniBoss ? 30 : 38,
        speed: 0.92,
        type: "boss",
        spriteType: bCfg.spriteType || "blood",
        isBoss: true,
        isMiniBoss: !!bCfg.isMiniBoss,
        bossScale: bCfg.scale || 3.85,
        name: bCfg.name, title: bCfg.title,
        enraged: false, phaseShieldTimer: 0,
        hitFlash: 8, slamTimer: 40, baseHitCd: 0
      });

      state.waveBossSpawned = true;
      spawnShockwaveRing(bx, by, 10, 120, "#ef4444", 26, 6);
      spawnVFXParticles(bx, by, 24, { type: "spark", colors: ["#ef4444", "#fbbf24", "#ffffff"], size: 11, maxSpeed: 5 });
      audio.playThunder();
      showWaveBanner(`⚠️ 巨型首領降臨：${bCfg.title}【${bCfg.name}】！`, true);
      updateWaveProgressUI();
    };

    const advanceToNextWave = () => {
      state.waveIndex++;
      state.waveFrame = 0;
      state.waveBossSpawned = false;
      const wCfg = getCurrentWaveConfig();
      audio.playEpiphanyBell();
      showWaveBanner(`🌊 第 ${wCfg.wave} 波來襲：【${wCfg.title}】｜ ${wCfg.unlockNotice}`, false);
      updateWaveProgressUI();
    };

    const spawnWaveFormationEnemies = () => {
      const wCfg = getCurrentWaveConfig();
      const weights = wCfg.weights;

      const pickEnemyType = () => {
        const total = Object.values(weights).reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        for (const [k, w] of Object.entries(weights)) {
          if (r < w) return k;
          r -= w;
        }
        return "swarm";
      };

      const buildEnemyEntity = (type, x, y) => {
        const hm = wCfg.hpMult || 1;
        const sm = wCfg.speedMult || 1;
        let hp = Math.ceil(32 * hm), r = 11, speed = 1.18 * sm, name = "血刀門徒", shield = 0;

        if (type === "charger") {
          hp = Math.ceil(46 * hm); r = 12; speed = 1.58 * sm; name = "幽冥妖狼";
        } else if (type === "ranged") {
          hp = Math.ceil(42 * hm); r = 11; speed = 0.90 * sm; name = "綠毒骨弓";
        } else if (type === "guardian") {
          hp = Math.ceil(125 * hm); r = 17; speed = 0.80 * sm; name = "撼山魔將"; shield = Math.ceil(55 * hm);
        } else if (type === "scorpion") {
          hp = Math.ceil(95 * hm); r = 14; speed = 1.02 * sm; name = "赤炎魔蠍";
        } else if (type === "wraith") {
          hp = Math.ceil(110 * hm); r = 13; speed = 1.30 * sm; name = "九幽鬼將";
        }

        const targetsCore = (mode === "defense" || mode === "hybrid") && (Math.random() < 0.28);
        return {
          x: Math.max(24, Math.min(WORLD_W - 24, x)),
          y: Math.max(24, Math.min(WORLD_H - 24, y)),
          hp, maxHp: hp, r, speed,
          type, name, targetsCore, shield, maxShield: shield,
          chargeTimer: 0, hitFlash: 0, baseHitCd: 0, stunTimer: 0, foxCharmedTimer: 0,
          meleeSlashTimer: Math.floor(Math.random() * 35),
          animOffset: Math.floor(Math.random() * 20),
          rangedTimer: Math.floor(Math.random() * 40)
        };
      };

      const formation = wCfg.formation;
      if (formation === "wolf_pack" && state.waveFrame % (wCfg.spawnInterval * 3) === 0) {
        const sideAng = Math.random() * Math.PI * 2;
        const baseX = state.player.x + Math.cos(sideAng) * 205;
        const baseY = state.player.y + Math.sin(sideAng) * 170;
        for (let k = 0; k < 3; k++) {
          state.enemies.push(buildEnemyEntity("charger", baseX + (k - 1) * 24, baseY + (k - 1) * 18));
        }
      } else if (formation === "ring_encircle" && state.waveFrame % (wCfg.spawnInterval * 4) === 0) {
        const count = 6;
        const baseAng = Math.random() * Math.PI;
        for (let k = 0; k < count; k++) {
          const a = baseAng + (k * Math.PI * 2) / count;
          const t = pickEnemyType();
          state.enemies.push(buildEnemyEntity(t, state.player.x + Math.cos(a) * 195, state.player.y + Math.sin(a) * 165));
        }
      } else {
        const spawnAng = Math.random() * Math.PI * 2;
        const ex = state.player.x + Math.cos(spawnAng) * 195;
        const ey = state.player.y + Math.sin(spawnAng) * 165;
        state.enemies.push(buildEnemyEntity(pickEnemyType(), ex, ey));
      }
    };

    // ==================== 🐾 更新 2×2 寬敞靈寵戰陣面板（徹底消除圖中擠壓與切邊問題！） ====================
    const updatePetPartyHUD = () => {
      const countLabel = wrap.querySelector("#v20-pet-count-label");
      const badgesList = wrap.querySelector("#wuxia-pet-badges-list");
      const tray = wrap.querySelector("#wuxia-pet-party-tray");
      const gourdCountEl = wrap.querySelector("#v14-gourd-counter");
      const btnGourdNum = wrap.querySelector("#btn-gourd-num");
      const heldBar = wrap.querySelector("#wuxia-held-items-bar");

      if (countLabel) countLabel.innerText = state.companionPets.length;
      if (gourdCountEl) gourdCountEl.innerText = v14.petGourds;
      if (btnGourdNum) btnGourdNum.innerText = v14.petGourds;

      if (badgesList) {
        if (state.companionPets.length >= 4) {
          badgesList.innerHTML = `<span style="color:#15803d; font-weight:900;">🌟 四系神獸全齊 · 共鳴特技全開！</span>`;
        } else {
          badgesList.innerHTML = `已出戰 ${state.companionPets.map(p => p.icon + p.name).join("、")}（可再收服 ${4 - state.companionPets.length} 隻）`;
        }
      }

      if (tray) {
        let html = state.companionPets.map((p) => {
          const tier = p.tier || 1;
          const isT4 = tier >= 4;
          const expPct = isT4 ? 100 : Math.min(100, Math.floor((p.exp || 0) / (p.maxExp || 20) * 100));
          const skInfo = WUXIA_PET_SKILLS_INFO[p.id] || WUXIA_PET_SKILLS_INFO.fox;
          const displayName = isT4 ? skInfo.divineName : p.name;
          const displayIcon = isT4 ? skInfo.divineIcon : p.icon;
          const displaySkill = isT4 ? skInfo.divineSkillName : `★${skInfo.skillName}`;
          const displayTag = isT4 ? skInfo.divineShortTag : skInfo.shortTag;
          const tierColor = isT4 ? "#f43f5e" : (tier === 3 ? "#fbbf24" : (tier === 2 ? "#38bdf8" : "#94a3b8"));
          const cardBg = isT4 ? "linear-gradient(135deg, #2e1065 0%, #450a0a 55%, #1b1815 100%)" : "#1b1815";
          const cardBorder = isT4 ? "#fde047" : "#000";
          return `
            <div class="pixel-pet-card tier-${tier}" style="background:${cardBg}; border:2px solid ${cardBorder}; box-shadow:2px 2px 0 #000; padding:5px 8px; min-width:0; box-sizing:border-box; overflow:hidden;" title="${skInfo.desc}">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                <span style="font-size:0.84rem; font-weight:900; color:${isT4 ? '#fef08a' : '#fffdf7'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${displayIcon} ${displayName}</span>
                <span style="font-size:0.7rem; font-weight:900; color:${isT4 ? '#fef08a' : tierColor}; background:${isT4 ? '#991b1b' : 'transparent'}; padding:0 4px; flex-shrink:0;">${isT4 ? '🌟T4太古聖獸' : `[T${tier}]`}</span>
              </div>
              <div style="font-size:0.72rem; color:${isT4 ? '#67e8f9' : '#fde047'}; margin-top:2px; font-weight:900; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${displaySkill}</div>
              <div style="font-size:0.66rem; color:#cbd5e1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${displayTag}</div>
              <div style="background:#332e29; height:4px; width:100%; border:1px solid #000; margin-top:3px;">
                <div style="background:${isT4 ? 'linear-gradient(90deg, #f43f5e, #fde047, #38bdf8)' : (tier === 3 ? '#fbbf24' : '#38bdf8')}; height:100%; width:${expPct}%;"></div>
              </div>
            </div>
          `;
        }).join("");

        if (state.companionPets.length < 4) {
          const emptyCount = 4 - state.companionPets.length;
          for (let k = 0; k < emptyCount; k++) {
            html += `
              <div style="background:rgba(20,18,15,0.16); border:2px dashed #575249; padding:6px; display:flex; align-items:center; justify-content:center; gap:6px; min-width:0; box-sizing:border-box;">
                <span style="font-size:0.9rem; opacity:0.5;">🐾</span>
                <span style="font-size:0.7rem; color:#575249; font-family:monospace; font-weight:800;">待收服靈獸欄位</span>
              </div>
            `;
          }
        }
        tray.innerHTML = html;
      }

      if (heldBar) {
        if (!state.heldItems || state.heldItems.length === 0) {
          heldBar.innerHTML = `<span style="color:#78716c;">攜帶神物：暫無（突破升級或討伐巨型魔尊獲取）</span>`;
        } else {
          heldBar.innerHTML = `<b style="color:var(--ink-black);">攜帶神物：</b>` + state.heldItems.map(item => `
            <span style="background:#27221e; border:1px solid #c9933b; color:#ffd27d; padding:1px 6px; font-weight:800;">${item}</span>
          `).join("");
        }
      }

      v14.companionPets = state.companionPets.map(p => ({ ...p }));
    };

    renderWeaponArsenalHUD();
    updatePetPartyHUD();
    updateWaveProgressUI();
    updatePlayerVitalHUD();
    showWaveBanner("🌊 第 1 波來襲：【初入青玄 · 外門魔卒】", false);

    wrap.querySelector("#btn-v21-surrender-settle")?.addEventListener("click", () => {
      triggerBattleEnd(false, `主動收劍歸山，於第 ${state.waveIndex + 1} 波提前結算戰果。`);
    });

    wrap.querySelector("#btn-v18-next-wave")?.addEventListener("click", () => advanceToNextWave());
    wrap.querySelector("#btn-v18-summon-boss")?.addEventListener("click", () => spawnWaveBoss());

    const refillGourds = (amount = 3) => {
      if (this.char.silver >= 50) this.char.silver -= 50;
      else if (this.char.exp >= 100) this.char.exp -= 100;
      v14.petGourds = (v14.petGourds || 0) + amount;
      audio.playLevelUp();
      state.floatTexts.push({
        x: state.player.x, y: state.player.y - 25,
        text: `✨ 補充 +${amount} 降妖靈葫！`,
        color: "#fbbf24", life: 36
      });
      updatePetPartyHUD();
      this.updateHeader();
    };

    wrap.querySelector("#btn-v14-refill-gourd-top")?.addEventListener("click", () => refillGourds(3));

    const setTargetFromScreen = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const screenX = (clientX - rect.left) * (state.viewW / rect.width);
      const screenY = (clientY - rect.top) * (state.viewH / rect.height);
      const wx = Math.max(30, Math.min(WORLD_W - 30, state.camera.x + screenX));
      const wy = Math.max(30, Math.min(WORLD_H - 30, state.camera.y + screenY));
      if (Math.hypot(wx - state.player.x, wy - state.player.y) > 4) {
        state.player.facingAngle = Math.atan2(wy - state.player.y, wx - state.player.x);
      }
      state.player.targetX = wx;
      state.player.targetY = wy;
    };

    const throwCatchGourd = (targetBeast) => {
      if (v14.petGourds <= 0) refillGourds(3);
      let target = targetBeast;
      if (!target) {
        let minDist = 950;
        state.wildBeasts.forEach(wb => {
          const d = Math.hypot(state.player.x - wb.x, state.player.y - wb.y);
          if (d < minDist && wb.hp > 0) {
            minDist = d;
            target = wb;
          }
        });
      }
      v14.petGourds--;
      audio.playSwordClash();
      const destX = target ? target.x : (state.player.x + Math.cos(state.player.facingAngle) * 110);
      const destY = target ? target.y : (state.player.y + Math.sin(state.player.facingAngle) * 110);

      state.gourdThrows.push({
        startX: state.player.x, startY: state.player.y,
        x: state.player.x, y: state.player.y,
        targetX: destX, targetY: destY,
        progress: 0, speed: 0.065,
        targetBeast: target
      });
      updatePetPartyHUD();
      this.updateHeader();
    };

    canvas.addEventListener("mousemove", (e) => setTargetFromScreen(e.clientX, e.clientY));
    canvas.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) setTargetFromScreen(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const screenX = (e.clientX - rect.left) * (state.viewW / rect.width);
      const screenY = (e.clientY - rect.top) * (state.viewH / rect.height);
      const clickWorldX = state.camera.x + screenX;
      const clickWorldY = state.camera.y + screenY;

      let clickedBeast = null;
      state.wildBeasts.forEach(wb => {
        if (Math.hypot(clickWorldX - wb.x, clickWorldY - wb.y) < 38) clickedBeast = wb;
      });
      if (clickedBeast) throwCatchGourd(clickedBeast);
      else setTargetFromScreen(e.clientX, e.clientY);
    });

    this._wuxiaKeyHandler = (e) => {
      state.keysDown[e.code] = true;
      if (e.code === "Space" || e.code === "KeyF") throwCatchGourd();
      if (e.code === "KeyZ") toggleFullscreenMode();
      if (e.code === "Digit1") triggerWeaponSkill(0);
      if (e.code === "Digit2") triggerWeaponSkill(1);
      if (e.code === "Digit3") triggerWeaponSkill(2);
    };
    this._wuxiaKeyUpHandler = (e) => {
      state.keysDown[e.code] = false;
    };
    window.addEventListener("keydown", this._wuxiaKeyHandler);
    window.addEventListener("keyup", this._wuxiaKeyUpHandler);

    const updateCaptureRadarBanner = () => {
      const radarTxt = wrap.querySelector("#v22-radar-prompt-txt");
      if (!radarTxt) return;
      const aliveWild = state.wildBeasts.filter(w => w.hp > 0);
      if (aliveWild.length === 0) {
        radarTxt.innerHTML = `🧭 抓寵雷達：搜尋靈獸氣息中... 可點擊上方【🔥召喚野生四聖獸】立即引出太古四大神獸！`;
      } else {
        let nearest = aliveWild[0];
        let minD = Math.hypot(state.player.x - nearest.x, state.player.y - nearest.y);
        aliveWild.forEach(w => {
          const d = Math.hypot(state.player.x - w.x, state.player.y - w.y);
          if (d < minD) { minD = d; nearest = w; }
        });
        const dirX = nearest.x - state.player.x;
        const dirY = nearest.y - state.player.y;
        const dirStr = `${dirY < -40 ? '⬆️北' : (dirY > 40 ? '⬇️南' : '')}${dirX < -40 ? '⬅️西' : (dirX > 40 ? '➡️東' : '🎯就在身旁')}`;
        radarTxt.innerHTML = `🚨 <b>發現可收服${nearest.isDivineBeast ? '【🌟T4太古聖獸】' : '靈獸'}：</b><span style="color:#fde047; font-weight:900;">【${nearest.name}】</span> 位於 <b>${dirStr} (${Math.round(minD)}m)</b> ｜ 點擊神獸或按 <b>[F / 空白鍵]</b> 投擲靈葫收服！`;
      }
    };

    const spawnWildBeastEntity = (forceDivine = false) => {
      const petConfigs = [
        { key: "fox", baseName: "赤焰靈狐", divineName: "九尾焚天金烏狐帝", icon: "🦊🔥" },
        { key: "turtle", baseName: "玄冥靈龜", divineName: "太古混沌玄武真君", icon: "🐢❄️" },
        { key: "bird", baseName: "裂空雷雛", divineName: "神霄太古滅世雷凰", icon: "🐥⚡" },
        { key: "deer", baseName: "青靈仙鹿", divineName: "萬古長青建木聖鹿", icon: "🦌🌸" }
      ];
      // 優先刷新玩家尚未收服或尚未升至 T4 的神獸！
      const unowned = petConfigs.filter(c => !state.companionPets.some(p => p.id === c.key && p.tier >= 4));
      const pool = unowned.length > 0 ? unowned : petConfigs;
      const cfg = pool[Math.floor(Math.random() * pool.length)];
      const isDivine = forceDivine || (mode === "divine_beasts") || (Math.random() < 0.45);

      // 生成在玩家視野附近 (110~190px)，讓玩家一眼就能看到神獸與抓寵提示！
      const ang = Math.random() * Math.PI * 2;
      const dist = 110 + Math.random() * 75;
      const wx = Math.max(55, Math.min(WORLD_W - 55, state.player.x + Math.cos(ang) * dist));
      const wy = Math.max(65, Math.min(WORLD_H - 55, state.player.y + Math.sin(ang) * dist));

      const wb = {
        x: wx, y: wy,
        petId: cfg.key,
        isDivineBeast: isDivine,
        name: isDivine ? cfg.divineName : cfg.baseName,
        icon: cfg.icon,
        hp: 10, maxHp: 10, r: isDivine ? 20 : 14, pulse: 0
      };
      state.wildBeasts.push(wb);
      spawnShockwaveRing(wx, wy, 8, isDivine ? 85 : 50, isDivine ? "#fde047" : "#38bdf8", 22, 4);
      state.floatTexts.push({
        x: wx, y: wy - 28,
        text: isDivine ? `🌟太古聖獸【${wb.name}】降臨！按[F]收服！` : `🐾發現【${wb.name}】！按[F]收服！`,
        color: isDivine ? "#fde047" : "#67e8f9",
        life: 55
      });
      updateCaptureRadarBanner();
    };

    wrap.querySelector("#btn-v14-catch-pet")?.addEventListener("click", () => throwCatchGourd());
    wrap.querySelector("#btn-v22-radar-catch-now")?.addEventListener("click", () => throwCatchGourd());
    wrap.querySelector("#btn-v22-summon-divine-beast")?.addEventListener("click", () => {
      audio.playEpiphanyBell();
      spawnWildBeastEntity(true);
      showWaveBanner("🌟 已召喚太古四聖神獸降臨身邊！點擊神獸或按 [F / 空白鍵] 投擲靈葫收服！", false);
    });
    wrap.querySelector("#btn-v22-switch-divine-mode")?.addEventListener("click", () => {
      this.stopV13MowingLoop();
      v21.arenaMode = (v21.arenaMode === "divine_beasts") ? "hybrid" : "divine_beasts";
      v14.arenaMode = v21.arenaMode;
      if (v21.arenaMode === "divine_beasts") v14.petGourds = Math.max(12, v14.petGourds || 12);
      audio.playLevelUp();
      this.saveGame();
      this.renderView();
    });

    this.captureWildPet = (petId, stateRef, isDivineBeast = false) => {
      const existing = stateRef.companionPets.find(p => p.id === petId);
      const skInfo = WUXIA_PET_SKILLS_INFO[petId] || WUXIA_PET_SKILLS_INFO.fox;
      const petIcons = { fox: "🦊", turtle: "🐢", bird: "🐥", deer: "🦌" };

      if (existing) {
        if (isDivineBeast || existing.tier >= 3) {
          existing.tier = 4;
          existing.name = skInfo.divineName;
          existing.title = skInfo.divineName;
          existing.icon = skInfo.divineIcon;
          existing.skillTimer = 999; // 立即施展一次T4太古聖獸覺醒大招！
          audio.playLevelUp();
          spawnShockwaveRing(existing.x, existing.y, 12, 110, "#fde047", 28, 6);
          spawnVFXParticles(existing.x, existing.y, 26, { type: "spark", colors: ["#fde047", "#f43f5e", "#38bdf8", "#ffffff"], size: 10 });
          showWaveBanner(`🌟 太古血脈覺醒：【${existing.name} (T4聖獸)】降世！解鎖【${skInfo.divineSkillName}】！`, false);
        } else {
          existing.tier = Math.min(4, existing.tier + 1);
          existing.exp = 0;
          existing.maxExp = Math.floor((existing.maxExp || 20) * 1.6);
          if (existing.tier === 4) {
            existing.name = skInfo.divineName;
            existing.icon = skInfo.divineIcon;
          }
          audio.playLevelUp();
          spawnShockwaveRing(existing.x, existing.y, 8, 70, "#fde047", 22, 4);
          stateRef.floatTexts.push({
            x: stateRef.player.x, y: stateRef.player.y - 34,
            text: `🌟 靈獸進化：【${existing.name}】升至 T${existing.tier}！`,
            color: "#ffdd55", life: 48
          });
        }
      } else if (stateRef.companionPets.length < 4) {
        const initTier = isDivineBeast ? 4 : 1;
        const newPet = {
          id: petId,
          name: isDivineBeast ? skInfo.divineName : skInfo.baseName,
          tier: initTier,
          element: (petId === "fox" ? "fire" : (petId === "turtle" ? "water" : (petId === "bird" ? "thunder" : "grass"))),
          lv: 1, exp: 0, maxExp: 20,
          title: isDivineBeast ? skInfo.divineName : skInfo.baseName,
          icon: isDivineBeast ? skInfo.divineIcon : (petIcons[petId] || "🐾"),
          hp: 150, maxHp: 150,
          x: stateRef.player.x + (Math.random() - 0.5) * 40,
          y: stateRef.player.y + 30,
          cdTimer: 0,
          skillTimer: 999 // 收服瞬間立即釋放一次招牌大招！
        };
        stateRef.companionPets.push(newPet);
        if (!v14.companionPets) v14.companionPets = [];
        if (!v14.companionPets.find(p => p.id === petId)) v14.companionPets.push(newPet);
        audio.playLevelUp();
        spawnShockwaveRing(newPet.x, newPet.y, 10, 95, "#fde047", 24, 5);
        showWaveBanner(`🎉 成功收服${isDivineBeast ? '【T4太古聖獸】' : ''}：${newPet.icon}【${newPet.name}】！`, false);
      } else {
        stateRef.companionPets.forEach(p => {
          if (isDivineBeast && p.tier < 4) {
            p.tier = 4;
            const info = WUXIA_PET_SKILLS_INFO[p.id] || WUXIA_PET_SKILLS_INFO.fox;
            p.name = info.divineName;
            p.icon = info.divineIcon;
          }
        });
      }
      updatePetPartyHUD();

      // 在「太古四聖獸捕獲戰」模式下，若已收齊 4 隻 T4 太古聖獸，給予豐厚道魂晶獎勵提示！
      const allFourDivine = stateRef.companionPets.length >= 4 && stateRef.companionPets.every(p => p.tier >= 4);
      if (allFourDivine && !stateRef.fourDivineRewarded) {
        stateRef.fourDivineRewarded = true;
        stateRef.gainedSoulGems += 50;
        showWaveBanner("👑 【四聖歸位 · 威震山海】成功集齊四大T4太古聖獸！全隊傷害翻倍並額外獲贈 +50 💎道魂晶！", false);
        updatePlayerVitalHUD();
      }
    };

    const openWuxiaPerkChoice = () => {
      state.paused = true;
      audio.playEpiphanyBell();
      const modal = wrap.querySelector("#v13-mow-perk-modal");
      const btnBox = wrap.querySelector("#v13-mow-perk-buttons");
      if (!modal || !btnBox) { state.paused = false; return; }

      const wep = getActiveWeapon();
      const sLvs = getSkillLevels();
      if (!v14.universalSkillLevels) v14.universalSkillLevels = { uni_golden_dragon: 1 };

      // 1️⃣ 【武器專屬絕技池】：嚴格過濾掉已滿等 (curLv >= 5) 的技能，滿等技能絕不再出現！
      const unmaxedWeaponSkillPerks = [];
      wep.skills.forEach((sk, idx) => {
        const curLv = sLvs[idx] || 1;
        if (curLv < 5) {
          unmaxedWeaponSkillPerks.push({
            id: `wep_${wep.id}_${idx}`,
            category: "⚔️武器絕技",
            badgeColor: "#b45309",
            icon: sk.icon,
            title: `【${wep.shortName}絕技】${sk.name} (Lv.${curLv} ➔ Lv.${curLv + 1}${curLv + 1 >= 5 ? '·滿階' : ''})`,
            desc: `${sk.desc}（升階傷害+42%、流光範圍擴大並立即施放！）`,
            apply: () => {
              sLvs[idx] = Math.min(5, curLv + 1);
              triggerWeaponSkill(idx);
              renderWeaponArsenalHUD();
            }
          });
        }
      });

      // 2️⃣ 【靈寵進化與護身裝備池】：僅列出尚未達 T4 太古聖獸的靈寵，以及尚未擁有的護身法寶裝備！
      const petAndEquipPerks = [];
      const petDefs = [
        {
          id: "fox", icon: "🦊",
          baseTitle: "赤焰靈狐", t4Title: "九尾焚天金烏狐帝",
          desc: "火狐升階（最高T4太古聖獸）！扇形穿透狐火增加，T4解鎖【大日金烏·九尾焚天滅世陣】！"
        },
        {
          id: "turtle", icon: "🐢",
          baseTitle: "玄冥靈龜", t4Title: "太古混沌玄武真君",
          desc: "靈龜升階（最高T4太古聖獸）！立即凝聚玄武護罡盾，T4解鎖【絕對零度冥海蒼龍界】全屏冰封！"
        },
        {
          id: "bird", icon: "🐥",
          baseTitle: "裂空雷雛", t4Title: "神霄太古滅世雷凰",
          desc: "雷雛升階（最高T4太古聖獸）！極速紫電雷羽破盾，T4解鎖【神霄雷凰·萬劫紫極神雷網】！"
        },
        {
          id: "deer", icon: "🦌",
          baseTitle: "青靈仙鹿", t4Title: "萬古長青建木聖鹿",
          desc: "仙鹿升階（最高T4太古聖獸）！持續為主角回血回盾，T4解鎖【太古建木·萬仙桃源回春界】！"
        }
      ];

      petDefs.forEach(pd => {
        const ownedPet = state.companionPets.find(p => p.id === pd.id);
        const curTier = ownedPet ? (ownedPet.tier || 1) : 0;
        // 已經升到 T4 滿階的靈寵不再出現於升級選項！
        if (curTier < 4 && (ownedPet || state.companionPets.length < 4)) {
          const nextTier = curTier + 1;
          const label = curTier === 0
            ? `【收服靈寵】${pd.baseTitle} (直接入陣 T1)`
            : (nextTier >= 4
                ? `【聖獸覺醒】${pd.baseTitle} (T3 ➔ 🌟T4 ${pd.t4Title}·滿階)`
                : `【靈寵進化】${pd.baseTitle} (T${curTier} ➔ T${nextTier})`);
          petAndEquipPerks.push({
            id: `pet_${pd.id}`,
            category: "🐾靈寵進化",
            badgeColor: "#15803d",
            icon: nextTier >= 4 ? `${pd.icon}🌟` : pd.icon,
            title: label,
            desc: pd.desc,
            apply: () => {
              if (ownedPet) {
                this.captureWildPet(pd.id, state, ownedPet.tier >= 3);
              } else {
                this.captureWildPet(pd.id, state, false);
              }
              if (pd.id === "turtle") {
                state.player.frostShield = Math.min(state.player.maxShield, (state.player.frostShield || 0) + 35);
                updatePlayerVitalHUD();
              }
            }
          });
        }
      });

      V23_EQUIP_RELIC_PERKS.forEach(eq => {
        if (!state.heldItems.includes(eq.key)) {
          petAndEquipPerks.push({
            id: `eq_${eq.key}`,
            category: "🛡️護身裝備",
            badgeColor: "#0369a1",
            icon: eq.icon,
            title: eq.title,
            desc: eq.desc,
            apply: () => {
              if (!state.heldItems.includes(eq.key)) state.heldItems.push(eq.key);
              v14.heldItems = state.heldItems;
              if (eq.onAcquire) eq.onAcquire(state);
              updatePlayerVitalHUD();
              updatePetPartyHUD();
            }
          });
        }
      });

      // 3️⃣ 【太初通用無限升級神通池】：任何武器皆可使用，無等級上限 (Lv.1 ➔ Lv.∞)，確保武器滿等後依然有豐富技能無限強化！
      const universalSkillPerks = WUXIA_UNIVERSAL_INFINITE_SKILLS.map(usk => {
        const curLv = v14.universalSkillLevels[usk.id] || 0;
        const nextLv = curLv + 1;
        return {
          id: `uni_${usk.id}`,
          category: "🌌通用無限神通",
          badgeColor: "#7e22ce",
          icon: usk.icon,
          title: `【通用無限神通】${usk.name} (${curLv === 0 ? '新領悟 ➔ Lv.1' : `Lv.${curLv} ➔ Lv.${nextLv} ∞`})`,
          desc: `${usk.desc}`,
          apply: () => {
            v14.universalSkillLevels[usk.id] = nextLv;
            triggerUniversalSkill(usk.id);
            renderWeaponArsenalHUD();
          }
        };
      });

      // 🎯 智慧配比抽取 3 個不重複選項：
      // - 槽位 1：優先抽取「未滿等之武器技能」（若當前武器 3 招皆已 Lv.5 滿等，則改抽靈寵/裝備或通用無限神通）
      // - 槽位 2：優先抽取「靈寵進化 / 護身裝備」（大幅提高寵物與裝備出現率！若寵物與裝備全滿，則抽通用無限神通）
      // - 槽位 3：固定抽取「太初通用無限升級神通」（讓玩家隨時能修習並無限強化跨武器通用大招！）
      const pickRandom = (arr, excludeIds) => {
        const avail = arr.filter(x => !excludeIds.has(x.id));
        if (avail.length === 0) return null;
        return avail[Math.floor(Math.random() * avail.length)];
      };

      const chosen = [];
      const usedIds = new Set();

      // 槽位 1：未滿等武器技能
      const slot1 = pickRandom(unmaxedWeaponSkillPerks, usedIds)
        || pickRandom(petAndEquipPerks, usedIds)
        || pickRandom(universalSkillPerks, usedIds);
      if (slot1) { chosen.push(slot1); usedIds.add(slot1.id); }

      // 槽位 2：靈寵收服進化 / 護身裝備法寶
      const slot2 = pickRandom(petAndEquipPerks, usedIds)
        || pickRandom(universalSkillPerks, usedIds)
        || pickRandom(unmaxedWeaponSkillPerks, usedIds);
      if (slot2) { chosen.push(slot2); usedIds.add(slot2.id); }

      // 槽位 3：太初通用無限升級神通（若還有未選的靈寵/裝備，亦有 35% 機率再出一個靈寵/裝備）
      let slot3 = null;
      if (petAndEquipPerks.length > 1 && Math.random() < 0.35) {
        slot3 = pickRandom(petAndEquipPerks, usedIds);
      }
      if (!slot3) {
        slot3 = pickRandom(universalSkillPerks, usedIds)
          || pickRandom(petAndEquipPerks, usedIds)
          || pickRandom(unmaxedWeaponSkillPerks, usedIds);
      }
      if (slot3) { chosen.push(slot3); usedIds.add(slot3.id); }

      // 保底填滿 3 個選項
      while (chosen.length < 3) {
        const extra = pickRandom(universalSkillPerks, usedIds);
        if (!extra) break;
        chosen.push(extra);
        usedIds.add(extra.id);
      }

      btnBox.innerHTML = chosen.map((p, i) => `
        <button type="button" class="perk-choice-card" data-wuxia-perk="${i}">
          <div class="perk-choice-icon">${p.icon}</div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="background:${p.badgeColor || '#334155'}; color:#fef08a; font-size:0.64rem; font-weight:900; padding:1px 5px; font-family:monospace; flex-shrink:0;">${p.category || '神通升階'}</span>
              <div style="font-size:0.84rem; font-weight:900; color:#141311; font-family:monospace; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.title}</div>
            </div>
            <div style="font-size:0.71rem; color:#3d3a34; margin-top:2px; font-family:monospace; line-height:1.3;">${p.desc}</div>
          </div>
        </button>
      `).join("");
      modal.classList.add("active");

      btnBox.querySelectorAll("[data-wuxia-perk]").forEach(b => {
        b.addEventListener("click", () => {
          const idx = parseInt(b.getAttribute("data-wuxia-perk"), 10);
          chosen[idx].apply();
          modal.classList.remove("active");
          state.paused = false;
          renderWeaponArsenalHUD();
          updatePetPartyHUD();
          this.updateHeader();
        });
      });
    };

    // ==================== 60FPS 主戰鬥與 PokéSurvivor 高清流光特效渲染循環 ====================
    const loop = () => {
      if (!document.body.contains(canvas)) {
        this.stopV13MowingLoop();
        return;
      }
      if (!state.paused) {
        state.frame++;
        state.waveFrame++;

        if (state.frame % 30 === 0) {
          syncHighDPICanvasResolution();
        }

        if (state.bannerTimer > 0) {
          state.bannerTimer--;
          if (state.bannerTimer === 0) {
            const bEl = wrap.querySelector("#v18-wave-announce-banner");
            if (bEl) bEl.style.display = "none";
          }
        }

        const hasBootRelic = hasRelic("wind_boots") || (state.heldItems && state.heldItems.includes("👢疾風破虛靴"));
        const hasNectarRelic = hasRelic("spirit_nectar") || (state.heldItems && state.heldItems.includes("🍎朱果仙露"));
        const speedTraitMult = (curSkin.speedMult || 1.0) * (1 + ((shrine.speedLv || 1) - 1) * 0.05) * (hasBootRelic ? 1.25 : 1.0);
        const moveStep = Math.round(((state.player.speedBoostTimer > 0) ? 10 : 8) * speedTraitMult);
        if (state.frame % 180 === 0) {
          const regenHp = (curSkin.regenPer3Sec || 0) + (hasNectarRelic ? 6 : 0);
          const regenSh = hasNectarRelic ? 5 : 0;
          if (regenHp > 0 && state.player.hp < state.player.maxHp) {
            state.player.hp = Math.min(state.player.maxHp, state.player.hp + regenHp);
          }
          if (regenSh > 0 && state.player.frostShield < state.player.maxShield) {
            state.player.frostShield = Math.min(state.player.maxShield, state.player.frostShield + regenSh);
          }
          updatePlayerVitalHUD();
        }
        if (state.player.speedBoostTimer > 0) state.player.speedBoostTimer--;

        if (state.keysDown["KeyW"] || state.keysDown["ArrowUp"]) state.player.targetY = Math.max(30, state.player.targetY - moveStep);
        if (state.keysDown["KeyS"] || state.keysDown["ArrowDown"]) state.player.targetY = Math.min(WORLD_H - 30, state.player.targetY + moveStep);
        if (state.keysDown["KeyA"] || state.keysDown["ArrowLeft"]) state.player.targetX = Math.max(30, state.player.targetX - moveStep);
        if (state.keysDown["KeyD"] || state.keysDown["ArrowRight"]) state.player.targetX = Math.min(WORLD_W - 30, state.player.targetX + moveStep);

        const dxMove = state.player.targetX - state.player.x;
        const dyMove = state.player.targetY - state.player.y;
        if (Math.hypot(dxMove, dyMove) > 3) {
          state.player.facingAngle = Math.atan2(dyMove, dxMove);
        }

        state.player.x += dxMove * 0.16;
        state.player.y += dyMove * 0.16;
        state.player.x = Math.max(25, Math.min(WORLD_W - 25, state.player.x));
        state.player.y = Math.max(25, Math.min(WORLD_H - 25, state.player.y));

        if (state.player.invulnerableTimer > 0) state.player.invulnerableTimer--;

        const targetCamX = Math.max(0, Math.min(WORLD_W - state.viewW, state.player.x - state.viewW / 2));
        const targetCamY = Math.max(0, Math.min(WORLD_H - state.viewH, state.player.y - state.viewH / 2));
        state.camera.x += (targetCamX - state.camera.x) * 0.18;
        state.camera.y += (targetCamY - state.camera.y) * 0.18;

        const wCfg = getCurrentWaveConfig();
        const bossTriggerFrame = (mode === "boss_rush") ? 140 : (wCfg.boss ? wCfg.boss.spawnAtFrame : 420);
        if (!state.waveBossSpawned && state.waveFrame >= bossTriggerFrame) {
          spawnWaveBoss();
        }

        const hasAliveBoss = state.enemies.some(e => e.type === "boss" && e.hp > 0);
        if (state.waveFrame >= wCfg.durationFrames && !hasAliveBoss) {
          advanceToNextWave();
        }

        const effInterval = (mode === "endless") ? Math.max(6, Math.floor(wCfg.spawnInterval * 0.65)) : wCfg.spawnInterval;
        const effMaxMobs = (mode === "endless") ? wCfg.maxMobs + 20 : wCfg.maxMobs;
        if (state.waveFrame % effInterval === 0 && state.enemies.length < effMaxMobs) {
          spawnWaveFormationEnemies();
        }

        if (state.frame % 15 === 0) {
          updateWaveProgressUI();
        }

        // ==================== ⚔️ 六大本命武器普攻與 3 大專屬技能輪轉 ====================
        const wep = getActiveWeapon();
        const sLvs = getSkillLevels();
        const baseDmg = getBaseDamage();

        state.baseAtkTimer++;
        if (state.baseAtkTimer >= wep.baseCd && state.enemies.length > 0) {
          state.baseAtkTimer = 0;
          let closestEn = null;
          let minDist = 390;
          state.enemies.forEach(en => {
            const d = Math.hypot(en.x - state.player.x, en.y - state.player.y);
            if (d < minDist) { minDist = d; closestEn = en; }
          });
          const atkAng = closestEn ? Math.atan2(closestEn.y - state.player.y, closestEn.x - state.player.x) : state.player.facingAngle;

          if (wep.id === "sword") {
            const cnt = 1 + Math.floor((sLvs[0] || 1) / 2);
            for (let k = 0; k < cnt; k++) {
              const a = atkAng + (k - (cnt - 1) / 2) * 0.18;
              state.projectiles.push({
                x: state.player.x, y: state.player.y,
                vx: Math.cos(a) * 7.6, vy: Math.sin(a) * 7.6,
                angle: a, life: 55, dmg: baseDmg,
                wepType: "sword_bolt", color: "#38bdf8"
              });
            }
          } else if (wep.id === "saber") {
            const arcRad = 82 + (sLvs[0] || 1) * 8;
            state.skillEffects.push({
              vfxType: "saber_basic_arc",
              x: state.player.x, y: state.player.y,
              angle: atkAng, r: arcRad,
              life: 16, maxLife: 16
            });
            spawnVFXParticles(state.player.x + Math.cos(atkAng) * 45, state.player.y + Math.sin(atkAng) * 45, 8, {
              angle: atkAng, spread: 1.4, type: "ember", colors: ["#ef4444", "#fb923c", "#fde047"], size: 7
            });
            state.enemies.forEach(en => {
              if (Math.hypot(en.x - state.player.x, en.y - state.player.y) < arcRad + 8) {
                applyDamageToEnemy(en, baseDmg, "#ef4444", true);
              }
            });
            if (Math.random() < 0.35) {
              state.player.hp = Math.min(state.player.maxHp, state.player.hp + 2);
            }
          } else if (wep.id === "spear") {
            state.projectiles.push({
              x: state.player.x, y: state.player.y,
              vx: Math.cos(atkAng) * 10.2, vy: Math.sin(atkAng) * 10.2,
              angle: atkAng, life: 42, dmg: baseDmg,
              pierce: 4 + (sLvs[0] || 1),
              wepType: "spear_thrust", color: "#c084fc"
            });
          } else if (wep.id === "chakram") {
            state.projectiles.push({
              x: state.player.x, y: state.player.y,
              vx: Math.cos(atkAng) * 6.6, vy: Math.sin(atkAng) * 6.6,
              life: 68, maxLife: 68, dmg: baseDmg,
              pierce: 99,
              wepType: "chakram_disc", color: "#fde047"
            });
          } else if (wep.id === "cauldron") {
            const tx = closestEn ? closestEn.x : (state.player.x + Math.cos(atkAng) * 120);
            const ty = closestEn ? closestEn.y : (state.player.y + Math.sin(atkAng) * 120);
            state.projectiles.push({
              x: state.player.x, y: state.player.y,
              vx: (tx - state.player.x) / 26, vy: (ty - state.player.y) / 26,
              life: 26, dmg: baseDmg,
              wepType: "cauldron_bomb", color: "#f97316"
            });
          } else if (wep.id === "banner") {
            const targets = state.enemies.slice(0, 1 + Math.floor((sLvs[0] || 1) / 2));
            targets.forEach(tEn => {
              state.lightningBolts.push({ x: tEn.x, y: tEn.y, life: 14 });
              spawnShockwaveRing(tEn.x, tEn.y, 4, 28, "#c084fc", 12, 2.5);
              applyDamageToEnemy(tEn, baseDmg, "#c084fc", false);
            });
          }
        }

        const cdRed = Math.min(0.50, (curSkin.cdReduction || 0) + ((shrine.speedLv || 1) - 1) * 0.03 + (hasBootRelic ? 0.15 : 0));
        for (let sIdx = 0; sIdx < 3; sIdx++) {
          state.skillTimers[sIdx]++;
          const sk = wep.skills[sIdx];
          const lv = sLvs[sIdx] || 1;
          const cd = Math.max(42, Math.round((sk.baseCd - (lv - 1) * 12) * (1 - cdRed)));
          if (state.skillTimers[sIdx] >= cd && state.enemies.length > 0) {
            state.skillTimers[sIdx] = 0;
            triggerWeaponSkill(sIdx);
          }
        }

        // 🌌 v23.0 自動輪轉施放所有已領悟之「太初通用無限升級神通」（切換任何武器皆生效！）
        if (v14.universalSkillLevels) {
          WUXIA_UNIVERSAL_INFINITE_SKILLS.forEach((usk, uIdx) => {
            const ulv = v14.universalSkillLevels[usk.id] || 0;
            if (ulv > 0) {
              state.uniSkillTimers[uIdx] = (state.uniSkillTimers[uIdx] || 0) + 1;
              const uCd = Math.max(45, Math.round((usk.baseCd - Math.min(65, (ulv - 1) * 5)) * (1 - cdRed)));
              if (state.uniSkillTimers[uIdx] >= uCd && state.enemies.length > 0) {
                state.uniSkillTimers[uIdx] = 0;
                triggerUniversalSkill(usk.id);
              }
            }
          });
        }

        // ==================== 🐾 四系靈寵：高清彈幕與專屬主動大招 ====================
        state.companionPets.forEach((p, idx) => {
          const offsetX = Math.cos(state.frame * 0.04 + idx * 1.57) * (40 + idx * 8);
          const offsetY = Math.sin(state.frame * 0.04 + idx * 1.57) * (34 + idx * 6);
          p.x += (state.player.x + offsetX - p.x) * 0.12;
          p.y += (state.player.y + offsetY - p.y) * 0.12;

          const tier = p.tier || 1;
          const isT4 = tier >= 4;
          const petBaseDmg = Math.max(5, Math.round(baseDmg * (isT4 ? 1.35 : (0.35 + tier * 0.18))));

          p.cdTimer = (p.cdTimer || 0) + 1;
          const cd = (isT4 ? 18 : (tier === 3 ? 24 : (tier === 2 ? 32 : 42)));
          if (p.cdTimer >= cd && state.enemies.length > 0) {
            p.cdTimer = 0;
            let closestEn = state.enemies[0];
            let minDist = 380;
            state.enemies.forEach(en => {
              const d = Math.hypot(en.x - p.x, en.y - p.y);
              if (d < minDist) { minDist = d; closestEn = en; }
            });
            if (closestEn) {
              const ang = Math.atan2(closestEn.y - p.y, closestEn.x - p.x);
              if (p.id === "fox") {
                const count = isT4 ? 5 : tier;
                for (let f = 0; f < count; f++) {
                  const fa = ang + (f - (count - 1) / 2) * (isT4 ? 0.18 : 0.24);
                  state.petProjectiles.push({
                    x: p.x, y: p.y, vx: Math.cos(fa) * 7.2, vy: Math.sin(fa) * 7.2,
                    angle: fa, color: isT4 ? "#fde047" : "#f97316", life: 64, element: "fire", tier, isT4, dmg: petBaseDmg, pierce: isT4 ? 3 : 1
                  });
                }
              } else if (p.id === "turtle") {
                const count = isT4 ? 3 : 1;
                for (let f = 0; f < count; f++) {
                  const fa = ang + (f - (count - 1) / 2) * 0.22;
                  state.petProjectiles.push({
                    x: p.x, y: p.y, vx: Math.cos(fa) * 6.4, vy: Math.sin(fa) * 6.4,
                    angle: fa, color: "#38bdf8", life: 72, element: "water", tier, isT4, dmg: petBaseDmg, pierce: isT4 ? 6 : (1 + tier)
                  });
                }
              } else if (p.id === "bird") {
                const count = isT4 ? 3 : 1;
                for (let f = 0; f < count; f++) {
                  const fa = ang + (f - (count - 1) / 2) * 0.16;
                  state.petProjectiles.push({
                    x: p.x, y: p.y, vx: Math.cos(fa) * 9.4, vy: Math.sin(fa) * 9.4,
                    angle: fa, color: "#facc15", life: 54, element: "thunder", tier, isT4, dmg: Math.round(petBaseDmg * 1.3), pierce: isT4 ? 4 : 1
                  });
                }
              } else {
                const count = isT4 ? 3 : 1;
                for (let f = 0; f < count; f++) {
                  const fa = ang + (f - (count - 1) / 2) * 0.2;
                  state.petProjectiles.push({
                    x: p.x, y: p.y, vx: Math.cos(fa) * 6.8, vy: Math.sin(fa) * 6.8,
                    angle: fa, color: "#4ade80", life: 70, element: "grass", tier, isT4, dmg: petBaseDmg, pierce: isT4 ? 4 : 2
                  });
                }
                if (isT4 && state.player.hp < state.player.maxHp) {
                  state.player.hp = Math.min(state.player.maxHp, state.player.hp + 2);
                }
              }
            }
          }

          p.skillTimer = (p.skillTimer || 0) + 1;
          const skInfo = WUXIA_PET_SKILLS_INFO[p.id] || WUXIA_PET_SKILLS_INFO.fox;
          const skillCd = Math.max(125, skInfo.cdFrames - (tier - 1) * 32);
          if (p.skillTimer >= skillCd && state.enemies.length > 0) {
            p.skillTimer = 0;
            const targetEn = state.enemies.find(e => e.type === "boss") || state.enemies[0];

            if (p.id === "fox" && targetEn) {
              const fx = targetEn.x, fy = targetEn.y;
              const rad = isT4 ? 155 : (72 + tier * 14);
              state.skillEffects.push({
                vfxType: isT4 ? "pet_fox_t4_golden_crow_sun" : "pet_fox_charm_array",
                x: fx, y: fy, px: p.x, py: p.y, r: rad, tier, life: isT4 ? 80 : 68, maxLife: isT4 ? 80 : 68
              });
              spawnShockwaveRing(fx, fy, 12, rad, isT4 ? "#fde047" : "#f472b6", 24, 5);
              spawnVFXParticles(fx, fy, isT4 ? 28 : 16, { type: "petal", colors: ["#fde047", "#f97316", "#f472b6", "#ffffff"], size: isT4 ? 9 : 7 });
              state.floatTexts.push({
                x: p.x, y: p.y - 24,
                text: isT4 ? `☀️【大日金烏 · 九尾焚天滅世陣】!` : `🦊【九尾妖炎魅惑陣】!`,
                color: isT4 ? "#fde047" : "#f472b6", life: 38
              });
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - fx, en.y - fy) < rad + 12) {
                  en.foxCharmedTimer = isT4 ? 240 : 160;
                  applyDamageToEnemy(en, petBaseDmg * (isT4 ? 3.8 : 2.2), "#fde047", isT4);
                }
              });
            } else if (p.id === "turtle") {
              state.player.frostShield = Math.min(state.player.maxShield || 120, (state.player.frostShield || 0) + (isT4 ? 65 : (22 + tier * 15)));
              const rad = isT4 ? 170 : (98 + tier * 16);
              state.skillEffects.push({
                vfxType: isT4 ? "pet_turtle_t4_abyss_dragon" : "pet_turtle_frost_nova",
                x: state.player.x, y: state.player.y, r: rad, tier, life: isT4 ? 72 : 48, maxLife: isT4 ? 72 : 48
              });
              spawnShockwaveRing(state.player.x, state.player.y, 14, rad, "#38bdf8", 26, 6);
              spawnVFXParticles(state.player.x, state.player.y, isT4 ? 28 : 18, { type: "shard", colors: ["#67e8f9", "#38bdf8", "#fde047", "#ffffff"], size: isT4 ? 9 : 8 });
              state.floatTexts.push({
                x: state.player.x, y: state.player.y - 26,
                text: isT4 ? `🌊【太古玄武 · 絕對零度冥海蒼龍界】!` : `🐢【玄武寒晶護盾 + 極凍冰封】!`,
                color: "#67e8f9", life: 38
              });
              updatePlayerVitalHUD();
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - state.player.x, en.y - state.player.y) < rad + 15) {
                  en.stunTimer = isT4 ? 180 : 95;
                  applyDamageToEnemy(en, petBaseDmg * (isT4 ? 3.5 : 2.0), "#67e8f9", true);
                }
              });
            } else if (p.id === "bird" && targetEn) {
              const ang = Math.atan2(targetEn.y - state.player.y, targetEn.x - state.player.x);
              const webPts = [{ x: p.x, y: p.y }];
              state.enemies.slice(0, isT4 ? 14 : 6).forEach(en => webPts.push({ x: en.x, y: en.y }));
              state.skillEffects.push({
                vfxType: isT4 ? "pet_bird_t4_thunder_phoenix" : "pet_bird_thunder_dive",
                x: state.player.x, y: state.player.y,
                tx: targetEn.x + Math.cos(ang) * 135, ty: targetEn.y + Math.sin(ang) * 135,
                points: webPts, angle: ang, tier, life: isT4 ? 48 : 34, maxLife: isT4 ? 48 : 34
              });
              state.floatTexts.push({
                x: p.x, y: p.y - 24,
                text: isT4 ? `🌩️【神霄雷凰 · 萬劫紫極天罰神雷網】!` : `🐥【天鵬紫電裂空俯衝】!`,
                color: "#facc15", life: 38
              });
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - targetEn.x, en.y - targetEn.y) < (isT4 ? 185 : (115 + tier * 15))) {
                  state.lightningBolts.push({ x: en.x, y: en.y, life: 18 });
                  if (isT4) en.stunTimer = Math.max(en.stunTimer || 0, 60);
                  applyDamageToEnemy(en, petBaseDmg * (isT4 ? 3.8 : 2.5), "#fde047", true);
                }
              });
            } else if (p.id === "deer") {
              const healAmt = isT4 ? 40 : (10 + tier * 6);
              state.player.hp = Math.min(state.player.maxHp, state.player.hp + healAmt);
              if (isT4) {
                state.player.frostShield = Math.min(state.player.maxShield || 120, (state.player.frostShield || 0) + 30);
              }
              state.player.speedBoostTimer = isT4 ? 220 : 150;
              const rad = isT4 ? 165 : (95 + tier * 15);
              state.skillEffects.push({
                vfxType: isT4 ? "pet_deer_t4_jianmu_sanctuary" : "pet_deer_blossom_sanctuary",
                x: state.player.x, y: state.player.y, r: rad, tier, life: isT4 ? 78 : 64, maxLife: isT4 ? 78 : 64
              });
              spawnVFXParticles(state.player.x, state.player.y, isT4 ? 28 : 18, { type: "petal", colors: ["#f9a8d4", "#4ade80", "#fde047", "#ffffff"], size: isT4 ? 9 : 7 });
              state.floatTexts.push({
                x: state.player.x, y: state.player.y - 26,
                text: isT4 ? `🌸【太古建木 · 萬仙桃源回春界 +${healAmt}HP/+30盾】!` : `🦌【長青花海甘霖 +${healAmt}HP】!`,
                color: "#4ade80", life: 38
              });
              updatePlayerVitalHUD();
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - state.player.x, en.y - state.player.y) < rad + 12) {
                  en.stunTimer = isT4 ? 140 : 78;
                  applyDamageToEnemy(en, petBaseDmg * (isT4 ? 3.2 : 1.8), "#4ade80", false);
                }
              });
            }
          }
        });

        const swordPositions = [];
        if (wep.id === "sword") {
          const swordCnt = 3 + (sLvs[0] || 1);
          const swordRad = 68;
          for (let i = 0; i < swordCnt; i++) {
            const ang = state.frame * 0.075 + (i * Math.PI * 2 / swordCnt);
            swordPositions.push({
              x: state.player.x + Math.cos(ang) * swordRad,
              y: state.player.y + Math.sin(ang) * swordRad,
              ang
            });
          }
        }

        // 更新持續型技能特效與動態粒子噴發
        const activeEffects = [];
        state.skillEffects.forEach(ef => {
          ef.life--;
          if (ef.vfxType === "sword_lotus_ring" || ef.vfxType === "saber_blood_tornado" || ef.vfxType === "chakram_yin_yang_orbit" || ef.vfxType === "cauldron_dragon_beams" || ef.vfxType === "banner_thunder_god_orbs") {
            ef.x = state.player.x;
            ef.y = state.player.y;
            if (ef.life % 14 === 0) {
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - ef.x, en.y - ef.y) < ef.r + en.r) {
                  applyDamageToEnemy(en, ef.dmg * 0.55, "#fde047", false);
                }
              });
            }
          } else if (ef.vfxType === "saber_cross_slash" || ef.vfxType === "spear_dragon_drill") {
            ef.x += ef.vx;
            ef.y += ef.vy;
            if (state.frame % 2 === 0) {
              spawnVFXParticles(ef.x, ef.y, 2, {
                type: ef.vfxType === "saber_cross_slash" ? "ember" : "spark",
                color: ef.vfxType === "saber_cross_slash" ? "#ef4444" : "#e879f9",
                size: 6, minLife: 8, maxLife: 14
              });
            }
            if (ef.life % 8 === 0) {
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - ef.x, en.y - ef.y) < (ef.r || 44) + en.r) {
                  applyDamageToEnemy(en, ef.dmg * 0.65, "#f87171", true);
                }
              });
            }
          } else if (ef.vfxType === "chakram_gravity_blackhole") {
            state.enemies.forEach(en => {
              const d = Math.hypot(en.x - ef.x, en.y - ef.y);
              if (d < ef.r + 35 && en.type !== "boss") {
                en.x += (ef.x - en.x) * 0.12;
                en.y += (ef.y - en.y) * 0.12;
              }
              if (d < ef.r && ef.life % 15 === 0) {
                applyDamageToEnemy(en, ef.dmg * 0.5, "#a78bfa", false);
              }
            });
          } else if (ef.vfxType === "cauldron_lava_zones") {
            if (ef.life % 16 === 0) {
              ef.zones.forEach(z => {
                spawnVFXParticles(z.x, z.y, 2, { type: "ember", colors: ["#f97316", "#fde047"], size: 6, gravity: -0.25 });
                state.enemies.forEach(en => {
                  if (Math.hypot(en.x - z.x, en.y - z.y) < z.r + en.r) {
                    applyDamageToEnemy(en, ef.dmg * 0.55, "#fb923c", false);
                  }
                });
              });
            }
          } else if (ef.vfxType === "spear_star_pillars") {
            if (ef.life % 15 === 0) {
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - ef.x, en.y - ef.y) < ef.r + 15) {
                  applyDamageToEnemy(en, ef.dmg * 0.55, "#c084fc", true);
                }
              });
            }
          } else if (ef.vfxType === "uni_vfx_golden_dragon") {
            ef.x = state.player.x;
            ef.y = state.player.y;
            if (ef.life % 12 === 0) {
              state.enemies.forEach(en => {
                if (Math.hypot(en.x - ef.x, en.y - ef.y) < ef.r + en.r + 10) {
                  applyDamageToEnemy(en, ef.dmg * 0.65, "#fde047", true);
                }
              });
            }
          } else if (ef.vfxType === "uni_vfx_crimson_lotus") {
            if (ef.life % 14 === 0 && ef.pools) {
              ef.pools.forEach(pl => {
                spawnVFXParticles(pl.x, pl.y, 2, { type: "ember", colors: ["#fde047", "#f97316", "#ef4444"], size: 6 });
                state.enemies.forEach(en => {
                  if (Math.hypot(en.x - pl.x, en.y - pl.y) < pl.r + en.r) {
                    applyDamageToEnemy(en, ef.dmg * 0.65, "#f97316", true);
                  }
                });
              });
            }
          } else if (ef.vfxType === "uni_vfx_void_blackhole") {
            state.enemies.forEach(en => {
              const d = Math.hypot(en.x - ef.x, en.y - ef.y);
              if (d < ef.r + 45 && en.type !== "boss") {
                en.x += (ef.x - en.x) * 0.15;
                en.y += (ef.y - en.y) * 0.15;
              }
              if (d < ef.r + en.r && ef.life % 13 === 0) {
                applyDamageToEnemy(en, ef.dmg * 0.65, "#818cf8", true);
              }
            });
          }
          if (ef.life > 0) activeEffects.push(ef);
        });
        state.skillEffects = activeEffects;

        // 更新玩家投射物與流光尾跡粒子
        const nextProjectiles = [];
        state.projectiles.forEach(p => {
          if (p.wepType === "chakram_disc" && p.life < p.maxLife * 0.5) {
            const backAng = Math.atan2(state.player.y - p.y, state.player.x - p.x);
            p.vx = Math.cos(backAng) * 7.4;
            p.vy = Math.sin(backAng) * 7.4;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (state.frame % 2 === 0) {
            spawnVFXParticles(p.x, p.y, 1, {
              type: p.wepType === "cauldron_bomb" ? "ember" : "spark",
              color: p.color, size: 4.5, minSpeed: 0.2, maxSpeed: 0.8, minLife: 6, maxLife: 11
            });
          }
          if (p.wepType === "cauldron_bomb" && p.life <= 0) {
            spawnShockwaveRing(p.x, p.y, 8, 56, "#f97316", 16, 4);
            spawnVFXParticles(p.x, p.y, 14, { type: "ember", colors: ["#fde047", "#f97316", "#ef4444"], size: 8 });
            state.skillEffects.push({
              vfxType: "cauldron_lava_zones",
              zones: [{ x: p.x, y: p.y, r: 48 }],
              lv: 1, life: 45, maxLife: 45, dmg: p.dmg
            });
            state.enemies.forEach(en => {
              if (Math.hypot(en.x - p.x, en.y - p.y) < 54 + en.r) {
                applyDamageToEnemy(en, p.dmg * 1.25, "#f97316", true);
              }
            });
          } else if (p.life > 0) {
            nextProjectiles.push(p);
          }
        });
        state.projectiles = nextProjectiles;

        state.petProjectiles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (state.frame % 3 === 0) {
            spawnVFXParticles(p.x, p.y, 1, { type: "ember", color: p.color, size: 4, minSpeed: 0.1, maxSpeed: 0.6, minLife: 6, maxLife: 10 });
          }
        });
        state.petProjectiles = state.petProjectiles.filter(p => p.life > 0);

        // 更新敵方投射物（骨弓毒箭、魔蠍火毒彈、鬼將死神鐮、Boss血月魔刃）與尾跡粒子
        const remEnemyProj = [];
        state.enemyProjectiles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (state.frame % 3 === 0) {
            spawnVFXParticles(p.x, p.y, 1, {
              type: p.projType === "wraith_scythe" ? "spark" : "ember",
              color: p.color || "#22c55e", size: 4.5, minSpeed: 0.2, maxSpeed: 0.7, minLife: 6, maxLife: 11
            });
          }
          if (Math.hypot(p.x - state.player.x, p.y - state.player.y) < 16) {
            const pDmg = p.projType === "boss_demon_blade" ? 16 : (p.projType === "wraith_scythe" ? 13 : (p.projType === "scorpion_fire" ? 11 : 9));
            const pName = p.projType === "boss_demon_blade" ? "魔尊血月魔刃" : (p.projType === "wraith_scythe" ? "九幽死神魔鐮" : (p.projType === "scorpion_fire" ? "赤炎火毒彈" : "綠毒骨箭"));
            damagePlayer(pDmg, pName);
            p.life = 0;
          }
          if (p.life > 0) remEnemyProj.push(p);
        });
        state.enemyProjectiles = remEnemyProj;

        const remGourds = [];
        state.gourdThrows.forEach(gt => {
          gt.progress += gt.speed;
          const t = Math.min(1, gt.progress);
          const arc = Math.sin(t * Math.PI) * 45;
          gt.x = (1 - t) * gt.startX + t * gt.targetX;
          gt.y = (1 - t) * gt.startY + t * gt.targetY - arc;
          if (gt.progress >= 1) {
            if (gt.targetBeast && gt.targetBeast.hp > 0) {
              gt.targetBeast.hp = 0;
              audio.playEpiphanyBell();
              spawnShockwaveRing(gt.targetX, gt.targetY, 6, 48, "#fde047", 18, 3.5);
              this.captureWildPet(gt.targetBeast.petId, state, !!gt.targetBeast.isDivineBeast);
            }
          } else {
            remGourds.push(gt);
          }
        });
        state.gourdThrows = remGourds;

        const wildInterval = (mode === "divine_beasts") ? 95 : ((mode === "pokemon") ? 125 : 190);
        if ((state.frame === 25 || state.frame % wildInterval === 0) && state.wildBeasts.length < 5) {
          spawnWildBeastEntity(mode === "divine_beasts" || (state.frame % (wildInterval * 2) === 0));
        }
        if (mode === "divine_beasts" && state.frame % 480 === 0) {
          v14.petGourds = (v14.petGourds || 0) + 1;
          updatePetPartyHUD();
        }

        const survivingHazards = [];
        state.hazardCircles.forEach(hc => {
          hc.life--;
          if (hc.life <= 0) {
            audio.playThunder();
            spawnShockwaveRing(hc.x, hc.y, 10, hc.r * 1.4, "#ef4444", 22, 5);
            spawnVFXParticles(hc.x, hc.y, 22, { type: "ember", colors: ["#ef4444", "#f97316", "#fde047"], size: 9, maxSpeed: 5 });
            if (Math.hypot(state.player.x - hc.x, state.player.y - hc.y) < hc.r) {
              damagePlayer(24, "九幽魔隕天降");
            }
          } else {
            survivingHazards.push(hc);
          }
        });
        state.hazardCircles = survivingHazards;

        // ==================== 魔物與巨型 BOSS 行為與專屬攻擊特效 ====================
        const survivingEnemies = [];
        state.enemies.forEach(en => {
          if (en.baseHitCd && en.baseHitCd > 0) en.baseHitCd--;
          if (en.phaseShieldTimer && en.phaseShieldTimer > 0) en.phaseShieldTimer--;
          if (en.foxCharmedTimer && en.foxCharmedTimer > 0) en.foxCharmedTimer--;

          const tx = (en.targetsCore && (mode === "defense" || mode === "hybrid")) ? state.springCore.x : state.player.x;
          const ty = (en.targetsCore && (mode === "defense" || mode === "hybrid")) ? state.springCore.y : state.player.y;
          const ang = Math.atan2(ty - en.y, tx - en.x);
          const distToTarget = Math.hypot(tx - en.x, ty - en.y);
          const effSpeed = en.speed * (en.foxCharmedTimer > 0 ? 0.55 : 1.0);

          if (en.stunTimer && en.stunTimer > 0) {
            en.stunTimer--;
          } else if (en.type === "charger") {
            // 🐺 幽冥妖狼：蓄力狂奔猛撲 + 雙道猩紅狼爪撕裂波特效
            en.chargeTimer = (en.chargeTimer || 0) + 1;
            if (en.chargeTimer > 80) {
              en.x += Math.cos(ang) * effSpeed * 2.5;
              en.y += Math.sin(ang) * effSpeed * 2.5;
              if (en.chargeTimer === 88) {
                state.skillEffects.push({
                  vfxType: "enemy_wolf_claw",
                  x: en.x + Math.cos(ang) * 14, y: en.y + Math.sin(ang) * 14,
                  angle: ang, life: 14, maxLife: 14
                });
              }
              if (en.chargeTimer > 112) en.chargeTimer = 0;
            } else {
              en.x += Math.cos(ang) * effSpeed * 0.82;
              en.y += Math.sin(ang) * effSpeed * 0.82;
            }
          } else if (en.type === "ranged") {
            // 🏹 綠毒骨弓：發射碧磷鬼火毒骨箭
            if (distToTarget > 155) {
              en.x += Math.cos(ang) * effSpeed;
              en.y += Math.sin(ang) * effSpeed;
            }
            en.rangedTimer = (en.rangedTimer || 0) + 1;
            if (en.rangedTimer >= 98) {
              en.rangedTimer = 0;
              state.enemyProjectiles.push({
                x: en.x, y: en.y,
                vx: Math.cos(ang) * 3.5, vy: Math.sin(ang) * 3.5,
                angle: ang, life: 72, color: "#4ade80", projType: "bone_arrow"
              });
            }
          } else if (en.type === "scorpion") {
            // 🦂 赤炎魔蠍：扇形三向熔岩爆裂火毒彈
            if (distToTarget > 135) {
              en.x += Math.cos(ang) * effSpeed;
              en.y += Math.sin(ang) * effSpeed;
            }
            en.rangedTimer = (en.rangedTimer || 0) + 1;
            if (en.rangedTimer >= 112) {
              en.rangedTimer = 0;
              for (let s = -1; s <= 1; s++) {
                const sAng = ang + s * 0.28;
                state.enemyProjectiles.push({
                  x: en.x, y: en.y,
                  vx: Math.cos(sAng) * 3.3, vy: Math.sin(sAng) * 3.3,
                  angle: sAng, life: 68, color: "#fb923c", projType: "scorpion_fire"
                });
              }
            }
          } else if (en.type === "wraith") {
            // 👻 九幽寒魄鬼將：飄忽逼近並擲出高速旋轉的「九幽噬魂彎月死神鐮」
            en.x += Math.cos(ang) * effSpeed;
            en.y += Math.sin(ang) * effSpeed;
            en.rangedTimer = (en.rangedTimer || 0) + 1;
            if (en.rangedTimer >= 120) {
              en.rangedTimer = 0;
              state.enemyProjectiles.push({
                x: en.x, y: en.y,
                vx: Math.cos(ang) * 3.6, vy: Math.sin(ang) * 3.6,
                angle: ang, life: 70, color: "#c084fc", projType: "wraith_scythe"
              });
            }
          } else if (en.type === "guardian") {
            // 🛡️ 撼山魔將：重步推進 + 周期性「撼山裂地波」
            en.x += Math.cos(ang) * effSpeed;
            en.y += Math.sin(ang) * effSpeed;
            en.rangedTimer = (en.rangedTimer || 0) + 1;
            if (en.rangedTimer >= 135 && distToTarget < 110) {
              en.rangedTimer = 0;
              spawnShockwaveRing(en.x, en.y, 8, 65, "#f59e0b", 18, 3.5);
            }
          } else if (en.type === "boss") {
            const distToPlayer = Math.hypot(state.player.x - en.x, state.player.y - en.y);
            if (distToPlayer > 245) {
              en.x = state.player.x + Math.cos(ang + Math.PI) * 125;
              en.y = state.player.y + Math.sin(ang + Math.PI) * 100;
              spawnShockwaveRing(en.x, en.y, 10, 65, "#ef4444", 16, 4);
              state.floatTexts.push({ x: en.x, y: en.y - 30, text: "⚡魔尊瞬步追擊！", color: "#f87171", life: 25 });
            } else {
              en.x += Math.cos(ang) * effSpeed;
              en.y += Math.sin(ang) * effSpeed;
            }
            en.slamTimer = (en.slamTimer || 0) + 1;
            if (en.slamTimer === 100) {
              state.hazardCircles.push({ x: state.player.x, y: state.player.y, r: 52, life: 44, maxLife: 44 });
            } else if (en.slamTimer >= (en.enraged ? 120 : 150)) {
              en.slamTimer = 0;
              const bladeCnt = en.enraged ? 10 : 8;
              spawnShockwaveRing(en.x, en.y, 12, 85, "#e11d48", 18, 4);
              for (let d = 0; d < bladeCnt; d++) {
                const bAng = (d * Math.PI * 2) / bladeCnt;
                state.enemyProjectiles.push({
                  x: en.x, y: en.y,
                  vx: Math.cos(bAng) * 3.2, vy: Math.sin(bAng) * 3.2,
                  angle: bAng, life: 82, color: "#f43f5e", projType: "boss_demon_blade"
                });
              }
            }
          } else {
            // 🩸 血刀門徒：近距離揮出暗紅血刀斬特效
            en.x += Math.cos(ang) * effSpeed;
            en.y += Math.sin(ang) * effSpeed;
            if (distToTarget < 38) {
              en.meleeSlashTimer = (en.meleeSlashTimer || 0) + 1;
              if (en.meleeSlashTimer >= 45) {
                en.meleeSlashTimer = 0;
                state.skillEffects.push({
                  vfxType: "enemy_cultist_slash",
                  x: en.x + Math.cos(ang) * 12, y: en.y + Math.sin(ang) * 12,
                  angle: ang, life: 12, maxLife: 12
                });
              }
            }
          }

          // 💥 魔物與巨型 Boss 近身接觸傷害判定（修復近身不會扣血與不會死亡的問題！）
          const distToHero = Math.hypot(en.x - state.player.x, en.y - state.player.y);
          if (distToHero < en.r + 12 && (!en.stunTimer || en.stunTimer <= 0)) {
            const contactDmg = en.type === "boss" ? 22 : (en.type === "guardian" || en.type === "wraith" || en.type === "scorpion" ? 14 : (en.type === "charger" ? 12 : 8));
            damagePlayer(contactDmg, en.name || "魔物");
          }

          // 🛡️ 靈泉守護模式下，魔物啃噬中央靈泉判定
          if ((mode === "defense" || mode === "hybrid") && en.targetsCore) {
            const distToSpring = Math.hypot(en.x - state.springCore.x, en.y - state.springCore.y);
            if (distToSpring < state.springCore.r + en.r) {
              en.meleeCoreCd = (en.meleeCoreCd || 0) + 1;
              if (en.meleeCoreCd >= 40) {
                en.meleeCoreCd = 0;
                state.springCore.hp = Math.max(0, state.springCore.hp - (en.type === "boss" ? 12 : 4));
                updatePlayerVitalHUD();
                if (state.springCore.hp <= 0 && mode === "defense") {
                  triggerBattleEnd(false, "中央八角白玉蓮華池遭魔潮摧毀，靈泉失守！");
                }
              }
            }
          }

          if (!en.baseHitCd || en.baseHitCd <= 0) {
            for (const sw of swordPositions) {
              if (Math.hypot(sw.x - en.x, sw.y - en.y) < en.r + 14) {
                en.baseHitCd = 16;
                applyDamageToEnemy(en, baseDmg * 0.85, "#38bdf8", false);
                break;
              }
            }
          }

          for (const p of state.projectiles) {
            if (p.life > 0 && Math.hypot(p.x - en.x, p.y - en.y) < en.r + 12) {
              if (p.wepType === "chakram_disc") {
                if (!en.baseHitCd || en.baseHitCd <= 0) {
                  en.baseHitCd = 14;
                  applyDamageToEnemy(en, p.dmg, p.color, false);
                }
              } else {
                applyDamageToEnemy(en, p.dmg, p.color, p.wepType === "spear_thrust");
                if (p.pierce && p.pierce > 1) p.pierce--;
                else p.life = 0;
              }
              break;
            }
          }

          for (const p of state.petProjectiles) {
            if (p.life > 0 && Math.hypot(p.x - en.x, p.y - en.y) < en.r + 10) {
              applyDamageToEnemy(en, p.dmg || 6, p.color, p.element === "thunder");
              if (p.element === "water") en.speed *= 0.85;
              if (p.pierce && p.pierce > 1) p.pierce--;
              else p.life = 0;
              break;
            }
          }

          if (en.hp <= 0) {
            state.kills++;
            state.combo++;
            v13.mowingTotalKills++;
            const isBossKill = (en.type === "boss");
            const isEliteKill = (en.type === "guardian" || en.type === "scorpion" || en.type === "wraith");

            spawnVFXParticles(en.x, en.y, isBossKill ? 32 : 10, {
              type: isBossKill ? "spark" : "ember",
              colors: isBossKill ? ["#fde047", "#ef4444", "#38bdf8", "#ffffff"] : ["#fde047", "#ef4444", "#38bdf8"],
              size: isBossKill ? 12 : 6.5
            });
            state.skillEffects.push({
              vfxType: "kill_soul_burst",
              x: en.x, y: en.y,
              r: isBossKill ? 115 : (isEliteKill ? 46 : 30),
              color: isBossKill ? "#fde047" : (isEliteKill ? "#c084fc" : "#38bdf8"),
              isBoss: isBossKill,
              life: isBossKill ? 28 : 16,
              maxLife: isBossKill ? 28 : 16
            });

            state.gems.push({
              x: en.x, y: en.y,
              val: isBossKill ? 10 : (isEliteKill ? 3 : 1),
              isHammer: isBossKill || (Math.random() < 0.2),
              isChest: isBossKill,
              isGourd: (state.kills % 14 === 0)
            });

            if (isBossKill) {
              audio.playLevelUp();
              v13.hammers += 6;
              state.gainedHammers += 6;
              state.gainedSoulGems += (en.isMiniBoss ? 8 : 18);
              v14.petGourds = (v14.petGourds || 0) + 3;
              showWaveBanner(`🏆 成功討伐巨型首領【${en.name}】！掉落寶箱 +3靈葫！`, false);
              updatePetPartyHUD();
              updateWaveProgressUI();
              updatePlayerVitalHUD();

              // 👑 若在第 10 波（waveIndex === 9）擊敗終極魔帝，立即彈出【戰鬥勝利】結算畫面！
              if (state.waveIndex >= 9 && !state.endlessContinued) {
                setTimeout(() => {
                  triggerBattleEnd(true, `成功斬殺第十波終極魔神【${en.name}】，平定山海魔劫！`);
                }, 320);
              }
            }
          } else {
            survivingEnemies.push(en);
          }
        });
        state.enemies = survivingEnemies;

        const magnetRadius = state.heldItems.includes("🧲磁鐵") ? 360 : 150;
        const remGems = [];
        state.gems.forEach(g => {
          const dist = Math.hypot(state.player.x - g.x, state.player.y - g.y);
          if (dist < magnetRadius) {
            g.x += (state.player.x - g.x) * 0.24;
            g.y += (state.player.y - g.y) * 0.24;
          }
          if (dist < 22) {
            state.runExp += g.val;
            const expGain = (55 + this.char.realmIndex * 30) * g.val;
            this.char.exp += expGain;
            state.gainedExp += expGain;

            state.companionPets.forEach(p => {
              p.exp = (p.exp || 0) + g.val * 2;
              if (p.exp >= p.maxExp && p.tier < 3) {
                p.tier++;
                p.exp = 0;
                p.maxExp = Math.floor(p.maxExp * 1.8);
                audio.playLevelUp();
                updatePetPartyHUD();
              }
            });

            if (g.isGourd) {
              v14.petGourds = (v14.petGourds || 0) + 1;
              updatePetPartyHUD();
            }
            if (g.isHammer) {
              v13.hammers += 1;
              state.gainedHammers += 1;
            }
            if (state.runExp >= state.runReqExp) {
              state.runExp -= state.runReqExp;
              state.runLv++;
              state.runReqExp = Math.floor(state.runReqExp * 1.32);
              state.skillEffects.push({
                vfxType: "levelup_ascension_pillar",
                x: state.player.x, y: state.player.y,
                life: 45, maxLife: 45
              });
              spawnShockwaveRing(state.player.x, state.player.y, 12, 135, "#fde047", 28, 5);
              spawnVFXParticles(state.player.x, state.player.y, 26, {
                type: "spark", colors: ["#fde047", "#38bdf8", "#ffffff"], size: 10, maxSpeed: 5.5
              });
              state.floatTexts.push({
                x: state.player.x, y: state.player.y - 36,
                text: `🌟 武道突破 Lv.${state.runLv}！`,
                color: "#fde047", life: 42
              });
              renderWeaponArsenalHUD();
              openWuxiaPerkChoice();
            }
          } else {
            remGems.push(g);
          }
        });
        state.gems = remGems;

        // ==================== v23.0 原生高解析度戰場與物理畫布 100% 徹底清屏（根治底部圖案重疊殘影！） ====================
        ctx.save();
        // 先以單位矩陣清除並塗滿整張物理畫布 (canvas.width × canvas.height)，確保任何長寬比下邊緣與底部絕無半點殘影！
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#17221b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.setTransform(state.renderScale, 0, 0, state.renderScale, 0, 0);
        ctx.imageSmoothingEnabled = false;

        ctx.save();
        ctx.translate(-state.camera.x, -state.camera.y);

        PixelSpriteEngine.drawPixelArena(ctx, WORLD_W, WORLD_H, state.frame, mode, state.springCore);

        // 繪製 Boss 九幽魔隕深淵六芒星鎖定大陣 + 墜落燃燒魔隕星
        state.hazardCircles.forEach(hc => {
          const prog = 1 - hc.life / (hc.maxLife || 44);
          ctx.save();
          ctx.translate(hc.x, hc.y);
          ctx.globalCompositeOperation = "lighter";

          // 深淵紅蓮漸變底圈
          const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, hc.r);
          grad.addColorStop(0, "rgba(239, 68, 68, 0.45)");
          grad.addColorStop(0.75, "rgba(185, 28, 28, 0.28)");
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, hc.r, 0, Math.PI * 2);
          ctx.fill();

          // 旋轉六芒星法陣與收縮鎖定環
          ctx.rotate(state.frame * 0.06);
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2.2;
          for (let t = 0; t < 2; t++) {
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
              const a = (t * Math.PI) / 3 + (i * Math.PI * 2) / 3;
              const rx = Math.cos(a) * hc.r * 0.88;
              const ry = Math.sin(a) * hc.r * 0.88;
              if (i === 0) ctx.moveTo(rx, ry);
              else ctx.lineTo(rx, ry);
            }
            ctx.closePath();
            ctx.stroke();
          }
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(0, 0, hc.r * (1 - prog * 0.85), 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // 從天急速墜落的燃燒魔隕巨石
          const meteorY = hc.y - hc.life * 3.8;
          const meteorX = hc.x + hc.life * 1.1;
          WuxiaHDVFXEngine.drawGlowOrb(ctx, meteorX, meteorY, 24, "#ffffff", "#f97316", "rgba(220, 38, 38, 0)");
          WuxiaHDVFXEngine.drawGlowOrb(ctx, meteorX + 8, meteorY - 14, 16, "#fde047", "#dc2626", "rgba(0,0,0,0)");
        });

        // ==================== 繪製 18 招武器專屬絕技 & 4 招靈寵大招 & 怪物近戰特效 ====================
        state.skillEffects.forEach(ef => {
          ctx.save();
          const prog = 1 - ef.life / (ef.maxLife || 40);

          // 1-1. 🪷 分元青蓮劍陣（三層漸變盛開青玉蓮華 + 6柄流光飛劍環）
          if (ef.vfxType === "sword_lotus_ring") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.05, "rgba(255,255,255,0.2)", "rgba(45,212,191,0.22)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * 0.95, 12, state.frame * 0.045, "rgba(13,148,136,0.25)", "rgba(45,212,191,0.75)", "#99f6e4");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * 0.65, 8, -state.frame * 0.065, "rgba(56,189,248,0.35)", "rgba(186,230,253,0.85)", "#ffffff");
            for (let k = 0; k < 6; k++) {
              const a = state.frame * 0.1 + (k * Math.PI) / 3;
              const sx = ef.x + Math.cos(a) * ef.r * 0.88;
              const sy = ef.y + Math.sin(a) * ef.r * 0.88;
              WuxiaHDVFXEngine.drawCrescentWave(ctx, sx, sy, 22, 7, a + Math.PI / 2, Math.PI * 0.65, "#06b6d4", "#67e8f9", "#ffffff");
            }
          }
          // 1-2. ☄️ 九曜貫日長虹（高能漸變激光劍柱 + 雙螺旋龍紋氣流）
          else if (ef.vfxType === "sword_giant_beam") {
            WuxiaHDVFXEngine.drawVolumetricBeam(ctx, ef.x, ef.y, ef.angle, ef.length, ef.width, "rgba(56,189,248,0.65)", "#fde047", "#ffffff", state.frame);
          }
          // 1-3. 🌧️ 太虛萬劍天瀑（金色蒼穹裂隙傳送門 + 拖曳流光長尾的寒霜飛劍雨 + 落地冰晶蓮）
          else if (ef.vfxType === "sword_sky_rain") {
            ef.drops.forEach(d => {
              const elapsed = ef.maxLife - ef.life - d.delay;
              if (elapsed >= 0) {
                const fallT = Math.min(1, elapsed / 12);
                const sx = d.tx - (1 - fallT) * 55;
                const sy = d.ty - (1 - fallT) * 145;
                if (fallT < 1) {
                  ctx.save();
                  ctx.globalCompositeOperation = "lighter";
                  const tailGrad = ctx.createLinearGradient(sx - 28, sy - 70, sx, sy);
                  tailGrad.addColorStop(0, "rgba(56,189,248,0)");
                  tailGrad.addColorStop(0.6, "rgba(56,189,248,0.7)");
                  tailGrad.addColorStop(1, "#ffffff");
                  ctx.strokeStyle = tailGrad;
                  ctx.lineWidth = 6;
                  ctx.beginPath();
                  ctx.moveTo(sx - 28, sy - 70);
                  ctx.lineTo(sx, sy);
                  ctx.stroke();
                  ctx.restore();
                  PixelSpriteEngine.draw(ctx, "SWORD", sx, sy, 2.4, false, false, Math.PI * 0.82);
                } else {
                  if (!d.exploded) {
                    d.exploded = true;
                    spawnShockwaveRing(d.tx, d.ty, 4, 34, "#60a5fa", 14, 2.5);
                    spawnVFXParticles(d.tx, d.ty, 4, { type: "shard", colors: ["#67e8f9", "#ffffff"], size: 6 });
                  }
                  WuxiaHDVFXEngine.drawBloomingLotus(ctx, d.tx, d.ty, 22, 6, d.delay, "rgba(56,189,248,0.3)", "rgba(186,230,253,0.75)", "#ffffff");
                }
              }
            });
          }
          // 2-0. 🩸 赤霄狂刀普攻：雙貝茲漸變赤金彎月刀浪
          else if (ef.vfxType === "saber_basic_arc") {
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, ef.r, 24, ef.angle, Math.PI * 0.92, "#991b1b", "#ef4444", "#fef08a");
          }
          // 2-1. ⚔️ 修羅十字斬月（交錯雙彎月流光血刃）
          else if (ef.vfxType === "saber_cross_slash") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.1, "rgba(254,240,138,0.4)", "rgba(239,68,68,0.35)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, ef.r, 20, ef.angle - 0.48, Math.PI * 0.85, "#7f1d1d", "#ef4444", "#ffffff");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, ef.r, 20, ef.angle + 0.48, Math.PI * 0.85, "#7f1d1d", "#f97316", "#fef08a");
          }
          // 2-2. 🌪️ 血海旋風屠戮（5層立體螺旋彎月刀刃風暴）
          else if (ef.vfxType === "saber_blood_tornado") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.05, "rgba(239,68,68,0.28)", "rgba(153,27,27,0.22)", "rgba(0,0,0,0)");
            for (let b = 0; b < 6; b++) {
              const a = state.frame * 0.2 + (b * Math.PI) / 3;
              const br = ef.r * (0.48 + (b % 3) * 0.22);
              WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, br, 15, a, Math.PI * 0.65, "#991b1b", b % 2 === 0 ? "#ef4444" : "#f97316", "#fef08a");
            }
          }
          // 2-3. 🪓 焚天裂地斷頭台（8道發光岩漿地裂星芒 + 巨型赤金龍紋魔刀法相）
          else if (ef.vfxType === "saber_guillotine_slam") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r, "#ffffff", "rgba(249,115,22,0.5)", "rgba(220,38,38,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * 0.92, 8, 0, "rgba(220,38,38,0.5)", "rgba(251,146,60,0.9)", "#fef08a");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y - 18, ef.r * 0.72, 28, Math.PI * 0.5, Math.PI * 0.7, "#7f1d1d", "#ef4444", "#fde047");
          }
          // 3-1. 🦅 百鳥朝鳳暴雨槍（12道紫金鳳羽流光錐形穿刺 + 展翅火鳳光暈）
          else if (ef.vfxType === "spear_phoenix_flurry") {
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, 46, 18, ef.angle, Math.PI * 1.1, "#ea580c", "#facc15", "#ffffff");
            for (let i = -5; i <= 5; i++) {
              const a = ef.angle + i * 0.11;
              const len = ef.range * (0.72 + ((state.frame + Math.abs(i) * 3) % 5) * 0.06);
              WuxiaHDVFXEngine.drawVolumetricBeam(ctx, ef.x, ef.y, a, len, 4.5, "rgba(232,121,249,0.55)", "#facc15", "#ffffff", state.frame + i);
            }
          }
          // 3-2. 🐉 蒼龍破陣貫星衝（10節動態擺動發光紫金星辰神龍真身）
          else if (ef.vfxType === "spear_dragon_drill") {
            for (let seg = 9; seg >= 0; seg--) {
              const sx = ef.x - Math.cos(ef.angle) * seg * 11 + Math.cos(ef.angle + Math.PI / 2) * Math.sin(state.frame * 0.35 - seg * 0.6) * 10;
              const sy = ef.y - Math.sin(ef.angle) * seg * 11 + Math.sin(ef.angle + Math.PI / 2) * Math.sin(state.frame * 0.35 - seg * 0.6) * 10;
              const sr = seg === 0 ? 22 : Math.max(8, 18 - seg * 1.1);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, sx, sy, sr, "#ffffff", seg % 2 === 0 ? "#c084fc" : "#fde047", "rgba(168,85,247,0)");
            }
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, 34, 14, ef.angle, Math.PI * 0.7, "#9333ea", "#fde047", "#ffffff");
          }
          // 3-3. ✨ 紫微星隕八荒陣（星空漸變六芒陣 + 分形紫電星光鎖鏈 + 6座星辰神槍柱）
          else if (ef.vfxType === "spear_star_pillars") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 0.95, "rgba(192,132,252,0.22)", "rgba(99,102,241,0.18)", "rgba(0,0,0,0)");
            for (let i = 0; i < ef.pillars.length; i++) {
              const p1 = ef.pillars[i];
              const p2 = ef.pillars[(i + 1) % ef.pillars.length];
              WuxiaHDVFXEngine.drawFractalLightning(ctx, p1.x, p1.y, p2.x, p2.y, "#c084fc", "#ffffff", state.frame + i);
              if (i % 2 === 0) {
                WuxiaHDVFXEngine.drawFractalLightning(ctx, ef.x, ef.y, p1.x, p1.y, "#818cf8", "#fde047", state.frame + i * 3);
              }
              WuxiaHDVFXEngine.drawGlowOrb(ctx, p1.x, p1.y, 18, "#ffffff", "#c084fc", "rgba(0,0,0,0)");
              PixelSpriteEngine.draw(ctx, "SWORD", p1.x, p1.y - 10, 2.3, false, false, Math.PI);
            }
          }
          // 4-1. 🔄 兩儀雙魚迴旋刃（無限符號軌道穿梭的發光陰陽雙魚法輪）
          else if (ef.vfxType === "chakram_yin_yang_orbit") {
            for (let k = 0; k < ef.count; k++) {
              const t = state.frame * 0.075 + (k * Math.PI * 2) / ef.count;
              const cx = ef.x + Math.cos(t) * ef.r;
              const cy = ef.y + Math.sin(t * 2) * (ef.r * 0.58);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, cx, cy, 24, "#ffffff", "#fde047", "rgba(56,189,248,0)");
              WuxiaHDVFXEngine.drawCrescentWave(ctx, cx, cy, 16, 8, state.frame * 0.25, Math.PI, "#0f172a", "#38bdf8", "#ffffff");
              WuxiaHDVFXEngine.drawCrescentWave(ctx, cx, cy, 16, 8, state.frame * 0.25 + Math.PI, Math.PI, "#b45309", "#fde047", "#ffffff");
            }
          }
          // 4-2. 🌌 乾坤顛倒引力漩渦（深邃黑洞視界 + 6條星雲旋臂 + 旋轉八卦金環）
          else if (ef.vfxType === "chakram_gravity_blackhole") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.1, "rgba(168,85,247,0.45)", "rgba(56,189,248,0.25)", "rgba(0,0,0,0)");
            for (let arm = 0; arm < 6; arm++) {
              const a = -state.frame * 0.08 + (arm * Math.PI) / 3;
              WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, ef.r * 0.78, 14, a, Math.PI * 0.65, "#4c1d95", "#a855f7", "#fde047");
            }
            ctx.fillStyle = "#090514";
            ctx.strokeStyle = "#fde047";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(ef.x, ef.y, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          // 4-3. 💫 周天星斗連鎖輪（敵群間璀璨星河閃電光橋 + 八角星芒爆裂）
          else if (ef.vfxType === "chakram_chain_bounce") {
            for (let i = 0; i < ef.points.length - 1; i++) {
              const p1 = ef.points[i], p2 = ef.points[i + 1];
              WuxiaHDVFXEngine.drawFractalLightning(ctx, p1.x, p1.y, p2.x, p2.y, "#fbbf24", "#ffffff", state.frame + i);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, p2.x, p2.y, 20, "#ffffff", "#fde047", "rgba(56,189,248,0)");
            }
          }
          // 5-1. 🌋 八荒紅蓮業火海（多層沸騰熔岩漸變湖 + 12瓣旋轉發光業火紅蓮）
          else if (ef.vfxType === "cauldron_lava_zones") {
            ef.zones.forEach(z => {
              WuxiaHDVFXEngine.drawGlowOrb(ctx, z.x, z.y, z.r * 1.15, "rgba(254,240,138,0.5)", "rgba(234,88,12,0.45)", "rgba(153,27,27,0)");
              WuxiaHDVFXEngine.drawBloomingLotus(ctx, z.x, z.y, z.r * 0.88, 10, state.frame * 0.05, "rgba(185,28,28,0.45)", "rgba(249,115,22,0.85)", "#fde047");
            });
          }
          // 5-2. 🔥 九龍吐火焚天陣（黃金神爐 + 6~8道螺旋烈焰龍息激光束）
          else if (ef.vfxType === "cauldron_dragon_beams") {
            const rot = state.frame * 0.05;
            for (let b = 0; b < ef.beams; b++) {
              const a = rot + (b * Math.PI * 2) / ef.beams;
              WuxiaHDVFXEngine.drawVolumetricBeam(ctx, ef.x, ef.y, a, ef.r, 11, "rgba(234,88,12,0.7)", "#facc15", "#ffffff", state.frame + b);
            }
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, 28, "#ffffff", "#f59e0b", "rgba(234,88,12,0)");
          }
          // 5-3. 🏆 大日乾坤鎮獄鼎（大日金輪 + 巨型赤金雕紋方鼎 + 三層烈焰震波）
          else if (ef.vfxType === "cauldron_giant_drop") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r, "#ffffff", "rgba(245,158,11,0.55)", "rgba(220,38,38,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * prog, 12, state.frame * 0.04, "rgba(245,158,11,0.4)", "rgba(239,68,68,0.8)", "#fef08a");
            ctx.fillStyle = "#b45309";
            ctx.strokeStyle = "#fef08a";
            ctx.lineWidth = 2.5;
            ctx.fillRect(ef.x - 18, ef.y - 24, 36, 28);
            ctx.strokeRect(ef.x - 18, ef.y - 24, 36, 28);
          }
          // 6-1. 🌩️ 五雷轟頂天罰柱（貫穿天地的高能紫金漸變雷柱 + 分形電蛇 + 六芒星雷池）
          else if (ef.vfxType === "banner_five_thunders") {
            ef.pillars.forEach((p, idx) => {
              WuxiaHDVFXEngine.drawVolumetricBeam(ctx, p.x, p.y - 220, Math.PI * 0.5, 220, 22, "rgba(192,132,252,0.75)", "#38bdf8", "#ffffff", state.frame + idx);
              WuxiaHDVFXEngine.drawFractalLightning(ctx, p.x, p.y - 210, p.x, p.y, "#c084fc", "#ffffff", state.frame + idx * 5);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 36, "#ffffff", "#c084fc", "rgba(56,189,248,0)");
            });
          }
          // 6-2. 🕸️ 神霄萬里連鎖電網（全場多分支高壓藍白分形閃電網）
          else if (ef.vfxType === "banner_chain_web") {
            for (let i = 0; i < ef.points.length - 1; i++) {
              const p1 = ef.points[i], p2 = ef.points[i + 1];
              WuxiaHDVFXEngine.drawFractalLightning(ctx, p1.x, p1.y, p2.x, p2.y, "#38bdf8", "#ffffff", state.frame + i * 2);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, p2.x, p2.y, 18, "#ffffff", "#38bdf8", "rgba(192,132,252,0)");
            }
          }
          // 6-3. 👑 九天紫極雷神法相（12連鼓雷神金輪 + 公轉球狀閃電向四周劈出雷蛇）
          else if (ef.vfxType === "banner_thunder_god_orbs") {
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y - 8, 36, 12, state.frame * 0.04, "rgba(250,204,21,0.4)", "rgba(192,132,252,0.8)", "#fef08a");
            for (let k = 0; k < ef.orbs; k++) {
              const a = state.frame * 0.095 + (k * Math.PI * 2) / ef.orbs;
              const ox = ef.x + Math.cos(a) * ef.r;
              const oy = ef.y + Math.sin(a) * (ef.r * 0.78);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, ox, oy, 18, "#ffffff", "#c084fc", "rgba(56,189,248,0)");
              WuxiaHDVFXEngine.drawFractalLightning(ctx, ef.x, ef.y, ox, oy, "#a855f7", "#fde047", state.frame + k);
            }
          }
          // 🐾 靈寵大招 1：🦊 九尾妖炎魅惑陣（盛開9瓣粉金妖蓮 + 搖曳九尾光影）
          else if (ef.vfxType === "pet_fox_charm_array") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r, "rgba(244,114,182,0.45)", "rgba(251,146,60,0.28)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * 0.92, 9, state.frame * 0.04, "rgba(236,72,153,0.45)", "rgba(251,191,36,0.85)", "#fdf2f8");
          }
          // 🐾 靈寵大招 2：🐢 玄武真水極凍冰封新星（12瓣極寒冰蓮 + 冰晶尖塔）
          else if (ef.vfxType === "pet_turtle_frost_nova") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r, "#ffffff", "rgba(56,189,248,0.45)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * (0.5 + prog * 0.5), 12, 0, "rgba(6,182,212,0.45)", "rgba(186,230,253,0.9)", "#ffffff");
          }
          // 🐾 靈寵大招 3：🐥 天鵬紫電裂空俯衝（黃金雷鵬光束 + 雙翼展開新月金芒）
          else if (ef.vfxType === "pet_bird_thunder_dive") {
            WuxiaHDVFXEngine.drawVolumetricBeam(ctx, ef.x, ef.y, ef.angle, Math.hypot(ef.tx - ef.x, ef.ty - ef.y), 18, "rgba(250,204,21,0.75)", "#c084fc", "#ffffff", state.frame);
            const midX = (ef.x + ef.tx) * 0.5, midY = (ef.y + ef.ty) * 0.5;
            WuxiaHDVFXEngine.drawCrescentWave(ctx, midX, midY, 55, 20, ef.angle, Math.PI * 1.15, "#ca8a04", "#fde047", "#ffffff");
          }
          // 🐾 靈寵大招 4：🦌 萬古長青花海甘霖（翡翠粉櫻雙層花海仙陣）
          else if (ef.vfxType === "pet_deer_blossom_sanctuary") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, state.player.x, state.player.y, ef.r, "rgba(74,222,128,0.35)", "rgba(244,114,182,0.22)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, state.player.x, state.player.y, ef.r * 0.88, 10, state.frame * 0.03, "rgba(34,197,94,0.35)", "rgba(249,168,212,0.8)", "#bbf7d0");
          }
          // 🌟 T4 太古聖獸大招 1：🦊🔥【大日金烏 · 九尾焚天滅世陣】（黑炎日冕巨日 + 雙層18瓣業火紅蓮 + 9道九尾赤金火龍束）
          else if (ef.vfxType === "pet_fox_t4_golden_crow_sun") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.15, "#ffffff", "rgba(249,115,22,0.55)", "rgba(220,38,38,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * 0.96, 16, state.frame * 0.05, "rgba(185,28,28,0.5)", "rgba(251,146,60,0.92)", "#fef08a");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, ef.r * 0.62, 9, -state.frame * 0.07, "rgba(244,114,182,0.5)", "#fde047", "#ffffff");
            for (let t = 0; t < 9; t++) {
              const a = state.frame * 0.08 + (t * Math.PI * 2) / 9;
              WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, ef.r * 0.82, 16, a, Math.PI * 0.55, "#991b1b", "#f97316", "#fef08a");
            }
          }
          // 🌟 T4 太古聖獸大招 2：🐢❄️【太古玄武 · 絕對零度冥海蒼龍界】（16瓣極光冰蓮 + 雙螺旋冰霜蒼龍 + 8座寒冰龍柱）
          else if (ef.vfxType === "pet_turtle_t4_abyss_dragon") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, state.player.x, state.player.y, ef.r * 1.1, "#ffffff", "rgba(56,189,248,0.52)", "rgba(6,182,212,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, state.player.x, state.player.y, ef.r * 0.95, 16, state.frame * 0.035, "rgba(8,145,178,0.48)", "rgba(103,232,249,0.92)", "#ffffff");
            for (let d = 0; d < 2; d++) {
              const baseA = state.frame * 0.1 + d * Math.PI;
              WuxiaHDVFXEngine.drawCrescentWave(ctx, state.player.x, state.player.y, ef.r * 0.78, 22, baseA, Math.PI * 0.95, "#0369a1", "#38bdf8", "#fde047");
            }
            for (let k = 0; k < 8; k++) {
              const a = (k * Math.PI) / 4 + state.frame * 0.02;
              const ix = state.player.x + Math.cos(a) * (ef.r * 0.85);
              const iy = state.player.y + Math.sin(a) * (ef.r * 0.85);
              WuxiaHDVFXEngine.drawGlowOrb(ctx, ix, iy, 22, "#ffffff", "#67e8f9", "rgba(0,0,0,0)");
            }
          }
          // 🌟 T4 太古聖獸大招 3：🐥⚡【神霄雷凰 · 萬劫紫極天罰神雷網】（百丈雙翼雷凰光束 + 10道紫金天罰雷柱 + 分形高壓閃電網）
          else if (ef.vfxType === "pet_bird_t4_thunder_phoenix") {
            WuxiaHDVFXEngine.drawVolumetricBeam(ctx, ef.x, ef.y, ef.angle, Math.hypot(ef.tx - ef.x, ef.ty - ef.y) * 1.3, 28, "rgba(192,132,252,0.8)", "#facc15", "#ffffff", state.frame);
            const midX = (ef.x + ef.tx) * 0.5, midY = (ef.y + ef.ty) * 0.5;
            WuxiaHDVFXEngine.drawCrescentWave(ctx, midX, midY, 85, 28, ef.angle, Math.PI * 1.25, "#7e22ce", "#facc15", "#ffffff");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, midX, midY, 62, 20, ef.angle, Math.PI * 1.1, "#0284c7", "#38bdf8", "#fef08a");
            if (ef.points && ef.points.length > 1) {
              for (let i = 0; i < ef.points.length - 1; i++) {
                const p1 = ef.points[i], p2 = ef.points[i + 1];
                WuxiaHDVFXEngine.drawFractalLightning(ctx, p1.x, p1.y, p2.x, p2.y, "#facc15", "#ffffff", state.frame + i);
              }
            }
          }
          // 🌟 T4 太古聖獸大招 4：🦌🌸【太古建木 · 萬仙桃源回春界】（三層20瓣粉櫻翡翠金蓮 + 8道發光建木桃花神藤）
          else if (ef.vfxType === "pet_deer_t4_jianmu_sanctuary") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, state.player.x, state.player.y, ef.r * 1.1, "rgba(254,240,138,0.45)", "rgba(74,222,128,0.42)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, state.player.x, state.player.y, ef.r * 0.96, 16, state.frame * 0.03, "rgba(21,128,61,0.45)", "rgba(74,222,128,0.88)", "#fef08a");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, state.player.x, state.player.y, ef.r * 0.68, 12, -state.frame * 0.045, "rgba(219,39,119,0.4)", "rgba(249,168,212,0.92)", "#ffffff");
            for (let v = 0; v < 8; v++) {
              const a = state.frame * 0.05 + (v * Math.PI) / 4;
              WuxiaHDVFXEngine.drawCrescentWave(ctx, state.player.x, state.player.y, ef.r * 0.85, 14, a, Math.PI * 0.6, "#15803d", "#4ade80", "#f9a8d4");
            }
          }
          // 🐺 幽冥妖狼撲擊爪痕特效
          else if (ef.vfxType === "enemy_wolf_claw") {
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, 26, 9, ef.angle - 0.2, Math.PI * 0.7, "#581c87", "#ef4444", "#fca5a5");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, 22, 7, ef.angle + 0.2, Math.PI * 0.7, "#581c87", "#a855f7", "#ffffff");
          }
          // 🩸 血刀門徒揮砍血月痕特效
          else if (ef.vfxType === "enemy_cultist_slash") {
            WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, 24, 8, ef.angle, Math.PI * 0.75, "#450a0a", "#ef4444", "#fef08a");
          }
          // 💥 擊殺靈魂爆裂特效 (PokéSurvivor Soul Burst)
          else if (ef.vfxType === "kill_soul_burst") {
            WuxiaHDVFXEngine.drawKillSoulBurst(ctx, ef.x, ef.y, prog, ef.r || 32, ef.color || "#38bdf8", !!ef.isBoss);
          }
          // 🌟 武道升級通天光柱特效 (PokéSurvivor Level-Up Ascension Pillar)
          else if (ef.vfxType === "levelup_ascension_pillar") {
            WuxiaHDVFXEngine.drawLevelUpAscensionPillar(ctx, state.player.x, state.player.y, prog);
          }
          // 🌌 通用無限神通 1：🐉【太初金龍護體真訣】（多條盤旋游動之太初黃金神龍真身 + 龍鱗金芒陣）
          else if (ef.vfxType === "uni_vfx_golden_dragon") {
            const dCnt = ef.dragons || 2;
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.05, "rgba(254,240,138,0.18)", "rgba(245,158,11,0.15)", "rgba(0,0,0,0)");
            for (let d = 0; d < dCnt; d++) {
              const headAng = state.frame * 0.11 + (d * Math.PI * 2) / dCnt;
              for (let s = 6; s >= 0; s--) {
                const sa = headAng - s * 0.14;
                const sr = ef.r * (0.86 + Math.sin(state.frame * 0.2 + s + d) * 0.08);
                const sx = ef.x + Math.cos(sa) * sr;
                const sy = ef.y + Math.sin(sa) * (sr * 0.84);
                const orbR = s === 0 ? 20 : Math.max(7, 16 - s * 1.3);
                WuxiaHDVFXEngine.drawGlowOrb(ctx, sx, sy, orbR, "#ffffff", s % 2 === 0 ? "#fde047" : "#f97316", "rgba(234,88,12,0)");
                if (s === 0) {
                  WuxiaHDVFXEngine.drawCrescentWave(ctx, sx, sy, 22, 10, sa + Math.PI / 2, Math.PI * 0.8, "#b45309", "#fde047", "#ffffff");
                }
              }
            }
          }
          // 🌌 通用無限神通 2：☄️【九天星辰隕滅大陣】（紫金彗星長尾星隕雨 + 落地八角星蓮爆裂）
          else if (ef.vfxType === "uni_vfx_star_meteor") {
            (ef.meteors || []).forEach(m => {
              const elapsed = ef.maxLife - ef.life - m.delay;
              if (elapsed >= 0) {
                const fallT = Math.min(1, elapsed / 13);
                const mx = m.tx + (1 - fallT) * 75;
                const my = m.ty - (1 - fallT) * 165;
                if (fallT < 1) {
                  WuxiaHDVFXEngine.drawVolumetricBeam(ctx, mx, my, Math.atan2(-165, 75), 85, 14, "rgba(192,132,252,0.75)", "#fde047", "#ffffff", state.frame);
                  WuxiaHDVFXEngine.drawGlowOrb(ctx, mx, my, 24, "#ffffff", "#c084fc", "rgba(250,204,21,0)");
                } else {
                  if (!m.exploded) {
                    m.exploded = true;
                    spawnShockwaveRing(m.tx, m.ty, 8, m.r, "#c084fc", 16, 4);
                    spawnVFXParticles(m.tx, m.ty, 8, { type: "spark", colors: ["#fde047", "#c084fc", "#ffffff"], size: 8 });
                    state.enemies.forEach(en => {
                      if (Math.hypot(en.x - m.tx, en.y - m.ty) < m.r + en.r) {
                        applyDamageToEnemy(en, ef.dmg * 1.45, "#fde047", true);
                      }
                    });
                  }
                  WuxiaHDVFXEngine.drawBloomingLotus(ctx, m.tx, m.ty, m.r * 0.82, 8, state.frame * 0.05, "rgba(147,51,234,0.45)", "rgba(250,204,21,0.9)", "#ffffff");
                }
              }
            });
          }
          // 🌌 通用無限神通 3：❄️【瑤池太陰寒霜劍嵐】（雙層12瓣極光冰蓮 + 8道向外擴張寒霜新月劍浪）
          else if (ef.vfxType === "uni_vfx_frost_nova") {
            const curR = ef.r * (0.35 + prog * 0.65);
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, curR * 1.1, "#ffffff", "rgba(56,189,248,0.45)", "rgba(0,0,0,0)");
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, ef.x, ef.y, curR * 0.92, 12, state.frame * 0.05, "rgba(2,132,199,0.45)", "rgba(125,211,252,0.9)", "#ffffff");
            for (let k = 0; k < 8; k++) {
              const a = state.frame * 0.08 + (k * Math.PI) / 4;
              const bx = ef.x + Math.cos(a) * (curR * 0.75);
              const by = ef.y + Math.sin(a) * (curR * 0.75);
              WuxiaHDVFXEngine.drawCrescentWave(ctx, bx, by, 26, 9, a, Math.PI * 0.75, "#0369a1", "#67e8f9", "#ffffff");
            }
          }
          // 🌌 通用無限神通 4：🪷【大日紅蓮焚世業火】（14瓣大日業火紅蓮池 + 沖天金紅火柱）
          else if (ef.vfxType === "uni_vfx_crimson_lotus") {
            (ef.pools || []).forEach((pl, idx) => {
              WuxiaHDVFXEngine.drawGlowOrb(ctx, pl.x, pl.y, pl.r * 1.15, "#ffffff", "rgba(249,115,22,0.5)", "rgba(185,28,28,0)");
              WuxiaHDVFXEngine.drawBloomingLotus(ctx, pl.x, pl.y, pl.r * 0.92, 14, state.frame * 0.06 + idx, "rgba(185,28,28,0.55)", "rgba(251,146,60,0.92)", "#fef08a");
              WuxiaHDVFXEngine.drawVolumetricBeam(ctx, pl.x, pl.y, -Math.PI * 0.5, 95, 16, "rgba(239,68,68,0.65)", "#fde047", "#ffffff", state.frame + idx);
            });
          }
          // 🌌 通用無限神通 5：⚡【混沌紫霄神雷天網】（全場紫金與青藍雙色分形高壓閃電巨網）
          else if (ef.vfxType === "uni_vfx_chaos_thunder") {
            if (ef.points && ef.points.length > 1) {
              for (let i = 0; i < ef.points.length - 1; i++) {
                const p1 = ef.points[i], p2 = ef.points[i + 1];
                WuxiaHDVFXEngine.drawFractalLightning(ctx, p1.x, p1.y, p2.x, p2.y, "#c084fc", "#fef08a", state.frame + i * 3);
                WuxiaHDVFXEngine.drawGlowOrb(ctx, p2.x, p2.y, 20, "#ffffff", "#a855f7", "rgba(250,204,21,0)");
              }
            }
          }
          // 🌌 通用無限神通 6：🌌【太虛萬象引力奇點】（深邃黑洞視界 + 8道紫青螺旋次元刃 + 內部閃電裂隙）
          else if (ef.vfxType === "uni_vfx_void_blackhole") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, ef.x, ef.y, ef.r * 1.15, "rgba(129,140,248,0.5)", "rgba(56,189,248,0.28)", "rgba(0,0,0,0)");
            for (let arm = 0; arm < 8; arm++) {
              const a = -state.frame * 0.1 + (arm * Math.PI) / 4;
              WuxiaHDVFXEngine.drawCrescentWave(ctx, ef.x, ef.y, ef.r * 0.85, 15, a, Math.PI * 0.7, "#312e81", arm % 2 === 0 ? "#818cf8" : "#38bdf8", "#ffffff");
            }
            ctx.fillStyle = "#05030a";
            ctx.strokeStyle = "#fde047";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(ef.x, ef.y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();
        });

        const gemBob = Math.sin(state.frame * 0.15) * 2;
        state.gems.forEach(g => {
          if (g.isChest) PixelSpriteEngine.draw(ctx, "BOSS_CHEST", g.x, g.y + gemBob, 2.3);
          else if (g.isGourd) PixelSpriteEngine.draw(ctx, "POKE_GOURD", g.x, g.y + gemBob, 2);
          else if (g.isHammer) PixelSpriteEngine.draw(ctx, "HAMMER", g.x, g.y + gemBob, 2);
          else PixelSpriteEngine.draw(ctx, "EXP_GEM", g.x, g.y + gemBob, 2);
        });

        state.wildBeasts.forEach(wb => {
          if (wb.hp > 0) {
            PixelSpriteEngine.drawWildBeastWithPrompt(ctx, wb, state.player, state.frame, state.camera, state.viewW);
          }
        });

        state.gourdThrows.forEach(gt => {
          WuxiaHDVFXEngine.drawGlowOrb(ctx, gt.x, gt.y, 18, "#ffffff", "#fbbf24", "rgba(0,0,0,0)");
          PixelSpriteEngine.draw(ctx, "POKE_GOURD", gt.x, gt.y, 2.2, false, false, state.frame * 0.25);
        });

        // 繪製所有魔物與巨型 Boss（含冰雕晶體特效與魅惑妖火光環）
        state.enemies.forEach(en => {
          PixelSpriteEngine.drawEnemy(ctx, en, state.player.x, state.frame);
          if (en.stunTimer && en.stunTimer > 0) {
            WuxiaHDVFXEngine.drawBloomingLotus(ctx, en.x, en.y, en.r * 1.15, 6, 0, "rgba(56,189,248,0.4)", "rgba(186,230,253,0.85)", "#ffffff");
          }
          if (en.foxCharmedTimer && en.foxCharmedTimer > 0) {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, en.x, en.y - en.r, 12, "#ffffff", "#f472b6", "rgba(244,114,182,0)");
          }
        });

        state.companionPets.forEach((p, idx) => {
          PixelSpriteEngine.drawCompanionPet(ctx, p, idx, state.frame);
        });

        const isHeroMoving = (Math.abs(state.player.x - state.player.targetX) > 2 || Math.abs(state.player.y - state.player.targetY) > 2);
        const isHeroFlip = (state.player.targetX < state.player.x);
        // 繪製角色專屬道體光環、手持本命神兵與頭頂高對比度生命／護盾條
        WuxiaHDVFXEngine.drawGlowOrb(ctx, state.player.x, state.player.y, 28, "#ffffff", curSkin.auraColor || "rgba(56,189,248,0.4)", "rgba(0,0,0,0)");
        PixelSpriteEngine.drawHero(ctx, state.player, state.frame, isHeroMoving, isHeroFlip, state.weaponId, curSkin.id, state.baseAtkTimer);
        {
          const bw = 38, bh = 5;
          const bx = state.player.x - bw / 2, by = state.player.y - 28;
          ctx.fillStyle = "rgba(0,0,0,0.85)";
          ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 5);
          const hpRatio = Math.max(0, Math.min(1, state.player.hp / Math.max(1, state.player.maxHp)));
          ctx.fillStyle = hpRatio > 0.35 ? "#22c55e" : "#ef4444";
          ctx.fillRect(bx, by, bw * hpRatio, bh);
          if (state.player.frostShield > 0) {
            const shRatio = Math.max(0, Math.min(1, state.player.frostShield / Math.max(1, state.player.maxShield || 60)));
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(bx, by + bh, bw * shRatio, 3);
          }
        }

        // 主角「🐢玄武寒晶護盾」高清折射光罩
        if (state.player.frostShield > 0) {
          WuxiaHDVFXEngine.drawGlowOrb(ctx, state.player.x, state.player.y, 28, "rgba(255,255,255,0.15)", "rgba(56,189,248,0.35)", "rgba(0,0,0,0)");
          WuxiaHDVFXEngine.drawBloomingLotus(ctx, state.player.x, state.player.y, 24, 6, state.frame * 0.04, "rgba(6,182,212,0.2)", "rgba(103,232,249,0.7)", "#ffffff");
        }

        // 繪製環身飛劍與漸變彗星流光尾帶
        swordPositions.forEach(sw => {
          WuxiaHDVFXEngine.drawCrescentWave(ctx, state.player.x, state.player.y, 68, 8, sw.ang - 0.35, 0.7, "rgba(6,182,212,0.3)", "#38bdf8", "#ffffff");
          PixelSpriteEngine.draw(ctx, "SWORD", sw.x, sw.y, 2.0, false, false, sw.ang + Math.PI / 2);
        });

        // 繪製玩家武器普攻投射物（高清流光漸變版）
        state.projectiles.forEach(p => {
          if (p.wepType === "sword_bolt") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 16, "#ffffff", "#38bdf8", "rgba(56,189,248,0)");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 14, 7, p.angle, Math.PI * 0.75, "#0284c7", "#67e8f9", "#ffffff");
            PixelSpriteEngine.draw(ctx, "SWORD", p.x, p.y, 2.0, false, false, p.angle + Math.PI / 2);
          } else if (p.wepType === "spear_thrust") {
            WuxiaHDVFXEngine.drawVolumetricBeam(ctx, p.x - Math.cos(p.angle) * 24, p.y - Math.sin(p.angle) * 24, p.angle, 42, 8, "rgba(192,132,252,0.75)", "#fde047", "#ffffff", state.frame);
          } else if (p.wepType === "chakram_disc") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 20, "#ffffff", "#fde047", "rgba(56,189,248,0)");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 13, 6, state.frame * 0.3, Math.PI, "#1e293b", "#38bdf8", "#ffffff");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 13, 6, state.frame * 0.3 + Math.PI, Math.PI, "#b45309", "#fde047", "#ffffff");
          } else if (p.wepType === "cauldron_bomb") {
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 22, "#ffffff", "#f97316", "rgba(220,38,38,0)");
            PixelSpriteEngine.draw(ctx, "PROJ_FIRE_LOTUS", p.x, p.y, 2.2, false, false, state.frame * 0.22);
          } else {
            PixelSpriteEngine.drawPlayerProjectile(ctx, p, state.frame);
          }
        });

        // 繪製四系靈寵投射物（外加流光光暈）
        state.petProjectiles.forEach(p => {
          WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 15, "#ffffff", p.color, "rgba(0,0,0,0)");
          PixelSpriteEngine.drawPetProjectile(ctx, p, state.frame);
        });

        // ==================== 繪製重造後之怪物與巨型 Boss 攻擊特效 ====================
        state.enemyProjectiles.forEach(p => {
          const ang = p.angle !== undefined ? p.angle : Math.atan2(p.vy, p.vx);
          if (p.projType === "bone_arrow") {
            // 🏹 綠毒骨弓：碧磷鬼火毒骨箭（綠光毒霧 + 慘白骨箭）
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 15, "#ffffff", "#22c55e", "rgba(21,128,61,0)");
            WuxiaHDVFXEngine.drawVolumetricBeam(ctx, p.x - Math.cos(ang) * 14, p.y - Math.sin(ang) * 14, ang, 22, 4, "rgba(34,197,94,0.7)", "#86efac", "#ffffff", state.frame);
          } else if (p.projType === "scorpion_fire") {
            // 🦂 赤炎魔蠍：熔岩火毒流星球
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 18, "#fef08a", "#ea580c", "rgba(153,27,27,0)");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 11, 5, ang, Math.PI * 0.85, "#7c2d12", "#f97316", "#fde047");
          } else if (p.projType === "wraith_scythe") {
            // 👻 九幽寒魄鬼將：高速自轉的紫青雙彎月死神魔鐮
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 18, "#ffffff", "#a855f7", "rgba(6,182,212,0)");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 14, 6, state.frame * 0.32, Math.PI * 0.85, "#3b0764", "#c084fc", "#67e8f9");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 14, 6, state.frame * 0.32 + Math.PI, Math.PI * 0.85, "#083344", "#22d3ee", "#ffffff");
          } else {
            // 👑 巨型 Boss：八方九幽血月魔刃（巨型黑紅金三色彎月斬波）
            WuxiaHDVFXEngine.drawGlowOrb(ctx, p.x, p.y, 22, "#fef08a", "#e11d48", "rgba(136,19,55,0)");
            WuxiaHDVFXEngine.drawCrescentWave(ctx, p.x, p.y, 18, 8, ang, Math.PI * 0.9, "#4c0519", "#f43f5e", "#fef08a");
          }
        });

        // 繪製分形閃電雷擊
        state.lightningBolts.forEach(lb => {
          WuxiaHDVFXEngine.drawFractalLightning(ctx, lb.x + (Math.random() - 0.5) * 20, lb.y - 175, lb.x, lb.y, "#c084fc", "#ffffff", state.frame + lb.life);
          WuxiaHDVFXEngine.drawGlowOrb(ctx, lb.x, lb.y, 26, "#ffffff", "#c084fc", "rgba(0,0,0,0)");
          lb.life--;
        });
        state.lightningBolts = state.lightningBolts.filter(l => l.life > 0);

        // 繪製並更新全域高清流光粒子池
        const remParticles = [];
        state.vfxParticles.forEach(pt => {
          WuxiaHDVFXEngine.drawParticle(ctx, pt);
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life--;
          if (pt.life > 0) remParticles.push(pt);
        });
        state.vfxParticles = remParticles;

        if (state.floatTexts.length > 14) {
          state.floatTexts = state.floatTexts.slice(-14);
        }
        // 自動防重疊排斥演算：避免多招技能名稱與暴擊數字在畫面中央疊成一團
        for (let i = 0; i < state.floatTexts.length; i++) {
          for (let j = i + 1; j < state.floatTexts.length; j++) {
            const a = state.floatTexts[i];
            const b = state.floatTexts[j];
            if (Math.abs(a.x - b.x) < 92 && Math.abs(a.y - b.y) < 13) {
              b.y = a.y - 13;
            }
          }
        }
        state.floatTexts.forEach(ft => {
          ctx.save();
          ctx.font = "bold 10.5px monospace";
          ctx.textAlign = "center";
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(0, 0, 0, 0.92)";
          ctx.strokeText(ft.text, ft.x, ft.y);
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
          ft.y -= 0.85;
          ft.life--;
        });
        state.floatTexts = state.floatTexts.filter(ft => ft.life > 0);

        ctx.restore(); // 結束相機平移

        // 螢幕空間：雷達微縮小地圖
        const mw = 72;
        const mh = 54;
        const mx = state.viewW - mw - 6;
        const my = 32;
        const sx = mw / WORLD_W;
        const sy = mh / WORLD_H;

        ctx.save();
        ctx.fillStyle = "rgba(18, 15, 13, 0.86)";
        ctx.fillRect(mx, my, mw, mh);
        ctx.strokeStyle = "#c9933b";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(mx, my, mw, mh);

        state.enemies.forEach(en => {
          if (en.type === "boss") {
            ctx.fillStyle = "#facc15";
            ctx.fillRect(mx + en.x * sx - 3, my + en.y * sy - 3, 7, 7);
          } else {
            ctx.fillStyle = "#f87171";
            ctx.fillRect(mx + en.x * sx - 1, my + en.y * sy - 1, 2, 2);
          }
        });

        // 在小地圖雷達上繪製閃爍的野生靈獸／升級版太古四聖獸標記
        state.wildBeasts.forEach(wb => {
          if (wb.hp > 0) {
            ctx.fillStyle = wb.isDivineBeast ? "#fde047" : "#38bdf8";
            ctx.fillRect(mx + wb.x * sx - 3, my + wb.y * sy - 3, 6, 6);
          }
        });

        ctx.fillStyle = "#22c55e";
        ctx.fillRect(mx + state.player.x * sx - 2, my + state.player.y * sy - 2, 4, 4);
        ctx.restore();

        // 🧭 當野生靈獸或太古四聖獸位於鏡頭視野外時，於畫面邊緣繪製高顯眼且絕不裁切之「方向指引箭頭與抓寵提示」！
        state.wildBeasts.forEach(wb => {
          if (wb.hp <= 0) return;
          const screenX = wb.x - state.camera.x;
          const screenY = wb.y - state.camera.y;
          if (screenX < 20 || screenX > state.viewW - 20 || screenY < 30 || screenY > state.viewH - 25) {
            const ang = Math.atan2(wb.y - state.player.y, wb.x - state.player.x);
            const distM = Math.round(Math.hypot(wb.x - state.player.x, wb.y - state.player.y));

            ctx.save();
            const txt = `🧭${wb.isDivineBeast ? '🌟聖獸' : '🐾靈獸'}【${wb.name}】${distM}m (按F)`;
            ctx.font = "bold 9px monospace";
            const boxW = ctx.measureText(txt).width + 10;
            const rawX = state.viewW / 2 + Math.cos(ang) * (state.viewW * 0.42);
            const rawY = state.viewH / 2 + Math.sin(ang) * (state.viewH * 0.38);
            const indX = Math.max(boxW / 2 + 6, Math.min(state.viewW - boxW / 2 - 6, rawX));
            const indY = Math.max(38, Math.min(state.viewH - 14, rawY));

            ctx.fillStyle = wb.isDivineBeast ? "rgba(124, 45, 18, 0.94)" : "rgba(15, 23, 42, 0.92)";
            ctx.fillRect(indX - boxW / 2, indY - 8, boxW, 16);
            ctx.strokeStyle = wb.isDivineBeast ? "#fde047" : "#38bdf8";
            ctx.lineWidth = 1.4;
            ctx.strokeRect(indX - boxW / 2, indY - 8, boxW, 16);
            ctx.fillStyle = wb.isDivineBeast ? "#fef08a" : "#7dd3fc";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(txt, indX, indY);
            ctx.restore();
          }
        });

        const lvEl = wrap.querySelector("#v13-hud-lv");
        const kEl = wrap.querySelector("#v13-hud-kills");
        const lEl = wrap.querySelector("#v13-hud-loot");
        if (lvEl) lvEl.innerText = `${wep.icon}${wep.shortName} Lv.${state.runLv}(${Math.floor(state.runExp / state.runReqExp * 100)}%)`;
        if (kEl) kEl.innerText = `第${wCfg.wave}波|斬:${state.kills}|寵:${state.companionPets.length}/4`;
        if (lEl) lEl.innerText = `❤️${Math.max(0, Math.ceil(state.player.hp))}/${state.player.maxHp}|🛡️${Math.max(0, Math.ceil(state.player.frostShield || 0))}`;
        if (state.frame % 30 === 0) {
          updatePlayerVitalHUD();
          updateCaptureRadarBanner();
        }

        ctx.restore();
      }

      this._v13MowRaf = requestAnimationFrame(loop);
    };

    this._v13MowRaf = requestAnimationFrame(loop);
  };


App.prototype.renderV12MartialView = function(container) {
    const v13 = this.char.ensureV13AddictiveState();
    const st = this.char.ensureStoryState();
    const flavor = this.char.getCustomSkillFlavorProfile();

    let totalMultBonus = 0;
    v13.mergeBoard.forEach(lv => {
      if (lv > 0) {
        const m = V14_MERGE_WUXIA_BOOKS[Math.min(V14_MERGE_WUXIA_BOOKS.length - 1, lv - 1)];
        if (m) totalMultBonus += m.multBonus;
      }
    });

    const cellsHtml = v13.mergeBoard.map((lv, idx) => {
      if (!lv || lv <= 0) {
        return `
          <div class="wuxia-merge-cell" data-merge-idx="${idx}">
            <span style="font-size:0.75rem; color:var(--ink-light);">空陣眼</span>
          </div>
        `;
      }
      const meta = V14_MERGE_WUXIA_BOOKS[Math.min(V14_MERGE_WUXIA_BOOKS.length - 1, lv - 1)];
      const isSel = (v13.selectedMergeIdx === idx);
      return `
        <div class="wuxia-merge-cell ${isSel ? 'selected' : ''} ${lv >= 4 ? 'master' : ''}" data-merge-idx="${idx}">
          <div style="font-size:1.55rem; line-height:1.1;">${meta.icon}</div>
          <div style="font-size:0.76rem; font-weight:900; color:var(--ink-black); margin-top:2px;">Lv.${lv} ${meta.name}</div>
          <div style="font-size:0.68rem; color:var(--cinnabar-red); font-weight:800;">功力 +${Math.round(meta.multBonus * 100)}%</div>
        </div>
      `;
    }).join("");

    const wrap = document.createElement("div");
    wrap.className = "wuxia-hebi-container";
    wrap.innerHTML = `
      <div class="wuxia-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="wuxia-title-badge">武學二合一</span>
            <b style="font-size:1.12rem; color:var(--ink-black); margin-left:6px;">📖 八卦武經殘篇推演（極境 Lv.${v13.highestMergeLv}）</b>
          </div>
          <span style="font-size:0.92rem; font-weight:900; color:var(--cinnabar-red);">真武乘算：×${(1 + totalMultBonus).toFixed(2)}</span>
        </div>
        <div style="font-size:0.84rem; color:var(--ink-mid); margin:6px 0;">
          融合天下武學真意！點選兩卷同階武經即可合二為一，突破至【獨孤劍意 / 降龍神掌 / 太玄神解】等無上真經，永久翻倍全屬性並解鎖天命演武宗師心法！
        </div>

        <div class="wuxia-merge-grid" id="v13-merge-board-box">
          ${cellsHtml}
        </div>

        <div style="display:grid; grid-template-columns: 1.25fr 1fr; gap:8px; margin-top:10px;">
          <button type="button" class="btn-jade" id="btn-v14-spawn-merge" style="padding:11px;">
            <span class="main-label" style="font-size:1.08rem;">✨ 領悟武穆殘篇 (免費連點！)</span>
            <span class="sub-label">推演八卦陣眼 · 隨時二合一升階</span>
          </button>
          <button type="button" class="btn-jade" id="btn-v14-auto-merge-all" style="padding:11px; border-color:var(--cinnabar-red);">
            <span class="main-label" style="font-size:1.05rem; color:var(--cinnabar-red);">⚡ 一鍵全盤武學合真！</span>
            <span class="sub-label">自動融合所有同階真經</span>
          </button>
        </div>
      </div>

      <!-- 本命神通意境與俠道風骨 -->
      <div class="wuxia-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:1.02rem; color:var(--ink-black);">🗡️ 本命絕學：【${(this.char.customSkill && this.char.customSkill.name) || '太初萬劍歸宗'}】</b>
          <span style="font-size:0.9rem; font-weight:900; color:var(--stone-cyan);">殺傷威能：${flavor.totalPowerPct + v13.highestMergeLv * 45}%</span>
        </div>
        <div style="font-size:0.86rem; color:var(--ink-dark); margin-top:6px; line-height:1.55;">
          • <b>俠骨形態：</b>${flavor.formTitle}<br/>
          • <b>專屬道韻風骨：</b>【${flavor.wudaoTag}】${flavor.wudaoEffect} ｜ ${flavor.karmaFlavor}
        </div>
      </div>
    `;
    container.appendChild(wrap);

    wrap.querySelectorAll("[data-merge-idx]").forEach(cell => {
      cell.addEventListener("click", (e) => {
        const idx = parseInt(cell.getAttribute("data-merge-idx"), 10);
        const lv = v13.mergeBoard[idx] || 0;
        if (lv <= 0) {
          v13.mergeBoard[idx] = Math.max(1, Math.min(4, v13.highestMergeLv - 2));
          audio.playQiCharge();
          this.renderView();
          return;
        }
        if (v13.selectedMergeIdx === -1) {
          v13.selectedMergeIdx = idx;
          this.renderView();
          return;
        }
        if (v13.selectedMergeIdx === idx) {
          v13.selectedMergeIdx = -1;
          this.renderView();
          return;
        }
        const prevIdx = v13.selectedMergeIdx;
        const prevLv = v13.mergeBoard[prevIdx];
        if (prevLv === lv && lv < 10) {
          v13.mergeBoard[idx] = lv + 1;
          v13.mergeBoard[prevIdx] = 0;
          v13.selectedMergeIdx = -1;
          if (lv + 1 > v13.highestMergeLv) {
            v13.highestMergeLv = lv + 1;
            this.char.ensureV12State().customSkillFormTier = Math.min(4, Math.ceil(v13.highestMergeLv / 2));
          }
          this.char.exp += (lv + 1) * 480;
          v13.hammers += 2;
          audio.playLevelUp();
          const newMeta = V14_MERGE_WUXIA_BOOKS[Math.min(V14_MERGE_WUXIA_BOOKS.length - 1, lv)];
          this.triggerFlyingReward(e.currentTarget, "exp", `✨ 武道合真：Lv.${lv + 1}【${newMeta.name}】(+2神錘)`);
          if (!st.flags.customSkillEstablished && v13.highestMergeLv >= 4) {
            st.flags.customSkillEstablished = true;
            this.completeStoryNode("1-5", `悟透【${newMeta.name}】`, "於八卦武經推演中確立本命神通雛形！");
          }
          this.updateHeader();
          this.renderView();
        } else {
          v13.mergeBoard[prevIdx] = lv;
          v13.mergeBoard[idx] = prevLv;
          v13.selectedMergeIdx = -1;
          audio.playQiCharge();
          this.renderView();
        }
      });
    });

    wrap.querySelector("#btn-v14-spawn-merge")?.addEventListener("click", (e) => {
      const emptyIndices = [];
      v13.mergeBoard.forEach((v, i) => { if (!v || v <= 0) emptyIndices.push(i); });
      if (emptyIndices.length === 0) {
        wrap.querySelector("#btn-v14-auto-merge-all")?.click();
        return;
      }
      const spawnCount = Math.min(emptyIndices.length, 4);
      const baseLv = Math.max(1, Math.min(4, v13.highestMergeLv - 2));
      for (let i = 0; i < spawnCount; i++) v13.mergeBoard[emptyIndices[i]] = baseLv;
      audio.playQiCharge();
      this.triggerFlyingReward(e.currentTarget, "qi", `✨ 領悟 ${spawnCount} 卷 Lv.${baseLv} 武經入陣！`);
      this.renderView();
    });

    wrap.querySelector("#btn-v14-auto-merge-all")?.addEventListener("click", (e) => {
      let mergedCount = 0;
      let changed = true;
      while (changed) {
        changed = false;
        for (let i = 0; i < 16; i++) {
          const lv = v13.mergeBoard[i];
          if (!lv || lv <= 0 || lv >= 10) continue;
          for (let j = i + 1; j < 16; j++) {
            if (v13.mergeBoard[j] === lv) {
              v13.mergeBoard[i] = lv + 1;
              v13.mergeBoard[j] = 0;
              mergedCount++;
              changed = true;
              if (lv + 1 > v13.highestMergeLv) {
                v13.highestMergeLv = lv + 1;
                this.char.ensureV12State().customSkillFormTier = Math.min(4, Math.ceil(v13.highestMergeLv / 2));
              }
              break;
            }
          }
        }
      }
      if (mergedCount === 0) {
        v13.mergeBoard = v13.mergeBoard.map(v => v > 0 ? v : 1);
        mergedCount = 1;
      }
      const rewardExp = mergedCount * 720 * (1 + this.char.realmIndex * 0.52);
      this.char.exp += Math.floor(rewardExp);
      v13.hammers += mergedCount * 2;
      audio.playLevelUp();
      this.triggerFlyingReward(e.currentTarget, "exp", `⚡ 連鎖合真 ${mergedCount} 次！最高 Lv.${v13.highestMergeLv} (+${mergedCount * 2}神錘)`);
      if (!st.flags.customSkillEstablished && v13.highestMergeLv >= 4) {
        st.flags.customSkillEstablished = true;
        this.completeStoryNode("1-5", "八卦合道確立神通", "於八卦武經殘篇中融通萬法，確立本命絕學！");
      }
      this.updateHeader();
      this.renderView();
    });
  };

  // ==================== 5. 〔俠〕俠道終局（三幕江湖主線深度回顧與四大武俠結局） ====================
  App.prototype.renderV12EndgameView = function(container) {
    const st = this.char.ensureStoryState();
    const fl = st.flags;
    const w = this.char.wudaoStacks || { sword: 1, pill: 0, formation: 0, body: 0 };
    const totalWudao = (w.sword || 0) + (w.pill || 0) + (w.formation || 0) + (w.body || 0);
    const canRewrite = fl.gaimingDone || totalWudao >= 4;

    const wrap = document.createElement("div");
    wrap.className = "wuxia-hebi-container";
    wrap.innerHTML = `
      <div class="wuxia-card" style="border:2px solid var(--cinnabar-red); background:linear-gradient(180deg, #fcf8f0 0%, #eadfce 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="wuxia-title-badge">星宿劫源 · 俠道終局</span>
            <b style="font-size:1.18rem; color:var(--cinnabar-red); margin-left:6px;">江湖風雲與證道抉擇</b>
          </div>
          <span style="font-size:0.86rem; font-weight:900; color:var(--ink-black);">已通達 ${st.completedNodes.length}/20 節點</span>
        </div>
        <div style="font-size:0.9rem; color:var(--ink-black); margin-top:8px; line-height:1.65;">
          星宿劫源乃大荒萬載以來正邪執念與天地因果之聚合物。陸沉舟以一介凡塵布衣之軀，身懷【太初歲漏玉鑑】，從青玄劍宗起步，歷經門派爭端、宗師指點、弟子去留，最終必須以自身淬鍊之真武大道，做出最後的俠客抉擇！
        </div>

        <div style="background:rgba(255,252,245,0.92); border:1px solid var(--ink-border); padding:8px 10px; border-radius:2px; margin-top:8px; font-size:0.86rem; color:var(--ink-dark); line-height:1.65;">
          • <b>第一幕俠骨因果：</b>${fl.firstKarma || '大荒初行，待定仁俠或霸道'} ｜ <b>本命絕學：</b>${fl.customSkillEstablished ? '已確立雛形' : '待合真推演'}<br/>
          • <b>第二幕武林立場：</b>${fl.stance || '爭道紛紜，待表明入世或超然'} ｜ <b>弟子危機：</b>${fl.discipleCrisisMode || '待點撥心境'}<br/>
          • <b>第三幕逆天改命：</b>${fl.gaimingDone ? '✔ 已改寫與劫源宿命因果' : '未改命'} ｜ <b>當前結局稱號：</b><b style="color:var(--cinnabar-red);">${fl.endingTitle || '尚未結算'}</b>
        </div>
      </div>

      <!-- 終局三大俠道試煉 -->
      <div class="wuxia-card">
        <b style="font-size:1.02rem; color:var(--ink-black);">⚔️ 第一重試煉：心魔殿與守境道心對決（主線 3-2 / 3-3）</b>
        <div style="font-size:0.85rem; color:var(--ink-mid); margin:6px 0;">
          心魔形態將依你第二幕表明的江湖立場（${fl.stance || '未定'}）與武學四向感悟幻化，以己之道戰勝心魔！
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
          <button type="button" class="btn-modern gold" id="btn-endgame-xinmo">
            😈 踏入心魔殿 (戰勝自我執念)
          </button>
          <button type="button" class="btn-modern gold" id="btn-endgame-shoujing">
            🛡️ 守境論劍 (印證真武道心)
          </button>
        </div>
      </div>

      <div class="wuxia-card">
        <b style="font-size:1.02rem; color:var(--ink-black);">⚡ 第二重試煉：歲漏改命（主線 3-4 · 改寫與劫源因果）</b>
        <div style="font-size:0.85rem; color:var(--ink-mid); margin:6px 0;">
          催動【太初歲漏玉鑑】逆流時光重演天劫，改寫你與星宿劫源間的宿命羈絆，解鎖【融合／改寫天道規則】第三結局！
        </div>
        <button type="button" class="btn-modern" id="btn-endgame-gaiming" style="width:100%; padding:10px; border-color:var(--stone-cyan); color:var(--stone-cyan); font-weight:900;">
          ⚡ 逆流歲月 · 逆天改命 (${fl.gaimingDone ? '已改命成功 · 宿命枷鎖已碎' : '點擊觸發 3-4 真義說明卷軸'})
        </button>
      </div>

      <div class="wuxia-card" style="border:2px solid var(--cinnabar-red);">
        <b style="font-size:1.06rem; color:var(--cinnabar-red);">👑 終極抉擇：直面星宿劫源（主線 3-5 / 3-6）</b>
        <div style="font-size:0.86rem; color:var(--ink-dark); margin:6px 0;">
          以一代真武道主之身，在「① 守護萬界生靈（大俠風骨）」、「② 踏破太虛超脫離去（仙家逍遙）」與「③ 嘗試融合／改寫天道（${canRewrite ? '已解鎖' : '需改命成功或四向感悟≥4'}）」中做出最終選擇！
        </div>
        <div style="display:grid; grid-template-columns: 1.35fr 1fr; gap:8px;">
          <button type="button" class="btn-jade" id="btn-endgame-final-choice">
            <span class="main-label">🌌 開啟最終抉擇卷軸</span>
            <span class="sub-label">結算四大結局與武道封號</span>
          </button>
          <button type="button" class="btn-modern secondary" id="btn-endgame-daotu-log">
            📖 翻閱完整武道錄 (${st.completedNodes.length}/20)
          </button>
        </div>
      </div>
    `;
    container.appendChild(wrap);

    wrap.querySelector("#btn-endgame-xinmo")?.addEventListener("click", () => {
      fl.xinmoTrialDone = true;
      const stanceDesc = fl.stance === "立場_超然" ? "太虛孤寂心魔" : "萬民執念心魔";
      this.completeStoryNode("3-2", `斬滅【${stanceDesc}】`, `於心魔殿擊破依自身立場幻化之【${stanceDesc}】！`);
      this.char.xinmoFloor = (this.char.xinmoFloor || 1) + 5;
      this.launchCombat({
        name: `心魔殿 · ${stanceDesc}`,
        hp: Math.floor(this.char.getEffectiveStat("hp") * 0.95),
        atk: Math.floor(this.char.getEffectiveStat("atk") * 0.88),
        def: Math.floor(this.char.getEffectiveStat("def") * 0.8),
        expReward: 2500,
        silverReward: 650
      });
    });

    wrap.querySelector("#btn-endgame-shoujing")?.addEventListener("click", () => {
      fl.shoujingTrialDone = true;
      this.completeStoryNode("3-3", "完成守境挑戰", "於守境試煉中印證俠道初心不移！");
      this.char.shoujingWins = (this.char.shoujingWins || 0) + 1;
      this.launchCombat({
        name: `守境道影 · ${this.char.name}`,
        hp: Math.floor(this.char.getEffectiveStat("hp") * 1.05),
        atk: Math.floor(this.char.getEffectiveStat("atk") * 0.92),
        def: Math.floor(this.char.getEffectiveStat("def") * 0.85),
        expReward: 2900,
        silverReward: 850
      });
    });

    wrap.querySelector("#btn-endgame-gaiming")?.addEventListener("click", () => {
      this.openTribulationMiniGameModal(0, "逆天改命 · 宿命重演", true, "太初宿命劫");
    });

    wrap.querySelector("#btn-endgame-final-choice")?.addEventListener("click", () => {
      this.triggerStoryNodeModal("3-5");
    });

    wrap.querySelector("#btn-endgame-daotu-log")?.addEventListener("click", () => {
      this.openDaotuJournalModal();
    });
  };

  window.addEventListener("DOMContentLoaded", () => {
    window.gameApp = new App();
  });
})();
