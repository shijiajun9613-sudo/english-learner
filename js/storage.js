/**
 * Storage Module — localStorage wrapper for user progress
 */

const STORAGE_KEYS = {
  PROGRESS: 'english_learner_progress',
  DAILY_LOG: 'english_learner_daily_log',
};

const DEFAULT_PROGRESS = {
  learnedWords: [],
  quizHistory: [],
  streak: 0,
  lastStudyDate: null,
  totalStudyMinutes: 0,
};

const DEFAULT_DAILY_LOG = {};

function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return { ...DEFAULT_PROGRESS, learnedWords: [], quizHistory: [] };
    const data = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...data,
      learnedWords: Array.isArray(data.learnedWords) ? data.learnedWords : [],
      quizHistory: Array.isArray(data.quizHistory) ? data.quizHistory : [],
    };
  } catch {
    return { ...DEFAULT_PROGRESS, learnedWords: [], quizHistory: [] };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch {
    // quota exceeded — silently fail
  }
}

function getDailyLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_LOG);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveDailyLog(log) {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_LOG, JSON.stringify(log));
  } catch {
    // quota exceeded
  }
}

function markWordLearned(wordId) {
  const progress = getProgress();
  if (!progress.learnedWords.includes(wordId)) {
    progress.learnedWords.push(wordId);
    saveProgress(progress);
  }
  return progress;
}

function markWordUnlearned(wordId) {
  const progress = getProgress();
  progress.learnedWords = progress.learnedWords.filter(id => id !== wordId);
  saveProgress(progress);
  return progress;
}

function isWordLearned(wordId) {
  const progress = getProgress();
  return progress.learnedWords.includes(wordId);
}

function addQuizResult(score, total, category) {
  const progress = getProgress();
  progress.quizHistory.push({
    date: getToday(),
    score,
    total,
    category: category || 'all',
  });
  saveProgress(progress);
  recordStudyActivity();
  return progress;
}

function recordStudyActivity() {
  const progress = getProgress();
  const today = getToday();
  const log = getDailyLog();

  // Mark today as studied
  if (!log[today]) log[today] = 0;
  log[today]++;
  saveDailyLog(log);

  // Update streak
  if (progress.lastStudyDate !== today) {
    const yesterday = getDateBefore(1);
    if (progress.lastStudyDate === yesterday) {
      progress.streak++;
    } else if (progress.lastStudyDate !== today) {
      progress.streak = 1;
    }
    progress.lastStudyDate = today;
    saveProgress(progress);
  }
  return progress;
}

function getStudyDays() {
  const log = getDailyLog();
  return Object.keys(log).sort();
}

function resetAllData() {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.DAILY_LOG);
}
