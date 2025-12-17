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

export const GAPJA_PERSONALITIES = {
  // --- [갑(甲)] ---
  "甲子": { social: 40, kindness: 0, desc: "겉은 어지나 속은 차갑고 생각이 많음" },
  "甲寅": { social: 80, kindness: -10, desc: "고집 세고 자존심 강한 독불장군 리더" },
  "甲辰": { social: 70, kindness: 10, desc: "명랑하고 긍정적이나 한 방을 노리는 배짱" },
  "甲午": { social: 60, kindness: 0, desc: "언변이 화려하나 인내심 부족, 감정 기복 심함" },
  "甲申": { social: 30, kindness: -5, desc: "늘 긴장 상태, 절제력이 강한 혁명가 기질" },
  "甲戌": { social: 20, kindness: 0, desc: "생활력은 강하나 내면이 쓸쓸하고 고독함" },

  // --- [을(乙)] ---
  "乙丑": { social: 30, kindness: -10, desc: "겉은 유해 보이나 끈질긴 집념과 짠돌이 기질" },
  "乙卯": { social: 60, kindness: -5, desc: "생존 본능 탁월, 친구를 경쟁자로 인식함" },
  "乙巳": { social: 80, kindness: 10, desc: "자기표현 확실하고 매력적이나 변덕이 심함" },
  "乙未": { social: 40, kindness: -5, desc: "계산이 빠르고 생활력 강하나 다소 까칠함" },
  "乙酉": { social: 20, kindness: -20, desc: "날카롭고 예민하며 원칙을 중시함" },
  "乙亥": { social: 70, kindness: 10, desc: "상상력 풍부하고 인정 많으나 현실 감각 부족" },

  // --- [병(丙)] ---
  "丙子": { social: 50, kindness: 5, desc: "밝은 척하지만 속으론 소심하고 눈치를 봄" },
  "丙寅": { social: 90, kindness: 20, desc: "에너지 넘치고 다정다감하나 성격이 급함" },
  "丙辰": { social: 80, kindness: 30, desc: "헌신적이고 남을 잘 챙기는 식도락가" },
  "丙午": { social: 95, kindness: 0, desc: "뒤끝 없고 호탕하나 독단적인 불도저" },
  "丙申": { social: 85, kindness: 10, desc: "다재다능하고 화려함을 좋아하나 속은 우울" },
  "丙戌": { social: 40, kindness: 10, desc: "감정 기복이 심하고 욱하나 내 사람에겐 잘함" },

  // --- [정(丁)] ---
  "丁丑": { social: 30, kindness: 0, desc: "조용해 보이나 내면에 욕망과 재물욕이 강함" },
  "丁卯": { social: 60, kindness: 20, desc: "따뜻하고 다정하나 의심이 많고 꾸미기 좋아함" },
  "丁巳": { social: 70, kindness: -5, desc: "겉은 부드러우나 속은 칼 같음, 승부사 기질" },
  "丁未": { social: 50, kindness: 10, desc: "성격 급하고 화끈하며 간섭받기 싫어함" },
  "丁酉": { social: 40, kindness: -5, desc: "섬세하고 예리하며 계산이 정확함" },
  "丁亥": { social: 80, kindness: 25, desc: "인덕이 있고 예의 바르며 직관력이 뛰어남" },

  // --- [무(戊)] ---
  "戊子": { social: 30, kindness: -5, desc: "무뚝뚝해 보이나 실속파, 다소 인색함" },
  "戊寅": { social: 80, kindness: 0, desc: "카리스마와 리더십이 있으나 허세가 있음" },
  "戊辰": { social: 70, kindness: 5, desc: "배포 크고 추진력 좋으나 고집이 매우 셈" },
  "戊午": { social: 50, kindness: 0, desc: "겉은 묵직하나 속은 불같음, 마니아 기질" },
  "戊申": { social: 60, kindness: 10, desc: "다재다능하고 오지랖이 넓으며 고독을 즐김" },
  "戊戌": { social: 20, kindness: 0, desc: "고집과 주관 확고, 타협이 어려우나 의리 있음" },

  // --- [기(己)] ---
  "己丑": { social: 20, kindness: -5, desc: "근면 성실하나 속을 알 수 없고 앙심을 품음" },
  "己卯": { social: 50, kindness: -10, desc: "예민하고 꼼꼼하며 완벽주의적 성향" },
  "己巳": { social: 80, kindness: 20, desc: "의심 많으나 한번 마음 열면 다 퍼주는 스타일" },
  "己未": { social: 10, kindness: -10, desc: "독립심 강하고 고독을 즐기며 다소 까칠함" },
  "己酉": { social: 50, kindness: -5, desc: "예리하고 분석적이나 지적질로 구설수 조심" },
  "己亥": { social: 90, kindness: 15, desc: "융통성 좋고 처세술 뛰어나나 귀가 얇음" },

  // --- [경(庚)] ---
  "庚子": { social: 40, kindness: -15, desc: "비판적이고 예리하며 깨끗한 것을 좋아함" },
  "庚寅": { social: 85, kindness: 5, desc: "공사 구분 확실하고 활동 범위가 넓음" },
  "庚辰": { social: 70, kindness: 0, desc: "의리 있고 뚝심 대단하나 융통성 부족" },
  "庚午": { social: 75, kindness: 15, desc: "예의 바르고 단정하며 정이 많음" },
  "庚申": { social: 50, kindness: -10, desc: "고집불통에 타협 없음, 혁명가 기질" },
  "庚戌": { social: 30, kindness: -5, desc: "평소엔 조용하나 건드리면 폭발함, 사람 가림" },

  // --- [신(辛)] ---
  "辛丑": { social: 20, kindness: -5, desc: "차갑고 냉정해 보이나 내면에 열정이 있음" },
  "辛卯": { social: 40, kindness: -15, desc: "예민하고 날카로우며 완벽주의 성향" },
  "辛巳": { social: 85, kindness: 10, desc: "멋쟁이가 많고 예의 바르며 처세술 좋음" },
  "辛未": { social: 30, kindness: -5, desc: "겉은 유순하나 속은 고집 세고 맺고 끊음 확실" },
  "辛酉": { social: 10, kindness: -20, desc: "자존심 끝판왕, 차갑고 도도하며 냉정함" },
  "辛亥": { social: 70, kindness: 20, desc: "표현력 좋고 감수성 풍부하나 신경 예민" },

  // --- [임(壬)] ---
  "壬子": { social: 80, kindness: 5, desc: "스케일 크고 도량 넓으나 속을 알 수 없음" },
  "壬寅": { social: 90, kindness: 25, desc: "낙천적이고 베푸는 것 좋아하며 인기 많음" },
  "壬辰": { social: 75, kindness: -5, desc: "지략가이며 수단 좋으나 독선적일 수 있음" },
  "壬午": { social: 85, kindness: 15, desc: "사교적이고 다정다감하나 변덕스러움" },
  "壬申": { social: 70, kindness: 10, desc: "박식하고 융통성 좋으며 남을 잘 이끌음" },
  "壬戌": { social: 40, kindness: -10, desc: "자존심 강하고 직관력 뛰어나나 타인을 내려다봄" },

  // --- [계(癸)] ---
  "癸丑": { social: 30, kindness: -5, desc: "인내심 강하고 명예욕 있으나 속에 폭발력 있음" },
  "癸卯": { social: 80, kindness: 20, desc: "다정하고 섬세하며 예술적 감각이 있음" },
  "癸巳": { social: 95, kindness: 15, desc: "어디서나 환영받는 처세의 달인, 재물 감각 좋음" },
  "癸未": { social: 40, kindness: -10, desc: "급하고 다혈질적이며 승부욕이 강함" },
  "癸酉": { social: 15, kindness: -15, desc: "결벽증 있을 정도로 깔끔하고 예민함" },
  "癸亥": { social: 50, kindness: 0, desc: "지혜롭고 예지력 있으나 고집 세고 경쟁심 강함" }
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
