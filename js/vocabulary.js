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
