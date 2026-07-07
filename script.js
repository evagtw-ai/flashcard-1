// ===================== 1. 詞彙分類全部數據（英文強制轉小寫） =====================
const wordData = {
  Occupation: [
    { cn: "飛機師", en: "pilot" },
    { cn: "郵差", en: "postman" },
    { cn: "護士", en: "nurse" },
    { cn: "醫生", en: "doctor" },
    { cn: "老師", en: "teacher" },
    { cn: "太空人", en: "astronaut" },
    { cn: "警察", en: "policeman" },
    { cn: "消防員", en: "fireman" },
    { cn: "農夫", en: "farmer" },
    { cn: "廚師", en: "chef" },
    { cn: "畫家", en: "artist" },
    { cn: "歌手", en: "singer" },
    { cn: "演員", en: "actor" },
    { cn: "漁夫", en: "fisherman" },
    { cn: "建築工人", en: "builder" },
    { cn: "工程師", en: "engineer" },
    { cn: "司機", en: "driver" },
    { cn: "學生", en: "student" }
  ],
  Color: [],
  Nature: [],
  Clothing: [],
  Object: [],
  Vegetable: [],
  Place: [],
  Animal: [],
  Transportation: [],
  Stationary: [],
  Fruit: [],
  People: [],
  All: []
};
// 分類中文顯示名
const catNameMap = {
  Color: "顏色",
  Nature: "大自然",
  Clothing: "衣服",
  Object: "物件",
  Vegetable: "蔬菜",
  Place: "地方",
  Occupation: "職業",
  Animal: "動物",
  Transportation: "交通",
  Stationary: "文具",
  Fruit: "水果",
  People: "人物",
  All: "全部"
};
// 全域變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let currentWord = null;
// 拼寫專用變數
let spellTargetEn = "";
let spellUserAnswer = [];
let spellShuffleLetters = [];
// 語音識別
let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// ===================== 2. 頁面切換控制 =====================
function hideAllPage() {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
}
function showPage(id) {
  hideAllPage();
  document.getElementById(id).classList.remove("hidden");
}
// 返回首頁
function backHome() {
  showPage("page-home");
}
// 返回模式選擇頁
function backMode() {
  showPage("page-mode");
  if(recognition) recognition.abort();
}

