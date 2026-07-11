const STORAGE_KEY = "huyuyasumi-lifequest-v3";
const V2_STORAGE_KEY = "huyuyasumi-lifequest-v2";

const GROUPS = [
  { id: "morning", icon: "🌅", title: "朝の起動クエスト" },
  { id: "growth", icon: "🧭", title: "成長の冒険クエスト" },
  { id: "family", icon: "🏡", title: "家族と島のクエスト" },
  { id: "night", icon: "🌙", title: "夜の帰還クエスト" }
];

const PROFILES = {
  lower: {
    label: "小学低学年",
    shortLabel: "低学年",
    goal: 6,
    note: "6個できたら冒険クリア。できたことを家族でたくさん見つけよう！",
    quests: [
      { id: "wake", group: "morning", icon: "🌅", title: "あさのゲートをひらく", description: "きめたじかんまでにおきて、カーテンをあけよう", xp: 20, color: "#ffd477" },
      { id: "meal", group: "morning", icon: "🍚", title: "ごはんパワーをあつめる", description: "あさ・ひる・よるのごはんをたべよう", xp: 20, color: "#ffad7b" },
      { id: "brush", group: "morning", icon: "🪥", title: "ひかりのはをみがく", description: "あさとよるに、はをみがこう", xp: 15, color: "#9cecff" },
      { id: "study", group: "growth", icon: "✏️", title: "ちしきのかけらをあつめる", description: "べんきょうやしゅくだいを15ぷんしよう", xp: 25, color: "#bd9cff" },
      { id: "read", group: "growth", icon: "📖", title: "ほんのせかいをたびする", description: "ほんを10ぷんよもう", xp: 20, color: "#ffcf83" },
      { id: "exercise", group: "growth", icon: "⚡", title: "げんきのかぜをおこす", description: "そとあそびやうんどうで、からだをうごかそう", xp: 25, color: "#8fffc4" },
      { id: "help", group: "family", icon: "🧹", title: "かぞくのまちをたすける", description: "おてつだいを1つしよう", xp: 20, color: "#ffc580" },
      { id: "tidy", group: "family", icon: "🧺", title: "じぶんのきちをかたづける", description: "つかったものをもとのばしょへもどそう", xp: 15, color: "#8dd9ff" },
      { id: "night", group: "night", icon: "🌙", title: "つきのふねでかえる", description: "おふろとあしたのじゅんびをして、じかんにねよう", xp: 25, color: "#9ea8ff" }
    ]
  },
  upper: {
    label: "小学校高学年",
    shortLabel: "高学年",
    goal: 7,
    note: "7個で冒険クリア。全部できた日は『伝説の一日』！",
    quests: [
      { id: "wake", group: "morning", icon: "🌅", title: "朝のゲートをひらく", description: "目標の時間までに起きて、カーテンを開けよう", xp: 20, color: "#ffd477" },
      { id: "meal", group: "morning", icon: "🍚", title: "元気の燃料をそろえる", description: "朝・昼・夜の食事をしっかり食べよう", xp: 20, color: "#ffad7b" },
      { id: "brush", group: "morning", icon: "🪥", title: "光の結晶をみがく", description: "朝と夜に歯をみがこう", xp: 15, color: "#9cecff" },
      { id: "water", group: "morning", icon: "💧", title: "命の泉を満たす", description: "こまめに水分をとろう", xp: 15, color: "#78dfff" },
      { id: "study", group: "growth", icon: "📚", title: "知識の遺跡を調査する", description: "勉強や宿題に30分取り組もう", xp: 25, color: "#bd9cff" },
      { id: "read", group: "growth", icon: "📖", title: "星空図書館を旅する", description: "本や新聞を15分以上読もう", xp: 20, color: "#ffcf83" },
      { id: "exercise", group: "growth", icon: "⚡", title: "からだの雷を呼び起こす", description: "外遊び・運動・ストレッチを20分しよう", xp: 25, color: "#8fffc4" },
      { id: "help", group: "family", icon: "🧹", title: "家族の町を助ける", description: "自分でお手伝いを1つ見つけて実行しよう", xp: 20, color: "#ffc580" },
      { id: "tidy", group: "family", icon: "🧺", title: "自分の基地を整える", description: "机・部屋・使った物を元の場所へ戻そう", xp: 15, color: "#8dd9ff" },
      { id: "gratitude", group: "family", icon: "💛", title: "やさしさの灯台をともす", description: "家族に『ありがとう』を伝えよう", xp: 20, color: "#ffe47e" },
      { id: "night", group: "night", icon: "🌙", title: "月の船で帰還する", description: "お風呂・明日の準備をして、目標時間に寝よう", xp: 25, color: "#9ea8ff" }
    ]
  },
  middle: {
    label: "中学生",
    shortLabel: "中学生",
    goal: 8,
    note: "8個で冒険クリア。全部できた日は『伝説の一日』！",
    quests: [
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
      { id: "gratitude", group: "family", icon: "💛", title: "やさしさの灯台をともす", description: "家族に『ありがとう』を伝えよう", xp: 20, color: "#ffe47e" },
      { id: "night", group: "night", icon: "🌙", title: "月の船で帰還する", description: "お風呂・明日の準備をして、目標時間に寝よう", xp: 25, color: "#9ea8ff" }
    ]
  }
};

