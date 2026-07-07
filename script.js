// ===================== 1. 詞彙分類全部數據 =====================
const wordData = {
  Occupation: [
    { cn: "飛機師", en: "Pilot" },
    { cn: "郵差", en: "Postman" },
    { cn: "護士", en: "Nurse" },
    { cn: "醫生", en: "Doctor" },
    { cn: "老師", en: "Teacher" },
    { cn: "太空人", en: "Astronaut" },
    { cn: "警察", en: "Policeman" },
    { cn: "消防員", en: "Fireman" },
    { cn: "農夫", en: "Farmer" },
    { cn: "廚師", en: "Chef" },
    { cn: "畫家", en: "Artist" },
    { cn: "歌手", en: "Singer" },
    { cn: "演員", en: "Actor" },
    { cn: "漁夫", en: "Fisherman" },
    { cn: "建築工人", en: "Builder" },
    { cn: "工程師", en: "Engineer" },
    { cn: "司機", en: "Driver" },
    { cn: "學生", en: "Student" }
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
// 分類繁體中文名稱
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
// 全局變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let currentWord = null;

// ===================== 2. 頁面切換控制 =====================
function hideAllPage() {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
}
function showPage(id) {
  hideAllPage();
  document.getElementById(id).classList.remove("hidden");
}
function backHome() {
  showPage("page-home");
}
function backMode() {
  showPage("page-mode");
}

// ===================== 3. 首頁分類按鈕渲染（雙行上下大字小字） =====================
function initCategory() {
  const wrap = document.getElementById("categoryWrap");
  wrap.innerHTML = "";
  Object.keys(wordData).forEach(key => {
    const btn = document.createElement("button");
    // 雙行結構：上繁體中文大字，下英文小字
    btn.innerHTML = `
      <div style="font-size:22px; font-weight:bold;">${catNameMap[key]}</div>
      <div style="font-size:14px; opacity:0.8;">${key}</div>
    `;

    // 僅職業分類可點擊，其餘灰色禁用
    if (key === "Occupation") {
      btn.onclick = () => selectCategory(key);
    } else {
      btn.disabled = true;
      btn.style.opacity = "0.45";
      btn.style.cursor = "not-allowed";
    }
    wrap.appendChild(btn);
  });
}

// 選取分類，切換頁面標題顯示邏輯
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

// ===================== 4. 模式按鈕綁定 & 動態切換分類標題上下順序 =====================
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.onclick = () => {
    currentMode = btn.dataset.mode;
    const catCn = catNameMap[currentCat];
    const catEn = currentCat;
    const titleDom = document.getElementById("currentCatName");
    if(currentMode === "cn"){
      // 中文模式：上中文大字、下英文小字
      titleDom.innerHTML = `
        <div style="font-size:32px; font-weight:bold;">${catCn}</div>
        <div style="font-size:20px; opacity:0.7;">${catEn}</div>
      `;
    }else if(currentMode === "en"){
      // 英文模式：上英文大字、下中文小字
      titleDom.innerHTML = `
        <div style="font-size:32px; font-weight:bold;">${catEn}</div>
        <div style="font-size:20px; opacity:0.7;">${catCn}</div>
      `;
    }else{
      // 配對模式：預設中文在上
      titleDom.innerHTML = `
        <div style="font-size:32px; font-weight:bold;">${catCn}</div>
        <div style="font-size:20px; opacity:0.7;">${catEn}</div>
      `;
    }

    if (currentMode === "cn" || currentMode === "en") {
      nextWord();
      showPage("page-study");
    } else if (currentMode === "match") {
      createMatchQ();
      showPage("page-match");
    }
  };
});

// ===================== 5. 單詞朗讀模式邏輯 =====================
function nextWord() {
  const randomIdx = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  if (currentMode === "cn") {
    wordDom.innerText = currentWord.cn;
  } else {
    wordDom.innerText = currentWord.en;
  }
}
document.getElementById("voiceBtn").onclick = function () {
  if (!currentWord) return;
  if (currentMode === "cn") {
    const mandarin = new SpeechSynthesisUtterance(currentWord.cn);
    mandarin.lang = "zh-CN";
    speechSynthesis.speak(mandarin);
    setTimeout(() => {
      const cantonese = new SpeechSynthesisUtterance(currentWord.cn);
      cantonese.lang = "zh-HK";
      speechSynthesis.speak(cantonese);
    }, 1200);
  } else {
    const eng = new SpeechSynthesisUtterance(currentWord.en);
    eng.lang = "en-US";
    speechSynthesis.speak(eng);
  }
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
  const options = [correct, ...otherList];
  options.sort(() => Math.random() - 0.5);

  const qDom = document.getElementById("qWord");
  const optWrap = document.getElementById("optionWrap");
  const tipDom = document.getElementById("matchTip");
  tipDom.innerText = "";
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
document.getElementById("qVoiceBtn").onclick = function () {
  if (!currentWord) return;
  if (matchType === "cn2en") {
    const md = new SpeechSynthesisUtterance(currentWord.cn);
    md.lang = "zh-CN";
    speechSynthesis.speak(md);
    setTimeout(() => {
      const ct = new SpeechSynthesisUtterance(currentWord.cn);
      ct.lang = "zh-HK";
      speechSynthesis.speak(ct);
    }, 1200);
  } else {
    const en = new SpeechSynthesisUtterance(currentWord.en);
    en.lang = "en-US";
    speechSynthesis.speak(en);
  }
};
function checkAnswer(select, right, tipDom) {
  if (select === right) {
    tipDom.style.color = "#00aa00";
    tipDom.innerText = "答對啦！";
    setTimeout(() => createMatchQ(), 1200);
  } else {
    tipDom.style.color = "#f03030";
    tipDom.innerText = "答錯了，再試試！";
  }
}

// ===================== 頁面初始化 =====================
window.onload = function () {
  initCategory();
};
