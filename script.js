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

// 語音 英文(en‑GB) + 粵語 zh‑HK
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

// 數組隨機取一項，空返回空字符串
function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

// Fisher‑Yates 洗牌
function shuffleArray(arr) {
  const temp = [...arr];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

// 頁面切換
function switchPage(pageId) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.add("hidden");
  });
  document.getElementById(pageId).classList.remove("hidden");
}

// 返回首頁
function backHome() {
  switchPage("page-home");
}

// 返回模式選擇頁 page-mode
function backMode() {
  switchPage("page-mode");
}

// ==================== 渲染首頁分類按鈕 ====================
function renderCategoryList() {
  const wrap = document.getElementById("categoryWrap");
  wrap.innerHTML = "";
  const keys = Object.keys(wordData);
  keys.forEach(key => {
    const catName = catNameMap[key] || key;
    const btn = document.createElement("button");
    btn.className = "cat-btn";
    btn.textContent = catName;
    btn.dataset.cat = key;
    btn.addEventListener("click", ()=>{
      currentCat = key;
      // 切到模式選擇頁
      switchPage("page-mode");
      document.querySelector("#currentCatName > div:first-child").textContent = catName;
    });
    wrap.appendChild(btn);
  });
}

// ==================== 進入模式，初始化本輪狀態 ====================
function enterMode(mode) {
  currentMode = mode;
  // 每一次進入模式，重置本輪全部狀態，不存localStorage
  orderIndex = 0;
  wrongCount = 0;
  nextBtnLock = false;
  audioPlaying = false;
  spellUserAnswer = [];
  spellShuffleLetters = [];

  wordList = [...(wordData[currentCat]?.words || [])];
  currentSentenceCnList = [...(wordData[currentCat]?.sentences?.cn || [])];
  currentSentenceEnList = [...(wordData[currentCat]?.sentences?.en || [])];
  currentSentenceIndex = 0;

  // mode和HTML data-mode對應
  switch(mode) {
    case "orderStudy":
      switchPage("page-orderStudy");
      renderOrderWord(wordList[orderIndex]);
      break;
    case "cn":
      switchPage("page-study");
      renderCnWord(wordList[orderIndex]);
      break;
    case "en":
      switchPage("page-study");
      renderEnWord(wordList[orderIndex]);
      break;
    case "match":
      switchPage("page-match");
      renderPairQuestion(wordList[orderIndex]);
      break;
    case "spell":
      switchPage("page-spell");
      renderSpellWord(wordList[orderIndex]);
      break;
    case "sentenceBuild":
      switchPage("page-sentence-build");
      renderSentenceBuild(currentSentenceCnList[currentSentenceIndex], currentSentenceEnList[currentSentenceIndex]);
      break;
  }
}

// ---------------- 學習模式 orderStudy 渲染，使用HTML預留id ----------------
function renderOrderWord(item) {
  document.getElementById("orderCnText").textContent = item.cn;
  document.getElementById("orderEnText").textContent = item.en;
  document.querySelector(".progress-text").textContent = `${orderIndex+1} / ${wordList.length}`;
  // 播放按鈕綁定
  document.getElementById("orderVoiceBtn").onclick = ()=> speakWord(item.en, item.cn);
}

// ---------------- 中文模式 cn：#showWord 顯示中文，隨機中文句子 ----------------
function renderCnWord(item) {
  document.getElementById("showWord").textContent = item.cn;
  const catSentCn = wordData[currentCat]?.sentences?.cn || [];
  const sen = getRandomItem(catSentCn);
  // 把句子掛到showWord下方，利用tip
  let tipDom = document.querySelector(".word-box .tip");
  if(!tipDom){
    tipDom = document.createElement("div");
    tipDom.className = "tip";
    document.querySelector(".word-box").appendChild(tipDom);
  }
  tipDom.textContent = sen;
  document.querySelector(".progress-text").textContent = `${orderIndex+1} / ${wordList.length}`;
  document.getElementById("voiceBtn").onclick = ()=> speakWord(item.en, item.cn);
}

// ---------------- 英文模式 en：#showWord顯示英文，隨機英文句子 ----------------
function renderEnWord(item) {
  document.getElementById("showWord").textContent = item.en;
  const catSentEn = wordData[currentCat]?.sentences?.en || [];
  const sen = getRandomItem(catSentEn);
  let tipDom = document.querySelector(".word-box .tip");
  if(!tipDom){
    tipDom = document.createElement("div");
    tipDom.className = "tip";
    document.querySelector(".word-box").appendChild(tipDom);
  }
  tipDom.textContent = sen;
  document.querySelector(".progress-text").textContent = `${orderIndex+1} / ${wordList.length}`;
  document.getElementById("voiceBtn").onclick = ()=> speakWord(item.en, item.cn);
}

// ---------------- 配對模式 match ----------------
function renderPairQuestion(qItem) {
  document.getElementById("qWord").textContent = qItem.cn;
  document.getElementById("qVoiceBtn").onclick = ()=> speakWord(qItem.en, qItem.cn);
  document.getElementById("matchTip").textContent = "請選擇對應英文";
  document.querySelector(".progress-text").textContent = `${orderIndex+1} / ${wordList.length}`;
  renderPairOptions(qItem);
}