const EVENTS = [
  { icon: "🌈", name: "虹竜の落とし物", description: "虹竜が空に落とした色のかけらを探せ！", questIds: ["meal", "help"], reward: "虹色のうろこ", celebration: "家族を助ける力と元気の力が重なり、七色のうろこを発見した！" },
  { icon: "📚", name: "星空図書館の開館日", description: "雲の上の図書館が、今日だけ秘密の扉を開いている。", questIds: ["study", "tidy"], reward: "星読みのしおり", celebration: "学びと整理の力で、未来の空路を示すしおりが現れた！" },
  { icon: "🐉", name: "風竜のトレーニング", description: "風竜といっしょに、島を一周する力をためよう。", questIds: ["exercise", "meal"], reward: "風竜の羽根", celebration: "大きな風とともに、空を飛べる羽根が舞い降りた！" },
  { icon: "🏮", name: "家族の灯台祭", description: "やさしい行動で、迷子の空船を家へ導こう。", questIds: ["help", "tidy"], reward: "灯台の小さな火", celebration: "家族へのやさしさが、消えない灯台の火になった！" },
  { icon: "🚂", name: "朝焼け特急", description: "朝だけ現れる空の列車に乗り遅れるな！", questIds: ["wake", "meal"], reward: "雲海の切符", celebration: "朝焼け特急の車掌から、どこへでも行ける切符をもらった！" },
  { icon: "🌙", name: "月守りの夜", description: "島をきれいに整えて、月の船を安全に迎えよう。", questIds: ["tidy", "night"], reward: "月光のコンパス", celebration: "静かな月明かりの中で、夜空を指すコンパスが光った！" },
  { icon: "💎", name: "青い泉の目覚め", description: "健康の力が満ちると、一日だけ青い泉が湧き出す。", questIds: ["brush", "exercise"], reward: "泉の青い結晶", celebration: "元気な体の力で、島を守る青い結晶を見つけた！" },
  { icon: "🧙", name: "見習い魔導士の試験", description: "知識と朝の力をそろえて、空島魔法の試験に挑戦しよう。", questIds: ["study", "wake"], reward: "はじめての魔法章", celebration: "朝の集中と学びが重なり、魔法使いの証が浮かび上がった！" }
];

