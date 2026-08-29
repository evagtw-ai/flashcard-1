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
    //離開時清空本輪所有狀態，下次進入重新開始一輪學習
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
    console.log("讀取分類keys：", keys);
    if(keys.length === 0){
        wrap.innerHTML = "<div>wordlist.js 讀取不到分類數據</div>";
        return;
    }

    keys.forEach(key => {
        const catName = catNameMap[key] || key;
        const btn = document.createElement("button");
        btn.className = "cat-btn";
        btn.textContent = catName;
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
        alert("本分類尚無單詞資料");
        backMode();
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

// ====================各模式渲染函數 示例骨架====================
function renderOrderWord(item){
    if(!item){
        alert("本輪全部學習完成");
        return;
    }
    speakWord(item.en, item.cn);
    // 你的頁面DOM渲染邏輯
}

function renderCnWord(item){
    if(!item){
        alert("本輪全部學習完成");
        return;
    }
    speakWord(item.en, item.cn);
    // 你的頁面DOM渲染邏輯
}

function renderEnWord(item){
    if(!item){
        alert("本輪全部學習完成");
        return;
    }
    speakWord(item.en, item.cn);
    // 你的頁面DOM渲染邏輯
}

function renderPairQuestion(item){
    if(!item){
        alert("本輪全部學習完成");
        return;
    }
    speakWord(item.en, item.cn);
    //配對遊戲渲染，橫線CSS已經居中
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
    speakWord(item.en, item.cn);
    //拼寫遊戲DOM渲染
}

function renderSentenceBuild(cn, en){
    if(!cn || !en){
        alert("本輪句子練習完成");
        return;
    }
    //句子模塊渲染
}

//下一題
function goNext(){
    if(nextBtnLock) return;
    nextBtnLock = true;
    orderIndex++;
    spellUserAnswer = [];
    spellShuffleLetters = [];
    const item = wordList[orderIndex];
    if(!item){
        alert("本輪全部學習完成");
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

//再學一次，**本輪重新開始，不讀歷史狀態**
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
    // 1. 渲染首頁分類按鈕
    renderCategoryList();

    // 2. 綁定「模式頁」所有按鈕的點擊事件
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

// 3. 更穩健的加載檢測：確保無論腳本何時加載，都能正確初始化
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp(); // 如果 DOM 已經加載完畢，直接執行
}
