export class ThemeSwitcher {
  static themes = [
    { name: 'light', label: '☀️ Light', icon: '☀️' },
    { name: 'dark', label: '🌙 Dark', icon: '🌙' },
    { name: 'birthday', label: '🎉 Birthday', icon: '🎉' },
    { name: 'space', label: '🌌 Space', icon: '🌌' }
  ];

  static currentTheme = 'light';

  static render() {
    return `
      <div class="theme-switcher" aria-label="Theme selector">
        <button class="theme-toggle-btn" id="theme-toggle" aria-label="Change theme">
          <span id="theme-icon">☀️</span>
        </button>
        <div class="theme-dropdown" id="theme-dropdown" style="display: none;">
          ${this.themes.map(theme => `
            <button class="theme-option" data-theme="${theme.name}">
              ${theme.icon} ${theme.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  static init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('ageCalcTheme') || 'light';
    this.setTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    const dropdown = document.getElementById('theme-dropdown');

    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) {
          dropdown.style.display = 'none';
        }
      });

      // Theme option handlers
      dropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('theme-option')) {
          const themeName = e.target.dataset.theme;
          this.setTheme(themeName);
          dropdown.style.display = 'none';
        }
      });
    }
  }

  static setTheme(themeName) {
    this.currentTheme = themeName;
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('ageCalcTheme', themeName);

    const themeIcon = document.getElementById('theme-icon');
    const theme = this.themes.find(t => t.name === themeName);
    if (themeIcon && theme) {
      themeIcon.textContent = theme.icon;
    }
  }
}
