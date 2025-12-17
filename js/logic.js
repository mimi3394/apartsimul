import { 
  FIVE_ELEMENTS, CONTROLS, PRODUCES, HAP_PAIRS, CHUNG_PAIRS, WONJIN_PAIRS, TEMPERATURE, GAPJA_PERSONALITIES 
} from './data.js';

export function calculateChemistry(charA, charB) {
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

export function calculateDirectionalScore(fromChar, toChar) {
  let baseScore = calculateChemistry(fromChar, toChar);
  const myGan = fromChar.mbti[0];
  const yourGan = toChar.mbti[0];
  const myEl = FIVE_ELEMENTS[myGan];
  const yourEl = FIVE_ELEMENTS[yourGan];

  if (PRODUCES[myEl] === yourEl) baseScore += 5; 
  if (PRODUCES[yourEl] === myEl) baseScore += 15; 
  if (CONTROLS[myEl] === yourEl) baseScore += 10;
  if (CONTROLS[yourEl] === myEl) {
    if (fromChar.gender !== toChar.gender) baseScore += 5; 
    else baseScore -= 10; 
  }
  if (myEl === yourEl) baseScore += 5;
  return baseScore;
}

export function willAttendEvent(char) {
  const trait = GAPJA_PERSONALITIES[char.mbti];
  if (!trait) return true;
  const chance = trait.social;
  return Math.random() * 100 < chance;
}

export function calculateFirstImpression(observer, newcomer) {
  const trait = GAPJA_PERSONALITIES[observer.mbti] || { kindness: 0 };
  
  let baseRandom = (Math.random() * 4) - 2;
  let personalityBonus = trait.kindness * 0.1;
  let chemistry = calculateChemistry(observer, newcomer);
  let chemBonus = chemistry * 0.02;

  let finalScore = baseRandom + personalityBonus + chemBonus;
  return Math.max(-3, Math.min(3, Math.round(finalScore)));
}

export function getRelationshipLabel(score, specialStatus) {
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


