// 星宿劫源：太初道主 - 九品丹道配方與丹劫標準
export const ALCHEMY_RECIPES_DATA = [
  {
    id: "rec_zhuji",
    name: "三清凝液通脈丹",
    gradeName: "三品靈丹",
    reqHerbs: [ { id: "herb_sanqing", name: "三清玄草", count: 2 } ],
    targetPillId: "pill_zhuji",
    baseSuccess: 0.90,
    hasTribulation: false
  },
  {
    id: "rec_jiangchen",
    name: "道胎絳霞造化丸",
    gradeName: "五品寶丹",
    reqHerbs: [ { id: "herb_ziyang", name: "紫陽靈芝", count: 2 } ],
    targetPillId: "pill_jiangchen",
    baseSuccess: 0.75,
    hasTribulation: true,
    tribulationDmg: 800
  },
  {
    id: "rec_jieying",
    name: "神藏破界九轉真丹",
    gradeName: "七品玄丹",
    reqHerbs: [ { id: "herb_taixu", name: "太虛玄參", count: 2 } ],
    targetPillId: "pill_jieying",
    baseSuccess: 0.60,
    hasTribulation: true,
    tribulationDmg: 3500
  },
  {
    id: "rec_huashen",
    name: "太虛涅槃不滅金丹",
    gradeName: "九品聖丹",
    reqHerbs: [ { id: "herb_taixu", name: "太虛玄參", count: 3 } ],
    targetPillId: "pill_huashen",
    baseSuccess: 0.45,
    hasTribulation: true,
    tribulationDmg: 12000
  }
];
