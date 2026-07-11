const STORAGE_KEY = "huyuyasumi-lifequest-v1";
const quests = [...document.querySelectorAll(".quest")];
const orbitValue = document.getElementById("orbitValue");
const energy = document.getElementById("energy");
const doneCount = document.getElementById("doneCount");
const level = document.getElementById("level");
const islandWrap = document.getElementById("islandWrap");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const rewardCard = document.getElementById("rewardCard");
const rewardTitle = document.getElementById("rewardTitle");
const rewardText = document.getElementById("rewardText");
const celebration = document.getElementById("celebration");
const closeCelebration = document.getElementById("closeCelebration");
const resetButton = document.getElementById("resetButton");

const todayKey = new Date().toLocaleDateString("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || saved.date !== todayKey) return { date: todayKey, completed: [], celebrated: false };
    return saved;
  } catch {
    return { date: todayKey, completed: [], celebrated: false };
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createBurst(target) {
  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const colors = ["#85f5ff", "#ffe487", "#bc9cff", "#91ffbf"];

  for (let i = 0; i < 18; i += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 18;
    const distance = 55 + Math.random() * 55;
    particle.className = "burst";
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.background = colors[i % colors.length];
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }
}

function updateStory(count) {
  const stories = [
    ["ねむり島が、君を待っている。", "今日の行動が、島のエネルギーになる。5つのクエストを達成して、空に光を取り戻そう。"],
    ["島の奥で、小さな音がした。", "最初の光がともった。案内役のモコが、うれしそうに空を飛んでいる。"],
    ["雲の流れが変わりはじめた。", "島が君の力を覚えている。あと少しで、眠っていた植物が目を覚ましそうだ。"],
    ["タマゴが、かすかに動いた！", "3つの力が集まり、ふしぎな仲間が生まれようとしている。"],
    ["空の向こうに道が見える。", "残るクエストはあと1つ。すべての力を集めれば、新しい空域へ進める。"],
    ["ねむり島、完全復活！", "今日の君の行動で島は目を覚ました。明日は、さらに遠い空へ冒険が続く。"]
  ];

  [storyTitle.textContent, storyText.textContent] = stories[count];
}

function render() {
  let totalXp = 0;

  quests.forEach((quest) => {
    const done = state.completed.includes(quest.dataset.id);
    quest.classList.toggle("done", done);
    quest.setAttribute("aria-pressed", String(done));
    if (done) totalXp += Number(quest.dataset.xp);
  });

  const count = state.completed.length;
  const percentage = Math.round((count / quests.length) * 100);
  const circumference = 327;

  doneCount.textContent = String(count);
  energy.textContent = String(percentage);
  level.textContent = String(1 + Math.floor(totalXp / 100));
  orbitValue.style.strokeDashoffset = String(circumference - (circumference * percentage) / 100);
  islandWrap.classList.toggle("island-awake", count >= 3);

  updateStory(count);

  if (count >= 3) {
    rewardCard.classList.add("unlocked");
    rewardTitle.textContent = "星わたげのモコ";
    rewardText.textContent = "タマゴから空を泳ぐ仲間が生まれた！ モコは君の冒険をずっと覚えている。";
    rewardCard.querySelector(".reward-icon").textContent = "☁️";
  } else {
    rewardCard.classList.remove("unlocked");
    rewardTitle.textContent = "ふしぎなタマゴ";
    rewardText.textContent = "クエストを3つ達成すると、中から仲間の気配が……。";
    rewardCard.querySelector(".reward-icon").textContent = "🥚";
  }

  if (count === quests.length && !state.celebrated) {
    state.celebrated = true;
    saveState();
    window.setTimeout(() => celebration.classList.add("show"), 450);
    createBurst(islandWrap);
  }
}

quests.forEach((quest) => {
  quest.addEventListener("click", () => {
    const id = quest.dataset.id;
    const index = state.completed.indexOf(id);

    if (index >= 0) {
      state.completed.splice(index, 1);
      state.celebrated = false;
    } else {
      state.completed.push(id);
      createBurst(quest);
    }

    saveState();
    render();
  });
});

closeCelebration.addEventListener("click", () => celebration.classList.remove("show"));

resetButton.addEventListener("click", () => {
  const confirmed = window.confirm("今日のクエスト記録をすべてリセットしますか？");
  if (!confirmed) return;
  state = { date: todayKey, completed: [], celebrated: false };
  saveState();
  celebration.classList.remove("show");
  render();
});

render();
