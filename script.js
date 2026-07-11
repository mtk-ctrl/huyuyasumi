const STORAGE_KEY = "huyuyasumi-lifequest-v4";
const V3_STORAGE_KEY = "huyuyasumi-lifequest-v3";

const GROUPS = [
  { id: "morning", icon: "🌅", title: "朝の起動クエスト" },
  { id: "growth", icon: "🧭", title: "成長の冒険クエスト" },
  { id: "family", icon: "🏡", title: "家族と島のクエスト" },
  { id: "night", icon: "🌙", title: "夜の帰還クエスト" }
];

const PROFILES = {
  lower: {
    label: "小学低学年", goal: 6,
    note: "6個できたら冒険クリア。できたことを家族でたくさん見つけよう！",
    quests: [
      { id:"wake",group:"morning",icon:"🌅",title:"あさのゲートをひらく",description:"きめたじかんまでにおきて、カーテンをあけよう",xp:20,color:"#ffd477" },
      { id:"meal",group:"morning",icon:"🍚",title:"ごはんパワーをあつめる",description:"あさ・ひる・よるのごはんをたべよう",xp:20,color:"#ffad7b" },
      { id:"brush",group:"morning",icon:"🪥",title:"ひかりのはをみがく",description:"あさとよるに、はをみがこう",xp:15,color:"#9cecff" },
      { id:"study",group:"growth",icon:"✏️",title:"ちしきのかけらをあつめる",description:"べんきょうやしゅくだいを15ぷんしよう",xp:25,color:"#bd9cff" },
      { id:"read",group:"growth",icon:"📖",title:"ほんのせかいをたびする",description:"ほんを10ぷんよもう",xp:20,color:"#ffcf83" },
      { id:"exercise",group:"growth",icon:"⚡",title:"げんきのかぜをおこす",description:"そとあそびやうんどうで、からだをうごかそう",xp:25,color:"#8fffc4" },
      { id:"help",group:"family",icon:"🧹",title:"かぞくのまちをたすける",description:"おてつだいを1つしよう",xp:20,color:"#ffc580" },
      { id:"tidy",group:"family",icon:"🧺",title:"じぶんのきちをかたづける",description:"つかったものをもとのばしょへもどそう",xp:15,color:"#8dd9ff" },
      { id:"night",group:"night",icon:"🌙",title:"つきのふねでかえる",description:"おふろとあしたのじゅんびをして、じかんにねよう",xp:25,color:"#9ea8ff" }
    ]
  },
  upper: {
    label: "小学校高学年", goal: 7,
    note: "7個で冒険クリア。全部できた日は『伝説の一日』！",
    quests: [
      { id:"wake",group:"morning",icon:"🌅",title:"朝のゲートをひらく",description:"目標の時間までに起きて、カーテンを開けよう",xp:20,color:"#ffd477" },
      { id:"meal",group:"morning",icon:"🍚",title:"元気の燃料をそろえる",description:"朝・昼・夜の食事をしっかり食べよう",xp:20,color:"#ffad7b" },
      { id:"brush",group:"morning",icon:"🪥",title:"光の結晶をみがく",description:"朝と夜に歯をみがこう",xp:15,color:"#9cecff" },
      { id:"water",group:"morning",icon:"💧",title:"命の泉を満たす",description:"こまめに水分をとろう",xp:15,color:"#78dfff" },
      { id:"study",group:"growth",icon:"📚",title:"知識の遺跡を調査する",description:"勉強や宿題に30分取り組もう",xp:25,color:"#bd9cff" },
      { id:"read",group:"growth",icon:"📖",title:"星空図書館を旅する",description:"本や新聞を15分以上読もう",xp:20,color:"#ffcf83" },
      { id:"exercise",group:"growth",icon:"⚡",title:"からだの雷を呼び起こす",description:"外遊び・運動・ストレッチを20分しよう",xp:25,color:"#8fffc4" },
      { id:"help",group:"family",icon:"🧹",title:"家族の町を助ける",description:"自分でお手伝いを1つ見つけて実行しよう",xp:20,color:"#ffc580" },
      { id:"tidy",group:"family",icon:"🧺",title:"自分の基地を整える",description:"机・部屋・使った物を元の場所へ戻そう",xp:15,color:"#8dd9ff" },
      { id:"gratitude",group:"family",icon:"💛",title:"やさしさの灯台をともす",description:"家族に『ありがとう』を伝えよう",xp:20,color:"#ffe47e" },
      { id:"night",group:"night",icon:"🌙",title:"月の船で帰還する",description:"お風呂・明日の準備をして、目標時間に寝よう",xp:25,color:"#9ea8ff" }
    ]
  },
  middle: {
    label: "中学生", goal: 8,
    note: "8個で冒険クリア。全部できた日は『伝説の一日』！",
    quests: [
      { id:"wake",group:"morning",icon:"🌅",title:"朝のゲートをひらく",description:"目標の時間までに起きて、カーテンを開けよう",xp:20,color:"#ffd477" },
      { id:"meal",group:"morning",icon:"🍚",title:"元気の燃料をそろえる",description:"朝・昼・夜の食事をしっかり食べよう",xp:20,color:"#ffad7b" },
      { id:"brush",group:"morning",icon:"🪥",title:"光の結晶をみがく",description:"朝と夜に歯をみがこう",xp:15,color:"#9cecff" },
      { id:"water",group:"morning",icon:"💧",title:"命の泉を満たす",description:"こまめに水分をとろう",xp:15,color:"#78dfff" },
      { id:"study",group:"growth",icon:"📚",title:"知識の遺跡を調査する",description:"決めた時間、集中して勉強しよう",xp:25,color:"#bd9cff" },
      { id:"review",group:"growth",icon:"✏️",title:"魔法書の空白を埋める",description:"宿題・復習・苦手な問題に取り組もう",xp:25,color:"#d4a5ff" },
      { id:"read",group:"growth",icon:"📖",title:"星空図書館を旅する",description:"本や新聞を10分以上読もう",xp:20,color:"#ffcf83" },
      { id:"exercise",group:"growth",icon:"⚡",title:"からだの雷を呼び起こす",description:"外遊び・運動・ストレッチを20分しよう",xp:25,color:"#8fffc4" },
      { id:"help",group:"family",icon:"🧹",title:"家族の町を助ける",description:"自分でお手伝いを1つ見つけて実行しよう",xp:20,color:"#ffc580" },
      { id:"tidy",group:"family",icon:"🧺",title:"自分の基地を整える",description:"机・部屋・使った物を元の場所へ戻そう",xp:15,color:"#8dd9ff" },
      { id:"gratitude",group:"family",icon:"💛",title:"やさしさの灯台をともす",description:"家族に『ありがとう』を伝えよう",xp:20,color:"#ffe47e" },
      { id:"night",group:"night",icon:"🌙",title:"月の船で帰還する",description:"お風呂・明日の準備をして、目標時間に寝よう",xp:25,color:"#9ea8ff" }
    ]
  }
};

