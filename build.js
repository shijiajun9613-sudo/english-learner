/**
 * Build script — bundles all JS into a single file for production deployment.
 * Usage: node build.js
 * Output: dist/ folder ready to upload to any static hosting.
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

// Clean dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
fs.mkdirSync(DIST, { recursive: true });

// JS files in dependency order
const jsFiles = [
  'js/utils.js',
  'js/data/words_food.js',
  'js/data/words_daily.js',
  'js/data/words_travel.js',
  'js/data/words_nature.js',
  'js/data/words_work.js',
  'js/data/words_technology.js',
  'js/data/words_emotion.js',
  'js/data/words_education.js',
  'js/data/words_animals.js',
  'js/data/words_health.js',
  'js/data/words_shopping.js',
  'js/data/words_sports.js',
  'js/data/words_trade.js',
  'js/data.js',
  'js/storage.js',
  'js/vocabulary.js',
  'js/quiz.js',
  'js/checkin.js',
  'js/stats.js',
  'js/app.js',
];

// Bundle JS
console.log('Bundling JavaScript...');
let bundleJs = '// English Learner - Production Bundle\n';
bundleJs += '// Built at: ' + new Date().toISOString() + '\n\n';

for (const file of jsFiles) {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.warn('  MISSING: ' + file);
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  bundleJs += '// -- ' + file + ' --\n';
  bundleJs += content + '\n';
  console.log('  OK ' + file);
}

fs.writeFileSync(path.join(DIST, 'bundle.js'), bundleJs, 'utf8');
console.log('  bundle.js: ' + (Buffer.byteLength(bundleJs) / 1024).toFixed(1) + ' KB');

// Process HTML
console.log('\nProcessing index.html...');
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Fix CSS path for flat dist folder
html = html.replace('href="css/style.css"', 'href="style.css"');

// Remove all individual <script> tags — keep only the single bundle reference
const scriptStartMarker = '  <!-- Scripts -->';
const scriptEndMarker = '  <script src="js/app.js"></script>';
const scriptStartIdx = html.indexOf(scriptStartMarker);
const scriptEndIdx = html.indexOf(scriptEndMarker);

if (scriptStartIdx !== -1 && scriptEndIdx !== -1) {
  const before = html.substring(0, scriptStartIdx);
  const after = html.substring(scriptEndIdx + scriptEndMarker.length);
  html = before + '  <!-- Scripts -->\n  <script src="bundle.js"></script>' + after;
}

fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
console.log('  OK index.html');

// Copy CSS
console.log('\nCopying CSS...');
fs.copyFileSync(path.join(__dirname, 'css', 'style.css'), path.join(DIST, 'style.css'));
console.log('  OK style.css');

// Summary
console.log('\n' + '='.repeat(50));
console.log('Build complete! Deploy the dist/ folder to any static host.');
console.log('Folder: ' + DIST);
const files = fs.readdirSync(DIST);
console.log('Files: ' + files.join(', '));
const totalSize = files.reduce((s, f) => s + fs.statSync(path.join(DIST, f)).size, 0);
console.log('Total: ' + (totalSize / 1024).toFixed(1) + ' KB');
