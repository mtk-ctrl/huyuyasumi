const STORAGE_KEY = "huyuyasumi-lifequest-v2";
const LEGACY_STORAGE_KEY = "huyuyasumi-lifequest-v1";
const DAILY_GOAL = 8;

const GROUPS = [
  { id: "morning", icon: "🌅", title: "朝の起動クエスト" },
  { id: "growth", icon: "🧭", title: "成長の冒険クエスト" },
  { id: "family", icon: "🏡", title: "家族と島のクエスト" },
  { id: "night", icon: "🌙", title: "夜の帰還クエスト" }
];

const QUESTS = [
  { id: "wake", group: "morning", icon: "🌅", title: "朝のゲートをひらく", description: "目標の時間までに起きて、カーテンを開けよう", xp: 20, color: "#ffd477" },
  { id: "meal", group: "morning", icon: "🍚", title: "元気の燃料をそろえる", description: "朝・昼・夜の食事をしっかり食べよう", xp: 20, color: "#ffad7b" },
  { id: "brush", group: "morning", icon: "🪥", title: "光の結晶をみがく", description: "朝と夜に歯をみがこう", xp: 15, color: "#9cecff" },
  { id: "water", group: "morning", icon: "💧", title: "命の泉を満たす", description: "こまめに水分をとろう", xp: 15, color: "#78dfff" },

  { id: "study", group: "growth", icon: "📚", title: "知識の遺跡を調査する", description: "決めた時間、集中して勉強しよう", xp: 25, color: "#bd9cff" },
  { id: "review", group: "growth", icon: "✏️", title: "魔法書の空白を埋める", description: "宿題・復習・苦手な問題に取り組もう", xp: 25, color: "#d4a5ff" },
  { id: "read", group: "growth", icon: "📖", title: "星空図書館を旅する", description: "本や新聞を10分以上読もう", xp: 20, color: "#ffcf83" },
  { id: "exercise", group: "growth", icon: "⚡", title: "からだの雷を呼び起こす", description: "外遊び・運動・ストレッチを20分しよう", xp: 25, color: "#8fffc4" },

  { id: "help", group: "family", icon: "🧹", title: "家族の町を助ける", description: "自分でお手伝いを1つ見つけて実行しよう", xp: 20, color: "#ffc580" },
  { id: "tidy", group: "family", icon: "🧺", title: "自分の基地を整える", description: "机・部屋・使った物を元の場所へ戻そう", xp: 15, color: "#8dd9ff" },
  { id: "gratitude", group: "family", icon: "💛", title: "やさしさの灯台をともす", description: "家族に「ありがとう」を伝えよう", xp: 20, color: "#ffe47e" },

  { id: "night", group: "night", icon: "🌙", title: "月の船で帰還する", description: "お風呂・明日の準備をして、目標時間に寝よう", xp: 25, color: "#9ea8ff" }
];

const EVENTS = [
  {
    icon: "🌈",
    name: "虹竜の落とし物",
    description: "虹竜が空に落とした色のかけらを探せ！",
    questIds: ["water", "help"],
    reward: "虹色のうろこ",
    celebration: "虹竜の通った跡から、七色に輝くうろこを発見した！"
  },
  {
    icon: "📚",
    name: "星空図書館の開館日",
    description: "雲の上の図書館が、今日だけ秘密の扉を開いている。",
    questIds: ["study", "read"],
    reward: "星読みのしおり",
    celebration: "本のすき間から、未来の空路を示すしおりが現れた！"
  },
  {
    icon: "🐉",
    name: "風竜のトレーニング",
    description: "風竜といっしょに、島を一周する力をためよう。",
    questIds: ["exercise", "meal"],
    reward: "風竜の羽根",
    celebration: "大きな風とともに、空を飛べる羽根が舞い降りた！"
  },
  {
    icon: "🏮",
    name: "家族の灯台祭",
    description: "やさしい行動で、迷子の空船を家へ導こう。",
    questIds: ["help", "gratitude"],
    reward: "灯台の小さな火",
    celebration: "家族へのやさしさが、消えない灯台の火になった！"
  },
  {
    icon: "🚂",
    name: "朝焼け特急",
    description: "朝だけ現れる空の列車に乗り遅れるな！",
    questIds: ["wake", "meal"],
    reward: "雲海の切符",
    celebration: "朝焼け特急の車掌から、どこへでも行ける切符をもらった！"
  },
  {
    icon: "🌙",
    name: "月守りの夜",
    description: "島をきれいに整えて、月の船を安全に迎えよう。",
    questIds: ["tidy", "night"],
    reward: "月光のコンパス",
    celebration: "静かな月明かりの中で、夜空を指すコンパスが光った！"
  },
  {
    icon: "💎",
    name: "黄金の泉",
    description: "健康の力が満ちると、一日だけ黄金の泉が湧き出す。",
    questIds: ["brush", "water"],
    reward: "泉の青い結晶",
    celebration: "澄んだ泉の底から、島を元気にする青い結晶を見つけた！"
  },
  {
    icon: "🧙",
    name: "見習い魔導士の試験",
    description: "知識と努力をそろえて、空島魔法の試験に挑戦しよう。",
    questIds: ["study", "review"],
    reward: "はじめての魔法章",
    celebration: "二つの学びが重なり、魔法使いの証が浮かび上がった！"
  }
];

