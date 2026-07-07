// ===================== 1. 詞彙數據 英文全小寫 =====================
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

let currentCat = "";
let currentMode = "";
let wordList = [];
let currentWord = null;
let spellTargetEn = "";
let spellUserAnswer = [];
let spellShuffleLetters = [];

// 頁面切換
function hideAllPage() {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
}
function showPage(pageId) {
  hideAllPage();
  document.getElementById(pageId).classList.remove("hidden");
}
function backHome() { showPage("page-home"); }
function backMode() { showPage("page-mode"); }

// 首頁分類按鈕
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

function selectCategory(catKey) {
  currentCat = catKey;
  if (catKey === "All") {
    wordList = [];
    Object.values(wordData).forEach(arr => wordList.push(...arr));
  } else {
    wordList = [...wordData[catKey]];
  }
  if (wordList.length === 0) {
    alert("目前此分類尚未新增詞彙，敬請期待！");
    return;
  }
  showPage("page-mode");
}

// 模式切換
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

// ===================== 優化發音函數（解決普通話太慢、斷音問題） =====================
function playCnVoice(wordCn) {
  speechSynthesis.cancel(); // 先停止正在播放的語音，避免重疊
  const mandarin = new SpeechSynthesisUtterance(wordCn);
  mandarin.lang = "zh-CN";
  mandarin.rate = 1.05; // 加快普通話速度，解決過慢
  mandarin.pitch = 1;
  speechSynthesis.speak(mandarin);
  // 縮短延遲至600ms，讀音流暢不拖沓
  setTimeout(() => {
    const cantonese = new SpeechSynthesisUtterance(wordCn);
    cantonese.lang = "zh-HK";
    cantonese.rate = 0.95;
    speechSynthesis.speak(cantonese);
  }, 600);
}
function playEnVoice(wordEn) {
  speechSynthesis.cancel();
  // 優化英式發音，清晰度提升，模擬標準英文讀音
  const engVoice = new SpeechSynthesisUtterance(wordEn);
  engVoice.lang = "en-GB";
  engVoice.rate = 0.8;
  engVoice.pitch = 1.02;
  speechSynthesis.speak(engVoice);
}

// 中文/英文朗讀
function nextWord() {
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  wordDom.innerText = currentMode === "cn" ? currentWord.cn : currentWord.en;
}
document.getElementById("voiceBtn").onclick = function () {
  if (!currentWord) return;
  currentMode === "cn" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};

// 配對遊戲
let matchType = "cn2en";
function createMatchQ() {
  matchType = Math.random() > 0.5 ? "cn2en" : "en2cn";
  const correctIdx = Math.floor(Math.random() * wordList.length);
  const correctWord = wordList[correctIdx];
  currentWord = correctWord;
  const otherWords = wordList.filter((_, i) => i !== correctIdx)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const options = [correctWord, ...otherWords].sort(() => Math.random() - 0.5);

  const qDom = document.getElementById("qWord");
  const optWrap = document.getElementById("optionWrap");
  const tipDom = document.getElementById("matchTip");
  tipDom.innerText = "";
  optWrap.innerHTML = "";

  if (matchType === "cn2en") {
    qDom.innerText = correctWord.cn;
    options.forEach(item => {
      const btn = document.createElement("button");
      btn.innerText = item.en;
      btn.onclick = () => checkMatchAnswer(item.en, correctWord.en, tipDom);
      optWrap.appendChild(btn);
    });
  } else {
    qDom.innerText = correctWord.en;
    options.forEach(item => {
      const btn = document.createElement("button");
      btn.innerText = item.cn;
      btn.onclick = () => checkMatchAnswer(item.cn, correctWord.cn, tipDom);
      optWrap.appendChild(btn);
    });
  }
}
document.getElementById("qVoiceBtn").onclick = function () {
  if (!currentWord) return;
  matchType === "cn2en" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};
function checkMatchAnswer(select, right, tipDom) {
  if (select === right) {
    tipDom.style.color = "#00aa00";
    tipDom.innerText = "答對啦！";
    setTimeout(() => createMatchQ(), 1200);
  } else {
    tipDom.style.color = "#f03030";
    tipDom.innerText = "答錯了，再試試！";
  }
}

// ===================== 重製拼寫遊戲邏輯（僅顯示正確字母 + 自動拆分橫線） =====================
function initSpellGame() {
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  spellTargetEn = currentWord.en.toLowerCase();
  spellUserAnswer = [];
  // 只提取單詞自身字母，不增加干擾字母
  spellShuffleLetters = spellTargetEn.split("").sort(() => Math.random() - 0.5);
  renderSpellUI();
}

function renderSpellUI() {
  document.getElementById("spellCnWord").innerText = currentWord.cn;
  document.getElementById("spellTip").innerText = "";
  const targetLength = spellTargetEn.length;

  // 自動生成對應長度的拆分橫線格
  const lineBox = document.getElementById("spellAnswerLine");
  lineBox.innerHTML = "";
  for(let i=0; i<targetLength; i++){
    const cell = document.createElement("div");
    cell.className = "spell-cell";
    cell.textContent = spellUserAnswer[i] || "";
    lineBox.appendChild(cell);
  }

  // 生成剩餘可用字母按鈕，已選過的字母不再顯示
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

// 拼寫播放按鈕
document.getElementById("spellVoiceBtn").onclick = function () {
  playCnVoice(currentWord.cn);
};

// 頁面載入時綁定拼寫操作按鈕
document.addEventListener("DOMContentLoaded", function(){
  // 刪除上一個
  document.getElementById("spellUndo").onclick = function () {
    if (spellUserAnswer.length > 0) {
      spellUserAnswer.pop();
      renderSpellUI();
    }
  };
  // 清空全部
  document.getElementById("spellClearAll").onclick = function () {
    spellUserAnswer = [];
    renderSpellUI();
  };
  // 確認答案
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

window.onload = function () {
  initCategory();
};
