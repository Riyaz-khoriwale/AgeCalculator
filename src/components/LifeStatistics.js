export class LifeStatistics {
  static render() {
    return `
      <section class="life-statistics" id="life-statistics" aria-labelledby="stats-title">
        <h2 id="stats-title" class="section-title">📊 Life Statistics Dashboard</h2>
        <div class="stats-container" id="stats-container">
          <!-- Stats will be populated here -->
        </div>
      </section>
    `;
  }

  static calculateLifeStats(ageData, birthDate) {
    const now = new Date();
    const birth = new Date(birthDate);
    
    // Calculate various life statistics
    const heartbeats = Math.floor(ageData.totalDays * 100000); // Average heartbeats per day
    const breaths = Math.floor(ageData.totalDays * 20000); // Average breaths per day
    const blinks = Math.floor(ageData.totalDays * 20000); // Average blinks per day
    const sleepHours = Math.floor(ageData.totalHours * 0.33); // About 8 hours per day
    const weeksPassed = Math.floor(ageData.totalDays / 7);
    const monthsPassed = ageData.years * 12 + ageData.months;
    
    // Life expectancy calculations (rough estimates)
    const avgLifeExpectancy = 78; // Global average
    const estimatedDaysLeft = (avgLifeExpectancy - ageData.years) * 365;
    const lifePercentage = ((ageData.years / avgLifeExpectancy) * 100).toFixed(1);

    return {
      heartbeats,
      breaths,
      blinks,
      sleepHours,
      weeksPassed,
      monthsPassed,
      estimatedDaysLeft: Math.max(0, estimatedDaysLeft),
      lifePercentage: Math.min(100, lifePercentage)
    };
  }

  static displayStats(ageData, birthDate) {
    const stats = this.calculateLifeStats(ageData, birthDate);
    const container = document.getElementById('stats-container');
    
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card pulse-stat">
          <div class="stat-icon">💓</div>
          <div class="stat-value">${stats.heartbeats.toLocaleString()}</div>
          <div class="stat-label">Heartbeats</div>
        </div>
        
        <div class="stat-card breath-stat">
          <div class="stat-icon">🫁</div>
          <div class="stat-value">${stats.breaths.toLocaleString()}</div>
          <div class="stat-label">Breaths Taken</div>
        </div>
        
        <div class="stat-card blink-stat">
          <div class="stat-icon">👁️</div>
          <div class="stat-value">${stats.blinks.toLocaleString()}</div>
          <div class="stat-label">Eye Blinks</div>
        </div>
        
        <div class="stat-card sleep-stat">
          <div class="stat-icon">😴</div>
          <div class="stat-value">${stats.sleepHours.toLocaleString()}</div>
          <div class="stat-label">Hours Slept</div>
        </div>
        
        <div class="stat-card weeks-stat">
          <div class="stat-icon">📅</div>
          <div class="stat-value">${stats.weeksPassed.toLocaleString()}</div>
          <div class="stat-label">Weeks Lived</div>
        </div>
        
        <div class="stat-card months-stat">
          <div class="stat-icon">🗓️</div>
          <div class="stat-value">${stats.monthsPassed}</div>
          <div class="stat-label">Months Old</div>
        </div>
      </div>
      
      <div class="life-progress-section">
        <h3>🌱 Life Journey Progress</h3>
        <div class="life-progress-bar">
          <div class="life-progress-fill" style="width: ${stats.lifePercentage}%"></div>
          <span class="life-progress-text">${stats.lifePercentage}% of average lifespan</span>
        </div>
        <div class="life-stats-row">
          <div class="life-stat">
            <span class="life-stat-value">${stats.estimatedDaysLeft.toLocaleString()}</span>
            <span class="life-stat-label">Days remaining (estimated)</span>
          </div>
        </div>
        <p class="life-disclaimer">
          <small>* Based on global average life expectancy. Live each day to the fullest! 🌟</small>
        </p>
      </div>
    `;
  }

  static init() {
    // Initialize any interactive elements
  }
}
