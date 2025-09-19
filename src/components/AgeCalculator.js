import { MilestoneDetector } from './MilestoneDetector.js';
import { PlanetaryAges } from './PlanetaryAges.js';
import { LifeStatistics } from './LifeStatistics.js';
import { BirthdayCountdown } from './BirthdayCountdown.js';

export class AgeCalculator {
  static liveUpdateInterval = null;
  static birthDate = null;

  static render() {
    return `
      <section class="age-calculator" id="calculator" aria-labelledby="calculator-title">
        <h1 id="calculator-title" class="calculator-title">Calculate Your Exact Age</h1>
        <p class="calculator-subtitle">
          Get precise age calculations with multiple formats, planetary ages, and life statistics
        </p>
        
        <form class="calculator-form" aria-label="Age calculation form">
          <div class="date-input-group">
            <label for="birth-date" class="input-label">
              Your Birth Date
            </label>
            <input 
              type="date" 
              id="birth-date" 
              class="date-input"
              aria-describedby="birth-date-help"
              required
            >
            <div id="birth-date-help" class="sr-only">
              Enter your birth date to calculate your age
            </div>
            
            <label for="timezone-select" class="input-label">
              Timezone (Auto-detected)
            </label>
            <select id="timezone-select" class="timezone-select" aria-describedby="timezone-help">
              <option value="auto">Auto-detect Timezone</option>
            </select>
            <div id="timezone-help" class="sr-only">
              Your timezone is automatically detected but can be changed
            </div>
          </div>
          
          <button type="submit" class="calculate-btn" aria-describedby="calculate-help">
            🎯 Calculate My Age
          </button>
          <div id="calculate-help" class="sr-only">
            Click to calculate your exact age in multiple formats
          </div>
        </form>
        
        <div class="age-results" id="age-results" role="region" aria-live="polite" aria-label="Age calculation results">
          <!-- Results will be populated here -->
        </div>
      </section>
    `;
  }

  static init() {
    this.setupTimezoneDetection();
    this.setupEventListeners();
  }

  static setupTimezoneDetection() {
    const select = document.getElementById('timezone-select');
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Add detected timezone
    select.innerHTML = `
      <option value="${userTimezone}">${userTimezone} (Auto-detected)</option>
      <option value="UTC">UTC</option>
      <option value="America/New_York">Eastern Time</option>
      <option value="America/Chicago">Central Time</option>
      <option value="America/Denver">Mountain Time</option>
      <option value="America/Los_Angeles">Pacific Time</option>
      <option value="Europe/London">London</option>
      <option value="Europe/Paris">Paris</option>
      <option value="Asia/Tokyo">Tokyo</option>
      <option value="Asia/Shanghai">Shanghai</option>
      <option value="Australia/Sydney">Sydney</option>
    `;
  }

