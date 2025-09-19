export class MilestoneDetector {
  static milestones = [
    { age: 18, title: "🎓 Legal Adult!", message: "Welcome to adulthood! You can now vote, sign contracts, and make your own decisions." },
    { age: 21, title: "🍺 Twenty-One!", message: "You've reached the legal drinking age in many countries!" },
    { age: 25, title: "🧠 Quarter Century!", message: "Your brain is now fully developed. Time for some serious life decisions!" },
    { age: 30, title: "🏡 Dirty Thirty!", message: "The start of your best decade yet!" },
    { age: 40, title: "💪 Fabulous Forty!", message: "Life begins at 40! You're in your prime." },
    { age: 50, title: "🌟 Fantastic Fifty!", message: "Half a century of wisdom and experience!" },
    { age: 60, title: "🎉 Sensational Sixty!", message: "Senior discounts and retirement planning time!" },
    { age: 65, title: "🏖️ Retirement Ready!", message: "Time to enjoy the fruits of your labor!" },
    { age: 70, title: "💎 Platinum Years!", message: "Seven decades of amazing memories!" },
    { age: 80, title: "🎊 Octogenarian!", message: "Eight decades of incredible life experiences!" },
    { age: 90, title: "👑 Nonagenarian!", message: "Nine decades of wisdom - you're a living legend!" },
    { age: 100, title: "🎂 Centenarian!", message: "A full century! You're absolutely incredible!" }
  ];

  static checkMilestone(age) {
    return this.milestones.find(milestone => milestone.age === age);
  }

  static createCelebration(milestone) {
    return `
      <div class="milestone-celebration" id="milestone-celebration">
        <div class="milestone-content">
          <div class="milestone-confetti"></div>
          <h3 class="milestone-title">${milestone.title}</h3>
          <p class="milestone-message">${milestone.message}</p>
          <button class="milestone-close" onclick="MilestoneDetector.closeCelebration()">
            🎉 Awesome!
          </button>
        </div>
      </div>
    `;
  }

  static showCelebration(milestone) {
    const existingCelebration = document.getElementById('milestone-celebration');
    if (existingCelebration) {
      existingCelebration.remove();
    }

    const celebrationHtml = this.createCelebration(milestone);
    document.body.insertAdjacentHTML('beforeend', celebrationHtml);
    
    // Trigger confetti animation
    this.triggerConfetti();
  }

  static closeCelebration() {
    const celebration = document.getElementById('milestone-celebration');
    if (celebration) {
      celebration.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => celebration.remove(), 300);
    }
  }

  static triggerConfetti() {
    const confetti = document.querySelector('.milestone-confetti');
    if (confetti) {
      for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDelay = Math.random() * 3 + 's';
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.appendChild(piece);
      }
    }
  }
}

// Make it available globally for onclick handler
window.MilestoneDetector = MilestoneDetector;