// ===================== 3. 首頁渲染分類按鈕（僅職業可點，其餘灰色禁用） =====================
function initCategory() {
  const wrap = document.getElementById("categoryWrap");
  wrap.innerHTML = "";
  Object.keys(wordData).forEach(key => {
    const btn = document.createElement("button");
    btn.innerHTML = `
      <div style="font-size:22px; font-weight:bold;">${catNameMap[key]}</div>
      <div style="font-size:14px; opacity:0.8;">${key}</div>
    `;
    if (key === "Occupation") {
      btn.onclick = () => selectCategory(key);
    } else {
      btn.disabled = true;
    }
    wrap.appendChild(btn);
  });
}
// 選中分類
function selectCategory(catKey) {
  currentCat = catKey;
  if (catKey === "All") {
    wordList = [];
    Object.values(wordData).forEach(arr => wordList.push(...arr));
  } else {
    wordList = [...wordData[catKey]];
  }
  if (wordList.length === 0) {
    alert("當前分類暫無單詞，敬請期待！");
    return;
  }
  const cnName = catNameMap[currentCat];
  const enName = currentCat;
  const titleDom = document.getElementById("currentCatName");
  titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${cnName}</div><div style="font-size:20px; opacity:0.7;">${enName.toLowerCase()}</div>`;
  showPage("page-mode");
}

// ===================== 4. 模式選擇綁定（新增拼寫遊戲） =====================
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.onclick = () => {
    currentMode = btn.dataset.mode;
    const cnName = catNameMap[currentCat];
    const enName = currentCat;
    const titleDom = document.getElementById("currentCatName");
    if (currentMode === "en") {
      titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${enName.toLowerCase()}</div><div style="font-size:20px; opacity:0.7;">${cnName}</div>`;
    } else {
      titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${cnName}</div><div style="font-size:20px; opacity:0.7;">${enName.toLowerCase()}</div>`;
    }

    if (currentMode === "cn" || currentMode === "en") {
      nextWord();
      showPage("page-study");
    } else if (currentMode === "match") {
      createMatchQ();
      showPage("page-match");
    } else if (currentMode === "spell") {
      initSpellGame();
      showPage("page-spell");
    }
  };
});

// ===================== 5. 發音函數（固定1200ms定時器，普通話舊版邏輯） =====================
function playCnVoice(wordCn) {
  speechSynthesis.cancel();
  const mandarin = new SpeechSynthesisUtterance(wordCn);
  mandarin.lang = "zh-CN";
  mandarin.rate = 1.0;
  speechSynthesis.speak(mandarin);
  setTimeout(() => {
    const cantonese = new SpeechSynthesisUtterance(wordCn);
    cantonese.lang = "zh-HK";
    cantonese.rate = 0.95;
    speechSynthesis.speak(cantonese);
  }, 1200);
}
function playEnVoice(wordEn) {
  speechSynthesis.cancel();
  const eng = new SpeechSynthesisUtterance(wordEn);
  eng.lang = "en-GB";
  eng.rate = 0.8;
  speechSynthesis.speak(eng);
}

// ===================== 中文/英文朗讀模式邏輯 =====================
// 隨機下一個單詞
function nextWord() {
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  document.getElementById("studyVoiceTip").innerText = "";
  wordDom.innerText = currentMode === "cn" ? currentWord.cn : currentWord.en;
}
// 學習頁播放按鈕
document.getElementById("voiceBtn").onclick = function () {
  if (!currentWord) return;
  currentMode === "cn" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};

// ===================== 通用語音識別函數（讀字判斷正確） =====================
function startVoiceCheck(targetText, tipEl) {
  tipEl.innerText = "";
  if (!SpeechRecognition) {
    tipEl.innerText = "瀏覽器不支援麥克風辨識";
    tipEl.style.color = "red";
    return;
  }
  if (recognition) recognition.abort();
  recognition = new SpeechRecognition();
  recognition.lang = "zh-HK";
  recognition.continuous = false;
  recognition.interimResults = false;

  tipEl.innerText = "請大聲讀出詞彙...";
  tipEl.style.color = "#0066cc";

  recognition.onresult = (e) => {
    const userRead = e.results[0][0].transcript.trim();
    if (userRead === targetText) {
      tipEl.innerText = "答對啦！👏";
      tipEl.style.color = "#00aa00";
    } else {
      tipEl.innerText = `你讀了：${userRead}，再試一次`;
      tipEl.style.color = "#f03030";
    }
  };
  recognition.onerror = () => {
    tipEl.innerText = "辨識失敗，請開啟麥克風權限";
    tipEl.style.color = "red";
  };
  recognition.start();
}
// 學習頁麥克風
document.getElementById("micBtn").onclick = function () {
  const tip = document.getElementById("studyVoiceTip");
  startVoiceCheck(currentWord.cn, tip);
};

// ===================== 6. 中英文配對答題邏輯 =====================
let matchType = "cn2en";
function createMatchQ() {
  matchType = Math.random() > 0.5 ? "cn2en" : "en2cn";
  const correctIdx = Math.floor(Math.random() * wordList.length);
  const correct = wordList[correctIdx];
  currentWord = correct;
  let otherList = wordList.filter((_, i) => i !== correctIdx);
  otherList = otherList.sort(() => Math.random() - 0.5).slice(0, 2);
  const options = [correct, ...otherList].sort(() => Math.random() - 0.5);

  const qDom = document.getElementById("qWord");
  const optWrap = document.getElementById("optionWrap");
  const tipDom = document.getElementById("matchTip");
  const voiceTip = document.getElementById("matchVoiceTip");
  tipDom.innerText = "";
  voiceTip.innerText = "";
  optWrap.innerHTML = "";

  if (matchType === "cn2en") {
    qDom.innerText = correct.cn;
    options.forEach(item => {
      const btn = document.createElement("button");
      btn.innerText = item.en;
      btn.onclick = () => checkAnswer(item.en, correct.en, tipDom);
      optWrap.appendChild(btn);
    });
  } else {
    qDom.innerText = correct.en;
    options.forEach(item => {
      const btn = document.createElement("button");
      btn.innerText = item.cn;
      btn.onclick = () => checkAnswer(item.cn, correct.cn, tipDom);
      optWrap.appendChild(btn);
    });
  }
}
// 配對頁發音按鈕
document.getElementById("qVoiceBtn").onclick = function () {
  if (!currentWord) return;
  matchType === "cn2en" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};
// 配對頁麥克風
document.getElementById("qMicBtn").onclick = function () {
  const tip = document.getElementById("matchVoiceTip");
  startVoiceCheck(currentWord.cn, tip);
};
// 判斷答案
function checkAnswer(select, right, tipDom) {
  if (select === right) {
    tipDom.style.color = "#00aa00";
    tipDom.innerText = "答對啦！";
    setTimeout(() => createMatchQ(), 1200);
  } else {
    tipDom.style.color = "#f03030";
    tipDom.innerText = "答錯咯，再試試！";
  }
}

// ===================== 7. 拼寫遊戲完整邏輯（僅正確字母、自動橫線） =====================
function initSpellGame() {
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  spellTargetEn = currentWord.en.toLowerCase();
  spellUserAnswer = [];
  spellShuffleLetters = spellTargetEn.split("").sort(() => Math.random() - 0.5);
  renderSpellUI();
  document.getElementById("spellVoiceTip").innerText = "";
}
function renderSpellUI() {
  document.getElementById("spellCnWord").innerText = currentWord.cn;
  document.getElementById("spellTip").innerText = "";
  const targetLength = spellTargetEn.length;

  // 自動生成對應長度橫線格
  const lineBox = document.getElementById("spellAnswerLine");
  lineBox.innerHTML = "";
  for(let i=0; i<targetLength; i++){
    const cell = document.createElement("div");
    cell.className = "spell-cell";
    cell.textContent = spellUserAnswer[i] || "";
    lineBox.appendChild(cell);
  }
  // 剩餘可點擊字母
  const letterWrap = document.getElementById("spellLetterBox");
  letterWrap.innerHTML = "";
  const remainLetters = spellShuffleLetters.filter(l => !spellUserAnswer.includes(l));
  remainLetters.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = function() {
      spellUserAnswer.push(letter);
      renderSpellUI();
    };
    letterWrap.appendChild(btn);
  });
}
// 拼寫頁發音
document.getElementById("spellVoiceBtn").onclick = function () {
  playCnVoice(currentWord.cn);
};
// 拼寫麥克風
document.getElementById("spellMicBtn").onclick = function () {
  const tip = document.getElementById("spellVoiceTip");
  startVoiceCheck(currentWord.cn, tip);
};
// 拼寫操作按鈕綁定
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("spellUndo").onclick = function () {
    if (spellUserAnswer.length > 0) {
      spellUserAnswer.pop();
      renderSpellUI();
    }
  };
  document.getElementById("spellClearAll").onclick = function () {
    spellUserAnswer = [];
    renderSpellUI();
  };
  document.getElementById("spellCheckAnswer").onclick = function () {
    const userStr = spellUserAnswer.join("");
    const tipDom = document.getElementById("spellTip");
    if (userStr === spellTargetEn) {
      tipDom.style.color = "#00aa00";
      tipDom.innerText = "拼寫正確！👏";
      setTimeout(() => initSpellGame(), 1500);
    } else {
      tipDom.style.color = "#f03030";
      tipDom.innerText = "拼寫錯誤，再嘗試一次";
    }
  };
});
function nextSpellWord() {
  initSpellGame();
}

// ===================== 關鍵修復：DOM載入完成立刻渲染分類，解決空白 =====================
document.addEventListener("DOMContentLoaded", function(){
  initCategory();
});
