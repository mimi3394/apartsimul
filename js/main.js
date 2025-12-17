import { gameState, setCharacters, resetLogs } from './state.js';
import { 
    renderCharacterList, renderLocations, updateUI, 
    initSajuSelect, initRoomSelect, renderStatusTable, clearLogs, 
    toggleTheme, openRelationshipMap, closeRelationshipMap,
    drawRelationshipMap, showAffectionModal, closeModal, renderLogs // <--- renderLogs 추가됨
} from './ui.js';
import { nextDay } from './event.js';
import { getRelationshipLabel } from './logic.js';

// ---- [캐릭터 관리 기능] ----

function addCharacter() {
  if (gameState.characters.length >= 30) return alert("최대 30명까지만 가능합니다.");
  const nameInput = document.getElementById('input-name');
  const ganInput = document.getElementById('input-gan');
  const jiInput = document.getElementById('input-ji');
  const roomInput = document.getElementById('input-room');
  const genderInput = document.getElementById('input-gender');

  if (!nameInput || !ganInput || !jiInput || !roomInput || !genderInput) return alert("입력 폼을 찾을 수 없습니다.");

  const name = nameInput.value.trim();
  if (!name) return alert("이름을 입력해주세요.");
  if (gameState.characters.some(c => c.name === name)) return alert("이미 존재하는 이름입니다.");

  let room = roomInput.value;
  if (room === 'auto') {
    room = findEmptyRoom();
    if (!room) return alert("빈 방이 없습니다.");
  } else if (getRoomCount(room) >= 4) return alert("해당 방은 정원 초과입니다.");

  const ilju = ganInput.value + jiInput.value;
  const gender = genderInput.value;

  const newChar = {
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
  };

  gameState.characters.push(newChar);

  // ★★★ [중간 입주 이벤트] 게임이 이미 진행 중일 때(2일차 이상) ★★★
  if (gameState.day > 1) {
      const moveInLog = { 
          text: `🚚 [입주] ${newChar.room}호에 새로운 이웃 ${newChar.name}님이 이사왔습니다! 모두가 반갑게 인사해줍니다.`, 
          type: 'event',
          day: gameState.day 
      };
      
      // 로그 저장 및 화면 표시
      gameState.logs.unshift(moveInLog); // 로그 배열 맨 앞에 추가
      renderLogs([moveInLog]); // 화면에 즉시 띄우기

      // 기존 주민들과 자동 인사 (호감도 +10 보너스)
      gameState.characters.forEach(c => {
          if (c.id !== newChar.id) {
              if (!c.relationships) c.relationships = {};
              if (!newChar.relationships) newChar.relationships = {};
              
              c.relationships[newChar.id] = 10;
              newChar.relationships[c.id] = 10;
          }
      });
  }

  nameInput.value = '';
  renderCharacterList();
  renderLocations();
  updateUI();
}

function removeCharacter(id) {
  if (!confirm("삭제하시겠습니까?")) return;
  const newChars = gameState.characters.filter(c => c.id !== id);
  // 관계 데이터에서도 삭제
  newChars.forEach(c => {
    delete c.relationships[id];
    if (c.specialRelations) delete c.specialRelations[id];
  });
  setCharacters(newChars);
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
  gameState.characters.forEach(c => { 
    if (counts[c.room] !== undefined) counts[c.room]++; 
  });
  const emptyRooms = Object.keys(counts).filter(room => counts[room] === 0);
  if (emptyRooms.length > 0) return emptyRooms[Math.floor(Math.random() * emptyRooms.length)];
  const availableRooms = Object.keys(counts).filter(room => counts[room] < 4);
  if (availableRooms.length === 0) return null;
  return availableRooms[Math.floor(Math.random() * availableRooms.length)];
}

function getRoomCount(roomNum) {
  return gameState.characters.filter(c => c.room === roomNum).length;
}

// ---- [데이터 저장/불러오기 기능] ----

function exportData(includeRelationships) {
  if (gameState.characters.length === 0) return alert("저장할 데이터가 없습니다.");
  const exportDataArr = gameState.characters.map(c => {
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
  const payload = { version: 1.8, type: includeRelationships ? 'full' : 'basic', day: includeRelationships ? gameState.day : 1, data: exportDataArr };
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
        gameState.day = json.day || 1;
        const newChars = json.data.map(d => ({
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
        setCharacters(newChars);
        renderCharacterList();
        renderLocations();
        renderStatusTable();
        clearLogs();
        const total = document.getElementById('total-count');
        if (total) total.textContent = newChars.length;
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
    setCharacters([]);
    gameState.day = 1;
    resetLogs();
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
  gameState.affectionMode = !gameState.affectionMode;
  const btn = document.getElementById('btn-affection-mode');
  if (btn) {
    if (gameState.affectionMode) btn.className = "bg-brand-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-inner";
    else btn.className = "border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors";
  }
  renderCharacterList();
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

// ---- [텍스트 저장 기능] ----

function saveLogsToTxt() {
  if (gameState.logs.length === 0) return alert("저장할 로그가 없습니다.");
  let content = "=== 아파트 시뮬레이터 활동 로그 ===\n";
  content += `저장 일시: ${new Date().toLocaleString()}\n\n`;
  const sortedLogs = [...gameState.logs].reverse();
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
  a.download = `simulation_logs_day${gameState.day}_${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function saveRelationshipsToTxt() {
  if (gameState.characters.length === 0) return alert("캐릭터가 없습니다.");
  let content = `=== 입주민 호감도 현황 (Day ${gameState.day}) ===\n`;
  content += `작성일시: ${new Date().toLocaleString()}\n\n`;
  gameState.characters.forEach(char => {
    content += `========================================\n`;
    const genderStr = char.gender === 'male' ? '남' : char.gender === 'female' ? '여' : 'NB';
    content += `[${char.name}] (${char.mbti} / ${genderStr} / ${char.room}호)\n`;
    content += `----------------------------------------\n`;
    const relations = Object.entries(char.relationships || {})
      .map(([targetId, score]) => {
        const target = gameState.characters.find(c => c.id === targetId);
        if (!target) return null;
        let special = null; 
        if(char.specialRelations && char.specialRelations[targetId]) special = char.specialRelations[targetId];
        else if(target.specialRelations && target.specialRelations[char.id]) special = target.specialRelations[char.id];
        
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
  a.download = `relationships_summary_day${gameState.day}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ---- [초기화 및 윈도우 바인딩] ----

window.onload = () => {
  initSajuSelect();
  initRoomSelect();
  renderCharacterList();
  renderLocations();
  updateUI();

  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    gameState.isDarkMode = true;
  }
};

// ★ HTML에서 함수를 쓸 수 있게 window에 붙여줍니다.
window.addCharacter = addCharacter;
window.removeCharacter = removeCharacter;
window.nextDay = nextDay;
window.exportData = exportData;
window.importData = importData;
window.resetAll = resetAll;
window.toggleExportMenu = toggleExportMenu;
window.closeMenus = closeMenus;
window.toggleAffectionMode = toggleAffectionMode;
window.switchTab = switchTab;
window.saveLogsToTxt = saveLogsToTxt;
window.saveRelationshipsToTxt = saveRelationshipsToTxt;
window.toggleTheme = toggleTheme;
window.showAffectionModal = showAffectionModal;
window.closeModal = closeModal;
window.openRelationshipMap = openRelationshipMap;
window.closeRelationshipMap = closeRelationshipMap;
window.clearLogs = clearLogs;