const MEMBERS = {
  son: { label:"長男", icon:"🧑‍🚀", profileId:"middle" },
  eldest: { label:"長女", icon:"👩‍🚀", profileId:"upper" },
  youngest: { label:"次女", icon:"🧒", profileId:"lower" }
};

const EVENTS = [
  {icon:"🌈",name:"虹竜の落とし物",description:"虹竜が空に落とした色のかけらを探せ！",questIds:["meal","help"],reward:"虹色のうろこ",celebration:"元気の力と家族を助ける力が重なり、七色のうろこを発見した！"},
  {icon:"📚",name:"星空図書館の開館日",description:"雲の上の図書館が、今日だけ秘密の扉を開いている。",questIds:["study","tidy"],reward:"星読みのしおり",celebration:"学びと整理の力で、未来の空路を示すしおりが現れた！"},
  {icon:"🐉",name:"風竜のトレーニング",description:"風竜といっしょに、島を一周する力をためよう。",questIds:["exercise","meal"],reward:"風竜の羽根",celebration:"大きな風とともに、空を飛べる羽根が舞い降りた！"},
  {icon:"🏮",name:"家族の灯台祭",description:"やさしい行動で、迷子の空船を家へ導こう。",questIds:["help","tidy"],reward:"灯台の小さな火",celebration:"家族へのやさしさが、消えない灯台の火になった！"},
  {icon:"🚂",name:"朝焼け特急",description:"朝だけ現れる空の列車に乗り遅れるな！",questIds:["wake","meal"],reward:"雲海の切符",celebration:"朝焼け特急の車掌から、どこへでも行ける切符をもらった！"},
  {icon:"🌙",name:"月守りの夜",description:"島をきれいに整えて、月の船を安全に迎えよう。",questIds:["tidy","night"],reward:"月光のコンパス",celebration:"静かな月明かりの中で、夜空を指すコンパスが光った！"},
  {icon:"💎",name:"青い泉の目覚め",description:"健康の力が満ちると、一日だけ青い泉が湧き出す。",questIds:["brush","exercise"],reward:"泉の青い結晶",celebration:"元気な体の力で、島を守る青い結晶を見つけた！"},
  {icon:"🧙",name:"見習い魔導士の試験",description:"知識と朝の力をそろえて、空島魔法の試験に挑戦しよう。",questIds:["study","wake"],reward:"はじめての魔法章",celebration:"朝の集中と学びが重なり、魔法使いの証が浮かび上がった！"}
];

