let currentSentenceCnList = [];
let currentSentenceEnList = [];
// 全域變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let fullWordPool = []; 
let studyPool = []; 
let sentencePool = []; // 專門給「句子重組」用的題庫
let currentWord = null;

// 拼寫相關變數
let spellTargetEn = "";
let spellRawWord = "";
let spellUserAnswer = [];
let spellShuffleLetters = []; 
let originalLetters = []; 

// 句子重組相關變數
let currentSentenceLang = "cn"; 
let sentenceOriginalTokens = []; 
let sentenceShuffledTokens = []; 
let sentenceUserAnswers = [];    
let currentSentenceIndex = 0;

let audioPlaying = false;
const NEXT_COOLDOWN = 300;
let nextBtnLock = false;
let orderIndex = 0;

// ★ 專門針對「全部 (All)」分類的設定
const ALL_COUNT = 30; // 每次在「全部」中抽取的最大數量
let allLearnedWords = [];     // 記錄「全部」中已經學過的單詞
let allLearnedSentences = []; // 記錄「全部」中已經學過的句子

// 進度計數
let wrongCount = 0;
let wordUsedIndex = [];
let matchUsedIndex = [];
let spellUsedIndex = [];
let sentenceUsedIndex = [];

// ===== 全局預加載瀏覽器語音音色 =====
let globalVoiceList = [];
window.speechSynthesis.onvoiceschanged = function () {
    globalVoiceList = window.speechSynthesis.getVoices();
};

// ========== 通用標準 Fisher-Yates 洗牌函數 ==========
function shuffleArray(arr) {
    const copyArr = [...arr];
    for (let i = copyArr.length - 1; i > 0; i--) {
        const randomPos = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[randomPos]] = [copyArr[randomPos], copyArr[i]];
    }
    return copyArr;
}

// ========== 聚合「全部」分類資料 (包含 30 題隨機不重複邏輯) ==========
function generateAllCategoryData() {
    let pool = [];
    let cnSentences = [];
    let enSentences = [];
    
    // 抓取所有分類資料
    Object.keys(wordData).forEach(key => {
        if (key !== "All" && wordData[key]) {
            if (wordData[key].words) pool.push(...wordData[key].words);
            if (wordData[key].sentences) {
                if (wordData[key].sentences.cn) cnSentences.push(...wordData[key].sentences.cn);
                if (wordData[key].sentences.en) enSentences.push(...wordData[key].sentences.en);
            }
        }
    });

    // 1. 單詞抽取邏輯 (排除已學過的)
    let availableWords = pool.filter(w => !allLearnedWords.includes(w.en));
    if (availableWords.length === 0 && pool.length > 0) {
        alert("🎉 恭喜！【全部】分類的單詞已學完一輪，為你重新洗牌！");
        allLearnedWords = []; // 清空記憶
        availableWords = [...pool];
    }
    wordList = shuffleArray(availableWords).slice(0, ALL_COUNT);
    allLearnedWords.push(...wordList.map(w => w.en));

    // 2. 中文句子抽取邏輯 (排除已學過的)
    let availableCn = cnSentences.filter(s => !allLearnedSentences.includes(s));
    if (availableCn.length === 0 && cnSentences.length > 0) {
        allLearnedSentences = []; // 清空句子記憶
        availableCn = [...cnSentences];
    }
    currentSentenceCnList = shuffleArray(availableCn).slice(0, ALL_COUNT);
    allLearnedSentences.push(...currentSentenceCnList);

    // 3. 英文句子抽取邏輯 (排除已學過的)
    let availableEn = enSentences.filter(s => !allLearnedSentences.includes(s));
    if (availableEn.length === 0 && enSentences.length > 0) {
        availableEn = [...enSentences];
    }
    currentSentenceEnList = shuffleArray(availableEn).slice(0, ALL_COUNT);
    allLearnedSentences.push(...currentSentenceEnList);

    saveStorage(); // 儲存進度
}

