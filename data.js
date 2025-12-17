export const SAJU_DATA = {
  yang: {
    stems: ["甲", "丙", "戊", "庚", "壬"],
    branches: ["子", "寅", "辰", "午", "申", "戌"]
  },
  yin: {
    stems: ["乙", "丁", "己", "辛", "癸"],
    branches: ["丑", "卯", "巳", "未", "酉", "亥"]
  }
};

export const GAN_ORDER = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

export const FIVE_ELEMENTS = {
  "甲": "wood", "乙": "wood", "寅": "wood", "卯": "wood",
  "丙": "fire", "丁": "fire", "巳": "fire", "午": "fire",
  "戊": "earth", "己": "earth", "辰": "earth", "戌": "earth", "丑": "earth", "未": "earth",
  "庚": "metal", "辛": "metal", "申": "metal", "酉": "metal",
  "壬": "water", "癸": "water", "亥": "water", "子": "water"
};

export const CONTROLS = { "wood": "earth", "earth": "water", "water": "fire", "fire": "metal", "metal": "wood" };
export const PRODUCES = { "wood": "fire", "fire": "earth", "earth": "metal", "metal": "water", "water": "wood" };

export const HAP_PAIRS = {
  "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙", "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊",
  "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯", "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"
};

export const CHUNG_PAIRS = {
  "甲": "庚", "庚": "甲", "乙": "辛", "辛": "乙", "丙": "壬", "壬": "丙", "丁": "癸", "癸": "丁",
  "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅", "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳"
};

export const WONJIN_PAIRS = {
  "子": "未", "未": "子", "丑": "午", "午": "丑", "寅": "酉", "酉": "寅",
  "卯": "申", "申": "卯", "辰": "亥", "亥": "辰", "巳": "戌", "戌": "巳"
};

export const TEMPERATURE = {
  "丙": "hot", "丁": "hot", "巳": "hot", "午": "hot",
  "壬": "cold", "癸": "cold", "亥": "cold", "子": "cold",
  "戊": "dry", "未": "dry", "戌": "dry",
  "己": "wet", "辰": "wet", "丑": "wet"
};

export const PLACES = [
  { id: 'apt', name: '아파트', type: 'home' },
  { id: 'mart', name: '마트', type: 'out' },
  { id: 'cafe', name: '카페', type: 'out' },
  { id: 'school', name: '학교', type: 'out' },
  { id: 'restaurant', name: '식당', type: 'out' },
  { id: 'company', name: '회사', type: 'out' },
  { id: 'travel', name: '여행지', type: 'travel' }
];

export const WORD_SETS = {
  genre: ['SF','로맨스','추리','무협','판타지','공포','역사','자기계발'],
  food: ['김치찌개','된장찌개','파스타','스테이크','라면','치킨','삼겹살','샐러드','떡볶이'],
  hobby: ['유튜브','넷플릭스','게임','음악','영화','홈트레이닝','요가','뜨개질','청소'],
  study: ['수학','영어','코딩','철학','경제','역사','디자인','물리','화학'],
  topic: ['연예인','주식','날씨','취미','과거','미래','고민','맛집'],
  book: ['만화책','잡지','소설책','에세이'],
  destination: ['제주도','부산','강릉','여수','대전','오사카','도쿄','파리','런던','하와이','방콕'],
  club: ['밴드부','연극부','댄스동아리','요리동아리','독서모임','영화동아리','보드게임 동아리','러닝 크루'],
  secret: ['진짜 꿈','흑역사','가정사','비밀 취미','연애사','과거 실수','숨겨진 목표','고민']
};

export const ACTIONS = [
  { id: 'rest', name: '휴식', place: 'apt', text: ['침대에서 뒹굴거렸다','낮잠을 잤다','멍하니 창밖을 보았다','스마트폰을 했다'] },
  { id: 'leisure', name: '여가', place: 'apt', text: ['{hobby}을(를) 즐겼다','새로운 취미를 찾았다'] },
  { id: 'cooking', name: '요리', place: 'apt', text: ['{food}을(를) 만들어 먹었다','새로운 {food} 레시피를 시도했다'] },
  { id: 'work', name: '업무', place: 'company', text: ['보고서를 작성했다','회의에 참석했다','야근을 했다','메일을 확인했다','새 기획안을 작성했다','회의록을 검토했다','회식을 즐겼다'] },
  { id: 'study', name: '공부', place: 'school', text: ['{study} 전공 서적을 읽었다','과제를 수행했다','시험 공부를 했다'] },
  { id: 'gathering', name: '모임', place: 'cafe', text: ['{topic}에 대해 수다를 떨었다','커피를 마시며 쉬었다','인생 상담을 했다'] },
  { id: 'read', name: '독서', place: 'apt', text: ['{genre} 소설을 읽었다','{genre} 만화책을 봤다'] },
  { id: 'eat', name: '식사', place: 'restaurant', text: ['{food}을(를) 사 먹었다','배부르게 밥을 먹었다'] },
  { id: 'shop', name: '쇼핑', place: 'mart', text: ['장을 봤다','생필품을 샀다','충동구매를 했다','할인 상품을 샀다'] },
  { id: 'walk', name: '산책', place: 'apt', text: ['복도를 걸어다녔다','단지 내를 산책했다','바람을 쐬었다'] },
  { id: 'travel', name: '여행', place: 'travel', text: ['{destination}에서 즐거운 시간을 보냈다','{destination}의 맛집을 탐방했다','{destination}의 풍경을 구경했다'] }
];