const elements = {
  orbitValue: document.getElementById("orbitValue"),
  energy: document.getElementById("energy"),
  doneCount: document.getElementById("doneCount"),
  goalCount: document.getElementById("goalCount"),
  dailyGoal: document.getElementById("dailyGoal"),
  questTotal: document.getElementById("questTotal"),
  level: document.getElementById("level"),
  crystalCount: document.getElementById("crystalCount"),
  streakCount: document.getElementById("streakCount"),
  relicCount: document.getElementById("relicCount"),
  profileLabel: document.getElementById("profileLabel"),
  profileSwitch: document.getElementById("profileSwitch"),
  childName: document.getElementById("childName"),
  islandWrap: document.getElementById("islandWrap"),
  storyTitle: document.getElementById("storyTitle"),
  storyText: document.getElementById("storyText"),
  rewardCard: document.getElementById("rewardCard"),
  rewardIcon: document.getElementById("rewardIcon"),
  rewardTitle: document.getElementById("rewardTitle"),
  rewardText: document.getElementById("rewardText"),
  questGrid: document.getElementById("questGrid"),
  questNote: document.getElementById("questNote"),
  dailyEvent: document.getElementById("dailyEvent"),
  eventIcon: document.getElementById("eventIcon"),
  eventName: document.getElementById("eventName"),
  eventDescription: document.getElementById("eventDescription"),
  eventConditions: document.getElementById("eventConditions"),
  eventReward: document.getElementById("eventReward"),
  childReflection: document.getElementById("childReflection"),
  familyMessage: document.getElementById("familyMessage"),
  completeReviewButton: document.getElementById("completeReviewButton"),
  reviewStatus: document.getElementById("reviewStatus"),
  nightReview: document.getElementById("nightReview"),
  printButton: document.getElementById("printButton"),
  reviewButton: document.getElementById("reviewButton"),
  resetButton: document.getElementById("resetButton"),
  celebration: document.getElementById("celebration"),
  celebrationKicker: document.getElementById("celebrationKicker"),
  celebrationIcon: document.getElementById("celebrationIcon"),
  celebrationTitle: document.getElementById("celebrationTitle"),
  celebrationText: document.getElementById("celebrationText"),
  closeCelebration: document.getElementById("closeCelebration"),
  printDate: document.getElementById("printDate"),
  printProfile: document.getElementById("printProfile"),
  printName: document.getElementById("printName"),
  printEventIcon: document.getElementById("printEventIcon"),
  printEventName: document.getElementById("printEventName"),
  printEventDescription: document.getElementById("printEventDescription"),
  printEventCondition: document.getElementById("printEventCondition"),
  printGoal: document.getElementById("printGoal"),
  printQuestList: document.getElementById("printQuestList")
};

function formatDateKey(date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function formatJapaneseDate(date) {
  return new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", year: "numeric", month: "long", day: "numeric", weekday: "short" }).format(date);
}

const todayKey = formatDateKey(new Date());

function getDateKeyDaysAgo(daysAgo) {
  return formatDateKey(new Date(Date.now() - daysAgo * 86400000));
}

function dayHash(dateKey) {
  return [...dateKey].reduce((total, character) => total + character.charCodeAt(0), 0);
}

function getEventForDate(dateKey) {
  return EVENTS[dayHash(dateKey) % EVENTS.length];
}

function createEmptyDay() {
  return { completed: [], eventClaimed: false, missionCelebrated: false, perfectCelebrated: false, childReflection: "", familyMessage: "", reviewedAt: "" };
}

function createEmptyState() {
  return { version: 3, profileId: "middle", childName: "", records: {} };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && parsed.version === 3 && parsed.records && typeof parsed.records === "object") return parsed;

    const previous = JSON.parse(localStorage.getItem(V2_STORAGE_KEY));
    const migrated = createEmptyState();
    if (previous && previous.days && typeof previous.days === "object") {
      Object.entries(previous.days).forEach(([dateKey, day]) => {
        migrated.records[dateKey] = { middle: { ...createEmptyDay(), ...day } };
      });
    }
    return migrated;
  } catch {
    return createEmptyState();
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 保存できない環境でも、現在の画面では使い続けられる。
  }
}

function getProfile() {
  return PROFILES[state.profileId] || PROFILES.middle;
}

function getDay(dateKey = todayKey, profileId = state.profileId) {
  if (!state.records[dateKey]) state.records[dateKey] = {};
  if (!state.records[dateKey][profileId]) state.records[dateKey][profileId] = createEmptyDay();
  return state.records[dateKey][profileId];
}

function getQuest(id) {
  return getProfile().quests.find((quest) => quest.id === id);
}

function calculateStats() {
  const profile = getProfile();
  let crystals = 0;
  let relics = 0;

  Object.values(state.records).forEach((profiles) => {
    const day = profiles?.[state.profileId];
    if (!day) return;
    const completedCount = Array.isArray(day.completed) ? day.completed.length : 0;
    crystals += completedCount * 10;
    if (day.eventClaimed) { crystals += 40; relics += 1; }
    if (day.missionCelebrated) crystals += 20;
    if (day.perfectCelebrated) crystals += 80;
  });

  let streak = 0;
  const todayCleared = getDay().completed.length >= profile.goal;
  const startAt = todayCleared ? 0 : 1;
  for (let index = startAt; index < 366; index += 1) {
    const day = state.records[getDateKeyDaysAgo(index)]?.[state.profileId];
    if (day && Array.isArray(day.completed) && day.completed.length >= profile.goal) streak += 1;
    else break;
  }

  return { crystals, relics, streak, level: 1 + Math.floor(crystals / 180) };
}

