import html2canvas from 'html2canvas';

export class ShareableCards {
  static render() {
    return `
      <section class="shareable-cards" id="shareable-cards">
        <h2 class="section-title">📱 Share Your Age</h2>
        <div class="share-options">
          <button class="share-btn" id="generate-card-btn">
            🎨 Generate Age Card
          </button>
          <button class="share-btn" id="share-stats-btn">
            📊 Share Statistics
          </button>
          <button class="share-btn" id="download-card-btn" style="display: none;">
            💾 Download Card
          </button>
        </div>
        <div class="card-preview" id="card-preview" style="display: none;"></div>
      </section>
    `;
  }

  static generateAgeCard(ageData) {
    const cardHTML = `
      <div class="age-card-canvas" id="age-card-canvas">
        <div class="card-background">
          <div class="card-header">
            <h2>🎂 My Age Stats</h2>
            <div class="card-date">${new Date().toLocaleDateString()}</div>
          </div>
          <div class="card-main-age">
            <span class="big-age">${ageData.years}</span>
            <span class="age-label">Years Young</span>
          </div>
          <div class="card-stats-grid">
            <div class="card-stat">
              <span class="stat-value">${ageData.totalDays.toLocaleString()}</span>
              <span class="stat-label">Days Lived</span>
            </div>
            <div class="card-stat">
              <span class="stat-value">${ageData.totalHours.toLocaleString()}</span>
              <span class="stat-label">Hours Alive</span>
            </div>
            <div class="card-stat">
              <span class="stat-value">${ageData.daysToNextBirthday}</span>
              <span class="stat-label">Days to Birthday</span>
            </div>
            <div class="card-stat">
              <span class="stat-value">${ageData.zodiacSign}</span>
              <span class="stat-label">Zodiac Sign</span>
            </div>
          </div>
          <div class="card-footer">
            <span>Created with AgeCalc Pro</span>
          </div>
        </div>
      </div>
    `;

    const preview = document.getElementById('card-preview');
    preview.innerHTML = cardHTML;
    preview.style.display = 'block';
    
    document.getElementById('download-card-btn').style.display = 'inline-block';
  }

  static async downloadCard() {
    const cardElement = document.getElementById('age-card-canvas');
    if (!cardElement) {
      alert('Please generate the card first!');
      return;
    }

    try {
      const canvas = await html2canvas(cardElement, {
        useCORS: true,
        backgroundColor: null, // Keep the gradient background
        scale: 2 // Generate higher resolution image
      });

      const dataUrl = canvas.toDataURL('image/png');
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'my-age-card.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error generating card image:', error);
      alert('Sorry, there was an error generating the card image.');
    }
  }

  static shareStats(ageData) {
    const shareText = `🎂 I'm ${ageData.years} years old! That's ${ageData.totalDays.toLocaleString()} days of amazing life! Calculate your age at AgeCalc Pro`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Age Statistics',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Age stats copied to clipboard! You can now paste it anywhere.');
      });
    }
  }

  static init() {
    const generateBtn = document.getElementById('generate-card-btn');
    const shareBtn = document.getElementById('share-stats-btn');
    const downloadBtn = document.getElementById('download-card-btn');

    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        // Get current age data from AgeCalculator
        const ageData = window.currentAgeData;
        if (ageData) {
          this.generateAgeCard(ageData);
        } else {
          alert('Please calculate your age first!');
        }
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const ageData = window.currentAgeData;
        if (ageData) {
          this.shareStats(ageData);
        } else {
          alert('Please calculate your age first!');
        }
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.downloadCard());
    }
  }
}
