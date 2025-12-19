import { gameState } from './state.js';
import { 
  ACTIONS, ELEMENT_ACTIONS, PLACES, EVENTS, 
  FIVE_ELEMENTS, CHUNG_PAIRS, WONJIN_PAIRS, MOODS, GAPJA_PERSONALITIES 
} from './data.js';
import { getRandom, getJosa, fillTemplate} from './utils.js';
import { calculateChemistry, calculateDirectionalScore, calculateFirstImpression, willAttendEvent } from './logic.js';
import { renderLogs, renderStatusTable, renderLocations, updateUI, drawRelationshipMap } from './ui.js';


function getLocationName(id) {
    const p = PLACES.find(x => x.id === id);
    return p ? p.name : id;
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
  gameState.characters.forEach(c => updateMoodForCharacter(c));
}

export function updateRelationship(charId1, charId2, amount) {
  const char1 = gameState.characters.find(c => c.id === charId1);
  const char2 = gameState.characters.find(c => c.id === charId2);
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
  a.coldwarMeta[b.id] = { sinceDay: gameState.day, duration: durationDays };
  b.coldwarMeta[a.id] = { sinceDay: gameState.day, duration: durationDays };
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
  const elapsed = gameState.day - meta.sinceDay;
  return meta.duration - elapsed;
}

function canReconcileColdwar(a, b) {
  return getColdwarRemainingDays(a, b) >= 0;
}

