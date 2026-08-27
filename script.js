let currentSentenceCnList = [];
let currentSentenceEnList = [];
//全域變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let fullWordPool = []; //All模式全部詞庫
let currentWord = null;
let spellTargetEn = "";
let spellRawWord = "";
let spellUserAnswer = [];
let spellShuffleLetters = [];
let originalLetters = []; //本題原始字母池
let currentSentenceIndex = 0;
let audioPlaying = false;
const NEXT_COOLDOWN = 300;
let nextBtnLock = false;
let orderIndex = 0;
const ALL_COUNT = 20; //All模式固定20題
//答錯次數計數
let wrongCount = 0;
// ===== 輪次狀態：全部在進入模式時重置；返回分類頁自動清空，不記憶舊進度 =====
let wordUsedIndex = [];
let matchUsedIndex = [];
let spellUsedIndex = [];
let sentenceUsedIndex = [];
let allUsedIndex = [];
// ===== 關鍵修復：全局預加載瀏覽器語音音色 =====
let globalVoiceList = [];
window.speechSynthesis.onvoiceschanged = function () {
  globalVoiceList = window.speechSynthesis.getVoices();
};
// ========== 通用標準Fisher‑Yates洗牌函數（全局統一亂序） ==========
function shuffleArray(arr) {
  const copyArr = [...arr];
  for (let i = copyArr.length - 1; i > 0; i--) {
    const randomPos = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[randomPos]] = [copyArr[randomPos], copyArr[i]];
  }
  return copyArr;
}
// ========== 重構粵語中文發音函數 ==========
function playCnVoice(text) {
  if (!text || audioPlaying || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  audioPlaying = true;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-HK";
  utter.rate = 0.95;
  utter.pitch = 1;
  utter.volume = 1;
  const cantoneseVoice = globalVoiceList.find(v => v.lang.startsWith("zh-HK"));
  if (cantoneseVoice) utter.voice = cantoneseVoice;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  utter.onend = () => {
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
  };
  window.speechSynthesis.speak(utter);
}
//英式英語發音
function playEnVoice(text) {
  if (!text || audioPlaying || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  audioPlaying = true;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-GB";
  utter.rate = 0.8;
  utter.pitch = 1;
  utter.volume = 1;
  const enVoice = globalVoiceList.find(v => v.lang.startsWith("en-GB"));
  if (enVoice) utter.voice = enVoice;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  utter.onend = () => {
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
  };
  window.speechSynthesis.speak(utter);
}
// ========== 拼寫遊戲專用 先英文、後粵語雙語發音函數 ==========
function playSpellBilingualVoice(enText, cnText) {
  if (!enText || !cnText || audioPlaying || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  audioPlaying = true;
  const engUtter = new SpeechSynthesisUtterance(enText);
  engUtter.lang = "en-GB";
  engUtter.rate = 0.8;
  engUtter.volume = 1;
  const engVoice = globalVoiceList.find(v => v.lang.startsWith("en-GB"));
  if (engVoice) engUtter.voice = engVoice;
  engUtter.onend = () => {
    const cnUtter = new SpeechSynthesisUtterance(cnText);
    cnUtter.lang = "zh-HK";
    cnUtter.rate = 0.95;
    cnUtter.volume = 1;
    const cnVoice = globalVoiceList.find(v => v.lang.startsWith("zh-HK"));
    if (cnVoice) cnUtter.voice = cnVoice;
    cnUtter.onend = () => {
      audioPlaying = false;
      document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
    };
    window.speechSynthesis.speak(cnUtter);
  };
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  window.speechSynthesis.speak(engUtter);
}
//答題反饋粵語
function playFeedbackVoice(isRight) {
  if (audioPlaying || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  audioPlaying = true;
  const utter = new SpeechSynthesisUtterance();
  utter.lang = "zh-HK";
  utter.rate = 0.98;
  utter.text = isRight ? "你真叻！" : "再試一次吧！";
  const cantoneseVoice = globalVoiceList.find(v => v.lang.startsWith("zh-HK"));
  if (cantoneseVoice) utter.voice = cantoneseVoice;
  document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
  utter.onend = () => {
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
  };
  window.speechSynthesis.speak(utter);
}
//本輪狀態不再持久化，清空localStorage相關讀寫
function loadStorage() {}
function saveStorage() {}
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
  text.innerText = "⭐太棒了！本輪已經全部學習完成！⭐";
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
//答錯兩次彈窗
function showAnswerModal(answer, nextFunc) {
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
  text.innerText = `正確答案：${answer}`;
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "modal-again";
  confirmBtn.innerText = "確認";
  confirmBtn.onclick = () => {
    document.body.removeChild(modal);
    nextFunc();
  };
  box.appendChild(text);
  box.appendChild(confirmBtn);
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
  if (pageDom) pageDom.classList.remove("hidden");
  if (id === "page-home") initCategory();
}
function backHome() {
  // 返回首頁：清空本輪全部進度
  wordUsedIndex = [];
  matchUsedIndex = [];
  spellUsedIndex = [];
  sentenceUsedIndex = [];
  allUsedIndex = [];
  showPage("page-home");
}
function backMode() { showPage("page-mode"); }
//首頁分類渲染：開啟All按鈕，禁用按鈕修改樣式標記
function initCategory() {
  const wrap = document.getElementById("categoryWrap");
  if (!wrap) return;
  wrap.innerHTML = "";
  const openCats = ["Occupation", "Place", "Color", "Animal", "Body", "All"];
  Object.keys(wordData).forEach(key => {
    const btn = document.createElement("button");
    btn.innerHTML = `
        <div style="font-size:22px; font-weight:bold;">${catNameMap[key]}</div>
        <div style="font-size:14px; opacity:0.8;">${key}</div>
    `;
    if (openCats.includes(key)) {
      btn.onclick = () => selectCategory(key);
    } else {
      btn.classList.add("disabled-btn");
      btn.disabled = true;
    }
    wrap.appendChild(btn);
  });
}
function selectCategory(catKey) {
  currentCat = catKey;
  if (catKey === "All") {
    fullWordPool = shuffleArray([
      ...JSON.parse(JSON.stringify(wordData.Occupation)),
      ...JSON.parse(JSON.stringify(wordData.Place)),
      ...JSON.parse(JSON.stringify(wordData.Color)),
      ...JSON.parse(JSON.stringify(wordData.Animal)),
      ...JSON.parse(JSON.stringify(wordData.Body))
    ]);
    allUsedIndex = [];
    wordList = fullWordPool.slice(0, ALL_COUNT);
  } else {
    wordList = [...wordData[catKey]];
  }
  if (wordList.length === 0) {
    alert("當前分類暫無單詞，敬請期待！");
    return;
  }
  currentSentenceCnList = sentenceGroup[catKey].cn;
  currentSentenceEnList = sentenceGroup[catKey].en;
  // =========【重點】進入分類就重置本輪全部狀態，確保每次進入都是全新一輪 =========
  wordUsedIndex = [];
  matchUsedIndex = [];
  spellUsedIndex = [];
  sentenceUsedIndex = [];
  allUsedIndex = [];
  orderIndex = 0;
  wrongCount = 0;
  const cnName = catNameMap[currentCat];
  const titleDom = document.getElementById("currentCatName");
  if (titleDom) {
    titleDom.innerHTML = `
        <div style="font-size:32px; font-weight:bold;">${cnName}</div>
        <div style="font-size:20px; opacity:0.7;">${currentCat.toLowerCase()}</div>
    `;
  }
  showPage("page-mode");
}
//模式按鈕點擊
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.onclick = () => {
    currentMode = btn.dataset.mode;
    wrongCount = 0;
    const cnName = catNameMap[currentCat];
    const titleDom = document.getElementById("currentCatName");
    if (titleDom) {
      titleDom.innerHTML = `
          <div style="font-size:32px; font-weight:bold;">${cnName}</div>
          <div style="font-size:20px; opacity:0.7;">${currentCat.toLowerCase()}</div>
      `;
    }
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
//順序學習頁
function renderOrderWord() {
  const total = wordList.length;
  let progressDom = document.querySelector("#page-orderStudy .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    const box = document.querySelector("#page-orderStudy .word-box");
    if (box) box.prepend(progressDom);
  }
  if (progressDom) progressDom.innerText = `當前第 ${orderIndex + 1}/${total}`;
  const item = wordList[orderIndex];
  const cnEl = document.getElementById("orderCnText");
  const enEl = document.getElementById("orderEnText");
  if (cnEl) cnEl.innerText = item.cn;
  if (enEl) enEl.innerText = item.en;
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
        if (currentCat === "All") {
          fullWordPool = shuffleArray([
            ...JSON.parse(JSON.stringify(wordData.Occupation)),
            ...JSON.parse(JSON.stringify(wordData.Place)),
            ...JSON.parse(JSON.stringify(wordData.Color)),
            ...JSON.parse(JSON.stringify(wordData.Animal)),
            ...JSON.parse(JSON.stringify(wordData.Body))
          ]);
          wordList = fullWordPool.slice(0, ALL_COUNT);
        }
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
// 順序學習發音按鈕綁定
document.addEventListener("DOMContentLoaded", function () {
  const orderVoiceBtn = document.getElementById("orderVoiceBtn");
  if (orderVoiceBtn) {
    orderVoiceBtn.onclick = async function () {
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
  }
});
//單詞隨機學習
function nextWord() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  const total = wordList.length;
  if (wordUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) {
        if (currentCat === "All") {
          fullWordPool = shuffleArray([
            ...JSON.parse(JSON.stringify(wordData.Occupation)),
            ...JSON.parse(JSON.stringify(wordData.Place)),
            ...JSON.parse(JSON.stringify(wordData.Color)),
            ...JSON.parse(JSON.stringify(wordData.Animal)),
            ...JSON.parse(JSON.stringify(wordData.Body))
          ]);
          wordList = fullWordPool.slice(0, ALL_COUNT);
          wordUsedIndex = [];
        }
        nextWord();
      }
      else { showPage("page-mode"); }
    });
    return;
  }
  let randomIdx;
  do { randomIdx = Math.floor(Math.random() * total); } while (wordUsedIndex.includes(randomIdx));
  wordUsedIndex.push(randomIdx);
  currentWord = wordList[randomIdx];
  const wordDom = document.getElementById("showWord");
  if (wordDom) wordDom.innerText = currentMode === "cn" ? currentWord.cn : currentWord.en;
  let progressDom = document.querySelector("#page-study .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    const box = document.querySelector("#page-study .word-box");
    if (box) box.prepend(progressDom);
  }
  if (progressDom) progressDom.innerText = `已學習 ${wordUsedIndex.length}/${total}`;
}
// 單詞學習發音按鈕
document.addEventListener("DOMContentLoaded", function () {
  const voiceBtn = document.getElementById("voiceBtn");
  if (voiceBtn) {
    voiceBtn.onclick = function () {
      if (!currentWord) return;
      currentMode === "cn" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
    };
  }
});
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
      if (again) {
        if (currentCat === "All") {
          fullWordPool = shuffleArray([
            ...JSON.parse(JSON.stringify(wordData.Occupation)),
            ...JSON.parse(JSON.stringify(wordData.Place)),
            ...JSON.parse(JSON.stringify(wordData.Color)),
            ...JSON.parse(JSON.stringify(wordData.Animal)),
            ...JSON.parse(JSON.stringify(wordData.Body))
          ]);
          wordList = fullWordPool.slice(0, ALL_COUNT);
          matchUsedIndex = [];
        }
        createMatchQ();
      }
      else { showPage("page-mode"); }
    });
    return;
  }
  let correctIdx;
  do { correctIdx = Math.floor(Math.random() * total); } while (matchUsedIndex.includes(correctIdx));
  matchUsedIndex.push(correctIdx);
  matchType = Math.random() > 0.5 ? "cn2en" : "en2cn";
  const correct = wordList[correctIdx];
  currentWord = correct;
  let otherList = wordList.filter((_, i) => i !== correctIdx);
  otherList = shuffleArray(otherList).slice(0, 2);
  const options = shuffleArray([correct, ...otherList]);
  const qDom = document.getElementById("qWord");
  const optWrap = document.getElementById("optionWrap");
  const tipDom = document.getElementById("matchTip");
  if (tipDom) tipDom.innerText = "";
  if (optWrap) optWrap.innerHTML = "";
  let progressDom = document.querySelector("#page-match .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    const qBox = document.querySelector("#page-match .q-box");
    if (qBox) qBox.prepend(progressDom);
  }
  if (progressDom) progressDom.innerText = `已學習 ${matchUsedIndex.length}/${total}`;
  if (matchType === "cn2en") {
    if (qDom) qDom.innerText = correct.cn;
    options.forEach(item => {
      const btn = document.createElement("button");
      btn.innerText = item.en;
      btn.onclick = () => matchCheckAnswer(item.en, correct.en, tipDom);
      optWrap.appendChild(btn);
    });
  } else {
    if (qDom) qDom.innerText = correct.en;
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
    if (tipDom) {
      tipDom.style.color = "#00aa00";
      tipDom.innerText = "答對啦！";
    }
    playFeedbackVoice(true);
    setTimeout(() => {
      createMatchQ();
    }, 1300);
  } else {
    wrongCount += 1;
    playFeedbackVoice(false);
    if (wrongCount >= 2) {
      showAnswerModal(right, () => { createMatchQ(); })
    } else {
      if (tipDom) {
        tipDom.style.color = "#f03030";
        tipDom.innerText = "答錯咯，再試一次！";
      }
    }
  }
}
// 配對頁發音按鈕
document.addEventListener("DOMContentLoaded", function () {
  const qVoiceBtn = document.getElementById("qVoiceBtn");
  if (qVoiceBtn) {
    qVoiceBtn.onclick = function () {
      if (!currentWord) return;
      matchType === "cn2en" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
    };
  }
});
// --------------------------拼寫模塊----------------------------
function initSpellGame() {
  if (nextBtnLock) return;
  nextBtnLock = true;
  setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
  wrongCount = 0;
  const total = wordList.length;
  if (spellUsedIndex.length >= total) {
    showFinishModal(function (again) {
      if (again) {
        if (currentCat === "All") {
          fullWordPool = shuffleArray([
            ...JSON.parse(JSON.stringify(wordData.Occupation)),
            ...JSON.parse(JSON.stringify(wordData.Place)),
            ...JSON.parse(JSON.stringify(wordData.Color)),
            ...JSON.parse(JSON.stringify(wordData.Animal)),
            ...JSON.parse(JSON.stringify(wordData.Body))
          ]);
          wordList = fullWordPool.slice(0, ALL_COUNT);
          spellUsedIndex = [];
        }
        initSpellGame();
      }
      else { showPage("page-mode"); }
    });
    return;
  }
  let randomIdx;
  do { randomIdx = Math.floor(Math.random() * total); } while (spellUsedIndex.includes(randomIdx));
  spellUsedIndex.push(randomIdx);
  currentWord = wordList[randomIdx];
  spellRawWord = currentWord.en.toLowerCase();
  spellTargetEn = spellRawWord.replace(/ /g, "");
  spellUserAnswer = [];
  originalLetters = spellTargetEn.split("");
  spellShuffleLetters = shuffleArray([...originalLetters]);
  renderSpellUI();
  let progressDom = document.querySelector("#page-spell .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    const cardBox = document.querySelector("#page-spell .spell-card-box");
    if (cardBox) cardBox.prepend(progressDom);
  }
  if (progressDom) progressDom.innerText = `已學習 ${spellUsedIndex.length}/${total}`;
}
function renderSpellUI() {
  const cnWordEl = document.getElementById("spellCnWord");
  const tipEl = document.getElementById("spellTip");
  const lineBox = document.getElementById("spellAnswerLine");
  const letterWrap = document.getElementById("spellLetterBox");
  if (cnWordEl) cnWordEl.innerText = currentWord.cn;
  if (tipEl) tipEl.innerText = "";
  if (lineBox) lineBox.innerHTML = "";
  let cellList = [];
  [...spellRawWord].forEach(char => {
    const cell = document.createElement("div");
    cell.className = "spell-cell";
    if (char === " ") {
      cell.style.borderBottom = "none";
      cell.style.width = "16px";
    }
    lineBox.appendChild(cell);
    cellList.push(cell);
  });
  for (let i = 0; i < spellUserAnswer.length; i++) {
    if (cellList[i]) {
      cellList[i].textContent = spellUserAnswer[i];
      cellList[i].style.animation = "popLetter 0.2s ease-out";
    }
  }
  let tempOriginal = [...originalLetters];
  let tempUsed = [...spellUserAnswer];
  let remainLetters = [];
  tempOriginal.forEach(ch => {
    const idx = tempUsed.indexOf(ch);
    if (idx === -1) {
      remainLetters.push(ch);
    } else {
      tempUsed.splice(idx, 1);
    }
  });
  const finalShuffleLetters = shuffleArray(remainLetters);
  if (letterWrap) letterWrap.innerHTML = "";
  finalShuffleLetters.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "spell-letter-btn";
    btn.onclick = function () {
      if (spellUserAnswer.length < spellTargetEn.length) {
        spellUserAnswer.push(letter);
        renderSpellUI();
      }
    };
    letterWrap.appendChild(btn);
  });
}
// 拼寫頁按鈕綁定
document.addEventListener("DOMContentLoaded", function () {
  const spellVoiceBtn = document.getElementById("spellVoiceBtn");
  if (spellVoiceBtn) {
    spellVoiceBtn.classList.add("voice-btn");
    spellVoiceBtn.onclick = function () {
      if (!currentWord) return;
      playSpellBilingualVoice(currentWord.en, currentWord.cn);
    };
  }
  const spellUndo = document.getElementById("spellUndo");
  if (spellUndo) {
    spellUndo.onclick = function () {
      if (spellUserAnswer.length > 0) {
        spellUserAnswer.pop();
        renderSpellUI();
      }
    };
  }
  const spellClearAll = document.getElementById("spellClearAll");
  if (spellClearAll) {
    spellClearAll.onclick = function () {
      spellUserAnswer = [];
      spellShuffleLetters = shuffleArray([...originalLetters]);
      renderSpellUI();
    };
  }
  const spellCheckAnswer = document.getElementById("spellCheckAnswer");
  if (spellCheckAnswer) {
    spellCheckAnswer.onclick = function () {
      const userStr = spellUserAnswer.join("");
      const tipDom = document.getElementById("spellTip");
      if (userStr === spellTargetEn) {
        if (tipDom) {
          tipDom.style.color = "#00aa00";
          tipDom.innerText = "拼寫正確！👏";
        }
        playFeedbackVoice(true);
        setTimeout(() => initSpellGame(), 1500);
      } else {
        wrongCount += 1;
        playFeedbackVoice(false);
        if (wrongCount >= 2) {
          showAnswerModal(spellRawWord, () => { initSpellGame() });
        } else {
          if (tipDom) {
            tipDom.style.color = "#f03030";
            tipDom.innerText = "拼寫錯誤，再嘗試一次";
          }
          spellUserAnswer = [];
          spellShuffleLetters = shuffleArray([...originalLetters]);
          renderSpellUI();
        }
      }
    };
  }
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
      if (again) { sentenceUsedIndex = []; nextSentence(); }
      else { showPage("page-mode"); }
    });
    return;
  }
  let randomIdx;
  do { randomIdx = Math.floor(Math.random() * total); } while (sentenceUsedIndex.includes(randomIdx));
  sentenceUsedIndex.push(randomIdx);
  currentSentenceIndex = randomIdx;
  const sentenceDom = document.getElementById("showSentence");
  if (!sentenceDom) return;
  if (currentMode === "en") {
    sentenceDom.innerText = currentSentenceEnList[currentSentenceIndex] || "";
  } else {
    sentenceDom.innerText = currentSentenceCnList[currentSentenceIndex] || "";
  }
  let progressDom = document.querySelector("#page-sentence .progress-text");
  if (!progressDom) {
    progressDom = document.createElement("p");
    progressDom.className = "progress-text";
    const box = document.querySelector("#page-sentence .word-box");
    if (box) box.prepend(progressDom);
  }
  if (progressDom) progressDom.innerText = `已學習 ${sentenceUsedIndex.length}/${total}`;
}
// 句子頁發音按鈕
document.addEventListener("DOMContentLoaded", function () {
  const sentenceVoiceBtn = document.getElementById("sentenceVoiceBtn");
  if (sentenceVoiceBtn) {
    sentenceVoiceBtn.onclick = function () {
      if (currentMode === "en") {
        playEnVoice(currentSentenceEnList[currentSentenceIndex]);
      } else {
        playCnVoice(currentSentenceCnList[currentSentenceIndex]);
      }
    };
  }
});
// 全局初始化入口
document.addEventListener("DOMContentLoaded", function () {
  loadStorage();
  initCategory();
});
