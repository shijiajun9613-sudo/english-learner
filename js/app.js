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
