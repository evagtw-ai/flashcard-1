// ====================詞彙庫====================
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
  Place: [
    { cn: "圖書館", en: "library" },
    { cn: "機場", en: "airport" },
    { cn: "學校", en: "school" },
    { cn: "超級市場", en: "supermarket" },
    { cn: "巴士站", en: "bus stop" },
    { cn: "火車站", en: "train station" },
    { cn: "公園", en: "park" },
    { cn: "花園", en: "garden" },
    { cn: "銀行", en: "bank" },
    { cn: "泳池", en: "swimming pool" },
    { cn: "街道", en: "street" },
    { cn: "睡房", en: "bedroom" },
    { cn: "客廳", en: "living room" },
    { cn: "廚房", en: "kitchen" },
    { cn: "家裡", en: "home" },
    { cn: "浴室", en: "bathroom" },
    { cn: "博物館", en: "museum" },
    { cn: "電影院", en: "cinema" },
    { cn: "麵包店", en: "bakery" },
    { cn: "服裝店", en: "clothes shop" },
    { cn: "玩具店", en: "toy shop" },
    { cn: "警察局", en: "police station" },
    { cn: "郵局", en: "post office" },
    { cn: "消防局", en: "fire station" },
    { cn: "書店", en: "book shop" },
    { cn: "醫院", en: "hospital" },
    { cn: "酒店", en: "hotel" },
    { cn: "商場", en: "shopping mall" },
    { cn: "遊樂場", en: "playground" },
    { cn: "餐廳", en: "restaurant" }
  ],
  Color: [
    { cn: "白色", en: "white" },
    { cn: "藍色", en: "blue" },
    { cn: "綠色", en: "green" },
    { cn: "紫色", en: "purple" },
    { cn: "黑色", en: "black" },
    { cn: "銀色", en: "silver" },
    { cn: "粉紅色", en: "pink" },
    { cn: "深藍色", en: "dark blue" },
    { cn: "淺綠色", en: "light green" },
    { cn: "灰色", en: "grey" },
    { cn: "啡色", en: "brown" },
    { cn: "紅色", en: "red" },
    { cn: "黃色", en: "yellow" },
    { cn: "橙色", en: "orange" }
  ],
  Nature: [],
  Clothing: [],
  Object: [],
  Vegetable: [],
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
  Place: "地點",
  Occupation: "職業",
  Animal: "動物",
  Transportation: "交通",
  Stationary: "文具",
  Fruit: "水果",
  People: "人物",
  All: "全部"
};

//拆分句子，分類獨立句子
const sentenceGroup = {
  Occupation: {
    cn: [
      "老師教學生知識。",
      "醫生醫治病人。",
      "護士會幫病人打針。",
      "警察會維持治安。",
      "這是一位消防員，他會救火又救人。",
      "郵差送信到我家。",
      "司機在馬路上駕駛汽車。",
      "廚師在廚房烹飪食物。",
      "侍應生在餐廳招待客人。",
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
    ],
    en: [
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
    ]
  },
  Place: {
    cn: [
      "爸爸在客廳看電視。",
      "媽媽在廚房洗菜。",
      "哥哥在浴室洗澡。",
      "姐姐在書房做功課。",
      "妹妹在睡房睡覺。",
      "弟弟在餐廳吃飯。",
      "星期日，我和媽媽去超級市場買東西。",
      "哥哥在公園裡踢足球。",
      "圖書館要保持安靜。",
      "我們去商場購物。",
      "我在遊樂場玩滑梯。",
      "這家麵包店有好吃蛋糕。",
      "醫院可以幫助生病的人。",
      "我和朋友去電影院看卡通。",
      "郵局可以寄信件。",
      "玩具店有很多可愛玩具。",
      "酒店適合外出旅行住。",
      "花園裡有美麗花朵。",
      "學校是我們學習的地方。",
      "巴士站等車要排隊。"
    ],
    en: [
      "Dad watches TV in the living room.",
      "Mum washes vegetables in the kitchen.",
      "Brother takes a bath in the bathroom.",
      "Sister does homework in the study.",
      "Little sister sleeps in the bedroom.",
      "Little brother eats food in the restaurant.",
      "On Sunday, Mum and I go shopping at the supermarket.",
      "Brother plays football in the park.",
      "We must be quiet in the library.",
      "We go shopping at the shopping mall.",
      "I play slide in the playground.",
      "This bakery has yummy cakes.",
      "Hospitals help sick people.",
      "My friend and I watch cartoons at the cinema.",
      "We send letters at the post office.",
      "There are many cute toys in the toy shop.",
      "Hotels are good for trips.",
      "There are pretty flowers in the garden.",
      "School is the place for us to learn.",
      "We queue up at the bus stop."
    ]
  },
  Color: { cn: [], en: [] }
};
let currentSentenceCnList = [];
let currentSentenceEnList = [];

