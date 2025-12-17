const SAJU_DATA = {
  // 양(Yang) 그룹
  yang: {
    stems: ["甲", "丙", "戊", "庚", "壬"],
    branches: ["子", "寅", "辰", "午", "申", "戌"]
  },
  // 음(Yin) 그룹
  yin: {
    stems: ["乙", "丁", "己", "辛", "癸"],
    branches: ["丑", "卯", "巳", "未", "酉", "亥"]
  }
};

const GAN_ORDER = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

// 오행(Elements) 매핑
const FIVE_ELEMENTS = {
  "甲": "wood", "乙": "wood", "寅": "wood", "卯": "wood",
  "丙": "fire", "丁": "fire", "巳": "fire", "午": "fire",
  "戊": "earth", "己": "earth", "辰": "earth", "戌": "earth", "丑": "earth", "未": "earth",
  "庚": "metal", "辛": "metal", "申": "metal", "酉": "metal",
  "壬": "water", "癸": "water", "亥": "water", "子": "water"
};

// 상극(Control) 및 상생(Produces)
const CONTROLS = { "wood": "earth", "earth": "water", "water": "fire", "fire": "metal", "metal": "wood" };
const PRODUCES = { "wood": "fire", "fire": "earth", "earth": "metal", "metal": "water", "water": "wood" };

// 합(Harmony) & 충(Clash) & 원진
const HAP_PAIRS = {
  "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙", "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊",
  "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯", "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"
};

const CHUNG_PAIRS = {
  "甲": "庚", "庚": "甲", "乙": "辛", "辛": "乙", "丙": "壬", "壬": "丙", "丁": "癸", "癸": "丁",
  "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅", "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳"
};

const WONJIN_PAIRS = {
  "子": "未", "未": "子", "丑": "午", "午": "丑", "寅": "酉", "酉": "寅",
  "卯": "申", "申": "卯", "辰": "亥", "亥": "辰", "巳": "戌", "戌": "巳"
};

// 조후(Temperature)
const TEMPERATURE = {
  "丙": "hot", "丁": "hot", "巳": "hot", "午": "hot",
  "壬": "cold", "癸": "cold", "亥": "cold", "子": "cold",
  "戊": "dry", "未": "dry", "戌": "dry",
  "己": "wet", "辰": "wet", "丑": "wet"
};

const PLACES = [
  { id: 'apt', name: '아파트', type: 'home' },
  { id: 'mart', name: '마트', type: 'out' },
  { id: 'cafe', name: '카페', type: 'out' },
  { id: 'school', name: '학교', type: 'out' },
  { id: 'restaurant', name: '식당', type: 'out' },
  { id: 'company', name: '회사', type: 'out' },
  { id: 'travel', name: '여행지', type: 'travel' }
];

