// ===================== 1. 詞彙數據（僅開放職業分類） =====================
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
// 分類繁體對照
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

// 拼寫遊戲專用變數
let spellTargetEn = ""; // 目標正確英文單詞
let spellUserAnswer = []; // 使用者選取的字母陣列
let spellShuffleLetters = []; // 亂序字母池

// ===================== 頁面切換控制 =====================
function hideAllPage() {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
}
function showPage(pageId) {
  hideAllPage();
  document.getElementById(pageId).classList.remove("hidden");
}
function backHome() { showPage("page-home"); }
function backMode() { showPage("page-mode"); }

// ===================== 首頁分類按鈕渲染（雙行大字小字，僅職業可點） =====================
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

// 選取分類
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

// ===================== 模式按鈕綁定 & 標題動態切換 =====================
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.onclick = () => {
    currentMode = btn.dataset.mode;
    const cnName = catNameMap[currentCat];
    const enName = currentCat;
    const titleDom = document.getElementById("currentCatName");
    if (currentMode === "en") {
      titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${enName}</div><div style="font-size:20px; opacity:0.7;">${cnName}</div>`;
    } else {
      titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${cnName}</div><div style="font-size:20px; opacity:0.7;">${enName}</div>`;
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

// ===================== 中文/英文朗讀模式 =====================
function nextWord() {
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  wordDom.innerText = currentMode === "cn" ? currentWord.cn : currentWord.en;
}
// 播放喇叭邏輯（英文切換英式清晰發音）
document.getElementById("voiceBtn").onclick = function () {
  if (!currentWord) return;
  if (currentMode === "cn") {
    // 普通話 → 粵語
    const mandarin = new SpeechSynthesisUtterance(currentWord.cn);
    mandarin.lang = "zh-CN";
    mandarin.rate = 0.9;
    speechSynthesis.speak(mandarin);
    setTimeout(() => {
      const cantonese = new SpeechSynthesisUtterance(currentWord.cn);
      cantonese.lang = "zh-HK";
      cantonese.rate = 0.9;
      speechSynthesis.speak(cantonese);
    }, 1200);
  } else {
    // 優化英文音源：英式 en-GB，速度放慢適合幼兒
    const engVoice = new SpeechSynthesisUtterance(currentWord.en);
    engVoice.lang = "en-GB";
    engVoice.rate = 0.85;
    speechSynthesis.speak(engVoice);
  }
};

// ===================== 配對遊戲邏輯 =====================
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
// 配對頁播放按鈕
document.getElementById("qVoiceBtn").onclick = function () {
  if (!currentWord) return;
  if (matchType === "cn2en") {
    const md = new SpeechSynthesisUtterance(currentWord.cn);
    md.lang = "zh-CN";
    md.rate = 0.9;
    speechSynthesis.speak(md);
    setTimeout(() => {
      const ct = new SpeechSynthesisUtterance(currentWord.cn);
      ct.lang = "zh-HK";
      ct.rate = 0.9;
      speechSynthesis.speak(ct);
    }, 1200);
  } else {
    const eng = new SpeechSynthesisUtterance(currentWord.en);
    eng.lang = "en-GB";
    eng.rate = 0.85;
    speechSynthesis.speak(eng);
  }
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

// ===================== 全新：拼寫遊戲完整邏輯 =====================
// 初始化拼寫頁面
function initSpellGame() {
  // 隨機取單詞
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  spellTargetEn = currentWord.en.toUpperCase();
  spellUserAnswer = [];

  // 組合亂序字母：正確字母 + 2個干擾字母
  const correctLetters = spellTargetEn.split("");
  const allAlphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const extraLetters = allAlphabet.filter(l => !correctLetters.includes(l))
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  spellShuffleLetters = [...correctLetters, ...extraLetters].sort(() => Math.random() - 0.5);

  renderSpellUI();
}

// 渲染拼寫介面（橫線作答區、字母按鈕）
function renderSpellUI() {
  document.getElementById("spellCnWord").innerText = currentWord.cn;
  document.getElementById("spellTip").innerText = "";

  // 作答橫線顯示已選字母
  const lineBox = document.getElementById("spellAnswerLine");
  lineBox.innerHTML = spellUserAnswer.map(l => `<span>${l}</span>`).join("");

  // 生成亂序字母按鈕
  const letterWrap = document.getElementById("spellLetterBox");
  letterWrap.innerHTML = "";
  spellShuffleLetters.forEach(letter => {
    const btn = document.createElement("button");
    btn.innerText = letter;
    btn.onclick = () => {
      spellUserAnswer.push(letter);
      renderSpellUI();
    };
    letterWrap.appendChild(btn);
  });
}

// 拼寫頁播放發音（普話→粵語→英文）
document.getElementById("spellVoiceBtn").onclick = function () {
  // 普通話
  const md = new SpeechSynthesisUtterance(currentWord.cn);
  md.lang = "zh-CN";
  md.rate = 0.9;
  speechSynthesis.speak(md);
  setTimeout(() => {
    // 粵語
    const ct = new SpeechSynthesisUtterance(currentWord.cn);
    ct.lang = "zh-HK";
    ct.rate = 0.9;
    speechSynthesis.speak(ct);
    setTimeout(() => {
      // 英文英式發音
      const enVoice = new SpeechSynthesisUtterance(currentWord.en);
      enVoice.lang = "en-GB";
      enVoice.rate = 0.85;
      speechSynthesis.speak(enVoice);
    }, 1000);
  }, 1200);
};

// 取消前一個字母
document.getElementById("spellUndo").onclick = function () {
  if (spellUserAnswer.length > 0) {
    spellUserAnswer.pop();
    renderSpellUI();
  }
};

// 清空全部答案
document.getElementById("spellClearAll").onclick = function () {
  spellUserAnswer = [];
  renderSpellUI();
};

// 確認拼寫答案
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

// 切換下一單詞
function nextSpellWord() {
  initSpellGame();
}

// ===================== 頁面初始化 =====================
window.onload = function () {
  initCategory();
};