function renderPairOptions(correctItem){
  const wrap = document.getElementById("optionWrap");
  wrap.innerHTML = "";
  // 隨機取其他選項
  const pool = shuffleArray(wordList.filter(w=>w.en !== correctItem.en));
  const opts = [correctItem, ...pool.slice(0,3)];
  const shuffledOpts = shuffleArray(opts);
  shuffledOpts.forEach(opt=>{
    const btn = document.createElement("button");
    btn.className = "pair-option-btn";
    btn.textContent = opt.en;
    btn.onclick = ()=>{
      if(opt.en === correctItem.en){
        orderIndex++;
        if(orderIndex >= wordList.length){
          alert("本輪配對學習完成！");
          backMode();
        }else{
          renderPairQuestion(wordList[orderIndex]);
        }
      }else{
        document.getElementById("matchTip").textContent = "答錯了，再試一次";
      }
    };
    wrap.appendChild(btn);
  });
}

// ---------------- 拼寫模式 spell ----------------
function renderSpellWord(item) {
  document.getElementById("spellCnWord").textContent = item.cn;
  document.getElementById("spellVoiceBtn").onclick = ()=> speakWord(item.en, item.cn);
  spellTargetEn = item.en;
  spellRawWord = item.en;
  spellUserAnswer = [];
  document.querySelector("#spellAnswerLine .spell-input-inner").innerHTML = "";
  buildSpellLetters(item.en);
  document.querySelector(".progress-text").textContent = `${orderIndex+1} / ${wordList.length}`;
  document.getElementById("spellTip").textContent = "";
}

function buildSpellLetters(enStr){
  const letters = enStr.toLowerCase().split("");
  spellShuffleLetters = shuffleArray([...letters]);
  const box = document.getElementById("spellLetterBox");
  box.innerHTML = "";
  spellShuffleLetters.forEach(ch=>{
    const span = document.createElement("span");
    span.className = "spell-char";
    span.textContent = ch;
    span.onclick = ()=>{
      spellUserAnswer.push(ch);
      document.querySelector("#spellAnswerLine .spell-input-inner").innerHTML = spellUserAnswer.join(" ");
    };
    box.appendChild(span);
  });
}

// 拼寫按鈕事件
function bindSpellBtns(){
  document.getElementById("spellUndo").onclick = ()=>{
    spellUserAnswer.pop();
    document.querySelector("#spellAnswerLine .spell-input-inner").innerHTML = spellUserAnswer.join(" ");
  };
  document.getElementById("spellClearAll").onclick = ()=>{
    spellUserAnswer = [];
    document.querySelector("#spellAnswerLine .spell-input-inner").innerHTML = "";
  };
  document.getElementById("spellCheckAnswer").onclick = ()=>{
    const user = spellUserAnswer.join("");
    if(user === spellTargetEn.toLowerCase()){
      document.getElementById("spellTip").textContent = "✅答對";
      orderIndex++;
      setTimeout(()=>{
        if(orderIndex >= wordList.length){
          alert("本輪拼寫完成！");
          backMode();
        }else{
          renderSpellWord(wordList[orderIndex]);
        }
      },600);
    }else{
      document.getElementById("spellTip").textContent = "❌再試一次";
    }
  };
}

// ----------------句子重組 sentenceBuild ----------------
function renderSentenceBuild(cnSen, enSen){
  if(!cnSen || !enSen){
    document.getElementById("sentenceBuildTip").textContent = "本分類暫無句子";
    return;
  }
  document.getElementById("sentenceBuildTip").textContent = cnSen + " / " + enSen;
  document.querySelector(".progress-text").textContent = `${currentSentenceIndex+1}/${currentSentenceCnList.length}`;
  document.getElementById("sentenceResultArea").innerHTML = "";
  // 簡易碎片
  const frags = enSen.split(" ");
  const group = document.getElementById("sentenceOptionGroup");
  group.innerHTML = "";
  shuffleArray(frags).forEach(word=>{
    const btn = document.createElement("button");
    btn.className = "sentence-frag-btn";
    btn.textContent = word;
    btn.onclick = ()=>{
      const div = document.createElement("span");
      div.textContent = word + " ";
      document.getElementById("sentenceResultArea").appendChild(div);
    };
    group.appendChild(btn);
  });
}

// study頁下一題（cn / en模式共用）
function nextWord(){
  orderIndex++;
  if(orderIndex >= wordList.length){
    alert("本輪學習完成！");
    backMode();
    return;
  }
  const item = wordList[orderIndex];
  if(currentMode === "cn") renderCnWord(item);
  if(currentMode === "en") renderEnWord(item);
}

function nextOrderWord(){
  orderIndex++;
  if(orderIndex >= wordList.length){
    alert("本輪學習完成！");
    backMode();
    return;
  }
  renderOrderWord(wordList[orderIndex]);
}

function prevOrderWord(){
  if(orderIndex <=0) return;
  orderIndex--;
  renderOrderWord(wordList[orderIndex]);
}

// 綁定模式頁按鈕
function bindModeButtons(){
  document.querySelectorAll(".mode-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const m = btn.dataset.mode;
      enterMode(m);
    });
  });
}

// 句子重組按鈕
function bindSentenceBuildBtns(){
  document.getElementById("sentenceUndo").onclick = ()=>{
    const area = document.getElementById("sentenceResultArea");
    if(area.lastChild) area.removeChild(area.lastChild);
  };
  document.getElementById("sentenceClear").onclick = ()=>{
    document.getElementById("sentenceResultArea").innerHTML = "";
  };
  document.getElementById("sentenceCheck").onclick = ()=>{
    currentSentenceIndex++;
    if(currentSentenceIndex >= currentSentenceCnList.length){
      alert("句子重組本輪完成");
      backMode();
    }else{
      renderSentenceBuild(currentSentenceCnList[currentSentenceIndex], currentSentenceEnList[currentSentenceIndex]);
    }
  };
}

// ========== DOM載入完畢入口 ==========
document.addEventListener("DOMContentLoaded", ()=>{
  renderCategoryList();
  bindModeButtons();
  bindSpellBtns();
  bindSentenceBuildBtns();
});
