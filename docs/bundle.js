// English Learner - Production Bundle
// Built at: 2026-07-12T13:27:35.490Z

// -- js/utils.js --
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

// -- js/data/words_food.js --
const WORDS_FOOD = [
  // ========== FRUITS (f001-f030) ==========
  { id: 'f001', en: 'apple', zh: '苹果', phonetic: '/ˈæp.əl/', example: 'She bit into a crisp red apple.', category: 'food' },
  { id: 'f002', en: 'banana', zh: '香蕉', phonetic: '/bəˈnæn.ə/', example: 'He peeled a ripe banana for breakfast.', category: 'food' },
  { id: 'f003', en: 'orange', zh: '橙子', phonetic: '/ˈɒr.ɪndʒ/', example: 'Fresh orange juice is my favorite drink.', category: 'food' },
  { id: 'f004', en: 'grape', zh: '葡萄', phonetic: '/ɡreɪp/', example: 'We bought a bunch of purple grapes.', category: 'food' },
  { id: 'f005', en: 'strawberry', zh: '草莓', phonetic: '/ˈstrɔː.bər.i/', example: 'She picked strawberries at the farm.', category: 'food' },
  { id: 'f006', en: 'watermelon', zh: '西瓜', phonetic: '/ˈwɔː.tərˌmel.ən/', example: 'We sliced a huge watermelon at the picnic.', category: 'food' },
  { id: 'f007', en: 'pineapple', zh: '菠萝', phonetic: '/ˈpaɪnˌæp.əl/', example: 'The pineapple was sweet and juicy.', category: 'food' },
  { id: 'f008', en: 'mango', zh: '芒果', phonetic: '/ˈmæŋ.ɡoʊ/', example: 'Mango lassi is a popular Indian drink.', category: 'food' },
  { id: 'f009', en: 'peach', zh: '桃子', phonetic: '/piːtʃ/', example: 'The fuzzy peach smelled wonderful.', category: 'food' },
  { id: 'f010', en: 'pear', zh: '梨', phonetic: '/per/', example: 'She ate a juicy pear after lunch.', category: 'food' },
  { id: 'f011', en: 'cherry', zh: '樱桃', phonetic: '/ˈtʃer.i/', example: 'Cherry blossoms bloom in spring.', category: 'food' },
  { id: 'f012', en: 'lemon', zh: '柠檬', phonetic: '/ˈlem.ən/', example: 'Add a squeeze of lemon to the tea.', category: 'food' },
  { id: 'f013', en: 'lime', zh: '青柠', phonetic: '/laɪm/', example: 'Lime adds a fresh taste to ceviche.', category: 'food' },
  { id: 'f014', en: 'blueberry', zh: '蓝莓', phonetic: '/ˈbluːˌber.i/', example: 'She sprinkled blueberries on her oatmeal.', category: 'food' },
  { id: 'f015', en: 'raspberry', zh: '覆盆子', phonetic: '/ˈræzˌber.i/', example: 'Raspberry jam is my favorite spread.', category: 'food' },
  { id: 'f016', en: 'kiwi', zh: '猕猴桃', phonetic: '/ˈkiː.wiː/', example: 'Scoop out the kiwi flesh with a spoon.', category: 'food' },
  { id: 'f017', en: 'plum', zh: '李子', phonetic: '/plʌm/', example: 'The plum tree is full of fruit this year.', category: 'food' },
  { id: 'f018', en: 'coconut', zh: '椰子', phonetic: '/ˈkoʊ.kə.nʌt/', example: 'Coconut water is refreshing on a hot day.', category: 'food' },
  { id: 'f019', en: 'fig', zh: '无花果', phonetic: '/fɪɡ/', example: 'Dried figs make a healthy snack.', category: 'food' },
  { id: 'f020', en: 'pomegranate', zh: '石榴', phonetic: '/ˈpɑːm.ɪˌɡræn.ɪt/', example: 'Pomegranate seeds add crunch to salads.', category: 'food' },
  { id: 'f021', en: 'avocado', zh: '牛油果', phonetic: '/ˌæv.əˈkɑː.doʊ/', example: 'She spread mashed avocado on toast.', category: 'food' },
  { id: 'f022', en: 'papaya', zh: '木瓜', phonetic: '/pəˈpaɪ.ə/', example: 'Papaya is rich in digestive enzymes.', category: 'food' },
  { id: 'f023', en: 'melon', zh: '甜瓜', phonetic: '/ˈmel.ən/', example: 'We chilled the melon before cutting it.', category: 'food' },
  { id: 'f024', en: 'tangerine', zh: '橘子', phonetic: '/ˈtæn.dʒər.iːn/', example: 'She peeled a tangerine for her child.', category: 'food' },
  { id: 'f025', en: 'lychee', zh: '荔枝', phonetic: '/ˈliː.tʃiː/', example: 'Lychee has a delicate floral flavor.', category: 'food' },
  { id: 'f026', en: 'dragon fruit', zh: '火龙果', phonetic: '/ˈdræɡ.ən fruːt/', example: 'Dragon fruit has vibrant pink skin.', category: 'food' },
  { id: 'f027', en: 'passion fruit', zh: '百香果', phonetic: '/ˈpæʃ.ən fruːt/', example: 'Passion fruit adds tropical flavor to drinks.', category: 'food' },
  { id: 'f028', en: 'guava', zh: '番石榴', phonetic: '/ˈɡwɑː.və/', example: 'Guava has a sweet, musky fragrance.', category: 'food' },
  { id: 'f029', en: 'apricot', zh: '杏', phonetic: '/ˈeɪ.prɪ.kɑːt/', example: 'Dried apricots are a great hiking snack.', category: 'food' },
  { id: 'f030', en: 'cranberry', zh: '蔓越莓', phonetic: '/ˈkrænˌber.i/', example: 'Cranberry sauce is served with turkey.', category: 'food' },

  // ========== VEGETABLES (f031-f060) ==========
  { id: 'f031', en: 'carrot', zh: '胡萝卜', phonetic: '/ˈkær.ət/', example: 'Rabbits love eating fresh carrots.', category: 'food' },
  { id: 'f032', en: 'potato', zh: '土豆', phonetic: '/pəˈteɪ.toʊ/', example: 'She mashed the potatoes with butter.', category: 'food' },
  { id: 'f033', en: 'tomato', zh: '番茄', phonetic: '/təˈmeɪ.toʊ/', example: 'Slice the tomatoes for the salad.', category: 'food' },
  { id: 'f034', en: 'onion', zh: '洋葱', phonetic: '/ˈʌn.jən/', example: 'Chopping onions makes my eyes water.', category: 'food' },
  { id: 'f035', en: 'garlic', zh: '大蒜', phonetic: '/ˈɡɑːr.lɪk/', example: 'Add minced garlic to the hot oil.', category: 'food' },
  { id: 'f036', en: 'broccoli', zh: '西兰花', phonetic: '/ˈbrɑː.kəl.i/', example: 'Steamed broccoli is a healthy side dish.', category: 'food' },
  { id: 'f037', en: 'spinach', zh: '菠菜', phonetic: '/ˈspɪn.ɪtʃ/', example: 'She added spinach to her smoothie.', category: 'food' },
  { id: 'f038', en: 'lettuce', zh: '生菜', phonetic: '/ˈlet.ɪs/', example: 'Wash the lettuce leaves thoroughly.', category: 'food' },
  { id: 'f039', en: 'cucumber', zh: '黄瓜', phonetic: '/ˈkjuː.kʌm.bər/', example: 'Cool cucumber slices soothe sunburn.', category: 'food' },
  { id: 'f040', en: 'pepper', zh: '甜椒', phonetic: '/ˈpep.ər/', example: 'Red bell peppers are rich in vitamin C.', category: 'food' },
  { id: 'f041', en: 'mushroom', zh: '蘑菇', phonetic: '/ˈmʌʃ.ruːm/', example: 'She sauteed mushrooms with garlic butter.', category: 'food' },
  { id: 'f042', en: 'corn', zh: '玉米', phonetic: '/kɔːrn/', example: 'We grilled corn on the cob at the barbecue.', category: 'food' },
  { id: 'f043', en: 'celery', zh: '芹菜', phonetic: '/ˈsel.ər.i/', example: 'Celery sticks with peanut butter make a crunchy snack.', category: 'food' },
  { id: 'f044', en: 'cabbage', zh: '卷心菜', phonetic: '/ˈkæb.ɪdʒ/', example: 'She made coleslaw with shredded cabbage.', category: 'food' },
  { id: 'f045', en: 'cauliflower', zh: '花椰菜', phonetic: '/ˈkɑː.lɪˌflaʊ.ər/', example: 'Roasted cauliflower is surprisingly delicious.', category: 'food' },
  { id: 'f046', en: 'eggplant', zh: '茄子', phonetic: '/ˈeɡ.plænt/', example: 'Eggplant parmesan is an Italian classic.', category: 'food' },
  { id: 'f047', en: 'zucchini', zh: '西葫芦', phonetic: '/zuːˈkiː.ni/', example: 'Spiralized zucchini makes a low-carb pasta.', category: 'food' },
  { id: 'f048', en: 'pumpkin', zh: '南瓜', phonetic: '/ˈpʌmp.kɪn/', example: 'Pumpkin pie is a Thanksgiving tradition.', category: 'food' },
  { id: 'f049', en: 'radish', zh: '萝卜', phonetic: '/ˈræd.ɪʃ/', example: 'Radishes add a peppery crunch to tacos.', category: 'food' },
  { id: 'f050', en: 'green bean', zh: '四季豆', phonetic: '/ɡriːn biːn/', example: 'She blanched the green beans before stir-frying.', category: 'food' },
  { id: 'f051', en: 'pea', zh: '豌豆', phonetic: '/piː/', example: 'Frozen peas cook in just a few minutes.', category: 'food' },
  { id: 'f052', en: 'asparagus', zh: '芦笋', phonetic: '/əˈspær.ə.ɡəs/', example: 'Grilled asparagus tastes great with lemon.', category: 'food' },
  { id: 'f053', en: 'kale', zh: '羽衣甘蓝', phonetic: '/keɪl/', example: 'Kale chips are a crispy, healthy snack.', category: 'food' },
  { id: 'f054', en: 'beet', zh: '甜菜根', phonetic: '/biːt/', example: 'Roasted beets add vibrant color to salads.', category: 'food' },
  { id: 'f055', en: 'sweet potato', zh: '红薯', phonetic: '/swiːt pəˈteɪ.toʊ/', example: 'Baked sweet potato is both sweet and savory.', category: 'food' },
  { id: 'f056', en: 'leek', zh: '韭葱', phonetic: '/liːk/', example: 'Leek and potato soup is a comforting dish.', category: 'food' },
  { id: 'f057', en: 'okra', zh: '秋葵', phonetic: '/ˈoʊ.krə/', example: 'Fried okra is a Southern favorite.', category: 'food' },
  { id: 'f058', en: 'turnip', zh: '芜菁', phonetic: '/ˈtɜːr.nɪp/', example: 'Turnip adds heartiness to winter stews.', category: 'food' },
  { id: 'f059', en: 'artichoke', zh: '洋蓟', phonetic: '/ˈɑːr.tɪˌtʃoʊk/', example: 'Steam the artichoke until the leaves pull off easily.', category: 'food' },
  { id: 'f060', en: 'Brussels sprout', zh: '抱子甘蓝', phonetic: '/ˈbrʌs.əlz spraʊt/', example: 'Roasted Brussels sprouts are crispy and delicious.', category: 'food' },

  // ========== MEAT & SEAFOOD (f061-f090) ==========
  { id: 'f061', en: 'chicken', zh: '鸡肉', phonetic: '/ˈtʃɪk.ɪn/', example: 'We had roast chicken for Sunday dinner.', category: 'food' },
  { id: 'f062', en: 'beef', zh: '牛肉', phonetic: '/biːf/', example: 'Beef stew simmers for hours on the stove.', category: 'food' },
  { id: 'f063', en: 'pork', zh: '猪肉', phonetic: '/pɔːrk/', example: 'Pork chops sizzled in the cast-iron pan.', category: 'food' },
  { id: 'f064', en: 'lamb', zh: '羊肉', phonetic: '/læm/', example: 'Grilled lamb chops with rosemary are divine.', category: 'food' },
  { id: 'f065', en: 'fish', zh: '鱼', phonetic: '/fɪʃ/', example: 'We caught fresh fish at the lake.', category: 'food' },
  { id: 'f066', en: 'shrimp', zh: '虾', phonetic: '/ʃrɪmp/', example: 'Garlic shrimp cooks in just three minutes.', category: 'food' },
  { id: 'f067', en: 'crab', zh: '螃蟹', phonetic: '/kræb/', example: 'Crab legs are messy but worth the effort.', category: 'food' },
  { id: 'f068', en: 'lobster', zh: '龙虾', phonetic: '/ˈlɑːb.stər/', example: 'Lobster bisque is a rich, creamy soup.', category: 'food' },
  { id: 'f069', en: 'salmon', zh: '三文鱼', phonetic: '/ˈsæm.ən/', example: 'Pan-seared salmon goes well with dill sauce.', category: 'food' },
  { id: 'f070', en: 'tuna', zh: '金枪鱼', phonetic: '/ˈtuː.nə/', example: 'Tuna salad sandwiches are quick to make.', category: 'food' },
  { id: 'f071', en: 'bacon', zh: '培根', phonetic: '/ˈbeɪ.kən/', example: 'The smell of bacon woke everyone up.', category: 'food' },
  { id: 'f072', en: 'ham', zh: '火腿', phonetic: '/hæm/', example: 'Honey-glazed ham is a holiday centerpiece.', category: 'food' },
  { id: 'f073', en: 'sausage', zh: '香肠', phonetic: '/ˈsɑː.sɪdʒ/', example: 'Sausage and peppers is a classic combo.', category: 'food' },
  { id: 'f074', en: 'turkey', zh: '火鸡', phonetic: '/ˈtɜːr.ki/', example: 'Grandma carves the turkey every Thanksgiving.', category: 'food' },
  { id: 'f075', en: 'duck', zh: '鸭肉', phonetic: '/dʌk/', example: 'Crispy duck pancakes are a Beijing specialty.', category: 'food' },
  { id: 'f076', en: 'oyster', zh: '牡蛎', phonetic: '/ˈɔɪ.stər/', example: 'Fresh oysters on the half shell are a delicacy.', category: 'food' },
  { id: 'f077', en: 'mussel', zh: '青口贝', phonetic: '/ˈmʌs.əl/', example: 'Mussels steamed in white wine are delicious.', category: 'food' },
  { id: 'f078', en: 'clam', zh: '蛤蜊', phonetic: '/klæm/', example: 'Clam chowder is perfect on a cold day.', category: 'food' },
  { id: 'f079', en: 'squid', zh: '鱿鱼', phonetic: '/skwɪd/', example: 'Fried calamari is made from squid rings.', category: 'food' },
  { id: 'f080', en: 'scallop', zh: '扇贝', phonetic: '/ˈskæl.əp/', example: 'Seared scallops need a very hot pan.', category: 'food' },
  { id: 'f081', en: 'steak', zh: '牛排', phonetic: '/steɪk/', example: 'He ordered his steak medium rare.', category: 'food' },
  { id: 'f082', en: 'ribs', zh: '排骨', phonetic: '/rɪbz/', example: 'Barbecue ribs fell right off the bone.', category: 'food' },
  { id: 'f083', en: 'chop', zh: '肉排', phonetic: '/tʃɑːp/', example: 'Lamb chops were seasoned with fresh herbs.', category: 'food' },
  { id: 'f084', en: 'fillet', zh: '鱼片', phonetic: '/fɪˈleɪ/', example: 'A salmon fillet cooks quickly under the broiler.', category: 'food' },
  { id: 'f085', en: 'ground beef', zh: '碎牛肉', phonetic: '/ɡraʊnd biːf/', example: 'Brown the ground beef before adding sauce.', category: 'food' },
  { id: 'f086', en: 'roast', zh: '烤肉', phonetic: '/roʊst/', example: 'Sunday roast is a British tradition.', category: 'food' },
  { id: 'f087', en: 'meatball', zh: '肉丸', phonetic: '/ˈmiːt.bɑːl/', example: 'She rolled the meatballs by hand.', category: 'food' },
  { id: 'f088', en: 'wing', zh: '鸡翅', phonetic: '/wɪŋ/', example: 'Buffalo wings are spicy and tangy.', category: 'food' },
  { id: 'f089', en: 'drumstick', zh: '鸡腿', phonetic: '/ˈdrʌm.stɪk/', example: 'The kids fought over the last drumstick.', category: 'food' },
  { id: 'f090', en: 'trout', zh: '鳟鱼', phonetic: '/traʊt/', example: 'Pan-fried trout with almonds is a classic.', category: 'food' },

  // ========== DRINKS (f091-f120) ==========
  { id: 'f091', en: 'water', zh: '水', phonetic: '/ˈwɑː.t̬ɚ/', example: 'Drink eight glasses of water each day.', category: 'food' },
  { id: 'f092', en: 'tea', zh: '茶', phonetic: '/tiː/', example: 'She brewed a pot of green tea.', category: 'food' },
  { id: 'f093', en: 'coffee', zh: '咖啡', phonetic: '/ˈkɑː.fi/', example: 'He starts every morning with black coffee.', category: 'food' },
  { id: 'f094', en: 'milk', zh: '牛奶', phonetic: '/mɪlk/', example: 'Warm milk helps me fall asleep.', category: 'food' },
  { id: 'f095', en: 'juice', zh: '果汁', phonetic: '/dʒuːs/', example: 'Freshly squeezed orange juice tastes best.', category: 'food' },
  { id: 'f096', en: 'soda', zh: '汽水', phonetic: '/ˈsoʊ.də/', example: 'She ordered a soda with extra ice.', category: 'food' },
  { id: 'f097', en: 'wine', zh: '葡萄酒', phonetic: '/waɪn/', example: 'Red wine pairs well with steak.', category: 'food' },
  { id: 'f098', en: 'beer', zh: '啤酒', phonetic: '/bɪr/', example: 'They shared a cold beer after work.', category: 'food' },
  { id: 'f099', en: 'lemonade', zh: '柠檬水', phonetic: '/ˌlem.əˈneɪd/', example: 'Homemade lemonade is sweet and tart.', category: 'food' },
  { id: 'f100', en: 'smoothie', zh: '冰沙奶昔', phonetic: '/ˈsmuː.ði/', example: 'She blended a berry smoothie for breakfast.', category: 'food' },
  { id: 'f101', en: 'cocktail', zh: '鸡尾酒', phonetic: '/ˈkɑːk.teɪl/', example: 'The bartender shook a fancy cocktail.', category: 'food' },
  { id: 'f102', en: 'champagne', zh: '香槟', phonetic: '/ʃæmˈpeɪn/', example: 'They popped champagne to celebrate.', category: 'food' },
  { id: 'f103', en: 'hot chocolate', zh: '热巧克力', phonetic: '/hɑːt ˈtʃɑːk.lət/', example: 'Hot chocolate with marshmallows is so cozy.', category: 'food' },
  { id: 'f104', en: 'milkshake', zh: '奶昔', phonetic: '/ˈmɪlk.ʃeɪk/', example: 'The strawberry milkshake was thick and creamy.', category: 'food' },
  { id: 'f105', en: 'iced tea', zh: '冰茶', phonetic: '/aɪst tiː/', example: 'Unsweetened iced tea is refreshing in summer.', category: 'food' },
  { id: 'f106', en: 'espresso', zh: '浓缩咖啡', phonetic: '/esˈpres.oʊ/', example: 'A double espresso gives me an energy boost.', category: 'food' },
  { id: 'f107', en: 'latte', zh: '拿铁', phonetic: '/ˈlɑː.teɪ/', example: 'She ordered a vanilla latte with oat milk.', category: 'food' },
  { id: 'f108', en: 'cocoa', zh: '可可', phonetic: '/ˈkoʊ.koʊ/', example: 'Cocoa powder gives brownies their rich flavor.', category: 'food' },
  { id: 'f109', en: 'cider', zh: '苹果酒', phonetic: '/ˈsaɪ.dər/', example: 'Hot apple cider is a fall favorite.', category: 'food' },
  { id: 'f110', en: 'broth', zh: '高汤', phonetic: '/brɑːθ/', example: 'Chicken broth is the base for many soups.', category: 'food' },
  { id: 'f111', en: 'yogurt drink', zh: '酸奶饮品', phonetic: '/ˈjoʊ.ɡərt drɪŋk/', example: 'A cold yogurt drink cools you down fast.', category: 'food' },
  { id: 'f112', en: 'soy milk', zh: '豆浆', phonetic: '/sɔɪ mɪlk/', example: 'Soy milk is a popular dairy alternative.', category: 'food' },
  { id: 'f113', en: 'almond milk', zh: '杏仁奶', phonetic: '/ˈɑː.mənd mɪlk/', example: 'Almond milk has a mild, nutty taste.', category: 'food' },
  { id: 'f114', en: 'mineral water', zh: '矿泉水', phonetic: '/ˈmɪn.ər.əl ˈwɑː.t̬ɚ/', example: 'Sparkling mineral water is served with lemon.', category: 'food' },
  { id: 'f115', en: 'punch', zh: '宾治酒', phonetic: '/pʌntʃ/', example: 'Fruit punch was served at the party.', category: 'food' },
  { id: 'f116', en: 'liqueur', zh: '利口酒', phonetic: '/lɪˈkɜːr/', example: 'Orange liqueur adds depth to the cake.', category: 'food' },
  { id: 'f117', en: 'spirits', zh: '烈酒', phonetic: '/ˈspɪr.ɪts/', example: 'Spirits have a higher alcohol content than wine.', category: 'food' },
  { id: 'f118', en: 'cola', zh: '可乐', phonetic: '/ˈkoʊ.lə/', example: 'Cola is fizzy and sweet.', category: 'food' },
  { id: 'f119', en: 'tonic', zh: '汤力水', phonetic: '/ˈtɑː.nɪk/', example: 'Gin and tonic is a classic cocktail.', category: 'food' },
  { id: 'f120', en: 'bubble tea', zh: '珍珠奶茶', phonetic: '/ˈbʌb.əl tiː/', example: 'Bubble tea has chewy tapioca pearls at the bottom.', category: 'food' },

  // ========== COOKING VERBS (f121-f150) ==========
  { id: 'f121', en: 'cook', zh: '烹饪', phonetic: '/kʊk/', example: 'She loves to cook Italian food.', category: 'food' },
  { id: 'f122', en: 'boil', zh: '煮沸', phonetic: '/bɔɪl/', example: 'Boil the water before adding the pasta.', category: 'food' },
  { id: 'f123', en: 'fry', zh: '煎炸', phonetic: '/fraɪ/', example: 'Fry the eggs in a little butter.', category: 'food' },
  { id: 'f124', en: 'bake', zh: '烘烤', phonetic: '/beɪk/', example: 'She bakes fresh bread every weekend.', category: 'food' },
  { id: 'f125', en: 'roast', zh: '烤', phonetic: '/roʊst/', example: 'Roast the chicken at 375 degrees for an hour.', category: 'food' },
  { id: 'f126', en: 'grill', zh: '烧烤', phonetic: '/ɡrɪl/', example: 'We grilled burgers in the backyard.', category: 'food' },
  { id: 'f127', en: 'steam', zh: '蒸', phonetic: '/stiːm/', example: 'Steam the dumplings for about ten minutes.', category: 'food' },
  { id: 'f128', en: 'stir', zh: '搅拌', phonetic: '/stɜːr/', example: 'Stir the sauce constantly to prevent lumps.', category: 'food' },
  { id: 'f129', en: 'chop', zh: '切碎', phonetic: '/tʃɑːp/', example: 'Chop the onions into fine pieces.', category: 'food' },
  { id: 'f130', en: 'slice', zh: '切片', phonetic: '/slaɪs/', example: 'Slice the bread with a serrated knife.', category: 'food' },
  { id: 'f131', en: 'peel', zh: '削皮', phonetic: '/piːl/', example: 'Peel the potatoes before boiling them.', category: 'food' },
  { id: 'f132', en: 'grate', zh: '磨碎', phonetic: '/ɡreɪt/', example: 'Grate some Parmesan cheese over the pasta.', category: 'food' },
  { id: 'f133', en: 'mix', zh: '混合', phonetic: '/mɪks/', example: 'Mix the flour and sugar together.', category: 'food' },
  { id: 'f134', en: 'whisk', zh: '搅打', phonetic: '/wɪsk/', example: 'Whisk the eggs until they are frothy.', category: 'food' },
  { id: 'f135', en: 'pour', zh: '倒', phonetic: '/pɔːr/', example: 'Pour the batter into the greased pan.', category: 'food' },
  { id: 'f136', en: 'knead', zh: '揉', phonetic: '/niːd/', example: 'Knead the dough until it becomes smooth.', category: 'food' },
  { id: 'f137', en: 'simmer', zh: '煨炖', phonetic: '/ˈsɪm.ər/', example: 'Let the soup simmer on low heat.', category: 'food' },
  { id: 'f138', en: 'saute', zh: '嫩煎', phonetic: '/soʊˈteɪ/', example: 'Saute the mushrooms in garlic butter.', category: 'food' },
  { id: 'f139', en: 'blend', zh: '搅拌混合', phonetic: '/blend/', example: 'Blend the ingredients until smooth.', category: 'food' },
  { id: 'f140', en: 'marinate', zh: '腌制', phonetic: '/ˈmer.ɪ.neɪt/', example: 'Marinate the chicken overnight for best flavor.', category: 'food' },
  { id: 'f141', en: 'season', zh: '调味', phonetic: '/ˈsiː.zən/', example: 'Season the dish with salt and pepper.', category: 'food' },
  { id: 'f142', en: 'taste', zh: '品尝', phonetic: '/teɪst/', example: 'Taste the sauce before adding more salt.', category: 'food' },
  { id: 'f143', en: 'serve', zh: '上菜', phonetic: '/sɜːrv/', example: 'Serve the soup while it is hot.', category: 'food' },
  { id: 'f144', en: 'heat', zh: '加热', phonetic: '/hiːt/', example: 'Heat the oil in a large skillet.', category: 'food' },
  { id: 'f145', en: 'broil', zh: '炙烤', phonetic: '/brɔɪl/', example: 'Broil the fish for about five minutes per side.', category: 'food' },
  { id: 'f146', en: 'toast', zh: '烤面包', phonetic: '/toʊst/', example: 'Toast the bread until golden brown.', category: 'food' },
  { id: 'f147', en: 'dice', zh: '切丁', phonetic: '/daɪs/', example: 'Dice the carrots into small cubes.', category: 'food' },
  { id: 'f148', en: 'mince', zh: '剁碎', phonetic: '/mɪns/', example: 'Mince the garlic cloves finely.', category: 'food' },
  { id: 'f149', en: 'crush', zh: '压碎', phonetic: '/krʌʃ/', example: 'Crush the crackers and sprinkle them on top.', category: 'food' },
  { id: 'f150', en: 'melt', zh: '融化', phonetic: '/melt/', example: 'Melt the chocolate in a double boiler.', category: 'food' },

  // ========== KITCHEN ITEMS (f151-f180) ==========
  { id: 'f151', en: 'pan', zh: '平底锅', phonetic: '/pæn/', example: 'Heat a non-stick pan over medium heat.', category: 'food' },
  { id: 'f152', en: 'pot', zh: '锅', phonetic: '/pɑːt/', example: 'Fill the pot with water and bring it to a boil.', category: 'food' },
  { id: 'f153', en: 'knife', zh: '刀', phonetic: '/naɪf/', example: 'A sharp knife makes chopping much easier.', category: 'food' },
  { id: 'f154', en: 'spoon', zh: '勺子', phonetic: '/spuːn/', example: 'Use a wooden spoon to stir the stew.', category: 'food' },
  { id: 'f155', en: 'fork', zh: '叉子', phonetic: '/fɔːrk/', example: 'Set the table with a knife and fork.', category: 'food' },
  { id: 'f156', en: 'plate', zh: '盘子', phonetic: '/pleɪt/', example: 'She arranged the food beautifully on the plate.', category: 'food' },
  { id: 'f157', en: 'bowl', zh: '碗', phonetic: '/boʊl/', example: 'Mix the ingredients in a large bowl.', category: 'food' },
  { id: 'f158', en: 'cup', zh: '杯子', phonetic: '/kʌp/', example: 'Pour a cup of hot tea for your guest.', category: 'food' },
  { id: 'f159', en: 'glass', zh: '玻璃杯', phonetic: '/ɡlæs/', example: 'She filled the glass with ice-cold water.', category: 'food' },
  { id: 'f160', en: 'oven', zh: '烤箱', phonetic: '/ˈʌv.ən/', example: 'Preheat the oven to 350 degrees.', category: 'food' },
  { id: 'f161', en: 'stove', zh: '炉灶', phonetic: '/stoʊv/', example: 'The soup is simmering on the stove.', category: 'food' },
  { id: 'f162', en: 'fridge', zh: '冰箱', phonetic: '/frɪdʒ/', example: 'Keep the milk in the fridge to stay fresh.', category: 'food' },
  { id: 'f163', en: 'cutting board', zh: '砧板', phonetic: '/ˈkʌt.ɪŋ bɔːrd/', example: 'Use a separate cutting board for raw meat.', category: 'food' },
  { id: 'f164', en: 'spatula', zh: '锅铲', phonetic: '/ˈspætʃ.ə.lə/', example: 'Flip the pancakes with a wide spatula.', category: 'food' },
  { id: 'f165', en: 'ladle', zh: '长柄勺', phonetic: '/ˈleɪ.dəl/', example: 'Use a ladle to serve the soup.', category: 'food' },
  { id: 'f166', en: 'colander', zh: '滤水盆', phonetic: '/ˈkɑː.lən.dər/', example: 'Drain the pasta in a colander.', category: 'food' },
  { id: 'f167', en: 'grater', zh: '刨丝器', phonetic: '/ˈɡreɪ.tər/', example: 'Run the cheese over the grater carefully.', category: 'food' },
  { id: 'f168', en: 'peeler', zh: '削皮刀', phonetic: '/ˈpiː.lər/', example: 'A sharp peeler removes carrot skin quickly.', category: 'food' },
  { id: 'f169', en: 'measuring cup', zh: '量杯', phonetic: '/ˈmeʒ.ər.ɪŋ kʌp/', example: 'Use a measuring cup for precise baking.', category: 'food' },
  { id: 'f170', en: 'blender', zh: '搅拌机', phonetic: '/ˈblen.dər/', example: 'Put the fruit into the blender for a smoothie.', category: 'food' },
  { id: 'f171', en: 'toaster', zh: '烤面包机', phonetic: '/ˈtoʊ.stər/', example: 'The toaster popped up two golden slices.', category: 'food' },
  { id: 'f172', en: 'microwave', zh: '微波炉', phonetic: '/ˈmaɪ.kroʊ.weɪv/', example: 'Reheat leftovers in the microwave for two minutes.', category: 'food' },
  { id: 'f173', en: 'kettle', zh: '水壶', phonetic: '/ˈket.əl/', example: 'The electric kettle boiled in under a minute.', category: 'food' },
  { id: 'f174', en: 'dish', zh: '碟子', phonetic: '/dɪʃ/', example: 'She placed the hot dish on a trivet.', category: 'food' },
  { id: 'f175', en: 'tray', zh: '托盘', phonetic: '/treɪ/', example: 'He carried the tea on a wooden tray.', category: 'food' },
  { id: 'f176', en: 'napkin', zh: '餐巾', phonetic: '/ˈnæp.kɪn/', example: 'Place a napkin beside each plate.', category: 'food' },
  { id: 'f177', en: 'pitcher', zh: '水罐', phonetic: '/ˈpɪtʃ.ər/', example: 'Fill the pitcher with iced lemonade.', category: 'food' },
  { id: 'f178', en: 'thermos', zh: '保温瓶', phonetic: '/ˈθɜːr.məs/', example: 'The thermos keeps coffee hot all day.', category: 'food' },
  { id: 'f179', en: 'apron', zh: '围裙', phonetic: '/ˈeɪ.prən/', example: 'She tied on an apron before cooking.', category: 'food' },
  { id: 'f180', en: 'whisk', zh: '打蛋器', phonetic: '/wɪsk/', example: 'Beat the eggs with a wire whisk.', category: 'food' },

  // ========== TASTE DESCRIPTIONS (f181-f210) ==========
  { id: 'f181', en: 'sweet', zh: '甜的', phonetic: '/swiːt/', example: 'This cake is too sweet for my taste.', category: 'food' },
  { id: 'f182', en: 'sour', zh: '酸的', phonetic: '/saʊr/', example: 'The lemon tastes very sour.', category: 'food' },
  { id: 'f183', en: 'salty', zh: '咸的', phonetic: '/ˈsɑːl.ti/', example: 'These chips are too salty.', category: 'food' },
  { id: 'f184', en: 'bitter', zh: '苦的', phonetic: '/ˈbɪt̬.ɚ/', example: 'Dark chocolate has a slightly bitter taste.', category: 'food' },
  { id: 'f185', en: 'spicy', zh: '辣的', phonetic: '/ˈspaɪ.si/', example: 'The curry was so spicy it made me sweat.', category: 'food' },
  { id: 'f186', en: 'savory', zh: '咸香的', phonetic: '/ˈseɪ.vər.i/', example: 'The savory pie was filled with meat and gravy.', category: 'food' },
  { id: 'f187', en: 'fresh', zh: '新鲜的', phonetic: '/freʃ/', example: 'Fresh herbs make any dish taste better.', category: 'food' },
  { id: 'f188', en: 'rich', zh: '浓郁的', phonetic: '/rɪtʃ/', example: 'The chocolate mousse was incredibly rich.', category: 'food' },
  { id: 'f189', en: 'bland', zh: '清淡无味的', phonetic: '/blænd/', example: 'The soup was a bit bland and needed salt.', category: 'food' },
  { id: 'f190', en: 'creamy', zh: '奶滑的', phonetic: '/ˈkriː.mi/', example: 'The risotto was perfectly creamy.', category: 'food' },
  { id: 'f191', en: 'crispy', zh: '酥脆的', phonetic: '/ˈkrɪs.pi/', example: 'The fried chicken skin was wonderfully crispy.', category: 'food' },
  { id: 'f192', en: 'tender', zh: '嫩的', phonetic: '/ˈten.dər/', example: 'The slow-cooked beef was fall-apart tender.', category: 'food' },
  { id: 'f193', en: 'juicy', zh: '多汁的', phonetic: '/ˈdʒuː.si/', example: 'This steak is so juicy and flavorful.', category: 'food' },
  { id: 'f194', en: 'chewy', zh: '有嚼劲的', phonetic: '/ˈtʃuː.i/', example: 'The bagel was dense and chewy.', category: 'food' },
  { id: 'f195', en: 'crunchy', zh: '嘎嘣脆的', phonetic: '/ˈkrʌn.tʃi/', example: 'Granola adds a crunchy texture to yogurt.', category: 'food' },
  { id: 'f196', en: 'greasy', zh: '油腻的', phonetic: '/ˈɡriː.si/', example: 'The pizza left a greasy spot on the napkin.', category: 'food' },
  { id: 'f197', en: 'tangy', zh: '浓烈酸味的', phonetic: '/ˈtæŋ.i/', example: 'The yogurt dressing has a nice tangy flavor.', category: 'food' },
  { id: 'f198', en: 'smoky', zh: '烟熏味的', phonetic: '/ˈsmoʊ.ki/', example: 'Barbecue sauce has a smoky, sweet taste.', category: 'food' },
  { id: 'f199', en: 'mild', zh: '温和的', phonetic: '/maɪld/', example: 'The mild cheddar is perfect for kids.', category: 'food' },
  { id: 'f200', en: 'hot', zh: '辣的/烫的', phonetic: '/hɑːt/', example: 'Be careful, the soup is very hot.', category: 'food' },
  { id: 'f201', en: 'cold', zh: '冷的', phonetic: '/koʊld/', example: 'I prefer cold pasta salad in the summer.', category: 'food' },
  { id: 'f202', en: 'warm', zh: '温的', phonetic: '/wɔːrm/', example: 'Serve the bread warm from the oven.', category: 'food' },
  { id: 'f203', en: 'delicious', zh: '美味的', phonetic: '/dɪˈlɪʃ.əs/', example: 'This homemade lasagna is absolutely delicious.', category: 'food' },
  { id: 'f204', en: 'tasty', zh: '好吃的', phonetic: '/ˈteɪ.sti/', example: 'That was a really tasty meal.', category: 'food' },
  { id: 'f205', en: 'yummy', zh: '好吃的（口语）', phonetic: '/ˈjʌm.i/', example: 'Yummy! This ice cream is the best.', category: 'food' },
  { id: 'f206', en: 'disgusting', zh: '恶心的', phonetic: '/dɪsˈɡʌs.tɪŋ/', example: 'The spoiled milk smelled disgusting.', category: 'food' },
  { id: 'f207', en: 'burnt', zh: '烧焦的', phonetic: '/bɜːrnt/', example: 'The toast was burnt and inedible.', category: 'food' },
  { id: 'f208', en: 'raw', zh: '生的', phonetic: '/rɑː/', example: 'Sushi is made with raw fish.', category: 'food' },
  { id: 'f209', en: 'overcooked', zh: '煮过头的', phonetic: '/ˌoʊ.vərˈkʊkt/', example: 'The broccoli was overcooked and mushy.', category: 'food' },
  { id: 'f210', en: 'seasoned', zh: '调好味的', phonetic: '/ˈsiː.zənd/', example: 'The steak was perfectly seasoned with herbs.', category: 'food' },

  // ========== MEALS & OTHER FOOD (f211-f250) ==========
  { id: 'f211', en: 'breakfast', zh: '早餐', phonetic: '/ˈbrek.fəst/', example: 'I had eggs and toast for breakfast.', category: 'food' },
  { id: 'f212', en: 'lunch', zh: '午餐', phonetic: '/lʌntʃ/', example: 'We met for lunch at a cozy cafe.', category: 'food' },
  { id: 'f213', en: 'dinner', zh: '晚餐', phonetic: '/ˈdɪn.ər/', example: 'Dinner will be ready in half an hour.', category: 'food' },
  { id: 'f214', en: 'snack', zh: '零食', phonetic: '/snæk/', example: 'I grabbed a quick snack before the meeting.', category: 'food' },
  { id: 'f215', en: 'dessert', zh: '甜点', phonetic: '/dɪˈzɜːrt/', example: 'Shall we order dessert after the meal?', category: 'food' },
  { id: 'f216', en: 'appetizer', zh: '开胃菜', phonetic: '/ˈæp.ə.taɪ.zər/', example: 'We shared a few appetizers before the main course.', category: 'food' },
  { id: 'f217', en: 'soup', zh: '汤', phonetic: '/suːp/', example: 'Chicken noodle soup is my comfort food.', category: 'food' },
  { id: 'f218', en: 'salad', zh: '沙拉', phonetic: '/ˈsæl.əd/', example: 'She tossed a fresh garden salad with vinaigrette.', category: 'food' },
  { id: 'f219', en: 'sandwich', zh: '三明治', phonetic: '/ˈsæn.wɪtʃ/', example: 'He packed a turkey sandwich for his lunch.', category: 'food' },
  { id: 'f220', en: 'bread', zh: '面包', phonetic: '/bred/', example: 'Freshly baked bread smells incredible.', category: 'food' },
  { id: 'f221', en: 'rice', zh: '米饭', phonetic: '/raɪs/', example: 'Steamed rice is a staple in many cuisines.', category: 'food' },
  { id: 'f222', en: 'pasta', zh: '意大利面', phonetic: '/ˈpɑː.stə/', example: 'She cooked pasta with tomato and basil.', category: 'food' },
  { id: 'f223', en: 'noodle', zh: '面条', phonetic: '/ˈnuː.dəl/', example: 'Ramen noodles are a popular Japanese dish.', category: 'food' },
  { id: 'f224', en: 'egg', zh: '鸡蛋', phonetic: '/eɡ/', example: 'She cracked two eggs into the hot skillet.', category: 'food' },
  { id: 'f225', en: 'cheese', zh: '奶酪', phonetic: '/tʃiːz/', example: 'Swiss cheese has distinctive holes.', category: 'food' },
  { id: 'f226', en: 'butter', zh: '黄油', phonetic: '/ˈbʌt̬.ɚ/', example: 'Spread butter on warm toast.', category: 'food' },
  { id: 'f227', en: 'sauce', zh: '酱汁', phonetic: '/sɑːs/', example: 'The secret is in the homemade tomato sauce.', category: 'food' },
  { id: 'f228', en: 'oil', zh: '油', phonetic: '/ɔɪl/', example: 'Drizzle olive oil over the salad.', category: 'food' },
  { id: 'f229', en: 'vinegar', zh: '醋', phonetic: '/ˈvɪn.ə.ɡər/', example: 'Balsamic vinegar adds sweetness to the dressing.', category: 'food' },
  { id: 'f230', en: 'salt', zh: '盐', phonetic: '/sɑːlt/', example: 'Add a pinch of salt to the boiling water.', category: 'food' },
  { id: 'f231', en: 'pepper', zh: '胡椒', phonetic: '/ˈpep.ər/', example: 'Freshly ground black pepper adds a nice kick.', category: 'food' },
  { id: 'f232', en: 'sugar', zh: '糖', phonetic: '/ˈʃʊɡ.ər/', example: 'Do you take sugar in your coffee?', category: 'food' },
  { id: 'f233', en: 'honey', zh: '蜂蜜', phonetic: '/ˈhʌn.i/', example: 'Drizzle honey over the Greek yogurt.', category: 'food' },
  { id: 'f234', en: 'jam', zh: '果酱', phonetic: '/dʒæm/', example: 'Strawberry jam goes perfectly on scones.', category: 'food' },
  { id: 'f235', en: 'flour', zh: '面粉', phonetic: '/flaʊr/', example: 'Sift the flour before making the cake batter.', category: 'food' },
  { id: 'f236', en: 'cake', zh: '蛋糕', phonetic: '/keɪk/', example: 'She baked a chocolate cake for his birthday.', category: 'food' },
  { id: 'f237', en: 'pie', zh: '派', phonetic: '/paɪ/', example: 'Apple pie with vanilla ice cream is heavenly.', category: 'food' },
  { id: 'f238', en: 'cookie', zh: '曲奇饼', phonetic: '/ˈkʊk.i/', example: 'The kids decorated sugar cookies with frosting.', category: 'food' },
  { id: 'f239', en: 'ice cream', zh: '冰淇淋', phonetic: '/aɪs kriːm/', example: 'Mint chocolate chip is his favorite ice cream.', category: 'food' },
  { id: 'f240', en: 'chocolate', zh: '巧克力', phonetic: '/ˈtʃɑːk.lət/', example: 'Dark chocolate contains less sugar than milk chocolate.', category: 'food' },
  { id: 'f241', en: 'cereal', zh: '谷物麦片', phonetic: '/ˈsɪr.i.əl/', example: 'A bowl of cereal is a quick breakfast.', category: 'food' },
  { id: 'f242', en: 'yogurt', zh: '酸奶', phonetic: '/ˈjoʊ.ɡərt/', example: 'Greek yogurt is thick and protein-rich.', category: 'food' },
  { id: 'f243', en: 'pancake', zh: '煎饼', phonetic: '/ˈpæn.keɪk/', example: 'We stacked the pancakes high and added syrup.', category: 'food' },
  { id: 'f244', en: 'waffle', zh: '华夫饼', phonetic: '/ˈwɑː.fəl/', example: 'Crispy waffles with fresh berries are a treat.', category: 'food' },
  { id: 'f245', en: 'doughnut', zh: '甜甜圈', phonetic: '/ˈdoʊ.nʌt/', example: 'Glazed doughnuts are his guilty pleasure.', category: 'food' },
  { id: 'f246', en: 'muffin', zh: '松饼', phonetic: '/ˈmʌf.ɪn/', example: 'Blueberry muffins are perfect with morning coffee.', category: 'food' },
  { id: 'f247', en: 'burger', zh: '汉堡', phonetic: '/ˈbɜːr.ɡər/', example: 'He ordered a cheeseburger with extra pickles.', category: 'food' },
  { id: 'f248', en: 'pizza', zh: '比萨饼', phonetic: '/ˈpiːt.sə/', example: 'We ordered a large pepperoni pizza to share.', category: 'food' },
  { id: 'f249', en: 'sushi', zh: '寿司', phonetic: '/ˈsuː.ʃi/', example: 'Sushi chefs train for years to perfect their craft.', category: 'food' },
  { id: 'f250', en: 'taco', zh: '墨西哥卷饼', phonetic: '/ˈtɑː.koʊ/', example: 'Street tacos with fresh salsa are amazing.', category: 'food' }
];

// -- js/data/words_daily.js --
const WORDS_DAILY = [
  // ========== HOUSEHOLD ITEMS (d001-d030) ==========
  { id: 'd001', en: 'bed', zh: '床', phonetic: '/bed/', example: 'She made the bed as soon as she woke up.', category: 'daily' },
  { id: 'd002', en: 'table', zh: '桌子', phonetic: '/ˈteɪ.bəl/', example: 'We sat around the dinner table together.', category: 'daily' },
  { id: 'd003', en: 'chair', zh: '椅子', phonetic: '/tʃer/', example: 'He pulled out a chair and sat down.', category: 'daily' },
  { id: 'd004', en: 'sofa', zh: '沙发', phonetic: '/ˈsoʊ.fə/', example: 'They relaxed on the sofa watching TV.', category: 'daily' },
  { id: 'd005', en: 'desk', zh: '书桌', phonetic: '/desk/', example: 'She keeps her laptop on the desk.', category: 'daily' },
  { id: 'd006', en: 'lamp', zh: '灯', phonetic: '/læmp/', example: 'Turn on the lamp, it is getting dark.', category: 'daily' },
  { id: 'd007', en: 'mirror', zh: '镜子', phonetic: '/ˈmɪr.ər/', example: 'She checked her reflection in the mirror.', category: 'daily' },
  { id: 'd008', en: 'clock', zh: '时钟', phonetic: '/klɑːk/', example: 'The clock on the wall struck midnight.', category: 'daily' },
  { id: 'd009', en: 'curtain', zh: '窗帘', phonetic: '/ˈkɜːr.tən/', example: 'She drew the curtains to let in sunlight.', category: 'daily' },
  { id: 'd010', en: 'carpet', zh: '地毯', phonetic: '/ˈkɑːr.pət/', example: 'The soft carpet felt warm under her feet.', category: 'daily' },
  { id: 'd011', en: 'pillow', zh: '枕头', phonetic: '/ˈpɪl.oʊ/', example: 'He fluffed the pillow before going to sleep.', category: 'daily' },
  { id: 'd012', en: 'blanket', zh: '毯子', phonetic: '/ˈblæŋ.kɪt/', example: 'She wrapped herself in a warm blanket.', category: 'daily' },
  { id: 'd013', en: 'towel', zh: '毛巾', phonetic: '/ˈtaʊ.əl/', example: 'Grab a clean towel from the bathroom.', category: 'daily' },
  { id: 'd014', en: 'shelf', zh: '架子', phonetic: '/ʃelf/', example: 'He put the books back on the shelf.', category: 'daily' },
  { id: 'd015', en: 'drawer', zh: '抽屉', phonetic: '/drɔːr/', example: 'The scissors are in the top drawer.', category: 'daily' },
  { id: 'd016', en: 'cabinet', zh: '橱柜', phonetic: '/ˈkæb.ɪ.nət/', example: 'She stored the dishes in the kitchen cabinet.', category: 'daily' },
  { id: 'd017', en: 'vase', zh: '花瓶', phonetic: '/veɪs/', example: 'Fresh flowers brightened the vase on the table.', category: 'daily' },
  { id: 'd018', en: 'candle', zh: '蜡烛', phonetic: '/ˈkæn.dəl/', example: 'She lit a scented candle for a cozy evening.', category: 'daily' },
  { id: 'd019', en: 'basket', zh: '篮子', phonetic: '/ˈbæs.kɪt/', example: 'She carried a basket of laundry upstairs.', category: 'daily' },
  { id: 'd020', en: 'hanger', zh: '衣架', phonetic: '/ˈhæŋ.ər/', example: 'Hang your coat on a hanger in the closet.', category: 'daily' },
  { id: 'd021', en: 'broom', zh: '扫帚', phonetic: '/bruːm/', example: 'Sweep the floor with the broom.', category: 'daily' },
  { id: 'd022', en: 'mop', zh: '拖把', phonetic: '/mɑːp/', example: 'She used the mop to clean up the spill.', category: 'daily' },
  { id: 'd023', en: 'vacuum', zh: '吸尘器', phonetic: '/ˈvæk.juːm/', example: 'He ran the vacuum across the living room.', category: 'daily' },
  { id: 'd024', en: 'bucket', zh: '水桶', phonetic: '/ˈbʌk.ɪt/', example: 'Fill the bucket with soapy water.', category: 'daily' },
  { id: 'd025', en: 'trash can', zh: '垃圾桶', phonetic: '/træʃ kæn/', example: 'Throw the wrapper in the trash can.', category: 'daily' },
  { id: 'd026', en: 'iron', zh: '熨斗', phonetic: '/ˈaɪ.ərn/', example: 'She ironed the wrinkles out of her shirt.', category: 'daily' },
  { id: 'd027', en: 'mat', zh: '垫子', phonetic: '/mæt/', example: 'Wipe your shoes on the mat before entering.', category: 'daily' },
  { id: 'd028', en: 'rug', zh: '小地毯', phonetic: '/rʌɡ/', example: 'A colorful rug brightened the entryway.', category: 'daily' },
  { id: 'd029', en: 'key', zh: '钥匙', phonetic: '/kiː/', example: 'I cannot find my house key anywhere.', category: 'daily' },
  { id: 'd030', en: 'doorknob', zh: '门把手', phonetic: '/ˈdɔːr.nɑːb/', example: 'She turned the doorknob and stepped inside.', category: 'daily' },

  // ========== ROUTINES (d031-d055) ==========
  { id: 'd031', en: 'wake up', zh: '醒来', phonetic: '/weɪk ʌp/', example: 'I wake up at seven every morning.', category: 'daily' },
  { id: 'd032', en: 'get up', zh: '起床', phonetic: '/ɡet ʌp/', example: 'He got up and stretched his arms.', category: 'daily' },
  { id: 'd033', en: 'shower', zh: '淋浴', phonetic: '/ˈʃaʊ.ər/', example: 'She takes a quick shower before breakfast.', category: 'daily' },
  { id: 'd034', en: 'brush', zh: '刷', phonetic: '/brʌʃ/', example: 'Brush your teeth twice a day.', category: 'daily' },
  { id: 'd035', en: 'wash', zh: '洗', phonetic: '/wɑːʃ/', example: 'Wash your hands before eating.', category: 'daily' },
  { id: 'd036', en: 'dress', zh: '穿衣', phonetic: '/dres/', example: 'He dressed quickly and ran out the door.', category: 'daily' },
  { id: 'd037', en: 'eat', zh: '吃', phonetic: '/iːt/', example: 'We eat dinner together as a family.', category: 'daily' },
  { id: 'd038', en: 'leave', zh: '离开', phonetic: '/liːv/', example: 'She leaves the house at eight sharp.', category: 'daily' },
  { id: 'd039', en: 'arrive', zh: '到达', phonetic: '/əˈraɪv/', example: 'He arrives at the office before nine.', category: 'daily' },
  { id: 'd040', en: 'work', zh: '工作', phonetic: '/wɜːrk/', example: 'She works from home on Fridays.', category: 'daily' },
  { id: 'd041', en: 'study', zh: '学习', phonetic: '/ˈstʌd.i/', example: 'He studies English for an hour each night.', category: 'daily' },
  { id: 'd042', en: 'rest', zh: '休息', phonetic: '/rest/', example: 'Take a short rest after lunch.', category: 'daily' },
  { id: 'd043', en: 'exercise', zh: '锻炼', phonetic: '/ˈek.sər.saɪz/', example: 'She exercises at the gym three times a week.', category: 'daily' },
  { id: 'd044', en: 'sleep', zh: '睡觉', phonetic: '/sliːp/', example: 'I need at least seven hours of sleep.', category: 'daily' },
  { id: 'd045', en: 'nap', zh: '小睡', phonetic: '/næp/', example: 'A short nap in the afternoon boosts energy.', category: 'daily' },
  { id: 'd046', en: 'stretch', zh: '伸展', phonetic: '/stretʃ/', example: 'She stretched her legs after sitting all day.', category: 'daily' },
  { id: 'd047', en: 'yawn', zh: '打哈欠', phonetic: '/jɑːn/', example: 'He yawned loudly during the long meeting.', category: 'daily' },
  { id: 'd048', en: 'meditate', zh: '冥想', phonetic: '/ˈmed.ɪ.teɪt/', example: 'She meditates for ten minutes each morning.', category: 'daily' },
  { id: 'd049', en: 'journal', zh: '写日记', phonetic: '/ˈdʒɜːr.nəl/', example: 'He journals his thoughts before bed.', category: 'daily' },
  { id: 'd050', en: 'plan', zh: '计划', phonetic: '/plæn/', example: 'She plans her week every Sunday evening.', category: 'daily' },
  { id: 'd051', en: 'commute', zh: '通勤', phonetic: '/kəˈmjuːt/', example: 'His commute takes about forty minutes.', category: 'daily' },
  { id: 'd052', en: 'read', zh: '阅读', phonetic: '/riːd/', example: 'She reads a few pages before turning off the light.', category: 'daily' },
  { id: 'd053', en: 'watch', zh: '观看', phonetic: '/wɑːtʃ/', example: 'We watched a movie after dinner.', category: 'daily' },
  { id: 'd054', en: 'listen', zh: '听', phonetic: '/ˈlɪs.ən/', example: 'He listens to podcasts on his way to work.', category: 'daily' },
  { id: 'd055', en: 'unwind', zh: '放松', phonetic: '/ʌnˈwaɪnd/', example: 'She unwinds with a cup of tea in the evening.', category: 'daily' },

  // ========== CHORES (d056-d080) ==========
  { id: 'd056', en: 'clean', zh: '清洁', phonetic: '/kliːn/', example: 'We clean the house every Saturday morning.', category: 'daily' },
  { id: 'd057', en: 'dry', zh: '晾干', phonetic: '/draɪ/', example: 'Hang the clothes outside to dry.', category: 'daily' },
  { id: 'd058', en: 'fold', zh: '折叠', phonetic: '/foʊld/', example: 'She folded the laundry neatly.', category: 'daily' },
  { id: 'd059', en: 'sweep', zh: '打扫', phonetic: '/swiːp/', example: 'Sweep the kitchen floor after cooking.', category: 'daily' },
  { id: 'd060', en: 'mop', zh: '拖地', phonetic: '/mɑːp/', example: 'He mopped the bathroom floor until it sparkled.', category: 'daily' },
  { id: 'd061', en: 'dust', zh: '除尘', phonetic: '/dʌst/', example: 'She dusted the bookshelves with a cloth.', category: 'daily' },
  { id: 'd062', en: 'scrub', zh: '擦洗', phonetic: '/skrʌb/', example: 'Scrub the bathtub until the stains are gone.', category: 'daily' },
  { id: 'd063', en: 'wipe', zh: '擦拭', phonetic: '/waɪp/', example: 'Wipe the counter with a damp cloth.', category: 'daily' },
  { id: 'd064', en: 'polish', zh: '擦亮', phonetic: '/ˈpɑː.lɪʃ/', example: 'He polished his shoes until they gleamed.', category: 'daily' },
  { id: 'd065', en: 'organize', zh: '整理', phonetic: '/ˈɔːr.ɡə.naɪz/', example: 'She organized her desk drawers by category.', category: 'daily' },
  { id: 'd066', en: 'tidy', zh: '收拾', phonetic: '/ˈtaɪ.di/', example: 'Tidy up your room before going out.', category: 'daily' },
  { id: 'd067', en: 'declutter', zh: '清理杂物', phonetic: '/diːˈklʌt.ər/', example: 'She decided to declutter the garage this weekend.', category: 'daily' },
  { id: 'd068', en: 'mow', zh: '割草', phonetic: '/moʊ/', example: 'He mows the lawn every other week.', category: 'daily' },
  { id: 'd069', en: 'rake', zh: '耙', phonetic: '/reɪk/', example: 'Rake the fallen leaves into a pile.', category: 'daily' },
  { id: 'd070', en: 'shovel', zh: '铲', phonetic: '/ˈʃʌv.əl/', example: 'He shoveled snow from the driveway.', category: 'daily' },
  { id: 'd071', en: 'water', zh: '浇水', phonetic: '/ˈwɑː.t̬ɚ/', example: 'She waters the plants every morning.', category: 'daily' },
  { id: 'd072', en: 'feed', zh: '喂食', phonetic: '/fiːd/', example: 'Feed the cat before you leave for work.', category: 'daily' },
  { id: 'd073', en: 'garbage', zh: '垃圾', phonetic: '/ˈɡɑːr.bɪdʒ/', example: 'Take out the garbage before it overflows.', category: 'daily' },
  { id: 'd074', en: 'recycle', zh: '回收', phonetic: '/riːˈsaɪ.kəl/', example: 'Remember to recycle the plastic bottles.', category: 'daily' },
  { id: 'd075', en: 'laundry', zh: '洗衣', phonetic: '/ˈlɑːn.dri/', example: 'She does laundry every Sunday afternoon.', category: 'daily' },
  { id: 'd076', en: 'dishes', zh: '碗碟', phonetic: '/ˈdɪʃ.ɪz/', example: 'Whose turn is it to wash the dishes?', category: 'daily' },
  { id: 'd077', en: 'grocery', zh: '杂货', phonetic: '/ˈɡroʊ.sər.i/', example: 'She went grocery shopping after work.', category: 'daily' },
  { id: 'd078', en: 'paint', zh: '粉刷', phonetic: '/peɪnt/', example: 'They painted the bedroom a soft blue.', category: 'daily' },
  { id: 'd079', en: 'repair', zh: '修理', phonetic: '/rɪˈper/', example: 'He repaired the leaky faucet himself.', category: 'daily' },
  { id: 'd080', en: 'replace', zh: '更换', phonetic: '/rɪˈpleɪs/', example: 'Replace the light bulb in the hallway.', category: 'daily' },

  // ========== WEATHER (d081-d110) ==========
  { id: 'd081', en: 'sunny', zh: '晴天的', phonetic: '/ˈsʌn.i/', example: 'It is sunny and bright outside today.', category: 'daily' },
  { id: 'd082', en: 'rainy', zh: '下雨的', phonetic: '/ˈreɪ.ni/', example: 'Bring an umbrella, it is a rainy day.', category: 'daily' },
  { id: 'd083', en: 'cloudy', zh: '多云的', phonetic: '/ˈklaʊ.di/', example: 'The sky is cloudy and gray this morning.', category: 'daily' },
  { id: 'd084', en: 'windy', zh: '有风的', phonetic: '/ˈwɪn.di/', example: 'It is too windy to go sailing today.', category: 'daily' },
  { id: 'd085', en: 'snowy', zh: '下雪的', phonetic: '/ˈsnoʊ.i/', example: 'The snowy landscape looked like a postcard.', category: 'daily' },
  { id: 'd086', en: 'stormy', zh: '暴风雨的', phonetic: '/ˈstɔːr.mi/', example: 'The stormy weather kept everyone indoors.', category: 'daily' },
  { id: 'd087', en: 'foggy', zh: '有雾的', phonetic: '/ˈfɑː.ɡi/', example: 'Drive carefully, it is very foggy.', category: 'daily' },
  { id: 'd088', en: 'humid', zh: '潮湿的', phonetic: '/ˈhjuː.mɪd/', example: 'The air feels hot and humid today.', category: 'daily' },
  { id: 'd089', en: 'cold', zh: '冷的', phonetic: '/koʊld/', example: 'It is freezing cold outside, wear a coat.', category: 'daily' },
  { id: 'd090', en: 'hot', zh: '热的', phonetic: '/hɑːt/', example: 'It is so hot that the pavement is sizzling.', category: 'daily' },
  { id: 'd091', en: 'warm', zh: '温暖的', phonetic: '/wɔːrm/', example: 'A warm breeze blew through the open window.', category: 'daily' },
  { id: 'd092', en: 'cool', zh: '凉爽的', phonetic: '/kuːl/', example: 'The cool evening air was refreshing.', category: 'daily' },
  { id: 'd093', en: 'freezing', zh: '极冷的', phonetic: '/ˈfriː.zɪŋ/', example: 'My hands are freezing without gloves.', category: 'daily' },
  { id: 'd094', en: 'mild', zh: '温和的', phonetic: '/maɪld/', example: 'The weather is mild and pleasant in spring.', category: 'daily' },
  { id: 'd095', en: 'dry', zh: '干燥的', phonetic: '/draɪ/', example: 'The desert air is extremely dry.', category: 'daily' },
  { id: 'd096', en: 'wet', zh: '湿的', phonetic: '/wet/', example: 'The grass is still wet from the morning dew.', category: 'daily' },
  { id: 'd097', en: 'drizzle', zh: '毛毛雨', phonetic: '/ˈdrɪz.əl/', example: 'A light drizzle started as we walked home.', category: 'daily' },
  { id: 'd098', en: 'breeze', zh: '微风', phonetic: '/briːz/', example: 'A gentle breeze rustled the leaves.', category: 'daily' },
  { id: 'd099', en: 'thunder', zh: '雷声', phonetic: '/ˈθʌn.dər/', example: 'Loud thunder woke me up last night.', category: 'daily' },
  { id: 'd100', en: 'lightning', zh: '闪电', phonetic: '/ˈlaɪt.nɪŋ/', example: 'Lightning flashed across the dark sky.', category: 'daily' },
  { id: 'd101', en: 'hail', zh: '冰雹', phonetic: '/heɪl/', example: 'Hail the size of marbles dented the car.', category: 'daily' },
  { id: 'd102', en: 'frost', zh: '霜', phonetic: '/frɑːst/', example: 'Frost covered the car windshield this morning.', category: 'daily' },
  { id: 'd103', en: 'rainbow', zh: '彩虹', phonetic: '/ˈreɪn.boʊ/', example: 'A beautiful rainbow appeared after the storm.', category: 'daily' },
  { id: 'd104', en: 'forecast', zh: '天气预报', phonetic: '/ˈfɔːr.kæst/', example: 'The forecast says rain all weekend.', category: 'daily' },
  { id: 'd105', en: 'temperature', zh: '温度', phonetic: '/ˈtem.pər.ə.tʃər/', example: 'The temperature dropped below zero overnight.', category: 'daily' },
  { id: 'd106', en: 'climate', zh: '气候', phonetic: '/ˈklaɪ.mət/', example: 'The climate here is warm and tropical.', category: 'daily' },
  { id: 'd107', en: 'degree', zh: '度', phonetic: '/dɪˈɡriː/', example: 'It is thirty degrees outside today.', category: 'daily' },
  { id: 'd108', en: 'Celsius', zh: '摄氏度', phonetic: '/ˈsel.si.əs/', example: 'Water boils at one hundred degrees Celsius.', category: 'daily' },
  { id: 'd109', en: 'Fahrenheit', zh: '华氏度', phonetic: '/ˈfer.ən.haɪt/', example: 'In Fahrenheit, water freezes at thirty-two degrees.', category: 'daily' },
  { id: 'd110', en: 'overcast', zh: '阴天的', phonetic: '/ˌoʊ.vərˈkæst/', example: 'An overcast sky threatened rain all day.', category: 'daily' },

  // ========== TIME EXPRESSIONS (d111-d140) ==========
  { id: 'd111', en: 'morning', zh: '早上', phonetic: '/ˈmɔːr.nɪŋ/', example: 'I like to jog in the early morning.', category: 'daily' },
  { id: 'd112', en: 'afternoon', zh: '下午', phonetic: '/ˌæf.tərˈnuːn/', example: 'Let us meet in the afternoon for coffee.', category: 'daily' },
  { id: 'd113', en: 'evening', zh: '傍晚', phonetic: '/ˈiːv.nɪŋ/', example: 'We took a walk in the cool evening air.', category: 'daily' },
  { id: 'd114', en: 'night', zh: '夜晚', phonetic: '/naɪt/', example: 'The stars shine brightly at night.', category: 'daily' },
  { id: 'd115', en: 'midnight', zh: '午夜', phonetic: '/ˈmɪd.naɪt/', example: 'He worked until midnight to finish the project.', category: 'daily' },
  { id: 'd116', en: 'noon', zh: '正午', phonetic: '/nuːn/', example: 'Lunch is served at noon sharp.', category: 'daily' },
  { id: 'd117', en: 'today', zh: '今天', phonetic: '/təˈdeɪ/', example: 'What is on your schedule for today?', category: 'daily' },
  { id: 'd118', en: 'tomorrow', zh: '明天', phonetic: '/təˈmɑːr.oʊ/', example: 'Tomorrow is a brand new day.', category: 'daily' },
  { id: 'd119', en: 'yesterday', zh: '昨天', phonetic: '/ˈjes.tər.deɪ/', example: 'I finished the report yesterday afternoon.', category: 'daily' },
  { id: 'd120', en: 'weekday', zh: '工作日', phonetic: '/ˈwiːk.deɪ/', example: 'Buses run more often on weekdays.', category: 'daily' },
  { id: 'd121', en: 'weekend', zh: '周末', phonetic: '/ˈwiːk.end/', example: 'We are going camping this weekend.', category: 'daily' },
  { id: 'd122', en: 'hour', zh: '小时', phonetic: '/aʊr/', example: 'The meeting lasted for over an hour.', category: 'daily' },
  { id: 'd123', en: 'minute', zh: '分钟', phonetic: '/ˈmɪn.ɪt/', example: 'Wait here for a minute, I will be right back.', category: 'daily' },
  { id: 'd124', en: 'second', zh: '秒', phonetic: '/ˈsek.ənd/', example: 'She finished the race by a single second.', category: 'daily' },
  { id: 'd125', en: 'early', zh: '早的', phonetic: '/ˈɜːr.li/', example: 'He arrived early to get a good seat.', category: 'daily' },
  { id: 'd126', en: 'late', zh: '晚的', phonetic: '/leɪt/', example: 'She apologized for being late to the meeting.', category: 'daily' },
  { id: 'd127', en: 'soon', zh: '很快', phonetic: '/suːn/', example: 'Dinner will be ready soon.', category: 'daily' },
  { id: 'd128', en: 'later', zh: '以后', phonetic: '/ˈleɪ.tər/', example: 'I will call you later this evening.', category: 'daily' },
  { id: 'd129', en: 'ago', zh: '以前', phonetic: '/əˈɡoʊ/', example: 'We moved here three years ago.', category: 'daily' },
  { id: 'd130', en: 'already', zh: '已经', phonetic: '/ɑːlˈred.i/', example: 'She has already finished her homework.', category: 'daily' },
  { id: 'd131', en: 'yet', zh: '还/尚', phonetic: '/jet/', example: 'Have you eaten lunch yet?', category: 'daily' },
  { id: 'd132', en: 'still', zh: '仍然', phonetic: '/stɪl/', example: 'It is still raining outside.', category: 'daily' },
  { id: 'd133', en: 'always', zh: '总是', phonetic: '/ˈɑːl.weɪz/', example: 'She always drinks coffee in the morning.', category: 'daily' },
  { id: 'd134', en: 'never', zh: '从不', phonetic: '/ˈnev.ər/', example: 'He never forgets to lock the front door.', category: 'daily' },
  { id: 'd135', en: 'sometimes', zh: '有时', phonetic: '/ˈsʌm.taɪmz/', example: 'Sometimes I walk to work instead of driving.', category: 'daily' },
  { id: 'd136', en: 'often', zh: '经常', phonetic: '/ˈɑːf.ən/', example: 'She often visits her grandmother on Sundays.', category: 'daily' },
  { id: 'd137', en: 'rarely', zh: '很少', phonetic: '/ˈrer.li/', example: 'He rarely eats fast food.', category: 'daily' },
  { id: 'd138', en: 'usually', zh: '通常', phonetic: '/ˈjuː.ʒu.ə.li/', example: 'I usually wake up around six thirty.', category: 'daily' },
  { id: 'd139', en: 'now', zh: '现在', phonetic: '/naʊ/', example: 'What are you doing right now?', category: 'daily' },
  { id: 'd140', en: 'then', zh: '然后', phonetic: '/ðen/', example: 'Brush your teeth, then go to bed.', category: 'daily' },

  // ========== TRANSPORTATION (d141-d170) ==========
  { id: 'd141', en: 'car', zh: '汽车', phonetic: '/kɑːr/', example: 'She drives a small red car.', category: 'daily' },
  { id: 'd142', en: 'bus', zh: '公共汽车', phonetic: '/bʌs/', example: 'The bus arrives every fifteen minutes.', category: 'daily' },
  { id: 'd143', en: 'train', zh: '火车', phonetic: '/treɪn/', example: 'We took an overnight train to the coast.', category: 'daily' },
  { id: 'd144', en: 'subway', zh: '地铁', phonetic: '/ˈsʌb.weɪ/', example: 'The subway is the fastest way downtown.', category: 'daily' },
  { id: 'd145', en: 'taxi', zh: '出租车', phonetic: '/ˈtæk.si/', example: 'We hailed a taxi outside the airport.', category: 'daily' },
  { id: 'd146', en: 'bike', zh: '自行车', phonetic: '/baɪk/', example: 'He rides his bike to school every day.', category: 'daily' },
  { id: 'd147', en: 'motorcycle', zh: '摩托车', phonetic: '/ˈmoʊ.tərˌsaɪ.kəl/', example: 'The motorcycle roared down the highway.', category: 'daily' },
  { id: 'd148', en: 'airplane', zh: '飞机', phonetic: '/ˈer.pleɪn/', example: 'The airplane took off smoothly into the clouds.', category: 'daily' },
  { id: 'd149', en: 'boat', zh: '船', phonetic: '/boʊt/', example: 'They rowed a small boat across the lake.', category: 'daily' },
  { id: 'd150', en: 'ship', zh: '轮船', phonetic: '/ʃɪp/', example: 'The cargo ship docked at the port.', category: 'daily' },
  { id: 'd151', en: 'ferry', zh: '渡轮', phonetic: '/ˈfer.i/', example: 'We took the ferry to the island.', category: 'daily' },
  { id: 'd152', en: 'tram', zh: '有轨电车', phonetic: '/træm/', example: 'The tram runs through the city center.', category: 'daily' },
  { id: 'd153', en: 'scooter', zh: '踏板车', phonetic: '/ˈskuː.tər/', example: 'Electric scooters are popular for short trips.', category: 'daily' },
  { id: 'd154', en: 'helicopter', zh: '直升机', phonetic: '/ˈhel.ɪˌkɑːp.tər/', example: 'A helicopter hovered above the building.', category: 'daily' },
  { id: 'd155', en: 'truck', zh: '卡车', phonetic: '/trʌk/', example: 'The delivery truck arrived early this morning.', category: 'daily' },
  { id: 'd156', en: 'van', zh: '厢式货车', phonetic: '/væn/', example: 'They loaded the moving van with furniture.', category: 'daily' },
  { id: 'd157', en: 'ambulance', zh: '救护车', phonetic: '/ˈæm.bjə.ləns/', example: 'An ambulance rushed to the scene of the accident.', category: 'daily' },
  { id: 'd158', en: 'fire truck', zh: '消防车', phonetic: '/faɪr trʌk/', example: 'The fire truck arrived with its siren blaring.', category: 'daily' },
  { id: 'd159', en: 'traffic', zh: '交通', phonetic: '/ˈtræf.ɪk/', example: 'There is heavy traffic on the highway.', category: 'daily' },
  { id: 'd160', en: 'road', zh: '道路', phonetic: '/roʊd/', example: 'The road was closed for construction.', category: 'daily' },
  { id: 'd161', en: 'street', zh: '街道', phonetic: '/striːt/', example: 'The children played on the quiet street.', category: 'daily' },
  { id: 'd162', en: 'highway', zh: '高速公路', phonetic: '/ˈhaɪ.weɪ/', example: 'The highway stretches across the entire state.', category: 'daily' },
  { id: 'd163', en: 'bridge', zh: '桥', phonetic: '/brɪdʒ/', example: 'The old bridge spans the wide river.', category: 'daily' },
  { id: 'd164', en: 'tunnel', zh: '隧道', phonetic: '/ˈtʌn.əl/', example: 'The train entered a long dark tunnel.', category: 'daily' },
  { id: 'd165', en: 'station', zh: '车站', phonetic: '/ˈsteɪ.ʃən/', example: 'Meet me at the train station at five.', category: 'daily' },
  { id: 'd166', en: 'stop', zh: '站点', phonetic: '/stɑːp/', example: 'Get off at the next bus stop.', category: 'daily' },
  { id: 'd167', en: 'airport', zh: '机场', phonetic: '/ˈer.pɔːrt/', example: 'We arrived at the airport two hours early.', category: 'daily' },
  { id: 'd168', en: 'port', zh: '港口', phonetic: '/pɔːrt/', example: 'The ship sailed into the port at dawn.', category: 'daily' },
  { id: 'd169', en: 'parking', zh: '停车', phonetic: '/ˈpɑːr.kɪŋ/', example: 'Parking is free on weekends.', category: 'daily' },
  { id: 'd170', en: 'crosswalk', zh: '人行横道', phonetic: '/ˈkrɑːs.wɑːk/', example: 'Wait for the signal before using the crosswalk.', category: 'daily' },

  // ========== COMMON VERBS (d171-d210) ==========
  { id: 'd171', en: 'go', zh: '去', phonetic: '/ɡoʊ/', example: 'Let us go to the park this afternoon.', category: 'daily' },
  { id: 'd172', en: 'come', zh: '来', phonetic: '/kʌm/', example: 'Come here and take a look at this.', category: 'daily' },
  { id: 'd173', en: 'see', zh: '看见', phonetic: '/siː/', example: 'I can see the mountains from my window.', category: 'daily' },
  { id: 'd174', en: 'hear', zh: '听见', phonetic: '/hɪr/', example: 'Did you hear that strange noise?', category: 'daily' },
  { id: 'd175', en: 'say', zh: '说', phonetic: '/seɪ/', example: 'What did you say to her?', category: 'daily' },
  { id: 'd176', en: 'tell', zh: '告诉', phonetic: '/tel/', example: 'Tell me a story before bedtime.', category: 'daily' },
  { id: 'd177', en: 'ask', zh: '问', phonetic: '/æsk/', example: 'Feel free to ask if you need help.', category: 'daily' },
  { id: 'd178', en: 'answer', zh: '回答', phonetic: '/ˈæn.sər/', example: 'She answered the phone on the first ring.', category: 'daily' },
  { id: 'd179', en: 'give', zh: '给', phonetic: '/ɡɪv/', example: 'Give me a call when you arrive.', category: 'daily' },
  { id: 'd180', en: 'take', zh: '拿/带', phonetic: '/teɪk/', example: 'Take an umbrella, it might rain.', category: 'daily' },
  { id: 'd181', en: 'make', zh: '做/制作', phonetic: '/meɪk/', example: 'She knows how to make delicious soup.', category: 'daily' },
  { id: 'd182', en: 'do', zh: '做', phonetic: '/duː/', example: 'What do you do for a living?', category: 'daily' },
  { id: 'd183', en: 'have', zh: '有', phonetic: '/hæv/', example: 'I have two brothers and one sister.', category: 'daily' },
  { id: 'd184', en: 'get', zh: '得到', phonetic: '/ɡet/', example: 'Where did you get that beautiful scarf?', category: 'daily' },
  { id: 'd185', en: 'put', zh: '放', phonetic: '/pʊt/', example: 'Put your keys on the hook by the door.', category: 'daily' },
  { id: 'd186', en: 'bring', zh: '带来', phonetic: '/brɪŋ/', example: 'Bring a dessert to the dinner party.', category: 'daily' },
  { id: 'd187', en: 'buy', zh: '买', phonetic: '/baɪ/', example: 'She went to buy groceries after work.', category: 'daily' },
  { id: 'd188', en: 'sell', zh: '卖', phonetic: '/sel/', example: 'They sell fresh produce at the farmers market.', category: 'daily' },
  { id: 'd189', en: 'pay', zh: '支付', phonetic: '/peɪ/', example: 'I will pay for the meal this time.', category: 'daily' },
  { id: 'd190', en: 'find', zh: '找到', phonetic: '/faɪnd/', example: 'I cannot find my glasses anywhere.', category: 'daily' },
  { id: 'd191', en: 'lose', zh: '丢失', phonetic: '/luːz/', example: 'Try not to lose your ticket.', category: 'daily' },
  { id: 'd192', en: 'keep', zh: '保持', phonetic: '/kiːp/', example: 'Keep the change, it is yours.', category: 'daily' },
  { id: 'd193', en: 'hold', zh: '握住', phonetic: '/hoʊld/', example: 'Hold my hand while we cross the street.', category: 'daily' },
  { id: 'd194', en: 'open', zh: '打开', phonetic: '/ˈoʊ.pən/', example: 'Open the window to let in some fresh air.', category: 'daily' },
  { id: 'd195', en: 'close', zh: '关上', phonetic: '/kloʊz/', example: 'Close the door quietly, the baby is sleeping.', category: 'daily' },
  { id: 'd196', en: 'start', zh: '开始', phonetic: '/stɑːrt/', example: 'Let us start the meeting without delay.', category: 'daily' },
  { id: 'd197', en: 'stop', zh: '停止', phonetic: '/stɑːp/', example: 'Stop talking and listen to the instructions.', category: 'daily' },
  { id: 'd198', en: 'finish', zh: '完成', phonetic: '/ˈfɪn.ɪʃ/', example: 'I need to finish this report by five.', category: 'daily' },
  { id: 'd199', en: 'begin', zh: '开始', phonetic: '/bɪˈɡɪn/', example: 'The concert will begin in ten minutes.', category: 'daily' },
  { id: 'd200', en: 'end', zh: '结束', phonetic: '/end/', example: 'The movie ended with a surprising twist.', category: 'daily' },
  { id: 'd201', en: 'think', zh: '想/思考', phonetic: '/θɪŋk/', example: 'I think you are absolutely right about this.', category: 'daily' },
  { id: 'd202', en: 'know', zh: '知道', phonetic: '/noʊ/', example: 'Do you know how to get to the museum?', category: 'daily' },
  { id: 'd203', en: 'want', zh: '想要', phonetic: '/wɑːnt/', example: 'I want to learn how to play the guitar.', category: 'daily' },
  { id: 'd204', en: 'need', zh: '需要', phonetic: '/niːd/', example: 'You need to drink more water every day.', category: 'daily' },
  { id: 'd205', en: 'like', zh: '喜欢', phonetic: '/laɪk/', example: 'I really like spending time with my family.', category: 'daily' },
  { id: 'd206', en: 'love', zh: '爱', phonetic: '/lʌv/', example: 'She loves walking her dog in the park.', category: 'daily' },
  { id: 'd207', en: 'hate', zh: '讨厌', phonetic: '/heɪt/', example: 'He hates getting stuck in traffic.', category: 'daily' },
  { id: 'd208', en: 'try', zh: '尝试', phonetic: '/traɪ/', example: 'Try this dish, it is a local specialty.', category: 'daily' },
  { id: 'd209', en: 'help', zh: '帮助', phonetic: '/help/', example: 'Can you help me carry these bags?', category: 'daily' },
  { id: 'd210', en: 'wait', zh: '等待', phonetic: '/weɪt/', example: 'Wait here while I get the car keys.', category: 'daily' },

  // ========== CLOTHING (d211-d250) ==========
  { id: 'd211', en: 'shirt', zh: '衬衫', phonetic: '/ʃɜːrt/', example: 'He wore a crisp white shirt to the interview.', category: 'daily' },
  { id: 'd212', en: 'pants', zh: '裤子', phonetic: '/pænts/', example: 'These pants are too long, I need to hem them.', category: 'daily' },
  { id: 'd213', en: 'dress', zh: '连衣裙', phonetic: '/dres/', example: 'She wore a beautiful red dress to the party.', category: 'daily' },
  { id: 'd214', en: 'skirt', zh: '裙子', phonetic: '/skɜːrt/', example: 'The pleated skirt swirled as she danced.', category: 'daily' },
  { id: 'd215', en: 'jacket', zh: '夹克', phonetic: '/ˈdʒæk.ɪt/', example: 'Grab a light jacket, it might get chilly.', category: 'daily' },
  { id: 'd216', en: 'coat', zh: '外套', phonetic: '/koʊt/', example: 'She buttoned her wool coat against the wind.', category: 'daily' },
  { id: 'd217', en: 'sweater', zh: '毛衣', phonetic: '/ˈswet.ər/', example: 'Knit a warm sweater for the winter.', category: 'daily' },
  { id: 'd218', en: 'hoodie', zh: '连帽衫', phonetic: '/ˈhʊd.i/', example: 'He threw on a hoodie and went for a run.', category: 'daily' },
  { id: 'd219', en: 'T-shirt', zh: 'T恤', phonetic: '/ˈtiː.ʃɜːrt/', example: 'A plain white T-shirt goes with everything.', category: 'daily' },
  { id: 'd220', en: 'jeans', zh: '牛仔裤', phonetic: '/dʒiːnz/', example: 'She wears jeans almost every day.', category: 'daily' },
  { id: 'd221', en: 'shorts', zh: '短裤', phonetic: '/ʃɔːrts/', example: 'It is hot enough to wear shorts today.', category: 'daily' },
  { id: 'd222', en: 'suit', zh: '西装', phonetic: '/suːt/', example: 'He wore a tailored suit to the wedding.', category: 'daily' },
  { id: 'd223', en: 'tie', zh: '领带', phonetic: '/taɪ/', example: 'He loosened his tie after the long meeting.', category: 'daily' },
  { id: 'd224', en: 'scarf', zh: '围巾', phonetic: '/skɑːrf/', example: 'She wrapped a silk scarf around her neck.', category: 'daily' },
  { id: 'd225', en: 'hat', zh: '帽子', phonetic: '/hæt/', example: 'A wide-brimmed hat protects you from the sun.', category: 'daily' },
  { id: 'd226', en: 'cap', zh: '鸭舌帽', phonetic: '/kæp/', example: 'He wore a baseball cap backwards.', category: 'daily' },
  { id: 'd227', en: 'glove', zh: '手套', phonetic: '/ɡlʌv/', example: 'Leather gloves keep your hands warm in winter.', category: 'daily' },
  { id: 'd228', en: 'sock', zh: '袜子', phonetic: '/sɑːk/', example: 'He put on a fresh pair of socks.', category: 'daily' },
  { id: 'd229', en: 'shoe', zh: '鞋', phonetic: '/ʃuː/', example: 'She kicked off her shoes at the door.', category: 'daily' },
  { id: 'd230', en: 'boot', zh: '靴子', phonetic: '/buːt/', example: 'Rain boots are essential in the wet season.', category: 'daily' },
  { id: 'd231', en: 'sandal', zh: '凉鞋', phonetic: '/ˈsæn.dəl/', example: 'Leather sandals are perfect for the beach.', category: 'daily' },
  { id: 'd232', en: 'sneaker', zh: '运动鞋', phonetic: '/ˈsniː.kər/', example: 'She bought new sneakers for the gym.', category: 'daily' },
  { id: 'd233', en: 'belt', zh: '腰带', phonetic: '/belt/', example: 'He tightened his belt by one notch.', category: 'daily' },
  { id: 'd234', en: 'pajamas', zh: '睡衣', phonetic: '/pəˈdʒɑː.məz/', example: 'She changed into her pajamas after dinner.', category: 'daily' },
  { id: 'd235', en: 'underwear', zh: '内衣', phonetic: '/ˈʌn.dər.wer/', example: 'Pack enough underwear for the trip.', category: 'daily' },
  { id: 'd236', en: 'swimsuit', zh: '泳衣', phonetic: '/ˈswɪm.suːt/', example: 'Do not forget your swimsuit for the pool.', category: 'daily' },
  { id: 'd237', en: 'raincoat', zh: '雨衣', phonetic: '/ˈreɪn.koʊt/', example: 'A yellow raincoat keeps you dry in a storm.', category: 'daily' },
  { id: 'd238', en: 'uniform', zh: '制服', phonetic: '/ˈjuː.nɪ.fɔːrm/', example: 'Students must wear a school uniform.', category: 'daily' },
  { id: 'd239', en: 'vest', zh: '背心', phonetic: '/vest/', example: 'He wore a down vest over his flannel shirt.', category: 'daily' },
  { id: 'd240', en: 'blouse', zh: '女式衬衫', phonetic: '/blaʊs/', example: 'A silk blouse is perfect for the office.', category: 'daily' },
  { id: 'd241', en: 'wallet', zh: '钱包', phonetic: '/ˈwɑː.lɪt/', example: 'He pulled his wallet out to pay the bill.', category: 'daily' },
  { id: 'd242', en: 'backpack', zh: '背包', phonetic: '/ˈbæk.pæk/', example: 'She packed her backpack for the hiking trip.', category: 'daily' },
  { id: 'd243', en: 'umbrella', zh: '雨伞', phonetic: '/ʌmˈbrel.ə/', example: 'Open your umbrella, it is starting to pour.', category: 'daily' },
  { id: 'd244', en: 'watch', zh: '手表', phonetic: '/wɑːtʃ/', example: 'He glanced at his watch to check the time.', category: 'daily' },
  { id: 'd245', en: 'ring', zh: '戒指', phonetic: '/rɪŋ/', example: 'She wore a silver ring on her index finger.', category: 'daily' },
  { id: 'd246', en: 'necklace', zh: '项链', phonetic: '/ˈnek.ləs/', example: 'The pearl necklace was a family heirloom.', category: 'daily' },
  { id: 'd247', en: 'earring', zh: '耳环', phonetic: '/ˈɪr.ɪŋ/', example: 'She lost one earring at the party.', category: 'daily' },
  { id: 'd248', en: 'glasses', zh: '眼镜', phonetic: '/ˈɡlæs.ɪz/', example: 'He pushed his glasses up his nose.', category: 'daily' },
  { id: 'd249', en: 'sunglasses', zh: '太阳镜', phonetic: '/ˈsʌnˌɡlæs.ɪz/', example: 'She put on her sunglasses in the bright sun.', category: 'daily' },
  { id: 'd250', en: 'mask', zh: '口罩', phonetic: '/mæsk/', example: 'He wore a mask on the crowded subway.', category: 'daily' }
];

// -- js/data/words_travel.js --
const WORDS_TRAVEL = [
  { id: 't001', en: 'airport', zh: '机场', phonetic: '/ˈeə.pɔːt/', example: 'We arrived at the airport early.', category: 'travel' },
  { id: 't002', en: 'flight', zh: '航班', phonetic: '/flaɪt/', example: 'The flight to London was delayed.', category: 'travel' },
  { id: 't003', en: 'ticket', zh: '票', phonetic: '/ˈtɪk.ɪt/', example: 'I bought a one-way ticket to Paris.', category: 'travel' },
  { id: 't004', en: 'passport', zh: '护照', phonetic: '/ˈpæs.pɔːt/', example: 'You need a valid passport to travel abroad.', category: 'travel' },
  { id: 't005', en: 'visa', zh: '签证', phonetic: '/ˈviː.zə/', example: 'She applied for a tourist visa.', category: 'travel' },
  { id: 't006', en: 'luggage', zh: '行李', phonetic: '/ˈlʌɡ.ɪdʒ/', example: 'My luggage was lost during the transfer.', category: 'travel' },
  { id: 't007', en: 'boarding', zh: '登机', phonetic: '/ˈbɔː.dɪŋ/', example: 'Boarding will begin in ten minutes.', category: 'travel' },
  { id: 't008', en: 'departure', zh: '出发', phonetic: '/dɪˈpɑː.tʃə/', example: 'The departure time is 8:30 AM.', category: 'travel' },
  { id: 't009', en: 'arrival', zh: '到达', phonetic: '/əˈraɪ.vəl/', example: 'Our arrival was delayed by bad weather.', category: 'travel' },
  { id: 't010', en: 'terminal', zh: '航站楼', phonetic: '/ˈtɜː.mɪ.nəl/', example: 'The international flights leave from Terminal 3.', category: 'travel' },
  { id: 't011', en: 'gate', zh: '登机口', phonetic: '/ɡeɪt/', example: 'Please proceed to Gate 12 immediately.', category: 'travel' },
  { id: 't012', en: 'check-in', zh: '办理登机', phonetic: '/ˈtʃek.ɪn/', example: 'Online check-in saves a lot of time.', category: 'travel' },
  { id: 't013', en: 'suitcase', zh: '行李箱', phonetic: '/ˈsuːt.keɪs/', example: 'She packed her suitcase the night before.', category: 'travel' },
  { id: 't014', en: 'carry-on', zh: '随身行李', phonetic: '/ˈkær.i.ɒn/', example: 'I only travel with a carry-on bag.', category: 'travel' },
  { id: 't015', en: 'baggage', zh: '行李', phonetic: '/ˈbæɡ.ɪdʒ/', example: 'How many pieces of baggage do you have?', category: 'travel' },
  { id: 't016', en: 'customs', zh: '海关', phonetic: '/ˈkʌs.təmz/', example: 'We went through customs after landing.', category: 'travel' },
  { id: 't017', en: 'immigration', zh: '入境检查', phonetic: '/ˌɪm.ɪˈɡreɪ.ʃən/', example: 'The immigration officer checked my passport.', category: 'travel' },
  { id: 't018', en: 'security', zh: '安检', phonetic: '/sɪˈkjʊə.rə.ti/', example: 'You must go through security before boarding.', category: 'travel' },
  { id: 't019', en: 'duty-free', zh: '免税', phonetic: '/ˌdjuː.tiˈfriː/', example: 'She bought perfume at the duty-free shop.', category: 'travel' },
  { id: 't020', en: 'runway', zh: '跑道', phonetic: '/ˈrʌn.weɪ/', example: 'The plane taxied slowly down the runway.', category: 'travel' },
  { id: 't021', en: 'airline', zh: '航空公司', phonetic: '/ˈeə.laɪn/', example: 'Which airline are you flying with?', category: 'travel' },
  { id: 't022', en: 'seatbelt', zh: '安全带', phonetic: '/ˈsiːt.belt/', example: 'Please fasten your seatbelt for takeoff.', category: 'travel' },
  { id: 't023', en: 'turbulence', zh: '颠簸气流', phonetic: '/ˈtɜː.bjə.ləns/', example: 'The flight experienced some turbulence over the ocean.', category: 'travel' },
  { id: 't024', en: 'stopover', zh: '中途停留', phonetic: '/ˈstɒp.əʊ.və/', example: 'We had a stopover in Dubai on the way to Tokyo.', category: 'travel' },
  { id: 't025', en: 'layover', zh: '转机停留', phonetic: '/ˈleɪ.əʊ.və/', example: 'There is a two-hour layover in Frankfurt.', category: 'travel' },
  { id: 't026', en: 'connecting', zh: '转机的', phonetic: '/kəˈnek.tɪŋ/', example: 'I missed my connecting flight to Rome.', category: 'travel' },
  { id: 't027', en: 'direct', zh: '直达的', phonetic: '/daɪˈrekt/', example: 'Is there a direct flight to Barcelona?', category: 'travel' },
  { id: 't028', en: 'one-way', zh: '单程', phonetic: '/ˌwʌnˈweɪ/', example: 'I booked a one-way ticket to Sydney.', category: 'travel' },
  { id: 't029', en: 'round-trip', zh: '往返', phonetic: '/ˌraʊndˈtrɪp/', example: 'A round-trip ticket is cheaper than two one-ways.', category: 'travel' },
  { id: 't030', en: 'runway', zh: '跑道', phonetic: '/ˈrʌn.weɪ/', example: 'The runway was closed due to heavy snow.', category: 'travel' },
  { id: 't031', en: 'pilot', zh: '飞行员', phonetic: '/ˈpaɪ.lət/', example: 'The pilot announced our estimated arrival time.', category: 'travel' },
  { id: 't032', en: 'stewardess', zh: '空姐', phonetic: '/ˌstjuː.əˈdes/', example: 'The stewardess offered us drinks and snacks.', category: 'travel' },
  { id: 't033', en: 'overhead', zh: '头顶上方的', phonetic: '/ˈəʊ.və.hed/', example: 'Please stow your bag in the overhead compartment.', category: 'travel' },
  { id: 't034', en: 'aisle', zh: '过道', phonetic: '/aɪl/', example: 'I prefer an aisle seat on long flights.', category: 'travel' },
  { id: 't035', en: 'window', zh: '窗户', phonetic: '/ˈwɪn.dəʊ/', example: 'She booked a window seat to enjoy the view.', category: 'travel' },
  { id: 't036', en: 'landing', zh: '着陆', phonetic: '/ˈlæn.dɪŋ/', example: 'The landing was smooth despite the strong winds.', category: 'travel' },
  { id: 't037', en: 'takeoff', zh: '起飞', phonetic: '/ˈteɪk.ɒf/', example: 'The takeoff was delayed by thirty minutes.', category: 'travel' },
  { id: 't038', en: 'airfare', zh: '机票价格', phonetic: '/ˈeə.feə/', example: 'I found a great deal on the airfare online.', category: 'travel' },
  { id: 't039', en: 'jet', zh: '喷气式飞机', phonetic: '/dʒet/', example: 'A private jet landed on the small airstrip.', category: 'travel' },
  { id: 't040', en: 'altitude', zh: '高度', phonetic: '/ˈæl.tɪ.tjuːd/', example: 'The plane reached a cruising altitude of 35,000 feet.', category: 'travel' },
  { id: 't041', en: 'train', zh: '火车', phonetic: '/treɪn/', example: 'We took the train from London to Edinburgh.', category: 'travel' },
  { id: 't042', en: 'platform', zh: '站台', phonetic: '/ˈplæt.fɔːm/', example: 'The train to Manchester departs from platform 4.', category: 'travel' },
  { id: 't043', en: 'railway', zh: '铁路', phonetic: '/ˈreɪl.weɪ/', example: 'The railway connects all major cities in the country.', category: 'travel' },
  { id: 't044', en: 'station', zh: '车站', phonetic: '/ˈsteɪ.ʃən/', example: 'The bus station is next to the railway station.', category: 'travel' },
  { id: 't045', en: 'timetable', zh: '时刻表', phonetic: '/ˈtaɪmˌteɪ.bəl/', example: 'Check the timetable before you leave home.', category: 'travel' },
  { id: 't046', en: 'express', zh: '特快列车', phonetic: '/ɪkˈspres/', example: 'The express train takes only two hours.', category: 'travel' },
  { id: 't047', en: 'compartment', zh: '车厢隔间', phonetic: '/kəmˈpɑːt.mənt/', example: 'We had a private compartment on the overnight train.', category: 'travel' },
  { id: 't048', en: 'coach', zh: '长途汽车', phonetic: '/kəʊtʃ/', example: 'A coach will take us from the hotel to the venue.', category: 'travel' },
  { id: 't049', en: 'subway', zh: '地铁', phonetic: '/ˈsʌb.weɪ/', example: 'The subway is the fastest way to get downtown.', category: 'travel' },
  { id: 't050', en: 'metro', zh: '地铁', phonetic: '/ˈmet.rəʊ/', example: 'The metro runs every five minutes during peak hours.', category: 'travel' },
  { id: 't051', en: 'passenger', zh: '乘客', phonetic: '/ˈpæs.ən.dʒə/', example: 'All passengers must have a valid ticket.', category: 'travel' },
  { id: 't052', en: 'conductor', zh: '列车员', phonetic: '/kənˈdʌk.tə/', example: 'The conductor checked our tickets on the train.', category: 'travel' },
  { id: 't053', en: 'fare', zh: '车费', phonetic: '/feə/', example: 'The bus fare is two dollars.', category: 'travel' },
  { id: 't054', en: 'delay', zh: '延误', phonetic: '/dɪˈleɪ/', example: 'There was a delay due to signal problems.', category: 'travel' },
  { id: 't055', en: 'cancellation', zh: '取消', phonetic: '/ˌkæn.səˈleɪ.ʃən/', example: 'Train cancellations are common during bad weather.', category: 'travel' },
  { id: 't056', en: 'reservation', zh: '预订', phonetic: '/ˌrez.əˈveɪ.ʃən/', example: 'I have a reservation for two seats on the 10 AM train.', category: 'travel' },
  { id: 't057', en: 'ticket', zh: '车票', phonetic: '/ˈtɪk.ɪt/', example: 'You can buy your ticket at the machine.', category: 'travel' },
  { id: 't058', en: 'first-class', zh: '一等座', phonetic: '/ˌfɜːst ˈklɑːs/', example: 'First-class tickets include complimentary meals.', category: 'travel' },
  { id: 't059', en: 'berth', zh: '卧铺', phonetic: '/bɜːθ/', example: 'We booked a sleeping berth on the night train.', category: 'travel' },
  { id: 't060', en: 'terminal', zh: '终点站', phonetic: '/ˈtɜː.mɪ.nəl/', example: 'This bus terminates at the central terminal.', category: 'travel' },
  { id: 't061', en: 'taxi', zh: '出租车', phonetic: '/ˈtæk.si/', example: 'We took a taxi from the station to the hotel.', category: 'travel' },
  { id: 't062', en: 'cab', zh: '出租车', phonetic: '/kæb/', example: 'Let us hail a cab on the main street.', category: 'travel' },
  { id: 't063', en: 'ride', zh: '乘车', phonetic: '/raɪd/', example: 'Can you give me a ride to the airport?', category: 'travel' },
  { id: 't064', en: 'driver', zh: '司机', phonetic: '/ˈdraɪ.və/', example: 'The driver helped us with our luggage.', category: 'travel' },
  { id: 't065', en: 'meter', zh: '计价器', phonetic: '/ˈmiː.tə/', example: 'Make sure the driver turns on the meter.', category: 'travel' },
  { id: 't066', en: 'fare', zh: '费用', phonetic: '/feə/', example: 'The taxi fare came to fifteen dollars.', category: 'travel' },
  { id: 't067', en: 'shuttle', zh: '班车', phonetic: '/ˈʃʌt.əl/', example: 'A free shuttle runs between the hotel and the airport.', category: 'travel' },
  { id: 't068', en: 'minibus', zh: '小巴', phonetic: '/ˈmɪn.i.bʌs/', example: 'The minibus can seat up to twelve passengers.', category: 'travel' },
  { id: 't069', en: 'ferry', zh: '渡轮', phonetic: '/ˈfer.i/', example: 'We crossed the river by ferry.', category: 'travel' },
  { id: 't070', en: 'cruise', zh: '游轮', phonetic: '/kruːz/', example: 'They went on a Caribbean cruise for their honeymoon.', category: 'travel' },
  { id: 't071', en: 'ship', zh: '船', phonetic: '/ʃɪp/', example: 'The ship sailed from the harbor at dawn.', category: 'travel' },
  { id: 't072', en: 'harbor', zh: '港口', phonetic: '/ˈhɑː.bə/', example: 'The harbor was full of fishing boats.', category: 'travel' },
  { id: 't073', en: 'port', zh: '港口', phonetic: '/pɔːt/', example: 'Our ship docked at the port of Barcelona.', category: 'travel' },
  { id: 't074', en: 'pier', zh: '码头', phonetic: '/pɪə/', example: 'We walked along the pier and watched the sunset.', category: 'travel' },
  { id: 't075', en: 'deck', zh: '甲板', phonetic: '/dek/', example: 'Passengers gathered on the deck to see the dolphins.', category: 'travel' },
  { id: 't076', en: 'cabin', zh: '船舱', phonetic: '/ˈkæb.ɪn/', example: 'Our cabin had a small window overlooking the sea.', category: 'travel' },
  { id: 't077', en: 'voyage', zh: '航行', phonetic: '/ˈvɔɪ.ɪdʒ/', example: 'The voyage across the Atlantic took five days.', category: 'travel' },
  { id: 't078', en: 'hotel', zh: '酒店', phonetic: '/həʊˈtel/', example: 'We stayed at a beautiful hotel near the beach.', category: 'travel' },
  { id: 't079', en: 'hostel', zh: '青年旅舍', phonetic: '/ˈhɒs.təl/', example: 'Backpackers often stay at hostels to save money.', category: 'travel' },
  { id: 't080', en: 'motel', zh: '汽车旅馆', phonetic: '/məʊˈtel/', example: 'We found a cheap motel off the highway.', category: 'travel' },
  { id: 't081', en: 'inn', zh: '小旅馆', phonetic: '/ɪn/', example: 'The village inn was cozy and welcoming.', category: 'travel' },
  { id: 't082', en: 'resort', zh: '度假村', phonetic: '/rɪˈzɔːt/', example: 'The beach resort had three swimming pools.', category: 'travel' },
  { id: 't083', en: 'lodge', zh: '山林小屋', phonetic: '/lɒdʒ/', example: 'We stayed at a mountain lodge surrounded by pine trees.', category: 'travel' },
  { id: 't084', en: 'suite', zh: '套房', phonetic: '/swiːt/', example: 'They upgraded us to a luxury suite.', category: 'travel' },
  { id: 't085', en: 'reception', zh: '前台', phonetic: '/rɪˈsep.ʃən/', example: 'Please return your key at reception when you check out.', category: 'travel' },
  { id: 't086', en: 'lobby', zh: '大堂', phonetic: '/ˈlɒb.i/', example: 'Let us meet in the hotel lobby at seven.', category: 'travel' },
  { id: 't087', en: 'check-out', zh: '退房', phonetic: '/ˈtʃek.aʊt/', example: 'Check-out is at 11 AM.', category: 'travel' },
  { id: 't088', en: 'room', zh: '房间', phonetic: '/ruːm/', example: 'I would like to book a room with a sea view.', category: 'travel' },
  { id: 't089', en: 'double', zh: '双人房', phonetic: '/ˈdʌb.əl/', example: 'We reserved a double room for two nights.', category: 'travel' },
  { id: 't090', en: 'single', zh: '单人房', phonetic: '/ˈsɪŋ.ɡəl/', example: 'A single room costs less than a double.', category: 'travel' },
  { id: 't091', en: 'breakfast', zh: '早餐', phonetic: '/ˈbrek.fəst/', example: 'Is breakfast included in the room rate?', category: 'travel' },
  { id: 't092', en: 'balcony', zh: '阳台', phonetic: '/ˈbæl.kə.ni/', example: 'Our room had a balcony overlooking the garden.', category: 'travel' },
  { id: 't093', en: 'amenities', zh: '设施', phonetic: '/əˈmiː.nə.tiz/', example: 'The hotel amenities include a gym and a spa.', category: 'travel' },
  { id: 't094', en: 'laundry', zh: '洗衣服务', phonetic: '/ˈlɔːn.dri/', example: 'Does the hotel offer laundry service?', category: 'travel' },
  { id: 't095', en: 'room-service', zh: '客房服务', phonetic: '/ˈruːm ˌsɜː.vɪs/', example: 'We ordered breakfast from room service.', category: 'travel' },
  { id: 't096', en: 'campervan', zh: '房车', phonetic: '/ˈkæm.pə.væn/', example: 'We rented a campervan and drove across the country.', category: 'travel' },
  { id: 't097', en: 'tent', zh: '帐篷', phonetic: '/tent/', example: 'We pitched our tent near the lake.', category: 'travel' },
  { id: 't098', en: 'campsite', zh: '露营地', phonetic: '/ˈkæmp.saɪt/', example: 'The campsite had clean showers and toilets.', category: 'travel' },
  { id: 't099', en: 'backpack', zh: '背包', phonetic: '/ˈbæk.pæk/', example: 'He traveled across Asia with just a backpack.', category: 'travel' },
  { id: 't100', en: 'sleeping-bag', zh: '睡袋', phonetic: '/ˈsliː.pɪŋ bæɡ/', example: 'It was cold but my sleeping bag kept me warm.', category: 'travel' },
  { id: 't101', en: 'guide', zh: '导游', phonetic: '/ɡaɪd/', example: 'Our guide showed us around the ancient ruins.', category: 'travel' },
  { id: 't102', en: 'tour', zh: '旅游', phonetic: '/tʊə/', example: 'We joined a guided tour of the old city.', category: 'travel' },
  { id: 't103', en: 'sightseeing', zh: '观光', phonetic: '/ˈsaɪtˌsiː.ɪŋ/', example: 'We spent the afternoon sightseeing in Rome.', category: 'travel' },
  { id: 't104', en: 'attraction', zh: '景点', phonetic: '/əˈtræk.ʃən/', example: 'The Eiffel Tower is a popular tourist attraction.', category: 'travel' },
  { id: 't105', en: 'landmark', zh: '地标', phonetic: '/ˈlænd.mɑːk/', example: 'Big Ben is one of London\'s most famous landmarks.', category: 'travel' },
  { id: 't106', en: 'museum', zh: '博物馆', phonetic: '/mjuːˈziː.əm/', example: 'The museum is free on Sundays.', category: 'travel' },
  { id: 't107', en: 'gallery', zh: '美术馆', phonetic: '/ˈɡæl.ər.i/', example: 'The art gallery has a wonderful collection of paintings.', category: 'travel' },
  { id: 't108', en: 'monument', zh: '纪念碑', phonetic: '/ˈmɒn.jə.mənt/', example: 'The monument was built to honor the war heroes.', category: 'travel' },
  { id: 't109', en: 'palace', zh: '宫殿', phonetic: '/ˈpæl.ɪs/', example: 'Buckingham Palace is open to visitors in the summer.', category: 'travel' },
  { id: 't110', en: 'cathedral', zh: '大教堂', phonetic: '/kəˈθiː.drəl/', example: 'The cathedral took over a hundred years to build.', category: 'travel' },
  { id: 't111', en: 'temple', zh: '寺庙', phonetic: '/ˈtem.pəl/', example: 'We visited an ancient temple in Kyoto.', category: 'travel' },
  { id: 't112', en: 'castle', zh: '城堡', phonetic: '/ˈkɑː.səl/', example: 'The medieval castle sits on top of the hill.', category: 'travel' },
  { id: 't113', en: 'square', zh: '广场', phonetic: '/skweə/', example: 'The main square was filled with street performers.', category: 'travel' },
  { id: 't114', en: 'market', zh: '市场', phonetic: '/ˈmɑː.kɪt/', example: 'The night market sells delicious local food.', category: 'travel' },
  { id: 't115', en: 'beach', zh: '海滩', phonetic: '/biːtʃ/', example: 'We spent the whole day relaxing on the beach.', category: 'travel' },
  { id: 't116', en: 'coast', zh: '海岸', phonetic: '/kəʊst/', example: 'They drove along the beautiful coast of Portugal.', category: 'travel' },
  { id: 't117', en: 'island', zh: '岛屿', phonetic: '/ˈaɪ.lənd/', example: 'We took a boat to a small island nearby.', category: 'travel' },
  { id: 't118', en: 'park', zh: '公园', phonetic: '/pɑːk/', example: 'Central Park is an oasis in the middle of the city.', category: 'travel' },
  { id: 't119', en: 'garden', zh: '花园', phonetic: '/ˈɡɑː.dən/', example: 'The botanical garden has plants from all over the world.', category: 'travel' },
  { id: 't120', en: 'zoo', zh: '动物园', phonetic: '/zuː/', example: 'The children loved seeing the pandas at the zoo.', category: 'travel' },
  { id: 't121', en: 'aquarium', zh: '水族馆', phonetic: '/əˈkweə.ri.əm/', example: 'The aquarium has a huge shark tank.', category: 'travel' },
  { id: 't122', en: 'theme-park', zh: '主题公园', phonetic: '/ˈθiːm ˌpɑːk/', example: 'We spent a thrilling day at the theme park.', category: 'travel' },
  { id: 't123', en: 'festival', zh: '节日', phonetic: '/ˈfes.tɪ.vəl/', example: 'The music festival attracts visitors from around the world.', category: 'travel' },
  { id: 't124', en: 'ruins', zh: '遗迹', phonetic: '/ˈruː.ɪnz/', example: 'The ancient ruins date back to Roman times.', category: 'travel' },
  { id: 't125', en: 'scenery', zh: '风景', phonetic: '/ˈsiː.nər.i/', example: 'The mountain scenery was absolutely breathtaking.', category: 'travel' },
  { id: 't126', en: 'viewpoint', zh: '观景点', phonetic: '/ˈvjuː.pɔɪnt/', example: 'There is a viewpoint at the top of the hill.', category: 'travel' },
  { id: 't127', en: 'souvenir', zh: '纪念品', phonetic: '/ˌsuː.vəˈnɪə/', example: 'I bought a small souvenir for my mother.', category: 'travel' },
  { id: 't128', en: 'postcard', zh: '明信片', phonetic: '/ˈpəʊst.kɑːd/', example: 'She sent a postcard from every city she visited.', category: 'travel' },
  { id: 't129', en: 'photograph', zh: '照片', phonetic: '/ˈfəʊ.tə.ɡrɑːf/', example: 'He took a photograph of the sunset.', category: 'travel' },
  { id: 't130', en: 'selfie', zh: '自拍', phonetic: '/ˈsel.fi/', example: 'They took a selfie in front of the Colosseum.', category: 'travel' },
  { id: 't131', en: 'itinerary', zh: '行程', phonetic: '/aɪˈtɪn.ər.ər.i/', example: 'Our itinerary included visits to five different cities.', category: 'travel' },
  { id: 't132', en: 'destination', zh: '目的地', phonetic: '/ˌdes.tɪˈneɪ.ʃən/', example: 'Our final destination was a small island in Greece.', category: 'travel' },
  { id: 't133', en: 'route', zh: '路线', phonetic: '/ruːt/', example: 'We planned a scenic route through the countryside.', category: 'travel' },
  { id: 't134', en: 'map', zh: '地图', phonetic: '/mæp/', example: 'Can you show me the route on the map?', category: 'travel' },
  { id: 't135', en: 'compass', zh: '指南针', phonetic: '/ˈkʌm.pəs/', example: 'A compass helps you find your direction in the wild.', category: 'travel' },
  { id: 't136', en: 'direction', zh: '方向', phonetic: '/daɪˈrek.ʃən/', example: 'Can you point me in the right direction?', category: 'travel' },
  { id: 't137', en: 'north', zh: '北', phonetic: '/nɔːθ/', example: 'The cabin is located north of the lake.', category: 'travel' },
  { id: 't138', en: 'south', zh: '南', phonetic: '/saʊθ/', example: 'We drove south along the coastal highway.', category: 'travel' },
  { id: 't139', en: 'east', zh: '东', phonetic: '/iːst/', example: 'The sun rises in the east.', category: 'travel' },
  { id: 't140', en: 'west', zh: '西', phonetic: '/west/', example: 'California is on the west coast of the United States.', category: 'travel' },
  { id: 't141', en: 'left', zh: '左', phonetic: '/left/', example: 'Turn left at the next intersection.', category: 'travel' },
  { id: 't142', en: 'right', zh: '右', phonetic: '/raɪt/', example: 'The museum is on the right side of the street.', category: 'travel' },
  { id: 't143', en: 'straight', zh: '直走', phonetic: '/streɪt/', example: 'Go straight ahead for about 200 meters.', category: 'travel' },
  { id: 't144', en: 'intersection', zh: '十字路口', phonetic: '/ˌɪn.təˈsek.ʃən/', example: 'There is a traffic light at the intersection.', category: 'travel' },
  { id: 't145', en: 'roundabout', zh: '环岛', phonetic: '/ˈraʊnd.ə.baʊt/', example: 'Take the third exit at the roundabout.', category: 'travel' },
  { id: 't146', en: 'bridge', zh: '桥', phonetic: '/brɪdʒ/', example: 'Cross the bridge and you will see the park on your left.', category: 'travel' },
  { id: 't147', en: 'tunnel', zh: '隧道', phonetic: '/ˈtʌn.əl/', example: 'The tunnel goes right through the mountain.', category: 'travel' },
  { id: 't148', en: 'highway', zh: '高速公路', phonetic: '/ˈhaɪ.weɪ/', example: 'We took the highway to save time.', category: 'travel' },
  { id: 't149', en: 'motorway', zh: '高速公路', phonetic: '/ˈməʊ.tə.weɪ/', example: 'The motorway was busy with holiday traffic.', category: 'travel' },
  { id: 't150', en: 'sign', zh: '指示牌', phonetic: '/saɪn/', example: 'Follow the signs to the city center.', category: 'travel' },
  { id: 't151', en: 'crosswalk', zh: '人行横道', phonetic: '/ˈkrɒs.wɔːk/', example: 'Always use the crosswalk to cross the street.', category: 'travel' },
  { id: 't152', en: 'sidewalk', zh: '人行道', phonetic: '/ˈsaɪd.wɔːk/', example: 'The sidewalk was crowded with shoppers.', category: 'travel' },
  { id: 't153', en: 'block', zh: '街区', phonetic: '/blɒk/', example: 'The hotel is just two blocks from here.', category: 'travel' },
  { id: 't154', en: 'avenue', zh: '大道', phonetic: '/ˈæv.ə.njuː/', example: 'The parade marched down Fifth Avenue.', category: 'travel' },
  { id: 't155', en: 'boulevard', zh: '林荫大道', phonetic: '/ˈbuː.lə.vɑːd/', example: 'The shops along the boulevard are very expensive.', category: 'travel' },
  { id: 't156', en: 'alley', zh: '小巷', phonetic: '/ˈæl.i/', example: 'We found a charming little cafe in a back alley.', category: 'travel' },
  { id: 't157', en: 'path', zh: '小路', phonetic: '/pɑːθ/', example: 'A narrow path led through the forest to the waterfall.', category: 'travel' },
  { id: 't158', en: 'trail', zh: '小径', phonetic: '/treɪl/', example: 'The hiking trail winds up the mountainside.', category: 'travel' },
  { id: 't159', en: 'shortcut', zh: '捷径', phonetic: '/ˈʃɔːt.kʌt/', example: 'I know a shortcut that will save us ten minutes.', category: 'travel' },
  { id: 't160', en: 'distance', zh: '距离', phonetic: '/ˈdɪs.təns/', example: 'The distance between the two cities is about 300 kilometers.', category: 'travel' },
  { id: 't161', en: 'near', zh: '近', phonetic: '/nɪə/', example: 'Is the train station near the hotel?', category: 'travel' },
  { id: 't162', en: 'far', zh: '远', phonetic: '/fɑː/', example: 'How far is the airport from the city center?', category: 'travel' },
  { id: 't163', en: 'nearby', zh: '附近', phonetic: '/ˌnɪəˈbaɪ/', example: 'Are there any good restaurants nearby?', category: 'travel' },
  { id: 't164', en: 'book', zh: '预订', phonetic: '/bʊk/', example: 'I need to book a hotel for next weekend.', category: 'travel' },
  { id: 't165', en: 'reserve', zh: '预约', phonetic: '/rɪˈzɜːv/', example: 'Can we reserve a table for dinner tonight?', category: 'travel' },
  { id: 't166', en: 'confirm', zh: '确认', phonetic: '/kənˈfɜːm/', example: 'Please confirm your booking by email.', category: 'travel' },
  { id: 't167', en: 'cancel', zh: '取消', phonetic: '/ˈkæn.səl/', example: 'You can cancel your reservation without a fee.', category: 'travel' },
  { id: 't168', en: 'refund', zh: '退款', phonetic: '/ˈriː.fʌnd/', example: 'They gave me a full refund when the flight was canceled.', category: 'travel' },
  { id: 't169', en: 'deposit', zh: '押金', phonetic: '/dɪˈpɒz.ɪt/', example: 'A deposit is required to secure your booking.', category: 'travel' },
  { id: 't170', en: 'voucher', zh: '代金券', phonetic: '/ˈvaʊ.tʃə/', example: 'I received a travel voucher as compensation.', category: 'travel' },
  { id: 't171', en: 'discount', zh: '折扣', phonetic: '/ˈdɪs.kaʊnt/', example: 'They offer a 10% discount for early bookings.', category: 'travel' },
  { id: 't172', en: 'deal', zh: '优惠', phonetic: '/diːl/', example: 'I found a great deal on a package holiday.', category: 'travel' },
  { id: 't173', en: 'insurance', zh: '保险', phonetic: '/ɪnˈʃʊə.rəns/', example: 'Travel insurance covers medical emergencies abroad.', category: 'travel' },
  { id: 't174', en: 'currency', zh: '货币', phonetic: '/ˈkʌr.ən.si/', example: 'What currency do they use in Japan?', category: 'travel' },
  { id: 't175', en: 'exchange', zh: '兑换', phonetic: '/ɪksˈtʃeɪndʒ/', example: 'You can exchange money at the bank.', category: 'travel' },
  { id: 't176', en: 'rate', zh: '汇率', phonetic: '/reɪt/', example: 'The exchange rate is better at the airport.', category: 'travel' },
  { id: 't177', en: 'cash', zh: '现金', phonetic: '/kæʃ/', example: 'Do you accept credit cards or only cash?', category: 'travel' },
  { id: 't178', en: 'wallet', zh: '钱包', phonetic: '/ˈwɒl.ɪt/', example: 'Keep your wallet in a safe place while traveling.', category: 'travel' },
  { id: 't179', en: 'tip', zh: '小费', phonetic: '/tɪp/', example: 'It is customary to leave a tip in restaurants here.', category: 'travel' },
  { id: 't180', en: 'receipt', zh: '收据', phonetic: '/rɪˈsiːt/', example: 'Could I have a receipt for my payment, please?', category: 'travel' },
  { id: 't181', en: 'budget', zh: '预算', phonetic: '/ˈbʌdʒ.ɪt/', example: 'We planned our trip on a tight budget.', category: 'travel' },
  { id: 't182', en: 'expense', zh: '花费', phonetic: '/ɪkˈspens/', example: 'My biggest expense was accommodation.', category: 'travel' },
  { id: 't183', en: 'foreign', zh: '外国的', phonetic: '/ˈfɒr.ən/', example: 'I love trying foreign food when I travel.', category: 'travel' },
  { id: 't184', en: 'abroad', zh: '国外', phonetic: '/əˈbrɔːd/', example: 'She has always dreamed of living abroad.', category: 'travel' },
  { id: 't185', en: 'overseas', zh: '海外', phonetic: '/ˌəʊ.vəˈsiːz/', example: 'He moved overseas to start a new job.', category: 'travel' },
  { id: 't186', en: 'culture', zh: '文化', phonetic: '/ˈkʌl.tʃə/', example: 'Experiencing a new culture is the best part of travel.', category: 'travel' },
  { id: 't187', en: 'local', zh: '当地的', phonetic: '/ˈləʊ.kəl/', example: 'Ask a local for restaurant recommendations.', category: 'travel' },
  { id: 't188', en: 'native', zh: '本地的', phonetic: '/ˈneɪ.tɪv/', example: 'He speaks the native language fluently.', category: 'travel' },
  { id: 't189', en: 'tradition', zh: '传统', phonetic: '/trəˈdɪʃ.ən/', example: 'We learned about the local traditions during our stay.', category: 'travel' },
  { id: 't190', en: 'custom', zh: '习俗', phonetic: '/ˈkʌs.təm/', example: 'It is a local custom to remove your shoes before entering.', category: 'travel' },
  { id: 't191', en: 'adventure', zh: '冒险', phonetic: '/ədˈven.tʃə/', example: 'Their trip turned into an unexpected adventure.', category: 'travel' },
  { id: 't192', en: 'explore', zh: '探索', phonetic: '/ɪkˈsplɔː/', example: 'We spent the day exploring the narrow streets.', category: 'travel' },
  { id: 't193', en: 'wander', zh: '漫步', phonetic: '/ˈwɒn.də/', example: 'I love to wander around old neighborhoods.', category: 'travel' },
  { id: 't194', en: 'hike', zh: '远足', phonetic: '/haɪk/', example: 'We hiked up the mountain to see the sunrise.', category: 'travel' },
  { id: 't195', en: 'trek', zh: '徒步旅行', phonetic: '/trek/', example: 'They completed a three-day trek through the jungle.', category: 'travel' },
  { id: 't196', en: 'camp', zh: '露营', phonetic: '/kæmp/', example: 'We camped by the river under the stars.', category: 'travel' },
  { id: 't197', en: 'safari', zh: '野生动物之旅', phonetic: '/səˈfɑː.ri/', example: 'We went on a safari to see lions and elephants.', category: 'travel' },
  { id: 't198', en: 'excursion', zh: '短途旅行', phonetic: '/ɪkˈskɜː.ʒən/', example: 'The excursion to the waterfall was the highlight of our trip.', category: 'travel' },
  { id: 't199', en: 'day-trip', zh: '一日游', phonetic: '/ˈdeɪ ˌtrɪp/', example: 'We took a day trip to a nearby island.', category: 'travel' },
  { id: 't200', en: 'weekend', zh: '周末', phonetic: '/ˌwiːkˈend/', example: 'We are planning a weekend getaway to the countryside.', category: 'travel' },
  { id: 't201', en: 'getaway', zh: '短假', phonetic: '/ˈɡet.ə.weɪ/', example: 'A quick weekend getaway in the mountains sounds perfect.', category: 'travel' },
  { id: 't202', en: 'vacation', zh: '假期', phonetic: '/veɪˈkeɪ.ʃən/', example: 'Where are you going for your summer vacation?', category: 'travel' },
  { id: 't203', en: 'holiday', zh: '假日', phonetic: '/ˈhɒl.ə.deɪ/', example: 'The beach was packed with holiday makers.', category: 'travel' },
  { id: 't204', en: 'break', zh: '休息', phonetic: '/breɪk/', example: 'I need a short break from work.', category: 'travel' },
  { id: 't205', en: 'journey', zh: '旅程', phonetic: '/ˈdʒɜː.ni/', example: 'The journey from Beijing to Shanghai takes about five hours.', category: 'travel' },
  { id: 't206', en: 'trip', zh: '旅行', phonetic: '/trɪp/', example: 'We are planning a trip to Europe next summer.', category: 'travel' },
  { id: 't207', en: 'travel', zh: '旅行', phonetic: '/ˈtræv.əl/', example: 'Travel broadens your mind and enriches your life.', category: 'travel' },
  { id: 't208', en: 'tourist', zh: '游客', phonetic: '/ˈtʊə.rɪst/', example: 'The city attracts millions of tourists every year.', category: 'travel' },
  { id: 't209', en: 'traveler', zh: '旅行者', phonetic: '/ˈtræv.əl.ə/', example: 'Seasoned travelers know how to pack light.', category: 'travel' },
  { id: 't210', en: 'backpacker', zh: '背包客', phonetic: '/ˈbæk.pæk.ə/', example: 'The hostel was full of young backpackers.', category: 'travel' },
  { id: 't211', en: 'jet-lag', zh: '时差反应', phonetic: '/ˈdʒet.læɡ/', example: 'I had terrible jet lag after the long flight.', category: 'travel' },
  { id: 't212', en: 'time-zone', zh: '时区', phonetic: '/ˈtaɪm ˌzəʊn/', example: 'We crossed three time zones on our journey.', category: 'travel' },
  { id: 't213', en: 'passport-control', zh: '护照检查', phonetic: '/ˈpæs.pɔːt kənˌtrəʊl/', example: 'There was a long queue at passport control.', category: 'travel' },
  { id: 't214', en: 'declaration', zh: '申报', phonetic: '/ˌdek.ləˈreɪ.ʃən/', example: 'You must fill out a customs declaration form.', category: 'travel' },
  { id: 't215', en: 'prohibited', zh: '禁止的', phonetic: '/prəˈhɪb.ɪ.tɪd/', example: 'Certain food items are prohibited from being brought in.', category: 'travel' },
  { id: 't216', en: 'quarantine', zh: '检疫', phonetic: '/ˈkwɒr.ən.tiːn/', example: 'Some animals must spend time in quarantine.', category: 'travel' },
  { id: 't217', en: 'embassy', zh: '大使馆', phonetic: '/ˈem.bə.si/', example: 'Contact the embassy if you lose your passport.', category: 'travel' },
  { id: 't218', en: 'consulate', zh: '领事馆', phonetic: '/ˈkɒn.sjə.lət/', example: 'The consulate helped me get an emergency passport.', category: 'travel' },
  { id: 't219', en: 'phrasebook', zh: '常用语手册', phonetic: '/ˈfreɪz.bʊk/', example: 'I carry a phrasebook when visiting a country where I do not speak the language.', category: 'travel' },
  { id: 't220', en: 'translate', zh: '翻译', phonetic: '/trænzˈleɪt/', example: 'Can you translate this menu for me?', category: 'travel' },
  { id: 't221', en: 'language', zh: '语言', phonetic: '/ˈlæŋ.ɡwɪdʒ/', example: 'Learning a few words of the local language goes a long way.', category: 'travel' },
  { id: 't222', en: 'accommodation', zh: '住宿', phonetic: '/əˌkɒm.əˈdeɪ.ʃən/', example: 'We need to find accommodation for the night.', category: 'travel' },
  { id: 't223', en: 'lodging', zh: '寄宿', phonetic: '/ˈlɒdʒ.ɪŋ/', example: 'The price includes lodging and meals.', category: 'travel' },
  { id: 't224', en: 'check-in-desk', zh: '办理入住', phonetic: '/ˈtʃek.ɪn ˌdesk/', example: 'Go to the check-in desk when you arrive at the hotel.', category: 'travel' },
  { id: 't225', en: 'key-card', zh: '房卡', phonetic: '/ˈkiː ˌkɑːd/', example: 'Use your key card to access the elevator.', category: 'travel' },
  { id: 't226', en: 'wake-up-call', zh: '叫醒服务', phonetic: '/ˈweɪk.ʌp ˌkɔːl/', example: 'I requested a wake-up call at six in the morning.', category: 'travel' },
  { id: 't227', en: 'complimentary', zh: '免费的', phonetic: '/ˌkɒm.plɪˈmen.tər.i/', example: 'Complimentary bottled water is provided in your room.', category: 'travel' },
  { id: 't228', en: 'vacancy', zh: '空房', phonetic: '/ˈveɪ.kən.si/', example: 'The sign outside said "no vacancy".', category: 'travel' },
  { id: 't229', en: 'check-in-counter', zh: '值机柜台', phonetic: '/ˈtʃek.ɪn ˌkaʊn.tə/', example: 'The check-in counter opens three hours before departure.', category: 'travel' },
  { id: 't230', en: 'boarding-pass', zh: '登机牌', phonetic: '/ˈbɔː.dɪŋ ˌpɑːs/', example: 'Please show your boarding pass at the gate.', category: 'travel' },
  { id: 't231', en: 'baggage-claim', zh: '行李提取处', phonetic: '/ˈbæɡ.ɪdʒ ˌkleɪm/', example: 'We waited at baggage claim for our suitcases.', category: 'travel' },
  { id: 't232', en: 'carousel', zh: '行李传送带', phonetic: '/ˌkær.əˈsel/', example: 'Our luggage came out on carousel number four.', category: 'travel' },
  { id: 't233', en: 'lost-and-found', zh: '失物招领', phonetic: '/ˌlɒst ən ˈfaʊnd/', example: 'I reported my missing bag to the lost and found.', category: 'travel' },
  { id: 't234', en: 'excess-baggage', zh: '超重行李', phonetic: '/ˈek.ses ˌbæɡ.ɪdʒ/', example: 'I had to pay extra for excess baggage.', category: 'travel' },
  { id: 't235', en: 'weigh', zh: '称重', phonetic: '/weɪ/', example: 'The check-in agent will weigh your suitcase.', category: 'travel' },
  { id: 't236', en: 'scales', zh: '秤', phonetic: '/skeɪlz/', example: 'Put your bag on the scales, please.', category: 'travel' },
  { id: 't237', en: 'hand-luggage', zh: '手提行李', phonetic: '/ˈhænd ˌlʌɡ.ɪdʒ/', example: 'You are allowed one piece of hand luggage.', category: 'travel' },
  { id: 't238', en: 'liquid', zh: '液体', phonetic: '/ˈlɪk.wɪd/', example: 'Liquids over 100 ml are not allowed in hand luggage.', category: 'travel' },
  { id: 't239', en: 'security-check', zh: '安全检查', phonetic: '/sɪˈkjʊə.rə.ti ˌtʃek/', example: 'Remove your laptop at the security check.', category: 'travel' },
  { id: 't240', en: 'scanner', zh: '扫描仪', phonetic: '/ˈskæn.ə/', example: 'Put your bags through the scanner, please.', category: 'travel' },
  { id: 't241', en: 'metal-detector', zh: '金属探测器', phonetic: '/ˈmet.əl dɪˌtek.tə/', example: 'You must walk through the metal detector.', category: 'travel' },
  { id: 't242', en: 'departure-lounge', zh: '候机室', phonetic: '/dɪˈpɑː.tʃə ˌlaʊndʒ/', example: 'We waited in the departure lounge until boarding was announced.', category: 'travel' },
  { id: 't243', en: 'arrivals', zh: '到达大厅', phonetic: '/əˈraɪ.vəlz/', example: 'My family was waiting for me in the arrivals hall.', category: 'travel' },
  { id: 't244', en: 'transfer', zh: '中转', phonetic: '/ˈtræns.fɜː/', example: 'We had to transfer in Dubai to catch our next flight.', category: 'travel' },
  { id: 't245', en: 'transit', zh: '过境', phonetic: '/ˈtræn.zɪt/', example: 'Passengers in transit do not need to go through immigration.', category: 'travel' },
  { id: 't246', en: 'seat', zh: '座位', phonetic: '/siːt/', example: 'I would like an aisle seat, please.', category: 'travel' },
  { id: 't247', en: 'upgrade', zh: '升舱', phonetic: '/ˈʌp.ɡreɪd/', example: 'We were lucky to get a free upgrade to business class.', category: 'travel' },
  { id: 't248', en: 'economy', zh: '经济舱', phonetic: '/ɪˈkɒn.ə.mi/', example: 'Economy class seats are comfortable enough for short flights.', category: 'travel' },
  { id: 't249', en: 'business-class', zh: '商务舱', phonetic: '/ˈbɪz.nɪs ˌklɑːs/', example: 'Business class passengers board the plane first.', category: 'travel' },
  { id: 't250', en: 'emergency-exit', zh: '紧急出口', phonetic: '/ɪˈmɜː.dʒən.si ˌek.sɪt/', example: 'The emergency exit row has extra legroom.', category: 'travel' },
];

// -- js/data/words_nature.js --
const WORDS_NATURE = [
  { id: 'n001', en: 'mountain', zh: '山', phonetic: '/ˈmaʊn.tɪn/', example: 'The mountain peak was covered in snow.', category: 'nature' },
  { id: 'n002', en: 'hill', zh: '小山', phonetic: '/hɪl/', example: 'We rolled down the grassy hill laughing.', category: 'nature' },
  { id: 'n003', en: 'valley', zh: '山谷', phonetic: '/ˈvæl.i/', example: 'A river flowed through the green valley.', category: 'nature' },
  { id: 'n004', en: 'cliff', zh: '悬崖', phonetic: '/klɪf/', example: 'The cliff dropped steeply down to the sea.', category: 'nature' },
  { id: 'n005', en: 'canyon', zh: '峡谷', phonetic: '/ˈkæn.jən/', example: 'The Grand Canyon is one of the wonders of the world.', category: 'nature' },
  { id: 'n006', en: 'gorge', zh: '峡谷', phonetic: '/ɡɔːdʒ/', example: 'The river carved a deep gorge through the rock.', category: 'nature' },
  { id: 'n007', en: 'plateau', zh: '高原', phonetic: '/ˈplæt.əʊ/', example: 'The plateau stretches for hundreds of miles.', category: 'nature' },
  { id: 'n008', en: 'plain', zh: '平原', phonetic: '/pleɪn/', example: 'The grassland plain extended as far as the eye could see.', category: 'nature' },
  { id: 'n009', en: 'desert', zh: '沙漠', phonetic: '/ˈdez.ət/', example: 'Camels are well adapted to life in the desert.', category: 'nature' },
  { id: 'n010', en: 'dune', zh: '沙丘', phonetic: '/djuːn/', example: 'We climbed a sand dune to watch the sunset.', category: 'nature' },
  { id: 'n011', en: 'oasis', zh: '绿洲', phonetic: '/əʊˈeɪ.sɪs/', example: 'The oasis was a welcome sight after days in the desert.', category: 'nature' },
  { id: 'n012', en: 'forest', zh: '森林', phonetic: '/ˈfɒr.ɪst/', example: 'The forest was full of ancient oak trees.', category: 'nature' },
  { id: 'n013', en: 'jungle', zh: '丛林', phonetic: '/ˈdʒʌŋ.ɡəl/', example: 'The jungle was dense and teeming with life.', category: 'nature' },
  { id: 'n014', en: 'rainforest', zh: '雨林', phonetic: '/ˈreɪn.fɒr.ɪst/', example: 'The Amazon rainforest is the largest in the world.', category: 'nature' },
  { id: 'n015', en: 'woodland', zh: '林地', phonetic: '/ˈwʊd.lænd/', example: 'We walked through the quiet woodland path.', category: 'nature' },
  { id: 'n016', en: 'grove', zh: '小树林', phonetic: '/ɡrəʊv/', example: 'An olive grove stretched across the hillside.', category: 'nature' },
  { id: 'n017', en: 'meadow', zh: '草地', phonetic: '/ˈmed.əʊ/', example: 'Wildflowers bloomed in the meadow every spring.', category: 'nature' },
  { id: 'n018', en: 'grassland', zh: '草原', phonetic: '/ˈɡrɑːs.lænd/', example: 'The grassland was home to herds of antelope.', category: 'nature' },
  { id: 'n019', en: 'prairie', zh: '大草原', phonetic: '/ˈpreə.ri/', example: 'Bison once roamed the North American prairie.', category: 'nature' },
  { id: 'n020', en: 'savanna', zh: '热带草原', phonetic: '/səˈvæn.ə/', example: 'Lions hunt across the African savanna.', category: 'nature' },
  { id: 'n021', en: 'tundra', zh: '冻原', phonetic: '/ˈtʌn.drə/', example: 'The Arctic tundra is frozen for most of the year.', category: 'nature' },
  { id: 'n022', en: 'wetland', zh: '湿地', phonetic: '/ˈwet.lænd/', example: 'The wetland is a vital habitat for migratory birds.', category: 'nature' },
  { id: 'n023', en: 'marsh', zh: '沼泽', phonetic: '/mɑːʃ/', example: 'Frogs and herons thrive in the marsh.', category: 'nature' },
  { id: 'n024', en: 'swamp', zh: '沼泽地', phonetic: '/swɒmp/', example: 'The swamp was dark and full of cypress trees.', category: 'nature' },
  { id: 'n025', en: 'bog', zh: '泥炭沼泽', phonetic: '/bɒɡ/', example: 'The bog preserved ancient wooden artifacts.', category: 'nature' },
  { id: 'n026', en: 'river', zh: '河流', phonetic: '/ˈrɪv.ə/', example: 'The river winds through the city center.', category: 'nature' },
  { id: 'n027', en: 'stream', zh: '小溪', phonetic: '/striːm/', example: 'A clear stream ran past the cottage.', category: 'nature' },
  { id: 'n028', en: 'brook', zh: '小河', phonetic: '/brʊk/', example: 'Children played by the babbling brook.', category: 'nature' },
  { id: 'n029', en: 'creek', zh: '小溪', phonetic: '/kriːk/', example: 'We crossed a small creek on our hike.', category: 'nature' },
  { id: 'n030', en: 'waterfall', zh: '瀑布', phonetic: '/ˈwɔː.tə.fɔːl/', example: 'The waterfall crashed down from a height of fifty meters.', category: 'nature' },
  { id: 'n031', en: 'lake', zh: '湖', phonetic: '/leɪk/', example: 'The lake was calm and reflected the mountains beautifully.', category: 'nature' },
  { id: 'n032', en: 'pond', zh: '池塘', phonetic: '/pɒnd/', example: 'Ducks swam peacefully on the pond.', category: 'nature' },
  { id: 'n033', en: 'reservoir', zh: '水库', phonetic: '/ˈrez.ə.vwɑː/', example: 'The reservoir supplies drinking water to the region.', category: 'nature' },
  { id: 'n034', en: 'sea', zh: '海', phonetic: '/siː/', example: 'The sea was rough and the waves were high.', category: 'nature' },
  { id: 'n035', en: 'ocean', zh: '海洋', phonetic: '/ˈəʊ.ʃən/', example: 'The Pacific Ocean covers nearly a third of the planet.', category: 'nature' },
  { id: 'n036', en: 'bay', zh: '海湾', phonetic: '/beɪ/', example: 'The bay was sheltered from the strong winds.', category: 'nature' },
  { id: 'n037', en: 'gulf', zh: '海湾', phonetic: '/ɡʌlf/', example: 'The Gulf of Mexico is rich in marine life.', category: 'nature' },
  { id: 'n038', en: 'inlet', zh: '水湾', phonetic: '/ˈɪn.let/', example: 'The boat sailed into a narrow inlet.', category: 'nature' },
  { id: 'n039', en: 'cove', zh: '小海湾', phonetic: '/kəʊv/', example: 'We found a secluded cove for swimming.', category: 'nature' },
  { id: 'n040', en: 'peninsula', zh: '半岛', phonetic: '/pəˈnɪn.sjə.lə/', example: 'Italy is a peninsula extending into the Mediterranean.', category: 'nature' },
  { id: 'n041', en: 'cape', zh: '海角', phonetic: '/keɪp/', example: 'The lighthouse stands on a rocky cape.', category: 'nature' },
  { id: 'n042', en: 'strait', zh: '海峡', phonetic: '/streɪt/', example: 'Ships pass through the narrow strait daily.', category: 'nature' },
  { id: 'n043', en: 'channel', zh: '海峡', phonetic: '/ˈtʃæn.əl/', example: 'The English Channel separates Britain from France.', category: 'nature' },
  { id: 'n044', en: 'archipelago', zh: '群岛', phonetic: '/ˌɑː.kɪˈpel.ə.ɡəʊ/', example: 'Indonesia is the largest archipelago in the world.', category: 'nature' },
  { id: 'n045', en: 'atoll', zh: '环礁', phonetic: '/ˈæt.ɒl/', example: 'The coral atoll formed a perfect ring in the ocean.', category: 'nature' },
  { id: 'n046', en: 'reef', zh: '礁石', phonetic: '/riːf/', example: 'Colorful fish swam around the coral reef.', category: 'nature' },
  { id: 'n047', en: 'shore', zh: '海岸', phonetic: '/ʃɔː/', example: 'Waves gently lapped against the shore.', category: 'nature' },
  { id: 'n048', en: 'coastline', zh: '海岸线', phonetic: '/ˈkəʊst.laɪn/', example: 'The coastline is dotted with small fishing villages.', category: 'nature' },
  { id: 'n049', en: 'tide', zh: '潮汐', phonetic: '/taɪd/', example: 'The tide comes in twice a day.', category: 'nature' },
  { id: 'n050', en: 'wave', zh: '波浪', phonetic: '/weɪv/', example: 'The surfers rode the giant waves.', category: 'nature' },
  { id: 'n051', en: 'current', zh: '水流', phonetic: '/ˈkʌr.ənt/', example: 'The current was too strong for swimming.', category: 'nature' },
  { id: 'n052', en: 'glacier', zh: '冰川', phonetic: '/ˈɡlæs.i.ə/', example: 'The glacier has been melting rapidly in recent years.', category: 'nature' },
  { id: 'n053', en: 'iceberg', zh: '冰山', phonetic: '/ˈaɪs.bɜːɡ/', example: 'Only ten percent of an iceberg is visible above water.', category: 'nature' },
  { id: 'n054', en: 'ice-cap', zh: '冰盖', phonetic: '/ˈaɪs ˌkæp/', example: 'The polar ice caps are shrinking due to global warming.', category: 'nature' },
  { id: 'n055', en: 'cave', zh: '洞穴', phonetic: '/keɪv/', example: 'We explored a dark cave with stalactites hanging from the ceiling.', category: 'nature' },
  { id: 'n056', en: 'cavern', zh: '大洞穴', phonetic: '/ˈkæv.ən/', example: 'The cavern was so big it had its own underground lake.', category: 'nature' },
  { id: 'n057', en: 'rock', zh: '岩石', phonetic: '/rɒk/', example: 'The rock formation looked like a giant mushroom.', category: 'nature' },
  { id: 'n058', en: 'stone', zh: '石头', phonetic: '/stəʊn/', example: 'The path was lined with smooth river stones.', category: 'nature' },
  { id: 'n059', en: 'pebble', zh: '鹅卵石', phonetic: '/ˈpeb.əl/', example: 'We collected colorful pebbles from the beach.', category: 'nature' },
  { id: 'n060', en: 'boulder', zh: '巨石', phonetic: '/ˈbəʊl.də/', example: 'A huge boulder blocked the mountain path.', category: 'nature' },
  { id: 'n061', en: 'mineral', zh: '矿物', phonetic: '/ˈmɪn.ər.əl/', example: 'The cave walls sparkled with mineral deposits.', category: 'nature' },
  { id: 'n062', en: 'crystal', zh: '水晶', phonetic: '/ˈkrɪs.təl/', example: 'We found quartz crystals embedded in the rock.', category: 'nature' },
  { id: 'n063', en: 'volcano', zh: '火山', phonetic: '/vɒlˈkeɪ.nəʊ/', example: 'The volcano last erupted over a hundred years ago.', category: 'nature' },
  { id: 'n064', en: 'crater', zh: '火山口', phonetic: '/ˈkreɪ.tə/', example: 'The crater was filled with a turquoise lake.', category: 'nature' },
  { id: 'n065', en: 'lava', zh: '熔岩', phonetic: '/ˈlɑː.və/', example: 'Hot lava flowed down the mountainside.', category: 'nature' },
  { id: 'n066', en: 'magma', zh: '岩浆', phonetic: '/ˈmæɡ.mə/', example: 'Magma rises from deep within the Earth.', category: 'nature' },
  { id: 'n067', en: 'geyser', zh: '间歇泉', phonetic: '/ˈɡiː.zə/', example: 'The geyser erupts every ninety minutes with boiling water.', category: 'nature' },
  { id: 'n068', en: 'hot-spring', zh: '温泉', phonetic: '/ˈhɒt ˌsprɪŋ/', example: 'We relaxed in the natural hot springs after the hike.', category: 'nature' },
  { id: 'n069', en: 'earthquake', zh: '地震', phonetic: '/ˈɜːθ.kweɪk/', example: 'The earthquake measured 7.2 on the Richter scale.', category: 'nature' },
  { id: 'n070', en: 'tremor', zh: '震动', phonetic: '/ˈtrem.ə/', example: 'A slight tremor shook the ground for a few seconds.', category: 'nature' },
  { id: 'n071', en: 'seismic', zh: '地震的', phonetic: '/ˈsaɪz.mɪk/', example: 'Seismic activity has increased near the volcano.', category: 'nature' },
  { id: 'n072', en: 'fault', zh: '断层', phonetic: '/fɒlt/', example: 'The San Andreas Fault runs through California.', category: 'nature' },
  { id: 'n073', en: 'tsunami', zh: '海啸', phonetic: '/tsuːˈnɑː.mi/', example: 'The tsunami flooded coastal towns after the earthquake.', category: 'nature' },
  { id: 'n074', en: 'flood', zh: '洪水', phonetic: '/flʌd/', example: 'Heavy rain caused severe flooding in the valley.', category: 'nature' },
  { id: 'n075', en: 'drought', zh: '干旱', phonetic: '/draʊt/', example: 'The drought lasted for three years and ruined the crops.', category: 'nature' },
  { id: 'n076', en: 'famine', zh: '饥荒', phonetic: '/ˈfæm.ɪn/', example: 'The drought led to a widespread famine.', category: 'nature' },
  { id: 'n077', en: 'hurricane', zh: '飓风', phonetic: '/ˈhʌr.ɪ.kən/', example: 'The hurricane destroyed hundreds of homes along the coast.', category: 'nature' },
  { id: 'n078', en: 'typhoon', zh: '台风', phonetic: '/taɪˈfuːn/', example: 'The typhoon is expected to make landfall tonight.', category: 'nature' },
  { id: 'n079', en: 'cyclone', zh: '气旋', phonetic: '/ˈsaɪ.kləʊn/', example: 'The cyclone brought winds of over 150 kilometers per hour.', category: 'nature' },
  { id: 'n080', en: 'tornado', zh: '龙卷风', phonetic: '/tɔːˈneɪ.dəʊ/', example: 'The tornado touched down in an open field.', category: 'nature' },
  { id: 'n081', en: 'storm', zh: '暴风雨', phonetic: '/stɔːm/', example: 'A violent storm knocked down trees and power lines.', category: 'nature' },
  { id: 'n082', en: 'thunderstorm', zh: '雷暴', phonetic: '/ˈθʌn.də.stɔːm/', example: 'The thunderstorm lit up the night sky.', category: 'nature' },
  { id: 'n083', en: 'lightning', zh: '闪电', phonetic: '/ˈlaɪt.nɪŋ/', example: 'Lightning struck the old oak tree in the field.', category: 'nature' },
  { id: 'n084', en: 'thunder', zh: '雷声', phonetic: '/ˈθʌn.də/', example: 'A loud clap of thunder woke me up in the night.', category: 'nature' },
  { id: 'n085', en: 'hail', zh: '冰雹', phonetic: '/heɪl/', example: 'Hail the size of golf balls damaged the car.', category: 'nature' },
  { id: 'n086', en: 'blizzard', zh: '暴风雪', phonetic: '/ˈblɪz.əd/', example: 'The blizzard stranded travelers at the airport.', category: 'nature' },
  { id: 'n087', en: 'avalanche', zh: '雪崩', phonetic: '/ˈæv.əl.ɑːnʃ/', example: 'The avalanche swept down the mountainside.', category: 'nature' },
  { id: 'n088', en: 'landslide', zh: '山体滑坡', phonetic: '/ˈlænd.slaɪd/', example: 'The landslide blocked the only road to the village.', category: 'nature' },
  { id: 'n089', en: 'mudslide', zh: '泥石流', phonetic: '/ˈmʌd.slaɪd/', example: 'Heavy rain triggered a mudslide in the hills.', category: 'nature' },
  { id: 'n090', en: 'wildfire', zh: '野火', phonetic: '/ˈwaɪld.faɪə/', example: 'The wildfire spread quickly through the dry forest.', category: 'nature' },
  { id: 'n091', en: 'eruption', zh: '喷发', phonetic: '/ɪˈrʌp.ʃən/', example: 'The volcanic eruption sent ash miles into the sky.', category: 'nature' },
  { id: 'n092', en: 'ash', zh: '火山灰', phonetic: '/æʃ/', example: 'Volcanic ash covered the surrounding villages.', category: 'nature' },
  { id: 'n093', en: 'rain', zh: '雨', phonetic: '/reɪn/', example: 'The rain fell steadily all afternoon.', category: 'nature' },
  { id: 'n094', en: 'drizzle', zh: '毛毛雨', phonetic: '/ˈdrɪz.əl/', example: 'A light drizzle began to fall as we walked home.', category: 'nature' },
  { id: 'n095', en: 'downpour', zh: '倾盆大雨', phonetic: '/ˈdaʊn.pɔː/', example: 'The downpour caught us without an umbrella.', category: 'nature' },
  { id: 'n096', en: 'shower', zh: '阵雨', phonetic: '/ˈʃaʊ.ə/', example: 'Scattered showers are expected this afternoon.', category: 'nature' },
  { id: 'n097', en: 'monsoon', zh: '季风', phonetic: '/mɒnˈsuːn/', example: 'The monsoon brings heavy rain from June to September.', category: 'nature' },
  { id: 'n098', en: 'rainbow', zh: '彩虹', phonetic: '/ˈreɪn.bəʊ/', example: 'A beautiful rainbow appeared after the rain.', category: 'nature' },
  { id: 'n099', en: 'snow', zh: '雪', phonetic: '/snəʊ/', example: 'The snow was deep enough to build a snowman.', category: 'nature' },
  { id: 'n100', en: 'snowflake', zh: '雪花', phonetic: '/ˈsnəʊ.fleɪk/', example: 'Each snowflake has a unique crystalline pattern.', category: 'nature' },
  { id: 'n101', en: 'frost', zh: '霜', phonetic: '/frɒst/', example: 'The grass was covered with a layer of frost.', category: 'nature' },
  { id: 'n102', en: 'ice', zh: '冰', phonetic: '/aɪs/', example: 'The lake froze over with a thick layer of ice.', category: 'nature' },
  { id: 'n103', en: 'sleet', zh: '雨夹雪', phonetic: '/sliːt/', example: 'The sleet made the roads dangerously slippery.', category: 'nature' },
  { id: 'n104', en: 'fog', zh: '雾', phonetic: '/fɒɡ/', example: 'Thick fog reduced visibility to just a few meters.', category: 'nature' },
  { id: 'n105', en: 'mist', zh: '薄雾', phonetic: '/mɪst/', example: 'A gentle mist hung over the lake at dawn.', category: 'nature' },
  { id: 'n106', en: 'haze', zh: '霾', phonetic: '/heɪz/', example: 'A heat haze shimmered above the road.', category: 'nature' },
  { id: 'n107', en: 'smog', zh: '雾霾', phonetic: '/smɒɡ/', example: 'The smog was so thick we could not see across the street.', category: 'nature' },
  { id: 'n108', en: 'cloud', zh: '云', phonetic: '/klaʊd/', example: 'Dark clouds gathered on the horizon.', category: 'nature' },
  { id: 'n109', en: 'overcast', zh: '阴天', phonetic: '/ˈəʊ.və.kɑːst/', example: 'The sky was overcast and it looked like rain.', category: 'nature' },
  { id: 'n110', en: 'breeze', zh: '微风', phonetic: '/briːz/', example: 'A cool breeze came in from the sea.', category: 'nature' },
  { id: 'n111', en: 'wind', zh: '风', phonetic: '/wɪnd/', example: 'The wind was strong enough to bend the trees.', category: 'nature' },
  { id: 'n112', en: 'gust', zh: '阵风', phonetic: '/ɡʌst/', example: 'A sudden gust of wind blew the hat off my head.', category: 'nature' },
  { id: 'n113', en: 'gale', zh: '大风', phonetic: '/ɡeɪl/', example: 'The gale forced ships to stay in port.', category: 'nature' },
  { id: 'n114', en: 'whirlwind', zh: '旋风', phonetic: '/ˈwɜːl.wɪnd/', example: 'Leaves danced in the whirlwind on the street corner.', category: 'nature' },
  { id: 'n115', en: 'humidity', zh: '湿度', phonetic: '/hjuːˈmɪd.ə.ti/', example: 'The humidity made the hot weather feel even worse.', category: 'nature' },
  { id: 'n116', en: 'dew', zh: '露水', phonetic: '/djuː/', example: 'Morning dew sparkled on the grass.', category: 'nature' },
  { id: 'n117', en: 'temperature', zh: '温度', phonetic: '/ˈtem.prə.tʃə/', example: 'The temperature dropped below zero overnight.', category: 'nature' },
  { id: 'n118', en: 'climate', zh: '气候', phonetic: '/ˈklaɪ.mət/', example: 'Climate change is a major global concern.', category: 'nature' },
  { id: 'n119', en: 'atmosphere', zh: '大气层', phonetic: '/ˈæt.mə.sfɪə/', example: 'The atmosphere protects us from harmful radiation.', category: 'nature' },
  { id: 'n120', en: 'ozone', zh: '臭氧', phonetic: '/ˈəʊ.zəʊn/', example: 'The ozone layer absorbs most of the ultraviolet radiation.', category: 'nature' },
  { id: 'n121', en: 'sky', zh: '天空', phonetic: '/skaɪ/', example: 'The sky was clear and full of stars.', category: 'nature' },
  { id: 'n122', en: 'sun', zh: '太阳', phonetic: '/sʌn/', example: 'The sun rose slowly above the horizon.', category: 'nature' },
  { id: 'n123', en: 'sunshine', zh: '阳光', phonetic: '/ˈsʌn.ʃaɪn/', example: 'We sat outside enjoying the warm sunshine.', category: 'nature' },
  { id: 'n124', en: 'sunrise', zh: '日出', phonetic: '/ˈsʌn.raɪz/', example: 'We woke up early to watch the sunrise.', category: 'nature' },
  { id: 'n125', en: 'sunset', zh: '日落', phonetic: '/ˈsʌn.set/', example: 'The sunset painted the sky in shades of orange and pink.', category: 'nature' },
  { id: 'n126', en: 'dawn', zh: '黎明', phonetic: '/dɔːn/', example: 'Birds begin to sing at the first light of dawn.', category: 'nature' },
  { id: 'n127', en: 'dusk', zh: '黄昏', phonetic: '/dʌsk/', example: 'The forest becomes quiet at dusk.', category: 'nature' },
  { id: 'n128', en: 'twilight', zh: '暮色', phonetic: '/ˈtwaɪ.laɪt/', example: 'The garden looked magical in the twilight.', category: 'nature' },
  { id: 'n129', en: 'moon', zh: '月亮', phonetic: '/muːn/', example: 'The full moon shone brightly over the sea.', category: 'nature' },
  { id: 'n130', en: 'moonlight', zh: '月光', phonetic: '/ˈmuːn.laɪt/', example: 'The path was lit only by moonlight.', category: 'nature' },
  { id: 'n131', en: 'star', zh: '星星', phonetic: '/stɑː/', example: 'We lay on the grass and gazed at the stars.', category: 'nature' },
  { id: 'n132', en: 'planet', zh: '行星', phonetic: '/ˈplæn.ɪt/', example: 'Jupiter is the largest planet in our solar system.', category: 'nature' },
  { id: 'n133', en: 'galaxy', zh: '星系', phonetic: '/ˈɡæl.ək.si/', example: 'Our galaxy is called the Milky Way.', category: 'nature' },
  { id: 'n134', en: 'universe', zh: '宇宙', phonetic: '/ˈjuː.nɪ.vɜːs/', example: 'The universe contains billions of galaxies.', category: 'nature' },
  { id: 'n135', en: 'constellation', zh: '星座', phonetic: '/ˌkɒn.stəˈleɪ.ʃən/', example: 'We identified the constellation Orion in the night sky.', category: 'nature' },
  { id: 'n136', en: 'comet', zh: '彗星', phonetic: '/ˈkɒm.ɪt/', example: 'A comet streaked across the sky with a glowing tail.', category: 'nature' },
  { id: 'n137', en: 'meteor', zh: '流星', phonetic: '/ˈmiː.ti.ə/', example: 'We saw a shooting meteor and made a wish.', category: 'nature' },
  { id: 'n138', en: 'asteroid', zh: '小行星', phonetic: '/ˈæs.tər.ɔɪd/', example: 'An asteroid impact may have caused the extinction of dinosaurs.', category: 'nature' },
  { id: 'n139', en: 'orbit', zh: '轨道', phonetic: '/ˈɔː.bɪt/', example: 'The moon completes one orbit around Earth every 27 days.', category: 'nature' },
  { id: 'n140', en: 'eclipse', zh: '日食', phonetic: '/ɪˈklɪps/', example: 'We used special glasses to watch the solar eclipse.', category: 'nature' },
  { id: 'n141', en: 'horizon', zh: '地平线', phonetic: '/həˈraɪ.zən/', example: 'The ship disappeared over the horizon.', category: 'nature' },
  { id: 'n142', en: 'hemisphere', zh: '半球', phonetic: '/ˈhem.ɪ.sfɪə/', example: 'Australia is in the southern hemisphere.', category: 'nature' },
  { id: 'n143', en: 'equator', zh: '赤道', phonetic: '/ɪˈkweɪ.tə/', example: 'Countries near the equator have a tropical climate.', category: 'nature' },
  { id: 'n144', en: 'pole', zh: '极地', phonetic: '/pəʊl/', example: 'The North Pole is covered by floating sea ice.', category: 'nature' },
  { id: 'n145', en: 'latitude', zh: '纬度', phonetic: '/ˈlæt.ɪ.tjuːd/', example: 'The city lies at a latitude of forty degrees north.', category: 'nature' },
  { id: 'n146', en: 'longitude', zh: '经度', phonetic: '/ˈlɒn.dʒɪ.tjuːd/', example: 'The sailors calculated their longitude using a chronometer.', category: 'nature' },
  { id: 'n147', en: 'spring', zh: '春天', phonetic: '/sprɪŋ/', example: 'Flowers bloom and trees turn green in spring.', category: 'nature' },
  { id: 'n148', en: 'summer', zh: '夏天', phonetic: '/ˈsʌm.ə/', example: 'Summer days are long and hot.', category: 'nature' },
  { id: 'n149', en: 'autumn', zh: '秋天', phonetic: '/ˈɔː.təm/', example: 'The leaves turn gold and red in autumn.', category: 'nature' },
  { id: 'n150', en: 'winter', zh: '冬天', phonetic: '/ˈwɪn.tə/', example: 'Winter brings snow and freezing temperatures.', category: 'nature' },
  { id: 'n151', en: 'season', zh: '季节', phonetic: '/ˈsiː.zən/', example: 'Each season has its own unique beauty.', category: 'nature' },
  { id: 'n152', en: 'equinox', zh: '春分/秋分', phonetic: '/ˈek.wɪ.nɒks/', example: 'Day and night are equal in length at the equinox.', category: 'nature' },
  { id: 'n153', en: 'solstice', zh: '至日', phonetic: '/ˈsɒl.stɪs/', example: 'The summer solstice is the longest day of the year.', category: 'nature' },
  { id: 'n154', en: 'tree', zh: '树', phonetic: '/triː/', example: 'A huge oak tree shaded the garden.', category: 'nature' },
  { id: 'n155', en: 'leaf', zh: '叶子', phonetic: '/liːf/', example: 'A single leaf fell slowly to the ground.', category: 'nature' },
  { id: 'n156', en: 'branch', zh: '树枝', phonetic: '/brɑːntʃ/', example: 'A bird perched on the branch and began to sing.', category: 'nature' },
  { id: 'n157', en: 'trunk', zh: '树干', phonetic: '/trʌŋk/', example: 'The tree trunk was wide enough to carve a canoe from.', category: 'nature' },
  { id: 'n158', en: 'root', zh: '根', phonetic: '/ruːt/', example: 'The roots of the old tree spread deep into the earth.', category: 'nature' },
  { id: 'n159', en: 'bark', zh: '树皮', phonetic: '/bɑːk/', example: 'The rough bark of the pine tree protects it from insects.', category: 'nature' },
  { id: 'n160', en: 'sap', zh: '树液', phonetic: '/sæp/', example: 'Maple sap is collected in early spring to make syrup.', category: 'nature' },
  { id: 'n161', en: 'pine', zh: '松树', phonetic: '/paɪn/', example: 'The pine forest smelled fresh and clean.', category: 'nature' },
  { id: 'n162', en: 'oak', zh: '橡树', phonetic: '/əʊk/', example: 'The oak tree in the village square is over 500 years old.', category: 'nature' },
  { id: 'n163', en: 'willow', zh: '柳树', phonetic: '/ˈwɪl.əʊ/', example: 'The weeping willow dipped its branches into the pond.', category: 'nature' },
  { id: 'n164', en: 'birch', zh: '桦树', phonetic: '/bɜːtʃ/', example: 'The white bark of the birch tree stood out against the dark forest.', category: 'nature' },
  { id: 'n165', en: 'maple', zh: '枫树', phonetic: '/ˈmeɪ.pəl/', example: 'The maple leaves turned brilliant red in the autumn.', category: 'nature' },
  { id: 'n166', en: 'palm', zh: '棕榈树', phonetic: '/pɑːm/', example: 'Palm trees lined the tropical beach.', category: 'nature' },
  { id: 'n167', en: 'bamboo', zh: '竹子', phonetic: '/bæmˈbuː/', example: 'Bamboo can grow up to a meter in a single day.', category: 'nature' },
  { id: 'n168', en: 'fern', zh: '蕨类植物', phonetic: '/fɜːn/', example: 'Ferns thrive in the damp shade of the forest.', category: 'nature' },
  { id: 'n169', en: 'moss', zh: '苔藓', phonetic: '/mɒs/', example: 'Soft green moss covered the old stone wall.', category: 'nature' },
  { id: 'n170', en: 'ivy', zh: '常春藤', phonetic: '/ˈaɪ.vi/', example: 'Ivy climbed up the side of the brick building.', category: 'nature' },
  { id: 'n171', en: 'flower', zh: '花', phonetic: '/ˈflaʊ.ə/', example: 'The garden was filled with colorful flowers.', category: 'nature' },
  { id: 'n172', en: 'blossom', zh: '花', phonetic: '/ˈblɒs.əm/', example: 'Cherry blossoms are a symbol of spring in Japan.', category: 'nature' },
  { id: 'n173', en: 'petal', zh: '花瓣', phonetic: '/ˈpet.əl/', example: 'Rose petals scattered on the ground after the storm.', category: 'nature' },
  { id: 'n174', en: 'pollen', zh: '花粉', phonetic: '/ˈpɒl.ən/', example: 'Bees collect pollen from flowers to make honey.', category: 'nature' },
  { id: 'n175', en: 'nectar', zh: '花蜜', phonetic: '/ˈnek.tə/', example: 'Butterflies feed on the sweet nectar of flowers.', category: 'nature' },
  { id: 'n176', en: 'rose', zh: '玫瑰', phonetic: '/rəʊz/', example: 'He gave her a bouquet of red roses.', category: 'nature' },
  { id: 'n177', en: 'lily', zh: '百合', phonetic: '/ˈlɪl.i/', example: 'White lilies filled the room with a sweet fragrance.', category: 'nature' },
  { id: 'n178', en: 'tulip', zh: '郁金香', phonetic: '/ˈtjuː.lɪp/', example: 'The tulip fields in the Netherlands are a spectacular sight.', category: 'nature' },
  { id: 'n179', en: 'daisy', zh: '雏菊', phonetic: '/ˈdeɪ.zi/', example: 'Daisies dotted the green meadow like tiny stars.', category: 'nature' },
  { id: 'n180', en: 'sunflower', zh: '向日葵', phonetic: '/ˈsʌn.flaʊ.ə/', example: 'Sunflowers turn their heads to follow the sun.', category: 'nature' },
  { id: 'n181', en: 'lavender', zh: '薰衣草', phonetic: '/ˈlæv.ən.də/', example: 'The lavender fields stretched purple to the horizon.', category: 'nature' },
  { id: 'n182', en: 'orchid', zh: '兰花', phonetic: '/ˈɔː.kɪd/', example: 'The orchid is a delicate flower that requires careful tending.', category: 'nature' },
  { id: 'n183', en: 'lotus', zh: '莲花', phonetic: '/ˈləʊ.təs/', example: 'Lotus flowers floated gracefully on the pond.', category: 'nature' },
  { id: 'n184', en: 'cactus', zh: '仙人掌', phonetic: '/ˈkæk.təs/', example: 'The cactus stores water in its thick stem.', category: 'nature' },
  { id: 'n185', en: 'grass', zh: '草', phonetic: '/ɡrɑːs/', example: 'The grass was wet with morning dew.', category: 'nature' },
  { id: 'n186', en: 'weed', zh: '杂草', phonetic: '/wiːd/', example: 'We spent the afternoon pulling weeds from the garden.', category: 'nature' },
  { id: 'n187', en: 'bush', zh: '灌木', phonetic: '/bʊʃ/', example: 'A rabbit darted into the bush as we approached.', category: 'nature' },
  { id: 'n188', en: 'shrub', zh: '灌木', phonetic: '/ʃrʌb/', example: 'The garden was bordered by flowering shrubs.', category: 'nature' },
  { id: 'n189', en: 'hedge', zh: '树篱', phonetic: '/hedʒ/', example: 'A tall hedge provided privacy for the garden.', category: 'nature' },
  { id: 'n190', en: 'vine', zh: '藤蔓', phonetic: '/vaɪn/', example: 'Grapevines hung heavy with ripe fruit.', category: 'nature' },
  { id: 'n191', en: 'fungus', zh: '真菌', phonetic: '/ˈfʌŋ.ɡəs/', example: 'The fungus grew in a perfect circle on the forest floor.', category: 'nature' },
  { id: 'n192', en: 'mushroom', zh: '蘑菇', phonetic: '/ˈmʌʃ.ruːm/', example: 'We found wild mushrooms growing near the old stump.', category: 'nature' },
  { id: 'n193', en: 'algae', zh: '藻类', phonetic: '/ˈæl.dʒiː/', example: 'Green algae covered the surface of the stagnant pond.', category: 'nature' },
  { id: 'n194', en: 'seaweed', zh: '海藻', phonetic: '/ˈsiː.wiːd/', example: 'Seaweed washed up on the shore after the storm.', category: 'nature' },
  { id: 'n195', en: 'soil', zh: '土壤', phonetic: '/sɔɪl/', example: 'Rich dark soil is essential for growing healthy crops.', category: 'nature' },
  { id: 'n196', en: 'mud', zh: '泥', phonetic: '/mʌd/', example: 'Our boots sank into the thick mud on the trail.', category: 'nature' },
  { id: 'n197', en: 'clay', zh: '黏土', phonetic: '/kleɪ/', example: 'The potter shaped the clay into a beautiful vase.', category: 'nature' },
  { id: 'n198', en: 'sand', zh: '沙子', phonetic: '/sænd/', example: 'The sand was warm beneath our bare feet.', category: 'nature' },
  { id: 'n199', en: 'gravel', zh: '砾石', phonetic: '/ˈɡræv.əl/', example: 'The driveway was covered with loose gravel.', category: 'nature' },
  { id: 'n200', en: 'dust', zh: '灰尘', phonetic: '/dʌst/', example: 'The wind whipped up clouds of dust from the dry field.', category: 'nature' },
  { id: 'n201', en: 'erosion', zh: '侵蚀', phonetic: '/ɪˈrəʊ.ʒən/', example: 'Coastal erosion is slowly wearing away the cliffs.', category: 'nature' },
  { id: 'n202', en: 'sediment', zh: '沉积物', phonetic: '/ˈsed.ɪ.mənt/', example: 'The river carries sediment all the way to the delta.', category: 'nature' },
  { id: 'n203', en: 'fossil', zh: '化石', phonetic: '/ˈfɒs.əl/', example: 'We discovered a fossil of a prehistoric fish in the rock.', category: 'nature' },
  { id: 'n204', en: 'gem', zh: '宝石', phonetic: '/dʒem/', example: 'The crown was encrusted with precious gems.', category: 'nature' },
  { id: 'n205', en: 'diamond', zh: '钻石', phonetic: '/ˈdaɪə.mənd/', example: 'Diamonds form under extreme pressure deep in the Earth.', category: 'nature' },
  { id: 'n206', en: 'coal', zh: '煤', phonetic: '/kəʊl/', example: 'Coal was once the main source of energy for industry.', category: 'nature' },
  { id: 'n207', en: 'oil', zh: '石油', phonetic: '/ɔɪl/', example: 'The country exports large quantities of crude oil.', category: 'nature' },
  { id: 'n208', en: 'ecology', zh: '生态', phonetic: '/ɪˈkɒl.ə.dʒi/', example: 'Ecology studies the relationships between living things and their environment.', category: 'nature' },
  { id: 'n209', en: 'ecosystem', zh: '生态系统', phonetic: '/ˈiː.kəʊ.sɪs.təm/', example: 'The coral reef is a fragile ecosystem.', category: 'nature' },
  { id: 'n210', en: 'habitat', zh: '栖息地', phonetic: '/ˈhæb.ɪ.tæt/', example: 'Deforestation threatens the natural habitat of many species.', category: 'nature' },
  { id: 'n211', en: 'biodiversity', zh: '生物多样性', phonetic: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/', example: 'The rainforest has incredible biodiversity.', category: 'nature' },
  { id: 'n212', en: 'species', zh: '物种', phonetic: '/ˈspiː.ʃiːz/', example: 'Many species are at risk of extinction.', category: 'nature' },
  { id: 'n213', en: 'extinction', zh: '灭绝', phonetic: '/ɪkˈstɪŋk.ʃən/', example: 'The dodo bird was driven to extinction by human activity.', category: 'nature' },
  { id: 'n214', en: 'endangered', zh: '濒危的', phonetic: '/ɪnˈdeɪn.dʒəd/', example: 'The giant panda is an endangered species.', category: 'nature' },
  { id: 'n215', en: 'conservation', zh: '保护', phonetic: '/ˌkɒn.səˈveɪ.ʃən/', example: 'Conservation efforts have helped save the bald eagle.', category: 'nature' },
  { id: 'n216', en: 'wildlife', zh: '野生动植物', phonetic: '/ˈwaɪld.laɪf/', example: 'The national park is a sanctuary for wildlife.', category: 'nature' },
  { id: 'n217', en: 'nature', zh: '自然', phonetic: '/ˈneɪ.tʃə/', example: 'Spending time in nature is good for your health.', category: 'nature' },
  { id: 'n218', en: 'environment', zh: '环境', phonetic: '/ɪnˈvaɪ.rən.mənt/', example: 'We must protect the environment for future generations.', category: 'nature' },
  { id: 'n219', en: 'pollution', zh: '污染', phonetic: '/pəˈluː.ʃən/', example: 'Air pollution is a serious problem in big cities.', category: 'nature' },
  { id: 'n220', en: 'carbon', zh: '碳', phonetic: '/ˈkɑː.bən/', example: 'Burning fossil fuels releases carbon dioxide into the air.', category: 'nature' },
  { id: 'n221', en: 'greenhouse', zh: '温室', phonetic: '/ˈɡriːn.haʊs/', example: 'The greenhouse effect traps heat in the atmosphere.', category: 'nature' },
  { id: 'n222', en: 'global-warming', zh: '全球变暖', phonetic: '/ˌɡləʊ.bəl ˈwɔː.mɪŋ/', example: 'Global warming is causing ice caps to melt.', category: 'nature' },
  { id: 'n223', en: 'deforestation', zh: '森林砍伐', phonetic: '/diːˌfɒr.ɪˈsteɪ.ʃən/', example: 'Deforestation in the Amazon is a major environmental concern.', category: 'nature' },
  { id: 'n224', en: 'renewable', zh: '可再生的', phonetic: '/rɪˈnjuː.ə.bəl/', example: 'Solar and wind power are renewable energy sources.', category: 'nature' },
  { id: 'n225', en: 'sustainable', zh: '可持续的', phonetic: '/səˈsteɪ.nə.bəl/', example: 'Sustainable farming protects the soil for future use.', category: 'nature' },
  { id: 'n226', en: 'recycle', zh: '回收', phonetic: '/ˌriːˈsaɪ.kəl/', example: 'We recycle paper, glass, and plastic at home.', category: 'nature' },
  { id: 'n227', en: 'waste', zh: '废物', phonetic: '/weɪst/', example: 'Reducing food waste helps protect the environment.', category: 'nature' },
  { id: 'n228', en: 'landfill', zh: '垃圾填埋场', phonetic: '/ˈlænd.fɪl/', example: 'Most household trash ends up in a landfill.', category: 'nature' },
  { id: 'n229', en: 'compost', zh: '堆肥', phonetic: '/ˈkɒm.pɒst/', example: 'We turn kitchen scraps into compost for the garden.', category: 'nature' },
  { id: 'n230', en: 'oxygen', zh: '氧气', phonetic: '/ˈɒk.sɪ.dʒən/', example: 'Trees produce oxygen through photosynthesis.', category: 'nature' },
  { id: 'n231', en: 'nitrogen', zh: '氮气', phonetic: '/ˈnaɪ.trə.dʒən/', example: 'Nitrogen makes up about 78 percent of the atmosphere.', category: 'nature' },
  { id: 'n232', en: 'landscape', zh: '景观', phonetic: '/ˈlænd.skeɪp/', example: 'The landscape changed from flat plains to rolling hills.', category: 'nature' },
  { id: 'n233', en: 'terrain', zh: '地形', phonetic: '/təˈreɪn/', example: 'The rugged terrain made hiking very challenging.', category: 'nature' },
  { id: 'n234', en: 'topography', zh: '地形学', phonetic: '/təˈpɒɡ.rə.fi/', example: 'The topography of the region includes mountains and deep valleys.', category: 'nature' },
  { id: 'n235', en: 'continent', zh: '大陆', phonetic: '/ˈkɒn.tɪ.nənt/', example: 'Africa is the second largest continent.', category: 'nature' },
  { id: 'n236', en: 'seismic-wave', zh: '地震波', phonetic: '/ˈsaɪz.mɪk ˌweɪv/', example: 'Seismic waves travel through the Earth during an earthquake.', category: 'nature' },
  { id: 'n237', en: 'continental-drift', zh: '大陆漂移', phonetic: '/ˌkɒn.tɪ.nen.təl ˈdrɪft/', example: 'Continental drift explains why the continents fit together like puzzle pieces.', category: 'nature' },
  { id: 'n238', en: 'tectonic', zh: '地壳构造的', phonetic: '/tekˈtɒn.ɪk/', example: 'Tectonic plates move slowly over millions of years.', category: 'nature' },
  { id: 'n239', en: 'delta', zh: '三角洲', phonetic: '/ˈdel.tə/', example: 'The Nile Delta is a fertile agricultural region.', category: 'nature' },
  { id: 'n240', en: 'tributary', zh: '支流', phonetic: '/ˈtrɪb.jə.tər.i/', example: 'The small stream is a tributary of the larger river.', category: 'nature' },
  { id: 'n241', en: 'estuary', zh: '河口', phonetic: '/ˈes.tju.ər.i/', example: 'The estuary is where the river meets the sea.', category: 'nature' },
  { id: 'n242', en: 'lagoon', zh: '潟湖', phonetic: '/ləˈɡuːn/', example: 'The turquoise lagoon was perfect for snorkeling.', category: 'nature' },
  { id: 'n243', en: 'fjord', zh: '峡湾', phonetic: '/fjɔːd/', example: 'Norway is famous for its spectacular fjords.', category: 'nature' },
  { id: 'n244', en: 'mangrove', zh: '红树林', phonetic: '/ˈmæŋ.ɡrəʊv/', example: 'Mangrove forests protect coastlines from erosion.', category: 'nature' },
  { id: 'n245', en: 'dusk', zh: '黄昏', phonetic: '/dʌsk/', example: 'Crickets began to chirp at dusk.', category: 'nature' },
  { id: 'n246', en: 'arid', zh: '干旱的', phonetic: '/ˈær.ɪd/', example: 'The arid landscape receives very little rainfall each year.', category: 'nature' },
  { id: 'n247', en: 'fertile', zh: '肥沃的', phonetic: '/ˈfɜː.taɪl/', example: 'The fertile soil along the riverbank is perfect for farming.', category: 'nature' },
  { id: 'n248', en: 'barren', zh: '贫瘠的', phonetic: '/ˈbær.ən/', example: 'Nothing grows in the barren wasteland.', category: 'nature' },
  { id: 'n249', en: 'lush', zh: '茂盛的', phonetic: '/lʌʃ/', example: 'The lush vegetation created a tropical paradise.', category: 'nature' },
  { id: 'n250', en: 'pristine', zh: '原始的', phonetic: '/ˈprɪs.tiːn/', example: 'The pristine beach had never been touched by humans.', category: 'nature' },
];

// -- js/data/words_work.js --
const WORDS_WORK = [
  { id: 'wk001', en: 'meeting', zh: '会议', phonetic: '/ˈmiː.tɪŋ/', example: 'The meeting starts at 10 AM.', category: 'work' },
  { id: 'wk002', en: 'office', zh: '办公室', phonetic: '/ˈɒf.ɪs/', example: 'She works in a large office downtown.', category: 'work' },
  { id: 'wk003', en: 'boss', zh: '老板', phonetic: '/bɒs/', example: 'My boss gave me a new project.', category: 'work' },
  { id: 'wk004', en: 'colleague', zh: '同事', phonetic: '/ˈkɒl.iːɡ/', example: 'I had lunch with a colleague today.', category: 'work' },
  { id: 'wk005', en: 'deadline', zh: '截止日期', phonetic: '/ˈded.laɪn/', example: 'We must finish the report before the deadline.', category: 'work' },
  { id: 'wk006', en: 'salary', zh: '薪水', phonetic: '/ˈsæl.ər.i/', example: 'She negotiated a higher salary.', category: 'work' },
  { id: 'wk007', en: 'resume', zh: '简历', phonetic: '/ˈrez.juː.meɪ/', example: 'Please send your resume to HR.', category: 'work' },
  { id: 'wk008', en: 'interview', zh: '面试', phonetic: '/ˈɪn.tə.vjuː/', example: 'I have a job interview tomorrow morning.', category: 'work' },
  { id: 'wk009', en: 'promotion', zh: '晋升', phonetic: '/prəˈməʊ.ʃən/', example: 'He got a promotion after two years of hard work.', category: 'work' },
  { id: 'wk010', en: 'email', zh: '电子邮件', phonetic: '/ˈiː.meɪl/', example: 'I will send you the details by email.', category: 'work' },
  { id: 'wk011', en: 'report', zh: '报告', phonetic: '/rɪˈpɔːt/', example: 'Please submit the monthly report by Friday.', category: 'work' },
  { id: 'wk012', en: 'project', zh: '项目', phonetic: '/ˈprɒdʒ.ekt/', example: 'Our team is working on a new project.', category: 'work' },
  { id: 'wk013', en: 'client', zh: '客户', phonetic: '/ˈklaɪ.ənt/', example: 'We need to keep our clients satisfied.', category: 'work' },
  { id: 'wk014', en: 'schedule', zh: '日程安排', phonetic: '/ˈʃed.juːl/', example: 'Let me check my schedule for next week.', category: 'work' },
  { id: 'wk015', en: 'task', zh: '任务', phonetic: '/tɑːsk/', example: 'I have several tasks to complete today.', category: 'work' },
  { id: 'wk016', en: 'team', zh: '团队', phonetic: '/tiːm/', example: 'Our team works well together.', category: 'work' },
  { id: 'wk017', en: 'manager', zh: '经理', phonetic: '/ˈmæn.ɪ.dʒər/', example: 'The manager approved our proposal.', category: 'work' },
  { id: 'wk018', en: 'contract', zh: '合同', phonetic: '/ˈkɒn.trækt/', example: 'Both parties signed the contract.', category: 'work' },
  { id: 'wk019', en: 'budget', zh: '预算', phonetic: '/ˈbʌdʒ.ɪt/', example: 'We need to stay within the budget.', category: 'work' },
  { id: 'wk020', en: 'presentation', zh: '演示', phonetic: '/ˌprez.ənˈteɪ.ʃən/', example: 'She gave an excellent presentation to the board.', category: 'work' },
  { id: 'wk021', en: 'hire', zh: '雇用', phonetic: '/haɪər/', example: 'The company plans to hire ten new employees.', category: 'work' },
  { id: 'wk022', en: 'resign', zh: '辞职', phonetic: '/rɪˈzaɪn/', example: 'He decided to resign from his position.', category: 'work' },
  { id: 'wk023', en: 'negotiate', zh: '谈判', phonetic: '/nɪˈɡəʊ.ʃi.eɪt/', example: 'We need to negotiate the terms of the deal.', category: 'work' },
  { id: 'wk024', en: 'delegate', zh: '委派', phonetic: '/ˈdel.ɪ.ɡeɪt/', example: 'A good manager knows how to delegate tasks.', category: 'work' },
  { id: 'wk025', en: 'collaborate', zh: '合作', phonetic: '/kəˈlæb.ə.reɪt/', example: 'The two departments collaborate on many projects.', category: 'work' },
  { id: 'wk026', en: 'implement', zh: '实施', phonetic: '/ˈɪm.plɪ.ment/', example: 'We will implement the new system next month.', category: 'work' },
  { id: 'wk027', en: 'approve', zh: '批准', phonetic: '/əˈpruːv/', example: 'The director needs to approve the budget.', category: 'work' },
  { id: 'wk028', en: 'submit', zh: '提交', phonetic: '/səbˈmɪt/', example: 'Please submit your application before the deadline.', category: 'work' },
  { id: 'wk029', en: 'review', zh: '审查', phonetic: '/rɪˈvjuː/', example: 'The committee will review all proposals.', category: 'work' },
  { id: 'wk030', en: 'coordinate', zh: '协调', phonetic: '/kəʊˈɔː.dɪ.neɪt/', example: 'She coordinates all international projects.', category: 'work' },
  { id: 'wk031', en: 'supervise', zh: '监督', phonetic: '/ˈsuː.pə.vaɪz/', example: 'He supervises a team of twenty people.', category: 'work' },
  { id: 'wk032', en: 'evaluate', zh: '评估', phonetic: '/ɪˈvæl.ju.eɪt/', example: 'We evaluate employee performance every quarter.', category: 'work' },
  { id: 'wk033', en: 'prioritize', zh: '优先处理', phonetic: '/praɪˈɒr.ɪ.taɪz/', example: 'You need to prioritize your daily tasks.', category: 'work' },
  { id: 'wk034', en: 'assign', zh: '分配', phonetic: '/əˈsaɪn/', example: 'The manager assigned me to a new project.', category: 'work' },
  { id: 'wk035', en: 'invest', zh: '投资', phonetic: '/ɪnˈvest/', example: 'The company will invest in new technology.', category: 'work' },
  { id: 'wk036', en: 'expand', zh: '扩展', phonetic: '/ɪkˈspænd/', example: 'We plan to expand into Asian markets.', category: 'work' },
  { id: 'wk037', en: 'recruit', zh: '招聘', phonetic: '/rɪˈkruːt/', example: 'HR is recruiting new graduates this month.', category: 'work' },
  { id: 'wk038', en: 'terminate', zh: '终止', phonetic: '/ˈtɜː.mɪ.neɪt/', example: 'The company decided to terminate the contract.', category: 'work' },
  { id: 'wk039', en: 'outsource', zh: '外包', phonetic: '/ˈaʊt.sɔːs/', example: 'They outsourced customer support to India.', category: 'work' },
  { id: 'wk040', en: 'automate', zh: '自动化', phonetic: '/ˈɔː.tə.meɪt/', example: 'We want to automate the invoicing process.', category: 'work' },
  { id: 'wk041', en: 'career', zh: '职业', phonetic: '/kəˈrɪər/', example: 'She built a successful career in finance.', category: 'work' },
  { id: 'wk042', en: 'profession', zh: '专业职业', phonetic: '/prəˈfeʃ.ən/', example: 'Teaching is a noble profession.', category: 'work' },
  { id: 'wk043', en: 'occupation', zh: '职业', phonetic: '/ˌɒk.juˈpeɪ.ʃən/', example: 'Please state your occupation on the form.', category: 'work' },
  { id: 'wk044', en: 'vacancy', zh: '空缺职位', phonetic: '/ˈveɪ.kən.si/', example: 'There is a vacancy in the marketing department.', category: 'work' },
  { id: 'wk045', en: 'applicant', zh: '申请人', phonetic: '/ˈæp.lɪ.kənt/', example: 'We received over 200 applicants for this role.', category: 'work' },
  { id: 'wk046', en: 'qualification', zh: '资格', phonetic: '/ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/', example: 'What qualifications do you have for this job?', category: 'work' },
  { id: 'wk047', en: 'reference', zh: '推荐人', phonetic: '/ˈref.ər.əns/', example: 'Please provide two professional references.', category: 'work' },
  { id: 'wk048', en: 'probation', zh: '试用期', phonetic: '/prəˈbeɪ.ʃən/', example: 'New employees have a three-month probation period.', category: 'work' },
  { id: 'wk049', en: 'overtime', zh: '加班', phonetic: '/ˈəʊ.və.taɪm/', example: 'She works overtime almost every day.', category: 'work' },
  { id: 'wk050', en: 'workload', zh: '工作量', phonetic: '/ˈwɜːk.ləʊd/', example: 'The workload has increased significantly this year.', category: 'work' },
  { id: 'wk051', en: 'commute', zh: '通勤', phonetic: '/kəˈmjuːt/', example: 'My daily commute takes about an hour.', category: 'work' },
  { id: 'wk052', en: 'internship', zh: '实习', phonetic: '/ˈɪn.tɜːn.ʃɪp/', example: 'She completed a summer internship at a law firm.', category: 'work' },
  { id: 'wk053', en: 'apprentice', zh: '学徒', phonetic: '/əˈpren.tɪs/', example: 'He started as an apprentice electrician.', category: 'work' },
  { id: 'wk054', en: 'mentor', zh: '导师', phonetic: '/ˈmen.tɔːr/', example: 'A good mentor can accelerate your career growth.', category: 'work' },
  { id: 'wk055', en: 'networking', zh: '人际网络', phonetic: '/ˈnet.wɜː.kɪŋ/', example: 'Networking is essential for career development.', category: 'work' },
  { id: 'wk056', en: 'layoff', zh: '裁员', phonetic: '/ˈleɪ.ɒf/', example: 'The company announced layoffs due to restructuring.', category: 'work' },
  { id: 'wk057', en: 'unemployment', zh: '失业', phonetic: '/ˌʌn.ɪmˈplɔɪ.mənt/', example: 'Unemployment rates have fallen this quarter.', category: 'work' },
  { id: 'wk058', en: 'freelance', zh: '自由职业', phonetic: '/ˈfriː.lɑːns/', example: 'She works as a freelance graphic designer.', category: 'work' },
  { id: 'wk059', en: 'transfer', zh: '调动', phonetic: '/trænsˈfɜːr/', example: 'He requested a transfer to the London office.', category: 'work' },
  { id: 'wk060', en: 'relocate', zh: '搬迁', phonetic: '/ˌriː.ləʊˈkeɪt/', example: 'They offered to relocate her to Singapore.', category: 'work' },
  { id: 'wk061', en: 'revenue', zh: '收入', phonetic: '/ˈrev.ən.juː/', example: 'The company revenue grew by 15 percent this year.', category: 'work' },
  { id: 'wk062', en: 'profit', zh: '利润', phonetic: '/ˈprɒf.ɪt/', example: 'We made a substantial profit last quarter.', category: 'work' },
  { id: 'wk063', en: 'loss', zh: '亏损', phonetic: '/lɒs/', example: 'The business reported a loss for the first time.', category: 'work' },
  { id: 'wk064', en: 'invoice', zh: '发票', phonetic: '/ˈɪn.vɔɪs/', example: 'Please send the invoice to our accounting department.', category: 'work' },
  { id: 'wk065', en: 'expense', zh: '费用', phonetic: '/ɪkˈspens/', example: 'Keep track of all your travel expenses.', category: 'work' },
  { id: 'wk066', en: 'asset', zh: '资产', phonetic: '/ˈæs.et/', example: 'The building is the company most valuable asset.', category: 'work' },
  { id: 'wk067', en: 'liability', zh: '负债', phonetic: '/ˌlaɪ.əˈbɪl.ə.ti/', example: 'All liabilities must be listed in the report.', category: 'work' },
  { id: 'wk068', en: 'equity', zh: '股权', phonetic: '/ˈek.wɪ.ti/', example: 'The founders retain majority equity in the company.', category: 'work' },
  { id: 'wk069', en: 'dividend', zh: '股息', phonetic: '/ˈdɪv.ɪ.dend/', example: 'Shareholders will receive a quarterly dividend.', category: 'work' },
  { id: 'wk070', en: 'audit', zh: '审计', phonetic: '/ˈɔː.dɪt/', example: 'An external firm will audit our accounts this year.', category: 'work' },
  { id: 'wk071', en: 'tax', zh: '税', phonetic: '/tæks/', example: 'We need to file our tax return by April.', category: 'work' },
  { id: 'wk072', en: 'payroll', zh: '工资单', phonetic: '/ˈpeɪ.rəʊl/', example: 'The payroll is processed on the last Friday of each month.', category: 'work' },
  { id: 'wk073', en: 'account', zh: '账户', phonetic: '/əˈkaʊnt/', example: 'Please open a new business account at the bank.', category: 'work' },
  { id: 'wk074', en: 'transaction', zh: '交易', phonetic: '/trænˈzæk.ʃən/', example: 'All transactions must be recorded in the ledger.', category: 'work' },
  { id: 'wk075', en: 'cashflow', zh: '现金流', phonetic: '/ˈkæʃ.fləʊ/', example: 'Managing cashflow is crucial for small businesses.', category: 'work' },
  { id: 'wk076', en: 'overhead', zh: '间接费用', phonetic: '/ˈəʊ.və.hed/', example: 'We need to reduce our overhead costs.', category: 'work' },
  { id: 'wk077', en: 'depreciation', zh: '折旧', phonetic: '/dɪˌpriː.ʃiˈeɪ.ʃən/', example: 'Depreciation of equipment is calculated annually.', category: 'work' },
  { id: 'wk078', en: 'forecast', zh: '预测', phonetic: '/ˈfɔː.kɑːst/', example: 'The sales forecast looks promising for next year.', category: 'work' },
  { id: 'wk079', en: 'fiscal', zh: '财政的', phonetic: '/ˈfɪs.kəl/', example: 'The fiscal year ends on March 31st.', category: 'work' },
  { id: 'wk080', en: 'capital', zh: '资本', phonetic: '/ˈkæp.ɪ.təl/', example: 'We need to raise capital for expansion.', category: 'work' },
  { id: 'wk081', en: 'leadership', zh: '领导力', phonetic: '/ˈliː.də.ʃɪp/', example: 'Good leadership is key to team success.', category: 'work' },
  { id: 'wk082', en: 'strategy', zh: '战略', phonetic: '/ˈstræt.ə.dʒi/', example: 'We need a new strategy for market expansion.', category: 'work' },
  { id: 'wk083', en: 'objective', zh: '目标', phonetic: '/əbˈdʒek.tɪv/', example: 'Our primary objective is to increase market share.', category: 'work' },
  { id: 'wk084', en: 'benchmark', zh: '基准', phonetic: '/ˈbentʃ.mɑːk/', example: 'We use industry benchmarks to measure performance.', category: 'work' },
  { id: 'wk085', en: 'stakeholder', zh: '利益相关者', phonetic: '/ˈsteɪk.həʊl.dər/', example: 'All stakeholders must be informed of the changes.', category: 'work' },
  { id: 'wk086', en: 'board', zh: '董事会', phonetic: '/bɔːd/', example: 'The board of directors meets quarterly.', category: 'work' },
  { id: 'wk087', en: 'executive', zh: '高管', phonetic: '/ɪɡˈzek.jʊ.tɪv/', example: 'The executive team made the final decision.', category: 'work' },
  { id: 'wk088', en: 'compliance', zh: '合规', phonetic: '/kəmˈplaɪ.əns/', example: 'All departments must follow compliance regulations.', category: 'work' },
  { id: 'wk089', en: 'policy', zh: '政策', phonetic: '/ˈpɒl.ə.si/', example: 'The company has a strict anti-harassment policy.', category: 'work' },
  { id: 'wk090', en: 'protocol', zh: '规程', phonetic: '/ˈprəʊ.tə.kɒl/', example: 'Follow the safety protocol at all times.', category: 'work' },
  { id: 'wk091', en: 'incentive', zh: '激励', phonetic: '/ɪnˈsen.tɪv/', example: 'The bonus system is a strong incentive for sales staff.', category: 'work' },
  { id: 'wk092', en: 'productivity', zh: '生产力', phonetic: '/ˌprɒd.ʌkˈtɪv.ə.ti/', example: 'Remote work has improved our productivity.', category: 'work' },
  { id: 'wk093', en: 'efficiency', zh: '效率', phonetic: '/ɪˈfɪʃ.ən.si/', example: 'We must improve efficiency to stay competitive.', category: 'work' },
  { id: 'wk094', en: 'turnover', zh: '人员流动率', phonetic: '/ˈtɜːn.əʊ.vər/', example: 'High employee turnover is a concern for HR.', category: 'work' },
  { id: 'wk095', en: 'restructure', zh: '重组', phonetic: '/ˌriːˈstrʌk.tʃər/', example: 'The company will restructure its operations next year.', category: 'work' },
  { id: 'wk096', en: 'acquisition', zh: '收购', phonetic: '/ˌæk.wɪˈzɪʃ.ən/', example: 'The acquisition of the startup was completed last month.', category: 'work' },
  { id: 'wk097', en: 'merger', zh: '合并', phonetic: '/ˈmɜː.dʒər/', example: 'The merger created the largest bank in the country.', category: 'work' },
  { id: 'wk098', en: 'subsidiary', zh: '子公司', phonetic: '/səbˈsɪd.i.ər.i/', example: 'They opened a subsidiary in Germany.', category: 'work' },
  { id: 'wk099', en: 'franchise', zh: '特许经营', phonetic: '/ˈfræn.tʃaɪz/', example: 'They expanded through a franchise model.', category: 'work' },
  { id: 'wk100', en: 'logistics', zh: '物流', phonetic: '/ləˈdʒɪs.tɪks/', example: 'The logistics team handles all shipping and delivery.', category: 'work' },
  { id: 'wk101', en: 'communicate', zh: '沟通', phonetic: '/kəˈmjuː.nɪ.keɪt/', example: 'We need to communicate our plans more clearly.', category: 'work' },
  { id: 'wk102', en: 'memo', zh: '备忘录', phonetic: '/ˈmem.əʊ/', example: 'The CEO sent a memo to all employees.', category: 'work' },
  { id: 'wk103', en: 'announcement', zh: '公告', phonetic: '/əˈnaʊn.smənt/', example: 'The announcement was posted on the intranet.', category: 'work' },
  { id: 'wk104', en: 'brief', zh: '简报', phonetic: '/briːf/', example: 'Give me a brief summary of the meeting.', category: 'work' },
  { id: 'wk105', en: 'correspondence', zh: '通信', phonetic: '/ˌkɒr.ɪˈspɒn.dəns/', example: 'All business correspondence must be archived.', category: 'work' },
  { id: 'wk106', en: 'circular', zh: '通知', phonetic: '/ˈsɜː.kjʊ.lər/', example: 'A circular was distributed to all departments.', category: 'work' },
  { id: 'wk107', en: 'dialogue', zh: '对话', phonetic: '/ˈdaɪ.ə.lɒɡ/', example: 'We encourage open dialogue between employees and management.', category: 'work' },
  { id: 'wk108', en: 'feedback', zh: '反馈', phonetic: '/ˈfiːd.bæk/', example: 'We welcome feedback from all team members.', category: 'work' },
  { id: 'wk109', en: 'escalate', zh: '上报', phonetic: '/ˈes.kə.leɪt/', example: 'Please escalate this issue to senior management.', category: 'work' },
  { id: 'wk110', en: 'stakeholder', zh: '利益相关者', phonetic: '/ˈsteɪk.həʊl.dər/', example: 'We must keep all stakeholders informed.', category: 'work' },
  { id: 'wk111', en: 'liaise', zh: '联络', phonetic: '/liˈeɪz/', example: 'She liaises between the sales and production teams.', category: 'work' },
  { id: 'wk112', en: 'disseminate', zh: '传播', phonetic: '/dɪˈsem.ɪ.neɪt/', example: 'We need to disseminate this information quickly.', category: 'work' },
  { id: 'wk113', en: 'articulate', zh: '清楚表达', phonetic: '/ɑːˈtɪk.jʊ.leɪt/', example: 'She articulated her vision clearly to the team.', category: 'work' },
  { id: 'wk114', en: 'consensus', zh: '共识', phonetic: '/kənˈsen.səs/', example: 'We reached a consensus after a long discussion.', category: 'work' },
  { id: 'wk115', en: 'diplomatic', zh: '圆通的', phonetic: '/ˌdɪp.ləˈmæt.ɪk/', example: 'He gave a very diplomatic response to the criticism.', category: 'work' },
  { id: 'wk116', en: 'clarity', zh: '清晰', phonetic: '/ˈklær.ə.ti/', example: 'Clarity in communication prevents misunderstandings.', category: 'work' },
  { id: 'wk117', en: 'transparency', zh: '透明度', phonetic: '/trænˈspær.ən.si/', example: 'The company values transparency with its employees.', category: 'work' },
  { id: 'wk118', en: 'disclosure', zh: '披露', phonetic: '/dɪˈskləʊ.ʒər/', example: 'Full disclosure is required by law.', category: 'work' },
  { id: 'wk119', en: 'affirmation', zh: '确认', phonetic: '/ˌæf.əˈmeɪ.ʃən/', example: 'We need written affirmation of the agreement.', category: 'work' },
  { id: 'wk120', en: 'conference', zh: '会议', phonetic: '/ˈkɒn.fər.əns/', example: 'The annual conference will be held in Chicago.', category: 'work' },
  { id: 'wk121', en: 'agenda', zh: '议程', phonetic: '/əˈdʒen.də/', example: 'What is on the agenda for today meeting?', category: 'work' },
  { id: 'wk122', en: 'minutes', zh: '会议记录', phonetic: '/ˈmɪn.ɪts/', example: 'She took the minutes during the meeting.', category: 'work' },
  { id: 'wk123', en: 'chair', zh: '主持', phonetic: '/tʃeər/', example: 'He will chair the meeting this afternoon.', category: 'work' },
  { id: 'wk124', en: 'attendee', zh: '与会者', phonetic: '/ə.tenˈdiː/', example: 'There were twenty attendees at the workshop.', category: 'work' },
  { id: 'wk125', en: 'action item', zh: '行动事项', phonetic: '/ˈæk.ʃən ˈaɪ.təm/', example: 'Each team member was assigned an action item.', category: 'work' },
  { id: 'wk126', en: 'follow-up', zh: '跟进', phonetic: '/ˈfɒl.əʊ ʌp/', example: 'I will send a follow-up email after our call.', category: 'work' },
  { id: 'wk127', en: 'brainstorm', zh: '头脑风暴', phonetic: '/ˈbreɪn.stɔːm/', example: 'Let brainstorm some ideas for the new campaign.', category: 'work' },
  { id: 'wk128', en: 'roundtable', zh: '圆桌会议', phonetic: '/ˈraʊnd.teɪ.bəl/', example: 'The roundtable discussion was very productive.', category: 'work' },
  { id: 'wk129', en: 'webinar', zh: '网络研讨会', phonetic: '/ˈweb.ɪ.nɑːr/', example: 'I attended a webinar on digital marketing.', category: 'work' },
  { id: 'wk130', en: 'breakout', zh: '分组讨论', phonetic: '/ˈbreɪk.aʊt/', example: 'We split into breakout groups for discussion.', category: 'work' },
  { id: 'wk131', en: 'adjourn', zh: '休会', phonetic: '/əˈdʒɜːn/', example: 'The meeting was adjourned until next Tuesday.', category: 'work' },
  { id: 'wk132', en: 'quorum', zh: '法定人数', phonetic: '/ˈkwɔː.rəm/', example: 'We do not have a quorum to vote on this matter.', category: 'work' },
  { id: 'wk133', en: 'motion', zh: '动议', phonetic: '/ˈməʊ.ʃən/', example: 'She put forward a motion to increase the budget.', category: 'work' },
  { id: 'wk134', en: 'second', zh: '附议', phonetic: '/sɪˈkɒnd/', example: 'I second the motion to approve the proposal.', category: 'work' },
  { id: 'wk135', en: 'convene', zh: '召集', phonetic: '/kənˈviːn/', example: 'The board will convene next Monday.', category: 'work' },
  { id: 'wk136', en: 'wrap up', zh: '结束', phonetic: '/ræp ʌp/', example: 'Let wrap up the meeting by summarizing key points.', category: 'work' },
  { id: 'wk137', en: 'itinerary', zh: '行程表', phonetic: '/aɪˈtɪn.ər.ər.i/', example: 'Your travel itinerary has been confirmed.', category: 'work' },
  { id: 'wk138', en: 'briefing', zh: '简报会', phonetic: '/ˈbriː.fɪŋ/', example: 'We have a briefing at 9 AM every morning.', category: 'work' },
  { id: 'wk139', en: 'videoconference', zh: '视频会议', phonetic: '/ˈvɪd.i.əʊˌkɒn.fər.əns/', example: 'The team joined via videoconference from three countries.', category: 'work' },
  { id: 'wk140', en: 'keynote', zh: '主题演讲', phonetic: '/ˈkiː.nəʊt/', example: 'The CEO will deliver the keynote speech.', category: 'work' },
  { id: 'wk141', en: 'clause', zh: '条款', phonetic: '/klɔːz/', example: 'There is a confidentiality clause in the contract.', category: 'work' },
  { id: 'wk142', en: 'jurisdiction', zh: '管辖权', phonetic: '/ˌdʒʊə.rɪsˈdɪk.ʃən/', example: 'This matter falls under federal jurisdiction.', category: 'work' },
  { id: 'wk143', en: 'arbitration', zh: '仲裁', phonetic: '/ˌɑː.bɪˈtreɪ.ʃən/', example: 'The dispute was settled through arbitration.', category: 'work' },
  { id: 'wk144', en: 'litigation', zh: '诉讼', phonetic: '/ˌlɪt.ɪˈɡeɪ.ʃən/', example: 'The company wants to avoid costly litigation.', category: 'work' },
  { id: 'wk145', en: 'breach', zh: '违约', phonetic: '/briːtʃ/', example: 'This action constitutes a breach of contract.', category: 'work' },
  { id: 'wk146', en: 'indemnity', zh: '赔偿', phonetic: '/ɪnˈdem.nə.ti/', example: 'The agreement includes an indemnity clause.', category: 'work' },
  { id: 'wk147', en: 'waiver', zh: '弃权', phonetic: '/ˈweɪ.vər/', example: 'You must sign a liability waiver before participating.', category: 'work' },
  { id: 'wk148', en: 'liability', zh: '法律责任', phonetic: '/ˌlaɪ.əˈbɪl.ə.ti/', example: 'The company accepts no liability for lost items.', category: 'work' },
  { id: 'wk149', en: 'intellectual property', zh: '知识产权', phonetic: '/ˌɪn.təlˈek.tʃu.əl ˈprɒp.ə.ti/', example: 'We must protect our intellectual property.', category: 'work' },
  { id: 'wk150', en: 'patent', zh: '专利', phonetic: '/ˈpeɪ.tənt/', example: 'They filed a patent for the new invention.', category: 'work' },
  { id: 'wk151', en: 'trademark', zh: '商标', phonetic: '/ˈtreɪd.mɑːk/', example: 'The company logo is a registered trademark.', category: 'work' },
  { id: 'wk152', en: 'copyright', zh: '版权', phonetic: '/ˈkɒp.i.raɪt/', example: 'The content is protected by copyright law.', category: 'work' },
  { id: 'wk153', en: 'defamation', zh: '诽谤', phonetic: '/ˌdef.əˈmeɪ.ʃən/', example: 'The article could be grounds for defamation.', category: 'work' },
  { id: 'wk154', en: 'non-disclosure', zh: '保密协议', phonetic: '/nɒn dɪˈskləʊ.ʒər/', example: 'All employees must sign a non-disclosure agreement.', category: 'work' },
  { id: 'wk155', en: 'statute', zh: '法规', phonetic: '/ˈstætʃ.uːt/', example: 'This practice is required by statute.', category: 'work' },
  { id: 'wk156', en: 'regulation', zh: '规章', phonetic: '/ˌreɡ.jʊˈleɪ.ʃən/', example: 'New regulations affect how we handle data.', category: 'work' },
  { id: 'wk157', en: 'legislation', zh: '立法', phonetic: '/ˌledʒ.ɪˈsleɪ.ʃən/', example: 'New labor legislation takes effect next month.', category: 'work' },
  { id: 'wk158', en: 'notary', zh: '公证人', phonetic: '/ˈnəʊ.tər.i/', example: 'The document must be certified by a notary.', category: 'work' },
  { id: 'wk159', en: 'affidavit', zh: '宣誓书', phonetic: '/ˌæf.ɪˈdeɪ.vɪt/', example: 'He submitted an affidavit to the court.', category: 'work' },
  { id: 'wk160', en: 'settlement', zh: '和解', phonetic: '/ˈset.əl.mənt/', example: 'The parties reached a settlement out of court.', category: 'work' },
  { id: 'wk161', en: 'brand', zh: '品牌', phonetic: '/brænd/', example: 'Building a strong brand takes years.', category: 'work' },
  { id: 'wk162', en: 'campaign', zh: '营销活动', phonetic: '/kæmˈpeɪn/', example: 'The marketing campaign was a huge success.', category: 'work' },
  { id: 'wk163', en: 'advertisement', zh: '广告', phonetic: '/ədˈvɜː.tɪs.mənt/', example: 'We placed an advertisement in the local paper.', category: 'work' },
  { id: 'wk164', en: 'promote', zh: '推广', phonetic: '/prəˈməʊt/', example: 'We need to promote our new product aggressively.', category: 'work' },
  { id: 'wk165', en: 'public relations', zh: '公共关系', phonetic: '/ˈpʌb.lɪk rɪˈleɪ.ʃənz/', example: 'The PR team handled the crisis well.', category: 'work' },
  { id: 'wk166', en: 'target audience', zh: '目标受众', phonetic: '/ˈtɑː.ɡɪt ˈɔː.di.əns/', example: 'Our target audience is young professionals.', category: 'work' },
  { id: 'wk167', en: 'market research', zh: '市场调研', phonetic: '/ˈmɑː.kɪt rɪˈsɜːtʃ/', example: 'Market research shows growing demand for our product.', category: 'work' },
  { id: 'wk168', en: 'segmentation', zh: '市场细分', phonetic: '/ˌseɡ.menˈteɪ.ʃən/', example: 'Customer segmentation helps us tailor our messaging.', category: 'work' },
  { id: 'wk169', en: 'copywriting', zh: '文案撰写', phonetic: '/ˈkɒp.i.raɪ.tɪŋ/', example: 'She specializes in advertising copywriting.', category: 'work' },
  { id: 'wk170', en: 'analytics', zh: '数据分析', phonetic: '/ˌæn.əˈlɪt.ɪks/', example: 'Web analytics show a spike in traffic this week.', category: 'work' },
  { id: 'wk171', en: 'conversion', zh: '转化率', phonetic: '/kənˈvɜː.ʃən/', example: 'We need to improve our conversion rate.', category: 'work' },
  { id: 'wk172', en: 'engagement', zh: '参与度', phonetic: '/ɪnˈɡeɪdʒ.mənt/', example: 'Social media engagement has doubled this month.', category: 'work' },
  { id: 'wk173', en: 'positioning', zh: '定位', phonetic: '/pəˈzɪʃ.ən.ɪŋ/', example: 'Brand positioning is key in a crowded market.', category: 'work' },
  { id: 'wk174', en: 'rebrand', zh: '品牌重塑', phonetic: '/ˌriːˈbrænd/', example: 'The company decided to rebrand after the merger.', category: 'work' },
  { id: 'wk175', en: 'sponsorship', zh: '赞助', phonetic: '/ˈspɒn.sə.ʃɪp/', example: 'We secured sponsorship for the annual conference.', category: 'work' },
  { id: 'wk176', en: 'endorsement', zh: '代言', phonetic: '/ɪnˈdɔːs.mənt/', example: 'The celebrity endorsement boosted sales significantly.', category: 'work' },
  { id: 'wk177', en: 'press release', zh: '新闻稿', phonetic: '/pres rɪˈliːs/', example: 'The company issued a press release about the launch.', category: 'work' },
  { id: 'wk178', en: 'viral', zh: '病毒式传播', phonetic: '/ˈvaɪ.rəl/', example: 'The video went viral within hours.', category: 'work' },
  { id: 'wk179', en: 'outreach', zh: '外联', phonetic: '/ˈaʊt.riːtʃ/', example: 'Our outreach program connects us with local communities.', category: 'work' },
  { id: 'wk180', en: 'content strategy', zh: '内容策略', phonetic: '/ˈkɒn.tent ˈstræt.ə.dʒi/', example: 'A solid content strategy drives organic traffic.', category: 'work' },
  { id: 'wk181', en: 'prospect', zh: '潜在客户', phonetic: '/ˈprɒs.pekt/', example: 'We identified several new prospects this quarter.', category: 'work' },
  { id: 'wk182', en: 'pitch', zh: '推销', phonetic: '/pɪtʃ/', example: 'She delivered a compelling sales pitch.', category: 'work' },
  { id: 'wk183', en: 'quota', zh: '定额', phonetic: '/ˈkwəʊ.tə/', example: 'The sales team exceeded their quarterly quota.', category: 'work' },
  { id: 'wk184', en: 'commission', zh: '佣金', phonetic: '/kəˈmɪʃ.ən/', example: 'Sales representatives earn a 10 percent commission.', category: 'work' },
  { id: 'wk185', en: 'cold call', zh: '陌生拜访', phonetic: '/kəʊld kɔːl/', example: 'Cold calling is still an effective sales technique.', category: 'work' },
  { id: 'wk186', en: 'lead', zh: '销售线索', phonetic: '/liːd/', example: 'We need more qualified leads for the sales team.', category: 'work' },
  { id: 'wk187', en: 'close', zh: '成交', phonetic: '/kləʊz/', example: 'She managed to close the deal after weeks of negotiation.', category: 'work' },
  { id: 'wk188', en: 'discount', zh: '折扣', phonetic: '/ˈdɪs.kaʊnt/', example: 'We can offer a 15 percent discount on bulk orders.', category: 'work' },
  { id: 'wk189', en: 'after-sales', zh: '售后', phonetic: '/ˈɑːf.tə seɪlz/', example: 'Good after-sales service builds customer loyalty.', category: 'work' },
  { id: 'wk190', en: 'upsell', zh: '追加销售', phonetic: '/ˈʌp.sel/', example: 'Try to upsell customers to the premium package.', category: 'work' },
  { id: 'wk191', en: 'referral', zh: '推荐', phonetic: '/rɪˈfɜː.rəl/', example: 'Most of our new business comes from referrals.', category: 'work' },
  { id: 'wk192', en: 'objection', zh: '异议', phonetic: '/əbˈdʒek.ʃən/', example: 'He handled every customer objection professionally.', category: 'work' },
  { id: 'wk193', en: 'account manager', zh: '客户经理', phonetic: '/əˈkaʊnt ˈmæn.ɪ.dʒər/', example: 'Your account manager will handle all your requests.', category: 'work' },
  { id: 'wk194', en: 'tender', zh: '投标', phonetic: '/ˈten.dər/', example: 'We submitted a tender for the government contract.', category: 'work' },
  { id: 'wk195', en: 'pipeline', zh: '销售渠道', phonetic: '/ˈpaɪp.laɪn/', example: 'Our sales pipeline is looking strong for next quarter.', category: 'work' },
  { id: 'wk196', en: 'retainer', zh: '预聘费', phonetic: '/rɪˈteɪ.nər/', example: 'The client pays a monthly retainer for our services.', category: 'work' },
  { id: 'wk197', en: 'negotiation', zh: '谈判', phonetic: '/nɪˌɡəʊ.ʃiˈeɪ.ʃən/', example: 'The negotiation lasted for several hours.', category: 'work' },
  { id: 'wk198', en: 'wholesale', zh: '批发', phonetic: '/ˈhəʊl.seɪl/', example: 'We sell our products at wholesale prices to retailers.', category: 'work' },
  { id: 'wk199', en: 'customer retention', zh: '客户留存', phonetic: '/ˈkʌs.tə.mər rɪˈten.ʃən/', example: 'Customer retention is cheaper than acquisition.', category: 'work' },
  { id: 'wk200', en: 'value proposition', zh: '价值主张', phonetic: '/ˈvæl.juː ˌprɒp.əˈzɪʃ.ən/', example: 'Our value proposition sets us apart from competitors.', category: 'work' },
  { id: 'wk201', en: 'onboarding', zh: '入职培训', phonetic: '/ˈɒn.bɔː.dɪŋ/', example: 'The onboarding process takes about two weeks.', category: 'work' },
  { id: 'wk202', en: 'compensation', zh: '薪酬', phonetic: '/ˌkɒm.penˈseɪ.ʃən/', example: 'The compensation package includes health insurance.', category: 'work' },
  { id: 'wk203', en: 'benefits', zh: '福利', phonetic: '/ˈben.ɪ.fɪts/', example: 'The company offers excellent benefits to its staff.', category: 'work' },
  { id: 'wk204', en: 'pension', zh: '养老金', phonetic: '/ˈpen.ʃən/', example: 'Employees contribute to a pension plan each month.', category: 'work' },
  { id: 'wk205', en: 'leave', zh: '休假', phonetic: '/liːv/', example: 'She is on maternity leave until September.', category: 'work' },
  { id: 'wk206', en: 'absenteeism', zh: '旷工', phonetic: '/ˌæb.sənˈtiː.ɪ.zəm/', example: 'Absenteeism has decreased since the new policy.', category: 'work' },
  { id: 'wk207', en: 'disciplinary', zh: '纪律处分', phonetic: '/ˌdɪs.ɪˈplɪn.ər.i/', example: 'He faces disciplinary action for misconduct.', category: 'work' },
  { id: 'wk208', en: 'grievance', zh: '申诉', phonetic: '/ˈɡriː.vəns/', example: 'She filed a grievance against her supervisor.', category: 'work' },
  { id: 'wk209', en: 'performance review', zh: '绩效评估', phonetic: '/pəˈfɔː.məns rɪˈvjuː/', example: 'Your performance review is scheduled for next week.', category: 'work' },
  { id: 'wk210', en: 'appraisal', zh: '评估', phonetic: '/əˈpreɪ.zəl/', example: 'The annual appraisal determines your bonus.', category: 'work' },
  { id: 'wk211', en: 'upskill', zh: '技能提升', phonetic: '/ˈʌp.skɪl/', example: 'The company encourages employees to upskill regularly.', category: 'work' },
  { id: 'wk212', en: 'reskilling', zh: '再培训', phonetic: '/ˌriːˈskɪl.ɪŋ/', example: 'Reskilling programs help workers adapt to automation.', category: 'work' },
  { id: 'wk213', en: 'severance', zh: '遣散费', phonetic: '/ˈsev.ər.əns/', example: 'He received three months of severance pay.', category: 'work' },
  { id: 'wk214', en: 'headcount', zh: '人数统计', phonetic: '/ˈhed.kaʊnt/', example: 'The department headcount has grown to fifty.', category: 'work' },
  { id: 'wk215', en: 'diversity', zh: '多样性', phonetic: '/daɪˈvɜː.sə.ti/', example: 'We are committed to diversity in the workplace.', category: 'work' },
  { id: 'wk216', en: 'inclusion', zh: '包容性', phonetic: '/ɪnˈkluː.ʒən/', example: 'Inclusion is a core value of our company culture.', category: 'work' },
  { id: 'wk217', en: 'remote work', zh: '远程工作', phonetic: '/rɪˈməʊt wɜːk/', example: 'Remote work has become more common since the pandemic.', category: 'work' },
  { id: 'wk218', en: 'hybrid', zh: '混合办公', phonetic: '/ˈhaɪ.brɪd/', example: 'Our company has adopted a hybrid work model.', category: 'work' },
  { id: 'wk219', en: 'wellness', zh: '健康福利', phonetic: '/ˈwel.nəs/', example: 'The company offers wellness programs for all staff.', category: 'work' },
  { id: 'wk220', en: 'attrition', zh: '人员流失', phonetic: '/əˈtrɪʃ.ən/', example: 'High attrition rates are costly for the business.', category: 'work' },
  { id: 'wk221', en: 'startup', zh: '初创公司', phonetic: '/ˈstɑːt.ʌp/', example: 'She left her corporate job to join a startup.', category: 'work' },
  { id: 'wk222', en: 'entrepreneur', zh: '企业家', phonetic: '/ˌɒn.trə.prəˈnɜːr/', example: 'He is a successful entrepreneur in the tech industry.', category: 'work' },
  { id: 'wk223', en: 'venture', zh: '风险企业', phonetic: '/ˈven.tʃər/', example: 'They launched a new business venture last year.', category: 'work' },
  { id: 'wk224', en: 'funding', zh: '资金', phonetic: '/ˈfʌn.dɪŋ/', example: 'The startup secured Series A funding.', category: 'work' },
  { id: 'wk225', en: 'investor', zh: '投资者', phonetic: '/ɪnˈves.tər/', example: 'We pitched our idea to potential investors.', category: 'work' },
  { id: 'wk226', en: 'bootstrapping', zh: '自筹资金', phonetic: '/ˈbuːt.stræp.ɪŋ/', example: 'They built the company through bootstrapping.', category: 'work' },
  { id: 'wk227', en: 'scale', zh: '规模化', phonetic: '/skeɪl/', example: 'The company is ready to scale its operations.', category: 'work' },
  { id: 'wk228', en: 'accelerator', zh: '加速器', phonetic: '/əkˈsel.ə.reɪ.tər/', example: 'They joined a startup accelerator program.', category: 'work' },
  { id: 'wk229', en: 'incubator', zh: '孵化器', phonetic: '/ˈɪŋ.kjʊ.beɪ.tər/', example: 'The business incubator provides office space and mentoring.', category: 'work' },
  { id: 'wk230', en: 'pivot', zh: '转型', phonetic: '/ˈpɪv.ət/', example: 'The company decided to pivot to a new market.', category: 'work' },
  { id: 'wk231', en: 'disrupt', zh: '颠覆', phonetic: '/dɪsˈrʌpt/', example: 'They aim to disrupt the traditional banking industry.', category: 'work' },
  { id: 'wk232', en: 'innovation', zh: '创新', phonetic: '/ˌɪn.əˈveɪ.ʃən/', example: 'Innovation is at the heart of our company culture.', category: 'work' },
  { id: 'wk233', en: 'prototype', zh: '原型', phonetic: '/ˈprəʊ.tə.taɪp/', example: 'We built a prototype to test the concept.', category: 'work' },
  { id: 'wk234', en: 'minimum viable product', zh: '最小可行产品', phonetic: '/ˈmɪn.ɪ.məm ˈvaɪ.ə.bəl ˈprɒd.ʌkt/', example: 'Launch with a minimum viable product and iterate quickly.', category: 'work' },
  { id: 'wk235', en: 'agile', zh: '敏捷的', phonetic: '/ˈædʒ.aɪl/', example: 'We use agile methodology for software development.', category: 'work' },
  { id: 'wk236', en: 'milestone', zh: '里程碑', phonetic: '/ˈmaɪl.stəʊn/', example: 'Reaching 10000 users was a major milestone.', category: 'work' },
  { id: 'wk237', en: 'ROI', zh: '投资回报率', phonetic: '/ɑːr əʊ aɪ/', example: 'We need to calculate the ROI before investing.', category: 'work' },
  { id: 'wk238', en: 'KPIs', zh: '关键绩效指标', phonetic: '/keɪ piː aɪz/', example: 'Our KPIs show steady improvement this quarter.', category: 'work' },
  { id: 'wk239', en: 'quarterly', zh: '每季度的', phonetic: '/ˈkwɔː.tə.li/', example: 'We release quarterly earnings reports.', category: 'work' },
  { id: 'wk240', en: 'procurement', zh: '采购', phonetic: '/prəˈkjʊə.mənt/', example: 'The procurement department handles all supplier contracts.', category: 'work' },
  { id: 'wk241', en: 'vendor', zh: '供应商', phonetic: '/ˈven.dər/', example: 'We need to find a reliable vendor for raw materials.', category: 'work' },
  { id: 'wk242', en: 'supply chain', zh: '供应链', phonetic: '/səˈplaɪ tʃeɪn/', example: 'Supply chain disruptions have delayed production.', category: 'work' },
  { id: 'wk243', en: 'inventory', zh: '库存', phonetic: '/ˈɪn.vən.tər.i/', example: 'We need to take inventory at the end of the month.', category: 'work' },
  { id: 'wk244', en: 'warehouse', zh: '仓库', phonetic: '/ˈweə.haʊs/', example: 'The goods are stored in our main warehouse.', category: 'work' },
  { id: 'wk245', en: 'shipping', zh: '运输', phonetic: '/ˈʃɪp.ɪŋ/', example: 'Shipping costs have increased this year.', category: 'work' },
  { id: 'wk246', en: 'wholesaler', zh: '批发商', phonetic: '/ˈhəʊl.seɪ.lər/', example: 'We distribute through a network of wholesalers.', category: 'work' },
  { id: 'wk247', en: 'manufacturing', zh: '制造业', phonetic: '/ˌmæn.jʊˈfæk.tʃər.ɪŋ/', example: 'Manufacturing will begin once the design is approved.', category: 'work' },
  { id: 'wk248', en: 'quality assurance', zh: '质量保证', phonetic: '/ˈkwɒl.ə.ti əˈʃʊə.rəns/', example: 'Every product goes through quality assurance testing.', category: 'work' },
  { id: 'wk249', en: 'process optimization', zh: '流程优化', phonetic: '/ˈprəʊ.ses ˌɒp.tɪ.maɪˈzeɪ.ʃən/', example: 'Process optimization saved the company millions.', category: 'work' },
  { id: 'wk250', en: 'business continuity', zh: '业务连续性', phonetic: '/ˈbɪz.nɪs ˌkɒn.tɪˈnjuː.ə.ti/', example: 'We have a business continuity plan for emergencies.', category: 'work' }
];

// -- js/data/words_technology.js --
const WORDS_TECHNOLOGY = [
  { id: 'te001', en: 'computer', zh: '计算机', phonetic: '/kəmˈpjuː.tər/', example: 'I use my computer every day.', category: 'technology' },
  { id: 'te002', en: 'laptop', zh: '笔记本电脑', phonetic: '/ˈlæp.tɒp/', example: 'She bought a new laptop for school.', category: 'technology' },
  { id: 'te003', en: 'smartphone', zh: '智能手机', phonetic: '/ˈsmɑːt.fəʊn/', example: 'He checked the map on his smartphone.', category: 'technology' },
  { id: 'te004', en: 'tablet', zh: '平板电脑', phonetic: '/ˈtæb.lət/', example: 'Kids enjoy drawing on the tablet.', category: 'technology' },
  { id: 'te005', en: 'keyboard', zh: '键盘', phonetic: '/ˈkiː.bɔːd/', example: 'I need a new mechanical keyboard.', category: 'technology' },
  { id: 'te006', en: 'mouse', zh: '鼠标', phonetic: '/maʊs/', example: 'The mouse stopped working yesterday.', category: 'technology' },
  { id: 'te007', en: 'monitor', zh: '显示器', phonetic: '/ˈmɒn.ɪ.tər/', example: 'He connected a second monitor to his desk.', category: 'technology' },
  { id: 'te008', en: 'screen', zh: '屏幕', phonetic: '/skriːn/', example: 'The screen is too bright at night.', category: 'technology' },
  { id: 'te009', en: 'printer', zh: '打印机', phonetic: '/ˈprɪn.tər/', example: 'The printer ran out of ink again.', category: 'technology' },
  { id: 'te010', en: 'scanner', zh: '扫描仪', phonetic: '/ˈskæn.ər/', example: 'Use the scanner to digitize the document.', category: 'technology' },
  { id: 'te011', en: 'speaker', zh: '扬声器', phonetic: '/ˈspiː.kər/', example: 'The speakers produce excellent sound quality.', category: 'technology' },
  { id: 'te012', en: 'headphones', zh: '耳机', phonetic: '/ˈhed.fəʊnz/', example: 'I wear noise-canceling headphones while working.', category: 'technology' },
  { id: 'te013', en: 'microphone', zh: '麦克风', phonetic: '/ˈmaɪ.krə.fəʊn/', example: 'She spoke into the microphone clearly.', category: 'technology' },
  { id: 'te014', en: 'camera', zh: '相机', phonetic: '/ˈkæm.ər.ə/', example: 'The camera has a 48-megapixel sensor.', category: 'technology' },
  { id: 'te015', en: 'charger', zh: '充电器', phonetic: '/ˈtʃɑː.dʒər/', example: 'Don\'t forget to pack your phone charger.', category: 'technology' },
  { id: 'te016', en: 'battery', zh: '电池', phonetic: '/ˈbæt.ər.i/', example: 'The battery lasts about ten hours.', category: 'technology' },
  { id: 'te017', en: 'cable', zh: '电缆', phonetic: '/ˈkeɪ.bəl/', example: 'I need a longer USB cable for my desk.', category: 'technology' },
  { id: 'te018', en: 'router', zh: '路由器', phonetic: '/ˈruː.tər/', example: 'Restart the router if the internet is slow.', category: 'technology' },
  { id: 'te019', en: 'modem', zh: '调制解调器', phonetic: '/ˈməʊ.dem/', example: 'The modem connects our home to the internet.', category: 'technology' },
  { id: 'te020', en: 'server', zh: '服务器', phonetic: '/ˈsɜː.vər/', example: 'The website is hosted on a remote server.', category: 'technology' },
  { id: 'te021', en: 'hard drive', zh: '硬盘', phonetic: '/hɑːd draɪv/', example: 'I backed up my files to an external hard drive.', category: 'technology' },
  { id: 'te022', en: 'memory', zh: '内存', phonetic: '/ˈmem.ər.i/', example: 'This laptop has sixteen gigabytes of memory.', category: 'technology' },
  { id: 'te023', en: 'processor', zh: '处理器', phonetic: '/ˈprəʊ.ses.ər/', example: 'The new processor is much faster than the old one.', category: 'technology' },
  { id: 'te024', en: 'chip', zh: '芯片', phonetic: '/tʃɪp/', example: 'The chip is manufactured using advanced technology.', category: 'technology' },
  { id: 'te025', en: 'motherboard', zh: '主板', phonetic: '/ˈmʌð.ə.bɔːd/', example: 'He replaced the motherboard after the power surge.', category: 'technology' },
  { id: 'te026', en: 'USB', zh: '通用串行总线', phonetic: '/ˌjuː.esˈbiː/', example: 'Save the file to a USB flash drive.', category: 'technology' },
  { id: 'te027', en: 'Bluetooth', zh: '蓝牙', phonetic: '/ˈbluː.tuːθ/', example: 'Pair your headphones via Bluetooth.', category: 'technology' },
  { id: 'te028', en: 'Wi-Fi', zh: '无线网络', phonetic: '/ˈwaɪ.faɪ/', example: 'The cafe offers free Wi-Fi to customers.', category: 'technology' },
  { id: 'te029', en: 'webcam', zh: '网络摄像头', phonetic: '/ˈweb.kæm/', example: 'She turned on her webcam for the meeting.', category: 'technology' },
  { id: 'te030', en: 'drone', zh: '无人机', phonetic: '/drəʊn/', example: 'The drone captured stunning aerial footage.', category: 'technology' },
  { id: 'te031', en: 'software', zh: '软件', phonetic: '/ˈsɒft.weər/', example: 'This software helps me edit photos easily.', category: 'technology' },
  { id: 'te032', en: 'application', zh: '应用程序', phonetic: '/ˌæp.lɪˈkeɪ.ʃən/', example: 'I downloaded a new fitness application.', category: 'technology' },
  { id: 'te033', en: 'browser', zh: '浏览器', phonetic: '/ˈbraʊ.zər/', example: 'Open the website in your browser.', category: 'technology' },
  { id: 'te034', en: 'operating system', zh: '操作系统', phonetic: '/ˈɒp.ər.eɪ.tɪŋ ˈsɪs.təm/', example: 'Windows is a popular operating system.', category: 'technology' },
  { id: 'te035', en: 'file', zh: '文件', phonetic: '/faɪl/', example: 'Please save the file before closing.', category: 'technology' },
  { id: 'te036', en: 'folder', zh: '文件夹', phonetic: '/ˈfəʊl.dər/', example: 'Move the documents into the shared folder.', category: 'technology' },
  { id: 'te037', en: 'document', zh: '文档', phonetic: '/ˈdɒk.jə.mənt/', example: 'She created a new document for the report.', category: 'technology' },
  { id: 'te038', en: 'spreadsheet', zh: '电子表格', phonetic: '/ˈspred.ʃiːt/', example: 'The budget is tracked in a spreadsheet.', category: 'technology' },
  { id: 'te039', en: 'database', zh: '数据库', phonetic: '/ˈdeɪ.tə.beɪs/', example: 'The database stores millions of customer records.', category: 'technology' },
  { id: 'te040', en: 'backup', zh: '备份', phonetic: '/ˈbæk.ʌp/', example: 'Always create a backup before updating.', category: 'technology' },
  { id: 'te041', en: 'update', zh: '更新', phonetic: '/ʌpˈdeɪt/', example: 'The app needs an update to fix the bug.', category: 'technology' },
  { id: 'te042', en: 'install', zh: '安装', phonetic: '/ɪnˈstɔːl/', example: 'You can install the program from the website.', category: 'technology' },
  { id: 'te043', en: 'uninstall', zh: '卸载', phonetic: '/ˌʌn.ɪnˈstɔːl/', example: 'Uninstall the old version before upgrading.', category: 'technology' },
  { id: 'te044', en: 'settings', zh: '设置', phonetic: '/ˈset.ɪŋz/', example: 'You can change the language in the settings menu.', category: 'technology' },
  { id: 'te045', en: 'account', zh: '账户', phonetic: '/əˈkaʊnt/', example: 'I created a new account on the platform.', category: 'technology' },
  { id: 'te046', en: 'password', zh: '密码', phonetic: '/ˈpɑːs.wɜːd/', example: 'Choose a strong password to protect your data.', category: 'technology' },
  { id: 'te047', en: 'username', zh: '用户名', phonetic: '/ˈjuː.zə.neɪm/', example: 'Your username must be between six and twenty characters.', category: 'technology' },
  { id: 'te048', en: 'login', zh: '登录', phonetic: '/ˈlɒɡ.ɪn/', example: 'Click here to login to your account.', category: 'technology' },
  { id: 'te049', en: 'logout', zh: '注销', phonetic: '/ˈlɒɡ.aʊt/', example: 'Remember to logout from shared computers.', category: 'technology' },
  { id: 'te050', en: 'icon', zh: '图标', phonetic: '/ˈaɪ.kɒn/', example: 'Click the gear icon to open settings.', category: 'technology' },
  { id: 'te051', en: 'menu', zh: '菜单', phonetic: '/ˈmen.juː/', example: 'Select an option from the dropdown menu.', category: 'technology' },
  { id: 'te052', en: 'window', zh: '窗口', phonetic: '/ˈwɪn.dəʊ/', example: 'Close the window to exit the program.', category: 'technology' },
  { id: 'te053', en: 'desktop', zh: '桌面', phonetic: '/ˈdesk.tɒp/', example: 'Right-click on the desktop to create a new folder.', category: 'technology' },
  { id: 'te054', en: 'cursor', zh: '光标', phonetic: '/ˈkɜː.sər/', example: 'Move the cursor over the button and click.', category: 'technology' },
  { id: 'te055', en: 'shortcut', zh: '快捷方式', phonetic: '/ˈʃɔːt.kʌt/', example: 'Use the keyboard shortcut to copy and paste.', category: 'technology' },
  { id: 'te056', en: 'internet', zh: '互联网', phonetic: '/ˈɪn.tə.net/', example: 'The internet connects billions of devices worldwide.', category: 'technology' },
  { id: 'te057', en: 'website', zh: '网站', phonetic: '/ˈweb.saɪt/', example: 'The company launched a new website last week.', category: 'technology' },
  { id: 'te058', en: 'webpage', zh: '网页', phonetic: '/ˈweb.peɪdʒ/', example: 'Each webpage has a unique address.', category: 'technology' },
  { id: 'te059', en: 'link', zh: '链接', phonetic: '/lɪŋk/', example: 'Click the link to view more details.', category: 'technology' },
  { id: 'te060', en: 'download', zh: '下载', phonetic: '/ˌdaʊnˈləʊd/', example: 'You can download the file for offline use.', category: 'technology' },
  { id: 'te061', en: 'upload', zh: '上传', phonetic: '/ʌpˈləʊd/', example: 'Upload your resume to apply for the position.', category: 'technology' },
  { id: 'te062', en: 'search engine', zh: '搜索引擎', phonetic: '/sɜːtʃ ˈen.dʒɪn/', example: 'Google is the most popular search engine.', category: 'technology' },
  { id: 'te063', en: 'email', zh: '电子邮件', phonetic: '/ˈiː.meɪl/', example: 'I will send you the details via email.', category: 'technology' },
  { id: 'te064', en: 'domain', zh: '域名', phonetic: '/dəˈmeɪn/', example: 'They registered a new domain for the business.', category: 'technology' },
  { id: 'te065', en: 'URL', zh: '网址', phonetic: '/ˌjuː.ɑːˈrel/', example: 'Type the URL into the address bar.', category: 'technology' },
  { id: 'te066', en: 'network', zh: '网络', phonetic: '/ˈnet.wɜːk/', example: 'The network is down for maintenance.', category: 'technology' },
  { id: 'te067', en: 'cloud', zh: '云', phonetic: '/klaʊd/', example: 'Store your files securely in the cloud.', category: 'technology' },
  { id: 'te068', en: 'stream', zh: '流媒体', phonetic: '/striːm/', example: 'Millions of people stream music every day.', category: 'technology' },
  { id: 'te069', en: 'bandwidth', zh: '带宽', phonetic: '/ˈbænd.wɪdθ/', example: 'High-definition video requires more bandwidth.', category: 'technology' },
  { id: 'te070', en: 'firewall', zh: '防火墙', phonetic: '/ˈfaɪə.wɔːl/', example: 'The firewall blocks unauthorized access attempts.', category: 'technology' },
  { id: 'te071', en: 'cache', zh: '缓存', phonetic: '/kæʃ/', example: 'Clear your browser cache to fix loading issues.', category: 'technology' },
  { id: 'te072', en: 'cookie', zh: 'Cookie/浏览器缓存数据', phonetic: '/ˈkʊk.i/', example: 'This website uses cookies to remember your preferences.', category: 'technology' },
  { id: 'te073', en: 'IP address', zh: 'IP地址', phonetic: '/ˌaɪˈpiː əˌdres/', example: 'Your IP address is visible to every website you visit.', category: 'technology' },
  { id: 'te074', en: 'DNS', zh: '域名系统', phonetic: '/ˌdiː.enˈes/', example: 'The DNS translates domain names into IP addresses.', category: 'technology' },
  { id: 'te075', en: 'VPN', zh: '虚拟专用网络', phonetic: '/ˌviː.piːˈen/', example: 'A VPN encrypts your internet connection for privacy.', category: 'technology' },
  { id: 'te076', en: 'Ethernet', zh: '以太网', phonetic: '/ˈiː.θə.net/', example: 'Connect the computer with an Ethernet cable for stability.', category: 'technology' },
  { id: 'te077', en: 'broadband', zh: '宽带', phonetic: '/ˈbrɔːd.bænd/', example: 'Broadband internet is now available in rural areas.', category: 'technology' },
  { id: 'te078', en: 'protocol', zh: '协议', phonetic: '/ˈprəʊ.tə.kɒl/', example: 'HTTP is the protocol used to transfer web pages.', category: 'technology' },
  { id: 'te079', en: 'proxy', zh: '代理服务器', phonetic: '/ˈprɒk.si/', example: 'A proxy server hides your real IP address.', category: 'technology' },
  { id: 'te080', en: 'hosting', zh: '托管', phonetic: '/ˈhəʊ.stɪŋ/', example: 'The website uses cloud hosting for better performance.', category: 'technology' },
  { id: 'te081', en: 'code', zh: '代码', phonetic: '/kəʊd/', example: 'She learned to write code in high school.', category: 'technology' },
  { id: 'te082', en: 'program', zh: '程序', phonetic: '/ˈprəʊ.ɡræm/', example: 'This program calculates your monthly expenses.', category: 'technology' },
  { id: 'te083', en: 'algorithm', zh: '算法', phonetic: '/ˈæl.ɡə.rɪð.əm/', example: 'The algorithm recommends videos based on your history.', category: 'technology' },
  { id: 'te084', en: 'variable', zh: '变量', phonetic: '/ˈveə.ri.ə.bəl/', example: 'Declare a variable to store the user name.', category: 'technology' },
  { id: 'te085', en: 'function', zh: '函数', phonetic: '/ˈfʌŋk.ʃən/', example: 'Write a function that returns the larger number.', category: 'technology' },
  { id: 'te086', en: 'loop', zh: '循环', phonetic: '/luːp/', example: 'The loop repeats the action ten times.', category: 'technology' },
  { id: 'te087', en: 'array', zh: '数组', phonetic: '/əˈreɪ/', example: 'Store the scores in an array for sorting.', category: 'technology' },
  { id: 'te088', en: 'object', zh: '对象', phonetic: '/ˈɒb.dʒɪkt/', example: 'Each object has properties and methods.', category: 'technology' },
  { id: 'te089', en: 'class', zh: '类', phonetic: '/klɑːs/', example: 'Define a class to represent a bank account.', category: 'technology' },
  { id: 'te090', en: 'string', zh: '字符串', phonetic: '/strɪŋ/', example: 'A string is a sequence of characters.', category: 'technology' },
  { id: 'te091', en: 'integer', zh: '整数', phonetic: '/ˈɪn.tɪ.dʒər/', example: 'The function expects an integer as input.', category: 'technology' },
  { id: 'te092', en: 'boolean', zh: '布尔值', phonetic: '/ˈbuː.li.ən/', example: 'A boolean is either true or false.', category: 'technology' },
  { id: 'te093', en: 'debug', zh: '调试', phonetic: '/ˌdiːˈbʌɡ/', example: 'It took hours to debug the tricky error.', category: 'technology' },
  { id: 'te094', en: 'compile', zh: '编译', phonetic: '/kəmˈpaɪl/', example: 'Compile the source code before running it.', category: 'technology' },
  { id: 'te095', en: 'syntax', zh: '语法', phonetic: '/ˈsɪn.tæks/', example: 'A missing semicolon caused a syntax error.', category: 'technology' },
  { id: 'te096', en: 'framework', zh: '框架', phonetic: '/ˈfreɪm.wɜːk/', example: 'React is a popular front-end framework.', category: 'technology' },
  { id: 'te097', en: 'library', zh: '库', phonetic: '/ˈlaɪ.brər.i/', example: 'Import the chart library to display data.', category: 'technology' },
  { id: 'te098', en: 'API', zh: '应用程序接口', phonetic: '/ˌeɪ.piːˈaɪ/', example: 'The API allows other apps to access the weather data.', category: 'technology' },
  { id: 'te099', en: 'binary', zh: '二进制', phonetic: '/ˈbaɪ.nər.i/', example: 'Computers process everything in binary digits.', category: 'technology' },
  { id: 'te100', en: 'bit', zh: '比特', phonetic: '/bɪt/', example: 'A bit is the smallest unit of digital data.', category: 'technology' },
  { id: 'te101', en: 'byte', zh: '字节', phonetic: '/baɪt/', example: 'One byte equals eight bits of data.', category: 'technology' },
  { id: 'te102', en: 'command', zh: '命令', phonetic: '/kəˈmɑːnd/', example: 'Type the command and press Enter to execute it.', category: 'technology' },
  { id: 'te103', en: 'console', zh: '控制台', phonetic: '/ˈkɒn.səʊl/', example: 'Open the developer console to see the error log.', category: 'technology' },
  { id: 'te104', en: 'terminal', zh: '终端', phonetic: '/ˈtɜː.mɪ.nəl/', example: 'Run the script from the terminal window.', category: 'technology' },
  { id: 'te105', en: 'script', zh: '脚本', phonetic: '/skrɪpt/', example: 'This small script automates file renaming.', category: 'technology' },
  { id: 'te106', en: 'Git', zh: 'Git版本控制', phonetic: '/ɡɪt/', example: 'We use Git to track changes in the project.', category: 'technology' },
  { id: 'te107', en: 'repository', zh: '仓库', phonetic: '/rɪˈpɒz.ɪ.tər.i/', example: 'Clone the repository to your local machine.', category: 'technology' },
  { id: 'te108', en: 'commit', zh: '提交', phonetic: '/kəˈmɪt/', example: 'Make a commit after fixing the bug.', category: 'technology' },
  { id: 'te109', en: 'branch', zh: '分支', phonetic: '/brɑːntʃ/', example: 'Create a new branch for the feature.', category: 'technology' },
  { id: 'te110', en: 'merge', zh: '合并', phonetic: '/mɜːdʒ/', example: 'Merge the pull request after the review.', category: 'technology' },
  { id: 'te111', en: 'digital', zh: '数字的', phonetic: '/ˈdɪdʒ.ɪ.təl/', example: 'We live in an increasingly digital world.', category: 'technology' },
  { id: 'te112', en: 'pixel', zh: '像素', phonetic: '/ˈpɪk.səl/', example: 'Each image is made up of tiny pixels.', category: 'technology' },
  { id: 'te113', en: 'resolution', zh: '分辨率', phonetic: '/ˌrez.əˈluː.ʃən/', example: 'Higher resolution means sharper images on screen.', category: 'technology' },
  { id: 'te114', en: 'image', zh: '图像', phonetic: '/ˈɪm.ɪdʒ/', example: 'Resize the image before uploading it.', category: 'technology' },
  { id: 'te115', en: 'video', zh: '视频', phonetic: '/ˈvɪd.i.əʊ/', example: 'She edited the video with professional software.', category: 'technology' },
  { id: 'te116', en: 'audio', zh: '音频', phonetic: '/ˈɔː.di.əʊ/', example: 'The audio quality of this recording is excellent.', category: 'technology' },
  { id: 'te117', en: 'format', zh: '格式', phonetic: '/ˈfɔː.mæt/', example: 'Convert the file to a compatible format.', category: 'technology' },
  { id: 'te118', en: 'compression', zh: '压缩', phonetic: '/kəmˈpreʃ.ən/', example: 'File compression reduces the download size.', category: 'technology' },
  { id: 'te119', en: 'screenshot', zh: '截图', phonetic: '/ˈskriːn.ʃɒt/', example: 'Take a screenshot of the error message.', category: 'technology' },
  { id: 'te120', en: 'animation', zh: '动画', phonetic: '/ˌæn.ɪˈmeɪ.ʃən/', example: 'The animation makes the interface feel alive.', category: 'technology' },
  { id: 'te121', en: 'virtual', zh: '虚拟的', phonetic: '/ˈvɜː.tʃu.əl/', example: 'They held the meeting in a virtual space.', category: 'technology' },
  { id: 'te122', en: 'virtual reality', zh: '虚拟现实', phonetic: '/ˌvɜː.tʃu.əl riˈæl.ə.ti/', example: 'Virtual reality headsets are becoming more affordable.', category: 'technology' },
  { id: 'te123', en: 'augmented reality', zh: '增强现实', phonetic: '/ɔːɡˌmen.tɪd riˈæl.ə.ti/', example: 'The app uses augmented reality to show furniture in your room.', category: 'technology' },
  { id: 'te124', en: 'podcast', zh: '播客', phonetic: '/ˈpɒd.kɑːst/', example: 'I listen to a tech podcast during my commute.', category: 'technology' },
  { id: 'te125', en: 'streaming', zh: '流媒体传输', phonetic: '/ˈstriː.mɪŋ/', example: 'Streaming services have changed how we watch TV.', category: 'technology' },
  { id: 'te126', en: 'metadata', zh: '元数据', phonetic: '/ˈmet.ə.deɪ.tə/', example: 'Metadata includes the date the photo was taken.', category: 'technology' },
  { id: 'te127', en: 'thumbnail', zh: '缩略图', phonetic: '/ˈθʌm.neɪl/', example: 'Click the thumbnail to see the full-size image.', category: 'technology' },
  { id: 'te128', en: 'render', zh: '渲染', phonetic: '/ˈren.dər/', example: 'The software took hours to render the scene.', category: 'technology' },
  { id: 'te129', en: 'encode', zh: '编码', phonetic: '/ɪnˈkəʊd/', example: 'Encode the video for web streaming.', category: 'technology' },
  { id: 'te130', en: 'decode', zh: '解码', phonetic: '/ˌdiːˈkəʊd/', example: 'The player must decode the file before playback.', category: 'technology' },
  { id: 'te131', en: 'social media', zh: '社交媒体', phonetic: '/ˌsəʊ.ʃəl ˈmiː.di.ə/', example: 'Social media connects people around the globe.', category: 'technology' },
  { id: 'te132', en: 'post', zh: '发布/帖子', phonetic: '/pəʊst/', example: 'She shared a post about her new project.', category: 'technology' },
  { id: 'te133', en: 'share', zh: '分享', phonetic: '/ʃeər/', example: 'You can share the article with one click.', category: 'technology' },
  { id: 'te134', en: 'like', zh: '点赞', phonetic: '/laɪk/', example: 'Her photo received over a thousand likes.', category: 'technology' },
  { id: 'te135', en: 'comment', zh: '评论', phonetic: '/ˈkɒm.ent/', example: 'Please leave a comment below the video.', category: 'technology' },
  { id: 'te136', en: 'follow', zh: '关注', phonetic: '/ˈfɒl.əʊ/', example: 'Click the button to follow the channel.', category: 'technology' },
  { id: 'te137', en: 'profile', zh: '个人资料', phonetic: '/ˈprəʊ.faɪl/', example: 'Update your profile with a recent photo.', category: 'technology' },
  { id: 'te138', en: 'hashtag', zh: '话题标签', phonetic: '/ˈhæʃ.tæɡ/', example: 'Add a trending hashtag to increase visibility.', category: 'technology' },
  { id: 'te139', en: 'viral', zh: '病毒式传播的', phonetic: '/ˈvaɪə.rəl/', example: 'The video went viral within twenty-four hours.', category: 'technology' },
  { id: 'te140', en: 'influencer', zh: '网红/影响者', phonetic: '/ˈɪn.flu.ən.sər/', example: 'The influencer has millions of followers online.', category: 'technology' },
  { id: 'te141', en: 'feed', zh: '信息流', phonetic: '/fiːd/', example: 'Scroll through your feed to see updates.', category: 'technology' },
  { id: 'te142', en: 'notification', zh: '通知', phonetic: '/ˌnəʊ.tɪ.fɪˈkeɪ.ʃən/', example: 'Turn on notifications to stay updated.', category: 'technology' },
  { id: 'te143', en: 'trending', zh: '趋势/热门', phonetic: '/ˈtren.dɪŋ/', example: 'This topic is currently trending on Twitter.', category: 'technology' },
  { id: 'te144', en: 'meme', zh: '表情包/网络迷因', phonetic: '/miːm/', example: 'That meme made everyone laugh at the office.', category: 'technology' },
  { id: 'te145', en: 'block', zh: '屏蔽', phonetic: '/blɒk/', example: 'You can block users who send spam.', category: 'technology' },
  { id: 'te146', en: 'report', zh: '举报', phonetic: '/rɪˈpɔːt/', example: 'Report the comment if it violates the rules.', category: 'technology' },
  { id: 'te147', en: 'filter', zh: '滤镜/过滤器', phonetic: '/ˈfɪl.tər/', example: 'Apply a filter to enhance the photo.', category: 'technology' },
  { id: 'te148', en: 'livestream', zh: '直播', phonetic: '/ˈlaɪv.striːm/', example: 'The concert was broadcast as a livestream.', category: 'technology' },
  { id: 'te149', en: 'emoji', zh: '表情符号', phonetic: '/ɪˈməʊ.dʒi/', example: 'She added a smiley emoji to the message.', category: 'technology' },
  { id: 'te150', en: 'GIF', zh: '动态图片', phonetic: '/ɡɪf/', example: 'He replied with a funny GIF in the chat.', category: 'technology' },
  { id: 'te151', en: 'security', zh: '安全', phonetic: '/sɪˈkjʊə.rə.ti/', example: 'Online security should be a top priority.', category: 'technology' },
  { id: 'te152', en: 'virus', zh: '病毒', phonetic: '/ˈvaɪə.rəs/', example: 'A computer virus can delete your important files.', category: 'technology' },
  { id: 'te153', en: 'malware', zh: '恶意软件', phonetic: '/ˈmæl.weər/', example: 'The antivirus detected and removed the malware.', category: 'technology' },
  { id: 'te154', en: 'phishing', zh: '网络钓鱼', phonetic: '/ˈfɪʃ.ɪŋ/', example: 'Be careful not to fall for phishing emails.', category: 'technology' },
  { id: 'te155', en: 'encryption', zh: '加密', phonetic: '/ɪnˈkrɪp.ʃən/', example: 'Encryption keeps your messages safe from hackers.', category: 'technology' },
  { id: 'te156', en: 'decryption', zh: '解密', phonetic: '/diːˈkrɪp.ʃən/', example: 'Decryption requires the correct private key.', category: 'technology' },
  { id: 'te157', en: 'authentication', zh: '身份验证', phonetic: '/ɔːˌθen.tɪˈkeɪ.ʃən/', example: 'Two-factor authentication adds an extra layer of security.', category: 'technology' },
  { id: 'te158', en: 'authorization', zh: '授权', phonetic: '/ˌɔː.θər.aɪˈzeɪ.ʃən/', example: 'You need authorization to access that folder.', category: 'technology' },
  { id: 'te159', en: 'breach', zh: '数据泄露', phonetic: '/briːtʃ/', example: 'The company suffered a major data breach.', category: 'technology' },
  { id: 'te160', en: 'hack', zh: '黑客攻击', phonetic: '/hæk/', example: 'Someone tried to hack into my email account.', category: 'technology' },
  { id: 'te161', en: 'ransomware', zh: '勒索软件', phonetic: '/ˈræn.səm.weər/', example: 'Ransomware locks your files until you pay a fee.', category: 'technology' },
  { id: 'te162', en: 'spyware', zh: '间谍软件', phonetic: '/ˈspaɪ.weər/', example: 'Spyware secretly monitors your online activity.', category: 'technology' },
  { id: 'te163', en: 'antivirus', zh: '防病毒软件', phonetic: '/ˌæn.tiˈvaɪə.rəs/', example: 'Install a reliable antivirus program on your PC.', category: 'technology' },
  { id: 'te164', en: 'patch', zh: '补丁', phonetic: '/pætʃ/', example: 'Apply the latest security patch immediately.', category: 'technology' },
  { id: 'te165', en: 'vulnerability', zh: '漏洞', phonetic: '/ˌvʌl.nər.əˈbɪl.ə.ti/', example: 'The vulnerability was discovered by security researchers.', category: 'technology' },
  { id: 'te166', en: 'exploit', zh: '漏洞利用', phonetic: '/ɪkˈsplɔɪt/', example: 'Hackers used an exploit to gain access to the system.', category: 'technology' },
  { id: 'te167', en: 'certificate', zh: '证书', phonetic: '/səˈtɪf.ɪ.kət/', example: 'The SSL certificate ensures a secure connection.', category: 'technology' },
  { id: 'te168', en: 'biometric', zh: '生物识别的', phonetic: '/ˌbaɪ.əʊˈmet.rɪk/', example: 'The phone unlocks with biometric fingerprint scanning.', category: 'technology' },
  { id: 'te169', en: 'keylogger', zh: '键盘记录器', phonetic: '/ˈkiː.lɒɡ.ər/', example: 'A keylogger can record everything you type.', category: 'technology' },
  { id: 'te170', en: 'botnet', zh: '僵尸网络', phonetic: '/ˈbɒt.net/', example: 'The botnet launched a massive coordinated attack.', category: 'technology' },
  { id: 'te171', en: 'zero-day', zh: '零日漏洞', phonetic: '/ˈzɪə.rəʊ deɪ/', example: 'A zero-day exploit targets an unknown vulnerability.', category: 'technology' },
  { id: 'te172', en: 'penetration test', zh: '渗透测试', phonetic: '/ˌpen.ɪˈtreɪ.ʃən test/', example: 'We hired a firm to perform a penetration test.', category: 'technology' },
  { id: 'te173', en: 'token', zh: '令牌', phonetic: '/ˈtəʊ.kən/', example: 'The API token authenticates your requests.', category: 'technology' },
  { id: 'te174', en: 'sandbox', zh: '沙盒', phonetic: '/ˈsænd.bɒks/', example: 'Run suspicious files in a sandbox for safety.', category: 'technology' },
  { id: 'te175', en: 'adware', zh: '广告软件', phonetic: '/ˈæd.weər/', example: 'Adware displays unwanted advertisements on your screen.', category: 'technology' },
  { id: 'te176', en: 'artificial intelligence', zh: '人工智能', phonetic: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/', example: 'Artificial intelligence is transforming every industry.', category: 'technology' },
  { id: 'te177', en: 'machine learning', zh: '机器学习', phonetic: '/məˈʃiːn ˌlɜː.nɪŋ/', example: 'Machine learning models improve with more data.', category: 'technology' },
  { id: 'te178', en: 'deep learning', zh: '深度学习', phonetic: '/diːp ˈlɜː.nɪŋ/', example: 'Deep learning uses many layers of neural networks.', category: 'technology' },
  { id: 'te179', en: 'neural network', zh: '神经网络', phonetic: '/ˈnjʊə.rəl ˈnet.wɜːk/', example: 'A neural network mimics the human brain structure.', category: 'technology' },
  { id: 'te180', en: 'dataset', zh: '数据集', phonetic: '/ˈdeɪ.tə.set/', example: 'The dataset contains thousands of labeled images.', category: 'technology' },
  { id: 'te181', en: 'training', zh: '训练', phonetic: '/ˈtreɪ.nɪŋ/', example: 'Training the model requires powerful GPUs.', category: 'technology' },
  { id: 'te182', en: 'model', zh: '模型', phonetic: '/ˈmɒd.əl/', example: 'The AI model can generate realistic images from text.', category: 'technology' },
  { id: 'te183', en: 'prediction', zh: '预测', phonetic: '/prɪˈdɪk.ʃən/', example: 'The prediction was accurate within a small margin.', category: 'technology' },
  { id: 'te184', en: 'classification', zh: '分类', phonetic: '/ˌklæs.ɪ.fɪˈkeɪ.ʃən/', example: 'Image classification sorts photos into categories.', category: 'technology' },
  { id: 'te185', en: 'regression', zh: '回归分析', phonetic: '/rɪˈɡreʃ.ən/', example: 'Regression analysis predicts continuous values.', category: 'technology' },
  { id: 'te186', en: 'chatbot', zh: '聊天机器人', phonetic: '/ˈtʃæt.bɒt/', example: 'The chatbot answers customer questions instantly.', category: 'technology' },
  { id: 'te187', en: 'automation', zh: '自动化', phonetic: '/ˌɔː.təˈmeɪ.ʃən/', example: 'Automation reduces the need for manual work.', category: 'technology' },
  { id: 'te188', en: 'recognition', zh: '识别', phonetic: '/ˌrek.əɡˈnɪʃ.ən/', example: 'Facial recognition unlocks the phone securely.', category: 'technology' },
  { id: 'te189', en: 'natural language', zh: '自然语言', phonetic: '/ˈnætʃ.ər.əl ˈlæŋ.ɡwɪdʒ/', example: 'Natural language processing helps computers understand text.', category: 'technology' },
  { id: 'te190', en: 'computer vision', zh: '计算机视觉', phonetic: '/kəmˈpjuː.tər ˈvɪʒ.ən/', example: 'Computer vision enables self-driving cars to see the road.', category: 'technology' },
  { id: 'te191', en: 'reinforcement', zh: '强化学习', phonetic: '/ˌriː.ɪnˈfɔːs.mənt/', example: 'Reinforcement learning rewards the agent for good actions.', category: 'technology' },
  { id: 'te192', en: 'supervised', zh: '有监督的', phonetic: '/ˈsuː.pə.vaɪzd/', example: 'Supervised learning requires labeled training data.', category: 'technology' },
  { id: 'te193', en: 'unsupervised', zh: '无监督的', phonetic: '/ʌnˈsuː.pə.vaɪzd/', example: 'Unsupervised learning finds patterns without labels.', category: 'technology' },
  { id: 'te194', en: 'bias', zh: '偏差', phonetic: '/ˈbaɪ.əs/', example: 'Algorithmic bias can lead to unfair outcomes.', category: 'technology' },
  { id: 'te195', en: 'accuracy', zh: '准确度', phonetic: '/ˈæk.jə.rə.si/', example: 'The model achieved ninety-five percent accuracy.', category: 'technology' },
  { id: 'te196', en: 'inference', zh: '推理', phonetic: '/ˈɪn.fər.əns/', example: 'The model runs inference on new data quickly.', category: 'technology' },
  { id: 'te197', en: 'prompt', zh: '提示词', phonetic: '/prɒmpt/', example: 'Write a clear prompt to get better AI responses.', category: 'technology' },
  { id: 'te198', en: 'generative', zh: '生成式的', phonetic: '/ˈdʒen.ər.ə.tɪv/', example: 'Generative AI can create text, images, and music.', category: 'technology' },
  { id: 'te199', en: 'transformer', zh: 'Transformer模型', phonetic: '/trænsˈfɔː.mər/', example: 'The transformer architecture powers modern language models.', category: 'technology' },
  { id: 'te200', en: 'embedding', zh: '嵌入', phonetic: '/ɪmˈbed.ɪŋ/', example: 'Word embeddings capture semantic relationships.', category: 'technology' },
  { id: 'te201', en: 'data', zh: '数据', phonetic: '/ˈdeɪ.tə/', example: 'The company collects data to improve its services.', category: 'technology' },
  { id: 'te202', en: 'analytics', zh: '分析', phonetic: '/ˌæn.əˈlɪt.ɪks/', example: 'Web analytics show how visitors use the site.', category: 'technology' },
  { id: 'te203', en: 'visualization', zh: '可视化', phonetic: '/ˌvɪʒ.u.əl.aɪˈzeɪ.ʃən/', example: 'Data visualization makes patterns easier to spot.', category: 'technology' },
  { id: 'te204', en: 'dashboard', zh: '仪表盘', phonetic: '/ˈdæʃ.bɔːd/', example: 'The dashboard displays real-time sales metrics.', category: 'technology' },
  { id: 'te205', en: 'statistics', zh: '统计学', phonetic: '/stəˈtɪs.tɪks/', example: 'Statistics help us make data-driven decisions.', category: 'technology' },
  { id: 'te206', en: 'query', zh: '查询', phonetic: '/ˈkwɪə.ri/', example: 'Write a query to fetch all active users.', category: 'technology' },
  { id: 'te207', en: 'SQL', zh: '结构化查询语言', phonetic: '/ˌes.kjuːˈel/', example: 'SQL is used to manage relational databases.', category: 'technology' },
  { id: 'te208', en: 'table', zh: '表', phonetic: '/ˈteɪ.bəl/', example: 'Each table stores a different type of record.', category: 'technology' },
  { id: 'te209', en: 'CSV', zh: '逗号分隔值文件', phonetic: '/ˌsiː.esˈviː/', example: 'Export the results as a CSV file.', category: 'technology' },
  { id: 'te210', en: 'JSON', zh: 'JSON数据格式', phonetic: '/ˈdʒeɪ.sən/', example: 'The API returns data in JSON format.', category: 'technology' },
  { id: 'te211', en: 'XML', zh: '可扩展标记语言', phonetic: '/ˌeks.emˈel/', example: 'The configuration is stored in an XML file.', category: 'technology' },
  { id: 'te212', en: 'big data', zh: '大数据', phonetic: '/bɪɡ ˈdeɪ.tə/', example: 'Big data tools process massive amounts of information.', category: 'technology' },
  { id: 'te213', en: 'mining', zh: '数据挖掘', phonetic: '/ˈmaɪ.nɪŋ/', example: 'Data mining reveals hidden patterns in large datasets.', category: 'technology' },
  { id: 'te214', en: 'ETL', zh: '抽取转换加载', phonetic: '/ˌiː.tiːˈel/', example: 'ETL pipelines move data between systems.', category: 'technology' },
  { id: 'te215', en: 'warehouse', zh: '数据仓库', phonetic: '/ˈweə.haʊs/', example: 'The data warehouse stores historical records for analysis.', category: 'technology' },
  { id: 'te216', en: 'correlation', zh: '相关性', phonetic: '/ˌkɒr.əˈleɪ.ʃən/', example: 'The study found a strong correlation between the two variables.', category: 'technology' },
  { id: 'te217', en: 'outlier', zh: '异常值', phonetic: '/ˈaʊt.laɪ.ər/', example: 'Remove outliers to get more reliable results.', category: 'technology' },
  { id: 'te218', en: 'pivot', zh: '数据透视表', phonetic: '/ˈpɪv.ət/', example: 'Create a pivot table to summarize the sales data.', category: 'technology' },
  { id: 'te219', en: 'histogram', zh: '直方图', phonetic: '/ˈhɪs.tə.ɡræm/', example: 'The histogram shows the distribution of ages.', category: 'technology' },
  { id: 'te220', en: 'scrape', zh: '爬取', phonetic: '/skreɪp/', example: 'The tool can scrape product prices from websites.', category: 'technology' },
  { id: 'te221', en: 'cloud computing', zh: '云计算', phonetic: '/klaʊd kəmˈpjuː.tɪŋ/', example: 'Cloud computing provides on-demand server resources.', category: 'technology' },
  { id: 'te222', en: 'virtual machine', zh: '虚拟机', phonetic: '/ˌvɜː.tʃu.əl məˈʃiːn/', example: 'Run Ubuntu on a virtual machine inside Windows.', category: 'technology' },
  { id: 'te223', en: 'container', zh: '容器', phonetic: '/kənˈteɪ.nər/', example: 'Docker packages the application into a container.', category: 'technology' },
  { id: 'te224', en: 'Kubernetes', zh: 'Kubernetes容器编排', phonetic: '/ˌkjuː.bəˈnet.iːz/', example: 'Kubernetes orchestrates containers across many servers.', category: 'technology' },
  { id: 'te225', en: 'Docker', zh: 'Docker容器平台', phonetic: '/ˈdɒk.ər/', example: 'Build the image and run it with Docker.', category: 'technology' },
  { id: 'te226', en: 'deployment', zh: '部署', phonetic: '/dɪˈplɔɪ.mənt/', example: 'The deployment was smooth with zero downtime.', category: 'technology' },
  { id: 'te227', en: 'scalability', zh: '可扩展性', phonetic: '/ˌskeɪ.ləˈbɪl.ə.ti/', example: 'Cloud services offer excellent scalability for growing apps.', category: 'technology' },
  { id: 'te228', en: 'microservice', zh: '微服务', phonetic: '/ˈmaɪ.krəʊˌsɜː.vɪs/', example: 'The monolith was split into several microservices.', category: 'technology' },
  { id: 'te229', en: 'serverless', zh: '无服务器架构', phonetic: '/ˈsɜː.və.ləs/', example: 'Serverless functions run only when triggered by events.', category: 'technology' },
  { id: 'te230', en: 'DevOps', zh: '开发运维', phonetic: '/ˈdev.ɒps/', example: 'DevOps bridges the gap between development and operations.', category: 'technology' },
  { id: 'te231', en: 'AWS', zh: '亚马逊云服务', phonetic: '/ˌeɪˌdʌb.əl.juːˈes/', example: 'AWS offers over two hundred cloud services globally.', category: 'technology' },
  { id: 'te232', en: 'load balancer', zh: '负载均衡器', phonetic: '/ləʊd ˈbæl.ən.sər/', example: 'The load balancer distributes traffic across servers.', category: 'technology' },
  { id: 'te233', en: 'latency', zh: '延迟', phonetic: '/ˈleɪ.tən.si/', example: 'Low latency is critical for online gaming.', category: 'technology' },
  { id: 'te234', en: 'uptime', zh: '正常运行时间', phonetic: '/ˈʌp.taɪm/', example: 'The service guarantees ninety-nine percent uptime.', category: 'technology' },
  { id: 'te235', en: 'SLA', zh: '服务等级协议', phonetic: '/ˌes.elˈeɪ/', example: 'Read the SLA before signing up for the service.', category: 'technology' },
  { id: 'te236', en: 'console', zh: '游戏机', phonetic: '/ˈkɒn.səʊl/', example: 'He bought the latest gaming console for his son.', category: 'technology' },
  { id: 'te237', en: 'joystick', zh: '操纵杆', phonetic: '/ˈdʒɔɪ.stɪk/', example: 'Use the joystick to control the character.', category: 'technology' },
  { id: 'te238', en: 'multiplayer', zh: '多人在线', phonetic: '/ˌmʌl.tiˈpleɪ.ər/', example: 'The multiplayer mode supports up to sixty-four players.', category: 'technology' },
  { id: 'te239', en: 'avatar', zh: '虚拟形象', phonetic: '/ˈæv.ə.tɑːr/', example: 'Customize your avatar before entering the game.', category: 'technology' },
  { id: 'te240', en: 'NPC', zh: '非玩家角色', phonetic: '/ˌen.piːˈsiː/', example: 'The NPC offers a side quest in the village.', category: 'technology' },
  { id: 'te241', en: 'achievement', zh: '成就', phonetic: '/əˈtʃiːv.mənt/', example: 'Unlocking every achievement takes dozens of hours.', category: 'technology' },
  { id: 'te242', en: 'e-sports', zh: '电子竞技', phonetic: '/ˈiː.spɔːts/', example: 'E-sports tournaments now fill stadiums worldwide.', category: 'technology' },
  { id: 'te243', en: 'mod', zh: '游戏模组', phonetic: '/mɒd/', example: 'The community created dozens of mods for the game.', category: 'technology' },
  { id: 'te244', en: 'firmware', zh: '固件', phonetic: '/ˈfɜːm.weər/', example: 'Update the firmware to fix the hardware issue.', category: 'technology' },
  { id: 'te245', en: 'kernel', zh: '内核', phonetic: '/ˈkɜː.nəl/', example: 'The kernel manages all hardware and software resources.', category: 'technology' },
  { id: 'te246', en: 'driver', zh: '驱动程序', phonetic: '/ˈdraɪ.vər/', example: 'Install the printer driver to start printing.', category: 'technology' },
  { id: 'te247', en: 'boot', zh: '启动', phonetic: '/buːt/', example: 'The computer takes about ten seconds to boot.', category: 'technology' },
  { id: 'te248', en: 'overclock', zh: '超频', phonetic: '/ˌəʊ.vəˈklɒk/', example: 'Overclock your CPU for better gaming performance.', category: 'technology' },
  { id: 'te249', en: 'heat sink', zh: '散热器', phonetic: '/hiːt sɪŋk/', example: 'A good heat sink prevents the processor from overheating.', category: 'technology' },
  { id: 'te250', en: 'SSD', zh: '固态硬盘', phonetic: '/ˌes.esˈdiː/', example: 'An SSD loads applications much faster than a hard drive.', category: 'technology' },
];

// -- js/data/words_emotion.js --
const WORDS_EMOTION = [
  { id: 'em001', en: 'happy', zh: '快乐的', phonetic: '/ˈhæp.i/', example: 'She looks very happy today.', category: 'emotion' },
  { id: 'em002', en: 'sad', zh: '悲伤的', phonetic: '/sæd/', example: 'He felt sad after watching the movie.', category: 'emotion' },
  { id: 'em003', en: 'angry', zh: '生气的', phonetic: '/ˈæŋ.ɡri/', example: 'The customer became angry about the delay.', category: 'emotion' },
  { id: 'em004', en: 'excited', zh: '兴奋的', phonetic: '/ɪkˈsaɪ.tɪd/', example: 'The children are excited about the trip.', category: 'emotion' },
  { id: 'em005', en: 'afraid', zh: '害怕的', phonetic: '/əˈfreɪd/', example: 'She is afraid of the dark.', category: 'emotion' },
  { id: 'em006', en: 'proud', zh: '自豪的', phonetic: '/praʊd/', example: 'His parents are proud of his achievements.', category: 'emotion' },
  { id: 'em007', en: 'jealous', zh: '嫉妒的', phonetic: '/ˈdʒel.əs/', example: 'She felt jealous of her sister\'s success.', category: 'emotion' },
  { id: 'em008', en: 'anxious', zh: '焦虑的', phonetic: '/ˈæŋk.ʃəs/', example: 'He feels anxious before every exam.', category: 'emotion' },
  { id: 'em009', en: 'lonely', zh: '孤独的', phonetic: '/ˈloʊn.li/', example: 'She felt lonely in the big city.', category: 'emotion' },
  { id: 'em010', en: 'bored', zh: '无聊的', phonetic: '/bɔːrd/', example: 'The students looked bored during the lecture.', category: 'emotion' },
  { id: 'em011', en: 'calm', zh: '平静的', phonetic: '/kɑːm/', example: 'Take a deep breath and stay calm.', category: 'emotion' },
  { id: 'em012', en: 'confused', zh: '困惑的', phonetic: '/kənˈfjuːzd/', example: 'I am confused by these instructions.', category: 'emotion' },
  { id: 'em013', en: 'grateful', zh: '感激的', phonetic: '/ˈɡreɪt.fəl/', example: 'I am grateful for your help.', category: 'emotion' },
  { id: 'em014', en: 'hopeful', zh: '充满希望的', phonetic: '/ˈhoʊp.fəl/', example: 'She remained hopeful despite the setbacks.', category: 'emotion' },
  { id: 'em015', en: 'nervous', zh: '紧张的', phonetic: '/ˈnɜːr.vəs/', example: 'He was nervous before his speech.', category: 'emotion' },
  { id: 'em016', en: 'shy', zh: '害羞的', phonetic: '/ʃaɪ/', example: 'The shy girl avoided eye contact.', category: 'emotion' },
  { id: 'em017', en: 'guilty', zh: '内疚的', phonetic: '/ˈɡɪl.ti/', example: 'He felt guilty about lying to his friend.', category: 'emotion' },
  { id: 'em018', en: 'embarrassed', zh: '尴尬的', phonetic: '/ɪmˈbær.əst/', example: 'She was embarrassed when she tripped.', category: 'emotion' },
  { id: 'em019', en: 'frustrated', zh: '沮丧的', phonetic: '/ˈfrʌs.treɪ.tɪd/', example: 'He felt frustrated with the slow progress.', category: 'emotion' },
  { id: 'em020', en: 'relieved', zh: '松了一口气的', phonetic: '/rɪˈliːvd/', example: 'She was relieved to hear the good news.', category: 'emotion' },
  { id: 'em021', en: 'curious', zh: '好奇的', phonetic: '/ˈkjʊr.i.əs/', example: 'The curious child asked many questions.', category: 'emotion' },
  { id: 'em022', en: 'confident', zh: '自信的', phonetic: '/ˈkɒn.fɪ.dənt/', example: 'She felt confident about the interview.', category: 'emotion' },
  { id: 'em023', en: 'disappointed', zh: '失望的', phonetic: '/ˌdɪs.əˈpɔɪn.tɪd/', example: 'He was disappointed with the results.', category: 'emotion' },
  { id: 'em024', en: 'ashamed', zh: '羞愧的', phonetic: '/əˈʃeɪmd/', example: 'He felt ashamed of his behavior.', category: 'emotion' },
  { id: 'em025', en: 'depressed', zh: '抑郁的', phonetic: '/dɪˈprest/', example: 'She has been feeling depressed lately.', category: 'emotion' },
  { id: 'em026', en: 'enthusiastic', zh: '热情的', phonetic: '/ɪnˌθjuː.ziˈæs.tɪk/', example: 'The team is enthusiastic about the project.', category: 'emotion' },
  { id: 'em027', en: 'irritated', zh: '恼怒的', phonetic: '/ˈɪr.ɪ.teɪ.tɪd/', example: 'He became irritated by the constant noise.', category: 'emotion' },
  { id: 'em028', en: 'overwhelmed', zh: '不知所措的', phonetic: '/ˌoʊ.vɚˈwelmd/', example: 'She felt overwhelmed by the workload.', category: 'emotion' },
  { id: 'em029', en: 'content', zh: '满足的', phonetic: '/kənˈtent/', example: 'He felt content with his simple life.', category: 'emotion' },
  { id: 'em030', en: 'furious', zh: '暴怒的', phonetic: '/ˈfjʊr.i.əs/', example: 'She was furious when she discovered the lie.', category: 'emotion' },
  { id: 'em031', en: 'delighted', zh: '高兴的', phonetic: '/dɪˈlaɪ.tɪd/', example: 'We were delighted by the surprise party.', category: 'emotion' },
  { id: 'em032', en: 'miserable', zh: '痛苦的', phonetic: '/ˈmɪz.ər.ə.bəl/', example: 'He felt miserable after the breakup.', category: 'emotion' },
  { id: 'em033', en: 'terrified', zh: '极度恐惧的', phonetic: '/ˈter.ə.faɪd/', example: 'She was terrified of the thunderstorm.', category: 'emotion' },
  { id: 'em034', en: 'thrilled', zh: '激动万分的', phonetic: '/θrɪld/', example: 'They were thrilled to win the competition.', category: 'emotion' },
  { id: 'em035', en: 'worried', zh: '担心的', phonetic: '/ˈwɜːr.id/', example: 'I am worried about my health.', category: 'emotion' },
  { id: 'em036', en: 'optimistic', zh: '乐观的', phonetic: '/ˌɒp.tɪˈmɪs.tɪk/', example: 'She remains optimistic about the future.', category: 'emotion' },
  { id: 'em037', en: 'pessimistic', zh: '悲观的', phonetic: '/ˌpes.ɪˈmɪs.tɪk/', example: 'He has a pessimistic view of the economy.', category: 'emotion' },
  { id: 'em038', en: 'stressed', zh: '有压力的', phonetic: '/strest/', example: 'She felt stressed about the deadline.', category: 'emotion' },
  { id: 'em039', en: 'heartbroken', zh: '心碎的', phonetic: '/ˈhɑːrtˌbroʊ.kən/', example: 'He was heartbroken after the divorce.', category: 'emotion' },
  { id: 'em040', en: 'ecstatic', zh: '狂喜的', phonetic: '/ɪkˈstæt.ɪk/', example: 'She was ecstatic when she got the job.', category: 'emotion' },
  { id: 'em041', en: 'sympathetic', zh: '同情的', phonetic: '/ˌsɪm.pəˈθet.ɪk/', example: 'She gave me a sympathetic look.', category: 'emotion' },
  { id: 'em042', en: 'indifferent', zh: '漠不关心的', phonetic: '/ɪnˈdɪf.ər.ənt/', example: 'He seemed indifferent to the criticism.', category: 'emotion' },
  { id: 'em043', en: 'nostalgic', zh: '怀旧的', phonetic: '/nɒˈstæl.dʒɪk/', example: 'The old song made her feel nostalgic.', category: 'emotion' },
  { id: 'em044', en: 'serene', zh: '宁静的', phonetic: '/səˈriːn/', example: 'The garden was a serene place to relax.', category: 'emotion' },
  { id: 'em045', en: 'melancholy', zh: '忧郁的', phonetic: '/ˈmel.ənˌkɒl.i/', example: 'A sense of melancholy filled the room.', category: 'emotion' },
  { id: 'em046', en: 'elated', zh: '兴高采烈的', phonetic: '/ɪˈleɪ.tɪd/', example: 'She felt elated after the promotion.', category: 'emotion' },
  { id: 'em047', en: 'resentful', zh: '怨恨的', phonetic: '/rɪˈzent.fəl/', example: 'He felt resentful about being overlooked.', category: 'emotion' },
  { id: 'em048', en: 'bashful', zh: '腼腆的', phonetic: '/ˈbæʃ.fəl/', example: 'The bashful child hid behind his mother.', category: 'emotion' },
  { id: 'em049', en: 'compassionate', zh: '富有同情心的', phonetic: '/kəmˈpæʃ.ən.ət/', example: 'She is a compassionate nurse.', category: 'emotion' },
  { id: 'em050', en: 'envious', zh: '羡慕的', phonetic: '/ˈen.vi.əs/', example: 'She gave an envious glance at the cake.', category: 'emotion' },
  { id: 'em051', en: 'sorrowful', zh: '悲痛的', phonetic: '/ˈsɒr.əʊ.fəl/', example: 'The sorrowful news brought tears to her eyes.', category: 'emotion' },
  { id: 'em052', en: 'jubilant', zh: '欢欣鼓舞的', phonetic: '/ˈdʒuː.bɪ.lənt/', example: 'The fans were jubilant after the victory.', category: 'emotion' },
  { id: 'em053', en: 'distressed', zh: '痛苦的', phonetic: '/dɪˈstrest/', example: 'She looked distressed by the bad news.', category: 'emotion' },
  { id: 'em054', en: 'apprehensive', zh: '忧虑的', phonetic: '/ˌæp.rɪˈhen.sɪv/', example: 'He felt apprehensive about the upcoming test.', category: 'emotion' },
  { id: 'em055', en: 'forlorn', zh: '绝望的', phonetic: '/fərˈlɔːrn/', example: 'The abandoned puppy looked forlorn.', category: 'emotion' },
  { id: 'em056', en: 'indignant', zh: '愤慨的', phonetic: '/ɪnˈdɪɡ.nənt/', example: 'She was indignant at the unfair treatment.', category: 'emotion' },
  { id: 'em057', en: 'petrified', zh: '吓呆的', phonetic: '/ˈpet.rə.faɪd/', example: 'He was petrified when he saw the snake.', category: 'emotion' },
  { id: 'em058', en: 'wistful', zh: '渴望的', phonetic: '/ˈwɪst.fəl/', example: 'She gave a wistful look at the ocean.', category: 'emotion' },
  { id: 'em059', en: 'remorseful', zh: '懊悔的', phonetic: '/rɪˈmɔːrs.fəl/', example: 'He felt remorseful for his harsh words.', category: 'emotion' },
  { id: 'em060', en: 'elated', zh: '欢欣的', phonetic: '/iˈleɪ.tɪd/', example: 'They were elated by the standing ovation.', category: 'emotion' },
  { id: 'em061', en: 'introverted', zh: '内向的', phonetic: '/ˈɪn.trə.vɜːr.tɪd/', example: 'As an introverted person, she enjoys solitude.', category: 'emotion' },
  { id: 'em062', en: 'extroverted', zh: '外向的', phonetic: '/ˈek.strə.vɜːr.tɪd/', example: 'His extroverted nature makes him popular.', category: 'emotion' },
  { id: 'em063', en: 'ambitious', zh: '有雄心的', phonetic: '/æmˈbɪʃ.əs/', example: 'She is an ambitious young professional.', category: 'emotion' },
  { id: 'em064', en: 'sensitive', zh: '敏感的', phonetic: '/ˈsen.sə.tɪv/', example: 'He is very sensitive to criticism.', category: 'emotion' },
  { id: 'em065', en: 'arrogant', zh: '傲慢的', phonetic: '/ˈær.ə.ɡənt/', example: 'His arrogant attitude annoyed everyone.', category: 'emotion' },
  { id: 'em066', en: 'humble', zh: '谦逊的', phonetic: '/ˈhʌm.bəl/', example: 'Despite his success, he remained humble.', category: 'emotion' },
  { id: 'em067', en: 'stubborn', zh: '固执的', phonetic: '/ˈstʌb.ərn/', example: 'The stubborn mule refused to move.', category: 'emotion' },
  { id: 'em068', en: 'generous', zh: '慷慨的', phonetic: '/ˈdʒen.ər.əs/', example: 'She is generous with her time and money.', category: 'emotion' },
  { id: 'em069', en: 'selfish', zh: '自私的', phonetic: '/ˈsel.fɪʃ/', example: 'His selfish behavior upset his friends.', category: 'emotion' },
  { id: 'em070', en: 'courageous', zh: '勇敢的', phonetic: '/kəˈreɪ.dʒəs/', example: 'The courageous firefighter saved the child.', category: 'emotion' },
  { id: 'em071', en: 'timid', zh: '胆小的', phonetic: '/ˈtɪm.ɪd/', example: 'The timid rabbit hid in the bushes.', category: 'emotion' },
  { id: 'em072', en: 'passionate', zh: '热情的', phonetic: '/ˈpæʃ.ən.ət/', example: 'She is passionate about environmental issues.', category: 'emotion' },
  { id: 'em073', en: 'apathetic', zh: '冷漠的', phonetic: '/ˌæp.əˈθet.ɪk/', example: 'The apathetic voters did not cast ballots.', category: 'emotion' },
  { id: 'em074', en: 'devoted', zh: '忠诚的', phonetic: '/dɪˈvoʊ.tɪd/', example: 'He is a devoted husband and father.', category: 'emotion' },
  { id: 'em075', en: 'affectionate', zh: '深情的', phonetic: '/əˈfek.ʃən.ət/', example: 'The affectionate couple held hands.', category: 'emotion' },
  { id: 'em076', en: 'hostile', zh: '敌对的', phonetic: '/ˈhɒs.taɪl/', example: 'The hostile crowd began to shout.', category: 'emotion' },
  { id: 'em077', en: 'sincere', zh: '真诚的', phonetic: '/sɪnˈsɪr/', example: 'Please accept my sincere apologies.', category: 'emotion' },
  { id: 'em078', en: 'vain', zh: '虚荣的', phonetic: '/veɪn/', example: 'He is rather vain about his appearance.', category: 'emotion' },
  { id: 'em079', en: 'modest', zh: '谦虚的', phonetic: '/ˈmɒd.ɪst/', example: 'She is modest about her accomplishments.', category: 'emotion' },
  { id: 'em080', en: 'reckless', zh: '鲁莽的', phonetic: '/ˈrek.ləs/', example: 'His reckless driving caused the accident.', category: 'emotion' },
  { id: 'em081', en: 'cautious', zh: '谨慎的', phonetic: '/ˈkɔː.ʃəs/', example: 'Be cautious when crossing the street.', category: 'emotion' },
  { id: 'em082', en: 'impulsive', zh: '冲动的', phonetic: '/ɪmˈpʌl.sɪv/', example: 'Her impulsive spending led to debt.', category: 'emotion' },
  { id: 'em083', en: 'conscientious', zh: '认真负责的', phonetic: '/ˌkɒn.ʃiˈen.ʃəs/', example: 'He is a conscientious worker.', category: 'emotion' },
  { id: 'em084', en: 'negligent', zh: '疏忽的', phonetic: '/ˈneɡ.lɪ.dʒənt/', example: 'The negligent driver caused the crash.', category: 'emotion' },
  { id: 'em085', en: 'gregarious', zh: '爱社交的', phonetic: '/ɡrɪˈɡer.i.əs/', example: 'She is a gregarious person who loves parties.', category: 'emotion' },
  { id: 'em086', en: 'aloof', zh: '冷漠的', phonetic: '/əˈluːf/', example: 'He remained aloof from the group.', category: 'emotion' },
  { id: 'em087', en: 'benevolent', zh: '仁慈的', phonetic: '/bəˈnev.əl.ənt/', example: 'The benevolent donor helped many families.', category: 'emotion' },
  { id: 'em088', en: 'malicious', zh: '恶意的', phonetic: '/məˈlɪʃ.əs/', example: 'The malicious rumor spread quickly.', category: 'emotion' },
  { id: 'em089', en: 'resilient', zh: '有韧性的', phonetic: '/rɪˈzɪl.i.ənt/', example: 'She is resilient and bounces back quickly.', category: 'emotion' },
  { id: 'em090', en: 'fragile', zh: '脆弱的', phonetic: '/ˈfrædʒ.aɪl/', example: 'He felt emotionally fragile after the loss.', category: 'emotion' },
  { id: 'em091', en: 'tenacious', zh: '坚韧不拔的', phonetic: '/təˈneɪ.ʃəs/', example: 'The tenacious reporter uncovered the truth.', category: 'emotion' },
  { id: 'em092', en: 'fickle', zh: '善变的', phonetic: '/ˈfɪk.əl/', example: 'Her fickle tastes made shopping difficult.', category: 'emotion' },
  { id: 'em093', en: 'steadfast', zh: '坚定的', phonetic: '/ˈsted.fæst/', example: 'He remained steadfast in his beliefs.', category: 'emotion' },
  { id: 'em094', en: 'whimsical', zh: '异想天开的', phonetic: '/ˈwɪm.zɪ.kəl/', example: 'The whimsical artist painted colorful murals.', category: 'emotion' },
  { id: 'em095', en: 'solemn', zh: '严肃的', phonetic: '/ˈsɒl.əm/', example: 'The ceremony had a solemn atmosphere.', category: 'emotion' },
  { id: 'em096', en: 'jovial', zh: '快活的', phonetic: '/ˈdʒoʊ.vi.əl/', example: 'The jovial host made everyone feel welcome.', category: 'emotion' },
  { id: 'em097', en: 'morose', zh: '阴郁的', phonetic: '/məˈroʊs/', example: 'He was morose after losing his job.', category: 'emotion' },
  { id: 'em098', en: 'cheerful', zh: '愉快的', phonetic: '/ˈtʃɪr.fəl/', example: 'She has a cheerful disposition.', category: 'emotion' },
  { id: 'em099', en: 'gloomy', zh: '阴沉的', phonetic: '/ˈɡluː.mi/', example: 'The gloomy weather matched his mood.', category: 'emotion' },
  { id: 'em100', en: 'vivacious', zh: '活泼的', phonetic: '/vɪˈveɪ.ʃəs/', example: 'The vivacious dancer lit up the stage.', category: 'emotion' },
  { id: 'em101', en: 'weary', zh: '疲倦的', phonetic: '/ˈwɪr.i/', example: 'She felt weary after the long journey.', category: 'emotion' },
  { id: 'em102', en: 'tranquil', zh: '宁静的', phonetic: '/ˈtræŋ.kwɪl/', example: 'The lake was tranquil at dawn.', category: 'emotion' },
  { id: 'em103', en: 'restless', zh: '焦躁不安的', phonetic: '/ˈrest.ləs/', example: 'He spent a restless night worrying.', category: 'emotion' },
  { id: 'em104', en: 'complacent', zh: '自满的', phonetic: '/kəmˈpleɪ.sənt/', example: 'We cannot afford to be complacent.', category: 'emotion' },
  { id: 'em105', en: 'diligent', zh: '勤奋的', phonetic: '/ˈdɪl.ɪ.dʒənt/', example: 'The diligent student studied every day.', category: 'emotion' },
  { id: 'em106', en: 'lazy', zh: '懒惰的', phonetic: '/ˈleɪ.zi/', example: 'He felt too lazy to get out of bed.', category: 'emotion' },
  { id: 'em107', en: 'daring', zh: '大胆的', phonetic: '/ˈder.ɪŋ/', example: 'The daring explorer climbed the peak.', category: 'emotion' },
  { id: 'em108', en: 'cowardly', zh: '懦弱的', phonetic: '/ˈkaʊ.ərd.li/', example: 'It was cowardly to run away.', category: 'emotion' },
  { id: 'em109', en: 'empathetic', zh: '有同理心的', phonetic: '/ˌem.pəˈθet.ɪk/', example: 'She is an empathetic listener.', category: 'emotion' },
  { id: 'em110', en: 'callous', zh: '冷酷无情的', phonetic: '/ˈkæl.əs/', example: 'His callous remarks hurt her deeply.', category: 'emotion' },
  { id: 'em111', en: 'tender', zh: '温柔的', phonetic: '/ˈten.dər/', example: 'He gave her a tender kiss.', category: 'emotion' },
  { id: 'em112', en: 'bitter', zh: '痛苦的', phonetic: '/ˈbɪt.ər/', example: 'She felt bitter about the betrayal.', category: 'emotion' },
  { id: 'em113', en: 'warm', zh: '温暖的', phonetic: '/wɔːrm/', example: 'He has a warm personality.', category: 'emotion' },
  { id: 'em114', en: 'cold', zh: '冷淡的', phonetic: '/koʊld/', example: 'She gave him a cold stare.', category: 'emotion' },
  { id: 'em115', en: 'innocent', zh: '天真的', phonetic: '/ˈɪn.ə.sənt/', example: 'The innocent child trusted everyone.', category: 'emotion' },
  { id: 'em116', en: 'cynical', zh: '愤世嫉俗的', phonetic: '/ˈsɪn.ɪ.kəl/', example: 'He has a cynical view of politics.', category: 'emotion' },
  { id: 'em117', en: 'naive', zh: '幼稚的', phonetic: '/naɪˈiːv/', example: 'She was naive to believe his promises.', category: 'emotion' },
  { id: 'em118', en: 'skeptical', zh: '怀疑的', phonetic: '/ˈskep.tɪ.kəl/', example: 'I am skeptical about these claims.', category: 'emotion' },
  { id: 'em119', en: 'vulnerable', zh: '脆弱的', phonetic: '/ˈvʌl.nər.ə.bəl/', example: 'He felt vulnerable sharing his feelings.', category: 'emotion' },
  { id: 'em120', en: 'invincible', zh: '无敌的', phonetic: '/ɪnˈvɪn.sə.bəl/', example: 'Teenagers often feel invincible.', category: 'emotion' },
  { id: 'em121', en: 'insecure', zh: '不安全的', phonetic: '/ˌɪn.sɪˈkjʊr/', example: 'She feels insecure about her appearance.', category: 'emotion' },
  { id: 'em122', en: 'self-assured', zh: '自信的', phonetic: '/ˌself əˈʃʊrd/', example: 'He walked in with a self-assured smile.', category: 'emotion' },
  { id: 'em123', en: 'humiliated', zh: '受辱的', phonetic: '/hjuːˈmɪl.i.eɪ.tɪd/', example: 'She felt humiliated by the public criticism.', category: 'emotion' },
  { id: 'em124', en: 'dignified', zh: '有尊严的', phonetic: '/ˈdɪɡ.nɪ.faɪd/', example: 'He maintained a dignified silence.', category: 'emotion' },
  { id: 'em125', en: 'irritable', zh: '易怒的', phonetic: '/ˈɪr.ɪ.tə.bəl/', example: 'Lack of sleep makes him irritable.', category: 'emotion' },
  { id: 'em126', en: 'placid', zh: '温和的', phonetic: '/ˈplæs.ɪd/', example: 'She has a placid temperament.', category: 'emotion' },
  { id: 'em127', en: 'volatile', zh: '易变的', phonetic: '/ˈvɒl.ə.taɪl/', example: 'His volatile temper scared the children.', category: 'emotion' },
  { id: 'em128', en: 'stoic', zh: '坚忍的', phonetic: '/ˈstoʊ.ɪk/', example: 'He remained stoic despite the pain.', category: 'emotion' },
  { id: 'em129', en: 'hysterical', zh: '歇斯底里的', phonetic: '/hɪˈster.ɪ.kəl/', example: 'She became hysterical after the accident.', category: 'emotion' },
  { id: 'em130', en: 'desolate', zh: '荒凉的', phonetic: '/ˈdes.əl.ət/', example: 'He felt desolate after his wife died.', category: 'emotion' },
  { id: 'em131', en: 'blissful', zh: '无比幸福的', phonetic: '/ˈblɪs.fəl/', example: 'They spent a blissful day at the beach.', category: 'emotion' },
  { id: 'em132', en: 'tormented', zh: '受折磨的', phonetic: '/ˈtɔːr.men.tɪd/', example: 'He was tormented by guilt.', category: 'emotion' },
  { id: 'em133', en: 'euphoric', zh: '欣快的', phonetic: '/juːˈfɒr.ɪk/', example: 'She felt euphoric after the workout.', category: 'emotion' },
  { id: 'em134', en: 'despondent', zh: '沮丧的', phonetic: '/dɪˈspɒn.dənt/', example: 'He was despondent after the rejection.', category: 'emotion' },
  { id: 'em135', en: 'radiant', zh: '容光焕发的', phonetic: '/ˈreɪ.di.ənt/', example: 'The bride looked radiant on her wedding day.', category: 'emotion' },
  { id: 'em136', en: 'sullen', zh: '闷闷不乐的', phonetic: '/ˈsʌl.ən/', example: 'The sullen teenager refused to speak.', category: 'emotion' },
  { id: 'em137', en: 'exuberant', zh: '兴高采烈的', phonetic: '/ɪɡˈzuː.bər.ənt/', example: 'The exuberant puppy wagged its tail.', category: 'emotion' },
  { id: 'em138', en: 'subdued', zh: '被压制的', phonetic: '/səbˈduːd/', example: 'She seemed subdued after the meeting.', category: 'emotion' },
  { id: 'em139', en: 'delirious', zh: '极度兴奋的', phonetic: '/dɪˈlɪr.i.əs/', example: 'The crowd was delirious with joy.', category: 'emotion' },
  { id: 'em140', en: 'numb', zh: '麻木的', phonetic: '/nʌm/', example: 'He felt numb after hearing the news.', category: 'emotion' },
  { id: 'em141', en: 'overjoyed', zh: '喜出望外的', phonetic: '/ˌoʊ.vərˈdʒɔɪd/', example: 'They were overjoyed at the birth of their son.', category: 'emotion' },
  { id: 'em142', en: 'crestfallen', zh: '垂头丧气的', phonetic: '/ˈkrestˌfɔː.lən/', example: 'He looked crestfallen after the failure.', category: 'emotion' },
  { id: 'em143', en: 'enthralled', zh: '着迷的', phonetic: '/ɪnˈθrɔːld/', example: 'The audience was enthralled by the performance.', category: 'emotion' },
  { id: 'em144', en: 'disillusioned', zh: '幻灭的', phonetic: '/ˌdɪs.ɪˈluː.ʒənd/', example: 'He became disillusioned with politics.', category: 'emotion' },
  { id: 'em145', en: 'infatuated', zh: '迷恋的', phonetic: '/ɪnˈfætʃ.u.eɪ.tɪd/', example: 'She was infatuated with her new colleague.', category: 'emotion' },
  { id: 'em146', en: 'repulsed', zh: '厌恶的', phonetic: '/rɪˈpʌlst/', example: 'She felt repulsed by the offensive odor.', category: 'emotion' },
  { id: 'em147', en: 'captivated', zh: '被迷住的', phonetic: '/ˈkæp.tɪ.veɪ.tɪd/', example: 'He was captivated by her beauty.', category: 'emotion' },
  { id: 'em148', en: 'alienated', zh: '疏远的', phonetic: '/ˈeɪ.li.ə.neɪ.tɪd/', example: 'He felt alienated from his classmates.', category: 'emotion' },
  { id: 'em149', en: 'cherished', zh: '珍爱的', phonetic: '/ˈtʃer.ɪʃt/', example: 'These are my most cherished memories.', category: 'emotion' },
  { id: 'em150', en: 'neglected', zh: '被忽视的', phonetic: '/nɪˈɡlek.tɪd/', example: 'The child felt neglected by his parents.', category: 'emotion' },
  { id: 'em151', en: 'adored', zh: '被崇拜的', phonetic: '/əˈdɔːrd/', example: 'She was adored by her fans.', category: 'emotion' },
  { id: 'em152', en: 'despised', zh: '被鄙视的', phonetic: '/dɪˈspaɪzd/', example: 'He felt despised by his peers.', category: 'emotion' },
  { id: 'em153', en: 'estranged', zh: '疏远的', phonetic: '/ɪˈstreɪndʒd/', example: 'He is estranged from his family.', category: 'emotion' },
  { id: 'em154', en: 'reconciled', zh: '和解的', phonetic: '/ˈrek.ən.saɪld/', example: 'They reconciled after years of conflict.', category: 'emotion' },
  { id: 'em155', en: 'humorous', zh: '幽默的', phonetic: '/ˈhjuː.mər.əs/', example: 'He has a humorous way of telling stories.', category: 'emotion' },
  { id: 'em156', en: 'witty', zh: '机智的', phonetic: '/ˈwɪt.i/', example: 'Her witty remarks always make me laugh.', category: 'emotion' },
  { id: 'em157', en: 'sarcastic', zh: '讽刺的', phonetic: '/sɑːrˈkæs.tɪk/', example: 'His sarcastic tone annoyed his colleagues.', category: 'emotion' },
  { id: 'em158', en: 'earnest', zh: '认真的', phonetic: '/ˈɜːr.nɪst/', example: 'He made an earnest attempt to improve.', category: 'emotion' },
  { id: 'em159', en: 'flippant', zh: '轻率的', phonetic: '/ˈflɪp.ənt/', example: 'His flippant response angered the judge.', category: 'emotion' },
  { id: 'em160', en: 'zealous', zh: '狂热的', phonetic: '/ˈzel.əs/', example: 'The zealous supporter campaigned tirelessly.', category: 'emotion' },
  { id: 'em161', en: 'nonchalant', zh: '漠不关心的', phonetic: '/ˌnɒn.ʃəˈlɑːnt/', example: 'He was nonchalant about the exam results.', category: 'emotion' },
  { id: 'em162', en: 'pensive', zh: '沉思的', phonetic: '/ˈpen.sɪv/', example: 'She sat in a pensive mood by the window.', category: 'emotion' },
  { id: 'em163', en: 'brooding', zh: '沉思的', phonetic: '/ˈbruː.dɪŋ/', example: 'He was brooding over his mistakes.', category: 'emotion' },
  { id: 'em164', en: 'contemplative', zh: '沉思的', phonetic: '/kənˈtem.plə.tɪv/', example: 'The monk led a contemplative life.', category: 'emotion' },
  { id: 'em165', en: 'impulsive', zh: '冲动的', phonetic: '/ɪmˈpʌl.sɪv/', example: 'His impulsive decisions often backfired.', category: 'emotion' },
  { id: 'em166', en: 'deliberate', zh: '深思熟虑的', phonetic: '/dɪˈlɪb.ər.ət/', example: 'She made a deliberate choice to stay.', category: 'emotion' },
  { id: 'em167', en: 'obsessive', zh: '着迷的', phonetic: '/əbˈses.ɪv/', example: 'He has an obsessive need for order.', category: 'emotion' },
  { id: 'em168', en: 'indecisive', zh: '优柔寡断的', phonetic: '/ˌɪn.dɪˈsaɪ.sɪv/', example: 'She is too indecisive to choose a restaurant.', category: 'emotion' },
  { id: 'em169', en: 'decisive', zh: '果断的', phonetic: '/dɪˈsaɪ.sɪv/', example: 'A leader must be decisive in a crisis.', category: 'emotion' },
  { id: 'em170', en: 'ambivalent', zh: '矛盾的', phonetic: '/æmˈbɪv.ə.lənt/', example: 'She felt ambivalent about the job offer.', category: 'emotion' },
  { id: 'em171', en: 'resolute', zh: '坚决的', phonetic: '/ˈrez.ə.luːt/', example: 'She was resolute in her decision to quit.', category: 'emotion' },
  { id: 'em172', en: 'apathetic', zh: '冷漠的', phonetic: '/ˌæp.əˈθet.ɪk/', example: 'The apathetic student showed no interest.', category: 'emotion' },
  { id: 'em173', en: 'vigilant', zh: '警惕的', phonetic: '/ˈvɪdʒ.ɪ.lənt/', example: 'Stay vigilant while walking at night.', category: 'emotion' },
  { id: 'em174', en: 'oblivious', zh: '不注意的', phonetic: '/əˈblɪv.i.əs/', example: 'He was oblivious to the danger ahead.', category: 'emotion' },
  { id: 'em175', en: 'conscientious', zh: '尽责的', phonetic: '/ˌkɒn.ʃiˈen.ʃəs/', example: 'A conscientious employee double-checks everything.', category: 'emotion' },
  { id: 'em176', en: 'carefree', zh: '无忧无虑的', phonetic: '/ˈker.friː/', example: 'Children should have a carefree childhood.', category: 'emotion' },
  { id: 'em177', en: 'paranoid', zh: '偏执的', phonetic: '/ˈpær.ə.nɔɪd/', example: 'He became paranoid about being followed.', category: 'emotion' },
  { id: 'em178', en: 'trusting', zh: '信任的', phonetic: '/ˈtrʌs.tɪŋ/', example: 'She has a trusting nature.', category: 'emotion' },
  { id: 'em179', en: 'suspicious', zh: '怀疑的', phonetic: '/səˈspɪʃ.əs/', example: 'The police were suspicious of his story.', category: 'emotion' },
  { id: 'em180', en: 'gullible', zh: '容易上当的', phonetic: '/ˈɡʌl.ə.bəl/', example: 'He is too gullible to spot a scam.', category: 'emotion' },
  { id: 'em181', en: 'compassion', zh: '同情', phonetic: '/kəmˈpæʃ.ən/', example: 'She showed great compassion for the homeless.', category: 'emotion' },
  { id: 'em182', en: 'empathy', zh: '同理心', phonetic: '/ˈem.pə.θi/', example: 'Good doctors have empathy for their patients.', category: 'emotion' },
  { id: 'em183', en: 'apathy', zh: '冷漠', phonetic: '/ˈæp.ə.θi/', example: 'Voter apathy is a problem in many countries.', category: 'emotion' },
  { id: 'em184', en: 'catharsis', zh: '宣泄', phonetic: '/kəˈθɑːr.sɪs/', example: 'Writing can be a form of catharsis.', category: 'emotion' },
  { id: 'em185', en: 'resilience', zh: '韧性', phonetic: '/rɪˈzɪl.i.əns/', example: 'Her resilience helped her overcome adversity.', category: 'emotion' },
  { id: 'em186', en: 'vulnerability', zh: '脆弱性', phonetic: '/ˌvʌl.nər.əˈbɪl.ə.ti/', example: 'Showing vulnerability takes courage.', category: 'emotion' },
  { id: 'em187', en: 'nostalgia', zh: '怀旧', phonetic: '/nɒˈstæl.dʒə/', example: 'The photo album filled her with nostalgia.', category: 'emotion' },
  { id: 'em188', en: 'euphoria', zh: '欣快感', phonetic: '/juːˈfɔːr.i.ə/', example: 'The runners experienced euphoria after the race.', category: 'emotion' },
  { id: 'em189', en: 'melancholy', zh: '忧郁', phonetic: '/ˈmel.ənˌkɒl.i/', example: 'A deep melancholy settled over him.', category: 'emotion' },
  { id: 'em190', en: 'trepidation', zh: '恐惧', phonetic: '/ˌtrep.ɪˈdeɪ.ʃən/', example: 'She approached the stage with trepidation.', category: 'emotion' },
  { id: 'em191', en: 'elation', zh: '兴高采烈', phonetic: '/iˈleɪ.ʃən/', example: 'The team was in a state of elation.', category: 'emotion' },
  { id: 'em192', en: 'despair', zh: '绝望', phonetic: '/dɪˈsper/', example: 'He sank into despair after the tragedy.', category: 'emotion' },
  { id: 'em193', en: 'anguish', zh: '极度痛苦', phonetic: '/ˈæŋ.ɡwɪʃ/', example: 'She cried out in anguish.', category: 'emotion' },
  { id: 'em194', en: 'ecstasy', zh: '狂喜', phonetic: '/ˈek.stə.si/', example: 'The music sent her into ecstasy.', category: 'emotion' },
  { id: 'em195', en: 'anxiety', zh: '焦虑', phonetic: '/æŋˈzaɪ.ə.ti/', example: 'Anxiety can affect your physical health.', category: 'emotion' },
  { id: 'em196', en: 'serenity', zh: '宁静', phonetic: '/səˈren.ə.ti/', example: 'She found serenity in meditation.', category: 'emotion' },
  { id: 'em197', en: 'hostility', zh: '敌意', phonetic: '/hɒˈstɪl.ə.ti/', example: 'There was open hostility between the rivals.', category: 'emotion' },
  { id: 'em198', en: 'affection', zh: '喜爱', phonetic: '/əˈfek.ʃən/', example: 'She has deep affection for her grandparents.', category: 'emotion' },
  { id: 'em199', en: 'resentment', zh: '怨恨', phonetic: '/rɪˈzent.mənt/', example: 'Years of resentment built up inside him.', category: 'emotion' },
  { id: 'em200', en: 'admiration', zh: '钦佩', phonetic: '/ˌæd.məˈreɪ.ʃən/', example: 'I have great admiration for her courage.', category: 'emotion' },
  { id: 'em201', en: 'contempt', zh: '蔑视', phonetic: '/kənˈtempt/', example: 'He looked at the thief with contempt.', category: 'emotion' },
  { id: 'em202', en: 'tenderness', zh: '柔情', phonetic: '/ˈten.dər.nəs/', example: 'She treated the baby with tenderness.', category: 'emotion' },
  { id: 'em203', en: 'fury', zh: '狂怒', phonetic: '/ˈfjʊr.i/', example: 'His face was red with fury.', category: 'emotion' },
  { id: 'em204', en: 'grief', zh: '悲痛', phonetic: '/ɡriːf/', example: 'She was overcome with grief.', category: 'emotion' },
  { id: 'em205', en: 'bliss', zh: '极乐', phonetic: '/blɪs/', example: 'The newlyweds were in a state of bliss.', category: 'emotion' },
  { id: 'em206', en: 'dread', zh: '恐惧', phonetic: '/dred/', example: 'He felt a sense of dread before the surgery.', category: 'emotion' },
  { id: 'em207', en: 'exuberance', zh: '热情洋溢', phonetic: '/ɪɡˈzuː.bər.əns/', example: 'Her exuberance was contagious.', category: 'emotion' },
  { id: 'em208', en: 'humiliation', zh: '羞辱', phonetic: '/hjuːˌmɪl.iˈeɪ.ʃən/', example: 'He suffered public humiliation.', category: 'emotion' },
  { id: 'em209', en: 'indignation', zh: '愤慨', phonetic: '/ˌɪn.dɪɡˈneɪ.ʃən/', example: 'She expressed indignation at the injustice.', category: 'emotion' },
  { id: 'em210', en: 'jubilation', zh: '欢庆', phonetic: '/ˌdʒuː.bɪˈleɪ.ʃən/', example: 'The streets were filled with jubilation.', category: 'emotion' },
  { id: 'em211', en: 'exasperation', zh: '恼怒', phonetic: '/ɪɡˌzæs.pəˈreɪ.ʃən/', example: 'He sighed in exasperation.', category: 'emotion' },
  { id: 'em212', en: 'wonder', zh: '惊奇', phonetic: '/ˈwʌn.dər/', example: 'The child stared in wonder at the stars.', category: 'emotion' },
  { id: 'em213', en: 'awe', zh: '敬畏', phonetic: '/ɔː/', example: 'We stood in awe of the majestic mountains.', category: 'emotion' },
  { id: 'em214', en: 'gratitude', zh: '感激', phonetic: '/ˈɡræt.ɪ.tuːd/', example: 'I express my sincere gratitude to you.', category: 'emotion' },
  { id: 'em215', en: 'remorse', zh: '懊悔', phonetic: '/rɪˈmɔːrs/', example: 'He showed no remorse for his actions.', category: 'emotion' },
  { id: 'em216', en: 'envy', zh: '嫉妒', phonetic: '/ˈen.vi/', example: 'Her success aroused envy among peers.', category: 'emotion' },
  { id: 'em217', en: 'pity', zh: '怜悯', phonetic: '/ˈpɪt.i/', example: 'I felt pity for the stray dog.', category: 'emotion' },
  { id: 'em218', en: 'shame', zh: '羞耻', phonetic: '/ʃeɪm/', example: 'He hung his head in shame.', category: 'emotion' },
  { id: 'em219', en: 'pride', zh: '骄傲', phonetic: '/praɪd/', example: 'She takes pride in her work.', category: 'emotion' },
  { id: 'em220', en: 'disgust', zh: '厌恶', phonetic: '/dɪsˈɡʌst/', example: 'The smell filled her with disgust.', category: 'emotion' },
  { id: 'em221', en: 'outrage', zh: '愤怒', phonetic: '/ˈaʊt.reɪdʒ/', example: 'The decision caused public outrage.', category: 'emotion' },
  { id: 'em222', en: 'fascination', zh: '着迷', phonetic: '/ˌfæs.ɪˈneɪ.ʃən/', example: 'He had a lifelong fascination with space.', category: 'emotion' },
  { id: 'em223', en: 'boredom', zh: '无聊', phonetic: '/ˈbɔːr.dəm/', example: 'He yawned from sheer boredom.', category: 'emotion' },
  { id: 'em224', en: 'loneliness', zh: '孤独', phonetic: '/ˈloʊn.li.nəs/', example: 'Loneliness can be worse than physical pain.', category: 'emotion' },
  { id: 'em225', en: 'contentment', zh: '满足', phonetic: '/kənˈtent.mənt/', example: 'She found contentment in simple living.', category: 'emotion' },
  { id: 'em226', en: 'disappointment', zh: '失望', phonetic: '/ˌdɪs.əˈpɔɪnt.mənt/', example: 'His face showed obvious disappointment.', category: 'emotion' },
  { id: 'em227', en: 'frustration', zh: '挫折', phonetic: '/frʌˈstreɪ.ʃən/', example: 'He could not hide his frustration.', category: 'emotion' },
  { id: 'em228', en: 'irritation', zh: '刺激', phonetic: '/ˌɪr.ɪˈteɪ.ʃən/', example: 'She felt a growing irritation with the noise.', category: 'emotion' },
  { id: 'em229', en: 'relief', zh: '解脱', phonetic: '/rɪˈliːf/', example: 'It was a relief to finally finish the work.', category: 'emotion' },
  { id: 'em230', en: 'optimism', zh: '乐观', phonetic: '/ˈɒp.tɪ.mɪ.zəm/', example: 'Her optimism inspired the whole team.', category: 'emotion' },
  { id: 'em231', en: 'pessimism', zh: '悲观', phonetic: '/ˈpes.ɪ.mɪ.zəm/', example: 'His pessimism brought everyone down.', category: 'emotion' },
  { id: 'em232', en: 'curiosity', zh: '好奇心', phonetic: '/ˌkjʊr.iˈɒs.ə.ti/', example: 'Curiosity drives scientific discovery.', category: 'emotion' },
  { id: 'em233', en: 'indifference', zh: '冷漠', phonetic: '/ɪnˈdɪf.ər.əns/', example: 'His indifference hurt her feelings.', category: 'emotion' },
  { id: 'em234', en: 'ambition', zh: '雄心', phonetic: '/æmˈbɪʃ.ən/', example: 'She is driven by ambition to succeed.', category: 'emotion' },
  { id: 'em235', en: 'confidence', zh: '自信', phonetic: '/ˈkɒn.fɪ.dəns/', example: 'Practice builds confidence.', category: 'emotion' },
  { id: 'em236', en: 'insecurity', zh: '不安全感', phonetic: '/ˌɪn.sɪˈkjʊr.ə.ti/', example: 'His insecurity made him defensive.', category: 'emotion' },
  { id: 'em237', en: 'determination', zh: '决心', phonetic: '/dɪˌtɜːr.mɪˈneɪ.ʃən/', example: 'Her determination led her to victory.', category: 'emotion' },
  { id: 'em238', en: 'hesitation', zh: '犹豫', phonetic: '/ˌhez.ɪˈteɪ.ʃən/', example: 'He agreed without hesitation.', category: 'emotion' },
  { id: 'em239', en: 'courage', zh: '勇气', phonetic: '/ˈkɜːr.ɪdʒ/', example: 'It takes courage to speak the truth.', category: 'emotion' },
  { id: 'em240', en: 'cowardice', zh: '懦弱', phonetic: '/ˈkaʊ.ər.dɪs/', example: 'Running away was an act of cowardice.', category: 'emotion' },
  { id: 'em241', en: 'generosity', zh: '慷慨', phonetic: '/ˌdʒen.əˈrɒs.ə.ti/', example: 'His generosity touched everyone.', category: 'emotion' },
  { id: 'em242', en: 'selfishness', zh: '自私', phonetic: '/ˈsel.fɪʃ.nəs/', example: 'Selfishness can destroy friendships.', category: 'emotion' },
  { id: 'em243', en: 'loyalty', zh: '忠诚', phonetic: '/ˈlɔɪ.əl.ti/', example: 'Loyalty is the foundation of trust.', category: 'emotion' },
  { id: 'em244', en: 'betrayal', zh: '背叛', phonetic: '/bɪˈtreɪ.əl/', example: 'The betrayal shattered their friendship.', category: 'emotion' },
  { id: 'em245', en: 'devotion', zh: '奉献', phonetic: '/dɪˈvoʊ.ʃən/', example: 'Her devotion to her family is admirable.', category: 'emotion' },
  { id: 'em246', en: 'infatuation', zh: '迷恋', phonetic: '/ɪnˌfætʃ.uˈeɪ.ʃən/', example: 'It was just a passing infatuation.', category: 'emotion' },
  { id: 'em247', en: 'loathing', zh: '厌恶', phonetic: '/ˈloʊ.ðɪŋ/', example: 'He looked at the mess with loathing.', category: 'emotion' },
  { id: 'em248', en: 'adoration', zh: '崇拜', phonetic: '/ˌæd.əˈreɪ.ʃən/', example: 'The fans gazed at the star with adoration.', category: 'emotion' },
  { id: 'em249', en: 'introspection', zh: '内省', phonetic: '/ˌɪn.trəˈspek.ʃən/', example: 'Journaling encourages introspection.', category: 'emotion' },
  { id: 'em250', en: 'self-esteem', zh: '自尊', phonetic: '/ˌself ɪˈstiːm/', example: 'Praise helps build self-esteem.', category: 'emotion' },
];

// -- js/data/words_education.js --
const WORDS_EDUCATION = [
  { id: 'ed001', en: 'school', zh: '学校', phonetic: '/skuːl/', example: 'The children walk to school every morning.', category: 'education' },
  { id: 'ed002', en: 'teacher', zh: '老师', phonetic: '/ˈtiː.tʃər/', example: 'Our teacher explained the lesson clearly.', category: 'education' },
  { id: 'ed003', en: 'student', zh: '学生', phonetic: '/ˈstuː.dənt/', example: 'She is a diligent student.', category: 'education' },
  { id: 'ed004', en: 'classroom', zh: '教室', phonetic: '/ˈklæs.ruːm/', example: 'The classroom was filled with desks.', category: 'education' },
  { id: 'ed005', en: 'homework', zh: '家庭作业', phonetic: '/ˈhoʊm.wɜːrk/', example: 'I have a lot of homework tonight.', category: 'education' },
  { id: 'ed006', en: 'textbook', zh: '教科书', phonetic: '/ˈtekst.bʊk/', example: 'Please open your textbook to page 50.', category: 'education' },
  { id: 'ed007', en: 'notebook', zh: '笔记本', phonetic: '/ˈnoʊt.bʊk/', example: 'She wrote the notes in her notebook.', category: 'education' },
  { id: 'ed008', en: 'pencil', zh: '铅笔', phonetic: '/ˈpen.sɪl/', example: 'He sharpened his pencil before the test.', category: 'education' },
  { id: 'ed009', en: 'eraser', zh: '橡皮擦', phonetic: '/ɪˈreɪ.sər/', example: 'Can I borrow your eraser?', category: 'education' },
  { id: 'ed010', en: 'ruler', zh: '尺子', phonetic: '/ˈruː.lər/', example: 'Draw a straight line with a ruler.', category: 'education' },
  { id: 'ed011', en: 'blackboard', zh: '黑板', phonetic: '/ˈblæk.bɔːrd/', example: 'The teacher wrote on the blackboard.', category: 'education' },
  { id: 'ed012', en: 'chalk', zh: '粉笔', phonetic: '/tʃɔːk/', example: 'The chalk made a squeaking sound.', category: 'education' },
  { id: 'ed013', en: 'exam', zh: '考试', phonetic: '/ɪɡˈzæm/', example: 'The final exam is next Monday.', category: 'education' },
  { id: 'ed014', en: 'grade', zh: '成绩', phonetic: '/ɡreɪd/', example: 'She got a good grade in math.', category: 'education' },
  { id: 'ed015', en: 'pass', zh: '通过', phonetic: '/pæs/', example: 'I hope to pass the driving test.', category: 'education' },
  { id: 'ed016', en: 'fail', zh: '不及格', phonetic: '/feɪl/', example: 'He studied hard so he would not fail.', category: 'education' },
  { id: 'ed017', en: 'university', zh: '大学', phonetic: '/ˌjuː.nɪˈvɜːr.sə.ti/', example: 'She was accepted into a top university.', category: 'education' },
  { id: 'ed018', en: 'college', zh: '学院', phonetic: '/ˈkɒl.ɪdʒ/', example: 'He went to college to study engineering.', category: 'education' },
  { id: 'ed019', en: 'degree', zh: '学位', phonetic: '/dɪˈɡriː/', example: 'She earned a degree in biology.', category: 'education' },
  { id: 'ed020', en: 'diploma', zh: '文凭', phonetic: '/dɪˈploʊ.mə/', example: 'He received his diploma at graduation.', category: 'education' },
  { id: 'ed021', en: 'graduate', zh: '毕业', phonetic: '/ˈɡrædʒ.u.eɪt/', example: 'She will graduate next spring.', category: 'education' },
  { id: 'ed022', en: 'professor', zh: '教授', phonetic: '/prəˈfes.ər/', example: 'The professor gave an inspiring lecture.', category: 'education' },
  { id: 'ed023', en: 'lecture', zh: '讲座', phonetic: '/ˈlek.tʃər/', example: 'I attended a fascinating lecture on astronomy.', category: 'education' },
  { id: 'ed024', en: 'seminar', zh: '研讨会', phonetic: '/ˈsem.ɪ.nɑːr/', example: 'The graduate seminar meets every Friday.', category: 'education' },
  { id: 'ed025', en: 'tutorial', zh: '辅导课', phonetic: '/tuːˈtɔːr.i.əl/', example: 'She has a math tutorial this afternoon.', category: 'education' },
  { id: 'ed026', en: 'research', zh: '研究', phonetic: '/rɪˈsɜːrtʃ/', example: 'He is conducting research on climate change.', category: 'education' },
  { id: 'ed027', en: 'thesis', zh: '论文', phonetic: '/ˈθiː.sɪs/', example: 'She is writing her master\'s thesis.', category: 'education' },
  { id: 'ed028', en: 'dissertation', zh: '博士论文', phonetic: '/ˌdɪs.ərˈteɪ.ʃən/', example: 'His dissertation took three years to complete.', category: 'education' },
  { id: 'ed029', en: 'scholarship', zh: '奖学金', phonetic: '/ˈskɒl.ər.ʃɪp/', example: 'She won a scholarship to study abroad.', category: 'education' },
  { id: 'ed030', en: 'tuition', zh: '学费', phonetic: '/tuːˈɪʃ.ən/', example: 'Tuition fees have increased this year.', category: 'education' },
  { id: 'ed031', en: 'campus', zh: '校园', phonetic: '/ˈkæm.pəs/', example: 'The campus is beautiful in autumn.', category: 'education' },
  { id: 'ed032', en: 'dormitory', zh: '宿舍', phonetic: '/ˈdɔːr.mɪ.tɔːr.i/', example: 'She lives in a dormitory on campus.', category: 'education' },
  { id: 'ed033', en: 'library', zh: '图书馆', phonetic: '/ˈlaɪ.brər.i/', example: 'I spent the afternoon in the library.', category: 'education' },
  { id: 'ed034', en: 'laboratory', zh: '实验室', phonetic: '/ləˈbɒr.ə.tɔːr.i/', example: 'The chemistry laboratory is well equipped.', category: 'education' },
  { id: 'ed035', en: 'curriculum', zh: '课程', phonetic: '/kəˈrɪk.jə.ləm/', example: 'The school updated its curriculum this year.', category: 'education' },
  { id: 'ed036', en: 'syllabus', zh: '教学大纲', phonetic: '/ˈsɪl.ə.bəs/', example: 'The professor handed out the syllabus.', category: 'education' },
  { id: 'ed037', en: 'subject', zh: '科目', phonetic: '/ˈsʌb.dʒɪkt/', example: 'History is my favorite subject.', category: 'education' },
  { id: 'ed038', en: 'mathematics', zh: '数学', phonetic: '/ˌmæθ.əˈmæt.ɪks/', example: 'Mathematics requires logical thinking.', category: 'education' },
  { id: 'ed039', en: 'physics', zh: '物理学', phonetic: '/ˈfɪz.ɪks/', example: 'Physics explains how the universe works.', category: 'education' },
  { id: 'ed040', en: 'chemistry', zh: '化学', phonetic: '/ˈkem.ɪ.stri/', example: 'We did an experiment in chemistry class.', category: 'education' },
  { id: 'ed041', en: 'biology', zh: '生物学', phonetic: '/baɪˈɒl.ə.dʒi/', example: 'Biology is the study of living organisms.', category: 'education' },
  { id: 'ed042', en: 'geography', zh: '地理学', phonetic: '/dʒiˈɒɡ.rə.fi/', example: 'Geography helps us understand the world.', category: 'education' },
  { id: 'ed043', en: 'history', zh: '历史', phonetic: '/ˈhɪs.tər.i/', example: 'History repeats itself in many ways.', category: 'education' },
  { id: 'ed044', en: 'literature', zh: '文学', phonetic: '/ˈlɪt.ər.ə.tʃər/', example: 'She studied English literature at university.', category: 'education' },
  { id: 'ed045', en: 'philosophy', zh: '哲学', phonetic: '/fɪˈlɒs.ə.fi/', example: 'Philosophy questions the nature of existence.', category: 'education' },
  { id: 'ed046', en: 'psychology', zh: '心理学', phonetic: '/saɪˈkɒl.ə.dʒi/', example: 'Psychology explores human behavior.', category: 'education' },
  { id: 'ed047', en: 'sociology', zh: '社会学', phonetic: '/ˌsoʊ.siˈɒl.ə.dʒi/', example: 'Sociology examines social structures.', category: 'education' },
  { id: 'ed048', en: 'economics', zh: '经济学', phonetic: '/ˌiː.kəˈnɒm.ɪks/', example: 'Economics studies supply and demand.', category: 'education' },
  { id: 'ed049', en: 'politics', zh: '政治学', phonetic: '/ˈpɒl.ɪ.tɪks/', example: 'She majored in politics at university.', category: 'education' },
  { id: 'ed050', en: 'linguistics', zh: '语言学', phonetic: '/lɪŋˈɡwɪs.tɪks/', example: 'Linguistics is the scientific study of language.', category: 'education' },
  { id: 'ed051', en: 'art', zh: '艺术', phonetic: '/ɑːrt/', example: 'She has a natural talent for art.', category: 'education' },
  { id: 'ed052', en: 'music', zh: '音乐', phonetic: '/ˈmjuː.zɪk/', example: 'He takes music lessons after school.', category: 'education' },
  { id: 'ed053', en: 'physical education', zh: '体育', phonetic: '/ˈfɪz.ɪ.kəl ˌedʒ.ʊˈkeɪ.ʃən/', example: 'We play basketball in physical education.', category: 'education' },
  { id: 'ed054', en: 'computer science', zh: '计算机科学', phonetic: '/kəmˈpjuː.tər ˈsaɪ.əns/', example: 'Computer science is a growing field.', category: 'education' },
  { id: 'ed055', en: 'engineering', zh: '工程学', phonetic: '/ˌen.dʒɪˈnɪr.ɪŋ/', example: 'Engineering applies science to solve problems.', category: 'education' },
  { id: 'ed056', en: 'medicine', zh: '医学', phonetic: '/ˈmed.ɪ.sɪn/', example: 'She is studying medicine to become a doctor.', category: 'education' },
  { id: 'ed057', en: 'law', zh: '法律', phonetic: '/lɔː/', example: 'He went to law school after college.', category: 'education' },
  { id: 'ed058', en: 'business', zh: '商业', phonetic: '/ˈbɪz.nɪs/', example: 'She earned a degree in business.', category: 'education' },
  { id: 'ed059', en: 'architecture', zh: '建筑学', phonetic: '/ˈɑːr.kɪ.tek.tʃər/', example: 'Architecture combines art and engineering.', category: 'education' },
  { id: 'ed060', en: 'astronomy', zh: '天文学', phonetic: '/əˈstrɒn.ə.mi/', example: 'Astronomy fascinates young stargazers.', category: 'education' },
  { id: 'ed061', en: 'learn', zh: '学习', phonetic: '/lɜːrn/', example: 'Children learn languages quickly.', category: 'education' },
  { id: 'ed062', en: 'study', zh: '学习', phonetic: '/ˈstʌd.i/', example: 'I need to study for the exam.', category: 'education' },
  { id: 'ed063', en: 'teach', zh: '教', phonetic: '/tiːtʃ/', example: 'She teaches English at a local school.', category: 'education' },
  { id: 'ed064', en: 'read', zh: '阅读', phonetic: '/riːd/', example: 'I love to read novels in my free time.', category: 'education' },
  { id: 'ed065', en: 'write', zh: '写', phonetic: '/raɪt/', example: 'Please write your name at the top.', category: 'education' },
  { id: 'ed066', en: 'memorize', zh: '记忆', phonetic: '/ˈmem.ə.raɪz/', example: 'Students must memorize vocabulary words.', category: 'education' },
  { id: 'ed067', en: 'understand', zh: '理解', phonetic: '/ˌʌn.dərˈstænd/', example: 'Do you understand the instructions?', category: 'education' },
  { id: 'ed068', en: 'analyze', zh: '分析', phonetic: '/ˈæn.ə.laɪz/', example: 'We need to analyze the data carefully.', category: 'education' },
  { id: 'ed069', en: 'evaluate', zh: '评估', phonetic: '/ɪˈvæl.ju.eɪt/', example: 'The teacher will evaluate our projects.', category: 'education' },
  { id: 'ed070', en: 'compare', zh: '比较', phonetic: '/kəmˈper/', example: 'Compare the two essays for similarities.', category: 'education' },
  { id: 'ed071', en: 'contrast', zh: '对比', phonetic: '/ˈkɒn.træst/', example: 'Contrast the themes of both poems.', category: 'education' },
  { id: 'ed072', en: 'summarize', zh: '总结', phonetic: '/ˈsʌm.ə.raɪz/', example: 'Can you summarize the article for me?', category: 'education' },
  { id: 'ed073', en: 'paraphrase', zh: '释义', phonetic: '/ˈpær.ə.freɪz/', example: 'Paraphrase the paragraph in your own words.', category: 'education' },
  { id: 'ed074', en: 'cite', zh: '引用', phonetic: '/saɪt/', example: 'Always cite your sources in essays.', category: 'education' },
  { id: 'ed075', en: 'reference', zh: '参考文献', phonetic: '/ˈref.ər.əns/', example: 'Include a reference list at the end.', category: 'education' },
  { id: 'ed076', en: 'bibliography', zh: '参考书目', phonetic: '/ˌbɪb.liˈɒɡ.rə.fi/', example: 'The bibliography should be in APA format.', category: 'education' },
  { id: 'ed077', en: 'plagiarism', zh: '抄袭', phonetic: '/ˈpleɪ.dʒə.rɪ.zəm/', example: 'Plagiarism is taken seriously at this school.', category: 'education' },
  { id: 'ed078', en: 'experiment', zh: '实验', phonetic: '/ɪkˈsper.ɪ.mənt/', example: 'We conducted an experiment in the lab.', category: 'education' },
  { id: 'ed079', en: 'hypothesis', zh: '假设', phonetic: '/haɪˈpɒθ.ə.sɪs/', example: 'Formulate a hypothesis before testing.', category: 'education' },
  { id: 'ed080', en: 'theory', zh: '理论', phonetic: '/ˈθɪr.i/', example: 'Einstein\'s theory changed physics forever.', category: 'education' },
  { id: 'ed081', en: 'practice', zh: '练习', phonetic: '/ˈpræk.tɪs/', example: 'Practice makes perfect.', category: 'education' },
  { id: 'ed082', en: 'revise', zh: '复习', phonetic: '/rɪˈvaɪz/', example: 'I need to revise my notes before the test.', category: 'education' },
  { id: 'ed083', en: 'review', zh: '复习', phonetic: '/rɪˈvjuː/', example: 'Let\'s review the main points again.', category: 'education' },
  { id: 'ed084', en: 'discuss', zh: '讨论', phonetic: '/dɪˈskʌs/', example: 'We will discuss the topic in groups.', category: 'education' },
  { id: 'ed085', en: 'debate', zh: '辩论', phonetic: '/dɪˈbeɪt/', example: 'The students debated the controversial issue.', category: 'education' },
  { id: 'ed086', en: 'present', zh: '展示', phonetic: '/prɪˈzent/', example: 'Each group will present their findings.', category: 'education' },
  { id: 'ed087', en: 'demonstrate', zh: '演示', phonetic: '/ˈdem.ən.streɪt/', example: 'The teacher will demonstrate the experiment.', category: 'education' },
  { id: 'ed088', en: 'observe', zh: '观察', phonetic: '/əbˈzɜːrv/', example: 'Observe the reaction in the test tube.', category: 'education' },
  { id: 'ed089', en: 'calculate', zh: '计算', phonetic: '/ˈkæl.kjə.leɪt/', example: 'Calculate the area of this triangle.', category: 'education' },
  { id: 'ed090', en: 'solve', zh: '解决', phonetic: '/sɒlv/', example: 'Can you solve this equation?', category: 'education' },
  { id: 'ed091', en: 'prove', zh: '证明', phonetic: '/pruːv/', example: 'Prove the theorem using algebra.', category: 'education' },
  { id: 'ed092', en: 'define', zh: '定义', phonetic: '/dɪˈfaɪn/', example: 'Define the term in your own words.', category: 'education' },
  { id: 'ed093', en: 'classify', zh: '分类', phonetic: '/ˈklæs.ɪ.faɪ/', example: 'Classify these animals by habitat.', category: 'education' },
  { id: 'ed094', en: 'interpret', zh: '解释', phonetic: '/ɪnˈtɜːr.prɪt/', example: 'Interpret the meaning of this poem.', category: 'education' },
  { id: 'ed095', en: 'critique', zh: '评论', phonetic: '/krɪˈtiːk/', example: 'Students will critique each other\'s work.', category: 'education' },
  { id: 'ed096', en: 'infer', zh: '推断', phonetic: '/ɪnˈfɜːr/', example: 'What can you infer from the data?', category: 'education' },
  { id: 'ed097', en: 'deduce', zh: '推论', phonetic: '/dɪˈduːs/', example: 'We can deduce the answer logically.', category: 'education' },
  { id: 'ed098', en: 'synthesize', zh: '综合', phonetic: '/ˈsɪn.θə.saɪz/', example: 'Synthesize the information from both sources.', category: 'education' },
  { id: 'ed099', en: 'brainstorm', zh: '头脑风暴', phonetic: '/ˈbreɪn.stɔːrm/', example: 'Let\'s brainstorm some ideas for the project.', category: 'education' },
  { id: 'ed100', en: 'outline', zh: '列提纲', phonetic: '/ˈaʊt.laɪn/', example: 'Outline your essay before you write.', category: 'education' },
  { id: 'ed101', en: 'draft', zh: '草稿', phonetic: '/dræft/', example: 'Write a rough draft first.', category: 'education' },
  { id: 'ed102', en: 'edit', zh: '编辑', phonetic: '/ˈed.ɪt/', example: 'Edit your paper for grammar mistakes.', category: 'education' },
  { id: 'ed103', en: 'proofread', zh: '校对', phonetic: '/ˈpruːf.riːd/', example: 'Always proofread before submitting.', category: 'education' },
  { id: 'ed104', en: 'publish', zh: '发表', phonetic: '/ˈpʌb.lɪʃ/', example: 'She published her first research paper.', category: 'education' },
  { id: 'ed105', en: 'enroll', zh: '注册', phonetic: '/ɪnˈroʊl/', example: 'I plan to enroll in a language course.', category: 'education' },
  { id: 'ed106', en: 'register', zh: '注册', phonetic: '/ˈredʒ.ɪ.stər/', example: 'Register for classes before the deadline.', category: 'education' },
  { id: 'ed107', en: 'attend', zh: '参加', phonetic: '/əˈtend/', example: 'He attends all his lectures regularly.', category: 'education' },
  { id: 'ed108', en: 'skip', zh: '逃课', phonetic: '/skɪp/', example: 'Don\'t skip class or you will fall behind.', category: 'education' },
  { id: 'ed109', en: 'drop out', zh: '辍学', phonetic: '/drɒp aʊt/', example: 'He dropped out of college after one year.', category: 'education' },
  { id: 'ed110', en: 'major', zh: '主修', phonetic: '/ˈmeɪ.dʒər/', example: 'She chose to major in psychology.', category: 'education' },
  { id: 'ed111', en: 'minor', zh: '辅修', phonetic: '/ˈmaɪ.nər/', example: 'He is minoring in music.', category: 'education' },
  { id: 'ed112', en: 'elective', zh: '选修课', phonetic: '/ɪˈlek.tɪv/', example: 'I took photography as an elective.', category: 'education' },
  { id: 'ed113', en: 'prerequisite', zh: '先修课程', phonetic: '/priːˈrek.wɪ.zɪt/', example: 'Calculus is a prerequisite for this course.', category: 'education' },
  { id: 'ed114', en: 'credit', zh: '学分', phonetic: '/ˈkred.ɪt/', example: 'This course is worth three credits.', category: 'education' },
  { id: 'ed115', en: 'GPA', zh: '平均绩点', phonetic: '/ˌdʒiː ˌpiː ˈeɪ/', example: 'She has a GPA of 3.8.', category: 'education' },
  { id: 'ed116', en: 'transcript', zh: '成绩单', phonetic: '/ˈtræn.skrɪpt/', example: 'Request an official transcript from the registrar.', category: 'education' },
  { id: 'ed117', en: 'semester', zh: '学期', phonetic: '/sɪˈmes.tər/', example: 'The spring semester starts in February.', category: 'education' },
  { id: 'ed118', en: 'quarter', zh: '学季', phonetic: '/ˈkwɔːr.tər/', example: 'Finals are at the end of the quarter.', category: 'education' },
  { id: 'ed119', en: 'term', zh: '术语', phonetic: '/tɜːrm/', example: 'The autumn term begins in September.', category: 'education' },
  { id: 'ed120', en: 'academic year', zh: '学年', phonetic: '/ˌæk.əˈdem.ɪk jɪr/', example: 'The academic year runs from September to June.', category: 'education' },
  { id: 'ed121', en: 'assignment', zh: '作业', phonetic: '/əˈsaɪn.mənt/', example: 'The assignment is due on Friday.', category: 'education' },
  { id: 'ed122', en: 'deadline', zh: '截止日期', phonetic: '/ˈded.laɪn/', example: 'I missed the deadline for submission.', category: 'education' },
  { id: 'ed123', en: 'essay', zh: '文章', phonetic: '/ˈes.eɪ/', example: 'Write a 500-word essay on pollution.', category: 'education' },
  { id: 'ed124', en: 'report', zh: '报告', phonetic: '/rɪˈpɔːrt/', example: 'Submit your lab report by Monday.', category: 'education' },
  { id: 'ed125', en: 'quiz', zh: '小测验', phonetic: '/kwɪz/', example: 'We have a pop quiz today.', category: 'education' },
  { id: 'ed126', en: 'midterm', zh: '期中考试', phonetic: '/ˈmɪd.tɜːrm/', example: 'I need to study for the midterm exam.', category: 'education' },
  { id: 'ed127', en: 'final', zh: '期末考试', phonetic: '/ˈfaɪ.nəl/', example: 'Finals week is always stressful.', category: 'education' },
  { id: 'ed128', en: 'score', zh: '分数', phonetic: '/skɔːr/', example: 'He achieved a perfect score on the test.', category: 'education' },
  { id: 'ed129', en: 'mark', zh: '评分', phonetic: '/mɑːrk/', example: 'The teacher will mark our papers tonight.', category: 'education' },
  { id: 'ed130', en: 'result', zh: '结果', phonetic: '/rɪˈzʌlt/', example: 'The exam results will be posted online.', category: 'education' },
  { id: 'ed131', en: 'certificate', zh: '证书', phonetic: '/sərˈtɪf.ɪ.kət/', example: 'She earned a certificate in web design.', category: 'education' },
  { id: 'ed132', en: 'qualification', zh: '资格', phonetic: '/ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/', example: 'This qualification is recognized worldwide.', category: 'education' },
  { id: 'ed133', en: 'vocabulary', zh: '词汇', phonetic: '/vəˈkæb.jə.ler.i/', example: 'Expand your vocabulary by reading widely.', category: 'education' },
  { id: 'ed134', en: 'grammar', zh: '语法', phonetic: '/ˈɡræm.ər/', example: 'Good grammar is essential for writing.', category: 'education' },
  { id: 'ed135', en: 'pronunciation', zh: '发音', phonetic: '/prəˌnʌn.siˈeɪ.ʃən/', example: 'Practice your pronunciation every day.', category: 'education' },
  { id: 'ed136', en: 'spelling', zh: '拼写', phonetic: '/ˈspel.ɪŋ/', example: 'Check your spelling before submitting.', category: 'education' },
  { id: 'ed137', en: 'punctuation', zh: '标点符号', phonetic: '/ˌpʌŋk.tʃuˈeɪ.ʃən/', example: 'Correct punctuation improves clarity.', category: 'education' },
  { id: 'ed138', en: 'fluency', zh: '流利', phonetic: '/ˈfluː.ən.si/', example: 'She speaks English with great fluency.', category: 'education' },
  { id: 'ed139', en: 'comprehension', zh: '理解力', phonetic: '/ˌkɒm.prɪˈhen.ʃən/', example: 'Reading comprehension takes practice.', category: 'education' },
  { id: 'ed140', en: 'translation', zh: '翻译', phonetic: '/trænsˈleɪ.ʃən/', example: 'The translation was accurate and clear.', category: 'education' },
  { id: 'ed141', en: 'algebra', zh: '代数', phonetic: '/ˈæl.dʒə.brə/', example: 'Algebra introduces variables and equations.', category: 'education' },
  { id: 'ed142', en: 'geometry', zh: '几何', phonetic: '/dʒiˈɒm.ə.tri/', example: 'Geometry deals with shapes and angles.', category: 'education' },
  { id: 'ed143', en: 'calculus', zh: '微积分', phonetic: '/ˈkæl.kjə.ləs/', example: 'Calculus is essential for advanced physics.', category: 'education' },
  { id: 'ed144', en: 'statistics', zh: '统计学', phonetic: '/stəˈtɪs.tɪks/', example: 'Statistics helps analyze numerical data.', category: 'education' },
  { id: 'ed145', en: 'trigonometry', zh: '三角学', phonetic: '/ˌtrɪɡ.əˈnɒm.ə.tri/', example: 'Trigonometry studies triangle relationships.', category: 'education' },
  { id: 'ed146', en: 'equation', zh: '方程式', phonetic: '/ɪˈkweɪ.ʒən/', example: 'Solve the equation for x.', category: 'education' },
  { id: 'ed147', en: 'formula', zh: '公式', phonetic: '/ˈfɔːr.mjə.lə/', example: 'Memorize the quadratic formula.', category: 'education' },
  { id: 'ed148', en: 'variable', zh: '变量', phonetic: '/ˈver.i.ə.bəl/', example: 'The variable x represents the unknown.', category: 'education' },
  { id: 'ed149', en: 'function', zh: '函数', phonetic: '/ˈfʌŋk.ʃən/', example: 'A function maps input to output.', category: 'education' },
  { id: 'ed150', en: 'graph', zh: '图表', phonetic: '/ɡræf/', example: 'Plot the data on a graph.', category: 'education' },
  { id: 'ed151', en: 'theorem', zh: '定理', phonetic: '/ˈθɪə.rəm/', example: 'The Pythagorean theorem is widely used.', category: 'education' },
  { id: 'ed152', en: 'principle', zh: '原理', phonetic: '/ˈprɪn.sə.pəl/', example: 'Understand the basic principles first.', category: 'education' },
  { id: 'ed153', en: 'concept', zh: '概念', phonetic: '/ˈkɒn.sept/', example: 'This concept is difficult to grasp.', category: 'education' },
  { id: 'ed154', en: 'method', zh: '方法', phonetic: '/ˈmeθ.əd/', example: 'The scientific method is systematic.', category: 'education' },
  { id: 'ed155', en: 'approach', zh: '方法', phonetic: '/əˈproʊtʃ/', example: 'Try a different approach to the problem.', category: 'education' },
  { id: 'ed156', en: 'technique', zh: '技术', phonetic: '/tekˈniːk/', example: 'Learn effective study techniques.', category: 'education' },
  { id: 'ed157', en: 'strategy', zh: '策略', phonetic: '/ˈstræt.ə.dʒi/', example: 'Develop a strategy for exam preparation.', category: 'education' },
  { id: 'ed158', en: 'skill', zh: '技能', phonetic: '/skɪl/', example: 'Critical thinking is an important skill.', category: 'education' },
  { id: 'ed159', en: 'knowledge', zh: '知识', phonetic: '/ˈnɒl.ɪdʒ/', example: 'Knowledge is power.', category: 'education' },
  { id: 'ed160', en: 'wisdom', zh: '智慧', phonetic: '/ˈwɪz.dəm/', example: 'Wisdom comes with experience.', category: 'education' },
  { id: 'ed161', en: 'intelligence', zh: '智力', phonetic: '/ɪnˈtel.ɪ.dʒəns/', example: 'Intelligence can be developed through learning.', category: 'education' },
  { id: 'ed162', en: 'talent', zh: '天赋', phonetic: '/ˈtæl.ənt/', example: 'She has a natural talent for languages.', category: 'education' },
  { id: 'ed163', en: 'aptitude', zh: '才能', phonetic: '/ˈæp.tɪ.tuːd/', example: 'He showed an aptitude for mathematics.', category: 'education' },
  { id: 'ed164', en: 'discipline', zh: '学科', phonetic: '/ˈdɪs.ə.plɪn/', example: 'Academic discipline requires dedication.', category: 'education' },
  { id: 'ed165', en: 'motivation', zh: '动机', phonetic: '/ˌmoʊ.tɪˈveɪ.ʃən/', example: 'Intrinsic motivation leads to deeper learning.', category: 'education' },
  { id: 'ed166', en: 'concentration', zh: '专注', phonetic: '/ˌkɒn.sənˈtreɪ.ʃən/', example: 'Good concentration improves study efficiency.', category: 'education' },
  { id: 'ed167', en: 'distraction', zh: '分心', phonetic: '/dɪˈstræk.ʃən/', example: 'Turn off your phone to avoid distractions.', category: 'education' },
  { id: 'ed168', en: 'procrastination', zh: '拖延', phonetic: '/prəˌkræs.tɪˈneɪ.ʃən/', example: 'Procrastination is the enemy of success.', category: 'education' },
  { id: 'ed169', en: 'time management', zh: '时间管理', phonetic: '/taɪm ˈmæn.ɪdʒ.mənt/', example: 'Good time management reduces stress.', category: 'education' },
  { id: 'ed170', en: 'goal', zh: '目标', phonetic: '/ɡoʊl/', example: 'Set realistic goals for each semester.', category: 'education' },
  { id: 'ed171', en: 'achievement', zh: '成就', phonetic: '/əˈtʃiːv.mənt/', example: 'Academic achievement requires hard work.', category: 'education' },
  { id: 'ed172', en: 'progress', zh: '进步', phonetic: '/ˈprɑː.ɡres/', example: 'Your progress this term has been excellent.', category: 'education' },
  { id: 'ed173', en: 'improvement', zh: '改善', phonetic: '/ɪmˈpruːv.mənt/', example: 'There is room for improvement in your writing.', category: 'education' },
  { id: 'ed174', en: 'feedback', zh: '反馈', phonetic: '/ˈfiːd.bæk/', example: 'The teacher gave helpful feedback on my essay.', category: 'education' },
  { id: 'ed175', en: 'assessment', zh: '评估', phonetic: '/əˈses.mənt/', example: 'Continuous assessment replaces final exams.', category: 'education' },
  { id: 'ed176', en: 'evaluation', zh: '评价', phonetic: '/ɪˌvæl.juˈeɪ.ʃən/', example: 'The course evaluation is anonymous.', category: 'education' },
  { id: 'ed177', en: 'rubric', zh: '评分标准', phonetic: '/ˈruː.brɪk/', example: 'The teacher shared the grading rubric.', category: 'education' },
  { id: 'ed178', en: 'criterion', zh: '标准', phonetic: '/kraɪˈtɪr.i.ən/', example: 'What is the main criterion for grading?', category: 'education' },
  { id: 'ed179', en: 'standard', zh: '标准', phonetic: '/ˈstæn.dərd/', example: 'The school maintains high academic standards.', category: 'education' },
  { id: 'ed180', en: 'accreditation', zh: '认证', phonetic: '/əˌkred.ɪˈteɪ.ʃən/', example: 'The university lost its accreditation.', category: 'education' },
  { id: 'ed181', en: 'admission', zh: '录取', phonetic: '/ədˈmɪʃ.ən/', example: 'Admission to the program is competitive.', category: 'education' },
  { id: 'ed182', en: 'application', zh: '申请', phonetic: '/ˌæp.lɪˈkeɪ.ʃən/', example: 'Submit your application by the deadline.', category: 'education' },
  { id: 'ed183', en: 'interview', zh: '面试', phonetic: '/ˈɪn.tər.vjuː/', example: 'She prepared thoroughly for the college interview.', category: 'education' },
  { id: 'ed184', en: 'recommendation', zh: '推荐信', phonetic: '/ˌrek.ə.menˈdeɪ.ʃən/', example: 'Ask your professor for a recommendation letter.', category: 'education' },
  { id: 'ed185', en: 'principal', zh: '校长', phonetic: '/ˈprɪn.sə.pəl/', example: 'The principal addressed the assembly.', category: 'education' },
  { id: 'ed186', en: 'dean', zh: '院长', phonetic: '/diːn/', example: 'The dean approved the new curriculum.', category: 'education' },
  { id: 'ed187', en: 'faculty', zh: '全体教师', phonetic: '/ˈfæk.əl.ti/', example: 'The faculty meets every month.', category: 'education' },
  { id: 'ed188', en: 'staff', zh: '员工', phonetic: '/stæf/', example: 'The administrative staff are very helpful.', category: 'education' },
  { id: 'ed189', en: 'advisor', zh: '顾问', phonetic: '/ədˈvaɪ.zər/', example: 'My academic advisor helped me choose courses.', category: 'education' },
  { id: 'ed190', en: 'mentor', zh: '导师', phonetic: '/ˈmen.tɔːr/', example: 'A good mentor guides your career path.', category: 'education' },
  { id: 'ed191', en: 'tutor', zh: '家教', phonetic: '/ˈtuː.tər/', example: 'She works as a math tutor after school.', category: 'education' },
  { id: 'ed192', en: 'peer', zh: '同学', phonetic: '/pɪr/', example: 'Learn from your peers in group projects.', category: 'education' },
  { id: 'ed193', en: 'classmate', zh: '同班同学', phonetic: '/ˈklæs.meɪt/', example: 'I study with my classmates every day.', category: 'education' },
  { id: 'ed194', en: 'freshman', zh: '大一新生', phonetic: '/ˈfreʃ.mən/', example: 'He was a freshman when we met.', category: 'education' },
  { id: 'ed195', en: 'sophomore', zh: '大二学生', phonetic: '/ˈsɒf.ə.mɔːr/', example: 'Sophomore year is often the busiest.', category: 'education' },
  { id: 'ed196', en: 'junior', zh: '大三学生', phonetic: '/ˈdʒuː.ni.ər/', example: 'She is a junior majoring in biology.', category: 'education' },
  { id: 'ed197', en: 'senior', zh: '大四学生', phonetic: '/ˈsiː.ni.ər/', example: 'Seniors are preparing for graduation.', category: 'education' },
  { id: 'ed198', en: 'undergraduate', zh: '本科生', phonetic: '/ˌʌn.dərˈɡrædʒ.u.ət/', example: 'She is an undergraduate in engineering.', category: 'education' },
  { id: 'ed199', en: 'postgraduate', zh: '研究生', phonetic: '/ˌpoʊstˈɡrædʒ.u.ət/', example: 'He is pursuing postgraduate studies.', category: 'education' },
  { id: 'ed200', en: 'alumni', zh: '校友', phonetic: '/əˈlʌm.naɪ/', example: 'The alumni reunion is next month.', category: 'education' },
  { id: 'ed201', en: 'kindergarten', zh: '幼儿园', phonetic: '/ˈkɪn.dərˌɡɑːr.tən/', example: 'My daughter started kindergarten this year.', category: 'education' },
  { id: 'ed202', en: 'elementary school', zh: '小学', phonetic: '/ˌel.ɪˈmen.tər.i skuːl/', example: 'Elementary school lays the foundation for learning.', category: 'education' },
  { id: 'ed203', en: 'middle school', zh: '中学', phonetic: '/ˈmɪd.əl skuːl/', example: 'Middle school can be a challenging time.', category: 'education' },
  { id: 'ed204', en: 'high school', zh: '高中', phonetic: '/haɪ skuːl/', example: 'She graduated from high school with honors.', category: 'education' },
  { id: 'ed205', en: 'vocational school', zh: '职业学校', phonetic: '/voʊˈkeɪ.ʃən.əl skuːl/', example: 'Vocational school teaches practical skills.', category: 'education' },
  { id: 'ed206', en: 'literacy', zh: '读写能力', phonetic: '/ˈlɪt.ər.ə.si/', example: 'Literacy rates have improved globally.', category: 'education' },
  { id: 'ed207', en: 'numeracy', zh: '计算能力', phonetic: '/ˈnjuː.mər.ə.si/', example: 'Numeracy is as important as literacy.', category: 'education' },
  { id: 'ed208', en: 'pedagogy', zh: '教学法', phonetic: '/ˈped.ə.ɡɒdʒ.i/', example: 'Modern pedagogy emphasizes active learning.', category: 'education' },
  { id: 'ed209', en: 'curriculum', zh: '课程设置', phonetic: '/kəˈrɪk.jə.ləm/', example: 'The national curriculum sets standards.', category: 'education' },
  { id: 'ed210', en: 'textbook', zh: '课本', phonetic: '/ˈtekst.bʊk/', example: 'Textbooks can be expensive for students.', category: 'education' },
  { id: 'ed211', en: 'workbook', zh: '练习册', phonetic: '/ˈwɜːrk.bʊk/', example: 'Complete the exercises in your workbook.', category: 'education' },
  { id: 'ed212', en: 'worksheet', zh: '工作表', phonetic: '/ˈwɜːrk.ʃiːt/', example: 'The teacher handed out a grammar worksheet.', category: 'education' },
  { id: 'ed213', en: 'flashcard', zh: '抽认卡', phonetic: '/ˈflæʃ.kɑːrd/', example: 'Flashcards help with memorization.', category: 'education' },
  { id: 'ed214', en: 'whiteboard', zh: '白板', phonetic: '/ˈwaɪt.bɔːrd/', example: 'The teacher drew a diagram on the whiteboard.', category: 'education' },
  { id: 'ed215', en: 'projector', zh: '投影仪', phonetic: '/prəˈdʒek.tər/', example: 'She used a projector for her presentation.', category: 'education' },
  { id: 'ed216', en: 'calculator', zh: '计算器', phonetic: '/ˈkæl.kjə.leɪ.tər/', example: 'You may use a calculator on the test.', category: 'education' },
  { id: 'ed217', en: 'compass', zh: '圆规', phonetic: '/ˈkʌm.pəs/', example: 'Use a compass to draw a circle.', category: 'education' },
  { id: 'ed218', en: 'protractor', zh: '量角器', phonetic: '/prəˈtræk.tər/', example: 'Measure the angle with a protractor.', category: 'education' },
  { id: 'ed219', en: 'backpack', zh: '书包', phonetic: '/ˈbæk.pæk/', example: 'His backpack was full of books.', category: 'education' },
  { id: 'ed220', en: 'locker', zh: '储物柜', phonetic: '/ˈlɒk.ər/', example: 'She keeps her books in her locker.', category: 'education' },
  { id: 'ed221', en: 'uniform', zh: '校服', phonetic: '/ˈjuː.nɪ.fɔːrm/', example: 'Students must wear a uniform to school.', category: 'education' },
  { id: 'ed222', en: 'assembly', zh: '集会', phonetic: '/əˈsem.bli/', example: 'The morning assembly starts at eight.', category: 'education' },
  { id: 'ed223', en: 'recess', zh: '课间休息', phonetic: '/rɪˈses/', example: 'The children play outside during recess.', category: 'education' },
  { id: 'ed224', en: 'detention', zh: '留校', phonetic: '/dɪˈten.ʃən/', example: 'He got detention for being late.', category: 'education' },
  { id: 'ed225', en: 'suspension', zh: '停学', phonetic: '/səˈspen.ʃən/', example: 'Fighting can lead to suspension from school.', category: 'education' },
  { id: 'ed226', en: 'expulsion', zh: '开除', phonetic: '/ɪkˈspʌl.ʃən/', example: 'Expulsion is the most severe punishment.', category: 'education' },
  { id: 'ed227', en: 'graduate', zh: '毕业生', phonetic: '/ˈɡrædʒ.u.ət/', example: 'She is a graduate of Harvard University.', category: 'education' },
  { id: 'ed228', en: 'valedictorian', zh: '毕业生代表', phonetic: '/ˌvæl.ə.dɪkˈtɔːr.i.ən/', example: 'The valedictorian gave an inspiring speech.', category: 'education' },
  { id: 'ed229', en: 'commencement', zh: '毕业典礼', phonetic: '/kəˈmens.mənt/', example: 'Commencement was a memorable day.', category: 'education' },
  { id: 'ed230', en: 'cap and gown', zh: '学位服', phonetic: '/kæp ənd ɡaʊn/', example: 'Graduates wore cap and gown at the ceremony.', category: 'education' },
  { id: 'ed231', en: 'extracurricular', zh: '课外的', phonetic: '/ˌek.strə.kəˈrɪk.jə.lər/', example: 'Extracurricular activities build character.', category: 'education' },
  { id: 'ed232', en: 'internship', zh: '实习', phonetic: '/ˈɪn.tɜːrn.ʃɪp/', example: 'She completed a summer internship at a lab.', category: 'education' },
  { id: 'ed233', en: 'exchange program', zh: '交换项目', phonetic: '/ɪksˈtʃeɪndʒ ˈproʊ.ɡræm/', example: 'He studied abroad through an exchange program.', category: 'education' },
  { id: 'ed234', en: 'study abroad', zh: '出国留学', phonetic: '/ˈstʌd.i əˈbrɔːd/', example: 'Studying abroad broadens your horizons.', category: 'education' },
  { id: 'ed235', en: 'online learning', zh: '在线学习', phonetic: '/ˈɒn.laɪn ˈlɜːr.nɪŋ/', example: 'Online learning has become very popular.', category: 'education' },
  { id: 'ed236', en: 'distance education', zh: '远程教育', phonetic: '/ˈdɪs.təns ˌedʒ.ʊˈkeɪ.ʃən/', example: 'Distance education offers flexibility.', category: 'education' },
  { id: 'ed237', en: 'e-learning', zh: '电子学习', phonetic: '/ˈiː ˌlɜːr.nɪŋ/', example: 'E-learning platforms offer many courses.', category: 'education' },
  { id: 'ed238', en: 'MOOC', zh: '大规模开放在线课程', phonetic: '/muːk/', example: 'She enrolled in a MOOC on data science.', category: 'education' },
  { id: 'ed239', en: 'lecture hall', zh: '讲堂', phonetic: '/ˈlek.tʃər hɔːl/', example: 'The lecture hall seats 300 students.', category: 'education' },
  { id: 'ed240', en: 'auditorium', zh: '礼堂', phonetic: '/ˌɔː.dɪˈtɔːr.i.əm/', example: 'The ceremony was held in the auditorium.', category: 'education' },
  { id: 'ed241', en: 'gymnasium', zh: '体育馆', phonetic: '/dʒɪmˈneɪ.zi.əm/', example: 'PE classes are held in the gymnasium.', category: 'education' },
  { id: 'ed242', en: 'playground', zh: '操场', phonetic: '/ˈpleɪ.ɡraʊnd/', example: 'The children ran to the playground.', category: 'education' },
  { id: 'ed243', en: 'cafeteria', zh: '食堂', phonetic: '/ˌkæf.əˈtɪr.i.ə/', example: 'We eat lunch in the cafeteria.', category: 'education' },
  { id: 'ed244', en: 'stationery', zh: '文具', phonetic: '/ˈsteɪ.ʃən.ər.i/', example: 'She bought new stationery for school.', category: 'education' },
  { id: 'ed245', en: 'glue', zh: '胶水', phonetic: '/ɡluː/', example: 'Stick the paper with glue.', category: 'education' },
  { id: 'ed246', en: 'scissors', zh: '剪刀', phonetic: '/ˈsɪz.ərz/', example: 'Be careful when using scissors.', category: 'education' },
  { id: 'ed247', en: 'highlighter', zh: '荧光笔', phonetic: '/ˈhaɪ.laɪ.tər/', example: 'Use a highlighter to mark key points.', category: 'education' },
  { id: 'ed248', en: 'binder', zh: '活页夹', phonetic: '/ˈbaɪn.dər/', example: 'Keep your notes organized in a binder.', category: 'education' },
  { id: 'ed249', en: 'scholar', zh: '学者', phonetic: '/ˈskɒl.ər/', example: 'She is a renowned scholar in her field.', category: 'education' },
  { id: 'ed250', en: 'lifelong learning', zh: '终身学习', phonetic: '/ˈlaɪf.lɒŋ ˈlɜːr.nɪŋ/', example: 'Lifelong learning keeps the mind sharp.', category: 'education' },
];

// -- js/data/words_animals.js --
const WORDS_ANIMALS = [
{ id: 'an001', en: 'dog', zh: '狗', phonetic: '/dɒɡ/', example: 'The dog wagged its tail happily when its owner came home.', category: 'animals' },
{ id: 'an002', en: 'cat', zh: '猫', phonetic: '/kæt/', example: 'The cat curled up on the sofa and fell asleep.', category: 'animals' },
{ id: 'an003', en: 'horse', zh: '马', phonetic: '/hɔːrs/', example: 'She learned to ride a horse when she was ten years old.', category: 'animals' },
{ id: 'an004', en: 'lion', zh: '狮子', phonetic: '/ˈlaɪ.ən/', example: 'The lion is often called the king of the jungle.', category: 'animals' },
{ id: 'an005', en: 'tiger', zh: '老虎', phonetic: '/ˈtaɪ.ɡər/', example: 'A tiger has distinctive black stripes on its orange fur.', category: 'animals' },
{ id: 'an006', en: 'elephant', zh: '大象', phonetic: '/ˈel.ɪ.fənt/', example: 'Elephants are the largest land animals on Earth.', category: 'animals' },
{ id: 'an007', en: 'whale', zh: '鲸鱼', phonetic: '/weɪl/', example: 'The blue whale is the largest animal ever known to have existed.', category: 'animals' },
{ id: 'an008', en: 'dolphin', zh: '海豚', phonetic: '/ˈdɒl.fɪn/', example: 'Dolphins are highly intelligent and social marine mammals.', category: 'animals' },
{ id: 'an009', en: 'bat', zh: '蝙蝠', phonetic: '/bæt/', example: 'Bats are the only mammals capable of sustained flight.', category: 'animals' },
{ id: 'an010', en: 'kangaroo', zh: '袋鼠', phonetic: '/ˌkæŋ.ɡəˈruː/', example: 'A kangaroo carries its baby in a pouch on its belly.', category: 'animals' },
{ id: 'an011', en: 'wolf', zh: '狼', phonetic: '/wʊlf/', example: 'The wolf howled at the full moon in the cold night.', category: 'animals' },
{ id: 'an012', en: 'fox', zh: '狐狸', phonetic: '/fɒks/', example: 'The red fox darted across the field and disappeared into the woods.', category: 'animals' },
{ id: 'an013', en: 'bear', zh: '熊', phonetic: '/ber/', example: 'A brown bear can weigh up to six hundred kilograms.', category: 'animals' },
{ id: 'an014', en: 'deer', zh: '鹿', phonetic: '/dɪr/', example: 'A family of deer grazed peacefully in the meadow at dawn.', category: 'animals' },
{ id: 'an015', en: 'rabbit', zh: '兔子', phonetic: '/ˈræb.ɪt/', example: 'The rabbit hopped quickly into its burrow to hide.', category: 'animals' },
{ id: 'an016', en: 'mouse', zh: '老鼠', phonetic: '/maʊs/', example: 'A tiny mouse scurried across the kitchen floor.', category: 'animals' },
{ id: 'an017', en: 'rat', zh: '大老鼠', phonetic: '/ræt/', example: 'Rats are highly adaptable and can live almost anywhere.', category: 'animals' },
{ id: 'an018', en: 'squirrel', zh: '松鼠', phonetic: '/ˈskwɜːr.əl/', example: 'The squirrel gathered acorns and stored them for the winter.', category: 'animals' },
{ id: 'an019', en: 'monkey', zh: '猴子', phonetic: '/ˈmʌŋ.ki/', example: 'The monkey swung from branch to branch with ease.', category: 'animals' },
{ id: 'an020', en: 'gorilla', zh: '大猩猩', phonetic: '/ɡəˈrɪl.ə/', example: 'Gorillas share about ninety-eight percent of their DNA with humans.', category: 'animals' },
{ id: 'an021', en: 'chimpanzee', zh: '黑猩猩', phonetic: '/ˌtʃɪm.pænˈziː/', example: 'Chimpanzees are known to use tools to obtain food.', category: 'animals' },
{ id: 'an022', en: 'zebra', zh: '斑马', phonetic: '/ˈziː.brə/', example: 'Each zebra has a unique pattern of black and white stripes.', category: 'animals' },
{ id: 'an023', en: 'giraffe', zh: '长颈鹿', phonetic: '/dʒɪˈræf/', example: 'A giraffe can reach leaves high in the trees with its long neck.', category: 'animals' },
{ id: 'an024', en: 'hippopotamus', zh: '河马', phonetic: '/ˌhɪp.əˈpɒt.ə.məs/', example: 'The hippopotamus spends most of its day submerged in water.', category: 'animals' },
{ id: 'an025', en: 'rhinoceros', zh: '犀牛', phonetic: '/raɪˈnɒs.ər.əs/', example: 'The rhinoceros uses its horn to defend itself against predators.', category: 'animals' },
{ id: 'an026', en: 'camel', zh: '骆驼', phonetic: '/ˈkæm.əl/', example: 'Camels can survive for days without water in the desert.', category: 'animals' },
{ id: 'an027', en: 'sheep', zh: '绵羊', phonetic: '/ʃiːp/', example: 'The farmer sheared the sheep to collect its soft wool.', category: 'animals' },
{ id: 'an028', en: 'goat', zh: '山羊', phonetic: '/ɡoʊt/', example: 'Goats are excellent climbers and can scale steep rocky slopes.', category: 'animals' },
{ id: 'an029', en: 'cow', zh: '奶牛', phonetic: '/kaʊ/', example: 'The cow grazed contentedly in the green pasture.', category: 'animals' },
{ id: 'an030', en: 'pig', zh: '猪', phonetic: '/pɪɡ/', example: 'Pigs are surprisingly intelligent and have an excellent sense of smell.', category: 'animals' },
{ id: 'an031', en: 'donkey', zh: '驴', phonetic: '/ˈdɒŋ.ki/', example: 'The donkey carried heavy loads up the narrow mountain path.', category: 'animals' },
{ id: 'an032', en: 'otter', zh: '水獭', phonetic: '/ˈɒt.ər/', example: 'The otter floated on its back while cracking open a shellfish.', category: 'animals' },
{ id: 'an033', en: 'seal', zh: '海豹', phonetic: '/siːl/', example: 'Seals basked in the sun on the rocky shore.', category: 'animals' },
{ id: 'an034', en: 'walrus', zh: '海象', phonetic: '/ˈwɔːl.rəs/', example: 'The walrus used its long tusks to pull itself onto the ice.', category: 'animals' },
{ id: 'an035', en: 'panda', zh: '熊猫', phonetic: '/ˈpæn.də/', example: 'Giant pandas spend most of their day eating bamboo.', category: 'animals' },
{ id: 'an036', en: 'koala', zh: '考拉', phonetic: '/koʊˈɑː.lə/', example: 'The koala slept for nearly twenty hours in the eucalyptus tree.', category: 'animals' },
{ id: 'an037', en: 'sloth', zh: '树懒', phonetic: '/sloʊθ/', example: 'Sloths move so slowly that algae grows on their fur.', category: 'animals' },
{ id: 'an038', en: 'cheetah', zh: '猎豹', phonetic: '/ˈtʃiː.tə/', example: 'The cheetah is the fastest land animal, reaching speeds over one hundred kilometers per hour.', category: 'animals' },
{ id: 'an039', en: 'leopard', zh: '豹子', phonetic: '/ˈlep.ərd/', example: 'The leopard dragged its prey up into the tree to eat in peace.', category: 'animals' },
{ id: 'an040', en: 'jaguar', zh: '美洲豹', phonetic: '/ˈdʒæɡ.ju.ər/', example: 'The jaguar is the largest cat native to the Americas.', category: 'animals' },
{ id: 'an041', en: 'hyena', zh: '鬣狗', phonetic: '/haɪˈiː.nə/', example: 'Hyenas are skilled hunters, not just scavengers as many people believe.', category: 'animals' },
{ id: 'an042', en: 'meerkat', zh: '猫鼬', phonetic: '/ˈmɪr.kæt/', example: 'The meerkat stood on its hind legs to watch for danger.', category: 'animals' },
{ id: 'an043', en: 'badger', zh: '獾', phonetic: '/ˈbædʒ.ər/', example: 'The badger dug an extensive network of tunnels underground.', category: 'animals' },
{ id: 'an044', en: 'hedgehog', zh: '刺猬', phonetic: '/ˈhedʒ.hɒɡ/', example: 'The hedgehog rolled into a tight ball to protect itself.', category: 'animals' },
{ id: 'an045', en: 'mole', zh: '鼹鼠', phonetic: '/moʊl/', example: 'Moles live almost entirely underground and are rarely seen above ground.', category: 'animals' },
{ id: 'an046', en: 'beaver', zh: '河狸', phonetic: '/ˈbiː.vər/', example: 'Beavers build dams across streams using branches and mud.', category: 'animals' },
{ id: 'an047', en: 'porcupine', zh: '豪猪', phonetic: '/ˈpɔːr.kjə.paɪn/', example: 'The porcupine raised its sharp quills as a warning to the predator.', category: 'animals' },
{ id: 'an048', en: 'armadillo', zh: '犰狳', phonetic: '/ˌɑːr.məˈdɪl.oʊ/', example: 'The armadillo has a leathery armor shell that protects its body.', category: 'animals' },
{ id: 'an049', en: 'platypus', zh: '鸭嘴兽', phonetic: '/ˈplæt.ɪ.pəs/', example: 'The platypus is one of the few mammals that lay eggs.', category: 'animals' },
{ id: 'an050', en: 'raccoon', zh: '浣熊', phonetic: '/rækˈuːn/', example: 'The raccoon washed its food in the stream before eating it.', category: 'animals' },
{ id: 'an051', en: 'skunk', zh: '臭鼬', phonetic: '/skʌŋk/', example: 'The skunk raised its tail and sprayed a foul-smelling liquid at the intruder.', category: 'animals' },
{ id: 'an052', en: 'bison', zh: '野牛', phonetic: '/ˈbaɪ.sən/', example: 'Huge herds of bison once roamed across the North American plains.', category: 'animals' },
{ id: 'an053', en: 'antelope', zh: '羚羊', phonetic: '/ˈæn.tɪ.loʊp/', example: 'The antelope sprinted across the savanna to escape the lion.', category: 'animals' },
{ id: 'an054', en: 'gazelle', zh: '瞪羚', phonetic: '/ɡəˈzel/', example: 'Gazelles are known for their graceful leaps and incredible speed.', category: 'animals' },
{ id: 'an055', en: 'moose', zh: '驼鹿', phonetic: '/muːs/', example: 'A full-grown moose can stand over two meters tall at the shoulder.', category: 'animals' },
{ id: 'an056', en: 'reindeer', zh: '驯鹿', phonetic: '/ˈreɪn.dɪr/', example: 'Reindeer migrate hundreds of kilometers each year across the tundra.', category: 'animals' },
{ id: 'an057', en: 'polar bear', zh: '北极熊', phonetic: '/ˈpoʊ.lər ber/', example: 'Polar bears rely on sea ice to hunt seals in the Arctic.', category: 'animals' },
{ id: 'an058', en: 'llama', zh: '羊驼', phonetic: '/ˈlɑː.mə/', example: 'Llamas have been used as pack animals in the Andes for centuries.', category: 'animals' },
{ id: 'an059', en: 'eagle', zh: '鹰', phonetic: '/ˈiː.ɡəl/', example: 'The eagle soared high above the mountains searching for prey.', category: 'animals' },
{ id: 'an060', en: 'sparrow', zh: '麻雀', phonetic: '/ˈspær.oʊ/', example: 'A small sparrow perched on the windowsill and chirped a cheerful tune.', category: 'animals' },
{ id: 'an061', en: 'penguin', zh: '企鹅', phonetic: '/ˈpeŋ.ɡwɪn/', example: 'Penguins cannot fly, but they are excellent swimmers underwater.', category: 'animals' },
{ id: 'an062', en: 'parrot', zh: '鹦鹉', phonetic: '/ˈpær.ət/', example: 'The parrot mimicked its owners voice with surprising accuracy.', category: 'animals' },
{ id: 'an063', en: 'owl', zh: '猫头鹰', phonetic: '/aʊl/', example: 'The owl hooted softly from its perch in the old oak tree.', category: 'animals' },
{ id: 'an064', en: 'swan', zh: '天鹅', phonetic: '/swɒn/', example: 'The swan glided gracefully across the still surface of the lake.', category: 'animals' },
{ id: 'an065', en: 'flamingo', zh: '火烈鸟', phonetic: '/fləˈmɪŋ.ɡoʊ/', example: 'Flamingos get their pink color from the shrimp they eat.', category: 'animals' },
{ id: 'an066', en: 'hawk', zh: '隼', phonetic: '/hɔːk/', example: 'The hawk swooped down and caught a mouse in its sharp talons.', category: 'animals' },
{ id: 'an067', en: 'falcon', zh: '猎鹰', phonetic: '/ˈfæl.kən/', example: 'The peregrine falcon can dive at speeds over three hundred kilometers per hour.', category: 'animals' },
{ id: 'an068', en: 'pigeon', zh: '鸽子', phonetic: '/ˈpɪdʒ.ɪn/', example: 'Pigeons have been used to carry messages since ancient times.', category: 'animals' },
{ id: 'an069', en: 'crow', zh: '乌鸦', phonetic: '/kroʊ/', example: 'A clever crow used a stick to extract insects from a tree trunk.', category: 'animals' },
{ id: 'an070', en: 'raven', zh: '渡鸦', phonetic: '/ˈreɪ.vən/', example: 'The raven is one of the most intelligent birds in the world.', category: 'animals' },
{ id: 'an071', en: 'seagull', zh: '海鸥', phonetic: '/ˈsiː.ɡʌl/', example: 'Seagulls circled above the fishing boat hoping for an easy meal.', category: 'animals' },
{ id: 'an072', en: 'pelican', zh: '鹈鹕', phonetic: '/ˈpel.ɪ.kən/', example: 'The pelican scooped up fish with its large throat pouch.', category: 'animals' },
{ id: 'an073', en: 'woodpecker', zh: '啄木鸟', phonetic: '/ˈwʊdˌpek.ər/', example: 'The woodpecker drummed rapidly against the tree trunk with its beak.', category: 'animals' },
{ id: 'an074', en: 'hummingbird', zh: '蜂鸟', phonetic: '/ˈhʌm.ɪŋ.bɜːrd/', example: 'The hummingbird hovered in mid-air as it sipped nectar from the flower.', category: 'animals' },
{ id: 'an075', en: 'ostrich', zh: '鸵鸟', phonetic: '/ˈɒs.trɪtʃ/', example: 'The ostrich is the largest bird in the world and can run faster than a horse.', category: 'animals' },
{ id: 'an076', en: 'peacock', zh: '孔雀', phonetic: '/ˈpiː.kɒk/', example: 'The peacock spread its magnificent tail feathers to attract a mate.', category: 'animals' },
{ id: 'an077', en: 'duck', zh: '鸭子', phonetic: '/dʌk/', example: 'The duck led her ducklings across the pond in a neat row.', category: 'animals' },
{ id: 'an078', en: 'goose', zh: '鹅', phonetic: '/ɡuːs/', example: 'The goose honked loudly and chased the visitors away from its nest.', category: 'animals' },
{ id: 'an079', en: 'turkey', zh: '火鸡', phonetic: '/ˈtɜːr.ki/', example: 'Wild turkeys can fly short distances despite their large size.', category: 'animals' },
{ id: 'an080', en: 'chicken', zh: '鸡', phonetic: '/ˈtʃɪk.ɪn/', example: 'The chicken scratched at the ground looking for seeds and insects.', category: 'animals' },
{ id: 'an081', en: 'robin', zh: '知更鸟', phonetic: '/ˈrɒb.ɪn/', example: 'The robin is often a sign that spring has arrived.', category: 'animals' },
{ id: 'an082', en: 'blue jay', zh: '蓝松鸦', phonetic: '/bluː dʒeɪ/', example: 'The blue jay announced its presence with a loud, harsh call.', category: 'animals' },
{ id: 'an083', en: 'canary', zh: '金丝雀', phonetic: '/kəˈner.i/', example: 'Miners once used canaries to detect dangerous gases underground.', category: 'animals' },
{ id: 'an084', en: 'toucan', zh: '巨嘴鸟', phonetic: '/ˈtuː.kæn/', example: 'The toucan has a large, colorful bill that helps it reach fruit on branches.', category: 'animals' },
{ id: 'an085', en: 'crane', zh: '鹤', phonetic: '/kreɪn/', example: 'The crane performed an elaborate courtship dance to impress its partner.', category: 'animals' },
{ id: 'an086', en: 'stork', zh: '鹳', phonetic: '/stɔːrk/', example: 'White storks migrate thousands of kilometers between Europe and Africa each year.', category: 'animals' },
{ id: 'an087', en: 'kingfisher', zh: '翠鸟', phonetic: '/ˈkɪŋ.fɪʃ.ər/', example: 'The kingfisher dived into the water and emerged with a small fish in its beak.', category: 'animals' },
{ id: 'an088', en: 'albatross', zh: '信天翁', phonetic: '/ˈæl.bə.trɒs/', example: 'The albatross has the longest wingspan of any living bird.', category: 'animals' },
{ id: 'an089', en: 'snake', zh: '蛇', phonetic: '/sneɪk/', example: 'The snake slithered silently through the tall grass.', category: 'animals' },
{ id: 'an090', en: 'lizard', zh: '蜥蜴', phonetic: '/ˈlɪz.ərd/', example: 'The lizard basked on the warm rock under the afternoon sun.', category: 'animals' },
{ id: 'an091', en: 'crocodile', zh: '鳄鱼', phonetic: '/ˈkrɒk.ə.daɪl/', example: 'The crocodile lay motionless in the water with only its eyes showing above the surface.', category: 'animals' },
{ id: 'an092', en: 'turtle', zh: '海龟', phonetic: '/ˈtɜːr.təl/', example: 'The turtle pulled its head and legs into its shell for protection.', category: 'animals' },
{ id: 'an093', en: 'frog', zh: '青蛙', phonetic: '/frɒɡ/', example: 'The frog leaped into the pond with a loud splash.', category: 'animals' },
{ id: 'an094', en: 'salamander', zh: '蝾螈', phonetic: '/ˈsæl.ə.mæn.dər/', example: 'Salamanders can regenerate lost limbs and even parts of their heart.', category: 'animals' },
{ id: 'an095', en: 'newt', zh: '蝾螈', phonetic: '/njuːt/', example: 'The newt returned to the same pond each spring to breed.', category: 'animals' },
{ id: 'an096', en: 'chameleon', zh: '变色龙', phonetic: '/kəˈmiː.li.ən/', example: 'The chameleon changed its skin color to blend in with the surrounding leaves.', category: 'animals' },
{ id: 'an097', en: 'gecko', zh: '壁虎', phonetic: '/ˈɡek.oʊ/', example: 'Geckos can walk up smooth walls and across ceilings with ease.', category: 'animals' },
{ id: 'an098', en: 'iguana', zh: '鬣蜥', phonetic: '/ɪˈɡwɑː.nə/', example: 'The green iguana sat high in the tree, warming itself in the tropical sun.', category: 'animals' },
{ id: 'an099', en: 'tortoise', zh: '陆龟', phonetic: '/ˈtɔːr.təs/', example: 'The giant tortoise can live for more than one hundred years.', category: 'animals' },
{ id: 'an100', en: 'alligator', zh: '短吻鳄', phonetic: '/ˈæl.ɪ.ɡeɪ.tər/', example: 'Alligators are found in freshwater swamps and marshes across the southeastern United States.', category: 'animals' },
{ id: 'an101', en: 'komodo dragon', zh: '科莫多龙', phonetic: '/kəˈmoʊ.doʊ ˈdræɡ.ən/', example: 'The Komodo dragon is the largest living species of lizard on Earth.', category: 'animals' },
{ id: 'an102', en: 'python', zh: '蟒蛇', phonetic: '/ˈpaɪ.θɒn/', example: 'The python killed its prey by coiling around it and squeezing tightly.', category: 'animals' },
{ id: 'an103', en: 'cobra', zh: '眼镜蛇', phonetic: '/ˈkoʊ.brə/', example: 'The cobra reared up and spread its hood as a warning display.', category: 'animals' },
{ id: 'an104', en: 'rattlesnake', zh: '响尾蛇', phonetic: '/ˈræt.əl.sneɪk/', example: 'The rattlesnake shook its tail to produce a distinctive buzzing sound.', category: 'animals' },
{ id: 'an105', en: 'toad', zh: '蟾蜍', phonetic: '/toʊd/', example: 'The toad has dry, bumpy skin while frogs have smooth, moist skin.', category: 'animals' },
{ id: 'an106', en: 'viper', zh: '蝰蛇', phonetic: '/ˈvaɪ.pər/', example: 'The viper injected venom into its prey through its long, hollow fangs.', category: 'animals' },
{ id: 'an107', en: 'anaconda', zh: '水蟒', phonetic: '/ˌæn.əˈkɒn.də/', example: 'The green anaconda is the heaviest snake in the world.', category: 'animals' },
{ id: 'an108', en: 'skink', zh: '石龙子', phonetic: '/skɪŋk/', example: 'The skink shed its tail to escape from the predators grasp.', category: 'animals' },
{ id: 'an109', en: 'shark', zh: '鲨鱼', phonetic: '/ʃɑːrk/', example: 'Sharks have an incredible sense of smell and can detect blood from miles away.', category: 'animals' },
{ id: 'an110', en: 'salmon', zh: '三文鱼', phonetic: '/ˈsæm.ən/', example: 'Salmon swim upstream against strong currents to return to their birthplace and spawn.', category: 'animals' },
{ id: 'an111', en: 'goldfish', zh: '金鱼', phonetic: '/ˈɡoʊld.fɪʃ/', example: 'The goldfish swam lazily around the bowl in circles.', category: 'animals' },
{ id: 'an112', en: 'seahorse', zh: '海马', phonetic: '/ˈsiː.hɔːrs/', example: 'In seahorses, it is the male that carries and gives birth to the babies.', category: 'animals' },
{ id: 'an113', en: 'jellyfish', zh: '水母', phonetic: '/ˈdʒel.i.fɪʃ/', example: 'The jellyfish drifted gently with the ocean currents, its tentacles trailing behind.', category: 'animals' },
{ id: 'an114', en: 'octopus', zh: '章鱼', phonetic: '/ˈɒk.tə.pəs/', example: 'The octopus squeezed through a tiny opening and escaped from its enclosure.', category: 'animals' },
{ id: 'an115', en: 'crab', zh: '螃蟹', phonetic: '/kræb/', example: 'The crab scuttled sideways across the sandy beach at low tide.', category: 'animals' },
{ id: 'an116', en: 'lobster', zh: '龙虾', phonetic: '/ˈlɒb.stər/', example: 'The lobster defended itself with its large front claws.', category: 'animals' },
{ id: 'an117', en: 'shrimp', zh: '虾', phonetic: '/ʃrɪmp/', example: 'Shrimp are an important food source for many larger marine animals.', category: 'animals' },
{ id: 'an118', en: 'squid', zh: '鱿鱼', phonetic: '/skwɪd/', example: 'The squid shot through the water using jet propulsion.', category: 'animals' },
{ id: 'an119', en: 'clam', zh: '蛤蜊', phonetic: '/klæm/', example: 'The clam burrowed deep into the wet sand as the tide went out.', category: 'animals' },
{ id: 'an120', en: 'oyster', zh: '牡蛎', phonetic: '/ˈɔɪ.stər/', example: 'A single oyster can filter up to fifty gallons of water per day.', category: 'animals' },
{ id: 'an121', en: 'starfish', zh: '海星', phonetic: '/ˈstɑːr.fɪʃ/', example: 'Starfish have the remarkable ability to regenerate lost arms.', category: 'animals' },
{ id: 'an122', en: 'sea urchin', zh: '海胆', phonetic: '/siː ˈɜːr.tʃɪn/', example: 'The sea urchin is covered in sharp spines that protect it from predators.', category: 'animals' },
{ id: 'an123', en: 'stingray', zh: '黄貂鱼', phonetic: '/ˈstɪŋ.reɪ/', example: 'The stingray glided gracefully over the sandy ocean floor.', category: 'animals' },
{ id: 'an124', en: 'tuna', zh: '金枪鱼', phonetic: '/ˈtuː.nə/', example: 'Tuna are among the fastest-swimming fish in the ocean.', category: 'animals' },
{ id: 'an125', en: 'cod', zh: '鳕鱼', phonetic: '/kɒd/', example: 'Cod has been one of the most important food fish throughout history.', category: 'animals' },
{ id: 'an126', en: 'piranha', zh: '食人鱼', phonetic: '/pɪˈrɑː.nə/', example: 'Piranhas have sharp teeth and a powerful bite, but rarely attack humans.', category: 'animals' },
{ id: 'an127', en: 'eel', zh: '鳗鱼', phonetic: '/iːl/', example: 'The electric eel can generate a shock of up to six hundred volts.', category: 'animals' },
{ id: 'an128', en: 'angelfish', zh: '天使鱼', phonetic: '/ˈeɪn.dʒəl.fɪʃ/', example: 'Angelfish are popular in home aquariums for their elegant shape and colors.', category: 'animals' },
{ id: 'an129', en: 'clownfish', zh: '小丑鱼', phonetic: '/ˈklaʊn.fɪʃ/', example: 'Clownfish live among the tentacles of sea anemones for protection.', category: 'animals' },
{ id: 'an130', en: 'manta ray', zh: '蝠鲼', phonetic: '/ˈmæn.tə reɪ/', example: 'The manta ray can grow to a width of over seven meters from wingtip to wingtip.', category: 'animals' },
{ id: 'an131', en: 'coral', zh: '珊瑚', phonetic: '/ˈkɒr.əl/', example: 'Coral reefs support a quarter of all marine life on the planet.', category: 'animals' },
{ id: 'an132', en: 'sea anemone', zh: '海葵', phonetic: '/siː əˈnem.ə.ni/', example: 'The sea anemone looks like a flower but is actually a predatory animal.', category: 'animals' },
{ id: 'an133', en: 'swordfish', zh: '剑鱼', phonetic: '/ˈsɔːrd.fɪʃ/', example: 'The swordfish uses its long, flattened bill to slash through schools of fish.', category: 'animals' },
{ id: 'an134', en: 'ant', zh: '蚂蚁', phonetic: '/ænt/', example: 'An ant can carry objects up to fifty times its own body weight.', category: 'animals' },
{ id: 'an135', en: 'bee', zh: '蜜蜂', phonetic: '/biː/', example: 'Bees play a vital role in pollinating flowers and crops around the world.', category: 'animals' },
{ id: 'an136', en: 'butterfly', zh: '蝴蝶', phonetic: '/ˈbʌt.ər.flaɪ/', example: 'The butterfly emerged from its chrysalis with brightly colored wings.', category: 'animals' },
{ id: 'an137', en: 'spider', zh: '蜘蛛', phonetic: '/ˈspaɪ.dər/', example: 'The spider spun an intricate web between two branches to catch its prey.', category: 'animals' },
{ id: 'an138', en: 'scorpion', zh: '蝎子', phonetic: '/ˈskɔːr.pi.ən/', example: 'The scorpion raised its curved tail, ready to strike with its venomous stinger.', category: 'animals' },
{ id: 'an139', en: 'beetle', zh: '甲虫', phonetic: '/ˈbiː.təl/', example: 'Beetles are the most diverse group of insects, with over three hundred thousand known species.', category: 'animals' },
{ id: 'an140', en: 'dragonfly', zh: '蜻蜓', phonetic: '/ˈdræɡ.ən.flaɪ/', example: 'The dragonfly darted over the pond, catching mosquitoes in midair.', category: 'animals' },
{ id: 'an141', en: 'ladybug', zh: '瓢虫', phonetic: '/ˈleɪ.di.bʌɡ/', example: 'The ladybug landed on the leaf and began eating the tiny aphids.', category: 'animals' },
{ id: 'an142', en: 'mosquito', zh: '蚊子', phonetic: '/məˈskiː.toʊ/', example: 'The mosquito buzzed around my ear and landed on my arm before I swatted it away.', category: 'animals' },
{ id: 'an143', en: 'fly', zh: '苍蝇', phonetic: '/flaɪ/', example: 'A fly has compound eyes that give it nearly three hundred and sixty degree vision.', category: 'animals' },
{ id: 'an144', en: 'grasshopper', zh: '蚱蜢', phonetic: '/ˈɡræs.hɒp.ər/', example: 'The grasshopper leaped high into the air and landed on a distant blade of grass.', category: 'animals' },
{ id: 'an145', en: 'cricket', zh: '蟋蟀', phonetic: '/ˈkrɪk.ɪt/', example: 'The cricket chirped loudly in the warm summer evening.', category: 'animals' },
{ id: 'an146', en: 'cockroach', zh: '蟑螂', phonetic: '/ˈkɒk.roʊtʃ/', example: 'Cockroaches are among the most resilient creatures on the planet.', category: 'animals' },
{ id: 'an147', en: 'moth', zh: '飞蛾', phonetic: '/mɒθ/', example: 'The moth was drawn to the bright porch light in the darkness.', category: 'animals' },
{ id: 'an148', en: 'caterpillar', zh: '毛毛虫', phonetic: '/ˈkæt.ər.pɪl.ər/', example: 'The caterpillar ate leaves constantly as it prepared for its transformation.', category: 'animals' },
{ id: 'an149', en: 'firefly', zh: '萤火虫', phonetic: '/ˈfaɪər.flaɪ/', example: 'Fireflies lit up the summer night with their glowing flashes.', category: 'animals' },
{ id: 'an150', en: 'termite', zh: '白蚁', phonetic: '/ˈtɜːr.maɪt/', example: 'Termites build towering mounds that can reach several meters in height.', category: 'animals' },
{ id: 'an151', en: 'flea', zh: '跳蚤', phonetic: '/fliː/', example: 'Fleas can jump a distance equivalent to one hundred times their body length.', category: 'animals' },
{ id: 'an152', en: 'tick', zh: '蜱虫', phonetic: '/tɪk/', example: 'Ticks can transmit diseases when they attach to a host and feed on blood.', category: 'animals' },
{ id: 'an153', en: 'centipede', zh: '蜈蚣', phonetic: '/ˈsen.tɪ.piːd/', example: 'The centipede scurried across the forest floor on dozens of legs.', category: 'animals' },
{ id: 'an154', en: 'millipede', zh: '千足虫', phonetic: '/ˈmɪl.ɪ.piːd/', example: 'The millipede curled into a tight spiral when it sensed danger.', category: 'animals' },
{ id: 'an155', en: 'praying mantis', zh: '螳螂', phonetic: '/ˌpreɪ.ɪŋ ˈmæn.tɪs/', example: 'The praying mantis remained perfectly still, waiting for an insect to come within reach.', category: 'animals' },
{ id: 'an156', en: 'bumblebee', zh: '大黄蜂', phonetic: '/ˈbʌm.bəl.biː/', example: 'The bumblebee buzzed from flower to flower collecting pollen on its fuzzy body.', category: 'animals' },
{ id: 'an157', en: 'wasp', zh: '黄蜂', phonetic: '/wɒsp/', example: 'The wasp built a papery nest under the eaves of the house.', category: 'animals' },
{ id: 'an158', en: 'aphid', zh: '蚜虫', phonetic: '/ˈeɪ.fɪd/', example: 'Ants often farm aphids to harvest the sweet honeydew they produce.', category: 'animals' },
{ id: 'an159', en: 'paw', zh: '爪子', phonetic: '/pɔː/', example: 'The dog lifted its paw and placed it gently on my knee.', category: 'animals' },
{ id: 'an160', en: 'claw', zh: '爪', phonetic: '/klɔː/', example: 'The cat extended its sharp claws to scratch the scratching post.', category: 'animals' },
{ id: 'an161', en: 'tail', zh: '尾巴', phonetic: '/teɪl/', example: 'The monkey used its prehensile tail to hang from the tree branch.', category: 'animals' },
{ id: 'an162', en: 'wing', zh: '翅膀', phonetic: '/wɪŋ/', example: 'The bird spread its wings and took off into the blue sky.', category: 'animals' },
{ id: 'an163', en: 'beak', zh: '喙', phonetic: '/biːk/', example: 'The eagle used its sharp beak to tear the meat from its prey.', category: 'animals' },
{ id: 'an164', en: 'fin', zh: '鳍', phonetic: '/fɪn/', example: 'The shark circled beneath the boat, its dorsal fin cutting through the water.', category: 'animals' },
{ id: 'an165', en: 'scale', zh: '鳞片', phonetic: '/skeɪl/', example: 'The fish was covered in shiny silver scales that glittered in the sunlight.', category: 'animals' },
{ id: 'an166', en: 'fur', zh: '毛皮', phonetic: '/fɜːr/', example: 'The rabbit had a soft, thick fur coat to keep it warm in winter.', category: 'animals' },
{ id: 'an167', en: 'feather', zh: '羽毛', phonetic: '/ˈfeð.ər/', example: 'A single blue feather fell from the jay as it flew overhead.', category: 'animals' },
{ id: 'an168', en: 'horn', zh: '角', phonetic: '/hɔːrn/', example: 'The rhinoceros charges at threats with its massive horn leading the way.', category: 'animals' },
{ id: 'an169', en: 'hoof', zh: '蹄', phonetic: '/huːf/', example: 'The horses hooves made a rhythmic clopping sound on the cobblestone road.', category: 'animals' },
{ id: 'an170', en: 'mane', zh: '鬃毛', phonetic: '/meɪn/', example: 'The lion shook its thick mane and let out a mighty roar.', category: 'animals' },
{ id: 'an171', en: 'trunk', zh: '象鼻', phonetic: '/trʌŋk/', example: 'The elephant used its trunk to spray water over its back to cool down.', category: 'animals' },
{ id: 'an172', en: 'tusk', zh: '长牙', phonetic: '/tʌsk/', example: 'Walruses use their long tusks to haul themselves onto ice floes.', category: 'animals' },
{ id: 'an173', en: 'shell', zh: '壳', phonetic: '/ʃel/', example: 'The hermit crab found an empty shell and moved in to protect its soft body.', category: 'animals' },
{ id: 'an174', en: 'gill', zh: '鳃', phonetic: '/ɡɪl/', example: 'Fish use their gills to extract oxygen from the water they swim in.', category: 'animals' },
{ id: 'an175', en: 'whisker', zh: '胡须', phonetic: '/ˈwɪs.kər/', example: 'The cat used its whiskers to sense whether it could fit through the narrow gap.', category: 'animals' },
{ id: 'an176', en: 'antler', zh: '鹿角', phonetic: '/ˈænt.lər/', example: 'Male deer shed and regrow their antlers every single year.', category: 'animals' },
{ id: 'an177', en: 'snout', zh: '口鼻部', phonetic: '/snaʊt/', example: 'The pig used its snout to root through the mud searching for truffles.', category: 'animals' },
{ id: 'an178', en: 'fang', zh: '毒牙', phonetic: '/fæŋ/', example: 'The snake bared its fangs and hissed a warning at the approaching intruder.', category: 'animals' },
{ id: 'an179', en: 'flipper', zh: '鳍状肢', phonetic: '/ˈflɪp.ər/', example: 'The seal clapped its flippers together as the trainer gave it a fish.', category: 'animals' },
{ id: 'an180', en: 'tentacle', zh: '触手', phonetic: '/ˈten.tə.kəl/', example: 'The octopus wrapped its tentacles around the crab and pulled it close.', category: 'animals' },
{ id: 'an181', en: 'spine', zh: '刺', phonetic: '/spaɪn/', example: 'The porcupine fish inflated its body and raised its sharp spines in defense.', category: 'animals' },
{ id: 'an182', en: 'pouch', zh: '育儿袋', phonetic: '/paʊtʃ/', example: 'The baby kangaroo peeked out from its mothers pouch.', category: 'animals' },
{ id: 'an183', en: 'crest', zh: '冠', phonetic: '/krest/', example: 'The cockatoo raised the bright yellow crest on top of its head.', category: 'animals' },
{ id: 'an184', en: 'hibernate', zh: '冬眠', phonetic: '/ˈhaɪ.bər.neɪt/', example: 'Bears hibernate during the winter months to conserve energy.', category: 'animals' },
{ id: 'an185', en: 'migrate', zh: '迁徙', phonetic: '/maɪˈɡreɪt/', example: 'Many birds migrate south every autumn to escape the cold.', category: 'animals' },
{ id: 'an186', en: 'hunt', zh: '捕猎', phonetic: '/hʌnt/', example: 'Wolves hunt in packs to take down animals much larger than themselves.', category: 'animals' },
{ id: 'an187', en: 'graze', zh: '吃草', phonetic: '/ɡreɪz/', example: 'Cattle grazed peacefully on the lush green hillside.', category: 'animals' },
{ id: 'an188', en: 'prowl', zh: '潜行', phonetic: '/praʊl/', example: 'The leopard prowled silently through the undergrowth, stalking its prey.', category: 'animals' },
{ id: 'an189', en: 'nest', zh: '筑巢', phonetic: '/nest/', example: 'The birds built their nest using twigs, grass, and soft feathers.', category: 'animals' },
{ id: 'an190', en: 'camouflage', zh: '伪装', phonetic: '/ˈkæm.ə.flɑːʒ/', example: 'The stick insect used camouflage to look exactly like a twig on the branch.', category: 'animals' },
{ id: 'an191', en: 'swarm', zh: '成群', phonetic: '/swɔːrm/', example: 'A swarm of bees clustered around the queen to protect her.', category: 'animals' },
{ id: 'an192', en: 'nocturnal', zh: '夜行性的', phonetic: '/nɒkˈtɜːr.nəl/', example: 'Owls are nocturnal hunters that come alive after the sun goes down.', category: 'animals' },
{ id: 'an193', en: 'predator', zh: '捕食者', phonetic: '/ˈpred.ə.tər/', example: 'The lion is an apex predator with no natural enemies in the wild.', category: 'animals' },
{ id: 'an194', en: 'prey', zh: '猎物', phonetic: '/preɪ/', example: 'The gazelle is the preferred prey of cheetahs on the African plains.', category: 'animals' },
{ id: 'an195', en: 'scavenger', zh: '食腐动物', phonetic: '/ˈskæv.ɪn.dʒər/', example: 'Vultures are scavengers that feed on the carcasses of dead animals.', category: 'animals' },
{ id: 'an196', en: 'herd', zh: '兽群', phonetic: '/hɜːrd/', example: 'A herd of wildebeest stretched across the horizon as far as the eye could see.', category: 'animals' },
{ id: 'an197', en: 'pack', zh: '狼群', phonetic: '/pæk/', example: 'The wolf pack worked together to surround and bring down the injured elk.', category: 'animals' },
{ id: 'an198', en: 'flock', zh: '鸟群', phonetic: '/flɒk/', example: 'A flock of starlings twisted and turned in the sky in a mesmerizing display.', category: 'animals' },
{ id: 'an199', en: 'burrow', zh: '挖洞', phonetic: '/ˈbɜːr.oʊ/', example: 'Rabbits burrow into the ground to create a safe home for their young.', category: 'animals' },
{ id: 'an200', en: 'forage', zh: '觅食', phonetic: '/ˈfɒr.ɪdʒ/', example: 'The bear spent the autumn months foraging for berries and nuts.', category: 'animals' },
{ id: 'an201', en: 'stalk', zh: '悄悄跟踪', phonetic: '/stɔːk/', example: 'The tiger stalked its prey through the tall grass with infinite patience.', category: 'animals' },
{ id: 'an202', en: 'brood', zh: '孵蛋', phonetic: '/bruːd/', example: 'The hen sat on her eggs to brood them until they hatched.', category: 'animals' },
{ id: 'an203', en: 'molt', zh: '蜕皮', phonetic: '/moʊlt/', example: 'The snake hides away while it molts and sheds its old skin.', category: 'animals' },
{ id: 'an204', en: 'echolocation', zh: '回声定位', phonetic: '/ˌek.oʊ.loʊˈkeɪ.ʃən/', example: 'Bats use echolocation to navigate and find insects in complete darkness.', category: 'animals' },
{ id: 'an205', en: 'forest', zh: '森林', phonetic: '/ˈfɒr.ɪst/', example: 'The dense forest provided shelter for countless species of animals.', category: 'animals' },
{ id: 'an206', en: 'jungle', zh: '丛林', phonetic: '/ˈdʒʌŋ.ɡəl/', example: 'The jungle was alive with the calls of monkeys and tropical birds.', category: 'animals' },
{ id: 'an207', en: 'savanna', zh: '热带草原', phonetic: '/səˈvæn.ə/', example: 'Lions and zebras roam the vast African savanna.', category: 'animals' },
{ id: 'an208', en: 'desert', zh: '沙漠', phonetic: '/ˈdez.ərt/', example: 'Many desert animals are nocturnal to avoid the extreme daytime heat.', category: 'animals' },
{ id: 'an209', en: 'ocean', zh: '海洋', phonetic: '/ˈoʊ.ʃən/', example: 'The ocean is home to millions of species, from tiny plankton to giant whales.', category: 'animals' },
{ id: 'an210', en: 'wetland', zh: '湿地', phonetic: '/ˈwet.lænd/', example: 'Wetlands are critical habitats for migrating birds and amphibians.', category: 'animals' },
{ id: 'an211', en: 'coral reef', zh: '珊瑚礁', phonetic: '/ˈkɒr.əl riːf/', example: 'Coral reefs are among the most biodiverse ecosystems on the planet.', category: 'animals' },
{ id: 'an212', en: 'den', zh: '兽穴', phonetic: '/den/', example: 'The fox retreated to its den to feed its newborn cubs.', category: 'animals' },
{ id: 'an213', en: 'grassland', zh: '草原', phonetic: '/ˈɡræs.lænd/', example: 'Bison once grazed the vast grasslands of North America in enormous numbers.', category: 'animals' },
{ id: 'an214', en: 'rainforest', zh: '雨林', phonetic: '/ˈreɪn.fɒr.ɪst/', example: 'The Amazon rainforest contains more animal species than anywhere else on Earth.', category: 'animals' },
{ id: 'an215', en: 'tundra', zh: '冻原', phonetic: '/ˈtʌn.drə/', example: 'Only the hardiest animals can survive the harsh conditions of the Arctic tundra.', category: 'animals' },
{ id: 'an216', en: 'marsh', zh: '沼泽', phonetic: '/mɑːrʃ/', example: 'Herons and egrets waded through the marsh hunting for fish.', category: 'animals' },
{ id: 'an217', en: 'swamp', zh: '沼泽地', phonetic: '/swɒmp/', example: 'Alligators lurked just beneath the surface of the murky swamp water.', category: 'animals' },
{ id: 'an218', en: 'freshwater', zh: '淡水', phonetic: '/ˈfreʃ.wɔː.tər/', example: 'Freshwater habitats like lakes and rivers support a wide variety of life.', category: 'animals' },
{ id: 'an219', en: 'marine', zh: '海洋的', phonetic: '/məˈriːn/', example: 'Marine biologists study the incredible diversity of life in the sea.', category: 'animals' },
{ id: 'an220', en: 'domestic', zh: '家养的', phonetic: '/dəˈmes.tɪk/', example: 'Dogs were among the first animals to be domesticated by humans.', category: 'animals' },
{ id: 'an221', en: 'wild', zh: '野生的', phonetic: '/waɪld/', example: 'It is dangerous to approach wild animals in their natural habitat.', category: 'animals' },
{ id: 'an222', en: 'tame', zh: '驯服的', phonetic: '/teɪm/', example: 'The fox was unusually tame and would eat right out of the rangers hand.', category: 'animals' },
{ id: 'an223', en: 'feral', zh: '野化的', phonetic: '/ˈfer.əl/', example: 'Feral cats live in the streets and alleyways of many cities around the world.', category: 'animals' },
{ id: 'an224', en: 'breed', zh: '品种', phonetic: '/briːd/', example: 'There are over three hundred recognized dog breeds worldwide.', category: 'animals' },
{ id: 'an225', en: 'species', zh: '物种', phonetic: '/ˈspiː.ʃiːz/', example: 'Scientists estimate there are over eight million species of animals on Earth.', category: 'animals' },
{ id: 'an226', en: 'endangered', zh: '濒危的', phonetic: '/ɪnˈdeɪn.dʒərd/', example: 'The giant panda was once endangered but conservation efforts are helping its population recover.', category: 'animals' },
{ id: 'an227', en: 'extinct', zh: '灭绝的', phonetic: '/ɪkˈstɪŋkt/', example: 'The dodo bird went extinct in the seventeenth century due to human activity.', category: 'animals' },
{ id: 'an228', en: 'herbivore', zh: '食草动物', phonetic: '/ˈhɜːr.bɪ.vɔːr/', example: 'Cows, deer, and rabbits are all herbivores that eat only plant matter.', category: 'animals' },
{ id: 'an229', en: 'carnivore', zh: '食肉动物', phonetic: '/ˈkɑːr.nɪ.vɔːr/', example: 'Tigers are obligate carnivores that must eat meat to survive.', category: 'animals' },
{ id: 'an230', en: 'omnivore', zh: '杂食动物', phonetic: '/ˈɒm.nɪ.vɔːr/', example: 'Bears are omnivores that eat both plants and meat depending on the season.', category: 'animals' },
{ id: 'an231', en: 'mammal', zh: '哺乳动物', phonetic: '/ˈmæm.əl/', example: 'All mammals produce milk to feed their young after birth.', category: 'animals' },
{ id: 'an232', en: 'reptile', zh: '爬行动物', phonetic: '/ˈrep.taɪl/', example: 'Reptiles are cold-blooded and must bask in the sun to regulate their body temperature.', category: 'animals' },
{ id: 'an233', en: 'amphibian', zh: '两栖动物', phonetic: '/æmˈfɪb.i.ən/', example: 'Frogs and salamanders are amphibians that begin life in water before moving onto land.', category: 'animals' },
{ id: 'an234', en: 'vertebrate', zh: '脊椎动物', phonetic: '/ˈvɜːr.tɪ.brət/', example: 'All mammals, birds, reptiles, amphibians, and fish are vertebrates with a backbone.', category: 'animals' },
{ id: 'an235', en: 'invertebrate', zh: '无脊椎动物', phonetic: '/ɪnˈvɜːr.tɪ.brət/', example: 'Insects, spiders, and jellyfish are all examples of invertebrates.', category: 'animals' },
{ id: 'an236', en: 'marsupial', zh: '有袋动物', phonetic: '/mɑːrˈsuː.pi.əl/', example: 'Kangaroos and koalas are marsupials that raise their young in a pouch.', category: 'animals' },
{ id: 'an237', en: 'metamorphosis', zh: '变态发育', phonetic: '/ˌmet.əˈmɔːr.fə.sɪs/', example: 'A caterpillar undergoes metamorphosis to transform into a butterfly.', category: 'animals' },
{ id: 'an238', en: 'symbiotic', zh: '共生的', phonetic: '/ˌsɪm.baɪˈɒt.ɪk/', example: 'The clownfish and sea anemone have a symbiotic relationship that benefits both.', category: 'animals' },
{ id: 'an239', en: 'venomous', zh: '有毒的', phonetic: '/ˈven.ə.məs/', example: 'The king cobra is one of the most venomous snakes in the world.', category: 'animals' },
{ id: 'an240', en: 'primate', zh: '灵长类动物', phonetic: '/ˈpraɪ.meɪt/', example: 'Humans, apes, and monkeys all belong to the order of primates.', category: 'animals' },
{ id: 'an241', en: 'rodent', zh: '啮齿动物', phonetic: '/ˈroʊ.dənt/', example: 'Rodents like mice and squirrels have teeth that grow continuously throughout their lives.', category: 'animals' },
{ id: 'an242', en: 'crustacean', zh: '甲壳动物', phonetic: '/krʌˈsteɪ.ʃən/', example: 'Crabs, lobsters, and shrimp are all crustaceans with hard exoskeletons.', category: 'animals' },
{ id: 'an243', en: 'mollusk', zh: '软体动物', phonetic: '/ˈmɒl.əsk/', example: 'Snails, clams, and octopuses are all mollusks despite their very different appearances.', category: 'animals' },
{ id: 'an244', en: 'canine', zh: '犬科动物', phonetic: '/ˈkeɪ.naɪn/', example: 'Dogs, wolves, and foxes are all members of the canine family.', category: 'animals' },
{ id: 'an245', en: 'feline', zh: '猫科动物', phonetic: '/ˈfiː.laɪn/', example: 'The feline family includes both the tiny house cat and the mighty tiger.', category: 'animals' },
{ id: 'an246', en: 'bovine', zh: '牛科动物', phonetic: '/ˈboʊ.vaɪn/', example: 'Cattle, bison, and buffalo are all bovine animals with cloven hooves.', category: 'animals' },
{ id: 'an247', en: 'equine', zh: '马科动物', phonetic: '/ˈek.waɪn/', example: 'Horses, donkeys, and zebras are all equine animals known for their speed.', category: 'animals' },
{ id: 'an248', en: 'livestock', zh: '家畜', phonetic: '/ˈlaɪv.stɒk/', example: 'Farmers raise livestock such as cattle, sheep, and pigs for food and materials.', category: 'animals' },
{ id: 'an249', en: 'poultry', zh: '家禽', phonetic: '/ˈpoʊl.tri/', example: 'Chickens, ducks, and turkeys are common types of poultry raised on farms.', category: 'animals' },
{ id: 'an250', en: 'parasite', zh: '寄生虫', phonetic: '/ˈpær.ə.saɪt/', example: 'The tick is a parasite that feeds on the blood of its host animal.', category: 'animals' }
];
// -- js/data/words_health.js --
const WORDS_HEALTH = [
  // ========== Body Parts & Organs (he001 - he040) ==========
  { id: 'he001', en: 'heart', zh: '心脏', phonetic: '/hɑːrt/', example: 'The heart pumps blood throughout the body.', category: 'health' },
  { id: 'he002', en: 'lung', zh: '肺', phonetic: '/lʌŋ/', example: 'Smoking can damage your lungs over time.', category: 'health' },
  { id: 'he003', en: 'liver', zh: '肝脏', phonetic: '/ˈlɪvər/', example: 'The liver helps filter toxins from the blood.', category: 'health' },
  { id: 'he004', en: 'kidney', zh: '肾脏', phonetic: '/ˈkɪdni/', example: 'She donated one of her kidneys to her brother.', category: 'health' },
  { id: 'he005', en: 'brain', zh: '大脑', phonetic: '/breɪn/', example: 'The human brain contains billions of neurons.', category: 'health' },
  { id: 'he006', en: 'spine', zh: '脊柱', phonetic: '/spaɪn/', example: 'Good posture helps protect your spine.', category: 'health' },
  { id: 'he007', en: 'muscle', zh: '肌肉', phonetic: '/ˈmʌsəl/', example: 'He pulled a muscle while lifting heavy boxes.', category: 'health' },
  { id: 'he008', en: 'bone', zh: '骨骼', phonetic: '/boʊn/', example: 'Calcium is essential for strong bones.', category: 'health' },
  { id: 'he009', en: 'joint', zh: '关节', phonetic: '/dʒɔɪnt/', example: 'Her knee joint hurts after running long distances.', category: 'health' },
  { id: 'he010', en: 'skin', zh: '皮肤', phonetic: '/skɪn/', example: 'She uses sunscreen to protect her skin from UV rays.', category: 'health' },
  { id: 'he011', en: 'stomach', zh: '胃', phonetic: '/ˈstʌmək/', example: 'My stomach hurts after eating too much spicy food.', category: 'health' },
  { id: 'he012', en: 'intestine', zh: '肠', phonetic: '/ɪnˈtestɪn/', example: 'The small intestine absorbs nutrients from food.', category: 'health' },
  { id: 'he013', en: 'artery', zh: '动脉', phonetic: '/ˈɑːrtəri/', example: 'Blocked arteries can lead to a heart attack.', category: 'health' },
  { id: 'he014', en: 'vein', zh: '静脉', phonetic: '/veɪn/', example: 'The nurse found a vein in my arm for the injection.', category: 'health' },
  { id: 'he015', en: 'nerve', zh: '神经', phonetic: '/nɜːrv/', example: 'The dentist hit a nerve and it was quite painful.', category: 'health' },
  { id: 'he016', en: 'skull', zh: '头骨', phonetic: '/skʌl/', example: 'The skull protects the brain from injury.', category: 'health' },
  { id: 'he017', en: 'rib', zh: '肋骨', phonetic: '/rɪb/', example: 'He cracked a rib during the soccer match.', category: 'health' },
  { id: 'he018', en: 'pancreas', zh: '胰腺', phonetic: '/ˈpæŋkriəs/', example: 'The pancreas produces insulin to regulate blood sugar.', category: 'health' },
  { id: 'he019', en: 'spleen', zh: '脾脏', phonetic: '/spliːn/', example: 'The spleen helps filter old red blood cells.', category: 'health' },
  { id: 'he020', en: 'bladder', zh: '膀胱', phonetic: '/ˈblædər/', example: 'A full bladder can be quite uncomfortable.', category: 'health' },
  { id: 'he021', en: 'throat', zh: '喉咙', phonetic: '/θroʊt/', example: 'I have a sore throat from shouting at the concert.', category: 'health' },
  { id: 'he022', en: 'tongue', zh: '舌头', phonetic: '/tʌŋ/', example: 'She burned her tongue on the hot soup.', category: 'health' },
  { id: 'he023', en: 'eye', zh: '眼睛', phonetic: '/aɪ/', example: 'He got something in his eye and had to rinse it out.', category: 'health' },
  { id: 'he024', en: 'ear', zh: '耳朵', phonetic: '/ɪr/', example: 'Listening to loud music can damage your ears.', category: 'health' },
  { id: 'he025', en: 'nose', zh: '鼻子', phonetic: '/noʊz/', example: 'She has a runny nose because of her allergies.', category: 'health' },
  { id: 'he026', en: 'mouth', zh: '嘴巴', phonetic: '/maʊθ/', example: 'The dentist asked him to open his mouth wider.', category: 'health' },
  { id: 'he027', en: 'tooth', zh: '牙齿', phonetic: '/tuːθ/', example: 'She brushes her teeth twice every day.', category: 'health' },
  { id: 'he028', en: 'lip', zh: '嘴唇', phonetic: '/lɪp/', example: 'Her lips were chapped from the cold winter wind.', category: 'health' },
  { id: 'he029', en: 'jaw', zh: '下颌', phonetic: '/dʒɔː/', example: 'He clenched his jaw in frustration.', category: 'health' },
  { id: 'he030', en: 'neck', zh: '脖子', phonetic: '/nek/', example: 'She wore a scarf to keep her neck warm.', category: 'health' },
  { id: 'he031', en: 'shoulder', zh: '肩膀', phonetic: '/ˈʃoʊldər/', example: 'He dislocated his shoulder while playing basketball.', category: 'health' },
  { id: 'he032', en: 'arm', zh: '手臂', phonetic: '/ɑːrm/', example: 'She broke her arm falling off her bicycle.', category: 'health' },
  { id: 'he033', en: 'elbow', zh: '肘部', phonetic: '/ˈɛlboʊ/', example: 'He rested his elbows on the table during dinner.', category: 'health' },
  { id: 'he034', en: 'wrist', zh: '手腕', phonetic: '/rɪst/', example: 'She wears a watch on her left wrist.', category: 'health' },
  { id: 'he035', en: 'hand', zh: '手', phonetic: '/hænd/', example: 'Wash your hands before eating to prevent infection.', category: 'health' },
  { id: 'he036', en: 'finger', zh: '手指', phonetic: '/ˈfɪŋɡər/', example: 'He cut his finger while chopping vegetables.', category: 'health' },
  { id: 'he037', en: 'thumb', zh: '拇指', phonetic: '/θʌm/', example: 'The thumb is the most opposable digit on the human hand.', category: 'health' },
  { id: 'he038', en: 'chest', zh: '胸部', phonetic: '/tʃest/', example: 'He felt a sharp pain in his chest and went to the ER.', category: 'health' },
  { id: 'he039', en: 'back', zh: '背部', phonetic: '/bæk/', example: 'Sitting all day can cause pain in your lower back.', category: 'health' },
  { id: 'he040', en: 'hip', zh: '臀部', phonetic: '/hɪp/', example: 'My grandmother had hip replacement surgery last year.', category: 'health' },

  // ========== Body Parts & Organs continued + Lower body (he041 - he045) ==========
  { id: 'he041', en: 'leg', zh: '腿', phonetic: '/lɛɡ/', example: 'He injured his leg during the marathon.', category: 'health' },
  { id: 'he042', en: 'knee', zh: '膝盖', phonetic: '/niː/', example: 'Her knees ache after climbing stairs all day.', category: 'health' },
  { id: 'he043', en: 'ankle', zh: '脚踝', phonetic: '/ˈæŋkəl/', example: 'She twisted her ankle running on the rocky trail.', category: 'health' },
  { id: 'he044', en: 'foot', zh: '脚', phonetic: '/fʊt/', example: 'He has a blister on his foot from the new shoes.', category: 'health' },
  { id: 'he045', en: 'toe', zh: '脚趾', phonetic: '/toʊ/', example: 'He stubbed his toe against the door frame.', category: 'health' },

  // ========== Illnesses & Symptoms (he046 - he085) ==========
  { id: 'he046', en: 'fever', zh: '发烧', phonetic: '/ˈfiːvər/', example: 'She has a high fever and needs to see a doctor.', category: 'health' },
  { id: 'he047', en: 'cough', zh: '咳嗽', phonetic: '/kɔːf/', example: 'A persistent cough can be a sign of bronchitis.', category: 'health' },
  { id: 'he048', en: 'headache', zh: '头痛', phonetic: '/ˈhɛdeɪk/', example: 'Stress often gives me a tension headache.', category: 'health' },
  { id: 'he049', en: 'nausea', zh: '恶心', phonetic: '/ˈnɔːziə/', example: 'The strong smell caused a feeling of nausea.', category: 'health' },
  { id: 'he050', en: 'diabetes', zh: '糖尿病', phonetic: '/ˌdaɪəˈbiːtiːz/', example: 'She manages her diabetes with daily insulin injections.', category: 'health' },
  { id: 'he051', en: 'asthma', zh: '哮喘', phonetic: '/ˈæzmə/', example: 'He uses an inhaler to control his asthma symptoms.', category: 'health' },
  { id: 'he052', en: 'allergy', zh: '过敏', phonetic: '/ˈælərdʒi/', example: 'Her peanut allergy requires her to carry an EpiPen.', category: 'health' },
  { id: 'he053', en: 'infection', zh: '感染', phonetic: '/ɪnˈfɛkʃən/', example: 'The wound became infected and needed antibiotics.', category: 'health' },
  { id: 'he054', en: 'inflammation', zh: '炎症', phonetic: '/ˌɪnfləˈmeɪʃən/', example: 'Ice can help reduce inflammation after an injury.', category: 'health' },
  { id: 'he055', en: 'fatigue', zh: '疲劳', phonetic: '/fəˈtiːɡ/', example: 'Chronic fatigue made it hard for her to get out of bed.', category: 'health' },
  { id: 'he056', en: 'cancer', zh: '癌症', phonetic: '/ˈkænsər/', example: 'Early detection greatly improves cancer survival rates.', category: 'health' },
  { id: 'he057', en: 'stroke', zh: '中风', phonetic: '/stroʊk/', example: 'He was rushed to the hospital after suffering a stroke.', category: 'health' },
  { id: 'he058', en: 'arthritis', zh: '关节炎', phonetic: '/ɑːrˈθraɪtɪs/', example: 'Arthritis causes pain and stiffness in the joints.', category: 'health' },
  { id: 'he059', en: 'flu', zh: '流感', phonetic: '/fluː/', example: 'Millions of people get the flu vaccine every winter.', category: 'health' },
  { id: 'he060', en: 'cold', zh: '感冒', phonetic: '/koʊld/', example: 'A common cold usually clears up within a week.', category: 'health' },
  { id: 'he061', en: 'pneumonia', zh: '肺炎', phonetic: '/nuːˈmoʊniə/', example: 'Pneumonia can be life-threatening for elderly patients.', category: 'health' },
  { id: 'he062', en: 'hypertension', zh: '高血压', phonetic: '/ˌhaɪpərˈtɛnʃən/', example: 'Hypertension is often called the silent killer.', category: 'health' },
  { id: 'he063', en: 'migraine', zh: '偏头痛', phonetic: '/ˈmaɪɡreɪn/', example: 'Her migraine was so severe she had to lie in a dark room.', category: 'health' },
  { id: 'he064', en: 'diarrhea', zh: '腹泻', phonetic: '/ˌdaɪəˈriːə/', example: 'He got diarrhea after drinking contaminated water.', category: 'health' },
  { id: 'he065', en: 'constipation', zh: '便秘', phonetic: '/ˌkɒnstɪˈpeɪʃən/', example: 'Eating more fiber can help relieve constipation.', category: 'health' },
  { id: 'he066', en: 'rash', zh: '皮疹', phonetic: '/ræʃ/', example: 'She developed a red rash after using the new lotion.', category: 'health' },
  { id: 'he067', en: 'dizziness', zh: '头晕', phonetic: '/ˈdɪzinəs/', example: 'He experienced dizziness when he stood up too quickly.', category: 'health' },
  { id: 'he068', en: 'vomiting', zh: '呕吐', phonetic: '/ˈvɒmɪtɪŋ/', example: 'Food poisoning caused severe vomiting and dehydration.', category: 'health' },
  { id: 'he069', en: 'sore', zh: '疼痛的', phonetic: '/sɔːr/', example: 'My legs are sore after the intense workout yesterday.', category: 'health' },
  { id: 'he070', en: 'insomnia', zh: '失眠', phonetic: '/ɪnˈsɒmniə/', example: 'Chronic insomnia affects her ability to focus at work.', category: 'health' },
  { id: 'he071', en: 'obesity', zh: '肥胖', phonetic: '/oʊˈbiːsɪti/', example: 'Obesity increases the risk of heart disease and diabetes.', category: 'health' },
  { id: 'he072', en: 'anemia', zh: '贫血', phonetic: '/əˈniːmiə/', example: 'Iron deficiency is a common cause of anemia.', category: 'health' },
  { id: 'he073', en: 'tuberculosis', zh: '肺结核', phonetic: '/tuːˌbɜːrkjʊˈloʊsɪs/', example: 'Tuberculosis remains a major global health threat.', category: 'health' },
  { id: 'he074', en: 'hepatitis', zh: '肝炎', phonetic: '/ˌhɛpəˈtaɪtɪs/', example: 'Hepatitis B can be prevented with a vaccine.', category: 'health' },
  { id: 'he075', en: 'bronchitis', zh: '支气管炎', phonetic: '/brɒŋˈkaɪtɪs/', example: 'Bronchitis often develops after a bad cold or flu.', category: 'health' },
  { id: 'he076', en: 'ulcer', zh: '溃疡', phonetic: '/ˈʌlsər/', example: 'Stress and spicy food can aggravate a stomach ulcer.', category: 'health' },
  { id: 'he077', en: 'hernia', zh: '疝气', phonetic: '/ˈhɜːrniə/', example: 'He needed surgery to repair an inguinal hernia.', category: 'health' },
  { id: 'he078', en: 'epilepsy', zh: '癫痫', phonetic: '/ˈɛpɪlɛpsi/', example: 'Epilepsy is a neurological disorder that causes seizures.', category: 'health' },
  { id: 'he079', en: 'eczema', zh: '湿疹', phonetic: '/ˈɛksɪmə/', example: 'Her eczema flares up during the dry winter months.', category: 'health' },
  { id: 'he080', en: 'osteoporosis', zh: '骨质疏松', phonetic: '/ˌɒstioʊpəˈroʊsɪs/', example: 'Weight-bearing exercise helps prevent osteoporosis.', category: 'health' },
  { id: 'he081', en: 'tumor', zh: '肿瘤', phonetic: '/ˈtuːmər/', example: 'The biopsy confirmed the tumor was benign.', category: 'health' },
  { id: 'he082', en: 'concussion', zh: '脑震荡', phonetic: '/kənˈkʌʃən/', example: 'He suffered a concussion after hitting his head on the ground.', category: 'health' },
  { id: 'he083', en: 'sepsis', zh: '败血症', phonetic: '/ˈsɛpsɪs/', example: 'Sepsis is a life-threatening response to infection.', category: 'health' },
  { id: 'he084', en: 'hemorrhage', zh: '出血', phonetic: '/ˈhɛmərɪdʒ/', example: 'The surgeon worked quickly to stop the internal hemorrhage.', category: 'health' },
  { id: 'he085', en: 'fracture', zh: '骨折', phonetic: '/ˈfræktʃər/', example: 'The X-ray showed a hairline fracture in her wrist.', category: 'health' },

  // ========== Medical Terms & Procedures (he086 - he121) ==========
  { id: 'he086', en: 'diagnosis', zh: '诊断', phonetic: '/ˌdaɪəɡˈnoʊsɪs/', example: 'The doctor made a diagnosis after reviewing the test results.', category: 'health' },
  { id: 'he087', en: 'surgery', zh: '外科手术', phonetic: '/ˈsɜːrdʒəri/', example: 'He is scheduled for knee surgery next Monday.', category: 'health' },
  { id: 'he088', en: 'prescription', zh: '处方', phonetic: '/prɪˈskrɪpʃən/', example: 'The pharmacist filled my prescription in about ten minutes.', category: 'health' },
  { id: 'he089', en: 'vaccine', zh: '疫苗', phonetic: '/vækˈsiːn/', example: 'The COVID-19 vaccine saved millions of lives worldwide.', category: 'health' },
  { id: 'he090', en: 'antibiotic', zh: '抗生素', phonetic: '/ˌæntibaɪˈɒtɪk/', example: 'You must complete the full course of antibiotics.', category: 'health' },
  { id: 'he091', en: 'anesthesia', zh: '麻醉', phonetic: '/ˌænɪsˈθiːʒə/', example: 'The patient was put under general anesthesia before the operation.', category: 'health' },
  { id: 'he092', en: 'biopsy', zh: '活检', phonetic: '/ˈbaɪɒpsi/', example: 'A biopsy of the tissue sample confirmed the diagnosis.', category: 'health' },
  { id: 'he093', en: 'chemotherapy', zh: '化疗', phonetic: '/ˌkiːmoʊˈθɛrəpi/', example: 'She lost her hair during chemotherapy but remained positive.', category: 'health' },
  { id: 'he094', en: 'transplant', zh: '移植', phonetic: '/ˈtrænsplænt/', example: 'The heart transplant gave him a second chance at life.', category: 'health' },
  { id: 'he095', en: 'x-ray', zh: 'X光检查', phonetic: '/ˈɛks reɪ/', example: 'The X-ray clearly showed the broken bone in his arm.', category: 'health' },
  { id: 'he096', en: 'MRI', zh: '核磁共振', phonetic: '/ˌɛm ɑːr ˈaɪ/', example: 'The doctor ordered an MRI to examine her brain tissue.', category: 'health' },
  { id: 'he097', en: 'ultrasound', zh: '超声波', phonetic: '/ˈʌltrəsaʊnd/', example: 'The ultrasound showed the baby was healthy and growing.', category: 'health' },
  { id: 'he098', en: 'injection', zh: '注射', phonetic: '/ɪnˈdʒɛkʃən/', example: 'The nurse gave him an injection in his upper arm.', category: 'health' },
  { id: 'he099', en: 'intravenous', zh: '静脉注射的', phonetic: '/ˌɪntrəˈviːnəs/', example: 'She received intravenous fluids to treat dehydration.', category: 'health' },
  { id: 'he100', en: 'endoscopy', zh: '内窥镜检查', phonetic: '/ɛnˈdɒskəpi/', example: 'The endoscopy revealed an ulcer in her stomach lining.', category: 'health' },
  { id: 'he101', en: 'catheter', zh: '导管', phonetic: '/ˈkæθɪtər/', example: 'A catheter was inserted to drain urine from his bladder.', category: 'health' },
  { id: 'he102', en: 'stent', zh: '支架', phonetic: '/stɛnt/', example: 'The cardiologist placed a stent to keep the artery open.', category: 'health' },
  { id: 'he103', en: 'dialysis', zh: '透析', phonetic: '/daɪˈælɪsɪs/', example: 'He goes to the clinic three times a week for dialysis.', category: 'health' },
  { id: 'he104', en: 'defibrillator', zh: '除颤器', phonetic: '/diːˈfɪbrɪleɪtər/', example: 'The defibrillator delivered a shock to restart his heart.', category: 'health' },
  { id: 'he105', en: 'ventilator', zh: '呼吸机', phonetic: '/ˈvɛntɪleɪtər/', example: 'The patient was placed on a ventilator to help her breathe.', category: 'health' },
  { id: 'he106', en: 'immunization', zh: '免疫接种', phonetic: '/ˌɪmjʊnaɪˈzeɪʃən/', example: 'Childhood immunization prevents many serious diseases.', category: 'health' },
  { id: 'he107', en: 'radiation', zh: '放射治疗', phonetic: '/ˌreɪdiˈeɪʃən/', example: 'Radiation therapy targets cancer cells with high-energy beams.', category: 'health' },
  { id: 'he108', en: 'suture', zh: '缝合', phonetic: '/ˈsuːtʃər/', example: 'The doctor used sutures to close the deep cut.', category: 'health' },
  { id: 'he109', en: 'stitch', zh: '缝针', phonetic: '/stɪtʃ/', example: 'He needed ten stitches after falling on broken glass.', category: 'health' },
  { id: 'he110', en: 'cast', zh: '石膏', phonetic: '/kæst/', example: 'She had to wear a cast on her arm for six weeks.', category: 'health' },
  { id: 'he111', en: 'splint', zh: '夹板', phonetic: '/splɪnt/', example: 'The paramedic applied a splint to stabilize the fracture.', category: 'health' },
  { id: 'he112', en: 'transfusion', zh: '输血', phonetic: '/trænsˈfjuːʒən/', example: 'He needed an emergency blood transfusion after the accident.', category: 'health' },
  { id: 'he113', en: 'CPR', zh: '心肺复苏', phonetic: '/ˌsiː piː ˈɑːr/', example: 'She performed CPR on the unconscious man until help arrived.', category: 'health' },
  { id: 'he114', en: 'autopsy', zh: '尸检', phonetic: '/ˈɔːtɒpsi/', example: 'An autopsy was conducted to determine the cause of death.', category: 'health' },
  { id: 'he115', en: 'dosage', zh: '剂量', phonetic: '/ˈdoʊsɪdʒ/', example: 'Always follow the recommended dosage on the medicine label.', category: 'health' },
  { id: 'he116', en: 'prognosis', zh: '预后', phonetic: '/prɒɡˈnoʊsɪs/', example: 'The prognosis is good if the condition is caught early.', category: 'health' },
  { id: 'he117', en: 'chronic', zh: '慢性的', phonetic: '/ˈkrɒnɪk/', example: 'She lives with chronic pain from an old back injury.', category: 'health' },
  { id: 'he118', en: 'acute', zh: '急性的', phonetic: '/əˈkjuːt/', example: 'He was admitted with acute appendicitis and needed surgery.', category: 'health' },
  { id: 'he119', en: 'benign', zh: '良性的', phonetic: '/bɪˈnaɪn/', example: 'Thankfully the lump was benign and required no treatment.', category: 'health' },
  { id: 'he120', en: 'malignant', zh: '恶性的', phonetic: '/məˈlɪɡnənt/', example: 'The malignant tumor required aggressive chemotherapy.', category: 'health' },
  { id: 'he121', en: 'remission', zh: '缓解期', phonetic: '/rɪˈmɪʃən/', example: 'Her cancer has been in remission for over five years.', category: 'health' },

  // ========== Fitness & Exercise (he122 - he147) ==========
  { id: 'he122', en: 'exercise', zh: '锻炼', phonetic: '/ˈɛksərsaɪz/', example: 'Regular exercise reduces the risk of many chronic diseases.', category: 'health' },
  { id: 'he123', en: 'yoga', zh: '瑜伽', phonetic: '/ˈjoʊɡə/', example: 'She practices yoga every morning to improve her flexibility.', category: 'health' },
  { id: 'he124', en: 'running', zh: '跑步', phonetic: '/ˈrʌnɪŋ/', example: 'Running is one of the most effective cardio exercises.', category: 'health' },
  { id: 'he125', en: 'stretching', zh: '拉伸', phonetic: '/ˈstrɛtʃɪŋ/', example: 'Always do some stretching before you start exercising.', category: 'health' },
  { id: 'he126', en: 'cardio', zh: '有氧运动', phonetic: '/ˈkɑːrdioʊ/', example: 'Swimming is an excellent form of cardio exercise.', category: 'health' },
  { id: 'he127', en: 'aerobics', zh: '健美操', phonetic: '/ɛˈroʊbɪks/', example: 'She attends an aerobics class at the gym three times a week.', category: 'health' },
  { id: 'he128', en: 'strength', zh: '力量', phonetic: '/strɛŋkθ/', example: 'Strength training helps build muscle and boost metabolism.', category: 'health' },
  { id: 'he129', en: 'marathon', zh: '马拉松', phonetic: '/ˈmærəθɒn/', example: 'He trained for six months before running his first marathon.', category: 'health' },
  { id: 'he130', en: 'Pilates', zh: '普拉提', phonetic: '/pɪˈlɑːtiːz/', example: 'Pilates focuses on strengthening the core muscles.', category: 'health' },
  { id: 'he131', en: 'warm-up', zh: '热身', phonetic: '/ˈwɔːrm ʌp/', example: 'A proper warm-up helps prevent injuries during workouts.', category: 'health' },
  { id: 'he132', en: 'cooldown', zh: '放松运动', phonetic: '/ˈkuːldaʊn/', example: 'Never skip the cooldown after an intense training session.', category: 'health' },
  { id: 'he133', en: 'treadmill', zh: '跑步机', phonetic: '/ˈtrɛdmɪl/', example: 'She prefers running on a treadmill when the weather is bad.', category: 'health' },
  { id: 'he134', en: 'dumbbell', zh: '哑铃', phonetic: '/ˈdʌmbɛl/', example: 'He lifted a dumbbell with each hand during the workout.', category: 'health' },
  { id: 'he135', en: 'push-up', zh: '俯卧撑', phonetic: '/ˈpʊʃ ʌp/', example: 'He can do fifty push-ups without taking a break.', category: 'health' },
  { id: 'he136', en: 'sit-up', zh: '仰卧起坐', phonetic: '/ˈsɪt ʌp/', example: 'Sit-ups are a classic exercise for strengthening abdominal muscles.', category: 'health' },
  { id: 'he137', en: 'squat', zh: '深蹲', phonetic: '/skwɒt/', example: 'Proper form is essential when doing squats to protect your knees.', category: 'health' },
  { id: 'he138', en: 'plank', zh: '平板支撑', phonetic: '/plæŋk/', example: 'Holding a plank for two minutes requires strong core muscles.', category: 'health' },
  { id: 'he139', en: 'workout', zh: '锻炼', phonetic: '/ˈwɜːrkaʊt/', example: 'She tracks every workout in her fitness journal.', category: 'health' },
  { id: 'he140', en: 'gym', zh: '健身房', phonetic: '/dʒɪm/', example: 'He goes to the gym every morning before work.', category: 'health' },
  { id: 'he141', en: 'flexibility', zh: '灵活性', phonetic: '/ˌflɛksɪˈbɪlɪti/', example: 'Yoga and stretching greatly improve flexibility over time.', category: 'health' },
  { id: 'he142', en: 'endurance', zh: '耐力', phonetic: '/ɪnˈdʊərəns/', example: 'Long-distance cycling requires excellent endurance.', category: 'health' },
  { id: 'he143', en: 'agility', zh: '敏捷性', phonetic: '/əˈdʒɪlɪti/', example: 'Agility drills help athletes change direction quickly.', category: 'health' },
  { id: 'he144', en: 'HIIT', zh: '高强度间歇训练', phonetic: '/hɪt/', example: 'HIIT workouts burn a lot of calories in a short amount of time.', category: 'health' },
  { id: 'he145', en: 'CrossFit', zh: '交叉健身', phonetic: '/ˈkrɒsfɪt/', example: 'CrossFit combines weightlifting, gymnastics, and cardio.', category: 'health' },
  { id: 'he146', en: 'calisthenics', zh: '徒手健身', phonetic: '/ˌkælɪsˈθɛnɪks/', example: 'Calisthenics uses body weight as resistance for exercise.', category: 'health' },
  { id: 'he147', en: 'hydration', zh: '补水', phonetic: '/haɪˈdreɪʃən/', example: 'Proper hydration is essential during any intense workout.', category: 'health' },

  // ========== Nutrition & Diet (he148 - he179) ==========
  { id: 'he148', en: 'vitamin', zh: '维生素', phonetic: '/ˈvaɪtəmɪn/', example: 'Oranges are famous for their high vitamin C content.', category: 'health' },
  { id: 'he149', en: 'protein', zh: '蛋白质', phonetic: '/ˈproʊtiːn/', example: 'Eggs and chicken are excellent sources of protein.', category: 'health' },
  { id: 'he150', en: 'carbohydrate', zh: '碳水化合物', phonetic: '/ˌkɑːrboʊˈhaɪdreɪt/', example: 'Whole grains provide complex carbohydrates for lasting energy.', category: 'health' },
  { id: 'he151', en: 'fiber', zh: '纤维', phonetic: '/ˈfaɪbər/', example: 'A diet high in fiber helps maintain healthy digestion.', category: 'health' },
  { id: 'he152', en: 'calorie', zh: '卡路里', phonetic: '/ˈkæləri/', example: 'Counting calories alone is not the healthiest way to lose weight.', category: 'health' },
  { id: 'he153', en: 'mineral', zh: '矿物质', phonetic: '/ˈmɪnərəl/', example: 'Calcium is an important mineral for bone health.', category: 'health' },
  { id: 'he154', en: 'diet', zh: '饮食', phonetic: '/ˈdaɪət/', example: 'A balanced diet includes fruits, vegetables, and whole grains.', category: 'health' },
  { id: 'he155', en: 'organic', zh: '有机的', phonetic: '/ɔːrˈɡænɪk/', example: 'She prefers to buy organic vegetables from the local market.', category: 'health' },
  { id: 'he156', en: 'antioxidant', zh: '抗氧化剂', phonetic: '/ˌæntiˈɒksɪdənt/', example: 'Blueberries are packed with powerful antioxidants.', category: 'health' },
  { id: 'he157', en: 'metabolism', zh: '新陈代谢', phonetic: '/mɪˈtæbəlɪzəm/', example: 'Exercise helps speed up your metabolism.', category: 'health' },
  { id: 'he158', en: 'supplement', zh: '补充剂', phonetic: '/ˈsʌplɪmənt/', example: 'She takes a vitamin D supplement during the winter months.', category: 'health' },
  { id: 'he159', en: 'nutrition', zh: '营养', phonetic: '/nuːˈtrɪʃən/', example: 'Good nutrition is the foundation of a healthy life.', category: 'health' },
  { id: 'he160', en: 'cholesterol', zh: '胆固醇', phonetic: '/kəˈlɛstərɒl/', example: 'High cholesterol levels can increase your risk of heart disease.', category: 'health' },
  { id: 'he161', en: 'glucose', zh: '葡萄糖', phonetic: '/ˈɡluːkoʊs/', example: 'The brain relies on glucose as its primary source of energy.', category: 'health' },
  { id: 'he162', en: 'electrolyte', zh: '电解质', phonetic: '/ɪˈlɛktrəlaɪt/', example: 'Sports drinks help replenish electrolytes lost through sweat.', category: 'health' },
  { id: 'he163', en: 'fat', zh: '脂肪', phonetic: '/fæt/', example: 'Not all fats are bad — avocados contain healthy fats.', category: 'health' },
  { id: 'he164', en: 'sugar', zh: '糖', phonetic: '/ˈʃʊɡər/', example: 'Too much sugar in your diet can lead to health problems.', category: 'health' },
  { id: 'he165', en: 'sodium', zh: '钠', phonetic: '/ˈsoʊdiəm/', example: 'Reducing sodium intake can help lower blood pressure.', category: 'health' },
  { id: 'he166', en: 'potassium', zh: '钾', phonetic: '/pəˈtæsiəm/', example: 'Bananas are a well-known source of potassium.', category: 'health' },
  { id: 'he167', en: 'iron', zh: '铁', phonetic: '/ˈaɪərn/', example: 'Iron-rich foods like spinach help prevent anemia.', category: 'health' },
  { id: 'he168', en: 'calcium', zh: '钙', phonetic: '/ˈkælsiəm/', example: 'Dairy products are a major dietary source of calcium.', category: 'health' },
  { id: 'he169', en: 'zinc', zh: '锌', phonetic: '/zɪŋk/', example: 'Zinc plays a key role in supporting the immune system.', category: 'health' },
  { id: 'he170', en: 'magnesium', zh: '镁', phonetic: '/mæɡˈniːziəm/', example: 'Magnesium helps regulate muscle and nerve function.', category: 'health' },
  { id: 'he171', en: 'probiotic', zh: '益生菌', phonetic: '/ˌproʊbaɪˈɒtɪk/', example: 'Yogurt contains probiotics that are good for gut health.', category: 'health' },
  { id: 'he172', en: 'enzyme', zh: '酶', phonetic: '/ˈɛnzaɪm/', example: 'Digestive enzymes help break down the food we eat.', category: 'health' },
  { id: 'he173', en: 'dehydration', zh: '脱水', phonetic: '/ˌdiːhaɪˈdreɪʃən/', example: 'Severe dehydration requires immediate medical attention.', category: 'health' },
  { id: 'he174', en: 'appetite', zh: '食欲', phonetic: '/ˈæpɪtaɪt/', example: 'Her appetite returned once she started feeling better.', category: 'health' },
  { id: 'he175', en: 'malnutrition', zh: '营养不良', phonetic: '/ˌmælnuːˈtrɪʃən/', example: 'Malnutrition can severely impact a child growth and development.', category: 'health' },
  { id: 'he176', en: 'whole-grain', zh: '全谷物', phonetic: '/ˈhoʊl ɡreɪn/', example: 'Switching to whole-grain bread adds more fiber to your diet.', category: 'health' },
  { id: 'he177', en: 'omega-3', zh: '欧米伽-3', phonetic: '/oʊˈmiːɡə θriː/', example: 'Omega-3 fatty acids found in fish are great for heart health.', category: 'health' },
  { id: 'he178', en: 'detox', zh: '排毒', phonetic: '/ˈdiːtɒks/', example: 'She tried a juice detox to cleanse her system for a week.', category: 'health' },
  { id: 'he179', en: 'glycemic', zh: '血糖的', phonetic: '/ɡlaɪˈsiːmɪk/', example: 'Low glycemic foods help keep blood sugar levels stable.', category: 'health' },

  // ========== Mental Health (he180 - he205) ==========
  { id: 'he180', en: 'anxiety', zh: '焦虑', phonetic: '/æŋˈzaɪəti/', example: 'Deep breathing exercises can help reduce anxiety.', category: 'health' },
  { id: 'he181', en: 'depression', zh: '抑郁症', phonetic: '/dɪˈprɛʃən/', example: 'Depression is a serious medical condition that requires treatment.', category: 'health' },
  { id: 'he182', en: 'stress', zh: '压力', phonetic: '/strɛs/', example: 'Chronic stress can have a negative impact on your physical health.', category: 'health' },
  { id: 'he183', en: 'therapy', zh: '治疗', phonetic: '/ˈθɛrəpi/', example: 'She has been going to therapy to work through her trauma.', category: 'health' },
  { id: 'he184', en: 'meditation', zh: '冥想', phonetic: '/ˌmɛdɪˈteɪʃən/', example: 'He practices meditation for ten minutes every morning.', category: 'health' },
  { id: 'he185', en: 'mindfulness', zh: '正念', phonetic: '/ˈmaɪndfʊlnɪs/', example: 'Mindfulness teaches you to stay present in the moment.', category: 'health' },
  { id: 'he186', en: 'psychology', zh: '心理学', phonetic: '/saɪˈkɒlədʒi/', example: 'She studied psychology to understand human behavior better.', category: 'health' },
  { id: 'he187', en: 'psychiatrist', zh: '精神科医生', phonetic: '/saɪˈkaɪətrɪst/', example: 'A psychiatrist can prescribe medication for mental health conditions.', category: 'health' },
  { id: 'he188', en: 'counseling', zh: '心理咨询', phonetic: '/ˈkaʊnsəlɪŋ/', example: 'Marriage counseling helped them communicate more effectively.', category: 'health' },
  { id: 'he189', en: 'trauma', zh: '创伤', phonetic: '/ˈtrɔːmə/', example: 'Childhood trauma can affect mental health well into adulthood.', category: 'health' },
  { id: 'he190', en: 'phobia', zh: '恐惧症', phonetic: '/ˈfoʊbiə/', example: 'Her phobia of flying prevents her from traveling abroad.', category: 'health' },
  { id: 'he191', en: 'bipolar', zh: '双相情感障碍', phonetic: '/baɪˈpoʊlər/', example: 'Bipolar disorder involves extreme shifts in mood and energy.', category: 'health' },
  { id: 'he192', en: 'PTSD', zh: '创伤后应激障碍', phonetic: '/ˌpiː tiː ɛs ˈdiː/', example: 'Many veterans struggle with PTSD after returning from combat.', category: 'health' },
  { id: 'he193', en: 'OCD', zh: '强迫症', phonetic: '/ˌoʊ siː ˈdiː/', example: 'OCD can cause intrusive thoughts and repetitive behaviors.', category: 'health' },
  { id: 'he194', en: 'ADHD', zh: '注意力缺陷多动障碍', phonetic: '/ˌeɪ diː eɪtʃ ˈdiː/', example: 'Children with ADHD may have trouble focusing in school.', category: 'health' },
  { id: 'he195', en: 'self-esteem', zh: '自尊', phonetic: '/ˌsɛlf ɪˈstiːm/', example: 'Positive affirmations can help improve your self-esteem.', category: 'health' },
  { id: 'he196', en: 'coping', zh: '应对', phonetic: '/ˈkoʊpɪŋ/', example: 'Developing healthy coping mechanisms is vital for mental wellbeing.', category: 'health' },
  { id: 'he197', en: 'resilience', zh: '韧性', phonetic: '/rɪˈzɪliəns/', example: 'Resilience helps you bounce back from difficult situations.', category: 'health' },
  { id: 'he198', en: 'mood', zh: '情绪', phonetic: '/muːd/', example: 'Regular exercise can significantly improve your mood.', category: 'health' },
  { id: 'he199', en: 'addiction', zh: '成瘾', phonetic: '/əˈdɪkʃən/', example: 'He sought help for his addiction to alcohol.', category: 'health' },
  { id: 'he200', en: 'rehab', zh: '康复', phonetic: '/ˈriːhæb/', example: 'She checked into rehab to overcome her substance abuse.', category: 'health' },
  { id: 'he201', en: 'cognitive', zh: '认知的', phonetic: '/ˈkɒɡnɪtɪv/', example: 'Cognitive behavioral therapy is effective for treating anxiety.', category: 'health' },
  { id: 'he202', en: 'emotional', zh: '情感的', phonetic: '/ɪˈmoʊʃənəl/', example: 'Talking about your feelings promotes emotional wellbeing.', category: 'health' },
  { id: 'he203', en: 'panic-attack', zh: '惊恐发作', phonetic: '/ˈpænɪk əˈtæk/', example: 'She felt her heart racing during the sudden panic attack.', category: 'health' },
  { id: 'he204', en: 'burnout', zh: '倦怠', phonetic: '/ˈbɜːrnaʊt/', example: 'Working sixty hours a week eventually led to burnout.', category: 'health' },
  { id: 'he205', en: 'wellbeing', zh: '幸福安康', phonetic: '/ˌwɛlˈbiːɪŋ/', example: 'Taking regular breaks is important for your overall wellbeing.', category: 'health' },

  // ========== Hospital & Healthcare (he206 - he236) ==========
  { id: 'he206', en: 'doctor', zh: '医生', phonetic: '/ˈdɒktər/', example: 'The doctor prescribed some medicine for my infection.', category: 'health' },
  { id: 'he207', en: 'nurse', zh: '护士', phonetic: '/nɜːrs/', example: 'The nurse checked my blood pressure before the appointment.', category: 'health' },
  { id: 'he208', en: 'patient', zh: '病人', phonetic: '/ˈpeɪʃənt/', example: 'The patient was discharged after a full recovery.', category: 'health' },
  { id: 'he209', en: 'ambulance', zh: '救护车', phonetic: '/ˈæmbjʊləns/', example: 'The ambulance arrived within five minutes of the call.', category: 'health' },
  { id: 'he210', en: 'emergency', zh: '急诊', phonetic: '/ɪˈmɜːrdʒənsi/', example: 'He was rushed to the emergency room with chest pain.', category: 'health' },
  { id: 'he211', en: 'clinic', zh: '诊所', phonetic: '/ˈklɪnɪk/', example: 'She visits the clinic for her monthly check-up.', category: 'health' },
  { id: 'he212', en: 'pharmacy', zh: '药房', phonetic: '/ˈfɑːrməsi/', example: 'You can pick up your prescription at the pharmacy downstairs.', category: 'health' },
  { id: 'he213', en: 'surgeon', zh: '外科医生', phonetic: '/ˈsɜːrdʒən/', example: 'The surgeon performed a six-hour operation on his heart.', category: 'health' },
  { id: 'he214', en: 'pediatrician', zh: '儿科医生', phonetic: '/ˌpiːdiəˈtrɪʃən/', example: 'The pediatrician checked the baby growth and development.', category: 'health' },
  { id: 'he215', en: 'ICU', zh: '重症监护室', phonetic: '/ˌaɪ siː ˈjuː/', example: 'He spent three days in the ICU after the major surgery.', category: 'health' },
  { id: 'he216', en: 'hospital', zh: '医院', phonetic: '/ˈhɒspɪtəl/', example: 'She was admitted to the hospital for further observation.', category: 'health' },
  { id: 'he217', en: 'ward', zh: '病房', phonetic: '/wɔːrd/', example: 'The maternity ward was full of newborn babies.', category: 'health' },
  { id: 'he218', en: 'stretcher', zh: '担架', phonetic: '/ˈstrɛtʃər/', example: 'The paramedics carried the injured man on a stretcher.', category: 'health' },
  { id: 'he219', en: 'wheelchair', zh: '轮椅', phonetic: '/ˈwiːltʃɛr/', example: 'He used a wheelchair while recovering from his leg injury.', category: 'health' },
  { id: 'he220', en: 'stethoscope', zh: '听诊器', phonetic: '/ˈstɛθəskoʊp/', example: 'The doctor used a stethoscope to listen to my heartbeat.', category: 'health' },
  { id: 'he221', en: 'thermometer', zh: '体温计', phonetic: '/θərˈmɒmɪtər/', example: 'The nurse used a thermometer to check if I had a fever.', category: 'health' },
  { id: 'he222', en: 'blood-pressure', zh: '血压', phonetic: '/ˈblʌd ˌprɛʃər/', example: 'High blood pressure is a major risk factor for heart disease.', category: 'health' },
  { id: 'he223', en: 'pulse', zh: '脉搏', phonetic: '/pʌls/', example: 'The nurse checked his pulse to make sure it was steady.', category: 'health' },
  { id: 'he224', en: 'oxygen', zh: '氧气', phonetic: '/ˈɒksɪdʒən/', example: 'The patient was put on an oxygen mask to help him breathe.', category: 'health' },
  { id: 'he225', en: 'EKG', zh: '心电图', phonetic: '/ˌiː keɪ ˈdʒiː/', example: 'The EKG showed an irregular heartbeat that needed attention.', category: 'health' },
  { id: 'he226', en: 'CT-scan', zh: 'CT扫描', phonetic: '/ˌsiː ˈtiː skæn/', example: 'A CT scan provides detailed images of internal organs.', category: 'health' },
  { id: 'he227', en: 'epidemic', zh: '流行病', phonetic: '/ˌɛpɪˈdɛmɪk/', example: 'The flu epidemic spread quickly through the crowded city.', category: 'health' },
  { id: 'he228', en: 'pandemic', zh: '大流行病', phonetic: '/pænˈdɛmɪk/', example: 'The pandemic changed the way people work and socialize.', category: 'health' },
  { id: 'he229', en: 'quarantine', zh: '隔离', phonetic: '/ˈkwɒrəntiːn/', example: 'Travelers had to undergo a two-week quarantine upon arrival.', category: 'health' },
  { id: 'he230', en: 'symptom', zh: '症状', phonetic: '/ˈsɪmptəm/', example: 'Fever and cough are common symptoms of the flu.', category: 'health' },
  { id: 'he231', en: 'recovery', zh: '康复', phonetic: '/rɪˈkʌvəri/', example: 'His recovery from the surgery went better than expected.', category: 'health' },
  { id: 'he232', en: 'discharge', zh: '出院', phonetic: '/ˈdɪstʃɑːrdʒ/', example: 'She was discharged from the hospital after a week of treatment.', category: 'health' },
  { id: 'he233', en: 'referral', zh: '转诊', phonetic: '/rɪˈfɜːrəl/', example: 'My doctor gave me a referral to see a specialist.', category: 'health' },
  { id: 'he234', en: 'specialist', zh: '专科医生', phonetic: '/ˈspɛʃəlɪst/', example: 'You need to see a specialist for that rare skin condition.', category: 'health' },
  { id: 'he235', en: 'healthcare', zh: '医疗保健', phonetic: '/ˈhɛlθkɛr/', example: 'Access to affordable healthcare is a basic human right.', category: 'health' },
  { id: 'he236', en: 'insurance', zh: '保险', phonetic: '/ɪnˈʃʊrəns/', example: 'Health insurance helps cover the cost of medical treatments.', category: 'health' },

  // ========== Wellness & Self-care (he237 - he250) ==========
  { id: 'he237', en: 'sleep', zh: '睡眠', phonetic: '/sliːp/', example: 'Getting enough sleep is essential for your immune system.', category: 'health' },
  { id: 'he238', en: 'relaxation', zh: '放松', phonetic: '/ˌriːlækˈseɪʃən/', example: 'Deep breathing is a simple technique for relaxation.', category: 'health' },
  { id: 'he239', en: 'massage', zh: '按摩', phonetic: '/məˈsɑːʒ/', example: 'A good massage can help relieve muscle tension and stress.', category: 'health' },
  { id: 'he240', en: 'acupuncture', zh: '针灸', phonetic: '/ˈækjʊpʌŋktʃər/', example: 'She tried acupuncture to relieve her chronic back pain.', category: 'health' },
  { id: 'he241', en: 'spa', zh: '水疗', phonetic: '/spɑː/', example: 'They spent the weekend at a health spa to unwind.', category: 'health' },
  { id: 'he242', en: 'hygiene', zh: '卫生', phonetic: '/ˈhaɪdʒiːn/', example: 'Proper hand hygiene is the best way to prevent illness.', category: 'health' },
  { id: 'he243', en: 'immunity', zh: '免疫力', phonetic: '/ɪˈmjuːnɪti/', example: 'A healthy diet helps boost your immunity against infections.', category: 'health' },
  { id: 'he244', en: 'sunscreen', zh: '防晒霜', phonetic: '/ˈsʌnskriːn/', example: 'Applying sunscreen daily protects your skin from sun damage.', category: 'health' },
  { id: 'he245', en: 'check-up', zh: '体检', phonetic: '/ˈtʃɛk ʌp/', example: 'She schedules an annual check-up with her doctor every year.', category: 'health' },
  { id: 'he246', en: 'vaccination', zh: '接种疫苗', phonetic: '/ˌvæksɪˈneɪʃən/', example: 'Vaccination programs have eradicated many deadly diseases.', category: 'health' },
  { id: 'he247', en: 'painkiller', zh: '止痛药', phonetic: '/ˈpeɪnkɪlər/', example: 'She took a painkiller to ease her headache before bed.', category: 'health' },
  { id: 'he248', en: 'first-aid', zh: '急救', phonetic: '/ˌfɜːrst ˈeɪd/', example: 'Knowing basic first aid can save someone life in an emergency.', category: 'health' },
  { id: 'he249', en: 'pill', zh: '药丸', phonetic: '/pɪl/', example: 'He takes a vitamin pill every morning with breakfast.', category: 'health' },
  { id: 'he250', en: 'sick', zh: '生病的', phonetic: '/sɪk/', example: 'She stayed home from work because she was feeling sick.', category: 'health' }
];

// -- js/data/words_shopping.js --
const WORDS_SHOPPING = [
  // ========== General Retail & Store Terms ==========
  { id: 'sh001', en: 'store', zh: '商店', phonetic: '/stɔːr/', example: 'I need to go to the store to buy milk.', category: 'shopping' },
  { id: 'sh002', en: 'shop', zh: '店铺', phonetic: '/ʃɒp/', example: 'There is a nice coffee shop on the corner.', category: 'shopping' },
  { id: 'sh003', en: 'mall', zh: '购物中心', phonetic: '/mɔːl/', example: 'We spent the whole afternoon at the shopping mall.', category: 'shopping' },
  { id: 'sh004', en: 'supermarket', zh: '超市', phonetic: '/ˈsuː.pərˌmɑːr.kɪt/', example: 'I do my weekly grocery shopping at the supermarket.', category: 'shopping' },
  { id: 'sh005', en: 'market', zh: '市场', phonetic: '/ˈmɑːr.kɪt/', example: 'The farmers\' market opens every Saturday morning.', category: 'shopping' },
  { id: 'sh006', en: 'boutique', zh: '精品店', phonetic: '/buːˈtiːk/', example: 'She bought a designer dress from a boutique in Paris.', category: 'shopping' },
  { id: 'sh007', en: 'department store', zh: '百货公司', phonetic: '/dɪˈpɑːrt.mənt stɔːr/', example: 'The department store has everything from clothes to electronics.', category: 'shopping' },
  { id: 'sh008', en: 'outlet', zh: '折扣店', phonetic: '/ˈaʊt.let/', example: 'We found great deals at the factory outlet.', category: 'shopping' },
  { id: 'sh009', en: 'retailer', zh: '零售商', phonetic: '/ˈriː.teɪ.lər/', example: 'The retailer announced a major holiday sale.', category: 'shopping' },
  { id: 'sh010', en: 'wholesale', zh: '批发', phonetic: '/ˈhoʊl.seɪl/', example: 'They buy goods at wholesale prices and resell them.', category: 'shopping' },
  { id: 'sh011', en: 'flea market', zh: '跳蚤市场', phonetic: '/fliː ˈmɑːr.kɪt/', example: 'I found this vintage lamp at a flea market.', category: 'shopping' },
  { id: 'sh012', en: 'convenience store', zh: '便利店', phonetic: '/kənˈviː.ni.əns stɔːr/', example: 'I stopped at the convenience store for a snack.', category: 'shopping' },
  { id: 'sh013', en: 'pharmacy', zh: '药店', phonetic: '/ˈfɑːr.mə.si/', example: 'You can pick up your prescription at the pharmacy.', category: 'shopping' },
  { id: 'sh014', en: 'bazaar', zh: '集市', phonetic: '/bəˈzɑːr/', example: 'The Grand Bazaar in Istanbul is one of the oldest markets in the world.', category: 'shopping' },
  { id: 'sh015', en: 'kiosk', zh: '售货亭', phonetic: '/ˈkiː.ɒsk/', example: 'I bought a newspaper from the kiosk near the station.', category: 'shopping' },
  { id: 'sh016', en: 'stall', zh: '摊位', phonetic: '/stɔːl/', example: 'Each stall at the craft fair sold handmade items.', category: 'shopping' },
  { id: 'sh017', en: 'window shopping', zh: '橱窗购物', phonetic: '/ˈwɪn.doʊ ˌʃɒp.ɪŋ/', example: 'We went window shopping but ended up buying nothing.', category: 'shopping' },
  { id: 'sh018', en: 'vendor', zh: '商贩', phonetic: '/ˈven.dər/', example: 'Street vendors sell fresh fruit and vegetables here.', category: 'shopping' },
  { id: 'sh019', en: 'chain store', zh: '连锁店', phonetic: '/tʃeɪn stɔːr/', example: 'This chain store has locations in every major city.', category: 'shopping' },
  { id: 'sh020', en: 'pop-up shop', zh: '快闪店', phonetic: '/pɒp ʌp ʃɒp/', example: 'The brand opened a pop-up shop for the holiday season.', category: 'shopping' },
  { id: 'sh021', en: 'thrift store', zh: '二手店', phonetic: '/θrɪft stɔːr/', example: 'She loves finding vintage clothes at the thrift store.', category: 'shopping' },
  { id: 'sh022', en: 'warehouse', zh: '仓库', phonetic: '/ˈwer.haʊs/', example: 'The furniture warehouse sells directly to the public.', category: 'shopping' },
  { id: 'sh023', en: 'showroom', zh: '展厅', phonetic: '/ˈʃoʊ.ruːm/', example: 'We visited the car showroom to see the latest models.', category: 'shopping' },
  { id: 'sh024', en: 'aisle', zh: '过道', phonetic: '/aɪl/', example: 'The cereal is in aisle five of the supermarket.', category: 'shopping' },
  { id: 'sh025', en: 'checkout', zh: '收银台', phonetic: '/ˈtʃek.aʊt/', example: 'There was a long line at the checkout counter.', category: 'shopping' },
  { id: 'sh026', en: 'counter', zh: '柜台', phonetic: '/ˈkaʊn.tər/', example: 'Please pay at the front counter.', category: 'shopping' },

  // ========== Payment & Money Terms ==========
  { id: 'sh027', en: 'cash', zh: '现金', phonetic: '/kæʃ/', example: 'Do you prefer to pay in cash or by card?', category: 'shopping' },
  { id: 'sh028', en: 'credit card', zh: '信用卡', phonetic: '/ˈkred.ɪt kɑːrd/', example: 'I put all my purchases on my credit card for the rewards.', category: 'shopping' },
  { id: 'sh029', en: 'debit card', zh: '借记卡', phonetic: '/ˈdeb.ɪt kɑːrd/', example: 'The money was taken directly from my account with my debit card.', category: 'shopping' },
  { id: 'sh030', en: 'receipt', zh: '收据', phonetic: '/rɪˈsiːt/', example: 'Please keep your receipt in case you need to return the item.', category: 'shopping' },
  { id: 'sh031', en: 'invoice', zh: '发票', phonetic: '/ˈɪn.vɔɪs/', example: 'The seller issued an invoice for the wholesale order.', category: 'shopping' },
  { id: 'sh032', en: 'refund', zh: '退款', phonetic: '/ˈriː.fʌnd/', example: 'I returned the defective product and got a full refund.', category: 'shopping' },
  { id: 'sh033', en: 'exchange', zh: '换货', phonetic: '/ɪksˈtʃeɪndʒ/', example: 'Can I exchange this shirt for a larger size?', category: 'shopping' },
  { id: 'sh034', en: 'payment', zh: '付款', phonetic: '/ˈpeɪ.mənt/', example: 'Payment can be made online or in store.', category: 'shopping' },
  { id: 'sh035', en: 'transaction', zh: '交易', phonetic: '/trænˈzæk.ʃən/', example: 'The transaction was processed successfully.', category: 'shopping' },
  { id: 'sh036', en: 'wallet', zh: '钱包', phonetic: '/ˈwɒl.ɪt/', example: 'He took out his wallet to pay for the meal.', category: 'shopping' },
  { id: 'sh037', en: 'purse', zh: '女士钱包', phonetic: '/pɜːrs/', example: 'She searched through her purse for some change.', category: 'shopping' },
  { id: 'sh038', en: 'coin', zh: '硬币', phonetic: '/kɔɪn/', example: 'I need some coins for the parking meter.', category: 'shopping' },
  { id: 'sh039', en: 'bill', zh: '账单/钞票', phonetic: '/bɪl/', example: 'Could we have the bill, please?', category: 'shopping' },
  { id: 'sh040', en: 'change', zh: '零钱', phonetic: '/tʃeɪndʒ/', example: 'Here is your change from the twenty-dollar bill.', category: 'shopping' },
  { id: 'sh041', en: 'contactless', zh: '非接触支付', phonetic: '/ˈkɒn.tækt.ləs/', example: 'I paid with a contactless tap of my phone.', category: 'shopping' },
  { id: 'sh042', en: 'gift card', zh: '礼品卡', phonetic: '/ɡɪft kɑːrd/', example: 'I received a gift card for my birthday.', category: 'shopping' },
  { id: 'sh043', en: 'voucher', zh: '代金券', phonetic: '/ˈvaʊ.tʃər/', example: 'Use this voucher to get ten dollars off your next purchase.', category: 'shopping' },
  { id: 'sh044', en: 'installment', zh: '分期付款', phonetic: '/ɪnˈstɔːl.mənt/', example: 'We bought the sofa in twelve monthly installments.', category: 'shopping' },
  { id: 'sh045', en: 'deposit', zh: '定金', phonetic: '/dɪˈpɒz.ɪt/', example: 'We paid a deposit to reserve the wedding dress.', category: 'shopping' },
  { id: 'sh046', en: 'price tag', zh: '价格标签', phonetic: '/praɪs tæɡ/', example: 'Check the price tag before you take it to the register.', category: 'shopping' },
  { id: 'sh047', en: 'loyalty card', zh: '会员卡', phonetic: '/ˈlɔɪ.əl.ti kɑːrd/', example: 'Scan your loyalty card to earn points on every purchase.', category: 'shopping' },
  { id: 'sh048', en: 'coupon', zh: '优惠券', phonetic: '/ˈkuː.pɒn/', example: 'I clipped a coupon from the newspaper for laundry detergent.', category: 'shopping' },
  { id: 'sh049', en: 'digital wallet', zh: '数字钱包', phonetic: '/ˈdɪdʒ.ɪ.təl ˈwɒl.ɪt/', example: 'She uses a digital wallet app for all her payments.', category: 'shopping' },
  { id: 'sh050', en: 'ATM', zh: '自动取款机', phonetic: '/ˌeɪ.tiːˈem/', example: 'I need to stop at the ATM to withdraw some cash.', category: 'shopping' },

  // ========== Clothing & Accessories ==========
  { id: 'sh051', en: 'shirt', zh: '衬衫', phonetic: '/ʃɜːrt/', example: 'He wore a crisp white shirt to the interview.', category: 'shopping' },
  { id: 'sh052', en: 'dress', zh: '连衣裙', phonetic: '/dres/', example: 'She bought a beautiful evening dress for the party.', category: 'shopping' },
  { id: 'sh053', en: 'jeans', zh: '牛仔裤', phonetic: '/dʒiːnz/', example: 'These jeans fit perfectly and are very comfortable.', category: 'shopping' },
  { id: 'sh054', en: 'jacket', zh: '夹克', phonetic: '/ˈdʒæk.ɪt/', example: 'You\'ll need a warm jacket for the winter months.', category: 'shopping' },
  { id: 'sh055', en: 'coat', zh: '外套', phonetic: '/koʊt/', example: 'This wool coat is on sale for half price.', category: 'shopping' },
  { id: 'sh056', en: 'sweater', zh: '毛衣', phonetic: '/ˈswet.ər/', example: 'She knitted a cozy sweater for her grandson.', category: 'shopping' },
  { id: 'sh057', en: 'hoodie', zh: '连帽衫', phonetic: '/ˈhʊd.i/', example: 'He threw on a hoodie and went to the gym.', category: 'shopping' },
  { id: 'sh058', en: 't-shirt', zh: 'T恤', phonetic: '/ˈtiː.ʃɜːrt/', example: 'I bought a souvenir t-shirt at the concert.', category: 'shopping' },
  { id: 'sh059', en: 'shorts', zh: '短裤', phonetic: '/ʃɔːrts/', example: 'It is so hot today, I\'m wearing shorts.', category: 'shopping' },
  { id: 'sh060', en: 'skirt', zh: '裙子', phonetic: '/skɜːrt/', example: 'The pleated skirt is back in fashion this season.', category: 'shopping' },
  { id: 'sh061', en: 'trousers', zh: '裤子', phonetic: '/ˈtraʊ.zərz/', example: 'He bought a pair of smart trousers for the office.', category: 'shopping' },
  { id: 'sh062', en: 'suit', zh: '西装', phonetic: '/suːt/', example: 'The tailor made him a custom suit for the wedding.', category: 'shopping' },
  { id: 'sh063', en: 'blazer', zh: '西装外套', phonetic: '/ˈbleɪ.zər/', example: 'A navy blazer goes well with almost anything.', category: 'shopping' },
  { id: 'sh064', en: 'underwear', zh: '内衣', phonetic: '/ˈʌn.dər.wer/', example: 'The department store has a large underwear section.', category: 'shopping' },
  { id: 'sh065', en: 'socks', zh: '袜子', phonetic: '/sɒks/', example: 'I need to buy some new socks for work.', category: 'shopping' },
  { id: 'sh066', en: 'shoes', zh: '鞋子', phonetic: '/ʃuːz/', example: 'She tried on several pairs of shoes before choosing one.', category: 'shopping' },
  { id: 'sh067', en: 'sneakers', zh: '运动鞋', phonetic: '/ˈsniː.kərz/', example: 'These sneakers are perfect for running and casual wear.', category: 'shopping' },
  { id: 'sh068', en: 'boots', zh: '靴子', phonetic: '/buːts/', example: 'She wore leather boots to protect her feet from the snow.', category: 'shopping' },
  { id: 'sh069', en: 'sandals', zh: '凉鞋', phonetic: '/ˈsæn.dəlz/', example: 'I bought a pair of comfortable sandals for the beach.', category: 'shopping' },
  { id: 'sh070', en: 'heels', zh: '高跟鞋', phonetic: '/hiːlz/', example: 'She wore high heels that matched her evening gown.', category: 'shopping' },
  { id: 'sh071', en: 'hat', zh: '帽子', phonetic: '/hæt/', example: 'He tipped his hat as he walked through the door.', category: 'shopping' },
  { id: 'sh072', en: 'scarf', zh: '围巾', phonetic: '/skɑːrf/', example: 'She wrapped a silk scarf around her neck.', category: 'shopping' },
  { id: 'sh073', en: 'gloves', zh: '手套', phonetic: '/ɡlʌvz/', example: 'You should wear gloves when it gets this cold.', category: 'shopping' },
  { id: 'sh074', en: 'belt', zh: '腰带', phonetic: '/belt/', example: 'He tightened his belt after losing weight.', category: 'shopping' },
  { id: 'sh075', en: 'tie', zh: '领带', phonetic: '/taɪ/', example: 'He wore a striped tie to the business meeting.', category: 'shopping' },
  { id: 'sh076', en: 'handbag', zh: '手提包', phonetic: '/ˈhænd.bæɡ/', example: 'She carried a designer handbag to the event.', category: 'shopping' },
  { id: 'sh077', en: 'backpack', zh: '背包', phonetic: '/ˈbæk.pæk/', example: 'This backpack is big enough for schoolbooks and a laptop.', category: 'shopping' },
  { id: 'sh078', en: 'sunglasses', zh: '太阳镜', phonetic: '/ˈsʌn.ɡlæs.ɪz/', example: 'He put on his sunglasses as the sun came out.', category: 'shopping' },
  { id: 'sh079', en: 'watch', zh: '手表', phonetic: '/wɒtʃ/', example: 'He glanced at his watch to check the time.', category: 'shopping' },
  { id: 'sh080', en: 'jewelry', zh: '珠宝', phonetic: '/ˈdʒuː.əl.ri/', example: 'The jewelry store had a stunning diamond necklace on display.', category: 'shopping' },
  { id: 'sh081', en: 'necklace', zh: '项链', phonetic: '/ˈnek.ləs/', example: 'She received a gold necklace as an anniversary gift.', category: 'shopping' },
  { id: 'sh082', en: 'bracelet', zh: '手镯', phonetic: '/ˈbreɪ.slət/', example: 'The silver bracelet had her name engraved on it.', category: 'shopping' },
  { id: 'sh083', en: 'earrings', zh: '耳环', phonetic: '/ˈɪr.ɪŋz/', example: 'These pearl earrings go perfectly with your dress.', category: 'shopping' },
  { id: 'sh084', en: 'ring', zh: '戒指', phonetic: '/rɪŋ/', example: 'He got down on one knee and presented the engagement ring.', category: 'shopping' },
  { id: 'sh085', en: 'pajamas', zh: '睡衣', phonetic: '/pəˈdʒɑː.məz/', example: 'I changed into my pajamas and got ready for bed.', category: 'shopping' },
  { id: 'sh086', en: 'swimsuit', zh: '泳衣', phonetic: '/ˈswɪm.suːt/', example: 'She bought a new swimsuit for her beach vacation.', category: 'shopping' },
  { id: 'sh087', en: 'uniform', zh: '制服', phonetic: '/ˈjuː.nɪ.fɔːrm/', example: 'The school requires all students to wear a uniform.', category: 'shopping' },
  { id: 'sh088', en: 'fabric', zh: '布料', phonetic: '/ˈfæb.rɪk/', example: 'This shirt is made from a soft cotton fabric.', category: 'shopping' },
  { id: 'sh089', en: 'cotton', zh: '棉', phonetic: '/ˈkɒt.ən/', example: 'Cotton clothing is breathable and perfect for summer.', category: 'shopping' },
  { id: 'sh090', en: 'silk', zh: '丝绸', phonetic: '/sɪlk/', example: 'The silk scarf felt smooth against her skin.', category: 'shopping' },
  { id: 'sh091', en: 'wool', zh: '羊毛', phonetic: '/wʊl/', example: 'This wool sweater will keep you warm all winter.', category: 'shopping' },
  { id: 'sh092', en: 'leather', zh: '皮革', phonetic: '/ˈleð.ər/', example: 'The leather jacket got softer with every wear.', category: 'shopping' },
  { id: 'sh093', en: 'denim', zh: '牛仔布', phonetic: '/ˈden.ɪm/', example: 'Denim is a durable fabric commonly used for jeans.', category: 'shopping' },
  { id: 'sh094', en: 'linen', zh: '亚麻', phonetic: '/ˈlɪn.ɪn/', example: 'Linen shirts are great for hot summer days.', category: 'shopping' },
  { id: 'sh095', en: 'polyester', zh: '涤纶', phonetic: '/ˈpɒl.iˌes.tər/', example: 'This jacket is made of polyester and is water-resistant.', category: 'shopping' },

  // ========== Electronics & Household Goods ==========
  { id: 'sh096', en: 'appliance', zh: '家用电器', phonetic: '/əˈplaɪ.əns/', example: 'The kitchen appliance store had a sale on blenders.', category: 'shopping' },
  { id: 'sh097', en: 'furniture', zh: '家具', phonetic: '/ˈfɜːr.nɪ.tʃər/', example: 'We ordered new furniture for the living room.', category: 'shopping' },
  { id: 'sh098', en: 'mattress', zh: '床垫', phonetic: '/ˈmæt.rəs/', example: 'They invested in a high-quality mattress for better sleep.', category: 'shopping' },
  { id: 'sh099', en: 'laptop', zh: '笔记本电脑', phonetic: '/ˈlæp.tɒp/', example: 'I bought a new laptop for my online classes.', category: 'shopping' },
  { id: 'sh100', en: 'smartphone', zh: '智能手机', phonetic: '/ˈsmɑːrt.foʊn/', example: 'The latest smartphone model has an amazing camera.', category: 'shopping' },
  { id: 'sh101', en: 'headphones', zh: '耳机', phonetic: '/ˈhed.foʊnz/', example: 'Noise-canceling headphones are great for studying.', category: 'shopping' },
  { id: 'sh102', en: 'charger', zh: '充电器', phonetic: '/ˈtʃɑːr.dʒər/', example: 'I forgot my phone charger at home.', category: 'shopping' },
  { id: 'sh103', en: 'tablet', zh: '平板电脑', phonetic: '/ˈtæb.lət/', example: 'She uses her tablet to read e-books and watch movies.', category: 'shopping' },
  { id: 'sh104', en: 'television', zh: '电视机', phonetic: '/ˈtel.ɪ.vɪʒ.ən/', example: 'They bought a large-screen television for the living room.', category: 'shopping' },
  { id: 'sh105', en: 'camera', zh: '相机', phonetic: '/ˈkæm.rə/', example: 'A good camera is essential for a photography enthusiast.', category: 'shopping' },
  { id: 'sh106', en: 'speaker', zh: '音箱', phonetic: '/ˈspiː.kər/', example: 'The bluetooth speaker filled the room with music.', category: 'shopping' },
  { id: 'sh107', en: 'battery', zh: '电池', phonetic: '/ˈbæt.ər.i/', example: 'The remote control needs two AA batteries.', category: 'shopping' },
  { id: 'sh108', en: 'gadget', zh: '小玩意', phonetic: '/ˈɡædʒ.ɪt/', example: 'This kitchen gadget can peel and slice apples in seconds.', category: 'shopping' },
  { id: 'sh109', en: 'cookware', zh: '炊具', phonetic: '/ˈkʊk.wer/', example: 'They registered for new cookware as a wedding gift.', category: 'shopping' },
  { id: 'sh110', en: 'cosmetics', zh: '化妆品', phonetic: '/kɒzˈmet.ɪks/', example: 'She bought some cosmetics at the beauty counter.', category: 'shopping' },
  { id: 'sh111', en: 'skincare', zh: '护肤品', phonetic: '/ˈskɪn.ker/', example: 'The skincare aisle has creams, serums, and sunscreens.', category: 'shopping' },
  { id: 'sh112', en: 'perfume', zh: '香水', phonetic: '/ˈpɜːr.fjuːm/', example: 'She tried several perfumes before choosing a floral scent.', category: 'shopping' },
  { id: 'sh113', en: 'makeup', zh: '化妆品', phonetic: '/ˈmeɪk.ʌp/', example: 'She applied her makeup carefully before the party.', category: 'shopping' },
  { id: 'sh114', en: 'lipstick', zh: '口红', phonetic: '/ˈlɪp.stɪk/', example: 'This shade of lipstick matches her outfit perfectly.', category: 'shopping' },
  { id: 'sh115', en: 'soap', zh: '肥皂', phonetic: '/soʊp/', example: 'I need to buy some hand soap for the bathroom.', category: 'shopping' },
  { id: 'sh116', en: 'shampoo', zh: '洗发水', phonetic: '/ʃæmˈpuː/', example: 'This shampoo is designed for dry and damaged hair.', category: 'shopping' },
  { id: 'sh117', en: 'towel', zh: '毛巾', phonetic: '/ˈtaʊ.əl/', example: 'We bought a set of fluffy bath towels.', category: 'shopping' },
  { id: 'sh118', en: 'detergent', zh: '洗涤剂', phonetic: '/dɪˈtɜːr.dʒənt/', example: 'Add some laundry detergent before starting the machine.', category: 'shopping' },

  // ========== Food Shopping & Groceries ==========
  { id: 'sh119', en: 'grocery', zh: '食品杂货', phonetic: '/ˈɡroʊ.sər.i/', example: 'I made a list before heading to the grocery store.', category: 'shopping' },
  { id: 'sh120', en: 'produce', zh: '农产品', phonetic: '/ˈprɒd.juːs/', example: 'The produce section has fresh fruits and vegetables.', category: 'shopping' },
  { id: 'sh121', en: 'bakery', zh: '面包店', phonetic: '/ˈbeɪ.kər.i/', example: 'The smell of fresh bread from the bakery is wonderful.', category: 'shopping' },
  { id: 'sh122', en: 'dairy', zh: '乳制品', phonetic: '/ˈder.i/', example: 'Milk and cheese are in the dairy aisle.', category: 'shopping' },
  { id: 'sh123', en: 'butcher', zh: '肉店', phonetic: '/ˈbʊtʃ.ər/', example: 'The butcher recommended the tenderloin for the roast.', category: 'shopping' },
  { id: 'sh124', en: 'organic', zh: '有机的', phonetic: '/ɔːrˈɡæn.ɪk/', example: 'We prefer to buy organic vegetables when possible.', category: 'shopping' },
  { id: 'sh125', en: 'groceries', zh: '食品杂货', phonetic: '/ˈɡroʊ.sər.iz/', example: 'I carry my groceries home in reusable bags.', category: 'shopping' },
  { id: 'sh126', en: 'beverage', zh: '饮料', phonetic: '/ˈbev.ər.ɪdʒ/', example: 'The beverage aisle has juice, soda, and bottled water.', category: 'shopping' },
  { id: 'sh127', en: 'snack', zh: '零食', phonetic: '/snæk/', example: 'I picked up some healthy snacks for the road trip.', category: 'shopping' },
  { id: 'sh128', en: 'canned goods', zh: '罐头食品', phonetic: '/kænd ɡʊdz/', example: 'We keep canned goods in the pantry for emergencies.', category: 'shopping' },
  { id: 'sh129', en: 'frozen food', zh: '冷冻食品', phonetic: '/ˈfroʊ.zən fuːd/', example: 'The frozen food section has pizzas and ice cream.', category: 'shopping' },
  { id: 'sh130', en: 'deli', zh: '熟食店', phonetic: '/ˈdel.i/', example: 'I ordered sliced turkey from the deli counter.', category: 'shopping' },
  { id: 'sh131', en: 'expiration date', zh: '保质期', phonetic: '/ˌek.spɪˈreɪ.ʃən deɪt/', example: 'Always check the expiration date before buying milk.', category: 'shopping' },
  { id: 'sh132', en: 'shopping cart', zh: '购物车', phonetic: '/ˈʃɒp.ɪŋ kɑːrt/', example: 'She pushed the shopping cart down the aisle.', category: 'shopping' },
  { id: 'sh133', en: 'shopping basket', zh: '购物篮', phonetic: '/ˈʃɒp.ɪŋ ˈbæs.kɪt/', example: 'I only needed a few items so I grabbed a shopping basket.', category: 'shopping' },
  { id: 'sh134', en: 'shopping bag', zh: '购物袋', phonetic: '/ˈʃɒp.ɪŋ bæɡ/', example: 'She pulled a reusable shopping bag from her purse.', category: 'shopping' },

  // ========== Online Shopping & E-Commerce ==========
  { id: 'sh135', en: 'e-commerce', zh: '电子商务', phonetic: '/ˈiː.kɒm.ɜːrs/', example: 'E-commerce has changed the way people shop forever.', category: 'shopping' },
  { id: 'sh136', en: 'website', zh: '网站', phonetic: '/ˈweb.saɪt/', example: 'I found the best deals on the company\'s official website.', category: 'shopping' },
  { id: 'sh137', en: 'add to cart', zh: '加入购物车', phonetic: '/æd tuː kɑːrt/', example: 'Click the button to add the item to your cart.', category: 'shopping' },
  { id: 'sh138', en: 'wishlist', zh: '心愿单', phonetic: '/ˈwɪʃ.lɪst/', example: 'I saved those shoes to my wishlist for later.', category: 'shopping' },
  { id: 'sh139', en: 'shipping', zh: '运费', phonetic: '/ˈʃɪp.ɪŋ/', example: 'Shipping is free on orders over fifty dollars.', category: 'shopping' },
  { id: 'sh140', en: 'delivery', zh: '送货', phonetic: '/dɪˈlɪv.ər.i/', example: 'Delivery usually takes three to five business days.', category: 'shopping' },
  { id: 'sh141', en: 'tracking number', zh: '追踪号码', phonetic: '/ˈtræk.ɪŋ ˈnʌm.bər/', example: 'Use the tracking number to see where your package is.', category: 'shopping' },
  { id: 'sh142', en: 'out of stock', zh: '缺货', phonetic: '/aʊt ʌv stɒk/', example: 'The popular toy was out of stock before Christmas.', category: 'shopping' },
  { id: 'sh143', en: 'in stock', zh: '有货', phonetic: '/ɪn stɒk/', example: 'The laptop you want is finally back in stock.', category: 'shopping' },
  { id: 'sh144', en: 'pre-order', zh: '预订', phonetic: '/priː ˈɔːr.dər/', example: 'You can pre-order the new video game before it is released.', category: 'shopping' },
  { id: 'sh145', en: 'review', zh: '评价', phonetic: '/rɪˈvjuː/', example: 'I always read the reviews before buying anything online.', category: 'shopping' },
  { id: 'sh146', en: 'rating', zh: '评分', phonetic: '/ˈreɪ.tɪŋ/', example: 'This product has a five-star rating from over a thousand buyers.', category: 'shopping' },
  { id: 'sh147', en: 'return policy', zh: '退货政策', phonetic: '/rɪˈtɜːrn ˈpɒl.ə.si/', example: 'Check the return policy before you finalize your purchase.', category: 'shopping' },
  { id: 'sh148', en: 'checkout', zh: '结账', phonetic: '/ˈtʃek.aʊt/', example: 'Proceed to checkout when you are ready to pay.', category: 'shopping' },
  { id: 'sh149', en: 'promo code', zh: '促销码', phonetic: '/ˈproʊ.moʊ koʊd/', example: 'Enter the promo code at checkout to get 15% off.', category: 'shopping' },
  { id: 'sh150', en: 'newsletter', zh: '电子报', phonetic: '/ˈnjuːzˌlet.ər/', example: 'Sign up for the newsletter to receive exclusive deals.', category: 'shopping' },
  { id: 'sh151', en: 'account', zh: '账户', phonetic: '/əˈkaʊnt/', example: 'Log into your account to view your order history.', category: 'shopping' },
  { id: 'sh152', en: 'password', zh: '密码', phonetic: '/ˈpæs.wɜːrd/', example: 'Create a strong password to protect your shopping account.', category: 'shopping' },
  { id: 'sh153', en: 'subscribe', zh: '订阅', phonetic: '/səbˈskraɪb/', example: 'Subscribe to get ten percent off your first order.', category: 'shopping' },
  { id: 'sh154', en: 'flash sale', zh: '限时抢购', phonetic: '/flæʃ seɪl/', example: 'I got this jacket during a flash sale at midnight.', category: 'shopping' },
  { id: 'sh155', en: 'buy now', zh: '立即购买', phonetic: '/baɪ naʊ/', example: 'Click "buy now" to purchase the item instantly.', category: 'shopping' },
  { id: 'sh156', en: 'marketplace', zh: '在线市场', phonetic: '/ˈmɑːr.kɪt.pleɪs/', example: 'This online marketplace connects buyers and sellers worldwide.', category: 'shopping' },
  { id: 'sh157', en: 'dropshipping', zh: '代发货', phonetic: '/ˈdrɒp.ʃɪp.ɪŋ/', example: 'Many online stores use dropshipping to avoid holding inventory.', category: 'shopping' },

  // ========== Prices, Discounts & Bargaining ==========
  { id: 'sh158', en: 'price', zh: '价格', phonetic: '/praɪs/', example: 'The price of this sofa is beyond my budget.', category: 'shopping' },
  { id: 'sh159', en: 'discount', zh: '折扣', phonetic: '/ˈdɪs.kaʊnt/', example: 'This store offers a 20% discount on all winter coats.', category: 'shopping' },
  { id: 'sh160', en: 'sale', zh: '促销', phonetic: '/seɪl/', example: 'Everything in the store is on sale this weekend.', category: 'shopping' },
  { id: 'sh161', en: 'bargain', zh: '便宜货', phonetic: '/ˈbɑːr.ɡɪn/', example: 'This leather bag was a real bargain at half the original price.', category: 'shopping' },
  { id: 'sh162', en: 'clearance', zh: '清仓', phonetic: '/ˈklɪr.əns/', example: 'The clearance rack had items marked down by seventy percent.', category: 'shopping' },
  { id: 'sh163', en: 'half-price', zh: '半价', phonetic: '/hæf praɪs/', example: 'All summer items are half-price this week.', category: 'shopping' },
  { id: 'sh164', en: 'markdown', zh: '降价', phonetic: '/ˈmɑːrk.daʊn/', example: 'The store applied a markdown to last season\'s inventory.', category: 'shopping' },
  { id: 'sh165', en: 'overpriced', zh: '定价过高的', phonetic: '/ˌoʊ.vərˈpraɪst/', example: 'The coffee at that cafe is good but seriously overpriced.', category: 'shopping' },
  { id: 'sh166', en: 'affordable', zh: '负担得起的', phonetic: '/əˈfɔːr.də.bəl/', example: 'This brand makes stylish clothing at affordable prices.', category: 'shopping' },
  { id: 'sh167', en: 'expensive', zh: '昂贵的', phonetic: '/ɪkˈspen.sɪv/', example: 'The diamond necklace was far too expensive for my budget.', category: 'shopping' },
  { id: 'sh168', en: 'cheap', zh: '便宜的', phonetic: '/tʃiːp/', example: 'These sunglasses look nice but feel really cheap.', category: 'shopping' },
  { id: 'sh169', en: 'budget', zh: '预算', phonetic: '/ˈbʌdʒ.ɪt/', example: 'We need to stick to our budget when shopping for furniture.', category: 'shopping' },
  { id: 'sh170', en: 'bargain hunting', zh: '淘便宜货', phonetic: '/ˈbɑːr.ɡɪn ˈhʌn.tɪŋ/', example: 'She loves bargain hunting at weekend flea markets.', category: 'shopping' },
  { id: 'sh171', en: 'haggle', zh: '讨价还价', phonetic: '/ˈhæɡ.əl/', example: 'In some markets, it is customary to haggle over the price.', category: 'shopping' },
  { id: 'sh172', en: 'negotiate', zh: '协商', phonetic: '/nɪˈɡoʊ.ʃi.eɪt/', example: 'You can sometimes negotiate a better price when buying a car.', category: 'shopping' },
  { id: 'sh173', en: 'wholesale price', zh: '批发价', phonetic: '/ˈhoʊl.seɪl praɪs/', example: 'Buying in bulk gets you the wholesale price.', category: 'shopping' },
  { id: 'sh174', en: 'retail price', zh: '零售价', phonetic: '/ˈriː.teɪl praɪs/', example: 'The retail price is significantly higher than the wholesale one.', category: 'shopping' },
  { id: 'sh175', en: 'MSRP', zh: '建议零售价', phonetic: '/ˌem.es.ɑːrˈpiː/', example: 'The MSRP is just a suggestion and stores often sell below it.', category: 'shopping' },
  { id: 'sh176', en: 'best offer', zh: '最佳报价', phonetic: '/best ˈɒf.ər/', example: 'The seller is accepting the best offer on this antique piece.', category: 'shopping' },
  { id: 'sh177', en: 'price match', zh: '比价保证', phonetic: '/praɪs mætʃ/', example: 'This store will price match any competitor\'s advertised price.', category: 'shopping' },
  { id: 'sh178', en: 'two-for-one', zh: '买一送一', phonetic: '/tuː fɔːr wʌn/', example: 'The shampoo is on a two-for-one special this week.', category: 'shopping' },
  { id: 'sh179', en: 'impulse buy', zh: '冲动购买', phonetic: '/ˈɪm.pʌls baɪ/', example: 'That candy bar at the checkout was an impulse buy.', category: 'shopping' },
  { id: 'sh180', en: 'hidden cost', zh: '隐藏费用', phonetic: '/ˈhɪd.ən kɒst/', example: 'Always read the fine print to check for hidden costs.', category: 'shopping' },
  { id: 'sh181', en: 'tax', zh: '税', phonetic: '/tæks/', example: 'Sales tax is added to your total at checkout.', category: 'shopping' },
  { id: 'sh182', en: 'surcharge', zh: '附加费', phonetic: '/ˈsɜːr.tʃɑːrdʒ/', example: 'There is a small surcharge for using a credit card.', category: 'shopping' },

  // ========== Brands & Marketing ==========
  { id: 'sh183', en: 'brand', zh: '品牌', phonetic: '/brænd/', example: 'What brand of sneakers do you prefer?', category: 'shopping' },
  { id: 'sh184', en: 'logo', zh: '标志', phonetic: '/ˈloʊ.ɡoʊ/', example: 'The company\'s logo is recognizable all over the world.', category: 'shopping' },
  { id: 'sh185', en: 'advertisement', zh: '广告', phonetic: '/ˌæd.vərˈtaɪz.mənt/', example: 'I saw an advertisement for a big sale at the mall.', category: 'shopping' },
  { id: 'sh186', en: 'commercial', zh: '电视广告', phonetic: '/kəˈmɜːr.ʃəl/', example: 'The Super Bowl commercials are famous for being creative.', category: 'shopping' },
  { id: 'sh187', en: 'endorsement', zh: '代言', phonetic: '/ɪnˈdɔːrs.mənt/', example: 'The athlete signed a million-dollar endorsement deal.', category: 'shopping' },
  { id: 'sh188', en: 'sponsor', zh: '赞助商', phonetic: '/ˈspɒn.sər/', example: 'The event is sponsored by a major sportswear brand.', category: 'shopping' },
  { id: 'sh189', en: 'slogan', zh: '标语', phonetic: '/ˈsloʊ.ɡən/', example: 'Their new slogan really captures the brand spirit.', category: 'shopping' },
  { id: 'sh190', en: 'packaging', zh: '包装', phonetic: '/ˈpæk.ɪ.dʒɪŋ/', example: 'The gift came in beautiful packaging with a ribbon.', category: 'shopping' },
  { id: 'sh191', en: 'label', zh: '标签', phonetic: '/ˈleɪ.bəl/', example: 'Always read the label for washing instructions.', category: 'shopping' },
  { id: 'sh192', en: 'trademark', zh: '商标', phonetic: '/ˈtreɪd.mɑːrk/', example: 'The company registered its trademark to protect the brand name.', category: 'shopping' },
  { id: 'sh193', en: 'customer', zh: '顾客', phonetic: '/ˈkʌs.tə.mər/', example: 'The customer is always our top priority.', category: 'shopping' },
  { id: 'sh194', en: 'consumer', zh: '消费者', phonetic: '/kənˈsjuː.mər/', example: 'Consumer spending increases during the holiday season.', category: 'shopping' },
  { id: 'sh195', en: 'target audience', zh: '目标受众', phonetic: '/ˈtɑːr.ɡɪt ˈɔː.di.əns/', example: 'The ad campaign was designed for a young target audience.', category: 'shopping' },
  { id: 'sh196', en: 'word of mouth', zh: '口碑', phonetic: '/wɜːrd ʌv maʊθ/', example: 'Most of our business comes through word of mouth.', category: 'shopping' },
  { id: 'sh197', en: 'promotion', zh: '促销活动', phonetic: '/prəˈmoʊ.ʃən/', example: 'The store is running a back-to-school promotion.', category: 'shopping' },

  // ========== Shopping Actions & Verbs ==========
  { id: 'sh198', en: 'purchase', zh: '购买', phonetic: '/ˈpɜːr.tʃəs/', example: 'I would like to purchase two tickets for the show.', category: 'shopping' },
  { id: 'sh199', en: 'browse', zh: '浏览', phonetic: '/braʊz/', example: 'I like to browse the bookstore without any particular plan.', category: 'shopping' },
  { id: 'sh200', en: 'compare', zh: '比较', phonetic: '/kəmˈper/', example: 'Compare prices online before you make a big purchase.', category: 'shopping' },
  { id: 'sh201', en: 'order', zh: '订购', phonetic: '/ˈɔːr.dər/', example: 'You can order food delivery through the app.', category: 'shopping' },
  { id: 'sh202', en: 'reserve', zh: '预留', phonetic: '/rɪˈzɜːrv/', example: 'I called the store to reserve the last pair in my size.', category: 'shopping' },
  { id: 'sh203', en: 'splurge', zh: '挥霍', phonetic: '/splɜːrdʒ/', example: 'I decided to splurge on a nice dinner for our anniversary.', category: 'shopping' },
  { id: 'sh204', en: 'stock up', zh: '囤货', phonetic: '/stɒk ʌp/', example: 'We stocked up on canned goods before the storm.', category: 'shopping' },
  { id: 'sh205', en: 'return', zh: '退货', phonetic: '/rɪˈtɜːrn/', example: 'I need to return this shirt because it does not fit.', category: 'shopping' },
  { id: 'sh206', en: 'replace', zh: '更换', phonetic: '/rɪˈpleɪs/', example: 'The company agreed to replace the broken watch.', category: 'shopping' },
  { id: 'sh207', en: 'wrap', zh: '包装', phonetic: '/ræp/', example: 'Could you please wrap this as a gift?', category: 'shopping' },
  { id: 'sh208', en: 'redeem', zh: '兑换', phonetic: '/rɪˈdiːm/', example: 'You can redeem your points for a free coffee.', category: 'shopping' },
  { id: 'sh209', en: 'cancel', zh: '取消', phonetic: '/ˈkæn.səl/', example: 'I had to cancel my order because I changed my mind.', category: 'shopping' },
  { id: 'sh210', en: 'try on', zh: '试穿', phonetic: '/traɪ ɒn/', example: 'You should try on the shoes before you buy them.', category: 'shopping' },
  { id: 'sh211', en: 'fit', zh: '合身', phonetic: '/fɪt/', example: 'This jacket fits you perfectly.', category: 'shopping' },
  { id: 'sh212', en: 'size up', zh: '评估', phonetic: '/saɪz ʌp/', example: 'She sized up the competition before setting her prices.', category: 'shopping' },
  { id: 'sh213', en: 'save up', zh: '存钱', phonetic: '/seɪv ʌp/', example: 'I am saving up to buy a new laptop next month.', category: 'shopping' },
  { id: 'sh214', en: 'sell out', zh: '售罄', phonetic: '/sel aʊt/', example: 'The concert tickets sold out within minutes.', category: 'shopping' },
  { id: 'sh215', en: 'shop around', zh: '货比三家', phonetic: '/ʃɒp əˈraʊnd/', example: 'It pays to shop around before making a major purchase.', category: 'shopping' },
  { id: 'sh216', en: 'pick out', zh: '挑选', phonetic: '/pɪk aʊt/', example: 'She spent an hour picking out the perfect birthday gift.', category: 'shopping' },

  // ========== Shopping Adjectives & Descriptors ==========
  { id: 'sh217', en: 'luxury', zh: '奢华的', phonetic: '/ˈlʌk.ʃər.i/', example: 'This is a luxury watch brand known around the world.', category: 'shopping' },
  { id: 'sh218', en: 'stylish', zh: '时尚的', phonetic: '/ˈstaɪ.lɪʃ/', example: 'Those boots are both stylish and comfortable.', category: 'shopping' },
  { id: 'sh219', en: 'trendy', zh: '时髦的', phonetic: '/ˈtren.di/', example: 'This neighborhood is full of trendy boutiques and cafes.', category: 'shopping' },
  { id: 'sh220', en: 'vintage', zh: '复古的', phonetic: '/ˈvɪn.tɪdʒ/', example: 'She collects vintage handbags from the 1950s.', category: 'shopping' },
  { id: 'sh221', en: 'second-hand', zh: '二手的', phonetic: '/ˈsek.ənd hænd/', example: 'I bought a second-hand textbook to save money.', category: 'shopping' },
  { id: 'sh222', en: 'brand-new', zh: '全新的', phonetic: '/brænd njuː/', example: 'He drove his brand-new car out of the dealership.', category: 'shopping' },
  { id: 'sh223', en: 'custom-made', zh: '定制的', phonetic: '/ˈkʌs.təm meɪd/', example: 'The suit was custom-made by a tailor in Milan.', category: 'shopping' },
  { id: 'sh224', en: 'durable', zh: '耐用的', phonetic: '/ˈdʒʊr.ə.bəl/', example: 'Invest in durable cookware that will last for years.', category: 'shopping' },
  { id: 'sh225', en: 'one-of-a-kind', zh: '独一无二的', phonetic: '/wʌn əv ə kaɪnd/', example: 'This handmade necklace is truly one-of-a-kind.', category: 'shopping' },
  { id: 'sh226', en: 'top-quality', zh: '顶级的', phonetic: '/tɒp ˈkwɒl.ə.ti/', example: 'They use only top-quality materials in their products.', category: 'shopping' },
  { id: 'sh227', en: 'defective', zh: '有缺陷的', phonetic: '/dɪˈfek.tɪv/', example: 'The toaster was defective so I returned it immediately.', category: 'shopping' },
  { id: 'sh228', en: 'eco-friendly', zh: '环保的', phonetic: '/ˈiː.koʊ ˈfrend.li/', example: 'More shoppers are choosing eco-friendly products these days.', category: 'shopping' },
  { id: 'sh229', en: 'limited edition', zh: '限量版', phonetic: '/ˈlɪm.ɪ.tɪd ɪˈdɪʃ.ən/', example: 'This is a limited edition sneaker that sold out in hours.', category: 'shopping' },

  // ========== Customer Service & Shopping Experience ==========
  { id: 'sh230', en: 'warranty', zh: '保修', phonetic: '/ˈwɒr.ən.ti/', example: 'The laptop comes with a two-year warranty.', category: 'shopping' },
  { id: 'sh231', en: 'guarantee', zh: '保证', phonetic: '/ˌɡær.ənˈtiː/', example: 'There is a money-back guarantee if you are not satisfied.', category: 'shopping' },
  { id: 'sh232', en: 'customer service', zh: '客户服务', phonetic: '/ˈkʌs.tə.mər ˈsɜːr.vɪs/', example: 'Call customer service if you have any issues with your order.', category: 'shopping' },
  { id: 'sh233', en: 'complaint', zh: '投诉', phonetic: '/kəmˈpleɪnt/', example: 'I filed a complaint about the damaged item.', category: 'shopping' },
  { id: 'sh234', en: 'feedback', zh: '反馈', phonetic: '/ˈfiːd.bæk/', example: 'The company values customer feedback and uses it to improve.', category: 'shopping' },
  { id: 'sh235', en: 'loyalty program', zh: '会员计划', phonetic: '/ˈlɔɪ.əl.ti ˈproʊ.ɡræm/', example: 'Join our loyalty program to earn points on every purchase.', category: 'shopping' },
  { id: 'sh236', en: 'membership', zh: '会员', phonetic: '/ˈmem.bər.ʃɪp/', example: 'An annual membership gives you free shipping all year.', category: 'shopping' },
  { id: 'sh237', en: 'queue', zh: '排队', phonetic: '/kjuː/', example: 'The queue at the register stretched all the way to the door.', category: 'shopping' },
  { id: 'sh238', en: 'opening hours', zh: '营业时间', phonetic: '/ˈoʊ.pən.ɪŋ aʊərz/', example: 'Check the store\'s opening hours before you go.', category: 'shopping' },
  { id: 'sh239', en: 'shop assistant', zh: '店员', phonetic: '/ʃɒp əˈsɪs.tənt/', example: 'The shop assistant helped me find the right size.', category: 'shopping' },
  { id: 'sh240', en: 'cashier', zh: '收银员', phonetic: '/kæˈʃɪr/', example: 'The cashier scanned all my items quickly.', category: 'shopping' },
  { id: 'sh241', en: 'escalator', zh: '自动扶梯', phonetic: '/ˈes.kə.leɪ.tər/', example: 'Take the escalator to the second floor for menswear.', category: 'shopping' },
  { id: 'sh242', en: 'fitting room', zh: '试衣间', phonetic: '/ˈfɪt.ɪŋ ruːm/', example: 'She tried on five dresses in the fitting room.', category: 'shopping' },
  { id: 'sh243', en: 'display', zh: '陈列', phonetic: '/dɪˈspleɪ/', example: 'The window display caught my eye as I walked past.', category: 'shopping' },
  { id: 'sh244', en: 'mannequin', zh: '人体模型', phonetic: '/ˈmæn.ɪ.kɪn/', example: 'The dress on the mannequin looks amazing.', category: 'shopping' },
  { id: 'sh245', en: 'shelf', zh: '货架', phonetic: '/ʃelf/', example: 'The top shelf is out of reach without a ladder.', category: 'shopping' },
  { id: 'sh246', en: 'stockroom', zh: '仓库', phonetic: '/ˈstɒk.ruːm/', example: 'The employee went to the stockroom to find more sizes.', category: 'shopping' },
  { id: 'sh247', en: 'inventory', zh: '库存', phonetic: '/ˈɪn.vən.tɔːr.i/', example: 'The store does a full inventory check every month.', category: 'shopping' },
  { id: 'sh248', en: 'import', zh: '进口', phonetic: '/ɪmˈpɔːrt/', example: 'This cheese is an import from France.', category: 'shopping' },
  { id: 'sh249', en: 'export', zh: '出口', phonetic: '/ɪkˈspɔːrt/', example: 'The country exports textiles to markets around the world.', category: 'shopping' },
  { id: 'sh250', en: 'trade', zh: '贸易', phonetic: '/treɪd/', example: 'International trade brings goods from every corner of the globe.', category: 'shopping' },
];

// -- js/data/words_sports.js --
const WORDS_SPORTS = [
  // ========== Ball Sports ==========
  { id: 'sp001', en: 'football', zh: '足球', phonetic: '/ˈfʊt.bɔːl/', example: 'He plays football every Saturday with his friends.', category: 'sports' },
  { id: 'sp002', en: 'soccer', zh: '足球(美式)', phonetic: '/ˈsɒk.ər/', example: 'Soccer is the most popular sport in the world.', category: 'sports' },
  { id: 'sp003', en: 'basketball', zh: '篮球', phonetic: '/ˈbæs.kɪt.bɔːl/', example: 'She has been playing basketball since middle school.', category: 'sports' },
  { id: 'sp004', en: 'baseball', zh: '棒球', phonetic: '/ˈbeɪs.bɔːl/', example: 'He hit a home run in the baseball game.', category: 'sports' },
  { id: 'sp005', en: 'tennis', zh: '网球', phonetic: '/ˈten.ɪs/', example: 'We booked a tennis court for Sunday afternoon.', category: 'sports' },
  { id: 'sp006', en: 'volleyball', zh: '排球', phonetic: '/ˈvɒl.i.bɔːl/', example: 'Beach volleyball is a popular summer activity.', category: 'sports' },
  { id: 'sp007', en: 'table tennis', zh: '乒乓球', phonetic: '/ˈteɪ.bəl ˈten.ɪs/', example: 'Table tennis requires quick reflexes and good hand-eye coordination.', category: 'sports' },
  { id: 'sp008', en: 'badminton', zh: '羽毛球', phonetic: '/ˈbæd.mɪn.tən/', example: 'We set up a badminton net in the backyard.', category: 'sports' },
  { id: 'sp009', en: 'rugby', zh: '橄榄球', phonetic: '/ˈrʌɡ.bi/', example: 'Rugby is a physically demanding contact sport.', category: 'sports' },
  { id: 'sp010', en: 'cricket', zh: '板球', phonetic: '/ˈkrɪk.ɪt/', example: 'Cricket matches can last for several days.', category: 'sports' },
  { id: 'sp011', en: 'golf', zh: '高尔夫', phonetic: '/ɡɒlf/', example: 'He plays golf every weekend at the country club.', category: 'sports' },
  { id: 'sp012', en: 'handball', zh: '手球', phonetic: '/ˈhænd.bɔːl/', example: 'Handball is a fast-paced team sport popular in Europe.', category: 'sports' },
  { id: 'sp013', en: 'bowling', zh: '保龄球', phonetic: '/ˈboʊ.lɪŋ/', example: 'We went bowling for my birthday party.', category: 'sports' },
  { id: 'sp014', en: 'squash', zh: '壁球', phonetic: '/skwɒʃ/', example: 'Playing squash is an excellent cardiovascular workout.', category: 'sports' },
  { id: 'sp015', en: 'softball', zh: '垒球', phonetic: '/ˈsɒft.bɔːl/', example: 'She pitched a perfect game in the softball tournament.', category: 'sports' },
  { id: 'sp016', en: 'lacrosse', zh: '长曲棍球', phonetic: '/ləˈkrɒs/', example: 'Lacrosse is one of the fastest-growing sports in schools.', category: 'sports' },
  { id: 'sp017', en: 'field hockey', zh: '曲棍球', phonetic: '/fiːld ˈhɒk.i/', example: 'Field hockey is played on grass or artificial turf.', category: 'sports' },
  { id: 'sp018', en: 'ice hockey', zh: '冰球', phonetic: '/aɪs ˈhɒk.i/', example: 'Ice hockey players wear a lot of protective gear.', category: 'sports' },
  { id: 'sp019', en: 'water polo', zh: '水球', phonetic: '/ˈwɔː.tər ˈpoʊ.loʊ/', example: 'Water polo requires both swimming skill and teamwork.', category: 'sports' },
  { id: 'sp020', en: 'polo', zh: '马球', phonetic: '/ˈpoʊ.loʊ/', example: 'Polo is often called the sport of kings.', category: 'sports' },
  { id: 'sp021', en: 'pool', zh: '台球', phonetic: '/puːl/', example: 'Let\'s play a game of pool after work.', category: 'sports' },
  { id: 'sp022', en: 'billiards', zh: '台球', phonetic: '/ˈbɪl.jərdz/', example: 'Billiards requires precision and strategic thinking.', category: 'sports' },
  { id: 'sp023', en: 'dodgeball', zh: '躲避球', phonetic: '/ˈdɒdʒ.bɔːl/', example: 'Dodgeball was always my favorite game in gym class.', category: 'sports' },
  { id: 'sp024', en: 'kickball', zh: '踢球', phonetic: '/ˈkɪk.bɔːl/', example: 'The kids played kickball during recess.', category: 'sports' },

  // ========== Water Sports ==========
  { id: 'sp025', en: 'swimming', zh: '游泳', phonetic: '/ˈswɪm.ɪŋ/', example: 'Swimming is a full-body workout that builds endurance.', category: 'sports' },
  { id: 'sp026', en: 'diving', zh: '跳水', phonetic: '/ˈdaɪ.vɪŋ/', example: 'Olympic diving is judged on form and splash size.', category: 'sports' },
  { id: 'sp027', en: 'surfing', zh: '冲浪', phonetic: '/ˈsɜːr.fɪŋ/', example: 'He goes surfing every morning before work.', category: 'sports' },
  { id: 'sp028', en: 'sailing', zh: '帆船', phonetic: '/ˈseɪ.lɪŋ/', example: 'They spent the summer sailing along the coast.', category: 'sports' },
  { id: 'sp029', en: 'rowing', zh: '划船', phonetic: '/ˈroʊ.ɪŋ/', example: 'The rowing team practices on the river at dawn.', category: 'sports' },
  { id: 'sp030', en: 'kayaking', zh: '皮划艇', phonetic: '/ˈkaɪ.æk.ɪŋ/', example: 'Kayaking through the rapids was an unforgettable experience.', category: 'sports' },
  { id: 'sp031', en: 'canoeing', zh: '独木舟', phonetic: '/kəˈnuː.ɪŋ/', example: 'We went canoeing on the calm lake last weekend.', category: 'sports' },
  { id: 'sp032', en: 'snorkeling', zh: '浮潜', phonetic: '/ˈsnɔːr.kəl.ɪŋ/', example: 'The coral reef is perfect for snorkeling.', category: 'sports' },
  { id: 'sp033', en: 'scuba diving', zh: '水肺潜水', phonetic: '/ˈskuː.bə ˈdaɪ.vɪŋ/', example: 'You need a certification to go scuba diving.', category: 'sports' },
  { id: 'sp034', en: 'windsurfing', zh: '风帆冲浪', phonetic: '/ˈwɪnd.sɜːr.fɪŋ/', example: 'Windsurfing combines elements of surfing and sailing.', category: 'sports' },
  { id: 'sp035', en: 'waterskiing', zh: '滑水', phonetic: '/ˈwɔː.tər.skiː.ɪŋ/', example: 'Waterskiing looks easy but requires strong leg muscles.', category: 'sports' },
  { id: 'sp036', en: 'jet skiing', zh: '水上摩托', phonetic: '/dʒet ˈskiː.ɪŋ/', example: 'Jet skiing is a thrilling way to explore the coastline.', category: 'sports' },
  { id: 'sp037', en: 'synchronized swimming', zh: '花样游泳', phonetic: '/ˈsɪŋ.krə.naɪzd ˈswɪm.ɪŋ/', example: 'Synchronized swimming requires grace, strength, and perfect timing.', category: 'sports' },

  // ========== Winter Sports ==========
  { id: 'sp038', en: 'skiing', zh: '滑雪', phonetic: '/ˈskiː.ɪŋ/', example: 'We are planning a skiing trip to the Alps this winter.', category: 'sports' },
  { id: 'sp039', en: 'snowboarding', zh: '单板滑雪', phonetic: '/ˈsnoʊ.bɔːr.dɪŋ/', example: 'Snowboarding became an Olympic sport in 1998.', category: 'sports' },
  { id: 'sp040', en: 'ice skating', zh: '滑冰', phonetic: '/aɪs ˈskeɪ.tɪŋ/', example: 'They went ice skating at the outdoor rink in the park.', category: 'sports' },
  { id: 'sp041', en: 'figure skating', zh: '花样滑冰', phonetic: '/ˈfɪɡ.jər ˈskeɪ.tɪŋ/', example: 'Figure skating combines athletic skill with artistic expression.', category: 'sports' },
  { id: 'sp042', en: 'speed skating', zh: '速度滑冰', phonetic: '/spiːd ˈskeɪ.tɪŋ/', example: 'Speed skating races are decided by fractions of a second.', category: 'sports' },
  { id: 'sp043', en: 'bobsleigh', zh: '有舵雪橇', phonetic: '/ˈbɒb.sleɪ/', example: 'The bobsleigh team reached speeds of over 130 kilometers per hour.', category: 'sports' },
  { id: 'sp044', en: 'luge', zh: '无舵雪橇', phonetic: '/luːʒ/', example: 'Luge athletes lie on their backs and steer with their legs.', category: 'sports' },
  { id: 'sp045', en: 'curling', zh: '冰壶', phonetic: '/ˈkɜːr.lɪŋ/', example: 'Curling is sometimes called chess on ice.', category: 'sports' },
  { id: 'sp046', en: 'biathlon', zh: '冬季两项', phonetic: '/baɪˈæθ.lɒn/', example: 'The biathlon combines cross-country skiing and rifle shooting.', category: 'sports' },
  { id: 'sp047', en: 'cross-country skiing', zh: '越野滑雪', phonetic: '/krɒs ˈkʌn.tri ˈskiː.ɪŋ/', example: 'Cross-country skiing is one of the most demanding endurance sports.', category: 'sports' },
  { id: 'sp048', en: 'ski jumping', zh: '跳台滑雪', phonetic: '/skiː ˈdʒʌmp.ɪŋ/', example: 'Ski jumping athletes soar over 100 meters through the air.', category: 'sports' },
  { id: 'sp049', en: 'sledding', zh: '滑雪橇', phonetic: '/ˈsled.ɪŋ/', example: 'The children spent the afternoon sledding down the hill.', category: 'sports' },
  { id: 'sp050', en: 'snowshoeing', zh: '雪鞋行走', phonetic: '/ˈsnoʊ.ʃuː.ɪŋ/', example: 'Snowshoeing is a great way to explore winter trails.', category: 'sports' },

  // ========== Combat Sports & Martial Arts ==========
  { id: 'sp051', en: 'boxing', zh: '拳击', phonetic: '/ˈbɒk.sɪŋ/', example: 'He trains in boxing three times a week at the gym.', category: 'sports' },
  { id: 'sp052', en: 'wrestling', zh: '摔跤', phonetic: '/ˈres.lɪŋ/', example: 'Wrestling is one of the oldest competitive sports.', category: 'sports' },
  { id: 'sp053', en: 'judo', zh: '柔道', phonetic: '/ˈdʒuː.doʊ/', example: 'Judo teaches you how to use an opponent\'s strength against them.', category: 'sports' },
  { id: 'sp054', en: 'karate', zh: '空手道', phonetic: '/kəˈrɑː.ti/', example: 'She earned her black belt in karate after years of training.', category: 'sports' },
  { id: 'sp055', en: 'taekwondo', zh: '跆拳道', phonetic: '/ˌtaɪˈkwɒn.doʊ/', example: 'Taekwondo is known for its powerful kicking techniques.', category: 'sports' },
  { id: 'sp056', en: 'jiu-jitsu', zh: '巴西柔术', phonetic: '/dʒuː ˈdʒɪt.suː/', example: 'Brazilian jiu-jitsu focuses on ground fighting and submissions.', category: 'sports' },
  { id: 'sp057', en: 'muay thai', zh: '泰拳', phonetic: '/mɔɪ taɪ/', example: 'Muay Thai is known as the art of eight limbs.', category: 'sports' },
  { id: 'sp058', en: 'fencing', zh: '击剑', phonetic: '/ˈfen.sɪŋ/', example: 'Fencing requires lightning-fast reflexes and footwork.', category: 'sports' },
  { id: 'sp059', en: 'kung fu', zh: '功夫', phonetic: '/ˌkʌŋ ˈfuː/', example: 'He has been practicing kung fu since he was a child.', category: 'sports' },
  { id: 'sp060', en: 'kickboxing', zh: '踢拳', phonetic: '/ˈkɪk.bɒk.sɪŋ/', example: 'Kickboxing combines punches and kicks for a full-body workout.', category: 'sports' },
  { id: 'sp061', en: 'mixed martial arts', zh: '综合格斗', phonetic: '/mɪkst ˈmɑːr.ʃəl ɑːrts/', example: 'Mixed martial arts fighters must be skilled in multiple disciplines.', category: 'sports' },
  { id: 'sp062', en: 'sumo', zh: '相扑', phonetic: '/ˈsuː.moʊ/', example: 'Sumo wrestling is a traditional Japanese sport with ancient roots.', category: 'sports' },

  // ========== Track & Field ==========
  { id: 'sp063', en: 'running', zh: '跑步', phonetic: '/ˈrʌn.ɪŋ/', example: 'Running in the morning helps clear my mind for the day.', category: 'sports' },
  { id: 'sp064', en: 'sprinting', zh: '短跑', phonetic: '/ˈsprɪn.tɪŋ/', example: 'Sprinting requires explosive power and perfect form.', category: 'sports' },
  { id: 'sp065', en: 'marathon', zh: '马拉松', phonetic: '/ˈmær.ə.θɒn/', example: 'She completed her first marathon in under four hours.', category: 'sports' },
  { id: 'sp066', en: 'long jump', zh: '跳远', phonetic: '/lɒŋ dʒʌmp/', example: 'He broke the school record in the long jump.', category: 'sports' },
  { id: 'sp067', en: 'high jump', zh: '跳高', phonetic: '/haɪ dʒʌmp/', example: 'The high jump bar was set at two meters.', category: 'sports' },
  { id: 'sp068', en: 'pole vault', zh: '撑杆跳', phonetic: '/poʊl vɒlt/', example: 'Pole vault is one of the most technical events in track and field.', category: 'sports' },
  { id: 'sp069', en: 'shot put', zh: '铅球', phonetic: '/ʃɒt pʊt/', example: 'The shot put requires tremendous upper-body strength.', category: 'sports' },
  { id: 'sp070', en: 'discus', zh: '铁饼', phonetic: '/ˈdɪs.kəs/', example: 'The discus throw dates back to the ancient Olympic Games.', category: 'sports' },
  { id: 'sp071', en: 'javelin', zh: '标枪', phonetic: '/ˈdʒæv.lɪn/', example: 'The javelin thrower launched the spear over 80 meters.', category: 'sports' },
  { id: 'sp072', en: 'triple jump', zh: '三级跳远', phonetic: '/ˈtrɪp.əl dʒʌmp/', example: 'The triple jump consists of a hop, a step, and a jump.', category: 'sports' },
  { id: 'sp073', en: 'hurdles', zh: '跨栏', phonetic: '/ˈhɜːr.dəlz/', example: 'She cleared all ten hurdles without knocking any over.', category: 'sports' },
  { id: 'sp074', en: 'steeplechase', zh: '障碍赛跑', phonetic: '/ˈstiː.pəl.tʃeɪs/', example: 'The steeplechase includes water jumps and barriers.', category: 'sports' },
  { id: 'sp075', en: 'decathlon', zh: '十项全能', phonetic: '/dɪˈkæθ.lɒn/', example: 'The decathlon tests athletes across ten different track and field events.', category: 'sports' },
  { id: 'sp076', en: 'relay', zh: '接力赛', phonetic: '/rɪˈleɪ/', example: 'The relay team practiced their baton handoffs for hours.', category: 'sports' },

  // ========== Gym & Fitness ==========
  { id: 'sp077', en: 'exercise', zh: '锻炼', phonetic: '/ˈek.sər.saɪz/', example: 'Regular exercise is essential for good health.', category: 'sports' },
  { id: 'sp078', en: 'workout', zh: '健身训练', phonetic: '/ˈwɜːrk.aʊt/', example: 'I try to get a workout in at least three times a week.', category: 'sports' },
  { id: 'sp079', en: 'gym', zh: '健身房', phonetic: '/dʒɪm/', example: 'I joined a gym near my office for convenience.', category: 'sports' },
  { id: 'sp080', en: 'fitness', zh: '健身', phonetic: '/ˈfɪt.nəs/', example: 'She is a fitness instructor who teaches yoga and pilates.', category: 'sports' },
  { id: 'sp081', en: 'weightlifting', zh: '举重', phonetic: '/ˈweɪt.lɪf.tɪŋ/', example: 'Weightlifting helps build muscle and increase bone density.', category: 'sports' },
  { id: 'sp082', en: 'bodybuilding', zh: '健美', phonetic: '/ˈbɒd.i.bɪl.dɪŋ/', example: 'Bodybuilding requires strict dieting and intense training.', category: 'sports' },
  { id: 'sp083', en: 'cardio', zh: '有氧运动', phonetic: '/ˈkɑːr.di.oʊ/', example: 'I do thirty minutes of cardio on the treadmill every day.', category: 'sports' },
  { id: 'sp084', en: 'aerobics', zh: '有氧操', phonetic: '/eəˈroʊ.bɪks/', example: 'She attends an aerobics class every Tuesday evening.', category: 'sports' },
  { id: 'sp085', en: 'yoga', zh: '瑜伽', phonetic: '/ˈjoʊ.ɡə/', example: 'Yoga helps improve flexibility and reduce stress.', category: 'sports' },
  { id: 'sp086', en: 'pilates', zh: '普拉提', phonetic: '/pɪˈlɑː.tiːz/', example: 'Pilates focuses on strengthening the core muscles.', category: 'sports' },
  { id: 'sp087', en: 'stretching', zh: '拉伸', phonetic: '/ˈstretʃ.ɪŋ/', example: 'Always do some stretching before and after your workout.', category: 'sports' },
  { id: 'sp088', en: 'warm-up', zh: '热身', phonetic: '/wɔːrm ʌp/', example: 'A proper warm-up reduces the risk of injury during exercise.', category: 'sports' },
  { id: 'sp089', en: 'cool-down', zh: '放松运动', phonetic: '/kuːl daʊn/', example: 'Never skip the cool-down after an intense workout.', category: 'sports' },
  { id: 'sp090', en: 'push-up', zh: '俯卧撑', phonetic: '/pʊʃ ʌp/', example: 'He can do fifty push-ups without stopping.', category: 'sports' },
  { id: 'sp091', en: 'sit-up', zh: '仰卧起坐', phonetic: '/sɪt ʌp/', example: 'She incorporates sit-ups into her daily exercise routine.', category: 'sports' },
  { id: 'sp092', en: 'squat', zh: '深蹲', phonetic: '/skwɒt/', example: 'Proper squat form is essential to avoid knee injuries.', category: 'sports' },
  { id: 'sp093', en: 'deadlift', zh: '硬拉', phonetic: '/ˈded.lɪft/', example: 'The deadlift is one of the three main powerlifting exercises.', category: 'sports' },
  { id: 'sp094', en: 'bench press', zh: '卧推', phonetic: '/bentʃ pres/', example: 'He set a personal record on the bench press today.', category: 'sports' },
  { id: 'sp095', en: 'dumbbell', zh: '哑铃', phonetic: '/ˈdʌm.bel/', example: 'Start with light dumbbells and gradually increase the weight.', category: 'sports' },
  { id: 'sp096', en: 'barbell', zh: '杠铃', phonetic: '/ˈbɑːr.bel/', example: 'The barbell was loaded with heavy plates for the squat.', category: 'sports' },
  { id: 'sp097', en: 'kettlebell', zh: '壶铃', phonetic: '/ˈket.əl.bel/', example: 'Kettlebell swings are a great full-body exercise.', category: 'sports' },
  { id: 'sp098', en: 'resistance band', zh: '阻力带', phonetic: '/rɪˈzɪs.təns bænd/', example: 'Resistance bands are portable and great for travel workouts.', category: 'sports' },
  { id: 'sp099', en: 'jump rope', zh: '跳绳', phonetic: '/dʒʌmp roʊp/', example: 'Jumping rope for ten minutes burns a lot of calories.', category: 'sports' },
  { id: 'sp100', en: 'plank', zh: '平板支撑', phonetic: '/plæŋk/', example: 'Hold the plank position for thirty seconds and try to increase over time.', category: 'sports' },
  { id: 'sp101', en: 'burpee', zh: '波比跳', phonetic: '/ˈbɜːr.pi/', example: 'Burpees are a demanding full-body exercise.', category: 'sports' },
  { id: 'sp102', en: 'lunge', zh: '弓步', phonetic: '/lʌndʒ/', example: 'Walking lunges are excellent for strengthening the legs.', category: 'sports' },
  { id: 'sp103', en: 'crunch', zh: '卷腹', phonetic: '/krʌntʃ/', example: 'Crunches target the abdominal muscles more effectively than sit-ups.', category: 'sports' },
  { id: 'sp104', en: 'treadmill', zh: '跑步机', phonetic: '/ˈtred.mɪl/', example: 'I prefer running outside to using a treadmill.', category: 'sports' },
  { id: 'sp105', en: 'elliptical', zh: '椭圆机', phonetic: '/ɪˈlɪp.tɪ.kəl/', example: 'The elliptical machine is easier on the knees than running.', category: 'sports' },
  { id: 'sp106', en: 'stationary bike', zh: '健身车', phonetic: '/ˈsteɪ.ʃən.er.i baɪk/', example: 'She rides the stationary bike while watching TV.', category: 'sports' },
  { id: 'sp107', en: 'rowing machine', zh: '划船机', phonetic: '/ˈroʊ.ɪŋ məˈʃiːn/', example: 'The rowing machine provides a full-body cardio workout.', category: 'sports' },
  { id: 'sp108', en: 'personal trainer', zh: '私人教练', phonetic: '/ˈpɜːr.sən.əl ˈtreɪ.nər/', example: 'A personal trainer can help you achieve your fitness goals faster.', category: 'sports' },
  { id: 'sp109', en: 'calorie', zh: '卡路里', phonetic: '/ˈkæl.ər.i/', example: 'Running burns more calories than walking the same distance.', category: 'sports' },
  { id: 'sp110', en: 'metabolism', zh: '新陈代谢', phonetic: '/məˈtæb.ə.lɪz.əm/', example: 'Building muscle helps boost your metabolism.', category: 'sports' },

  // ========== Sports Equipment ==========
  { id: 'sp111', en: 'racket', zh: '球拍', phonetic: '/ˈræk.ɪt/', example: 'She needs to restring her tennis racket before the match.', category: 'sports' },
  { id: 'sp112', en: 'bat', zh: '球棒', phonetic: '/bæt/', example: 'He swung the bat and hit the ball out of the park.', category: 'sports' },
  { id: 'sp113', en: 'ball', zh: '球', phonetic: '/bɔːl/', example: 'The children kicked the ball around in the park.', category: 'sports' },
  { id: 'sp114', en: 'glove', zh: '手套', phonetic: '/ɡlʌv/', example: 'The baseball player caught the ball in his glove.', category: 'sports' },
  { id: 'sp115', en: 'helmet', zh: '头盔', phonetic: '/ˈhel.mət/', example: 'Always wear a helmet when riding a bicycle.', category: 'sports' },
  { id: 'sp116', en: 'shin guard', zh: '护胫', phonetic: '/ʃɪn ɡɑːrd/', example: 'Soccer players wear shin guards to protect their legs.', category: 'sports' },
  { id: 'sp117', en: 'mouthguard', zh: '护齿', phonetic: '/ˈmaʊθ.ɡɑːrd/', example: 'Boxers must wear a mouthguard during fights.', category: 'sports' },
  { id: 'sp118', en: 'knee pad', zh: '护膝', phonetic: '/niː pæd/', example: 'Volleyball players often wear knee pads for protection.', category: 'sports' },
  { id: 'sp119', en: 'jersey', zh: '运动衫', phonetic: '/ˈdʒɜːr.zi/', example: 'The team wore their new jerseys for the championship game.', category: 'sports' },
  { id: 'sp120', en: 'uniform', zh: '队服', phonetic: '/ˈjuː.nɪ.fɔːrm/', example: 'Every player must wear the official team uniform.', category: 'sports' },
  { id: 'sp121', en: 'cleats', zh: '钉鞋', phonetic: '/kliːts/', example: 'He bought new soccer cleats for the season.', category: 'sports' },
  { id: 'sp122', en: 'running shoes', zh: '跑鞋', phonetic: '/ˈrʌn.ɪŋ ʃuːz/', example: 'A good pair of running shoes can prevent injuries.', category: 'sports' },
  { id: 'sp123', en: 'skateboard', zh: '滑板', phonetic: '/ˈskeɪt.bɔːrd/', example: 'He rides his skateboard to school every day.', category: 'sports' },
  { id: 'sp124', en: 'rollerblades', zh: '旱冰鞋', phonetic: '/ˈroʊ.lər.bleɪdz/', example: 'She glided along the boardwalk on her rollerblades.', category: 'sports' },
  { id: 'sp125', en: 'bicycle', zh: '自行车', phonetic: '/ˈbaɪ.sɪ.kəl/', example: 'He cycles twenty kilometers on his bicycle every morning.', category: 'sports' },
  { id: 'sp126', en: 'surfboard', zh: '冲浪板', phonetic: '/ˈsɜːrf.bɔːrd/', example: 'He waxed his surfboard before heading into the water.', category: 'sports' },
  { id: 'sp127', en: 'snowboard', zh: '单板滑雪板', phonetic: '/ˈsnoʊ.bɔːrd/', example: 'She rented a snowboard and took a lesson on the bunny slope.', category: 'sports' },
  { id: 'sp128', en: 'skis', zh: '滑雪板', phonetic: '/skiːz/', example: 'He adjusted the bindings on his skis before the run.', category: 'sports' },
  { id: 'sp129', en: 'goggles', zh: '护目镜', phonetic: '/ˈɡɒɡ.əlz/', example: 'Ski goggles protect your eyes from wind and snow.', category: 'sports' },
  { id: 'sp130', en: 'wetsuit', zh: '潜水服', phonetic: '/ˈwet.suːt/', example: 'A wetsuit keeps you warm during cold-water dives.', category: 'sports' },
  { id: 'sp131', en: 'flippers', zh: '脚蹼', phonetic: '/ˈflɪp.ərz/', example: 'The diver put on his flippers and jumped into the sea.', category: 'sports' },
  { id: 'sp132', en: 'life jacket', zh: '救生衣', phonetic: '/laɪf ˈdʒæk.ɪt/', example: 'Please put on your life jacket before getting into the kayak.', category: 'sports' },
  { id: 'sp133', en: 'stopwatch', zh: '秒表', phonetic: '/ˈstɒp.wɒtʃ/', example: 'The coach used a stopwatch to time the sprinters.', category: 'sports' },
  { id: 'sp134', en: 'whistle', zh: '哨子', phonetic: '/ˈwɪs.əl/', example: 'The referee blew the whistle to signal the end of the game.', category: 'sports' },
  { id: 'sp135', en: 'scoreboard', zh: '记分板', phonetic: '/ˈskɔːr.bɔːrd/', example: 'The scoreboard showed the home team leading by ten points.', category: 'sports' },
  { id: 'sp136', en: 'goalpost', zh: '球门柱', phonetic: '/ˈɡoʊl.poʊst/', example: 'The ball hit the goalpost and bounced back into play.', category: 'sports' },
  { id: 'sp137', en: 'net', zh: '网', phonetic: '/net/', example: 'The tennis ball barely cleared the net.', category: 'sports' },
  { id: 'sp138', en: 'hoop', zh: '篮筐', phonetic: '/huːp/', example: 'He shot the ball straight through the hoop.', category: 'sports' },
  { id: 'sp139', en: 'puck', zh: '冰球', phonetic: '/pʌk/', example: 'The hockey puck slid across the ice and into the goal.', category: 'sports' },
  { id: 'sp140', en: 'cue', zh: '台球杆', phonetic: '/kjuː/', example: 'He chalked his cue before taking the shot.', category: 'sports' },

  // ========== Competition & Events ==========
  { id: 'sp141', en: 'competition', zh: '比赛', phonetic: '/ˌkɒm.pəˈtɪʃ.ən/', example: 'The swimming competition will be held next Saturday.', category: 'sports' },
  { id: 'sp142', en: 'tournament', zh: '锦标赛', phonetic: '/ˈtʊr.nə.mənt/', example: 'The tennis tournament attracted players from around the world.', category: 'sports' },
  { id: 'sp143', en: 'championship', zh: '冠军赛', phonetic: '/ˈtʃæm.pi.ən.ʃɪp/', example: 'They won the national championship for the third year in a row.', category: 'sports' },
  { id: 'sp144', en: 'match', zh: '比赛', phonetic: '/mætʃ/', example: 'The soccer match ended in a dramatic penalty shootout.', category: 'sports' },
  { id: 'sp145', en: 'game', zh: '比赛/游戏', phonetic: '/ɡeɪm/', example: 'The basketball game went into double overtime.', category: 'sports' },
  { id: 'sp146', en: 'race', zh: '赛跑', phonetic: '/reɪs/', example: 'The hundred-meter race was decided by a photo finish.', category: 'sports' },
  { id: 'sp147', en: 'league', zh: '联赛', phonetic: '/liːɡ/', example: 'Their team was promoted to the premier league.', category: 'sports' },
  { id: 'sp148', en: 'playoffs', zh: '季后赛', phonetic: '/ˈpleɪ.ɒfs/', example: 'Only the top four teams advance to the playoffs.', category: 'sports' },
  { id: 'sp149', en: 'semifinal', zh: '半决赛', phonetic: '/ˈsem.i.faɪ.nəl/', example: 'They reached the semifinal but lost to the eventual champions.', category: 'sports' },
  { id: 'sp150', en: 'final', zh: '决赛', phonetic: '/ˈfaɪ.nəl/', example: 'The World Cup final is watched by billions of people.', category: 'sports' },
  { id: 'sp151', en: 'qualifier', zh: '资格赛', phonetic: '/ˈkwɒl.ɪ.faɪ.ər/', example: 'She won her qualifying match to reach the main tournament.', category: 'sports' },
  { id: 'sp152', en: 'round', zh: '轮次', phonetic: '/raʊnd/', example: 'He was knocked out in the first round of the competition.', category: 'sports' },
  { id: 'sp153', en: 'overtime', zh: '加时赛', phonetic: '/ˈoʊ.vər.taɪm/', example: 'The game went into overtime after a tie at full time.', category: 'sports' },
  { id: 'sp154', en: 'medal', zh: '奖牌', phonetic: '/ˈmed.əl/', example: 'She won a gold medal at the Olympic Games.', category: 'sports' },
  { id: 'sp155', en: 'trophy', zh: '奖杯', phonetic: '/ˈtroʊ.fi/', example: 'The captain lifted the trophy as the crowd cheered.', category: 'sports' },
  { id: 'sp156', en: 'podium', zh: '领奖台', phonetic: '/ˈpoʊ.di.əm/', example: 'The top three finishers stood on the podium for the ceremony.', category: 'sports' },
  { id: 'sp157', en: 'world record', zh: '世界纪录', phonetic: '/wɜːrld ˈrek.ɔːrd/', example: 'He broke the world record in the 100-meter freestyle.', category: 'sports' },
  { id: 'sp158', en: 'personal best', zh: '个人最佳', phonetic: '/ˈpɜːr.sən.əl best/', example: 'She set a new personal best in the marathon today.', category: 'sports' },
  { id: 'sp159', en: 'opening ceremony', zh: '开幕式', phonetic: '/ˈoʊ.pən.ɪŋ ˈser.ɪ.mə.ni/', example: 'The opening ceremony of the Olympics was spectacular.', category: 'sports' },

  // ========== Rules & Officials ==========
  { id: 'sp160', en: 'referee', zh: '裁判', phonetic: '/ˌref.əˈriː/', example: 'The referee showed a red card to the defender.', category: 'sports' },
  { id: 'sp161', en: 'umpire', zh: '裁判员', phonetic: '/ˈʌm.paɪər/', example: 'The umpire called the ball out of bounds.', category: 'sports' },
  { id: 'sp162', en: 'judge', zh: '评委', phonetic: '/dʒʌdʒ/', example: 'The judges awarded her performance a perfect score.', category: 'sports' },
  { id: 'sp163', en: 'coach', zh: '教练', phonetic: '/koʊtʃ/', example: 'The coach gave the team an inspiring halftime speech.', category: 'sports' },
  { id: 'sp164', en: 'foul', zh: '犯规', phonetic: '/faʊl/', example: 'The defender committed a foul and the striker was awarded a free kick.', category: 'sports' },
  { id: 'sp165', en: 'penalty', zh: '罚球', phonetic: '/ˈpen.əl.ti/', example: 'The penalty kick secured the victory for the home team.', category: 'sports' },
  { id: 'sp166', en: 'offside', zh: '越位', phonetic: '/ˌɒfˈsaɪd/', example: 'The goal was disallowed because the striker was offside.', category: 'sports' },
  { id: 'sp167', en: 'timeout', zh: '暂停', phonetic: '/ˈtaɪm.aʊt/', example: 'The coach called a timeout to discuss strategy.', category: 'sports' },
  { id: 'sp168', en: 'substitution', zh: '换人', phonetic: '/ˌsʌb.stɪˈtjuː.ʃən/', example: 'The team made a substitution to bring on a fresh striker.', category: 'sports' },
  { id: 'sp169', en: 'disqualify', zh: '取消资格', phonetic: '/dɪsˈkwɒl.ɪ.faɪ/', example: 'The runner was disqualified for a false start.', category: 'sports' },
  { id: 'sp170', en: 'regulation', zh: '规则', phonetic: '/ˌreɡ.jəˈleɪ.ʃən/', example: 'All equipment must meet safety regulations.', category: 'sports' },
  { id: 'sp171', en: 'rulebook', zh: '规则手册', phonetic: '/ˈruːl.bʊk/', example: 'According to the rulebook, that is an illegal move.', category: 'sports' },
  { id: 'sp172', en: 'sportsmanship', zh: '体育精神', phonetic: '/ˈspɔːrts.mən.ʃɪp/', example: 'Good sportsmanship means respecting your opponents.', category: 'sports' },
  { id: 'sp173', en: 'fair play', zh: '公平竞争', phonetic: '/fer pleɪ/', example: 'The award recognizes teams that demonstrate exceptional fair play.', category: 'sports' },
  { id: 'sp174', en: 'doping', zh: '兴奋剂', phonetic: '/ˈdoʊ.pɪŋ/', example: 'Doping is strictly prohibited in all professional sports.', category: 'sports' },
  { id: 'sp175', en: 'yellow card', zh: '黄牌', phonetic: '/ˈjel.oʊ kɑːrd/', example: 'He received a yellow card for a dangerous tackle.', category: 'sports' },
  { id: 'sp176', en: 'red card', zh: '红牌', phonetic: '/red kɑːrd/', example: 'The player was sent off after receiving a red card.', category: 'sports' },
  { id: 'sp177', en: 'free kick', zh: '任意球', phonetic: '/friː kɪk/', example: 'He scored directly from a free kick just outside the box.', category: 'sports' },
  { id: 'sp178', en: 'corner kick', zh: '角球', phonetic: '/ˈkɔːr.nər kɪk/', example: 'The corner kick was headed into the goal by the tall defender.', category: 'sports' },
  { id: 'sp179', en: 'throw-in', zh: '掷界外球', phonetic: '/θroʊ ɪn/', example: 'The fullback took a quick throw-in to restart play.', category: 'sports' },

  // ========== Positions & Roles ==========
  { id: 'sp180', en: 'player', zh: '运动员', phonetic: '/ˈpleɪ.ər/', example: 'Each player on the team has a specific role.', category: 'sports' },
  { id: 'sp181', en: 'captain', zh: '队长', phonetic: '/ˈkæp.tɪn/', example: 'The captain led his team onto the field.', category: 'sports' },
  { id: 'sp182', en: 'goalkeeper', zh: '守门员', phonetic: '/ˈɡoʊl.kiː.pər/', example: 'The goalkeeper made an incredible save in the final minute.', category: 'sports' },
  { id: 'sp183', en: 'defender', zh: '后卫', phonetic: '/dɪˈfen.dər/', example: 'The defender blocked the shot with a sliding tackle.', category: 'sports' },
  { id: 'sp184', en: 'midfielder', zh: '中场', phonetic: '/ˈmɪd.fiːl.dər/', example: 'The midfielder controlled the tempo of the entire game.', category: 'sports' },
  { id: 'sp185', en: 'striker', zh: '前锋', phonetic: '/ˈstraɪ.kər/', example: 'The striker scored a hat-trick in the first half.', category: 'sports' },
  { id: 'sp186', en: 'forward', zh: '前锋', phonetic: '/ˈfɔːr.wərd/', example: 'The forward dribbled past two defenders and scored.', category: 'sports' },
  { id: 'sp187', en: 'quarterback', zh: '四分卫', phonetic: '/ˈkwɔːr.tər.bæk/', example: 'The quarterback threw a perfect pass for a touchdown.', category: 'sports' },
  { id: 'sp188', en: 'pitcher', zh: '投手', phonetic: '/ˈpɪtʃ.ər/', example: 'The pitcher threw a fastball at over 90 miles per hour.', category: 'sports' },
  { id: 'sp189', en: 'catcher', zh: '捕手', phonetic: '/ˈkætʃ.ər/', example: 'The catcher signaled for a curveball.', category: 'sports' },
  { id: 'sp190', en: 'point guard', zh: '控球后卫', phonetic: '/pɔɪnt ɡɑːrd/', example: 'The point guard orchestrated every offensive play.', category: 'sports' },
  { id: 'sp191', en: 'center', zh: '中锋', phonetic: '/ˈsen.tər/', example: 'The center dominated the paint with rebounds and blocks.', category: 'sports' },
  { id: 'sp192', en: 'substitute', zh: '替补', phonetic: '/ˈsʌb.stɪ.tjuːt/', example: 'The substitute came off the bench and scored the winning goal.', category: 'sports' },
  { id: 'sp193', en: 'rookie', zh: '新秀', phonetic: '/ˈrʊk.i/', example: 'The rookie impressed everyone in his first professional season.', category: 'sports' },
  { id: 'sp194', en: 'veteran', zh: '老将', phonetic: '/ˈvet.ər.ən/', example: 'The veteran player retired after twenty years in the league.', category: 'sports' },
  { id: 'sp195', en: 'opponent', zh: '对手', phonetic: '/əˈpoʊ.nənt/', example: 'She defeated her opponent in straight sets.', category: 'sports' },
  { id: 'sp196', en: 'teammate', zh: '队友', phonetic: '/ˈtiːm.meɪt/', example: 'He passed the ball to his teammate for an easy score.', category: 'sports' },

  // ========== Sports Actions & Verbs ==========
  { id: 'sp197', en: 'score', zh: '得分', phonetic: '/skɔːr/', example: 'He scored the winning goal in the last second of the match.', category: 'sports' },
  { id: 'sp198', en: 'pass', zh: '传球', phonetic: '/pæs/', example: 'She passed the ball accurately to the open player.', category: 'sports' },
  { id: 'sp199', en: 'shoot', zh: '射门', phonetic: '/ʃuːt/', example: 'He shot the ball from outside the penalty area.', category: 'sports' },
  { id: 'sp200', en: 'dribble', zh: '运球', phonetic: '/ˈdrɪb.əl/', example: 'The winger dribbled past three defenders with ease.', category: 'sports' },
  { id: 'sp201', en: 'tackle', zh: '抢断', phonetic: '/ˈtæk.əl/', example: 'The defender made a clean tackle to win back possession.', category: 'sports' },
  { id: 'sp202', en: 'block', zh: '封堵', phonetic: '/blɒk/', example: 'She blocked the spike at the net with perfect timing.', category: 'sports' },
  { id: 'sp203', en: 'serve', zh: '发球', phonetic: '/sɜːrv/', example: 'He served an ace to start the match.', category: 'sports' },
  { id: 'sp204', en: 'volley', zh: '凌空球', phonetic: '/ˈvɒl.i/', example: 'She hit a powerful volley that the goalkeeper could not reach.', category: 'sports' },
  { id: 'sp205', en: 'smash', zh: '扣杀', phonetic: '/smæʃ/', example: 'The badminton player smashed the shuttlecock for a winner.', category: 'sports' },
  { id: 'sp206', en: 'swing', zh: '挥击', phonetic: '/swɪŋ/', example: 'He swung the golf club with perfect form.', category: 'sports' },
  { id: 'sp207', en: 'pitch', zh: '投球', phonetic: '/pɪtʃ/', example: 'The pitcher pitched a complete game shutout.', category: 'sports' },
  { id: 'sp208', en: 'catch', zh: '接球', phonetic: '/kætʃ/', example: 'She made a diving catch to end the inning.', category: 'sports' },
  { id: 'sp209', en: 'throw', zh: '投掷', phonetic: '/θroʊ/', example: 'He threw the javelin over 70 meters.', category: 'sports' },
  { id: 'sp210', en: 'kick', zh: '踢', phonetic: '/kɪk/', example: 'He kicked the ball with incredible power from 30 yards out.', category: 'sports' },
  { id: 'sp211', en: 'head', zh: '头球', phonetic: '/hed/', example: 'The defender headed the ball clear of the goal.', category: 'sports' },
  { id: 'sp212', en: 'dive', zh: '跳水/扑救', phonetic: '/daɪv/', example: 'The goalkeeper dived to his left and saved the penalty.', category: 'sports' },
  { id: 'sp213', en: 'sprint', zh: '冲刺', phonetic: '/sprɪnt/', example: 'She sprinted the final 100 meters to win the race.', category: 'sports' },
  { id: 'sp214', en: 'jog', zh: '慢跑', phonetic: '/dʒɒɡ/', example: 'I like to jog around the park in the morning.', category: 'sports' },
  { id: 'sp215', en: 'stretch', zh: '拉伸', phonetic: '/stretʃ/', example: 'Always stretch before you start any physical activity.', category: 'sports' },
  { id: 'sp216', en: 'train', zh: '训练', phonetic: '/treɪn/', example: 'She trains six days a week for the upcoming competition.', category: 'sports' },
  { id: 'sp217', en: 'compete', zh: '竞争', phonetic: '/kəmˈpiːt/', example: 'Athletes from 200 countries will compete in the games.', category: 'sports' },
  { id: 'sp218', en: 'defend', zh: '防守', phonetic: '/dɪˈfend/', example: 'The team defended their lead for the entire second half.', category: 'sports' },
  { id: 'sp219', en: 'attack', zh: '进攻', phonetic: '/əˈtæk/', example: 'The coach told the team to attack more in the second half.', category: 'sports' },
  { id: 'sp220', en: 'warm up', zh: '热身', phonetic: '/wɔːrm ʌp/', example: 'The players are warming up on the field before the game.', category: 'sports' },
  { id: 'sp221', en: 'cheer', zh: '欢呼', phonetic: '/tʃɪr/', example: 'The fans cheered loudly when the home team scored.', category: 'sports' },
  { id: 'sp222', en: 'celebrate', zh: '庆祝', phonetic: '/ˈsel.ə.breɪt/', example: 'The whole team celebrated their victory with a parade.', category: 'sports' },

  // ========== Extreme & Adventure Sports ==========
  { id: 'sp223', en: 'rock climbing', zh: '攀岩', phonetic: '/rɒk ˈklaɪ.mɪŋ/', example: 'Rock climbing tests both physical strength and mental focus.', category: 'sports' },
  { id: 'sp224', en: 'skydiving', zh: '跳伞', phonetic: '/ˈskaɪ.daɪ.vɪŋ/', example: 'Skydiving was the most thrilling experience of her life.', category: 'sports' },
  { id: 'sp225', en: 'bungee jumping', zh: '蹦极', phonetic: '/ˈbʌn.dʒi ˈdʒʌmp.ɪŋ/', example: 'Bungee jumping off that bridge takes real courage.', category: 'sports' },
  { id: 'sp226', en: 'paragliding', zh: '滑翔伞', phonetic: '/ˈpær.ə.ɡlaɪ.dɪŋ/', example: 'Paragliding gives you a bird\'s-eye view of the landscape.', category: 'sports' },
  { id: 'sp227', en: 'hang gliding', zh: '悬挂滑翔', phonetic: '/hæŋ ˈɡlaɪ.dɪŋ/', example: 'Hang gliding allows you to soar like an eagle in the sky.', category: 'sports' },
  { id: 'sp228', en: 'parkour', zh: '跑酷', phonetic: '/pɑːrˈkʊr/', example: 'Parkour involves running, jumping, and climbing over urban obstacles.', category: 'sports' },
  { id: 'sp229', en: 'BMX', zh: '小轮车', phonetic: '/ˌbiː.emˈeks/', example: 'BMX racing became an Olympic sport in 2008.', category: 'sports' },
  { id: 'sp230', en: 'motocross', zh: '摩托车越野', phonetic: '/ˈmoʊ.toʊ.krɒs/', example: 'Motocross riders navigate rough terrain at high speeds.', category: 'sports' },
  { id: 'sp231', en: 'snowmobiling', zh: '雪地摩托', phonetic: '/ˈsnoʊ.mə.biːl.ɪŋ/', example: 'Snowmobiling is a popular winter activity in Canada.', category: 'sports' },
  { id: 'sp232', en: 'whitewater rafting', zh: '激流泛舟', phonetic: '/ˈwaɪt.wɔː.tər ˈræf.tɪŋ/', example: 'Whitewater rafting down the Colorado River was an adrenaline rush.', category: 'sports' },
  { id: 'sp233', en: 'kitesurfing', zh: '风筝冲浪', phonetic: '/ˈkaɪt.sɜːr.fɪŋ/', example: 'Kitesurfing harnesses the wind to pull you across the water.', category: 'sports' },
  { id: 'sp234', en: 'mountain biking', zh: '山地自行车', phonetic: '/ˈmaʊn.tɪn ˈbaɪ.kɪŋ/', example: 'Mountain biking through the forest trails is an amazing workout.', category: 'sports' },
  { id: 'sp235', en: 'skateboarding', zh: '滑板', phonetic: '/ˈskeɪt.bɔːr.dɪŋ/', example: 'Skateboarding will make its Olympic debut with many new fans.', category: 'sports' },
  { id: 'sp236', en: 'ice climbing', zh: '攀冰', phonetic: '/aɪs ˈklaɪ.mɪŋ/', example: 'Ice climbing requires specialized crampons and ice axes.', category: 'sports' },

  // ========== Sports Venues & Facilities ==========
  { id: 'sp237', en: 'stadium', zh: '体育场', phonetic: '/ˈsteɪ.di.əm/', example: 'The stadium was filled with 80,000 cheering fans.', category: 'sports' },
  { id: 'sp238', en: 'arena', zh: '竞技场', phonetic: '/əˈriː.nə/', example: 'The basketball arena has a capacity of 20,000 people.', category: 'sports' },
  { id: 'sp239', en: 'gymnasium', zh: '体育馆', phonetic: '/dʒɪmˈneɪ.zi.əm/', example: 'The gymnastics competition was held in the main gymnasium.', category: 'sports' },
  { id: 'sp240', en: 'court', zh: '球场', phonetic: '/kɔːrt/', example: 'The players walked onto the tennis court to warm up.', category: 'sports' },
  { id: 'sp241', en: 'field', zh: '场地', phonetic: '/fiːld/', example: 'The soccer field was in perfect condition for the final.', category: 'sports' },
  { id: 'sp242', en: 'track', zh: '跑道', phonetic: '/træk/', example: 'The runners lined up on the starting blocks of the track.', category: 'sports' },
  { id: 'sp243', en: 'pool', zh: '游泳池', phonetic: '/puːl/', example: 'The Olympic swimming pool is 50 meters long.', category: 'sports' },
  { id: 'sp244', en: 'rink', zh: '溜冰场', phonetic: '/rɪŋk/', example: 'We went skating at the ice rink in the city center.', category: 'sports' },
  { id: 'sp245', en: 'pitch', zh: '足球场', phonetic: '/pɪtʃ/', example: 'The football pitch was muddy after the heavy rain.', category: 'sports' },
  { id: 'sp246', en: 'slope', zh: '滑雪道', phonetic: '/sloʊp/', example: 'Beginners should stick to the gentle slopes at first.', category: 'sports' },
  { id: 'sp247', en: 'velodrome', zh: '自行车赛场', phonetic: '/ˈviː.lə.droʊm/', example: 'The cycling events were held at the new velodrome.', category: 'sports' },
  { id: 'sp248', en: 'clubhouse', zh: '俱乐部会所', phonetic: '/ˈklʌb.haʊs/', example: 'After the match we gathered in the clubhouse for drinks.', category: 'sports' },
  { id: 'sp249', en: 'locker room', zh: '更衣室', phonetic: '/ˈlɒk.ər ruːm/', example: 'The coach gave a speech in the locker room before the game.', category: 'sports' },
  { id: 'sp250', en: 'sideline', zh: '边线', phonetic: '/ˈsaɪd.laɪn/', example: 'The injured player watched the rest of the game from the sideline.', category: 'sports' },
];

// -- js/data/words_trade.js --
const WORDS_TRADE = [
  // ============================================================
  // A. 贸易术语 Trade Terms (80+ words)
  // ============================================================
  { id: 'tr001', en: 'FOB', zh: '装运港船上交货/离岸价', pos: 'abbr.', phonetic: '/ˌef əʊ ˈbiː/', example: 'The price is quoted on FOB Shanghai basis.', category: 'trade' },
  { id: 'tr002', en: 'CIF', zh: '成本加保险费加运费/到岸价', pos: 'abbr.', phonetic: '/ˌsiː aɪ ˈef/', example: 'We prefer CIF Hamburg terms for this order.', category: 'trade' },
  { id: 'tr003', en: 'EXW', zh: '工厂交货价', pos: 'abbr.', phonetic: '/ˌiː eks ˈdʌbəljuː/', example: 'Under EXW terms, the buyer bears all transportation costs.', category: 'trade' },
  { id: 'tr004', en: 'DDP', zh: '完税后交货', pos: 'abbr.', phonetic: '/ˌdiː diː ˈpiː/', example: 'The supplier agreed to ship the goods DDP to our warehouse.', category: 'trade' },
  { id: 'tr005', en: 'CFR', zh: '成本加运费', pos: 'abbr.', phonetic: '/ˌsiː ef ˈɑːr/', example: 'CFR price excludes insurance coverage.', category: 'trade' },
  { id: 'tr006', en: 'FAS', zh: '船边交货', pos: 'abbr.', phonetic: '/ˌef eɪ ˈes/', example: 'FAS means the seller delivers when goods are placed alongside the vessel.', category: 'trade' },
  { id: 'tr007', en: 'DAP', zh: '目的地交货', pos: 'abbr.', phonetic: '/ˌdiː eɪ ˈpiː/', example: 'DAP requires the seller to deliver goods ready for unloading at the destination.', category: 'trade' },
  { id: 'tr008', en: 'DPU', zh: '卸货地交货', pos: 'abbr.', phonetic: '/ˌdiː piː ˈjuː/', example: 'Under DPU terms, the seller unloads the goods at the named place.', category: 'trade' },
  { id: 'tr009', en: 'CIP', zh: '运费和保险费付至', pos: 'abbr.', phonetic: '/ˌsiː aɪ ˈpiː/', example: 'CIP requires higher insurance coverage than CIF.', category: 'trade' },
  { id: 'tr010', en: 'CPT', zh: '运费付至', pos: 'abbr.', phonetic: '/ˌsiː piː ˈtiː/', example: 'Under CPT, risk transfers when goods are handed to the first carrier.', category: 'trade' },
  { id: 'tr011', en: 'FCA', zh: '货交承运人', pos: 'abbr.', phonetic: '/ˌef siː ˈeɪ/', example: 'FCA is suitable for containerized transport.', category: 'trade' },
  { id: 'tr012', en: 'L/C', zh: '信用证', pos: 'abbr.', phonetic: '/ˈletər əv ˈkredɪt/', example: 'Payment will be made by irrevocable L/C at sight.', category: 'trade' },
  { id: 'tr013', en: 'T/T', zh: '电汇', pos: 'abbr.', phonetic: '/ˈtelɪɡræfɪk ˈtrænsfɜːr/', example: 'We require 30% advance payment by T/T.', category: 'trade' },
  { id: 'tr014', en: 'D/P', zh: '付款交单', pos: 'abbr.', phonetic: '/ˈdɒkjumənts əˈɡeɪnst ˈpeɪmənt/', example: 'We usually accept D/P at sight for small orders.', category: 'trade' },
  { id: 'tr015', en: 'D/A', zh: '承兑交单', pos: 'abbr.', phonetic: '/ˈdɒkjumənts əˈɡeɪnst əkˈseptəns/', example: 'D/A terms give the buyer time to pay after accepting the draft.', category: 'trade' },
  { id: 'tr016', en: 'B/L', zh: '提单', pos: 'abbr.', phonetic: '/bɪl əv ˈleɪdɪŋ/', example: 'A clean B/L is required for negotiation of documents.', category: 'trade' },
  { id: 'tr017', en: 'AWB', zh: '空运单', pos: 'abbr.', phonetic: '/ˈeəweɪ bɪl/', example: 'The AWB was issued once the cargo was handed to the airline.', category: 'trade' },
  { id: 'tr018', en: 'SWB', zh: '海运单', pos: 'abbr.', phonetic: '/ˈsiːweɪ bɪl/', example: 'Unlike a B/L, a SWB is not a document of title.', category: 'trade' },
  { id: 'tr019', en: 'ETA', zh: '预计到达时间', pos: 'abbr.', phonetic: '/ˌiː tiː ˈeɪ/', example: 'The ETA at Rotterdam port is July 15th.', category: 'trade' },
  { id: 'tr020', en: 'ETD', zh: '预计离港时间', pos: 'abbr.', phonetic: '/ˌiː tiː ˈdiː/', example: 'The ETD from Shanghai is confirmed for next Monday.', category: 'trade' },
  { id: 'tr021', en: 'TEU', zh: '二十英尺标准箱', pos: 'abbr.', phonetic: '/ˌtiː iː ˈjuː/', example: 'The vessel has a capacity of 18,000 TEU.', category: 'trade' },
  { id: 'tr022', en: 'FEU', zh: '四十英尺标准箱', pos: 'abbr.', phonetic: '/ˌef iː ˈjuː/', example: 'One FEU equals two TEU in capacity.', category: 'trade' },
  { id: 'tr023', en: 'LCL', zh: '拼箱货', pos: 'abbr.', phonetic: '/ˌel siː ˈel/', example: 'For small shipments, LCL is more economical.', category: 'trade' },
  { id: 'tr024', en: 'FCL', zh: '整箱货', pos: 'abbr.', phonetic: '/ˌef siː ˈel/', example: 'FCL shipments offer better security and faster transit.', category: 'trade' },
  { id: 'tr025', en: 'Incoterms', zh: '国际贸易术语解释通则', pos: 'abbr.', phonetic: '/ˈɪnkəʊtɜːmz/', example: 'Incoterms 2020 define the responsibilities of buyers and sellers.', category: 'trade' },
  { id: 'tr026', en: 'WTO', zh: '世界贸易组织', pos: 'abbr.', phonetic: '/ˌdʌbəljuː tiː ˈəʊ/', example: 'China joined the WTO in 2001.', category: 'trade' },
  { id: 'tr027', en: 'IMF', zh: '国际货币基金组织', pos: 'abbr.', phonetic: '/ˌaɪ em ˈef/', example: 'The IMF provides financial assistance to member countries.', category: 'trade' },
  { id: 'tr028', en: 'GATT', zh: '关税及贸易总协定', pos: 'abbr.', phonetic: '/ɡæt/', example: 'GATT was the predecessor to the WTO.', category: 'trade' },
  { id: 'tr029', en: 'MFN', zh: '最惠国待遇', pos: 'abbr.', phonetic: '/ˌem ef ˈen/', example: 'MFN status grants equal tariff treatment among WTO members.', category: 'trade' },
  { id: 'tr030', en: 'GSP', zh: '普惠制', pos: 'abbr.', phonetic: '/ˌdʒiː es ˈpiː/', example: 'GSP allows duty-free entry for goods from developing countries.', category: 'trade' },
  { id: 'tr031', en: 'SITC', zh: '国际贸易标准分类', pos: 'abbr.', phonetic: '/ˌes aɪ tiː ˈsiː/', example: 'Products are classified under SITC codes for statistical purposes.', category: 'trade' },
  { id: 'tr032', en: 'trade', zh: '贸易', pos: 'n.', phonetic: '/treɪd/', example: 'International trade has grown rapidly in recent decades.', category: 'trade' },
  { id: 'tr033', en: 'export', zh: '出口', pos: 'n.', phonetic: '/ˈekspɔːrt/', example: 'Exports of electronic goods increased by 15% this year.', category: 'trade' },
  { id: 'tr034', en: 'import', zh: '进口', pos: 'n.', phonetic: '/ˈɪmpɔːrt/', example: 'The country relies heavily on imports of raw materials.', category: 'trade' },
  { id: 'tr035', en: 're-export', zh: '转口贸易', pos: 'n.', phonetic: '/ˌriː ɪkˈspɔːrt/', example: 'Hong Kong serves as a major re-export hub for mainland China.', category: 'trade' },
  { id: 'tr036', en: 'transit trade', zh: '过境贸易', pos: 'n.', phonetic: '/ˈtrænzɪt treɪd/', example: 'Transit trade passes through a third country en route to its final destination.', category: 'trade' },
  { id: 'tr037', en: 'barter trade', zh: '易货贸易', pos: 'n.', phonetic: '/ˈbɑːrtər treɪd/', example: 'Barter trade involves the exchange of goods without using currency.', category: 'trade' },
  { id: 'tr038', en: 'countertrade', zh: '对销贸易', pos: 'n.', phonetic: '/ˈkaʊntərtreɪd/', example: 'Countertrade is common in deals with developing economies.', category: 'trade' },
  { id: 'tr039', en: 'entrepot', zh: '转口港/货物集散地', pos: 'n.', phonetic: '/ˈɒntrəpəʊ/', example: 'Singapore has long served as an entrepot for Southeast Asian trade.', category: 'trade' },
  { id: 'tr040', en: 'visible trade', zh: '有形贸易', pos: 'n.', phonetic: '/ˈvɪzɪbəl treɪd/', example: 'Visible trade refers to the import and export of physical goods.', category: 'trade' },
  { id: 'tr041', en: 'invisible trade', zh: '无形贸易', pos: 'n.', phonetic: '/ɪnˈvɪzɪbəl treɪd/', example: 'Services such as tourism and banking are part of invisible trade.', category: 'trade' },
  { id: 'tr042', en: 'balance of trade', zh: '贸易差额', pos: 'n.', phonetic: '/ˈbæləns əv treɪd/', example: 'A positive balance of trade indicates more exports than imports.', category: 'trade' },
  { id: 'tr043', en: 'trade surplus', zh: '贸易顺差', pos: 'n.', phonetic: '/treɪd ˈsɜːrpləs/', example: 'Germany consistently runs a large trade surplus.', category: 'trade' },
  { id: 'tr044', en: 'trade deficit', zh: '贸易逆差', pos: 'n.', phonetic: '/treɪd ˈdefɪsɪt/', example: 'The trade deficit widened due to rising import costs.', category: 'trade' },
  { id: 'tr045', en: 'free trade', zh: '自由贸易', pos: 'n.', phonetic: '/friː treɪd/', example: 'Free trade agreements eliminate tariffs between member countries.', category: 'trade' },
  { id: 'tr046', en: 'free trade zone', zh: '自由贸易区', pos: 'n.', phonetic: '/friː treɪd zəʊn/', example: 'Goods stored in a free trade zone are exempt from customs duties.', category: 'trade' },
  { id: 'tr047', en: 'bonded warehouse', zh: '保税仓库', pos: 'n.', phonetic: '/ˈbɒndɪd ˈweəhaʊs/', example: 'Imported goods can be stored in a bonded warehouse without paying duty.', category: 'trade' },
  { id: 'tr048', en: 'protectionism', zh: '贸易保护主义', pos: 'n.', phonetic: '/prəˈtekʃənɪzəm/', example: 'Rising protectionism threatens global supply chains.', category: 'trade' },
  { id: 'tr049', en: 'trade barrier', zh: '贸易壁垒', pos: 'n.', phonetic: '/treɪd ˈbæriər/', example: 'Tariffs are the most common form of trade barrier.', category: 'trade' },
  { id: 'tr050', en: 'tariff barrier', zh: '关税壁垒', pos: 'n.', phonetic: '/ˈtærɪf ˈbæriər/', example: 'Tariff barriers protect domestic industries from foreign competition.', category: 'trade' },
  { id: 'tr051', en: 'non-tariff barrier', zh: '非关税壁垒', pos: 'n.', phonetic: '/nɒn ˈtærɪf ˈbæriər/', example: 'Quotas and licensing requirements are examples of non-tariff barriers.', category: 'trade' },
  { id: 'tr052', en: 'trade war', zh: '贸易战', pos: 'n.', phonetic: '/treɪd wɔːr/', example: 'The trade war between the two countries disrupted global markets.', category: 'trade' },
  { id: 'tr053', en: 'trade dispute', zh: '贸易争端', pos: 'n.', phonetic: '/treɪd dɪˈspjuːt/', example: 'The trade dispute was referred to the WTO for arbitration.', category: 'trade' },
  { id: 'tr054', en: 'trade sanctions', zh: '贸易制裁', pos: 'n.', phonetic: '/treɪd ˈsæŋkʃənz/', example: 'Trade sanctions were imposed in response to the political crisis.', category: 'trade' },
  { id: 'tr055', en: 'embargo', zh: '禁运', pos: 'n.', phonetic: '/ɪmˈbɑːrɡəʊ/', example: 'The UN imposed an arms embargo on the country.', category: 'trade' },
  { id: 'tr056', en: 'boycott', zh: '联合抵制', pos: 'n.', phonetic: '/ˈbɔɪkɒt/', example: 'Consumer groups called for a boycott of products from that supplier.', category: 'trade' },
  { id: 'tr057', en: 'dumping', zh: '倾销', pos: 'n.', phonetic: '/ˈdʌmpɪŋ/', example: 'The government launched an investigation into alleged dumping practices.', category: 'trade' },
  { id: 'tr058', en: 'anti-dumping', zh: '反倾销', pos: 'adj.', phonetic: '/ˌænti ˈdʌmpɪŋ/', example: 'Anti-dumping duties were imposed on imported steel.', category: 'trade' },
  { id: 'tr059', en: 'subsidy', zh: '补贴', pos: 'n.', phonetic: '/ˈsʌbsɪdi/', example: 'Export subsidies can distort international competition.', category: 'trade' },
  { id: 'tr060', en: 'countervailing duty', zh: '反补贴税', pos: 'n.', phonetic: '/ˈkaʊntərveɪlɪŋ ˈdjuːti/', example: 'Countervailing duties offset the effect of foreign government subsidies.', category: 'trade' },
  { id: 'tr061', en: 'safeguard measure', zh: '保障措施', pos: 'n.', phonetic: '/ˈseɪfɡɑːrd ˈmeʒər/', example: 'Safeguard measures were adopted to protect the domestic industry from a surge in imports.', category: 'trade' },
  { id: 'tr062', en: 'quota', zh: '配额', pos: 'n.', phonetic: '/ˈkwəʊtə/', example: 'The import quota for textiles has been reached for this year.', category: 'trade' },
  { id: 'tr063', en: 'voluntary export restraint', zh: '自愿出口限制', pos: 'n.', phonetic: '/ˈvɒləntəri ɪkˈspɔːrt rɪˈstreɪnt/', example: 'The country agreed to a voluntary export restraint on automobiles.', category: 'trade' },
  { id: 'tr064', en: 'import license', zh: '进口许可证', pos: 'n.', phonetic: '/ˈɪmpɔːrt ˈlaɪsəns/', example: 'An import license is required for controlled goods.', category: 'trade' },
  { id: 'tr065', en: 'export license', zh: '出口许可证', pos: 'n.', phonetic: '/ˈekspɔːrt ˈlaɪsəns/', example: 'Export licenses are mandatory for dual-use items.', category: 'trade' },
  { id: 'tr066', en: 'open account', zh: '赊账交易', pos: 'n.', phonetic: '/ˈəʊpən əˈkaʊnt/', example: 'Open account terms are offered only to long-standing, creditworthy customers.', category: 'trade' },
  { id: 'tr067', en: 'consignment', zh: '寄售', pos: 'n.', phonetic: '/kənˈsaɪnmənt/', example: 'The goods were shipped on consignment and payment is due after they are sold.', category: 'trade' },
  { id: 'tr068', en: 'exclusive sales', zh: '包销', pos: 'n.', phonetic: '/ɪkˈskluːsɪv seɪlz/', example: 'The distributor was granted exclusive sales rights for the region.', category: 'trade' },
  { id: 'tr069', en: 'agency', zh: '代理', pos: 'n.', phonetic: '/ˈeɪdʒənsi/', example: 'We operate in the region through a local agency.', category: 'trade' },
  { id: 'tr070', en: 'dealership', zh: '经销权', pos: 'n.', phonetic: '/ˈdiːlərʃɪp/', example: 'The company was awarded an exclusive dealership for luxury products.', category: 'trade' },
  { id: 'tr071', en: 'foreign direct investment', zh: '外国直接投资', pos: 'n.', phonetic: '/ˈfɒrɪn dɪˈrekt ɪnˈvestmənt/', example: 'Foreign direct investment in the manufacturing sector has increased sharply.', category: 'trade' },
  { id: 'tr072', en: 'multinational corporation', zh: '跨国公司', pos: 'n.', phonetic: '/ˌmʌltiˈnæʃnəl ˌkɔːrpəˈreɪʃən/', example: 'The multinational corporation has operations in over 50 countries.', category: 'trade' },
  { id: 'tr073', en: 'transnational company', zh: '跨国企业', pos: 'n.', phonetic: '/trænzˈnæʃnəl ˈkʌmpəni/', example: 'Transnational companies account for a large share of global trade.', category: 'trade' },
  { id: 'tr074', en: 'parent company', zh: '母公司', pos: 'n.', phonetic: '/ˈpeərənt ˈkʌmpəni/', example: 'The parent company consolidates financial results from all subsidiaries.', category: 'trade' },
  { id: 'tr075', en: 'subsidiary', zh: '子公司', pos: 'n.', phonetic: '/səbˈsɪdiəri/', example: 'The German subsidiary handles all European distribution.', category: 'trade' },
  { id: 'tr076', en: 'branch office', zh: '分公司/办事处', pos: 'n.', phonetic: '/bræntʃ ˈɒfɪs/', example: 'We established a branch office in Dubai to serve the Middle East market.', category: 'trade' },
  { id: 'tr077', en: 'representative office', zh: '代表处', pos: 'n.', phonetic: '/ˌreprɪˈzentətɪv ˈɒfɪs/', example: 'The representative office is not permitted to engage in direct sales.', category: 'trade' },
  { id: 'tr078', en: 'holding company', zh: '控股公司', pos: 'n.', phonetic: '/ˈhəʊldɪŋ ˈkʌmpəni/', example: 'The holding company owns controlling stakes in several operating entities.', category: 'trade' },
  { id: 'tr079', en: 'joint venture', zh: '合资企业', pos: 'n.', phonetic: '/dʒɔɪnt ˈventʃər/', example: 'A joint venture was formed with a local partner to enter the market.', category: 'trade' },
  { id: 'tr080', en: 'wholly foreign-owned enterprise', zh: '外商独资企业', pos: 'n.', phonetic: '/ˈhəʊli ˈfɒrɪn əʊnd ˈentəpraɪz/', example: 'A wholly foreign-owned enterprise gives the investor full management control.', category: 'trade' },
  { id: 'tr081', en: 'equity joint venture', zh: '股权式合资企业', pos: 'n.', phonetic: '/ˈekwɪti dʒɔɪnt ˈventʃər/', example: 'In an equity joint venture, profits are shared according to ownership ratio.', category: 'trade' },
  { id: 'tr082', en: 'cooperative joint venture', zh: '契约式合资企业', pos: 'n.', phonetic: '/kəʊˈɒpərətɪv dʒɔɪnt ˈventʃər/', example: 'A cooperative joint venture allows more flexible profit-sharing arrangements.', category: 'trade' },
  { id: 'tr083', en: 'turnkey project', zh: '交钥匙工程', pos: 'n.', phonetic: '/ˈtɜːrnkiː ˈprɒdʒekt/', example: 'The power plant was delivered as a turnkey project.', category: 'trade' },
  { id: 'tr084', en: 'compensation trade', zh: '补偿贸易', pos: 'n.', phonetic: '/ˌkɒmpenˈseɪʃən treɪd/', example: 'In compensation trade, imported equipment is paid for with goods it produces.', category: 'trade' },
  { id: 'tr085', en: 'processing trade', zh: '加工贸易', pos: 'n.', phonetic: '/ˈprəʊsesɪŋ treɪd/', example: 'Processing trade has been a key driver of China\'s export growth.', category: 'trade' },

  // ============================================================
  // B. 合同与法律 Contract & Legal (60+ words)
  // ============================================================
  { id: 'tr086', en: 'contract', zh: '合同', pos: 'n.', phonetic: '/ˈkɒntrækt/', example: 'Both parties signed the contract after final negotiations.', category: 'trade' },
  { id: 'tr087', en: 'purchase order', zh: '采购订单', pos: 'n.', phonetic: '/ˈpɜːrtʃɪs ˈɔːrdər/', example: 'A purchase order was issued for 5,000 units.', category: 'trade' },
  { id: 'tr088', en: 'sales confirmation', zh: '销售确认书', pos: 'n.', phonetic: '/seɪlz ˌkɒnfərˈmeɪʃən/', example: 'The sales confirmation outlines all agreed-upon terms.', category: 'trade' },
  { id: 'tr089', en: 'sales contract', zh: '销售合同', pos: 'n.', phonetic: '/seɪlz ˈkɒntrækt/', example: 'A formal sales contract replaced the earlier proforma invoice.', category: 'trade' },
  { id: 'tr090', en: 'agreement', zh: '协议', pos: 'n.', phonetic: '/əˈɡriːmənt/', example: 'A distribution agreement was concluded between the parties.', category: 'trade' },
  { id: 'tr091', en: 'framework agreement', zh: '框架协议', pos: 'n.', phonetic: '/ˈfreɪmwɜːrk əˈɡriːmənt/', example: 'The framework agreement sets out the general terms for future transactions.', category: 'trade' },
  { id: 'tr092', en: 'memorandum of understanding', zh: '谅解备忘录', pos: 'n.', phonetic: '/ˌmeməˈrændəm əv ˌʌndərˈstændɪŋ/', example: 'Both sides signed a memorandum of understanding to explore cooperation.', category: 'trade' },
  { id: 'tr093', en: 'letter of intent', zh: '意向书', pos: 'n.', phonetic: '/ˈletər əv ɪnˈtent/', example: 'A letter of intent was signed before the detailed contract negotiations.', category: 'trade' },
  { id: 'tr094', en: 'clause', zh: '条款', pos: 'n.', phonetic: '/klɔːz/', example: 'The force majeure clause covers natural disasters and political unrest.', category: 'trade' },
  { id: 'tr095', en: 'terms and conditions', zh: '条款与条件', pos: 'n.', phonetic: '/tɜːrmz ən kənˈdɪʃənz/', example: 'Please read the terms and conditions carefully before signing.', category: 'trade' },
  { id: 'tr096', en: 'provision', zh: '规定', pos: 'n.', phonetic: '/prəˈvɪʒən/', example: 'This provision allows either party to terminate with 30 days notice.', category: 'trade' },
  { id: 'tr097', en: 'stipulation', zh: '约定/规定', pos: 'n.', phonetic: '/ˌstɪpjuˈleɪʃən/', example: 'The contract includes a stipulation regarding quality standards.', category: 'trade' },
  { id: 'tr098', en: 'breach of contract', zh: '违约', pos: 'n.', phonetic: '/briːtʃ əv ˈkɒntrækt/', example: 'Failure to deliver on time constitutes a breach of contract.', category: 'trade' },
  { id: 'tr099', en: 'default', zh: '违约/拖欠', pos: 'n.', phonetic: '/dɪˈfɔːlt/', example: 'The buyer was in default after missing two consecutive payments.', category: 'trade' },
  { id: 'tr100', en: 'remedy', zh: '补救措施', pos: 'n.', phonetic: '/ˈremədi/', example: 'The contract specifies remedies available in case of breach.', category: 'trade' },
  { id: 'tr101', en: 'damages', zh: '损害赔偿金', pos: 'n.', phonetic: '/ˈdæmɪdʒɪz/', example: 'The seller sought damages for the buyer\'s wrongful termination.', category: 'trade' },
  { id: 'tr102', en: 'liquidated damages', zh: '约定赔偿金', pos: 'n.', phonetic: '/ˈlɪkwɪdeɪtɪd ˈdæmɪdʒɪz/', example: 'Liquidated damages of 0.1% per day apply for late delivery.', category: 'trade' },
  { id: 'tr103', en: 'penalty', zh: '罚金', pos: 'n.', phonetic: '/ˈpenəlti/', example: 'A penalty clause imposes a fine for delayed performance.', category: 'trade' },
  { id: 'tr104', en: 'indemnity', zh: '赔偿/补偿', pos: 'n.', phonetic: '/ɪnˈdemnɪti/', example: 'The supplier agreed to provide indemnity against third-party claims.', category: 'trade' },
  { id: 'tr105', en: 'indemnification', zh: '赔偿保障', pos: 'n.', phonetic: '/ɪnˌdemnɪfɪˈkeɪʃən/', example: 'The indemnification clause protects the buyer from patent infringement claims.', category: 'trade' },
  { id: 'tr106', en: 'liability', zh: '责任', pos: 'n.', phonetic: '/ˌlaɪəˈbɪlɪti/', example: 'The seller\'s liability is limited to the value of the goods supplied.', category: 'trade' },
  { id: 'tr107', en: 'limited liability', zh: '有限责任', pos: 'n.', phonetic: '/ˈlɪmɪtɪd ˌlaɪəˈbɪlɪti/', example: 'Limited liability protects shareholders from personal financial exposure.', category: 'trade' },
  { id: 'tr108', en: 'warranty', zh: '保证/保修', pos: 'n.', phonetic: '/ˈwɒrənti/', example: 'The product comes with a two-year warranty against manufacturing defects.', category: 'trade' },
  { id: 'tr109', en: 'guarantee', zh: '担保/保证', pos: 'n.', phonetic: '/ˌɡærənˈtiː/', example: 'A bank guarantee secures the performance of the contract.', category: 'trade' },
  { id: 'tr110', en: 'force majeure', zh: '不可抗力', pos: 'n.', phonetic: '/ˌfɔːrs mæˈʒɜːr/', example: 'The supplier invoked force majeure after the earthquake disrupted production.', category: 'trade' },
  { id: 'tr111', en: 'arbitration', zh: '仲裁', pos: 'n.', phonetic: '/ˌɑːrbɪˈtreɪʃən/', example: 'Any dispute shall be resolved by arbitration in Hong Kong.', category: 'trade' },
  { id: 'tr112', en: 'arbitration clause', zh: '仲裁条款', pos: 'n.', phonetic: '/ˌɑːrbɪˈtreɪʃən klɔːz/', example: 'The arbitration clause designates the ICC as the administering body.', category: 'trade' },
  { id: 'tr113', en: 'arbitral award', zh: '仲裁裁决', pos: 'n.', phonetic: '/ˈɑːrbɪtrəl əˈwɔːrd/', example: 'The arbitral award is final and binding on both parties.', category: 'trade' },
  { id: 'tr114', en: 'jurisdiction', zh: '管辖权/司法管辖', pos: 'n.', phonetic: '/ˌdʒʊərɪsˈdɪkʃən/', example: 'The contract specifies English law as the governing jurisdiction.', category: 'trade' },
  { id: 'tr115', en: 'governing law', zh: '适用法律', pos: 'n.', phonetic: '/ˈɡʌvərnɪŋ lɔː/', example: 'The governing law for this agreement is the laws of Switzerland.', category: 'trade' },
  { id: 'tr116', en: 'dispute resolution', zh: '争议解决', pos: 'n.', phonetic: '/dɪˈspjuːt ˌrezəˈluːʃən/', example: 'The parties agreed to mediation as the first step in dispute resolution.', category: 'trade' },
  { id: 'tr117', en: 'mediation', zh: '调解', pos: 'n.', phonetic: '/ˌmiːdiˈeɪʃən/', example: 'A neutral third party facilitated the mediation between the two companies.', category: 'trade' },
  { id: 'tr118', en: 'litigation', zh: '诉讼', pos: 'n.', phonetic: '/ˌlɪtɪˈɡeɪʃən/', example: 'Both sides wish to avoid costly litigation.', category: 'trade' },
  { id: 'tr119', en: 'settlement', zh: '和解/结算', pos: 'n.', phonetic: '/ˈsetəlmənt/', example: 'An out-of-court settlement was reached after weeks of negotiation.', category: 'trade' },
  { id: 'tr120', en: 'conciliation', zh: '和解/调停', pos: 'n.', phonetic: '/kənˌsɪliˈeɪʃən/', example: 'Conciliation offers a less formal alternative to arbitration.', category: 'trade' },
  { id: 'tr121', en: 'intellectual property', zh: '知识产权', pos: 'n.', phonetic: '/ˌɪntɪˈlektʃuəl ˈprɒpərti/', example: 'Intellectual property rights must be respected in international trade.', category: 'trade' },
  { id: 'tr122', en: 'patent', zh: '专利', pos: 'n.', phonetic: '/ˈpætənt/', example: 'The company holds multiple patents for its innovative technology.', category: 'trade' },
  { id: 'tr123', en: 'trademark', zh: '商标', pos: 'n.', phonetic: '/ˈtreɪdmɑːrk/', example: 'The trademark is registered in over 100 countries.', category: 'trade' },
  { id: 'tr124', en: 'copyright', zh: '版权/著作权', pos: 'n.', phonetic: '/ˈkɒpiraɪt/', example: 'Copyright protection extends to software and design documentation.', category: 'trade' },
  { id: 'tr125', en: 'trade secret', zh: '商业秘密', pos: 'n.', phonetic: '/treɪd ˈsiːkrɪt/', example: 'The formula is protected as a trade secret and never disclosed.', category: 'trade' },
  { id: 'tr126', en: 'infringement', zh: '侵权', pos: 'n.', phonetic: '/ɪnˈfrɪndʒmənt/', example: 'The company filed a lawsuit for patent infringement.', category: 'trade' },
  { id: 'tr127', en: 'counterfeit', zh: '假冒/伪造', pos: 'adj.', phonetic: '/ˈkaʊntərfɪt/', example: 'Customs seized a large shipment of counterfeit luxury goods.', category: 'trade' },
  { id: 'tr128', en: 'confidentiality', zh: '保密', pos: 'n.', phonetic: '/ˌkɒnfɪˌdenʃiˈælɪti/', example: 'A confidentiality clause prohibits disclosure of business secrets.', category: 'trade' },
  { id: 'tr129', en: 'non-disclosure agreement', zh: '保密协议', pos: 'n.', phonetic: '/nɒn dɪsˈkləʊʒər əˈɡriːmənt/', example: 'Both parties signed a non-disclosure agreement before the discussions.', category: 'trade' },
  { id: 'tr130', en: 'non-compete clause', zh: '竞业禁止条款', pos: 'n.', phonetic: '/nɒn kəmˈpiːt klɔːz/', example: 'The non-compete clause restricts the distributor from selling rival products.', category: 'trade' },
  { id: 'tr131', en: 'termination', zh: '终止', pos: 'n.', phonetic: '/ˌtɜːrmɪˈneɪʃən/', example: 'Either party may give 60 days written notice of termination.', category: 'trade' },
  { id: 'tr132', en: 'renewal', zh: '续约', pos: 'n.', phonetic: '/rɪˈnjuːəl/', example: 'The contract is subject to automatic renewal unless notice is given.', category: 'trade' },
  { id: 'tr133', en: 'amendment', zh: '修改/修订', pos: 'n.', phonetic: '/əˈmendmənt/', example: 'Any amendment to the contract must be made in writing.', category: 'trade' },
  { id: 'tr134', en: 'annex', zh: '附件', pos: 'n.', phonetic: '/ˈæneks/', example: 'Technical specifications are detailed in Annex A.', category: 'trade' },
  { id: 'tr135', en: 'appendix', zh: '附录', pos: 'n.', phonetic: '/əˈpendɪks/', example: 'The price list is contained in Appendix I.', category: 'trade' },
  { id: 'tr136', en: 'addendum', zh: '补遗/附录', pos: 'n.', phonetic: '/əˈdendəm/', example: 'An addendum was issued to update the delivery schedule.', category: 'trade' },
  { id: 'tr137', en: 'signatory', zh: '签署方', pos: 'n.', phonetic: '/ˈsɪɡnətəri/', example: 'Each signatory must retain a copy of the executed agreement.', category: 'trade' },
  { id: 'tr138', en: 'notarization', zh: '公证', pos: 'n.', phonetic: '/ˌnəʊtəraɪˈzeɪʃən/', example: 'The documents require notarization before they can be used abroad.', category: 'trade' },
  { id: 'tr139', en: 'legalization', zh: '认证/合法化', pos: 'n.', phonetic: '/ˌliːɡəlaɪˈzeɪʃən/', example: 'The certificate must undergo legalization at the embassy.', category: 'trade' },
  { id: 'tr140', en: 'power of attorney', zh: '授权委托书', pos: 'n.', phonetic: '/ˈpaʊər əv əˈtɜːrni/', example: 'A power of attorney was issued to the local representative.', category: 'trade' },
  { id: 'tr141', en: 'null and void', zh: '无效的', pos: 'adj.', phonetic: '/nʌl ən vɔɪd/', example: 'The contract was declared null and void due to misrepresentation.', category: 'trade' },
  { id: 'tr142', en: 'severability', zh: '可分割性', pos: 'n.', phonetic: '/ˌsevərəˈbɪlɪti/', example: 'A severability clause ensures the rest of the contract remains valid even if one provision is struck down.', category: 'trade' },
  { id: 'tr143', en: 'waiver', zh: '弃权/豁免', pos: 'n.', phonetic: '/ˈweɪvər/', example: 'A delay in enforcing a right does not constitute a waiver of that right.', category: 'trade' },
  { id: 'tr144', en: 'assignment', zh: '转让', pos: 'n.', phonetic: '/əˈsaɪnmənt/', example: 'Neither party may make an assignment of this agreement without consent.', category: 'trade' },

  // ============================================================
  // C. 物流与运输 Logistics & Shipping (80+ words)
  // ============================================================
  { id: 'tr145', en: 'logistics', zh: '物流', pos: 'n.', phonetic: '/ləˈdʒɪstɪks/', example: 'Efficient logistics are essential for international trade.', category: 'trade' },
  { id: 'tr146', en: 'supply chain', zh: '供应链', pos: 'n.', phonetic: '/səˈplaɪ tʃeɪn/', example: 'The pandemic exposed vulnerabilities in global supply chains.', category: 'trade' },
  { id: 'tr147', en: 'supply chain management', zh: '供应链管理', pos: 'n.', phonetic: '/səˈplaɪ tʃeɪn ˈmænɪdʒmənt/', example: 'Effective supply chain management reduces costs and improves reliability.', category: 'trade' },
  { id: 'tr148', en: 'shipping', zh: '运输/航运', pos: 'n.', phonetic: '/ˈʃɪpɪŋ/', example: 'Shipping costs have risen sharply this quarter.', category: 'trade' },
  { id: 'tr149', en: 'freight', zh: '运费/货物', pos: 'n.', phonetic: '/freɪt/', example: 'The freight charges for air shipment are significantly higher.', category: 'trade' },
  { id: 'tr150', en: 'freight forwarder', zh: '货运代理', pos: 'n.', phonetic: '/freɪt ˈfɔːrwərdər/', example: 'Our freight forwarder handles all customs clearance and documentation.', category: 'trade' },
  { id: 'tr151', en: 'forwarder', zh: '货运代理/转运商', pos: 'n.', phonetic: '/ˈfɔːrwərdər/', example: 'We appointed a local forwarder to manage door-to-door delivery.', category: 'trade' },
  { id: 'tr152', en: 'carrier', zh: '承运人', pos: 'n.', phonetic: '/ˈkæriər/', example: 'The carrier is responsible for the safe transport of the goods.', category: 'trade' },
  { id: 'tr153', en: 'shipping line', zh: '航运公司', pos: 'n.', phonetic: '/ˈʃɪpɪŋ laɪn/', example: 'Maersk is one of the world\'s largest shipping lines.', category: 'trade' },
  { id: 'tr154', en: 'shipping agent', zh: '船务代理', pos: 'n.', phonetic: '/ˈʃɪpɪŋ ˈeɪdʒənt/', example: 'The shipping agent arranged berthing and stevedoring services.', category: 'trade' },
  { id: 'tr155', en: 'consignor', zh: '发货人/托运人', pos: 'n.', phonetic: '/kənˈsaɪnər/', example: 'The consignor is responsible for accurate documentation.', category: 'trade' },
  { id: 'tr156', en: 'consignee', zh: '收货人', pos: 'n.', phonetic: '/ˌkɒnsaɪˈniː/', example: 'The consignee must be present to take delivery of the cargo.', category: 'trade' },
  { id: 'tr157', en: 'notify party', zh: '通知方', pos: 'n.', phonetic: '/ˈnəʊtɪfaɪ ˈpɑːrti/', example: 'The notify party is informed when the goods arrive at the port.', category: 'trade' },
  { id: 'tr158', en: 'shipper', zh: '托运人/发货人', pos: 'n.', phonetic: '/ˈʃɪpər/', example: 'The shipper packed and labeled the goods according to the contract.', category: 'trade' },
  { id: 'tr159', en: 'vessel', zh: '船舶', pos: 'n.', phonetic: '/ˈvesəl/', example: 'The vessel is scheduled to depart on July 20th.', category: 'trade' },
  { id: 'tr160', en: 'voyage', zh: '航次/航行', pos: 'n.', phonetic: '/ˈvɔɪɪdʒ/', example: 'The voyage from Shanghai to Rotterdam takes about 30 days.', category: 'trade' },
  { id: 'tr161', en: 'container', zh: '集装箱', pos: 'n.', phonetic: '/kənˈteɪnər/', example: 'All goods are packed into a 40-foot container.', category: 'trade' },
  { id: 'tr162', en: 'container yard', zh: '集装箱堆场', pos: 'n.', phonetic: '/kənˈteɪnər jɑːrd/', example: 'Empty containers are stored at the container yard before repositioning.', category: 'trade' },
  { id: 'tr163', en: 'container freight station', zh: '集装箱货运站', pos: 'n.', phonetic: '/kənˈteɪnər freɪt ˈsteɪʃən/', example: 'LCL shipments are consolidated at the container freight station.', category: 'trade' },
  { id: 'tr164', en: 'pallet', zh: '托盘', pos: 'n.', phonetic: '/ˈpælɪt/', example: 'Cartons are stacked on pallets for easy handling.', category: 'trade' },
  { id: 'tr165', en: 'palletization', zh: '托盘化包装', pos: 'n.', phonetic: '/ˌpælɪtaɪˈzeɪʃən/', example: 'Palletization reduces loading time and minimizes damage.', category: 'trade' },
  { id: 'tr166', en: 'warehouse', zh: '仓库', pos: 'n.', phonetic: '/ˈweəhaʊs/', example: 'Finished goods are stored in our central warehouse before shipment.', category: 'trade' },
  { id: 'tr167', en: 'warehousing', zh: '仓储', pos: 'n.', phonetic: '/ˈweəhaʊzɪŋ/', example: 'Third-party warehousing reduces the need for capital investment.', category: 'trade' },
  { id: 'tr168', en: 'inventory', zh: '库存', pos: 'n.', phonetic: '/ˈɪnvəntəri/', example: 'We keep sufficient inventory to cover two months of demand.', category: 'trade' },
  { id: 'tr169', en: 'stock', zh: '存货/库存', pos: 'n.', phonetic: '/stɒk/', example: 'This item is currently out of stock but will be replenished next week.', category: 'trade' },
  { id: 'tr170', en: 'buffer stock', zh: '缓冲库存/安全库存', pos: 'n.', phonetic: '/ˈbʌfər stɒk/', example: 'Buffer stock is maintained to absorb unexpected demand fluctuations.', category: 'trade' },
  { id: 'tr171', en: 'port of loading', zh: '装运港', pos: 'n.', phonetic: '/pɔːrt əv ˈləʊdɪŋ/', example: 'The port of loading is Ningbo, China.', category: 'trade' },
  { id: 'tr172', en: 'port of discharge', zh: '卸货港', pos: 'n.', phonetic: '/pɔːrt əv dɪsˈtʃɑːrdʒ/', example: 'The port of discharge is Los Angeles, USA.', category: 'trade' },
  { id: 'tr173', en: 'port of destination', zh: '目的港', pos: 'n.', phonetic: '/pɔːrt əv ˌdestɪˈneɪʃən/', example: 'Cargo will be transshipped en route to the port of destination.', category: 'trade' },
  { id: 'tr174', en: 'transshipment', zh: '转运/转船', pos: 'n.', phonetic: '/trænsˈʃɪpmənt/', example: 'Transshipment in Singapore adds three days to the total transit time.', category: 'trade' },
  { id: 'tr175', en: 'transshipment port', zh: '中转港', pos: 'n.', phonetic: '/trænsˈʃɪpmənt pɔːrt/', example: 'Singapore is a major transshipment port in Asia.', category: 'trade' },
  { id: 'tr176', en: 'demurrage', zh: '滞期费(港口)', pos: 'n.', phonetic: '/dɪˈmʌrɪdʒ/', example: 'Demurrage charges accrue if the container is not returned on time.', category: 'trade' },
  { id: 'tr177', en: 'detention', zh: '滞箱费(场外)', pos: 'n.', phonetic: '/dɪˈtenʃən/', example: 'Detention fees apply when containers are kept beyond the free period.', category: 'trade' },
  { id: 'tr178', en: 'free time', zh: '免费期/免箱期', pos: 'n.', phonetic: '/friː taɪm/', example: 'The carrier offers seven days of free time at the destination port.', category: 'trade' },
  { id: 'tr179', en: 'laytime', zh: '装卸时间', pos: 'n.', phonetic: '/ˈleɪtaɪm/', example: 'Laytime commences when the vessel arrives at the berth.', category: 'trade' },
  { id: 'tr180', en: 'loading', zh: '装货', pos: 'n.', phonetic: '/ˈləʊdɪŋ/', example: 'Loading was completed within 48 hours.', category: 'trade' },
  { id: 'tr181', en: 'unloading', zh: '卸货', pos: 'n.', phonetic: '/ʌnˈləʊdɪŋ/', example: 'Unloading was delayed due to congestion at the terminal.', category: 'trade' },
  { id: 'tr182', en: 'stevedoring', zh: '装卸作业/码头搬运', pos: 'n.', phonetic: '/ˈstiːvɪdɔːrɪŋ/', example: 'Stevedoring is handled by the port operator.', category: 'trade' },
  { id: 'tr183', en: 'bulk cargo', zh: '散装货', pos: 'n.', phonetic: '/bʌlk ˈkɑːrɡəʊ/', example: 'Coal and iron ore are typically transported as bulk cargo.', category: 'trade' },
  { id: 'tr184', en: 'breakbulk cargo', zh: '件杂货', pos: 'n.', phonetic: '/ˈbreɪkbʌlk ˈkɑːrɡəʊ/', example: 'Steel pipes are shipped as breakbulk cargo rather than containerized.', category: 'trade' },
  { id: 'tr185', en: 'dangerous goods', zh: '危险品', pos: 'n.', phonetic: '/ˈdeɪndʒərəs ɡʊdz/', example: 'Dangerous goods must be declared and packed according to IMO regulations.', category: 'trade' },
  { id: 'tr186', en: 'hazardous material', zh: '危险物质', pos: 'n.', phonetic: '/ˈhæzərdəs məˈtɪəriəl/', example: 'A hazardous material declaration must accompany the shipping documents.', category: 'trade' },
  { id: 'tr187', en: 'reefer container', zh: '冷藏集装箱', pos: 'n.', phonetic: '/ˈriːfər kənˈteɪnər/', example: 'Perishable foods are shipped in reefer containers.', category: 'trade' },
  { id: 'tr188', en: 'dry cargo', zh: '干货', pos: 'n.', phonetic: '/draɪ ˈkɑːrɡəʊ/', example: 'Textiles are classified as dry cargo and shipped in standard containers.', category: 'trade' },
  { id: 'tr189', en: 'tank container', zh: '罐式集装箱', pos: 'n.', phonetic: '/tæŋk kənˈteɪnər/', example: 'Chemicals are transported in specially designed tank containers.', category: 'trade' },
  { id: 'tr190', en: 'open-top container', zh: '开顶集装箱', pos: 'n.', phonetic: '/ˈəʊpən tɒp kənˈteɪnər/', example: 'Oversized machinery is loaded into an open-top container.', category: 'trade' },
  { id: 'tr191', en: 'flat rack container', zh: '框架集装箱', pos: 'n.', phonetic: '/flæt ræk kənˈteɪnər/', example: 'Heavy equipment is shipped on a flat rack container.', category: 'trade' },
  { id: 'tr192', en: 'consolidation', zh: '拼箱/集货', pos: 'n.', phonetic: '/kənˌsɒlɪˈdeɪʃən/', example: 'The forwarder handles consolidation of LCL shipments.', category: 'trade' },
  { id: 'tr193', en: 'deconsolidation', zh: '拆箱/分拨', pos: 'n.', phonetic: '/ˌdiːkənsɒlɪˈdeɪʃən/', example: 'Deconsolidation takes place at the destination warehouse.', category: 'trade' },
  { id: 'tr194', en: 'multimodal transport', zh: '多式联运', pos: 'n.', phonetic: '/ˌmʌltiˈməʊdəl ˈtrænspɔːrt/', example: 'Multimodal transport combines road, rail, and sea under one contract.', category: 'trade' },
  { id: 'tr195', en: 'intermodal transport', zh: '多式联运/联运', pos: 'n.', phonetic: '/ˌɪntərˈməʊdəl ˈtrænspɔːrt/', example: 'Intermodal transport uses standardized containers across different modes.', category: 'trade' },
  { id: 'tr196', en: 'door-to-door', zh: '门到门运输', pos: 'adj.', phonetic: '/dɔːr tə dɔːr/', example: 'The logistics provider offers door-to-door service from factory to warehouse.', category: 'trade' },
  { id: 'tr197', en: 'door-to-port', zh: '门到港运输', pos: 'adj.', phonetic: '/dɔːr tə pɔːrt/', example: 'We handle the door-to-port leg and the buyer arranges the ocean freight.', category: 'trade' },
  { id: 'tr198', en: 'inland transportation', zh: '内陆运输', pos: 'n.', phonetic: '/ˈɪnlænd ˌtrænspɔːrˈteɪʃən/', example: 'Inland transportation from the factory to the port takes two days.', category: 'trade' },
  { id: 'tr199', en: 'drayage', zh: '短途拖运(港口到内陆)', pos: 'n.', phonetic: '/ˈdreɪɪdʒ/', example: 'Drayage costs have risen due to driver shortages.', category: 'trade' },
  { id: 'tr200', en: 'manifest', zh: '舱单/载货清单', pos: 'n.', phonetic: '/ˈmænɪfest/', example: 'The cargo manifest lists all items aboard the vessel.', category: 'trade' },
  { id: 'tr201', en: 'cargo', zh: '货物', pos: 'n.', phonetic: '/ˈkɑːrɡəʊ/', example: 'The cargo is insured against all risks during transit.', category: 'trade' },
  { id: 'tr202', en: 'cargo hold', zh: '货舱', pos: 'n.', phonetic: '/ˈkɑːrɡəʊ həʊld/', example: 'The cargo hold was inspected before loading commenced.', category: 'trade' },
  { id: 'tr203', en: 'air freight', zh: '空运', pos: 'n.', phonetic: '/eər freɪt/', example: 'Air freight is faster but more expensive than sea freight.', category: 'trade' },
  { id: 'tr204', en: 'ocean freight', zh: '海运', pos: 'n.', phonetic: '/ˈəʊʃən freɪt/', example: 'Ocean freight remains the most economical option for bulk shipments.', category: 'trade' },
  { id: 'tr205', en: 'rail freight', zh: '铁路运输', pos: 'n.', phonetic: '/reɪl freɪt/', example: 'Rail freight between China and Europe takes about 18 days.', category: 'trade' },
  { id: 'tr206', en: 'road transport', zh: '公路运输', pos: 'n.', phonetic: '/rəʊd ˈtrænspɔːrt/', example: 'Road transport is essential for last-mile delivery.', category: 'trade' },
  { id: 'tr207', en: 'bill of lading', zh: '提单', pos: 'n.', phonetic: '/bɪl əv ˈleɪdɪŋ/', example: 'The original bill of lading must be presented to claim the goods.', category: 'trade' },
  { id: 'tr208', en: 'clean bill of lading', zh: '清洁提单', pos: 'n.', phonetic: '/kliːn bɪl əv ˈleɪdɪŋ/', example: 'A clean bill of lading confirms the goods were received in good condition.', category: 'trade' },
  { id: 'tr209', en: 'claused bill of lading', zh: '不清洁提单', pos: 'n.', phonetic: '/klɔːzd bɪl əv ˈleɪdɪŋ/', example: 'A claused bill of lading may cause problems with the letter of credit.', category: 'trade' },
  { id: 'tr210', en: 'on-board bill of lading', zh: '已装船提单', pos: 'n.', phonetic: '/ɒn bɔːrd bɪl əv ˈleɪdɪŋ/', example: 'The bank requires an on-board bill of lading for negotiation.', category: 'trade' },
  { id: 'tr211', en: 'negotiable bill of lading', zh: '可转让提单', pos: 'n.', phonetic: '/nɪˈɡəʊʃiəbəl bɪl əv ˈleɪdɪŋ/', example: 'A negotiable bill of lading allows the holder to transfer title to the goods.', category: 'trade' },
  { id: 'tr212', en: 'airway bill', zh: '空运单', pos: 'n.', phonetic: '/ˈeəweɪ bɪl/', example: 'The airway bill number is used to track the shipment online.', category: 'trade' },
  { id: 'tr213', en: 'seaway bill', zh: '海运单', pos: 'n.', phonetic: '/ˈsiːweɪ bɪl/', example: 'A seaway bill is a non-negotiable transport document.', category: 'trade' },
  { id: 'tr214', en: 'mate\'s receipt', zh: '大副收据', pos: 'n.', phonetic: '/meɪts rɪˈsiːt/', example: 'The mate\'s receipt is exchanged for the bill of lading after loading.', category: 'trade' },
  { id: 'tr215', en: 'delivery order', zh: '提货单', pos: 'n.', phonetic: '/dɪˈlɪvəri ˈɔːrdər/', example: 'The consignee presents the delivery order to collect the goods.', category: 'trade' },
  { id: 'tr216', en: 'charter party', zh: '租船合同', pos: 'n.', phonetic: '/ˈtʃɑːrtər ˈpɑːrti/', example: 'A voyage charter party was signed for the bulk shipment.', category: 'trade' },
  { id: 'tr217', en: 'liner', zh: '班轮', pos: 'n.', phonetic: '/ˈlaɪnər/', example: 'Liner services operate on fixed schedules and routes.', category: 'trade' },
  { id: 'tr218', en: 'tramp vessel', zh: '不定期船/租船', pos: 'n.', phonetic: '/træmp ˈvesəl/', example: 'Tramp vessels are hired on a voyage or time charter basis.', category: 'trade' },
  { id: 'tr219', en: 'terminal', zh: '码头/场站', pos: 'n.', phonetic: '/ˈtɜːrmɪnəl/', example: 'The container terminal handles over two million TEU annually.', category: 'trade' },
  { id: 'tr220', en: 'terminal handling charge', zh: '码头操作费', pos: 'n.', phonetic: '/ˈtɜːrmɪnəl ˈhændlɪŋ tʃɑːrdʒ/', example: 'Terminal handling charges are included in the freight rate.', category: 'trade' },
  { id: 'tr221', en: 'bunker adjustment factor', zh: '燃油附加费调整系数', pos: 'n.', phonetic: '/ˈbʌŋkər əˈdʒʌstmənt ˈfæktər/', example: 'The bunker adjustment factor fluctuates with fuel prices.', category: 'trade' },
  { id: 'tr222', en: 'peak season surcharge', zh: '旺季附加费', pos: 'n.', phonetic: '/piːk ˈsiːzən ˈsɜːrtʃɑːrdʒ/', example: 'A peak season surcharge applies for shipments from August to October.', category: 'trade' },
  { id: 'tr223', en: 'general average', zh: '共同海损', pos: 'n.', phonetic: '/ˈdʒenərəl ˈævərɪdʒ/', example: 'General average was declared after the vessel encountered a severe storm.', category: 'trade' },

  // ============================================================
  // D. 支付与金融 Payment & Finance (70+ words)
  // ============================================================
  { id: 'tr224', en: 'payment', zh: '付款/支付', pos: 'n.', phonetic: '/ˈpeɪmənt/', example: 'Payment is due within 30 days of the invoice date.', category: 'trade' },
  { id: 'tr225', en: 'payment terms', zh: '付款条件', pos: 'n.', phonetic: '/ˈpeɪmənt tɜːrmz/', example: 'Standard payment terms are net 30 days.', category: 'trade' },
  { id: 'tr226', en: 'remittance', zh: '汇款', pos: 'n.', phonetic: '/rɪˈmɪtəns/', example: 'A remittance of USD 50,000 was received this morning.', category: 'trade' },
  { id: 'tr227', en: 'telegraphic transfer', zh: '电汇', pos: 'n.', phonetic: '/ˌtelɪˈɡræfɪk ˈtrænsfɜːr/', example: 'Telegraphic transfer is the fastest method of international payment.', category: 'trade' },
  { id: 'tr228', en: 'wire transfer', zh: '电子转账/电汇', pos: 'n.', phonetic: '/ˈwaɪər ˈtrænsfɜːr/', example: 'Payment was made by wire transfer directly to our account.', category: 'trade' },
  { id: 'tr229', en: 'SWIFT', zh: '环球银行金融电信协会', pos: 'abbr.', phonetic: '/swɪft/', example: 'International payments are processed through the SWIFT network.', category: 'trade' },
  { id: 'tr230', en: 'IBAN', zh: '国际银行账户号码', pos: 'abbr.', phonetic: '/ˈaɪbæn/', example: 'Please provide the IBAN for the beneficiary account.', category: 'trade' },
  { id: 'tr231', en: 'letter of credit', zh: '信用证', pos: 'n.', phonetic: '/ˈletər əv ˈkredɪt/', example: 'An irrevocable letter of credit is required for this transaction.', category: 'trade' },
  { id: 'tr232', en: 'irrevocable L/C', zh: '不可撤销信用证', pos: 'n.', phonetic: '/ɪˈrevəkəbəl ˈletər əv ˈkredɪt/', example: 'An irrevocable L/C cannot be amended or cancelled without all parties\' consent.', category: 'trade' },
  { id: 'tr233', en: 'revocable L/C', zh: '可撤销信用证', pos: 'n.', phonetic: '/ˈrevəkəbəl ˈletər əv ˈkredɪt/', example: 'A revocable L/C offers less security to the beneficiary.', category: 'trade' },
  { id: 'tr234', en: 'confirmed L/C', zh: '保兑信用证', pos: 'n.', phonetic: '/kənˈfɜːrmd ˈletər əv ˈkredɪt/', example: 'A confirmed L/C adds a second bank\'s guarantee of payment.', category: 'trade' },
  { id: 'tr235', en: 'unconfirmed L/C', zh: '不保兑信用证', pos: 'n.', phonetic: '/ˌʌnkənˈfɜːrmd ˈletər əv ˈkredɪt/', example: 'An unconfirmed L/C relies solely on the issuing bank\'s credit.', category: 'trade' },
  { id: 'tr236', en: 'at sight L/C', zh: '即期信用证', pos: 'n.', phonetic: '/æt saɪt ˈletər əv ˈkredɪt/', example: 'Payment under an at sight L/C is made immediately upon presentation of documents.', category: 'trade' },
  { id: 'tr237', en: 'usance L/C', zh: '远期信用证', pos: 'n.', phonetic: '/ˈjuːzəns ˈletər əv ˈkredɪt/', example: 'A usance L/C allows the buyer 90 days to make payment.', category: 'trade' },
  { id: 'tr238', en: 'back-to-back L/C', zh: '背对背信用证', pos: 'n.', phonetic: '/bæk tə bæk ˈletər əv ˈkredɪt/', example: 'A back-to-back L/C is used when an intermediary buys from a supplier.', category: 'trade' },
  { id: 'tr239', en: 'transferable L/C', zh: '可转让信用证', pos: 'n.', phonetic: '/trænsˈfɜːrəbəl ˈletər əv ˈkredɪt/', example: 'A transferable L/C allows the beneficiary to transfer all or part of the credit to a second beneficiary.', category: 'trade' },
  { id: 'tr240', en: 'revolving L/C', zh: '循环信用证', pos: 'n.', phonetic: '/rɪˈvɒlvɪŋ ˈletər əv ˈkredɪt/', example: 'A revolving L/C is suitable for regular shipments over a long period.', category: 'trade' },
  { id: 'tr241', en: 'standby L/C', zh: '备用信用证', pos: 'n.', phonetic: '/ˈstændbaɪ ˈletər əv ˈkredɪt/', example: 'A standby L/C serves as a guarantee of the applicant\'s performance.', category: 'trade' },
  { id: 'tr242', en: 'draft', zh: '汇票', pos: 'n.', phonetic: '/dræft/', example: 'A draft for the full amount was drawn on the buyer\'s bank.', category: 'trade' },
  { id: 'tr243', en: 'bill of exchange', zh: '汇票', pos: 'n.', phonetic: '/bɪl əv ɪksˈtʃeɪndʒ/', example: 'The bill of exchange must be accepted by the drawee before the goods are released.', category: 'trade' },
  { id: 'tr244', en: 'promissory note', zh: '本票', pos: 'n.', phonetic: '/ˈprɒmɪsəri nəʊt/', example: 'A promissory note is a written promise to pay a specified sum.', category: 'trade' },
  { id: 'tr245', en: 'sight draft', zh: '即期汇票', pos: 'n.', phonetic: '/saɪt dræft/', example: 'A sight draft is payable upon presentation.', category: 'trade' },
  { id: 'tr246', en: 'time draft', zh: '远期汇票', pos: 'n.', phonetic: '/taɪm dræft/', example: 'A time draft is payable a specified number of days after acceptance.', category: 'trade' },
  { id: 'tr247', en: 'acceptance', zh: '承兑', pos: 'n.', phonetic: '/əkˈseptəns/', example: 'Upon acceptance of the draft, the documents are released to the buyer.', category: 'trade' },
  { id: 'tr248', en: 'collection', zh: '托收', pos: 'n.', phonetic: '/kəˈlekʃən/', example: 'Documentary collection is handled through the banking system.', category: 'trade' },
  { id: 'tr249', en: 'documents against payment', zh: '付款交单', pos: 'n.', phonetic: '/ˈdɒkjumənts əˈɡeɪnst ˈpeɪmənt/', example: 'Documents against payment means the buyer must pay before receiving the documents.', category: 'trade' },
  { id: 'tr250', en: 'documents against acceptance', zh: '承兑交单', pos: 'n.', phonetic: '/ˈdɒkjumənts əˈɡeɪnst əkˈseptəns/', example: 'Documents against acceptance release documents against a time draft.', category: 'trade' },
  { id: 'tr251', en: 'advance payment', zh: '预付款', pos: 'n.', phonetic: '/ədˈvæns ˈpeɪmənt/', example: 'A 30% advance payment is required before production begins.', category: 'trade' },
  { id: 'tr252', en: 'down payment', zh: '首付款/定金', pos: 'n.', phonetic: '/daʊn ˈpeɪmənt/', example: 'The down payment was deducted from the total invoice value.', category: 'trade' },
  { id: 'tr253', en: 'deposit', zh: '定金/保证金', pos: 'n.', phonetic: '/dɪˈpɒzɪt/', example: 'A deposit of 20% secures the order.', category: 'trade' },
  { id: 'tr254', en: 'installment', zh: '分期付款', pos: 'n.', phonetic: '/ɪnˈstɔːlmənt/', example: 'The balance can be paid in six monthly installments.', category: 'trade' },
  { id: 'tr255', en: 'balance', zh: '余款/余额', pos: 'n.', phonetic: '/ˈbæləns/', example: 'The balance of 70% is payable upon delivery.', category: 'trade' },
  { id: 'tr256', en: 'overdue', zh: '逾期未付', pos: 'adj.', phonetic: '/ˌəʊvərˈdjuː/', example: 'The account is 60 days overdue.', category: 'trade' },
  { id: 'tr257', en: 'outstanding', zh: '未付的/未结清的', pos: 'adj.', phonetic: '/aʊtˈstændɪŋ/', example: 'The outstanding invoices total USD 120,000.', category: 'trade' },
  { id: 'tr258', en: 'credit insurance', zh: '信用保险', pos: 'n.', phonetic: '/ˈkredɪt ɪnˈʃʊərəns/', example: 'Credit insurance protects the exporter against buyer default.', category: 'trade' },
  { id: 'tr259', en: 'export credit', zh: '出口信贷', pos: 'n.', phonetic: '/ˈekspɔːrt ˈkredɪt/', example: 'Export credit allows the buyer to defer payment over several years.', category: 'trade' },
  { id: 'tr260', en: 'export credit agency', zh: '出口信用机构', pos: 'n.', phonetic: '/ˈekspɔːrt ˈkredɪt ˈeɪdʒənsi/', example: 'The export credit agency provides guarantees and insurance to exporters.', category: 'trade' },
  { id: 'tr261', en: 'factoring', zh: '保理', pos: 'n.', phonetic: '/ˈfæktərɪŋ/', example: 'Factoring provides immediate cash by selling accounts receivable.', category: 'trade' },
  { id: 'tr262', en: 'forfaiting', zh: '福费廷(包买票据)', pos: 'n.', phonetic: '/ˈfɔːrfeɪtɪŋ/', example: 'Forfaiting is used for medium-term export receivables without recourse.', category: 'trade' },
  { id: 'tr263', en: 'exchange rate', zh: '汇率', pos: 'n.', phonetic: '/ɪksˈtʃeɪndʒ reɪt/', example: 'The exchange rate between USD and EUR has been volatile.', category: 'trade' },
  { id: 'tr264', en: 'foreign exchange', zh: '外汇', pos: 'n.', phonetic: '/ˈfɒrɪn ɪksˈtʃeɪndʒ/', example: 'Foreign exchange risk can be hedged using forward contracts.', category: 'trade' },
  { id: 'tr265', en: 'forex', zh: '外汇市场', pos: 'n.', phonetic: '/ˈfɒreks/', example: 'The forex market is the largest financial market in the world.', category: 'trade' },
  { id: 'tr266', en: 'appreciation', zh: '升值', pos: 'n.', phonetic: '/əˌpriːʃiˈeɪʃən/', example: 'The appreciation of the RMB affects export competitiveness.', category: 'trade' },
  { id: 'tr267', en: 'depreciation', zh: '贬值', pos: 'n.', phonetic: '/dɪˌpriːʃiˈeɪʃən/', example: 'Currency depreciation makes exports cheaper for foreign buyers.', category: 'trade' },
  { id: 'tr268', en: 'fluctuation', zh: '波动', pos: 'n.', phonetic: '/ˌflʌktʃuˈeɪʃən/', example: 'Exchange rate fluctuations create uncertainty in trade pricing.', category: 'trade' },
  { id: 'tr269', en: 'hard currency', zh: '硬通货', pos: 'n.', phonetic: '/hɑːrd ˈkʌrənsi/', example: 'Most international contracts are denominated in hard currency.', category: 'trade' },
  { id: 'tr270', en: 'soft currency', zh: '软通货', pos: 'n.', phonetic: '/sɒft ˈkʌrənsi/', example: 'Soft currencies are subject to frequent devaluation.', category: 'trade' },
  { id: 'tr271', en: 'convertible currency', zh: '可自由兑换货币', pos: 'n.', phonetic: '/kənˈvɜːrtɪbəl ˈkʌrənsi/', example: 'The USD is a freely convertible currency.', category: 'trade' },
  { id: 'tr272', en: 'cross rate', zh: '交叉汇率', pos: 'n.', phonetic: '/krɒs reɪt/', example: 'The cross rate between JPY and GBP is calculated via USD.', category: 'trade' },
  { id: 'tr273', en: 'spot rate', zh: '即期汇率', pos: 'n.', phonetic: '/spɒt reɪt/', example: 'The spot rate for EUR/USD is 1.0850.', category: 'trade' },
  { id: 'tr274', en: 'forward rate', zh: '远期汇率', pos: 'n.', phonetic: '/ˈfɔːrwərd reɪt/', example: 'A forward rate is agreed today for settlement at a future date.', category: 'trade' },
  { id: 'tr275', en: 'hedging', zh: '套期保值', pos: 'n.', phonetic: '/ˈhedʒɪŋ/', example: 'Hedging protects against adverse currency movements.', category: 'trade' },
  { id: 'tr276', en: 'forward contract', zh: '远期合约', pos: 'n.', phonetic: '/ˈfɔːrwərd ˈkɒntrækt/', example: 'A forward contract locks in an exchange rate for a future date.', category: 'trade' },
  { id: 'tr277', en: 'currency option', zh: '货币期权', pos: 'n.', phonetic: '/ˈkʌrənsi ˈɒpʃən/', example: 'Currency options give the right but not the obligation to exchange at a set rate.', category: 'trade' },
  { id: 'tr278', en: 'invoice', zh: '发票', pos: 'n.', phonetic: '/ˈɪnvɔɪs/', example: 'Please send me the invoice for the first shipment.', category: 'trade' },
  { id: 'tr279', en: 'commercial invoice', zh: '商业发票', pos: 'n.', phonetic: '/kəˈmɜːrʃəl ˈɪnvɔɪs/', example: 'The commercial invoice is used by customs to assess duties.', category: 'trade' },
  { id: 'tr280', en: 'proforma invoice', zh: '形式发票', pos: 'n.', phonetic: '/prəʊˈfɔːrmə ˈɪnvɔɪs/', example: 'A proforma invoice is sent before the final order for the buyer to arrange payment.', category: 'trade' },
  { id: 'tr281', en: 'consular invoice', zh: '领事发票', pos: 'n.', phonetic: '/ˈkɒnsjʊlər ˈɪnvɔɪs/', example: 'Some countries require a consular invoice certified by their embassy.', category: 'trade' },
  { id: 'tr282', en: 'customs invoice', zh: '海关发票', pos: 'n.', phonetic: '/ˈkʌstəmz ˈɪnvɔɪs/', example: 'A customs invoice is required for goods entering certain countries.', category: 'trade' },
  { id: 'tr283', en: 'debit note', zh: '借方通知/账单', pos: 'n.', phonetic: '/ˈdebɪt nəʊt/', example: 'A debit note was issued for the additional freight charges.', category: 'trade' },
  { id: 'tr284', en: 'credit note', zh: '贷方通知/贷项通知单', pos: 'n.', phonetic: '/ˈkredɪt nəʊt/', example: 'A credit note was issued to correct the overcharge.', category: 'trade' },
  { id: 'tr285', en: 'receipt', zh: '收据', pos: 'n.', phonetic: '/rɪˈsiːt/', example: 'Please keep the receipt for your records.', category: 'trade' },
  { id: 'tr286', en: 'bank statement', zh: '银行对账单', pos: 'n.', phonetic: '/bæŋk ˈsteɪtmənt/', example: 'The bank statement shows the receipt of the T/T payment.', category: 'trade' },
  { id: 'tr287', en: 'cash against documents', zh: '凭单付款', pos: 'n.', phonetic: '/kæʃ əˈɡeɪnst ˈdɒkjumənts/', example: 'Cash against documents is a secure payment method for the exporter.', category: 'trade' },
  { id: 'tr288', en: 'credit period', zh: '信用期/赊账期', pos: 'n.', phonetic: '/ˈkredɪt ˈpɪəriəd/', example: 'The credit period is 60 days from the date of shipment.', category: 'trade' },
  { id: 'tr289', en: 'grace period', zh: '宽限期', pos: 'n.', phonetic: '/ɡreɪs ˈpɪəriəd/', example: 'A grace period of 10 days is allowed before late fees apply.', category: 'trade' },
  { id: 'tr290', en: 'interest rate', zh: '利率', pos: 'n.', phonetic: '/ˈɪntrəst reɪt/', example: 'Late payments accrue interest at 1.5% per month.', category: 'trade' },
  { id: 'tr291', en: 'bank guarantee', zh: '银行保函', pos: 'n.', phonetic: '/bæŋk ˌɡærənˈtiː/', example: 'A bank guarantee secures the seller\'s performance obligations.', category: 'trade' },
  { id: 'tr292', en: 'performance bond', zh: '履约保函', pos: 'n.', phonetic: '/pərˈfɔːrməns bɒnd/', example: 'A performance bond of 10% of the contract value was provided.', category: 'trade' },
  { id: 'tr293', en: 'bid bond', zh: '投标保函', pos: 'n.', phonetic: '/bɪd bɒnd/', example: 'A bid bond must be submitted with the tender proposal.', category: 'trade' },

  // ============================================================
  // E. 质量与检验 Quality & Inspection (50+ words)
  // ============================================================
  { id: 'tr294', en: 'inspection', zh: '检验', pos: 'n.', phonetic: '/ɪnˈspekʃən/', example: 'Third-party inspection was arranged before shipment.', category: 'trade' },
  { id: 'tr295', en: 'quality control', zh: '质量控制', pos: 'n.', phonetic: '/ˈkwɒlɪti kənˈtrəʊl/', example: 'Strict quality control procedures are followed at every production stage.', category: 'trade' },
  { id: 'tr296', en: 'quality assurance', zh: '质量保证', pos: 'n.', phonetic: '/ˈkwɒlɪti əˈʃʊərəns/', example: 'Quality assurance is an ongoing process throughout manufacturing.', category: 'trade' },
  { id: 'tr297', en: 'QA', zh: '质量保证', pos: 'abbr.', phonetic: '/ˌkjuː ˈeɪ/', example: 'The QA team reviews every batch before release.', category: 'trade' },
  { id: 'tr298', en: 'QC', zh: '质量控制', pos: 'abbr.', phonetic: '/ˌkjuː ˈsiː/', example: 'QC inspectors randomly sample products on the production line.', category: 'trade' },
  { id: 'tr299', en: 'inspection certificate', zh: '检验证书', pos: 'n.', phonetic: '/ɪnˈspekʃən sərˈtɪfɪkət/', example: 'An inspection certificate must accompany the shipping documents.', category: 'trade' },
  { id: 'tr300', en: 'certificate of quality', zh: '质量证书', pos: 'n.', phonetic: '/sərˈtɪfɪkət əv ˈkwɒlɪti/', example: 'The certificate of quality confirms compliance with the specifications.', category: 'trade' },
  { id: 'tr301', en: 'certificate of quantity', zh: '数量证书', pos: 'n.', phonetic: '/sərˈtɪfɪkət əv ˈkwɒntɪti/', example: 'A certificate of quantity was issued after weighing the cargo.', category: 'trade' },
  { id: 'tr302', en: 'pre-shipment inspection', zh: '装运前检验', pos: 'n.', phonetic: '/priː ˈʃɪpmənt ɪnˈspekʃən/', example: 'Pre-shipment inspection ensures the goods conform before they leave the factory.', category: 'trade' },
  { id: 'tr303', en: 'SGS', zh: '瑞士通用公证行', pos: 'abbr.', phonetic: '/ˌes dʒiː ˈes/', example: 'SGS is one of the world\'s leading inspection companies.', category: 'trade' },
  { id: 'tr304', en: 'Bureau Veritas', zh: '必维国际检验集团', pos: 'n.', phonetic: '/bjʊˈrəʊ ˈverɪtæs/', example: 'Bureau Veritas provides testing, inspection, and certification services.', category: 'trade' },
  { id: 'tr305', en: 'sampling', zh: '抽样', pos: 'n.', phonetic: '/ˈsæmplɪŋ/', example: 'Random sampling is conducted on 10% of each batch.', category: 'trade' },
  { id: 'tr306', en: 'AQL', zh: '可接受质量水平', pos: 'abbr.', phonetic: '/ˌeɪ kjuː ˈel/', example: 'The AQL for major defects is set at 2.5.', category: 'trade' },
  { id: 'tr307', en: 'defect', zh: '缺陷', pos: 'n.', phonetic: '/ˈdiːfekt/', example: 'Any product with a defect is removed from the shipment.', category: 'trade' },
  { id: 'tr308', en: 'major defect', zh: '主要缺陷', pos: 'n.', phonetic: '/ˈmeɪdʒər ˈdiːfekt/', example: 'A major defect renders the product unusable or unsafe.', category: 'trade' },
  { id: 'tr309', en: 'minor defect', zh: '次要缺陷', pos: 'n.', phonetic: '/ˈmaɪnər ˈdiːfekt/', example: 'Minor defects do not affect the product\'s function but may affect appearance.', category: 'trade' },
  { id: 'tr310', en: 'critical defect', zh: '严重缺陷', pos: 'n.', phonetic: '/ˈkrɪtɪkəl ˈdiːfekt/', example: 'Critical defects pose a safety hazard and require immediate recall.', category: 'trade' },
  { id: 'tr311', en: 'conformity', zh: '符合/合格', pos: 'n.', phonetic: '/kənˈfɔːrmɪti/', example: 'The goods were found to be in conformity with the specifications.', category: 'trade' },
  { id: 'tr312', en: 'non-conformity', zh: '不符合/不合格', pos: 'n.', phonetic: '/ˌnɒn kənˈfɔːrmɪti/', example: 'Any non-conformity must be reported within seven days of delivery.', category: 'trade' },
  { id: 'tr313', en: 'specification', zh: '规格', pos: 'n.', phonetic: '/ˌspesɪfɪˈkeɪʃən/', example: 'The product must meet the specifications outlined in the contract.', category: 'trade' },
  { id: 'tr314', en: 'tolerance', zh: '公差/允差', pos: 'n.', phonetic: '/ˈtɒlərəns/', example: 'The dimensional tolerance is plus or minus 0.1 mm.', category: 'trade' },
  { id: 'tr315', en: 'standard', zh: '标准', pos: 'n.', phonetic: '/ˈstændərd/', example: 'All products are manufactured to international standards.', category: 'trade' },
  { id: 'tr316', en: 'ISO', zh: '国际标准化组织', pos: 'abbr.', phonetic: '/ˈaɪsəʊ/', example: 'The factory is ISO 9001 certified.', category: 'trade' },
  { id: 'tr317', en: 'ISO 9001', zh: '质量管理体系标准', pos: 'abbr.', phonetic: '/ˈaɪsəʊ naɪn ˈθaʊzənd ənd wʌn/', example: 'ISO 9001 certification demonstrates commitment to quality management.', category: 'trade' },
  { id: 'tr318', en: 'ISO 14001', zh: '环境管理体系标准', pos: 'abbr.', phonetic: '/ˈaɪsəʊ fɔːrˈtiːn ˈθaʊzənd ənd wʌn/', example: 'ISO 14001 certification confirms adherence to environmental management standards.', category: 'trade' },
  { id: 'tr319', en: 'CE marking', zh: '欧盟CE认证标志', pos: 'n.', phonetic: '/ˌsiː ˈiː ˈmɑːrkɪŋ/', example: 'Products sold in the EU must carry the CE marking.', category: 'trade' },
  { id: 'tr320', en: 'FDA', zh: '美国食品药品监督管理局', pos: 'abbr.', phonetic: '/ˌef diː ˈeɪ/', example: 'Food and medical products require FDA approval for the US market.', category: 'trade' },
  { id: 'tr321', en: 'RoHS', zh: '有害物质限制指令', pos: 'abbr.', phonetic: '/rəʊz/', example: 'All electronic components comply with RoHS requirements.', category: 'trade' },
  { id: 'tr322', en: 'REACH', zh: '化学品注册评估授权和限制', pos: 'abbr.', phonetic: '/riːtʃ/', example: 'REACH compliance is mandatory for chemical products sold in the EU.', category: 'trade' },
  { id: 'tr323', en: 'traceability', zh: '可追溯性', pos: 'n.', phonetic: '/ˌtreɪsəˈbɪlɪti/', example: 'Traceability from raw material to finished product is essential for food safety.', category: 'trade' },
  { id: 'tr324', en: 'batch number', zh: '批号', pos: 'n.', phonetic: '/bætʃ ˈnʌmbər/', example: 'Each product is labeled with a unique batch number.', category: 'trade' },
  { id: 'tr325', en: 'lot number', zh: '批号/批次号', pos: 'n.', phonetic: '/lɒt ˈnʌmbər/', example: 'The lot number is printed on the outer carton.', category: 'trade' },
  { id: 'tr326', en: 'shelf life', zh: '保质期/货架期', pos: 'n.', phonetic: '/ʃelf laɪf/', example: 'The product has a shelf life of 24 months from the date of manufacture.', category: 'trade' },
  { id: 'tr327', en: 'expiry date', zh: '有效期/到期日', pos: 'n.', phonetic: '/ɪkˈspaɪəri deɪt/', example: 'Goods shipped must have at least 75% of shelf life remaining at delivery.', category: 'trade' },
  { id: 'tr328', en: 'best before date', zh: '最佳食用日期', pos: 'n.', phonetic: '/best bɪˈfɔːr deɪt/', example: 'The best before date is clearly printed on the packaging.', category: 'trade' },
  { id: 'tr329', en: 'manufacturing date', zh: '生产日期', pos: 'n.', phonetic: '/ˌmænjuˈfæktʃərɪŋ deɪt/', example: 'The manufacturing date is stamped on the bottom of each container.', category: 'trade' },
  { id: 'tr330', en: 'certificate of analysis', zh: '分析证书', pos: 'n.', phonetic: '/sərˈtɪfɪkət əv əˈnælɪsɪs/', example: 'A certificate of analysis is provided for each lot of chemicals.', category: 'trade' },
  { id: 'tr331', en: 'material safety data sheet', zh: '材料安全数据表', pos: 'n.', phonetic: '/məˈtɪəriəl ˈseɪfti ˈdeɪtə ʃiːt/', example: 'An MSDS must be provided for all hazardous substances.', category: 'trade' },
  { id: 'tr332', en: 'returned goods', zh: '退货', pos: 'n.', phonetic: '/rɪˈtɜːrnd ɡʊdz/', example: 'Returned goods are inspected before credit is issued.', category: 'trade' },
  { id: 'tr333', en: 'rework', zh: '返工', pos: 'n.', phonetic: '/riːˈwɜːrk/', example: 'Defective items were sent back to the factory for rework.', category: 'trade' },
  { id: 'tr334', en: 'scrap', zh: '报废/废品', pos: 'n.', phonetic: '/skræp/', example: 'Products that cannot be reworked are classified as scrap.', category: 'trade' },
  { id: 'tr335', en: 'first article inspection', zh: '首件检验', pos: 'n.', phonetic: '/fɜːrst ˈɑːrtɪkəl ɪnˈspekʃən/', example: 'First article inspection is conducted before mass production begins.', category: 'trade' },
  { id: 'tr336', en: 'in-process inspection', zh: '过程检验', pos: 'n.', phonetic: '/ɪn ˈprəʊses ɪnˈspekʃən/', example: 'In-process inspection catches defects early in manufacturing.', category: 'trade' },
  { id: 'tr337', en: 'final inspection', zh: '最终检验', pos: 'n.', phonetic: '/ˈfaɪnəl ɪnˈspekʃən/', example: 'Final inspection is performed before the goods are packed for shipment.', category: 'trade' },
  { id: 'tr338', en: 'calibration', zh: '校准', pos: 'n.', phonetic: '/ˌkælɪˈbreɪʃən/', example: 'All measuring equipment undergoes regular calibration.', category: 'trade' },
  { id: 'tr339', en: 'test report', zh: '检验报告', pos: 'n.', phonetic: '/test rɪˈpɔːrt/', example: 'A test report from an accredited laboratory is required.', category: 'trade' },
  { id: 'tr340', en: 'accredited laboratory', zh: '认可实验室', pos: 'n.', phonetic: '/əˈkredɪtɪd ləˈbɒrətəri/', example: 'Tests must be performed by an ISO 17025 accredited laboratory.', category: 'trade' },
  { id: 'tr341', en: 'rejection', zh: '拒收', pos: 'n.', phonetic: '/rɪˈdʒekʃən/', example: 'Rejection of the consignment is justified if the goods are defective.', category: 'trade' },
  { id: 'tr342', en: 'claim', zh: '索赔', pos: 'n.', phonetic: '/kleɪm/', example: 'A claim was filed for the damaged goods received.', category: 'trade' },
  { id: 'tr343', en: 'compensation', zh: '赔偿/补偿', pos: 'n.', phonetic: '/ˌkɒmpenˈseɪʃən/', example: 'Compensation of 15% of the order value was negotiated.', category: 'trade' },

  // ============================================================
  // F. 营销与谈判 Marketing & Negotiation (50+ words)
  // ============================================================
  { id: 'tr344', en: 'marketing', zh: '市场营销', pos: 'n.', phonetic: '/ˈmɑːrkɪtɪŋ/', example: 'The marketing strategy focuses on brand awareness in new regions.', category: 'trade' },
  { id: 'tr345', en: 'promotion', zh: '促销/推广', pos: 'n.', phonetic: '/prəˈməʊʃən/', example: 'Sales promotion activities boosted orders by 30%.', category: 'trade' },
  { id: 'tr346', en: 'trade fair', zh: '贸易展览会', pos: 'n.', phonetic: '/treɪd feər/', example: 'The company exhibited at the Frankfurt trade fair.', category: 'trade' },
  { id: 'tr347', en: 'exhibition', zh: '展览/展会', pos: 'n.', phonetic: '/ˌeksɪˈbɪʃən/', example: 'An international exhibition attracts buyers from around the world.', category: 'trade' },
  { id: 'tr348', en: 'Canton Fair', zh: '广交会', pos: 'n.', phonetic: '/ˈkæntɒn feər/', example: 'The Canton Fair is held twice a year in Guangzhou.', category: 'trade' },
  { id: 'tr349', en: 'sample', zh: '样品', pos: 'n.', phonetic: '/ˈsæmpəl/', example: 'We will send free samples for your evaluation.', category: 'trade' },
  { id: 'tr350', en: 'pre-production sample', zh: '产前样', pos: 'n.', phonetic: '/priː prəˈdʌkʃən ˈsæmpəl/', example: 'The pre-production sample must be approved before mass production starts.', category: 'trade' },
  { id: 'tr351', en: 'counter sample', zh: '对等样品/回样', pos: 'n.', phonetic: '/ˈkaʊntər ˈsæmpəl/', example: 'The supplier provided a counter sample matching the buyer\'s specifications.', category: 'trade' },
  { id: 'tr352', en: 'approval sample', zh: '确认样', pos: 'n.', phonetic: '/əˈpruːvəl ˈsæmpəl/', example: 'Once the approval sample is signed off, production can begin.', category: 'trade' },
  { id: 'tr353', en: 'catalog', zh: '产品目录', pos: 'n.', phonetic: '/ˈkætəlɒɡ/', example: 'Our latest catalog features over 500 new products.', category: 'trade' },
  { id: 'tr354', en: 'brochure', zh: '宣传册', pos: 'n.', phonetic: '/ˈbrəʊʃər/', example: 'A brochure describing our services was mailed to potential clients.', category: 'trade' },
  { id: 'tr355', en: 'price list', zh: '价格表', pos: 'n.', phonetic: '/praɪs lɪst/', example: 'An updated price list will be sent by the end of the week.', category: 'trade' },
  { id: 'tr356', en: 'discount', zh: '折扣', pos: 'n.', phonetic: '/ˈdɪskaʊnt/', example: 'A volume discount of 5% applies to orders over 1,000 units.', category: 'trade' },
  { id: 'tr357', en: 'commission', zh: '佣金', pos: 'n.', phonetic: '/kəˈmɪʃən/', example: 'The agent receives a 3% commission on all sales.', category: 'trade' },
  { id: 'tr358', en: 'rebate', zh: '回扣/返利', pos: 'n.', phonetic: '/ˈriːbeɪt/', example: 'A year-end rebate is offered based on total annual purchases.', category: 'trade' },
  { id: 'tr359', en: 'wholesale', zh: '批发', pos: 'n.', phonetic: '/ˈhəʊlseɪl/', example: 'Wholesale prices are significantly lower than retail prices.', category: 'trade' },
  { id: 'tr360', en: 'retail', zh: '零售', pos: 'n.', phonetic: '/ˈriːteɪl/', example: 'The recommended retail price includes VAT.', category: 'trade' },
  { id: 'tr361', en: 'distributor', zh: '分销商', pos: 'n.', phonetic: '/dɪˈstrɪbjʊtər/', example: 'We are looking for a reliable distributor in the region.', category: 'trade' },
  { id: 'tr362', en: 'agent', zh: '代理商', pos: 'n.', phonetic: '/ˈeɪdʒənt/', example: 'A local agent handles sales and after-sales service.', category: 'trade' },
  { id: 'tr363', en: 'sole agent', zh: '独家代理', pos: 'n.', phonetic: '/səʊl ˈeɪdʒənt/', example: 'The company was appointed sole agent for the territory.', category: 'trade' },
  { id: 'tr364', en: 'exclusive distribution', zh: '独家经销', pos: 'n.', phonetic: '/ɪkˈskluːsɪv ˌdɪstrɪˈbjuːʃən/', example: 'Exclusive distribution rights were granted for a five-year period.', category: 'trade' },
  { id: 'tr365', en: 'OEM', zh: '原始设备制造商/贴牌生产', pos: 'abbr.', phonetic: '/ˌəʊ iː ˈem/', example: 'We provide OEM services for several international brands.', category: 'trade' },
  { id: 'tr366', en: 'ODM', zh: '原始设计制造商', pos: 'abbr.', phonetic: '/ˌəʊ diː ˈem/', example: 'ODM suppliers design and manufacture products under the buyer\'s brand.', category: 'trade' },
  { id: 'tr367', en: 'MOQ', zh: '最小起订量', pos: 'abbr.', phonetic: '/ˌem əʊ ˈkjuː/', example: 'The MOQ for this product is 500 pieces per color.', category: 'trade' },
  { id: 'tr368', en: 'lead time', zh: '交货期/前置时间', pos: 'n.', phonetic: '/liːd taɪm/', example: 'The standard lead time is 30 days after receipt of order.', category: 'trade' },
  { id: 'tr369', en: 'bargaining', zh: '讨价还价', pos: 'n.', phonetic: '/ˈbɑːrɡɪnɪŋ/', example: 'Intense bargaining resulted in a 10% price reduction.', category: 'trade' },
  { id: 'tr370', en: 'haggle', zh: '讨价还价', pos: 'v.', phonetic: '/ˈhæɡəl/', example: 'Buyers often haggle over the price in this market.', category: 'trade' },
  { id: 'tr371', en: 'negotiation', zh: '谈判', pos: 'n.', phonetic: '/nɪˌɡəʊʃiˈeɪʃən/', example: 'Contract negotiations lasted three rounds over two months.', category: 'trade' },
  { id: 'tr372', en: 'inquiry', zh: '询盘/询价', pos: 'n.', phonetic: '/ɪnˈkwaɪəri/', example: 'We received an inquiry from a potential buyer in Brazil.', category: 'trade' },
  { id: 'tr373', en: 'quotation', zh: '报价单', pos: 'n.', phonetic: '/kwəʊˈteɪʃən/', example: 'A detailed quotation was prepared and sent to the client.', category: 'trade' },
  { id: 'tr374', en: 'offer', zh: '报盘/发盘', pos: 'n.', phonetic: '/ˈɒfər/', example: 'The offer is valid for 15 days from the date of issue.', category: 'trade' },
  { id: 'tr375', en: 'firm offer', zh: '实盘', pos: 'n.', phonetic: '/fɜːrm ˈɒfər/', example: 'A firm offer is irrevocable within the stated validity period.', category: 'trade' },
  { id: 'tr376', en: 'non-firm offer', zh: '虚盘', pos: 'n.', phonetic: '/nɒn fɜːrm ˈɒfər/', example: 'A non-firm offer is subject to confirmation.', category: 'trade' },
  { id: 'tr377', en: 'counter-offer', zh: '还盘', pos: 'n.', phonetic: '/ˈkaʊntər ˌɒfər/', example: 'The buyer made a counter-offer at a lower price.', category: 'trade' },
  { id: 'tr378', en: 'order', zh: '订单', pos: 'n.', phonetic: '/ˈɔːrdər/', example: 'We are pleased to confirm your order No. 2024-0588.', category: 'trade' },
  { id: 'tr379', en: 'trial order', zh: '试订单', pos: 'n.', phonetic: '/ˈtraɪəl ˈɔːrdər/', example: 'A trial order of 200 units was placed to test the market.', category: 'trade' },
  { id: 'tr380', en: 'repeat order', zh: '续订单/回头单', pos: 'n.', phonetic: '/rɪˈpiːt ˈɔːrdər/', example: 'Repeat orders indicate customer satisfaction with the product.', category: 'trade' },
  { id: 'tr381', en: 'back order', zh: '延期交货订单', pos: 'n.', phonetic: '/bæk ˈɔːrdər/', example: 'Items not currently in stock will be placed on back order.', category: 'trade' },
  { id: 'tr382', en: 'concession', zh: '让步', pos: 'n.', phonetic: '/kənˈseʃən/', example: 'Both sides made concessions to reach an agreement.', category: 'trade' },
  { id: 'tr383', en: 'compromise', zh: '妥协/折中', pos: 'n.', phonetic: '/ˈkɒmprəmaɪz/', example: 'A compromise was reached on the delivery schedule.', category: 'trade' },
  { id: 'tr384', en: 'win-win', zh: '双赢', pos: 'adj.', phonetic: '/wɪn wɪn/', example: 'The aim is to achieve a win-win outcome for both parties.', category: 'trade' },
  { id: 'tr385', en: 'deadlock', zh: '僵局', pos: 'n.', phonetic: '/ˈdedlɒk/', example: 'Price negotiations reached a deadlock.', category: 'trade' },
  { id: 'tr386', en: 'bottom line', zh: '底线', pos: 'n.', phonetic: '/ˈbɒtəm laɪn/', example: 'That price is our bottom line; we cannot go any lower.', category: 'trade' },
  { id: 'tr387', en: 'target price', zh: '目标价格', pos: 'n.', phonetic: '/ˈtɑːrɡɪt praɪs/', example: 'Our target price for this item is USD 12.50 per unit FOB.', category: 'trade' },
  { id: 'tr388', en: 'terms of delivery', zh: '交货条件', pos: 'n.', phonetic: '/tɜːrmz əv dɪˈlɪvəri/', example: 'The terms of delivery are specified in the sales contract.', category: 'trade' },
  { id: 'tr389', en: 'mode of transport', zh: '运输方式', pos: 'n.', phonetic: '/məʊd əv ˈtrænspɔːrt/', example: 'The mode of transport depends on the urgency and cost considerations.', category: 'trade' },
  { id: 'tr390', en: 'packing', zh: '包装', pos: 'n.', phonetic: '/ˈpækɪŋ/', example: 'Export packing must withstand handling during long-distance transport.', category: 'trade' },
  { id: 'tr391', en: 'brand', zh: '品牌', pos: 'n.', phonetic: '/brænd/', example: 'Building a strong brand is essential for long-term success.', category: 'trade' },
  { id: 'tr392', en: 'after-sales service', zh: '售后服务', pos: 'n.', phonetic: '/ˈæftər seɪlz ˈsɜːrvɪs/', example: 'After-sales service includes installation, training, and maintenance.', category: 'trade' },
  { id: 'tr393', en: 'customer retention', zh: '客户保留/客户维系', pos: 'n.', phonetic: '/ˈkʌstəmər rɪˈtenʃən/', example: 'Customer retention is more cost-effective than acquiring new customers.', category: 'trade' },

  // ============================================================
  // G. 海关与单证 Customs & Documentation (50+ words)
  // ============================================================
  { id: 'tr394', en: 'customs', zh: '海关', pos: 'n.', phonetic: '/ˈkʌstəmz/', example: 'The shipment is being held by customs for inspection.', category: 'trade' },
  { id: 'tr395', en: 'customs declaration', zh: '报关单', pos: 'n.', phonetic: '/ˈkʌstəmz ˌdekləˈreɪʃən/', example: 'A customs declaration must be filed before the goods can be cleared.', category: 'trade' },
  { id: 'tr396', en: 'customs clearance', zh: '清关', pos: 'n.', phonetic: '/ˈkʌstəmz ˈklɪərəns/', example: 'Customs clearance typically takes 2-3 working days.', category: 'trade' },
  { id: 'tr397', en: 'customs broker', zh: '报关行/报关代理人', pos: 'n.', phonetic: '/ˈkʌstəmz ˈbrəʊkər/', example: 'A licensed customs broker handles all import formalities.', category: 'trade' },
  { id: 'tr398', en: 'customs duty', zh: '关税', pos: 'n.', phonetic: '/ˈkʌstəmz ˈdjuːti/', example: 'Customs duty is calculated on the CIF value of the goods.', category: 'trade' },
  { id: 'tr399', en: 'tariff', zh: '关税/关税表', pos: 'n.', phonetic: '/ˈtærɪf/', example: 'The tariff rate for this product category is 6.5%.', category: 'trade' },
  { id: 'tr400', en: 'preferential tariff', zh: '优惠关税', pos: 'n.', phonetic: '/ˌprefəˈrenʃəl ˈtærɪf/', example: 'Preferential tariff rates apply to imports from FTA partner countries.', category: 'trade' },
  { id: 'tr401', en: 'Most-Favored-Nation tariff', zh: '最惠国关税', pos: 'n.', phonetic: '/məʊst ˈfeɪvəd ˈneɪʃən ˈtærɪf/', example: 'The MFN tariff applies to WTO members that do not have a separate trade agreement.', category: 'trade' },
  { id: 'tr402', en: 'HS code', zh: '协调制度编码', pos: 'n.', phonetic: '/ˌeɪtʃ ˈes kəʊd/', example: 'The correct HS code must be assigned to each product for customs classification.', category: 'trade' },
  { id: 'tr403', en: 'Harmonized System', zh: '商品名称及编码协调制度', pos: 'n.', phonetic: '/ˈhɑːrmənaɪzd ˈsɪstəm/', example: 'The Harmonized System is used by over 200 countries for tariff classification.', category: 'trade' },
  { id: 'tr404', en: 'customs valuation', zh: '海关估价', pos: 'n.', phonetic: '/ˈkʌstəmz ˌvæljuˈeɪʃən/', example: 'Customs valuation is based on the transaction value of imported goods.', category: 'trade' },
  { id: 'tr405', en: 'dutiable value', zh: '完税价格/应税价值', pos: 'n.', phonetic: '/ˈdjuːtiəbəl ˈvæljuː/', example: 'The dutiable value includes the cost of goods, insurance, and freight.', category: 'trade' },
  { id: 'tr406', en: 'VAT', zh: '增值税', pos: 'abbr.', phonetic: '/ˌviː eɪ ˈtiː/', example: 'VAT is charged at 13% on most imported goods.', category: 'trade' },
  { id: 'tr407', en: 'tax refund', zh: '退税', pos: 'n.', phonetic: '/tæks ˈriːfʌnd/', example: 'Exporters can claim a VAT refund on raw materials purchased domestically.', category: 'trade' },
  { id: 'tr408', en: 'drawback', zh: '退税/退还关税', pos: 'n.', phonetic: '/ˈdrɔːbæk/', example: 'Duty drawback is available on imported components used in exported products.', category: 'trade' },
  { id: 'tr409', en: 'bonded goods', zh: '保税货物', pos: 'n.', phonetic: '/ˈbɒndɪd ɡʊdz/', example: 'Bonded goods are stored under customs supervision without duty payment.', category: 'trade' },
  { id: 'tr410', en: 'temporary importation', zh: '暂时进口', pos: 'n.', phonetic: '/ˈtempərəri ˌɪmpɔːrˈteɪʃən/', example: 'Temporary importation allows samples and exhibition goods to enter duty-free.', category: 'trade' },
  { id: 'tr411', en: 'ATA Carnet', zh: 'ATA单证册/暂时入境免税单证', pos: 'n.', phonetic: '/ˈeɪ tiː eɪ kɑːrˈneɪ/', example: 'An ATA Carnet simplifies temporary import procedures for trade fair exhibits.', category: 'trade' },
  { id: 'tr412', en: 'certificate of origin', zh: '原产地证书', pos: 'n.', phonetic: '/sərˈtɪfɪkət əv ˈɒrɪdʒɪn/', example: 'A certificate of origin is required to claim preferential tariff treatment.', category: 'trade' },
  { id: 'tr413', en: 'GSP Form A', zh: '普惠制原产地证书A格式', pos: 'n.', phonetic: '/dʒiː es piː fɔːrm eɪ/', example: 'GSP Form A must be presented to claim duty-free entry under the GSP scheme.', category: 'trade' },
  { id: 'tr414', en: 'EUR.1', zh: '欧盟优惠原产地证书', pos: 'n.', phonetic: '/ˌiː juː ˈɑːr dɒt wʌn/', example: 'An EUR.1 certificate is used to claim preferential rates under EU trade agreements.', category: 'trade' },
  { id: 'tr415', en: 'fumigation certificate', zh: '熏蒸证书', pos: 'n.', phonetic: '/ˌfjuːmɪˈɡeɪʃən sərˈtɪfɪkət/', example: 'Wooden packaging must be accompanied by a fumigation certificate.', category: 'trade' },
  { id: 'tr416', en: 'phytosanitary certificate', zh: '植物检疫证书', pos: 'n.', phonetic: '/ˌfaɪtəʊˈsænɪtəri sərˈtɪfɪkət/', example: 'A phytosanitary certificate is required for all agricultural imports.', category: 'trade' },
  { id: 'tr417', en: 'health certificate', zh: '卫生证书/健康证书', pos: 'n.', phonetic: '/helθ sərˈtɪfɪkət/', example: 'A health certificate confirms the products are fit for human consumption.', category: 'trade' },
  { id: 'tr418', en: 'veterinary certificate', zh: '兽医证书', pos: 'n.', phonetic: '/ˈvetərɪnəri sərˈtɪfɪkət/', example: 'Live animals and animal products require a veterinary certificate.', category: 'trade' },
  { id: 'tr419', en: 'halal certificate', zh: '清真认证', pos: 'n.', phonetic: '/həˈlæl sərˈtɪfɪkət/', example: 'Food products for Middle Eastern markets need a halal certificate.', category: 'trade' },
  { id: 'tr420', en: 'insurance policy', zh: '保险单', pos: 'n.', phonetic: '/ɪnˈʃʊərəns ˈpɒləsi/', example: 'The insurance policy covers all risks from warehouse to warehouse.', category: 'trade' },
  { id: 'tr421', en: 'insurance certificate', zh: '保险凭证', pos: 'n.', phonetic: '/ɪnˈʃʊərəns sərˈtɪfɪkət/', example: 'An insurance certificate is sufficient for CIF shipments.', category: 'trade' },
  { id: 'tr422', en: 'all risks', zh: '一切险/全险', pos: 'n.', phonetic: '/ɔːl rɪsks/', example: 'The cargo is insured against all risks.', category: 'trade' },
  { id: 'tr423', en: 'packing list', zh: '装箱单', pos: 'n.', phonetic: '/ˈpækɪŋ lɪst/', example: 'The packing list details the contents of each carton.', category: 'trade' },
  { id: 'tr424', en: 'weight list', zh: '重量单', pos: 'n.', phonetic: '/weɪt lɪst/', example: 'A weight list specifies the gross and net weight of each package.', category: 'trade' },
  { id: 'tr425', en: 'measurement list', zh: '尺码单', pos: 'n.', phonetic: '/ˈmeʒərmənt lɪst/', example: 'The measurement list provides dimensions for freight calculation.', category: 'trade' },
  { id: 'tr426', en: 'packing declaration', zh: '包装声明', pos: 'n.', phonetic: '/ˈpækɪŋ ˌdekləˈreɪʃən/', example: 'A packing declaration certifies that wood packaging material is treated.', category: 'trade' },
  { id: 'tr427', en: 'dangerous goods declaration', zh: '危险品申报单', pos: 'n.', phonetic: '/ˈdeɪndʒərəs ɡʊdz ˌdekləˈreɪʃən/', example: 'A dangerous goods declaration must be signed by the shipper.', category: 'trade' },
  { id: 'tr428', en: 'export declaration', zh: '出口报关单', pos: 'n.', phonetic: '/ˈekspɔːrt ˌdekləˈreɪʃən/', example: 'An export declaration is filed with customs before the goods leave the country.', category: 'trade' },
  { id: 'tr429', en: 'import declaration', zh: '进口报关单', pos: 'n.', phonetic: '/ˈɪmpɔːrt ˌdekləˈreɪʃən/', example: 'The import declaration must be supported by the commercial invoice and packing list.', category: 'trade' },
  { id: 'tr430', en: 'entry summary', zh: '进口摘要/报关概要', pos: 'n.', phonetic: '/ˈentri ˈsʌməri/', example: 'The entry summary is submitted to customs within 10 days of arrival.', category: 'trade' },
  { id: 'tr431', en: 'customs examination', zh: '海关查验', pos: 'n.', phonetic: '/ˈkʌstəmz ɪɡˌzæmɪˈneɪʃən/', example: 'Customs examination may involve physical inspection or X-ray scanning.', category: 'trade' },
  { id: 'tr432', en: 'release order', zh: '放行通知', pos: 'n.', phonetic: '/rɪˈliːs ˈɔːrdər/', example: 'Goods can be collected once the release order is issued by customs.', category: 'trade' },
  { id: 'tr433', en: 'bonded transportation', zh: '保税运输', pos: 'n.', phonetic: '/ˈbɒndɪd ˌtrænspɔːrˈteɪʃən/', example: 'Bonded transportation allows goods to move between customs zones without duty payment.', category: 'trade' },
  { id: 'tr434', en: 'ISPM 15', zh: '国际植物检疫措施标准第15号', pos: 'abbr.', phonetic: '/ˌaɪ es piː em fɪfˈtiːn/', example: 'ISPM 15 requires heat treatment or fumigation of wood packaging materials.', category: 'trade' },
  { id: 'tr435', en: 'letter of guarantee', zh: '保函/担保函', pos: 'n.', phonetic: '/ˈletər əv ˌɡærənˈtiː/', example: 'The shipping company accepted a letter of guarantee in lieu of an original bill of lading.', category: 'trade' },
  { id: 'tr436', en: 'endorsement', zh: '背书', pos: 'n.', phonetic: '/ɪnˈdɔːrsmənt/', example: 'The bill of lading requires the shipper\'s endorsement to transfer ownership.', category: 'trade' },
  { id: 'tr437', en: 'consular visa', zh: '领事签证', pos: 'n.', phonetic: '/ˈkɒnsjʊlər ˈviːzə/', example: 'Certain Middle Eastern countries require consular visa on commercial documents.', category: 'trade' },
  { id: 'tr438', en: 'documentation', zh: '单证/文件', pos: 'n.', phonetic: '/ˌdɒkjumenˈteɪʃən/', example: 'All documentation must be complete before the shipment is dispatched.', category: 'trade' },
  { id: 'tr439', en: 'discrepancy', zh: '不符点/差异', pos: 'n.', phonetic: '/dɪˈskrepənsi/', example: 'The bank rejected the documents due to a discrepancy in the description of goods.', category: 'trade' },
  { id: 'tr440', en: 'clean report of findings', zh: '清洁检验报告', pos: 'n.', phonetic: '/kliːn rɪˈpɔːrt əv ˈfaɪndɪŋz/', example: 'A clean report of findings was issued after the pre-shipment inspection.', category: 'trade' },
  { id: 'tr441', en: 'TIR Carnet', zh: '国际公路运输单证册', pos: 'n.', phonetic: '/ˌtiː aɪ ˈɑːr kɑːrˈneɪ/', example: 'A TIR Carnet facilitates transit of goods by road across multiple borders.', category: 'trade' },

  // ============================================================
  // H. 综合商务术语 General Business Terms (60+ words)
  // ============================================================
  { id: 'tr442', en: 'entrepreneur', zh: '企业家', pos: 'n.', phonetic: '/ˌɒntrəprəˈnɜːr/', example: 'The entrepreneur founded the company with a small investment.', category: 'trade' },
  { id: 'tr443', en: 'stakeholder', zh: '利益相关者', pos: 'n.', phonetic: '/ˈsteɪkhəʊldər/', example: 'All stakeholders were consulted before the decision was made.', category: 'trade' },
  { id: 'tr444', en: 'shareholder', zh: '股东', pos: 'n.', phonetic: '/ˈʃeərhəʊldər/', example: 'Shareholders approved the merger at the annual general meeting.', category: 'trade' },
  { id: 'tr445', en: 'ROI', zh: '投资回报率', pos: 'abbr.', phonetic: '/ˌɑːr əʊ ˈaɪ/', example: 'The ROI on the new production line exceeded expectations.', category: 'trade' },
  { id: 'tr446', en: 'KPI', zh: '关键绩效指标', pos: 'abbr.', phonetic: '/ˌkeɪ piː ˈaɪ/', example: 'Sales growth and customer satisfaction are key KPIs for the company.', category: 'trade' },
  { id: 'tr447', en: 'benchmark', zh: '基准/对标', pos: 'n.', phonetic: '/ˈbentʃmɑːrk/', example: 'The company uses industry benchmarks to assess performance.', category: 'trade' },
  { id: 'tr448', en: 'benchmarking', zh: '标杆管理/对标分析', pos: 'n.', phonetic: '/ˈbentʃmɑːrkɪŋ/', example: 'Benchmarking against competitors reveals areas for improvement.', category: 'trade' },
  { id: 'tr449', en: 'outsourcing', zh: '外包', pos: 'n.', phonetic: '/ˈaʊtsɔːrsɪŋ/', example: 'Outsourcing production to specialized factories reduces costs.', category: 'trade' },
  { id: 'tr450', en: 'offshoring', zh: '离岸外包', pos: 'n.', phonetic: '/ˈɒfʃɔːrɪŋ/', example: 'Offshoring manufacturing to low-cost countries is a common strategy.', category: 'trade' },
  { id: 'tr451', en: 'procurement', zh: '采购', pos: 'n.', phonetic: '/prəˈkjʊəmənt/', example: 'The procurement department sources raw materials from approved suppliers.', category: 'trade' },
  { id: 'tr452', en: 'sourcing', zh: '采购/寻源', pos: 'n.', phonetic: '/ˈsɔːrsɪŋ/', example: 'Global sourcing allows companies to find the best value for materials.', category: 'trade' },
  { id: 'tr453', en: 'tender', zh: '招标', pos: 'n.', phonetic: '/ˈtendər/', example: 'The government issued a tender for the construction project.', category: 'trade' },
  { id: 'tr454', en: 'bid', zh: '投标/竞标', pos: 'n.', phonetic: '/bɪd/', example: 'Three companies submitted bids for the supply contract.', category: 'trade' },
  { id: 'tr455', en: 'bidding', zh: '投标', pos: 'n.', phonetic: '/ˈbɪdɪŋ/', example: 'International competitive bidding ensures transparency and value for money.', category: 'trade' },
  { id: 'tr456', en: 'merger', zh: '合并', pos: 'n.', phonetic: '/ˈmɜːrdʒər/', example: 'The merger of the two companies created a market leader.', category: 'trade' },
  { id: 'tr457', en: 'acquisition', zh: '收购', pos: 'n.', phonetic: '/ˌækwɪˈzɪʃən/', example: 'The acquisition gave the company a foothold in the European market.', category: 'trade' },
  { id: 'tr458', en: 'mergers and acquisitions', zh: '并购', pos: 'n.', phonetic: '/ˈmɜːrdʒərz ən ˌækwɪˈzɪʃənz/', example: 'Mergers and acquisitions activity has picked up in the sector.', category: 'trade' },
  { id: 'tr459', en: 'conglomerate', zh: '企业集团/综合企业', pos: 'n.', phonetic: '/kənˈɡlɒmərət/', example: 'The conglomerate has interests in mining, energy, and transportation.', category: 'trade' },
  { id: 'tr460', en: 'turnover', zh: '营业额/营收', pos: 'n.', phonetic: '/ˈtɜːrnəʊvər/', example: 'Annual turnover exceeded USD 500 million for the first time.', category: 'trade' },
  { id: 'tr461', en: 'revenue', zh: '收入/营收', pos: 'n.', phonetic: '/ˈrevənjuː/', example: 'Export revenue accounts for 60% of total revenue.', category: 'trade' },
  { id: 'tr462', en: 'profit margin', zh: '利润率', pos: 'n.', phonetic: '/ˈprɒfɪt ˈmɑːrdʒɪn/', example: 'The profit margin on these products has narrowed due to rising costs.', category: 'trade' },
  { id: 'tr463', en: 'gross profit', zh: '毛利润', pos: 'n.', phonetic: '/ɡrəʊs ˈprɒfɪt/', example: 'Gross profit is calculated by deducting the cost of goods sold from revenue.', category: 'trade' },
  { id: 'tr464', en: 'net profit', zh: '净利润', pos: 'n.', phonetic: '/net ˈprɒfɪt/', example: 'Net profit after tax was USD 12 million.', category: 'trade' },
  { id: 'tr465', en: 'assets', zh: '资产', pos: 'n.', phonetic: '/ˈæsets/', example: 'The company\'s total assets are valued at over USD 2 billion.', category: 'trade' },
  { id: 'tr466', en: 'liabilities', zh: '负债', pos: 'n.', phonetic: '/ˌlaɪəˈbɪlɪtiz/', example: 'Current liabilities include accounts payable and short-term loans.', category: 'trade' },
  { id: 'tr467', en: 'equity', zh: '股权/所有者权益', pos: 'n.', phonetic: '/ˈekwɪti/', example: 'Shareholders\' equity increased after the capital injection.', category: 'trade' },
  { id: 'tr468', en: 'cash flow', zh: '现金流', pos: 'n.', phonetic: '/kæʃ fləʊ/', example: 'Positive cash flow is essential for day-to-day operations.', category: 'trade' },
  { id: 'tr469', en: 'working capital', zh: '营运资金', pos: 'n.', phonetic: '/ˈwɜːrkɪŋ ˈkæpɪtəl/', example: 'Adequate working capital ensures the company can meet short-term obligations.', category: 'trade' },
  { id: 'tr470', en: 'balance sheet', zh: '资产负债表', pos: 'n.', phonetic: '/ˈbæləns ʃiːt/', example: 'The balance sheet provides a snapshot of the company\'s financial position.', category: 'trade' },
  { id: 'tr471', en: 'income statement', zh: '利润表/损益表', pos: 'n.', phonetic: '/ˈɪnkʌm ˈsteɪtmənt/', example: 'The income statement shows revenue and expenses over the fiscal year.', category: 'trade' },
  { id: 'tr472', en: 'fiscal year', zh: '财政年度/会计年度', pos: 'n.', phonetic: '/ˈfɪskəl jɪər/', example: 'The fiscal year runs from January 1 to December 31.', category: 'trade' },
  { id: 'tr473', en: 'audit', zh: '审计', pos: 'n.', phonetic: '/ˈɔːdɪt/', example: 'An external audit is conducted annually by an independent firm.', category: 'trade' },
  { id: 'tr474', en: 'capital', zh: '资本/资金', pos: 'n.', phonetic: '/ˈkæpɪtəl/', example: 'The company raised additional capital through a share offering.', category: 'trade' },
  { id: 'tr475', en: 'creditworthiness', zh: '信誉/信用度', pos: 'n.', phonetic: '/ˈkredɪtˌwɜːrðinəs/', example: 'The buyer\'s creditworthiness was assessed before granting open account terms.', category: 'trade' },
  { id: 'tr476', en: 'insolvency', zh: '破产/资不抵债', pos: 'n.', phonetic: '/ɪnˈsɒlvənsi/', example: 'The supplier filed for insolvency, leaving creditors unpaid.', category: 'trade' },
  { id: 'tr477', en: 'bankruptcy', zh: '破产', pos: 'n.', phonetic: '/ˈbæŋkrʌptsi/', example: 'Bankruptcy proceedings were initiated after the company defaulted on its debts.', category: 'trade' },
  { id: 'tr478', en: 'due diligence', zh: '尽职调查', pos: 'n.', phonetic: '/djuː ˈdɪlɪdʒəns/', example: 'Thorough due diligence was conducted before the joint venture was approved.', category: 'trade' },
  { id: 'tr479', en: 'feasibility study', zh: '可行性研究', pos: 'n.', phonetic: '/ˌfiːzɪˈbɪlɪti ˈstʌdi/', example: 'A feasibility study confirmed the viability of the new factory.', category: 'trade' },
  { id: 'tr480', en: 'risk assessment', zh: '风险评估', pos: 'n.', phonetic: '/rɪsk əˈsesmənt/', example: 'A comprehensive risk assessment was performed before entering the new market.', category: 'trade' },
  { id: 'tr481', en: 'business plan', zh: '商业计划书', pos: 'n.', phonetic: '/ˈbɪznɪs plæn/', example: 'The business plan outlines the strategy for the next five years.', category: 'trade' },
  { id: 'tr482', en: 'market research', zh: '市场调研', pos: 'n.', phonetic: '/ˈmɑːrkɪt rɪˈsɜːrtʃ/', example: 'Market research reveals strong demand for eco-friendly products.', category: 'trade' },
  { id: 'tr483', en: 'market share', zh: '市场份额', pos: 'n.', phonetic: '/ˈmɑːrkɪt ʃeər/', example: 'The company aims to increase its market share to 25%.', category: 'trade' },
  { id: 'tr484', en: 'market penetration', zh: '市场渗透', pos: 'n.', phonetic: '/ˈmɑːrkɪt ˌpenɪˈtreɪʃən/', example: 'Aggressive pricing is used as a market penetration strategy.', category: 'trade' },
  { id: 'tr485', en: 'competitive advantage', zh: '竞争优势', pos: 'n.', phonetic: '/kəmˈpetɪtɪv ədˈvæntɪdʒ/', example: 'Superior technology gives the company a competitive advantage.', category: 'trade' },
  { id: 'tr486', en: 'brand equity', zh: '品牌资产', pos: 'n.', phonetic: '/brænd ˈekwɪti/', example: 'Strong brand equity allows premium pricing in competitive markets.', category: 'trade' },
  { id: 'tr487', en: 'value chain', zh: '价值链', pos: 'n.', phonetic: '/ˈvæljuː tʃeɪn/', example: 'Analyzing the value chain helps identify opportunities for cost reduction.', category: 'trade' },
  { id: 'tr488', en: 'economies of scale', zh: '规模经济', pos: 'n.', phonetic: '/ɪˈkɒnəmiz əv skeɪl/', example: 'Larger production volumes achieve economies of scale, reducing unit costs.', category: 'trade' },
  { id: 'tr489', en: 'cost-effectiveness', zh: '成本效益', pos: 'n.', phonetic: '/kɒst ɪˈfektɪvnəs/', example: 'The cost-effectiveness of the new packaging design was demonstrated.', category: 'trade' },
  { id: 'tr490', en: 'break-even point', zh: '盈亏平衡点', pos: 'n.', phonetic: '/breɪk ˈiːvən pɔɪnt/', example: 'The project will reach its break-even point within 18 months.', category: 'trade' },
  { id: 'tr491', en: 'innovation', zh: '创新', pos: 'n.', phonetic: '/ˌɪnəˈveɪʃən/', example: 'Innovation is the key to staying ahead of competitors.', category: 'trade' },
  { id: 'tr492', en: 'compliance', zh: '合规', pos: 'n.', phonetic: '/kəmˈplaɪəns/', example: 'The company has a dedicated team to ensure regulatory compliance.', category: 'trade' },
  { id: 'tr493', en: 'sustainability', zh: '可持续性', pos: 'n.', phonetic: '/səˌsteɪnəˈbɪlɪti/', example: 'Sustainability has become a priority in global supply chain management.', category: 'trade' },
  { id: 'tr494', en: 'corporate social responsibility', zh: '企业社会责任', pos: 'n.', phonetic: '/ˈkɔːrpərət ˈsəʊʃəl rɪˌspɒnsɪˈbɪlɪti/', example: 'Corporate social responsibility initiatives include fair labor practices and environmental protection.', category: 'trade' },
  { id: 'tr495', en: 'CSR', zh: '企业社会责任', pos: 'abbr.', phonetic: '/ˌsiː es ˈɑːr/', example: 'CSR reports document the company\'s social and environmental impact.', category: 'trade' },
  { id: 'tr496', en: 'transparency', zh: '透明度', pos: 'n.', phonetic: '/trænsˈpærənsi/', example: 'Transparency in business dealings builds trust with partners.', category: 'trade' },
  { id: 'tr497', en: 'business ethics', zh: '商业道德', pos: 'n.', phonetic: '/ˈbɪznɪs ˈeθɪks/', example: 'Business ethics guide decision-making in complex situations.', category: 'trade' },
  { id: 'tr498', en: 'globalization', zh: '全球化', pos: 'n.', phonetic: '/ˌɡləʊbəlaɪˈzeɪʃən/', example: 'Globalization has expanded opportunities for businesses of all sizes.', category: 'trade' },
  { id: 'tr499', en: 'localization', zh: '本地化', pos: 'n.', phonetic: '/ˌləʊkəlaɪˈzeɪʃən/', example: 'Product localization involves adapting to local tastes and regulations.', category: 'trade' },
  { id: 'tr500', en: 'internationalization', zh: '国际化', pos: 'n.', phonetic: '/ˌɪntərˌnæʃnəlaɪˈzeɪʃən/', example: 'The internationalization strategy targets emerging economies first.', category: 'trade' },
  { id: 'tr501', en: 'exchange', zh: '交换/交易所', pos: 'n.', phonetic: '/ɪksˈtʃeɪndʒ/', example: 'The exchange of letters of credit was completed smoothly.', category: 'trade' },
  { id: 'tr502', en: 'World Bank', zh: '世界银行', pos: 'n.', phonetic: '/wɜːrld bæŋk/', example: 'The World Bank provides loans and grants to developing countries.', category: 'trade' },
  { id: 'tr503', en: 'ICC', zh: '国际商会', pos: 'abbr.', phonetic: '/ˌaɪ siː ˈsiː/', example: 'The ICC publishes the Incoterms rules used in international trade.', category: 'trade' },
  { id: 'tr504', en: 'chamber of commerce', zh: '商会', pos: 'n.', phonetic: '/ˈtʃeɪmbər əv ˈkɒmɜːrs/', example: 'The local chamber of commerce provides networking opportunities for exporters.', category: 'trade' }
];

// -- js/data.js --
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

// -- js/storage.js --
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

// -- js/vocabulary.js --
/**
 * Vocabulary Module — Flashcard learning + word list
 */

const VocabModule = {
  currentCategory: 'all',
  currentView: 'flashcard', // 'flashcard' | 'list'
  currentIndex: 0,
  words: [],

  init(category) {
    this.currentCategory = category || 'all';
    this.currentView = 'flashcard';
    this.currentIndex = 0;
    this.words = getWordsByCategory(this.currentCategory);
    this.render();
  },

  render() {
    const main = document.getElementById('mainContent');
    const learnedIds = getProgress().learnedWords;

    main.innerHTML = `
      <div class="fade-in">
        <!-- Category Chips -->
        <div class="category-chips" id="categoryChips">
          ${Object.entries(CATEGORIES).map(([key, cat]) => `
            <span class="chip${key === this.currentCategory ? ' active' : ''}"
                  data-category="${key}">${cat.icon} ${cat.name}</span>
          `).join('')}
        </div>

        <!-- View Toggle -->
        <div class="view-toggle">
          <button class="view-toggle-btn ${this.currentView === 'flashcard' ? 'active' : ''}" data-view="flashcard">
            🃏 卡片模式
          </button>
          <button class="view-toggle-btn ${this.currentView === 'list' ? 'active' : ''}" data-view="list">
            📋 列表模式
          </button>
        </div>

        <!-- Content Area -->
        <div id="vocabContent"></div>
      </div>
    `;

    // Bind category chips
    main.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        VocabModule.switchCategory(chip.dataset.category);
      });
    });

    // Bind view toggle
    main.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        VocabModule.switchView(btn.dataset.view);
      });
    });

    this.renderContent();
  },

  renderContent() {
    const container = document.getElementById('vocabContent');
    if (!container) return;

    if (this.currentView === 'flashcard') {
      this.renderFlashcard(container);
    } else {
      this.renderWordList(container);
    }
  },

  // ===== Flashcard View =====
  renderFlashcard(container) {
    if (this.words.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <div class="empty-text">该分类下没有单词</div>
        </div>`;
      return;
    }

    const word = this.words[this.currentIndex];
    const learned = isWordLearned(word.id);
    const total = this.words.length;

    container.innerHTML = `
      <div class="flashcard-container" id="flashcardContainer">
        <div class="flashcard" id="flashcard">
          <div class="flashcard-face flashcard-front">
            <button class="speaker-btn" id="speakerBtn" title="朗读发音">🔊</button>
            <div class="flashcard-word">${escapeHtml(word.en)}</div>
            <div class="flashcard-phonetic">${escapeHtml(word.phonetic)}</div>
            <div class="flashcard-hint">👆 点击翻转查看释义</div>
          </div>
          <div class="flashcard-face flashcard-back">
            ${word.pos ? `<span class="pos-badge">${escapeHtml(word.pos)}</span>` : ''}
            <div class="flashcard-meaning">${escapeHtml(word.zh)}</div>
            <div class="flashcard-example">
              <span class="example-text">${escapeHtml(word.example)}</span>
              <button class="sentence-speaker-btn" id="sentenceSpeaker" title="朗读例句">🔊</button>
            </div>
          </div>
        </div>
      </div>

      <div class="flashcard-controls">
        <button class="btn btn-outline btn-block" id="btnStillLearning"
                style="flex:1;">🔄 再学一次</button>
        <button class="btn ${learned ? 'btn-success' : 'btn-primary'} btn-block" id="btnIKnowIt"
                style="flex:1;">
          ${learned ? '✅ 已掌握' : '👍 我学会了'}
        </button>
      </div>

      <div class="flashcard-nav">
        <button class="btn btn-ghost btn-sm" id="btnPrev" ${this.currentIndex === 0 ? 'disabled' : ''}>
          ⬅ 上一个
        </button>
        <span class="flashcard-counter">${this.currentIndex + 1} / ${total}</span>
        <button class="btn btn-ghost btn-sm" id="btnNext" ${this.currentIndex >= total - 1 ? 'disabled' : ''}>
          下一个 ➡
        </button>
      </div>
    `;

    // Flashcard flip
    const card = document.getElementById('flashcard');
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Speaker button (stop click from flipping card)
    const speakerBtn = document.getElementById('speakerBtn');
    if (speakerBtn) {
      speakerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        speakWord(word.en);
      });
    }

    // Sentence speaker button
    const sentenceSpeaker = document.getElementById('sentenceSpeaker');
    if (sentenceSpeaker) {
      sentenceSpeaker.addEventListener('click', (e) => {
        e.stopPropagation();
        speakWord(word.example, 0.8);
      });
    }

    // Navigation
    document.getElementById('btnPrev').addEventListener('click', () => this.goPrev());
    document.getElementById('btnNext').addEventListener('click', () => this.goNext());

    // Know it / Still learning
    document.getElementById('btnIKnowIt').addEventListener('click', () => {
      if (isWordLearned(word.id)) {
        markWordUnlearned(word.id);
        showToast('已标记为"未掌握"', 'info');
      } else {
        markWordLearned(word.id);
        showToast('太棒了！已掌握 ✅', 'success');
        // Auto advance
        if (this.currentIndex < this.words.length - 1) {
          setTimeout(() => this.goNext(), 600);
        }
      }
      this.renderContent();
    });

    document.getElementById('btnStillLearning').addEventListener('click', () => {
      if (this.currentIndex < this.words.length - 1) {
        this.goNext();
      }
    });
  },

  goNext() {
    if (this.currentIndex < this.words.length - 1) {
      this.currentIndex++;
      this.renderContent();
    }
  },

  goPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderContent();
    }
  },

  // ===== Word List View =====
  renderWordList(container) {
    if (this.words.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <div class="empty-text">该分类下没有单词</div>
        </div>`;
      return;
    }

    const learnedIds = getProgress().learnedWords;
    const learnedCount = this.words.filter(w => learnedIds.includes(w.id)).length;

    container.innerHTML = `
      <div class="card" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-weight:600;">单词列表</span>
          <span style="font-size:0.85rem;color:var(--text-secondary);">
            已掌握: ${learnedCount} / ${this.words.length}
          </span>
        </div>
      </div>
      <div class="card" style="padding:0;overflow:hidden;">
        <table class="word-table">
          <thead>
            <tr>
              <th>状态</th>
              <th>单词</th>
              <th>词性</th>
              <th>音标</th>
              <th>释义</th>
              <th>朗读</th>
            </tr>
          </thead>
          <tbody>
            ${this.words.map(w => {
              const learned = learnedIds.includes(w.id);
              return `
                <tr class="${learned ? 'learned' : ''}">
                  <td><span class="status-icon">${learned ? '✅' : '⬜'}</span></td>
                  <td><strong>${escapeHtml(w.en)}</strong></td>
                  <td style="color:var(--primary);font-weight:500;font-size:0.8rem;">${w.pos ? escapeHtml(w.pos) : '—'}</td>
                  <td style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(w.phonetic)}</td>
                  <td>${escapeHtml(w.zh)}</td>
                  <td><button class="speaker-btn-sm" data-word="${escapeHtml(w.en)}" title="朗读">🔊</button></td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind speaker buttons in word list
    container.querySelectorAll('.speaker-btn-sm').forEach(btn => {
      btn.addEventListener('click', () => {
        speakWord(btn.dataset.word);
      });
    });
  },

  // ===== Actions =====
  switchCategory(category) {
    this.currentCategory = category;
    this.currentIndex = 0;
    this.words = getWordsByCategory(category);

    // Re-render chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(c => {
      c.classList.toggle('active', c.dataset.category === category);
    });

    this.renderContent();
  },

  switchView(view) {
    this.currentView = view;

    // Re-render toggle buttons
    document.querySelectorAll('.view-toggle-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });

    this.renderContent();
  },
};

// -- js/quiz.js --
/**
 * Quiz Module — Multiple choice, matching, spelling exercises
 */

const QuizModule = {
  quizType: 'choice',   // 'choice' | 'match' | 'spell'
  category: 'all',
  questions: [],
  currentQ: 0,
  score: 0,
  answers: [],          // track user answers for review
  startTime: 0,
  matchState: null,     // for matching game
  questionCount: 10,

  init() {
    this.quizType = 'choice';
    this.category = 'all';
    this.currentQ = 0;
    this.score = 0;
    this.answers = [];
    this.matchState = null;
    this.startTime = 0;
    this.renderTypeSelect();
  },

  // ===== Step 1: Select Quiz Type =====
  renderTypeSelect() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in">
        <div class="card">
          <div class="card-title">选择测验类型</div>
          <div class="quiz-type-select">
            <div class="quiz-type-card active" data-type="choice" id="qtChoice">
              <div class="qt-icon">🔤</div>
              <div class="qt-label">选择词义</div>
              <div class="qt-desc">看英文选中文</div>
            </div>
            <div class="quiz-type-card" data-type="match" id="qtMatch">
              <div class="qt-icon">🔗</div>
              <div class="qt-label">连连看</div>
              <div class="qt-desc">匹配英中词义</div>
            </div>
            <div class="quiz-type-card" data-type="spell" id="qtSpell">
              <div class="qt-icon">✏️</div>
              <div class="qt-label">拼写练习</div>
              <div class="qt-desc">看中文写英文</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">选择分类</div>
          <div class="category-chips" id="quizCategoryChips">
            ${Object.entries(CATEGORIES).map(([key, cat]) => `
              <span class="chip${key === 'all' ? ' active' : ''}" data-category="${key}">
                ${cat.icon} ${cat.name}
              </span>
            `).join('')}
          </div>
        </div>

        <button class="btn btn-primary btn-lg btn-block" id="btnStartQuiz">
          🚀 开始测验
        </button>
      </div>
    `;

    // Quiz type selection
    main.querySelectorAll('.quiz-type-card').forEach(card => {
      card.addEventListener('click', () => {
        main.querySelectorAll('.quiz-type-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        QuizModule.quizType = card.dataset.type;
      });
    });

    // Category selection
    main.querySelectorAll('#quizCategoryChips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        main.querySelectorAll('#quizCategoryChips .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        QuizModule.category = chip.dataset.category;
      });
    });

    document.getElementById('btnStartQuiz').addEventListener('click', () => {
      QuizModule.startQuiz();
    });
  },

  // ===== Start Quiz =====
  startQuiz() {
    const pool = getWordsByCategory(this.category);
    if (pool.length < 4) {
      showToast('该分类单词太少，请选其他分类', 'warning');
      return;
    }

    // For matching, use 5 pairs; for others, use 10
    const count = this.quizType === 'match' ? 5 : Math.min(this.questionCount, pool.length);
    const selected = pickRandom(pool, count);

    this.questions = selected;
    this.currentQ = 0;
    this.score = 0;
    this.answers = [];
    this.matchState = null;
    this.startTime = Date.now();

    if (this.quizType === 'match') {
      this.renderMatch();
    } else if (this.quizType === 'spell') {
      this.renderSpellQuestion();
    } else {
      this.renderChoiceQuestion();
    }

    // Record study activity
    recordStudyActivity();
    App.updateHeaderStreak();
  },

  // ===== Multiple Choice =====
  renderChoiceQuestion() {
    if (this.currentQ >= this.questions.length) {
      this.showResult();
      return;
    }

    const q = this.questions[this.currentQ];
    const pool = getWordsByCategory(this.category).filter(w => w.id !== q.id);
    const distractors = pickRandom(pool, 3);
    const options = shuffle([q, ...distractors]);

    const main = document.getElementById('mainContent');
    const progress = Math.round((this.currentQ / this.questions.length) * 100);

    main.innerHTML = `
      <div class="fade-in">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" style="width:${progress}%"></div>
        </div>
        <div style="text-align:center;color:var(--text-secondary);margin-bottom:16px;font-size:0.85rem;">
          第 ${this.currentQ + 1} / ${this.questions.length} 题
        </div>
        <div class="quiz-question">
          "${escapeHtml(q.en)}" 的中文意思是？
          <button class="speaker-btn-inline" id="quizSpeaker" title="朗读发音">🔊</button>
        </div>
        <div class="quiz-options" id="quizOptions">
          ${options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}" data-word-id="${opt.id}">
              ${String.fromCharCode(65 + i)}. ${escapeHtml(opt.zh)}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    let answered = false;

    // Speaker button
    const quizSpeaker = document.getElementById('quizSpeaker');
    if (quizSpeaker) {
      quizSpeaker.addEventListener('click', (e) => {
        e.stopPropagation();
        speakWord(q.en);
      });
    }

    main.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = btn.dataset.wordId === q.id;

        // Highlight correct/wrong
        main.querySelectorAll('.quiz-option').forEach(b => {
          b.style.pointerEvents = 'none';
          if (b.dataset.wordId === q.id) b.classList.add('correct');
          else if (b === btn && !isCorrect) b.classList.add('wrong');
        });

        if (isCorrect) {
          this.score++;
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
        }

        this.answers.push({ word: q, userAnswer: btn.textContent.trim().slice(3), correct: isCorrect });

        setTimeout(() => {
          this.currentQ++;
          this.renderChoiceQuestion();
        }, 1000);
      });
    });
  },

  // ===== Matching Game =====
  renderMatch() {
    const enWords = shuffle([...this.questions]);
    const zhWords = shuffle([...this.questions]);

    this.matchState = {
      enWords,
      zhWords,
      selectedEn: null,
      selectedZh: null,
      matchedPairs: [],
      attempts: 0,
      correctCount: 0,
    };

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in">
        <div style="text-align:center;color:var(--text-secondary);margin-bottom:12px;font-size:0.85rem;">
          点击左边的英文，再点击右边对应的中文释义
        </div>
        <div class="quiz-progress" style="margin-bottom:12px;">
          <div class="quiz-progress-bar" id="matchProgress" style="width:0%"></div>
        </div>
        <div class="match-container">
          <div class="match-column" id="matchEnCol">
            ${enWords.map((w, i) => `
              <div class="match-item en-item" data-index="${i}" data-word-id="${w.id}">
                ${escapeHtml(w.en)}
              </div>
            `).join('')}
          </div>
          <div class="match-column" id="matchZhCol">
            ${zhWords.map((w, i) => `
              <div class="match-item zh-item" data-index="${i}" data-word-id="${w.id}">
                ${escapeHtml(w.zh)}
              </div>
            `).join('')}
          </div>
        </div>
        <div style="text-align:center;margin-top:12px;color:var(--text-secondary);font-size:0.85rem;" id="matchStatus">
          已匹配: 0 / ${this.questions.length}
        </div>
      </div>
    `;

    this.bindMatchEvents();
  },

  bindMatchEvents() {
    const enItems = document.querySelectorAll('.en-item');
    const zhItems = document.querySelectorAll('.zh-item');

    enItems.forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;

        // Deselect all en
        enItems.forEach(i => i.classList.remove('selected'));
        // Keep zh selected if already chosen
        item.classList.add('selected');
        this.matchState.selectedEn = { el: item, wordId: item.dataset.wordId };

        this.tryMatch();
      });
    });

    zhItems.forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;

        zhItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        this.matchState.selectedZh = { el: item, wordId: item.dataset.wordId };

        this.tryMatch();
      });
    });
  },

  tryMatch() {
    const { selectedEn, selectedZh } = this.matchState;
    if (!selectedEn || !selectedZh) return;

    this.matchState.attempts++;

    if (selectedEn.wordId === selectedZh.wordId) {
      // Correct match!
      selectedEn.el.classList.add('matched');
      selectedZh.el.classList.add('matched');
      selectedEn.el.classList.remove('selected');
      selectedZh.el.classList.remove('selected');
      this.matchState.matchedPairs.push(selectedEn.wordId);
      this.matchState.correctCount++;
      this.matchState.selectedEn = null;
      this.matchState.selectedZh = null;

      document.getElementById('matchStatus').textContent =
        `已匹配: ${this.matchState.correctCount} / ${this.questions.length}`;

      const pct = (this.matchState.correctCount / this.questions.length) * 100;
      document.getElementById('matchProgress').style.width = pct + '%';

      if (this.matchState.correctCount >= this.questions.length) {
        // All done!
        this.score = this.matchState.correctCount;
        this.answers = this.matchState.matchedPairs.map(id => ({
          word: getWordById(id),
          correct: true,
        }));
        setTimeout(() => this.showResult(), 500);
      }
    } else {
      // Wrong match — shake both
      selectedEn.el.classList.add('wrong-match');
      selectedZh.el.classList.add('wrong-match');
      setTimeout(() => {
        selectedEn.el.classList.remove('wrong-match', 'selected');
        selectedZh.el.classList.remove('wrong-match', 'selected');
        this.matchState.selectedEn = null;
        this.matchState.selectedZh = null;
      }, 400);
    }
  },

  // ===== Spelling Quiz =====
  renderSpellQuestion() {
    if (this.currentQ >= this.questions.length) {
      this.showResult();
      return;
    }

    const q = this.questions[this.currentQ];
    const main = document.getElementById('mainContent');
    const progress = Math.round((this.currentQ / this.questions.length) * 100);

    main.innerHTML = `
      <div class="fade-in">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" style="width:${progress}%"></div>
        </div>
        <div style="text-align:center;color:var(--text-secondary);margin-bottom:16px;font-size:0.85rem;">
          第 ${this.currentQ + 1} / ${this.questions.length} 题
        </div>
        <div class="quiz-question">
          "${escapeHtml(q.zh)}" 的英文是？
          <button class="speaker-btn-inline" id="spellSpeaker" title="朗读发音">🔊</button>
        </div>
        <div style="margin-bottom:16px;">
          <input type="text" class="quiz-input" id="spellInput"
                 placeholder="请输入英文单词..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        </div>
        <div id="spellHint" style="text-align:center;min-height:24px;font-size:0.85rem;"></div>
        <button class="btn btn-primary btn-block" id="btnSubmitSpell">确认提交</button>
        <button class="btn btn-ghost btn-block btn-sm" id="btnSkipSpell" style="margin-top:8px;">跳过</button>
      </div>
    `;

    const input = document.getElementById('spellInput');
    input.focus();

    // Speaker button for spelling quiz
    const spellSpeaker = document.getElementById('spellSpeaker');
    if (spellSpeaker) {
      spellSpeaker.addEventListener('click', (e) => {
        e.stopPropagation();
        speakWord(q.en);
      });
    }

    let submitted = false;

    const submitAnswer = () => {
      if (submitted) return;
      submitted = true;

      const userAnswer = input.value.trim();
      // Case-insensitive, trim comparison
      // Also accept answer without extra spaces
      const correct = userAnswer.toLowerCase() === q.en.toLowerCase();

      if (correct) {
        this.score++;
        document.getElementById('spellHint').innerHTML =
          `<span style="color:var(--success);">✅ 正确！</span>`;
      } else {
        document.getElementById('spellHint').innerHTML =
          `<span style="color:var(--danger);">❌ 正确答案: <strong>${escapeHtml(q.en)}</strong></span>`;
      }

      this.answers.push({ word: q, userAnswer, correct });

      document.getElementById('btnSubmitSpell').disabled = true;
      input.disabled = true;

      setTimeout(() => {
        this.currentQ++;
        this.renderSpellQuestion();
      }, 1500);
    };

    document.getElementById('btnSubmitSpell').addEventListener('click', submitAnswer);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitAnswer();
    });
    document.getElementById('btnSkipSpell').addEventListener('click', () => {
      if (submitted) return;
      submitted = true;

      this.answers.push({ word: q, userAnswer: '(跳过)', correct: false });
      document.getElementById('spellHint').innerHTML =
        `<span style="color:var(--text-secondary);">正确答案: <strong>${escapeHtml(q.en)}</strong></span>`;

      setTimeout(() => {
        this.currentQ++;
        this.renderSpellQuestion();
      }, 1500);
    });
  },

  // ===== Result Screen =====
  showResult() {
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000);
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);

    // Save result
    addQuizResult(this.score, total, this.category);

    // Determine grade
    let grade, gradeEmoji;
    if (pct >= 90) { grade = 'great'; gradeEmoji = '🎉'; }
    else if (pct >= 70) { grade = 'good'; gradeEmoji = '👍'; }
    else if (pct >= 50) { grade = 'ok'; gradeEmoji = '💪'; }
    else { grade = 'poor'; gradeEmoji = '📚'; }

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in quiz-result">
        <div class="quiz-score-circle ${grade}">
          <span class="quiz-score-number">${this.score}/${total}</span>
          <span class="quiz-score-label">正确率 ${pct}%</span>
        </div>
        <h2 style="margin-bottom:8px;">${gradeEmoji} ${pct >= 70 ? '做得好！' : '继续加油！'}</h2>
        <p style="color:var(--text-secondary);margin-bottom:20px;">
          用时 ${timeTaken} 秒
        </p>

        ${this.answers.filter(a => !a.correct).length > 0 ? `
        <div class="card" style="text-align:left;">
          <div class="card-title">📝 错题回顾</div>
          <table class="word-table">
            <thead><tr><th>单词</th><th>你的答案</th><th>正确答案</th></tr></thead>
            <tbody>
              ${this.answers.filter(a => !a.correct).map(a => `
                <tr>
                  <td><strong>${escapeHtml(a.word.en)}</strong></td>
                  <td style="color:var(--danger);">${escapeHtml(a.userAnswer || '-')}</td>
                  <td style="color:var(--success);">${escapeHtml(a.word.zh)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : `
        <div class="card">
          <p style="color:var(--success);font-weight:600;">🏆 全部正确！太厉害了！</p>
        </div>`}

        <div style="display:flex;gap:12px;margin-top:16px;">
          <button class="btn btn-outline btn-block" id="btnRetry" style="flex:1;">🔄 再来一次</button>
          <button class="btn btn-primary btn-block" id="btnBackToQuiz" style="flex:1;">📋 返回选择</button>
        </div>
      </div>
    `;

    document.getElementById('btnRetry').addEventListener('click', () => {
      if (this.quizType === 'match') {
        this.renderMatch();
      } else if (this.quizType === 'spell') {
        this.currentQ = 0;
        this.score = 0;
        this.answers = [];
        this.startTime = Date.now();
        this.renderSpellQuestion();
      } else {
        this.currentQ = 0;
        this.score = 0;
        this.answers = [];
        this.startTime = Date.now();
        this.renderChoiceQuestion();
      }
    });

    document.getElementById('btnBackToQuiz').addEventListener('click', () => {
      this.init();
    });

    // Confetti for good scores
    if (pct >= 80) {
      setTimeout(() => triggerConfetti(2000), 300);
    }

    // Update header streak
    App.updateHeaderStreak();
  },
};

// -- js/checkin.js --
/**
 * Daily Check-in Module — Habit tracking with calendar heatmap
 */

const CheckinModule = {
  init() {
    this.render();
  },

  render() {
    const main = document.getElementById('mainContent');
    const progress = getProgress();
    const log = getDailyLog();
    const today = getToday();
    const checkedToday = !!log[today];

    // Weekly goal: study 5 out of 7 days
    const weekDays = [];
    for (let i = 6; i >= 0; i--) {
      weekDays.push(getDateBefore(i));
    }
    const weekStudied = weekDays.filter(d => log[d]).length;
    const weekGoal = 5;
    const weekProgress = Math.min(100, Math.round((weekStudied / weekGoal) * 100));

    main.innerHTML = `
      <div class="fade-in">
        <!-- Check-in Button -->
        <div class="card" style="text-align:center;">
          <div class="checkin-status">
            <button class="checkin-btn ${checkedToday ? 'checked' : ''}" id="btnCheckin"
                    ${checkedToday ? 'disabled' : ''}>
              ${checkedToday ? '✅' : '📅'}
            </button>
          </div>
          <h3 style="margin-bottom:4px;">
            ${checkedToday ? '今日已打卡！' : '今天学习了吗？'}
          </h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            🔥 连续学习 <strong>${progress.streak}</strong> 天
          </p>
        </div>

        <!-- Weekly Goal -->
        <div class="card" style="text-align:center;">
          <div class="card-title">本周目标</div>
          <div class="progress-ring-container">
            <div class="progress-ring" style="--progress:${weekProgress}%;">
              ${weekStudied}/${weekGoal}
            </div>
          </div>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:8px;">
            每周学习 ${weekGoal} 天 · 本周已完成 ${weekStudied} 天
          </p>
        </div>

        <!-- Calendar Heatmap -->
        <div class="card">
          <div class="card-title">学习热力图（近3个月）</div>
          <div id="heatmapContainer"></div>
        </div>
      </div>
    `;

    this.renderHeatmap();
    this.bindEvents();
  },

  renderHeatmap() {
    const container = document.getElementById('heatmapContainer');
    if (!container) return;

    const log = getDailyLog();
    const today = getToday();

    // Generate last 12 weeks (84 days)
    const days = [];
    for (let i = 83; i >= 0; i--) {
      days.push(getDateBefore(i));
    }

    // Find max for level calculation
    const maxCount = Math.max(1, ...days.map(d => log[d] || 0));

    const getLevel = (count) => {
      if (!count) return 0;
      if (count <= maxCount * 0.25) return 1;
      if (count <= maxCount * 0.5) return 2;
      if (count <= maxCount * 0.75) return 3;
      return 4;
    };

    // Build calendar weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Month labels
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const monthLabels = [];
    weeks.forEach((week, wi) => {
      const d = new Date(week[0]);
      const label = monthNames[d.getMonth()];
      if (wi === 0 || label !== monthLabels[monthLabels.length - 1]) {
        monthLabels.push(label);
      } else {
        monthLabels.push('');
      }
    });

    container.innerHTML = `
      <div style="display:flex;gap:4px;overflow-x:auto;padding-bottom:4px;">
        ${weeks.map((week, wi) => `
          <div style="display:flex;flex-direction:column;gap:4px;align-items:center;">
            <span style="font-size:0.65rem;color:var(--text-muted);margin-bottom:2px;min-height:14px;">
              ${monthLabels[wi]}
            </span>
            ${week.map(d => {
              const count = log[d] || 0;
              const level = getLevel(count);
              const dateLabel = d.slice(5); // MM-DD
              return `<div class="heatmap-cell level-${level}"
                    title="${dateLabel}: ${count || '无'}次学习"
                    style="cursor:default;"></div>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
      <div class="heatmap-legend">
        <span>少</span>
        <div class="heatmap-cell level-0"></div>
        <div class="heatmap-cell level-1"></div>
        <div class="heatmap-cell level-2"></div>
        <div class="heatmap-cell level-3"></div>
        <div class="heatmap-cell level-4"></div>
        <span>多</span>
      </div>
    `;
  },

  bindEvents() {
    const btn = document.getElementById('btnCheckin');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const today = getToday();
      const log = getDailyLog();
      log[today] = (log[today] || 0) + 1;
      saveDailyLog(log);

      const progress = recordStudyActivity();

      showToast('打卡成功！继续加油 🎉', 'success');
      triggerConfetti(1500);
      App.updateHeaderStreak();

      // Re-render
      setTimeout(() => this.render(), 800);
    });
  },
};

// -- js/stats.js --
/**
 * Statistics Module — Learning progress dashboard
 */

const StatsModule = {
  init() {
    this.render();
  },

  render() {
    const main = document.getElementById('mainContent');
    const progress = getProgress();
    const log = getDailyLog();
    const totalWords = WORD_BANK.length;
    const learnedCount = progress.learnedWords.length;

    // Quiz stats
    const quizHistory = progress.quizHistory || [];
    const avgScore = quizHistory.length > 0
      ? Math.round(quizHistory.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizHistory.length)
      : 0;
    const totalQuizzes = quizHistory.length;

    // Category breakdown
    const catStats = {};
    Object.keys(CATEGORIES).filter(k => k !== 'all').forEach(cat => {
      const total = getWordsByCategory(cat).length;
      const learned = getWordsByCategory(cat).filter(w => progress.learnedWords.includes(w.id)).length;
      catStats[cat] = { total, learned, pct: total > 0 ? Math.round((learned / total) * 100) : 0 };
    });

    main.innerHTML = `
      <div class="fade-in">
        <!-- Overview Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${learnedCount}</div>
            <div class="stat-label">已掌握单词</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${totalWords - learnedCount}</div>
            <div class="stat-label">待学习单词</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${avgScore}%</div>
            <div class="stat-label">测验平均分</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🔥 ${progress.streak}</div>
            <div class="stat-label">连续学习天数</div>
          </div>
        </div>

        <!-- Learning Trend Chart -->
        <div class="card">
          <div class="card-title">📈 近7天学习趋势</div>
          <div id="trendChart"></div>
        </div>

        <!-- Category Breakdown -->
        <div class="card">
          <div class="card-title">📊 分类掌握情况</div>
          <div id="catBreakdown">
            ${Object.entries(catStats).map(([key, stat]) => {
              const cat = CATEGORIES[key];
              return `
                <div style="margin-bottom:12px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:0.85rem;">
                    <span>${cat.icon} ${cat.name}</span>
                    <span style="color:var(--text-secondary);">${stat.learned}/${stat.total}</span>
                  </div>
                  <div style="height:8px;background:var(--border);border-radius:4px;overflow:hidden;">
                    <div style="height:100%;width:${stat.pct}%;background:${cat.color};
                      border-radius:4px;transition:width 0.8s ease;"></div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card">
          <div class="card-title">📝 最近测验记录</div>
          ${totalQuizzes === 0 ? `
            <div class="empty-state" style="padding:20px;">
              <div class="empty-text">还没有测验记录，去做一次测验吧！</div>
            </div>` : `
            <div style="max-height:200px;overflow-y:auto;">
              ${quizHistory.slice(-10).reverse().map((q, i) => {
                const pct = Math.round((q.score / q.total) * 100);
                const catName = CATEGORIES[q.category] ? CATEGORIES[q.category].name : '全部';
                return `
                  <div style="display:flex;justify-content:space-between;align-items:center;
                    padding:8px 0;border-bottom:1px solid var(--border);font-size:0.85rem;">
                    <span>📅 ${q.date}</span>
                    <span style="color:var(--text-secondary);">${catName}</span>
                    <span style="font-weight:600;color:${pct >= 70 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'};">
                      ${q.score}/${q.total} (${pct}%)
                    </span>
                  </div>`;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Reset Button -->
        <div style="text-align:center;margin-top:24px;margin-bottom:16px;">
          <button class="btn btn-ghost btn-sm" id="btnResetData"
                  style="color:var(--text-muted);font-size:0.8rem;">
            🗑️ 重置所有数据
          </button>
        </div>
      </div>
    `;

    // Render chart after DOM update
    this.renderTrendChart();

    // Reset handler
    document.getElementById('btnResetData').addEventListener('click', () => {
      if (confirm('确定要删除所有学习记录吗？此操作不可恢复！')) {
        resetAllData();
        showToast('数据已重置', 'info');
        this.render();
        App.updateHeaderStreak();
      }
    });
  },

  renderTrendChart() {
    const container = document.getElementById('trendChart');
    if (!container) return;

    const log = getDailyLog();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = getDateBefore(i);
      days.push({ date: d, label: this.getDayLabel(d, i), count: log[d] || 0 });
    }

    const maxCount = Math.max(1, ...days.map(d => d.count));

    container.innerHTML = `
      <div class="bar-chart">
        ${days.map(d => {
          const height = Math.max(4, Math.round((d.count / maxCount) * 100));
          const isToday = d.date === getToday();
          return `
            <div class="bar-col">
              <div class="bar-fill" style="height:${height}%;${isToday ? 'background:linear-gradient(180deg, #F59E0B, #EF4444);' : ''}"
                   title="${d.date}: ${d.count}次学习"></div>
              <span class="bar-label" style="${isToday ? 'font-weight:700;color:var(--text);' : ''}">
                ${d.label}
              </span>
            </div>`;
        }).join('')}
      </div>
      <div style="text-align:center;font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
        总计 ${days.reduce((s, d) => s + d.count, 0)} 次学习活动
      </div>
    `;
  },

  getDayLabel(dateStr, daysAgo) {
    if (daysAgo === 0) return '今天';
    if (daysAgo === 1) return '昨天';
    const d = new Date(dateStr);
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    return `周${days[d.getDay()]}`;
  },
};

// -- js/app.js --
/**
 * App Shell — Routing, tab switching, initialization
 */

const App = {
  currentTab: 'vocab',

  init() {
    // Determine initial tab from hash or default
    const hash = window.location.hash.replace('#', '');
    this.currentTab = ['vocab', 'quiz', 'checkin', 'stats'].includes(hash)
      ? hash : 'vocab';

    // Bind tab bar
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '');
      if (['vocab', 'quiz', 'checkin', 'stats'].includes(newHash)) {
        this.switchTab(newHash, true);
      }
    });

    // Initial render
    this.updateHeaderStreak();
    this.renderTab(this.currentTab);
    this.updateActiveTab();
  },

  switchTab(tab, fromHashChange) {
    if (tab === this.currentTab) return;
    this.currentTab = tab;
    this.updateActiveTab();
    this.renderTab(tab);

    // Update hash without triggering hashchange
    if (!fromHashChange) {
      window.location.hash = `#${tab}`;
    }

    // Scroll to top
    document.getElementById('mainContent').scrollTop = 0;
  },

  updateActiveTab() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === this.currentTab);
    });
  },

  renderTab(tab) {
    switch (tab) {
      case 'vocab':
        VocabModule.init(VocabModule.currentCategory);
        break;
      case 'quiz':
        QuizModule.init();
        break;
      case 'checkin':
        CheckinModule.init();
        break;
      case 'stats':
        StatsModule.init();
        break;
    }
  },

  updateHeaderStreak() {
    const progress = getProgress();
    const badge = document.getElementById('headerStreak');
    if (badge) {
      badge.textContent = `🔥 ${progress.streak}`;
    }
  },
};

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