//全域變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let currentWord = null;
let spellTargetEn = "";
let spellRawWord = "";
let spellUserAnswer = [];
let spellShuffleLetters = [];
let currentSentenceIndex = 0;
let audioPlaying = false;
const NEXT_COOLDOWN = 300;
let nextBtnLock = false;
let orderIndex = 0;

//答錯次數計數
let wrongCount = 0;

let wordUsedIndex = [];
let matchUsedIndex = [];
let spellUsedIndex = [];
let sentenceUsedIndex = [];

//播放專用提示語音
function playFeedbackVoice(isRight) {
  if (audioPlaying) return;
  const utter = new SpeechSynthesisUtterance();
  utter.lang = "zh-HK";
  utter.rate = 0.95;
  if (isRight) {
    utter.text = "答對了，你真棒！";
  } else {
    utter.text = "oops，答錯了，再試一次吧";
  }
  audioPlaying = true;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  utter.onend = () => {
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
  };
  speechSynthesis.speak(utter);
}

//本地存儲
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
function saveStorage() {
  const saveObj = {
    word: wordUsedIndex,
    match: matchUsedIndex,
    spell: spellUsedIndex,
    sentence: sentenceUsedIndex
  };
  localStorage.setItem("studyRecord", JSON.stringify(saveObj));
}

//完成彈窗
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

function stopAllAudio() {
  window.speechSynthesis.cancel();
  audioPlaying = false;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
}

//頁面切換
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

