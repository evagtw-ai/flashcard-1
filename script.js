// 詞彙庫
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

// 最新句子庫
const sentenceCnList = [
  "老師教學生知識。",
  "醫生醫治病人。",
  "護士會幫病人打針。",
  "警察會維持治安。",
  "這是一位消防員啊，他會救火又救人。",
  "郵差送信到我家。",
  "司機在馬路上駕駛汽車。",
  "廚師在廚房烹飪食物。",
  "侍應生在餐廳招待病人。",
  "理髮師在理髮店修剪頭髮。",
  "清潔工人在街道上清洗地板。",
  "飛機師會駕駛飛機。",
  "太空人在火星探索生物。",
  "農夫在田地裡種植蔬菜。",
  "畫家用畫筆繪畫風景。",
  "歌手在舞台上開心唱歌。",
  "演員表演跳舞。",
  "漁夫坐船出海釣魚。",
  "建築工人搭建高樓。",
  "工程師設計堅固的橋樑。"
];
const sentenceEnList = [
  "The teacher teaches students to read and write.",
  "The doctor helps sick people.",
  "The nurse works in the hospital.",
  "The policeman catches bad people.",
  "The fireman puts out fires and saves people.",
  "The postman brings letters to my home.",
  "The driver drives a car on the road.",
  "The chef cooks food in the kitchen.",
  "The waiter helps guests in the restaurant.",
  "The barber cuts hair in the barbershop.",
  "The cleaner cleans the street floor.",
  "The pilot flies a plane high up.",
  "The astronaut explores Mars.",
  "The farmer grows vegetables in fields.",
  "The artist draws scenery with a brush.",
  "The singer sings happily on stage.",
  "The actor dances on stage.",
  "The fisherman goes fishing by boat.",
  "The builder builds tall buildings.",
  "The engineer makes strong bridges."
];

// 全域變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let currentWord = null;
let spellTargetEn = "";
let spellUserAnswer = [];
let spellShuffleLetters = [];
let currentSentenceIndex = 0;
let audioPlaying = false; // 語音播放鎖定
const NEXT_COOLDOWN = 300; // 下一個按鈕防抖冷卻
let nextBtnLock = false;

// 各模塊已學習索引紀錄
let wordUsedIndex = [];
let matchUsedIndex = [];
let spellUsedIndex = [];
let sentenceUsedIndex = [];

// 本地緩存讀取學習記錄
function loadStorage() {
  const data = localStorage.getItem("studyRecord");
  if (data) {
    const obj = JSON.parse(data);
    wordUsedIndex = obj.word || [];
    matchUsedIndex = obj.match || [];
    spellUsedIndex = obj.spell || [];
    sentenceUsedIndex = obj.sentence || [];
  }
}
// 保存學習記錄到本地
function saveStorage() {
  const saveObj = {
    word: wordUsedIndex,
    match: matchUsedIndex,
    spell: spellUsedIndex,
    sentence: sentenceUsedIndex
  };
  localStorage.setItem("studyRecord", JSON.stringify(saveObj));
}

// 自訂完成彈窗封裝函數
function showFinishModal(resetCallback) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  const box = document.createElement("div");
  box.className = "modal-box";

  const text = document.createElement("p");
  text.className = "modal-text";
  text.innerText = "⭐太棒了！已全部學習完成！⭐";

  const btnWrap = document.createElement("div");
  btnWrap.className = "modal-btn-wrap";

  const btnAgain = document.createElement("button");
  btnAgain.className = "modal-again";
  btnAgain.innerText = "再學一次";
  btnAgain.onclick = () => {
    document.body.removeChild(modal);
    resetCallback(true);
  };

  const btnBack = document.createElement("button");
  btnBack.className = "modal-back";
  btnBack.innerText = "返回上一級";
  btnBack.onclick = () => {
    document.body.removeChild(modal);
    resetCallback(false);
  };

  btnWrap.appendChild(btnAgain);
  btnWrap.appendChild(btnBack);
  box.appendChild(text);
  box.appendChild(btnWrap);
  modal.appendChild(box);
  document.body.appendChild(modal);
}

