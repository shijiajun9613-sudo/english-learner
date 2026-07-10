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