const WORD_SETS = {
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

const ACTIONS = [
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
const ELEMENT_ACTIONS = {
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

const EVENTS = [
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

const MOODS = [
  { id: 'cold', name: '🔥 냉전중', dotClass: 'bg-slate-900 dark:bg-slate-200', textClass: 'text-slate-600 dark:text-slate-300' },
  { id: 'normal', name: '보통', dotClass: 'bg-slate-400', textClass: 'text-slate-500 dark:text-slate-400' },
  { id: 'happy', name: '행복', dotClass: 'bg-emerald-500', textClass: 'text-emerald-600 dark:text-emerald-300' },
  { id: 'sad', name: '슬픔', dotClass: 'bg-blue-500', textClass: 'text-blue-600 dark:text-blue-300' },
  { id: 'sick', name: '아픔', dotClass: 'bg-rose-500', textClass: 'text-rose-600 dark:text-rose-300' },
  { id: 'busy', name: '바쁨', dotClass: 'bg-amber-500', textClass: 'text-amber-600 dark:text-amber-300' }
];

const CANVAS_FONT_FAMILY = `"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic","Segoe UI",sans-serif`;

let characters = [];
let day = 1;
let logs = [];
let affectionMode = false;
let isDarkMode = false;

window.onload = () => {
  initSajuSelect();
  initRoomSelect();
  renderCharacterList();
  renderLocations();
  updateUI();

  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    isDarkMode = true;
  }
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function hasJongseong(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code - 0xAC00) % 28 > 0;
}

function getJosa(word, type) {
  const lastChar = word.charAt(word.length - 1);
  const has = hasJongseong(lastChar);
  if (type === '은/는') return has ? '은' : '는';
  if (type === '이/가') return has ? '이' : '가';
  if (type === '을/를') return has ? '을' : '를';
  if (type === '와/과') return has ? '과' : '와';
  return '';
}

function fillTemplate(text) {
  let replaced = text.replace(/{(\w+)}/g, (match, key) => {
    const words = WORD_SETS[key];
    return words ? getRandom(words) : match;
  });

  replaced = replaced.replace(/(\S+)\((은\/는|이\/가|을\/를|와\/과)\)/g, (match, word, josa) => {
    return word + getJosa(word, josa);
  });
  return replaced;
}

function calculateChemistry(charA, charB) {
  let score = 0;
  const ganA = charA.mbti[0]; const jiA = charA.mbti[1];
  const ganB = charB.mbti[0]; const jiB = charB.mbti[1];
  
  const elA = FIVE_ELEMENTS[ganA];
  const elB = FIVE_ELEMENTS[ganB];

  // 1순위: 천합지합
  const isGanHap = HAP_PAIRS[ganA] === ganB;
  const isJiHap  = HAP_PAIRS[jiA] === jiB;
  if (isGanHap && isJiHap) score += 50; 

  // 2순위: 천충지충
  const isGanChung = CHUNG_PAIRS[ganA] === ganB;
  const isJiChung  = CHUNG_PAIRS[jiA] === jiB;
  if (isGanChung && isJiChung) score += 45; 

  if (!(isGanHap && isJiHap) && !(isGanChung && isJiChung)) {
    if (isGanHap) score += 10;
    if (isJiHap) score += 15; 
    if (isGanChung) score += 10;
    if (isJiChung) score += 10;
  }

  // 3순위: 원진살
  if (WONJIN_PAIRS[jiA] === jiB) score += 35;

  // 4순위: 조후 해결
  const typesA = [TEMPERATURE[ganA], TEMPERATURE[jiA]].filter(Boolean);
  const typesB = [TEMPERATURE[ganB], TEMPERATURE[jiB]].filter(Boolean);
  let solvedJohu = false;
  
  const hasHotA = typesA.includes('hot'); const hasColdA = typesA.includes('cold');
  const hasHotB = typesB.includes('hot'); const hasColdB = typesB.includes('cold');
  if ((hasHotA && !hasColdA && hasColdB) || (hasColdA && !hasHotA && hasHotB)) solvedJohu = true;

  const hasDryA = typesA.includes('dry'); const hasWetA = typesA.includes('wet');
  const hasDryB = typesB.includes('dry'); const hasWetB = typesB.includes('wet');
  if ((hasDryA && !hasWetA && hasWetB) || (hasWetA && !hasDryA && hasDryB)) solvedJohu = true;

  if (solvedJohu) score += 15;

  // 5순위: 십성 상보성
  const aControlsB = (CONTROLS[elA] === elB);
  const bControlsA = (CONTROLS[elB] === elA);
  const isSameGender = (charA.gender === charB.gender);
  const isNonBinary = (charA.gender === 'nonbinary' || charB.gender === 'nonbinary');

  if (isNonBinary) {
    if (aControlsB || bControlsA) score += 15;
  } else if (!isSameGender) {
    if ((charA.gender === 'male' && aControlsB) || (charB.gender === 'male' && bControlsA)) {
      score += 20; 
    } else if ((charA.gender === 'female' && aControlsB) || (charB.gender === 'female' && bControlsA)) {
      score += 10; 
    }
  }

  // 식상 생조
  if (PRODUCES[elA] === elB) score += 10;
  if (PRODUCES[elB] === elA) score += 10;

  return Math.max(-50, Math.min(100, score));
}

function calculateDirectionalScore(fromChar, toChar) {
  // 1. 기본 베이스는 기존 궁합 점수 (합, 충, 원진 등은 공유)
  let baseScore = calculateChemistry(fromChar, toChar);
  
  const myGan = fromChar.mbti[0];
  const yourGan = toChar.mbti[0];
  const myEl = FIVE_ELEMENTS[myGan];
  const yourEl = FIVE_ELEMENTS[yourGan];


  // 1. 생(Produces) 관계: A(Wood) -> B(Fire)
  // "내가 쟤를 챙겨주는 관계"
  if (PRODUCES[myEl] === yourEl) {
    // 나는 주는 입장이므로 호감이 '은근하게' 오름 (+5)
    baseScore += 5; 
  }
  // "쟤가 나를 챙겨주는 관계" (받는 입장)
  if (PRODUCES[yourEl] === myEl) {
    // 나는 받는 입장이므로 호감이 '크게' 오름 (+15) -> 사랑받는 느낌!
    baseScore += 15; 
  }

  // 2. 극(Controls) 관계: A(Wood) -> B(Earth)
  // "내가 쟤를 이기는/통제하는 관계"
  if (CONTROLS[myEl] === yourEl) {
    // 나는 상대를 '내 것'으로 여기거나 만만하게 봐서 호감 (+10)
    baseScore += 10;
  }
  // "쟤가 나를 이기는/통제하는 관계"
  if (CONTROLS[yourEl] === myEl) {
    // 나는 쟤가 어렵거나 부담스러움 (-10)
    // 단, 이성 관계라면 '카리스마'로 느껴서 좋아할 수도 있음
    if (fromChar.gender !== toChar.gender) {
        baseScore += 5; // 이성이면 매력
    } else {
        baseScore -= 10; // 동성이면 기싸움 패배/불편함 -> 비대칭 발생!
    }
  }

  // 3. 같은 오행 (비견/겁재)
  if (myEl === yourEl) {
     baseScore += 5;
  }

  return baseScore;
}

function getRelationshipLabel(score, specialStatus) {
  if (specialStatus === 'married') return "💍 결혼";
  if (specialStatus === 'lover') return "💖 연인";
  if (specialStatus === 'coldwar') return "🔥 냉전중";
  if (score <= -80) return "원수";
  if (score <= -60) return "혐오";
  if (score <= -40) return "적대";
  if (score <= -20) return "불편";
  if (score < 0) return "서먹";
  if (score === 0) return "얼굴만 아는 사람";
  if (score < 10) return "아는 사람";
  if (score < 20) return "지인";
  if (score < 40) return "친구";
  if (score < 60) return "절친";
  if (score < 80) return "신뢰";
  return "소울메이트";
}

function getHeartHTML(score, specialStatus) {
  if (specialStatus === 'married') {
    return `<i class="fa-solid fa-ring heart-lover"></i>` + `<i class="fa-solid fa-heart heart-lover"></i>`.repeat(4);
  }
  if (specialStatus === 'lover') {
    return `<i class="fa-solid fa-heart heart-lover"></i>`.repeat(5);
  }
  if (specialStatus === 'coldwar') {
    return `<i class="fa-solid fa-fire text-orange-500"></i>` + `<i class="fa-solid fa-heart-crack heart-broken"></i>`.repeat(2);
  }
  if (score === 0) return `<i class="fa-regular fa-heart heart-empty"></i>`;

  let html = '';
  if (score > 0) {
    const cap = (score > 100) ? 200 : 100;
    const maxHearts = (cap === 200) ? 10 : 5;
    const unit = cap / maxHearts;
    const count = Math.floor(score / unit);
    const remainder = score % unit;

    for (let i = 0; i < Math.min(count, maxHearts); i++) html += `<i class="fa-solid fa-heart heart-full"></i>`;
    if (count < maxHearts && remainder > unit * 0.5) html += `<i class="fa-solid fa-heart heart-light"></i>`;
  } else {
    const count = Math.floor(Math.abs(score) / 20);
    for (let i = 0; i < count; i++) html += `<i class="fa-solid fa-heart-crack heart-broken"></i>`;
    if (count === 0) html += `<i class="fa-solid fa-heart-crack text-slate-300"></i>`;
  }
  return html || `<i class="fa-regular fa-heart heart-empty"></i>`;
}

function getMoodMeta(moodId) {
  return MOODS.find(m => m.id === moodId) || MOODS.find(m => m.id === 'normal');
}

function setMood(char, moodId) {
  if (!char) return;
  char.mood = moodId;
}

function getSpecialStatusBetween(a, b) {
  const s1 = a?.specialRelations?.[b?.id];
  const s2 = b?.specialRelations?.[a?.id];
  if (s1 === 'married' || s2 === 'married') return 'married';
  if (s1 === 'lover' || s2 === 'lover') return 'lover';
  if (s1 === 'coldwar' || s2 === 'coldwar') return 'coldwar';
  if (s1 === 'cut' || s2 === 'cut') return 'cut';
  return null;
}

function updateMoodForCharacter(char) {
  if (!char) return;
  if (char.mood === 'sick') return;

  const act = (char.currentAction || '');
  const relValues = Object.values(char.relationships || {});
  const minRel = relValues.length ? Math.min(...relValues) : 0;
  const maxRel = relValues.length ? Math.max(...relValues) : 0;

  const hasLover = Object.values(char.specialRelations || {}).includes('lover');
  const hasMarried = Object.values(char.specialRelations || {}).includes('married');
  const hasColdwar = Object.values(char.specialRelations || {}).includes('coldwar');

  if (act.includes('업무') || act.includes('야근') || act.includes('공부')) {
    setMood(char, 'busy');
    return;
  }
  if (hasColdwar) {
    setMood(char, 'cold');
    return;
  }
  if (hasMarried || hasLover || maxRel >= 80) {
    setMood(char, 'happy');
    return;
  }
  if (minRel <= -20) {
    setMood(char, 'sad');
    return;
  }
  setMood(char, 'normal');
}

function updateAllMoods() {
  characters.forEach(c => updateMoodForCharacter(c));
}

function updateRelationship(charId1, charId2, amount) {
  const char1 = characters.find(c => c.id === charId1);
  const char2 = characters.find(c => c.id === charId2);
  if (!char1) return;

  if (char1.relationships[charId2] == null) char1.relationships[charId2] = 0;
  char1.relationships[charId2] += amount;

  const special = getSpecialStatusBetween(char1, char2);
  const isBonded = (special === 'lover' || special === 'married');
  const maxVal = isBonded ? 200 : 100;

  if (char1.relationships[charId2] > maxVal) char1.relationships[charId2] = maxVal;
  if (char1.relationships[charId2] < -100) char1.relationships[charId2] = -100;

  updateMoodForCharacter(char1);
}

function setColdwarMeta(a, b, durationDays) {
  if (!a || !b) return;
  if (!a.coldwarMeta) a.coldwarMeta = {};
  if (!b.coldwarMeta) b.coldwarMeta = {};
  a.coldwarMeta[b.id] = { sinceDay: day, duration: durationDays };
  b.coldwarMeta[a.id] = { sinceDay: day, duration: durationDays };
}

function clearColdwarMeta(a, b) {
  if (!a || !b) return;
  if (a.coldwarMeta) delete a.coldwarMeta[b.id];
  if (b.coldwarMeta) delete b.coldwarMeta[a.id];
}

function getColdwarRemainingDays(a, b) {
  if (!a || !b) return -1;
  const meta = a.coldwarMeta?.[b.id];
  if (!meta) return -1;
  const elapsed = day - meta.sinceDay;
  return meta.duration - elapsed;
}

function canReconcileColdwar(a, b) {
  return getColdwarRemainingDays(a, b) >= 0;
}

function setSpecialStatus(charId1, charId2, status) {
  const char1 = characters.find(c => c.id === charId1);
  if (!char1) return;
  if (!char1.specialRelations) char1.specialRelations = {};
  if (status === null) delete char1.specialRelations[charId2];
  else char1.specialRelations[charId2] = status;
  updateMoodForCharacter(char1);
}

function clearColdwarPair(a, b) {
  if (!a || !b) return;
  if (a.specialRelations?.[b.id] === 'coldwar') setSpecialStatus(a.id, b.id, null);
  if (b.specialRelations?.[a.id] === 'coldwar') setSpecialStatus(b.id, a.id, null);
  clearColdwarMeta(a, b);
}

function markColdwarPair(a, b) {
  if (!a || !b) return;
  const special = getSpecialStatusBetween(a, b);
  if (special === 'married' || special === 'lover') return;
  setSpecialStatus(a.id, b.id, 'coldwar');
  setSpecialStatus(b.id, a.id, 'coldwar');
  setMood(a, 'cold');
  setMood(b, 'cold');
}

function getCurrentLoverId(char) {
  const entry = Object.entries(char.specialRelations || {}).find(([_, status]) => status === 'lover');
  return entry ? entry[0] : null;
}

function breakUpPair(charA, charB, reasonText, dailyLogs) {
  if (!charA || !charB) return;

  setSpecialStatus(charA.id, charB.id, null);
  setSpecialStatus(charB.id, charA.id, null);

  clearColdwarPair(charA, charB);

  updateRelationship(charA.id, charB.id, -40);
  updateRelationship(charB.id, charA.id, -40);

  if (reasonText === '절교') {
    if (!charA.cutMeta) charA.cutMeta = {};
    if (!charB.cutMeta) charB.cutMeta = {};
    charA.cutMeta[charB.id] = { sinceDay: day, cooldown: 7 };
    charB.cutMeta[charA.id] = { sinceDay: day, cooldown: 7 };

    setSpecialStatus(charA.id, charB.id, 'cut');
    setSpecialStatus(charB.id, charA.id, 'cut');
  }

  charA.currentAction = reasonText;
  charB.currentAction = reasonText;

  dailyLogs.push({
    text: `[${reasonText}] ${charA.name}${getJosa(charA.name,'와/과')} ${charB.name}${getJosa(charB.name,'은/는')} 관계를 정리했다.`,
    type: 'breakup'
  });
}

function getProbabilisticChange(score) {
  let change = score * 0.15; 
  change += (Math.random() * 20) - 10;
  return Math.round(change);
}

function nextDay() {
  if (characters.length === 0) {
    alert("최소 1명의 캐릭터가 필요합니다.");
    return;
  }
  
  day++;
  const dailyLogs = [];
  processColdwarTimers(dailyLogs);
  processCutTimers(dailyLogs); 

  characters.forEach(c => {
    c.isNursing = false;
    c.hasNurse = false;

    if (Math.random() < 0.01) {
      setMood(c, 'sick');
      c.currentAction = '아픔';
      c.currentLocation = 'apt';
      dailyLogs.push({ text: `[컨디션] ${c.name}${getJosa(c.name,'은/는')} 몸이 좋지 않아 하루 종일 쉬었다.`, type: 'event' });
    } else if (c.mood === 'sick') {
      setMood(c, 'normal');
    }
  });

  // 2. [신규] 간호 이벤트 실행! 🚑
  processNursingEvents(dailyLogs);

  // 3. 장소 정하기
  characters.forEach(char => {
    // 간호 중이거나(간호사), 간호 받는 사람(환자)은 장소 이동 금지 (아파트 고정)
    if (char.isNursing || char.hasNurse) {
      char.currentLocation = 'apt';
      return;
    }  
    if (char.mood === 'sick') {
      char.currentLocation = 'apt';
      return;
    }
    const chanceToGoOut = 0.5;
    if (Math.random() < chanceToGoOut) {
      const places = PLACES.filter(p => p.type === 'out');
      char.currentLocation = getRandom(places).id;
    } else {
      char.currentLocation = 'apt';
    }
  });

  const locationMap = {};
  characters.forEach(char => {
    if (char.isNursing || char.hasNurse) return;

    if (!locationMap[char.currentLocation]) locationMap[char.currentLocation] = [];
    locationMap[char.currentLocation].push(char);
  });

  for (const locId in locationMap) {
    const people = locationMap[locId];
    people.sort(() => Math.random() - 0.5);

    while (people.length > 0) {
      let groupSize = 1;
      const rand = Math.random();
      if (people.length >= 4 && rand < 0.1) groupSize = 4;
      else if (people.length >= 3 && rand < 0.25) groupSize = 3;
      else if (people.length >= 2 && rand < 0.7) groupSize = 2;

      const potentialGroup = [];
      for (let i = 0; i < groupSize; i++) {
        if (people.length > 0) potentialGroup.push(people.pop());
      }

      if (potentialGroup.length > 1) {
        let lowestRel = 100;
        for (let i = 0; i < potentialGroup.length; i++) {
          for (let j = i + 1; j < potentialGroup.length; j++) {
            const rel = potentialGroup[i].relationships[potentialGroup[j].id] || 0;
            if (rel < lowestRel) lowestRel = rel;
          }
        }

        let avoidChance = 0;
        if (lowestRel < -50) avoidChance = 0.8;
        else if (lowestRel < -20) avoidChance = 0.5;
        else if (lowestRel < 0) avoidChance = 0.2;
        let hasColdwarInGroup = false;
        for (let i = 0; i < potentialGroup.length; i++) {
          for (let j = i + 1; j < potentialGroup.length; j++) {
            const sp = getSpecialStatusBetween(potentialGroup[i], potentialGroup[j]);
            if (sp === 'coldwar') { hasColdwarInGroup = true; break; }
          }
          if (hasColdwarInGroup) break;
        }

        if (hasColdwarInGroup) avoidChance = Math.min(avoidChance, 0.15);
        
        if (Math.random() < avoidChance) {
          potentialGroup.forEach(char => {
            let uncomfortableTarget = null;
            let minVal = 0;
            potentialGroup.forEach(peer => {
              if (char.id === peer.id) return;
              const rel = char.relationships[peer.id] || 0;
              if (rel < minVal) { minVal = rel; uncomfortableTarget = peer; }
            });

            // 오행 행동 적용
            let actionPool = [];
            if (locId === 'apt') {
              const basicActions = ACTIONS.filter(a => a.place === 'apt');
              actionPool = [...basicActions];
              const myGan = char.mbti[0];
              const myElement = FIVE_ELEMENTS[myGan];
              if (ELEMENT_ACTIONS[myElement]) {
                 const specialActions = ELEMENT_ACTIONS[myElement].map(act => ({
                   id: 'special', name: act.name, place: 'apt', text: act.text
                 }));
                 actionPool = [...actionPool, ...specialActions, ...specialActions];
              }
            } else {
              actionPool = ACTIONS.filter(a => {
                const p = PLACES.find(p => p.id === locId);
                return p ? (a.place === locId || a.place === 'out') : false;
              });
              if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.place === 'out');
            }

            const action = getRandom(actionPool);
            const processedText = fillTemplate(getRandom(action.text));
            char.currentAction = action.name;

            let logText = "";
            if (uncomfortableTarget) {
              logText = `${char.name}${getJosa(char.name, '은/는')} ${uncomfortableTarget.name}${getJosa(uncomfortableTarget.name, '이/가')} 불편해 자리를 피했다. ${getLocationName(locId)}에서 홀로 ${processedText}.`;
            } else {
              logText = `${char.name}${getJosa(char.name, '은/는')} 어색한 분위기를 피해 ${getLocationName(locId)}에서 홀로 ${processedText}.`;
            }

            dailyLogs.push({ text: logText, type: 'solo' });
            updateMoodForCharacter(char);
          });
          continue;
        }
      }

      const group = potentialGroup;
      const actor = group[0];
      const groupId = Date.now() + Math.random();

      let isTravel = false;
      if (group.length >= 2) {
        let minRel = 100;
        for (let i = 0; i < group.length; i++) {
          for (let j = i + 1; j < group.length; j++) {
            const s = group[i].relationships[group[j].id] || 0;
            if (s < minRel) minRel = s;
          }
        }
        if (minRel >= 50 && Math.random() < 0.2) isTravel = true;
      }

      if (group.length > 1) group.forEach(m => m.interactionGroup = groupId);

      if (group.length === 1) {
        let actionPool = [];
        if (locId === 'apt') {
          const basicActions = ACTIONS.filter(a => a.place === 'apt');
          actionPool = [...basicActions];
          const myGan = actor.mbti[0];
          const myElement = FIVE_ELEMENTS[myGan];
          if (ELEMENT_ACTIONS[myElement]) {
             const specialActions = ELEMENT_ACTIONS[myElement].map(act => ({
               id: 'special', name: act.name, place: 'apt', text: act.text
             }));
             actionPool = [...actionPool, ...specialActions, ...specialActions];
          }
        } else {
          actionPool = ACTIONS.filter(a => {
            const p = PLACES.find(p => p.id === locId);
            return p ? (a.place === locId || a.place === 'out') : false;
          });
          if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.place === 'out');
        }

        const action = getRandom(actionPool);
        const processedText = fillTemplate(getRandom(action.text));

        actor.currentAction = action.name;
        dailyLogs.push({ text: `${actor.name}${getJosa(actor.name, '은/는')} ${getLocationName(locId)}에서 ${processedText}.`, type: 'solo' });
        updateMoodForCharacter(actor);
      }
      else if (group.length === 2) {
        const target = group[1];

        const scoreForActor = calculateDirectionalScore(actor, target);
        const scoreForTarget = calculateDirectionalScore(target, actor);
          
        const currentScore = actor.relationships[target.id] || 0;

        const specialBetween = getSpecialStatusBetween(actor, target);
        const isLovers = (specialBetween === 'lover');
        const isMarried = (specialBetween === 'married');
        const isColdwar = (specialBetween === 'coldwar');

        const actorScore = actor.relationships[target.id] || 0;
        const targetScore = target.relationships[actor.id] || 0;

        if (!isTravel && !isMarried && isLovers && actorScore >= 200 && targetScore >= 200 && Math.random() < 0.08) {
          setSpecialStatus(actor.id, target.id, 'married');
          setSpecialStatus(target.id, actor.id, 'married');
          clearColdwarPair(actor, target);
          actor.currentAction = "결혼";
          target.currentAction = "결혼";
          setMood(actor, 'happy');
          setMood(target, 'happy');
          dailyLogs.push({
            text: `[결혼] ${actor.name}${getJosa(actor.name,'와/과')} ${target.name}${getJosa(target.name,'은/는')} 결혼했다! 💍`,
            type: 'love'
          });
          continue;
        }

        const ganA = actor.mbti[0]; const jiA = actor.mbti[1];
        const ganB = target.mbti[0]; const jiB = target.mbti[1];
        const isDoubleChung = (CHUNG_PAIRS[ganA] === ganB && CHUNG_PAIRS[jiA] === jiB);
        const isWonjin = (WONJIN_PAIRS[jiA] === jiB);

        let eventProb = 0.25;
        if (isDoubleChung || isWonjin) eventProb = 0.65;

        if (Math.random() < eventProb && !isTravel) {
          let evt = getRandom(EVENTS);

          if (!isLovers && !isMarried) { 
              
              // 1. 호감도 80점 이상 (거의 확실): 40% 확률로 강제 고백 시도
              if (currentScore >= 80) {
                  if (Math.random() < 0.40) {
                      evt = EVENTS.find(e => e.type === 'confess');
                  }
              }
              // 2. 호감도 60점 이상 (썸): 15% 확률로 강제 고백 시도
              else if (currentScore >= 60) {
                  if (Math.random() < 0.15) {
                       evt = EVENTS.find(e => e.type === 'confess');
                  }
              }
          }  
          if (isColdwar && Math.random() < 0.9) {
            evt = EVENTS.find(e => e.type === 'reconcile') || evt;
            const actorHates = (actor.relationships[target.id] || 0) < 0;
            const targetHates = (target.relationships[actor.id] || 0) < 0;
            if (evt.type === 'reconcile' && !(isColdwar || actorHates || targetHates)) {
              const safePool = EVENTS.filter(e => ['friend','gift','club','secret'].includes(e.type));
              evt = safePool.length ? getRandom(safePool) : EVENTS.find(e => e.type === 'friend') || evt;
            }
          }

          const actorHasPartner = Object.values(actor.specialRelations || {}).some(v => v === 'lover' || v === 'married');
          const targetHasPartner = Object.values(target.specialRelations || {}).some(v => v === 'lover' || v === 'married');

          if (evt.type === 'blind' && (actorHasPartner || targetHasPartner)) evt = getRandom(EVENTS);
          if (evt.type === 'date' && !(isLovers || currentScore >= 60)) evt = getRandom(EVENTS);
          if (evt.type === 'secret' && currentScore < 20 && !isDoubleChung && !isWonjin) {
             evt = getRandom(EVENTS);
          }

          let logText = "";

          if (evt.type === 'reconcile') {
             const actorHates = (actor.relationships[target.id] || 0) < 0;
             const targetHates = (target.relationships[actor.id] || 0) < 0;
             if (actorHates || targetHates || isColdwar) {
               if (isColdwar) {
                 const meta = actor.coldwarMeta?.[target.id];
                 const duration = meta?.duration || 3;
                 const bigFight = duration >= 5;
                 const cutChanceLate = bigFight ? 0.25 : 0.15;

                 if (!canReconcileColdwar(actor, target)) {
                   if (Math.random() < cutChanceLate) {
                     breakUpPair(actor, target, '절교', dailyLogs);
                   } else {
                     updateRelationship(actor.id, target.id, 2);
                     updateRelationship(target.id, actor.id, 2);
                     logText = `[화해 실패] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 화해를 시도했지만 아직 풀리지 않았다.`;
                     actor.currentAction = evt.name; target.currentAction = evt.name;
                     dailyLogs.push({ text: logText, type: 'event' });
                   }
                 } else {
                   updateRelationship(actor.id, target.id, 15);
                   updateRelationship(target.id, actor.id, 15);
                   clearColdwarPair(actor, target);
                   logText = `[${evt.name}] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 서로 사과하고 화해했다.`;
                   actor.currentAction = evt.name; target.currentAction = evt.name;
                   setMood(actor, 'normal'); setMood(target, 'normal');
                   dailyLogs.push({ text: logText, type: 'event' });
                 }
               } else {
                 updateRelationship(actor.id, target.id, 15);
                 updateRelationship(target.id, actor.id, 15);
                 logText = `[${evt.name}] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 서로 사과하고 화해했다.`;
                 actor.currentAction = evt.name; target.currentAction = evt.name;
                 setMood(actor, 'normal'); setMood(target, 'normal');
                 dailyLogs.push({ text: logText, type: 'event' });
               }
             } else {
               updateRelationship(actor.id, target.id, 5);
               updateRelationship(target.id, actor.id, 5);
               logText = `${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 사이좋게 대화를 나눴다.`;
               actor.currentAction = "대화"; target.currentAction = "대화";
               dailyLogs.push({ text: logText, type: 'social' });
             }
          }
          else if (evt.type === 'confess') {
             if (isMarried) {
                updateRelationship(actor.id, target.id, 5); updateRelationship(target.id, actor.id, 5); clearColdwarPair(actor, target);
                logText = `[사랑] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 사랑을 다시 확인했다. 💍`;
                actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                setMood(actor, 'happy'); setMood(target, 'happy');
                dailyLogs.push({ text: logText, type: 'love' });
             } else if (isLovers) {
                updateRelationship(actor.id, target.id, 5); updateRelationship(target.id, actor.id, 5); clearColdwarPair(actor, target);
                logText = `[사랑] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 다시 사랑을 맹세했다.`;
                actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                setMood(actor, 'happy'); setMood(target, 'happy');
                dailyLogs.push({ text: logText, type: 'love' });
             } else if (currentScore > 50) {
                 const chemBonus = (chemistryScore - 3) * 0.05;
                 const successChance = 0.48 + (currentScore / 180) + chemBonus;
                 if (Math.random() < successChance) {
                     const oldLoverId = getCurrentLoverId(actor);
                     if (oldLoverId && oldLoverId !== target.id) {
                       const oldLover = characters.find(c => c.id === oldLoverId);
                       if (oldLover) breakUpPair(actor, oldLover, '갈아타기', dailyLogs);
                     }
                     const targetOldLoverId = getCurrentLoverId(target);
                     if (targetOldLoverId && targetOldLoverId !== actor.id) {
                       const old = characters.find(c => c.id === targetOldLoverId);
                       if (old) breakUpPair(target, old, '갈아타기', dailyLogs);
                     }
                     setSpecialStatus(actor.id, target.id, 'lover');
                     setSpecialStatus(target.id, actor.id, 'lover');
                     clearColdwarPair(actor, target);
                     updateRelationship(actor.id, target.id, 15);
                     updateRelationship(target.id, actor.id, 15);
                     setMood(actor, 'happy'); setMood(target, 'happy');
                     logText = `[고백 성공] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 고백했고, 연인이 되었다! 💖`;
                     actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                     dailyLogs.push({ text: logText, type: 'love' });
                 } else {
                     updateRelationship(actor.id, target.id, -5); updateRelationship(target.id, actor.id, -2);
                     if (Math.random() < 0.35) markColdwarPair(actor, target);
                     setMood(actor, 'sad');
                     logText = `[고백 실패] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 차였다...`;
                     actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                     dailyLogs.push({ text: logText, type: 'event' });
                 }
             } else {
                 logText = `[고백 포기] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 고백하려다 참았다.`;
                 actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                 dailyLogs.push({ text: logText, type: 'event' });
             }
          }
          else if (evt.type === 'breakup') {
              if (isMarried) {
                updateRelationship(actor.id, target.id, -2); updateRelationship(target.id, actor.id, -2);
                logText = `[위기] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 다퉜지만 결혼 관계는 유지했다. 💍`;
                actor.currentAction = evt.name; target.currentAction = evt.name;
                dailyLogs.push({ text: logText, type: 'breakup' });
              } else if (isLovers) {
                if (Math.random() < 0.3 - (currentScore / 200)) {
                  setSpecialStatus(actor.id, target.id, null); setSpecialStatus(target.id, actor.id, null);
                  updateRelationship(actor.id, target.id, -25); updateRelationship(target.id, actor.id, -25);
                  setMood(actor, 'sad'); setMood(target, 'sad');
                  logText = `[이별] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 헤어졌다. 💔`;
                } else {
                  updateRelationship(actor.id, target.id, 2);
                  logText = `[위기] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 다퉜지만 헤어지지 않았다.`;
                }
                actor.currentAction = evt.name; target.currentAction = evt.name;
                dailyLogs.push({ text: logText, type: 'breakup' });
              } else {
                updateRelationship(actor.id, target.id, -5);
                logText = `${actor.name}${getJosa(actor.name, '은/는')} ${target.name}${getJosa(target.name, '와/과')} 거리를 두기로 했다.`;
                actor.currentAction = evt.name; target.currentAction = evt.name;
                dailyLogs.push({ text: logText, type: 'event' });
              }
          }
          else {
            if (evt.type === 'cut' && isLovers) {
              breakUpPair(actor, target, '절교', dailyLogs);
            } else {
              let c1 = evt.change + Math.floor(Math.random() * 5);
              let c2 = evt.change + Math.floor(Math.random() * 5);
              const filled = fillTemplate(evt.text);

              updateRelationship(actor.id, target.id, c1);
              updateRelationship(target.id, actor.id, c2);

              if (evt.type === 'fight') {
                if (Math.random() < 0.7) {
                    const bigFight = Math.random() < 0.4;
                    markColdwarPair(actor, target);
                    setColdwarMeta(actor, target, bigFight ? 5 : 3);
                }
              } else if (evt.type === 'reconcile') {
                clearColdwarPair(actor, target);
              } else if (evt.type === 'secret' || evt.type === 'date' || evt.type === 'gift') {
                clearColdwarPair(actor, target);
                setMood(actor, 'happy'); setMood(target, 'happy');
              } else if (evt.type === 'cut') {
                setMood(actor, 'sad'); setMood(target, 'sad');
              }

              logText = `[${evt.name}] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}${filled}.`;
              actor.currentAction = evt.name; target.currentAction = evt.name;
              
              const t = (evt.type === 'secret') ? 'secret' : (evt.type === 'date') ? 'love' : 'event';
              dailyLogs.push({ text: logText, type: t });
            }
          }
        }
        else {
          let action = null;
          if (isTravel) {
            action = ACTIONS.find(a => a.id === 'travel');
            group.forEach(m => m.currentLocation = 'travel');
          } else {
            let actionPool = ACTIONS.filter(a => {
              if (locId === 'apt') return a.place === 'apt';
              const p = PLACES.find(p => p.id === locId);
              return p ? (a.place === locId || a.place === 'out') : false;
            });
            if (actionPool.length === 0) actionPool = ACTIONS.filter(a => a.place === 'out');
            if (locId === 'apt') actionPool = ACTIONS.filter(a => a.place === 'apt');
            action = getRandom(actionPool);
          }

          const processedText = fillTemplate(getRandom(action.text));
          const changeForActor = getProbabilisticChange(scoreForActor);
          const changeForTarget = getProbabilisticChange(scoreForTarget);

          const bonus = (isLovers || isMarried) ? 5 : 0;
          const coldPenalty = isColdwar ? -5 : 0;

          updateRelationship(actor.id, target.id, changeForActor + bonus + coldPenalty);
          updateRelationship(target.id, actor.id, changeForTarget + bonus + coldPenalty);

          actor.currentAction = action.name;
          target.currentAction = `함께 ${action.name}`;

          if (isLovers || isMarried) {
            clearColdwarPair(actor, target);
            setMood(actor, 'happy'); setMood(target, 'happy');
          }

          dailyLogs.push({
            text: `${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} ${isTravel ? '여행을 떠나' : getLocationName(locId) + '에서'} ${processedText}.`,
            type: isTravel ? 'event' : 'social'
          });
        }

        updateMoodForCharacter(actor);
        updateMoodForCharacter(target);
      }
      else {
        let action = null;
        if (isTravel) {
          action = ACTIONS.find(a => a.id === 'travel');
          group.forEach(m => m.currentLocation = 'travel');
        } else {
          let actionPool = ACTIONS.filter(a => ['eat','gathering','leisure','shop','travel'].includes(a.id));
          actionPool = actionPool.filter(a => {
            if (locId === 'apt') return a.place === 'apt';
            const p = PLACES.find(p => p.id === locId);
            return p ? (a.place === locId || a.place === 'out') : false;
          });
          if (actionPool.length === 0) actionPool = [ACTIONS[0]];
          action = getRandom(actionPool);
        }

        const processedText = fillTemplate(getRandom(action.text));
        const names = group.map(m => m.name).join(', ');

        for (let i = 0; i < group.length; i++) {
          group[i].currentAction = isTravel ? action.name : `함께 ${action.name}`;
          for (let j = 0; j < group.length; j++) {
            if (i === j) continue;
            const chem = calculateChemistry(group[i], group[j]);
            updateRelationship(group[i].id, group[j].id, getProbabilisticChange(chem));
          }
          updateMoodForCharacter(group[i]);
        }

        dailyLogs.push({
          text: `${names}${getJosa(group[group.length - 1].name, '은/는')} ${isTravel ? '여행을 떠나' : getLocationName(locId) + '에서'} 함께 ${processedText}.`,
          type: isTravel ? 'event' : 'social'
        });
      }
    }
  }

  updateAllMoods();

  const logsWithDay = dailyLogs.map(log => ({ ...log, day: day }));
  logs = [...logsWithDay, ...logs];
  renderLogs(dailyLogs);
  renderStatusTable();
  renderLocations();
  updateUI();

  if (!document.getElementById('relationship-map-modal')?.classList.contains('hidden')) {
    requestAnimationFrame(() => drawRelationshipMap());
  }
}

function processCutTimers(dailyLogs) {
  const seen = new Set();
  characters.forEach(a => {
    Object.entries(a.cutMeta || {}).forEach(([bid, meta]) => {
      const b = characters.find(c => c.id === bid);
      if (!b) return;
      const key = [a.id, b.id].sort().join('|');
      if (seen.has(key)) return;
      seen.add(key);
      const elapsed = day - meta.sinceDay;
      if (elapsed < meta.cooldown) return;
      const reconnectChance = 0.10; 
      if (Math.random() < reconnectChance) {
        setSpecialStatus(a.id, b.id, null);
        setSpecialStatus(b.id, a.id, null);
        delete a.cutMeta[bid];
        delete b.cutMeta[a.id];
        a.relationships[b.id] = 0;
        b.relationships[a.id] = 0;
        dailyLogs.push({
          text: `[재연결] ${a.name}${getJosa(a.name,'와/과')} ${b.name}${getJosa(b.name,'은/는')} 다시 연락이 닿아 관계를 회복했다.`,
          type: 'event'
        });
      }
    });
  });
}

function processColdwarTimers(dailyLogs) {
  const seen = new Set();
  characters.forEach(a => {
    Object.entries(a.coldwarMeta || {}).forEach(([bid, meta]) => {
      const b = characters.find(c => c.id === bid);
      if (!b) return;
      const key = [a.id, b.id].sort().join('|');
      if (seen.has(key)) return;
      seen.add(key);
      const elapsed = day - meta.sinceDay;
      if (elapsed < meta.duration) return;
      const bigFight = meta.duration >= 5;
      const successChance = bigFight ? 0.55 : 0.70; 
      if (Math.random() < successChance) {
        clearColdwarPair(a, b);
        updateRelationship(a.id, b.id, 15);
        updateRelationship(b.id, a.id, 15);
        dailyLogs.push({ text: `[자동 화해] ${a.name}${getJosa(a.name,'와/과')} ${b.name}${getJosa(b.name,'은/는')} 시간이 지나 냉전이 풀렸다.`, type: 'event' });
      } else {
        breakUpPair(a, b, '절교', dailyLogs);
      }
    });
  });
}

function processNursingEvents(dailyLogs) {
  // 먼저 순서를 섞어서 공평하게 기회를 줌
  const sickChars = characters.filter(c => c.mood === 'sick').sort(() => Math.random() - 0.5);

  sickChars.forEach(patient => {
    if (patient.hasNurse) return;
    const candidates = characters.filter(c => 
      c.id !== patient.id && c.mood !== 'sick' && !c.isNursing && !c.hasNurse
    );

    let bestNurse = null;
    let maxScore = -999;

    candidates.forEach(nurse => {
      // 1. 점수 확인 (이전에 추가한 방향성 점수 함수가 있으면 사용, 없으면 기본 궁합)
      let score = 0;
      if (typeof calculateDirectionalScore === 'function') {
         score = calculateDirectionalScore(nurse, patient); // 간호사가 환자를 얼마나 아끼는지
      } else {
         score = calculateChemistry(nurse, patient);
      }

      // 2. 관계 상태 확인 (냉전/절교 중이면 절대 안 옴)
      const special = getSpecialStatusBetween(nurse, patient);
      if (special === 'coldwar' || special === 'cut') return;

      // 3. 점수 보정 (연인/부부면 1순위)
      let finalScore = score;
      if (special === 'lover') finalScore += 200;   // 연인은 무조건 달려옴
      if (special === 'married') finalScore += 300; // 부부는 0순위

      // 4. 최소 호감도 조건 (60점 이상: 절친급)
      if (finalScore >= 60) {
        // 가장 점수(애정도)가 높은 사람이 당첨
        if (finalScore > maxScore) {
          maxScore = finalScore;
          bestNurse = nurse;
        }
      }
    });

    // 후보가 있고, 80% 확률로 간호 이벤트 발생 (가끔은 바빠서 못 올 수도 있음)
    if (bestNurse && Math.random() < 0.8) {
      // 상태 설정 (중복 활동 방지)
      bestNurse.isNursing = true;
      bestNurse.currentLocation = 'apt'; // 아파트로 소환
      bestNurse.currentAction = '간호';

      patient.hasNurse = true;
      patient.currentAction = '요양';

      // 로그 출력 (핑크색 하트 타입)
      dailyLogs.push({
        text: `[간호] ${bestNurse.name}${getJosa(bestNurse.name, '은/는')} 아픈 ${patient.name}의 소식을 듣고 한걸음에 달려와 간호했다. 💊`,
        type: 'love'
      });

      // 관계 점수 보너스 (아플 때 챙겨주면 감동 2배)
      updateRelationship(patient.id, bestNurse.id, 20); // 환자가 간호사에게 (+20)
      updateRelationship(bestNurse.id, patient.id, 5);  // 간호사도 뿌듯함 (+5)
    }
  });
}

function getLocationName(id) {
  const p = PLACES.find(x => x.id === id);
  return p ? p.name : id;
}

function addCharacter() {
  if (characters.length >= 30) return alert("최대 30명까지만 가능합니다.");
  const nameInput = document.getElementById('input-name');
  const ganInput = document.getElementById('input-gan');
  const jiInput = document.getElementById('input-ji');
  const roomInput = document.getElementById('input-room');
  const genderInput = document.getElementById('input-gender');

  if (!nameInput || !ganInput || !jiInput || !roomInput || !genderInput) return alert("입력 폼을 찾을 수 없습니다.");

  const name = nameInput.value.trim();
  if (!name) return alert("이름을 입력해주세요.");
  if (characters.some(c => c.name === name)) return alert("이미 존재하는 이름입니다.");

  let room = roomInput.value;
  if (room === 'auto') {
    room = findEmptyRoom();
    if (!room) return alert("빈 방이 없습니다.");
  } else if (getRoomCount(room) >= 4) return alert("해당 방은 정원 초과입니다.");

  const ilju = ganInput.value + jiInput.value;
  const gender = genderInput.value;

  characters.push({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    name,
    mbti: ilju,
    gender: gender,
    room,
    currentLocation: 'apt',
    currentAction: '-',
    relationships: {},
    specialRelations: {},
    mood: 'normal'
  });

  nameInput.value = '';
  renderCharacterList();
  renderLocations();
  updateUI();
}

function removeCharacter(id) {
  if (!confirm("삭제하시겠습니까?")) return;
  characters = characters.filter(c => c.id !== id);
  characters.forEach(c => {
    delete c.relationships[id];
    if (c.specialRelations) delete c.specialRelations[id];
  });
  renderCharacterList();
  renderLocations();
  updateUI();
}

function findEmptyRoom() {
  const counts = {};
  for (let f = 1; f <= 5; f++) {
    for (let r = 1; r <= 6; r++) {
      counts[`${f}0${r}`] = 0;
    }
  }
  characters.forEach(c => { 
    if (counts[c.room] !== undefined) counts[c.room]++; 
  });
  const availableRooms = Object.keys(counts).filter(room => counts[room] < 4);
  if (availableRooms.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableRooms.length);
  return availableRooms[randomIndex];
}

function getRoomCount(roomNum) {
  return characters.filter(c => c.room === roomNum).length;
}

function initSajuSelect() {
  const ganSelect = document.getElementById('input-gan');
  const jiSelect = document.getElementById('input-ji');
  if (!ganSelect || !jiSelect) return;
  ganSelect.innerHTML = '';
  GAN_ORDER.forEach(gan => {
    const opt = document.createElement('option');
    opt.value = gan;
    opt.text = gan;
    ganSelect.appendChild(opt);
  });
  ganSelect.addEventListener('change', () => {
    updateJiOptions(ganSelect.value, jiSelect);
  });
  updateJiOptions(ganSelect.value, jiSelect);
}

function updateJiOptions(selectedGan, jiSelect) {
  jiSelect.innerHTML = ''; 
  let validBranches = [];
  if (SAJU_DATA.yang.stems.includes(selectedGan)) {
    validBranches = SAJU_DATA.yang.branches;
  } else if (SAJU_DATA.yin.stems.includes(selectedGan)) {
    validBranches = SAJU_DATA.yin.branches;
  }
  validBranches.forEach(ji => {
    const opt = document.createElement('option');
    opt.value = ji;
    opt.text = ji;
    jiSelect.appendChild(opt);
  });
}

function initRoomSelect() {
  const sel = document.getElementById('input-room');
  if (!sel) return;
  const existing = Array.from(sel.options).map(o => o.value);
  for (let f = 1; f <= 5; f++) for (let r = 1; r <= 6; r++) {
    const v = `${f}0${r}`;
    if (existing.includes(v)) continue;
    const opt = document.createElement('option');
    opt.value = v;
    opt.text = `${v}호`;
    sel.appendChild(opt);
  }
}

function renderCharacterList() {
  const container = document.getElementById('character-list');
  const emptyState = document.getElementById('empty-state');
  if (!container || !emptyState) return;
  container.innerHTML = '';
  if (characters.length === 0) {
    container.classList.add('hidden');
    emptyState.classList.remove('hidden');
    const total = document.getElementById('total-count');
    if (total) total.textContent = '0';
    return;
  }
  container.classList.remove('hidden');
  emptyState.classList.add('hidden');

  characters.forEach(char => {
    const div = document.createElement('div');
    div.className = "bg-white dark:bg-slate-700 p-4 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm relative group hover:shadow-md transition-shadow cursor-pointer";
    const moodMeta = getMoodMeta(char.mood || 'normal');
    if (affectionMode) {
      div.onclick = () => showAffectionModal(char.id);
      div.innerHTML = `
        <div class="flex justify-between items-start mb-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full ${moodMeta.dotClass}" title="${moodMeta.name}"></span>
            <h3 class="font-bold text-lg dark:text-white truncate">${char.name}</h3>
            <span class="text-xs ${moodMeta.textClass} whitespace-nowrap">${moodMeta.name}</span>
          </div>
          <span class="text-xs bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 px-2 py-1 rounded-full">${char.mbti}</span>
        </div>
        <div class="text-sm text-slate-500 dark:text-slate-400 mb-2"><i class="fa-solid fa-door-closed mr-1"></i> ${char.room}호</div>
        <div class="text-center mt-2 p-2 bg-brand-50 dark:bg-slate-800 rounded-lg text-brand-600 dark:text-brand-400 text-sm font-medium">클릭하여 관계 보기</div>
      `;
    } else {
      div.innerHTML = `
        <button onclick="removeCharacter('${char.id}')" class="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"><i class="fa-solid fa-times"></i></button>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center text-lg"><i class="fa-regular fa-user"></i></div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-2.5 h-2.5 rounded-full ${moodMeta.dotClass}" title="${moodMeta.name}"></span>
              <h3 class="font-bold text-slate-900 dark:text-white leading-tight truncate">${char.name}</h3>
              <span class="text-xs ${moodMeta.textClass} whitespace-nowrap">${moodMeta.name}</span>
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400">${char.mbti} · ${char.room}호</div>
          </div>
        </div>
      `;
    }
    container.appendChild(div);
  });
  const total = document.getElementById('total-count');
  if (total) total.textContent = characters.length;
}

function renderLocations() {
  const aptGrid = document.getElementById('apartment-grid');
  if (!aptGrid) return;
  aptGrid.innerHTML = '';
  const renderedIds = new Set();
  const getGroupMembers = (char) => {
    if (!char.interactionGroup) return [char];
    return characters.filter(c => c.interactionGroup === char.interactionGroup && c.currentLocation === char.currentLocation);
  };
  for (let f = 5; f >= 1; f--) {
    for (let r = 1; r <= 6; r++) {
      const roomNum = `${f}0${r}`;
      const occupants = characters.filter(c => c.room === roomNum && c.currentLocation === 'apt');
      const cell = document.createElement('div');
      cell.className = "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-2 min-h-[80px] flex flex-col relative";
      cell.innerHTML = `<div class="text-xs font-mono text-slate-400 mb-1 absolute top-1 right-2">${roomNum}</div>`;
      const occDiv = document.createElement('div');
      occDiv.className = "flex flex-wrap gap-1 mt-4";
      occupants.forEach(occ => {
        if (renderedIds.has(occ.id)) return;
        const groupMembers = getGroupMembers(occ);
        const allInApt = groupMembers.every(m => m.currentLocation === 'apt');
        if (groupMembers.length > 1 && allInApt) {
          const groupSpan = document.createElement('span');
          groupSpan.className = "inline-flex items-center gap-0.5 bg-white dark:bg-slate-600 border border-brand-200 dark:border-slate-500 rounded px-1 shadow-sm max-w-full flex-wrap";
          let html = ``;
          groupMembers.forEach((m, idx) => {
            html += `<span class="text-[10px] text-brand-700 dark:text-brand-300 font-bold whitespace-nowrap">${m.name}</span>`;
            if (idx < groupMembers.length - 1) html += `<i class="fa-solid fa-link text-[8px] text-slate-400 mx-0.5"></i>`;
            renderedIds.add(m.id);
          });
          groupSpan.innerHTML = html;
          occDiv.appendChild(groupSpan);
        } else {
          const badge = document.createElement('span');
          badge.className = "text-[10px] bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full";
          badge.textContent = occ.name;
          occDiv.appendChild(badge);
          renderedIds.add(occ.id);
        }
      });
      cell.appendChild(occDiv);
      aptGrid.appendChild(cell);
    }
  }
  const extList = document.getElementById('external-places-list');
  if (!extList) return;
  extList.innerHTML = '';
  const placesToRender = PLACES.filter(p => p.type === 'out' || p.type === 'travel');
  const getGroupMembersExt = (char) => {
    if (!char.interactionGroup) return [char];
    return characters.filter(c => c.interactionGroup === char.interactionGroup && c.currentLocation === char.currentLocation);
  };
  placesToRender.forEach(place => {
    const occupants = characters.filter(c => c.currentLocation === place.id);
    const row = document.createElement('div');
    row.className = `p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600 flex items-start gap-3 ${place.id === 'travel' ? 'border-l-4 border-l-purple-400' : ''}`;
    let icon = 'fa-building';
    if (place.id === 'mart') icon = 'fa-cart-shopping';
    if (place.id === 'cafe') icon = 'fa-mug-hot';
    if (place.id === 'school') icon = 'fa-graduation-cap';
    if (place.id === 'restaurant') icon = 'fa-utensils';
    if (place.id === 'travel') icon = 'fa-plane-departure text-purple-500';
    let html = `
      <div class="w-10 h-10 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center text-slate-400 shadow-sm flex-none">
        <i class="fa-solid ${icon}"></i>
      </div>
      <div class="flex-1">
        <div class="font-medium text-sm mb-1">${place.name}</div>
        <div class="flex flex-wrap gap-1">
    `;
    if (occupants.length === 0) {
      html += `<span class="text-xs text-slate-400">-</span>`;
    } else {
      const extRenderedIds = new Set();
      occupants.forEach(occ => {
        if (extRenderedIds.has(occ.id)) return;
        const groupMembers = getGroupMembersExt(occ);
        if (groupMembers.length > 1) {
          html += `<span class="inline-flex items-center gap-0.5 bg-white dark:bg-slate-600 border border-yellow-300 dark:border-yellow-700 rounded px-1 shadow-sm flex-wrap">`;
          groupMembers.forEach((m, idx) => {
            html += `<span class="text-[10px] text-yellow-800 dark:text-yellow-200 font-bold whitespace-nowrap">${m.name}</span>`;
            if (idx < groupMembers.length - 1) html += `<i class="fa-solid fa-link text-[8px] text-slate-400 mx-0.5"></i>`;
            extRenderedIds.add(m.id);
          });
          html += `</span>`;
        } else {
          html += `<span class="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">${occ.name}</span>`;
          extRenderedIds.add(occ.id);
        }
      });
    }
    html += `</div></div>`;
    row.innerHTML = html;
    extList.appendChild(row);
  });
}

function renderStatusTable() {
  const tbody = document.getElementById('status-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  characters.forEach(char => {
    const tr = document.createElement('tr');
    const locName = getLocationName(char.currentLocation);
    const moodName = getMoodMeta(char.mood || 'normal').name;
    tr.innerHTML = `
      <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">${char.name}</td>
      <td class="px-4 py-3 text-slate-500 dark:text-slate-400">${locName}</td>
      <td class="px-4 py-3 text-slate-500 dark:text-slate-400">${char.currentAction || '-'}</td>
      <td class="px-4 py-3 text-slate-500 dark:text-slate-400">${moodName}</td>
    `;
    tbody.appendChild(tr);
  });
  const badge = document.getElementById('day-badge');
  if (badge) badge.textContent = `${day}일차`;
}