//首頁分類渲染
function initCategory() {
  const wrap = document.getElementById("categoryWrap");
  if (!wrap) return;
  wrap.innerHTML = "";
  const openCats = ["Occupation", "Place", "Color"];
  Object.keys(wordData).forEach(key => {
    const btn = document.createElement("button");
    btn.innerHTML = `
        <div style="font-size:22px; font-weight:bold;">${catNameMap[key]}</div>
        <div style="font-size:14px; opacity:0.8;">${key}</div>
    `;
    if (openCats.includes(key)) {
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
  currentSentenceCnList = sentenceGroup[catKey].cn;
  currentSentenceEnList = sentenceGroup[catKey].en;

  wordUsedIndex = [];
  matchUsedIndex = [];
  spellUsedIndex = [];
  sentenceUsedIndex = [];
  orderIndex = 0;
  wrongCount = 0;
  saveStorage();
  const cnName = catNameMap[currentCat];
  const titleDom = document.getElementById("currentCatName");
  titleDom.innerHTML = `
      <div style="font-size:32px; font-weight:bold;">${cnName}</div>
      <div style="font-size:20px; opacity:0.7;">${currentCat.toLowerCase()}</div>
  `;
  showPage("page-mode");
}

//模式按鈕點擊
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.onclick = () => {
    currentMode = btn.dataset.mode;
    wrongCount = 0; //切換模式重置錯誤次數
    const cnName = catNameMap[currentCat];
    const titleDom = document.getElementById("currentCatName");
    titleDom.innerHTML = `
        <div style="font-size:32px; font-weight:bold;">${cnName}</div>
        <div style="font-size:20px; opacity:0.7;">${currentCat.toLowerCase()}</div>
    `;
    if (currentCat === "Color" && currentMode === "sentence") {
      alert("顏色分類暫無句子內容");
      return;
    }
    if (currentMode === "cn" || currentMode === "en") {
      nextWord();
      showPage("page-study");
    } else if (currentMode === "orderStudy") {
      renderOrderWord();
      showPage("page-orderStudy");
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

//單詞讀音
function playCnVoice(text) {
  if (audioPlaying) return;
  speechSynthesis.cancel();
  const cantonese = new SpeechSynthesisUtterance(text);
  cantonese.lang = "zh-HK";
  cantonese.rate = 0.95;
  audioPlaying = true;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  cantonese.onend = () => {
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
  };
  speechSynthesis.speak(cantonese);
}

// 英式英語發音
function playEnVoice(text) {
  if (audioPlaying) return;
  speechSynthesis.cancel();
  const eng = new SpeechSynthesisUtterance(text);
  eng.lang = "en-GB";
  eng.rate = 0.8;
  audioPlaying = true;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  eng.onend = () => {
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
  };
  speechSynthesis.speak(eng);
}

//順序學習頁
function renderOrderWord() {
  const total = wordList.length;
  let progressDom = document.querySelector("#page-orderStudy .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    document.querySelector("#page-orderStudy .word-box").prepend(progressDom);
  }
  progressDom.innerText = `當前第 ${orderIndex + 1}/${total}`;
  const item = wordList[orderIndex];
  document.getElementById("orderCnText").innerText = item.cn;
  document.getElementById("orderEnText").innerText = item.en;
}
function prevOrderWord() {
  if (orderIndex <= 0) {
    alert("已經是第一個單詞！");
    return;
  }
  orderIndex--;
  renderOrderWord();
}
function nextOrderWord() {
  const total = wordList.length;
  if (orderIndex >= total - 1) {
    showFinishModal(function (again) {
      if (again) {
        orderIndex = 0;
        renderOrderWord();
      } else {
        showPage("page-mode");
      }
    });
    return;
  }
  orderIndex++;
  renderOrderWord();
}
document.getElementById("orderVoiceBtn").onclick = async function () {
  if (audioPlaying) return;
  const item = wordList[orderIndex];
  playCnVoice(item.cn);
  const waitEnd = () => new Promise(res => {
    const timer = setInterval(() => {
      if (!audioPlaying) { clearInterval(timer); res(); }
    }, 100);
  });
  await waitEnd();
  playEnVoice(item.en);
};

//單詞隨機學習
function nextWord() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = wordList.length;
  if (wordUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) { wordUsedIndex = []; saveStorage(); nextWord(); }
      else { showPage("page-mode"); }
    });
    return;
  }
  let randomIdx;
  do { randomIdx = Math.floor(Math.random() * total); } while (wordUsedIndex.includes(randomIdx));
  wordUsedIndex.push(randomIdx);
  saveStorage();
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  wordDom.innerText = currentMode === "cn" ? currentWord.cn : currentWord.en;
  let progressDom = document.querySelector("#page-study .progress-text");
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

//配對遊戲
let matchType = "cn2en";
function createMatchQ() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  wrongCount = 0;
  const total = wordList.length;
  if (matchUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) { matchUsedIndex = []; saveStorage(); createMatchQ(); }
      else { showPage("page-mode"); }
    });
    return;
  }
  let correctIdx;
  do { correctIdx = Math.floor(Math.random() * total); } while (matchUsedIndex.includes(correctIdx));
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
      btn.onclick = () => matchCheckAnswer(item.en, correct.en, tipDom);
      optWrap.appendChild(btn);
    });
  } else {
    qDom.innerText = correct.en;
    options.forEach(item => {
      const btn = document.createElement("button");
      btn.innerText = item.cn;
      btn.onclick = () => matchCheckAnswer(item.cn, correct.cn, tipDom);
      optWrap.appendChild(btn);
    });
  }
}

function matchCheckAnswer(select, right, tipDom) {
  if (select === right) {
    tipDom.style.color = "#00aa00";
    tipDom.innerText = "答對啦！";
    playFeedbackVoice(true);
    setTimeout(() => {
      createMatchQ();
    }, 1300);
  } else {
    wrongCount += 1;
    playFeedbackVoice(false);
    if (wrongCount >= 2) {
      tipDom.style.color = "#e53e3e";
      tipDom.innerText = `正確答案：${right}`;
      setTimeout(() => {
        createMatchQ();
      }, 1800);
    } else {
      tipDom.style.color = "#f03030";
      tipDom.innerText = "答錯咯，再試一次！";
    }
  }
}
document.getElementById("qVoiceBtn").onclick = function () {
  if (!currentWord) return;
  matchType === "cn2en" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
};

