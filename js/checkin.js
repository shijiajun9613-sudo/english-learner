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
