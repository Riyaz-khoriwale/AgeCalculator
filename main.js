import './style.css';
import { AgeCalculator } from './src/components/AgeCalculator.js';
import { FamousPeople } from './src/components/FamousPeople.js';
import { Header } from './src/components/Header.js';
import { Footer } from './src/components/Footer.js';
import { PlanetaryAges } from './src/components/PlanetaryAges.js';
import { ShareableCards } from './src/components/ShareableCards.js';
import { LifeStatistics } from './src/components/LifeStatistics.js';
import { BirthdayCountdown } from './src/components/BirthdayCountdown.js';

class App {
  constructor() {
    this.app = document.getElementById('app');
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
    this.initializeComponents();
  }

  render() {
    this.app.innerHTML = `
      <div class="app-container">
        ${Header.render()}
        <main class="main-content">
          ${AgeCalculator.render()}
          ${BirthdayCountdown.render()}
          ${PlanetaryAges.render()}
          ${LifeStatistics.render()}
          ${ShareableCards.render()}
          ${FamousPeople.render()}
        </main>
        ${Footer.render()}
      </div>
    `;
  }

  initializeComponents() {
    // Initialize all components
    Header.init();
    AgeCalculator.init();
    FamousPeople.init();
    PlanetaryAges.init();
    ShareableCards.init();
    LifeStatistics.init();
    BirthdayCountdown.init();
  }

  setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Cleanup intervals when page unloads
    window.addEventListener('beforeunload', () => {
      AgeCalculator.stopLiveUpdates();
      BirthdayCountdown.stopCountdown();
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