// ========== 粵語發音 ==========
function playCnVoice(text) {
    if (!text || audioPlaying || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    audioPlaying = true;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-HK";
    utter.rate = 0.95;
    const cantoneseVoice = globalVoiceList.find(v => v.lang.startsWith("zh-HK"));
    if (cantoneseVoice) utter.voice = cantoneseVoice;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
    utter.onend = () => {
        audioPlaying = false;
        document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
    };
    window.speechSynthesis.speak(utter);
}

// ========== 英文發音 ==========
function playEnVoice(text) {
    if (!text || audioPlaying || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    audioPlaying = true;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.rate = 0.8;
    const enVoice = globalVoiceList.find(v => v.lang.startsWith("en-GB"));
    if (enVoice) utter.voice = enVoice;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);
    utter.onend = () => {
        audioPlaying = false;
        document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
    };
    window.speechSynthesis.speak(utter);
}

// ========== 拼寫專用 雙語發音 ==========
function playSpellBilingualVoice(enText, cnText) {
    if (!enText || !cnText || audioPlaying || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    audioPlaying = true;
    const engUtter = new SpeechSynthesisUtterance(enText);
    engUtter.lang = "en-GB";
    engUtter.rate = 0.8;
    const engVoice = globalVoiceList.find(v => v.lang.startsWith("en-GB"));
    if (engVoice) engUtter.voice = engVoice;

    engUtter.onend = () => {
        const cnUtter = new SpeechSynthesisUtterance(cnText);
        cnUtter.lang = "zh-HK";
        cnUtter.rate = 0.95;
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

// 答錯第一次反饋語音 / 答對語音
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

// 答錯第二次，宣告並讀出正確答案
function playCorrectAnswerVoice(answerStr, lang, isSpell) {
    if (audioPlaying || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    audioPlaying = true;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = true);

    const prefixUtter = new SpeechSynthesisUtterance("正確答案：");
    prefixUtter.lang = "zh-HK";
    prefixUtter.rate = 0.95;
    const cantoneseVoice = globalVoiceList.find(v => v.lang.startsWith("zh-HK"));
    if (cantoneseVoice) prefixUtter.voice = cantoneseVoice;

    prefixUtter.onend = () => {
        let answerUtterText = answerStr;
        let targetLang = lang === "en" ? "en-GB" : "zh-HK";
        
        if (isSpell) {
            answerUtterText = answerStr.split('').join(', ');
            targetLang = "en-GB"; 
        }

        const answerUtter = new SpeechSynthesisUtterance(answerUtterText);
        answerUtter.lang = targetLang;
        answerUtter.rate = isSpell ? 0.7 : (lang === "en" ? 0.8 : 0.95);
        
        const targetVoice = globalVoiceList.find(v => v.lang.startsWith(targetLang));
        if (targetVoice) answerUtter.voice = targetVoice;

        answerUtter.onend = () => {
            audioPlaying = false;
            document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
        };
        window.speechSynthesis.speak(answerUtter);
    };
    
    window.speechSynthesis.speak(prefixUtter);
}

// 本地存儲 (僅記錄 All 分類的進度)
function loadStorage() {
    const sw = localStorage.getItem("kidAllLearnedWords");
    const ss = localStorage.getItem("kidAllLearnedSentences");
    if (sw) allLearnedWords = JSON.parse(sw);
    if (ss) allLearnedSentences = JSON.parse(ss);

    wordUsedIndex = []; matchUsedIndex = []; spellUsedIndex = []; sentenceUsedIndex = [];
}

function saveStorage() {
    localStorage.setItem("kidAllLearnedWords", JSON.stringify(allLearnedWords));
    localStorage.setItem("kidAllLearnedSentences", JSON.stringify(allLearnedSentences));
}

// 完成彈窗
function showFinishModal(resetCallback) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.left = "0"; modal.style.top = "0";
    modal.style.width = "100vw"; modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.display = "flex"; modal.style.justifyContent = "center"; modal.style.alignItems = "center";
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
    btnAgain.innerText = "再玩一次";
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
    box.appendChild(text); box.appendChild(btnWrap);
    modal.appendChild(box);
    document.body.appendChild(modal);
}

// 答錯彈窗
function showAnswerModal(answer, nextFunc) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.left = "0"; modal.style.top = "0";
    modal.style.width = "100vw"; modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.display = "flex"; modal.style.justifyContent = "center"; modal.style.alignItems = "center";
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

    box.appendChild(text); box.appendChild(confirmBtn);
    modal.appendChild(box);
    document.body.appendChild(modal);
}

function stopAllAudio() {
    window.speechSynthesis.cancel();
    audioPlaying = false;
    document.querySelectorAll(".voice-btn").forEach(btn => btn.disabled = false);
}

// 頁面切換
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
function backHome() { showPage("page-home"); }
function backMode() { showPage("page-mode"); }

// 首頁分類渲染
function initCategory() {
    const wrap = document.getElementById("categoryWrap");
    if (!wrap) return;
    wrap.innerHTML = "";
    const openCats = ["Occupation", "Place", "Color", "Animal", "Transportation", "Body", "Stationary", "Nature", "Fruit", "All"];
    Object.keys(wordData).forEach(key => {
        const btn = document.createElement("button");
        btn.innerHTML = `        <div style="font-size:22px; font-weight:bold;">${catNameMap[key]}</div>         <div style="font-size:14px; opacity:0.8;">${key}</div>        `;
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
        // 「全部」分類：自動抽 30 題、不重複、存進度
        generateAllCategoryData();
    } else {
        // 單一分類：載入全部內容，無數量限制，不存進度
        wordList = [...(wordData[catKey].words || [])];
        currentSentenceCnList = wordData[catKey].sentences ? [...(wordData[catKey].sentences.cn || [])] : [];
        currentSentenceEnList = wordData[catKey].sentences ? [...(wordData[catKey].sentences.en || [])] : [];
    }
    
    if (wordList.length === 0 && currentSentenceCnList.length === 0 && currentSentenceEnList.length === 0) {
        alert("當前分類暫無內容，敬請期待！");
        return;
    }
    
    // 智能判斷：如果這個分類沒有句子，就把「句子重組」按鈕變灰並禁用
    const sentenceBtn = document.querySelector('.mode-btn[data-mode="sentence"]');
    if (sentenceBtn) {
        const hasSentence = currentSentenceCnList.length > 0 || currentSentenceEnList.length > 0;
        if (!hasSentence) {
            sentenceBtn.disabled = true;
            sentenceBtn.style.opacity = "0.35";
            sentenceBtn.style.cursor = "not-allowed";
            sentenceBtn.style.filter = "grayscale(100%)";
        } else {
            sentenceBtn.disabled = false;
            sentenceBtn.style.opacity = "1";
            sentenceBtn.style.cursor = "pointer";
            sentenceBtn.style.filter = "none";
        }
    }

    wordUsedIndex = []; matchUsedIndex = []; spellUsedIndex = []; sentenceUsedIndex = [];
    orderIndex = 0; wrongCount = 0;

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

// 模式按鈕點擊
document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.onclick = () => {
        currentMode = btn.dataset.mode;
        wrongCount = 0;

        if (currentMode === "cn" || currentMode === "en") {
            wordUsedIndex = [];
            studyPool = [...wordList]; 
            
            if (currentMode === "cn") {
                currentSentenceCnList.forEach(cnStr => {
                    if (cnStr) studyPool.push({ cn: cnStr, en: "" });
                });
            } else if (currentMode === "en") {
                currentSentenceEnList.forEach(enStr => {
                    if (enStr) studyPool.push({ cn: "", en: enStr });
                });
            }
        } 
        else if (currentMode === "sentence") {
            sentenceUsedIndex = [];
            sentencePool = [];
            currentSentenceCnList.forEach(text => {
                if (text) sentencePool.push({ lang: "cn", text: text });
            });
            currentSentenceEnList.forEach(text => {
                if (text) sentencePool.push({ lang: "en", text: text });
            });
        }
        else if (currentMode === "orderStudy") orderIndex = 0;
        else if (currentMode === "match") matchUsedIndex = [];
        else if (currentMode === "spell") spellUsedIndex = [];

        const cnName = catNameMap[currentCat];
        const titleDom = document.getElementById("currentCatName");
        if (titleDom) {
            titleDom.innerHTML = `<div style="font-size:32px; font-weight:bold;">${cnName}</div><div style="font-size:20px; opacity:0.7;">${currentCat.toLowerCase()}</div>`;
        }
        
        if (currentMode === "cn" || currentMode === "en") {
            nextWord(); showPage("page-study");
        } else if (currentMode === "orderStudy") {
            renderOrderWord(); showPage("page-orderStudy");
        } else if (currentMode === "match") {
            createMatchQ(); showPage("page-match");
        } else if (currentMode === "spell") {
            initSpellGame(); showPage("page-spell");
        } else if (currentMode === "sentence") {
            nextSentence(); showPage("page-sentence");
        }
    };
});

// 順序學習頁 
function renderOrderWord() {
    const total = wordList.length;
    let progressDom = document.querySelector("#page-orderStudy .progress-text");
    if (!progressDom) {
        progressDom = document.createElement("p"); progressDom.className = "progress-text";
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
    if (orderIndex <= 0) { alert("已經是第一個單詞！"); return; }
    orderIndex--; renderOrderWord();
}
function nextOrderWord() {
    const total = wordList.length;
    if (orderIndex >= total - 1) {
        showFinishModal(function (again) {
            if (again) {
                if (currentCat === "All") generateAllCategoryData();
                orderIndex = 0; renderOrderWord();
            } else { showPage("page-mode"); }
        });
        return;
    }
    orderIndex++; renderOrderWord();
}
document.addEventListener("DOMContentLoaded", function () {
    const orderVoiceBtn = document.getElementById("orderVoiceBtn");
    if (orderVoiceBtn) {
        orderVoiceBtn.onclick = async function () {
            if (audioPlaying) return;
            const item = wordList[orderIndex];
            playCnVoice(item.cn);
            const waitEnd = () => new Promise(res => {
                const timer = setInterval(() => { if (!audioPlaying) { clearInterval(timer); res(); } }, 100);
            });
            await waitEnd();
            playEnVoice(item.en);
        };
    }
});

// 單詞/句子 隨機混合學習 
function nextWord() {
    if (nextBtnLock) return;
    nextBtnLock = true;
    setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
    const total = studyPool.length; 
    
    if (wordUsedIndex.length >= total) {
        showFinishModal(function (again) {
            if (again) {
                if (currentCat === "All") {
                    generateAllCategoryData();
                    // All 分類重置後，需要重組混合題庫
                    studyPool = [...wordList]; 
                    if (currentMode === "cn") {
                        currentSentenceCnList.forEach(cnStr => { if (cnStr) studyPool.push({ cn: cnStr, en: "" }); });
                    } else if (currentMode === "en") {
                        currentSentenceEnList.forEach(enStr => { if (enStr) studyPool.push({ cn: "", en: enStr }); });
                    }
                }
                wordUsedIndex = []; nextWord();
            } else { showPage("page-mode"); }
        });
        return;
    }
    let randomIdx;
    do { randomIdx = Math.floor(Math.random() * total); } while (wordUsedIndex.includes(randomIdx));
    wordUsedIndex.push(randomIdx);

    currentWord = studyPool[randomIdx]; 
    const wordDom = document.getElementById("showWord");
    
    let displayStr = currentMode === "cn" ? currentWord.cn : currentWord.en;
    if(displayStr) displayStr = displayStr.replace(/\|/g, "");
    
    if (wordDom) wordDom.innerText = displayStr;

    let progressDom = document.querySelector("#page-study .progress-text");
    if (!progressDom) {
        progressDom = document.createElement("p"); progressDom.className = "progress-text";
        const box = document.querySelector("#page-study .word-box");
        if (box) box.prepend(progressDom);
    }
    if (progressDom) progressDom.innerText = `已學習 ${wordUsedIndex.length}/${total}`;
}
document.addEventListener("DOMContentLoaded", function () {
    const voiceBtn = document.getElementById("voiceBtn");
    if (voiceBtn) {
        voiceBtn.onclick = function () {
            if (!currentWord) return;
            const cleanCn = currentWord.cn ? currentWord.cn.replace(/\|/g, "") : "";
            const cleanEn = currentWord.en ? currentWord.en.replace(/\|/g, "") : "";
            currentMode === "cn" ? playCnVoice(cleanCn) : playEnVoice(cleanEn);
        };
    }
});

// 配對遊戲
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
                if (currentCat === "All") generateAllCategoryData();
                matchUsedIndex = []; createMatchQ();
            } else { showPage("page-mode"); }
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
        progressDom = document.createElement("p"); progressDom.className = "progress-text";
        const qBox = document.querySelector("#page-match .q-box");
        if (qBox) qBox.prepend(progressDom);
    }
    if (progressDom) progressDom.innerText = `已學習 ${matchUsedIndex.length}/${total}`;

    if (matchType === "cn2en") {
        if (qDom) qDom.innerText = correct.cn;
        options.forEach(item => {
            const btn = document.createElement("button"); btn.innerText = item.en;
            btn.onclick = () => matchCheckAnswer(item.en, correct.en, tipDom);
            optWrap.appendChild(btn);
        });
    } else {
        if (qDom) qDom.innerText = correct.en;
        options.forEach(item => {
            const btn = document.createElement("button"); btn.innerText = item.cn;
            btn.onclick = () => matchCheckAnswer(item.cn, correct.cn, tipDom);
            optWrap.appendChild(btn);
        });
    }
}
function matchCheckAnswer(select, right, tipDom) {
    if (select === right) {
        if (tipDom) { tipDom.style.color = "#00aa00"; tipDom.innerText = "答對啦！"; }
        playFeedbackVoice(true);
        setTimeout(() => { createMatchQ(); }, 1300);
    } else {
        wrongCount += 1;
        if (wrongCount >= 2) {
            const ansLang = matchType === "cn2en" ? "en" : "cn";
            playCorrectAnswerVoice(right, ansLang, false);
            showAnswerModal(right, () => { createMatchQ(); });
        } else {
            playFeedbackVoice(false);
            if (tipDom) { tipDom.style.color = "#f03030"; tipDom.innerText = "答錯咯，再試一次！"; }
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const qVoiceBtn = document.getElementById("qVoiceBtn");
    if (qVoiceBtn) {
        qVoiceBtn.onclick = function () {
            if (!currentWord) return;
            matchType === "cn2en" ? playCnVoice(currentWord.cn) : playEnVoice(currentWord.en);
        };
    }
});

// 拼寫遊戲
function initSpellGame() {
    if (nextBtnLock) return;
    nextBtnLock = true;
    setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
    wrongCount = 0;
    const total = wordList.length;

    if (spellUsedIndex.length >= total) {
        showFinishModal(function (again) {
            if (again) {
                if (currentCat === "All") generateAllCategoryData();
                spellUsedIndex = []; initSpellGame();
            } else { showPage("page-mode"); }
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
        progressDom = document.createElement("p"); progressDom.className = "progress-text";
        const cardBox = document.querySelector("#page-spell .spell-card-box");
        if (cardBox) cardBox.prepend(progressDom);
    }
    if (progressDom) progressDom.innerText = `已學習 ${spellUsedIndex.length}/${total}`;
}
function renderSpellUI() {
    const cnWordEl = document.getElementById("spellCnWord");
    const tipEl = document.getElementById("spellTip");
    const lineBox = document.getElementById("spellAnswerLine");
    const innerWrap = lineBox.querySelector(".spell-input-inner");
    const letterWrap = document.getElementById("spellLetterBox");

    if (cnWordEl) cnWordEl.innerText = currentWord.cn;
    if (tipEl) tipEl.innerText = "";
    if (innerWrap) innerWrap.innerHTML = "";

    let cellList = [];
    [...spellRawWord].forEach(char => {
        const cell = document.createElement("div"); cell.className = "spell-cell";
        if (char === " ") { cell.style.borderBottom = "none"; cell.style.width = "16px"; }
        innerWrap.appendChild(cell); cellList.push(cell);
    });

    for (let i = 0; i < spellUserAnswer.length; i++) {
        if (cellList[i]) { cellList[i].textContent = spellUserAnswer[i]; cellList[i].style.animation = "popLetter 0.2s ease-out"; }
    }

    let tempUsed = [...spellUserAnswer];
    let remainLetters = [];
    spellShuffleLetters.forEach(ch => {
        const idx = tempUsed.indexOf(ch);
        if (idx === -1) { remainLetters.push(ch); } else { tempUsed.splice(idx, 1); }
    });

    if (letterWrap) letterWrap.innerHTML = "";
    remainLetters.forEach(letter => {
        const btn = document.createElement("button"); btn.textContent = letter; btn.className = "spell-letter-btn";
        btn.onclick = function () {
            if (spellUserAnswer.length < spellTargetEn.length) { spellUserAnswer.push(letter); renderSpellUI(); }
        };
        letterWrap.appendChild(btn);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const spellVoiceBtn = document.getElementById("spellVoiceBtn");
    if (spellVoiceBtn) {
        spellVoiceBtn.onclick = function () { if (!currentWord) return; playSpellBilingualVoice(currentWord.en, currentWord.cn); };
    }
    const spellUndo = document.getElementById("spellUndo");
    if (spellUndo) { spellUndo.onclick = function () { if (spellUserAnswer.length > 0) { spellUserAnswer.pop(); renderSpellUI(); } }; }
    const spellClearAll = document.getElementById("spellClearAll");
    if (spellClearAll) { spellClearAll.onclick = function () { spellUserAnswer = []; renderSpellUI(); }; }
    const spellCheckAnswer = document.getElementById("spellCheckAnswer");
    if (spellCheckAnswer) {
        spellCheckAnswer.onclick = function () {
            const userStr = spellUserAnswer.join("");
            const tipDom = document.getElementById("spellTip");
            if (userStr === spellTargetEn) {
                if (tipDom) { tipDom.style.color = "#00aa00"; tipDom.innerText = "拼寫正確！👏"; }
                playFeedbackVoice(true);
                setTimeout(() => initSpellGame(), 1500);
            } else {
                wrongCount += 1;
                if (wrongCount >= 2) {
                    playCorrectAnswerVoice(spellTargetEn, "en", true);
                    showAnswerModal(spellRawWord, () => { initSpellGame() });
                } else {
                    playFeedbackVoice(false);
                    if (tipDom) { tipDom.style.color = "#f03030"; tipDom.innerText = "拼寫錯誤，再嘗試一次"; }
                    spellUserAnswer = []; renderSpellUI();
                }
            }
        };
    }
});


// ================== 句子重組模塊 ==================

function tokenizeSentence(text, lang) {
    if (text.includes("|")) {
        return text.split("|").filter(s => s.trim().length > 0);
    }
    
    if (window.Intl && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter(lang === 'en' ? 'en' : 'zh-HK', { granularity: 'word' });
        return Array.from(segmenter.segment(text))
                    .map(s => s.segment)
                    .filter(s => s.trim().length > 0);
    } else {
        if (lang === 'en') {
            return text.match(/[\w]+|[^\s\w]/g) || text.split('').filter(s => s.trim().length > 0);
        } else {
            return text.split('').filter(s => s.trim().length > 0);
        }
    }
}

function nextSentence() {
    if (nextBtnLock) return;
    nextBtnLock = true;
    setTimeout(() => nextBtnLock = false, NEXT_COOLDOWN);
    
    const total = sentencePool.length;
    if (total === 0) {
        alert("本分類暫無句子！"); backMode(); return;
    }

    if (sentenceUsedIndex.length >= total) {
        showFinishModal(function (again) {
            if (again) {
                if (currentCat === "All") {
                    generateAllCategoryData();
                    sentencePool = [];
                    currentSentenceCnList.forEach(text => { if (text) sentencePool.push({ lang: "cn", text: text }); });
                    currentSentenceEnList.forEach(text => { if (text) sentencePool.push({ lang: "en", text: text }); });
                }
                sentenceUsedIndex = []; nextSentence();
            } else { showPage("page-mode"); }
        });
        return;
    }
    
    let randomIdx;
    do { randomIdx = Math.floor(Math.random() * total); } while (sentenceUsedIndex.includes(randomIdx));
    sentenceUsedIndex.push(randomIdx);
    
    currentSentenceIndex = randomIdx;
    wrongCount = 0;

    const currentItem = sentencePool[currentSentenceIndex];
    currentSentenceLang = currentItem.lang;
    const rawText = currentItem.text;

    sentenceOriginalTokens = tokenizeSentence(rawText, currentSentenceLang);
    sentenceShuffledTokens = shuffleArray([...sentenceOriginalTokens]);
    sentenceUserAnswers = [];

    renderSentenceUI();

    let progressDom = document.querySelector("#page-sentence .progress-text");
    if (!progressDom) {
        progressDom = document.createElement("p"); progressDom.className = "progress-text";
        const page = document.querySelector("#page-sentence");
        if (page) page.prepend(progressDom);
    }
    if (progressDom) progressDom.innerText = `已學習 ${sentenceUsedIndex.length}/${total}`;
}

function renderSentenceUI() {
    const tipDom = document.getElementById("sentenceTip");
    if (tipDom) tipDom.innerText = "";
    
    const resultArea = document.getElementById("sentenceResultArea");
    const optionArea = document.getElementById("sentenceOptionArea");
    if (!resultArea || !optionArea) return;
    
    resultArea.innerHTML = ""; optionArea.innerHTML = "";

    sentenceShuffledTokens.forEach((token, index) => {
        const btn = document.createElement("button");
        btn.className = "sentence-token";
        btn.innerText = token;
        
        if (sentenceUserAnswers.includes(index)) {
            btn.classList.add("used");
        } else {
            btn.onclick = () => {
                sentenceUserAnswers.push(index);
                renderSentenceUI();
            };
        }
        optionArea.appendChild(btn);
    });

    sentenceUserAnswers.forEach((tokenIndex, i) => {
        const token = sentenceShuffledTokens[tokenIndex];
        const btn = document.createElement("button");
        btn.className = "sentence-token";
        btn.innerText = token;
        btn.onclick = () => {
            sentenceUserAnswers.splice(i, 1);
            renderSentenceUI();
        };
        resultArea.appendChild(btn);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const sentenceVoiceBtn = document.getElementById("sentenceVoiceBtn");
    if (sentenceVoiceBtn) {
        sentenceVoiceBtn.onclick = function () {
            let speakText = sentencePool[currentSentenceIndex].text;
            speakText = speakText.replace(/\|/g, "");
            currentSentenceLang === "en" ? playEnVoice(speakText) : playCnVoice(speakText);
        };
    }

    const sentenceUndoBtn = document.getElementById("sentenceUndoBtn");
    if (sentenceUndoBtn) {
        sentenceUndoBtn.onclick = () => {
            if (sentenceUserAnswers.length > 0) {
                sentenceUserAnswers.pop();
                renderSentenceUI();
            }
        };
    }

    const sentenceClearBtn = document.getElementById("sentenceClearBtn");
    if (sentenceClearBtn) {
        sentenceClearBtn.onclick = () => {
            sentenceUserAnswers = [];
            renderSentenceUI();
        };
    }

    const sentenceCheckBtn = document.getElementById("sentenceCheckBtn");
    if (sentenceCheckBtn) {
        sentenceCheckBtn.onclick = () => {
            if (sentenceUserAnswers.length !== sentenceOriginalTokens.length) {
                const tip = document.getElementById("sentenceTip");
                if (tip) { tip.innerText = "請把所有詞彙都排上去喔！"; tip.style.color = "#f03030"; }
                return;
            }
            
            let isCorrect = true;
            for (let i = 0; i < sentenceOriginalTokens.length; i++) {
                if (sentenceShuffledTokens[sentenceUserAnswers[i]] !== sentenceOriginalTokens[i]) {
                    isCorrect = false; break;
                }
            }

            if (isCorrect) {
                const tip = document.getElementById("sentenceTip");
                if (tip) { tip.innerText = "太棒了，重組正確！👏"; tip.style.color = "#00aa00"; }
                playFeedbackVoice(true);
                setTimeout(() => nextSentence(), 1500);
            } else {
                wrongCount++;
                
                if (wrongCount >= 2) {
                    const answerStr = currentSentenceLang === "en" 
                        ? sentenceOriginalTokens.join(" ").replace(/\s+([.,!?])/g, "$1").replace(/\|/g, "") 
                        : sentenceOriginalTokens.join("").replace(/\|/g, "");
                    
                    playCorrectAnswerVoice(answerStr, currentSentenceLang, false);
                    showAnswerModal(answerStr, () => { nextSentence(); });
                } else {
                    playFeedbackVoice(false);
                    sentenceUserAnswers = [];
                    renderSentenceUI();
                    
                    const tip = document.getElementById("sentenceTip");
                    if (tip) { 
                        tip.innerText = "順序不對喔，請再重新排一次！"; 
                        tip.style.color = "#f03030"; 
                    }
                }
            }
        };
    }
});

// 全局初始化入口
document.addEventListener("DOMContentLoaded", function () {
    loadStorage();
    initCategory();
    setTimeout(() => initCategory(), 300);
});