function buildQuestList() {
  const profile = getProfile();
  elements.questGrid.innerHTML = "";

  GROUPS.forEach((group) => {
    const quests = profile.quests.filter((quest) => quest.group === group.id);
    if (!quests.length) return;

    const section = document.createElement("section");
    section.className = "quest-group";
    section.innerHTML = `<h3 class="group-heading"><span>${group.icon}</span>${group.title}</h3>`;

    const grid = document.createElement("div");
    grid.className = "quest-grid";
    quests.forEach((quest) => {
      const button = document.createElement("button");
      button.className = "quest";
      button.type = "button";
      button.dataset.id = quest.id;
      button.style.setProperty("--quest-color", quest.color);
      button.innerHTML = `
        <span class="quest-icon">${quest.icon}</span>
        <span><strong>${quest.title}</strong><small>${quest.description}</small><span class="quest-xp">ひかり石 +10</span></span>
        <span class="quest-check" aria-hidden="true">✓</span>`;
      grid.appendChild(button);
    });
    section.appendChild(grid);
    elements.questGrid.appendChild(section);
  });
}

function buildPrintSheet() {
  const profile = getProfile();
  const event = getEventForDate(todayKey);
  const eventQuests = event.questIds.map((id) => profile.quests.find((quest) => quest.id === id)).filter(Boolean);

  elements.printDate.textContent = formatJapaneseDate(new Date());
  elements.printProfile.textContent = profile.label;
  elements.printName.textContent = state.childName.trim() || "　　　　　　　　　";
  elements.printEventIcon.textContent = event.icon;
  elements.printEventName.textContent = event.name;
  elements.printEventDescription.textContent = event.description;
  elements.printEventCondition.textContent = `秘密の条件：${eventQuests.map((quest) => `${quest.icon} ${quest.title}`).join(" ＋ ")}`;
  elements.printGoal.textContent = String(profile.goal);
  elements.printQuestList.innerHTML = "";

  profile.quests.forEach((quest, index) => {
    const item = document.createElement("div");
    item.className = "print-quest";
    item.innerHTML = `<span class="paper-check"></span><span class="paper-number">${index + 1}</span><span class="paper-icon">${quest.icon}</span><div><strong>${quest.title}</strong><small>${quest.description}</small></div>`;
    elements.printQuestList.appendChild(item);
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
  const profile = getProfile();
  if (count === 0) {
    elements.storyTitle.textContent = "ねむり島が、君を待っている。";
    elements.storyText.textContent = `今日の行動が島のエネルギーになる。${profile.goal}つの光を集めて、空に道を取り戻そう。`;
  } else if (count < Math.ceil(profile.goal * 0.4)) {
    elements.storyTitle.textContent = "島の奥で、小さな音がした。";
    elements.storyText.textContent = "最初の光がともった。案内役のモコが、うれしそうに空を飛んでいる。";
  } else if (count < profile.goal) {
    elements.storyTitle.textContent = "木々が芽吹き、風が歌いはじめた。";
    elements.storyText.textContent = `あと${profile.goal - count}つの光で冒険クリア。雲の向こうに未知の空路が見えてきた。`;
  } else if (count < profile.quests.length) {
    elements.storyTitle.textContent = "ねむり島、完全復活！";
    elements.storyText.textContent = "今日の冒険はクリア。残りは、伝説の一日へ続くボーナス冒険だ。";
  } else {
    elements.storyTitle.textContent = "伝説の一日が空に刻まれた！";
    elements.storyText.textContent = "すべての光がそろい、星雲ドラゴンが新しい大陸へ案内する。";
  }
}

function updateReward(count) {
  const profile = getProfile();
  const firstStage = Math.ceil(profile.goal * 0.4);
  const secondStage = Math.ceil(profile.goal * 0.7);
  elements.rewardCard.classList.toggle("unlocked", count >= firstStage);

  if (count < firstStage) {
    elements.rewardIcon.textContent = "🥚";
    elements.rewardTitle.textContent = "ふしぎなタマゴ";
    elements.rewardText.textContent = `クエストを${firstStage}つ達成すると、中から仲間の気配が……。`;
  } else if (count < secondStage) {
    elements.rewardIcon.textContent = "☁️";
    elements.rewardTitle.textContent = "星わたげのモコ";
    elements.rewardText.textContent = "タマゴから空を泳ぐ仲間が生まれた。モコは君の冒険を覚えている。";
  } else if (count < profile.goal) {
    elements.rewardIcon.textContent = "🌱";
    elements.rewardTitle.textContent = "空島ガーデン";
    elements.rewardText.textContent = "島に花畑と風車が現れた。あと少しで星見の塔が起動する。";
  } else if (count < profile.quests.length) {
    elements.rewardIcon.textContent = "🏰";
    elements.rewardTitle.textContent = "星見の塔";
    elements.rewardText.textContent = "冒険クリア！ 残りは伝説へ続くボーナスクエスト。";
  } else {
    elements.rewardIcon.textContent = "🐉";
    elements.rewardTitle.textContent = "星雲ドラゴン";
    elements.rewardText.textContent = "すべてのクエストを達成した者だけに現れる、空島の守護竜。";
  }
}

function updateEvent(day) {
  const profile = getProfile();
  const event = getEventForDate(todayKey);
  const completedIds = new Set(day.completed);
  const conditionsMet = event.questIds.every((id) => completedIds.has(id));

  elements.eventIcon.textContent = event.icon;
  elements.eventName.textContent = event.name;
  elements.eventDescription.textContent = event.description;
  elements.eventConditions.innerHTML = "";
  event.questIds.forEach((id) => {
    const quest = profile.quests.find((item) => item.id === id);
    if (!quest) return;
    const chip = document.createElement("span");
    chip.className = `condition-chip${completedIds.has(id) ? " done" : ""}`;
    chip.textContent = `${completedIds.has(id) ? "✓ " : ""}${quest.icon} ${quest.title}`;
    elements.eventConditions.appendChild(chip);
  });

  elements.dailyEvent.classList.toggle("completed", day.eventClaimed);
  elements.eventReward.textContent = day.eventClaimed ? event.reward : conditionsMet ? "発見！" : "？？？";
}

function claimEventIfReady(day) {
  if (day.eventClaimed) return false;
  const event = getEventForDate(todayKey);
  const completedIds = new Set(day.completed);
  if (!event.questIds.every((id) => completedIds.has(id))) return false;
  day.eventClaimed = true;
  return true;
}

function renderProfileButtons() {
  elements.profileSwitch.querySelectorAll("button").forEach((button) => {
    const selected = button.dataset.profile === state.profileId;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function render() {
  const profile = getProfile();
  const day = getDay();
  const completedIds = new Set(day.completed);

  document.querySelectorAll(".quest").forEach((button) => {
    const done = completedIds.has(button.dataset.id);
    button.classList.toggle("done", done);
    button.setAttribute("aria-pressed", String(done));
  });

  const count = day.completed.length;
  const percentage = Math.round((count / profile.quests.length) * 100);
  const circumference = 327;
  const stats = calculateStats();

  elements.doneCount.textContent = String(count);
  elements.goalCount.textContent = String(Math.min(count, profile.goal));
  elements.dailyGoal.textContent = String(profile.goal);
  elements.questTotal.textContent = String(profile.quests.length);
  elements.energy.textContent = String(percentage);
  elements.level.textContent = String(stats.level);
  elements.crystalCount.textContent = String(stats.crystals);
  elements.streakCount.textContent = String(stats.streak);
  elements.relicCount.textContent = String(stats.relics);
  elements.profileLabel.textContent = profile.shortLabel;
  elements.questNote.textContent = profile.note;
  elements.orbitValue.style.strokeDashoffset = String(circumference - (circumference * percentage) / 100);

  elements.islandWrap.classList.toggle("phase-1", count >= Math.ceil(profile.goal * 0.25));
  elements.islandWrap.classList.toggle("phase-2", count >= Math.ceil(profile.goal * 0.65));
  elements.islandWrap.classList.toggle("phase-3", count >= profile.goal);
  elements.islandWrap.classList.toggle("phase-perfect", count === profile.quests.length);

  elements.childReflection.value = day.childReflection || "";
  elements.familyMessage.value = day.familyMessage || "";
  elements.reviewStatus.textContent = day.reviewedAt
    ? `ふりかえり完了：${new Intl.DateTimeFormat("ja-JP", { hour: "2-digit", minute: "2-digit" }).format(new Date(day.reviewedAt))}`
    : "まだ夜のふりかえりは完了していません。";
  elements.reviewStatus.classList.toggle("done", Boolean(day.reviewedAt));

  updateStory(count);
  updateReward(count);
  updateEvent(day);
  renderProfileButtons();
  buildPrintSheet();
  saveState();
}

function showCelebration({ kicker, icon, title, text }) {
  elements.celebrationKicker.textContent = kicker;
  elements.celebrationIcon.textContent = icon;
  elements.celebrationTitle.textContent = title;
  elements.celebrationText.textContent = text;
  elements.celebration.classList.add("show");
  elements.celebration.setAttribute("aria-hidden", "false");
  createBurst(elements.islandWrap, 34);
}

function completeQuest(button) {
  const profile = getProfile();
  const day = getDay();
  const id = button.dataset.id;
  const index = day.completed.indexOf(id);
  const wasCompleted = index >= 0;

  if (wasCompleted) day.completed.splice(index, 1);
  else {
    day.completed.push(id);
    createBurst(button);
    createFloatingText(button, "ひかり石 +10");
  }

  day.reviewedAt = "";
  const eventNewlyClaimed = !wasCompleted && claimEventIfReady(day);
  const count = day.completed.length;
  let celebrationData = null;

  if (!wasCompleted && count === profile.quests.length && !day.perfectCelebrated) {
    day.perfectCelebrated = true;
    day.missionCelebrated = true;
    celebrationData = { kicker: "LEGENDARY DAY", icon: "🐉", title: "伝説の一日、完成！", text: "すべての光がそろい、星雲ドラゴンが目を覚ました！" };
  } else if (!wasCompleted && count >= profile.goal && !day.missionCelebrated) {
    day.missionCelebrated = true;
    celebrationData = { kicker: "MISSION COMPLETE", icon: "🌟", title: "ねむり島が目を覚ました！", text: `${profile.goal}つの光が集まり、星見の塔が起動した！` };
  } else if (eventNewlyClaimed) {
    const event = getEventForDate(todayKey);
    celebrationData = { kicker: "SECRET TREASURE", icon: event.icon, title: `${event.reward}を発見！`, text: event.celebration };
  }

  saveState();
  render();
  if (celebrationData) window.setTimeout(() => showCelebration(celebrationData), 320);
}

function selectProfile(profileId) {
  if (!PROFILES[profileId] || state.profileId === profileId) return;
  state.profileId = profileId;
  buildQuestList();
  render();
}

elements.profileSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-profile]");
  if (button) selectProfile(button.dataset.profile);
});

elements.questGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".quest");
  if (button) completeQuest(button);
});

