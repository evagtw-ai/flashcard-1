// 🛑 拼寫黑名單
// 只要在這裡面的單詞，拼寫遊戲就會自動跳過它。
// 你可以直接從 wordlist.js 複製整行貼過來！

const BANNED_SPELL_WORDS = [
    { cn: "火龍果", en: "dragon fruit" },
    { cn: "熱情果", en: "passion fruit" },
      { cn: "太空人", en: "astronaut" },
      { cn: "廚師", en: "chef" },
      { cn: "歌手", en: "singer" },
      { cn: "演員", en: "actor" },
      { cn: "漁夫", en: "fisherman" },
      { cn: "建築工人", en: "builder" },
      { cn: "工程師", en: "engineer" },
     
    
      { cn: "麵包店", en: "bakery" },
      { cn: "服裝店", en: "clothes shop" },
      { cn: "玩具店", en: "toy shop" },
      { cn: "警察局", en: "police station" },
      { cn: "郵局", en: "post office" },
      { cn: "消防局", en: "fire station" },
      { cn: "書店", en: "book shop" },

      { cn: "商場", en: "shopping mall" },
      { cn: "遊樂場", en: "playground" },
      { cn: "餐廳", en: "restaurant" },
 
      { cn: "深藍色", en: "dark blue" },
      { cn: "淺綠色", en: "light green" },
     
 { cn: "春天", en: "spring" },
      { cn: "夏天", en: "summer" },
      { cn: "秋天", en: "autumn" },
      { cn: "冬天", en: "winter" },
      
      { cn: "雷", en: "thunder" },
      { cn: "天空", en: "sky" },
      { cn: "田地", en: "field" }, // 已修正
      { cn: "地球", en: "earth" },
      { cn: "土", en: "soil" }, // 已修正
      { cn: "森林", en: "forest" },
      { cn: "地面", en: "ground" },

   
  
      { cn: "金魚", en: "goldfish" },
     
      { cn: "蝸牛", en: "snail" },
      { cn: "樹熊", en: "koala" },
      { cn: "北極熊", en: "polar bear" },
    
      { cn: "蚊", en: "mosquito" },
      { cn: "蝙蝠", en: "bat" },
     
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
      { cn: "恐龍", en: "dinosaur" },
      { cn: "烏龜", en: "turtle" },
   
      { cn: "纜車", en: "cable car" },
     
      { cn: "潛水艇", en: "submarine" },
      { cn: "電車", en: "tram" },
    
      { cn: "小巴", en: "minibus" },
      { cn: "小貨車", en: "van" },
      { cn: "渡海小輪", en: "ferry" },
 
      { cn: "帆船", en: "sailboat" },
      { cn: "遊艇", en: "yacht" },
    
      { cn: "地鐵", en: "subway" },
      { cn: "港鐵", en: "MTR" },
      { cn: "熱氣球", en: "hot air balloon" },

      { cn: "膠水", en: "glue" },
     
      { cn: "蠟筆", en: "crayon" },
      { cn: "訂書機", en: "stapler" },
      { cn: "剪刀", en: "scissors" },
     
      { cn: "櫻桃", en: "cherry" },
      
      { cn: "榴蓮", en: "durian" },
     
   
      { cn: "藍莓", en: "blueberry" },
      { cn: "火龍果", en: "dragon fruit" },
      { cn: "木瓜", en: "papaya" },
      { cn: "荔枝", en: "lychee" },
      { cn: "楊桃", en: "starfruit" },
    
      { cn: "西柚", en: "grapefruit" },
     
      { cn: "梅", en: "plum" },
    
      { cn: "熱情果", en: "passion fruit" },
        { cn: "連衣裙", en: "dress" },
     { cn: "襪", en: "sock" },
     { cn: "短裙", en: "skirt" },
     { cn: "鞋", en: "shoes" },
     { cn: "外套", en: "jacket" },
     { cn: "褲", en: "pants" },
     { cn: "牛仔褲", en: "jeans" },
      { cn: "圍巾", en: "scarf" },
      { cn: "手錶", en: "watch" },
      { cn: "長褲", en: "trousers" },
      { cn: "襯衫", en: "shirt" },
      { cn: "帽子", en: "hat" },
    { cn: "衣服", en: "clothes" },
    { cn: "手提包", en: "handbag" },
    { cn: "眼鏡", en: "glasses" },
    { cn: "包", en: "bag" },
    { cn: "窗", en: "window" },
      { cn: "椅子", en: "chair" },
      { cn: "桌子", en: "table" },
      { cn: "門", en: "door" },
      { cn: "書桌", en: "desk" },
      { cn: "鏡子", en: "mirror" },
      { cn: "電視", en: "television" },
      { cn: "床", en: "bed" },
      { cn: "櫃", en: "cupboard" },
      { cn: "鐘錶", en: "clock" },
      { cn: "收音機", en: "radio" },
      { cn: "盒子", en: "box" },
      { cn: "書架", en: "bookcase" },
      { cn: "地毯", en: "mat" },
      { cn: "燈", en: "lamp" },
      { cn: "沙發", en: "sofa" },
      { cn: "扶手椅", en: "armchair" },
      { cn: "電腦", en: "computer" },
      { cn: "鼠標", en: "mouse" },
      { cn: "籃球", en: "basketball" },
      { cn: "足球", en: "football" },
    { cn: "曲棍球", en: "hockey" },
      { cn: "網球", en: "tennis" },
    { cn: "棒球", en: "baseball" },
      { cn: "羽毛球", en: "badminton" },
    { cn: "乒乓球", en: "table tennis" },
      { cn: "貝殼", en: "shell" },
    { cn: "風箏", en: "kite" },
     { cn: "聽", en: " listen" },
     { cn: "說", en: "speak" },
     { cn: "讀", en: "read" },
     { cn: "看", en: "look" },
     { cn: "畫", en: "draw" },
     { cn: "跑", en: "run" },
     { cn: "跳", en: "jump" },
     { cn: "游", en: "swim" },
     { cn: "切", en: "cut" },
     { cn: "走", en: "walk" },
     { cn: "喜歡", en: "like" },
     { cn: "走", en: "go" },
     { cn: "玩", en: "play" },
     { cn: "踢", en: "kick" },
     { cn: "抓", en: "catch" },
     { cn: "開 ", en: "open" },
     { cn: "喝", en: "drink" },
     { cn: "吃", en: "eat" },
     { cn: "洗", en: "wash" },
     { cn: "拿", en: "take" },
     { cn: "騎", en: "ride" },
     { cn: "打", en: "hit" },
     { cn: "唱", en: "sing" },
     { cn: "扔", en: "throw" },
     { cn: "爬", en: "climb" },
       { cn: "坐", en: "sit" },
     { cn: "穿", en: "wear" },
     { cn: "拿", en: "take" }
    // ⬇️ 可以在下面繼續貼上其他不想拼寫的單詞
    
];
