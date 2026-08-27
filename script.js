// ==================== script.js 完整代碼 ====================
// 全域狀態變數
let currentCategory = "";
let currentIndex = 0;
let isRoundComplete = false;
let currentWordList = [];
let currentWord = null;

// Fisher‑Yates 洗牌工具
function shuffleArray(arr) {
  const temp = [...arr];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

// 打亂當前分類詞庫
function shuffleCurrentWordList() {
  currentWordList = shuffleArray(currentWordList);
}

// 單詞字母亂序（拼寫遊戲）
function shuffleWordLetters(wordStr) {
  return shuffleArray(wordStr.split(''));
}

// 發音：先英文，後粵語 zh‑HK
function speakWord(cnText, enText) {
  window.speechSynthesis.cancel();

  const utterEn = new SpeechSynthesisUtterance(enText);
  utterEn.lang = "en-GB";
  utterEn.rate = 0.9;

  const utterCn = new SpeechSynthesisUtterance(cnText);
  utterCn.lang = "zh-HK";
  utterCn.rate = 0.9;

  utterEn.onend = () => {
    setTimeout(() => {
      window.speechSynthesis.speak(utterCn);
    }, 300);
  };
  window.speechSynthesis.speak(utterEn);
}

// 頁面切換
function goPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// 進入分類，開始學習
function startCategory(categoryKey) {
  // 關鍵：每次打開分類強制重置完成狀態，修復重入就彈窗
  isRoundComplete = false;
  currentIndex = 0;
  currentCategory = categoryKey;
  currentWordList = [...wordData[categoryKey]];
  shuffleCurrentWordList();
  loadCurrentWord();
  goPage("page-mode");
}

// 載入當前題目
function loadCurrentWord() {
  if (currentIndex >= currentWordList.length) {
    showCompletePopup();
    return;
  }
  currentWord = currentWordList[currentIndex];
  renderWordUI(currentWord);
}

// ========== 這裡替換回你原本的渲染UI邏輯 ==========
function renderWordUI(word) {
  // 你的原有程式：顯示中文、生成拼寫字母按鈕、發音按鈕等
}

// 下一題
function nextWord() {
  currentIndex++;
  loadCurrentWord();
}

// 完成彈窗，增加防重複觸發保護
function showCompletePopup() {
  if (isRoundComplete) return;
  isRoundComplete = true;
  document.querySelector(".complete-modal").classList.remove("hidden");
}

// DOM載入完成後綁定事件
document.addEventListener("DOMContentLoaded", () => {

  // 首頁分類按鈕渲染
  function initCategoryWrap() {
    const wrap = document.getElementById("categoryWrap");
    wrap.innerHTML = "";
    Object.keys(wordData).forEach(key => {
      const btn = document.createElement("button");
      btn.innerText = key;
      btn.addEventListener("click", () => startCategory(key));
      wrap.appendChild(btn);
    });
  }
  initCategoryWrap();

  // 完成彈窗：再學一次
  document.querySelector(".btn-restart").addEventListener("click", () => {
    document.querySelector(".complete-modal").classList.add("hidden");
    // 重置全部狀態
    isRoundComplete = false;
    currentIndex = 0;
    shuffleCurrentWordList();
    loadCurrentWord();
  });

  // 完成彈窗：返回上一級
  document.querySelector(".btn-backlevel").addEventListener("click", () => {
    document.querySelector(".complete-modal").classList.add("hidden");
    isRoundComplete = false;
    currentIndex = 0;
    goPage("page-home");
  });

});
