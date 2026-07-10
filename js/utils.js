/**
 * Utility Helpers
 */

/** Get today's date as YYYY-MM-DD string */
function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Pad a number to 2 digits */
function pad(n) {
  return String(n).padStart(2, '0');
}

/** Get date N days before today as YYYY-MM-DD */
function getDateBefore(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Fisher-Yates shuffle — returns new array */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick N random elements from an array */
function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

/** Format minutes to human-readable */
function formatMinutes(mins) {
  if (mins < 1) return '不到1分钟';
  if (mins < 60) return `${Math.round(mins)}分钟`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m > 0 ? `${h}小时${m}分钟` : `${h}小时`;
}

/** Generate a simple unique ID */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/** Debounce helper */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Speak a word using Web Speech API (browser TTS)
 * @param {string} text - English text to speak
 * @param {string} rate - Speech rate (0.5-2.0), default 0.85
 */
function speakWord(text, rate = 0.85) {
  if (!('speechSynthesis' in window)) {
    showToast('你的浏览器不支持语音朗读', 'warning');
    return;
  }
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to use a good English voice
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Female'))
    || voices.find(v => v.lang.startsWith('en-US'))
    || voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utterance.voice = enVoice;

  window.speechSynthesis.speak(utterance);
}

/** Escape HTML to prevent XSS */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Show a toast notification */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 2500);
}

/**
 * Simple confetti effect using canvas
 * Triggers a burst of colorful particles
 */
function triggerConfetti(duration = 2000) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#14B8A6', '#F97316'];
  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    });
  }

  const start = Date.now();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - start;
    const progress = elapsed / duration;

    particles.forEach(p => {
      p.x += p.vx;
      p.vy += 0.05;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      const alpha = Math.max(0, 1 - progress);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(draw);
}
