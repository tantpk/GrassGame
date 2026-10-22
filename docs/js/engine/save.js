// 墨刃江湖：風雲行 - 雙模存檔管理器 (LocalStorage + 雲端同步接口)
export class SaveManager {
  static SAVE_KEY = "INK_AND_BLADE_WUXIA_SAVE_V1";

  static save(character) {
    try {
      const serialized = JSON.stringify(character);
      localStorage.setItem(this.SAVE_KEY, serialized);
      console.log("[SaveManager] 存檔成功。");
      return true;
    } catch (e) {
      console.error("[SaveManager] 存檔失敗:", e);
      return false;
    }
  }

  static load() {
    try {
      const data = localStorage.getItem(this.SAVE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.error("[SaveManager] 讀檔失敗:", e);
      return null;
    }
  }

  static exportSaveJson() {
    const raw = localStorage.getItem(this.SAVE_KEY);
    return raw || "{}";
  }

  static importSaveJson(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.name && parsed.realmIndex !== undefined) {
        localStorage.setItem(this.SAVE_KEY, jsonStr);
        return true;
      }
    } catch (e) {}
    return false;
  }

  static clearSave() {
    localStorage.removeItem(this.SAVE_KEY);
  }
}