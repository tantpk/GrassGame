// 星宿劫源：太初道主 - 確定性戰鬥演算引擎與大荒仙道鬥法播報器
import { SKILLS_DATA, KUNGFU_COMBOS } from '../data/skills.js';
import { audio } from './audio.js';

export class CombatEngine {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.logs = [];
    this.round = 1;
    this.maxRounds = 30;
    this.isOver = false;
    this.winner = null;

    this.pState = {
      name: player.name,
      hp: player.getEffectiveStat('hp'),
      maxHp: player.getEffectiveStat('hp'),
      mp: player.getEffectiveStat('mp'),
      maxMp: player.getEffectiveStat('mp'),
      atk: player.getEffectiveStat('atk'),
      def: player.getEffectiveStat('def'),
      speed: player.getEffectiveStat('speed'),
      crit: player.getEffectiveStat('crit'),
      dodge: player.getEffectiveStat('dodge'),
      skills: player.equippedSkills.map(sId => ({
        ...SKILLS_DATA.find(s => s.id === sId),
        curCd: 0
      })).filter(Boolean),
      buffs: [],
      combos: []
    };

    this.eState = {
      name: enemy.name,
      hp: enemy.hp,
      maxHp: enemy.hp,
      mp: enemy.mp || 1000,
      maxMp: enemy.mp || 1000,
      atk: enemy.atk,
      def: enemy.def,
      speed: enemy.speed || 50,
      crit: enemy.crit || 8,
      dodge: enemy.dodge || 6,
      skills: (enemy.skills || []).map(sId => ({
        ...SKILLS_DATA.find(s => s.id === sId),
        curCd: 0
      })).filter(Boolean),
      buffs: []
    };