// 오행별 특수 행동 (아파트용)
export const ELEMENT_ACTIONS = {
  "wood": [
    { name: "창작", text: ["새로운 아이디어를 구상했다", "그림을 그렸다", "다이어리를 꾸몄다", "블로그에 글을 썼다"] },
    { name: "가꾸기", text: ["화분에 물을 줬다", "방 구조를 바꿨다", "새로운 취미를 시작했다"] },
    { name: "운동", text: ["스트레칭을 했다", "요가를 했다"] }
  ],
  "fire": [
    { name: "공연", text: ["거울 보고 춤을 췄다", "노래를 크게 불렀다", "화려한 옷을 입어봤다"] },
    { name: "방송", text: ["인스타 라이브를 켰다", "유튜브 영상을 찍었다", "친구와 영상통화를 했다"] },
    { name: "운동", text: ["땀나게 홈트를 했다", "격렬하게 쉐도우 복싱을 했다"] }
  ],
  "earth": [
    { name: "살림", text: ["냉장고 정리를 했다", "가구 배치를 고민했다", "맛있는 간식을 쟁겨놨다"] },
    { name: "휴식", text: ["소파와 한 몸이 되었다", "하루 종일 뒹굴거렸다", "옛날 사진첩을 봤다"] },
    { name: "힐링", text: ["명상을 했다", "따뜻한 차를 마셨다"] }
  ],
  "metal": [
    { name: "자기관리", text: ["가계부를 정리했다", "근육 상태를 체크했다", "영양제를 챙겨 먹었다"] },
    { name: "정리", text: ["칼같이 방 청소를 했다", "안 쓰는 물건을 버렸다", "옷장을 각 맞춰 정리했다"] },
    { name: "공부", text: ["주식 차트를 분석했다", "뉴스 기사를 스크랩했다"] }
  ],
  "water": [
    { name: "몰입", text: ["새벽까지 게임을 했다", "심오한 영화를 봤다", "추리 소설을 읽었다"] },
    { name: "감성", text: ["새벽 감성에 젖었다", "혼술을 즐겼다", "일기를 썼다"] },
    { name: "수면", text: ["이불 밖으로 나가지 않았다", "꿈 내용을 해몽해봤다"] }
  ]
};

export const EVENTS = [
  { type: 'fight', name: '싸움', change: -15, text: '와(과) 사소한 문제로 크게 다퉜다' },
  { type: 'confess', name: '고백', change: 0, text: '에게 마음을 담아 고백했다' },
  { type: 'cut', name: '절교', change: -30, text: '와(과)의 연을 끊기로 했다' },
  { type: 'friend', name: '친교', change: 10, text: '와(과) 급격히 친해졌다' },
  { type: 'reconcile', name: '화해', change: 15, text: '와(과) 서로 사과하고 화해했다' },
  { type: 'breakup', name: '이별', change: 0, text: '에게 이별을 고했다' },
  { type: 'gift', name: '선물', change: 10, text: '에게 작은 선물을 주었다' },
  { type: 'date', name: '데이트', change: 12, text: '와(과) 둘만의 데이트를 했다' },
  { type: 'blind', name: '소개팅', change: 8, text: '와(과) 소개팅을 했다' },
  { type: 'club', name: '동아리', change: 10, text: '와(과) {club}에서 같이 활동했다' },
  { type: 'secret', name: '비밀 교환', change: 15, text: '와(과) 서로의 {secret}을(를) 털어놓았다' }
];

export const MOODS = [
  { id: 'cold', name: '🔥 냉전중', dotClass: 'bg-slate-900 dark:bg-slate-200', textClass: 'text-slate-600 dark:text-slate-300' },
  { id: 'normal', name: '보통', dotClass: 'bg-slate-400', textClass: 'text-slate-500 dark:text-slate-400' },
  { id: 'happy', name: '행복', dotClass: 'bg-emerald-500', textClass: 'text-emerald-600 dark:text-emerald-300' },
  { id: 'sad', name: '슬픔', dotClass: 'bg-blue-500', textClass: 'text-blue-600 dark:text-blue-300' },
  { id: 'sick', name: '아픔', dotClass: 'bg-rose-500', textClass: 'text-rose-600 dark:text-rose-300' },
  { id: 'busy', name: '바쁨', dotClass: 'bg-amber-500', textClass: 'text-amber-600 dark:text-amber-300' }
];

export const CANVAS_FONT_FAMILY = `"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic","Segoe UI",sans-serif`;