const orbitValue = document.getElementById("orbitValue");
const energy = document.getElementById("energy");
const doneCount = document.getElementById("doneCount");
const goalCount = document.getElementById("goalCount");
const questTotal = document.getElementById("questTotal");
const level = document.getElementById("level");
const crystalCount = document.getElementById("crystalCount");
const streakCount = document.getElementById("streakCount");
const relicCount = document.getElementById("relicCount");
const islandWrap = document.getElementById("islandWrap");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const rewardCard = document.getElementById("rewardCard");
const rewardIcon = document.getElementById("rewardIcon");
const rewardTitle = document.getElementById("rewardTitle");
const rewardText = document.getElementById("rewardText");
const questGrid = document.getElementById("questGrid");
const dailyEvent = document.getElementById("dailyEvent");
const eventIcon = document.getElementById("eventIcon");
const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventConditions = document.getElementById("eventConditions");
const eventReward = document.getElementById("eventReward");
const celebration = document.getElementById("celebration");
const celebrationKicker = document.getElementById("celebrationKicker");
const celebrationIcon = document.getElementById("celebrationIcon");
const celebrationTitle = document.getElementById("celebrationTitle");
const celebrationText = document.getElementById("celebrationText");
const closeCelebration = document.getElementById("closeCelebration");
const resetButton = document.getElementById("resetButton");

function formatDateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

const todayKey = formatDateKey(new Date());

function getDateKeyDaysAgo(daysAgo) {
  const date = new Date(Date.now() - daysAgo * 86400000);
  return formatDateKey(date);
}

function dayHash(dateKey) {
  return [...dateKey].reduce((total, character) => total + character.charCodeAt(0), 0);
}

function getEventForDate(dateKey) {
  return EVENTS[dayHash(dateKey) % EVENTS.length];
}

function createEmptyDay() {
  return {
    completed: [],
    eventClaimed: false,
    missionCelebrated: false,
    perfectCelebrated: false
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && parsed.version === 2 && parsed.days && typeof parsed.days === "object") {
      return parsed;
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    const migrated = { version: 2, days: {} };
    if (legacy && legacy.date === todayKey && Array.isArray(legacy.completed)) {
      migrated.days[todayKey] = createEmptyDay();
      migrated.days[todayKey].completed = legacy.completed.filter((id) =>
        QUESTS.some((quest) => quest.id === id)
      );
      migrated.days[todayKey].missionCelebrated = Boolean(legacy.celebrated);
    }
    return migrated;
  } catch {
    return { version: 2, days: {} };
  }
}

let state = loadState();

function getToday() {
  if (!state.days[todayKey]) state.days[todayKey] = createEmptyDay();
  return state.days[todayKey];
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 保存できない環境でも、現在の画面では遊び続けられる。
  }
}

function getQuest(id) {
  return QUESTS.find((quest) => quest.id === id);
}

function calculateStats() {
  let crystals = 0;
  let relics = 0;

  Object.values(state.days).forEach((day) => {
    const completedCount = Array.isArray(day.completed) ? day.completed.length : 0;
    crystals += completedCount * 10;
    if (day.eventClaimed) {
      crystals += 40;
      relics += 1;
    }
    if (day.missionCelebrated) crystals += 20;
    if (day.perfectCelebrated) crystals += 80;
  });

  let streak = 0;
  const todayCleared = getToday().completed.length >= DAILY_GOAL;
  const startAt = todayCleared ? 0 : 1;

  for (let index = startAt; index < 366; index += 1) {
    const day = state.days[getDateKeyDaysAgo(index)];
    if (day && Array.isArray(day.completed) && day.completed.length >= DAILY_GOAL) {
      streak += 1;
    } else {
      break;
    }
  }

  return { crystals, relics, streak, level: 1 + Math.floor(crystals / 180) };
}

