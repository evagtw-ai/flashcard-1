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
    { cn: "金色", en: "gold" },
    { cn: "橙色", en: "orange" }
  ],
  Nature: [],
  Clothing: [],
  Object: [],
  Vegetable: [],
  Animal: [
    { cn: "青蛙", en: "frog" },
    { cn: "老鼠", en: "mouse" },
    { cn: "綿羊", en: "sheep" },
    { cn: "山羊", en: "goat" },
    { cn: "老虎", en: "tiger" },
    { cn: "鴨子", en: "duck" },
    { cn: "雞", en: "chicken" },
    { cn: "猴子", en: "monkey" },
    { cn: "小鳥", en: "bird" },
    { cn: "奶牛", en: "cow" },
    { cn: "馬", en: "horse" },
    { cn: "狗", en: "dog" },
    { cn: "貓", en: "cat" },
    { cn: "斑馬", en: "zebra" },
    { cn: "長頸鹿", en: "giraffe" },
    { cn: "蛇", en: "snake" },
    { cn: "鱷魚", en: "crocodile" },
    { cn: "大象 ", en: "elephant" },
    { cn: "蜘蛛", en: "spider" },
    { cn: "蜥蜴", en: "lizard" },
    { cn: "鯨魚", en: "whale" },
    { cn: "獅子", en: "lion" },
    { cn: "狐狸", en: "fox" },
    { cn: "貓頭鷹", en: "owl" },
    { cn: "魚", en: "fish" },
    { cn: "金魚", en: "goldfish" },
    { cn: "螞蟻", en: "ant" },
    { cn: "蜜蜂", en: "bee" },
    { cn: "鯊魚", en: "shark" },
    { cn: "豬", en: "pig" },
    { cn: "兔子", en: "rabbit" },
    { cn: "蝸牛", en: "snail" },
    { cn: "樹熊", en: "koala" },
    { cn: "北極熊", en: "polar bear" },
    { cn: "鹿", en: "deer" },
    { cn: "熊", en: "bear" },
    { cn: "海豹", en: "seal" },
    { cn: "蚊", en: "mosquito" },
    { cn: "蝙蝠", en: "bat" },
    { cn: "袋鼠", en: "kangaroo" },
    { cn: "螃蟹", en: "crab" },
    { cn: "豹子", en: "leopard" },
    { cn: "浣熊", en: "raccoon" },
    { cn: "狼", en: "wolf" },
    { cn: "鵝", en: "goose" },
    { cn: "水母", en: "jellyfish" },
    { cn: "八爪魚", en: "octopus" },
    { cn: "猩猩", en: "gorilla" },
    { cn: "草蜢", en: "grasshopper" },
    { cn: "蜻蜓", en: "dragonfly" },
    { cn: "孔雀", en: "peacock" },
    { cn: "甲蟲", en: "beetle" },
    { cn: "海鷗", en: "seagull" },
    { cn: "蝴蝶", en: "butterfly" },
    { cn: "海豚", en: "dolphin" },
    { cn: "恐龍", en: "dinosaur" },
    { cn: "烏龜", en: "turtle" },
    { cn: "鸚鵡", en: "parrot" },
    { cn: "熊貓", en: "panda" },
    { cn: "河馬", en: "hippo" }
  ],
  Transportation: [],
  Stationary: [],
  Fruit: [],
  People: [],
  Body: [
    { cn: "臉", en: "face" },
    { cn: "眼睛", en: "eye" },
    { cn: "嘴巴", en: "mouth" },
    { cn: "鼻子", en: "nose" },
    { cn: "耳朵", en: "ear" },
    { cn: "頭", en: "head" },
    { cn: "頭髮", en: "hair" },
    { cn: "腿", en: "leg" },
    { cn: "手臂", en: "arm" },
    { cn: "手", en: "hand" },
    { cn: "腳", en: "foot" }
  ],
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
  Body: "身體",
  All: "全部詞彙"
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
  Animal: {
    cn: [
      "農場裡有山羊，豬和鵝。",
      "老虎是森林之王。",
      "小白兔愛吃青菜。",
      "蜜蜂在花間採蜜。",
      "蝸牛殼子是居所。",
      "鸚鵡模仿人說話。",
      "螞蟻合力搬食物。",
      "甲蟲在草上爬呀爬。",
      "小魚在水中游泳。",
      "小鳥在天空中飛。",
      "爸爸愛吃豬肉、白菜和米飯。",
      "水母和鯨魚是海洋中的動物。",
      "假日，我和媽媽到海洋公園看大熊貓",
      "春天來了，兩隻蝴蝶在飛舞。",
      "小羊喜歡吃青草。"
    ],
    en: [
      "Fish can live in the water.",
      "Rabbit can run fast."
    ]
  },
  Color: { cn: [], en: [] },
  Body: {
    cn: [
      "我用眼睛看風景。",
      "我用耳朵聽音樂。",
      "我用鼻子來呼吸。",
      "我用嘴巴來唱歌。",
      "我用手寫字。",
      "我用腳走路。"
    ],
    en: [
      "Lily has golden hair.",
      "Alex has big blue eyes."
    ]
  },
  All: { cn: [], en: [] }
};
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
let allUsedIndex = [];
//答錯次數計數
let wrongCount = 0;
//本輪使用索引（不再持久化存入localStorage，返回首頁清空）
let wordUsedIndex = [];
let matchUsedIndex = [];
let spellUsedIndex = [];
let sentenceUsedIndex = [];

