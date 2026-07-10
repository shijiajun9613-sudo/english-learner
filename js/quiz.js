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