function renderLogs(newLogs) {
  const container = document.getElementById('log-container');
  if (!container) return;
  if (container.querySelector('.italic')) container.innerHTML = '';
  const dayDiv = document.createElement('div');
  dayDiv.className = "mb-6 animate-[fadeIn_0.5s_ease-out]";
  dayDiv.innerHTML = `<div class="flex items-center gap-2 mb-3"><div class="h-px bg-slate-300 dark:bg-slate-600 flex-1"></div><span class="text-xs font-bold text-slate-400 uppercase tracking-wider">${day}일차</span><div class="h-px bg-slate-300 dark:bg-slate-600 flex-1"></div></div>`;
  newLogs.forEach(log => {
    const p = document.createElement('div');
    p.style.fontFamily = '"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic","Segoe UI",system-ui,sans-serif';
    p.style.wordBreak = 'keep-all';
    let styleClass = "text-slate-600 dark:text-slate-300 border-l-2 border-slate-300 pl-3 py-1";
    if (log.type === 'secret') {
      styleClass = "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 pl-3 py-2 rounded-r-lg font-medium";
    } else if (log.type === 'love') {
      styleClass = "text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/30 border-l-4 border-pink-500 pl-3 py-2 rounded-r-lg font-medium";
    } else if (log.type === 'breakup') {
      styleClass = "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 pl-3 py-2 rounded-r-lg font-medium";
    } else if (log.type === 'event') {
      styleClass = "text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 border-l-4 border-brand-500 pl-3 py-2 rounded-r-lg font-medium";
    } else if (log.type === 'social') {
      styleClass = "text-slate-700 dark:text-slate-200 border-l-2 border-yellow-400 pl-3 py-1 bg-yellow-50/50 dark:bg-transparent";
    } else if (log.type === 'solo') {
      styleClass = "text-slate-600 dark:text-slate-300 border-l-2 border-slate-200 pl-3 py-1";
    }
    p.className = `mb-2 text-sm ${styleClass}`;
    p.textContent = log.text;
    dayDiv.appendChild(p);
  });
  container.insertBefore(dayDiv, container.firstChild);
}