const $ = (id) => document.getElementById(id);
const elements = {
  memberSwitch:$("memberSwitch"),todayLabel:$("todayLabel"),memberIcon:$("memberIcon"),memberLabel:$("memberLabel"),reviewMemberName:$("reviewMemberName"),
  orbitValue:$("orbitValue"),energy:$("energy"),doneCount:$("doneCount"),goalCount:$("goalCount"),dailyGoal:$("dailyGoal"),questTotal:$("questTotal"),level:$("level"),crystalCount:$("crystalCount"),streakCount:$("streakCount"),relicCount:$("relicCount"),islandWrap:$("islandWrap"),
  storyTitle:$("storyTitle"),storyText:$("storyText"),questNote:$("questNote"),questGrid:$("questGrid"),dailyEvent:$("dailyEvent"),eventIcon:$("eventIcon"),eventName:$("eventName"),eventDescription:$("eventDescription"),eventConditions:$("eventConditions"),eventReward:$("eventReward"),rewardCard:$("rewardCard"),rewardIcon:$("rewardIcon"),rewardTitle:$("rewardTitle"),rewardText:$("rewardText"),
  childReflection:$("childReflection"),familyMessage:$("familyMessage"),completeReviewButton:$("completeReviewButton"),reviewStatus:$("reviewStatus"),nightReview:$("nightReview"),
  previewPaperButton:$("previewPaperButton"),paperModal:$("paperModal"),closePaperButton:$("closePaperButton"),printNowButton:$("printNowButton"),
  printDate:$("printDate"),printName:$("printName"),printProfile:$("printProfile"),printEventIcon:$("printEventIcon"),printEventName:$("printEventName"),printEventDescription:$("printEventDescription"),printEventCondition:$("printEventCondition"),printGoal:$("printGoal"),printQuestList:$("printQuestList"),
  resetButton:$("resetButton"),reviewButton:$("reviewButton"),celebration:$("celebration"),celebrationKicker:$("celebrationKicker"),celebrationIcon:$("celebrationIcon"),celebrationTitle:$("celebrationTitle"),celebrationText:$("celebrationText"),closeCelebration:$("closeCelebration"),toast:$("toast")
};

function dateKey(date=new Date()){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(date)}
function jpDate(date=new Date()){return new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"long",day:"numeric",weekday:"short"}).format(date)}
const todayKey = dateKey();
function emptyDay(){return{completed:[],eventClaimed:false,missionCelebrated:false,perfectCelebrated:false,childReflection:"",familyMessage:"",reviewedAt:""}}
function emptyState(){return{version:4,memberId:"son",records:{}}}
function loadState(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(parsed?.version===4&&parsed.records)return parsed;
    const old=JSON.parse(localStorage.getItem(V3_STORAGE_KEY));
    const migrated=emptyState();
    if(old?.records){
      Object.entries(old.records).forEach(([date,profiles])=>{
        migrated.records[date]={};
        if(profiles.middle)migrated.records[date].son={...emptyDay(),...profiles.middle};
        if(profiles.upper)migrated.records[date].eldest={...emptyDay(),...profiles.upper};
        if(profiles.lower)migrated.records[date].youngest={...emptyDay(),...profiles.lower};
      });
    }
    return migrated;
  }catch{return emptyState()}
}
let state=loadState();
function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch{}}
function member(){return MEMBERS[state.memberId]||MEMBERS.son}
function profile(){return PROFILES[member().profileId]}
function day(date=todayKey,memberId=state.memberId){if(!state.records[date])state.records[date]={};if(!state.records[date][memberId])state.records[date][memberId]=emptyDay();return state.records[date][memberId]}
function daysAgo(n){return dateKey(new Date(Date.now()-n*86400000))}
function validEvents(){const ids=new Set(profile().quests.map(q=>q.id));return EVENTS.filter(e=>e.questIds.every(id=>ids.has(id)))}
function todayEvent(){const choices=validEvents();const seed=[...`${todayKey}-${state.memberId}`].reduce((a,c)=>a+c.charCodeAt(0),0);return choices[seed%choices.length]}
function stats(){let crystals=0,relics=0;Object.values(state.records).forEach(record=>{const d=record?.[state.memberId];if(!d)return;crystals+=(d.completed?.length||0)*10;if(d.eventClaimed){crystals+=40;relics++}if(d.missionCelebrated)crystals+=20;if(d.perfectCelebrated)crystals+=80});let streak=0;const start=day().completed.length>=profile().goal?0:1;for(let i=start;i<366;i++){const d=state.records[daysAgo(i)]?.[state.memberId];if(d?.completed?.length>=profile().goal)streak++;else break}return{crystals,relics,streak,level:1+Math.floor(crystals/180)}}