// 停止所有語音
function stopAllAudio() {
  window.speechSynthesis.cancel();
  audioPlaying = false;
  const voiceBtnList = document.querySelectorAll(".voice-btn");
  voiceBtnList.forEach(btn => btn.disabled = false);
}

// 頁面切換控制
function hideAllPage() {
  stopAllAudio();
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
}
function showPage(id) {
  hideAllPage();
  const pageDom = document.getElementById(id);
  pageDom.classList.remove("hidden");
  if (id === "page-home") initCategory();
}
function backHome() { showPage("page-home"); }
function backMode() { showPage("page-mode"); }

// 首頁分類渲染
function initCategory() {
  const wrap = document.getElementById("categoryWrap");
  if (!wrap) return;
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
    alert("當前分類暫無單詞，敬請期待！");
    return;
  }
  // 切換分類重置所有學習記錄
  wordUsedIndex = [];
  matchUsedIndex = [];
  spellUsedIndex = [];
  sentenceUsedIndex = [];
  saveStorage();
  const cnName = catNameMap[currentCat];
  const enName = currentCat;
  const titleDom = document.getElementById("currentCatName");
  titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${cnName}</div><div style="font-size:20px; opacity:0.7;">${enName.toLowerCase()}</div>`;
  showPage("page-mode");
}

// 模式切換綁定
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
    } else if (currentMode === "sentence") {
      nextSentence();
      showPage("page-sentence");
    }
  };
});

// 發音：只粵語，無普通話，播放鎖定
function playCnVoice(text) {
  if (audioPlaying) return;
  speechSynthesis.cancel();
  const cantonese = new SpeechSynthesisUtterance(text);
  cantonese.lang = "zh-HK";
  cantonese.rate = 0.95;
  audioPlaying = true;
  const voiceBtnList = document.querySelectorAll(".voice-btn");
  voiceBtnList.forEach(btn => btn.disabled = true);
  cantonese.onend = () => {
    audioPlaying = false;
    voiceBtnList.forEach(btn => btn.disabled = false);
  };
  speechSynthesis.speak(cantonese);
}
function playEnVoice(text) {
  if (audioPlaying) return;
  speechSynthesis.cancel();
  const eng = new SpeechSynthesisUtterance(text);
  eng.lang = "en-GB";
  eng.rate = 0.8;
  audioPlaying = true;
  const voiceBtnList = document.querySelectorAll(".voice-btn");
  voiceBtnList.forEach(btn => btn.disabled = true);
  eng.onend = () => {
    audioPlaying = false;
    voiceBtnList.forEach(btn => btn.disabled = false);
  };
  speechSynthesis.speak(eng);
}

// 單詞朗讀｜不重複隨機
function nextWord() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = wordList.length;
  if (wordUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) {
        wordUsedIndex = [];
        saveStorage();
        nextWord();
      } else {
        showPage("page-mode");
      }
    });
    return;
  }
  let randomIdx;
  do {
    randomIdx = Math.floor(Math.random() * total);
  } while (wordUsedIndex.includes(randomIdx));
  wordUsedIndex.push(randomIdx);
  saveStorage();
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  wordDom.innerText = currentMode === "cn" ? currentWord.cn : currentWord.en;
  // 顯示進度
  let progressDom = document.querySelector(".progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    document.querySelector("#page-study .word-box").prepend(progressDom);
  }
  progressDom.innerText = `已學習 ${wordUsedIndex.length}/${total}`;
}
document.getElementById("voiceBtn").onclick = function () {
  if (!currentWord) return;
  currentMode === "cn" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};

// 配對遊戲｜不重複隨機
let matchType = "cn2en";
function createMatchQ() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = wordList.length;
  if (matchUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) {
        matchUsedIndex = [];
        saveStorage();
        createMatchQ();
      } else {
        showPage("page-mode");
      }
    });
    return;
  }
  let correctIdx;
  do {
    correctIdx = Math.floor(Math.random() * total);
  } while (matchUsedIndex.includes(correctIdx));
  matchUsedIndex.push(correctIdx);
  saveStorage();

  matchType = Math.random() > 0.5 ? "cn2en" : "en2cn";
  const correct = wordList[correctIdx];
  currentWord = correct;
  let otherList = wordList.filter((_, i) => i !== correctIdx);
  otherList = otherList.sort(() => Math.random() - 0.5).slice(0, 2);
  const options = [correct, ...otherList].sort(() => Math.random() - 0.5);

  const qDom = document.getElementById("qWord");
  const optWrap = document.getElementById("optionWrap");
  const tipDom = document.getElementById("matchTip");
  tipDom.innerText = "";
  optWrap.innerHTML = "";
  // 進度
  let progressDom = document.querySelector("#page-match .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    document.querySelector("#page-match .q-box").prepend(progressDom);
  }
  progressDom.innerText = `已學習 ${matchUsedIndex.length}/${total}`;

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
  matchType === "cn2en" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};
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

// 拼寫遊戲｜不重複隨機
function initSpellGame() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = wordList.length;
  if (spellUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) {
        spellUsedIndex = [];
        saveStorage();
        initSpellGame();
      } else {
        showPage("page-mode");
      }
    });
    return;
  }
  let randomIdx;
  do {
    randomIdx = Math.floor(Math.random() * total);
  } while (spellUsedIndex.includes(randomIdx));
  spellUsedIndex.push(randomIdx);
  saveStorage();

  currentWord = wordList[randomIdx];
  spellTargetEn = currentWord.en.toLowerCase();
  spellUserAnswer = [];
  spellShuffleLetters = spellTargetEn.split("").sort(() => Math.random() - 0.5);
  renderSpellUI();
  // 進度
  let progressDom = document.querySelector("#page-spell .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    document.querySelector("#page-spell .spell-card-box").prepend(progressDom);
  }
  progressDom.innerText = `已學習 ${spellUsedIndex.length}/${total}`;
}
function renderSpellUI() {
  document.getElementById("spellCnWord").innerText = currentWord.cn;
  document.getElementById("spellTip").innerText = "";
  const targetLength = spellTargetEn.length;
  const lineBox = document.getElementById("spellAnswerLine");
  lineBox.innerHTML = "";
  for(let i=0; i<targetLength; i++){
    const cell = document.createElement("div");
    cell.className = "spell-cell";
    cell.textContent = spellUserAnswer[i] || "";
    lineBox.appendChild(cell);
  }
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
document.getElementById("spellVoiceBtn").onclick = function () {
  playCnVoice(currentWord.cn);
};
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

// 句子認讀｜不重複隨機
function nextSentence() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = sentenceCnList.length;
  if (sentenceUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) {
        sentenceUsedIndex = [];
        saveStorage();
        nextSentence();
      } else {
        showPage("page-mode");
      }
    });
    return;
  }
  let randomIdx;
  do {
    randomIdx = Math.floor(Math.random() * total);
  } while (sentenceUsedIndex.includes(randomIdx));
  sentenceUsedIndex.push(randomIdx);
  saveStorage();
  currentSentenceIndex = randomIdx;
  const sentenceDom = document.getElementById("showSentence");
  if(currentMode === "en"){
    sentenceDom.innerText = sentenceEnList[currentSentenceIndex];
  }else{
    sentenceDom.innerText = sentenceCnList[currentSentenceIndex];
  }
  // 進度
  let progressDom = document.querySelector("#page-sentence .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    document.querySelector("#page-sentence .word-box").prepend(progressDom);
  }
  progressDom.innerText = `已學習 ${sentenceUsedIndex.length}/${total}`;
}
document.getElementById("sentenceVoiceBtn").onclick = function () {
  if(currentMode === "en"){
    playEnVoice(sentenceEnList[currentSentenceIndex]);
  }else{
    playCnVoice(sentenceCnList[currentSentenceIndex]);
  }
};

// 頁面初始化
document.addEventListener("DOMContentLoaded", function () {
  loadStorage();
  initCategory();
  setTimeout(() => initCategory(), 300);
});