function buildQuestList() {
  questGrid.innerHTML = "";

  GROUPS.forEach((group) => {
    const section = document.createElement("section");
    section.className = "quest-group";
    section.innerHTML = `<h3 class="group-heading"><span>${group.icon}</span>${group.title}</h3>`;

    const grid = document.createElement("div");
    grid.className = "quest-grid";

    QUESTS.filter((quest) => quest.group === group.id).forEach((quest) => {
      const button = document.createElement("button");
      button.className = "quest";
      button.type = "button";
      button.dataset.id = quest.id;
      button.style.setProperty("--quest-color", quest.color);
      button.innerHTML = `
        <span class="quest-icon">${quest.icon}</span>
        <span>
          <strong>${quest.title}</strong>
          <small>${quest.description}</small>
          <span class="quest-xp">ひかり石 +10 / 冒険力 +${quest.xp}</span>
        </span>
        <span class="quest-check" aria-hidden="true">✓</span>
      `;
      grid.appendChild(button);
    });

    section.appendChild(grid);
    questGrid.appendChild(section);
  });
}

function createBurst(target, amount = 18) {
  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const colors = ["#85f5ff", "#ffe487", "#bc9cff", "#91ffbf", "#ff9fd1"];

  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / amount;
    const distance = 55 + Math.random() * 65;
    particle.className = "burst";
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.background = colors[index % colors.length];
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }
}

function createFloatingText(target, text) {
  const rect = target.getBoundingClientRect();
  const label = document.createElement("span");
  label.className = "float-text";
  label.textContent = text;
  label.style.left = `${rect.left + rect.width / 2 - 35}px`;
  label.style.top = `${rect.top + 8}px`;
  document.body.appendChild(label);
  label.addEventListener("animationend", () => label.remove());
}

function updateStory(count) {
  if (count === 0) {
    storyTitle.textContent = "ねむり島が、君を待っている。";
    storyText.textContent = "今日の行動が島のエネルギーになる。8つの光を集めて、空に道を取り戻そう。";
  } else if (count < 3) {
    storyTitle.textContent = "島の奥で、小さな音がした。";
    storyText.textContent = "最初の光がともった。案内役のモコが、うれしそうに空を飛んでいる。";
  } else if (count < 5) {
    storyTitle.textContent = "木々が芽吹き、風が歌いはじめた。";
    storyText.textContent = "君の行動を覚えた島に、花と小さな生き物が戻ってきている。";
  } else if (count < DAILY_GOAL) {
    storyTitle.textContent = "空島の町が動き出した！";
    storyText.textContent = `あと${DAILY_GOAL - count}つの光で冒険クリア。雲の向こうに未知の空路が見えてきた。`;
  } else if (count < QUESTS.length) {
    storyTitle.textContent = "ねむり島、完全復活！";
    storyText.textContent = "今日の冒険はクリア。残りのクエストは、伝説の一日へ続く秘密の道だ。";
  } else {
    storyTitle.textContent = "伝説の一日が空に刻まれた！";
    storyText.textContent = "すべての光がそろい、幻の星雲ドラゴンが君を新しい大陸へ案内する。";
  }
}

function updateReward(count) {
  rewardCard.classList.toggle("unlocked", count >= 3);

  if (count < 3) {
    rewardIcon.textContent = "🥚";
    rewardTitle.textContent = "ふしぎなタマゴ";
    rewardText.textContent = "クエストを3つ達成すると、中から仲間の気配が……。";
  } else if (count < 5) {
    rewardIcon.textContent = "☁️";
    rewardTitle.textContent = "星わたげのモコ";
    rewardText.textContent = "タマゴから空を泳ぐ仲間が生まれた。モコは君の冒険をずっと覚えている。";
  } else if (count < DAILY_GOAL) {
    rewardIcon.textContent = "🌱";
    rewardTitle.textContent = "空島ガーデン";
    rewardText.textContent = "島に花畑と風車が現れた。あと少しで、眠っている塔が起動する。";
  } else if (count < QUESTS.length) {
    rewardIcon.textContent = "🏰";
    rewardTitle.textContent = "星見の塔";
    rewardText.textContent = "冒険クリア！ 星見の塔から、明日のイベントを探せるようになった。";
  } else {
    rewardIcon.textContent = "🐉";
    rewardTitle.textContent = "星雲ドラゴン";
    rewardText.textContent = "伝説の一日を達成した者だけに現れる、空島の守護竜が仲間になった。";
  }
}

function updateEvent(day) {
  const event = getEventForDate(todayKey);
  const completedIds = new Set(day.completed);
  const conditionsMet = event.questIds.every((id) => completedIds.has(id));

  eventIcon.textContent = event.icon;
  eventName.textContent = event.name;
  eventDescription.textContent = event.description;
  eventConditions.innerHTML = "";

  event.questIds.forEach((id) => {
    const quest = getQuest(id);
    const chip = document.createElement("span");
    chip.className = `condition-chip${completedIds.has(id) ? " done" : ""}`;
    chip.textContent = `${completedIds.has(id) ? "✓ " : ""}${quest.icon} ${quest.title}`;
    eventConditions.appendChild(chip);
  });

  dailyEvent.classList.toggle("completed", day.eventClaimed);
  eventReward.textContent = day.eventClaimed ? event.reward : conditionsMet ? "発見！" : "？？？";
}

