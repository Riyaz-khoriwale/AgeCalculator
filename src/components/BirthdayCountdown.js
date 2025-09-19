export class BirthdayCountdown {
  static countdownInterval = null;

  static render() {
    return `
      <section class="birthday-countdown" id="birthday-countdown" aria-labelledby="countdown-title">
        <h2 id="countdown-title" class="section-title">🎂 Birthday Countdown</h2>
        <div class="countdown-container" id="countdown-container">
          <!-- Countdown will be populated here -->
        </div>
      </section>
    `;
  }

  static calculateCountdown(birthDate) {
    const now = new Date();
    const birth = new Date(birthDate);
    
    // Calculate next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const timeLeft = nextBirthday - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, nextBirthday };
  }

  static displayCountdown(birthDate) {
    const container = document.getElementById('countdown-container');
    
    const updateCountdown = () => {
      const countdown = this.calculateCountdown(birthDate);
      
      container.innerHTML = `
        <div class="countdown-display">
          <div class="countdown-item">
            <span class="countdown-number">${countdown.days}</span>
            <span class="countdown-label">Days</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-item">
            <span class="countdown-number">${countdown.hours.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-item">
            <span class="countdown-number">${countdown.minutes.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Minutes</span>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-item">
            <span class="countdown-number">${countdown.seconds.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Seconds</span>
          </div>
        </div>
        <div class="next-birthday-info">
          <p>🗓️ Next birthday: <strong>${countdown.nextBirthday.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</strong></p>
        </div>
        <div class="countdown-particles" id="countdown-particles"></div>
      `;

      // Add floating particles for visual effect
      this.addFloatingParticles();
    };

    // Update immediately and then every second
    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  }

  static addFloatingParticles() {
    const particles = document.getElementById('countdown-particles');
    if (!particles) return;

    // Clear existing particles
    particles.innerHTML = '';

    // Add new particles
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.textContent = ['🎈', '🎉', '🎊', '⭐', '✨'][Math.floor(Math.random() * 5)];
      particles.appendChild(particle);
    }
  }

  static stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  static init() {
    // Initialize any event listeners
  }
}