function setSpecialStatus(charId1, charId2, status) {
  const char1 = gameState.characters.find(c => c.id === charId1);
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

export function breakUpPair(charA, charB, reasonText, dailyLogs) {
  if (!charA || !charB) return;

  setSpecialStatus(charA.id, charB.id, null);
  setSpecialStatus(charB.id, charA.id, null);
  clearColdwarPair(charA, charB);

  let penalty = -60;
  if (reasonText === '환승이별' || reasonText === '갈아타기') {
      penalty = -120;
  }

  updateRelationship(charA.id, charB.id, penalty);
  updateRelationship(charB.id, charA.id, penalty);

  if (reasonText === '절교' || reasonText === '환승이별') {
    if (!charA.cutMeta) charA.cutMeta = {};
    if (!charB.cutMeta) charB.cutMeta = {};
    charA.cutMeta[charB.id] = { sinceDay: gameState.day, cooldown: 14 };
    charB.cutMeta[charA.id] = { sinceDay: gameState.day, cooldown: 14 };

    setSpecialStatus(charA.id, charB.id, 'cut');
    setSpecialStatus(charB.id, charA.id, 'cut');
  }

  charA.currentAction = reasonText;
  charB.currentAction = reasonText;
  
  setMood(charA, 'sad');
  setMood(charB, 'sad');

  dailyLogs.push({
    text: `[${reasonText}] ${charA.name}${getJosa(charA.name,'와/과')} ${charB.name}${getJosa(charB.name,'은/는')} 남남이 되었다. 관계가 급격히 냉각되었다. ❄️`,
    type: 'breakup'
  });
}

function getProbabilisticChange(score) {
  let change = score * 0.15; 
  change += (Math.random() * 20) - 10;
  return Math.round(change);
}

function processCutTimers(dailyLogs) {
  const seen = new Set();
  gameState.characters.forEach(a => {
    Object.entries(a.cutMeta || {}).forEach(([bid, meta]) => {
      const b = gameState.characters.find(c => c.id === bid);
      if (!b) return;
      const key = [a.id, b.id].sort().join('|');
      if (seen.has(key)) return;
      seen.add(key);
      const elapsed = gameState.day - meta.sinceDay;
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
  gameState.characters.forEach(a => {
    Object.entries(a.coldwarMeta || {}).forEach(([bid, meta]) => {
      const b = gameState.characters.find(c => c.id === bid);
      if (!b) return;
      const key = [a.id, b.id].sort().join('|');
      if (seen.has(key)) return;
      seen.add(key);
      const elapsed = gameState.day - meta.sinceDay;
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
  const sickChars = gameState.characters.filter(c => c.mood === 'sick').sort(() => Math.random() - 0.5);

  sickChars.forEach(patient => {
    if (patient.hasNurse) return;
    const candidates = gameState.characters.filter(c => 
      c.id !== patient.id && c.mood !== 'sick' && !c.isNursing && !c.hasNurse
    );

    let bestNurse = null;
    let maxScore = -999;

    candidates.forEach(nurse => {
      let score = calculateDirectionalScore(nurse, patient);
      const special = getSpecialStatusBetween(nurse, patient);
      if (special === 'coldwar' || special === 'cut') return;
      let finalScore = score;
      if (special === 'lover') finalScore += 200;
      if (special === 'married') finalScore += 300;
      if (finalScore >= 60) {
        if (finalScore > maxScore) {
          maxScore = finalScore;
          bestNurse = nurse;
        }
      }
    });

    if (bestNurse && Math.random() < 0.8) {
      bestNurse.isNursing = true;
      bestNurse.currentLocation = 'apt';
      bestNurse.currentAction = '간호';
      patient.hasNurse = true;
      patient.currentAction = '요양';

      dailyLogs.push({
        text: `[간호] ${bestNurse.name}${getJosa(bestNurse.name, '은/는')} 아픈 ${patient.name}의 소식을 듣고 한걸음에 달려와 간호했다. 💊`,
        type: 'love'
      });

      updateRelationship(patient.id, bestNurse.id, 20); 
      updateRelationship(bestNurse.id, patient.id, 5);  
    }
  });
}

export function nextDay() {
  if (gameState.characters.length === 0) {
    alert("최소 1명의 캐릭터가 필요합니다.");
    return;
  }
  
  const dailyLogs = [];
  
  // ★★★ [1. 스토리 모드: 1일차 특수 로직 수정] ★★★
  if (gameState.day === 1) {
      // 1. 참석자 결정 (성격에 따라)
      const attendeeNames = attendees.map(c => c.name).join(', ');
      dailyLogs.push({ text: "✨ 신축 아파트 입주 시작! 설레는 첫 만남의 날입니다.", type: 'event' });
      if (attendees.length > 0) {
          dailyLogs.push({ 
              text: `📢 입주민 ${attendees.length}명이 모여 떡을 돌리며 인사를 나눴습니다.\n(참석자: ${attendeeNames})`, 
              type: 'social' 
          });
      } 
      else {
          dailyLogs.push({ text: "📢 입주민들이 모두 짐 정리하느라 바빠 아무도 나오지 않았습니다...", type: 'social' });
      }
      
      // 2. 참석자들끼리만 관계 형성
      attendees.forEach(charA => {
          setMood(charA, 'happy'); // 나온 사람은 기분 좋음
          charA.currentAction = "입주 인사";

          attendees.forEach(charB => {
              if (charA.id === charB.id) return;

              // 첫인상 + 궁합 계산 (최대 5~6점 내외)
              let score = calculateFirstImpression(charA, charB);
              const chem = calculateChemistry(charA, charB);
              
              if (chem >= 20) score += 3;
              else if (chem >= -10) score += 1;
              else score -= 2;

              if (!charA.relationships) charA.relationships = {};
              charA.relationships[charB.id] = score;
          });
      });

      // 안 나온 사람들은 방에 있음
      gameState.characters.forEach(c => {
          if (!attendees.includes(c)) {
              c.currentLocation = 'apt';
              c.currentAction = '짐 정리(두문불출)';
              setMood(c, 'normal');
          }
      });
      
      // 5. 마무리
      updateAllMoods();
      const logsWithDay = dailyLogs.map(log => ({ ...log, day: gameState.day }));
      gameState.logs = [...logsWithDay, ...gameState.logs];
      renderLogs(dailyLogs);
      
      gameState.day++;
      renderStatusTable();
      renderLocations();
      updateUI();
      
      if (!document.getElementById('relationship-map-modal')?.classList.contains('hidden')) {
        requestAnimationFrame(() => drawRelationshipMap());
      }
      return; // 1일차 종료
  }

  // ============================================================
  // 아래는 기존의 2일차 이후 로직 (원래 코드 그대로)
  // ============================================================

  processColdwarTimers(dailyLogs);
  processCutTimers(dailyLogs); 

  gameState.characters.forEach(c => {
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

  processNursingEvents(dailyLogs);

  const movedSet = new Set();

  gameState.characters.forEach(char => {
    if (movedSet.has(char.id)) return;
    if (char.isNursing || char.hasNurse || char.mood === 'sick') {
      char.currentLocation = 'apt';
      movedSet.add(char.id);
      return;
    }

    const partnerId = getCurrentLoverId(char);
    let movedWithPartner = false;

    if (partnerId) {
        const partner = gameState.characters.find(c => c.id === partnerId);
        if (partner && !movedSet.has(partner.id) && partner.mood !== 'sick' && !partner.isNursing && !partner.hasNurse) {
            if (Math.random() < 0.7) {
                const goOut = Math.random() < 0.5;
                let loc = 'apt';
                if (goOut) {
                    const places = PLACES.filter(p => p.type === 'out');
                    loc = getRandom(places).id;
                }
                char.currentLocation = loc;
                partner.currentLocation = loc;
                movedSet.add(char.id);
                movedSet.add(partner.id);
                movedWithPartner = true;
            }
        }
    }
    if (!movedWithPartner) {
        const chanceToGoOut = 0.5;
        if (Math.random() < chanceToGoOut) {
          const places = PLACES.filter(p => p.type === 'out');
          char.currentLocation = getRandom(places).id;
        } else {
          char.currentLocation = 'apt';
        }
        movedSet.add(char.id);
    }
  });

  const locationMap = {};
  gameState.characters.forEach(char => {
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

      if (isTravel) {
         const hasExternalPartner = group.some(m => {
             const pid = getCurrentLoverId(m);
             return pid && !group.some(g => g.id === pid);
         });
         
         if (hasExternalPartner) {
             if (Math.random() < 0.90) isTravel = false;
         }
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
        const currentActorScore = actor.relationships[target.id] || 0;
        const currentTargetScore = target.relationships[actor.id] || 0;

        const specialBetween = getSpecialStatusBetween(actor, target);
        const isLovers = (specialBetween === 'lover');
        const isMarried = (specialBetween === 'married');
        const isColdwar = (specialBetween === 'coldwar');

        if (!isTravel && !isMarried && isLovers && currentActorScore >= 200 && currentTargetScore >= 200 && Math.random() < 0.20) {
          setSpecialStatus(actor.id, target.id, 'married');
          setSpecialStatus(target.id, actor.id, 'married');
          clearColdwarPair(actor, target);
          actor.currentAction = "결혼"; target.currentAction = "결혼";
          setMood(actor, 'happy'); setMood(target, 'happy');
          dailyLogs.push({
            text: `[결혼] ${actor.name}${getJosa(actor.name,'와/과')} ${target.name}${getJosa(target.name,'은/는')} 결혼했다! 💍`,
            type: 'love'
          });
          continue;
        }

        const actorPartnerId = getCurrentLoverId(actor);
        const hasPartner = !!actorPartnerId;
        const isCheatingTarget = hasPartner && actorPartnerId !== target.id; 

        if (isCheatingTarget && scoreForActor >= 50) {
            let cheatChance = 0.05 + (scoreForActor / 1000); 
            
            const gA = actor.mbti[0], jA = actor.mbti[1], gB = target.mbti[0], jB = target.mbti[1];
            if ((CHUNG_PAIRS[gA]===gB && CHUNG_PAIRS[jA]===jB) || WONJIN_PAIRS[jA]===jB) {
                cheatChance *= 2; 
            }

            if (Math.random() < cheatChance) {
                const isCaught = Math.random() < 0.3; 

                if (isCaught) {
                    const partner = gameState.characters.find(c => c.id === actorPartnerId);
                    if (partner) {
                        breakUpPair(actor, partner, '외도적발', dailyLogs);
                        updateRelationship(partner.id, actor.id, -100);
                        setMood(partner, 'sick');
                    }

                    updateRelationship(actor.id, target.id, -50);
                    updateRelationship(target.id, actor.id, -50);
                    
                    gameState.characters.forEach(c => {
                        if (c.id !== actor.id && c.id !== target.id) {
                            updateRelationship(c.id, actor.id, -30);
                            updateRelationship(c.id, target.id, -30);
                        }
                    });

                    actor.currentAction = "불륜 들킴";
                    target.currentAction = "불륜 들킴";
                    setMood(actor, 'sad');
                    
                    dailyLogs.push({
                        text: `[🚨대형 스캔들] ${actor.name}${getJosa(actor.name,'이/가')} ${target.name}${getJosa(target.name,'와/과')} 몰래 밀회를 즐기다 딱 걸렸다! 입주민 전체가 충격에 빠졌다.`,
                        type: 'breakup'
                    });

                } else {
                    updateRelationship(actor.id, target.id, 30);
                    updateRelationship(target.id, actor.id, 30);
                    
                    actor.currentAction = "비밀 데이트";
                    target.currentAction = "비밀 데이트";
                    setMood(actor, 'happy');

                    dailyLogs.push({
                        text: `[🤫비밀] ${actor.name}${getJosa(actor.name,'은/는')} 연인 몰래 ${target.name}${getJosa(target.name,'와/과')} 아슬아슬한 밀회를 즐겼다. (들키지 않음)`,
                        type: 'secret'
                    });
                }
                continue;
            }
        }

        const ganA = actor.mbti[0]; const jiA = actor.mbti[1];
        const ganB = target.mbti[0]; const jiB = target.mbti[1];
        const isDoubleChung = (CHUNG_PAIRS[ganA] === ganB && CHUNG_PAIRS[jiA] === jiB);
        const isWonjin = (WONJIN_PAIRS[jiA] === jiB);
          
        let eventProb = 0.25; 
        if (isDoubleChung || isWonjin) eventProb = 0.65; 
        if (!isLovers && !isMarried) {
             if (currentActorScore >= 90) eventProb = 0.95;
             else if (currentActorScore >= 70) eventProb = 0.60;
        }

        if (Math.random() < eventProb || isTravel) { 
            let evt = null;
            if (isTravel) {
                evt = { type: 'travel', name: '여행' }; 
            } else {
                evt = getRandom(EVENTS);
            }
          
          if (!isLovers && !isMarried && !isColdwar) {
             if (currentActorScore >= 90) {
                 if (Math.random() < 0.70) evt = EVENTS.find(e => e.type === 'confess') || evt;
             } else if (currentActorScore >= 70) {
                 if (Math.random() < 0.40) evt = EVENTS.find(e => e.type === 'confess') || evt;
             }
          }

          if (isColdwar && Math.random() < 0.9) {
            evt = EVENTS.find(e => e.type === 'reconcile') || evt;
          }

          const actorHasPartner = Object.values(actor.specialRelations || {}).some(v => v === 'lover' || v === 'married');
          const targetHasPartner = Object.values(target.specialRelations || {}).some(v => v === 'lover' || v === 'married');

          if (evt.type === 'blind' && (actorHasPartner || targetHasPartner)) evt = getRandom(EVENTS);
          if (evt.type === 'date' && !(isLovers || currentActorScore >= 60)) evt = getRandom(EVENTS);
          if (evt.type === 'secret' && currentActorScore < 20 && !isDoubleChung && !isWonjin) {
             evt = getRandom(EVENTS);
          }

          const actorPid = getCurrentLoverId(actor);
          const targetPid = getCurrentLoverId(target);
          
          const isBadDate = (evt.type === 'date') && (
              (actorPid && actorPid !== target.id) || (targetPid && targetPid !== actor.id)
          );

          if (isBadDate && !isTravel) {
              if (Math.random() < 0.85) evt = getRandom(EVENTS.filter(e => e.type !== 'date' && e.type !== 'confess'));
          }

          const isCheatingEvent = (evt.type === 'date' || isTravel) && (
              (actorPid && actorPid !== target.id) || (targetPid && targetPid !== actor.id)
          );

          if (isCheatingEvent) {
               if (Math.random() < 0.30) {
                   let cheater = null;
                   let angryPartner = null;
                   
                   if (actorPid && actorPid !== target.id) {
                       cheater = actor; angryPartner = gameState.characters.find(c => c.id === actorPid);
                   } else if (targetPid && targetPid !== actor.id) {
                       cheater = target; angryPartner = gameState.characters.find(c => c.id === targetPid);
                   }

                   if (angryPartner) {
                       isTravel = false; 
                       
                       updateRelationship(angryPartner.id, cheater.id, -40);
                       updateRelationship(cheater.id, angryPartner.id, -20);
                       
                       const paramour = (cheater.id === actor.id) ? target : actor;
                       updateRelationship(angryPartner.id, paramour.id, -50); 
                       updateRelationship(paramour.id, angryPartner.id, -30);

                       markColdwarPair(angryPartner, cheater);
                       
                       cheater.currentAction = "현장 검거";
                       paramour.currentAction = "도망침";
                       setMood(cheater, 'sad');
                       setMood(angryPartner, 'sick'); 

                       dailyLogs.push({
                           text: `[💔질투] ${cheater.name}${getJosa(cheater.name,'이/가')} ${paramour.name}${getJosa(paramour.name,'와/과')} ${evt.name}를 즐기던 현장에 연인 ${angryPartner.name}${getJosa(angryPartner.name,'이/가')} 들이닥쳤다! 현장은 아수라장이 되었다.`,
                           type: 'breakup'
                       });
                       
                       continue; 
                   }
               }
          }

          let logText = "";

          if (evt.type === 'reconcile') {
             const actorHates = currentActorScore < 0;
             const targetHates = currentTargetScore < 0;
             if (actorHates || targetHates || isColdwar) {
               if (isColdwar) {
                 const meta = actor.coldwarMeta?.[target.id];
                 const duration = meta?.duration || 3;
                 const bigFight = duration >= 5;
                 const cutChanceLate = bigFight ? 0.25 : 0.15;
                 if (!canReconcileColdwar(actor, target)) {
                   if (Math.random() < cutChanceLate) breakUpPair(actor, target, '절교', dailyLogs);
                   else {
                     updateRelationship(actor.id, target.id, 2); updateRelationship(target.id, actor.id, 2);
                     logText = `[화해 실패] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 화해를 시도했지만 아직 풀리지 않았다.`;
                     actor.currentAction = evt.name; target.currentAction = evt.name;
                     dailyLogs.push({ text: logText, type: 'event' });
                   }
                 } else {
                   updateRelationship(actor.id, target.id, 15); updateRelationship(target.id, actor.id, 15);
                   clearColdwarPair(actor, target);
                   logText = `[${evt.name}] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 서로 사과하고 화해했다.`;
                   actor.currentAction = evt.name; target.currentAction = evt.name;
                   setMood(actor, 'normal'); setMood(target, 'normal');
                   dailyLogs.push({ text: logText, type: 'event' });
                 }
               } else {
                 updateRelationship(actor.id, target.id, 15); updateRelationship(target.id, actor.id, 15);
                 logText = `[${evt.name}] ${actor.name}${getJosa(actor.name, '와/과')} ${target.name}${getJosa(target.name, '은/는')} 서로 사과하고 화해했다.`;
                 actor.currentAction = evt.name; target.currentAction = evt.name;
                 setMood(actor, 'normal'); setMood(target, 'normal');
                 dailyLogs.push({ text: logText, type: 'event' });
               }
             } else {
               updateRelationship(actor.id, target.id, 5); updateRelationship(target.id, actor.id, 5);
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
             } 
             else if (isLovers) {
                updateRelationship(actor.id, target.id, 5); updateRelationship(target.id, actor.id, 5); clearColdwarPair(actor, target);
                logText = `[사랑] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 다시 사랑을 맹세했다.`;
                actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                setMood(actor, 'happy'); setMood(target, 'happy');
                dailyLogs.push({ text: logText, type: 'love' });
             } 
             else if (currentActorScore > 50) {
                 const targetOldLoverId = getCurrentLoverId(target);
                 let canSwitch = true; 
                 let rejectReason = "";

                 if (targetOldLoverId) {
                     const oldLover = gameState.characters.find(c => c.id === targetOldLoverId);
                     const scoreWithOld = target.relationships[targetOldLoverId] || 0; 
                     const scoreWithNew = currentTargetScore; 

                     if (scoreWithOld >= 150) {
                         canSwitch = false; 
                         rejectReason = "연인을 너무 사랑해서";
                     } else if (scoreWithNew + 50 < scoreWithOld) {
                         canSwitch = false; 
                         rejectReason = "지금 연인이 더 좋아서";
                     } else {
                         if (Math.random() < 0.5) {
                             canSwitch = false;
                             rejectReason = "연인에 대한 의리 때문에";
                         }
                     }
                 }

                 let success = false;
                 
                 if (canSwitch) {
                     const chemBonus = (calculateChemistry(actor, target) - 3) * 0.05;
                     const successChance = 0.30 + (currentTargetScore / 200) + chemBonus;
                     if (Math.random() < successChance) success = true;
                 }

                 if (success) {
                     const actorOldLoverId = getCurrentLoverId(actor);
                     if (actorOldLoverId && actorOldLoverId !== target.id) {
                       const old = gameState.characters.find(c => c.id === actorOldLoverId);
                       if (old) breakUpPair(actor, old, '환승이별', dailyLogs);
                     }
                     
                     if (targetOldLoverId && targetOldLoverId !== actor.id) {
                       const old = gameState.characters.find(c => c.id === targetOldLoverId);
                       if (old) breakUpPair(target, old, '환승이별', dailyLogs);
                     }
                     
                     setSpecialStatus(actor.id, target.id, 'lover');
                     setSpecialStatus(target.id, actor.id, 'lover');
                     clearColdwarPair(actor, target);
                     
                     updateRelationship(actor.id, target.id, 20);
                     updateRelationship(target.id, actor.id, 20);
                     setMood(actor, 'happy'); setMood(target, 'happy');

                     if (targetOldLoverId) {
                        logText = `[환승 연애] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}의 마음을 뺏는 데 성공했다! 새로운 커플 탄생 💘`;
                     } else {
                        logText = `[고백 성공] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 고백했고, 연인이 되었다! 💖`;
                     }
                     actor.currentAction = evt.name; target.currentAction = `(대상) ${evt.name}`;
                     dailyLogs.push({ text: logText, type: 'love' });

                 } else {
                     updateRelationship(actor.id, target.id, -30); 
                     updateRelationship(target.id, actor.id, -20);
                     if (Math.random() < 0.5) markColdwarPair(actor, target);
                     
                     setMood(actor, 'sad');
                     
                     if (targetOldLoverId && !canSwitch) {
                         logText = `[고백 실패] ${actor.name}${getJosa(actor.name, '은/는')} 용기내어 고백했지만, ${target.name}${getJosa(target.name, '은/는')} ${rejectReason} 거절했다.`;
                     } else {
                         logText = `[고백 실패] ${actor.name}${getJosa(actor.name, '은/는')} ${target.name}에게 차였다... (상대 호감도: ${currentTargetScore}점)`;
                     }
                     
                     actor.currentAction = "거절당함"; 
                     target.currentAction = "거절함";
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
                if (Math.random() < 0.3 - (currentActorScore / 200)) {
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

  const logsWithDay = dailyLogs.map(log => ({ ...log, day: gameState.day }));
  gameState.logs = [...logsWithDay, ...gameState.logs];
  renderLogs(dailyLogs);
  gameState.day++;
  
  renderStatusTable();
  renderLocations();
  updateUI();

  if (!document.getElementById('relationship-map-modal')?.classList.contains('hidden')) {
    requestAnimationFrame(() => drawRelationshipMap());
  }
}