elements.childName.addEventListener("input", () => {
  state.childName = elements.childName.value;
  buildPrintSheet();
  saveState();
});

[elements.childReflection, elements.familyMessage].forEach((field) => {
  field.addEventListener("input", () => {
    const day = getDay();
    day.childReflection = elements.childReflection.value;
    day.familyMessage = elements.familyMessage.value;
    day.reviewedAt = "";
    elements.reviewStatus.textContent = "入力内容を更新しました。最後にふりかえりを完了してください。";
    elements.reviewStatus.classList.remove("done");
    saveState();
  });
});

elements.completeReviewButton.addEventListener("click", () => {
  const day = getDay();
  day.childReflection = elements.childReflection.value.trim();
  day.familyMessage = elements.familyMessage.value.trim();
  day.reviewedAt = new Date().toISOString();
  saveState();
  render();
  showCelebration({ kicker: "FAMILY REVIEW COMPLETE", icon: "🌙", title: "今日の冒険を記録した！", text: "できたことを家族で確認した時間も、空島を育てる大切な力だ。" });
});

elements.printButton.addEventListener("click", () => {
  buildPrintSheet();
  window.print();
});

elements.reviewButton.addEventListener("click", () => {
  elements.nightReview.classList.add("review-focus");
  elements.nightReview.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => elements.nightReview.classList.remove("review-focus"), 1600);
});

elements.closeCelebration.addEventListener("click", () => {
  elements.celebration.classList.remove("show");
  elements.celebration.setAttribute("aria-hidden", "true");
});

elements.celebration.addEventListener("click", (event) => {
  if (event.target === elements.celebration) elements.closeCelebration.click();
});

elements.resetButton.addEventListener("click", () => {
  const confirmed = window.confirm(`今日の「${getProfile().label}」コースの記録をリセットしますか？`);
  if (!confirmed) return;
  state.records[todayKey][state.profileId] = createEmptyDay();
  elements.celebration.classList.remove("show");
  saveState();
  render();
});

state.profileId = PROFILES[state.profileId] ? state.profileId : "middle";
elements.childName.value = state.childName || "";
buildQuestList();
getDay();
render();
