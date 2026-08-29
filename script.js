let currentSentenceCnList = []; 
let currentSentenceEnList = []; //全域變數
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

// ====================頁面切換通用函數====================
function switchPage(pageId){
    document.querySelectorAll(".page").forEach(p=>{
        p.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
}

// ====================返回上一級：模式頁返回首頁====================
function backMode(){
    orderIndex = 0;
    wrongCount = 0;
    spellUserAnswer = [];
    spellShuffleLetters = [];
    nextBtnLock = false;
    audioPlaying = false;
    switchPage("page-home");
}

// ==================== 渲染首頁分類按鈕 ====================
function renderCategoryList() {
    const wrap = document.getElementById("categoryWrap");
    if(!wrap){
        console.error("找不到 #categoryWrap DOM");
        return;
    }
    wrap.innerHTML = "";
    const keys = Object.keys(wordData);
    
    if(keys.length === 0){
        wrap.innerHTML = "<div>wordlist.js 讀取不到分類數據</div>";
        return;
    }

    keys.forEach(key => {
        const catName = catNameMap[key] || key;
        const btn = document.createElement("button");
        btn.className = "cat-btn";
        btn.innerHTML = `${catName}<br><span class="cat-en">${key}</span>`;
        btn.dataset.cat = key;
        btn.addEventListener("click", ()=>{
            currentCat = key;
            switchPage("page-mode");
            document.querySelector("#currentCatName > div:first-child").textContent = catName;
        });
        wrap.appendChild(btn);
    });
}

// ====================進入遊戲模式====================
function enterMode(mode) {
    currentMode = mode;
    orderIndex = 0;
    wrongCount = 0;
    nextBtnLock = false;
    audioPlaying = false;
    spellUserAnswer = [];
    spellShuffleLetters = [];

    wordList = [...(wordData[currentCat]?.words || [])];
    //防空判斷，空詞庫直接返回
    if(wordList.length === 0 && mode !== "sentenceBuild"){
        alert("本分類尚無單詞資料，請選擇其他分類！");
        return;
    }

    currentSentenceCnList = [...(wordData[currentCat]?.sentences?.cn || [])];
    currentSentenceEnList = [...(wordData[currentCat]?.sentences?.en || [])];
    currentSentenceIndex = 0;

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

// Fisher‑Yates 字母亂序
function shuffleArray(arr){
    let temp = [...arr];
    for(let i = temp.length - 1; i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp;
}

// ====================語音播放：英文 + 粵語 zh‑HK====================
function speakWord(enText, cnText){
    if(audioPlaying) return;
    audioPlaying = true;
    window.speechSynthesis.cancel();
    let u1 = new SpeechSynthesisUtterance(enText);
    u1.lang = "en-GB";
    u1.rate = 0.95;
    let u2 = new SpeechSynthesisUtterance(cnText);
    u2.lang = "zh-HK";
    u2.rate = 0.95;

    u1.onend = ()=>{
        setTimeout(()=>{
            window.speechSynthesis.speak(u2);
        },250);
    };
    u2.onend = ()=>{
        setTimeout(()=>{audioPlaying = false;},200);
    };
    window.speechSynthesis.speak(u1);
}

// ====================【修復】各模式實際渲染邏輯 ====================

function renderOrderWord(item){
    if(!item){
        alert("本輪全部學習完成！");
        backMode();
        return;
    }
    // 把文字渲染到畫面上的 HTML 標籤裡
    document.getElementById("orderCnText").textContent = item.cn;
    document.getElementById("orderEnText").textContent = item.en;
    
    // 綁定語音按鈕
    const voiceBtn = document.getElementById("orderVoiceBtn");
    if(voiceBtn) voiceBtn.onclick = () => speakWord(item.en, item.cn);

    speakWord(item.en, item.cn);
}

function renderCnWord(item){
    if(!item){
        alert("本輪全部學習完成！");
        backMode();
        return;
    }
    // 只顯示中文
    document.getElementById("showWord").textContent = item.cn;
    
    const voiceBtn = document.getElementById("voiceBtn");
    if(voiceBtn) voiceBtn.onclick = () => speakWord(item.en, item.cn);

    speakWord(item.en, item.cn);
}

function renderEnWord(item){
    if(!item){
        alert("本輪全部學習完成！");
        backMode();
        return;
    }
    // 只顯示英文
    document.getElementById("showWord").textContent = item.en;
    
    const voiceBtn = document.getElementById("voiceBtn");
    if(voiceBtn) voiceBtn.onclick = () => speakWord(item.en, item.cn);

    speakWord(item.en, item.cn);
}

// 配對與拼寫功能框架（需要你後續自己補齊遊戲邏輯）
function renderPairQuestion(item){
    if(!item){
        alert("本輪全部學習完成");
        return;
    }
    document.getElementById("qWord").textContent = item.cn; // 簡單展示
    speakWord(item.en, item.cn);
}

function renderSpellWord(item){
    if(!item){
        alert("本輪全部學習完成");
        return;
    }
    spellTargetEn = item.en;
    spellRawWord = item.en;
    originalLetters = spellRawWord.split("");
    spellShuffleLetters = shuffleArray(originalLetters);
    spellUserAnswer = [];
    
    document.getElementById("spellCnWord").textContent = item.cn; // 簡單展示
    speakWord(item.en, item.cn);
}

function renderSentenceBuild(cn, en){
    if(!cn || !en){
        alert("本輪句子練習完成");
        return;
    }
    document.getElementById("sentenceBuildTip").textContent = cn;
}


// ====================【修復】上下頁按鈕對應的函數 ====================

// 統一下一頁邏輯
function goNext(){
    if(nextBtnLock) return;
    nextBtnLock = true;
    orderIndex++;
    spellUserAnswer = [];
    spellShuffleLetters = [];
    const item = wordList[orderIndex];
    
    if(!item){
        alert("已經是最後一個單詞了，本輪學習完成！");
        nextBtnLock = false;
        return;
    }
    
    switch(currentMode){
        case "orderStudy": renderOrderWord(item); break;
        case "cn": renderCnWord(item); break;
        case "en": renderEnWord(item); break;
        case "match": renderPairQuestion(item); break;
        case "spell": renderSpellWord(item); break;
    }
    setTimeout(()=>{nextBtnLock = false;},NEXT_COOLDOWN);
}

// HTML 中調用的下一頁按鈕
function nextWord() {
    goNext();
}
function nextOrderWord() {
    goNext();
}

// HTML 中調用的上一頁按鈕 (僅 orderStudy 模式有)
function prevOrderWord() {
    if(nextBtnLock) return;
    if(orderIndex > 0) {
        orderIndex--;
        const item = wordList[orderIndex];
        renderOrderWord(item);
    } else {
        alert("這已經是第一個單詞了！");
    }
}

function restartRound(){
    orderIndex = 0;
    wrongCount = 0;
    spellUserAnswer = [];
    spellShuffleLetters = [];
    nextBtnLock = false;
    const item = wordList[orderIndex];
    switch(currentMode){
        case "orderStudy": renderOrderWord(item); break;
        case "cn": renderCnWord(item); break;
        case "en": renderEnWord(item); break;
        case "match": renderPairQuestion(item); break;
        case "spell": renderSpellWord(item); break;
    }
}

// ====================頁面初始化與事件綁定====================
function initApp() {
    renderCategoryList();

    const modeBtns = document.querySelectorAll(".mode-btn");
    modeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const mode = e.currentTarget.dataset.mode;
            if (mode) {
                enterMode(mode);
            }
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
