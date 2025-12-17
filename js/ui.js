import { gameState } from './state.js';
import { SAJU_DATA, GAN_ORDER, PLACES, MOODS, CANVAS_FONT_FAMILY } from './data.js';
import { getRelationshipLabel } from './logic.js';
import { getJosa } from './utils.js';

function getMoodMeta(moodId) {
  return MOODS.find(m => m.id === moodId) || MOODS.find(m => m.id === 'normal');
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

function getLocationName(id) {
    const p = PLACES.find(x => x.id === id);
    return p ? p.name : id;
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

// ---- [렌더링 함수들 export] ----

export function renderCharacterList() {
  const container = document.getElementById('character-list');
  const emptyState = document.getElementById('empty-state');
  if (!container || !emptyState) return;

  container.innerHTML = '';
  if (gameState.characters.length === 0) {
    container.classList.add('hidden');
    emptyState.classList.remove('hidden');
    const total = document.getElementById('total-count');
    if (total) total.textContent = '0';
    return;
  }

  container.classList.remove('hidden');
  emptyState.classList.add('hidden');

  gameState.characters.forEach(char => {
    const div = document.createElement('div');
    div.className = "bg-white dark:bg-slate-700 p-4 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm relative group hover:shadow-md transition-shadow cursor-pointer";
    const moodMeta = getMoodMeta(char.mood || 'normal');
    
    let genderClass = "bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400";
    if (char.gender === 'male') genderClass = "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300";
    else if (char.gender === 'female') genderClass = "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300";
    else if (char.gender === 'nonbinary') genderClass = "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300";

    if (gameState.affectionMode) {
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
      // removeCharacter 함수는 window 객체에 등록된 것을 호출
      div.innerHTML = `
        <button onclick="window.removeCharacter('${char.id}')" class="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"><i class="fa-solid fa-times"></i></button>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-full ${genderClass} flex items-center justify-center text-lg"><i class="fa-regular fa-user"></i></div>
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
  if (total) total.textContent = gameState.characters.length;
}

export function renderLocations() {
  const aptGrid = document.getElementById('apartment-grid');
  if (!aptGrid) return;
  aptGrid.innerHTML = '';
  const renderedIds = new Set();
  const getGroupMembers = (char) => {
    if (!char.interactionGroup) return [char];
    return gameState.characters.filter(c => c.interactionGroup === char.interactionGroup && c.currentLocation === char.currentLocation);
  };
  for (let f = 5; f >= 1; f--) {
    for (let r = 1; r <= 6; r++) {
      const roomNum = `${f}0${r}`;
      const occupants = gameState.characters.filter(c => c.room === roomNum && c.currentLocation === 'apt');
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
    return gameState.characters.filter(c => c.interactionGroup === char.interactionGroup && c.currentLocation === char.currentLocation);
  };
  placesToRender.forEach(place => {
    const occupants = gameState.characters.filter(c => c.currentLocation === place.id);
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

export function renderStatusTable() {
  const tbody = document.getElementById('status-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  gameState.characters.forEach(char => {
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
  if (badge) badge.textContent = `${gameState.day}일차`;
}

export function renderLogs(newLogs) {
  const container = document.getElementById('log-container');
  if (!container) return;
  if (container.querySelector('.italic')) container.innerHTML = '';
  const dayDiv = document.createElement('div');
  dayDiv.className = "mb-6 animate-[fadeIn_0.5s_ease-out]";
  dayDiv.innerHTML = `<div class="flex items-center gap-2 mb-3"><div class="h-px bg-slate-300 dark:bg-slate-600 flex-1"></div><span class="text-xs font-bold text-slate-400 uppercase tracking-wider">${gameState.day}일차</span><div class="h-px bg-slate-300 dark:bg-slate-600 flex-1"></div></div>`;
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

export function clearLogs() {
  const el = document.getElementById('log-container');
  if (el) el.innerHTML = `<div class="text-center text-slate-400 italic py-10">로그가 초기화되었습니다.</div>`;
}

export function updateUI() {
  renderCharacterList();
  renderStatusTable();
}

// ---- [설정 및 모달 UI] ----

export function initSajuSelect() {
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

export function updateJiOptions(selectedGan, jiSelect) {
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

export function initRoomSelect() {
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

export function toggleTheme() {
  gameState.isDarkMode = !gameState.isDarkMode;
  if (gameState.isDarkMode) {
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

export function showAffectionModal(charId) {
  const char = gameState.characters.find(c => c.id === charId);
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
      const other = gameState.characters.find(c => c.id === id);
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

export function closeModal() {
  const modal = document.getElementById('affection-modal');
  if (modal) modal.classList.add('hidden');
}

export function openRelationshipMap() {
  const modal = document.getElementById('relationship-map-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  ensureCanvasFontReady().then(() => {
    requestAnimationFrame(() => drawRelationshipMap());
  });
  window.addEventListener('resize', drawRelationshipMap);
}

export function closeRelationshipMap() {
  const modal = document.getElementById('relationship-map-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  window.removeEventListener('resize', drawRelationshipMap);
}

// ---- [캔버스 및 탭 관련] ----

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

export function drawRelationshipMap() {
  const canvas = document.getElementById('relationship-canvas');
  if (!canvas) return;
  const { ctx, w, h } = resizeCanvasToDisplaySize(canvas);
  ctx.clearRect(0, 0, w, h);
  if (gameState.characters.length === 0) {
    ctx.font = `14px ${CANVAS_FONT_FAMILY}`;
    ctx.fillStyle = gameState.isDarkMode ? "#94a3b8" : "#64748b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("표시할 캐릭터가 없습니다.", w / 2, h / 2);
    return;
  }
  const centerX = w / 2;
  const centerY = h / 2;
  const radius = Math.min(centerX, centerY) * 0.78;
  const angleStep = (2 * Math.PI) / gameState.characters.length;
  const nodes = gameState.characters.map((char, index) => {
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
      let color = gameState.isDarkMode ? "#475569" : "#cbd5e1";
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
    ctx.fillStyle = gameState.isDarkMode ? "#1e293b" : "#ffffff";
    ctx.fill();
    ctx.strokeStyle = gameState.isDarkMode ? "#475569" : "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = `bold 12px ${CANVAS_FONT_FAMILY}`;
    ctx.fillStyle = gameState.isDarkMode ? "#e2e8f0" : "#1e293b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const name = node.char.name || "";
    ctx.fillText(name, node.x, node.y);
  });
}