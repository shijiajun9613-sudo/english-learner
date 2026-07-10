/**
 * Word Bank Data — Combined from 12 category fragment files
 * Auto-generated from js/data/words_*.js
 * Total: ~3000 words across 12 categories
 */

// Combine all word fragment arrays into the main word bank
const WORD_BANK = [].concat(
  (typeof WORDS_FOOD !== 'undefined' ? WORDS_FOOD : []),
  (typeof WORDS_DAILY !== 'undefined' ? WORDS_DAILY : []),
  (typeof WORDS_TRAVEL !== 'undefined' ? WORDS_TRAVEL : []),
  (typeof WORDS_NATURE !== 'undefined' ? WORDS_NATURE : []),
  (typeof WORDS_WORK !== 'undefined' ? WORDS_WORK : []),
  (typeof WORDS_TECHNOLOGY !== 'undefined' ? WORDS_TECHNOLOGY : []),
  (typeof WORDS_EMOTION !== 'undefined' ? WORDS_EMOTION : []),
  (typeof WORDS_EDUCATION !== 'undefined' ? WORDS_EDUCATION : []),
  (typeof WORDS_ANIMALS !== 'undefined' ? WORDS_ANIMALS : []),
  (typeof WORDS_HEALTH !== 'undefined' ? WORDS_HEALTH : []),
  (typeof WORDS_SHOPPING !== 'undefined' ? WORDS_SHOPPING : []),
  (typeof WORDS_SPORTS !== 'undefined' ? WORDS_SPORTS : []),
  (typeof WORDS_TRADE !== 'undefined' ? WORDS_TRADE : []),
);

const CATEGORIES = {
  all: { name: '全部', icon: '📚', color: '#4F46E5' },
  food: { name: '食物', icon: '🍔', color: '#F59E0B' },
  daily: { name: '日常', icon: '🏠', color: '#EC4899' },
  travel: { name: '旅行', icon: '✈️', color: '#10B981' },
  nature: { name: '自然', icon: '🌿', color: '#14B8A6' },
  work: { name: '工作', icon: '💼', color: '#6366F1' },
  technology: { name: '科技', icon: '💻', color: '#3B82F6' },
  emotion: { name: '情感', icon: '❤️', color: '#EF4444' },
  education: { name: '教育', icon: '🎓', color: '#8B5CF6' },
  animals: { name: '动物', icon: '🐾', color: '#F97316' },
  health: { name: '健康', icon: '🏥', color: '#06B6D4' },
  shopping: { name: '购物', icon: '🛒', color: '#E11D48' },
  sports: { name: '运动', icon: '⚽', color: '#84CC16' },
  trade: { name: '外贸', icon: '🌐', color: '#0891B2' },
};

function getWordsByCategory(category) {
  if (!category || category === 'all') return [...WORD_BANK];
  return WORD_BANK.filter(w => w.category === category);
}

function getLearnedWords(wordIds, category) {
  const pool = getWordsByCategory(category);
  return pool.filter(w => wordIds.includes(w.id));
}

function getUnlearnedWords(wordIds, category) {
  const pool = getWordsByCategory(category);
  return pool.filter(w => !wordIds.includes(w.id));
}

function getWordById(id) {
  return WORD_BANK.find(w => w.id === id) || null;
}

// Log total count on load (helpful for debugging)
console.log(`📚 English Learner: ${WORD_BANK.length} words loaded across ${Object.keys(CATEGORIES).length - 1} categories.`);
