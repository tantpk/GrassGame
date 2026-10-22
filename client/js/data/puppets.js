// 星宿劫源：太初道主 - 萬相機關傀儡五大模組與預設戰隊
export const PUPPETS_DATA = {
  cores: [
    { id: "core_tianyan", name: "天眼神念核心", type: "core", ai: "集火殘血目標", critBonus: 10 },
    { id: "core_ciji", name: "太陰磁力核心", type: "core", ai: "強制嘲諷吸傷", hpBonus: 1500 }
  ],
  defaultSquad: [
    { id: "pup_1", name: "天罡青甲衛", role: "前排肉盾", hp: 4200, maxHp: 4200, atk: 150, def: 160, speed: 35, desc: "厚重玄鐵裝甲，嘲諷並吸收 60% 團隊傷害。" },
    { id: "pup_2", name: "神霄破空連弩機", role: "後排輸出", hp: 2200, maxHp: 2200, atk: 380, def: 75, speed: 55, desc: "遠程神霄破空雙矢，專射敵手薄弱破綻。" }
  ]
};