    this.checkCombos();
  }

  checkCombos() {
    const pSkillIds = this.player.equippedSkills;
    KUNGFU_COMBOS.forEach(cb => {
      const match = cb.skills.every(sId => pSkillIds.includes(sId));
      if (match) {
        this.pState.combos.push(cb);
        this.logs.push({
          type: "combo_init",
          text: `【大荒異象激發】${this.pState.name} 體內道紋共鳴，顯化【${cb.name}】！(${cb.effectDesc})`
        });
      }
    });
  }

  executeRound() {
    if (this.isOver) return null;

    this.logs.push({
      type: "round_header",
      round: this.round,
      text: `── 第 ${this.round} 回合鬥法 ──`
    });

    this.processBuffs(this.pState);
    if (this.checkDeath()) return this.finish();
    this.processBuffs(this.eState);
    if (this.checkDeath()) return this.finish();

    const pSpeed = this.pState.speed;
    const eSpeed = this.eState.speed;
    const playerFirst = pSpeed >= eSpeed;

    const first = playerFirst ? this.pState : this.eState;
    const second = playerFirst ? this.eState : this.pState;

    this.executeAction(first, second);
    if (this.checkDeath()) return this.finish();

    this.executeAction(second, first);
    if (this.checkDeath()) return this.finish();

    this.tickCooldowns(this.pState);
    this.tickCooldowns(this.eState);

    this.round++;
    if (this.round > this.maxRounds) {
      this.isOver = true;
      this.winner = this.pState.hp >= this.eState.hp ? "player" : "enemy";
      this.logs.push({
        type: "timeout",
        text: `雙方激戰三十回合天地靈氣近乎枯竭，以殘存生機分出勝負！`
      });
      return this.finish();
    }

    return {
      round: this.round - 1,
      pHp: this.pState.hp,
      pMaxHp: this.pState.maxHp,
      eHp: this.eState.hp,
      eMaxHp: this.eState.maxHp,
      logs: this.logs
    };
  }

  executeAction(att, def) {
    const isStunned = att.buffs.some(b => b.type === "stun" || b.type === "paralyze");
    if (isStunned) {
      this.logs.push({
        type: "stun_skip",
        text: `${att.name} 神識被天雷麻痹封鎖，周身靈力滯塞，本回合無法掐訣施法！`
      });
      return;
    }

    let chosenSkill = null;
    for (const skill of att.skills) {
      if (skill.curCd === 0 && att.mp >= skill.qiCost) {
        chosenSkill = skill;
        break;
      }
    }

    if (chosenSkill) {
      att.mp -= chosenSkill.qiCost;
      chosenSkill.curCd = chosenSkill.cd + 1;

      let flavor = chosenSkill.flavor
        ? chosenSkill.flavor.replace("{att}", att.name).replace("{def}", def.name)
        : `${att.name} 催動道訣【${chosenSkill.name}】，引動天地法則轟向 ${def.name}！`;
      
      this.logs.push({ type: "skill_cast", text: flavor });
      
      if (chosenSkill.target === "self") {
        this.applySelfSkill(att, chosenSkill);
      } else {
        this.applyAttackSkill(att, def, chosenSkill);
      }
    } else {
      this.applyNormalAttack(att, def);
    }
  }

  applyNormalAttack(att, def) {
    const isDodge = Math.random() * 100 < def.dodge;
    if (isDodge) {
      this.logs.push({
        type: "dodge",
        text: `${def.name} 身形化作一道太虛流光，輕巧遁入空間微瀾，避開了 ${att.name} 的指芒攻勢！`
      });
      return;
    }

    const isCrit = Math.random() * 100 < att.crit;
    const baseDmg = Math.max(15, att.atk - def.def * 0.45);
    const finalDmg = Math.floor(baseDmg * (isCrit ? 1.6 : 1.0) * (0.95 + Math.random() * 0.15));

    def.hp = Math.max(0, def.hp - finalDmg);

    let text = `${att.name} 並指一揮激發護體靈光，實實擊中 ${def.name}，削去其 ${finalDmg} 點靈罡氣血！`;
    if (isCrit) text = `【大道會心】` + text;

    this.logs.push({ type: "hit", damage: finalDmg, isCrit, text });
  }

  applyAttackSkill(att, def, skill) {
    const isDodge = Math.random() * 100 < (def.dodge * 0.75);
    if (isDodge) {
      this.logs.push({
        type: "dodge",
        text: `${def.name} 識破天地殺機去向，施展破虛遁法，身化殘影挪移百丈避開殺招！`
      });
      return;
    }

    let isCrit = Math.random() * 100 < att.crit;
    if (att === this.pState && this.pState.combos.some(c => c.buff && c.buff.critBoost)) {
      isCrit = Math.random() * 100 < (att.crit + 40);
    }

    let armorPen = 0;
    if (att === this.pState && this.pState.combos.some(c => c.buff && c.buff.armorPen)) {
      armorPen = 0.45;
    }

    const effectiveDef = def.def * (1 - armorPen);
    const baseDmg = Math.max(20, att.atk * skill.power - effectiveDef * 0.45);
    let finalDmg = Math.floor(baseDmg * (isCrit ? 1.8 : 1.0) * (0.95 + Math.random() * 0.15));

    const shieldBuff = def.buffs.find(b => b.type === "buffShield");
    if (shieldBuff) {
      finalDmg = Math.floor(finalDmg * 0.65);
    }

    def.hp = Math.max(0, def.hp - finalDmg);

    let hitText = `${att.name} 神通天威震顫蒼穹，重創 ${def.name}，造成了 ${finalDmg} 點毀滅巨額殺傷！`;
    if (isCrit) hitText = `【天地雷暴崩滅】` + hitText;
    this.logs.push({ type: "skill_hit", damage: finalDmg, isCrit, text: hitText });

    if (skill.effect) {
      if (skill.effect.type === "burn") {
        def.buffs.push({ type: "burn", val: Math.floor(att.atk * skill.effect.val), duration: skill.effect.duration });
        this.logs.push({ type: "status", text: `${def.name} 沾染玄煞神火，肉身靈魂皆受劇烈灼燒！` });
      } else if (skill.effect.type === "paralyze" && Math.random() < skill.effect.chance) {
        def.buffs.push({ type: "paralyze", duration: skill.effect.duration });
        this.logs.push({ type: "status", text: `${def.name} 被辟邪神雷擊中道基，周身電弧亂竄陷入麻痹！` });
      } else if (skill.effect.type === "silence") {
        def.buffs.push({ type: "silence", duration: skill.effect.duration });
        this.logs.push({ type: "status", text: `${def.name} 眉心識海受創，神念紊亂無法調動真元！` });
      }
    }
  }

  applySelfSkill(att, skill) {
    if (skill.effect && skill.effect.type === "buffRegen") {
      const heal = Math.floor(att.maxHp * skill.effect.hpPercent);
      att.hp = Math.min(att.maxHp, att.hp + heal);
      this.logs.push({
        type: "heal",
        text: `${att.name} 運轉大衍造化神訣，吞納天地生機，瞬間回復了 ${heal} 點血魄本源！`
      });
    } else if (skill.effect && skill.effect.type === "buffShield") {
      att.buffs.push({ type: "buffShield", duration: skill.effect.duration });
      this.logs.push({
        type: "shield",
        text: `${att.name} 祭出混沌護體靈罩，堅若神山，防禦力大幅暴增！`
      });
    }
  }

  processBuffs(target) {
    for (let i = target.buffs.length - 1; i >= 0; i--) {
      const b = target.buffs[i];
      if (b.type === "burn") {
        target.hp = Math.max(0, target.hp - b.val);
        this.logs.push({ type: "tick", text: `${target.name} 體內煞火反噬，受到 ${b.val} 點焚魂灼燒傷害！` });
      }
      b.duration--;
      if (b.duration <= 0) {
        target.buffs.splice(i, 1);
      }
    }
  }

  tickCooldowns(target) {
    target.skills.forEach(s => {
      if (s.curCd > 0) s.curCd--;
    });
  }

  checkDeath() {
    if (this.pState.hp <= 0) {
      this.isOver = true;
      this.winner = "enemy";
      return true;
    }
    if (this.eState.hp <= 0) {
      this.isOver = true;
      this.winner = "player";
      return true;
    }
    return false;
  }

  finish() {
    const isPlayerWin = this.winner === "player";
    const finalText = isPlayerWin
      ? `【鬥法勝出】${this.pState.name} 收起漫天道芒，長身而立，悍然鎮殺強敵 ${this.eState.name}！`
      : `【遁光敗退】${this.pState.name} 本源消耗殆盡，捏碎遁地神符暫避鋒芒……`;

    this.logs.push({
      type: "battle_end",
      winner: this.winner,
      text: finalText
    });

    return {
      isOver: true,
      winner: this.winner,
      logs: this.logs
    };
  }

  simulateAll() {
    while (!this.isOver) {
      this.executeRound();
    }
    return this.finish();
  }
}