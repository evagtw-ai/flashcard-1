let currentSentenceCnList = [];
let currentSentenceEnList = [];
// 全域變數
let currentCat = "";
let currentMode = "";
let wordList = [];
let fullWordPool = []; //All 模式全部詞庫
let currentWord = null;
let spellTargetEn = "";
let spellRawWord = "";
let spellUserAnswer = [];
let spellShuffleLetters = []; // 紀錄本題固定的亂序字母
let originalLetters = []; // 本題原始字母池
let currentSentenceIndex = 0;
let audioPlaying = false;
const NEXT_COOLDOWN = 300;
let nextBtnLock = false;
let orderIndex = 0;
const ALL_COUNT = 20; //All 模式固定 20 題
let allUsedIndex = [];
// 答錯次數計數
let wrongCount = 0;
let wordUsedIndex = [];
let matchUsedIndex = [];
let spellUsedIndex = [];
let sentenceUsedIndex = [];
// ===== 關鍵修復：全局預加載瀏覽器語音音色 =====
let globalVoiceList = [];
window.speechSynthesis.onvoiceschanged = function () {
    globalVoiceList = window.speechSynthesis.getVoices();
};
// ========== 通用標準 Fisher-Yates 洗牌函數（全局統一亂序） ==========
function shuffleArray(arr) {
    const copyArr = [...arr];
    for (let i = copyArr.length - 1; i > 0; i--) {
        const randomPos = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[randomPos]] = [copyArr[randomPos], copyArr[i]];
    }
    return copyArr;
}
// ========== 重構粵語中文發音函數（徹底解決無法發聲問題） ==========
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
// 英式英語發音
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
    window.speechSynthesis.speak