//拼寫遊戲
function initSpellGame() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  wrongCount = 0;
  const total = wordList.length;
  if (spellUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) { spellUsedIndex = []; saveStorage(); initSpellGame(); }
      else { showPage("page-mode"); }
    });
    return;
  }
  let randomIdx;
  do { randomIdx = Math.floor(Math.random() * total); } while (spellUsedIndex.includes(randomIdx));
  spellUsedIndex.push(randomIdx);
  saveStorage();
  currentWord = wordList[randomIdx];
  spellRawWord = currentWord.en.toLowerCase();
  spellTargetEn = spellRawWord.replace(/ /g, "");
  spellUserAnswer = [];
  spellShuffleLetters = spellTargetEn.split("").sort(() => Math.random() - 0.5);
  renderSpellUI();
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
  const lineBox = document.getElementById("spellAnswerLine");
  lineBox.innerHTML = "";
  [...spellRawWord].forEach(char => {
    const cell = document.createElement("div");
    cell.className = "spell-cell";
    if (char === " ") {
      cell.style.borderBottom = "none";
    } else {
      cell.textContent = "";
    }
    lineBox.appendChild(cell);
  });
  let tempLetters = [...spellShuffleLetters];
  spellUserAnswer.forEach(ch => {
    let pos = tempLetters.indexOf(ch);
    if (pos !== -1) tempLetters.splice(pos, 1);
  });
  const letterWrap = document.getElementById("spellLetterBox");
  letterWrap.innerHTML = "";
  tempLetters.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = function () {
      spellUserAnswer.push(letter);
      renderSpellUI();
    };
    letterWrap.appendChild(btn);
  });
}

document.getElementById("spellVoiceBtn").onclick = function () {
  playCnVoice(currentWord.cn);
};
document.addEventListener("DOMContentLoaded", function () {
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
      playFeedbackVoice(true);
      setTimeout(() => initSpellGame(), 1500);
    } else {
      wrongCount += 1;
      playFeedbackVoice(false);
      if (wrongCount >= 2) {
        tipDom.style.color = "#e53e3e";
        tipDom.innerText = `正確答案：${spellRawWord}`;
        setTimeout(() => initSpellGame(), 1800);
      } else {
        tipDom.style.color = "#f03030";
        tipDom.innerText = "拼寫錯誤，再嘗試一次";
      }
    }
  };
});
function nextSpellWord() {
  initSpellGame();
}

//句子認讀
function nextSentence() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = currentSentenceCnList.length;
  if (sentenceUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) { sentenceUsedIndex = []; saveStorage(); nextSentence(); }
      else { showPage("page-mode"); }
    });
    return;
  }
  let randomIdx;
  do { randomIdx = Math.floor(Math.random() * total); } while (sentenceUsedIndex.includes(randomIdx));
  sentenceUsedIndex.push(randomIdx);
  saveStorage();
  currentSentenceIndex = randomIdx;
  const sentenceDom = document.getElementById("showSentence");
  if (currentMode === "en") {
    sentenceDom.innerText = currentSentenceEnList[currentSentenceIndex];
  } else {
    sentenceDom.innerText = currentSentenceCnList[currentSentenceIndex];
  }
  let progressDom = document.querySelector("#page-sentence .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    document.querySelector("#page-sentence .word-box").prepend(progressDom);
  }
  progressDom.innerText = `已學習 ${sentenceUsedIndex.length}/${total}`;
}
document.getElementById("sentenceVoiceBtn").onclick = function () {
  if (currentMode === "en") {
    playEnVoice(currentSentenceEnList[currentSentenceIndex]);
  } else {
    playCnVoice(currentSentenceCnList[currentSentenceIndex]);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  loadStorage();
  initCategory();
  setTimeout(() => initCategory(), 300);
});
