// ==================== script.js 完整修改版 ====================
let currentSentenceCnList = [];
let currentSentenceEnList = [];
let currentCat = "";
let currentMode = "";
let wordList = [];
let fullWordPool = [];
let currentWord = null;
let spellTargetEn = "";
let spellRawWord = "";
let spellUserAnswer = [];
let spellShuffleLetters = [];
let originalLetters = [];
let currentSentenceIndex = 0;
let audioPlaying = false;
const NEXT_COOLDOWN = 300;
let nextBtnLock = false;
let orderIndex = 0;
const ALL_COUNT = 20;
let wrongCount = 0;

// 語音工具 維持原有英文+粵語
function speakText(text, lang = "zh‑HK") {
  if (!text || audioPlaying) return;
  audioPlaying = true;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  speechSynthesis.speak(utter);
  utter.onend = () => {
    audioPlaying = false;
  };
}

async function speakWord(enWord, cnWord) {
  speakText(enWord, "en‑GB");
  await sleep(450);
  speakText(cnWord, "zh‑HK");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 工具：從數組隨機取一條，空數組返回空字串
function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// Fisher‑Yates 字母洗牌
function shuffleArray(arr) {
  const temp = [...arr];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

// ---------------------- 1.學習模式 order：僅顯示cn、en單詞，不讀句子 ----------------------
function renderOrderWord(item) {
  const wrap = document.querySelector('.order-card-wrap');
  wrap.innerHTML = `
      <div class="order-card cn-card">
          <div class="order-cn">${item.cn}</div>
      </div>
      <div class="order-card en-card">
          <div class="order-en">${item.en}</div>
      </div>
  `;
  document.querySelector('.progress-text').textContent = `${orderIndex+1} / ${wordList.length}`;
}

// ---------------------- 2.中文模式 cnMode：單詞cn + 隨機中文句子，保留發音 ----------------------
function renderCnWord(item) {
  const box = document.querySelector('.word-box');
  const catSentenceCn = wordData[currentCat]?.sentences?.cn || [];
  const showSentence = getRandomItem(catSentenceCn);
  box.innerHTML = `
      <div class="word-text">${item.cn}</div>
      <button class="voice-btn" data-cn="${item.cn}" data-en="${item.en}">🔊</button>
      <div class="tip">${showSentence}</div>
  `;
  document.querySelector('.progress-text').textContent = `${orderIndex+1} / ${wordList.length}`;
}

// ----------------------3.英文模式 enMode：單詞en + 隨機英文句子，保留發音 ----------------------
function renderEnWord(item) {
  const box = document.querySelector('.word-box');
  const catSentenceEn = wordData[currentCat]?.sentences?.en || [];
  const showSentence = getRandomItem(catSentenceEn);
  box.innerHTML = `
      <div class="word-text">${item.en}</div>
      <button class="voice-btn" data-cn="${item.cn}" data-en="${item.en}">🔊</button>
      <div class="tip">${showSentence}</div>
  `;
  document.querySelector('.progress-text').textContent = `${orderIndex+1} / ${wordList.length}`;
}

// ----------------------4.配對模式 pair：僅cn/en單詞，不顯示句子 ----------------------
function renderPairQuestion(qItem) {
  const qBox = document.querySelector('.q-box');
  qBox.innerHTML = `
      <div class="q-word">${qItem.cn}</div>
      <div class="pair-sep">------</div>
      <div class="tip">請選擇對應英文</div>
  `;
  renderPairOptions();
}

// ----------------------5.拼寫模式 spell：僅單詞，不顯示句子，保留發音 ----------------------
function renderSpellWord(item) {
  const box = document.querySelector('.spell-card-box');
  box.innerHTML = `
      <div class="spell-cn-text">${item.cn}</div>
      <button class="voice-btn" data-cn="${item.cn}" data-en="${item.en}">🔊</button>
      <div class="spell-input-line">
          <div class="spell-input-inner" id="spellInputArea"></div>
      </div>
      <div class="spell-letter-group" id="spellLetterArea"></div>
      <div class="spell-tip"></div>
  `;
  buildSpellLetters(item.en);
  document.querySelector('.progress-text').textContent = `${orderIndex+1} / ${wordList.length}`;
}

// ----------------------6.句子重組 sentence：只顯示句子池句子，不顯示單詞、無發音按鈕 ----------------------
function renderSentence(cnSent, enSent) {
  const box = document.querySelector('.word-box');
  box.innerHTML = `
      <div class="word-text">${cnSent}</div>
      <div class="tip">${enSent}</div>
  `;
  document.querySelector('.progress-text').textContent = `${currentSentenceIndex+1} / ${currentSentenceCnList.length}`;
}

// ==================== 進入分類模式初始化：重置本輪狀態 ====================
function enterCategory(catKey, mode) {
  currentCat = catKey;
  currentMode = mode;
  // 重置本輪狀態，每次進入都是新一輪
  orderIndex = 0;
  wrongCount = 0;
  nextBtnLock = false;
  audioPlaying = false;

  // 載入本分類單詞池
  wordList = [...(wordData[catKey]?.words || [])];

  // 句子模式專用：載入本分類句子池
  currentSentenceCnList = [...(wordData[catKey]?.sentences?.cn || [])];
  currentSentenceEnList = [...(wordData[catKey]?.sentences?.en || [])];
  currentSentenceIndex = 0;

  // 打開對應頁面、隱藏首頁
  switchPage("page-mode");

  // 根據mode渲染第一題
  renderFirstByMode();
}

function renderFirstByMode() {
  switch(currentMode) {
    case "order":
      renderOrderWord(wordList[orderIndex]);
      break;
    case "cnMode":
      renderCnWord(wordList[orderIndex]);
      break;
    case "enMode":
      renderEnWord(wordList[orderIndex]);
      break;
    case "pair":
      renderPairQuestion(wordList[orderIndex]);
      break;
    case "spell":
      renderSpellWord(wordList[orderIndex]);
      break;
    case "sentence":
      if(currentSentenceCnList.length && currentSentenceEnList.length) {
        renderSentence(currentSentenceCnList[currentSentenceIndex], currentSentenceEnList[currentSentenceIndex]);
      } else {
        document.querySelector('.word-box').innerHTML = `<div class="tip">本分類暫無句子</div>`;
      }
      break;
  }
}

// ==================== 頁面切換、按鈕事件、配對、拼寫、下一题、彈窗等原有邏輯占位 ====================
/*
下方保留你原有全部業務代碼：
- switchPage() 頁面切換函數
- 首頁分類按鈕渲染 renderCategoryList
- voice-btn 點擊事件綁定 speakWord
- renderPairOptions() 配對選項渲染
- buildSpellLetters() 拼寫字母亂序生成
- 拼寫點擊、撤銷、清空、校對邏輯
- next按鈕邏輯、判斷本輪完成彈窗
- "再學一次"：重置 orderIndex=0，重新渲染第一題（不讀localStorage，內存級輪次）
- "返回首頁"：回到page-home，下次點分類重新觸發 enterCategory 新一輪重置
*/
