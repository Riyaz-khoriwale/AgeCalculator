import { ThemeSwitcher } from './ThemeSwitcher.js';

export class Header {
  static render() {
    return `
      <header class="header" role="banner">
        <div class="header-content">
          <a href="#" class="logo" aria-label="Age Calculator Home">
            🎂 AgeCalc Pro
          </a>
          <div class="header-controls">
            ${ThemeSwitcher.render()}
            <nav class="nav" role="navigation" aria-label="Main navigation">
              <a href="#calculator" class="nav-link">Calculator</a>
              <a href="#famous" class="nav-link">Famous People</a>
              <a href="#planetary-ages" class="nav-link">Planets</a>
              <a href="#premium" class="nav-link">Premium</a>
            </nav>
          </div>
        </div>
      </header>
    `;
  }

  static init() {
    ThemeSwitcher.init();
  }
}
