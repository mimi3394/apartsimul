import { WORD_SETS } from './data.js';

export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function hasJongseong(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return (code - 0xAC00) % 28 > 0;
}

export function getJosa(word, type) {
  const lastChar = word.charAt(word.length - 1);
  const has = hasJongseong(lastChar);
  if (type === '은/는') return has ? '은' : '는';
  if (type === '이/가') return has ? '이' : '가';
  if (type === '을/를') return has ? '을' : '를';
  if (type === '와/과') return has ? '과' : '와';
  return '';
}

export function fillTemplate(text) {
  let replaced = text.replace(/{(\w+)}/g, (match, key) => {
    const words = WORD_SETS[key];
    return words ? getRandom(words) : match;
  });

  replaced = replaced.replace(/(\S+)\((은\/는|이\/가|을\/를|와\/과)\)/g, (match, word, josa) => {
    return word + getJosa(word, josa);
  });
  return replaced;
}