// ===== 關鍵修復：全局預加載瀏覽器語音音色 =====
let globalVoiceList = [];
window.speechSynthesis.onvoiceschanged = function () {
  globalVoiceList = window.speechSynthesis.getVoices();
};
// ========== 通用標準Fisher-Yates洗牌函數（全局統一亂序） ==========
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
  // 強制停止當前所有音頻
  window.speechSynthesis.cancel();
  audioPlaying = true;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-HK";
  utter.rate = 0.95;
  utter.pitch = 1;
  utter.volume = 1;
  // 優先匹配系統粵語音色
  const cantoneseVoice = globalVoiceList.find(v => v.lang.startsWith("zh-HK"));
  if (cantoneseVoice) utter.voice = cantoneseVoice;
  // 統一按鈕禁用
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
// ========== 【已修改】拼寫遊戲專用 先英文、後粵語雙語發音函數 ==========
function playSpellBilingualVoice(enText, cnText) {
  if (!enText || !cnText || audioPlaying || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  audioPlaying = true;
  // 第一步：播放英式英文單詞/短語
  const engUtter = new SpeechSynthesisUtterance(enText);
  engUtter.lang = "en-GB";
  engUtter.rate = 0.8;
  engUtter.volume = 1;
  const engVoice = globalVoiceList.find(v => v.lang.startsWith("en-GB"));
  if (engVoice) engUtter.voice = engVoice;
  // 英文播完再播中文繁體釋義（統一 zh-HK 香港粵語，與學習模塊完全一致）
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
  // 按鈕禁用防重複點擊
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
    //匯集所有可用詞條，隨機挑選20個，使用深拷貝避免污染原數組
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
  //進入分類，重置本輪全部使用索引
  wordUsedIndex = [];
  matchUsedIndex = [];
  spellUsedIndex = [];
  sentenceUsedIndex = [];
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
        //All模式重新隨機20題
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
// 順序學習發音按鈕綁定（DOM載入後執行）
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
// --------------------------拼寫模塊【徹底修復字母亂序、雙語發音】----------------------------
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
  // 過濾空格得到需要拼寫的純字母
  spellTargetEn = spellRawWord.replace(/ /g, "");
  spellUserAnswer = [];
  // 提取原始字母陣列
  originalLetters = spellTargetEn.split("");
  // 核心：載入新單詞強制洗牌亂序
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
  // 繪製輸入格，保留空格位置（如 bus stop 中間空一格）
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
  // 回填用戶已選字母
  for (let i = 0; i < spellUserAnswer.length; i++) {
    if (cellList[i]) {
      cellList[i].textContent = spellUserAnswer[i];
      cellList[i].style.animation = "popLetter 0.2s ease-out";
    }
  }
  // 計算剩餘可點擊字母（處理重複字母）
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
  // 每次渲染都再次洗牌，保證字母永遠打亂
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
  //拼寫遊戲播放讀音按鈕：調用雙語函數
  const spellVoiceBtn = document.getElementById("spellVoiceBtn");
  if (spellVoiceBtn) {
    spellVoiceBtn.classList.add("voice-btn");
    spellVoiceBtn.onclick = function () {
      if (!currentWord) return;
      playSpellBilingualVoice(currentWord.en, currentWord.cn);
    };
  }
  //撤回按鈕
  const spellUndo = document.getElementById("spellUndo");
  if (spellUndo) {
    spellUndo.onclick = function () {
      if (spellUserAnswer.length > 0) {
        spellUserAnswer.pop();
        renderSpellUI();
      }
    };
  }
  //清空按鈕：重置答案並重新洗牌字母
  const spellClearAll = document.getElementById("spellClearAll");
  if (spellClearAll) {
    spellClearAll.onclick = function () {
      spellUserAnswer = [];
      spellShuffleLetters = shuffleArray([...originalLetters]);
      renderSpellUI();
    };
  }
  //確認答案
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
  setTimeout(() => initCategory(), 300);
});