function buildQuests(){elements.questGrid.innerHTML="";GROUPS.forEach(group=>{const list=profile().quests.filter(q=>q.group===group.id);if(!list.length)return;const section=document.createElement("section");section.className="quest-group";section.innerHTML=`<h3 class="group-heading"><span>${group.icon}</span>${group.title}</h3>`;const grid=document.createElement("div");grid.className="quest-grid";list.forEach(q=>{const b=document.createElement("button");b.type="button";b.className="quest";b.dataset.id=q.id;b.style.setProperty("--quest-color",q.color);b.innerHTML=`<span class="quest-icon">${q.icon}</span><span><strong>${q.title}</strong><small>${q.description}</small><span class="quest-xp">ひかり石 +10</span></span><span class="quest-check">✓</span>`;grid.appendChild(b)});section.appendChild(grid);elements.questGrid.appendChild(section)})}
function buildPaper(){const p=profile(),m=member(),e=todayEvent();const qMap=new Map(p.quests.map(q=>[q.id,q]));elements.printDate.textContent=jpDate();elements.printName.textContent=m.label;elements.printProfile.textContent=p.label;elements.printEventIcon.textContent=e.icon;elements.printEventName.textContent=e.name;elements.printEventDescription.textContent=e.description;elements.printEventCondition.textContent=`秘密の条件：${e.questIds.map(id=>`${qMap.get(id).icon} ${qMap.get(id).title}`).join(" ＋ ")}`;elements.printGoal.textContent=p.goal;elements.printQuestList.innerHTML="";p.quests.forEach((q,i)=>{const item=document.createElement("div");item.className="print-quest";item.innerHTML=`<span class="paper-check"></span><span class="paper-number">${i+1}</span><span class="paper-icon">${q.icon}</span><div><strong>${q.title}</strong><small>${q.description}</small></div>`;elements.printQuestList.appendChild(item)})}
function updateStory(count){const p=profile();if(count===0){elements.storyTitle.textContent="ねむり島が、君を待っている。";elements.storyText.textContent=`${mLabel()}の今日の行動が島の力になる。${p.goal}つの光を集めよう。`}else if(count<Math.ceil(p.goal*.4)){elements.storyTitle.textContent="島の奥で、小さな音がした。";elements.storyText.textContent="最初の光がともった。案内役のモコがうれしそうに飛んでいる。"}else if(count<p.goal){elements.storyTitle.textContent="木々が芽吹き、風が歌いはじめた。";elements.storyText.textContent=`あと${p.goal-count}つで冒険クリア。雲の向こうに道が見えてきた。`}else if(count<p.quests.length){elements.storyTitle.textContent="ねむり島、完全復活！";elements.storyText.textContent="今日の冒険はクリア。残りは伝説の一日へのボーナス冒険。"}else{elements.storyTitle.textContent="伝説の一日が空に刻まれた！";elements.storyText.textContent="すべての光がそろい、星雲ドラゴンが現れた。"}}
function mLabel(){return member().label}
function updateReward(count){const p=profile(),a=Math.ceil(p.goal*.4),b=Math.ceil(p.goal*.7);elements.rewardCard.classList.toggle("unlocked",count>=a);if(count<a){elements.rewardIcon.textContent="🥚";elements.rewardTitle.textContent="ふしぎなタマゴ";elements.rewardText.textContent=`あと${a-count}つで仲間の気配が見つかる。`}else if(count<b){elements.rewardIcon.textContent="☁️";elements.rewardTitle.textContent="星わたげのモコ";elements.rewardText.textContent="タマゴから空を泳ぐ仲間が生まれた。"}else if(count<p.goal){elements.rewardIcon.textContent="🌱";elements.rewardTitle.textContent="空島ガーデン";elements.rewardText.textContent="花畑と風車が現れた。あと少しで塔が起動する。"}else if(count<p.quests.length){elements.rewardIcon.textContent="🏰";elements.rewardTitle.textContent="星見の塔";elements.rewardText.textContent="冒険クリア。残りは伝説へのボーナスクエスト。"}else{elements.rewardIcon.textContent="🐉";elements.rewardTitle.textContent="星雲ドラゴン";elements.rewardText.textContent="すべて達成した日にだけ現れる空島の守護竜。"}}
function updateEvent(d){const e=todayEvent(),done=new Set(d.completed),p=profile();elements.eventIcon.textContent=e.icon;elements.eventName.textContent=e.name;elements.eventDescription.textContent=e.description;elements.eventConditions.innerHTML="";e.questIds.forEach(id=>{const q=p.quests.find(x=>x.id===id);const chip=document.createElement("span");chip.className=`condition-chip${done.has(id)?" done":""}`;chip.textContent=`${done.has(id)?"✓ ":""}${q.icon} ${q.title}`;elements.eventConditions.appendChild(chip)});elements.dailyEvent.classList.toggle("completed",d.eventClaimed);elements.eventReward.textContent=d.eventClaimed?e.reward:e.questIds.every(id=>done.has(id))?"発見！":"？？？"}
function claimEvent(d){if(d.eventClaimed)return false;const e=todayEvent(),done=new Set(d.completed);if(!e.questIds.every(id=>done.has(id)))return false;d.eventClaimed=true;return true}
function render(){const m=member(),p=profile(),d=day(),done=new Set(d.completed),s=stats(),count=d.completed.length,percentage=Math.round(count/p.quests.length*100),circ=327;elements.todayLabel.textContent=jpDate();elements.memberSwitch.querySelectorAll("button").forEach(b=>{const selected=b.dataset.member===state.memberId;b.classList.toggle("selected",selected);b.setAttribute("aria-pressed",String(selected))});document.querySelectorAll(".quest").forEach(b=>{const completed=done.has(b.dataset.id);b.classList.toggle("done",completed);b.setAttribute("aria-pressed",String(completed))});elements.memberIcon.textContent=m.icon;elements.memberLabel.textContent=m.label;elements.reviewMemberName.textContent=m.label;elements.doneCount.textContent=count;elements.goalCount.textContent=Math.min(count,p.goal);elements.dailyGoal.textContent=p.goal;elements.questTotal.textContent=p.quests.length;elements.energy.textContent=percentage;elements.level.textContent=s.level;elements.crystalCount.textContent=s.crystals;elements.streakCount.textContent=s.streak;elements.relicCount.textContent=s.relics;elements.questNote.textContent=p.note;elements.orbitValue.style.strokeDashoffset=String(circ-circ*percentage/100);elements.islandWrap.classList.toggle("phase-1",count>=Math.ceil(p.goal*.25));elements.islandWrap.classList.toggle("phase-2",count>=Math.ceil(p.goal*.65));elements.islandWrap.classList.toggle("phase-3",count>=p.goal);elements.islandWrap.classList.toggle("phase-perfect",count===p.quests.length);elements.childReflection.value=d.childReflection||"";elements.familyMessage.value=d.familyMessage||"";elements.reviewStatus.textContent=d.reviewedAt?`保存済み：${new Intl.DateTimeFormat("ja-JP",{hour:"2-digit",minute:"2-digit"}).format(new Date(d.reviewedAt))}`:"まだ今日の記録は保存されていません。";elements.reviewStatus.classList.toggle("done",Boolean(d.reviewedAt));updateStory(count);updateReward(count);updateEvent(d);buildPaper();saveState()}
function burst(target,amount=16){const r=target.getBoundingClientRect();for(let i=0;i<amount;i++){const x=document.createElement("span"),a=Math.PI*2*i/amount,d=45+Math.random()*55;x.className="burst";x.style.left=`${r.left+r.width/2}px`;x.style.top=`${r.top+r.height/2}px`;x.style.background=["#85f5ff","#ffe487","#bc9cff","#91ffbf"][i%4];x.style.setProperty("--x",`${Math.cos(a)*d}px`);x.style.setProperty("--y",`${Math.sin(a)*d}px`);document.body.appendChild(x);x.addEventListener("animationend",()=>x.remove())}}
function toast(text){elements.toast.textContent=text;elements.toast.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>elements.toast.classList.remove("show"),2200)}
function celebrate(kicker,icon,title,text){elements.celebrationKicker.textContent=kicker;elements.celebrationIcon.textContent=icon;elements.celebrationTitle.textContent=title;elements.celebrationText.textContent=text;elements.celebration.classList.add("show");elements.celebration.setAttribute("aria-hidden","false");burst(elements.islandWrap,30)}
function toggleQuest(button){const p=profile(),d=day(),id=button.dataset.id,index=d.completed.indexOf(id),was=index>=0;if(was)d.completed.splice(index,1);else{d.completed.push(id);burst(button)}d.reviewedAt="";const found=!was&&claimEvent(d),count=d.completed.length;saveState();render();if(!was&&count===p.quests.length&&!d.perfectCelebrated){d.perfectCelebrated=true;d.missionCelebrated=true;saveState();celebrate("LEGENDARY DAY","🐉","伝説の一日、完成！","すべての光がそろい、星雲ドラゴンが目を覚ました！")}else if(!was&&count>=p.goal&&!d.missionCelebrated){d.missionCelebrated=true;saveState();celebrate("MISSION COMPLETE","🌟","ねむり島が目を覚ました！",`${p.goal}つの光が集まり、星見の塔が起動した！`)}else if(found){const e=todayEvent();celebrate("SECRET TREASURE",e.icon,`${e.reward}を発見！`,e.celebration)}}
function selectMember(id){if(!MEMBERS[id]||id===state.memberId)return;state.memberId=id;buildQuests();render();toast(`${member().label}の冒険に切り替えました`)}
function openPaper(){buildPaper();elements.paperModal.classList.add("show");elements.paperModal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closePaper(){elements.paperModal.classList.remove("show");elements.paperModal.setAttribute("aria-hidden","true");document.body.style.overflow=""}

elements.memberSwitch.addEventListener("click",e=>{const b=e.target.closest("button[data-member]");if(b)selectMember(b.dataset.member)});
elements.questGrid.addEventListener("click",e=>{const b=e.target.closest(".quest");if(b)toggleQuest(b)});
[elements.childReflection,elements.familyMessage].forEach(field=>field.addEventListener("input",()=>{const d=day();d.childReflection=elements.childReflection.value;d.familyMessage=elements.familyMessage.value;d.reviewedAt="";saveState();elements.reviewStatus.textContent="入力中です。最後に保存ボタンを押してください。";elements.reviewStatus.classList.remove("done")}));
elements.completeReviewButton.addEventListener("click",()=>{const d=day();d.childReflection=elements.childReflection.value.trim();d.familyMessage=elements.familyMessage.value.trim();d.reviewedAt=new Date().toISOString();saveState();render();celebrate("FAMILY REVIEW COMPLETE","🌙","今日の冒険を保存した！","家族で確認した時間も、空島を育てる大切な力です。")});
elements.previewPaperButton.addEventListener("click",openPaper);elements.closePaperButton.addEventListener("click",closePaper);elements.printNowButton.addEventListener("click",()=>window.print());elements.paperModal.addEventListener("click",e=>{if(e.target===elements.paperModal)closePaper()});
elements.reviewButton.addEventListener("click",()=>{elements.nightReview.classList.add("review-focus");elements.nightReview.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>elements.nightReview.classList.remove("review-focus"),1400)});
elements.resetButton.addEventListener("click",()=>{if(!confirm(`${member().label}の今日の記録をリセットしますか？`))return;state.records[todayKey][state.memberId]=emptyDay();saveState();render();toast("今日の記録をリセットしました")});
elements.closeCelebration.addEventListener("click",()=>{elements.celebration.classList.remove("show");elements.celebration.setAttribute("aria-hidden","true")});

const params=new URLSearchParams(location.search);if(MEMBERS[params.get("member")])state.memberId=params.get("member");buildQuests();render();if(params.get("paper")==="1")setTimeout(openPaper,50);