  static setupEventListeners() {
    const form = document.querySelector('.calculator-form');
    const birthDateInput = document.getElementById('birth-date');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculateAge();
    });

    // Real-time calculation on date change
    birthDateInput.addEventListener('change', () => {
      if (birthDateInput.value) {
        this.calculateAge();
      }
    });
  }

  static calculateAge() {
    const birthDateInput = document.getElementById('birth-date');
    const timezoneSelect = document.getElementById('timezone-select');
    const resultsContainer = document.getElementById('age-results');

    if (!birthDateInput.value) {
      resultsContainer.innerHTML = '<p>Please enter your birth date</p>';
      return;
    }

    this.birthDate = new Date(birthDateInput.value);
    const timezone = timezoneSelect.value;
    
    // Show loading state
    resultsContainer.innerHTML = `
      <div class="loading-container">
        <div class="loading" aria-label="Calculating age"></div>
        <p>Calculating your amazing age statistics...</p>
      </div>
    `;

    // Simulate brief loading for better UX
    setTimeout(() => {
      const ageData = this.calculateAgeData(this.birthDate, timezone);
      this.displayResults(ageData);
      this.startLiveUpdates();
      
      // Store age data globally for sharing features
      window.currentAgeData = ageData;
      
      // Check for milestone celebration
      const milestone = MilestoneDetector.checkMilestone(ageData.years);
      if (milestone) {
        setTimeout(() => MilestoneDetector.showCelebration(milestone), 1000);
      }
      
      // Update planetary ages
      PlanetaryAges.calculatePlanetaryAges(ageData.totalDays);
      
      // Display life statistics
      LifeStatistics.displayStats(ageData, this.birthDate);
      
      // Display birthday countdown
      BirthdayCountdown.displayCountdown(this.birthDate);
      
    }, 800);
  }

  static calculateAgeData(birthDate, timezone) {
    const now = new Date();
    const birth = new Date(birthDate);

    // Calculate age components
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days lived
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    
    // Calculate total hours, minutes, seconds
    const totalHours = Math.floor((now - birth) / (1000 * 60 * 60));
    const totalMinutes = Math.floor((now - birth) / (1000 * 60));
    const totalSeconds = Math.floor((now - birth) / 1000);

    // Calculate next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      zodiacSign: this.getZodiacSign(birth),
      dayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' })
    };
  }

  static getZodiacSign(birthDate) {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    const signs = [
      { sign: 'Capricorn ♑', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius ♒', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces ♓', start: [2, 19], end: [3, 20] },
      { sign: 'Aries ♈', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus ♉', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini ♊', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer ♋', start: [6, 21], end: [7, 22] },
      { sign: 'Leo ♌', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo ♍', start: [8, 23], end: [9, 22] },
      { sign: 'Libra ♎', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio ♏', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius ♐', start: [11, 22], end: [12, 21] }
    ];

    for (const { sign, start, end } of signs) {
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      ) {
        return sign;
      }
    }
    return 'Capricorn ♑'; // Default fallback
  }

  static displayResults(ageData) {
    const resultsContainer = document.getElementById('age-results');
    
    resultsContainer.innerHTML = `
      <div class="age-results-header">
        <h2>🎉 Your Age Analysis</h2>
      </div>
      
      <div class="age-result-cards">
        <div class="age-result-card primary-card">
          <span class="result-value">${ageData.years}</span>
          <div class="result-label">Years Young</div>
        </div>
        
        <div class="age-result-card">
          <span class="result-value">${ageData.years}y ${ageData.months}m ${ageData.days}d</span>
          <div class="result-label">Exact Age</div>
        </div>
        
        <div class="age-result-card">
          <span class="result-value" id="total-days">${ageData.totalDays.toLocaleString()}</span>
          <div class="result-label">Days Lived</div>
        </div>
        
        <div class="age-result-card">
          <span class="result-value" id="total-hours">${ageData.totalHours.toLocaleString()}</span>
          <div class="result-label">Hours Alive</div>
        </div>
        
        <div class="age-result-card">
          <span class="result-value">${ageData.daysToNextBirthday}</span>
          <div class="result-label">Days to Birthday</div>
        </div>
        
        <div class="age-result-card zodiac-card">
          <span class="result-value">${ageData.zodiacSign}</span>
          <div class="result-label">Zodiac Sign</div>
        </div>
      </div>
      
      <div class="live-age" id="live-age">
        <div class="live-age-header">
          <strong>🔴 Live Age Counter</strong>
          <span class="live-indicator"></span>
        </div>
        <div class="live-counter" id="live-counter">
          ${ageData.years} years, ${ageData.months} months, ${ageData.days} days
        </div>
        <small>Updates every second</small>
      </div>
    `;
  }

  static startLiveUpdates() {
    // Clear existing interval
    if (this.liveUpdateInterval) {
      clearInterval(this.liveUpdateInterval);
    }

    // Update every second
    this.liveUpdateInterval = setInterval(() => {
      if (this.birthDate) {
        const ageData = this.calculateAgeData(this.birthDate);
        
        // Update live counter
        const liveCounter = document.getElementById('live-counter');
        const totalDays = document.getElementById('total-days');
        const totalHours = document.getElementById('total-hours');
        
        if (liveCounter) {
          liveCounter.textContent = `${ageData.years} years, ${ageData.months} months, ${ageData.days} days`;
        }
        
        if (totalDays) {
          totalDays.textContent = ageData.totalDays.toLocaleString();
        }
        
        if (totalHours) {
          totalHours.textContent = ageData.totalHours.toLocaleString();
        }

        // Update global age data
        window.currentAgeData = ageData;
      }
    }, 1000);
  }

  static stopLiveUpdates() {
    if (this.liveUpdateInterval) {
      clearInterval(this.liveUpdateInterval);
      this.liveUpdateInterval = null;
    }
  }
}
