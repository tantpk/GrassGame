// 星宿劫源：太初道主 - 諸天大域遠古聖地與魔剎
export const SECTS_DATA = [
  {
    id: "taixu_sword",
    name: "太虛玄劍宮",
    title: "蒼瀾九域至高劍道聖地",
    align: "righteous",
    alignName: "古聖仙門",
    desc: "傳承自荒古初闢時期的無上劍宗。門中長老以虛空淬劍、以星辰養意。飛劍出鞘，縱橫萬里，可斬滅虛空壁壘。",
    leader: "扶搖劍尊 (通虛涅槃境大圓滿)",
    elder: "問道長老 (神藏境後期)",
    weapon: "太乙玄庚飛劍 / 九曜星天大陣",
    entryReq: { minLevel: 1, morality: 5, desc: "身懷劍骨元靈，心無旁騖" },
    ranks: [
      { id: 1, title: "抱劍道童", reqExp: 0, dailyAllowance: 70 },
      { id: 2, title: "天罡執劍侍", reqExp: 900, dailyAllowance: 220 },
      { id: 3, title: "太虛真傳劍子", reqExp: 3800, dailyAllowance: 650 },
      { id: 4, title: "星宿長老", reqExp: 11000, dailyAllowance: 1600 },
      { id: 5, title: "無上劍宮之尊", reqExp: 32000, dailyAllowance: 4200 }
    ],
    skills: ["tx_gengjin_jian", "tx_wanhua_kongjian", "tx_xinghe_zhenfa", "tx_taixu_juedai"],
    tasks: [
      { id: "tx_t1", name: "天池淬洗本命飛劍", type: "gather", exp: 90, coins: 160, desc: "深入太虛寒玉池引星芒煞氣溫養本命劍胚。" },
      { id: "tx_t2", name: "觀天劍碑感悟法則", type: "meditate", exp: 130, coins: 210, desc: "靜坐於斷天崖前體悟開山始祖留下的一劍破界道意。" },
      { id: "tx_t3", name: "清剿虛空裂隙凶獸", type: "battle", exp: 220, coins: 480, desc: "獵殺自星域空間裂縫中湧出的荒古噬空巨魔。" }
    ]
  },
  {
    id: "danxiao_temple",
    name: "丹霄古聖殿",
    title: "太虛神荒丹道總樞",
    align: "neutral",
    alignName: "中立古盟",
    desc: "執掌諸界神火與造化聖藥的古老傳承。擅長引動諸天煞火煉製突破界域桎梏的九轉神丹，引諸界強者折節敬奉。",
    leader: "玄牝丹祖 (九品太乙丹聖 / 通虛涅槃境)",
    elder: "火靈長老",
    weapon: "焚天寶鼎 / 控火神紋",
    entryReq: { minLevel: 1, morality: 0, desc: "識海神念強橫，具備草木通靈感應" },
    ranks: [
      { id: 1, title: "司火童子", reqExp: 0, dailyAllowance: 80 },
      { id: 2, title: "四品通靈藥師", reqExp: 900, dailyAllowance: 250 },
      { id: 3, title: "七品焚天宗師", reqExp: 3800, dailyAllowance: 720 },
      { id: 4, title: "聖殿丹宿長老", reqExp: 11000, dailyAllowance: 1850 },
      { id: 5, title: "太初丹皇", reqExp: 32000, dailyAllowance: 5200 }
    ],
    skills: ["dx_bi_sui_yan", "dx_danling_guixu", "dx_fentian_huolian", "dx_zaohua_shengxian"],
    tasks: [
      { id: "dx_t1", name: "採擷地脈太荒靈髓", type: "gather", exp: 90, coins: 170, desc: "前往炎獄地底深處擷取百年方生一滴的地心熔玉髓。" },
      { id: "dx_t2", name: "引火煉魂周天功", type: "meditate", exp: 130, coins: 230, desc: "以三昧神火火意煅燒識海雜質，壯大神識。" },
      { id: "dx_t3", name: "降伏伴生火靈獸", type: "battle", exp: 230, coins: 510, desc: "擊退盤踞在神火池畔暴虐的赤瞳火蜥王。" }
    ]
  },
  {
    id: "wanjie_demon",
    name: "萬劫魔煞宗",
    title: "幽冥黃泉修羅霸道",
    align: "evil",
    alignName: "幽冥煞門",
    desc: "隱世於幽暗深淵冥海，主張以劫證道、吞噬萬靈煞氣以鑄無上神魔之體。戰法殘暴至極，以戰養戰越戰越狂。",
    leader: "幽夜煞皇 (通虛境中期)",
    elder: "冥骨尊者 (神藏境圓滿)",
    weapon: "修羅煞刃 / 萬劫聚魂幡",
    entryReq: { minLevel: 1, morality: -10, desc: "殺伐果決，無虛偽婦人之仁" },
    ranks: [
      { id: 1, title: "冥淵骨奴", reqExp: 0, dailyAllowance: 95 },
      { id: 2, title: "修羅魔衛", reqExp: 900, dailyAllowance: 280 },
      { id: 3, title: "幽煞堂主", reqExp: 3800, dailyAllowance: 780 },
      { id: 4, title: "戮世長老", reqExp: 11000, dailyAllowance: 2100 },
      { id: 5, title: "太荒魔祖", reqExp: 32000, dailyAllowance: 5600 }
    ],
    skills: ["wj_shura_sharen", "wj_minghai_tunling", "wj_tianmo_banti", "wj_wanjie_fenchen"],
    tasks: [
      { id: "wj_t1", name: "冥泉血潭鑄魔刃", type: "gather", exp: 95, coins: 190, desc: "將佩刃沉入萬劫寒冰血泉汲取煞氣煞紋。" },
      { id: "wj_t2", name: "修羅心魔叩關術", type: "meditate", exp: 135, coins: 250, desc: "在無盡哀嚎幻境中洗練殺意，不墮狂亂。" },
      { id: "wj_t3", name: "覆滅正道巡界盟", type: "battle", exp: 250, coins: 560, desc: "伏擊並全殲企圖探尋魔宗總壇的偽善大教先鋒。" }
    ]
  },
  {
    id: "yaochi_celestial",
    name: "瑤池廣寒仙闕",
    title: "太陰太虛出塵神閣",
    align: "righteous",
    alignName: "古聖仙門",
    desc: "坐落於蒼穹九重天界天池之巔。修煉太陰神水與廣寒太素心法，生生不息，掌控虛空瞬移與涅槃自愈奇術。",
    leader: "璇璣仙妃 (通虛境初期)",
    elder: "素心天尊",
    weapon: "踏月仙綾 / 冰魄神梭",
    entryReq: { minLevel: 1, morality: 5, desc: "神識清澈，身心無垢" },
    ranks: [
      { id: 1, title: "奉露仙童", reqExp: 0, dailyAllowance: 75 },
      { id: 2, title: "踏霜靈官", reqExp: 900, dailyAllowance: 230 },
      { id: 3, title: "瑤池仙子", reqExp: 3800, dailyAllowance: 680 },
      { id: 4, title: "太陰殿主", reqExp: 11000, dailyAllowance: 1700 },
      { id: 5, title: "九天廣寒宮主", reqExp: 32000, dailyAllowance: 4600 }
    ],
    skills: ["yc_taiyin_bingpo", "yc_guanghan_xuankong", "yc_shengling_suxin", "yc_yuehua_fuchen"],
    tasks: [
      { id: "yc_t1", name: "凝採九天太陰玄霜", type: "gather", exp: 85, coins: 160, desc: "深夜於浮空神山引月華凝露，注入玄冰法玉。" },
      { id: "yc_t2", name: "太素冰心靜默坐", type: "meditate", exp: 125, coins: 220, desc: "於瑤池蓮花神石上內觀己身，摒除七情干擾。" },
      { id: "yc_t3", name: "鎮殺墮化邪道狂徒", type: "battle", exp: 220, coins: 490, desc: "斬滅妄圖越境玷污天池仙泉的淫邪散修。" }
    ]
  },
  {
    id: "shenxiao_thunder",
    name: "神霄劫雷古教",
    title: "代行天罰雷罰神殿",
    align: "neutral",
    alignName: "中立古盟",
    desc: "鎮守九天雷海絕地，以掌控天地混沌天劫雷源為根本。神雷一動，辟邪鎮魔，對一切妖邪魔修具備天命壓制。",
    leader: "驚雷聖主 (通虛境大圓滿)",
    elder: "電曜天君",
    weapon: "紫霄引雷錐 / 萬劫雷印",
    entryReq: { minLevel: 1, morality: 0, desc: "肉身骨髓剛健，能承萬丈雷殛" },
    ranks: [
      { id: 1, title: "引雷道士", reqExp: 0, dailyAllowance: 85 },
      { id: 2, title: "馭電神將", reqExp: 900, dailyAllowance: 250 },
      { id: 3, title: "都天雷主", reqExp: 3800, dailyAllowance: 720 },
      { id: 4, title: "神霄護道長老", reqExp: 11000, dailyAllowance: 1900 },
      { id: 5, title: "九天雷罰真皇", reqExp: 32000, dailyAllowance: 5200 }
    ],
    skills: ["sx_gengjin_tianlei", "sx_du_tian_shenlei", "sx_zixiao_jiezhi", "sx_leihai_mieyu"],
    tasks: [
      { id: "sx_t1", name: "神雷峰引納天劫殘雷", type: "gather", exp: 90, coins: 175, desc: "冒死登臨千丈引雷玄鐵柱捕捉九天雷核殘片。" },
      { id: "sx_t2", name: "雷漿化元金身術", type: "meditate", exp: 130, coins: 240, desc: "步入沸騰雷漿池以狂暴電弧淬打體內經脈。" },
      { id: "sx_t3", name: "降伏深淵陰雷魔蛟", type: "battle", exp: 240, coins: 530, desc: "以至陽神雷誅滅作亂地底陰河的萬載異變魔蛟。" }
    ]
  }
];