function clearLogs() {
  const el = document.getElementById('log-container');
  if (el) el.innerHTML = `<div class="text-center text-slate-400 italic py-10">로그가 초기화되었습니다.</div>`;
  logs = [];
}

function toggleExportMenu(event) {
  event?.stopPropagation?.();
  const menu = document.getElementById('export-menu');
  if (menu) menu.classList.toggle('hidden');
}

function closeMenus() {
  const menu = document.getElementById('export-menu');
  if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
}

function toggleAffectionMode() {
  affectionMode = !affectionMode;
  const btn = document.getElementById('btn-affection-mode');
  if (btn) {
    if (affectionMode) btn.className = "bg-brand-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-inner";
    else btn.className = "border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors";
  }
  renderCharacterList();
}

function showAffectionModal(charId) {
  const char = characters.find(c => c.id === charId);
  if (!char) return;
  const content = document.getElementById('modal-content');
  const nameEl = document.getElementById('modal-char-name');
  if (!content || !nameEl) return;
  nameEl.textContent = char.name;
  content.innerHTML = '';
  const list = document.createElement('div');
  list.className = "divide-y divide-slate-100 dark:divide-slate-700";
  const rels = Object.entries(char.relationships || {})
    .map(([id, score]) => {
      const other = characters.find(c => c.id === id);
      const specialStatus = getSpecialStatusBetween(char, other);
      return { id, score, name: other?.name, specialStatus };
    })
    .filter(x => x.name)
    .sort((a, b) => b.score - a.score);
  if (rels.length === 0) {
    content.innerHTML = '<div class="p-8 text-center text-slate-400">아직 관계가 형성되지 않았습니다.</div>';
  } else {
    rels.forEach(rel => {
      const row = document.createElement('div');
      row.className = "p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors";
      row.innerHTML = `
        <div class="flex items-center gap-3 min-w-0">
          <span class="font-medium dark:text-slate-200 truncate">${rel.name}</span>
          <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 whitespace-nowrap">
            ${getRelationshipLabel(rel.score, rel.specialStatus)}
          </span>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-sm gap-1 flex">${getHeartHTML(rel.score, rel.specialStatus)}</div>
          <span class="text-xs text-slate-400 font-mono mt-1">${rel.score}</span>
        </div>
      `;
      list.appendChild(row);
    });
    content.appendChild(list);
  }
  const modal = document.getElementById('affection-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('affection-modal');
  if (modal) modal.classList.add('hidden');
}

function exportData(includeRelationships) {
  if (characters.length === 0) return alert("저장할 데이터가 없습니다.");
  const exportDataArr = characters.map(c => {
    const base = { name: c.name, mbti: c.mbti, room: c.room, gender: c.gender };
    if (includeRelationships) {
      base.id = c.id;
      base.relationships = c.relationships;
      base.specialRelations = c.specialRelations;
      base.currentLocation = c.currentLocation;
      base.currentAction = c.currentAction;
      base.mood = c.mood || 'normal';
      base.coldwarMeta = c.coldwarMeta || {};
    }
    return base;
  });
  const payload = { version: 1.8, type: includeRelationships ? 'full' : 'basic', day: includeRelationships ? day : 1, data: exportDataArr };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `housing_simul_${includeRelationships ? 'full' : 'basic'}_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function importData(input) {
  const file = input?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      if (!json.data || !Array.isArray(json.data)) throw new Error("잘못된 파일 형식");
      if (confirm("현재 명단이 덮어씌워집니다. 진행하시겠습니까?")) {
        day = json.day || 1;
        characters = json.data.map(d => ({
          id: d.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
          name: d.name,
          mbti: d.mbti,
          gender: d.gender || 'male',
          room: d.room,
          currentLocation: d.currentLocation || 'apt',
          currentAction: d.currentAction || '-',
          relationships: d.relationships || {},
          specialRelations: d.specialRelations || {},
          coldwarMeta: d.coldwarMeta || {},
          mood: d.mood || 'normal'
        }));
        renderCharacterList();
        renderLocations();
        renderStatusTable();
        clearLogs();
        const total = document.getElementById('total-count');
        if (total) total.textContent = characters.length;
        alert("성공적으로 불러왔습니다.");
      }
    } catch (err) {
      alert("파일 불러오기 실패: " + err.message);
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function resetAll() {
  if (confirm("모든 데이터를 초기화하시겠습니까?")) {
    characters = [];
    day = 1;
    logs = [];
    renderCharacterList();
    renderLocations();
    renderStatusTable();
    clearLogs();
    const total = document.getElementById('total-count');
    if (total) total.textContent = 0;
    const modal = document.getElementById('relationship-map-modal');
    if (modal && !modal.classList.contains('hidden')) drawRelationshipMap();
  }
}

function switchTab(tabId) {
  const rv = document.getElementById('roster-view');
  const lv = document.getElementById('location-view');
  const ev = document.getElementById('execution-view');
  if (!rv || !lv || !ev) return;
  rv.classList.add('hidden');
  lv.classList.add('hidden');
  ev.classList.add('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-white', 'dark:bg-slate-600', 'shadow-sm', 'text-brand-600', 'dark:text-brand-300');
    btn.classList.add('text-slate-600', 'dark:text-slate-300');
  });
  const view = document.getElementById(`${tabId}-view`);
  if (view) view.classList.remove('hidden');
  const btn = document.getElementById(`btn-${tabId}`);
  if (btn) {
    btn.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-200');
    btn.classList.add('bg-white', 'dark:bg-slate-600', 'shadow-sm', 'text-brand-600', 'dark:text-brand-300');
  }
  if (tabId === 'execution') renderStatusTable();
  if (tabId === 'location') renderLocations();
}

function updateUI() {
  renderCharacterList();
  renderStatusTable();
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  if (!document.getElementById('relationship-map-modal')?.classList.contains('hidden')) {
    requestAnimationFrame(() => drawRelationshipMap());
  }
}

function ensureCanvasFontReady() {
  const fontName = 'Noto Sans KR';
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  return Promise.allSettled([
    document.fonts.load(`12px "${fontName}"`),
    document.fonts.load(`14px "${fontName}"`),
    document.fonts.ready
  ]).then(() => undefined).catch(() => undefined);
}

function resizeCanvasToDisplaySize(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const cssWidth = Math.max(1, Math.floor(rect.width));
  const cssHeight = Math.max(1, Math.floor(rect.height));
  const displayWidth = Math.floor(cssWidth * dpr);
  const displayHeight = Math.floor(cssHeight * dpr);
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: cssWidth, h: cssHeight };
}

function openRelationshipMap() {
  const modal = document.getElementById('relationship-map-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  ensureCanvasFontReady().then(() => {
    requestAnimationFrame(() => drawRelationshipMap());
  });
  window.addEventListener('resize', drawRelationshipMap);
}

function closeRelationshipMap() {
  const modal = document.getElementById('relationship-map-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  window.removeEventListener('resize', drawRelationshipMap);
}

function drawRelationshipMap() {
  const canvas = document.getElementById('relationship-canvas');
  if (!canvas) return;
  const { ctx, w, h } = resizeCanvasToDisplaySize(canvas);
  ctx.clearRect(0, 0, w, h);
  if (characters.length === 0) {
    ctx.font = `14px ${CANVAS_FONT_FAMILY}`;
    ctx.fillStyle = isDarkMode ? "#94a3b8" : "#64748b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("표시할 캐릭터가 없습니다.", w / 2, h / 2);
    return;
  }
  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(centerX, centerY) * 0.78;
  const angleStep = (2 * Math.PI) / characters.length;
  const nodes = characters.map((char, index) => {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      char: char
    };
  });
  nodes.forEach(source => {
    nodes.forEach(target => {
      if (source === target) return;
      const relScore = source.char.relationships[target.char.id] || 0;
      const special = getSpecialStatusBetween(source.char, target.char);
      if (relScore === 0 && !special) return;
      let color = isDarkMode ? "#475569" : "#cbd5e1";
      let widthLine = 1;
      if (special === 'married') { color = "#ec4899"; widthLine = 3; }
      else if (special === 'lover') { color = "#db2777"; widthLine = 2; }
      else if (special === 'coldwar') { color = "#f97316"; widthLine = 2; }
      else if (relScore >= 60) color = "#2563eb";
      else if (relScore >= 20) color = "#16a34a";
      else if (relScore <= -60) color = "#dc2626";
      else if (relScore <= -20) color = "#ea580c";
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = widthLine;
      ctx.moveTo(source.x, source.y);
      ctx.quadraticCurveTo(centerX, centerY, target.x, target.y);
      ctx.stroke();
    });
  });
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = isDarkMode ? "#1e293b" : "#ffffff";
    ctx.fill();
    ctx.strokeStyle = isDarkMode ? "#475569" : "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = `bold 12px ${CANVAS_FONT_FAMILY}`;
    ctx.fillStyle = isDarkMode ? "#e2e8f0" : "#1e293b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const name = node.char.name || "";
    ctx.fillText(name, node.x, node.y);
  });
}

function saveLogsToTxt() {
  if (logs.length === 0) return alert("저장할 로그가 없습니다.");
  let content = "=== 아파트 시뮬레이터 활동 로그 ===\n";
  content += `저장 일시: ${new Date().toLocaleString()}\n\n`;
  const sortedLogs = [...logs].reverse();
  let currentDay = 0;
  sortedLogs.forEach((log) => {
    if (log.day && log.day !== currentDay) {
      currentDay = log.day;
      content += `\n[ ${currentDay}일차 ] ------------------------\n`;
    }
    
    content += `- ${log.text}\n`;
  });
  content += `\n(총 ${sortedLogs.length}개의 기록)`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `simulation_logs_day${day}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function saveRelationshipsToTxt() {
  if (characters.length === 0) return alert("캐릭터가 없습니다.");

  let content = `=== 입주민 호감도 현황 (Day ${day}) ===\n`;
  content += `작성일시: ${new Date().toLocaleString()}\n\n`;

  characters.forEach(char => {
    content += `========================================\n`;
    const genderStr = char.gender === 'male' ? '남' : char.gender === 'female' ? '여' : 'NB';
    content += `[${char.name}] (${char.mbti} / ${genderStr} / ${char.room}호)\n`;
    content += `----------------------------------------\n`;

    const relations = Object.entries(char.relationships || {})
      .map(([targetId, score]) => {
        const target = characters.find(c => c.id === targetId);
        if (!target) return null;
        const special = getSpecialStatusBetween(char, target);
        let statusIcon = "";
        if (special === 'married') statusIcon = " [💍결혼]";
        else if (special === 'lover') statusIcon = " [💖연인]";
        else if (special === 'coldwar') statusIcon = " [🔥냉전]";
        else if (special === 'cut') statusIcon = " [✂️절교]";
        const label = getRelationshipLabel(score, special); 
        return { name: target.name, score: score, statusIcon: statusIcon, label: label };
      })
      .filter(r => r !== null)
      .sort((a, b) => b.score - a.score);

    if (relations.length === 0) {
      content += "  (아직 교류한 이웃이 없습니다.)\n";
    } else {
      relations.forEach(r => {
        content += `  To ${r.name} : ${r.score}점 (${r.label})${r.statusIcon}\n`;
      });
    }
    content += "\n";
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `relationships_summary_day${day}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

}