function claimEventIfReady(day) {
  if (day.eventClaimed) return false;
  const event = getEventForDate(todayKey);
  const completedIds = new Set(day.completed);
  if (!event.questIds.every((id) => completedIds.has(id))) return false;
  day.eventClaimed = true;
  return true;
}

function render() {
  const day = getToday();
  const completedIds = new Set(day.completed);
  let adventureXp = 0;

  document.querySelectorAll(".quest").forEach((button) => {
    const quest = getQuest(button.dataset.id);
    const done = completedIds.has(quest.id);
    button.classList.toggle("done", done);
    button.setAttribute("aria-pressed", String(done));
    if (done) adventureXp += quest.xp;
  });

  const count = day.completed.length;
  const percentage = Math.round((count / QUESTS.length) * 100);
  const circumference = 327;
  const stats = calculateStats();

  doneCount.textContent = String(count);
  goalCount.textContent = String(Math.min(count, DAILY_GOAL));
  questTotal.textContent = String(QUESTS.length);
  energy.textContent = String(percentage);
  level.textContent = String(stats.level);
  crystalCount.textContent = String(stats.crystals);
  streakCount.textContent = String(stats.streak);
  relicCount.textContent = String(stats.relics);
  orbitValue.style.strokeDashoffset = String(circumference - (circumference * percentage) / 100);

  islandWrap.classList.toggle("phase-1", count >= 2);
  islandWrap.classList.toggle("phase-2", count >= 5);
  islandWrap.classList.toggle("phase-3", count >= DAILY_GOAL);
  islandWrap.classList.toggle("phase-perfect", count === QUESTS.length);
  islandWrap.dataset.adventureXp = String(adventureXp);

  updateStory(count);
  updateReward(count);
  updateEvent(day);
  saveState();
}

function showCelebration({ kicker, icon, title, text }) {
  celebrationKicker.textContent = kicker;
  celebrationIcon.textContent = icon;
  celebrationTitle.textContent = title;
  celebrationText.textContent = text;
  celebration.classList.add("show");
  celebration.setAttribute("aria-hidden", "false");
  createBurst(islandWrap, 34);
}

function completeQuest(button) {
  const day = getToday();
  const id = button.dataset.id;
  const index = day.completed.indexOf(id);
  const wasCompleted = index >= 0;

  if (wasCompleted) {
    day.completed.splice(index, 1);
  } else {
    day.completed.push(id);
    createBurst(button);
    createFloatingText(button, "ひかり石 +10");
  }

  const eventNewlyClaimed = !wasCompleted && claimEventIfReady(day);
  const count = day.completed.length;
  let celebrationData = null;

  if (!wasCompleted && count === QUESTS.length && !day.perfectCelebrated) {
    day.perfectCelebrated = true;
    day.missionCelebrated = true;
    celebrationData = {
      kicker: "LEGENDARY DAY",
      icon: "🐉",
      title: "伝説の一日、完成！",
      text: "12の光がそろい、星雲ドラゴンが目を覚ました。今日の君は空島の伝説だ！"
    };
  } else if (!wasCompleted && count >= DAILY_GOAL && !day.missionCelebrated) {
    day.missionCelebrated = true;
    celebrationData = {
      kicker: "MISSION COMPLETE",
      icon: "🌟",
      title: "ねむり島が目を覚ました！",
      text: "8つの光が集まり、星見の塔が起動した。残りは伝説へ続くボーナス冒険！"
    };
  } else if (eventNewlyClaimed) {
    const event = getEventForDate(todayKey);
    celebrationData = {
      kicker: "SECRET TREASURE",
      icon: event.icon,
      title: `${event.reward}を発見！`,
      text: event.celebration
    };
  }

  saveState();
  render();

  if (celebrationData) {
    window.setTimeout(() => showCelebration(celebrationData), 320);
  }
}

questGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".quest");
  if (!button) return;
  completeQuest(button);
});

closeCelebration.addEventListener("click", () => {
  celebration.classList.remove("show");
  celebration.setAttribute("aria-hidden", "true");
});

celebration.addEventListener("click", (event) => {
  if (event.target === celebration) closeCelebration.click();
});

resetButton.addEventListener("click", () => {
  const confirmed = window.confirm("今日のクエストと秘宝の記録をリセットしますか？");
  if (!confirmed) return;
  state.days[todayKey] = createEmptyDay();
  celebration.classList.remove("show");
  saveState();
  render();
});

buildQuestList();
getToday();
render();
